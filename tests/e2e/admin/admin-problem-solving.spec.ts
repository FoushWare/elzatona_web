/**
 * E2E Test: Admin Problem Solving
 * Task: 6
 */

import { test, expect } from '@playwright/test';

test.describe('6: Admin Problem Solving', () => {
  test('should load page correctly', async ({ page }) => {
    await page.goto('/admin/problem-solving');
    await expect(page).toHaveURL(/.*admin/problem-solving.*/);
  });
});
