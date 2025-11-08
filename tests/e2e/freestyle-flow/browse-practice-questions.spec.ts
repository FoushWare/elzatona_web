/**
 * E2E Test: Browse Practice Questions (F-E2E-003)
 * Task: F-003 - Browse Practice Questions
 */

import { test, expect } from '@playwright/test';

test.describe('F-E2E-003: Browse Practice Questions', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/browse-practice-questions');
    await page.waitForLoadState('networkidle');
  });

  test('should load browse practice questions page', async ({ page }) => {
    await expect(page).toHaveURL(/.*browse-practice-questions.*/);
  });
});
