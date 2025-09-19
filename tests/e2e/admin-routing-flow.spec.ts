import { test, expect } from '@playwright/test';

test.describe('Admin Routing Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Clear any existing admin session
    await page.goto('http://localhost:3000/admin');
    await page.evaluate(() => localStorage.removeItem('admin_session'));
  });

  test('should redirect unauthenticated user from /admin to /admin/login', async ({
    page,
  }) => {
    await page.goto('http://localhost:3000/admin');

    // Should show loading state briefly
    await expect(page.locator('text=Checking authentication...')).toBeVisible();

    // Should redirect to login page
    await page.waitForURL('**/admin/login', { timeout: 10000 });

    // Should show login form
    await expect(page.locator('text=Admin Login')).toBeVisible();
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
  });

  test('should redirect authenticated user from /admin to /admin/dashboard', async ({
    page,
  }) => {
    // First, login as admin
    await page.goto('http://localhost:3000/admin/login');

    // Fill in login form
    await page.fill('input[type="email"]', 'admin@zatona.com');
    await page.fill('input[type="password"]', 'zatonafoushware$8888');

    // Submit form
    await page.click('button[type="submit"]');

    // Wait for redirect to dashboard
    await page.waitForURL('**/admin/dashboard', { timeout: 10000 });

    // Verify we're on dashboard
    await expect(page.locator('text=Admin Dashboard')).toBeVisible();

    // Now test /admin route with authenticated user
    await page.goto('http://localhost:3000/admin');

    // Should show loading state briefly
    await expect(page.locator('text=Checking authentication...')).toBeVisible();

    // Should redirect to dashboard
    await page.waitForURL('**/admin/dashboard', { timeout: 10000 });

    // Should show dashboard
    await expect(page.locator('text=Admin Dashboard')).toBeVisible();
  });

  test('should handle direct navigation to /admin/dashboard without authentication', async ({
    page,
  }) => {
    await page.goto('http://localhost:3000/admin/dashboard');

    // Should redirect to login page
    await page.waitForURL('**/admin/login', { timeout: 10000 });

    // Should show login form
    await expect(page.locator('text=Admin Login')).toBeVisible();
  });

  test('should maintain authentication state across page reloads', async ({
    page,
  }) => {
    // Login first
    await page.goto('http://localhost:3000/admin/login');
    await page.fill('input[type="email"]', 'admin@zatona.com');
    await page.fill('input[type="password"]', 'zatonafoushware$8888');
    await page.click('button[type="submit"]');

    // Wait for dashboard
    await page.waitForURL('**/admin/dashboard', { timeout: 10000 });

    // Reload the page
    await page.reload();

    // Should still be on dashboard (not redirected to login)
    await expect(page.locator('text=Admin Dashboard')).toBeVisible();

    // Navigate to /admin and should redirect to dashboard
    await page.goto('http://localhost:3000/admin');
    await page.waitForURL('**/admin/dashboard', { timeout: 10000 });
    await expect(page.locator('text=Admin Dashboard')).toBeVisible();
  });

  test('should handle logout and redirect to login', async ({ page }) => {
    // Login first
    await page.goto('http://localhost:3000/admin/login');
    await page.fill('input[type="email"]', 'admin@zatona.com');
    await page.fill('input[type="password"]', 'zatonafoushware$8888');
    await page.click('button[type="submit"]');

    // Wait for dashboard
    await page.waitForURL('**/admin/dashboard', { timeout: 10000 });

    // Find and click logout button (assuming it exists in AdminNavbar)
    const logoutButton = page.locator(
      'button:has-text("Logout"), a:has-text("Logout")'
    );
    if ((await logoutButton.count()) > 0) {
      await logoutButton.click();

      // Should redirect to login
      await page.waitForURL('**/admin/login', { timeout: 10000 });
      await expect(page.locator('text=Admin Login')).toBeVisible();
    }
  });
});
