import { test, expect } from '@playwright/test';

test.describe('Visual Regression Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Set consistent viewport for visual tests
    await page.setViewportSize({ width: 1280, height: 720 });
  });

  test('Homepage visual regression', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Take full page screenshot
    await expect(page).toHaveScreenshot('homepage-full.png');

    // Take screenshot of hero section
    const heroSection = page.locator('[data-testid="hero-section"]');
    await expect(heroSection).toHaveScreenshot('homepage-hero.png');

    // Take screenshot of features section
    const featuresSection = page.locator('[data-testid="features-section"]');
    await expect(featuresSection).toHaveScreenshot('homepage-features.png');
  });

  test('Learning paths page visual regression', async ({ page }) => {
    await page.goto('/learning-paths');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('learning-paths-page.png');
  });

  test('Question page visual regression', async ({ page }) => {
    await page.goto('/learning-paths/1/questions');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('question-page.png');
  });

  test('Admin dashboard visual regression', async ({ page }) => {
    // Mock admin authentication
    await page.goto('/admin');
    await page.getByLabel('Email').fill('admin@example.com');
    await page.getByLabel('Password').fill('admin123');
    await page.getByText('Sign In').click();

    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('admin-dashboard.png');
  });

  test('Admin questions management visual regression', async ({ page }) => {
    // Mock admin authentication and navigate to questions
    await page.goto('/admin/content/questions');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('admin-questions-management.png');
  });

  test('Mobile responsive visual regression', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('homepage-mobile.png');
  });

  test('Tablet responsive visual regression', async ({ page }) => {
    // Set tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('homepage-tablet.png');
  });

  test('Dark mode visual regression', async ({ page }) => {
    await page.goto('/');

    // Toggle dark mode
    await page.getByRole('button', { name: /toggle theme/i }).click();
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('homepage-dark-mode.png');
  });

  test('Navigation menu visual regression', async ({ page }) => {
    await page.goto('/');

    // Open navigation menu
    await page.getByText('Learning').hover();
    await page.waitForTimeout(500); // Wait for animation

    await expect(page).toHaveScreenshot('navigation-menu-open.png');
  });

  test('User authentication modal visual regression', async ({ page }) => {
    await page.goto('/');

    // Open sign in modal
    await page.getByText('Sign In').click();
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('sign-in-modal.png');
  });

  test('Question card visual regression', async ({ page }) => {
    await page.goto('/learning-paths');
    await page.waitForLoadState('networkidle');

    // Take screenshot of first question card
    const questionCard = page
      .locator('[data-testid="learning-path-card"]')
      .first();
    await expect(questionCard).toHaveScreenshot('learning-path-card.png');
  });

  test('Progress page visual regression', async ({ page }) => {
    await page.goto('/progress');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('progress-page.png');
  });

  test('Error page visual regression', async ({ page }) => {
    await page.goto('/non-existent-page');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('404-error-page.png');
  });

  test('Loading states visual regression', async ({ page }) => {
    // Navigate to a page that shows loading state
    await page.goto('/learning-paths');

    // Take screenshot during loading
    await expect(page).toHaveScreenshot('loading-state.png');
  });

  test('Form elements visual regression', async ({ page }) => {
    await page.goto('/admin/content/questions');

    // Open add question form
    await page.getByText('Add Question').click();
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('add-question-form.png');
  });

  test('Modal dialogs visual regression', async ({ page }) => {
    await page.goto('/admin/content/questions');

    // Open delete confirmation modal
    await page.locator('[data-testid="delete-question-1"]').click();
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('delete-confirmation-modal.png');
  });

  test('Data tables visual regression', async ({ page }) => {
    await page.goto('/admin/content/questions');
    await page.waitForLoadState('networkidle');

    // Take screenshot of questions table
    const questionsTable = page.locator('[data-testid="questions-table"]');
    await expect(questionsTable).toHaveScreenshot('questions-table.png');
  });

  test('Charts and graphs visual regression', async ({ page }) => {
    await page.goto('/progress');
    await page.waitForLoadState('networkidle');

    // Take screenshot of progress charts
    const progressChart = page.locator('[data-testid="progress-chart"]');
    await expect(progressChart).toHaveScreenshot('progress-chart.png');
  });

  test('Button states visual regression', async ({ page }) => {
    await page.goto('/');

    // Test different button states
    const startButton = page.getByText('Start Learning Now');

    // Normal state
    await expect(startButton).toHaveScreenshot('button-normal.png');

    // Hover state
    await startButton.hover();
    await expect(startButton).toHaveScreenshot('button-hover.png');

    // Active state
    await startButton.click();
    await expect(startButton).toHaveScreenshot('button-active.png');
  });

  test('Input fields visual regression', async ({ page }) => {
    await page.goto('/admin/content/questions');
    await page.getByText('Add Question').click();

    // Test input field states
    const titleInput = page.getByLabel('Title');

    // Empty state
    await expect(titleInput).toHaveScreenshot('input-empty.png');

    // Focused state
    await titleInput.focus();
    await expect(titleInput).toHaveScreenshot('input-focused.png');

    // Filled state
    await titleInput.fill('Test Question');
    await expect(titleInput).toHaveScreenshot('input-filled.png');
  });

  test('Alert and notification visual regression', async ({ page }) => {
    await page.goto('/admin/content/questions');

    // Trigger a success notification
    await page.getByText('Add Question').click();
    await page.getByLabel('Title').fill('Test Question');
    await page.getByText('Create Question').click();

    // Take screenshot of success notification
    const successAlert = page.locator('[data-testid="success-alert"]');
    await expect(successAlert).toHaveScreenshot('success-alert.png');
  });
});
