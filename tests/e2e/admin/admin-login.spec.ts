/**
 * E2E Test: Admin Login (A-E2E-002)
 * Task: A-002 - Admin Login
 */

import { test, expect } from '@playwright/test';

test.describe('A-E2E-002: Admin Login Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/admin/login');
  });

  test('should load admin login page', async ({ page }) => {
    await expect(page).toHaveURL(/.*admin\/login.*/);
    await expect(page.locator('h1')).toContainText(/Admin Login/i);
  });

  test('should display login form elements', async ({ page }) => {
    await expect(page.getByLabel(/Email Address/i)).toBeVisible();
    await expect(page.getByLabel(/Password/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /Sign In/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Back to Home/i })).toBeVisible();
  });

  test('should show validation errors for empty form', async ({ page }) => {
    const submitButton = page.getByRole('button', { name: /Sign In/i });
    await submitButton.click();
    
    // HTML5 validation should prevent submission
    const emailInput = page.getByLabel(/Email Address/i);
    await expect(emailInput).toBeFocused();
  });

  test('should show error for invalid credentials', async ({ page }) => {
    await page.getByLabel(/Email Address/i).fill('wrong@example.com');
    await page.getByLabel(/Password/i).fill('wrongpassword');
    await page.getByRole('button', { name: /Sign In/i }).click();
    
    // Wait for error message
    await page.waitForTimeout(1000);
    
    // Check for error message
    const errorText = page.getByText(/Invalid|Error|Failed/i);
    await expect(errorText).toBeVisible({ timeout: 3000 });
  });

  test('should successfully login with valid credentials', async ({ page }) => {
    // Note: Use actual admin credentials or test credentials
    const adminEmail = process.env.ADMIN_TEST_EMAIL || 'afouadsoftwareengineer@gmail.com';
    const adminPassword = process.env.ADMIN_TEST_PASSWORD || 'ZatonaFoushware$8888';
    
    await page.getByLabel(/Email Address/i).fill(adminEmail);
    await page.getByLabel(/Password/i).fill(adminPassword);
    await page.getByRole('button', { name: /Sign In/i }).click();
    
    // Wait for redirect to dashboard
    await page.waitForURL(/.*admin\/dashboard.*/, { timeout: 5000 });
    await expect(page).toHaveURL(/.*admin\/dashboard.*/);
  });

  test('should redirect authenticated users away from login', async ({ page }) => {
    // First login
    const adminEmail = process.env.ADMIN_TEST_EMAIL || 'afouadsoftwareengineer@gmail.com';
    const adminPassword = process.env.ADMIN_TEST_PASSWORD || 'ZatonaFoushware$8888';
    
    await page.getByLabel(/Email Address/i).fill(adminEmail);
    await page.getByLabel(/Password/i).fill(adminPassword);
    await page.getByRole('button', { name: /Sign In/i }).click();
    await page.waitForURL(/.*admin\/dashboard.*/, { timeout: 5000 });
    
    // Try to access login page again
    await page.goto('/admin/login');
    
    // Should redirect back to dashboard
    await page.waitForTimeout(1000);
    await expect(page).toHaveURL(/.*admin\/dashboard.*/);
  });

  test('should handle loading state during login', async ({ page }) => {
    await page.getByLabel(/Email Address/i).fill('admin@example.com');
    await page.getByLabel(/Password/i).fill('password123');
    
    const submitButton = page.getByRole('button', { name: /Sign In/i });
    await submitButton.click();
    
    // Button should be disabled during submission
    await expect(submitButton).toBeDisabled({ timeout: 500 });
  });
});
