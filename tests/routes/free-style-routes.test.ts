import { test, expect } from '@playwright/test';

test.describe('Free Style Routes - Complete User Journey', () => {
  test.beforeEach(async ({ page }) => {
    // Start at homepage
    await page.goto('/');
  });

  test('Homepage navigation and content', async ({ page }) => {
    // Check page loads correctly
    await expect(page).toHaveTitle(/Elzatona Web/);

    // Check main navigation elements
    await expect(page.getByText('Master Frontend Development')).toBeVisible();
    await expect(page.getByText('Start Learning Now')).toBeVisible();

    // Check navigation links
    const navLinks = [
      'Learning Paths',
      'Practice',
      'Challenges',
      'Dashboard',
      'Sign In',
    ];

    for (const linkText of navLinks) {
      await expect(page.getByText(linkText)).toBeVisible();
    }

    // Check hero section
    const heroSection = page.locator('[data-testid="hero-section"]');
    await expect(heroSection).toBeVisible();

    // Check features section
    const featuresSection = page.locator('[data-testid="features-section"]');
    await expect(featuresSection).toBeVisible();
  });

  test('Learning Paths page navigation', async ({ page }) => {
    // Navigate to learning paths
    await page.getByText('Learning Paths').click();
    await expect(page).toHaveURL(/.*learning-paths/);

    // Check page title
    await expect(page).toHaveTitle(/Learning Paths/);

    // Check learning paths are displayed
    const learningPathCards = page.locator(
      '[data-testid="learning-path-card"]'
    );
    await expect(learningPathCards.first()).toBeVisible();

    // Check filter options
    const filterButton = page.getByText('Filter');
    await expect(filterButton).toBeVisible();

    // Test difficulty filter
    await filterButton.click();
    await page.getByText('Beginner').click();
    await page.getByText('Apply Filter').click();

    // Verify filtered results
    const filteredCards = page.locator('[data-testid="learning-path-card"]');
    await expect(filteredCards.first()).toBeVisible();
  });

  test('Learning Path detail page', async ({ page }) => {
    // Navigate to learning paths
    await page.goto('/learning-paths');

    // Click on first learning path
    const firstPath = page
      .locator('[data-testid="learning-path-card"]')
      .first();
    await firstPath.click();

    // Check URL contains learning path ID
    await expect(page).toHaveURL(/.*learning-paths\/\d+/);

    // Check learning path details
    await expect(page.getByText('Start Learning')).toBeVisible();
    await expect(page.getByText('Overview')).toBeVisible();
    await expect(page.getByText('Resources')).toBeVisible();
    await expect(page.getByText('Questions')).toBeVisible();

    // Check sections are displayed
    const sections = page.locator('[data-testid="learning-section"]');
    await expect(sections.first()).toBeVisible();
  });

  test('Learning Path questions page', async ({ page }) => {
    // Navigate to learning path questions
    await page.goto('/features/learning-paths/1/questions');

    // Check page loads
    await expect(page).toHaveTitle(/Questions/);

    // Check question interface
    const questionCard = page.locator('[data-testid="question-card"]');
    await expect(questionCard).toBeVisible();

    // Check question options
    const options = page.locator('[data-testid="question-option"]');
    await expect(options.first()).toBeVisible();

    // Test answering a question
    await options.first().click();
    await page.getByText('Submit Answer').click();

    // Check answer feedback
    const feedback = page.locator('[data-testid="answer-feedback"]');
    await expect(feedback).toBeVisible();
  });

  test('Practice selection page', async ({ page }) => {
    // Navigate to practice selection
    await page.goto('/practice-selection');

    // Check page title
    await expect(page).toHaveTitle(/Practice Selection/);

    // Check practice options
    const practiceOptions = [
      'Browse Practice Questions',
      'Practice Interview Questions',
      'Practice Frontend Tasks',
      'Practice Problem Solving',
    ];

    for (const option of practiceOptions) {
      await expect(page.getByText(option)).toBeVisible();
    }

    // Test navigation to browse questions
    await page.getByText('Browse Practice Questions').click();
    await expect(page).toHaveURL(/.*browse-practice-questions/);
  });

  test('Browse practice questions page', async ({ page }) => {
    // Navigate to browse questions
    await page.goto('/browse-practice-questions');

    // Check page loads
    await expect(page).toHaveTitle(/Browse Practice Questions/);

    // Check search functionality
    const searchInput = page.getByPlaceholder('Search questions...');
    await expect(searchInput).toBeVisible();

    // Test search
    await searchInput.fill('JavaScript');
    await page.keyboard.press('Enter');

    // Check filter options
    const categoryFilter = page.getByText('Category');
    await expect(categoryFilter).toBeVisible();

    const difficultyFilter = page.getByText('Difficulty');
    await expect(difficultyFilter).toBeVisible();

    // Check questions are displayed
    const questionCards = page.locator('[data-testid="question-card"]');
    await expect(questionCards.first()).toBeVisible();
  });

  test('Dashboard page', async ({ page }) => {
    // Navigate to dashboard
    await page.goto('/dashboard');

    // Check page loads
    await expect(page).toHaveTitle(/Dashboard/);

    // Check dashboard sections
    const sections = [
      'Your Progress',
      'Recent Activity',
      'Quick Actions',
      'Learning Statistics',
    ];

    for (const section of sections) {
      await expect(page.getByText(section)).toBeVisible();
    }

    // Check dashboard cards
    const dashboardCards = page.locator('[data-testid="dashboard-card"]');
    await expect(dashboardCards.first()).toBeVisible();
  });

  test('Challenges page', async ({ page }) => {
    // Navigate to challenges
    await page.goto('/challenges');

    // Check page loads
    await expect(page).toHaveTitle(/Challenges/);

    // Check challenge categories
    const categories = ['JavaScript', 'React', 'CSS', 'TypeScript'];

    for (const category of categories) {
      await expect(page.getByText(category)).toBeVisible();
    }

    // Check challenge cards
    const challengeCards = page.locator('[data-testid="challenge-card"]');
    await expect(challengeCards.first()).toBeVisible();
  });

  test('Coding challenges page', async ({ page }) => {
    // Navigate to coding challenges
    await page.goto('/coding/1');

    // Check page loads
    await expect(page).toHaveTitle(/Coding Challenge/);

    // Check challenge interface
    const challengeInterface = page.locator(
      '[data-testid="challenge-interface"]'
    );
    await expect(challengeInterface).toBeVisible();

    // Check code editor
    const codeEditor = page.locator('[data-testid="code-editor"]');
    await expect(codeEditor).toBeVisible();

    // Check test cases
    const testCases = page.locator('[data-testid="test-case"]');
    await expect(testCases.first()).toBeVisible();
  });

  test('Custom roadmap page', async ({ page }) => {
    // Navigate to custom roadmap
    await page.goto('/custom-roadmap');

    // Check page loads
    await expect(page).toHaveTitle(/Custom Roadmap/);

    // Check roadmap builder
    const roadmapBuilder = page.locator('[data-testid="roadmap-builder"]');
    await expect(roadmapBuilder).toBeVisible();

    // Check skill selection
    const skillSelector = page.locator('[data-testid="skill-selector"]');
    await expect(skillSelector).toBeVisible();
  });

  test('Question detail page', async ({ page }) => {
    // Navigate to question detail
    await page.goto('/features/questions/1');

    // Check page loads
    await expect(page).toHaveTitle(/Question/);

    // Check question content
    const questionContent = page.locator('[data-testid="question-content"]');
    await expect(questionContent).toBeVisible();

    // Check answer options
    const answerOptions = page.locator('[data-testid="answer-option"]');
    await expect(answerOptions.first()).toBeVisible();

    // Check explanation
    const explanation = page.locator('[data-testid="explanation"]');
    await expect(explanation).toBeVisible();
  });

  test('Advanced practice page', async ({ page }) => {
    // Navigate to advanced practice
    await page.goto('/features/practice/advanced');

    // Check page loads
    await expect(page).toHaveTitle(/Advanced Practice/);

    // Check practice sections
    const sections = [
      'Advanced JavaScript',
      'React Patterns',
      'Performance Optimization',
      'System Design',
    ];

    for (const section of sections) {
      await expect(page.getByText(section)).toBeVisible();
    }
  });

  test('Authentication flow', async ({ page }) => {
    // Test sign in popup
    await page.getByText('Sign In').click();

    // Check sign in modal
    const signInModal = page.locator('[data-testid="sign-in-modal"]');
    await expect(signInModal).toBeVisible();

    // Check sign in form
    const emailInput = page.getByLabel('Email');
    const passwordInput = page.getByLabel('Password');

    await expect(emailInput).toBeVisible();
    await expect(passwordInput).toBeVisible();

    // Test form validation
    await page.getByText('Sign In').click();

    // Check validation errors
    const errorMessages = page.locator('[data-testid="error-message"]');
    await expect(errorMessages.first()).toBeVisible();
  });

  test('Responsive navigation', async ({ page }) => {
    // Test mobile navigation
    await page.setViewportSize({ width: 375, height: 667 });

    // Check mobile menu button
    const menuButton = page.getByRole('button', { name: /menu/i });
    await expect(menuButton).toBeVisible();

    // Open mobile menu
    await menuButton.click();

    // Check mobile menu items
    const mobileMenu = page.locator('[data-testid="mobile-menu"]');
    await expect(mobileMenu).toBeVisible();

    // Test mobile navigation links
    const mobileLinks = [
      'Learning Paths',
      'Practice',
      'Challenges',
      'Dashboard',
    ];

    for (const link of mobileLinks) {
      await expect(page.getByText(link)).toBeVisible();
    }
  });

  test('Search functionality across pages', async ({ page }) => {
    // Test search on homepage
    const searchInput = page.getByPlaceholder('Search...');
    if ((await searchInput.count()) > 0) {
      await searchInput.fill('JavaScript');
      await page.keyboard.press('Enter');

      // Check search results
      const searchResults = page.locator('[data-testid="search-results"]');
      await expect(searchResults).toBeVisible();
    }

    // Test search on learning paths page
    await page.goto('/learning-paths');
    const learningPathSearch = page.getByPlaceholder(
      'Search learning paths...'
    );
    if ((await learningPathSearch.count()) > 0) {
      await learningPathSearch.fill('React');
      await page.keyboard.press('Enter');

      // Check filtered results
      const filteredPaths = page.locator('[data-testid="learning-path-card"]');
      await expect(filteredPaths.first()).toBeVisible();
    }
  });

  test('Error handling and 404 pages', async ({ page }) => {
    // Test 404 page
    await page.goto('/non-existent-page');

    // Check 404 content
    await expect(page.getByText('404')).toBeVisible();
    await expect(page.getByText('Page Not Found')).toBeVisible();

    // Check navigation back to home
    const homeLink = page.getByText('Go Home');
    await expect(homeLink).toBeVisible();
    await homeLink.click();

    // Should navigate back to homepage
    await expect(page).toHaveURL('/');
  });

  test('Loading states and performance', async ({ page }) => {
    // Test loading states
    await page.goto('/learning-paths');

    // Check for loading indicators
    const loadingIndicator = page.locator('[data-testid="loading"]');
    if ((await loadingIndicator.count()) > 0) {
      await expect(loadingIndicator).toBeVisible();
    }

    // Wait for content to load
    await page.waitForLoadState('networkidle');

    // Check content is loaded
    const content = page.locator('[data-testid="learning-path-card"]');
    await expect(content.first()).toBeVisible();
  });

  test('Accessibility features', async ({ page }) => {
    // Test keyboard navigation
    await page.keyboard.press('Tab');
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();

    // Test skip links
    const skipLink = page.locator('a[href="#main-content"]');
    if ((await skipLink.count()) > 0) {
      await expect(skipLink).toBeVisible();
    }

    // Test ARIA labels
    const buttons = page.locator('button');
    const buttonCount = await buttons.count();

    for (let i = 0; i < Math.min(buttonCount, 5); i++) {
      const button = buttons.nth(i);
      const ariaLabel = await button.getAttribute('aria-label');
      const textContent = await button.textContent();

      // Button should have accessible name
      expect(ariaLabel || textContent).toBeTruthy();
    }
  });
});
