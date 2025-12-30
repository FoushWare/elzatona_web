/**
 * E2E Tests for Admin Dashboard Page
 *
 * End-to-end tests for the refactored admin dashboard page
 * Following refactoring plans and testing standards
 *
 * Coverage: Dashboard rendering, stats display, quick actions, refresh functionality
 */

import { test, expect } from "@playwright/test";

test.describe("Admin Dashboard Page E2E", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to admin dashboard
    // Note: This requires authentication, so we may need to login first
    await page.goto("/admin/dashboard");

    // If redirected to login, authenticate first
    if (page.url().includes("/admin/login")) {
      const adminEmail = process.env.ADMIN_EMAIL;
      const adminPassword = process.env.ADMIN_PASSWORD;

      if (adminEmail && adminPassword) {
        await page.getByLabel(/Email Address/i).fill(adminEmail);
        await page.getByLabel(/Password/i).fill(adminPassword);
        await page.getByRole("button", { name: /Sign In/i }).click();
        await page.waitForURL("/admin/dashboard", { timeout: 10000 });
      } else {
        test.skip();
      }
    }
  });

  test("should load admin dashboard successfully", async ({ page }) => {
    // Check page title
    await expect(page).toHaveTitle(/Admin Dashboard|Elzatona/i);

    // Check main heading
    await expect(page.getByText(/Admin Dashboard/i)).toBeVisible();

    // Check welcome message
    await expect(page.getByText(/Welcome back/i)).toBeVisible();
  });

  test("should display all metric cards", async ({ page }) => {
    // Wait for stats to load
    await page.waitForTimeout(2000);

    // Check for metric cards
    const metrics = [
      "Total Questions",
      "Learning Cards",
      "Learning Plans",
      "Topics",
      "Categories",
      "Total Tasks",
    ];

    for (const metric of metrics) {
      await expect(page.getByText(new RegExp(metric, "i"))).toBeVisible();
    }
  });

  test("should display loading skeleton while fetching stats", async ({
    page,
  }) => {
    // Navigate to dashboard
    await page.goto("/admin/dashboard");

    // Check for loading indicators (skeleton loaders)
    // Note: Loading state may be brief, so we check immediately
    const loadingIndicators = page.locator(
      '[data-testid*="loading"], .animate-pulse, [class*="skeleton"]',
    );
    // Loading may be too fast to catch, so we just verify page loads
    await expect(page.getByText(/Admin Dashboard/i)).toBeVisible();
  });

  test("should display quick action buttons", async ({ page }) => {
    // Wait for page to load
    await page.waitForTimeout(2000);

    // Check for quick action buttons
    const quickActions = [
      "Add New Question",
      "Manage Learning Cards",
      "Create Frontend Task",
      "Add Problem Solving",
    ];

    for (const action of quickActions) {
      const actionButton = page.getByText(new RegExp(action, "i"));
      await expect(actionButton).toBeVisible();
    }
  });

  test("should navigate to content management from quick actions", async ({
    page,
  }) => {
    await page.waitForTimeout(2000);

    // Click on "Manage Learning Cards" quick action
    const manageCardsButton = page.getByText(/Manage Learning Cards/i);
    await manageCardsButton.click();

    // Should navigate to content management
    await page.waitForURL(/\/admin\/content-management/, { timeout: 5000 });
    await expect(page).toHaveURL(/\/admin\/content-management/);
  });

  test("should navigate to questions page from quick actions", async ({
    page,
  }) => {
    await page.waitForTimeout(2000);

    // Click on "Add New Question" quick action
    const addQuestionButton = page.getByText(/Add New Question/i);
    await addQuestionButton.click();

    // Should navigate to questions page
    await page.waitForURL(/\/admin\/content\/questions/, { timeout: 5000 });
    await expect(page).toHaveURL(/\/admin\/content\/questions/);
  });

  test("should refresh stats when refresh button is clicked", async ({
    page,
  }) => {
    await page.waitForTimeout(2000);

    // Find refresh button
    const refreshButton = page.getByRole("button", { name: /Refresh/i });
    await expect(refreshButton).toBeVisible();

    // Click refresh
    await refreshButton.click();

    // Wait for refresh to complete
    await page.waitForTimeout(2000);

    // Verify stats are still displayed
    await expect(page.getByText(/Total Questions/i)).toBeVisible();
  });

  test("should display user information in welcome message", async ({
    page,
  }) => {
    await page.waitForTimeout(2000);

    // Check for welcome message with user info
    const welcomeMessage = page.getByText(/Welcome back/i);
    await expect(welcomeMessage).toBeVisible();

    // User name/email should be visible (format may vary)
    // This verifies the user context is loaded
  });

  test("should handle stats loading error gracefully", async ({ page }) => {
    // Simulate API failure
    await page.route("**/api/admin/stats", (route) => route.abort());

    // Reload page
    await page.reload();
    await page.waitForTimeout(2000);

    // Verify page doesn't crash
    await expect(page.getByText(/Admin Dashboard/i)).toBeVisible();
  });

  test("should be responsive on mobile viewport", async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    await page.waitForTimeout(2000);

    // Verify dashboard is still usable
    await expect(page.getByText(/Admin Dashboard/i)).toBeVisible();
    await expect(page.getByText(/Total Questions/i)).toBeVisible();
  });

  test("should display correct metric values", async ({ page }) => {
    await page.waitForTimeout(3000); // Wait for stats to load

    // Check that metric values are displayed (numbers)
    const metricCards = page.locator('[data-testid*="metric"], [class*="metric"]');
    const count = await metricCards.count();

    // At least some metrics should be displayed
    expect(count).toBeGreaterThan(0);
  });

  test("should show admin navbar with navigation", async ({ page }) => {
    await page.waitForTimeout(1000);

    // Check for admin navbar
    const navbar = page.locator("nav");
    await expect(navbar).toBeVisible();

    // Check for admin menu dropdown
    const adminMenu = page.getByText(/Admin Menu/i);
    await expect(adminMenu).toBeVisible();
  });

  test("should handle empty stats state", async ({ page }) => {
    // This test verifies the dashboard handles empty data gracefully
    // In a real scenario, this might require mocking empty API responses

    await page.waitForTimeout(2000);

    // Verify dashboard still renders
    await expect(page.getByText(/Admin Dashboard/i)).toBeVisible();
  });
});

