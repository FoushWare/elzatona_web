import { test, expect } from '@playwright/test';

test.describe('Navbar guided switch routes to /features/guided-learning', () => {
  test('click Guided button routes to /features/guided-learning on desktop', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1200, height: 900 });
    await page.goto('/');
    // Click the Guided switch button in navbar
    await page.getByRole('button', { name: /Guided/i }).click();
    // Expect either immediate route or delayed route via timeout
    await expect(page).toHaveURL(/\/features\/guided-learning/, {
      timeout: 3000,
    });
  });
});
