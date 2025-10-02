import { test, expect } from '@playwright/test';

test.describe('Admin Workflow', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to admin login
    await page.goto('/admin');
  });

  test('Admin login and dashboard access', async ({ page }) => {
    // Check admin login page
    await expect(page.getByText('Admin Login')).toBeVisible();

    // Fill admin credentials
    await page.getByLabel('Email').fill('admin@example.com');
    await page.getByLabel('Password').fill('admin123');

    // Submit login
    await page.getByText('Sign In').click();

    // Should navigate to admin dashboard
    await expect(page).toHaveURL('/admin/dashboard');
    await expect(page.getByText('Admin Dashboard')).toBeVisible();
  });

  test('Question management workflow', async ({ page }) => {
    // Login as admin
    await page.goto('/admin');
    await page.getByLabel('Email').fill('admin@example.com');
    await page.getByLabel('Password').fill('admin123');
    await page.getByText('Sign In').click();

    // Navigate to questions management
    await page.getByText('Content Management').click();
    await page.getByText('Questions').click();

    // Should show questions page
    await expect(page).toHaveURL('/admin/content/questions');
    await expect(page.getByText('Question Management')).toBeVisible();
  });

  test('Add new question', async ({ page }) => {
    // Login and navigate to questions
    await page.goto('/admin/content/questions');

    // Click add question button
    await page.getByText('Add Question').click();

    // Fill question form
    await page.getByLabel('Title').fill('Test Question');
    await page.getByLabel('Content').fill('What is React?');
    await page.getByLabel('Type').selectOption('multiple-choice');

    // Add options
    await page.getByLabel('Option 1').fill('A library');
    await page.getByLabel('Option 2').fill('A framework');
    await page.getByLabel('Option 3').fill('A language');
    await page.getByLabel('Option 4').fill('A database');

    // Set correct answer
    await page.getByLabel('Correct Answer').selectOption('A library');

    // Fill other fields
    await page.getByLabel('Explanation').fill('React is a JavaScript library');
    await page.getByLabel('Category').fill('Frontend');
    await page.getByLabel('Difficulty').selectOption('beginner');

    // Submit question
    await page.getByText('Create Question').click();

    // Should show success message
    await expect(page.getByText('Question created successfully')).toBeVisible();
  });

  test('Edit existing question', async ({ page }) => {
    // Login and navigate to questions
    await page.goto('/admin/content/questions');

    // Wait for questions to load
    await expect(page.getByText('Question Management')).toBeVisible();

    // Click edit button on first question
    const editButton = page.locator('[data-testid="edit-question-1"]');
    await editButton.click();

    // Should open edit modal
    await expect(page.getByText('Edit Question')).toBeVisible();

    // Update question title
    await page.getByDisplayValue('Test Question').fill('Updated Question');

    // Submit changes
    await page.getByText('Update Question').click();

    // Should show success message
    await expect(page.getByText('Question updated successfully')).toBeVisible();
  });

  test('Delete question', async ({ page }) => {
    // Login and navigate to questions
    await page.goto('/admin/content/questions');

    // Wait for questions to load
    await expect(page.getByText('Question Management')).toBeVisible();

    // Click delete button on first question
    const deleteButton = page.locator('[data-testid="delete-question-1"]');
    await deleteButton.click();

    // Should show confirmation dialog
    await expect(
      page.getByText('Are you sure you want to delete this question?')
    ).toBeVisible();

    // Confirm deletion
    await page.getByText('Delete').click();

    // Should show success message
    await expect(page.getByText('Question deleted successfully')).toBeVisible();
  });

  test('Bulk import questions', async ({ page }) => {
    // Login and navigate to questions
    await page.goto('/admin/content/questions');

    // Click bulk import button
    await page.getByText('Bulk Import').click();

    // Should show bulk import modal
    await expect(page.getByText('Bulk Import Questions')).toBeVisible();

    // Upload markdown file
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles('tests/fixtures/sample-questions.md');

    // Click parse button
    await page.getByText('Parse Questions').click();

    // Should show parsed questions
    await expect(page.getByText('Parsed Questions')).toBeVisible();

    // Click save button
    await page.getByText('Save Questions').click();

    // Should show success message
    await expect(
      page.getByText('Questions imported successfully')
    ).toBeVisible();
  });

  test('Filter and search questions', async ({ page }) => {
    // Login and navigate to questions
    await page.goto('/admin/content/questions');

    // Filter by category
    await page.getByLabel('Category').selectOption('Frontend');

    // Should show filtered results
    await expect(page.getByText('Filtered Results')).toBeVisible();

    // Search for specific question
    await page.getByPlaceholderText('Search questions...').fill('React');
    await page.getByText('Search').click();

    // Should show search results
    await expect(page.getByText('Search Results')).toBeVisible();
  });

  test('Pagination controls', async ({ page }) => {
    // Login and navigate to questions
    await page.goto('/admin/content/questions');

    // Wait for questions to load
    await expect(page.getByText('Question Management')).toBeVisible();

    // Check pagination controls are visible
    await expect(page.getByText('Previous')).toBeVisible();
    await expect(page.getByText('Next')).toBeVisible();

    // Click next page
    await page.getByText('Next').click();

    // Should navigate to next page
    await expect(page.getByText('Page 2')).toBeVisible();
  });

  test('Learning paths management', async ({ page }) => {
    // Login and navigate to learning paths
    await page.goto('/admin/content/learning-paths');

    // Should show learning paths page
    await expect(page.getByText('Learning Paths Management')).toBeVisible();

    // Click add learning path
    await page.getByText('Add Learning Path').click();

    // Fill learning path form
    await page.getByLabel('Title').fill('New Learning Path');
    await page.getByLabel('Description').fill('A new learning path');
    await page.getByLabel('Difficulty').selectOption('beginner');

    // Submit learning path
    await page.getByText('Create Learning Path').click();

    // Should show success message
    await expect(
      page.getByText('Learning path created successfully')
    ).toBeVisible();
  });

  test('Categories and topics management', async ({ page }) => {
    // Login and navigate to categories & topics
    await page.goto('/admin/enhanced-structure');

    // Should show categories and topics page
    await expect(page.getByText('Categories & Topics')).toBeVisible();

    // Add new category
    await page.getByText('Add Category').click();
    await page.getByLabel('Category Name').fill('New Category');
    await page.getByText('Create Category').click();

    // Should show success message
    await expect(page.getByText('Category created successfully')).toBeVisible();

    // Add new topic
    await page.getByText('Add Topic').click();
    await page.getByLabel('Topic Name').fill('New Topic');
    await page.getByLabel('Category').selectOption('New Category');
    await page.getByText('Create Topic').click();

    // Should show success message
    await expect(page.getByText('Topic created successfully')).toBeVisible();
  });

  test('Admin logout', async ({ page }) => {
    // Login as admin
    await page.goto('/admin');
    await page.getByLabel('Email').fill('admin@example.com');
    await page.getByLabel('Password').fill('admin123');
    await page.getByText('Sign In').click();

    // Click user menu
    await page.getByText('Admin User').click();

    // Click logout
    await page.getByText('Sign Out').click();

    // Should navigate to login page
    await expect(page).toHaveURL('/admin');
    await expect(page.getByText('Admin Login')).toBeVisible();
  });
});
