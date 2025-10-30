// v1.0
import { test, expect } from '@playwright/test';

type ApiQuestion = {
  id: string;
  options?: { id: string; text: string; isCorrect: boolean }[];
};
type ApiTopic = { questions: ApiQuestion[] };
type ApiCategory = { topics: ApiTopic[] };
type ApiCard = { categories: ApiCategory[] };
type ApiPlan = { cards: ApiCard[] };

test('guided plan details page loads from listing', async ({
  page,
  request,
}) => {
  await page.goto('/features/guided-learning');
  // Click the first plan card
  const firstCard = page.locator('[data-testid="guided-plan-card"]').first();
  await expect(firstCard).toBeVisible();
  await firstCard.click();
  // Navigates to a plan details route
  await expect(page).toHaveURL(/features\/guided-learning\//);
  // Has at least one card and one category block
  await expect(
    page.locator('[data-testid="guided-card"]').first()
  ).toBeVisible();
  await expect(
    page.locator('[data-testid="guided-category"]').first()
  ).toBeVisible();
  // Progress counts are rendered as completed/total
  const cardProgress = page
    .locator('[data-testid="guided-card-progress"]')
    .first();
  await expect(cardProgress).toHaveText(/\d+\/\d+/);
  const categoryProgress = page
    .locator('[data-testid="guided-category-progress"]')
    .first();
  await expect(categoryProgress).toHaveText(/\d+\/\d+/);

  // Strict check: totals reflect only questions with options using API data
  const url = page.url();
  const planId = url.split('/').pop()!;
  const res = await request.get(`/api/guided-learning/plan-details/${planId}`);
  expect(res.ok()).toBeTruthy();
  const api = (await res.json()) as { success: boolean; data: ApiPlan };
  expect(api && api.success).toBeTruthy();
  const plan: ApiPlan = api.data;
  // Compute totals for the first card and its first category using options-only rule
  const firstApiCard: ApiCard = plan.cards[0];
  const firstApiCategory: ApiCategory = firstApiCard.categories[0];
  const cardTotalOptions = firstApiCard.categories.reduce(
    (sum: number, cat: ApiCategory) => {
      return (
        sum +
        cat.topics.reduce((tSum: number, topic: ApiTopic) => {
          return (
            tSum +
            topic.questions.filter(
              (q: ApiQuestion) =>
                Array.isArray(q.options) && q.options.length > 0
            ).length
          );
        }, 0)
      );
    },
    0
  );
  const categoryTotalOptions = firstApiCategory.topics.reduce(
    (tSum: number, topic: ApiTopic) => {
      return (
        tSum +
        topic.questions.filter(
          (q: ApiQuestion) => Array.isArray(q.options) && q.options.length > 0
        ).length
      );
    },
    0
  );

  // Parse UI totals
  const cardText = await cardProgress.textContent();
  const cardUiTotal = Number((cardText || '').split('/')[1] || 0);
  const catText = await categoryProgress.textContent();
  const catUiTotal = Number((catText || '').split('/')[1] || 0);

  expect(cardUiTotal).toBe(cardTotalOptions);
  expect(catUiTotal).toBe(categoryTotalOptions);
});
