// v1.0
import { test, expect } from '@playwright/test';

test('guided learning entry', async ({ page }) => {
  await page.goto('/features/guided-learning');
  await expect(page).toHaveURL(/features\/guided-learning/);
  // Expect at least one plan card CTA exists (data-testid)
  await expect(
    page.locator('[data-testid="guided-plan-start-cta"]').first()
  ).toBeVisible({
    timeout: 5000,
  });
});
