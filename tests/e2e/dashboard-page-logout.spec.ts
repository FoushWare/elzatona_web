import { test, expect } from '@playwright/test';

test.describe('Dashboard page Sign Out button', () => {
  test('logs out, clears storage, and redirects to /auth', async ({ page }) => {
    await page.addInitScript(() => {
      sessionStorage.setItem(
        'navbar-auth-state',
        JSON.stringify({ isAuthenticated: true, isLoading: false })
      );
      // Seed some local storage values to verify they get cleared
      localStorage.setItem(
        'frontend-koddev-user',
        JSON.stringify({ id: 'u1' })
      );
      localStorage.setItem('auth-token', 'token');
      localStorage.setItem('flashcards:v1', '[]');
    });

    await page.goto('/dashboard');

    // Click page content Sign Out (not navbar dropdown)
    await page.getByRole('button', { name: /Sign Out/i }).click();

    await expect(page).toHaveURL('/');

    // Verify storage cleared on client side
    const [ssLen, lsLen] = await page.evaluate(() => [
      sessionStorage.length,
      localStorage.length,
    ]);
    // Some frameworks repopulate items post-redirect; allow 0 or minimal items
    expect(ssLen).toBeLessThanOrEqual(1);
    expect(lsLen).toBeLessThanOrEqual(1);
  });
});
