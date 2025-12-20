/**
 * E2E Test: Admin Problem Solving (A-E2E-006)
 * Task: A-006 - Admin Problem Solving
 */

// Load test-specific environment variables (runs in worker process)
// Priority: .env.test.local > .env.test > .env.local (fallback)
// This ensures tests use a separate Supabase database
import "../test-env-loader";

import { test, expect } from "@playwright/test";

test.describe("A-E2E-006: Admin Problem Solving", () => {
  test.beforeEach(async ({ page }) => {
    // Fail if credentials are not provided
    if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
      throw new Error(
        "ADMIN_EMAIL and ADMIN_PASSWORD environment variables must be set in .env.local",
      );
    }
    await page.goto("/admin/login");
    const adminEmail = process.env.ADMIN_EMAIL!;
    const adminPassword = process.env.ADMIN_PASSWORD!;

    await page.getByLabel(/Email Address/i).fill(adminEmail);
    await page.getByLabel(/Password/i).fill(adminPassword);
    await page.getByRole("button", { name: /Sign In/i }).click();
    await page.waitForURL(/.*admin\/dashboard.*/, { timeout: 5000 });

    await page.goto("/admin/problem-solving");
    await page.waitForLoadState("networkidle");
  });

  test("should load problem solving page", async ({ page }) => {
    await expect(page).toHaveURL(/.*admin\/problem-solving.*/);
  });
});
