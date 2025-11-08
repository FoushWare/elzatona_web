/**
 * E2E Test: Admin Login
 * Task: 2
 */

import { test, expect } from '@playwright/test';

test.describe('2: Admin Login', () => {
  test('should load page correctly', async ({ page }) => {
    await page.goto('/admin/login');
    await expect(page).toHaveURL(/.*admin/login.*/);
  });
});
