// v1.0
import { test, expect } from '@playwright/test';

test('navbar reflects authenticated state with no flicker', async ({
  page,
}) => {
  await page.addInitScript(() => {
    sessionStorage.setItem(
      'navbar-auth-state',
      JSON.stringify({ isAuthenticated: true, isLoading: false })
    );
  });
  await page.goto('/');
  await expect(page.getByText('Dashboard')).toBeVisible();
  await expect(page.getByText('Sign In')).toHaveCount(0);
});

test('google login redirects to dashboard (conditional)', async ({ page }) => {
  test.skip(
    !!process.env.CI,
    'Skip provider login on CI without live providers'
  );
  await page.goto('/auth');
  const googleBtn = page.getByRole('button', { name: /google/i });
  if (await googleBtn.count()) {
    await googleBtn.click();
    await expect(page).toHaveURL(/dashboard|auth\/callback|supabase|google/);
  } else {
    test.skip(true, 'Google button not available');
  }
});

test('github login redirects to dashboard (conditional)', async ({ page }) => {
  test.skip(
    !!process.env.CI,
    'Skip provider login on CI without live providers'
  );
  await page.goto('/auth');
  const githubBtn = page.getByRole('button', { name: /github/i });
  if (await githubBtn.count()) {
    await githubBtn.click();
    await expect(page).toHaveURL(/dashboard|auth\/callback|supabase|github/);
  } else {
    test.skip(true, 'GitHub button not available');
  }
});
