/**
 * E2E Test: Admin Problem Solving
 * Task: 6 - Admin Problem Solving
 * Test ID: A-E2E-006
 */

import { test, expect } from '@playwright/test';

test.describe('A-E2E-006: Admin Problem Solving', () => {
  test('should load page correctly', async ({ page }) => {
    await page.goto('/admin/problem-solving');
    await expect(page).toHaveURL(/.*admin/problem-solving.*/);
    await page.waitForLoadState('networkidle');
  });

  test('should display main content', async ({ page }) => {
    await page.goto('/admin/problem-solving');
    await page.waitForLoadState('networkidle');
    const content = await page.textContent('body');
    expect(content).toBeTruthy();
  });
});
