/**
 * E2E Test: Admin Dashboard
 * Task: 3 - Admin Dashboard
 * Test ID: A-E2E-003
 */

import { test, expect } from '@playwright/test';

test.describe('A-E2E-003: Admin Dashboard', () => {
  test('should load page correctly', async ({ page }) => {
    await page.goto('/admin/dashboard');
    await expect(page).toHaveURL(/.*admin/dashboard.*/);
    await page.waitForLoadState('networkidle');
  });

  test('should display main content', async ({ page }) => {
    await page.goto('/admin/dashboard');
    await page.waitForLoadState('networkidle');
    const content = await page.textContent('body');
    expect(content).toBeTruthy();
  });
});
