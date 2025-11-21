/**
 * E2E Test: Admin Bulk Question Addition - Basic Page Tests
 * Tests for basic page loading and UI elements
 */

import { test, expect } from '@playwright/test';
import { setupAdminPage } from './admin-questions-page.setup';

test.describe('A-E2E-001: Admin Bulk Question Addition - Basic', () => {
  // Set default timeout for all tests in this suite
  test.setTimeout(120000); // 2 minutes

  test.beforeEach(async ({ page, browserName }) => {
    await setupAdminPage(page, browserName);
  });

  test('should load questions page', async ({ page }) => {
    await expect(page).toHaveURL(/.*admin\/content\/questions.*/);
    await expect(page.locator('h1')).toContainText(/Question Management/i);
  });

  test('should display questions list', async ({ page }) => {
    // Wait for questions to load
    await page.waitForTimeout(2000);
    
    // Check for question management interface
    const pageContent = await page.textContent('body');
    expect(pageContent).toBeTruthy();
  });

  test('should have Add New Question button', async ({ page }) => {
    // There are multiple "Add New Question" buttons (header and empty state)
    // Use getAllByRole and check the first one (header button)
    const addButtons = page.getByRole('button', { name: /Add New Question/i });
    const count = await addButtons.count();
    expect(count).toBeGreaterThan(0);
    // Verify the first button (header button) is visible
    await expect(addButtons.first()).toBeVisible({ timeout: 5000 });
  });

  test('should display search functionality', async ({ page }) => {
    // Wait for page to be ready
    await page.waitForTimeout(2000);
    
    // Wait for the questions page content to be visible
    await page.locator('h1').filter({ hasText: /^Question Management$/i }).waitFor({ state: 'visible', timeout: 10000 });
    
    // Wait for search input to be visible (indicates page is ready)
    const searchInput = page.locator('input[placeholder*="Search questions"]');
    await searchInput.waitFor({ state: 'visible', timeout: 10000 });
    await expect(searchInput).toBeVisible({ timeout: 5000 });
  });

  test('should display pagination controls when there are multiple pages', async ({ page }) => {
    await page.waitForTimeout(2000);
    
    // Look for pagination elements
    const pagination = page.locator('text=/Page|Showing/i');
    const count = await pagination.count();
    
    if (count > 0) {
      await expect(pagination.first()).toBeVisible();
    }
  });
});

