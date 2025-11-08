/**
 * E2E Test: Admin Dashboard
 * Task: 3
 */

import { test, expect } from '@playwright/test';

test.describe('3: Admin Dashboard', () => {
  test('should load page correctly', async ({ page }) => {
    await page.goto('/admin/dashboard');
    await expect(page).toHaveURL(/.*admin/dashboard.*/);
  });
});
