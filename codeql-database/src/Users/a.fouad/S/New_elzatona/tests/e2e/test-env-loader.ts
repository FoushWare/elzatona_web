/**
 * Test Environment Loader
 * Loads test-specific environment variables for E2E tests
 * Priority: .env.test.local > .env.test > .env.local (fallback)
 *
 * This ensures tests use a separate Supabase database to avoid affecting
 * the main development/production database.
 */

import { config } from "dotenv";
import { resolve } from "path";

const projectRoot = process.cwd();

/**
 * Load test environment variables
 * Priority order:
 * 1. .env.test.local (highest priority - for local test overrides)
 * 2. .env.test (test-specific defaults)
 * 3. .env.local (fallback to main dev environment)
 *
 * @returns Object with loaded files info and environment status
 */
export function loadTestEnv() {
  // Load in priority order (later loads override earlier ones)
  const envFiles = [
    resolve(projectRoot, ".env.test.local"), // Highest priority
    resolve(projectRoot, ".env.test"), // Test defaults
    resolve(projectRoot, ".env.local"), // Fallback to dev
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

  // Normalize admin credentials (handle fallbacks and trim)
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

  // Trim whitespace from environment variables
  if (process.env.ADMIN_EMAIL) {
    process.env.ADMIN_EMAIL = process.env.ADMIN_EMAIL.trim();
  }
  if (process.env.ADMIN_PASSWORD) {
    process.env.ADMIN_PASSWORD = process.env.ADMIN_PASSWORD.trim();
  }

  // Log what was loaded (for debugging)
  if (process.env.DEBUG_TEST_ENV === "true") {
    console.log("[Test Env] Loaded environment files:", loadedFiles);
    console.log(
      "[Test Env] Using Supabase URL:",
      process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 30) + "...",
    );
  }

  return {
    loadedFiles,
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    hasTestEnv: loadedFiles.some((f) => f.includes(".env.test")),
  };
}

// Auto-load on import (for convenience)
loadTestEnv();
