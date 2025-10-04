/**
 * Admin Authentication End-to-End Tests
 * 
 * E2E tests for admin authentication using Playwright:
 * - Complete login flow
 * - Authentication state persistence
 * - Error scenarios
 * - Security testing
 * - Cross-browser compatibility
 */

import { test, expect, Page, BrowserContext } from '@playwright/test';

// Test configuration
const ADMIN_EMAIL = 'afouadsoftwareengineer@gmail.com';
const ADMIN_PASSWORD = 'zatonafoushware$8888';
const INVALID_EMAIL = 'invalid@example.com';
const INVALID_PASSWORD = 'wrongpassword';

// Test URLs
const LOGIN_URL = 'http://localhost:3001/admin/login';
const DASHBOARD_URL = 'http://localhost:3001/admin/dashboard';
const BASE_URL = 'http://localhost:3001';

// Helper functions
async function fillLoginForm(page: Page, email: string, password: string) {
  await page.fill('[data-testid="email-input"]', email);
  await page.fill('[data-testid="password-input"]', password);
}

async function submitLoginForm(page: Page) {
  await page.click('[data-testid="login-button"]');
}

async function waitForLoginSuccess(page: Page) {
  await page.waitForURL(DASHBOARD_URL);
  await expect(page).toHaveURL(DASHBOARD_URL);
}

async function waitForLoginError(page: Page, errorMessage: string) {
  await expect(page.locator('[data-testid="error-message"]')).toContainText(errorMessage);
}

describe('Admin Authentication E2E Tests', () => {
  let page: Page;
  let context: BrowserContext;

  test.beforeEach(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    
    // Navigate to login page
    await page.goto(LOGIN_URL);
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
  });

  test.afterEach(async () => {
    await context.close();
  });

  describe('Successful Login Flow', () => {
    test('should successfully login with valid admin credentials', async () => {
      // Fill login form
      await fillLoginForm(page, ADMIN_EMAIL, ADMIN_PASSWORD);
      
      // Submit form
      await submitLoginForm(page);
      
      // Wait for redirect to dashboard
      await waitForLoginSuccess(page);
      
      // Verify dashboard elements are present
      await expect(page.locator('h1')).toContainText('Admin Dashboard');
      await expect(page.locator('[data-testid="user-info"]')).toContainText(ADMIN_EMAIL);
    });

    test('should show loading state during login', async () => {
      // Fill login form
      await fillLoginForm(page, ADMIN_EMAIL, ADMIN_PASSWORD);
      
      // Submit form and immediately check for loading state
      await submitLoginForm(page);
      
      // Verify loading state is shown
      await expect(page.locator('[data-testid="loading-indicator"]')).toBeVisible();
      
      // Wait for login to complete
      await waitForLoginSuccess(page);
    });

    test('should clear form after successful login', async () => {
      // Fill login form
      await fillLoginForm(page, ADMIN_EMAIL, ADMIN_PASSWORD);
      
      // Submit form
      await submitLoginForm(page);
      
      // Wait for redirect
      await waitForLoginSuccess(page);
      
      // Navigate back to login page
      await page.goto(LOGIN_URL);
      
      // Verify form is cleared
      await expect(page.locator('[data-testid="email-input"]')).toHaveValue('');
      await expect(page.locator('[data-testid="password-input"]')).toHaveValue('');
    });
  });

  describe('Error Handling', () => {
    test('should show error for invalid email', async () => {
      await fillLoginForm(page, INVALID_EMAIL, ADMIN_PASSWORD);
      await submitLoginForm(page);
      
      await waitForLoginError(page, 'Invalid credentials');
    });

    test('should show error for invalid password', async () => {
      await fillLoginForm(page, ADMIN_EMAIL, INVALID_PASSWORD);
      await submitLoginForm(page);
      
      await waitForLoginError(page, 'Invalid credentials');
    });

    test('should show error for empty email', async () => {
      await fillLoginForm(page, '', ADMIN_PASSWORD);
      await submitLoginForm(page);
      
      await waitForLoginError(page, 'Email is required');
    });

    test('should show error for empty password', async () => {
      await fillLoginForm(page, ADMIN_EMAIL, '');
      await submitLoginForm(page);
      
      await waitForLoginError(page, 'Password is required');
    });

    test('should show error for invalid email format', async () => {
      await fillLoginForm(page, 'invalid-email', ADMIN_PASSWORD);
      await submitLoginForm(page);
      
      await waitForLoginError(page, 'Invalid email format');
    });

    test('should clear error when user starts typing', async () => {
      // First, trigger an error
      await fillLoginForm(page, INVALID_EMAIL, ADMIN_PASSWORD);
      await submitLoginForm(page);
      await waitForLoginError(page, 'Invalid credentials');
      
      // Start typing in email field
      await page.fill('[data-testid="email-input"]', 'new@example.com');
      
      // Verify error is cleared
      await expect(page.locator('[data-testid="error-message"]')).not.toBeVisible();
    });
  });

  describe('Authentication State Persistence', () => {
    test('should maintain login state across page refreshes', async () => {
      // Login successfully
      await fillLoginForm(page, ADMIN_EMAIL, ADMIN_PASSWORD);
      await submitLoginForm(page);
      await waitForLoginSuccess(page);
      
      // Refresh page
      await page.reload();
      
      // Verify still logged in
      await expect(page).toHaveURL(DASHBOARD_URL);
      await expect(page.locator('[data-testid="user-info"]')).toContainText(ADMIN_EMAIL);
    });

    test('should maintain login state across browser tabs', async () => {
      // Login successfully
      await fillLoginForm(page, ADMIN_EMAIL, ADMIN_PASSWORD);
      await submitLoginForm(page);
      await waitForLoginSuccess(page);
      
      // Open new tab
      const newPage = await context.newPage();
      await newPage.goto(DASHBOARD_URL);
      
      // Verify logged in on new tab
      await expect(newPage.locator('[data-testid="user-info"]')).toContainText(ADMIN_EMAIL);
      
      await newPage.close();
    });

    test('should redirect to dashboard when accessing login page while logged in', async () => {
      // Login successfully
      await fillLoginForm(page, ADMIN_EMAIL, ADMIN_PASSWORD);
      await submitLoginForm(page);
      await waitForLoginSuccess(page);
      
      // Try to access login page again
      await page.goto(LOGIN_URL);
      
      // Should redirect to dashboard
      await expect(page).toHaveURL(DASHBOARD_URL);
    });
  });

  describe('Security Testing', () => {
    test('should not expose sensitive information in error messages', async () => {
      await fillLoginForm(page, INVALID_EMAIL, ADMIN_PASSWORD);
      await submitLoginForm(page);
      
      // Error message should be generic, not revealing specific details
      const errorMessage = await page.locator('[data-testid="error-message"]').textContent();
      expect(errorMessage).not.toContain('user-not-found');
      expect(errorMessage).not.toContain('wrong-password');
      expect(errorMessage).not.toContain('invalid-email');
    });

    test('should prevent XSS attacks in form inputs', async () => {
      const xssPayload = '<script>alert("xss")</script>';
      
      await fillLoginForm(page, xssPayload, ADMIN_PASSWORD);
      await submitLoginForm(page);
      
      // Should not execute script
      await expect(page.locator('script')).toHaveCount(0);
      
      // Should show validation error
      await waitForLoginError(page, 'Invalid email format');
    });

    test('should handle SQL injection attempts', async () => {
      const sqlPayload = "'; DROP TABLE users; --";
      
      await fillLoginForm(page, sqlPayload, ADMIN_PASSWORD);
      await submitLoginForm(page);
      
      // Should show validation error, not execute SQL
      await waitForLoginError(page, 'Invalid email format');
    });
  });

  describe('Form Validation', () => {
    test('should validate email format in real-time', async () => {
      const emailInput = page.locator('[data-testid="email-input"]');
      
      // Type invalid email
      await emailInput.fill('invalid-email');
      await emailInput.blur();
      
      // Should show validation error
      await expect(page.locator('[data-testid="email-error"]')).toContainText('Invalid email format');
      
      // Type valid email
      await emailInput.fill('valid@example.com');
      await emailInput.blur();
      
      // Error should be cleared
      await expect(page.locator('[data-testid="email-error"]')).not.toBeVisible();
    });

    test('should validate password length', async () => {
      const passwordInput = page.locator('[data-testid="password-input"]');
      
      // Type short password
      await passwordInput.fill('123');
      await passwordInput.blur();
      
      // Should show validation error
      await expect(page.locator('[data-testid="password-error"]')).toContainText('Password must be at least 6 characters');
      
      // Type valid password
      await passwordInput.fill('validpassword');
      await passwordInput.blur();
      
      // Error should be cleared
      await expect(page.locator('[data-testid="password-error"]')).not.toBeVisible();
    });
  });

  describe('Accessibility Testing', () => {
    test('should support keyboard navigation', async () => {
      // Tab to email input
      await page.keyboard.press('Tab');
      await expect(page.locator('[data-testid="email-input"]')).toBeFocused();
      
      // Tab to password input
      await page.keyboard.press('Tab');
      await expect(page.locator('[data-testid="password-input"]')).toBeFocused();
      
      // Tab to submit button
      await page.keyboard.press('Tab');
      await expect(page.locator('[data-testid="login-button"]')).toBeFocused();
    });

    test('should support screen reader navigation', async () => {
      // Check for proper ARIA labels
      await expect(page.locator('[data-testid="email-input"]')).toHaveAttribute('aria-label');
      await expect(page.locator('[data-testid="password-input"]')).toHaveAttribute('aria-label');
      await expect(page.locator('[data-testid="login-button"]')).toHaveAttribute('aria-label');
    });

    test('should have proper form structure', async () => {
      // Check for form element
      await expect(page.locator('form')).toBeVisible();
      
      // Check for proper input types
      await expect(page.locator('[data-testid="email-input"]')).toHaveAttribute('type', 'email');
      await expect(page.locator('[data-testid="password-input"]')).toHaveAttribute('type', 'password');
    });
  });

  describe('Performance Testing', () => {
    test('should load login page within acceptable time', async () => {
      const startTime = Date.now();
      await page.goto(LOGIN_URL);
      await page.waitForLoadState('networkidle');
      const loadTime = Date.now() - startTime;
      
      // Should load within 3 seconds
      expect(loadTime).toBeLessThan(3000);
    });

    test('should handle rapid form submissions', async () => {
      await fillLoginForm(page, ADMIN_EMAIL, ADMIN_PASSWORD);
      
      // Submit form multiple times rapidly
      await submitLoginForm(page);
      await submitLoginForm(page);
      await submitLoginForm(page);
      
      // Should still work correctly
      await waitForLoginSuccess(page);
    });
  });

  describe('Cross-Browser Compatibility', () => {
    test('should work in Chrome', async ({ browserName }) => {
      test.skip(browserName !== 'chromium');
      
      await fillLoginForm(page, ADMIN_EMAIL, ADMIN_PASSWORD);
      await submitLoginForm(page);
      await waitForLoginSuccess(page);
    });

    test('should work in Firefox', async ({ browserName }) => {
      test.skip(browserName !== 'firefox');
      
      await fillLoginForm(page, ADMIN_EMAIL, ADMIN_PASSWORD);
      await submitLoginForm(page);
      await waitForLoginSuccess(page);
    });

    test('should work in Safari', async ({ browserName }) => {
      test.skip(browserName !== 'webkit');
      
      await fillLoginForm(page, ADMIN_EMAIL, ADMIN_PASSWORD);
      await submitLoginForm(page);
      await waitForLoginSuccess(page);
    });
  });

  describe('Mobile Responsiveness', () => {
    test('should work on mobile devices', async () => {
      // Set mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });
      
      // Login should still work
      await fillLoginForm(page, ADMIN_EMAIL, ADMIN_PASSWORD);
      await submitLoginForm(page);
      await waitForLoginSuccess(page);
    });

    test('should have touch-friendly form elements', async () => {
      await page.setViewportSize({ width: 375, height: 667 });
      
      // Check that form elements are large enough for touch
      const emailInput = page.locator('[data-testid="email-input"]');
      const passwordInput = page.locator('[data-testid="password-input"]');
      const loginButton = page.locator('[data-testid="login-button"]');
      
      const emailBox = await emailInput.boundingBox();
      const passwordBox = await passwordInput.boundingBox();
      const buttonBox = await loginButton.boundingBox();
      
      // Minimum touch target size is 44x44 pixels
      expect(emailBox?.height).toBeGreaterThanOrEqual(44);
      expect(passwordBox?.height).toBeGreaterThanOrEqual(44);
      expect(buttonBox?.height).toBeGreaterThanOrEqual(44);
    });
  });
});
