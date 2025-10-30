// v1.0
import { test, expect } from '@playwright/test';

test('custom plan: open cart and set metadata', async ({ page }) => {
  await page.goto('/free-style/cart');
  await page.fill('input[placeholder="My Custom Plan"]', 'My Interview Plan');
  await page.fill('input[type="number"]:below(:text("Duration (days)"))', '7');
  await page.fill(
    'input[type="number"]:below(:text("Questions per day"))',
    '5'
  );
  // Button exists
  await expect(page.getByRole('button', { name: 'Create Plan' })).toBeVisible();
});
