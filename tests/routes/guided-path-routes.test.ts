import { test, expect } from '@playwright/test';

test.describe('Guided Path Routes - Complete Learning Journey', () => {
  test.beforeEach(async ({ page }) => {
    // Start at homepage
    await page.goto('/');
  });

  test('Guided learning page navigation', async ({ page }) => {
    // Navigate to guided learning
    await page.goto('/features/guided-learning');

    // Check page loads
    await expect(page).toHaveTitle(/Guided Learning/);

    // Check learning plans are displayed
    const learningPlans = page.locator('[data-testid="learning-plan-card"]');
    await expect(learningPlans.first()).toBeVisible();

    // Check plan details
    const planTitles = [
      '1-Day Plan',
      '2-Day Plan',
      '3-Day Plan',
      '4-Day Plan',
      '5-Day Plan',
      '6-Day Plan',
      '7-Day Plan',
    ];

    for (const title of planTitles) {
      await expect(page.getByText(title)).toBeVisible();
    }

    // Check plan features
    const features = ['Duration', 'Questions', 'Difficulty', 'Sections'];

    for (const feature of features) {
      await expect(page.getByText(feature)).toBeVisible();
    }
  });

  test('Learning plan detail page', async ({ page }) => {
    // Navigate to specific learning plan
    await page.goto('/features/guided-learning/1-day-plan');

    // Check page loads
    await expect(page).toHaveTitle(/1-Day Plan/);

    // Check plan overview
    await expect(page.getByText('Plan Overview')).toBeVisible();
    await expect(page.getByText('Daily Schedule')).toBeVisible();
    await expect(page.getByText('Start Plan')).toBeVisible();

    // Check plan statistics
    const stats = [
      'Total Questions',
      'Daily Questions',
      'Estimated Time',
      'Difficulty Level',
    ];

    for (const stat of stats) {
      await expect(page.getByText(stat)).toBeVisible();
    }

    // Check sections breakdown
    const sections = page.locator('[data-testid="plan-section"]');
    await expect(sections.first()).toBeVisible();
  });

  test('Start guided learning plan', async ({ page }) => {
    // Navigate to learning plan
    await page.goto('/features/guided-learning/1-day-plan');

    // Start the plan
    await page.getByText('Start Plan').click();

    // Should redirect to guided practice
    await expect(page).toHaveURL(/.*guided-practice/);

    // Check practice interface
    const practiceInterface = page.locator(
      '[data-testid="guided-practice-interface"]'
    );
    await expect(practiceInterface).toBeVisible();
  });

  test('Guided practice session', async ({ page }) => {
    // Navigate to guided practice
    await page.goto('/guided-practice?plan=1-day-plan');

    // Check practice interface
    await expect(page).toHaveTitle(/Guided Practice/);

    // Check progress indicator
    const progressIndicator = page.locator(
      '[data-testid="progress-indicator"]'
    );
    await expect(progressIndicator).toBeVisible();

    // Check question interface
    const questionCard = page.locator('[data-testid="question-card"]');
    await expect(questionCard).toBeVisible();

    // Check question options
    const options = page.locator('[data-testid="question-option"]');
    await expect(options.first()).toBeVisible();

    // Answer a question
    await options.first().click();
    await page.getByText('Submit Answer').click();

    // Check answer feedback
    const feedback = page.locator('[data-testid="answer-feedback"]');
    await expect(feedback).toBeVisible();

    // Check next question button
    const nextButton = page.getByText('Next Question');
    await expect(nextButton).toBeVisible();
  });

  test('Learning path sections navigation', async ({ page }) => {
    // Navigate to learning path
    await page.goto('/features/learning-paths/1');

    // Check page loads
    await expect(page).toHaveTitle(/Learning Path/);

    // Check sections
    const sections = ['Overview', 'Questions', 'Resources', 'Progress'];

    for (const section of sections) {
      await expect(page.getByText(section)).toBeVisible();
    }

    // Navigate to questions section
    await page.getByText('Questions').click();
    await expect(page).toHaveURL(/.*questions/);

    // Check questions interface
    const questionsInterface = page.locator(
      '[data-testid="questions-interface"]'
    );
    await expect(questionsInterface).toBeVisible();
  });

  test('Section-based learning', async ({ page }) => {
    // Navigate to specific section
    await page.goto('/features/learning-paths/sections/javascript/questions');

    // Check page loads
    await expect(page).toHaveTitle(/JavaScript/);

    // Check section header
    await expect(page.getByText('JavaScript Deep Dive')).toBeVisible();

    // Check questions for this section
    const questionCard = page.locator('[data-testid="question-card"]');
    await expect(questionCard).toBeVisible();

    // Check section progress
    const progressBar = page.locator('[data-testid="section-progress"]');
    await expect(progressBar).toBeVisible();
  });

  test('Learning path resources', async ({ page }) => {
    // Navigate to learning path resources
    await page.goto('/features/learning-paths/1/resources');

    // Check page loads
    await expect(page).toHaveTitle(/Resources/);

    // Check resource categories
    const categories = [
      'Documentation',
      'Tutorials',
      'Videos',
      'Articles',
      'Tools',
    ];

    for (const category of categories) {
      await expect(page.getByText(category)).toBeVisible();
    }

    // Check resource cards
    const resourceCards = page.locator('[data-testid="resource-card"]');
    await expect(resourceCards.first()).toBeVisible();
  });

  test('Progress tracking', async ({ page }) => {
    // Navigate to learning path
    await page.goto('/features/learning-paths/1');

    // Check progress section
    await page.getByText('Progress').click();

    // Check progress metrics
    const metrics = [
      'Completion Rate',
      'Questions Answered',
      'Time Spent',
      'Streak',
    ];

    for (const metric of metrics) {
      await expect(page.getByText(metric)).toBeVisible();
    }

    // Check progress chart
    const progressChart = page.locator('[data-testid="progress-chart"]');
    await expect(progressChart).toBeVisible();
  });

  test('Learning path completion', async ({ page }) => {
    // Navigate to learning path questions
    await page.goto('/features/learning-paths/1/questions');

    // Answer all questions (simulate completion)
    const questions = page.locator('[data-testid="question-card"]');
    const questionCount = await questions.count();

    for (let i = 0; i < Math.min(questionCount, 3); i++) {
      const options = page.locator('[data-testid="question-option"]');
      await options.first().click();
      await page.getByText('Submit Answer').click();

      if (i < questionCount - 1) {
        await page.getByText('Next Question').click();
      }
    }

    // Check completion message
    const completionMessage = page.getByText('Congratulations');
    await expect(completionMessage).toBeVisible();

    // Check completion stats
    const stats = ['Score', 'Time Taken', 'Accuracy', 'Certificate'];

    for (const stat of stats) {
      await expect(page.getByText(stat)).toBeVisible();
    }
  });

  test('Learning path filtering and search', async ({ page }) => {
    // Navigate to learning paths
    await page.goto('/features/learning-paths');

    // Test difficulty filter
    const difficultyFilter = page.getByText('Difficulty');
    await difficultyFilter.click();
    await page.getByText('Beginner').click();

    // Check filtered results
    const filteredPaths = page.locator('[data-testid="learning-path-card"]');
    await expect(filteredPaths.first()).toBeVisible();

    // Test category filter
    const categoryFilter = page.getByText('Category');
    await categoryFilter.click();
    await page.getByText('JavaScript').click();

    // Check filtered results
    await expect(filteredPaths.first()).toBeVisible();

    // Test search
    const searchInput = page.getByPlaceholder('Search learning paths...');
    await searchInput.fill('React');
    await page.keyboard.press('Enter');

    // Check search results
    await expect(filteredPaths.first()).toBeVisible();
  });

  test('Learning path recommendations', async ({ page }) => {
    // Navigate to learning paths
    await page.goto('/features/learning-paths');

    // Check recommended section
    const recommendedSection = page.locator(
      '[data-testid="recommended-section"]'
    );
    await expect(recommendedSection).toBeVisible();

    // Check recommended paths
    const recommendedPaths = page.locator('[data-testid="recommended-path"]');
    await expect(recommendedPaths.first()).toBeVisible();

    // Check recommendation reasons
    const reasons = [
      'Based on your progress',
      'Popular choice',
      'Trending now',
      'Perfect for beginners',
    ];

    for (const reason of reasons) {
      if ((await page.getByText(reason).count()) > 0) {
        await expect(page.getByText(reason)).toBeVisible();
      }
    }
  });

  test('Learning path analytics', async ({ page }) => {
    // Navigate to learning path analytics
    await page.goto('/features/learning-paths/1/analytics');

    // Check analytics dashboard
    await expect(page).toHaveTitle(/Analytics/);

    // Check analytics sections
    const sections = [
      'Performance Overview',
      'Question Analysis',
      'Time Distribution',
      'Improvement Areas',
    ];

    for (const section of sections) {
      await expect(page.getByText(section)).toBeVisible();
    }

    // Check charts
    const charts = page.locator('[data-testid="analytics-chart"]');
    await expect(charts.first()).toBeVisible();
  });

  test('Learning path sharing', async ({ page }) => {
    // Navigate to learning path
    await page.goto('/features/learning-paths/1');

    // Check share button
    const shareButton = page.getByText('Share');
    await expect(shareButton).toBeVisible();

    // Click share button
    await shareButton.click();

    // Check share options
    const shareOptions = page.locator('[data-testid="share-options"]');
    await expect(shareOptions).toBeVisible();

    // Check share methods
    const shareMethods = [
      'Copy Link',
      'Share on Twitter',
      'Share on LinkedIn',
      'Email',
    ];

    for (const method of shareMethods) {
      await expect(page.getByText(method)).toBeVisible();
    }
  });

  test('Learning path bookmarks', async ({ page }) => {
    // Navigate to learning path
    await page.goto('/features/learning-paths/1');

    // Check bookmark button
    const bookmarkButton = page.getByText('Bookmark');
    await expect(bookmarkButton).toBeVisible();

    // Toggle bookmark
    await bookmarkButton.click();

    // Check bookmark status
    const bookmarkedButton = page.getByText('Bookmarked');
    await expect(bookmarkedButton).toBeVisible();

    // Navigate to bookmarks page
    await page.goto('/bookmarks');

    // Check bookmarked learning path appears
    const bookmarkedPath = page.locator('[data-testid="bookmarked-path"]');
    await expect(bookmarkedPath.first()).toBeVisible();
  });

  test('Learning path notes and annotations', async ({ page }) => {
    // Navigate to learning path
    await page.goto('/features/learning-paths/1');

    // Check notes section
    const notesSection = page.locator('[data-testid="notes-section"]');
    await expect(notesSection).toBeVisible();

    // Add a note
    const addNoteButton = page.getByText('Add Note');
    await addNoteButton.click();

    // Check note editor
    const noteEditor = page.locator('[data-testid="note-editor"]');
    await expect(noteEditor).toBeVisible();

    // Type note
    await noteEditor.fill('This is a helpful note about the learning path');

    // Save note
    await page.getByText('Save Note').click();

    // Check note appears
    const savedNote = page.getByText(
      'This is a helpful note about the learning path'
    );
    await expect(savedNote).toBeVisible();
  });

  test('Learning path difficulty progression', async ({ page }) => {
    // Navigate to learning paths
    await page.goto('/features/learning-paths');

    // Check difficulty levels
    const difficultyLevels = ['Beginner', 'Intermediate', 'Advanced'];

    for (const level of difficultyLevels) {
      await expect(page.getByText(level)).toBeVisible();
    }

    // Test difficulty progression
    const beginnerPath = page
      .locator('[data-testid="learning-path-card"]')
      .first();
    await beginnerPath.click();

    // Check path difficulty
    await expect(page.getByText('Beginner')).toBeVisible();

    // Check next difficulty recommendation
    const nextDifficulty = page.getByText('Next: Intermediate');
    if ((await nextDifficulty.count()) > 0) {
      await expect(nextDifficulty).toBeVisible();
    }
  });

  test('Learning path prerequisites', async ({ page }) => {
    // Navigate to advanced learning path
    await page.goto('/features/learning-paths/3');

    // Check prerequisites section
    const prerequisitesSection = page.locator(
      '[data-testid="prerequisites-section"]'
    );
    await expect(prerequisitesSection).toBeVisible();

    // Check prerequisite requirements
    const requirements = [
      'Complete JavaScript Basics',
      'Understanding of React Fundamentals',
      'CSS and HTML Knowledge',
    ];

    for (const requirement of requirements) {
      if ((await page.getByText(requirement).count()) > 0) {
        await expect(page.getByText(requirement)).toBeVisible();
      }
    }

    // Check prerequisite status
    const statusIndicators = page.locator(
      '[data-testid="prerequisite-status"]'
    );
    await expect(statusIndicators.first()).toBeVisible();
  });

  test('Learning path community features', async ({ page }) => {
    // Navigate to learning path
    await page.goto('/features/learning-paths/1');

    // Check community section
    const communitySection = page.locator('[data-testid="community-section"]');
    await expect(communitySection).toBeVisible();

    // Check community features
    const features = [
      'Discussion Forum',
      'Study Groups',
      'Peer Reviews',
      'Q&A',
    ];

    for (const feature of features) {
      if ((await page.getByText(feature).count()) > 0) {
        await expect(page.getByText(feature)).toBeVisible();
      }
    }
  });

  test('Learning path mobile experience', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Navigate to learning paths
    await page.goto('/features/learning-paths');

    // Check mobile layout
    const mobileLayout = page.locator('[data-testid="mobile-layout"]');
    await expect(mobileLayout).toBeVisible();

    // Check mobile navigation
    const mobileNav = page.locator('[data-testid="mobile-nav"]');
    await expect(mobileNav).toBeVisible();

    // Test mobile interactions
    const firstPath = page
      .locator('[data-testid="learning-path-card"]')
      .first();
    await firstPath.click();

    // Check mobile learning path view
    await expect(page).toHaveURL(/.*learning-paths\/\d+/);
  });
});
