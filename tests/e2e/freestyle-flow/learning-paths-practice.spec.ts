/**
 * E2E Test: Learning Paths Practice
 * Task: 11
 */

import { test, expect } from '@playwright/test';

test.describe('11: Learning Paths Practice', () => {
  test('should load page correctly', async ({ page }) => {
    await page.goto('/learning-paths');
    await expect(page).toHaveURL(/.*learning-paths.*/);
  });
});
