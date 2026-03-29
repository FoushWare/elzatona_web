import { defineConfig, devices } from "@playwright/test";
import { config } from "dotenv";
import { resolve } from "node:path";

const isCI = process.env.CI === "true" || process.env.GITHUB_ACTIONS === "true";
const defaultCiWorkers = 2;
const envWorkersRaw = process.env.PLAYWRIGHT_WORKERS;
const parsedWorkers =
  envWorkersRaw !== undefined && envWorkersRaw.trim() !== ""
    ? Number.parseInt(envWorkersRaw, 10)
    : Number.NaN;
const ciWorkers =
  Number.isFinite(parsedWorkers) && parsedWorkers > 0
    ? parsedWorkers
    : defaultCiWorkers;

// Load test-specific environment variables for E2E tests
// Order: Lowest -> Highest priority (.env.test.local wins)
const projectRoot = process.cwd();
const envFiles = [
  resolve(projectRoot, ".env"), // Base defaults
  resolve(projectRoot, ".env.local"), // Local development overrides
  resolve(projectRoot, ".env.test"), // Test-specific defaults
  resolve(projectRoot, ".env.test.local"), // Highest priority - test overrides
];

const loadedFiles: string[] = [];
for (const envFile of envFiles) {
  try {
    const result = config({ path: envFile, override: true });
    if (!result.error) {
      loadedFiles.push(envFile);
    }
  } catch {
    // File doesn't exist, that's okay
  }
}

process.env.APP_ENV = "test";
process.env.NEXT_PUBLIC_APP_ENV = "test";
// Only set NODE_ENV if not in build context
if (process.env.NODE_ENV !== "production" && !process.env.NEXT_PHASE) {
  try {
    Object.defineProperty(process.env, "NODE_ENV", {
      value: "test",
      writable: true,
      configurable: true,
    });
  } catch {
    // If defineProperty fails, skip (some environments don't allow modification)
  }
}

// Debug: Log loaded admin credentials and environment info
if (process.env.ADMIN_EMAIL) {
  console.log(
    `[Config] ✅ ADMIN_EMAIL loaded: ${process.env.ADMIN_EMAIL.substring(0, 10)}...`,
  );
} else {
  console.warn(`[Config] ⚠️  ADMIN_EMAIL not found in test environment files`);
}

if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const isTestEnv = loadedFiles.some((f) => f.includes(".env.test"));
  console.log(
    `[Config] 📊 Using Supabase: ${supabaseUrl.substring(0, 30)}... (${isTestEnv ? "TEST" : "DEV"} environment)`,
  );
} else {
  console.warn(`[Config] ⚠️  NEXT_PUBLIC_SUPABASE_URL not found`);
}

if (loadedFiles.length > 0 && process.env.DEBUG_TEST_ENV === "true") {
  console.log(`[Config] 📁 Loaded environment files:`, loadedFiles);
}

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: "../e2e",
  /* Run tests in files in parallel - ENABLED for faster CI */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Keep retries conservative on CI to reduce wall-clock time growth as suite size increases */
  retries: isCI ? 1 : 0,
  /* Allow workflow-level worker tuning while preserving a stable default */
  workers: isCI ? ciWorkers : 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: isCI
    ? [["dot"], ["junit", { outputFile: "test-results/e2e-results.xml" }]]
    : [
        ["html"],
        ["json", { outputFile: "test-results/e2e-results.json" }],
        ["junit", { outputFile: "test-results/e2e-results.xml" }],
      ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: process.env.ADMIN_BASE_URL || "http://localhost:3001",

    /* On CI keep artifacts focused on failures to reduce test runtime overhead */
    trace: isCI ? "retain-on-failure" : "on-first-retry",

    /* Take screenshot on failure */
    screenshot: "only-on-failure",

    /* CI video capture is disabled by default for speed; enable with PW_VIDEO=true when investigating */
    video:
      isCI && process.env.PW_VIDEO !== "true" ? "off" : "retain-on-failure",
  },

  /* Configure projects for major browsers - CHROME and EDGE for testing */
  projects: [
    {
      name: "setup",
      testMatch: /auth\.setup\.ts/,
    },
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        storageState: resolve(__dirname, "../.auth/admin.json"),
      },
      dependencies: ["setup"],
    },
    {
      name: "msedge",
      use: {
        ...devices["Desktop Edge"],
        storageState: resolve(__dirname, "../.auth/admin.json"),
        // Edge uses Chromium engine, so it should be compatible
        // Add any Edge-specific settings here if needed
      },
      dependencies: ["setup"],
    },

    /* Other browsers disabled for faster test execution - uncomment if needed */
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    // In CI, we pre-start the server in the workflow for speed and reliability.
    // Locally, we can use dev or start.
    command: process.env.CI
      ? "npx next start -p 3001"
      : "NODE_OPTIONS=--max-old-space-size=1536 APP_ENV=test NEXT_PUBLIC_APP_ENV=test npx next dev -p 3001",
    url: process.env.ADMIN_BASE_URL || "http://localhost:3001",
    cwd: resolve(projectRoot, "apps/admin"),
    reuseExistingServer: true, // Always reuse if already running
    timeout: 120 * 1000, // 2 minutes
    env: {
      APP_ENV: "test",
      NEXT_PUBLIC_APP_ENV: "test",
      NODE_ENV: process.env.CI ? "production" : "test",
      NODE_OPTIONS: "--max-old-space-size=1536 --dns-result-order=ipv4first",
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || "",
      NEXT_PUBLIC_SUPABASE_ANON_KEY:
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
      SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY || "",
      JWT_SECRET: process.env.JWT_SECRET || "",
      ADMIN_EMAIL: process.env.ADMIN_EMAIL || "",
      ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || "",
    },
  },

  /* Global setup and teardown */
  globalSetup: require.resolve("../e2e/global-setup.ts"),
  globalTeardown: require.resolve("../e2e/global-teardown.ts"),

  /* Test timeout - increased for E2E tests that may need more time */
  timeout: 60 * 1000, // 60 seconds

  /* Expect timeout */
  expect: {
    timeout: 10 * 1000, // 10 seconds
  },

  /* Output directory for test artifacts */
  // Test results (videos, screenshots, traces) - ignored by git
  outputDir: "test-results/",
});
