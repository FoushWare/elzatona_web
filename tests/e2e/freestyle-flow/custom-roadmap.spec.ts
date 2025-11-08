/**
 * E2E Test: Custom Roadmap Creation
 * Task: 8
 */

import { test, expect } from '@playwright/test';

test.describe('8: Custom Roadmap Creation', () => {
  test('should load page correctly', async ({ page }) => {
    await page.goto('/custom-roadmap');
    await expect(page).toHaveURL(/.*custom-roadmap.*/);
  });
});
