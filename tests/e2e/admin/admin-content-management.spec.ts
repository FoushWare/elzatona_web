/**
 * E2E Test: Admin Content Management
 * Task: 4
 */

import { test, expect } from '@playwright/test';

test.describe('4: Admin Content Management', () => {
  test('should load page correctly', async ({ page }) => {
    await page.goto('/admin/content');
    await expect(page).toHaveURL(/.*admin/content.*/);
  });
});
