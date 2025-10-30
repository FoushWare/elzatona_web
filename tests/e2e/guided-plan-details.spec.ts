// v1.0
import { test, expect } from '@playwright/test';

test('guided plan details page loads from listing', async ({ page }) => {
  await page.goto('/features/guided-learning');
  // Click the first plan card
  const firstCard = page.locator('[data-testid="guided-plan-card"]').first();
  await expect(firstCard).toBeVisible();
  await firstCard.click();
  // Navigates to a plan details route
  await expect(page).toHaveURL(/features\/guided-learning\//);
});
