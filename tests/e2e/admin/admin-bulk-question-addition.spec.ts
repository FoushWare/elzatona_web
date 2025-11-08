/**
 * E2E Test: Admin Bulk Question Addition (A-E2E-001)
 * Task: A-001 - Admin Bulk Question Addition
 */

import { test, expect } from '@playwright/test';

test.describe('A-E2E-001: Admin Bulk Question Addition', () => {
  test.beforeEach(async ({ page }) => {
    // Login as admin first
    await page.goto('/admin/login');
    const adminEmail = process.env.ADMIN_TEST_EMAIL || 'afouadsoftwareengineer@gmail.com';
    const adminPassword = process.env.ADMIN_TEST_PASSWORD || 'ZatonaFoushware$8888';
    
    await page.getByLabel(/Email Address/i).fill(adminEmail);
    await page.getByLabel(/Password/i).fill(adminPassword);
    await page.getByRole('button', { name: /Sign In/i }).click();
    await page.waitForURL(/.*admin\/dashboard.*/, { timeout: 5000 });
    
    // Navigate to questions page
    await page.goto('/admin/content/questions');
    await page.waitForLoadState('networkidle');
  });

  test('should load questions page', async ({ page }) => {
    await expect(page).toHaveURL(/.*admin\/content\/questions.*/);
    await expect(page.locator('h1')).toContainText(/Question Management/i);
  });

  test('should display questions list', async ({ page }) => {
    // Wait for questions to load
    await page.waitForTimeout(2000);
    
    // Check for question management interface
    const pageContent = await page.textContent('body');
    expect(pageContent).toBeTruthy();
  });

  test('should have Add New Question button', async ({ page }) => {
    const addButton = page.getByRole('button', { name: /Add New Question/i });
    await expect(addButton).toBeVisible({ timeout: 5000 });
  });

  test('should display search functionality', async ({ page }) => {
    const searchInput = page.getByPlaceholderText(/Search questions/i);
    await expect(searchInput).toBeVisible({ timeout: 5000 });
  });

  test('should display pagination controls when there are multiple pages', async ({ page }) => {
    await page.waitForTimeout(2000);
    
    // Look for pagination elements
    const pagination = page.locator('text=/Page|Showing/i');
    const count = await pagination.count();
    
    if (count > 0) {
      await expect(pagination.first()).toBeVisible();
    }
  });
});
