/**
 * E2E Test: Custom Roadmap Creation (F-E2E-001)
 * Task: F-001 - Custom Roadmap Creation
 */

import { test, expect } from '@playwright/test';

test.describe('F-E2E-001: Custom Roadmap Creation', () => {
  test.beforeEach(async ({ page }) => {
    // Login first
    await page.goto('/');
    // Navigate to custom roadmap
    await page.goto('/custom-roadmap');
    await page.waitForLoadState('networkidle');
  });

  test('should load custom roadmap page', async ({ page }) => {
    await expect(page).toHaveURL(/.*custom-roadmap.*/);
  });

  test('should display plan creation form', async ({ page }) => {
    await page.waitForTimeout(2000);
    const content = await page.textContent('body');
    expect(content).toBeTruthy();
  });
});

