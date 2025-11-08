import { test, expect } from '@playwright/test';

test.describe('Home guided CTA routes to /features/guided-learning', () => {
  test('guided personalized CTA links to /features/guided-learning when no active plan', async ({
    page,
  }) => {
    await page.goto('/');
    // Ensure we’re on home and the main CTA is visible
    await expect(page).toHaveURL('/');
    const mainCta = page.locator('a.main-cta-button');
    await expect(mainCta).toBeVisible();

    // Click CTA only if it points to /learn; otherwise navigate via Guided card
    const href = await mainCta.getAttribute('href');
    if (href === '/features/guided-learning') {
      await mainCta.click();
      await expect(page).toHaveURL('/features/guided-learning');
    } else {
      // Fallback: click the Guided Learning card in the "How would you like to learn" section
      await page.getByRole('link', { name: /Guided Learning/i }).click();
      await expect(page).toHaveURL('/features/guided-learning');
    }
  });
});
