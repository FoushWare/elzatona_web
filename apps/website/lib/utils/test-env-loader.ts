/**
 * Test Environment Loader Utility
 *
 * Automatically detects if running in test or production environment
 * and loads the appropriate environment variables.
 *
 * Priority order:
 * 1. .env.test.local (for local test overrides)
 * 2. .env.test (test-specific defaults)
 * 3. .env.local (fallback to dev/production)
 *
 * For GitHub Actions/CI:
 * - Uses environment variables from GitHub Secrets
 * - Detects CI environment automatically
 * - Falls back to test environment if not specified
 */

import { config } from "dotenv";
import { resolve } from "path";
import { getEnvironment, isTestEnvironment } from "./environment";

/**
 * Load environment variables based on current environment
 * Automatically detects test vs production and loads appropriate config
 */
export function loadTestEnvironment(): {
  environment: "test" | "production" | "development";
  loadedFiles: string[];
  isCI: boolean;
} {
  const projectRoot = process.cwd();
  const isCI = !!process.env.CI || !!process.env.GITHUB_ACTIONS;

  // Determine environment
  const env = getEnvironment();
  const isTest = isTestEnvironment() || env === "test";

  // In CI, prioritize environment variables from secrets
  // In local, prioritize .env.test.local for tests
  const envFiles: string[] = [];

  if (isCI) {
    // In CI, environment variables come from GitHub Secrets
    // No need to load .env files - they're already in process.env
    console.log("[Test Env Loader] Running in CI - using GitHub Secrets");
  } else {
    // Local development - load from files
    if (isTest) {
      // Test environment - prioritize test files
      envFiles.push(
        resolve(projectRoot, ".env.test.local"), // Highest priority
        resolve(projectRoot, ".env.test"), // Test defaults
        resolve(projectRoot, ".env.local"), // Fallback
      );
    } else {
      // Production/Development - use production files
      envFiles.push(
        resolve(projectRoot, ".env.local"), // Production config
        resolve(projectRoot, ".env"), // Defaults
      );
    }
  }

  const loadedFiles: string[] = [];

  // Load environment files (only in local, not CI)
  if (!isCI) {
    for (const envFile of envFiles) {
      try {
        const result = config({ path: envFile, override: false });
        if (!result.error) {
          loadedFiles.push(envFile);
        }
      } catch (_error) {
        // File doesn't exist, that's okay
      }
    }
  }

  // Normalize admin credentials (handle fallbacks and trim)
  normalizeAdminCredentials();

  // Force test environment if in test mode
  if (isTest) {
    process.env.APP_ENV = "test";
    process.env.NEXT_PUBLIC_APP_ENV = "test";
    // NODE_ENV is read-only in some environments, only set if not already set
    if (!process.env.NODE_ENV) {
      (process.env as any).NODE_ENV = "test";
    }
  }

  // Log environment info (for debugging)
  if (process.env.DEBUG_TEST_ENV === "true" || isCI) {
    console.log(`[Test Env Loader] Environment: ${env}`);
    console.log(`[Test Env Loader] Is CI: ${isCI}`);
    console.log(`[Test Env Loader] Is Test: ${isTest}`);
    if (loadedFiles.length > 0) {
      console.log(
        `[Test Env Loader] Loaded files: ${loadedFiles.map((f) => f.split("/").pop()).join(", ")}`,
      );
    }
    if (process.env.ADMIN_EMAIL) {
      console.log(
        `[Test Env Loader] Admin email: ${process.env.ADMIN_EMAIL.substring(0, 10)}...`,
      );
    }
  }

  return {
    environment: env,
    loadedFiles,
    isCI,
  };
}

/**
 * Normalize admin credentials from various environment variable names
 * Handles fallbacks and trims whitespace
 */
function normalizeAdminCredentials(): void {
  // Map existing env vars to ADMIN_EMAIL/ADMIN_PASSWORD if they don't exist
  // Priority: ADMIN_EMAIL > ADMAIN_EMAIL (typo fallback) > INITIAL_ADMIN_EMAIL > TEST_ADMIN_EMAIL
  if (!process.env.ADMIN_EMAIL) {
    process.env.ADMIN_EMAIL =
      process.env.ADMAIN_EMAIL ||
      process.env.INITIAL_ADMIN_EMAIL ||
      process.env.TEST_ADMIN_EMAIL ||
      "";
  }

  if (!process.env.ADMIN_PASSWORD) {
    process.env.ADMIN_PASSWORD =
      process.env.INITIAL_ADMIN_PASSWORD ||
      process.env.TEST_ADMIN_PASSWORD ||
      "";
  }

  // Trim whitespace from environment variables (important for .env files)
  if (process.env.ADMIN_EMAIL) {
    process.env.ADMIN_EMAIL = process.env.ADMIN_EMAIL.trim();
  }
  if (process.env.ADMIN_PASSWORD) {
    process.env.ADMIN_PASSWORD = process.env.ADMIN_PASSWORD.trim();
  }
}

/**
 * Get admin credentials with validation
 * Throws error if credentials are missing
 */
export function getAdminCredentials(): { email: string; password: string } {
  const email = process.env.ADMIN_EMAIL?.trim();
  const password = process.env.ADMIN_PASSWORD?.trim();

  if (!email || !password) {
    const isCI = !!process.env.CI || !!process.env.GITHUB_ACTIONS;
    const envHint = isCI
      ? "GitHub Secrets (ADMIN_EMAIL, ADMIN_PASSWORD)"
      : ".env.test.local file";

    throw new Error(
      `ADMIN_EMAIL and ADMIN_PASSWORD must be set in ${envHint}.\n` +
        `Current values: ADMIN_EMAIL=${email ? "***" : "undefined"}, ADMIN_PASSWORD=${password ? "***" : "undefined"}\n` +
        (isCI
          ? "Please add ADMIN_EMAIL and ADMIN_PASSWORD as GitHub Secrets in repository settings."
          : "Please check your .env.test.local file and ensure both variables are set."),
    );
  }

  return { email, password };
}
