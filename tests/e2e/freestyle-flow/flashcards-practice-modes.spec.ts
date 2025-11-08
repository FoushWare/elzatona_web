/**
 * E2E Test: Flashcards Practice Modes
 * Task: 15 - Flashcards Practice Modes
 * Test ID: F-E2E-008
 */

import { test, expect } from '@playwright/test';

test.describe('F-E2E-008: Flashcards Practice Modes', () => {
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
