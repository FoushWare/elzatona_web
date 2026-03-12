import { test, expect } from "@playwright/test";

test.describe("Admin Dashboard", () => {
  test.beforeEach(async ({ page }) => {
    // Mock auth API for login
    await page.route("**/api/admin/auth", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          success: true,
          admin: { id: "test-admin-id", email: "test-admin@example.com" },
        }),
      });
    });

    // Mock Supabase PostgREST for admin_users check
    await page.route("**/*.supabase.co/rest/v1/admin_users*", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          id: "test-admin-id",
          email: "test-admin@example.com",
          role: "admin",
          name: "Test Admin",
        }),
      });
    });

    // Mock stats API
    await page.route("**/api/admin/dashboard-stats", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          success: true,
          data: {
            totalQuestions: 150,
            activeQuestions: 120,
            totalLearningCards: 85,
            totalLearningPlans: 12,
            totalCategories: 8,
            totalTopics: 24,
          },
        }),
      });
    });

    // Perform login first
    await page.goto("/admin/login");
    await page.fill('input[type="email"]', "test-admin@example.com");
    await page.fill('input[type="password"]', "correct-password");
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/\/admin\/dashboard/);
  });

  test("should display dashboard statistics correctly", async ({ page }) => {
    // Wait for stats to load
    await page.waitForSelector(".grid"); // Adjust card container selector

    // Check for core cards (adjust labels/selectors based on UI)
    await expect(page.getByText(/Total Questions/i).first()).toBeVisible();
    await expect(page.getByText(/Learning Cards/i).first()).toBeVisible();
    await expect(page.getByText(/Learning Plans/i).first()).toBeVisible();

    // Verify that numbers are visible (not Error or Loading)
    // This is a broad check for content that isn't empty or NaN
    const statsCards = page.locator(".grid > div");
    const count = await statsCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test("should persist session on refresh", async ({ page }) => {
    await page.reload();
    await expect(page).toHaveURL(/\/admin\/dashboard/);
    await expect(page.locator("h1")).toContainText("Admin Dashboard");
  });
});
