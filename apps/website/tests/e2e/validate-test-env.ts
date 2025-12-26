/**
 * Test Environment Validation
 *
 * Validates that .env.test.local exists and contains valid test database credentials.
 * This ensures tests ALWAYS use the test database, never production.
 */

import { existsSync } from "fs";
import { resolve } from "path";
import { config } from "dotenv";

const projectRoot = process.cwd();
const testEnvFile = resolve(projectRoot, ".env.test.local");

/**
 * Validate that .env.test.local exists and is properly configured
 * @throws Error if validation fails
 */
export function validateTestEnvironment(): {
  isValid: boolean;
  errors: string[];
  warnings: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check if we're in CI (GitHub Actions)
  const isCI =
    process.env.CI === "true" ||
    process.env.GITHUB_ACTIONS === "true" ||
    !!process.env.TEST_SUPABASE_URL;

  // Check if file exists
  if (!existsSync(testEnvFile)) {
    errors.push(
      `❌ .env.test.local file is missing!\n` +
        `   Location: ${testEnvFile}\n` +
        `   Action: Copy .env.test.local.example to .env.test.local and fill in your test database credentials.`,
    );
    return { isValid: false, errors, warnings };
  }

  // Load .env.test.local only in local development
  if (!isCI) {
    const result = config({ path: testEnvFile });
    if (result.error) {
      errors.push(`❌ Failed to load .env.test.local: ${result.error.message}`);
      return { isValid: false, errors, warnings };
    }
  }

  // Validate required variables (both CI and local)
  const requiredVars = [
    "NEXT_PUBLIC_SUPABASE_URL",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    "SUPABASE_SERVICE_ROLE_KEY",
  ];

  const missingVars: string[] = [];
  for (const varName of requiredVars) {
    const value = process.env[varName];
    if (!value) {
      missingVars.push(varName);
    } else if (
      !isCI &&
      (value.includes("your-") || value.includes("placeholder"))
    ) {
      // In local dev, check for placeholder values
      missingVars.push(varName);
    }
  }

  if (missingVars.length > 0) {
    if (isCI) {
      errors.push(
        `❌ CI environment is missing required environment variables:\n` +
          `   ${missingVars.join(", ")}\n` +
          `   These should be set as GitHub Secrets in the workflow.`,
      );
    } else {
      errors.push(
        `❌ .env.test.local is missing or has placeholder values for:\n` +
          `   ${missingVars.join(", ")}\n` +
          `   Please update .env.test.local with real test database credentials.`,
      );
    }
  }

  // Validate Supabase URL is TEST database, not production
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
    errors.push(
      `❌ CRITICAL: .env.test.local points to PRODUCTION database!\n` +
        `   Production project reference detected: ${productionProjectRef}\n` +
        `   URL: ${supabaseUrl.substring(0, 50)}...\n` +
        `   Tests MUST use TEST database only. Please update .env.test.local with TEST database credentials.`,
    );
  } else if (!isTestProject && supabaseUrl && !supabaseUrl.includes("your-")) {
    warnings.push(
      `⚠️  Supabase URL doesn't match known test project references.\n` +
        `   URL: ${supabaseUrl.substring(0, 50)}...\n` +
        `   Expected one of: ${testProjectRefs.join(", ")}\n` +
        `   If this is a new test project, update the validation in validate-test-env.ts`,
    );
  }

  // Check for admin credentials (warnings, not errors - some tests might not need them)
  if (
    !process.env.ADMIN_EMAIL ||
    process.env.ADMIN_EMAIL.includes("example.com")
  ) {
    warnings.push(
      `⚠️  ADMIN_EMAIL not set or is placeholder - admin login tests will fail`,
    );
  }

  if (
    !process.env.ADMIN_PASSWORD ||
    process.env.ADMIN_PASSWORD.includes("your-")
  ) {
    warnings.push(
      `⚠️  ADMIN_PASSWORD not set or is placeholder - admin login tests will fail`,
    );
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Validate and throw if invalid
 * Use this in test setup files to fail fast if environment is misconfigured
 */
export function requireTestEnvironment(): void {
  // Check if we're in CI (GitHub Actions)
  const isCI =
    process.env.CI === "true" ||
    process.env.GITHUB_ACTIONS === "true" ||
    !!process.env.TEST_SUPABASE_URL;

  const validation = validateTestEnvironment();

  if (validation.warnings.length > 0) {
    console.warn("\n⚠️  Test Environment Warnings:");
    validation.warnings.forEach((warning) => console.warn(`   ${warning}`));
    console.warn("");
  }

  if (!validation.isValid) {
    console.error("\n❌ Test Environment Validation Failed:");
    validation.errors.forEach((error) => console.error(`   ${error}`));

    if (isCI) {
      console.error("\n📝 To fix (CI/GitHub Actions):");
      console.error(
        "   1. Ensure GitHub Secrets are set in repository settings",
      );
      console.error(
        "   2. Required secrets: TEST_SUPABASE_URL, TEST_SUPABASE_ANON_KEY, TEST_SUPABASE_SERVICE_ROLE_KEY",
      );
      console.error(
        "   3. Check .github/workflows/e2e-tests.yml for secret usage",
      );
    } else {
      console.error("\n📝 To fix (Local Development):");
      console.error("   1. Copy .env.test.local.example to .env.test.local");
      console.error("   2. Fill in your TEST Supabase project credentials");
      console.error(
        "   3. Ensure the URL contains a test project reference (not production)",
      );
      console.error(`   4. File location: ${testEnvFile}\n`);
    }

    throw new Error(
      "Test environment validation failed. Please configure test environment correctly.",
    );
  }

  console.log(
    `✅ Test environment validated successfully (${isCI ? "CI" : "Local"})`,
  );
  console.log(
    `   Using TEST database: ${process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 50)}...`,
  );
}
