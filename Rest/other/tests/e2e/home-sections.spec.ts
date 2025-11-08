import { test, expect } from '@playwright/test';

test.describe('Home page sections', () => {
  test('renders hero, CTAs, learning mode, and stats blocks', async ({
    page,
  }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Master Frontend Development Interviews/i);

    // Hero heading and subtitle
    // Be explicit to avoid strict mode violation (pick the H1)
    await expect(
      page.getByRole('heading', {
        name: /Start Your Learning Path Interviews/i,
        level: 1,
      })
    ).toBeVisible();
    // Use more specific scoping: the first hero section subtitle
    const heroSubtitle = page
      .locator('section')
      .first()
      .getByText(/Choose a structured learning plan to begin your journey/i)
      .first();
    await expect(heroSubtitle).toBeVisible();

    // Primary CTA should route to guided plans
    const mainCta = page.locator('a.main-cta-button');
    await expect(mainCta).toBeVisible();
    await expect(mainCta).toHaveAttribute('href', '/features/guided-learning');

    // Learning mode section
    await expect(
      page.getByRole('heading', { name: /How would you like to learn\?/i })
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: /Guided Learning/i })
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: /Free Style Learning/i })
    ).toBeVisible();

    // Stats block presence: assert at least one stat label
    const anyStat = page
      .getByText(
        /Active Learners|Success Rate|Questions Solved|Avg\. Study Time/i
      )
      .first();
    await expect(anyStat).toBeVisible();

    // Final CTA section exists (when user type not set)
    // Be tolerant if personalized sections render instead
    const finalCta = page.getByRole('heading', {
      name: /Ready to Ace Your Interviews\?/i,
    });
    // Don't fail if not present due to personalization; just check optional
    if (await finalCta.count()) {
      await expect(finalCta).toBeVisible();
    }
  });
});
