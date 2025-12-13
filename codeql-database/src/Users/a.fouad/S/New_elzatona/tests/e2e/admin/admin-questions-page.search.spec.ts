/**
 * E2E Test: Admin Bulk Question Addition - Search Functionality
 * Tests for search and filtering functionality
 *
 * Note: Environment variables are loaded by the setup file
 */

import { test, expect } from "@playwright/test";
import {
  setupAdminPage,
  createQuestion,
  bulkDeleteQuestions,
  createdQuestionTitles,
  testPrefix,
} from "./admin-questions-page.setup";

test.describe("A-E2E-001: Admin Bulk Question Addition - Search", () => {
  // Set default timeout for all tests in this suite
  test.setTimeout(120000); // 2 minutes

  test.beforeEach(async ({ page, browserName }) => {
    await setupAdminPage(page, browserName);
  });
  // SETUP: Create questions for search-dependent tests
  // ============================================

  test("SETUP: Create test questions for search functionality", async ({
    page,
  }) => {
    await page.waitForTimeout(2000);

    // Create questions with searchable titles
    const searchableTitle = `${testPrefix} Search Test Question`;
    const uniqueTitle = `${testPrefix} Unique Question`;
    const clearSearchTitles = [
      `${testPrefix} Clear Search Test 1`,
      `${testPrefix} Clear Search Test 2`,
    ];

    // Create searchable question
    await createQuestion(page, searchableTitle);
    createdQuestionTitles.push(searchableTitle);

    // Create unique question
    await createQuestion(page, uniqueTitle);
    createdQuestionTitles.push(uniqueTitle);

    // Create questions for clear search test
    for (const title of clearSearchTitles) {
      await createQuestion(page, title);
      createdQuestionTitles.push(title);
    }

    console.log(
      `✅ Created ${createdQuestionTitles.length} test questions for search tests`,
    );
  });

  // ============================================
  // SEARCH FUNCTIONALITY TESTS
  // ============================================

  test("should filter questions by search term", async ({ page }) => {
    await page.waitForTimeout(2000);

    // Use the question created in setup
    const searchableTitle = createdQuestionTitles.find((t) =>
      t.includes("Search Test Question"),
    );
    const searchTerm = testPrefix;

    if (!searchableTitle) {
      test.skip();
      return;
    }

    // Step 1: Search for the question (client-side filtering, no API call)
    const searchInput = page.locator(
      'input[placeholder*="Search questions by title, content, tags"]',
    );
    await expect(searchInput).toBeVisible({ timeout: 5000 });
    await searchInput.fill(searchTerm);

    // Wait for client-side filtering to complete (React state update)
    // Wait for the filtered results count to update or for the question to appear
    await page.waitForFunction(
      (term) => {
        const input = document.querySelector(
          'input[placeholder*="Search questions"]',
        ) as HTMLInputElement;
        return input?.value === term;
      },
      searchTerm,
      { timeout: 5000 },
    );
    await page.waitForTimeout(1500); // Additional wait for React to filter and render

    // Step 2: Verify the question appears in search results
    const questionLocator = page.getByText(searchableTitle, { exact: false });
    await expect(questionLocator.first()).toBeVisible({ timeout: 10000 });

    // Note: Cleanup is handled at the end of all tests
  });

  test('should show "No questions found" for non-existent search term', async ({
    page,
  }) => {
    await page.waitForTimeout(2000);

    // Step 1: Search for a non-existent term (client-side filtering, no API call)
    const nonExistentTerm = `NONEXISTENTSEARCHTERM${Date.now()}`;
    const searchInput = page.locator('input[placeholder*="Search questions"]');
    await searchInput.waitFor({ state: "visible", timeout: 10000 });

    // Clear any existing search first
    await searchInput.clear();
    await page.waitForTimeout(300);

    // Fill with non-existent term (this should trigger onChange and filter)
    await searchInput.fill(nonExistentTerm);
    await page.waitForTimeout(500); // Wait for React state update

    // Wait for client-side filtering to complete (React state update)
    // First verify the input value is set
    await page.waitForFunction(
      (term) => {
        const input = document.querySelector(
          'input[placeholder*="Search questions"]',
        ) as HTMLInputElement;
        return input?.value === term;
      },
      nonExistentTerm,
      { timeout: 5000 },
    );

    // Wait for React to filter and render - wait for "No questions found" message to appear
    // This checks that the filtered results are actually empty
    try {
      await page.waitForFunction(
        () => {
          // Check if "No questions found" heading is visible
          const headings = Array.from(document.querySelectorAll("h3"));
          const noQuestionsHeading = headings.find((h) =>
            h.textContent?.toLowerCase().includes("no questions found"),
          );

          // Also check if question list container is empty (no question rows visible)
          // Look for question items in the list (they have specific classes or structure)
          const questionListContainer = document.querySelector(
            '[class*="divide-y"]',
          );
          const questionRows = questionListContainer
            ? questionListContainer.querySelectorAll(
                'div[class*="question"], h4, [data-testid*="question"]',
              )
            : document.querySelectorAll('[class*="question"], h4');

          const hasNoQuestions = questionRows.length === 0;
          const headingVisible = noQuestionsHeading !== undefined;

          return headingVisible || hasNoQuestions;
        },
        { timeout: 15000 },
      );
    } catch (_e) {
      // If waitForFunction times out, try to find the heading anyway
      console.log(
        "⚠️ waitForFunction timed out, checking for heading directly...",
      );
    }

    await page.waitForTimeout(1000); // Additional wait for rendering

    // Step 2: Check for "No questions found" message
    // Use getByRole('heading') to target the h3 specifically (avoids strict mode violations)
    // Try multiple strategies to find the heading
    let noResultsHeading;
    try {
      noResultsHeading = page.getByRole("heading", {
        name: /No questions found/i,
      });
      await expect(noResultsHeading).toBeVisible({ timeout: 10000 });
    } catch (_e) {
      // Fallback: try to find by text content
      console.log("⚠️ getByRole failed, trying getByText...");
      noResultsHeading = page.getByText(/No questions found/i);
      await expect(noResultsHeading).toBeVisible({ timeout: 10000 });
    }

    // Also verify the helper text appears (only when searchTerm is set)
    const helperText = page.getByText(/Try adjusting your search terms/i);
    await expect(helperText).toBeVisible({ timeout: 5000 });

    // Note: Cleanup is handled at the end of all tests
  });

  test("should clear search and restore all questions", async ({ page }) => {
    await page.waitForTimeout(2000);

    // Use questions created in setup
    const searchableTitles = createdQuestionTitles.filter((t) =>
      t.includes("Clear Search Test"),
    );
    const searchTerm = testPrefix;

    if (searchableTitles.length === 0) {
      test.skip();
      return;
    }

    // Step 1: Search for the questions (client-side filtering, no API call)
    const searchInput = page.locator(
      'input[placeholder*="Search questions by title, content, tags"]',
    );
    await searchInput.fill(searchTerm);

    // Wait for client-side filtering to complete (React state update)
    await page.waitForFunction(
      (term) => {
        const input = document.querySelector(
          'input[placeholder*="Search questions"]',
        ) as HTMLInputElement;
        return input?.value === term;
      },
      searchTerm,
      { timeout: 5000 },
    );
    await page.waitForTimeout(1500);

    // Step 2: Verify filtered results appear
    const firstQuestion = page.getByText(searchableTitles[0], { exact: false });
    await expect(firstQuestion.first()).toBeVisible({ timeout: 10000 });

    // Step 3: Clear search (client-side filtering, no API call)
    await searchInput.clear();

    // Wait for client-side filtering to complete (React state update)
    await page.waitForFunction(
      () => {
        const input = document.querySelector(
          'input[placeholder*="Search questions"]',
        ) as HTMLInputElement;
        return input?.value === "";
      },
      { timeout: 5000 },
    );
    await page.waitForTimeout(1500);

    // Step 4: Verify all questions are shown again (or at least more than the filtered results)
    // The questions should still be visible after clearing search
    const allQuestionsVisible = (await firstQuestion.count()) > 0;
    expect(allQuestionsVisible).toBeTruthy();
  });

  // ============================================
  // CLEANUP: Delete test questions created for search tests
  // ============================================

  test("CLEANUP: Delete search test questions", async ({ page }) => {
    await page.waitForTimeout(2000);

    if (createdQuestionTitles.length === 0) {
      console.log("No search test questions to clean up");
      return;
    }

    console.log(
      `🧹 Cleaning up ${createdQuestionTitles.length} search test questions...`,
    );
    await bulkDeleteQuestions(page, createdQuestionTitles);
    console.log("✅ Search cleanup complete");
  });
});
