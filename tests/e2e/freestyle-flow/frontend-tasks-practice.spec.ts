/**
 * E2E Test: Frontend Tasks Practice
 * Task: 12
 */

import { test, expect } from '@playwright/test';

test.describe('12: Frontend Tasks Practice', () => {
  test('should load page correctly', async ({ page }) => {
    await page.goto('/frontend-tasks');
    await expect(page).toHaveURL(/.*frontend-tasks.*/);
  });
});
