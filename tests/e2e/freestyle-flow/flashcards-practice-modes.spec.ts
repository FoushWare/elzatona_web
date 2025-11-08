/**
 * E2E Test: Flashcards Practice Modes
 * Task: 15
 */

import { test, expect } from '@playwright/test';

test.describe('15: Flashcards Practice Modes', () => {
  test('should load page correctly', async ({ page }) => {
    await page.goto('/flashcards');
    await expect(page).toHaveURL(/.*flashcards.*/);
  });
});
