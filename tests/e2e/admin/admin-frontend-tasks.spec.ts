/**
 * E2E Test: Admin Frontend Tasks
 * Task: 5 - Admin Frontend Tasks
 * Test ID: A-E2E-005
 */

import { test, expect } from '@playwright/test';

test.describe('A-E2E-005: Admin Frontend Tasks', () => {
  test('should load page correctly', async ({ page }) => {
    await page.goto('/admin/frontend-tasks');
    await expect(page).toHaveURL(/.*admin/frontend-tasks.*/);
    await page.waitForLoadState('networkidle');
  });

  test('should display main content', async ({ page }) => {
    await page.goto('/admin/frontend-tasks');
    await page.waitForLoadState('networkidle');
    const content = await page.textContent('body');
    expect(content).toBeTruthy();
  });
});
