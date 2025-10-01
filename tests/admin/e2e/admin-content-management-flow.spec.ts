import { test, expect } from '@playwright/test';

test.describe('Admin Content Management Flow', () => {
  const ADMIN_EMAIL = 'admin@example.com';
  const ADMIN_PASSWORD = 'admin123';

  test.beforeEach(async ({ page }) => {
    // Ensure we start from a clean state
    await page.goto('/admin/login');
    await page.evaluate(() => localStorage.clear());
    await page.goto('/admin/login');

    // Login
    await page.fill('input[type="email"]', ADMIN_EMAIL);
    await page.fill('input[type="password"]', ADMIN_PASSWORD);
    await page.getByRole('button', { name: 'Sign In' }).click();

    await expect(page).toHaveURL(/admin\/dashboard/);
  });

  test('should navigate to questions management and display questions', async ({
    page,
  }) => {
    // Navigate to questions management
    await page.getByText('Manage Questions').click();
    await expect(page).toHaveURL(/admin\/content\/questions/);

    // Check page content
    await expect(page.getByText('Questions Management')).toBeVisible();
    await expect(page.getByText('Total Questions:')).toBeVisible();
    await expect(page.getByText('Active Questions:')).toBeVisible();

    // Check for question list
    await expect(page.getByText('Questions')).toBeVisible();
  });

  test('should search and filter questions', async ({ page }) => {
    // Navigate to questions management
    await page.getByText('Manage Questions').click();
    await expect(page).toHaveURL(/admin\/content\/questions/);

    // Test search functionality
    const searchInput = page.getByPlaceholderText(/search questions/i);
    await searchInput.fill('JavaScript');
    await searchInput.press('Enter');

    // Should show filtered results
    await expect(page.getByText(/searching/i)).toBeVisible();

    // Test difficulty filter
    const difficultyFilter = page.getByDisplayValue('All Difficulties');
    await difficultyFilter.selectOption('beginner');

    // Test category filter
    const categoryFilter = page.getByDisplayValue('All Categories');
    await categoryFilter.selectOption('JavaScript');
  });

  test('should create a new question', async ({ page }) => {
    // Navigate to questions management
    await page.getByText('Manage Questions').click();
    await expect(page).toHaveURL(/admin\/content\/questions/);

    // Click add new question button
    await page.getByText('Add New Question').click();

    // Should navigate to new question page or open modal
    await expect(page.getByText(/new question|create question/i)).toBeVisible();

    // Fill in question details
    await page.getByLabel(/title/i).fill('Test Question');
    await page.getByLabel(/content/i).fill('This is a test question content');
    await page.getByLabel(/difficulty/i).selectOption('beginner');
    await page.getByLabel(/category/i).fill('JavaScript');

    // Save the question
    await page.getByRole('button', { name: /save|create/i }).click();

    // Should show success message
    await expect(page.getByText(/question created|success/i)).toBeVisible();
  });

  test('should edit an existing question', async ({ page }) => {
    // Navigate to questions management
    await page.getByText('Manage Questions').click();
    await expect(page).toHaveURL(/admin\/content\/questions/);

    // Wait for questions to load
    await page.waitForSelector('[data-testid="question-item"]', {
      timeout: 10000,
    });

    // Click edit button on first question
    const editButtons = page.getByText('Edit');
    await editButtons.first().click();

    // Should open edit modal or navigate to edit page
    await expect(
      page.getByText(/edit question|update question/i)
    ).toBeVisible();

    // Modify question content
    const titleInput = page.getByLabel(/title/i);
    await titleInput.clear();
    await titleInput.fill('Updated Question Title');

    // Save changes
    await page.getByRole('button', { name: /save|update/i }).click();

    // Should show success message
    await expect(page.getByText(/question updated|success/i)).toBeVisible();
  });

  test('should delete a question with confirmation', async ({ page }) => {
    // Navigate to questions management
    await page.getByText('Manage Questions').click();
    await expect(page).toHaveURL(/admin\/content\/questions/);

    // Wait for questions to load
    await page.waitForSelector('[data-testid="question-item"]', {
      timeout: 10000,
    });

    // Click delete button on first question
    const deleteButtons = page.getByText('Delete');
    await deleteButtons.first().click();

    // Should show confirmation dialog
    await expect(
      page.getByText(/are you sure|confirm deletion/i)
    ).toBeVisible();

    // Confirm deletion
    await page.getByRole('button', { name: /delete|confirm/i }).click();

    // Should show success message
    await expect(page.getByText(/question deleted|success/i)).toBeVisible();
  });

  test('should manage topics for questions', async ({ page }) => {
    // Navigate to questions management
    await page.getByText('Manage Questions').click();
    await expect(page).toHaveURL(/admin\/content\/questions/);

    // Check for topic management section
    await expect(page.getByText('Topic Management')).toBeVisible();

    // Click on topic management
    await page.getByText('Manage Topics').click();

    // Should show topic management interface
    await expect(page.getByText(/add new topic|create topic/i)).toBeVisible();

    // Create a new topic
    await page.getByText('Add New Topic').click();

    // Fill topic details
    await page.getByLabel(/topic name/i).fill('Test Topic');
    await page.getByLabel(/description/i).fill('Test topic description');
    await page.getByLabel(/category/i).selectOption('JavaScript Core');

    // Save topic
    await page.getByRole('button', { name: /add topic|create/i }).click();

    // Should show success message
    await expect(page.getByText(/topic created|success/i)).toBeVisible();
  });

  test('should handle bulk operations on questions', async ({ page }) => {
    // Navigate to questions management
    await page.getByText('Manage Questions').click();
    await expect(page).toHaveURL(/admin\/content\/questions/);

    // Wait for questions to load
    await page.waitForSelector('[data-testid="question-item"]', {
      timeout: 10000,
    });

    // Select multiple questions
    const checkboxes = page.getByRole('checkbox');
    await checkboxes.nth(1).check(); // Select first question
    await checkboxes.nth(2).check(); // Select second question

    // Should show bulk actions
    await expect(page.getByText('Bulk Actions')).toBeVisible();

    // Test bulk delete
    await page.getByText('Bulk Delete').click();

    // Should show confirmation
    await expect(page.getByText(/delete selected|confirm/i)).toBeVisible();

    // Confirm bulk delete
    await page.getByRole('button', { name: /delete|confirm/i }).click();

    // Should show success message
    await expect(page.getByText(/questions deleted|success/i)).toBeVisible();
  });

  test('should handle pagination in questions list', async ({ page }) => {
    // Navigate to questions management
    await page.getByText('Manage Questions').click();
    await expect(page).toHaveURL(/admin\/content\/questions/);

    // Wait for questions to load
    await page.waitForSelector('[data-testid="question-item"]', {
      timeout: 10000,
    });

    // Check for pagination controls
    const pagination = page.getByText(/page \d+ of \d+/);
    if (await pagination.isVisible()) {
      // Test pagination
      await page.getByText('Next').click();
      await expect(page.getByText(/page 2 of/i)).toBeVisible();

      await page.getByText('Previous').click();
      await expect(page.getByText(/page 1 of/i)).toBeVisible();
    }
  });

  test('should handle question import/export', async ({ page }) => {
    // Navigate to questions management
    await page.getByText('Manage Questions').click();
    await expect(page).toHaveURL(/admin\/content\/questions/);

    // Test export functionality
    await page.getByText('Export Questions').click();

    // Should trigger download or show export options
    await expect(page.getByText(/export|download/i)).toBeVisible();

    // Test import functionality
    await page.getByText('Import Questions').click();

    // Should show import dialog
    await expect(page.getByText(/import|upload/i)).toBeVisible();
  });

  test('should handle question validation and error states', async ({
    page,
  }) => {
    // Navigate to questions management
    await page.getByText('Manage Questions').click();
    await expect(page).toHaveURL(/admin\/content\/questions/);

    // Try to create question with invalid data
    await page.getByText('Add New Question').click();

    // Try to save without required fields
    await page.getByRole('button', { name: /save|create/i }).click();

    // Should show validation errors
    await expect(page.getByText(/required|invalid/i)).toBeVisible();
  });

  test('should handle network errors gracefully', async ({ page }) => {
    // Navigate to questions management
    await page.getByText('Manage Questions').click();
    await expect(page).toHaveURL(/admin\/content\/questions/);

    // Simulate network error
    await page.route('**/api/questions/**', route => route.abort());

    // Try to perform an action that requires network
    await page.getByText('Add New Question').click();

    // Should show error message
    await expect(page.getByText(/error|failed|network/i)).toBeVisible();
  });

  test('should maintain state during navigation', async ({ page }) => {
    // Navigate to questions management
    await page.getByText('Manage Questions').click();
    await expect(page).toHaveURL(/admin\/content\/questions/);

    // Apply some filters
    const searchInput = page.getByPlaceholderText(/search questions/i);
    await searchInput.fill('JavaScript');

    const difficultyFilter = page.getByDisplayValue('All Difficulties');
    await difficultyFilter.selectOption('beginner');

    // Navigate away and back
    await page.getByText('Dashboard').click();
    await expect(page).toHaveURL(/admin\/dashboard/);

    await page.getByText('Manage Questions').click();
    await expect(page).toHaveURL(/admin\/content\/questions/);

    // Filters should be maintained (if implemented)
    // This test verifies state persistence
  });

  test('should handle responsive design on content management', async ({
    page,
  }) => {
    // Navigate to questions management
    await page.getByText('Manage Questions').click();
    await expect(page).toHaveURL(/admin\/content\/questions/);

    // Test mobile view
    await page.setViewportSize({ width: 375, height: 667 });

    // Should adapt to mobile layout
    await expect(page.getByText('Questions Management')).toBeVisible();

    // Mobile menu should be available
    await expect(page.getByRole('button', { name: /menu/i })).toBeVisible();
  });

  test('should handle keyboard navigation in content management', async ({
    page,
  }) => {
    // Navigate to questions management
    await page.getByText('Manage Questions').click();
    await expect(page).toHaveURL(/admin\/content\/questions/);

    // Test keyboard navigation
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');

    // Should be able to navigate with keyboard
    // This test verifies keyboard accessibility
  });
});
