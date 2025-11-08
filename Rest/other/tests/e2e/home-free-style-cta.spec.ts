import { test, expect } from '@playwright/test';

test.describe('Home free-style CTA routes to /free-style', () => {
  test('free-style card navigates to /free-style', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL('/');
    // Click the Free Style Learning card
    await page.getByRole('link', { name: /Free Style Learning/i }).click();
    await expect(page).toHaveURL('/free-style');
  });
});
