// v1.0
import { test, expect } from '@playwright/test';

test.describe('Navbar user menu logout', () => {
  test('logout from home via user menu clears auth snapshot and shows Sign In', async ({
    page,
  }) => {
    await page.addInitScript(() => {
      sessionStorage.setItem(
        'navbar-auth-state',
        JSON.stringify({ isAuthenticated: true, isLoading: false })
      );
    });
    await page.goto('/');
    await expect(page.getByTestId('dashboard-link')).toBeVisible();

    await page.getByTestId('user-menu-button').click();
    await page.getByTestId('user-menu-logout').click();

    await expect(page.getByTestId('signin-link')).toBeVisible();
  });

  test('logout from dashboard via user menu', async ({ page }) => {
    await page.addInitScript(() => {
      sessionStorage.setItem(
        'navbar-auth-state',
        JSON.stringify({ isAuthenticated: true, isLoading: false })
      );
    });
    await page.goto('/dashboard');
    await expect(page.getByTestId('dashboard-link')).toBeVisible();

    await page.getByTestId('user-menu-button').click();
    await page.getByTestId('user-menu-logout').click();

    await expect(page.getByTestId('signin-link')).toBeVisible();
  });
});
