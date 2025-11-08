/**
 * E2E Test: Admin Frontend Tasks
 * Task: 5
 */

import { test, expect } from '@playwright/test';

test.describe('5: Admin Frontend Tasks', () => {
  test('should load page correctly', async ({ page }) => {
    await page.goto('/admin/frontend-tasks');
    await expect(page).toHaveURL(/.*admin/frontend-tasks.*/);
  });
});
