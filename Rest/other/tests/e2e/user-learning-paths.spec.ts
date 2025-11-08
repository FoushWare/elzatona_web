/**
 * End-to-End Tests for User Learning Paths and Progress Tracking
 *
 * Comprehensive E2E tests covering:
 * - User authentication flows
 * - Learning path navigation
 * - Progress tracking and persistence
 * - User journey through different learning modes
 * - Data consistency across sessions
 */

import { test, expect } from '@playwright/test';

// Test data
const testUser = {
  email: 'test@example.com',
  password: 'testpassword123',
  name: 'Test User',
};

const learningPaths = [
  {
    id: 'frontend-basics',
    name: 'Frontend Basics',
    sectors: [
      { id: 'html', name: 'HTML Fundamentals', questionCount: 15 },
      { id: 'css', name: 'CSS Fundamentals', questionCount: 20 },
      { id: 'javascript', name: 'JavaScript Basics', questionCount: 25 },
    ],
  },
  {
    id: 'react-mastery',
    name: 'React Mastery',
    sectors: [
      { id: 'components', name: 'React Components', questionCount: 18 },
      { id: 'hooks', name: 'React Hooks', questionCount: 22 },
      { id: 'state', name: 'State Management', questionCount: 16 },
    ],
  },
];

test.describe('User Learning Paths E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the application
    await page.goto('http://localhost:3000');

    // Wait for the page to load
    await page.waitForLoadState('networkidle');
  });

  test.describe('Authentication Flow', () => {
    test('should allow user to sign up and sign in', async ({ page }) => {
      // Navigate to get started page
      await page.goto('http://localhost:3000/get-started');

      // Click on "I need guidance" to trigger sign-in
      await page.click('text=I need guidance');

      // Wait for sign-in popup to appear
      await page.waitForSelector('[data-testid="signin-popup"]');

      // Fill in sign-up form
      await page.fill('input[name="name"]', testUser.name);
      await page.fill('input[name="email"]', testUser.email);
      await page.fill('input[name="password"]', testUser.password);

      // Click sign up button
      await page.click('button[type="submit"]');

      // Wait for successful authentication
      await page.waitForSelector('text=Welcome back');

      // Verify user is redirected to guided learning
      await expect(page).toHaveURL(/.*guided-learning/);
    });

    test('should persist user session across page refreshes', async ({
      page,
    }) => {
      // First, sign in
      await page.goto('http://localhost:3000/get-started');
      await page.click('text=I need guidance');
      await page.waitForSelector('[data-testid="signin-popup"]');
      await page.fill('input[name="email"]', testUser.email);
      await page.fill('input[name="password"]', testUser.password);
      await page.click('button[type="submit"]');
      await page.waitForSelector('text=Welcome back');

      // Navigate to learning paths
      await page.goto('http://localhost:3000/learning-paths');

      // Refresh the page
      await page.reload();

      // Verify user is still authenticated
      await expect(page.locator('text=Test User')).toBeVisible();
    });

    test('should handle sign out correctly', async ({ page }) => {
      // Sign in first
      await page.goto('http://localhost:3000/get-started');
      await page.click('text=I need guidance');
      await page.waitForSelector('[data-testid="signin-popup"]');
      await page.fill('input[name="email"]', testUser.email);
      await page.fill('input[name="password"]', testUser.password);
      await page.click('button[type="submit"]');
      await page.waitForSelector('text=Welcome back');

      // Click sign out
      await page.click('button[data-testid="signout-button"]');

      // Verify user is signed out
      await expect(page.locator('text=Sign In')).toBeVisible();
    });
  });

  test.describe('Learning Path Navigation', () => {
    test.beforeEach(async ({ page }) => {
      // Sign in before each test
      await page.goto('http://localhost:3000/get-started');
      await page.click('text=I need guidance');
      await page.waitForSelector('[data-testid="signin-popup"]');
      await page.fill('input[name="email"]', testUser.email);
      await page.fill('input[name="password"]', testUser.password);
      await page.click('button[type="submit"]');
      await page.waitForSelector('text=Welcome back');
    });

    test('should display all learning paths', async ({ page }) => {
      await page.goto('http://localhost:3000/learning-paths');

      // Wait for learning paths to load
      await page.waitForSelector('[data-testid="learning-path-card"]');

      // Verify all learning paths are displayed
      for (const path of learningPaths) {
        await expect(page.locator(`text=${path.name}`)).toBeVisible();
      }
    });

    test('should allow user to select a learning path', async ({ page }) => {
      await page.goto('http://localhost:3000/learning-paths');
      await page.waitForSelector('[data-testid="learning-path-card"]');

      // Click on Frontend Basics path
      await page.click('text=Frontend Basics');

      // Verify navigation to path details
      await expect(page).toHaveURL(/.*learning-paths\/frontend-basics/);

      // Verify path details are displayed
      await expect(page.locator('text=HTML Fundamentals')).toBeVisible();
      await expect(page.locator('text=CSS Fundamentals')).toBeVisible();
      await expect(page.locator('text=JavaScript Basics')).toBeVisible();
    });

    test('should allow user to start a learning path', async ({ page }) => {
      await page.goto('http://localhost:3000/learning-paths/frontend-basics');

      // Click start learning button
      await page.click('button[data-testid="start-learning-button"]');

      // Verify navigation to first section
      await expect(page).toHaveURL(
        /.*learning-paths\/frontend-basics\/sections\/html/
      );

      // Verify first question is displayed
      await expect(page.locator('[data-testid="question-card"]')).toBeVisible();
    });

    test('should track progress through learning path sections', async ({
      page,
    }) => {
      await page.goto('http://localhost:3000/learning-paths/frontend-basics');

      // Start learning
      await page.click('button[data-testid="start-learning-button"]');

      // Answer first question correctly
      await page.click('button[data-testid="answer-option"]:first-child');
      await page.click('button[data-testid="submit-answer"]');

      // Verify progress is updated
      await expect(page.locator('[data-testid="progress-bar"]')).toContainText(
        '1/15'
      );

      // Navigate to next question
      await page.click('button[data-testid="next-question"]');

      // Verify progress continues
      await expect(page.locator('[data-testid="progress-bar"]')).toContainText(
        '2/15'
      );
    });
  });

  test.describe('Progress Tracking', () => {
    test.beforeEach(async ({ page }) => {
      // Sign in and start a learning path
      await page.goto('http://localhost:3000/get-started');
      await page.click('text=I need guidance');
      await page.waitForSelector('[data-testid="signin-popup"]');
      await page.fill('input[name="email"]', testUser.email);
      await page.fill('input[name="password"]', testUser.password);
      await page.click('button[type="submit"]');
      await page.waitForSelector('text=Welcome back');

      await page.goto('http://localhost:3000/learning-paths/frontend-basics');
      await page.click('button[data-testid="start-learning-button"]');
    });

    test('should save progress to Firebase', async ({ page }) => {
      // Answer several questions
      for (let i = 0; i < 5; i++) {
        await page.click('button[data-testid="answer-option"]:first-child');
        await page.click('button[data-testid="submit-answer"]');

        if (i < 4) {
          await page.click('button[data-testid="next-question"]');
        }
      }

      // Navigate away and back
      await page.goto('http://localhost:3000/learning-paths');
      await page.goto('http://localhost:3000/learning-paths/frontend-basics');

      // Verify progress is restored
      await expect(
        page.locator('[data-testid="progress-indicator"]')
      ).toContainText('5/15');
    });

    test('should display progress statistics', async ({ page }) => {
      // Complete some questions
      for (let i = 0; i < 3; i++) {
        await page.click('button[data-testid="answer-option"]:first-child');
        await page.click('button[data-testid="submit-answer"]');
        await page.click('button[data-testid="next-question"]');
      }

      // Navigate to user dashboard
      await page.goto('http://localhost:3000/dashboard');

      // Verify progress statistics are displayed
      await expect(
        page.locator('[data-testid="total-questions-completed"]')
      ).toContainText('3');
      await expect(
        page.locator('[data-testid="current-streak"]')
      ).toContainText('1');
      await expect(page.locator('[data-testid="total-points"]')).toContainText(
        '30'
      );
    });

    test('should handle incorrect answers and track accuracy', async ({
      page,
    }) => {
      // Answer first question incorrectly
      await page.click('button[data-testid="answer-option"]:last-child');
      await page.click('button[data-testid="submit-answer"]');

      // Verify incorrect answer feedback
      await expect(
        page.locator('[data-testid="incorrect-feedback"]')
      ).toBeVisible();

      // Answer second question correctly
      await page.click('button[data-testid="next-question"]');
      await page.click('button[data-testid="answer-option"]:first-child');
      await page.click('button[data-testid="submit-answer"]');

      // Verify accuracy tracking
      await expect(
        page.locator('[data-testid="accuracy-indicator"]')
      ).toContainText('50%');
    });
  });

  test.describe('Guided vs Free-Style Learning', () => {
    test('should allow user to switch between guided and free-style modes', async ({
      page,
    }) => {
      // Start in guided mode
      await page.goto('http://localhost:3000/get-started');
      await page.click('text=I need guidance');
      await page.waitForSelector('[data-testid="signin-popup"]');
      await page.fill('input[name="email"]', testUser.email);
      await page.fill('input[name="password"]', testUser.password);
      await page.click('button[type="submit"]');
      await page.waitForSelector('text=Welcome back');

      // Verify guided learning page
      await expect(page).toHaveURL(/.*guided-learning/);
      await expect(page.locator('text=1 Day Plan')).toBeVisible();

      // Switch to free-style mode
      await page.click('button[data-testid="switch-to-freestyle"]');

      // Verify free-style learning page
      await expect(page).toHaveURL(/.*learning-paths/);
      await expect(page.locator('text=Frontend Basics')).toBeVisible();
    });

    test('should maintain progress across learning modes', async ({ page }) => {
      // Start in guided mode and complete some questions
      await page.goto('http://localhost:3000/get-started');
      await page.click('text=I need guidance');
      await page.waitForSelector('[data-testid="signin-popup"]');
      await page.fill('input[name="email"]', testUser.email);
      await page.fill('input[name="password"]', testUser.password);
      await page.click('button[type="submit"]');
      await page.waitForSelector('text=Welcome back');

      // Complete guided learning questions
      await page.click('text=1 Day Plan');
      await page.click('button[data-testid="start-plan"]');

      // Answer some questions
      for (let i = 0; i < 3; i++) {
        await page.click('button[data-testid="answer-option"]:first-child');
        await page.click('button[data-testid="submit-answer"]');
        await page.click('button[data-testid="next-question"]');
      }

      // Switch to free-style mode
      await page.click('button[data-testid="switch-to-freestyle"]');

      // Verify progress is maintained
      await page.goto('http://localhost:3000/dashboard');
      await expect(
        page.locator('[data-testid="total-questions-completed"]')
      ).toContainText('3');
    });
  });

  test.describe('Custom Roadmap Creation', () => {
    test.beforeEach(async ({ page }) => {
      // Sign in first
      await page.goto('http://localhost:3000/get-started');
      await page.click("text=I'm self-directed");
      await page.waitForSelector('[data-testid="signin-popup"]');
      await page.fill('input[name="email"]', testUser.email);
      await page.fill('input[name="password"]', testUser.password);
      await page.click('button[type="submit"]');
      await page.waitForSelector('text=Welcome back');
    });

    test('should allow user to create custom roadmap', async ({ page }) => {
      // Navigate to custom roadmap creation
      await page.goto('http://localhost:3000/custom-roadmap');

      // Select topics
      await page.check('input[data-testid="topic-html"]');
      await page.check('input[data-testid="topic-css"]');
      await page.check('input[data-testid="topic-javascript"]');

      // Set duration
      await page.selectOption('select[data-testid="duration-select"]', '7');

      // Name the roadmap
      await page.fill(
        'input[data-testid="roadmap-name"]',
        'My Custom Frontend Plan'
      );

      // Save roadmap
      await page.click('button[data-testid="save-roadmap"]');

      // Verify roadmap is saved
      await expect(page.locator('text=My Custom Frontend Plan')).toBeVisible();
    });

    test('should allow user to manage custom roadmaps', async ({ page }) => {
      // Create a custom roadmap first
      await page.goto('http://localhost:3000/custom-roadmap');
      await page.check('input[data-testid="topic-html"]');
      await page.selectOption('select[data-testid="duration-select"]', '5');
      await page.fill('input[data-testid="roadmap-name"]', 'Test Roadmap');
      await page.click('button[data-testid="save-roadmap"]');

      // Navigate to my plans
      await page.goto('http://localhost:3000/my-plans');

      // Verify roadmap appears in list
      await expect(page.locator('text=Test Roadmap')).toBeVisible();

      // Edit roadmap
      await page.click('button[data-testid="edit-roadmap"]');
      await page.fill(
        'input[data-testid="roadmap-name"]',
        'Updated Test Roadmap'
      );
      await page.click('button[data-testid="save-roadmap"]');

      // Verify update
      await expect(page.locator('text=Updated Test Roadmap')).toBeVisible();

      // Delete roadmap
      await page.click('button[data-testid="delete-roadmap"]');
      await page.click('button[data-testid="confirm-delete"]');

      // Verify deletion
      await expect(page.locator('text=Updated Test Roadmap')).not.toBeVisible();
    });
  });

  test.describe('Performance and Error Handling', () => {
    test('should handle network errors gracefully', async ({ page }) => {
      // Simulate network failure
      await page.route('**/api/**', route => route.abort());

      await page.goto('http://localhost:3000/learning-paths');

      // Verify error handling
      await expect(
        page.locator('text=Failed to load learning paths')
      ).toBeVisible();
      await expect(
        page.locator('button[data-testid="retry-button"]')
      ).toBeVisible();
    });

    test('should handle slow loading gracefully', async ({ page }) => {
      // Simulate slow network
      await page.route('**/api/**', route => {
        setTimeout(() => route.continue(), 2000);
      });

      await page.goto('http://localhost:3000/learning-paths');

      // Verify loading state
      await expect(
        page.locator('[data-testid="loading-spinner"]')
      ).toBeVisible();

      // Wait for content to load
      await page.waitForSelector('[data-testid="learning-path-card"]', {
        timeout: 5000,
      });
    });

    test('should maintain performance with large datasets', async ({
      page,
    }) => {
      // Navigate to learning paths with many items
      await page.goto('http://localhost:3000/learning-paths');

      // Measure page load time
      const startTime = Date.now();
      await page.waitForSelector('[data-testid="learning-path-card"]');
      const loadTime = Date.now() - startTime;

      // Verify performance is acceptable (less than 3 seconds)
      expect(loadTime).toBeLessThan(3000);
    });
  });

  test.describe('Cross-Browser Compatibility', () => {
    test('should work correctly in different browsers', async ({
      page,
      browserName,
    }) => {
      await page.goto('http://localhost:3000/get-started');
      await page.click('text=I need guidance');
      await page.waitForSelector('[data-testid="signin-popup"]');
      await page.fill('input[name="email"]', testUser.email);
      await page.fill('input[name="password"]', testUser.password);
      await page.click('button[type="submit"]');
      await page.waitForSelector('text=Welcome back');

      // Verify core functionality works in all browsers
      await page.goto('http://localhost:3000/learning-paths');
      await expect(
        page.locator('[data-testid="learning-path-card"]')
      ).toBeVisible();

      console.log(`✅ Test passed in ${browserName}`);
    });
  });
});
