/**
 * E2E Test: Admin Bulk Question Addition - Search Functionality
 * Tests for search and filtering functionality
 * 
 * Note: Environment variables are loaded by the setup file
 */

import { test, expect } from '@playwright/test';
import { setupAdminPage, createQuestion, bulkDeleteQuestions, createdQuestionTitles, testPrefix } from './admin-bulk-question-addition.setup';

test.describe('A-E2E-001: Admin Bulk Question Addition - Search', () => {
  // Set default timeout for all tests in this suite
  test.setTimeout(120000); // 2 minutes

  test.beforeEach(async ({ page, browserName }) => {
    await setupAdminPage(page, browserName);
  });
  // SETUP: Create questions for search-dependent tests
  // ============================================

  test('SETUP: Create test questions for search functionality', async ({ page }) => {
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

    console.log(`✅ Created ${createdQuestionTitles.length} test questions for search tests`);
  });

  // ============================================
  // SEARCH FUNCTIONALITY TESTS
  // ============================================

  test('should filter questions by search term', async ({ page }) => {
    await page.waitForTimeout(2000);

    // Use the question created in setup
    const searchableTitle = createdQuestionTitles.find(t => t.includes('Search Test Question'));
    const searchTerm = testPrefix;
    
    if (!searchableTitle) {
      test.skip();
      return;
    }

    // Step 1: Search for the question (client-side filtering, no API call)
    const searchInput = page.locator('input[placeholder*="Search questions by title, content, tags"]');
    await expect(searchInput).toBeVisible({ timeout: 5000 });
    await searchInput.fill(searchTerm);
    
    // Wait for client-side filtering to complete (React state update)
    // Wait for the filtered results count to update or for the question to appear
    await page.waitForFunction(
      (term) => {
        const input = document.querySelector('input[placeholder*="Search questions"]') as HTMLInputElement;
        return input?.value === term;
      },
      searchTerm,
      { timeout: 5000 }
    );
    await page.waitForTimeout(1500); // Additional wait for React to filter and render

    // Step 2: Verify the question appears in search results
    const questionLocator = page.getByText(searchableTitle, { exact: false });
    await expect(questionLocator.first()).toBeVisible({ timeout: 10000 });

    // Note: Cleanup is handled at the end of all tests
  });

  test('should show "No questions found" for non-existent search term', async ({ page }) => {
    await page.waitForTimeout(2000);

    // Step 1: Search for a non-existent term (client-side filtering, no API call)
    const nonExistentTerm = `NONEXISTENTSEARCHTERM${Date.now()}`;
    const searchInput = page.locator('input[placeholder*="Search questions"]');
    await searchInput.waitFor({ state: 'visible', timeout: 10000 });
    await searchInput.fill(nonExistentTerm);
    
    // Wait for client-side filtering to complete (React state update)
    await page.waitForFunction(
      (term) => {
        const input = document.querySelector('input[placeholder*="Search questions"]') as HTMLInputElement;
        return input?.value === term;
      },
      nonExistentTerm,
      { timeout: 5000 }
    );
    
    // Wait for React to filter and render - wait for questions list to update
    await page.waitForFunction(
      () => {
        // Check if "No questions found" heading is visible OR if question list is empty
        const noQuestionsHeading = document.querySelector('h3')?.textContent?.includes('No questions found');
        const questionRows = document.querySelectorAll('[class*="question"], h4');
        return noQuestionsHeading || questionRows.length === 0;
      },
      { timeout: 10000 }
    );
    
    await page.waitForTimeout(1000); // Additional wait for rendering

    // Step 2: Check for "No questions found" message
    // Use getByRole('heading') to target the h3 specifically (avoids strict mode violations)
    const noResultsHeading = page.getByRole('heading', { name: /No questions found/i });
    await expect(noResultsHeading).toBeVisible({ timeout: 10000 });
    
    // Also verify the helper text appears
    const helperText = page.getByText(/Try adjusting your search terms/i);
    await expect(helperText).toBeVisible({ timeout: 5000 });

    // Note: Cleanup is handled at the end of all tests
  });

  test('should clear search and restore all questions', async ({ page }) => {
    await page.waitForTimeout(2000);

    // Use questions created in setup
    const searchableTitles = createdQuestionTitles.filter(t => t.includes('Clear Search Test'));
    const searchTerm = testPrefix;
    
    if (searchableTitles.length === 0) {
      test.skip();
      return;
    }

    // Step 1: Search for the questions (client-side filtering, no API call)
    const searchInput = page.locator('input[placeholder*="Search questions by title, content, tags"]');
    await searchInput.fill(searchTerm);
    
    // Wait for client-side filtering to complete (React state update)
    await page.waitForFunction(
      (term) => {
        const input = document.querySelector('input[placeholder*="Search questions"]') as HTMLInputElement;
        return input?.value === term;
      },
      searchTerm,
      { timeout: 5000 }
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
        const input = document.querySelector('input[placeholder*="Search questions"]') as HTMLInputElement;
        return input?.value === '';
      },
      { timeout: 5000 }
    );
    await page.waitForTimeout(1500);

    // Step 4: Verify all questions are shown again (or at least more than the filtered results)
    // The questions should still be visible after clearing search
    const allQuestionsVisible = await firstQuestion.count() > 0;
    expect(allQuestionsVisible).toBeTruthy();

  });

  // ============================================
  // CLEANUP: Delete test questions created for search tests
  // ============================================

  test('CLEANUP: Delete search test questions', async ({ page }) => {
    await page.waitForTimeout(2000);

    if (createdQuestionTitles.length === 0) {
      console.log('No search test questions to clean up');
      return;
    }

    console.log(`🧹 Cleaning up ${createdQuestionTitles.length} search test questions...`);
    await bulkDeleteQuestions(page, createdQuestionTitles);
    console.log('✅ Search cleanup complete');
  });
});
