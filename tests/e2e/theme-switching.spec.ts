import { test, expect } from '@playwright/test';

test.describe('Theme Switching E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test
    await page.goto('http://localhost:3000/admin/login');
    await page.evaluate(() => localStorage.clear());
  });

  test('should toggle between light and dark themes', async ({ page }) => {
    await page.goto('http://localhost:3000/admin/login');

    // Wait for the page to load
    await page.waitForSelector('[data-testid="admin-login-form"], form', {
      timeout: 10000,
    });

    // Find the theme toggle button
    const themeToggle = page.locator('button[aria-label="Toggle theme"]');
    await expect(themeToggle).toBeVisible();

    // Check initial theme (should be dark by default)
    const body = page.locator('body');
    await expect(body).toHaveClass(/.*/); // Body should have some classes

    // Click the theme toggle button
    await themeToggle.click();

    // Wait for theme change to take effect
    await page.waitForTimeout(500);

    // Verify theme has changed by checking localStorage
    const theme = await page.evaluate(() => localStorage.getItem('theme'));
    expect(theme).toBe('light');

    // Click again to toggle back to dark
    await themeToggle.click();
    await page.waitForTimeout(500);

    // Verify theme has changed back
    const themeAfterToggle = await page.evaluate(() =>
      localStorage.getItem('theme')
    );
    expect(themeAfterToggle).toBe('dark');
  });

  test('should persist theme across page reloads', async ({ page }) => {
    await page.goto('http://localhost:3000/admin/login');

    // Wait for the page to load
    await page.waitForSelector('button[aria-label="Toggle theme"]', {
      timeout: 10000,
    });

    // Set theme to light mode
    const themeToggle = page.locator('button[aria-label="Toggle theme"]');
    await themeToggle.click();
    await page.waitForTimeout(500);

    // Verify theme is saved
    let theme = await page.evaluate(() => localStorage.getItem('theme'));
    expect(theme).toBe('light');

    // Reload the page
    await page.reload();
    await page.waitForSelector('button[aria-label="Toggle theme"]', {
      timeout: 10000,
    });

    // Verify theme is still light after reload
    theme = await page.evaluate(() => localStorage.getItem('theme'));
    expect(theme).toBe('light');

    // Toggle to dark mode
    await themeToggle.click();
    await page.waitForTimeout(500);

    // Reload again
    await page.reload();
    await page.waitForSelector('button[aria-label="Toggle theme"]', {
      timeout: 10000,
    });

    // Verify theme is still dark after reload
    theme = await page.evaluate(() => localStorage.getItem('theme'));
    expect(theme).toBe('dark');
  });

  test('should show correct icon for current theme', async ({ page }) => {
    await page.goto('http://localhost:3000/admin/login');

    // Wait for the page to load
    await page.waitForSelector('button[aria-label="Toggle theme"]', {
      timeout: 10000,
    });

    const themeToggle = page.locator('button[aria-label="Toggle theme"]');

    // Initially should show sun icon (dark mode)
    const sunIcon = themeToggle.locator('svg.lucide-sun');
    await expect(sunIcon).toBeVisible();

    // Toggle to light mode
    await themeToggle.click();
    await page.waitForTimeout(500);

    // Should now show moon icon (light mode)
    const moonIcon = themeToggle.locator('svg.lucide-moon');
    await expect(moonIcon).toBeVisible();

    // Toggle back to dark mode
    await themeToggle.click();
    await page.waitForTimeout(500);

    // Should show sun icon again
    await expect(sunIcon).toBeVisible();
  });

  test('should apply theme classes to document root', async ({ page }) => {
    await page.goto('http://localhost:3000/admin/login');

    // Wait for the page to load
    await page.waitForSelector('button[aria-label="Toggle theme"]', {
      timeout: 10000,
    });

    // Check initial state (dark mode)
    const htmlElement = page.locator('html');
    await expect(htmlElement).toHaveClass(/dark/);

    // Toggle to light mode
    const themeToggle = page.locator('button[aria-label="Toggle theme"]');
    await themeToggle.click();
    await page.waitForTimeout(500);

    // Check that light class is applied
    await expect(htmlElement).toHaveClass(/light/);

    // Toggle back to dark mode
    await themeToggle.click();
    await page.waitForTimeout(500);

    // Check that dark class is applied again
    await expect(htmlElement).toHaveClass(/dark/);
  });

  test('should work on different admin pages', async ({ page }) => {
    // Test on login page
    await page.goto('http://localhost:3000/admin/login');
    await page.waitForSelector('button[aria-label="Toggle theme"]', {
      timeout: 10000,
    });

    const themeToggle = page.locator('button[aria-label="Toggle theme"]');
    await themeToggle.click();
    await page.waitForTimeout(500);

    let theme = await page.evaluate(() => localStorage.getItem('theme'));
    expect(theme).toBe('light');

    // Navigate to admin root page
    await page.goto('http://localhost:3000/admin');
    await page.waitForTimeout(2000); // Wait for redirect

    // Theme should be preserved
    theme = await page.evaluate(() => localStorage.getItem('theme'));
    expect(theme).toBe('light');
  });

  test('should handle rapid theme toggles', async ({ page }) => {
    await page.goto('http://localhost:3000/admin/login');

    // Wait for the page to load
    await page.waitForSelector('button[aria-label="Toggle theme"]', {
      timeout: 10000,
    });

    const themeToggle = page.locator('button[aria-label="Toggle theme"]');

    // Rapidly click the toggle button multiple times
    for (let i = 0; i < 5; i++) {
      await themeToggle.click();
      await page.waitForTimeout(100);
    }

    // Wait for final state to settle
    await page.waitForTimeout(500);

    // Should have a consistent theme state
    const theme = await page.evaluate(() => localStorage.getItem('theme'));
    expect(['light', 'dark']).toContain(theme);
  });

  test('should maintain theme during navigation', async ({ page }) => {
    await page.goto('http://localhost:3000/admin/login');

    // Wait for the page to load
    await page.waitForSelector('button[aria-label="Toggle theme"]', {
      timeout: 10000,
    });

    // Set theme to light
    const themeToggle = page.locator('button[aria-label="Toggle theme"]');
    await themeToggle.click();
    await page.waitForTimeout(500);

    // Navigate to home page
    const homeLink = page.locator('a[href="/"]');
    await homeLink.click();
    await page.waitForTimeout(1000);

    // Navigate back to admin login
    await page.goto('http://localhost:3000/admin/login');
    await page.waitForSelector('button[aria-label="Toggle theme"]', {
      timeout: 10000,
    });

    // Theme should still be light
    const theme = await page.evaluate(() => localStorage.getItem('theme'));
    expect(theme).toBe('light');
  });
});
