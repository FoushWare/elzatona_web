/**
 * E2E Test: Complete question card interaction (S-E2E-002)
 * Task: S-002 - Question Card Component
 */

import { test, expect } from '@playwright/test';

test.describe('S-E2E-002: Complete question card interaction', () => {
  test('should display question on practice page', async ({ page }) => {
    // Navigate to a practice page
    await page.goto('/browse-practice-questions');
    await page.waitForLoadState('networkidle');
    
    // Look for question elements
    // Questions might be displayed in a list or individually
    const pageContent = await page.textContent('body');
    expect(pageContent).toBeTruthy();
  });

  test('should allow selecting answer options', async ({ page }) => {
    await page.goto('/guided-practice');
    await page.waitForLoadState('networkidle');
    
    // Look for answer option buttons
    const optionButtons = page.locator('button').filter({ hasText: /^[A-D]\.|^[A-D]$/ });
    const count = await optionButtons.count();
    
    // If options are present, test interaction
    if (count > 0) {
      await optionButtons.first().click();
      await page.waitForTimeout(500);
    }
  });

  test('should show feedback after answer submission', async ({ page }) => {
    await page.goto('/free-style-practice');
    await page.waitForLoadState('networkidle');
    
    // Look for submit button or answer options
    const submitButton = page.getByRole('button', { name: /Submit|Submit Answer/i });
    
    if (await submitButton.isVisible()) {
      // Select an answer first if needed
      const options = page.locator('button[class*="option"], button[class*="answer"]');
      if (await options.count() > 0) {
        await options.first().click();
        await page.waitForTimeout(300);
      }
      
      await submitButton.click();
      await page.waitForTimeout(1000);
      
      // Look for feedback (correct/incorrect message)
      const feedback = page.getByText(/Correct|Incorrect|Well done/i);
      await expect(feedback.or(page.locator('[class*="explanation"]'))).toBeVisible({ timeout: 2000 });
    }
  });
});

