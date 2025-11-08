/**
 * E2E Test: Admin Content Management
 * Task: 4 - Admin Content Management
 * Test ID: A-E2E-004
 */

import { test, expect } from '@playwright/test';

test.describe('A-E2E-004: Admin Content Management', () => {
  test('should load page correctly', async ({ page }) => {
    await page.goto('/admin/content');
    await expect(page).toHaveURL(/.*admin/content.*/);
    await page.waitForLoadState('networkidle');
  });

  test('should display main content', async ({ page }) => {
    await page.goto('/admin/content');
    await page.waitForLoadState('networkidle');
    const content = await page.textContent('body');
    expect(content).toBeTruthy();
  });
});
