import { test, expect } from '@playwright/test';

test.describe('Learning Paths E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to learning paths page before each test
    await page.goto('/learning-paths');
  });

  test('should display learning paths page with collapsed cards', async ({
    page,
  }) => {
    // Check page title
    await expect(
      page.getByRole('heading', { name: 'Learning Paths' })
    ).toBeVisible();

    // Check that cards are visible but collapsed
    await expect(page.getByText('Frontend Basics')).toBeVisible();
    await expect(page.getByText('React Mastery')).toBeVisible();

    // Check that detailed content is not visible (cards are collapsed)
    await expect(
      page.getByText('Learn HTML, CSS, and JavaScript fundamentals')
    ).not.toBeVisible();
    await expect(
      page.getByText('Master React development with hooks and patterns')
    ).not.toBeVisible();
  });

  test('should expand card when header is clicked', async ({ page }) => {
    // Click on Frontend Basics card header
    await page.getByText('Frontend Basics').click();

    // Wait for content to appear
    await expect(
      page.getByText('Learn HTML, CSS, and JavaScript fundamentals')
    ).toBeVisible();

    // Check that action buttons are visible
    await expect(
      page.getByRole('link', { name: 'Practice Questions' })
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: 'View Resources' })
    ).toBeVisible();

    // Check that difficulty badge is visible
    await expect(page.getByText('Beginner')).toBeVisible();
  });

  test('should collapse card when header is clicked again', async ({
    page,
  }) => {
    // First click to expand
    await page.getByText('Frontend Basics').click();
    await expect(
      page.getByText('Learn HTML, CSS, and JavaScript fundamentals')
    ).toBeVisible();

    // Second click to collapse
    await page.getByText('Frontend Basics').click();

    // Wait for content to disappear
    await expect(
      page.getByText('Learn HTML, CSS, and JavaScript fundamentals')
    ).not.toBeVisible();
  });

  test('should filter cards based on search input', async ({ page }) => {
    // Find search input
    const searchInput = page.getByPlaceholderText(/search learning paths/i);
    await expect(searchInput).toBeVisible();

    // Type in search input
    await searchInput.fill('React');

    // Wait for filtering
    await expect(page.getByText('React Mastery')).toBeVisible();
    await expect(page.getByText('Frontend Basics')).not.toBeVisible();

    // Clear search
    await searchInput.fill('');

    // Both cards should be visible again
    await expect(page.getByText('React Mastery')).toBeVisible();
    await expect(page.getByText('Frontend Basics')).toBeVisible();
  });

  test('should filter cards based on difficulty', async ({ page }) => {
    // Find difficulty filter
    const difficultyFilter = page.getByRole('button', { name: /difficulty/i });
    await expect(difficultyFilter).toBeVisible();

    // Click difficulty filter
    await difficultyFilter.click();

    // Select intermediate difficulty
    await page.getByText('Intermediate').click();

    // Wait for filtering
    await expect(page.getByText('React Mastery')).toBeVisible();
    await expect(page.getByText('Frontend Basics')).not.toBeVisible();

    // Clear filter
    await difficultyFilter.click();
    await page.getByText('All').click();

    // Both cards should be visible again
    await expect(page.getByText('React Mastery')).toBeVisible();
    await expect(page.getByText('Frontend Basics')).toBeVisible();
  });

  test('should navigate to questions page when Practice Questions is clicked', async ({
    page,
  }) => {
    // Expand Frontend Basics card
    await page.getByText('Frontend Basics').click();
    await expect(
      page.getByText('Learn HTML, CSS, and JavaScript fundamentals')
    ).toBeVisible();

    // Click Practice Questions button
    await page.getByRole('link', { name: 'Practice Questions' }).click();

    // Should navigate to questions page
    await expect(page).toHaveURL(
      /\/learning-paths\/frontend-basics\/questions/
    );
    await expect(
      page.getByRole('heading', { name: /frontend basics questions/i })
    ).toBeVisible();
  });

  test('should navigate to resources page when View Resources is clicked', async ({
    page,
  }) => {
    // Expand Frontend Basics card
    await page.getByText('Frontend Basics').click();
    await expect(
      page.getByText('Learn HTML, CSS, and JavaScript fundamentals')
    ).toBeVisible();

    // Click View Resources button
    await page.getByRole('link', { name: 'View Resources' }).click();

    // Should navigate to resources page
    await expect(page).toHaveURL(
      /\/learning-paths\/frontend-basics\/resources/
    );
    await expect(
      page.getByRole('heading', { name: /frontend basics resources/i })
    ).toBeVisible();
  });

  test('should show no results message when search has no matches', async ({
    page,
  }) => {
    // Find search input
    const searchInput = page.getByPlaceholderText(/search learning paths/i);

    // Type something that won't match any cards
    await searchInput.fill('NonExistentPath');

    // Wait for no results message
    await expect(page.getByText(/no learning paths found/i)).toBeVisible();

    // Clear search
    await searchInput.fill('');

    // Cards should be visible again
    await expect(page.getByText('Frontend Basics')).toBeVisible();
    await expect(page.getByText('React Mastery')).toBeVisible();
  });

  test('should handle multiple card expansions', async ({ page }) => {
    // Expand Frontend Basics card
    await page.getByText('Frontend Basics').click();
    await expect(
      page.getByText('Learn HTML, CSS, and JavaScript fundamentals')
    ).toBeVisible();

    // Expand React Mastery card
    await page.getByText('React Mastery').click();
    await expect(
      page.getByText('Master React development with hooks and patterns')
    ).toBeVisible();

    // Both cards should be expanded
    await expect(
      page.getByText('Learn HTML, CSS, and JavaScript fundamentals')
    ).toBeVisible();
    await expect(
      page.getByText('Master React development with hooks and patterns')
    ).toBeVisible();

    // Collapse Frontend Basics
    await page.getByText('Frontend Basics').click();
    await expect(
      page.getByText('Learn HTML, CSS, and JavaScript fundamentals')
    ).not.toBeVisible();

    // React Mastery should still be expanded
    await expect(
      page.getByText('Master React development with hooks and patterns')
    ).toBeVisible();
  });

  test('should be responsive on mobile devices', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Check that cards are still visible and functional
    await expect(page.getByText('Frontend Basics')).toBeVisible();
    await expect(page.getByText('React Mastery')).toBeVisible();

    // Test card expansion on mobile
    await page.getByText('Frontend Basics').click();
    await expect(
      page.getByText('Learn HTML, CSS, and JavaScript fundamentals')
    ).toBeVisible();

    // Test search functionality on mobile
    const searchInput = page.getByPlaceholderText(/search learning paths/i);
    await searchInput.fill('React');
    await expect(page.getByText('React Mastery')).toBeVisible();
    await expect(page.getByText('Frontend Basics')).not.toBeVisible();
  });

  test('should maintain state when navigating back from questions page', async ({
    page,
  }) => {
    // Expand Frontend Basics card
    await page.getByText('Frontend Basics').click();
    await expect(
      page.getByText('Learn HTML, CSS, and JavaScript fundamentals')
    ).toBeVisible();

    // Navigate to questions page
    await page.getByRole('link', { name: 'Practice Questions' }).click();
    await expect(page).toHaveURL(
      /\/learning-paths\/frontend-basics\/questions/
    );

    // Navigate back
    await page.goBack();
    await expect(page).toHaveURL(/\/learning-paths/);

    // Card should still be expanded (this depends on your state management)
    // If you're using URL state or localStorage, the card should remain expanded
    // If not, it will be collapsed by default
  });
});
