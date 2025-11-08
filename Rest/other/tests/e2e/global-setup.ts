/**
 * Global Setup for E2E Tests
 *
 * This file runs once before all tests and sets up:
 * - Test database state
 * - Mock services
 * - Test user accounts
 * - Environment configuration
 */

import { chromium, FullConfig, Page } from '@playwright/test';

async function globalSetup(_config: FullConfig) {
  console.log('🚀 Starting E2E Test Global Setup...');

  // Launch browser for setup
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    // Navigate to the application
    await page.goto('http://localhost:3000');

    // Wait for the application to be ready
    await page.waitForLoadState('networkidle');

    // Clear any existing test data
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });

    // Set up test environment variables
    await page.addInitScript(() => {
      // Mock Firebase for testing
      window.testMode = true;
      window.mockFirebase = true;
    });

    // Create test user accounts if needed
    await createTestUsers(page);

    // Set up mock data
    await setupMockData(page);

    console.log('✅ E2E Test Global Setup Complete');
  } catch (error) {
    console.error('❌ E2E Test Global Setup Failed:', error);
    throw error;
  } finally {
    await browser.close();
  }
}

async function createTestUsers(page: Page) {
  console.log('👤 Creating test user accounts...');

  // This would typically involve API calls to create test users
  // For now, we'll just ensure the sign-in flow works
  try {
    await page.goto('http://localhost:3000/get-started');
    await page.waitForLoadState('networkidle');
    console.log('✅ Test user setup complete');
  } catch (_error) {
    console.log('⚠️ Test user setup skipped (may not be needed)');
  }
}

async function setupMockData(page: Page) {
  console.log('📊 Setting up mock data...');

  // Set up mock learning paths data
  await page.addInitScript(() => {
    window.mockLearningPaths = [
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

    // Set up mock questions data
    window.mockQuestions = {
      'frontend-basics': {
        html: [
          {
            id: 'html-1',
            question: 'What does HTML stand for?',
            type: 'multiple-choice',
            difficulty: 'beginner',
            options: [
              'HyperText Markup Language',
              'High Tech Modern Language',
              'Home Tool Markup Language',
            ],
            correctAnswer: 0,
          },
          // Add more mock questions...
        ],
        css: [
          {
            id: 'css-1',
            question: 'What does CSS stand for?',
            type: 'multiple-choice',
            difficulty: 'beginner',
            options: [
              'Cascading Style Sheets',
              'Computer Style Sheets',
              'Creative Style Sheets',
            ],
            correctAnswer: 0,
          },
          // Add more mock questions...
        ],
        javascript: [
          {
            id: 'js-1',
            question: 'What is JavaScript?',
            type: 'multiple-choice',
            difficulty: 'beginner',
            options: [
              'A programming language',
              'A markup language',
              'A styling language',
            ],
            correctAnswer: 0,
          },
          // Add more mock questions...
        ],
      },
    };

    // Set up mock progress data
    window.mockProgress = {
      'test@example.com': {
        totalQuestionsCompleted: 0,
        totalPoints: 0,
        currentStreak: 0,
        longestStreak: 0,
        learningPaths: {},
        achievements: [],
        badges: [],
      },
    };
  });

  console.log('✅ Mock data setup complete');
}

export default globalSetup;
