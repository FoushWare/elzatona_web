/**
 * E2E Test: Admin Frontend Tasks (A-E2E-005)
 * Task: A-005 - Admin Frontend Tasks
 */

// Load test-specific environment variables (runs in worker process)
// Priority: .env.test.local > .env.test > .env.local (fallback)
// This ensures tests use a separate Supabase database
import "../test-env-loader";

import { test, expect } from "@playwright/test";

test.describe("A-E2E-005: Admin Frontend Tasks", () => {
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

    await page.goto("/admin/frontend-tasks");
    await page.waitForLoadState("networkidle");
  });

  test("should load frontend tasks page", async ({ page }) => {
    await expect(page).toHaveURL(/.*admin\/frontend-tasks.*/);
  });
});
