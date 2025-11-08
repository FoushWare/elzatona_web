/**
 * E2E Test: Admin Problem Solving (A-E2E-006)
 * Task: A-006 - Admin Problem Solving
 */

import { test, expect } from '@playwright/test';

test.describe('A-E2E-006: Admin Problem Solving', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/admin/login');
    const adminEmail = process.env.ADMIN_TEST_EMAIL || 'afouadsoftwareengineer@gmail.com';
    const adminPassword = process.env.ADMIN_TEST_PASSWORD || 'ZatonaFoushware$8888';
    
    await page.getByLabel(/Email Address/i).fill(adminEmail);
    await page.getByLabel(/Password/i).fill(adminPassword);
    await page.getByRole('button', { name: /Sign In/i }).click();
    await page.waitForURL(/.*admin\/dashboard.*/, { timeout: 5000 });
    
    await page.goto('/admin/problem-solving');
    await page.waitForLoadState('networkidle');
  });

  test('should load problem solving page', async ({ page }) => {
    await expect(page).toHaveURL(/.*admin\/problem-solving.*/);
  });
});
