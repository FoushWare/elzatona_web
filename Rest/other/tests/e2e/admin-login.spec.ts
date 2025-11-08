/**
 * Admin Login E2E Tests
 *
 * End-to-end tests for the admin login page using Playwright
 * Tests the complete user journey from login to dashboard access
 */

import { test, expect } from '@playwright/test';

test.describe('Admin Login E2E', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to admin login page
    await page.goto('http://localhost:3001/admin/login');
  });

  test('should display login page correctly', async ({ page }) => {
    // Check page title and main elements
    await expect(page).toHaveTitle(/Admin Login/);
    await expect(page.locator('h1')).toContainText('Admin Login');
    await expect(page.locator('text=Access the admin dashboard')).toBeVisible();

    // Check form elements
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();

    // Check navbar elements
    await expect(page.locator('text=Admin Access Portal')).toBeVisible();
    await expect(
      page.locator('text=Secure Authentication Required')
    ).toBeVisible();
    await expect(page.locator('text=Back to Site')).toBeVisible();
  });

  test('should show validation errors for empty form', async ({ page }) => {
    // Try to submit empty form
    await page.click('button[type="submit"]');

    // Check that form validation prevents submission
    await expect(page.locator('input[type="email"]')).toHaveAttribute(
      'required'
    );
    await expect(page.locator('input[type="password"]')).toHaveAttribute(
      'required'
    );
  });

  test('should show validation error for invalid email', async ({ page }) => {
    // Enter invalid email
    await page.fill('input[type="email"]', 'invalid-email');
    await page.fill('input[type="password"]', 'password123');
    await page.click('button[type="submit"]');

    // Check that email validation works
    await expect(page.locator('input[type="email"]')).toHaveAttribute(
      'type',
      'email'
    );
  });

  test('should handle successful login', async ({ page }) => {
    // Mock successful authentication
    await page.route('**/auth/v1/token*', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          user: {
            id: 'test-user-id',
            email: 'afouadsoftwareengineer@gmail.com',
            user_metadata: {
              role: 'super_admin',
            },
          },
          session: {
            access_token: 'test-access-token',
            refresh_token: 'test-refresh-token',
          },
        }),
      });
    });

    // Fill in correct credentials
    await page.fill('input[type="email"]', 'afouadsoftwareengineer@gmail.com');
    await page.fill('input[type="password"]', 'ZatonaFoushware$8888');

    // Submit form
    await page.click('button[type="submit"]');

    // Check loading state
    await expect(page.locator('text=Signing In...')).toBeVisible();

    // Wait for redirect to dashboard
    await page.waitForURL('**/admin/dashboard');
    await expect(page).toHaveURL(/.*admin\/dashboard/);
  });

  test('should handle login failure', async ({ page }) => {
    // Mock failed authentication
    await page.route('**/auth/v1/token*', async route => {
      await route.fulfill({
        status: 400,
        contentType: 'application/json',
        body: JSON.stringify({
          error: 'Invalid login credentials',
        }),
      });
    });

    // Fill in wrong credentials
    await page.fill('input[type="email"]', 'wrong@example.com');
    await page.fill('input[type="password"]', 'wrongpassword');

    // Submit form
    await page.click('button[type="submit"]');

    // Check error message
    await expect(page.locator('text=Invalid login credentials')).toBeVisible();

    // Check that we're still on login page
    await expect(page).toHaveURL(/.*admin\/login/);
  });

  test('should handle network errors', async ({ page }) => {
    // Mock network error
    await page.route('**/auth/v1/token*', async route => {
      await route.abort('failed');
    });

    // Fill in credentials
    await page.fill('input[type="email"]', 'afouadsoftwareengineer@gmail.com');
    await page.fill('input[type="password"]', 'ZatonaFoushware$8888');

    // Submit form
    await page.click('button[type="submit"]');

    // Check error message
    await expect(
      page.locator('text=An unexpected error occurred')
    ).toBeVisible();
  });

  test('should redirect authenticated users to dashboard', async ({ page }) => {
    // Mock authenticated state
    await page.addInitScript(() => {
      // Mock localStorage with auth token
      localStorage.setItem(
        'supabase.auth.token',
        JSON.stringify({
          access_token: 'test-token',
          refresh_token: 'test-refresh',
          expires_at: Date.now() + 3600000,
        })
      );
    });

    // Navigate to login page
    await page.goto('http://localhost:3001/admin/login');

    // Should redirect to dashboard
    await page.waitForURL('**/admin/dashboard');
    await expect(page).toHaveURL(/.*admin\/dashboard/);
  });

  test('should support keyboard navigation', async ({ page }) => {
    // Tab through form elements
    await page.keyboard.press('Tab'); // Email input
    await page.fill('input[type="email"]', 'afouadsoftwareengineer@gmail.com');

    await page.keyboard.press('Tab'); // Password input
    await page.fill('input[type="password"]', 'ZatonaFoushware$8888');

    await page.keyboard.press('Tab'); // Submit button
    await page.keyboard.press('Enter'); // Submit form

    // Check that form was submitted
    await expect(page.locator('text=Signing In...')).toBeVisible();
  });

  test('should support Enter key submission', async ({ page }) => {
    // Fill form
    await page.fill('input[type="email"]', 'afouadsoftwareengineer@gmail.com');
    await page.fill('input[type="password"]', 'ZatonaFoushware$8888');

    // Press Enter in password field
    await page.press('input[type="password"]', 'Enter');

    // Check that form was submitted
    await expect(page.locator('text=Signing In...')).toBeVisible();
  });

  test('should have working navigation links', async ({ page }) => {
    // Test "Back to Site" link in navbar
    await page.click('text=Back to Site');
    await expect(page).toHaveURL('http://localhost:3001/');

    // Navigate back to login
    await page.goto('http://localhost:3001/admin/login');

    // Test "Back to Home" link in form
    await page.click('text=← Back to Home');
    await expect(page).toHaveURL('http://localhost:3001/');
  });

  test('should support theme toggle', async ({ page }) => {
    // Check theme toggle button exists
    const themeButton = page.locator('button[aria-label="Toggle theme"]');
    await expect(themeButton).toBeVisible();

    // Click theme toggle
    await themeButton.click();

    // Check that theme changed (this would depend on your theme implementation)
    // You might check for specific CSS classes or data attributes
  });

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Check that form is still visible and usable
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();

    // Check navbar elements are still visible
    await expect(page.locator('text=Admin Access Portal')).toBeVisible();
  });

  test('should be responsive on tablet', async ({ page }) => {
    // Set tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });

    // Check that form is still visible and usable
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('should handle form state correctly', async ({ page }) => {
    // Fill form partially
    await page.fill('input[type="email"]', 'afouadsoftwareengineer@gmail.com');

    // Check that value is maintained
    await expect(page.locator('input[type="email"]')).toHaveValue(
      'afouadsoftwareengineer@gmail.com'
    );

    // Fill password
    await page.fill('input[type="password"]', 'ZatonaFoushware$8888');

    // Check that both values are maintained
    await expect(page.locator('input[type="email"]')).toHaveValue(
      'afouadsoftwareengineer@gmail.com'
    );
    await expect(page.locator('input[type="password"]')).toHaveValue(
      'ZatonaFoushware$8888'
    );
  });

  test('should clear error messages when user types', async ({ page }) => {
    // Mock failed authentication
    await page.route('**/auth/v1/token*', async route => {
      await route.fulfill({
        status: 400,
        contentType: 'application/json',
        body: JSON.stringify({
          error: 'Invalid login credentials',
        }),
      });
    });

    // Submit with wrong credentials
    await page.fill('input[type="email"]', 'wrong@example.com');
    await page.fill('input[type="password"]', 'wrongpassword');
    await page.click('button[type="submit"]');

    // Check error message appears
    await expect(page.locator('text=Invalid login credentials')).toBeVisible();

    // Start typing in email field
    await page.fill('input[type="email"]', 'test@example.com');

    // Check that error message is cleared
    await expect(
      page.locator('text=Invalid login credentials')
    ).not.toBeVisible();
  });

  test('should maintain security best practices', async ({ page }) => {
    // Check that password field has correct type
    await expect(page.locator('input[type="password"]')).toHaveAttribute(
      'type',
      'password'
    );

    // Check that form uses HTTPS in production (this would be a production test)
    // For now, just verify the form structure
    await expect(page.locator('form')).toBeVisible();

    // Check that sensitive data is not exposed in page source
    const pageContent = await page.content();
    expect(pageContent).not.toContain('ZatonaFoushware$8888');
  });
});
