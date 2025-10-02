import { test, expect } from '@playwright/test';

test.describe('Complete User Journey', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the homepage
    await page.goto('/');
  });

  test('New user onboarding flow', async ({ page }) => {
    // Check homepage loads
    await expect(page.getByText('Master Frontend Development')).toBeVisible();

    // Click get started
    await page.getByText('Get Started').click();

    // Should navigate to get-started page
    await expect(page).toHaveURL('/get-started');

    // Select guided learning
    await page.getByText('Guided Learning').click();
    await page.getByText('Continue').click();

    // Should navigate to learning paths
    await expect(page).toHaveURL('/learning-paths');
  });

  test('Learning path selection and practice', async ({ page }) => {
    // Navigate to learning paths
    await page.goto('/learning-paths');

    // Wait for learning paths to load
    await expect(page.getByText('Choose your learning journey')).toBeVisible();

    // Select a learning path
    const learningPath = page
      .locator('[data-testid="learning-path-card"]')
      .first();
    await learningPath.click();

    // Should navigate to learning path details
    await expect(page).toHaveURL(/\/learning-paths\/\d+/);

    // Start the learning path
    await page.getByText('Start Learning').click();

    // Should navigate to questions
    await expect(page).toHaveURL(/\/learning-paths\/\d+\/questions/);
  });

  test('Question answering flow', async ({ page }) => {
    // Navigate to a question page
    await page.goto('/learning-paths/1/questions');

    // Wait for question to load
    await expect(page.getByText('Question')).toBeVisible();

    // Answer the question
    const option = page.locator('[data-testid="option-button"]').first();
    await option.click();

    // Submit answer
    await page.getByText('Submit Answer').click();

    // Should show feedback
    await expect(page.getByText('Correct!')).toBeVisible();

    // Go to next question
    await page.getByText('Next Question').click();
  });

  test('Progress tracking', async ({ page }) => {
    // Navigate to progress page
    await page.goto('/progress');

    // Check progress elements are visible
    await expect(page.getByText('Your Progress')).toBeVisible();
    await expect(page.getByText('Learning Statistics')).toBeVisible();

    // Check charts are rendered
    const progressChart = page.locator('[data-testid="progress-chart"]');
    await expect(progressChart).toBeVisible();
  });

  test('Search functionality', async ({ page }) => {
    // Navigate to practice questions
    await page.goto('/browse-practice-questions');

    // Use search
    const searchInput = page.getByPlaceholderText('Search questions...');
    await searchInput.fill('React');
    await searchInput.press('Enter');

    // Check results
    await expect(page.getByText('Search Results')).toBeVisible();
  });

  test('Authentication flow', async ({ page }) => {
    // Click sign in
    await page.getByText('Sign In').click();

    // Should show sign in modal
    await expect(page.getByText('Sign in to your account')).toBeVisible();

    // Fill in credentials (mock)
    await page.getByLabel('Email').fill('test@example.com');
    await page.getByLabel('Password').fill('password123');

    // Submit
    await page.getByText('Sign In').click();

    // Should show user menu
    await expect(page.getByText('Test User')).toBeVisible();
  });

  test('Mobile responsive design', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Check mobile navigation
    await expect(page.getByRole('button', { name: /menu/i })).toBeVisible();

    // Open mobile menu
    await page.getByRole('button', { name: /menu/i }).click();

    // Check menu items are visible
    await expect(page.getByText('Learning')).toBeVisible();
    await expect(page.getByText('Practice')).toBeVisible();
  });

  test('Dark mode toggle', async ({ page }) => {
    // Check initial theme
    const body = page.locator('body');
    await expect(body).not.toHaveClass(/dark/);

    // Toggle dark mode
    await page.getByRole('button', { name: /toggle theme/i }).click();

    // Check dark mode is applied
    await expect(body).toHaveClass(/dark/);
  });

  test('Error handling', async ({ page }) => {
    // Navigate to non-existent page
    await page.goto('/non-existent-page');

    // Should show 404 page
    await expect(page.getByText('404')).toBeVisible();
    await expect(page.getByText('Page Not Found')).toBeVisible();
  });

  test('Performance metrics', async ({ page }) => {
    // Navigate to homepage and measure performance
    const startTime = Date.now();
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;

    // Check load time is reasonable (less than 3 seconds)
    expect(loadTime).toBeLessThan(3000);

    // Check for performance issues
    const performanceMetrics = await page.evaluate(() => {
      const navigation = performance.getEntriesByType(
        'navigation'
      )[0] as PerformanceNavigationTiming;
      return {
        domContentLoaded:
          navigation.domContentLoadedEventEnd -
          navigation.domContentLoadedEventStart,
        loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
      };
    });

    expect(performanceMetrics.domContentLoaded).toBeLessThan(1000);
    expect(performanceMetrics.loadComplete).toBeLessThan(2000);
  });
});
