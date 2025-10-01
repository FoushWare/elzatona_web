/**
 * End-to-End Tests for Auto-linking Workflow
 * Tests the complete user journey from question creation to guided learning
 */

const {
  describe,
  test,
  expect,
  beforeAll,
  afterAll,
  beforeEach,
} = require('@jest/globals');
const puppeteer = require('puppeteer');

describe('Auto-linking System E2E Tests', () => {
  let browser;
  let page;
  const baseUrl = 'http://localhost:3000';

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false, // Set to true for CI/CD
      slowMo: 50,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
  });

  afterAll(async () => {
    if (browser) {
      await browser.close();
    }
  });

  beforeEach(async () => {
    page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 720 });
  });

  afterEach(async () => {
    if (page) {
      await page.close();
    }
  });

  describe('Admin Login and Navigation', () => {
    test('should login to admin panel successfully', async () => {
      await page.goto(`${baseUrl}/admin/login`);

      // Wait for login form
      await page.waitForSelector('input[type="email"]', { timeout: 10000 });

      // Fill login form (adjust selectors based on your actual form)
      await page.type('input[type="email"]', 'admin@test.com');
      await page.type('input[type="password"]', 'password123');

      // Submit form
      await page.click('button[type="submit"]');

      // Wait for redirect to dashboard
      await page.waitForSelector('[data-testid="admin-dashboard"]', {
        timeout: 10000,
      });

      expect(page.url()).toContain('/admin/dashboard');
    });
  });

  describe('Question Creation and Auto-linking', () => {
    test('should create question via form and verify auto-linking', async () => {
      // Navigate to questions page
      await page.goto(`${baseUrl}/admin/content/questions`);
      await page.waitForSelector('[data-testid="add-question-btn"]', {
        timeout: 10000,
      });

      // Click add question button
      await page.click('[data-testid="add-question-btn"]');

      // Wait for question form modal
      await page.waitForSelector('[data-testid="question-form"]', {
        timeout: 10000,
      });

      // Fill question form
      await page.type(
        '[data-testid="question-title"]',
        'E2E Test JavaScript Question'
      );
      await page.type(
        '[data-testid="question-content"]',
        'What is the output of console.log(typeof null)?'
      );

      // Select category
      await page.click('[data-testid="category-select"]');
      await page.click('[data-testid="category-option-JavaScript"]');

      // Select learning path
      await page.click('[data-testid="learning-path-select"]');
      await page.click('[data-testid="learning-path-option-frontend"]');

      // Select difficulty
      await page.click('[data-testid="difficulty-select"]');
      await page.click('[data-testid="difficulty-option-medium"]');

      // Select question type
      await page.click('[data-testid="type-select"]');
      await page.click('[data-testid="type-option-single"]');

      // Add options
      await page.type('[data-testid="option-1"]', 'object');
      await page.type('[data-testid="option-2"]', 'null');
      await page.type('[data-testid="option-3"]', 'undefined');
      await page.type('[data-testid="option-4"]', 'string');

      // Set correct answer
      await page.click('[data-testid="correct-answer-1"]');

      // Add explanation
      await page.type(
        '[data-testid="explanation"]',
        'typeof null returns "object" due to a historical bug in JavaScript.'
      );

      // Submit form
      await page.click('[data-testid="submit-question"]');

      // Wait for success message
      await page.waitForSelector('[data-testid="success-message"]', {
        timeout: 10000,
      });

      // Verify success message contains auto-linking information
      const successMessage = await page.textContent(
        '[data-testid="success-message"]'
      );
      expect(successMessage).toContain('auto-linked');
    });

    test('should create questions via bulk markdown import', async () => {
      // Navigate to questions page
      await page.goto(`${baseUrl}/admin/content/questions`);
      await page.waitForSelector('[data-testid="bulk-import-btn"]', {
        timeout: 10000,
      });

      // Click bulk import button
      await page.click('[data-testid="bulk-import-btn"]');

      // Wait for bulk import modal
      await page.waitForSelector('[data-testid="bulk-import-modal"]', {
        timeout: 10000,
      });

      // Switch to markdown tab
      await page.click('[data-testid="markdown-tab"]');

      // Add markdown content
      const markdownContent = `
# JavaScript Questions

## Question 1
**Title:** What is hoisting in JavaScript?
**Type:** single
**Difficulty:** medium
**Category:** JavaScript
**Learning Path:** frontend
**Options:**
- A) Moving variables to the top of their scope
- B) A JavaScript feature for async operations
- C) A way to optimize code
- D) A debugging technique
**Correct Answer:** A
**Explanation:** Hoisting is JavaScript's behavior of moving variable and function declarations to the top of their containing scope.

## Question 2
**Title:** What is the purpose of useEffect in React?
**Type:** single
**Difficulty:** easy
**Category:** React
**Learning Path:** frontend
**Options:**
- A) State management
- B) Side effects
- C) Event handling
- D) Component rendering
**Correct Answer:** B
**Explanation:** useEffect is used for side effects in React components.
      `;

      await page.type('[data-testid="markdown-textarea"]', markdownContent);

      // Submit bulk import
      await page.click('[data-testid="submit-bulk-import"]');

      // Wait for processing
      await page.waitForSelector('[data-testid="processing-indicator"]', {
        timeout: 10000,
      });

      // Wait for completion
      await page.waitForSelector('[data-testid="import-complete"]', {
        timeout: 30000,
      });

      // Verify success message
      const successMessage = await page.textContent(
        '[data-testid="import-success"]'
      );
      expect(successMessage).toContain('2 questions imported');
      expect(successMessage).toContain('auto-linked');
    });
  });

  describe('Section Management and Question Display', () => {
    test('should view questions in sections with auto-linking', async () => {
      // Navigate to sections page
      await page.goto(`${baseUrl}/admin/sections`);
      await page.waitForSelector('[data-testid="sections-list"]', {
        timeout: 10000,
      });

      // Find JavaScript section
      const jsSection = await page.$(
        '[data-testid="section-JavaScript-Fundamentals"]'
      );
      expect(jsSection).toBeTruthy();

      // Click on JavaScript section
      await page.click('[data-testid="section-JavaScript-Fundamentals"]');

      // Wait for section details
      await page.waitForSelector('[data-testid="section-questions"]', {
        timeout: 10000,
      });

      // Verify questions are displayed
      const questions = await page.$$('[data-testid="question-item"]');
      expect(questions.length).toBeGreaterThan(0);

      // Verify question details
      const firstQuestion = await page.$('[data-testid="question-item"]');
      const questionTitle = await page.evaluate(
        el => el.textContent,
        firstQuestion
      );
      expect(questionTitle).toContain('JavaScript');
    });
  });

  describe('Guided Learning Plan Creation and Management', () => {
    test('should create guided learning plan with auto-linked sections', async () => {
      // Navigate to guided learning page
      await page.goto(`${baseUrl}/admin/guided-learning`);
      await page.waitForSelector('[data-testid="create-plan-btn"]', {
        timeout: 10000,
      });

      // Click create plan button
      await page.click('[data-testid="create-plan-btn"]');

      // Wait for plan creation form
      await page.waitForSelector('[data-testid="plan-form"]', {
        timeout: 10000,
      });

      // Fill plan details
      await page.type('[data-testid="plan-title"]', 'E2E Test Learning Plan');
      await page.type(
        '[data-testid="plan-description"]',
        'Test plan for E2E testing'
      );

      // Select difficulty
      await page.click('[data-testid="plan-difficulty"]');
      await page.click('[data-testid="difficulty-beginner"]');

      // Select category filter
      await page.click('[data-testid="category-filter"]');
      await page.click('[data-testid="category-JavaScript"]');

      // Wait for filtered sections to load
      await page.waitForSelector('[data-testid="available-sections"]', {
        timeout: 10000,
      });

      // Select sections
      await page.click('[data-testid="section-JavaScript-Fundamentals"]');

      // Verify section is selected
      const selectedSections = await page.$$(
        '[data-testid="selected-section"]'
      );
      expect(selectedSections.length).toBe(1);

      // Save plan
      await page.click('[data-testid="save-plan"]');

      // Wait for success message
      await page.waitForSelector('[data-testid="plan-saved"]', {
        timeout: 10000,
      });

      // Verify plan was created
      const successMessage = await page.textContent(
        '[data-testid="plan-saved"]'
      );
      expect(successMessage).toContain('Plan created successfully');
    });

    test('should edit guided learning plan and manage questions', async () => {
      // Navigate to existing plan edit page
      await page.goto(`${baseUrl}/admin/guided-learning/1-day-plan/edit`);
      await page.waitForSelector('[data-testid="plan-editor"]', {
        timeout: 10000,
      });

      // Select a section
      await page.click('[data-testid="section-JavaScript-Fundamentals"]');

      // Wait for section to be selected
      await page.waitForSelector('[data-testid="working-on-section"]', {
        timeout: 10000,
      });

      // Verify "Working on" indicator
      const workingOnText = await page.textContent(
        '[data-testid="working-on-section"]'
      );
      expect(workingOnText).toContain('JavaScript Fundamentals');

      // Wait for available questions to load
      await page.waitForSelector('[data-testid="available-questions"]', {
        timeout: 10000,
      });

      // Verify questions are filtered by section
      const availableQuestions = await page.$$('[data-testid="question-card"]');
      expect(availableQuestions.length).toBeGreaterThan(0);

      // Add questions to section
      await page.click('[data-testid="add-questions-btn"]');

      // Wait for add questions modal
      await page.waitForSelector('[data-testid="add-questions-modal"]', {
        timeout: 10000,
      });

      // Select "Add from existing" option
      await page.click('[data-testid="add-from-existing"]');

      // Wait for question selection
      await page.waitForSelector('[data-testid="question-selection"]', {
        timeout: 10000,
      });

      // Select some questions
      const questionCheckboxes = await page.$$(
        '[data-testid="question-checkbox"]'
      );
      if (questionCheckboxes.length > 0) {
        await questionCheckboxes[0].click();
        if (questionCheckboxes.length > 1) {
          await questionCheckboxes[1].click();
        }
      }

      // Confirm selection
      await page.click('[data-testid="confirm-selection"]');

      // Wait for questions to be added
      await page.waitForSelector('[data-testid="questions-added"]', {
        timeout: 10000,
      });

      // Save plan
      await page.click('[data-testid="save-plan"]');

      // Wait for save confirmation
      await page.waitForSelector('[data-testid="plan-saved"]', {
        timeout: 10000,
      });

      // Verify save success
      const saveMessage = await page.textContent('[data-testid="plan-saved"]');
      expect(saveMessage).toContain('Plan saved successfully');
    });
  });

  describe('User-facing Guided Learning Experience', () => {
    test('should display guided learning plan to users', async () => {
      // Navigate to user-facing guided learning page
      await page.goto(`${baseUrl}/guided-learning`);
      await page.waitForSelector('[data-testid="learning-plans"]', {
        timeout: 10000,
      });

      // Find the test plan
      const planCard = await page.$('[data-testid="plan-1-day-plan"]');
      expect(planCard).toBeTruthy();

      // Click on the plan
      await page.click('[data-testid="plan-1-day-plan"]');

      // Wait for plan details
      await page.waitForSelector('[data-testid="plan-details"]', {
        timeout: 10000,
      });

      // Verify plan information
      const planTitle = await page.textContent('[data-testid="plan-title"]');
      expect(planTitle).toContain('1-Day Frontend Quick Start');

      // Verify sections are displayed
      const sections = await page.$$('[data-testid="plan-section"]');
      expect(sections.length).toBeGreaterThan(0);

      // Click on a section
      await page.click('[data-testid="section-JavaScript-Fundamentals"]');

      // Wait for section questions
      await page.waitForSelector('[data-testid="section-questions"]', {
        timeout: 10000,
      });

      // Verify questions are displayed
      const questions = await page.$$('[data-testid="question-item"]');
      expect(questions.length).toBeGreaterThan(0);
    });
  });

  describe('Error Handling and Edge Cases', () => {
    test('should handle network errors gracefully', async () => {
      // Simulate network error by going offline
      await page.setOfflineMode(true);

      // Try to navigate to questions page
      await page.goto(`${baseUrl}/admin/content/questions`);

      // Should show error message
      await page.waitForSelector('[data-testid="error-message"]', {
        timeout: 10000,
      });

      const errorMessage = await page.textContent(
        '[data-testid="error-message"]'
      );
      expect(errorMessage).toContain('network');

      // Restore network
      await page.setOfflineMode(false);
    });

    test('should handle empty states', async () => {
      // Navigate to sections page
      await page.goto(`${baseUrl}/admin/sections`);

      // If no sections exist, should show empty state
      const emptyState = await page.$('[data-testid="empty-sections"]');
      if (emptyState) {
        const emptyMessage = await page.textContent(
          '[data-testid="empty-sections"]'
        );
        expect(emptyMessage).toContain('No sections found');
      }
    });
  });

  describe('Performance and Load Testing', () => {
    test('should handle large number of questions efficiently', async () => {
      // Navigate to questions page
      await page.goto(`${baseUrl}/admin/content/questions`);

      // Measure page load time
      const startTime = Date.now();
      await page.waitForSelector('[data-testid="questions-list"]', {
        timeout: 10000,
      });
      const loadTime = Date.now() - startTime;

      // Should load within reasonable time (adjust threshold as needed)
      expect(loadTime).toBeLessThan(5000);

      // Test search functionality
      await page.type('[data-testid="search-input"]', 'JavaScript');

      // Wait for filtered results
      await page.waitForSelector('[data-testid="filtered-questions"]', {
        timeout: 5000,
      });

      // Verify search works
      const filteredQuestions = await page.$$('[data-testid="question-item"]');
      expect(filteredQuestions.length).toBeGreaterThan(0);
    });
  });
});
