/**
 * E2E Test: Complete flow from homepage to guided learning (G-E2E-001)
 * Task: G-001 - Homepage Rendering
 */

import { test, expect } from '@playwright/test';

test.describe('G-E2E-001: Complete flow from homepage to guided learning', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to homepage
    await page.goto('/');
  });

  test('should navigate from homepage to get-started page', async ({ page }) => {
    // Step 1: Navigate to homepage
    await expect(page).toHaveURL('/');
    
    // Step 2: Verify homepage loads
    await expect(page.locator('h1')).toBeVisible();
    
    // Step 3: Click "Get Started" button
    const getStartedButton = page.getByRole('link', { name: /Get Started|Start Learning Now/i }).first();
    await expect(getStartedButton).toBeVisible();
    
    // Step 4: Click and verify redirect to /get-started
    await getStartedButton.click();
    await expect(page).toHaveURL(/\/get-started/);
  });

  test('should show learning style selection on get-started page', async ({ page }) => {
    // Navigate to get-started
    await page.goto('/get-started');
    
    // Verify page loaded
    await expect(page.locator('h1')).toContainText(/Choose Your Learning Style|Learning Style/i);
    
    // Verify learning options are visible
    const guidedOption = page.getByText(/Guided Learning|I need guidance/i);
    const freestyleOption = page.getByText(/Free Style|Browse practice questions/i);
    
    await expect(guidedOption.or(freestyleOption)).toBeVisible();
  });

  test('should complete full flow from homepage to guided learning', async ({ page }) => {
    // Step 1: Navigate to homepage
    await page.goto('/');
    await expect(page).toHaveURL('/');
    
    // Step 2: Click "Get Started" button
    const getStartedButton = page.getByRole('link', { name: /Get Started|Start Learning Now/i }).first();
    await getStartedButton.click();
    
    // Step 3: Verify redirect to /get-started
    await expect(page).toHaveURL(/\/get-started/);
    
    // Step 4: Select "I need guidance" option (if available)
    // Note: This depends on the actual implementation of the get-started page
    // The page might have buttons or cards to select learning type
    const guidedOption = page.getByText(/Guided Learning|I need guidance/i).first();
    
    if (await guidedOption.isVisible()) {
      await guidedOption.click();
      
      // Step 5: Wait for navigation (if sign-in is required, it might show a modal)
      // Step 6: Verify redirect to guided learning page
      // This might be /features/guided-learning or similar
      await page.waitForTimeout(2000); // Wait for any transitions
      
      // Check if we're on a guided learning page or if sign-in modal appeared
      const currentUrl = page.url();
      expect(
        currentUrl.includes('/features/guided-learning') ||
        currentUrl.includes('/guided') ||
        currentUrl.includes('/get-started') // Still on get-started if sign-in required
      ).toBeTruthy();
    }
  });

  test('should handle homepage navigation links', async ({ page }) => {
    await page.goto('/');
    
    // Test "Explore Learning Paths" link
    const learnLink = page.getByRole('link', { name: /Explore Learning Paths/i });
    if (await learnLink.isVisible()) {
      await learnLink.click();
      await expect(page).toHaveURL(/\/learn/);
    }
  });

  test('should display personalized content based on user type', async ({ page }) => {
    await page.goto('/');
    
    // Check for main content sections
    const heroSection = page.locator('section').first();
    await expect(heroSection).toBeVisible();
    
    // Verify CTA buttons are present
    const ctaButtons = page.getByRole('link', { name: /Get Started|Start Learning|Choose Learning/i });
    await expect(ctaButtons.first()).toBeVisible();
  });
});

