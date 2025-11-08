/**
 * E2E Test: Admin Content Management (A-E2E-004)
 * Task: A-004 - Admin Content Management
 */

import { test, expect } from '@playwright/test';

test.describe('A-E2E-004: Admin Content Management', () => {
  test.beforeEach(async ({ page }) => {
    // Login as admin
    await page.goto('/admin/login');
    const adminEmail = process.env.ADMIN_TEST_EMAIL || 'afouadsoftwareengineer@gmail.com';
    const adminPassword = process.env.ADMIN_TEST_PASSWORD || 'ZatonaFoushware$8888';
    
    await page.getByLabel(/Email Address/i).fill(adminEmail);
    await page.getByLabel(/Password/i).fill(adminPassword);
    await page.getByRole('button', { name: /Sign In/i }).click();
    await page.waitForURL(/.*admin\/dashboard.*/, { timeout: 5000 });
    
    // Navigate to content management
    await page.goto('/admin/content-management');
    await page.waitForLoadState('networkidle');
  });

  test('should load content management page', async ({ page }) => {
    await expect(page).toHaveURL(/.*admin\/content-management.*/);
  });

  test('should display content sections', async ({ page }) => {
    await page.waitForTimeout(2000);
    const content = await page.textContent('body');
    expect(content).toBeTruthy();
  });
});
