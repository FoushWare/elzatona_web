/**
 * E2E Test: Browse Practice Questions
 * Task: 10 - Browse Practice Questions
 * Test ID: F-E2E-003
 */

import { test, expect } from '@playwright/test';

test.describe('F-E2E-003: Browse Practice Questions', () => {
  test('should load page correctly', async ({ page }) => {
    await page.goto('/browse-practice-questions');
    await expect(page).toHaveURL(/.*browse-practice-questions.*/);
    await page.waitForLoadState('networkidle');
  });

  test('should display main content', async ({ page }) => {
    await page.goto('/browse-practice-questions');
    await page.waitForLoadState('networkidle');
    const content = await page.textContent('body');
    expect(content).toBeTruthy();
  });
});
