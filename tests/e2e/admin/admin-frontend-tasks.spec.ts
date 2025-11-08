/**
 * E2E Test: Admin Frontend Tasks (A-E2E-005)
 * Task: A-005 - Admin Frontend Tasks
 */

import { test, expect } from '@playwright/test';

test.describe('A-E2E-005: Admin Frontend Tasks', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/admin/login');
    const adminEmail = process.env.ADMIN_TEST_EMAIL || 'afouadsoftwareengineer@gmail.com';
    const adminPassword = process.env.ADMIN_TEST_PASSWORD || 'ZatonaFoushware$8888';
    
    await page.getByLabel(/Email Address/i).fill(adminEmail);
    await page.getByLabel(/Password/i).fill(adminPassword);
    await page.getByRole('button', { name: /Sign In/i }).click();
    await page.waitForURL(/.*admin\/dashboard.*/, { timeout: 5000 });
    
    await page.goto('/admin/frontend-tasks');
    await page.waitForLoadState('networkidle');
  });

  test('should load frontend tasks page', async ({ page }) => {
    await expect(page).toHaveURL(/.*admin\/frontend-tasks.*/);
  });
});
