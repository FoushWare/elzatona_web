/**
 * Shared setup for Admin Login E2E tests
 * Contains common beforeEach hook and helper functions
 *
 * Note: Environment variables are loaded by test-env-loader
 */

import { Page } from "@playwright/test";

/**
 * Setup admin login page before each test
 * Navigates to login page and waits for it to be ready
 */
export async function setupLoginPage(page: Page): Promise<void> {
  await page.goto("/admin/login");
  // Wait for the page to be interactive (form elements visible)
  // Use getByRole to avoid strict mode violation with multiple h1 elements
  await page
    .getByRole("heading", { name: /Admin Login/i })
    .waitFor({ timeout: 10000 });
  // Wait a bit more for any animations or transitions
  await page.waitForTimeout(500);
}

/**
 * Get admin credentials from environment variables
 * Throws error if credentials are not set
 */
export function getAdminCredentials(): { email: string; password: string } {
  const adminEmail = process.env.ADMIN_EMAIL?.trim();
  const adminPassword = process.env.ADMIN_PASSWORD?.trim();

  if (!adminEmail || !adminPassword) {
    throw new Error(
      "ADMIN_EMAIL and ADMIN_PASSWORD environment variables must be set in .env.test.local and cannot be empty.\n" +
        `Current values: ADMIN_EMAIL=${adminEmail ? "***" : "undefined"}, ADMIN_PASSWORD=${adminPassword ? "***" : "undefined"}\n` +
        `Please check your .env.test.local file and ensure both variables are set with valid values.\n` +
        "Example (in .env.test.local):\n" +
        "ADMIN_EMAIL=your-admin-email@example.com\n" +
        "ADMIN_PASSWORD=your-admin-password",
    );
  }

  return { email: adminEmail, password: adminPassword };
}

/**
 * Get invalid test credentials from environment variables
 * Falls back to test values if not set
 */
export function getInvalidCredentials(): { email: string; password: string } {
  return {
    email: process.env.TEST_INVALID_EMAIL || "invalid-test@example.com",
    password: process.env.TEST_INVALID_PASSWORD || "invalid-test-password-123",
  };
}
