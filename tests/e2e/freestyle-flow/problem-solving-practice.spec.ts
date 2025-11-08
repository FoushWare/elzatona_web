/**
 * E2E Test: Problem Solving Practice
 * Task: 13 - Problem Solving Practice
 * Test ID: F-E2E-006
 */

import { test, expect } from '@playwright/test';

test.describe('F-E2E-006: Problem Solving Practice', () => {
  test('should load page correctly', async ({ page }) => {
    await page.goto('/problem-solving');
    await expect(page).toHaveURL(/.*problem-solving.*/);
    await page.waitForLoadState('networkidle');
  });

  test('should display main content', async ({ page }) => {
    await page.goto('/problem-solving');
    await page.waitForLoadState('networkidle');
    const content = await page.textContent('body');
    expect(content).toBeTruthy();
  });
});
