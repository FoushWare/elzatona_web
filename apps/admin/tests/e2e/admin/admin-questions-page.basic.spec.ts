/**
 * E2E Test: Admin Bulk Question Addition - Basic Page Tests
 * Tests for basic page loading and UI elements
 */

import { test, expect } from "@playwright/test";
import {
  setupAdminPage,
  waitForQuestionManagementReady,
} from "./admin-questions-page.setup";

test.describe("A-E2E-001: Admin Bulk Question Addition - Basic", () => {
  // Set default timeout for all tests in this suite
  test.setTimeout(120000); // 2 minutes

  test.beforeEach(async ({ page, browserName }) => {
    await setupAdminPage(page, browserName);
  });

  test("should load questions page", async ({ page }) => {
    await expect(page).toHaveURL(/.*admin\/content\/questions.*/);
    await expect(page.locator("h1")).toContainText(/Question Management/i);
  });

  test("should display questions list", async ({ page }) => {
    await waitForQuestionManagementReady(page);

    // Check for question management interface
    await expect(page.getByTestId("questions-list")).toBeVisible();
  });

  test("should have Add New Question button", async ({ page }) => {
    await waitForQuestionManagementReady(page);

    // Use a stable selector introduced for E2E reliability.
    const createButton = page.getByTestId("question-create-button");
    await expect(createButton).toBeVisible({ timeout: 5000 });
  });

  test("should display search functionality", async ({ page }) => {
    await waitForQuestionManagementReady(page);

    // Wait for search input to be visible (indicates page is ready)
    const searchInput = page
      .getByTestId("question-management-search")
      .locator('input[placeholder*="Search questions"]');
    await searchInput.waitFor({ state: "visible", timeout: 10000 });
    await expect(searchInput).toBeVisible({ timeout: 5000 });
  });

  test("should display pagination controls when there are multiple pages", async ({
    page,
  }) => {
    await waitForQuestionManagementReady(page);

    // Look for pagination elements
    const pagination = page.locator("text=/Page|Showing/i");
    const count = await pagination.count();

    if (count > 0) {
      await expect(pagination.first()).toBeVisible();
    }
  });
});
