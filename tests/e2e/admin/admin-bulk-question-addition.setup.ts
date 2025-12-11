/**
 * Shared Setup and Utilities for Admin Bulk Question Addition E2E Tests
 * This file contains the beforeEach hook and helper functions used across all test files
 */

// Load test-specific environment variables (runs in worker process)
// Priority: .env.test.local > .env.test > .env.local (fallback)
import { config } from "dotenv";
import { resolve } from "path";
import { Page } from "@playwright/test";
import { existsSync } from "fs";

const projectRoot = process.cwd();

// Load environment files in REVERSE priority order (lowest to highest)
// This ensures higher priority files override lower priority ones
const envFiles = [
  { path: resolve(projectRoot, ".env.local"), priority: 1 }, // Lowest priority - fallback
  { path: resolve(projectRoot, ".env.test"), priority: 2 }, // Medium priority - test defaults
  { path: resolve(projectRoot, ".env.test.local"), priority: 3 }, // Highest priority - test overrides
];

// Load in order (lowest to highest priority) with override: false
// This means later files will override earlier ones if they exist
for (const envFile of envFiles) {
  try {
    if (existsSync(envFile.path)) {
      config({ path: envFile.path, override: false });
      console.log(`[Config] ✅ Loaded: ${envFile.path.split("/").pop()}`);
    }
  } catch (error) {
    // File doesn't exist or can't be read, that's okay
    console.log(
      `[Config] ⚠️  Could not load: ${envFile.path.split("/").pop()}`,
    );
  }
}

// Now explicitly load .env.test.local with override: true to ensure it takes precedence
// This is a safety measure to ensure test-specific overrides always win
try {
  const testLocalPath = resolve(projectRoot, ".env.test.local");
  if (existsSync(testLocalPath)) {
    config({ path: testLocalPath, override: true });
    console.log(
      `[Config] ✅ Override loaded: .env.test.local (highest priority)`,
    );
  }
} catch (error) {
  // File doesn't exist, that's okay - tests can use .env.test or .env.local
  console.log(
    `[Config] ⚠️  .env.test.local not found, using fallback env files`,
  );
}

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
    process.env.INITIAL_ADMIN_PASSWORD || process.env.TEST_ADMIN_PASSWORD || "";
}

// Trim whitespace from environment variables (important for .env.local files)
if (process.env.ADMIN_EMAIL) {
  process.env.ADMIN_EMAIL = process.env.ADMIN_EMAIL.trim();
}
if (process.env.ADMIN_PASSWORD) {
  process.env.ADMIN_PASSWORD = process.env.ADMIN_PASSWORD.trim();
}

// Module-level variables to share state across tests
export const createdQuestionTitles: string[] = [];
export const testPrefix = `E2E-${Date.now()}`;

/**
 * Setup admin page and navigate to content management
 * Reuses the setupAdminPage from admin-questions-page.setup.ts pattern
 */
export async function setupAdminPage(
  page: Page,
  browserName: string = "chromium",
): Promise<void> {
  // Import and use the existing setupAdminPage from admin-questions-page.setup.ts
  // For now, we'll create a simplified version that navigates to content-management
  const { setupAdminPage: setupQuestionsPage } =
    await import("./admin-questions-page.setup");

  // Use the existing setup which navigates to questions page
  await setupQuestionsPage(page, browserName);

  // Then navigate to content management
  await page.goto("/admin/content-management", {
    waitUntil: "domcontentloaded",
    timeout: 30000,
  });

  await page.waitForLoadState("networkidle", { timeout: 10000 }).catch(() => {
    // If networkidle times out, just wait a bit
    return page.waitForTimeout(2000);
  });
}

/**
 * Helper function to create a question (simplified version)
 */
export async function createQuestion(page: Page, title: string): Promise<void> {
  // Navigate to questions page first
  await page.goto("/admin/content/questions", {
    waitUntil: "domcontentloaded",
    timeout: 30000,
  });

  // Wait for page to be ready
  await page
    .locator("h1, h2, h3")
    .filter({ hasText: /^Question Management$/i })
    .waitFor({ state: "visible", timeout: 10000 });

  // Use the createQuestion from admin-questions-page.setup
  const { createQuestion: createQuestionHelper } =
    await import("./admin-questions-page.setup");
  await createQuestionHelper(page, title);
}

/**
 * Helper function to bulk delete questions by titles
 */
export async function bulkDeleteQuestions(
  page: Page,
  titles: string[],
): Promise<void> {
  if (titles.length === 0) return;

  // Use the bulkDeleteQuestions from admin-questions-page.setup
  const { bulkDeleteQuestions: bulkDeleteHelper } =
    await import("./admin-questions-page.setup");
  await bulkDeleteHelper(page, titles);
}
