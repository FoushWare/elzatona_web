// v1.0
import { test, expect } from '@playwright/test';

test.describe('Dashboard navbar (no flicker on refresh when authenticated)', () => {
  test('shows Dashboard and not Sign In after refresh with seeded auth state', async ({
    page,
  }) => {
    await page.addInitScript(() => {
      sessionStorage.setItem(
        'navbar-auth-state',
        JSON.stringify({ isAuthenticated: true, isLoading: false })
      );
    });

    await page.goto('/dashboard');
    await expect(page.getByTestId('dashboard-link')).toBeVisible();
    await expect(page.getByTestId('signin-link')).toHaveCount(0);

    // Reload should preserve the same immediate state (no flicker)
    await page.reload();
    await expect(page.getByTestId('dashboard-link')).toBeVisible();
    await expect(page.getByTestId('signin-link')).toHaveCount(0);
  });
});
