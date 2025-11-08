/**
 * E2E Test: My Plans Page
 * Task: 9
 */

import { test, expect } from '@playwright/test';

test.describe('9: My Plans Page', () => {
  test('should load page correctly', async ({ page }) => {
    await page.goto('/my-plans');
    await expect(page).toHaveURL(/.*my-plans.*/);
  });
});
