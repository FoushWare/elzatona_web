/**
 * E2E Tests for Home Page
 *
 * End-to-end tests for the refactored home page
 * Following refactoring plans and testing standards
 *
 * Coverage: Complete user flows from landing to learning type selection
 */

import { test, expect } from "@playwright/test";

test.describe("Home Page E2E", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to home page
    await page.goto("/");
  });

  test("should load home page successfully", async ({ page }) => {
    // Check page title
    await expect(page).toHaveTitle(/Elzatona|Home/i);

    // Check main heading
    await expect(page.getByText(/Master Frontend Development/i)).toBeVisible();

    // Check subtitle
    await expect(
      page.getByText(/The complete platform to ace your frontend interviews/i),
    ).toBeVisible();
  });

  test("should display learning style selection cards", async ({ page }) => {
    // Check for learning style selector heading
    await expect(
      page.getByText(/How would you like to learn\?/i),
    ).toBeVisible();

    // Check for Guided Learning card
    await expect(page.getByText(/Guided Learning/i)).toBeVisible();
    await expect(
      page.getByText(/Follow structured learning paths designed by experts/i),
    ).toBeVisible();

    // Check for Free Style Learning card
    await expect(page.getByText(/Free Style Learning/i)).toBeVisible();
    await expect(
      page.getByText(
        /Create your own learning roadmap and explore topics at your own pace/i,
      ),
    ).toBeVisible();
  });

  test("should navigate to guided learning on card click", async ({ page }) => {
    // Click on Guided Learning card
    await page.getByText(/Start Guided Learning/i).click();

    // Should navigate to guided learning page
    await expect(page).toHaveURL(/.*guided.*|.*features.*/i);
  });

  test("should navigate to freestyle learning on card click", async ({
    page,
  }) => {
    // Click on Free Style Learning card
    await page.getByText(/Start Free Style Learning/i).click();

    // Should navigate to browse questions or freestyle page
    await expect(page).toHaveURL(/.*browse.*|.*freestyle.*/i);
  });

  test("should display personalized content for guided users", async ({
    page,
  }) => {
    // Set user type in localStorage (simulating user selection)
    await page.addInitScript(() => {
      localStorage.setItem("userType", "guided");
    });

    await page.reload();

    // Check for guided-specific content
    await expect(page.getByText(/Master Frontend Development/i)).toBeVisible();
    await expect(page.getByText(/Choose Learning Plan/i)).toBeVisible();
  });

  test("should display personalized content for self-directed users", async ({
    page,
  }) => {
    // Set user type in localStorage
    await page.addInitScript(() => {
      localStorage.setItem("userType", "self-directed");
    });

    await page.reload();

    // Check for self-directed-specific content
    await expect(page.getByText(/Build Your Custom Roadmap/i)).toBeVisible();
    await expect(page.getByText(/View My Roadmap/i)).toBeVisible();
  });

  test("should handle active plan display", async ({ page }) => {
    // Set active plan in localStorage
    await page.addInitScript(() => {
      localStorage.setItem("userType", "guided");
      localStorage.setItem(
        "active-guided-plan",
        JSON.stringify({
          id: "test-plan-001",
          name: "React Mastery",
          totalQuestions: 50,
          estimatedTime: "2 hours",
        }),
      );
    });

    await page.reload();

    // Check for active plan content
    await expect(page.getByText(/Continue React Mastery/i)).toBeVisible();
    await expect(page.getByText(/Continue Practice/i)).toBeVisible();
  });

  test("should be responsive on mobile devices", async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Check that content is still visible and accessible
    await expect(page.getByText(/Master Frontend Development/i)).toBeVisible();

    // Check that cards are accessible
    await expect(page.getByText(/Guided Learning/i)).toBeVisible();
    await expect(page.getByText(/Free Style Learning/i)).toBeVisible();
  });

  test("should handle animations gracefully", async ({ page }) => {
    // Wait for initial render
    await page.waitForLoadState("networkidle");

    // Check that main content is visible (animations should complete)
    await expect(page.getByText(/Master Frontend Development/i)).toBeVisible({
      timeout: 5000,
    });
  });
});



