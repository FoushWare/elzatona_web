/**
 * E2E Test: Admin Bulk Question Addition
 * Task: 1
 */

import { test, expect } from '@playwright/test';

test.describe('1: Admin Bulk Question Addition', () => {
  test('should load page correctly', async ({ page }) => {
    await page.goto('/admin/content/questions');
    await expect(page).toHaveURL(/.*admin/content/questions.*/);
  });
});
