import { config } from "dotenv";
import { resolve } from "path";
import { requireTestEnvironment } from "./validate-test-env";

/**
 * Global setup for Playwright E2E tests
 * Runs once before all tests
 *
 * Note: Environment variables loaded here are available to test workers
 * because they're loaded into process.env before workers spawn
 *
 * CRITICAL: Tests REQUIRE .env.test.local to exist and be properly configured.
 * This ensures tests ALWAYS use the test database, never production.
 *
 * Loads test-specific environment variables:
 * Priority: .env.test.local (REQUIRED) > .env.test > .env.local (fallback)
 */
async function globalSetup() {
  // CRITICAL: .env.test.local is REQUIRED for E2E tests
  // Load it first and validate before proceeding
  const projectRoot = process.cwd();
  const testEnvFile = resolve(projectRoot, ".env.test.local");
  
  // Load .env.test.local first (REQUIRED)
  const testEnvResult = config({ path: testEnvFile });
  if (testEnvResult.error) {
    console.error("❌ CRITICAL: Failed to load .env.test.local");
    console.error(`   File: ${testEnvFile}`);
    console.error(`   Error: ${testEnvResult.error.message}`);
    console.error("\n📝 To fix:");
    console.error("   1. Copy .env.test.local.example to .env.test.local");
    console.error("   2. Fill in your TEST Supabase project credentials");
    console.error(`   3. File location: ${testEnvFile}\n`);
    throw new Error(
      "E2E tests require .env.test.local file. Please create it from .env.test.local.example",
    );
  }

  // Load other env files as fallback (lower priority)
  const envFiles = [
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
  // CRITICAL: Always set these, even in CI/build context
  process.env.APP_ENV = "test";
  process.env.NEXT_PUBLIC_APP_ENV = "test";
  // NODE_ENV is read-only in some environments, only set if not already set
  if (!process.env.NODE_ENV || process.env.NODE_ENV === "production") {
    (process.env as any).NODE_ENV = "test";
  }

  // CRITICAL: Validate test environment configuration
  // This will throw an error if .env.test.local is missing or misconfigured
  try {
    requireTestEnvironment();
  } catch (error) {
    // Re-throw with additional context
    throw new Error(
      `E2E test environment validation failed: ${error instanceof Error ? error.message : String(error)}`,
    );
  }

  // Add any global setup logic here
  // For example: seed test data, set up test environment, etc.
  console.log("🔧 Running global setup...");

  // Log environment info
  console.log("✅ .env.test.local loaded successfully");
  if (loadedFiles.length > 0) {
    console.log(
      `   Additional files loaded: ${loadedFiles.map((f) => f.split("/").pop()).join(", ")}`,
    );
  }

  // Log if admin credentials are available (without exposing them)
  if (process.env.ADMIN_EMAIL && !process.env.ADMIN_EMAIL.includes("example.com")) {
    console.log("✅ Admin credentials loaded");
    console.log(`   Email: ${process.env.ADMIN_EMAIL.substring(0, 10)}...`);
  } else {
    console.warn("⚠️  ADMIN_EMAIL not set or is placeholder - admin login tests will fail");
  }
}

export default globalSetup;
