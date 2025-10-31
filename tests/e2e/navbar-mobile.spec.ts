import { test, expect } from '@playwright/test';

test.describe('Navbar - mobile view', () => {
  test('unauthenticated: mobile menu opens and shows Learning Mode + Sign In', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    await page.goto('/');

    await page.getByLabel('Toggle mobile menu').click();

    // Learning Mode header visible
    await expect(page.getByText('Learning Mode').first()).toBeVisible();
    // Sign In CTA visible in mobile overlay when unauthenticated
    await expect(
      page.getByRole('link', { name: 'Sign In' }).first()
    ).toBeVisible();

    // Close menu
    await page.getByLabel('Close mobile menu').click();
    await expect(page.getByLabel('Toggle mobile menu')).toBeVisible();
  });

  test('mobile controls have solid backgrounds (no transparency)', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    await page.goto('/');

    const burger = page.getByLabel('Toggle mobile menu');
    await expect(burger).toBeVisible();
    const burgerBg = await burger.evaluate(
      el => getComputedStyle(el).backgroundColor
    );
    expect(burgerBg).not.toBe('rgba(0, 0, 0, 0)');

    // Authenticated quick sign out button should also have solid bg
    await page.addInitScript(() => {
      sessionStorage.setItem(
        'navbar-auth-state',
        JSON.stringify({ isAuthenticated: true, isLoading: false })
      );
    });
    await page.reload();
    const quickLogout = page.getByLabel('Sign out');
    await expect(quickLogout).toBeVisible();
    const logoutBg = await quickLogout.evaluate(
      el => getComputedStyle(el).backgroundColor
    );
    expect(logoutBg).not.toBe('rgba(0, 0, 0, 0)');
  });

  test.skip('authenticated: mobile menu shows authed state (no Sign In)', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 800 });
    await page.addInitScript(() => {
      sessionStorage.setItem(
        'navbar-auth-state',
        JSON.stringify({ isAuthenticated: true, isLoading: false })
      );
    });
    await page.goto('/');

    await page.getByLabel('Toggle mobile menu').click();
    await expect(page.getByText('Learning Mode').first()).toBeVisible();
    // Ensure Sign In link is not present in authed state
    await expect(page.getByRole('link', { name: 'Sign In' })).toHaveCount(0);
  });
});
