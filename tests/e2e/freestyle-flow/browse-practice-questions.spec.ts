/**
 * E2E Test: Browse Practice Questions
 * Task: 10
 */

import { test, expect } from '@playwright/test';

test.describe('10: Browse Practice Questions', () => {
  test('should load page correctly', async ({ page }) => {
    await page.goto('/browse-practice-questions');
    await expect(page).toHaveURL(/.*browse-practice-questions.*/);
  });
});
