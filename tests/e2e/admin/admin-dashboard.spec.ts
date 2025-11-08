/**
 * E2E Test: Admin Dashboard (A-E2E-003)
 * Task: A-003 - Admin Dashboard
 */

import { test, expect } from '@playwright/test';

test.describe('A-E2E-003: Admin Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    // Login as admin
    await page.goto('/admin/login');
    const adminEmail = process.env.ADMIN_TEST_EMAIL || 'afouadsoftwareengineer@gmail.com';
    const adminPassword = process.env.ADMIN_TEST_PASSWORD || 'ZatonaFoushware$8888';
    
    await page.getByLabel(/Email Address/i).fill(adminEmail);
    await page.getByLabel(/Password/i).fill(adminPassword);
    await page.getByRole('button', { name: /Sign In/i }).click();
    await page.waitForURL(/.*admin\/dashboard.*/, { timeout: 5000 });
  });

  test('should load dashboard page', async ({ page }) => {
    await expect(page).toHaveURL(/.*admin\/dashboard.*/);
    await expect(page.locator('h1')).toContainText(/Admin Dashboard/i);
  });

  test('should display dashboard stats', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    
    // Check for stats cards
    const stats = page.locator('text=/Total Questions|Categories|Topics/i');
    const count = await stats.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should display admin menu items', async ({ page }) => {
    await expect(page.getByText(/Questions/i)).toBeVisible({ timeout: 5000 });
    await expect(page.getByText(/Content Management/i)).toBeVisible();
  });

  test('should have refresh button', async ({ page }) => {
    const refreshButton = page.getByRole('button', { name: /Refresh/i });
    await expect(refreshButton).toBeVisible({ timeout: 5000 });
  });

  test('should navigate to questions page from menu', async ({ page }) => {
    const questionsLink = page.getByRole('link', { name: /Questions/i }).first();
    if (await questionsLink.isVisible()) {
      await questionsLink.click();
      await page.waitForTimeout(1000);
      await expect(page).toHaveURL(/.*admin\/content\/questions.*/);
    }
  });
});
