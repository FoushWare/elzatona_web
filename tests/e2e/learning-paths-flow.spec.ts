import { test, expect } from '@playwright/test';

test.describe('Learning Paths Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to learning paths page
    await page.goto('/learning-paths');
  });

  test('should display learning paths page', async ({ page }) => {
    // Check if the page loads correctly
    await expect(page.locator('h1')).toContainText('Learning Paths');
    await expect(
      page.locator('[data-testid="learning-paths-grid"]')
    ).toBeVisible();
  });

  test('should display learning path cards', async ({ page }) => {
    // Check if learning path cards are displayed
    const cards = page.locator('[data-testid="learning-path-card"]');
    await expect(cards).toHaveCount.greaterThan(0);

    // Check if each card has required elements
    const firstCard = cards.first();
    await expect(firstCard.locator('h3')).toBeVisible(); // Title
    await expect(firstCard.locator('p')).toBeVisible(); // Description
    await expect(firstCard.locator('text=questions')).toBeVisible(); // Question count
  });

  test('should navigate to learning path details', async ({ page }) => {
    // Click on first learning path card
    const firstCard = page
      .locator('[data-testid="learning-path-card"]')
      .first();
    const title = await firstCard.locator('h3').textContent();

    await firstCard.click();

    // Verify navigation to learning path details
    await expect(page).toHaveURL(/\/learning-paths\/[^\/]+/);
    await expect(page.locator('h1')).toContainText(title!);
  });

  test('should display learning path sections', async ({ page }) => {
    // Navigate to a specific learning path
    await page.goto('/learning-paths/react-basics');

    // Check if sections are displayed
    await expect(
      page.locator('[data-testid="learning-sections"]')
    ).toBeVisible();

    // Check if each section has required elements
    const sections = page.locator('[data-testid="learning-section"]');
    await expect(sections).toHaveCount.greaterThan(0);

    const firstSection = sections.first();
    await expect(firstSection.locator('h3')).toBeVisible(); // Section title
    await expect(firstSection.locator('text=questions')).toBeVisible(); // Question count
  });

  test('should navigate to section questions', async ({ page }) => {
    // Navigate to a specific learning path
    await page.goto('/learning-paths/react-basics');

    // Click on first section
    const firstSection = page
      .locator('[data-testid="learning-section"]')
      .first();
    const sectionTitle = await firstSection.locator('h3').textContent();

    await firstSection.click();

    // Verify navigation to section questions
    await expect(page).toHaveURL(/\/learning-paths\/[^\/]+\/sections\/[^\/]+/);
    await expect(page.locator('h1')).toContainText(sectionTitle!);
  });

  test('should display questions in section', async ({ page }) => {
    // Navigate to a specific section
    await page.goto('/learning-paths/react-basics/sections/html-fundamentals');

    // Check if questions are displayed
    await expect(page.locator('[data-testid="questions-list"]')).toBeVisible();

    // Check if each question has required elements
    const questions = page.locator('[data-testid="question-item"]');
    await expect(questions).toHaveCount.greaterThan(0);

    const firstQuestion = questions.first();
    await expect(firstQuestion.locator('h4')).toBeVisible(); // Question title
    await expect(firstQuestion.locator('text=Difficulty:')).toBeVisible(); // Difficulty
    await expect(firstQuestion.locator('text=Points:')).toBeVisible(); // Points
  });

  test('should start practice session', async ({ page }) => {
    // Navigate to a specific section
    await page.goto('/learning-paths/react-basics/sections/html-fundamentals');

    // Click start practice button
    await page.click('button:has-text("Start Practice")');

    // Verify navigation to practice page
    await expect(page).toHaveURL(
      /\/learning-paths\/[^\/]+\/sections\/[^\/]+\/questions/
    );

    // Check if practice interface is displayed
    await expect(
      page.locator('[data-testid="practice-interface"]')
    ).toBeVisible();
    await expect(
      page.locator('[data-testid="question-content"]')
    ).toBeVisible();
    await expect(page.locator('[data-testid="answer-options"]')).toBeVisible();
  });

  test('should answer questions correctly', async ({ page }) => {
    // Navigate to practice page
    await page.goto(
      '/learning-paths/react-basics/sections/html-fundamentals/questions'
    );

    // Wait for question to load
    await page.waitForSelector('[data-testid="question-content"]');

    // Select an answer
    const firstOption = page.locator('[data-testid="answer-option"]').first();
    await firstOption.click();

    // Submit answer
    await page.click('button:has-text("Submit Answer")');

    // Check if feedback is displayed
    await expect(page.locator('[data-testid="answer-feedback"]')).toBeVisible();
  });

  test('should navigate between questions', async ({ page }) => {
    // Navigate to practice page
    await page.goto(
      '/learning-paths/react-basics/sections/html-fundamentals/questions'
    );

    // Wait for question to load
    await page.waitForSelector('[data-testid="question-content"]');

    // Answer first question
    const firstOption = page.locator('[data-testid="answer-option"]').first();
    await firstOption.click();
    await page.click('button:has-text("Submit Answer")');

    // Navigate to next question
    await page.click('button:has-text("Next Question")');

    // Verify new question is loaded
    await expect(
      page.locator('[data-testid="question-content"]')
    ).toBeVisible();
  });

  test('should display progress tracking', async ({ page }) => {
    // Navigate to practice page
    await page.goto(
      '/learning-paths/react-basics/sections/html-fundamentals/questions'
    );

    // Check if progress bar is displayed
    await expect(page.locator('[data-testid="progress-bar"]')).toBeVisible();

    // Check if question counter is displayed
    await expect(
      page.locator('[data-testid="question-counter"]')
    ).toBeVisible();
  });

  test('should complete practice session', async ({ page }) => {
    // Navigate to practice page
    await page.goto(
      '/learning-paths/react-basics/sections/html-fundamentals/questions'
    );

    // Answer all questions (assuming there are 3 questions)
    for (let i = 0; i < 3; i++) {
      await page.waitForSelector('[data-testid="question-content"]');

      // Select an answer
      const firstOption = page.locator('[data-testid="answer-option"]').first();
      await firstOption.click();

      // Submit answer
      await page.click('button:has-text("Submit Answer")');

      // Navigate to next question (if not last)
      if (i < 2) {
        await page.click('button:has-text("Next Question")');
      }
    }

    // Check if completion screen is displayed
    await expect(
      page.locator('[data-testid="completion-screen"]')
    ).toBeVisible();
    await expect(page.locator('text=Congratulations!')).toBeVisible();
  });

  test('should save progress', async ({ page }) => {
    // Navigate to practice page
    await page.goto(
      '/learning-paths/react-basics/sections/html-fundamentals/questions'
    );

    // Answer a question
    await page.waitForSelector('[data-testid="question-content"]');
    const firstOption = page.locator('[data-testid="answer-option"]').first();
    await firstOption.click();
    await page.click('button:has-text("Submit Answer")');

    // Check if progress is saved (look for success message or updated progress)
    await expect(page.locator('text=Progress saved')).toBeVisible();
  });

  test('should display learning path statistics', async ({ page }) => {
    // Navigate to learning paths page
    await page.goto('/learning-paths');

    // Check if statistics are displayed
    await expect(page.locator('[data-testid="learning-stats"]')).toBeVisible();
    await expect(page.locator('text=Total Learning Paths:')).toBeVisible();
    await expect(page.locator('text=Total Questions:')).toBeVisible();
  });

  test('should filter learning paths by difficulty', async ({ page }) => {
    // Navigate to learning paths page
    await page.goto('/learning-paths');

    // Select difficulty filter
    await page.selectOption('select[name="difficulty"]', 'beginner');

    // Wait for filtered results
    await page.waitForSelector('[data-testid="learning-paths-grid"]');

    // Verify only beginner learning paths are shown
    const cards = page.locator('[data-testid="learning-path-card"]');
    const count = await cards.count();

    for (let i = 0; i < count; i++) {
      const difficulty = await cards
        .nth(i)
        .locator('[data-testid="difficulty-badge"]')
        .textContent();
      expect(difficulty).toBe('Beginner');
    }
  });

  test('should search learning paths', async ({ page }) => {
    // Navigate to learning paths page
    await page.goto('/learning-paths');

    // Enter search term
    await page.fill('input[placeholder="Search learning paths..."]', 'React');

    // Wait for search results
    await page.waitForSelector('[data-testid="learning-paths-grid"]');

    // Verify search results contain the search term
    const cards = page.locator('[data-testid="learning-path-card"]');
    const count = await cards.count();

    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const title = await cards.nth(i).locator('h3').textContent();
      expect(title?.toLowerCase()).toContain('react');
    }
  });

  test('should handle empty learning paths', async ({ page }) => {
    // Mock empty response
    await page.route('**/api/learning-paths**', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true, data: [] }),
      });
    });

    // Navigate to learning paths page
    await page.goto('/learning-paths');

    // Check if empty state is displayed
    await expect(page.locator('text=No learning paths found')).toBeVisible();
  });

  test('should handle API errors', async ({ page }) => {
    // Mock API error
    await page.route('**/api/learning-paths**', route => {
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({
          success: false,
          error: 'Internal server error',
        }),
      });
    });

    // Navigate to learning paths page
    await page.goto('/learning-paths');

    // Check if error message is displayed
    await expect(
      page.locator('text=Error loading learning paths')
    ).toBeVisible();
  });
});
