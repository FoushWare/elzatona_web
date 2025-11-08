/**
 * Progress Tracking and Analytics E2E Tests
 *
 * Comprehensive tests for:
 * - Progress persistence across sessions
 * - Analytics and reporting
 * - Achievement and badge system
 * - Performance metrics
 * - Data consistency and integrity
 */

import { test, expect } from '@playwright/test';

const testUser = {
  email: 'progress-test@example.com',
  password: 'testpassword123',
  name: 'Progress Test User',
};

test.describe('Progress Tracking and Analytics E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Clear any existing data
    await page.goto('http://localhost:3000');
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
  });

  test.describe('Progress Persistence', () => {
    test('should persist progress across browser sessions', async ({
      page,
    }) => {
      // Sign in
      await page.goto('http://localhost:3000/get-started');
      await page.click('text=I need guidance');
      await page.waitForSelector('[data-testid="signin-popup"]');
      await page.fill('input[name="email"]', testUser.email);
      await page.fill('input[name="password"]', testUser.password);
      await page.click('button[type="submit"]');
      await page.waitForSelector('text=Welcome back');

      // Start learning and make progress
      await page.goto('http://localhost:3000/learning-paths/frontend-basics');
      await page.click('button[data-testid="start-learning-button"]');

      // Complete 5 questions
      for (let i = 0; i < 5; i++) {
        await page.click('button[data-testid="answer-option"]:first-child');
        await page.click('button[data-testid="submit-answer"]');
        if (i < 4) {
          await page.click('button[data-testid="next-question"]');
        }
      }

      // Close browser and reopen (simulate new session)
      await page.close();
      const newPage = await page.context().newPage();

      // Sign in again
      await newPage.goto('http://localhost:3000/get-started');
      await newPage.click('text=I need guidance');
      await newPage.waitForSelector('[data-testid="signin-popup"]');
      await newPage.fill('input[name="email"]', testUser.email);
      await newPage.fill('input[name="password"]', testUser.password);
      await newPage.click('button[type="submit"]');
      await newPage.waitForSelector('text=Welcome back');

      // Verify progress is restored
      await newPage.goto(
        'http://localhost:3000/learning-paths/frontend-basics'
      );
      await expect(
        newPage.locator('[data-testid="progress-indicator"]')
      ).toContainText('5/15');
    });

    test('should sync progress across multiple devices', async ({
      page,
      context,
    }) => {
      // Create second browser context (simulating different device)
      const secondContext = await context.browser().newContext();
      const secondPage = await secondContext.newPage();

      // Sign in on first device
      await page.goto('http://localhost:3000/get-started');
      await page.click('text=I need guidance');
      await page.waitForSelector('[data-testid="signin-popup"]');
      await page.fill('input[name="email"]', testUser.email);
      await page.fill('input[name="password"]', testUser.password);
      await page.click('button[type="submit"]');
      await page.waitForSelector('text=Welcome back');

      // Make progress on first device
      await page.goto('http://localhost:3000/learning-paths/frontend-basics');
      await page.click('button[data-testid="start-learning-button"]');

      for (let i = 0; i < 3; i++) {
        await page.click('button[data-testid="answer-option"]:first-child');
        await page.click('button[data-testid="submit-answer"]');
        if (i < 2) {
          await page.click('button[data-testid="next-question"]');
        }
      }

      // Sign in on second device
      await secondPage.goto('http://localhost:3000/get-started');
      await secondPage.click('text=I need guidance');
      await secondPage.waitForSelector('[data-testid="signin-popup"]');
      await secondPage.fill('input[name="email"]', testUser.email);
      await secondPage.fill('input[name="password"]', testUser.password);
      await secondPage.click('button[type="submit"]');
      await secondPage.waitForSelector('text=Welcome back');

      // Verify progress is synced on second device
      await secondPage.goto(
        'http://localhost:3000/learning-paths/frontend-basics'
      );
      await expect(
        secondPage.locator('[data-testid="progress-indicator"]')
      ).toContainText('3/15');

      await secondContext.close();
    });
  });

  test.describe('Analytics and Reporting', () => {
    test.beforeEach(async ({ page }) => {
      // Sign in and make some progress
      await page.goto('http://localhost:3000/get-started');
      await page.click('text=I need guidance');
      await page.waitForSelector('[data-testid="signin-popup"]');
      await page.fill('input[name="email"]', testUser.email);
      await page.fill('input[name="password"]', testUser.password);
      await page.click('button[type="submit"]');
      await page.waitForSelector('text=Welcome back');

      // Complete questions in different categories
      await page.goto('http://localhost:3000/learning-paths/frontend-basics');
      await page.click('button[data-testid="start-learning-button"]');

      // Complete HTML section
      for (let i = 0; i < 5; i++) {
        await page.click('button[data-testid="answer-option"]:first-child');
        await page.click('button[data-testid="submit-answer"]');
        await page.click('button[data-testid="next-question"]');
      }

      // Navigate to CSS section
      await page.goto(
        'http://localhost:3000/learning-paths/frontend-basics/sections/css'
      );

      // Complete CSS section
      for (let i = 0; i < 3; i++) {
        await page.click('button[data-testid="answer-option"]:first-child');
        await page.click('button[data-testid="submit-answer"]');
        await page.click('button[data-testid="next-question"]');
      }
    });

    test('should display comprehensive analytics dashboard', async ({
      page,
    }) => {
      await page.goto('http://localhost:3000/dashboard');

      // Verify analytics sections
      await expect(
        page.locator('[data-testid="total-questions-completed"]')
      ).toContainText('8');
      await expect(
        page.locator('[data-testid="total-time-spent"]')
      ).toBeVisible();
      await expect(
        page.locator('[data-testid="current-streak"]')
      ).toBeVisible();
      await expect(page.locator('[data-testid="accuracy-rate"]')).toBeVisible();

      // Verify progress charts
      await expect(
        page.locator('[data-testid="progress-chart"]')
      ).toBeVisible();
      await expect(
        page.locator('[data-testid="category-breakdown"]')
      ).toBeVisible();
      await expect(
        page.locator('[data-testid="difficulty-distribution"]')
      ).toBeVisible();
    });

    test('should show detailed progress by category', async ({ page }) => {
      await page.goto('http://localhost:3000/dashboard');

      // Click on category breakdown
      await page.click('[data-testid="category-breakdown"]');

      // Verify HTML progress
      await expect(page.locator('[data-testid="html-progress"]')).toContainText(
        '5/15'
      );
      await expect(page.locator('[data-testid="html-accuracy"]')).toContainText(
        '100%'
      );

      // Verify CSS progress
      await expect(page.locator('[data-testid="css-progress"]')).toContainText(
        '3/20'
      );
      await expect(page.locator('[data-testid="css-accuracy"]')).toContainText(
        '100%'
      );
    });

    test('should track learning streaks and achievements', async ({ page }) => {
      await page.goto('http://localhost:3000/dashboard');

      // Verify streak tracking
      await expect(
        page.locator('[data-testid="current-streak"]')
      ).toContainText('1');
      await expect(
        page.locator('[data-testid="longest-streak"]')
      ).toContainText('1');

      // Verify achievements
      await expect(
        page.locator('[data-testid="achievement-first-question"]')
      ).toBeVisible();
      await expect(
        page.locator('[data-testid="achievement-html-master"]')
      ).toBeVisible();
    });

    test('should generate progress reports', async ({ page }) => {
      await page.goto('http://localhost:3000/dashboard');

      // Click generate report
      await page.click('button[data-testid="generate-report"]');

      // Verify report is generated
      await expect(
        page.locator('[data-testid="progress-report"]')
      ).toBeVisible();
      await expect(
        page.locator('text=Total Questions Completed: 8')
      ).toBeVisible();
      await expect(page.locator('text=Accuracy Rate: 100%')).toBeVisible();
      await expect(page.locator('text=Current Streak: 1 day')).toBeVisible();

      // Test report download
      await page.click('button[data-testid="download-report"]');

      // Verify download started (check for download event)
      const downloadPromise = page.waitForEvent('download');
      await downloadPromise;
    });
  });

  test.describe('Achievement and Badge System', () => {
    test.beforeEach(async ({ page }) => {
      // Sign in
      await page.goto('http://localhost:3000/get-started');
      await page.click('text=I need guidance');
      await page.waitForSelector('[data-testid="signin-popup"]');
      await page.fill('input[name="email"]', testUser.email);
      await page.fill('input[name="password"]', testUser.password);
      await page.click('button[type="submit"]');
      await page.waitForSelector('text=Welcome back');
    });

    test('should award badges for milestones', async ({ page }) => {
      await page.goto('http://localhost:3000/learning-paths/frontend-basics');
      await page.click('button[data-testid="start-learning-button"]');

      // Complete first question (should award "First Question" badge)
      await page.click('button[data-testid="answer-option"]:first-child');
      await page.click('button[data-testid="submit-answer"]');

      await expect(
        page.locator('[data-testid="badge-notification"]')
      ).toBeVisible();
      await expect(
        page.locator('text=First Question Badge Earned!')
      ).toBeVisible();

      // Complete 5 questions (should award "Quick Learner" badge)
      for (let i = 0; i < 4; i++) {
        await page.click('button[data-testid="next-question"]');
        await page.click('button[data-testid="answer-option"]:first-child');
        await page.click('button[data-testid="submit-answer"]');
      }

      await expect(
        page.locator('[data-testid="badge-notification"]')
      ).toBeVisible();
      await expect(
        page.locator('text=Quick Learner Badge Earned!')
      ).toBeVisible();
    });

    test('should display earned badges in profile', async ({ page }) => {
      // Earn some badges first
      await page.goto('http://localhost:3000/learning-paths/frontend-basics');
      await page.click('button[data-testid="start-learning-button"]');

      for (let i = 0; i < 5; i++) {
        await page.click('button[data-testid="answer-option"]:first-child');
        await page.click('button[data-testid="submit-answer"]');
        if (i < 4) {
          await page.click('button[data-testid="next-question"]');
        }
      }

      // Navigate to profile
      await page.goto('http://localhost:3000/profile');

      // Verify badges are displayed
      await expect(
        page.locator('[data-testid="badge-first-question"]')
      ).toBeVisible();
      await expect(
        page.locator('[data-testid="badge-quick-learner"]')
      ).toBeVisible();
    });

    test('should track achievement progress', async ({ page }) => {
      await page.goto('http://localhost:3000/profile');

      // Verify achievement progress bars
      await expect(
        page.locator('[data-testid="achievement-progress-html-master"]')
      ).toBeVisible();
      await expect(
        page.locator('[data-testid="achievement-progress-css-expert"]')
      ).toBeVisible();
      await expect(
        page.locator('[data-testid="achievement-progress-javascript-ninja"]')
      ).toBeVisible();
    });
  });

  test.describe('Performance Metrics', () => {
    test.beforeEach(async ({ page }) => {
      // Sign in
      await page.goto('http://localhost:3000/get-started');
      await page.click('text=I need guidance');
      await page.waitForSelector('[data-testid="signin-popup"]');
      await page.fill('input[name="email"]', testUser.email);
      await page.fill('input[name="password"]', testUser.password);
      await page.click('button[type="submit"]');
      await page.waitForSelector('text=Welcome back');
    });

    test('should track time spent on questions', async ({ page }) => {
      await page.goto('http://localhost:3000/learning-paths/frontend-basics');
      await page.click('button[data-testid="start-learning-button"]');

      // Start timing
      const startTime = Date.now();

      // Answer question quickly
      await page.click('button[data-testid="answer-option"]:first-child');
      await page.click('button[data-testid="submit-answer"]');

      const endTime = Date.now();
      const timeSpent = endTime - startTime;

      // Verify time tracking
      await expect(page.locator('[data-testid="time-spent"]')).toContainText(
        `${Math.round(timeSpent / 1000)}s`
      );
    });

    test('should track accuracy over time', async ({ page }) => {
      await page.goto('http://localhost:3000/learning-paths/frontend-basics');
      await page.click('button[data-testid="start-learning-button"]');

      // Answer some questions correctly and some incorrectly
      const questions = [
        { correct: true },
        { correct: true },
        { correct: false },
        { correct: true },
        { correct: false },
      ];

      for (let i = 0; i < questions.length; i++) {
        const question = questions[i];

        if (question.correct) {
          await page.click('button[data-testid="answer-option"]:first-child');
        } else {
          await page.click('button[data-testid="answer-option"]:last-child');
        }

        await page.click('button[data-testid="submit-answer"]');

        if (i < questions.length - 1) {
          await page.click('button[data-testid="next-question"]');
        }
      }

      // Verify accuracy calculation (3 correct out of 5 = 60%)
      await expect(page.locator('[data-testid="accuracy-rate"]')).toContainText(
        '60%'
      );
    });

    test('should track learning velocity', async ({ page }) => {
      await page.goto('http://localhost:3000/dashboard');

      // Verify velocity metrics
      await expect(
        page.locator('[data-testid="questions-per-day"]')
      ).toBeVisible();
      await expect(
        page.locator('[data-testid="average-time-per-question"]')
      ).toBeVisible();
      await expect(
        page.locator('[data-testid="learning-velocity-trend"]')
      ).toBeVisible();
    });
  });

  test.describe('Data Consistency and Integrity', () => {
    test('should handle concurrent progress updates', async ({
      page,
      context,
    }) => {
      // Create multiple browser contexts
      const secondContext = await context.browser().newContext();
      const secondPage = await secondContext.newPage();

      // Sign in on both devices
      for (const pageInstance of [page, secondPage]) {
        await pageInstance.goto('http://localhost:3000/get-started');
        await pageInstance.click('text=I need guidance');
        await pageInstance.waitForSelector('[data-testid="signin-popup"]');
        await pageInstance.fill('input[name="email"]', testUser.email);
        await pageInstance.fill('input[name="password"]', testUser.password);
        await pageInstance.click('button[type="submit"]');
        await pageInstance.waitForSelector('text=Welcome back');
      }

      // Make progress on both devices simultaneously
      await page.goto('http://localhost:3000/learning-paths/frontend-basics');
      await secondPage.goto(
        'http://localhost:3000/learning-paths/frontend-basics'
      );

      await page.click('button[data-testid="start-learning-button"]');
      await secondPage.click('button[data-testid="start-learning-button"]');

      // Complete questions on both devices
      await page.click('button[data-testid="answer-option"]:first-child');
      await page.click('button[data-testid="submit-answer"]');

      await secondPage.click('button[data-testid="answer-option"]:first-child');
      await secondPage.click('button[data-testid="submit-answer"]');

      // Verify data consistency
      await page.reload();
      await secondPage.reload();

      await expect(
        page.locator('[data-testid="progress-indicator"]')
      ).toContainText('1/15');
      await expect(
        secondPage.locator('[data-testid="progress-indicator"]')
      ).toContainText('1/15');

      await secondContext.close();
    });

    test('should handle data corruption gracefully', async ({ page }) => {
      // Corrupt localStorage data
      await page.goto('http://localhost:3000');
      await page.evaluate(() => {
        localStorage.setItem('user-progress', 'invalid-json-data');
      });

      // Sign in
      await page.goto('http://localhost:3000/get-started');
      await page.click('text=I need guidance');
      await page.waitForSelector('[data-testid="signin-popup"]');
      await page.fill('input[name="email"]', testUser.email);
      await page.fill('input[name="password"]', testUser.password);
      await page.click('button[type="submit"]');
      await page.waitForSelector('text=Welcome back');

      // Verify app handles corruption gracefully
      await page.goto('http://localhost:3000/dashboard');
      await expect(page.locator('[data-testid="error-message"]')).toBeVisible();
      await expect(
        page.locator('text=Data corruption detected. Resetting progress.')
      ).toBeVisible();
    });

    test('should validate progress data integrity', async ({ page }) => {
      // Sign in and make progress
      await page.goto('http://localhost:3000/get-started');
      await page.click('text=I need guidance');
      await page.waitForSelector('[data-testid="signin-popup"]');
      await page.fill('input[name="email"]', testUser.email);
      await page.fill('input[name="password"]', testUser.password);
      await page.click('button[type="submit"]');
      await page.waitForSelector('text=Welcome back');

      await page.goto('http://localhost:3000/learning-paths/frontend-basics');
      await page.click('button[data-testid="start-learning-button"]');

      for (let i = 0; i < 3; i++) {
        await page.click('button[data-testid="answer-option"]:first-child');
        await page.click('button[data-testid="submit-answer"]');
        await page.click('button[data-testid="next-question"]');
      }

      // Verify data integrity checks
      await page.goto('http://localhost:3000/dashboard');

      // Check that progress values are consistent
      const totalQuestions = await page
        .locator('[data-testid="total-questions-completed"]')
        .textContent();
      const accuracyRate = await page
        .locator('[data-testid="accuracy-rate"]')
        .textContent();

      expect(totalQuestions).toMatch(/^\d+$/);
      expect(accuracyRate).toMatch(/^\d+%$/);
    });
  });
});
