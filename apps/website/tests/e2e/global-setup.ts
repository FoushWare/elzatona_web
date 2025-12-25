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
  // Priority: .env.test.local > .env.test > .env.local (fallback)
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
  // CRITICAL: Always set these, even in CI/build context
  process.env.APP_ENV = "test";
  process.env.NEXT_PUBLIC_APP_ENV = "test";
  // NODE_ENV is read-only in some environments, only set if not already set
  if (!process.env.NODE_ENV || process.env.NODE_ENV === "production") {
    (process.env as any).NODE_ENV = "test";
  }

  // CRITICAL: Validate that we're using TEST database, not production
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const testProjectRefs = [
    "kiycimlsatwfqxtfprlr", // Current test project
    "slfyltsmcivmqfloxpmq", // Old test project 1
    "vopfdukvdhnmzzjkxpnj", // Old test project 2
  ];
  const productionProjectRef = "hpnewqkvpnthpohvxcmq";

  const isTestProject = testProjectRefs.some((ref) =>
    supabaseUrl.includes(ref),
  );
  const isProdProject = supabaseUrl.includes(productionProjectRef);

  if (isProdProject) {
    console.error(
      "❌ CRITICAL ERROR: E2E tests are configured to use PRODUCTION database!",
    );
    console.error("   This is a safety violation. Tests must use TEST database.");
    console.error(`   Supabase URL: ${supabaseUrl.substring(0, 50)}...`);
    console.error(
      "   Please check your environment variables and ensure TEST_SUPABASE_URL is set.",
    );
    throw new Error(
      "E2E tests cannot run against production database. Use TEST database only.",
    );
  }

  if (!isTestProject && supabaseUrl) {
    console.warn(
      "⚠️  WARNING: Supabase URL doesn't match known test project references",
    );
    console.warn(`   URL: ${supabaseUrl.substring(0, 50)}...`);
    console.warn("   Expected one of:", testProjectRefs.join(", "));
  }

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

  // Log Supabase environment with validation
  if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const isTest = testProjectRefs.some((ref) => supabaseUrl.includes(ref));
    const isProd = supabaseUrl.includes(productionProjectRef);
    
    if (isTest) {
      console.log(`✅ Supabase TEST database: ${supabaseUrl.substring(0, 50)}...`);
    } else if (isProd) {
      console.error(`❌ Supabase PRODUCTION database detected: ${supabaseUrl.substring(0, 50)}...`);
      console.error("   This should never happen in E2E tests!");
    } else {
      console.warn(`⚠️  Supabase URL: ${supabaseUrl.substring(0, 50)}... (unknown project)`);
    }
  } else {
    console.error("❌ NEXT_PUBLIC_SUPABASE_URL not found - tests will fail!");
  }
}

export default globalSetup;
