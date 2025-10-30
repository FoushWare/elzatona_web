// v1.0
import { test, expect } from '@playwright/test';

test('404 page styled and shows CTAs', async ({ page }) => {
  await page.goto('/this-route-does-not-exist-xyz');
  await expect(page.getByText('404')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Go Home' })).toBeVisible();
  await expect(
    page.getByRole('link', { name: 'Guided Learning' })
  ).toBeVisible();
  await expect(page.getByRole('link', { name: 'Free Style' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Dashboard' })).toBeVisible();
  await expect(
    page.getByRole('link', { name: 'Browse Questions' })
  ).toBeVisible();
});
