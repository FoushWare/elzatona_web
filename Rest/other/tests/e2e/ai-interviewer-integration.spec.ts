/**
 * AI Interviewer Agent and Learning Path Integration E2E Tests
 *
 * Comprehensive tests for:
 * - AI Interviewer Agent functionality
 * - Learning path integration with AI features
 * - Real-time video/audio communication
 * - Question generation and adaptation
 * - Performance tracking in interview mode
 */

import { test, expect } from '@playwright/test';

const testUser = {
  email: 'interview-test@example.com',
  password: 'testpassword123',
  name: 'Interview Test User',
};

test.describe('AI Interviewer Agent E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Clear any existing data
    await page.goto('http://localhost:3000');
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
  });

  test.describe('AI Interviewer Setup', () => {
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

    test('should initialize AI Interviewer Agent', async ({ page }) => {
      await page.goto('http://localhost:3000/ai-interviewer');

      // Verify AI Interviewer components are loaded
      await expect(
        page.locator('[data-testid="ai-interviewer-container"]')
      ).toBeVisible();
      await expect(
        page.locator('[data-testid="video-container"]')
      ).toBeVisible();
      await expect(
        page.locator('[data-testid="question-display"]')
      ).toBeVisible();
      await expect(
        page.locator('[data-testid="controls-panel"]')
      ).toBeVisible();
    });

    test('should handle camera and microphone permissions', async ({
      page,
    }) => {
      // Mock camera and microphone permissions
      await page.context().grantPermissions(['camera', 'microphone']);

      await page.goto('http://localhost:3000/ai-interviewer');

      // Click start interview
      await page.click('button[data-testid="start-interview"]');

      // Verify permission prompts
      await expect(
        page.locator('[data-testid="camera-permission"]')
      ).toBeVisible();
      await expect(
        page.locator('[data-testid="microphone-permission"]')
      ).toBeVisible();

      // Grant permissions
      await page.click('button[data-testid="allow-camera"]');
      await page.click('button[data-testid="allow-microphone"]');

      // Verify video stream starts
      await expect(page.locator('[data-testid="video-stream"]')).toBeVisible();
    });

    test('should handle permission denial gracefully', async ({ page }) => {
      // Deny camera and microphone permissions
      await page.context().grantPermissions([]);

      await page.goto('http://localhost:3000/ai-interviewer');
      await page.click('button[data-testid="start-interview"]');

      // Verify error handling
      await expect(
        page.locator('[data-testid="permission-error"]')
      ).toBeVisible();
      await expect(
        page.locator('text=Camera and microphone access required')
      ).toBeVisible();
    });
  });

  test.describe('Interview Session Management', () => {
    test.beforeEach(async ({ page }) => {
      // Sign in and grant permissions
      await page.goto('http://localhost:3000/get-started');
      await page.click('text=I need guidance');
      await page.waitForSelector('[data-testid="signin-popup"]');
      await page.fill('input[name="email"]', testUser.email);
      await page.fill('input[name="password"]', testUser.password);
      await page.click('button[type="submit"]');
      await page.waitForSelector('text=Welcome back');

      await page.context().grantPermissions(['camera', 'microphone']);
    });

    test('should start and end interview session', async ({ page }) => {
      await page.goto('http://localhost:3000/ai-interviewer');

      // Start interview
      await page.click('button[data-testid="start-interview"]');
      await page.click('button[data-testid="allow-camera"]');
      await page.click('button[data-testid="allow-microphone"]');

      // Verify interview is active
      await expect(
        page.locator('[data-testid="interview-active"]')
      ).toBeVisible();
      await expect(page.locator('[data-testid="timer"]')).toBeVisible();

      // End interview
      await page.click('button[data-testid="end-interview"]');
      await page.click('button[data-testid="confirm-end"]');

      // Verify interview ended
      await expect(
        page.locator('[data-testid="interview-summary"]')
      ).toBeVisible();
    });

    test('should pause and resume interview', async ({ page }) => {
      await page.goto('http://localhost:3000/ai-interviewer');
      await page.click('button[data-testid="start-interview"]');
      await page.click('button[data-testid="allow-camera"]');
      await page.click('button[data-testid="allow-microphone"]');

      // Pause interview
      await page.click('button[data-testid="pause-interview"]');
      await expect(
        page.locator('[data-testid="interview-paused"]')
      ).toBeVisible();

      // Resume interview
      await page.click('button[data-testid="resume-interview"]');
      await expect(
        page.locator('[data-testid="interview-active"]')
      ).toBeVisible();
    });

    test('should handle interview time limits', async ({ page }) => {
      await page.goto('http://localhost:3000/ai-interviewer');
      await page.click('button[data-testid="start-interview"]');
      await page.click('button[data-testid="allow-camera"]');
      await page.click('button[data-testid="allow-microphone"]');

      // Set short time limit for testing
      await page.selectOption('select[data-testid="time-limit"]', '5');

      // Wait for time limit to be reached
      await page.waitForSelector('[data-testid="time-limit-reached"]', {
        timeout: 10000,
      });

      // Verify interview auto-ends
      await expect(
        page.locator('[data-testid="interview-summary"]')
      ).toBeVisible();
    });
  });

  test.describe('Question Management', () => {
    test.beforeEach(async ({ page }) => {
      // Sign in and start interview
      await page.goto('http://localhost:3000/get-started');
      await page.click('text=I need guidance');
      await page.waitForSelector('[data-testid="signin-popup"]');
      await page.fill('input[name="email"]', testUser.email);
      await page.fill('input[name="password"]', testUser.password);
      await page.click('button[type="submit"]');
      await page.waitForSelector('text=Welcome back');

      await page.context().grantPermissions(['camera', 'microphone']);
      await page.goto('http://localhost:3000/ai-interviewer');
      await page.click('button[data-testid="start-interview"]');
      await page.click('button[data-testid="allow-camera"]');
      await page.click('button[data-testid="allow-microphone"]');
    });

    test('should display questions from selected learning path', async ({
      page,
    }) => {
      // Select learning path before starting interview
      await page.selectOption(
        'select[data-testid="learning-path-select"]',
        'frontend-basics'
      );

      // Verify first question is displayed
      await expect(page.locator('[data-testid="question-text"]')).toBeVisible();
      await expect(
        page.locator('[data-testid="question-difficulty"]')
      ).toBeVisible();
      await expect(
        page.locator('[data-testid="question-category"]')
      ).toBeVisible();
    });

    test('should adapt questions based on performance', async ({ page }) => {
      // Answer first question correctly
      await page.click('button[data-testid="answer-correct"]');
      await page.click('button[data-testid="submit-answer"]');

      // Verify next question is harder
      await expect(
        page.locator('[data-testid="question-difficulty"]')
      ).toContainText('Intermediate');

      // Answer incorrectly
      await page.click('button[data-testid="answer-incorrect"]');
      await page.click('button[data-testid="submit-answer"]');

      // Verify next question is easier
      await expect(
        page.locator('[data-testid="question-difficulty"]')
      ).toContainText('Beginner');
    });

    test('should provide hints and explanations', async ({ page }) => {
      // Answer question incorrectly
      await page.click('button[data-testid="answer-incorrect"]');
      await page.click('button[data-testid="submit-answer"]');

      // Verify explanation is shown
      await expect(page.locator('[data-testid="explanation"]')).toBeVisible();
      await expect(
        page.locator('[data-testid="correct-answer"]')
      ).toBeVisible();

      // Request hint for next question
      await page.click('button[data-testid="next-question"]');
      await page.click('button[data-testid="request-hint"]');

      // Verify hint is displayed
      await expect(page.locator('[data-testid="hint-text"]')).toBeVisible();
    });

    test('should track question performance metrics', async ({ page }) => {
      // Answer several questions with different outcomes
      const questions = [
        { correct: true, time: 30 },
        { correct: false, time: 60 },
        { correct: true, time: 45 },
      ];

      for (let i = 0; i < questions.length; i++) {
        const question = questions[i];

        if (question.correct) {
          await page.click('button[data-testid="answer-correct"]');
        } else {
          await page.click('button[data-testid="answer-incorrect"]');
        }

        await page.click('button[data-testid="submit-answer"]');

        if (i < questions.length - 1) {
          await page.click('button[data-testid="next-question"]');
        }
      }

      // End interview and check metrics
      await page.click('button[data-testid="end-interview"]');
      await page.click('button[data-testid="confirm-end"]');

      // Verify performance metrics
      await expect(
        page.locator('[data-testid="total-questions"]')
      ).toContainText('3');
      await expect(
        page.locator('[data-testid="correct-answers"]')
      ).toContainText('2');
      await expect(page.locator('[data-testid="accuracy-rate"]')).toContainText(
        '67%'
      );
      await expect(page.locator('[data-testid="average-time"]')).toContainText(
        '45s'
      );
    });
  });

  test.describe('Real-time Communication', () => {
    test.beforeEach(async ({ page }) => {
      // Sign in and start interview
      await page.goto('http://localhost:3000/get-started');
      await page.click('text=I need guidance');
      await page.waitForSelector('[data-testid="signin-popup"]');
      await page.fill('input[name="email"]', testUser.email);
      await page.fill('input[name="password"]', testUser.password);
      await page.click('button[type="submit"]');
      await page.waitForSelector('text=Welcome back');

      await page.context().grantPermissions(['camera', 'microphone']);
      await page.goto('http://localhost:3000/ai-interviewer');
      await page.click('button[data-testid="start-interview"]');
      await page.click('button[data-testid="allow-camera"]');
      await page.click('button[data-testid="allow-microphone"]');
    });

    test('should handle video stream quality changes', async ({ page }) => {
      // Verify video stream is active
      await expect(page.locator('[data-testid="video-stream"]')).toBeVisible();

      // Simulate network quality change
      await page.route('**/api/video-stream', route => {
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ quality: 'low' }),
        });
      });

      // Verify quality indicator updates
      await expect(page.locator('[data-testid="video-quality"]')).toContainText(
        'Low'
      );
    });

    test('should handle audio issues gracefully', async ({ page }) => {
      // Simulate audio failure
      await page.route('**/api/audio-stream', route => {
        route.abort();
      });

      // Verify audio error handling
      await expect(page.locator('[data-testid="audio-error"]')).toBeVisible();
      await expect(
        page.locator('text=Audio connection lost. Attempting to reconnect...')
      ).toBeVisible();
    });

    test('should provide real-time feedback', async ({ page }) => {
      // Start speaking (simulate)
      await page.click('button[data-testid="start-speaking"]');

      // Verify real-time feedback
      await expect(
        page.locator('[data-testid="speaking-indicator"]')
      ).toBeVisible();
      await expect(page.locator('[data-testid="volume-meter"]')).toBeVisible();

      // Stop speaking
      await page.click('button[data-testid="stop-speaking"]');

      // Verify feedback stops
      await expect(
        page.locator('[data-testid="speaking-indicator"]')
      ).not.toBeVisible();
    });
  });

  test.describe('Learning Path Integration', () => {
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

    test('should sync interview progress with learning paths', async ({
      page,
    }) => {
      // Complete some questions in learning path first
      await page.goto('http://localhost:3000/learning-paths/frontend-basics');
      await page.click('button[data-testid="start-learning-button"]');

      for (let i = 0; i < 3; i++) {
        await page.click('button[data-testid="answer-option"]:first-child');
        await page.click('button[data-testid="submit-answer"]');
        await page.click('button[data-testid="next-question"]');
      }

      // Start AI interview with same learning path
      await page.goto('http://localhost:3000/ai-interviewer');
      await page.selectOption(
        'select[data-testid="learning-path-select"]',
        'frontend-basics'
      );
      await page.context().grantPermissions(['camera', 'microphone']);
      await page.click('button[data-testid="start-interview"]');
      await page.click('button[data-testid="allow-camera"]');
      await page.click('button[data-testid="allow-microphone"]');

      // Verify interview adapts to existing progress
      await expect(page.locator('[data-testid="progress-sync"]')).toBeVisible();
      await expect(
        page.locator('text=Continuing from question 4')
      ).toBeVisible();
    });

    test('should update learning path progress after interview', async ({
      page,
    }) => {
      // Start AI interview
      await page.goto('http://localhost:3000/ai-interviewer');
      await page.selectOption(
        'select[data-testid="learning-path-select"]',
        'frontend-basics'
      );
      await page.context().grantPermissions(['camera', 'microphone']);
      await page.click('button[data-testid="start-interview"]');
      await page.click('button[data-testid="allow-camera"]');
      await page.click('button[data-testid="allow-microphone"]');

      // Complete interview questions
      for (let i = 0; i < 2; i++) {
        await page.click('button[data-testid="answer-correct"]');
        await page.click('button[data-testid="submit-answer"]');
        await page.click('button[data-testid="next-question"]');
      }

      // End interview
      await page.click('button[data-testid="end-interview"]');
      await page.click('button[data-testid="confirm-end"]');

      // Navigate back to learning path
      await page.goto('http://localhost:3000/learning-paths/frontend-basics');

      // Verify progress is updated
      await expect(
        page.locator('[data-testid="progress-indicator"]')
      ).toContainText('2/15');
    });

    test('should provide personalized interview recommendations', async ({
      page,
    }) => {
      // Complete different learning paths
      await page.goto('http://localhost:3000/learning-paths/frontend-basics');
      await page.click('button[data-testid="start-learning-button"]');

      for (let i = 0; i < 5; i++) {
        await page.click('button[data-testid="answer-option"]:first-child');
        await page.click('button[data-testid="submit-answer"]');
        await page.click('button[data-testid="next-question"]');
      }

      // Navigate to AI interviewer
      await page.goto('http://localhost:3000/ai-interviewer');

      // Verify personalized recommendations
      await expect(
        page.locator('[data-testid="recommendation-html"]')
      ).toBeVisible();
      await expect(
        page.locator(
          'text=Based on your progress, we recommend focusing on CSS'
        )
      ).toBeVisible();
    });
  });

  test.describe('Error Handling and Recovery', () => {
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

    test('should handle network disconnection during interview', async ({
      page,
    }) => {
      await page.goto('http://localhost:3000/ai-interviewer');
      await page.context().grantPermissions(['camera', 'microphone']);
      await page.click('button[data-testid="start-interview"]');
      await page.click('button[data-testid="allow-camera"]');
      await page.click('button[data-testid="allow-microphone"]');

      // Simulate network disconnection
      await page.context().setOffline(true);

      // Verify error handling
      await expect(
        page.locator('[data-testid="connection-error"]')
      ).toBeVisible();
      await expect(
        page.locator('text=Connection lost. Attempting to reconnect...')
      ).toBeVisible();

      // Restore network
      await page.context().setOffline(false);

      // Verify reconnection
      await expect(
        page.locator('[data-testid="connection-restored"]')
      ).toBeVisible();
    });

    test('should handle AI service failures', async ({ page }) => {
      // Mock AI service failure
      await page.route('**/api/ai-interviewer/**', route => {
        route.fulfill({
          status: 500,
          contentType: 'application/json',
          body: JSON.stringify({ error: 'AI service unavailable' }),
        });
      });

      await page.goto('http://localhost:3000/ai-interviewer');
      await page.context().grantPermissions(['camera', 'microphone']);
      await page.click('button[data-testid="start-interview"]');
      await page.click('button[data-testid="allow-camera"]');
      await page.click('button[data-testid="allow-microphone"]');

      // Verify fallback to static questions
      await expect(page.locator('[data-testid="fallback-mode"]')).toBeVisible();
      await expect(page.locator('text=Using offline questions')).toBeVisible();
    });

    test('should handle browser compatibility issues', async ({ page }) => {
      // Mock unsupported browser features
      await page.addInitScript(() => {
        Object.defineProperty(navigator, 'mediaDevices', {
          value: undefined,
        });
      });

      await page.goto('http://localhost:3000/ai-interviewer');

      // Verify compatibility check
      await expect(
        page.locator('[data-testid="compatibility-error"]')
      ).toBeVisible();
      await expect(
        page.locator('text=Your browser does not support video calls')
      ).toBeVisible();
    });
  });
});
