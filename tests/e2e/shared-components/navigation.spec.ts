/**
 * E2E Test: Complete navigation flow (S-E2E-001)
 * Task: S-001 - Navigation Component
 */

import { test, expect } from '@playwright/test';

test.describe('S-E2E-001: Complete navigation flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display navigation on homepage', async ({ page }) => {
    // Verify navigation is visible
    const navigation = page.locator('nav');
    await expect(navigation).toBeVisible();
    
    // Verify logo is visible
    const logo = page.getByText(/Elzatona/i);
    await expect(logo).toBeVisible();
  });

  test('should navigate to different pages via navigation links', async ({ page }) => {
    // Test Guided Learning link
    const guidedLink = page.getByRole('link', { name: /Guided Learning/i });
    if (await guidedLink.isVisible()) {
      await guidedLink.click();
      await expect(page).toHaveURL(/\/features\/guided-learning|\/guided/i);
    }
    
    // Go back and test Practice link
    await page.goto('/');
    const practiceLink = page.getByRole('link', { name: /Practice/i });
    if (await practiceLink.isVisible()) {
      await practiceLink.click();
      await expect(page).toHaveURL(/\/practice/i);
    }
  });

  test('should toggle dark mode', async ({ page }) => {
    // Find dark mode toggle button
    const darkModeToggle = page.getByRole('button', { name: /Toggle dark mode/i });
    
    if (await darkModeToggle.isVisible()) {
      // Get initial theme
      const initialTheme = await page.evaluate(() => {
        return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
      });
      
      // Click toggle
      await darkModeToggle.click();
      await page.waitForTimeout(500);
      
      // Verify theme changed
      const newTheme = await page.evaluate(() => {
        return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
      });
      
      expect(newTheme).not.toBe(initialTheme);
    }
  });

  test('should have working logo link to homepage', async ({ page }) => {
    // Navigate away from homepage
    await page.goto('/get-started');
    
    // Click logo
    const logo = page.getByText(/Elzatona/i).first();
    if (await logo.isVisible()) {
      await logo.click();
      await expect(page).toHaveURL('/');
    }
  });

  test('should display navigation on different pages', async ({ page }) => {
    const pages = ['/get-started', '/browse-practice-questions'];
    
    for (const pagePath of pages) {
      await page.goto(pagePath);
      const navigation = page.locator('nav');
      await expect(navigation).toBeVisible({ timeout: 5000 });
    }
  });
});

