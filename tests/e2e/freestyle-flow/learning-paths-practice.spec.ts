/**
 * E2E Test: Learning Paths Practice
 * Task: 11 - Learning Paths Practice
 * Test ID: F-E2E-004
 */

import { test, expect } from '@playwright/test';

test.describe('F-E2E-004: Learning Paths Practice', () => {
  test('should load page correctly', async ({ page }) => {
    await page.goto('/learning-paths');
    await expect(page).toHaveURL(/.*learning-paths.*/);
    await page.waitForLoadState('networkidle');
  });

  test('should display main content', async ({ page }) => {
    await page.goto('/learning-paths');
    await page.waitForLoadState('networkidle');
    const content = await page.textContent('body');
    expect(content).toBeTruthy();
  });
});
