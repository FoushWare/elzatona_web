import { test, expect } from '@playwright/test';

test.describe('Guided banner responsiveness', () => {
  test('benefits wrap into multiple columns on laptop widths', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1366, height: 900 });
    await page.goto('/features/guided-learning');

    const banner = page.getByTestId('signup-cta-banner');
    await expect(banner).toBeVisible();

    const benefits = page.getByTestId('signup-cta-benefits');
    await expect(benefits).toBeVisible();

    // Ensure CSS grid with multiple columns is applied at this width
    const colTracks = await benefits.evaluate(
      el => getComputedStyle(el).gridTemplateColumns
    );
    expect(colTracks.split(' ').length).toBeGreaterThanOrEqual(2);
  });

  test('stacks as single column at 1024px (lg)', async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 800 });
    await page.goto('/features/guided-learning');
    const benefits = page.getByTestId('signup-cta-benefits');
    const colTracks = await benefits.evaluate(
      el => getComputedStyle(el).gridTemplateColumns
    );
    expect(colTracks.split(' ').length).toBe(1);
  });

  test('benefits become 3 columns on xl widths', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/features/guided-learning');
    const benefits = page.getByTestId('signup-cta-benefits');
    const colTracks = await benefits.evaluate(
      el => getComputedStyle(el).gridTemplateColumns
    );
    expect(colTracks.split(' ').length).toBeGreaterThanOrEqual(3);
  });

  test('stacks to single column on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto('/features/guided-learning');
    const benefits = page.getByTestId('signup-cta-benefits');
    const colTracks = await benefits.evaluate(
      el => getComputedStyle(el).gridTemplateColumns
    );
    // Single column track on small screens
    expect(colTracks.split(' ').length).toBe(1);
  });
});
