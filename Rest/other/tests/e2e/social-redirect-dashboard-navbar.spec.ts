import { test, expect } from '@playwright/test';

test.describe('Navbar after social login redirect → /dashboard', () => {
  test('shows Dashboard (not Sign In) and survives reload', async ({
    page,
  }) => {
    await page.addInitScript(() => {
      // Simulate AuthSessionSync writing the snapshot during social redirect
      sessionStorage.setItem(
        'navbar-auth-state',
        JSON.stringify({ isAuthenticated: true, isLoading: false })
      );
    });

    await page.goto('/dashboard');
    await expect(page.getByTestId('dashboard-link')).toBeVisible();
    await expect(page.getByTestId('signin-link')).toHaveCount(0);

    // Reload should keep the authenticated navbar (no flicker to Sign In)
    await page.reload();
    await expect(page.getByTestId('dashboard-link')).toBeVisible();
    // If the element exists for mobile but is hidden, accept hidden state
    const signinVisible = await page.getByTestId('signin-link').isVisible();
    expect(signinVisible).toBeFalsy();
  });
});
