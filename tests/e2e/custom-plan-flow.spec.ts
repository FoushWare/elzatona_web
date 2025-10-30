// v1.0
import { test, expect } from '@playwright/test';

test('custom plan: open cart and set metadata', async ({ page }) => {
  await page.addInitScript(() => {
    try {
      const seed = [
        {
          id: 'q-1',
          question: 'What is React reconciliation?',
          section: 'React',
          topic: 'Rendering',
          difficulty: 'Medium',
          addedAt: Date.now(),
        },
      ];
      localStorage.setItem('question-cart:v1', JSON.stringify(seed));
    } catch {}
  });
  await page.goto('/free-style/cart');
  await page.getByTestId('plan-name-input').fill('My Interview Plan');
  await page.getByTestId('duration-input').fill('7');
  await page.getByTestId('questions-per-day-input').fill('5');
  await expect(page.getByTestId('create-plan-button')).toBeVisible();
});
