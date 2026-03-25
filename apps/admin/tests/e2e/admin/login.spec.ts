import { test, expect } from "@playwright/test";
import { setupNetworkMocks } from "./admin-questions-page.setup";

test.describe("Admin Authentication", () => {
  test.beforeEach(async ({ page }) => {
    await setupNetworkMocks(page);
  });

  test("successful login flow", async ({ page }) => {
    await page.goto("/admin/login");

    // Check if we are on login page
    await expect(page.locator("h1")).toContainText("Admin Login");

    await page.locator('input[type="email"]').waitFor({
      state: "visible",
      timeout: 15000,
    });
    await page.locator('input[type="password"]').waitFor({
      state: "visible",
      timeout: 15000,
    });

    // Fill credentials
    await page.fill('input[type="email"]', "test-admin@example.com");
    await page.fill('input[type="password"]', "correct-password");

    await page.click('button[type="submit"]');

    // Should redirect to dashboard
    await expect(page).toHaveURL(/\/admin\/dashboard/);
    await expect(page.locator("h1")).toContainText("Admin Dashboard");
  });

  test.describe("Unauthenticated tests", () => {
    // Override storage state to start fresh
    test.use({ storageState: { cookies: [], origins: [] } });

    test("failed login shows error", async ({ page }) => {
      await page.goto("/admin/login");

      await page.locator('input[type="email"]').waitFor({
        state: "visible",
        timeout: 15000,
      });
      await page.locator('input[type="password"]').waitFor({
        state: "visible",
        timeout: 15000,
      });

      await page.fill('input[type="email"]', "wrong@example.com");
      await page.fill('input[type="password"]', "wrongpassword");

      await page.click('button[type="submit"]');

      // Should show error message (sonner toast or inline error)
      await expect(page.getByText(/Invalid/)).toBeVisible();
    });

    test("protected routes redirect to login", async ({ page }) => {
      await page.goto("/admin/dashboard");

      // Should be redirected back to login if not authenticated
      await expect(page).toHaveURL(/\/admin\/login/);
    });
  });
});
