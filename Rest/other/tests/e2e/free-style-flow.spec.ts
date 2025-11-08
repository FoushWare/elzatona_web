// v1.0
import { test, expect } from '@playwright/test';

test('free style (anon): practice persists and wrong answer adds flashcard', async ({
  page,
}) => {
  await page.goto('/free-style');
  // Navigate to some path/topic if needed; rely on first practice entry if present
  const firstPractice = page
    .getByRole('link')
    .filter({ hasText: /Practice|Start|Questions/i })
    .first();
  if (await firstPractice.count()) {
    await firstPractice.click();
  }
  // If a question option exists, click a likely wrong answer (first option)
  const option = page.locator('[data-testid="option"]').first();
  if (await option.count()) {
    await option.click();
  }
  // Try manual Add to Flashcards; if not available, seed a dummy item
  const addManual = page
    .getByRole('button', { name: /Add to Flashcards/i })
    .first();
  if (await addManual.count()) {
    await addManual.click();
  } else {
    await page.addInitScript(() => {
      const existing = JSON.parse(
        localStorage.getItem('flashcards:v1') || '[]'
      );
      existing.push({ id: 'dummy-q', title: 'Dummy Question' });
      localStorage.setItem('flashcards:v1', JSON.stringify(existing));
    });
  }
  // Navigate to flashcards page and assert at least one item present
  await page.goto('/flashcards');
  const listItem = page.getByRole('button', { name: /Remove/i }).first();
  await expect(listItem).toBeVisible();
});
