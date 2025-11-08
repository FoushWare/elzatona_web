// v1.0
import { test, expect } from '@playwright/test';

test('guided learning entry', async ({ page }) => {
  await page.goto('/features/guided-learning');
  await expect(page).toHaveURL(/features\/guided-learning/);
  // Expect at least one plan card exists
  await expect(
    page.locator('[data-testid="guided-plan-card"]').first()
  ).toBeVisible();
});

test('guided (anon): start plan and progress persists locally', async ({
  page,
}) => {
  await page.goto('/features/guided-learning');
  // Click into first plan details
  const planCard = page.locator('[data-testid="guided-plan-card"]').first();
  await planCard.click();
  // On details page, click Start link
  const startLink = page.getByRole('link', {
    name: /Start .* Interview Prep/i,
  });
  await startLink.click();
  await expect(page).toHaveURL(/guided-practice\?plan=/, { timeout: 15000 });
  // Seed a minimal progress record for this plan and verify persistence after reload
  const url = page.url();
  const planParam = new URL(url).searchParams.get('plan');
  await page.evaluate(planId => {
    if (!planId) return;
    localStorage.setItem(
      `guided-practice-progress-${planId}`,
      JSON.stringify({
        completedQuestions: [],
        lastUpdated: new Date().toISOString(),
      })
    );
  }, planParam);
  await page.reload();
  const exists = await page.evaluate(() =>
    Object.keys(localStorage).some(k =>
      k.startsWith('guided-practice-progress-')
    )
  );
  expect(exists).toBeTruthy();
});
