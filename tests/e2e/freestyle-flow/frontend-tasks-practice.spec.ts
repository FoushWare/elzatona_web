/**
 * E2E Test: Frontend Tasks Practice
 * Task: 12 - Frontend Tasks Practice
 * Test ID: F-E2E-005
 */

import { test, expect } from '@playwright/test';

test.describe('F-E2E-005: Frontend Tasks Practice', () => {
  test('should load page correctly', async ({ page }) => {
    await page.goto('/frontend-tasks');
    await expect(page).toHaveURL(/.*frontend-tasks.*/);
    await page.waitForLoadState('networkidle');
  });

  test('should display main content', async ({ page }) => {
    await page.goto('/frontend-tasks');
    await page.waitForLoadState('networkidle');
    const content = await page.textContent('body');
    expect(content).toBeTruthy();
  });
});
