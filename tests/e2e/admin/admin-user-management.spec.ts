/**
 * E2E Test: Admin User Management
 * Task: 7
 */

import { test, expect } from '@playwright/test';

test.describe('7: Admin User Management', () => {
  test('should load page correctly', async ({ page }) => {
    await page.goto('/admin/users');
    await expect(page).toHaveURL(/.*admin/users.*/);
  });
});
