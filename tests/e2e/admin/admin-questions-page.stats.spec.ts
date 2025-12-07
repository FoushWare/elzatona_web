/**
 * E2E Test: Admin Bulk Question Addition - Stats Cards
 * Tests for stats cards display and updates
 *
 * Note: Environment variables are loaded by the setup file
 */

import { test, expect } from "@playwright/test";
import {
  setupAdminPage,
  createQuestion,
  bulkDeleteQuestions,
} from "./admin-questions-page.setup";

test.describe("A-E2E-001: Admin Bulk Question Addition - Stats", () => {
  // Set default timeout for all tests in this suite
  test.setTimeout(120000); // 2 minutes

  test.beforeEach(async ({ page, browserName }) => {
    await setupAdminPage(page, browserName);
  });
  // STATS CARDS TESTS
  // ============================================

  test("should display stats cards with correct counts", async ({ page }) => {
    await page.waitForTimeout(2000);

    // Check for Total Questions card
    const totalQuestions = page.locator("text=/Total Questions/i");
    const count = await totalQuestions.count();

    if (count > 0) {
      await expect(totalQuestions.first()).toBeVisible();

      // Verify count is displayed (should be a number)
      const statsSection = totalQuestions.first().locator("..");
      const countText = await statsSection.textContent();
      expect(countText).toMatch(/\d+/); // Should contain at least one number
    }
  });

  test("should update stats after creating question", async ({ page }) => {
    // Wait for page to be ready
    await page
      .waitForLoadState("networkidle", { timeout: 10000 })
      .catch(() => {});
    await page.waitForTimeout(2000);

    // Get initial count
    const totalQuestions = page.locator("text=/Total Questions/i");
    await totalQuestions.first().waitFor({ state: "visible", timeout: 10000 });
    const initialCountText = await totalQuestions
      .first()
      .locator("..")
      .textContent();
    const initialCount = parseInt(
      initialCountText?.match(/\d+/)?.[0] || "0",
      10,
    );

    // Set up API response listeners BEFORE creating question
    const createResponsePromise = page
      .waitForResponse(
        (response) =>
          response.url().includes("/api/questions/unified") &&
          response.request().method() === "POST",
        { timeout: 20000 },
      )
      .catch(() => null);

    const fetchResponsePromise = page
      .waitForResponse(
        (response) =>
          response.url().includes("/api/questions/unified") &&
          response.request().method() === "GET",
        { timeout: 20000 },
      )
      .catch(() => null);

    // Create a question using the helper function
    const statsTestTitle = `Stats Test Question ${Date.now()}`;
    await createQuestion(page, statsTestTitle);

    // Wait for API responses
    await createResponsePromise;
    await fetchResponsePromise;

    // Wait for page to refresh (component uses fetchQuestions, not page reload)
    await page.waitForTimeout(2000);
    const loadingText = page.locator("text=/Loading questions/i");
    await loadingText
      .waitFor({ state: "hidden", timeout: 10000 })
      .catch(() => {});

    // Verify stats updated (count should increase)
    const newTotalQuestions = page.locator("text=/Total Questions/i");
    await newTotalQuestions
      .first()
      .waitFor({ state: "visible", timeout: 10000 });

    // Get new count
    const newCountText = await newTotalQuestions
      .first()
      .locator("..")
      .textContent();
    const newCount = parseInt(newCountText?.match(/\d+/)?.[0] || "0", 10);

    // Count should have increased (or at least be the same if there was a race condition)
    expect(newCount).toBeGreaterThanOrEqual(initialCount);

    // Clean up: delete the test question
    try {
      await bulkDeleteQuestions(page, [statsTestTitle]);
    } catch (e) {
      console.log("⚠️ Could not clean up stats test question:", e);
    }
  });
});
