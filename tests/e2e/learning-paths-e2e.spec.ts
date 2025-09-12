import { test, expect } from '@playwright/test';

test.describe('Learning Paths E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/learning-paths');
  });

  test('should load learning paths page successfully', async ({ page }) => {
    // Check page title
    await expect(page).toHaveTitle(/Learning Paths/);

    // Check main heading
    await expect(
      page.getByRole('heading', { name: 'Learning Paths' })
    ).toBeVisible();

    // Check subtitle
    await expect(
      page.getByText('Your path to success in interviews')
    ).toBeVisible();
  });

  test('should display all learning path cards', async ({ page }) => {
    // Check that learning path cards are visible
    await expect(page.getByText('Frontend Basics')).toBeVisible();
    await expect(page.getByText('React Mastery')).toBeVisible();
    await expect(page.getByText('Advanced CSS Mastery')).toBeVisible();

    // Check question count badges
    await expect(page.getByText('#25 Q')).toBeVisible();
    await expect(page.getByText('#30 Q')).toBeVisible();
    await expect(page.getByText('#20 Q')).toBeVisible();
  });

  test('should expand and collapse learning path cards', async ({ page }) => {
    // Initially cards should be collapsed (no action buttons visible)
    await expect(
      page.getByRole('link', { name: /practice questions/i })
    ).not.toBeVisible();

    // Click on first card header to expand
    await page.getByText('Frontend Basics').click();

    // Action buttons should now be visible
    await expect(
      page.getByRole('link', { name: /practice questions/i })
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: /view resources/i })
    ).toBeVisible();

    // Click again to collapse
    await page.getByText('Frontend Basics').click();

    // Action buttons should be hidden again
    await expect(
      page.getByRole('link', { name: /practice questions/i })
    ).not.toBeVisible();
  });

  test('should navigate to practice questions when clicking practice button', async ({
    page,
  }) => {
    // Expand first card
    await page.getByText('Frontend Basics').click();

    // Click practice questions button
    await page.getByRole('link', { name: /practice questions/i }).click();

    // Should navigate to questions page
    await expect(page).toHaveURL(
      /\/learning-paths\/frontend-basics\/questions/
    );
  });

  test('should navigate to resources when clicking view resources button', async ({
    page,
  }) => {
    // Expand first card
    await page.getByText('Frontend Basics').click();

    // Click view resources button
    await page.getByRole('link', { name: /view resources/i }).click();

    // Should navigate to resources page
    await expect(page).toHaveURL(
      /\/learning-paths\/frontend-basics\/resources/
    );
  });

  test('should navigate to flashcards when clicking flashcard icon', async ({
    page,
  }) => {
    // Expand first card
    await page.getByText('Frontend Basics').click();

    // Click flashcard icon
    await page.getByLabel(/add to flashcards/i).click();

    // Should navigate to questions page (same as practice questions)
    await expect(page).toHaveURL(
      /\/learning-paths\/frontend-basics\/questions/
    );
  });

  test('should navigate to schedule interview page', async ({ page }) => {
    // Click schedule interview button
    await page
      .getByRole('link', { name: /schedule ai mock interview/i })
      .click();

    // Should navigate to schedule interview page
    await expect(page).toHaveURL('/schedule-interview');
  });

  test('should navigate to study plans from header', async ({ page }) => {
    // Click study plans link in header
    await page.getByRole('link', { name: /view study plans/i }).click();

    // Should navigate to study plans page
    await expect(page).toHaveURL('/study-plans');
  });

  test('should navigate to preparation guides from header', async ({
    page,
  }) => {
    // Click preparation guides link in header
    await page.getByRole('link', { name: /preparation guides/i }).click();

    // Should navigate to preparation guides page
    await expect(page).toHaveURL('/preparation-guides');
  });

  test('should display correct learning path information', async ({ page }) => {
    // Expand first card
    await page.getByText('Frontend Basics').click();

    // Check description
    await expect(
      page.getByText('Learn HTML, CSS, and JavaScript fundamentals')
    ).toBeVisible();

    // Check difficulty
    await expect(page.getByText('beginner')).toBeVisible();

    // Check estimated time
    await expect(page.getByText('40 hours')).toBeVisible();

    // Check target skills
    await expect(page.getByText('HTML')).toBeVisible();
    await expect(page.getByText('CSS')).toBeVisible();
    await expect(page.getByText('JavaScript')).toBeVisible();

    // Check prerequisites
    await expect(page.getByText('Basic computer skills')).toBeVisible();
  });

  test('should scroll to flashcard icon when card is expanded', async ({
    page,
  }) => {
    // Expand first card
    await page.getByText('Frontend Basics').click();

    // Wait for scroll animation
    await page.waitForTimeout(500);

    // Check that flashcard icon is in viewport
    const flashcardIcon = page.getByLabel(/add to flashcards/i);
    await expect(flashcardIcon).toBeInViewport();
  });

  test('should handle multiple card expansions', async ({ page }) => {
    // Expand first card
    await page.getByText('Frontend Basics').click();

    // Expand second card
    await page.getByText('React Mastery').click();

    // Both cards should be expanded
    const practiceButtons = page.getByRole('link', {
      name: /practice questions/i,
    });
    await expect(practiceButtons).toHaveCount(2);
  });

  test('should be responsive on mobile devices', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Page should still load correctly
    await expect(
      page.getByRole('heading', { name: 'Learning Paths' })
    ).toBeVisible();

    // Cards should be stacked vertically
    await expect(page.getByText('Frontend Basics')).toBeVisible();
    await expect(page.getByText('React Mastery')).toBeVisible();
    await expect(page.getByText('Advanced CSS Mastery')).toBeVisible();
  });

  test('should be responsive on tablet devices', async ({ page }) => {
    // Set tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });

    // Page should still load correctly
    await expect(
      page.getByRole('heading', { name: 'Learning Paths' })
    ).toBeVisible();

    // Cards should be in grid layout
    await expect(page.getByText('Frontend Basics')).toBeVisible();
    await expect(page.getByText('React Mastery')).toBeVisible();
  });

  test('should have proper accessibility attributes', async ({ page }) => {
    // Check heading structure
    const mainHeading = page.getByRole('heading', { name: 'Learning Paths' });
    await expect(mainHeading).toBeVisible();

    // Check that buttons have proper ARIA attributes
    const cardButtons = page.locator('button[aria-expanded]');
    await expect(cardButtons).toHaveCount(3); // One for each learning path

    // Check that links have proper href attributes
    const scheduleLink = page.getByRole('link', {
      name: /schedule ai mock interview/i,
    });
    await expect(scheduleLink).toHaveAttribute('href', '/schedule-interview');
  });

  test('should handle keyboard navigation', async ({ page }) => {
    // Tab through the page
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    // Should be able to focus on interactive elements
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
  });

  test('should display call to action section', async ({ page }) => {
    // Scroll to bottom to see CTA
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    // Check CTA content
    await expect(page.getByText(/ready to start your journey/i)).toBeVisible();
  });

  test('should not show filter buttons or statistics', async ({ page }) => {
    // Should not show filter buttons
    await expect(
      page.getByRole('button', { name: /all levels/i })
    ).not.toBeVisible();
    await expect(
      page.getByRole('button', { name: /beginner/i })
    ).not.toBeVisible();
    await expect(
      page.getByRole('button', { name: /intermediate/i })
    ).not.toBeVisible();
    await expect(
      page.getByRole('button', { name: /advanced/i })
    ).not.toBeVisible();

    // Should not show category filter buttons
    await expect(
      page.getByRole('button', { name: /javascript/i })
    ).not.toBeVisible();
    await expect(
      page.getByRole('button', { name: /react/i })
    ).not.toBeVisible();
    await expect(page.getByRole('button', { name: /css/i })).not.toBeVisible();

    // Should not show statistics
    await expect(page.getByText(/total hours/i)).not.toBeVisible();
    await expect(page.getByText(/total resources/i)).not.toBeVisible();
    await expect(page.getByText(/categories/i)).not.toBeVisible();
  });

  test('should handle page refresh correctly', async ({ page }) => {
    // Expand a card
    await page.getByText('Frontend Basics').click();

    // Refresh the page
    await page.reload();

    // Page should load correctly after refresh
    await expect(
      page.getByRole('heading', { name: 'Learning Paths' })
    ).toBeVisible();
    await expect(page.getByText('Frontend Basics')).toBeVisible();
  });

  test('should handle browser back/forward navigation', async ({ page }) => {
    // Navigate to another page
    await page.getByRole('link', { name: /view study plans/i }).click();
    await expect(page).toHaveURL('/study-plans');

    // Go back
    await page.goBack();
    await expect(page).toHaveURL('/learning-paths');

    // Page should still work correctly
    await expect(
      page.getByRole('heading', { name: 'Learning Paths' })
    ).toBeVisible();
  });
});
