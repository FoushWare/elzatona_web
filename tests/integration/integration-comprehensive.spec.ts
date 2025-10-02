import { test, expect } from '@playwright/test';

test.describe('Comprehensive Integration Tests', () => {
  test('Complete user registration and learning flow', async ({ page }) => {
    // Start at homepage
    await page.goto('/');
    await expect(page).toHaveTitle(/Elzatona Web/);

    // Navigate to learning paths
    await page.getByText('Learning Paths').click();
    await expect(page).toHaveURL(/.*learning-paths/);

    // Select a learning path
    const firstPath = page
      .locator('[data-testid="learning-path-card"]')
      .first();
    await firstPath.click();
    await expect(page).toHaveURL(/.*learning-paths\/\d+/);

    // Start learning
    await page.getByText('Start Learning').click();
    await expect(page).toHaveURL(/.*questions/);

    // Answer a question
    const firstOption = page.locator('[data-testid="question-option"]').first();
    await firstOption.click();

    // Submit answer
    await page.getByText('Submit Answer').click();

    // Check that progress is saved
    const progressIndicator = page.locator(
      '[data-testid="progress-indicator"]'
    );
    await expect(progressIndicator).toBeVisible();
  });

  test('Admin question management workflow', async ({ page }) => {
    // Navigate to admin questions page
    await page.goto('/admin/content/questions');
    await expect(page).toHaveTitle(/Admin.*Questions/);

    // Add a new question
    await page.getByText('Add Question').click();

    // Fill question form
    await page.getByLabel('Title').fill('Integration Test Question');
    await page
      .getByLabel('Content')
      .fill('What is the purpose of integration testing?');
    await page.getByLabel('Type').selectOption('multiple-choice');
    await page.getByLabel('Difficulty').selectOption('intermediate');
    await page.getByLabel('Category').selectOption('Testing');

    // Add options
    await page.getByLabel('Option 1').fill('To test individual components');
    await page.getByLabel('Option 2').fill('To test component interactions');
    await page.getByLabel('Option 3').fill('To test UI components only');
    await page.getByLabel('Option 4').fill('To test database queries only');

    // Set correct answer
    await page.getByLabel('Correct Answer').selectOption('2');

    // Add explanation
    await page
      .getByLabel('Explanation')
      .fill(
        'Integration testing verifies that different components work together correctly.'
      );

    // Submit question
    await page.getByText('Create Question').click();

    // Verify question was created
    await expect(page.getByText('Question created successfully')).toBeVisible();

    // Verify question appears in table
    await expect(page.getByText('Integration Test Question')).toBeVisible();

    // Edit the question
    const editButton = page.locator('[data-testid="edit-question"]').first();
    await editButton.click();

    // Update question title
    await page.getByLabel('Title').fill('Updated Integration Test Question');
    await page.getByText('Update Question').click();

    // Verify question was updated
    await expect(page.getByText('Question updated successfully')).toBeVisible();
    await expect(
      page.getByText('Updated Integration Test Question')
    ).toBeVisible();

    // Delete the question
    const deleteButton = page
      .locator('[data-testid="delete-question"]')
      .first();
    await deleteButton.click();

    // Confirm deletion
    await page.getByText('Confirm Delete').click();

    // Verify question was deleted
    await expect(page.getByText('Question deleted successfully')).toBeVisible();
    await expect(
      page.getByText('Updated Integration Test Question')
    ).not.toBeVisible();
  });

  test('Bulk question import workflow', async ({ page }) => {
    await page.goto('/admin/content/questions');

    // Open bulk import
    await page.getByText('Bulk Import').click();

    // Switch to markdown mode
    await page.getByText('Markdown').click();

    // Paste markdown content
    const markdownContent = `
###### Question 1
What is React?

\`\`\`javascript
const Component = () => {
  return <div>Hello World</div>;
};
\`\`\`

**Options:**
A) A JavaScript library for building user interfaces
B) A database management system
C) A server-side framework
D) A testing framework

<details>
<summary>Answer</summary>
A) A JavaScript library for building user interfaces

React is a JavaScript library developed by Facebook for building user interfaces, particularly web applications.
</details>
    `;

    await page.getByLabel('Markdown Content').fill(markdownContent);

    // Parse markdown
    await page.getByText('Parse Markdown').click();

    // Verify questions were parsed
    await expect(
      page.getByText('1 questions parsed successfully')
    ).toBeVisible();

    // Save questions
    await page.getByText('Save Questions').click();

    // Verify questions were saved
    await expect(page.getByText('Questions saved successfully')).toBeVisible();

    // Verify question appears in table
    await expect(page.getByText('What is React?')).toBeVisible();
  });

  test('Question filtering and search workflow', async ({ page }) => {
    await page.goto('/admin/content/questions');

    // Test search functionality
    await page.getByPlaceholder('Search questions...').fill('React');
    await page.keyboard.press('Enter');

    // Verify search results
    const searchResults = page.locator('[data-testid="question-row"]');
    const resultCount = await searchResults.count();
    expect(resultCount).toBeGreaterThan(0);

    // Test category filter
    await page.getByText('Filter').click();
    await page.getByText('JavaScript').click();
    await page.getByText('Apply Filter').click();

    // Verify filtered results
    const filteredResults = page.locator('[data-testid="question-row"]');
    const filteredCount = await filteredResults.count();
    expect(filteredCount).toBeGreaterThan(0);

    // Test difficulty filter
    await page.getByText('Filter').click();
    await page.getByText('Intermediate').click();
    await page.getByText('Apply Filter').click();

    // Verify difficulty filtered results
    const difficultyResults = page.locator('[data-testid="question-row"]');
    const difficultyCount = await difficultyResults.count();
    expect(difficultyCount).toBeGreaterThan(0);

    // Clear filters
    await page.getByText('Clear Filters').click();

    // Verify all questions are shown
    const allResults = page.locator('[data-testid="question-row"]');
    const allCount = await allResults.count();
    expect(allCount).toBeGreaterThan(0);
  });

  test('Learning path creation and management workflow', async ({ page }) => {
    // Navigate to learning paths admin
    await page.goto('/admin/enhanced-structure');

    // Create new learning path
    await page.getByText('Add Learning Path').click();

    // Fill learning path form
    await page.getByLabel('Name').fill('Advanced React Patterns');
    await page
      .getByLabel('Description')
      .fill('Learn advanced React patterns and best practices');
    await page.getByLabel('Difficulty').selectOption('advanced');
    await page.getByLabel('Category').selectOption('Frontend Development');

    // Save learning path
    await page.getByText('Create Learning Path').click();

    // Verify learning path was created
    await expect(
      page.getByText('Learning path created successfully')
    ).toBeVisible();
    await expect(page.getByText('Advanced React Patterns')).toBeVisible();

    // Edit learning path
    const editButton = page
      .locator('[data-testid="edit-learning-path"]')
      .first();
    await editButton.click();

    // Update description
    await page
      .getByLabel('Description')
      .fill(
        'Master advanced React patterns and best practices for production applications'
      );
    await page.getByText('Update Learning Path').click();

    // Verify learning path was updated
    await expect(
      page.getByText('Learning path updated successfully')
    ).toBeVisible();
  });

  test('Category and topic management workflow', async ({ page }) => {
    await page.goto('/admin/enhanced-structure');

    // Create new category
    await page.getByText('Add Category').click();
    await page.getByLabel('Name').fill('Mobile Development');
    await page.getByLabel('Description').fill('Mobile app development topics');
    await page.getByText('Create Category').click();

    // Verify category was created
    await expect(page.getByText('Category created successfully')).toBeVisible();
    await expect(page.getByText('Mobile Development')).toBeVisible();

    // Create new topic
    await page.getByText('Add Topic').click();
    await page.getByLabel('Name').fill('React Native');
    await page
      .getByLabel('Description')
      .fill('Cross-platform mobile development with React');
    await page.getByLabel('Category').selectOption('Mobile Development');
    await page.getByText('Create Topic').click();

    // Verify topic was created
    await expect(page.getByText('Topic created successfully')).toBeVisible();
    await expect(page.getByText('React Native')).toBeVisible();
  });

  test('User progress tracking workflow', async ({ page }) => {
    // Start learning session
    await page.goto('/features/learning-paths/1/questions');

    // Answer multiple questions
    for (let i = 0; i < 3; i++) {
      const option = page.locator('[data-testid="question-option"]').first();
      await option.click();
      await page.getByText('Submit Answer').click();

      // Move to next question
      if (i < 2) {
        await page.getByText('Next Question').click();
      }
    }

    // Complete learning session
    await page.getByText('Complete Session').click();

    // Verify progress was saved
    await expect(
      page.getByText('Session completed successfully')
    ).toBeVisible();

    // Check progress dashboard
    await page.goto('/dashboard');
    await expect(page.getByText('Your Progress')).toBeVisible();

    // Verify progress statistics
    const progressStats = page.locator('[data-testid="progress-stats"]');
    await expect(progressStats).toBeVisible();
  });

  test('Flashcard creation and study workflow', async ({ page }) => {
    // Navigate to a question
    await page.goto('/features/learning-paths/1/questions');

    // Add question to flashcards
    const addToFlashcardButton = page.locator(
      '[data-testid="add-to-flashcard"]'
    );
    await addToFlashcardButton.click();

    // Verify flashcard was added
    await expect(page.getByText('Added to flashcards')).toBeVisible();

    // Navigate to flashcards
    await page.goto('/flashcards');

    // Verify flashcard appears
    const flashcard = page.locator('[data-testid="flashcard"]').first();
    await expect(flashcard).toBeVisible();

    // Study flashcard
    await flashcard.click();

    // Verify flashcard content
    const flashcardContent = page.locator('[data-testid="flashcard-content"]');
    await expect(flashcardContent).toBeVisible();

    // Mark as known
    await page.getByText('Mark as Known').click();

    // Verify flashcard was marked
    await expect(page.getByText('Flashcard marked as known')).toBeVisible();
  });

  test('API integration workflow', async ({ page }) => {
    // Test API endpoints through UI interactions

    // Test learning paths API
    await page.goto('/learning-paths');
    await page.waitForLoadState('networkidle');

    // Verify learning paths loaded
    const learningPaths = page.locator('[data-testid="learning-path-card"]');
    const pathCount = await learningPaths.count();
    expect(pathCount).toBeGreaterThan(0);

    // Test questions API
    await page.goto('/admin/content/questions');
    await page.waitForLoadState('networkidle');

    // Verify questions loaded
    const questions = page.locator('[data-testid="question-row"]');
    const questionCount = await questions.count();
    expect(questionCount).toBeGreaterThan(0);

    // Test categories API
    await page.goto('/admin/enhanced-structure');
    await page.waitForLoadState('networkidle');

    // Verify categories loaded
    const categories = page.locator('[data-testid="category-item"]');
    const categoryCount = await categories.count();
    expect(categoryCount).toBeGreaterThan(0);
  });

  test('Error handling and recovery workflow', async ({ page }) => {
    // Test network error handling
    await page.route('**/api/questions/unified', route => route.abort());

    await page.goto('/admin/content/questions');

    // Verify error message is shown
    await expect(page.getByText('Failed to load questions')).toBeVisible();

    // Test recovery
    await page.unroute('**/api/questions/unified');
    await page.getByText('Retry').click();

    // Verify questions load after retry
    await expect(page.getByText('Failed to load questions')).not.toBeVisible();
  });

  test('Authentication integration workflow', async ({ page }) => {
    // Test sign in flow
    await page.goto('/');
    await page.getByText('Sign In').click();

    // Fill sign in form
    await page.getByLabel('Email').fill('test@example.com');
    await page.getByLabel('Password').fill('password123');
    await page.getByText('Sign In').click();

    // Verify user is signed in
    await expect(page.getByText('Welcome, test@example.com')).toBeVisible();

    // Test protected route access
    await page.goto('/admin/content/questions');
    await expect(page).toHaveURL(/.*admin.*questions/);

    // Test sign out
    await page.getByText('Sign Out').click();
    await expect(page.getByText('Sign In')).toBeVisible();
  });

  test('Data persistence workflow', async ({ page }) => {
    // Create data
    await page.goto('/admin/content/questions');
    await page.getByText('Add Question').click();

    await page.getByLabel('Title').fill('Persistence Test Question');
    await page
      .getByLabel('Content')
      .fill('This question tests data persistence');
    await page.getByLabel('Type').selectOption('multiple-choice');
    await page.getByText('Create Question').click();

    // Verify data was saved
    await expect(page.getByText('Question created successfully')).toBeVisible();

    // Refresh page
    await page.reload();

    // Verify data persists
    await expect(page.getByText('Persistence Test Question')).toBeVisible();

    // Navigate away and back
    await page.goto('/');
    await page.goto('/admin/content/questions');

    // Verify data still exists
    await expect(page.getByText('Persistence Test Question')).toBeVisible();
  });

  test('Concurrent user workflow', async ({ browser }) => {
    // Simulate multiple users
    const context1 = await browser.newContext();
    const context2 = await browser.newContext();

    const page1 = await context1.newPage();
    const page2 = await context2.newPage();

    // User 1 creates a question
    await page1.goto('/admin/content/questions');
    await page1.getByText('Add Question').click();
    await page1.getByLabel('Title').fill('User 1 Question');
    await page1.getByLabel('Content').fill('Question created by user 1');
    await page1.getByLabel('Type').selectOption('multiple-choice');
    await page1.getByText('Create Question').click();

    // User 2 should see the question
    await page2.goto('/admin/content/questions');
    await expect(page2.getByText('User 1 Question')).toBeVisible();

    // User 2 edits the question
    const editButton = page2.locator('[data-testid="edit-question"]').first();
    await editButton.click();
    await page2.getByLabel('Title').fill('Updated by User 2');
    await page2.getByText('Update Question').click();

    // User 1 should see the update
    await page1.reload();
    await expect(page1.getByText('Updated by User 2')).toBeVisible();

    // Clean up
    await context1.close();
    await context2.close();
  });
});
