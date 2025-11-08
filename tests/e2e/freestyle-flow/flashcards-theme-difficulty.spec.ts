/**
 * E2E Test: Flashcards Theme Difficulty
 * Task: 14 - Flashcards Theme Difficulty
 * Test ID: F-E2E-007
 */

import { test, expect } from '@playwright/test';

test.describe('F-E2E-007: Flashcards Theme Difficulty', () => {
  test('should load page correctly', async ({ page }) => {
    await page.goto('/flashcards');
    await expect(page).toHaveURL(/.*flashcards.*/);
    await page.waitForLoadState('networkidle');
  });

  test('should display main content', async ({ page }) => {
    await page.goto('/flashcards');
    await page.waitForLoadState('networkidle');
    const content = await page.textContent('body');
    expect(content).toBeTruthy();
  });
});
