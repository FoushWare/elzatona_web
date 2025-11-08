// v1.0
import { test, expect } from '@playwright/test';

const routes = [
  '/',
  '/auth',
  '/dashboard',
  '/free-style',
  '/free-style/cart',
  '/features/guided-learning',
];

for (const route of routes) {
  test(`loads ${route}`, async ({ page }) => {
    await page.goto(route);
    await expect(page).toHaveURL(/.+/);
  });
}
