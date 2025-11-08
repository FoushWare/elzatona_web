/**
 * E2E Test: Flashcards CRUD Operations
 * Task: 16
 */

import { test, expect } from '@playwright/test';

test.describe('16: Flashcards CRUD Operations', () => {
  test('should load page correctly', async ({ page }) => {
    await page.goto('/flashcards');
    await expect(page).toHaveURL(/.*flashcards.*/);
  });
});
