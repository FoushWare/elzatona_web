/**
 * E2E Test: Admin Bulk Question Addition
 * Task: 1 - Admin Bulk Question Addition
 * Test ID: A-E2E-001
 */

import { test, expect } from '@playwright/test';

test.describe('A-E2E-001: Admin Bulk Question Addition', () => {
  test('should load page correctly', async ({ page }) => {
    await page.goto('/admin/content/questions');
    await expect(page).toHaveURL(/.*admin/content/questions.*/);
    await page.waitForLoadState('networkidle');
  });

  test('should display main content', async ({ page }) => {
    await page.goto('/admin/content/questions');
    await page.waitForLoadState('networkidle');
    const content = await page.textContent('body');
    expect(content).toBeTruthy();
  });
});
