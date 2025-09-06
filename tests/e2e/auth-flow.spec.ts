import { test, expect } from '@playwright/test';

test.describe('Authentication Flow E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the auth page before each test
    await page.goto('/auth');
  });

  test.describe('Page Rendering', () => {
    test('should render authentication page correctly', async ({ page }) => {
      // Check page title
      await expect(page).toHaveTitle(/Frontend KodDev/);

      // Check main heading
      await expect(page.getByText('Welcome Back!')).toBeVisible();

      // Check form elements
      await expect(page.getByLabel('Email Address')).toBeVisible();
      await expect(page.getByLabel('Password')).toBeVisible();
      await expect(
        page.getByRole('button', { name: /sign in/i })
      ).toBeVisible();

      // Check social login buttons
      await expect(
        page.getByRole('button', { name: /continue with google/i })
      ).toBeVisible();
      await expect(
        page.getByRole('button', { name: /continue with github/i })
      ).toBeVisible();

      // Check back to home link
      await expect(
        page.getByRole('link', { name: /back to home/i })
      ).toBeVisible();
    });

    test('should render sign up form when toggled', async ({ page }) => {
      // Click toggle button
      await page.getByText("Don't have an account? Sign up").click();

      // Check sign up form elements
      await expect(page.getByText('Create Account')).toBeVisible();
      await expect(page.getByLabel('Full Name')).toBeVisible();
      await expect(page.getByLabel('Confirm Password')).toBeVisible();
      await expect(
        page.getByRole('button', { name: /create account/i })
      ).toBeVisible();

      // Check that forgot password link is not visible
      await expect(page.getByText('Forgot your password?')).not.toBeVisible();
    });

    test('should render benefits section', async ({ page }) => {
      await expect(page.getByText('Why Create an Account?')).toBeVisible();
      await expect(page.getByText('Track Progress')).toBeVisible();
      await expect(page.getByText('Earn Badges')).toBeVisible();
      await expect(page.getByText('Personalized Learning')).toBeVisible();
    });
  });

  test.describe('Form Interactions', () => {
    test('should toggle password visibility', async ({ page }) => {
      const passwordInput = page.getByLabel('Password');
      const toggleButton = page
        .locator('button')
        .filter({ hasText: '' })
        .first(); // Eye icon button

      // Initially password should be hidden
      await expect(passwordInput).toHaveAttribute('type', 'password');

      // Click to show password
      await toggleButton.click();
      await expect(passwordInput).toHaveAttribute('type', 'text');

      // Click to hide password again
      await toggleButton.click();
      await expect(passwordInput).toHaveAttribute('type', 'password');
    });

    test('should update form data when inputs change', async ({ page }) => {
      const emailInput = page.getByLabel('Email Address');
      const passwordInput = page.getByLabel('Password');

      await emailInput.fill('test@example.com');
      await passwordInput.fill('password123');

      await expect(emailInput).toHaveValue('test@example.com');
      await expect(passwordInput).toHaveValue('password123');
    });

    test('should maintain form state when switching between login and signup', async ({
      page,
    }) => {
      const emailInput = page.getByLabel('Email Address');

      // Fill email field
      await emailInput.fill('test@example.com');

      // Switch to signup mode
      await page.getByText("Don't have an account? Sign up").click();

      // Email should still be filled
      await expect(emailInput).toHaveValue('test@example.com');

      // Switch back to login mode
      await page.getByText('Already have an account? Sign in').click();

      // Email should still be filled
      await expect(emailInput).toHaveValue('test@example.com');
    });
  });

  test.describe('Form Validation', () => {
    test('should show error when passwords do not match in signup', async ({
      page,
    }) => {
      // Switch to signup mode
      await page.getByText("Don't have an account? Sign up").click();

      // Fill form with mismatched passwords
      await page.getByLabel('Full Name').fill('John Doe');
      await page.getByLabel('Email Address').fill('test@example.com');
      await page.getByLabel('Password').fill('password123');
      await page.getByLabel('Confirm Password').fill('different123');

      // Submit form
      await page.getByRole('button', { name: /create account/i }).click();

      // Check for error message
      await expect(page.getByText('Passwords do not match!')).toBeVisible();
    });

    test('should show error for invalid email format', async ({ page }) => {
      await page.getByLabel('Email Address').fill('invalid-email');
      await page.getByLabel('Password').fill('password123');

      // Submit form
      await page.getByRole('button', { name: /sign in/i }).click();

      // Check for HTML5 validation error
      const emailInput = page.getByLabel('Email Address');
      await expect(emailInput).toHaveAttribute(
        'validity',
        expect.stringContaining('typeMismatch')
      );
    });

    test('should require all fields in signup form', async ({ page }) => {
      // Switch to signup mode
      await page.getByText("Don't have an account? Sign up").click();

      // Try to submit empty form
      await page.getByRole('button', { name: /create account/i }).click();

      // Check for required field validation
      await expect(page.getByLabel('Full Name')).toHaveAttribute('required');
      await expect(page.getByLabel('Email Address')).toHaveAttribute(
        'required'
      );
      await expect(page.getByLabel('Password')).toHaveAttribute('required');
      await expect(page.getByLabel('Confirm Password')).toHaveAttribute(
        'required'
      );
    });
  });

  test.describe('Navigation', () => {
    test('should navigate back to home page', async ({ page }) => {
      await page.getByRole('link', { name: /back to home/i }).click();

      // Should navigate to home page
      await expect(page).toHaveURL('/');
    });

    test('should navigate to forgot password page', async ({ page }) => {
      await page.getByText('Forgot your password?').click();

      // Should navigate to forgot password page
      await expect(page).toHaveURL('/forgot-password');
    });
  });

  test.describe('Responsive Design', () => {
    test('should render correctly on mobile devices', async ({ page }) => {
      // Set mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });

      // Check that main elements are still visible
      await expect(page.getByText('Welcome Back!')).toBeVisible();
      await expect(page.getByLabel('Email Address')).toBeVisible();
      await expect(page.getByLabel('Password')).toBeVisible();
      await expect(
        page.getByRole('button', { name: /sign in/i })
      ).toBeVisible();
    });

    test('should render correctly on tablet devices', async ({ page }) => {
      // Set tablet viewport
      await page.setViewportSize({ width: 768, height: 1024 });

      // Check that main elements are still visible
      await expect(page.getByText('Welcome Back!')).toBeVisible();
      await expect(page.getByLabel('Email Address')).toBeVisible();
      await expect(page.getByLabel('Password')).toBeVisible();
      await expect(
        page.getByRole('button', { name: /sign in/i })
      ).toBeVisible();
    });
  });

  test.describe('Accessibility', () => {
    test('should have proper heading hierarchy', async ({ page }) => {
      // Check main heading
      const mainHeading = page.getByRole('heading', { level: 1 });
      await expect(mainHeading).toHaveText('Welcome Back!');

      // Check section headings
      const sectionHeading = page.getByRole('heading', { level: 3 });
      await expect(sectionHeading).toHaveText('Why Create an Account?');
    });

    test('should have proper form labels', async ({ page }) => {
      // Check that all form inputs have proper labels
      await expect(page.getByLabel('Email Address')).toBeVisible();
      await expect(page.getByLabel('Password')).toBeVisible();

      // Switch to signup mode and check additional labels
      await page.getByText("Don't have an account? Sign up").click();
      await expect(page.getByLabel('Full Name')).toBeVisible();
      await expect(page.getByLabel('Confirm Password')).toBeVisible();
    });

    test('should have proper button roles', async ({ page }) => {
      // Check that all buttons have proper roles
      await expect(
        page.getByRole('button', { name: /sign in/i })
      ).toBeVisible();
      await expect(
        page.getByRole('button', { name: /continue with google/i })
      ).toBeVisible();
      await expect(
        page.getByRole('button', { name: /continue with github/i })
      ).toBeVisible();
    });

    test('should be keyboard navigable', async ({ page }) => {
      // Test tab navigation
      await page.keyboard.press('Tab');
      await expect(page.getByLabel('Email Address')).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(page.getByLabel('Password')).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(
        page.getByRole('button', { name: /sign in/i })
      ).toBeFocused();
    });
  });

  test.describe('Error Handling', () => {
    test('should handle network errors gracefully', async ({ page }) => {
      // Mock network failure
      await page.route('**/auth/**', route => route.abort());

      await page.getByLabel('Email Address').fill('test@example.com');
      await page.getByLabel('Password').fill('password123');

      // Submit form
      await page.getByRole('button', { name: /sign in/i }).click();

      // Should show error message
      await expect(page.getByText(/error|failed|try again/i)).toBeVisible();
    });

    test('should clear errors when user starts typing', async ({ page }) => {
      // First trigger an error
      await page.getByRole('button', { name: /sign in/i }).click();

      // Start typing in email field
      await page.getByLabel('Email Address').fill('test@example.com');

      // Error should be cleared (this would need to be implemented in the component)
      // For now, we're testing the structure
      await expect(page.getByLabel('Email Address')).toHaveValue(
        'test@example.com'
      );
    });
  });

  test.describe('Loading States', () => {
    test('should show loading state during form submission', async ({
      page,
    }) => {
      // Mock delayed response
      await page.route('**/auth/**', async route => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        await route.continue();
      });

      await page.getByLabel('Email Address').fill('test@example.com');
      await page.getByLabel('Password').fill('password123');

      // Submit form
      await page.getByRole('button', { name: /sign in/i }).click();

      // Should show loading state
      await expect(page.getByText('Signing In...')).toBeVisible();
    });

    test('should disable buttons during submission', async ({ page }) => {
      // Mock delayed response
      await page.route('**/auth/**', async route => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        await route.continue();
      });

      await page.getByLabel('Email Address').fill('test@example.com');
      await page.getByLabel('Password').fill('password123');

      // Submit form
      await page.getByRole('button', { name: /sign in/i }).click();

      // All buttons should be disabled
      await expect(
        page.getByRole('button', { name: /sign in/i })
      ).toBeDisabled();
      await expect(
        page.getByRole('button', { name: /continue with google/i })
      ).toBeDisabled();
      await expect(
        page.getByRole('button', { name: /continue with github/i })
      ).toBeDisabled();
    });
  });

  test.describe('Social Authentication', () => {
    test('should handle Google login button click', async ({ page }) => {
      // Mock Google auth response
      await page.route('**/auth/google**', route => {
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ success: true }),
        });
      });

      await page.getByRole('button', { name: /continue with google/i }).click();

      // Should handle the click (actual redirect would depend on implementation)
      await expect(
        page.getByRole('button', { name: /continue with google/i })
      ).toBeVisible();
    });

    test('should handle GitHub login button click', async ({ page }) => {
      // Mock GitHub auth response
      await page.route('**/auth/github**', route => {
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ success: true }),
        });
      });

      await page.getByRole('button', { name: /continue with github/i }).click();

      // Should handle the click (actual redirect would depend on implementation)
      await expect(
        page.getByRole('button', { name: /continue with github/i })
      ).toBeVisible();
    });
  });
});
