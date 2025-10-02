import { test, expect } from '@playwright/test';

test.describe('Complete User Flows - End-to-End Journey', () => {
  test.beforeEach(async ({ page }) => {
    // Start at homepage
    await page.goto('/');
  });

  test('Complete free-style learning journey', async ({ page }) => {
    // 1. Homepage exploration
    await expect(page).toHaveTitle(/Elzatona Web/);
    await expect(page.getByText('Master Frontend Development')).toBeVisible();

    // 2. Navigate to learning paths
    await page.getByText('Learning Paths').click();
    await expect(page).toHaveURL(/.*learning-paths/);

    // 3. Browse and select a learning path
    const firstPath = page
      .locator('[data-testid="learning-path-card"]')
      .first();
    await firstPath.click();
    await expect(page).toHaveURL(/.*learning-paths\/\d+/);

    // 4. Start learning
    await page.getByText('Start Learning').click();
    await expect(page).toHaveURL(/.*questions/);

    // 5. Answer questions
    const questionCard = page.locator('[data-testid="question-card"]');
    await expect(questionCard).toBeVisible();

    // Answer first question
    const firstOption = page.locator('[data-testid="question-option"]').first();
    await firstOption.click();
    await page.getByText('Submit Answer').click();

    // Check answer feedback
    const feedback = page.locator('[data-testid="answer-feedback"]');
    await expect(feedback).toBeVisible();

    // 6. Continue to next question
    if ((await page.getByText('Next Question').count()) > 0) {
      await page.getByText('Next Question').click();

      // Answer second question
      const secondOption = page
        .locator('[data-testid="question-option"]')
        .first();
      await secondOption.click();
      await page.getByText('Submit Answer').click();
    }

    // 7. Complete session
    if ((await page.getByText('Complete Session').count()) > 0) {
      await page.getByText('Complete Session').click();

      // Check completion message
      await expect(page.getByText('Congratulations')).toBeVisible();
    }

    // 8. Navigate to dashboard
    await page.goto('/dashboard');
    await expect(page).toHaveTitle(/Dashboard/);

    // 9. Check progress
    const progressSection = page.locator('[data-testid="progress-section"]');
    await expect(progressSection).toBeVisible();
  });

  test('Complete guided learning journey', async ({ page }) => {
    // 1. Navigate to guided learning
    await page.goto('/features/guided-learning');
    await expect(page).toHaveTitle(/Guided Learning/);

    // 2. Select a learning plan
    const planCard = page.locator('[data-testid="learning-plan-card"]').first();
    await planCard.click();
    await expect(page).toHaveURL(/.*guided-learning\/\d+-day-plan/);

    // 3. Start the plan
    await page.getByText('Start Plan').click();
    await expect(page).toHaveURL(/.*guided-practice/);

    // 4. Complete guided practice session
    const practiceInterface = page.locator(
      '[data-testid="guided-practice-interface"]'
    );
    await expect(practiceInterface).toBeVisible();

    // Answer questions in guided mode
    const questionCard = page.locator('[data-testid="question-card"]');
    await expect(questionCard).toBeVisible();

    // Answer first question
    const firstOption = page.locator('[data-testid="question-option"]').first();
    await firstOption.click();
    await page.getByText('Submit Answer').click();

    // Check guided feedback
    const guidedFeedback = page.locator('[data-testid="guided-feedback"]');
    await expect(guidedFeedback).toBeVisible();

    // 5. Continue through guided session
    if ((await page.getByText('Next Question').count()) > 0) {
      await page.getByText('Next Question').click();

      // Answer more questions
      const nextOption = page
        .locator('[data-testid="question-option"]')
        .first();
      await nextOption.click();
      await page.getByText('Submit Answer').click();
    }

    // 6. Complete guided session
    if ((await page.getByText('Complete Session').count()) > 0) {
      await page.getByText('Complete Session').click();

      // Check guided completion
      await expect(page.getByText('Plan Completed')).toBeVisible();
    }
  });

  test('Complete practice selection journey', async ({ page }) => {
    // 1. Navigate to practice selection
    await page.goto('/practice-selection');
    await expect(page).toHaveTitle(/Practice Selection/);

    // 2. Select browse questions option
    await page.getByText('Browse Practice Questions').click();
    await expect(page).toHaveURL(/.*browse-practice-questions/);

    // 3. Use search and filters
    const searchInput = page.getByPlaceholder('Search questions...');
    await searchInput.fill('JavaScript');
    await page.keyboard.press('Enter');

    // 4. Filter by category
    const categoryFilter = page.getByText('Category');
    await categoryFilter.click();
    await page.getByText('JavaScript').click();

    // 5. Select a question
    const questionCard = page.locator('[data-testid="question-card"]').first();
    await questionCard.click();
    await expect(page).toHaveURL(/.*questions\/\d+/);

    // 6. Answer the question
    const answerOptions = page.locator('[data-testid="answer-option"]');
    await answerOptions.first().click();
    await page.getByText('Submit Answer').click();

    // 7. Check answer explanation
    const explanation = page.locator('[data-testid="explanation"]');
    await expect(explanation).toBeVisible();

    // 8. Navigate back to practice selection
    await page.goBack();
    await expect(page).toHaveURL(/.*browse-practice-questions/);
  });

  test('Complete coding challenge journey', async ({ page }) => {
    // 1. Navigate to challenges
    await page.goto('/challenges');
    await expect(page).toHaveTitle(/Challenges/);

    // 2. Select a coding challenge
    const challengeCard = page
      .locator('[data-testid="challenge-card"]')
      .first();
    await challengeCard.click();
    await expect(page).toHaveURL(/.*coding\/\d+/);

    // 3. Complete coding challenge
    const codeEditor = page.locator('[data-testid="code-editor"]');
    await expect(codeEditor).toBeVisible();

    // Write some code
    await codeEditor.fill('function solution() {\n  return "Hello World";\n}');

    // 4. Run tests
    await page.getByText('Run Tests').click();

    // Check test results
    const testResults = page.locator('[data-testid="test-results"]');
    await expect(testResults).toBeVisible();

    // 5. Submit solution
    await page.getByText('Submit Solution').click();

    // Check submission feedback
    const submissionFeedback = page.locator(
      '[data-testid="submission-feedback"]'
    );
    await expect(submissionFeedback).toBeVisible();
  });

  test('Complete custom roadmap journey', async ({ page }) => {
    // 1. Navigate to custom roadmap
    await page.goto('/custom-roadmap');
    await expect(page).toHaveTitle(/Custom Roadmap/);

    // 2. Select skills
    const skillSelector = page.locator('[data-testid="skill-selector"]');
    await expect(skillSelector).toBeVisible();

    // Select JavaScript skill
    await page.getByText('JavaScript').click();
    await page.getByText('React').click();
    await page.getByText('CSS').click();

    // 3. Set difficulty level
    const difficultySelector = page.getByText('Beginner');
    await difficultySelector.click();

    // 4. Generate roadmap
    await page.getByText('Generate Roadmap').click();

    // Check generated roadmap
    const roadmap = page.locator('[data-testid="generated-roadmap"]');
    await expect(roadmap).toBeVisible();

    // 5. Save roadmap
    await page.getByText('Save Roadmap').click();

    // Check save confirmation
    await expect(page.getByText('Roadmap saved successfully')).toBeVisible();
  });

  test('Complete admin management journey', async ({ page }) => {
    // 1. Navigate to admin dashboard
    await page.goto('/admin');
    await expect(page).toHaveTitle(/Admin Dashboard/);

    // 2. Navigate to questions management
    await page.getByText('Questions').click();
    await expect(page).toHaveURL(/.*admin\/content\/questions/);

    // 3. Add a new question
    await page.getByText('Add Question').click();

    const addModal = page.locator('[data-testid="add-question-modal"]');
    await expect(addModal).toBeVisible();

    // Fill question form
    await page.getByLabel('Title').fill('E2E Test Question');
    await page
      .getByLabel('Content')
      .fill('This is a test question for E2E testing');
    await page.getByLabel('Type').selectOption('multiple-choice');
    await page.getByLabel('Difficulty').selectOption('intermediate');
    await page.getByLabel('Category').selectOption('Testing');
    await page.getByLabel('Learning Path').selectOption('JavaScript Deep Dive');

    // Add options
    await page.getByLabel('Option 1').fill('Option A');
    await page.getByLabel('Option 2').fill('Option B');
    await page.getByLabel('Option 3').fill('Option C');
    await page.getByLabel('Option 4').fill('Option D');

    // Set correct answer
    await page.getByLabel('Correct Answer').selectOption('2');

    // Add explanation
    await page
      .getByLabel('Explanation')
      .fill('This is the correct answer because...');

    // Submit question
    await page.getByText('Create Question').click();

    // Check success message
    await expect(page.getByText('Question created successfully')).toBeVisible();

    // 4. Edit the question
    const editButton = page.locator('[data-testid="edit-question"]').first();
    await editButton.click();

    const editModal = page.locator('[data-testid="edit-question-modal"]');
    await expect(editModal).toBeVisible();

    // Update question title
    await page.getByLabel('Title').fill('Updated E2E Test Question');

    // Submit changes
    await page.getByText('Update Question').click();

    // Check success message
    await expect(page.getByText('Question updated successfully')).toBeVisible();

    // 5. Test bulk operations
    const checkboxes = page.locator('input[type="checkbox"]');
    await checkboxes.nth(0).check();
    await checkboxes.nth(1).check();

    // Check bulk actions appear
    const bulkActions = page.locator('[data-testid="bulk-actions"]');
    await expect(bulkActions).toBeVisible();

    // 6. Test search and filtering
    const searchInput = page.getByPlaceholder('Search questions...');
    await searchInput.fill('E2E');
    await page.keyboard.press('Enter');

    // Check search results
    const searchResults = page.locator('[data-testid="question-row"]');
    await expect(searchResults.first()).toBeVisible();

    // 7. Navigate to categories and topics
    await page.getByText('Categories & Topics').click();
    await expect(page).toHaveURL(/.*admin\/enhanced-structure/);

    // 8. Add a new category
    await page.getByText('Add Category').click();

    const addCategoryModal = page.locator('[data-testid="add-category-modal"]');
    await expect(addCategoryModal).toBeVisible();

    // Fill category form
    await page.getByLabel('Name').fill('E2E Testing');
    await page.getByLabel('Description').fill('End-to-end testing category');

    // Submit category
    await page.getByText('Create Category').click();

    // Check success message
    await expect(page.getByText('Category created successfully')).toBeVisible();
  });

  test('Complete authentication journey', async ({ page }) => {
    // 1. Click sign in
    await page.getByText('Sign In').click();

    // Check sign in modal
    const signInModal = page.locator('[data-testid="sign-in-modal"]');
    await expect(signInModal).toBeVisible();

    // 2. Fill sign in form
    await page.getByLabel('Email').fill('test@example.com');
    await page.getByLabel('Password').fill('password123');

    // 3. Submit sign in
    await page.getByText('Sign In').click();

    // Check authentication success
    await expect(page.getByText('Welcome, test@example.com')).toBeVisible();

    // 4. Access protected route
    await page.goto('/dashboard');
    await expect(page).toHaveTitle(/Dashboard/);

    // 5. Sign out
    await page.getByText('Sign Out').click();

    // Check sign out success
    await expect(page.getByText('Sign In')).toBeVisible();
  });

  test('Complete mobile responsive journey', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // 1. Test mobile homepage
    await page.goto('/');
    await expect(page).toHaveTitle(/Elzatona Web/);

    // Check mobile navigation
    const menuButton = page.getByRole('button', { name: /menu/i });
    await expect(menuButton).toBeVisible();

    // 2. Open mobile menu
    await menuButton.click();

    const mobileMenu = page.locator('[data-testid="mobile-menu"]');
    await expect(mobileMenu).toBeVisible();

    // 3. Navigate to learning paths
    await page.getByText('Learning Paths').click();
    await expect(page).toHaveURL(/.*learning-paths/);

    // 4. Test mobile learning path view
    const firstPath = page
      .locator('[data-testid="learning-path-card"]')
      .first();
    await firstPath.click();
    await expect(page).toHaveURL(/.*learning-paths\/\d+/);

    // 5. Test mobile question interface
    await page.getByText('Start Learning').click();
    await expect(page).toHaveURL(/.*questions/);

    const questionCard = page.locator('[data-testid="question-card"]');
    await expect(questionCard).toBeVisible();

    // 6. Answer question on mobile
    const firstOption = page.locator('[data-testid="question-option"]').first();
    await firstOption.click();
    await page.getByText('Submit Answer').click();

    // Check mobile feedback
    const feedback = page.locator('[data-testid="answer-feedback"]');
    await expect(feedback).toBeVisible();
  });

  test('Complete error handling journey', async ({ page }) => {
    // 1. Test 404 page
    await page.goto('/non-existent-page');
    await expect(page.getByText('404')).toBeVisible();
    await expect(page.getByText('Page Not Found')).toBeVisible();

    // Navigate back to home
    await page.getByText('Go Home').click();
    await expect(page).toHaveURL('/');

    // 2. Test network error handling
    await page.route('**/api/questions/unified', route => route.abort());

    await page.goto('/admin/content/questions');

    // Check error message
    await expect(page.getByText('Failed to load questions')).toBeVisible();

    // 3. Test recovery
    await page.unroute('**/api/questions/unified');
    await page.getByText('Retry').click();

    // Check recovery success
    await expect(page.getByText('Failed to load questions')).not.toBeVisible();
  });

  test('Complete performance journey', async ({ page }) => {
    // 1. Test homepage performance
    const startTime = Date.now();
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;

    // Should load within 3 seconds
    expect(loadTime).toBeLessThan(3000);

    // 2. Test learning paths performance
    const learningPathsStartTime = Date.now();
    await page.goto('/learning-paths');
    await page.waitForLoadState('networkidle');
    const learningPathsLoadTime = Date.now() - learningPathsStartTime;

    // Should load within 4 seconds
    expect(learningPathsLoadTime).toBeLessThan(4000);

    // 3. Test questions performance
    const questionsStartTime = Date.now();
    await page.goto('/features/learning-paths/1/questions');
    await page.waitForLoadState('networkidle');
    const questionsLoadTime = Date.now() - questionsStartTime;

    // Should load within 5 seconds
    expect(questionsLoadTime).toBeLessThan(5000);

    // 4. Test admin performance
    const adminStartTime = Date.now();
    await page.goto('/admin/content/questions');
    await page.waitForLoadState('networkidle');
    const adminLoadTime = Date.now() - adminStartTime;

    // Should load within 6 seconds
    expect(adminLoadTime).toBeLessThan(6000);
  });

  test('Complete accessibility journey', async ({ page }) => {
    // 1. Test keyboard navigation
    await page.keyboard.press('Tab');
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();

    // 2. Test skip links
    const skipLink = page.locator('a[href="#main-content"]');
    if ((await skipLink.count()) > 0) {
      await expect(skipLink).toBeVisible();
    }

    // 3. Test ARIA labels
    const buttons = page.locator('button');
    const buttonCount = await buttons.count();

    for (let i = 0; i < Math.min(buttonCount, 5); i++) {
      const button = buttons.nth(i);
      const ariaLabel = await button.getAttribute('aria-label');
      const textContent = await button.textContent();

      // Button should have accessible name
      expect(ariaLabel || textContent).toBeTruthy();
    }

    // 4. Test form accessibility
    await page.goto('/admin/content/questions');
    await page.getByText('Add Question').click();

    const form = page.locator('form');
    await expect(form).toBeVisible();

    // Check form labels
    const inputs = page.locator('input, select, textarea');
    const inputCount = await inputs.count();

    for (let i = 0; i < Math.min(inputCount, 5); i++) {
      const input = inputs.nth(i);
      const id = await input.getAttribute('id');
      if (id) {
        const label = page.locator(`label[for="${id}"]`);
        await expect(label).toBeVisible();
      }
    }
  });
});
