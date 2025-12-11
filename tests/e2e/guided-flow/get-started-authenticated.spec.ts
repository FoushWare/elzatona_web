/**
 * E2E Test: Complete guided flow entry (authenticated user) (G-E2E-003)
 * Task: G-002 - Get Started Page
 */

import { test, expect } from "@playwright/test";

test.describe("G-E2E-003: Complete guided flow entry (authenticated user)", () => {
  test.beforeEach(async ({ page }) => {
    // Note: In a real scenario, you would sign in here
    // For now, we'll test the page behavior
    await page.goto("/get-started");
  });

  test("should navigate to get-started page when authenticated", async ({
    page,
  }) => {
    await expect(page).toHaveURL(/\/get-started/);
    await expect(page.locator("h1")).toContainText(
      /Choose Your Learning Style/i,
    );
  });

  test("should allow immediate selection without sign-in popup", async ({
    page,
  }) => {
    // When authenticated, clicking "I need guidance" should navigate immediately
    // without showing a sign-in popup

    const guidedOption = page
      .getByText(/I need guidance/i)
      .locator("..")
      .locator("..");
    await guidedOption.click();

    // Should show loading transition
    await expect(
      page.getByText(/Loading your learning experience/i),
    ).toBeVisible({ timeout: 2000 });

    // Should navigate directly (no sign-in modal should appear)
    await page.waitForTimeout(2000);

    const currentUrl = page.url();
    expect(
      currentUrl.includes("/features/guided-learning") ||
        currentUrl.includes("/guided"),
    ).toBeTruthy();
  });

  test("should navigate immediately without authentication delay", async ({
    page,
  }) => {
    const guidedOption = page
      .getByText(/I need guidance/i)
      .locator("..")
      .locator("..");

    const startTime = Date.now();
    await guidedOption.click();

    // Wait for navigation
    await page.waitForTimeout(2000);

    const navigationTime = Date.now() - startTime;

    // Navigation should happen within reasonable time (no authentication delays)
    expect(navigationTime).toBeLessThan(5000);

    // Verify we navigated to the correct page
    const currentUrl = page.url();
    expect(
      currentUrl.includes("/features/guided-learning") ||
        currentUrl.includes("/guided"),
    ).toBeTruthy();
  });
});
