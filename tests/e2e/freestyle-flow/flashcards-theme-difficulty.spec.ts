/**
 * E2E Test: Flashcards Theme Difficulty
 * Task: 14
 */

import { test, expect } from '@playwright/test';

test.describe('14: Flashcards Theme Difficulty', () => {
  test('should load page correctly', async ({ page }) => {
    await page.goto('/flashcards');
    await expect(page).toHaveURL(/.*flashcards.*/);
  });
});
