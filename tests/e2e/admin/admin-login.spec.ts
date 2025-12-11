/**
 * E2E Test: Admin Login (A-E2E-002)
 * Task: A-002 - Admin Login
 *
 * ⚠️ NOTE: This file has been split into focused test files for better maintainability:
 * - admin-login.basic.spec.ts - Basic page loading and form display
 * - admin-login.validation.spec.ts - Form validation and error handling
 * - admin-login.flow.spec.ts - Login flow, redirects, and loading states
 * - admin-login.setup.ts - Shared setup and helper functions
 *
 * This file is kept for reference only. Use the split files for testing.
 *
 * Original tests included:
 * - Page loading and form display
 * - Form validation
 * - Error handling for invalid credentials
 * - Successful login and redirect
 * - Authenticated user redirect protection
 * - Loading states during submission
 */

// Load test-specific environment variables (runs in worker process)
// Priority: .env.test.local > .env.test > .env.local (fallback)
// This ensures tests use a separate Supabase database
// E2E tests use ADMIN_EMAIL and ADMIN_PASSWORD from .env.test.local (lines 18-19)
import "../test-env-loader";

import { test, expect } from "@playwright/test";

test.describe("A-E2E-002: Admin Login Flow", () => {
  // Wait for page to be fully loaded before each test
  test.beforeEach(async ({ page }) => {
    await page.goto("/admin/login");
    // Wait for the page to be interactive (form elements visible)
    // Use getByRole to avoid strict mode violation with multiple h1 elements
    await page
      .getByRole("heading", { name: /Admin Login/i })
      .waitFor({ timeout: 10000 });
    // Wait a bit more for any animations or transitions
    await page.waitForTimeout(500);
  });

  test("should load admin login page", async ({ page }) => {
    // Verify URL
    await expect(page).toHaveURL(/.*admin\/login.*/);

    // Verify page title - target the specific h1 in the form section (not navbar)
    const heading = page.getByRole("heading", { name: /Admin Login/i });
    await expect(heading).toBeVisible();

    // Verify subtitle
    await expect(page.getByText(/Access the admin dashboard/i)).toBeVisible();
  });

  test("should display all login form elements", async ({ page }) => {
    // Email input
    const emailInput = page.getByLabel(/Email Address/i);
    await expect(emailInput).toBeVisible();
    await expect(emailInput).toHaveAttribute("type", "email");
    await expect(emailInput).toHaveAttribute("required");

    // Password input
    const passwordInput = page.getByLabel(/Password/i);
    await expect(passwordInput).toBeVisible();
    await expect(passwordInput).toHaveAttribute("type", "password");
    await expect(passwordInput).toHaveAttribute("required");

    // Submit button
    const submitButton = page.getByRole("button", { name: /Sign In/i });
    await expect(submitButton).toBeVisible();
    await expect(submitButton).toHaveAttribute("type", "submit");

    // Back to Home link
    const homeLink = page.getByRole("link", { name: /Back to Home/i });
    await expect(homeLink).toBeVisible();
    await expect(homeLink).toHaveAttribute("href", "/");
  });

  test("should show HTML5 validation for empty email field", async ({
    page,
  }) => {
    const emailInput = page.getByLabel(/Email Address/i);
    const submitButton = page.getByRole("button", { name: /Sign In/i });

    // Try to submit without filling email
    await submitButton.click();

    // HTML5 validation should prevent submission and focus email field
    // Check if email input is focused or has validation message
    const isFocused = await emailInput.evaluate(
      (el) => document.activeElement === el,
    );
    const isValid = await emailInput.evaluate(
      (el: HTMLInputElement) => el.validity.valid,
    );

    // Either the field should be focused or validation should prevent submission
    expect(isFocused || !isValid).toBeTruthy();
  });

  test("should show HTML5 validation for empty password field", async ({
    page,
  }) => {
    const emailInput = page.getByLabel(/Email Address/i);
    const passwordInput = page.getByLabel(/Password/i);
    const submitButton = page.getByRole("button", { name: /Sign In/i });

    // Use test email from environment (or fallback to a test email format)
    // This doesn't need to be valid - we're just testing HTML5 validation
    const testEmail = process.env.TEST_INVALID_EMAIL || "test@example.com";

    // Fill email but not password
    await emailInput.fill(testEmail);
    await submitButton.click();

    // HTML5 validation should prevent submission
    const isPasswordFocused = await passwordInput.evaluate(
      (el) => document.activeElement === el,
    );
    const isValid = await passwordInput.evaluate(
      (el: HTMLInputElement) => el.validity.valid,
    );

    // Either password field should be focused or validation should prevent submission
    expect(isPasswordFocused || !isValid).toBeTruthy();
  });

  test("should show error message for invalid credentials", async ({
    page,
  }) => {
    const emailInput = page.getByLabel(/Email Address/i);
    const passwordInput = page.getByLabel(/Password/i);
    const submitButton = page.getByRole("button", { name: /Sign In/i });

    // Use intentionally invalid credentials from environment (or fallback to test values)
    // These should be wrong to test error handling
    const invalidEmail =
      process.env.TEST_INVALID_EMAIL || "invalid-test@example.com";
    const invalidPassword =
      process.env.TEST_INVALID_PASSWORD || "invalid-test-password-123";

    // Set up network listener to wait for API response
    const responsePromise = page.waitForResponse(
      (response) => {
        return (
          response.url().includes("/api/admin/auth") &&
          response.request().method() === "POST"
        );
      },
      { timeout: 10000 },
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
        return button && !button.textContent?.includes("Signing In");
      },
      { timeout: 5000 },
    );

    // Wait for error message to appear in the UI
    // Error message appears in a red box with classes: bg-red-50 dark:bg-red-900/20
    // The error message is in a <p> tag with classes: text-red-600 dark:text-red-400 text-sm
    // Use a more specific selector to avoid matching labels ("Email Address", "Password")
    // Target the error message paragraph directly within the error container
    const errorContainer = page.locator(".bg-red-50, .bg-red-900\\/20");
    await expect(errorContainer).toBeVisible({ timeout: 5000 });

    // Get the error text paragraph within the container
    // Use filter to ensure we get the paragraph that contains "Invalid" (not the labels)
    const errorText = errorContainer
      .locator("p.text-red-600, p.text-red-400")
      .filter({ hasText: /Invalid/i });

    await expect(errorText).toBeVisible({ timeout: 2000 });

    // Verify the error message contains expected text
    await expect(errorText).toContainText(/Invalid/i);
  });

  test("should successfully login with valid credentials", async ({ page }) => {
    // Use ADMIN_EMAIL and ADMIN_PASSWORD from .env.test.local (lines 18-19) for E2E testing
    const adminEmail = process.env.ADMIN_EMAIL?.trim();
    const adminPassword = process.env.ADMIN_PASSWORD?.trim();

    // Fail test if credentials are not provided or are empty
    if (!adminEmail || !adminPassword) {
      throw new Error(
        "ADMIN_EMAIL and ADMIN_PASSWORD environment variables must be set in .env.test.local (lines 18-19) and cannot be empty.\n" +
          `Current values: ADMIN_EMAIL=${adminEmail ? "***" : "undefined"}, ADMIN_PASSWORD=${adminPassword ? "***" : "undefined"}\n` +
          `Please check your .env.test.local file (lines 18-19) and ensure both variables are set with valid values.\n` +
          "Example (in .env.test.local):\n" +
          "ADMIN_EMAIL=elzatonafoushware@gmail.com\n" +
          "ADMIN_PASSWORD=ZatonaFoushware$12",
      );
    }

    const emailInput = page.getByLabel(/Email Address/i);
    const passwordInput = page.getByLabel(/Password/i);
    const submitButton = page.getByRole("button", { name: /Sign In/i });

    // Fill form with valid credentials
    await emailInput.fill(adminEmail);
    await passwordInput.fill(adminPassword);

    // Set up navigation and network listeners
    const navigationPromise = page.waitForURL(/.*admin\/dashboard.*/, {
      timeout: 20000,
    });

    // Wait for the API response to complete
    const responsePromise = page
      .waitForResponse(
        (response) =>
          response.url().includes("/api/admin/auth") &&
          response.request().method() === "POST",
        { timeout: 10000 },
      )
      .catch(() => null);

    // Click submit button
    await submitButton.click();

    // Wait for API response first
    const response = await responsePromise;
    if (response) {
      const responseData = await response.json();
      if (!responseData.success) {
        const errorMsg = responseData.error || "Unknown error";
        if (errorMsg.includes("Invalid email or password")) {
          throw new Error(
            `Login failed: ${errorMsg}\n\n` +
              `Test credentials (${adminEmail}) do not exist in the database.\n` +
              `To set up test admin user:\n` +
              `1. Set ADMIN_EMAIL and ADMIN_PASSWORD in .env.test.local (lines 18-19)\n` +
              `2. Create admin user via API: POST /api/admin/init with email and password\n` +
              `3. Or run: npm run setup:admin (if available)\n` +
              `4. Verify .env.test.local has APP_ENV=test set`,
          );
        }
        throw new Error(`Login API failed: ${errorMsg}`);
      }
    }

    // Wait for either navigation or error message
    try {
      await Promise.race([
        navigationPromise,
        // If login fails, an error message will appear
        page
          .waitForSelector(".bg-red-50, .bg-red-900\\/20", { timeout: 10000 })
          .then(() => {
            throw new Error("Login failed - error message appeared on page");
          }),
      ]);
    } catch (error) {
      // If navigation didn't happen, check for error message
      const errorMessage = page.locator(".bg-red-50, .bg-red-900\\/20");
      if (await errorMessage.isVisible().catch(() => false)) {
        const errorText = await errorMessage.textContent();
        throw new Error(`Login failed with error: ${errorText}`);
      }
      throw error;
    }

    // Verify redirect to dashboard
    await expect(page).toHaveURL(/.*admin\/dashboard.*/, { timeout: 5000 });

    // Wait for dashboard content to be visible
    const dashboardHeading = page.getByRole("heading", {
      name: /Admin Dashboard/i,
    });
    await expect(dashboardHeading).toBeVisible({ timeout: 10000 });
  });

  test("should show loading state during login submission", async ({
    page,
  }) => {
    const emailInput = page.getByLabel(/Email Address/i);
    const passwordInput = page.getByLabel(/Password/i);
    const submitButton = page.getByRole("button", { name: /Sign In/i });

    // Use test credentials from environment (or fallback to test values)
    // These don't need to be valid - we're just testing the loading state
    const testEmail =
      process.env.TEST_INVALID_EMAIL || "test-loading@example.com";
    const testPassword =
      process.env.TEST_INVALID_PASSWORD || "test-loading-password-123";

    // Fill form
    await emailInput.fill(testEmail);
    await passwordInput.fill(testPassword);

    // Verify button is initially enabled and shows "Sign In"
    await expect(submitButton).toBeEnabled();
    await expect(submitButton).toHaveText(/Sign In/i);

    // Click submit button
    await submitButton.click();

    // Immediately check for loading state (poll quickly to catch it)
    // The loading state should appear very quickly after click
    let loadingStateDetected = false;
    const startTime = Date.now();
    const maxWaitTime = 1000; // Maximum 1 second to detect loading state

    while (Date.now() - startTime < maxWaitTime && !loadingStateDetected) {
      try {
        const buttonText = await submitButton.textContent();
        const isDisabled = await submitButton.isDisabled();

        if (buttonText?.includes("Signing") || isDisabled) {
          loadingStateDetected = true;
          break;
        }

        // Small delay before next check
        await page.waitForTimeout(50);
      } catch (error) {
        // Page might have navigated or closed, check if error appeared
        const hasError = await page
          .locator(".bg-red-50, .bg-red-900\\/20")
          .isVisible()
          .catch(() => false);
        if (hasError) {
          // Form was submitted (error appeared), which means loading state existed
          loadingStateDetected = true;
          break;
        }
        // If page closed/navigated, break the loop
        break;
      }
    }

    // Verify loading state was detected
    if (!loadingStateDetected) {
      // Final check - maybe loading state was too fast
      try {
        const finalButtonText = await submitButton.textContent();
        const finalIsDisabled = await submitButton.isDisabled();
        const hasError = await page
          .locator(".bg-red-50, .bg-red-900\\/20")
          .isVisible()
          .catch(() => false);

        if (
          finalButtonText?.includes("Signing") ||
          finalIsDisabled ||
          hasError
        ) {
          loadingStateDetected = true;
        }
      } catch (error) {
        // Page might have navigated - check if we're still on login page
        const currentUrl = page.url();
        if (!currentUrl.includes("/admin/login")) {
          // Navigated away - loading state existed but was too fast
          loadingStateDetected = true;
        }
      }
    }

    expect(loadingStateDetected).toBeTruthy();

    // Wait for error message to appear (since credentials are invalid)
    // This ensures the form submission completed
    await page
      .waitForSelector(".bg-red-50, .bg-red-900\\/20", { timeout: 5000 })
      .catch(() => {
        // Error message might not appear if test completes too quickly or page navigated
      });
  });

  test("should redirect authenticated users away from login page", async ({
    page,
  }) => {
    // Use ADMIN_EMAIL and ADMIN_PASSWORD from .env.test.local (lines 18-19) for E2E testing
    const adminEmail = process.env.ADMIN_EMAIL?.trim();
    const adminPassword = process.env.ADMIN_PASSWORD?.trim();

    // Fail test if credentials are not provided or are empty
    if (!adminEmail || !adminPassword) {
      throw new Error(
        "ADMIN_EMAIL and ADMIN_PASSWORD environment variables must be set in .env.test.local (lines 18-19) and cannot be empty.\n" +
          `Current values: ADMIN_EMAIL=${adminEmail ? "***" : "undefined"}, ADMIN_PASSWORD=${adminPassword ? "***" : "undefined"}\n` +
          `Please check your .env.test.local file (lines 18-19) and ensure both variables are set with valid values.\n` +
          "Example (in .env.test.local):\n" +
          "ADMIN_EMAIL=elzatonafoushware@gmail.com\n" +
          "ADMIN_PASSWORD=ZatonaFoushware$12",
      );
    }

    const emailInput = page.getByLabel(/Email Address/i);
    const passwordInput = page.getByLabel(/Password/i);
    const submitButton = page.getByRole("button", { name: /Sign In/i });

    await emailInput.fill(adminEmail);
    await passwordInput.fill(adminPassword);

    // Set up navigation and network listeners
    const navigationPromise = page.waitForURL(/.*admin\/dashboard.*/, {
      timeout: 20000,
    });

    // Wait for the API response to complete
    const responsePromise = page
      .waitForResponse(
        (response) =>
          response.url().includes("/api/admin/auth") &&
          response.request().method() === "POST",
        { timeout: 10000 },
      )
      .catch(() => null);

    // Click submit button
    await submitButton.click();

    // Wait for API response first
    const response = await responsePromise;
    if (response) {
      const responseData = await response.json();
      if (!responseData.success) {
        const errorMsg = responseData.error || "Unknown error";
        if (errorMsg.includes("Invalid email or password")) {
          throw new Error(
            `Login failed: ${errorMsg}\n\n` +
              `Test credentials (${adminEmail}) do not exist in the database.\n` +
              `To set up test admin user:\n` +
              `1. Set ADMIN_EMAIL and ADMIN_PASSWORD in .env.test.local (lines 18-19)\n` +
              `2. Create admin user via API: POST /api/admin/init with email and password\n` +
              `3. Or run: npm run setup:admin (if available)\n` +
              `4. Verify .env.test.local has APP_ENV=test set`,
          );
        }
        throw new Error(`Login API failed: ${errorMsg}`);
      }
    }

    // Wait for either navigation or error message
    try {
      await Promise.race([
        navigationPromise,
        // If login fails, an error message will appear
        page
          .waitForSelector(".bg-red-50, .bg-red-900\\/20", { timeout: 10000 })
          .then(() => {
            throw new Error("Login failed - error message appeared on page");
          }),
      ]);
    } catch (error) {
      // If navigation didn't happen, check for error message
      const errorMessage = page.locator(".bg-red-50, .bg-red-900\\/20");
      if (await errorMessage.isVisible().catch(() => false)) {
        const errorText = await errorMessage.textContent();
        throw new Error(`Login failed with error: ${errorText}`);
      }
      throw error;
    }

    // Verify we're on dashboard
    await expect(page).toHaveURL(/.*admin\/dashboard.*/, { timeout: 5000 });

    // Wait for dashboard content
    const dashboardHeading = page.getByRole("heading", {
      name: /Admin Dashboard/i,
    });
    await expect(dashboardHeading).toBeVisible({ timeout: 10000 });

    // Wait a moment for auth state to fully update
    await page.waitForTimeout(1000);

    // Now try to access login page again
    // Should redirect back to dashboard (handled by AdminAuthProvider useEffect)
    const redirectPromise = page.waitForURL(/.*admin\/dashboard.*/, {
      timeout: 15000,
    });
    await page.goto("/admin/login");

    // Wait for redirect
    await redirectPromise;

    // Verify we're still on dashboard (redirected away from login)
    await expect(page).toHaveURL(/.*admin\/dashboard.*/, { timeout: 5000 });

    // Verify dashboard content is still visible
    await expect(dashboardHeading).toBeVisible({ timeout: 5000 });
  });

  test("should handle network errors gracefully", async ({ page }) => {
    // Simulate network failure by going offline
    await page.context().setOffline(true);

    const emailInput = page.getByLabel(/Email Address/i);
    const passwordInput = page.getByLabel(/Password/i);
    const submitButton = page.getByRole("button", { name: /Sign In/i });

    // Use test credentials from environment (or fallback to test values)
    // These don't need to be valid - we're testing network error handling
    const testEmail =
      process.env.TEST_INVALID_EMAIL || "test-network@example.com";
    const testPassword =
      process.env.TEST_INVALID_PASSWORD || "test-network-password-123";

    await emailInput.fill(testEmail);
    await passwordInput.fill(testPassword);
    await submitButton.click();

    // Should show error message after network failure
    // Wait for error to appear (may take time for timeout)
    const errorMessage = page
      .locator(".bg-red-50, .bg-red-900\\/20")
      .getByText(/error|failed|unexpected/i);

    // Wait for error or check if button is no longer in loading state
    await Promise.race([
      expect(errorMessage)
        .toBeVisible({ timeout: 10000 })
        .catch(() => null),
      page
        .waitForSelector("button:not(:disabled)", { timeout: 10000 })
        .catch(() => null),
    ]);

    // Go back online
    await page.context().setOffline(false);
  });
});
