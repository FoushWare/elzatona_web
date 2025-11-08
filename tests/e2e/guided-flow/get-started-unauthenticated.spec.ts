/**
 * E2E Test: Complete guided flow entry (unauthenticated user) (G-E2E-002)
 * Task: G-002 - Get Started Page
 */

import { test, expect } from '@playwright/test';

test.describe('G-E2E-002: Complete guided flow entry (unauthenticated user)', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to get-started page
    await page.goto('/get-started');
  });

  test('should navigate to get-started page', async ({ page }) => {
    await expect(page).toHaveURL(/\/get-started/);
    await expect(page.locator('h1')).toContainText(/Choose Your Learning Style/i);
  });

  test('should show both learning options', async ({ page }) => {
    // Verify both options are visible
    const guidedOption = page.getByText(/I need guidance/i);
    const selfDirectedOption = page.getByText(/I'm self-directed/i);
    
    await expect(guidedOption).toBeVisible();
    await expect(selfDirectedOption).toBeVisible();
  });

  test('should select "I need guidance" and navigate', async ({ page }) => {
    // Click "I need guidance" option
    const guidedOption = page.getByText(/I need guidance/i).locator('..').locator('..');
    await guidedOption.click();
    
    // Wait for loading transition
    await expect(page.getByText(/Loading your learning experience/i)).toBeVisible({ timeout: 2000 });
    
    // Wait for navigation (1500ms delay + navigation time)
    await page.waitForTimeout(2000);
    
    // Verify navigation to guided learning page
    const currentUrl = page.url();
    expect(
      currentUrl.includes('/features/guided-learning') ||
      currentUrl.includes('/guided')
    ).toBeTruthy();
  });

  test('should show selection feedback when option is clicked', async ({ page }) => {
    const guidedOption = page.getByText(/I need guidance/i).locator('..').locator('..');
    await guidedOption.click();
    
    // Wait for selection feedback
    await page.waitForTimeout(500);
    
    // Check for visual feedback (selected state or confirmation message)
    // The page might show "Great choice!" or highlight the selected option
    const feedback = page.getByText(/Great choice!/i).or(page.locator('[class*="border-indigo-500"]'));
    await expect(feedback.first()).toBeVisible({ timeout: 1000 });
  });
});

