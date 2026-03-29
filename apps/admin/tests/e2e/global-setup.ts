import { config } from "dotenv";
import { resolve } from "path";

/**
 * Global setup for Playwright E2E tests
 * Runs once before all tests
 *
 * Note: Environment variables loaded here are available to test workers
 * because they're loaded into process.env before workers spawn
 *
 * Loads test-specific environment variables:
 * Priority: .env.test.local > .env.test > .env.local (fallback)
 */
async function globalSetup() {
  // Load test-specific environment variables
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
    } catch (_error) {
      // File doesn't exist, that's okay
    }
  }

  // FORCE TEST ENVIRONMENT for all E2E tests
  // This ensures E2E tests ALWAYS use test database, regardless of other settings
  process.env.APP_ENV = "test";
  process.env.NEXT_PUBLIC_APP_ENV = "test";
  // NODE_ENV is read-only in TypeScript, use Object.defineProperty or type assertion
  (process.env as { NODE_ENV?: string }).NODE_ENV = "test";

  // Add any global setup logic here
  // For example: seed test data, set up test environment, etc.
  console.log("🔧 Running global setup...");

  // Log environment info
  const isTestEnv = loadedFiles.some((f) => f.includes(".env.test"));
  if (isTestEnv) {
    console.log("✅ Using TEST environment (separate test database)");
  } else {
    console.log(
      "⚠️  Using DEV environment (.env.local) - consider creating .env.test.local for test isolation",
    );
  }

  if (loadedFiles.length > 0) {
    console.log(
      `   Loaded: ${loadedFiles.map((f) => f.split("/").pop()).join(", ")}`,
    );
  }

  // Log if admin credentials are available (without exposing them)
  if (process.env.ADMIN_EMAIL) {
    console.log("✅ Admin credentials loaded");
    console.log(`   Email: ${process.env.ADMIN_EMAIL.substring(0, 10)}...`);
  } else {
    console.log("⚠️  ADMIN_EMAIL not found - admin login tests will fail");
  }

  // Log Supabase environment
  if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    console.log(`   Supabase: ${supabaseUrl.substring(0, 30)}...`);
  } else {
    console.log("⚠️  NEXT_PUBLIC_SUPABASE_URL not found");
  }
}

export default globalSetup;
