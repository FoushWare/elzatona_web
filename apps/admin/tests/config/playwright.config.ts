import { defineConfig, devices } from "@playwright/test";
import { config } from "dotenv";
import { resolve } from "path";

// Load test-specific environment variables for E2E tests
// Priority: .env.test.local > .env.test > .env.local (fallback)
// This ensures E2E tests use a separate test database
const projectRoot = process.cwd();
const envFiles = [
  resolve(projectRoot, ".env.test.local"), // Highest priority - test overrides
  resolve(projectRoot, ".env.test"), // Test-specific defaults
  resolve(projectRoot, ".env.local"), // Fallback to dev (for backwards compatibility)
];

const loadedFiles: string[] = [];
for (const envFile of envFiles) {
  try {
    const result = config({ path: envFile, override: false }); // Don't override, respect priority
    if (!result.error) {
      loadedFiles.push(envFile);
    }
  } catch (_error) {
    // File doesn't exist, that's okay
  }
}

// FORCE TEST ENVIRONMENT for all E2E tests
// This ensures E2E tests ALWAYS use test database, regardless of other settings
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
  /* Run tests in files in parallel - DISABLED for 8GB RAM */
  fullyParallel: false, // Disabled for 8GB RAM Mac
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Use 1 worker for 8GB RAM Mac - prevents OOM errors */
  workers: process.env.CI ? 1 : 1, // Always use 1 worker for memory efficiency
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ["html"],
    ["json", { outputFile: "test-results/e2e-results.json" }],
    ["junit", { outputFile: "test-results/e2e-results.xml" }],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: process.env.ADMIN_BASE_URL || "http://localhost:3001",

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",

    /* Take screenshot on failure */
    screenshot: "only-on-failure",

    /* Record video on failure - kept only for failed tests, auto-removed on success */
    video: "retain-on-failure", // Record videos for failed tests only, auto-cleanup on success
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
