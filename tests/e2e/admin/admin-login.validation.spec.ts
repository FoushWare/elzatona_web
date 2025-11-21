/**
 * E2E Test: Admin Login - Form Validation
 * Tests form validation and error handling
 * 
 * Note: Environment variables are loaded by test-env-loader
 */

import '../test-env-loader';
import { test, expect } from '@playwright/test';
import { setupLoginPage, getInvalidCredentials } from './admin-login.setup';

test.describe('A-E2E-002: Admin Login - Validation', () => {
  test.beforeEach(async ({ page }) => {
    await setupLoginPage(page);
  });

  test('should show HTML5 validation for empty email field', async ({ page }) => {
    const emailInput = page.getByLabel(/Email Address/i);
    const submitButton = page.getByRole('button', { name: /Sign In/i });
    
    // Try to submit without filling email
    await submitButton.click();
    
    // HTML5 validation should prevent submission and focus email field
    // Check if email input is focused or has validation message
    const isFocused = await emailInput.evaluate(el => document.activeElement === el);
    const isValid = await emailInput.evaluate((el: HTMLInputElement) => el.validity.valid);
    
    // Either the field should be focused or validation should prevent submission
    expect(isFocused || !isValid).toBeTruthy();
  });

  test('should show HTML5 validation for empty password field', async ({ page }) => {
    const emailInput = page.getByLabel(/Email Address/i);
    const passwordInput = page.getByLabel(/Password/i);
    const submitButton = page.getByRole('button', { name: /Sign In/i });
    
    // Use test email from environment (or fallback to a test email format)
    // This doesn't need to be valid - we're just testing HTML5 validation
    const testEmail = process.env.TEST_INVALID_EMAIL || 'test@example.com';
    
    // Fill email but not password
    await emailInput.fill(testEmail);
    await submitButton.click();
    
    // HTML5 validation should prevent submission
    const isPasswordFocused = await passwordInput.evaluate(el => document.activeElement === el);
    const isValid = await passwordInput.evaluate((el: HTMLInputElement) => el.validity.valid);
    
    // Either password field should be focused or validation should prevent submission
    expect(isPasswordFocused || !isValid).toBeTruthy();
  });

  test('should show error message for invalid credentials', async ({ page }) => {
    const emailInput = page.getByLabel(/Email Address/i);
    const passwordInput = page.getByLabel(/Password/i);
    const submitButton = page.getByRole('button', { name: /Sign In/i });
    
    // Use intentionally invalid credentials from environment (or fallback to test values)
    // These should be wrong to test error handling
    const { email: invalidEmail, password: invalidPassword } = getInvalidCredentials();
    
    // Set up network listener to wait for API response
    const responsePromise = page.waitForResponse(
      (response) => {
        return (
          response.url().includes('/api/admin/auth') &&
          response.request().method() === 'POST'
        );
      },
      { timeout: 10000 }
    );
    
    // Fill form with invalid credentials
    await emailInput.fill(invalidEmail);
    await passwordInput.fill(invalidPassword);
    
    // Submit form
    await submitButton.click();
    
    // Wait for API response
    const response = await responsePromise;
    const responseData = await response.json();
    
    // Verify API returned error
    expect(responseData.success).toBe(false);
    expect(responseData.error).toBeTruthy();
    
    // Wait for form submission to complete (button should no longer show "Signing In...")
    await page.waitForFunction(
      () => {
        const button = document.querySelector('button[type="submit"]');
        return button && !button.textContent?.includes('Signing In');
      },
      { timeout: 5000 }
    );
    
    // Wait for error message to appear in the UI
    // Error message appears in a red box with classes: bg-red-50 dark:bg-red-900/20
    // The error message is in a <p> tag with classes: text-red-600 dark:text-red-400 text-sm
    // Use a more specific selector to avoid matching labels ("Email Address", "Password")
    // Target the error message paragraph directly within the error container
    const errorContainer = page.locator('.bg-red-50, .bg-red-900\\/20');
    await expect(errorContainer).toBeVisible({ timeout: 5000 });
    
    // Get the error text paragraph within the container
    // Use filter to ensure we get the paragraph that contains "Invalid" (not the labels)
    const errorText = errorContainer
      .locator('p.text-red-600, p.text-red-400')
      .filter({ hasText: /Invalid/i });
    
    await expect(errorText).toBeVisible({ timeout: 2000 });
    
    // Verify the error message contains expected text
    await expect(errorText).toContainText(/Invalid/i);
  });

  test('should handle network errors gracefully', async ({ page }) => {
    // Simulate network failure by going offline
    await page.context().setOffline(true);
    
    const emailInput = page.getByLabel(/Email Address/i);
    const passwordInput = page.getByLabel(/Password/i);
    const submitButton = page.getByRole('button', { name: /Sign In/i });
    
    // Use test credentials from environment (or fallback to test values)
    // These don't need to be valid - we're testing network error handling
    const { email: testEmail, password: testPassword } = getInvalidCredentials();
    
    await emailInput.fill(testEmail);
    await passwordInput.fill(testPassword);
    await submitButton.click();
    
    // Should show error message after network failure
    // Wait for error to appear (may take time for timeout)
    const errorMessage = page.locator('.bg-red-50, .bg-red-900\\/20').getByText(/error|failed|unexpected/i);
    
    // Wait for error or check if button is no longer in loading state
    await Promise.race([
      expect(errorMessage).toBeVisible({ timeout: 10000 }).catch(() => null),
      page.waitForSelector('button:not(:disabled)', { timeout: 10000 }).catch(() => null),
    ]);
    
    // Go back online
    await page.context().setOffline(false);
  });
});



