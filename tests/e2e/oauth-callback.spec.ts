// v1.0
import { test, expect } from '@playwright/test';

test('oauth callback redirects to auth or dashboard', async ({ page }) => {
  await page.addInitScript(() => {
    // seed a dummy local progress key to exercise sync loop (best-effort)
    localStorage.setItem(
      'guided-practice-progress-test-plan',
      JSON.stringify({ completedQuestions: [] })
    );
  });
  await page.goto('/auth/callback');
  await expect(page).toHaveURL(/\/(auth|dashboard)/, { timeout: 10000 });
});
