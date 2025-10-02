import { test, expect } from '@playwright/test';

test.describe('Admin Question Management', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to admin login page
    await page.goto('/admin/login');

    // Mock admin authentication
    await page.evaluate(() => {
      localStorage.setItem('admin-auth', 'true');
      localStorage.setItem(
        'admin-user',
        JSON.stringify({
          id: 'admin-1',
          email: 'admin@example.com',
          name: 'Admin User',
          role: 'admin',
        })
      );
    });
  });

  test('should display question management page', async ({ page }) => {
    await page.goto('/admin/content/questions');

    // Check if the page loads correctly
    await expect(page.locator('h1')).toContainText('Question Management');
    await expect(page.locator('[data-testid="questions-table"]')).toBeVisible();
  });

  test('should add a new question', async ({ page }) => {
    await page.goto('/admin/content/questions');

    // Click Add Question button
    await page.click('button:has-text("Add Question")');

    // Fill in the form
    await page.fill('input[name="title"]', 'Test Question');
    await page.fill('textarea[name="content"]', 'What is React?');
    await page.selectOption('select[name="type"]', 'single');
    await page.fill('input[name="options.0"]', 'A library');
    await page.fill('input[name="options.1"]', 'A framework');
    await page.fill('input[name="options.2"]', 'A language');
    await page.fill('input[name="options.3"]', 'A database');
    await page.fill('input[name="correctAnswers.0"]', 'A library');
    await page.fill(
      'textarea[name="explanation"]',
      'React is a JavaScript library'
    );
    await page.selectOption('select[name="category"]', 'React');
    await page.selectOption('select[name="difficulty"]', 'easy');
    await page.selectOption('select[name="learningPath"]', 'react-basics');

    // Submit the form
    await page.click('button:has-text("Create Question")');

    // Verify success message
    await expect(
      page.locator('text=Question created successfully')
    ).toBeVisible();

    // Verify question appears in the table
    await expect(page.locator('text=Test Question')).toBeVisible();
  });

  test('should edit an existing question', async ({ page }) => {
    await page.goto('/admin/content/questions');

    // Click edit button for first question
    await page.click('[data-testid="edit-question-1"]');

    // Update the title
    await page.fill('input[name="title"]', 'Updated Question Title');

    // Submit the form
    await page.click('button:has-text("Update Question")');

    // Verify success message
    await expect(
      page.locator('text=Question updated successfully')
    ).toBeVisible();

    // Verify updated title appears in the table
    await expect(page.locator('text=Updated Question Title')).toBeVisible();
  });

  test('should delete a question', async ({ page }) => {
    await page.goto('/admin/content/questions');

    // Click delete button for first question
    await page.click('[data-testid="delete-question-1"]');

    // Confirm deletion
    await page.click('button:has-text("Delete")');

    // Verify success message
    await expect(
      page.locator('text=Question deleted successfully')
    ).toBeVisible();
  });

  test('should filter questions by category', async ({ page }) => {
    await page.goto('/admin/content/questions');

    // Select category filter
    await page.selectOption('select[name="category"]', 'React');

    // Wait for filtered results
    await page.waitForSelector('[data-testid="questions-table"]');

    // Verify only React questions are shown
    const questionRows = page.locator(
      '[data-testid="questions-table"] tbody tr'
    );
    const count = await questionRows.count();

    for (let i = 0; i < count; i++) {
      const category = await questionRows
        .nth(i)
        .locator('td:nth-child(6)')
        .textContent();
      expect(category).toBe('React');
    }
  });

  test('should filter questions by learning path', async ({ page }) => {
    await page.goto('/admin/content/questions');

    // Select learning path filter
    await page.selectOption('select[name="learningPath"]', 'react-basics');

    // Wait for filtered results
    await page.waitForSelector('[data-testid="questions-table"]');

    // Verify only react-basics questions are shown
    const questionRows = page.locator(
      '[data-testid="questions-table"] tbody tr'
    );
    const count = await questionRows.count();

    for (let i = 0; i < count; i++) {
      const learningPath = await questionRows
        .nth(i)
        .locator('td:nth-child(7)')
        .textContent();
      expect(learningPath).toBe('react-basics');
    }
  });

  test('should search questions', async ({ page }) => {
    await page.goto('/admin/content/questions');

    // Enter search term
    await page.fill('input[placeholder="Search questions..."]', 'React');

    // Click search button
    await page.click('button:has-text("Search")');

    // Wait for search results
    await page.waitForSelector('[data-testid="questions-table"]');

    // Verify search results contain the search term
    const questionRows = page.locator(
      '[data-testid="questions-table"] tbody tr'
    );
    const count = await questionRows.count();

    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const title = await questionRows
        .nth(i)
        .locator('td:nth-child(2)')
        .textContent();
      expect(title?.toLowerCase()).toContain('react');
    }
  });

  test('should handle pagination', async ({ page }) => {
    await page.goto('/admin/content/questions');

    // Check if pagination controls are visible
    await expect(page.locator('[data-testid="pagination"]')).toBeVisible();

    // Click next page if available
    const nextButton = page.locator('button:has-text("Next")');
    if (await nextButton.isEnabled()) {
      await nextButton.click();

      // Verify page number updated
      await expect(page.locator('[data-testid="current-page"]')).toContainText(
        '2'
      );
    }
  });

  test('should bulk import questions from markdown', async ({ page }) => {
    await page.goto('/admin/content/questions');

    // Click bulk import button
    await page.click('button:has-text("Bulk Import")');

    // Switch to markdown tab
    await page.click('text=Markdown Format');

    // Enter markdown content
    const markdownContent = `
# What is React?

React is a JavaScript library for building user interfaces.

- A: A library
- B: A framework
- C: A language
- D: A database

<details>
<summary><b>Answer</b></summary>
<p>#### Answer: A</p>
</details>

**Explanation:** React is a library, not a framework.
    `;

    await page.fill('textarea[name="markdownInput"]', markdownContent);

    // Parse markdown
    await page.click('button:has-text("Parse Markdown")');

    // Wait for preview
    await expect(page.locator('text=Preview (1 questions)')).toBeVisible();

    // Save questions
    await page.click('button:has-text("Save Questions")');

    // Verify success message
    await expect(
      page.locator('text=Successfully imported 1 questions')
    ).toBeVisible();
  });

  test('should bulk import questions from JSON', async ({ page }) => {
    await page.goto('/admin/content/questions');

    // Click bulk import button
    await page.click('button:has-text("Bulk Import")');

    // Switch to JSON tab
    await page.click('text=JSON Format');

    // Enter JSON content
    const jsonContent = JSON.stringify([
      {
        title: 'What is TypeScript?',
        content: 'TypeScript is a typed superset of JavaScript.',
        type: 'single',
        options: ['A library', 'A framework', 'A language', 'A database'],
        correctAnswers: ['A framework'],
        explanation:
          'TypeScript is a framework that adds static typing to JavaScript.',
        category: 'TypeScript',
        difficulty: 'medium',
        learningPath: 'typescript-basics',
      },
    ]);

    await page.fill('textarea[name="jsonInput"]', jsonContent);

    // Parse JSON
    await page.click('button:has-text("Parse JSON")');

    // Wait for preview
    await expect(page.locator('text=Preview (1 questions)')).toBeVisible();

    // Save questions
    await page.click('button:has-text("Save Questions")');

    // Verify success message
    await expect(
      page.locator('text=Successfully imported 1 questions')
    ).toBeVisible();
  });

  test('should display question statistics', async ({ page }) => {
    await page.goto('/admin/content/questions');

    // Check if statistics are displayed
    await expect(page.locator('text=Total Questions:')).toBeVisible();
    await expect(page.locator('text=Questions by Category:')).toBeVisible();
    await expect(page.locator('text=Questions by Difficulty:')).toBeVisible();
  });

  test('should handle errors gracefully', async ({ page }) => {
    await page.goto('/admin/content/questions');

    // Mock API error
    await page.route('**/api/questions/unified**', route => {
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({
          success: false,
          error: 'Internal server error',
        }),
      });
    });

    // Reload page to trigger error
    await page.reload();

    // Verify error message is displayed
    await expect(
      page.locator('text=Error: Internal server error')
    ).toBeVisible();
  });

  test('should clear all questions', async ({ page }) => {
    await page.goto('/admin/content/questions');

    // Click clear all questions button
    await page.click('button:has-text("Clear All Questions")');

    // Confirm deletion
    await page.click('button:has-text("Confirm Clear")');

    // Verify success message
    await expect(
      page.locator('text=All questions cleared successfully')
    ).toBeVisible();

    // Verify no questions are displayed
    await expect(page.locator('text=No questions found')).toBeVisible();
  });
});
