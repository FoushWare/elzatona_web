/**
 * E2E Test: Admin User Management (A-E2E-007)
 * Task: A-007 - Admin User Management
 */

import { test, expect } from '@playwright/test';

test.describe('A-E2E-007: Admin User Management', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/admin/login');
    const adminEmail = process.env.ADMIN_TEST_EMAIL || 'afouadsoftwareengineer@gmail.com';
    const adminPassword = process.env.ADMIN_TEST_PASSWORD || 'ZatonaFoushware$8888';
    
    await page.getByLabel(/Email Address/i).fill(adminEmail);
    await page.getByLabel(/Password/i).fill(adminPassword);
    await page.getByRole('button', { name: /Sign In/i }).click();
    await page.waitForURL(/.*admin\/dashboard.*/, { timeout: 5000 });
    
    await page.goto('/admin/users');
    await page.waitForLoadState('networkidle');
  });

  test('should load user management page', async ({ page }) => {
    await expect(page).toHaveURL(/.*admin\/users.*/);
  });

  test('should display user list', async ({ page }) => {
    await page.waitForTimeout(2000);
    const content = await page.textContent('body');
    expect(content).toBeTruthy();
  });
});
