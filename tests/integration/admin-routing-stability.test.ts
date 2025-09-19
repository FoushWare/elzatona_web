import { test, expect } from '@playwright/test';

test.describe('Admin Routing Stability', () => {
  test('should maintain admin login route stability during development', async ({
    page,
  }) => {
    // This test specifically addresses the git hooks issue that was causing
    // the admin login page to show 404 errors due to server restarts

    // Navigate to admin login page
    await page.goto('/admin/login');

    // Wait for page to fully load
    await page.waitForLoadState('networkidle');

    // Verify we're on the correct page
    await expect(page).toHaveURL('/admin/login');

    // Check that the page content is correct (not 404)
    await expect(page.getByText('Admin Access Portal')).toBeVisible();
    await expect(page.getByText('Page Not Found')).not.toBeVisible();

    // Simulate multiple rapid requests (like what happens during development)
    for (let i = 0; i < 5; i++) {
      await page.reload();
      await page.waitForLoadState('networkidle');

      // Each reload should still show the admin login page
      await expect(page).toHaveURL('/admin/login');
      await expect(page.getByText('Admin Access Portal')).toBeVisible();
      await expect(page.getByText('Page Not Found')).not.toBeVisible();

      // Small delay to simulate real usage
      await page.waitForTimeout(100);
    }
  });

  test('should handle admin layout authentication flow correctly', async ({
    page,
  }) => {
    // Test the admin layout's authentication logic

    // First, try to access a protected admin route
    await page.goto('/admin/dashboard');
    await page.waitForLoadState('networkidle');

    // Should redirect to login page
    await expect(page).toHaveURL('/admin/login');
    await expect(page.getByText('Admin Access Portal')).toBeVisible();

    // Now navigate directly to login page
    await page.goto('/admin/login');
    await page.waitForLoadState('networkidle');

    // Should show login page without redirect loop
    await expect(page).toHaveURL('/admin/login');
    await expect(page.getByText('Admin Access Portal')).toBeVisible();
    await expect(page.getByText('Page Not Found')).not.toBeVisible();
  });

  test('should handle loading states without infinite loops', async ({
    page,
  }) => {
    // Test that loading states don't cause infinite loops

    await page.goto('/admin/login');

    // Wait for initial load
    await page.waitForLoadState('networkidle');

    // Check that we're not stuck in loading state
    await expect(page.getByText('Loading admin panel...')).not.toBeVisible();
    await expect(page.getByText('Admin Access Portal')).toBeVisible();

    // Simulate form submission to test loading states
    await page.fill('input[type="email"]', 'test@example.com');
    await page.fill('input[type="password"]', 'testpassword');

    // Submit form
    await page.click('button[type="submit"]');

    // Wait for response
    await page.waitForTimeout(3000);

    // Should not be stuck in loading state
    await expect(page.getByText('Loading admin panel...')).not.toBeVisible();

    // Should either show error or redirect (not stuck)
    const currentUrl = page.url();
    const hasError = await page
      .getByText(/invalid|error|failed/i)
      .isVisible()
      .catch(() => false);
    const isRedirected = currentUrl !== '/admin/login';

    // One of these should be true (not stuck in loading)
    expect(hasError || isRedirected).toBe(true);
  });

  test('should handle theme context integration without errors', async ({
    page,
  }) => {
    // Test that theme context doesn't cause routing issues

    await page.goto('/admin/login');
    await page.waitForLoadState('networkidle');

    // Check that theme toggle is present and functional
    const themeToggle = page.getByRole('button', { name: /theme|dark|light/i });
    await expect(themeToggle).toBeVisible();

    // Toggle theme multiple times
    for (let i = 0; i < 3; i++) {
      await themeToggle.click();
      await page.waitForTimeout(200);

      // Page should still be functional
      await expect(page.getByText('Admin Access Portal')).toBeVisible();
      await expect(page).toHaveURL('/admin/login');
    }
  });

  test('should handle network interruptions gracefully', async ({ page }) => {
    // Test behavior when network requests fail

    await page.goto('/admin/login');
    await page.waitForLoadState('networkidle');

    // Intercept and fail authentication requests
    await page.route('**/api/admin/auth', route => {
      route.abort('failed');
    });

    // Try to authenticate
    await page.fill('input[type="email"]', 'afouadsoftwareengineer@gmail.com');
    await page.fill('input[type="password"]', 'zatonafoushware$8888');
    await page.click('button[type="submit"]');

    // Wait for error handling
    await page.waitForTimeout(3000);

    // Should handle error gracefully
    await expect(page).toHaveURL('/admin/login');
    await expect(page.getByText('Admin Access Portal')).toBeVisible();

    // Should show error message
    const errorMessage = page.getByText(/network|connection|failed/i);
    await expect(errorMessage).toBeVisible();
  });

  test('should maintain session state correctly', async ({ page }) => {
    // Test session management

    await page.goto('/admin/login');
    await page.waitForLoadState('networkidle');

    // Check that we start unauthenticated
    await expect(page).toHaveURL('/admin/login');
    await expect(page.getByText('Admin Access Portal')).toBeVisible();

    // Try to access protected route
    await page.goto('/admin/dashboard');
    await page.waitForLoadState('networkidle');

    // Should redirect back to login
    await expect(page).toHaveURL('/admin/login');

    // Login page should still be functional
    await expect(page.getByText('Admin Access Portal')).toBeVisible();
  });

  test('should handle concurrent requests without conflicts', async ({
    page,
  }) => {
    // Test handling of multiple concurrent requests

    await page.goto('/admin/login');
    await page.waitForLoadState('networkidle');

    // Make multiple rapid requests
    const promises = [];
    for (let i = 0; i < 3; i++) {
      promises.push(page.goto('/admin/login'));
    }

    await Promise.all(promises);
    await page.waitForLoadState('networkidle');

    // Should still be on login page
    await expect(page).toHaveURL('/admin/login');
    await expect(page.getByText('Admin Access Portal')).toBeVisible();
    await expect(page.getByText('Page Not Found')).not.toBeVisible();
  });

  test('should handle browser refresh during authentication', async ({
    page,
  }) => {
    // Test behavior when page is refreshed during auth flow

    await page.goto('/admin/login');
    await page.waitForLoadState('networkidle');

    // Start authentication process
    await page.fill('input[type="email"]', 'afouadsoftwareengineer@gmail.com');
    await page.fill('input[type="password"]', 'zatonafoushware$8888');
    await page.click('button[type="submit"]');

    // Refresh page during authentication
    await page.waitForTimeout(1000);
    await page.reload();
    await page.waitForLoadState('networkidle');

    // Should return to login page
    await expect(page).toHaveURL('/admin/login');
    await expect(page.getByText('Admin Access Portal')).toBeVisible();
    await expect(page.getByText('Page Not Found')).not.toBeVisible();
  });

  test('should handle invalid routes gracefully', async ({ page }) => {
    // Test that invalid admin routes don't break the login page

    // Try invalid admin routes
    const invalidRoutes = [
      '/admin/invalid',
      '/admin/nonexistent',
      '/admin/undefined',
    ];

    for (const route of invalidRoutes) {
      await page.goto(route);
      await page.waitForLoadState('networkidle');

      // Should either redirect to login or show 404, but not break
      const currentUrl = page.url();
      const isLoginPage = currentUrl === '/admin/login';
      const is404Page = page
        .getByText('Page Not Found')
        .isVisible()
        .catch(() => false);

      // Should handle gracefully (either redirect to login or show 404)
      expect(isLoginPage || (await is404Page)).toBe(true);
    }

    // Login page should still work after invalid routes
    await page.goto('/admin/login');
    await page.waitForLoadState('networkidle');
    await expect(page.getByText('Admin Access Portal')).toBeVisible();
  });
});
