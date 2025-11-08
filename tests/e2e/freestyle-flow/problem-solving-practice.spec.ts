/**
 * E2E Test: Problem Solving Practice
 * Task: 13
 */

import { test, expect } from '@playwright/test';

test.describe('13: Problem Solving Practice', () => {
  test('should load page correctly', async ({ page }) => {
    await page.goto('/problem-solving');
    await expect(page).toHaveURL(/.*problem-solving.*/);
  });
});
