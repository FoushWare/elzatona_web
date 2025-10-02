import { test, expect } from '@playwright/test';

test.describe('Comprehensive Visual Regression Tests', () => {
  test('Homepage visual regression', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Take full page screenshot
    await expect(page).toHaveScreenshot('homepage-full.png');

    // Take screenshot of hero section
    const heroSection = page.locator('[data-testid="hero-section"]');
    await expect(heroSection).toHaveScreenshot('homepage-hero.png');

    // Take screenshot of navigation
    const navigation = page.locator('nav');
    await expect(navigation).toHaveScreenshot('homepage-navigation.png');
  });

  test('Learning paths page visual regression', async ({ page }) => {
    await page.goto('/learning-paths');
    await page.waitForLoadState('networkidle');

    // Take full page screenshot
    await expect(page).toHaveScreenshot('learning-paths-full.png');

    // Take screenshot of learning paths grid
    const grid = page.locator('[data-testid="learning-paths-grid"]');
    await expect(grid).toHaveScreenshot('learning-paths-grid.png');
  });

  test('Question page visual regression', async ({ page }) => {
    await page.goto('/features/learning-paths/1/questions');
    await page.waitForLoadState('networkidle');

    // Take full page screenshot
    await expect(page).toHaveScreenshot('question-page-full.png');

    // Take screenshot of question card
    const questionCard = page.locator('[data-testid="question-card"]');
    await expect(questionCard).toHaveScreenshot('question-card.png');
  });

  test('Admin page visual regression', async ({ page }) => {
    await page.goto('/admin/content/questions');
    await page.waitForLoadState('networkidle');

    // Take full page screenshot
    await expect(page).toHaveScreenshot('admin-page-full.png');

    // Take screenshot of questions table
    const table = page.locator('table');
    await expect(table).toHaveScreenshot('admin-questions-table.png');
  });

  test('Modal visual regression', async ({ page }) => {
    await page.goto('/admin/content/questions');

    // Open add question modal
    await page.getByText('Add Question').click();
    await page.waitForLoadState('networkidle');

    // Take screenshot of modal
    const modal = page.locator('[role="dialog"]');
    await expect(modal).toHaveScreenshot('add-question-modal.png');
  });

  test('Form visual regression', async ({ page }) => {
    await page.goto('/admin/content/questions');
    await page.getByText('Add Question').click();

    // Take screenshot of form
    const form = page.locator('form');
    await expect(form).toHaveScreenshot('question-form.png');
  });

  test('Button states visual regression', async ({ page }) => {
    await page.goto('/');

    // Test primary button
    const primaryButton = page.getByText('Start Learning Now');
    await expect(primaryButton).toHaveScreenshot('button-primary.png');

    // Test button hover state
    await primaryButton.hover();
    await expect(primaryButton).toHaveScreenshot('button-primary-hover.png');

    // Test button active state
    await primaryButton.click({ button: 'left' });
    await expect(primaryButton).toHaveScreenshot('button-primary-active.png');
  });

  test('Input field visual regression', async ({ page }) => {
    await page.goto('/admin/content/questions');
    await page.getByText('Add Question').click();

    // Test input field
    const input = page.getByLabel('Title');
    await expect(input).toHaveScreenshot('input-field.png');

    // Test input field focus state
    await input.focus();
    await expect(input).toHaveScreenshot('input-field-focus.png');

    // Test input field with value
    await input.fill('Test Question');
    await expect(input).toHaveScreenshot('input-field-filled.png');
  });

  test('Table visual regression', async ({ page }) => {
    await page.goto('/admin/content/questions');

    // Take screenshot of table
    const table = page.locator('table');
    await expect(table).toHaveScreenshot('questions-table.png');

    // Test table row hover
    const firstRow = table.locator('tbody tr').first();
    await firstRow.hover();
    await expect(firstRow).toHaveScreenshot('table-row-hover.png');
  });

  test('Card component visual regression', async ({ page }) => {
    await page.goto('/learning-paths');

    // Take screenshot of learning path card
    const card = page.locator('[data-testid="learning-path-card"]').first();
    await expect(card).toHaveScreenshot('learning-path-card.png');

    // Test card hover state
    await card.hover();
    await expect(card).toHaveScreenshot('learning-path-card-hover.png');
  });

  test('Navigation visual regression', async ({ page }) => {
    await page.goto('/');

    // Desktop navigation
    const desktopNav = page.locator('nav');
    await expect(desktopNav).toHaveScreenshot('navigation-desktop.png');

    // Mobile navigation
    await page.setViewportSize({ width: 375, height: 667 });
    await page.reload();

    const mobileNav = page.locator('nav');
    await expect(mobileNav).toHaveScreenshot('navigation-mobile.png');

    // Mobile menu open
    const menuButton = page.getByRole('button', { name: /menu/i });
    await menuButton.click();
    await expect(mobileNav).toHaveScreenshot('navigation-mobile-open.png');
  });

  test('Footer visual regression', async ({ page }) => {
    await page.goto('/');

    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    // Take screenshot of footer
    const footer = page.locator('footer');
    await expect(footer).toHaveScreenshot('footer.png');
  });

  test('Error page visual regression', async ({ page }) => {
    // Navigate to non-existent page
    await page.goto('/non-existent-page');

    // Take screenshot of 404 page
    await expect(page).toHaveScreenshot('404-page.png');
  });

  test('Loading state visual regression', async ({ page }) => {
    await page.goto('/learning-paths');

    // Take screenshot during loading
    const loadingIndicator = page.locator('[data-testid="loading"]');
    if ((await loadingIndicator.count()) > 0) {
      await expect(loadingIndicator).toHaveScreenshot('loading-indicator.png');
    }
  });

  test('Empty state visual regression', async ({ page }) => {
    await page.goto('/admin/content/questions');

    // Clear all questions first
    await page.getByText('Clear All Questions').click();
    await page.getByText('Confirm Clear').click();

    // Take screenshot of empty state
    const emptyState = page.locator('[data-testid="empty-state"]');
    await expect(emptyState).toHaveScreenshot('empty-state.png');
  });

  test('Success message visual regression', async ({ page }) => {
    await page.goto('/admin/content/questions');
    await page.getByText('Add Question').click();

    // Fill and submit form
    await page.getByLabel('Title').fill('Test Question');
    await page.getByLabel('Content').fill('What is JavaScript?');
    await page.getByLabel('Type').selectOption('multiple-choice');
    await page.getByText('Create Question').click();

    // Take screenshot of success message
    const successMessage = page.locator('[data-testid="success-message"]');
    await expect(successMessage).toHaveScreenshot('success-message.png');
  });

  test('Error message visual regression', async ({ page }) => {
    await page.goto('/admin/content/questions');
    await page.getByText('Add Question').click();

    // Submit form without required fields
    await page.getByText('Create Question').click();

    // Take screenshot of error message
    const errorMessage = page.locator('[data-testid="error-message"]');
    await expect(errorMessage).toHaveScreenshot('error-message.png');
  });

  test('Pagination visual regression', async ({ page }) => {
    await page.goto('/admin/content/questions');

    // Take screenshot of pagination
    const pagination = page.locator('[data-testid="pagination"]');
    await expect(pagination).toHaveScreenshot('pagination.png');

    // Test pagination button states
    const nextButton = pagination.getByText('Next');
    if ((await nextButton.count()) > 0) {
      await expect(nextButton).toHaveScreenshot('pagination-next-button.png');
    }
  });

  test('Filter visual regression', async ({ page }) => {
    await page.goto('/admin/content/questions');

    // Open filter dropdown
    await page.getByText('Filter').click();

    // Take screenshot of filter dropdown
    const filterDropdown = page.locator('[data-testid="filter-dropdown"]');
    await expect(filterDropdown).toHaveScreenshot('filter-dropdown.png');
  });

  test('Search visual regression', async ({ page }) => {
    await page.goto('/admin/content/questions');

    // Take screenshot of search input
    const searchInput = page.getByPlaceholder('Search questions...');
    await expect(searchInput).toHaveScreenshot('search-input.png');

    // Test search input with value
    await searchInput.fill('JavaScript');
    await expect(searchInput).toHaveScreenshot('search-input-filled.png');
  });

  test('Responsive design visual regression', async ({ page }) => {
    const viewports = [
      { width: 320, height: 568, name: 'mobile-small' },
      { width: 375, height: 667, name: 'mobile' },
      { width: 768, height: 1024, name: 'tablet' },
      { width: 1024, height: 768, name: 'desktop-small' },
      { width: 1440, height: 900, name: 'desktop' },
      { width: 1920, height: 1080, name: 'desktop-large' },
    ];

    for (const viewport of viewports) {
      await page.setViewportSize({
        width: viewport.width,
        height: viewport.height,
      });
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      await expect(page).toHaveScreenshot(`homepage-${viewport.name}.png`);
    }
  });

  test('Dark mode visual regression', async ({ page }) => {
    // Enable dark mode
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Take screenshot in dark mode
    await expect(page).toHaveScreenshot('homepage-dark-mode.png');
  });

  test('High contrast visual regression', async ({ page }) => {
    // Enable high contrast
    await page.emulateMedia({ forcedColors: 'active' });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Take screenshot in high contrast mode
    await expect(page).toHaveScreenshot('homepage-high-contrast.png');
  });

  test('Print styles visual regression', async ({ page }) => {
    await page.goto('/');

    // Take screenshot with print media
    await page.emulateMedia({ media: 'print' });
    await expect(page).toHaveScreenshot('homepage-print.png');
  });
});
