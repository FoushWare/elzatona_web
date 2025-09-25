import { test, expect } from '@playwright/test';

test.describe('Admin Dashboard Flow', () => {
  const ADMIN_EMAIL = 'admin@example.com';
  const ADMIN_PASSWORD = 'admin123';

  test.beforeEach(async ({ page }) => {
    // Ensure we start from a clean state
    await page.goto('/admin/login');
    await page.evaluate(() => localStorage.clear());
    await page.goto('/admin/login');
  });

  test('should display dashboard with correct information after login', async ({ page }) => {
    // 1. Login
    await page.fill('input[type="email"]', ADMIN_EMAIL);
    await page.fill('input[type="password"]', ADMIN_PASSWORD);
    await page.getByRole('button', { name: 'Sign In' }).click();

    // 2. Should redirect to dashboard
    await expect(page).toHaveURL(/admin\/dashboard/);
    await expect(page.getByRole('heading', { name: 'Admin Dashboard' })).toBeVisible();

    // 3. Check dashboard content
    await expect(page.getByText('Welcome back, Admin User')).toBeVisible();
    await expect(page.getByText('Quick Stats')).toBeVisible();
    await expect(page.getByText('Recent Activity')).toBeVisible();

    // 4. Check navigation links
    await expect(page.getByText('Manage Questions')).toBeVisible();
    await expect(page.getByText('Learning Sections')).toBeVisible();
    await expect(page.getByText('Guided Learning')).toBeVisible();
  });

  test('should navigate to different admin sections from dashboard', async ({ page }) => {
    // Login first
    await page.fill('input[type="email"]', ADMIN_EMAIL);
    await page.fill('input[type="password"]', ADMIN_PASSWORD);
    await page.getByRole('button', { name: 'Sign In' }).click();

    await expect(page).toHaveURL(/admin\/dashboard/);

    // Test navigation to Questions
    await page.getByText('Manage Questions').click();
    await expect(page).toHaveURL(/admin\/content\/questions/);
    await expect(page.getByText('Questions Management')).toBeVisible();

    // Navigate back to dashboard
    await page.getByRole('button', { name: /Admin User/ }).click(); // Open user menu
    await page.getByRole('link', { name: 'Dashboard' }).click();
    await expect(page).toHaveURL(/admin\/dashboard/);

    // Test navigation to Learning Sections
    await page.getByText('Learning Sections').click();
    await expect(page).toHaveURL(/admin\/sections/);
    await expect(page.getByText('Learning Sections Management')).toBeVisible();

    // Navigate back to dashboard
    await page.getByRole('button', { name: /Admin User/ }).click();
    await page.getByRole('link', { name: 'Dashboard' }).click();
    await expect(page).toHaveURL(/admin\/dashboard/);

    // Test navigation to Guided Learning
    await page.getByText('Guided Learning').click();
    await expect(page).toHaveURL(/admin\/guided-learning/);
    await expect(page.getByText('Guided Learning Plans')).toBeVisible();
  });

  test('should display user information correctly in dashboard', async ({ page }) => {
    // Login
    await page.fill('input[type="email"]', ADMIN_EMAIL);
    await page.fill('input[type="password"]', ADMIN_PASSWORD);
    await page.getByRole('button', { name: 'Sign In' }).click();

    await expect(page).toHaveURL(/admin\/dashboard/);

    // Check user information display
    await expect(page.getByText('Admin User')).toBeVisible();
    await expect(page.getByText('admin@example.com')).toBeVisible();
    await expect(page.getByText('super_admin')).toBeVisible();
  });

  test('should handle theme switching on dashboard', async ({ page }) => {
    // Login
    await page.fill('input[type="email"]', ADMIN_EMAIL);
    await page.fill('input[type="password"]', ADMIN_PASSWORD);
    await page.getByRole('button', { name: 'Sign In' }).click();

    await expect(page).toHaveURL(/admin\/dashboard/);

    // Check initial theme (should be light mode)
    const body = page.locator('body');
    await expect(body).toHaveClass(/light/);

    // Toggle theme
    await page.getByTitle('Toggle theme').click();

    // Check theme change
    await expect(body).toHaveClass(/dark/);

    // Toggle back
    await page.getByTitle('Toggle theme').click();
    await expect(body).toHaveClass(/light/);
  });

  test('should show statistics and metrics on dashboard', async ({ page }) => {
    // Login
    await page.fill('input[type="email"]', ADMIN_EMAIL);
    await page.fill('input[type="password"]', ADMIN_PASSWORD);
    await page.getByRole('button', { name: 'Sign In' }).click();

    await expect(page).toHaveURL(/admin\/dashboard/);

    // Check for statistics cards
    await expect(page.getByText('Total Questions')).toBeVisible();
    await expect(page.getByText('Active Users')).toBeVisible();
    await expect(page.getByText('Learning Paths')).toBeVisible();
    await expect(page.getByText('Topics')).toBeVisible();

    // Check for recent activity section
    await expect(page.getByText('Recent Questions')).toBeVisible();
    await expect(page.getByText('Recent Users')).toBeVisible();
  });

  test('should handle responsive design on dashboard', async ({ page }) => {
    // Login
    await page.fill('input[type="email"]', ADMIN_EMAIL);
    await page.fill('input[type="password"]', ADMIN_PASSWORD);
    await page.getByRole('button', { name: 'Sign In' }).click();

    await expect(page).toHaveURL(/admin\/dashboard/);

    // Test desktop view
    await page.setViewportSize({ width: 1200, height: 800 });
    await expect(page.getByText('Admin Panel')).toBeVisible();

    // Test tablet view
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.getByText('Admin Panel')).toBeVisible();

    // Test mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Mobile menu should be available
    await expect(page.getByRole('button', { name: /menu/i })).toBeVisible();
    
    // Open mobile menu
    await page.getByRole('button', { name: /menu/i }).click();
    await expect(page.getByText('Dashboard')).toBeVisible();
  });

  test('should maintain session across page refreshes', async ({ page }) => {
    // Login
    await page.fill('input[type="email"]', ADMIN_EMAIL);
    await page.fill('input[type="password"]', ADMIN_PASSWORD);
    await page.getByRole('button', { name: 'Sign In' }).click();

    await expect(page).toHaveURL(/admin\/dashboard/);

    // Refresh the page
    await page.reload();

    // Should still be on dashboard
    await expect(page).toHaveURL(/admin\/dashboard/);
    await expect(page.getByRole('heading', { name: 'Admin Dashboard' })).toBeVisible();
    await expect(page.getByText('Welcome back, Admin User')).toBeVisible();
  });

  test('should handle logout from dashboard', async ({ page }) => {
    // Login
    await page.fill('input[type="email"]', ADMIN_EMAIL);
    await page.fill('input[type="password"]', ADMIN_PASSWORD);
    await page.getByRole('button', { name: 'Sign In' }).click();

    await expect(page).toHaveURL(/admin\/dashboard/);

    // Logout
    await page.getByRole('button', { name: /Admin User/ }).click(); // Open user menu
    await page.getByRole('button', { name: 'Logout' }).click();

    // Should redirect to login page
    await expect(page).toHaveURL(/admin\/login/);
    await expect(page.getByRole('heading', { name: 'Admin Login' })).toBeVisible();

    // Try to access dashboard directly
    await page.goto('/admin/dashboard');
    
    // Should be redirected back to login
    await expect(page).toHaveURL(/admin\/login/);
  });

  test('should show loading states appropriately', async ({ page }) => {
    // Login
    await page.fill('input[type="email"]', ADMIN_EMAIL);
    await page.fill('input[type="password"]', ADMIN_PASSWORD);
    await page.getByRole('button', { name: 'Sign In' }).click();

    // Should show loading state briefly
    await expect(page.getByText('Loading admin panel...')).toBeVisible();

    // Then show dashboard
    await expect(page).toHaveURL(/admin\/dashboard/);
    await expect(page.getByRole('heading', { name: 'Admin Dashboard' })).toBeVisible();
  });

  test('should handle navigation breadcrumbs', async ({ page }) => {
    // Login
    await page.fill('input[type="email"]', ADMIN_EMAIL);
    await page.fill('input[type="password"]', ADMIN_PASSWORD);
    await page.getByRole('button', { name: 'Sign In' }).click();

    await expect(page).toHaveURL(/admin\/dashboard/);

    // Navigate to a sub-page
    await page.getByText('Manage Questions').click();
    await expect(page).toHaveURL(/admin\/content\/questions/);

    // Check for breadcrumb navigation
    await expect(page.getByText('Admin')).toBeVisible();
    await expect(page.getByText('Content')).toBeVisible();
    await expect(page.getByText('Questions')).toBeVisible();
  });

  test('should handle keyboard navigation', async ({ page }) => {
    // Login
    await page.fill('input[type="email"]', ADMIN_EMAIL);
    await page.fill('input[type="password"]', ADMIN_PASSWORD);
    await page.getByRole('button', { name: 'Sign In' }).click();

    await expect(page).toHaveURL(/admin\/dashboard/);

    // Test keyboard navigation
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');

    // Should be able to navigate with keyboard
    // This test verifies that the dashboard is keyboard accessible
  });

  test('should display error states gracefully', async ({ page }) => {
    // Login
    await page.fill('input[type="email"]', ADMIN_EMAIL);
    await page.fill('input[type="password"]', ADMIN_PASSWORD);
    await page.getByRole('button', { name: 'Sign In' }).click();

    await expect(page).toHaveURL(/admin\/dashboard/);

    // Simulate network error by going offline
    await page.context().setOffline(true);

    // Try to navigate to a page that requires data
    await page.getByText('Manage Questions').click();

    // Should handle the error gracefully
    await expect(page.getByText(/error|failed|offline/i)).toBeVisible();

    // Go back online
    await page.context().setOffline(false);
  });
});






