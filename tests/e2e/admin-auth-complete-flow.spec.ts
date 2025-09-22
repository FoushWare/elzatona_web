import { test, expect } from '@playwright/test';

test.describe('Admin Authentication Complete Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Clear any existing session
    await page.context().clearCookies();
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
  });

  test('should handle complete login flow without infinite redirects', async ({ page }) => {
    // Navigate to admin login page
    await page.goto('/admin/login');
    
    // Wait for page to load
    await expect(page.locator('h1')).toContainText('Admin Login');
    
    // Fill in credentials
    await page.fill('input[type="email"]', 'admin@example.com');
    await page.fill('input[type="password"]', 'admin123');
    
    // Submit form
    await page.click('button[type="submit"]');
    
    // Wait for redirect to dashboard
    await page.waitForURL('/admin/dashboard', { timeout: 10000 });
    
    // Verify we're on dashboard
    await expect(page.locator('h1')).toContainText('Admin Dashboard');
    
    // Verify no infinite redirects by checking URL stability
    await page.waitForTimeout(2000);
    expect(page.url()).toBe('http://localhost:3000/admin/dashboard');
  });

  test('should redirect unauthenticated users to login', async ({ page }) => {
    // Try to access protected admin route
    await page.goto('/admin/dashboard');
    
    // Should redirect to login
    await page.waitForURL('/admin/login', { timeout: 5000 });
    await expect(page.locator('h1')).toContainText('Admin Login');
  });

  test('should redirect authenticated users from login to dashboard', async ({ page }) => {
    // Login first
    await page.goto('/admin/login');
    await page.fill('input[type="email"]', 'admin@example.com');
    await page.fill('input[type="password"]', 'admin123');
    await page.click('button[type="submit"]');
    await page.waitForURL('/admin/dashboard');
    
    // Now try to access login page again
    await page.goto('/admin/login');
    
    // Should redirect back to dashboard
    await page.waitForURL('/admin/dashboard', { timeout: 5000 });
  });

  test('should handle logout correctly', async ({ page }) => {
    // Login first
    await page.goto('/admin/login');
    await page.fill('input[type="email"]', 'admin@example.com');
    await page.fill('input[type="password"]', 'admin123');
    await page.click('button[type="submit"]');
    await page.waitForURL('/admin/dashboard');
    
    // Click on user menu
    await page.click('button:has-text("admin@example.com")');
    
    // Click logout
    await page.click('button:has-text("Logout")');
    
    // Should redirect to login
    await page.waitForURL('/admin/login', { timeout: 5000 });
    await expect(page.locator('h1')).toContainText('Admin Login');
    
    // Verify session is cleared
    const localStorage = await page.evaluate(() => localStorage.getItem('admin_session'));
    expect(localStorage).toBeNull();
  });

  test('should handle /admin root route correctly', async ({ page }) => {
    // Test unauthenticated access to /admin
    await page.goto('/admin');
    await page.waitForURL('/admin/login', { timeout: 5000 });
    
    // Login and test authenticated access to /admin
    await page.fill('input[type="email"]', 'admin@example.com');
    await page.fill('input[type="password"]', 'admin123');
    await page.click('button[type="submit"]');
    await page.waitForURL('/admin/dashboard');
    
    // Now test /admin route when authenticated
    await page.goto('/admin');
    await page.waitForURL('/admin/dashboard', { timeout: 5000 });
  });

  test('should prevent infinite redirect loops', async ({ page }) => {
    // Monitor console for errors
    const consoleErrors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });
    
    // Navigate to login and perform login
    await page.goto('/admin/login');
    await page.fill('input[type="email"]', 'admin@example.com');
    await page.fill('input[type="password"]', 'admin123');
    await page.click('button[type="submit"]');
    
    // Wait for stable navigation
    await page.waitForURL('/admin/dashboard', { timeout: 10000 });
    
    // Wait additional time to ensure no redirects
    await page.waitForTimeout(3000);
    
    // Verify URL is stable
    expect(page.url()).toBe('http://localhost:3000/admin/dashboard');
    
    // Check for redirect-related errors
    const redirectErrors = consoleErrors.filter(error => 
      error.includes('redirect') || error.includes('navigation')
    );
    expect(redirectErrors).toHaveLength(0);
  });

  test('should handle session expiration gracefully', async ({ page }) => {
    // Login first
    await page.goto('/admin/login');
    await page.fill('input[type="email"]', 'admin@example.com');
    await page.fill('input[type="password"]', 'admin123');
    await page.click('button[type="submit"]');
    await page.waitForURL('/admin/dashboard');
    
    // Simulate expired session by clearing localStorage
    await page.evaluate(() => {
      localStorage.removeItem('admin_session');
    });
    
    // Try to navigate to another admin page
    await page.goto('/admin/content/questions');
    
    // Should redirect to login
    await page.waitForURL('/admin/login', { timeout: 5000 });
  });

  test('should maintain authentication state across page refreshes', async ({ page }) => {
    // Login first
    await page.goto('/admin/login');
    await page.fill('input[type="email"]', 'admin@example.com');
    await page.fill('input[type="password"]', 'admin123');
    await page.click('button[type="submit"]');
    await page.waitForURL('/admin/dashboard');
    
    // Refresh the page
    await page.reload();
    
    // Should still be on dashboard
    await expect(page.locator('h1')).toContainText('Admin Dashboard');
    expect(page.url()).toBe('http://localhost:3000/admin/dashboard');
  });

  test('should handle mobile logout correctly', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Login first
    await page.goto('/admin/login');
    await page.fill('input[type="email"]', 'admin@example.com');
    await page.fill('input[type="password"]', 'admin123');
    await page.click('button[type="submit"]');
    await page.waitForURL('/admin/dashboard');
    
    // Open mobile menu
    await page.click('button[aria-label="Menu"], button:has(svg)');
    
    // Click logout in mobile menu
    await page.click('button:has-text("Logout")');
    
    // Should redirect to login
    await page.waitForURL('/admin/login', { timeout: 5000 });
  });
});


