/**
 * End-to-End Tests for Content Management UI Flow
 * 
 * Tests the complete user journey through the content management system
 */

import { test, expect, Page } from '@playwright/test';

const BASE_URL = process.env.TEST_BASE_URL || 'http://localhost:3000';

test.describe('Content Management E2E Flow', () => {
  let page: Page;
  let testData: {
    categoryId: string;
    topicId: string;
    learningPathId: string;
    questionId: string;
    planId: string;
  };

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    testData = {
      categoryId: '',
      topicId: '',
      learningPathId: '',
      questionId: '',
      planId: ''
    };
  });

  test.afterAll(async () => {
    await page.close();
    // Cleanup test data
    await cleanupTestData();
  });

  test('Complete Content Management Flow', async () => {
    // Step 1: Navigate to admin dashboard
    await page.goto(`${BASE_URL}/admin/dashboard`);
    await expect(page).toHaveTitle(/Admin Dashboard/);

    // Step 2: Create a category
    await test.step('Create Category', async () => {
      await page.click('text=Categories');
      await page.click('text=Add Category');
      
      await page.fill('input[name="name"]', 'Test JavaScript (Core)');
      await page.fill('textarea[name="description"]', 'Test category for JavaScript core concepts');
      await page.click('button[type="submit"]');
      
      await expect(page.locator('text=Category created successfully')).toBeVisible();
      
      // Store category ID for later use
      const categoryElement = await page.locator('[data-testid="category-item"]').first();
      testData.categoryId = await categoryElement.getAttribute('data-category-id') || '';
    });

    // Step 3: Create a topic linked to the category
    await test.step('Create Topic', async () => {
      await page.click('text=Topics');
      await page.click('text=Add Topic');
      
      await page.fill('input[name="name"]', 'Test Hoisting');
      await page.fill('textarea[name="description"]', 'Test topic for JavaScript hoisting');
      await page.selectOption('select[name="category"]', testData.categoryId);
      await page.selectOption('select[name="difficulty"]', 'intermediate');
      await page.click('button[type="submit"]');
      
      await expect(page.locator('text=Topic created successfully')).toBeVisible();
      
      // Store topic ID
      const topicElement = await page.locator('[data-testid="topic-item"]').first();
      testData.topicId = await topicElement.getAttribute('data-topic-id') || '';
    });

    // Step 4: Create a learning path linked to the category
    await test.step('Create Learning Path', async () => {
      await page.click('text=Learning Paths');
      await page.click('text=Add Learning Path');
      
      await page.fill('input[name="name"]', 'Test JavaScript Deep Dive');
      await page.fill('textarea[name="description"]', 'Test learning path for advanced JavaScript');
      await page.selectOption('select[name="category"]', testData.categoryId);
      await page.fill('input[name="order"]', '1');
      await page.click('button[type="submit"]');
      
      await expect(page.locator('text=Learning path created successfully')).toBeVisible();
      
      // Store learning path ID
      const pathElement = await page.locator('[data-testid="learning-path-item"]').first();
      testData.learningPathId = await pathElement.getAttribute('data-path-id') || '';
    });

    // Step 5: Create questions linked to category, topic, and learning path
    await test.step('Create Questions', async () => {
      await page.click('text=Questions');
      await page.click('text=Add Question');
      
      // Fill question form
      await page.fill('input[name="title"]', 'Test Question: What is hoisting?');
      await page.fill('textarea[name="content"]', 'Explain the concept of hoisting in JavaScript.');
      await page.selectOption('select[name="type"]', 'multiple-choice');
      await page.selectOption('select[name="category"]', testData.categoryId);
      await page.selectOption('select[name="difficulty"]', 'intermediate');
      
      // Add options
      await page.fill('input[name="option-0"]', 'Variables are moved to top');
      await page.fill('input[name="option-1"]', 'Functions are moved to top');
      await page.fill('input[name="option-2"]', 'Both variables and functions');
      await page.fill('input[name="option-3"]', 'None of the above');
      
      // Set correct answer
      await page.check('input[name="correct-answer"][value="2"]');
      
      // Link to topic and learning path
      await page.check(`input[name="topics"][value="${testData.topicId}"]`);
      await page.check(`input[name="learningPaths"][value="${testData.learningPathId}"]`);
      
      await page.fill('textarea[name="explanation"]', 'Hoisting moves both variable and function declarations to the top of their scope.');
      await page.click('button[type="submit"]');
      
      await expect(page.locator('text=Question created successfully')).toBeVisible();
      
      // Store question ID
      const questionElement = await page.locator('[data-testid="question-item"]').first();
      testData.questionId = await questionElement.getAttribute('data-question-id') || '';
    });

    // Step 6: Create a learning plan and add questions to it
    await test.step('Create Learning Plan', async () => {
      await page.click('text=Guided Learning');
      await page.click('text=Create Plan');
      
      await page.fill('input[name="name"]', 'Test 1 Day Plan');
      await page.fill('textarea[name="description"]', 'Test intensive preparation plan');
      
      // Add a section
      await page.click('text=Add Section');
      await page.fill('input[name="section-name"]', 'JavaScript Fundamentals');
      await page.selectOption('select[name="section-category"]', testData.categoryId);
      await page.click('text=Save Section');
      
      // Add questions to the section
      await page.click('text=Add Questions');
      await page.check(`input[name="question"][value="${testData.questionId}"]`);
      await page.click('text=Save Questions');
      
      await page.click('button[type="submit"]');
      await expect(page.locator('text=Plan created successfully')).toBeVisible();
      
      // Store plan ID
      const planElement = await page.locator('[data-testid="plan-item"]').first();
      testData.planId = await planElement.getAttribute('data-plan-id') || '';
    });

    // Step 7: Verify questions appear in learning paths page
    await test.step('Verify Learning Paths Display', async () => {
      await page.goto(`${BASE_URL}/learning-paths`);
      
      // Check that the learning path is displayed
      await expect(page.locator('text=Test JavaScript Deep Dive')).toBeVisible();
      
      // Check that question count is displayed
      await expect(page.locator('text=1 question')).toBeVisible();
      
      // Click on the learning path
      await page.click('text=Test JavaScript Deep Dive');
      
      // Verify we're on the learning path detail page
      await expect(page).toHaveURL(/\/learning-paths\/test-javascript-deep-dive/);
      
      // Check that topics are displayed
      await expect(page.locator('text=Test Hoisting')).toBeVisible();
    });

    // Step 8: Verify guided learning plans work
    await test.step('Verify Guided Learning Plans', async () => {
      await page.goto(`${BASE_URL}/guided-learning`);
      
      // Check that the plan is displayed
      await expect(page.locator('text=Test 1 Day Plan')).toBeVisible();
      
      // Click on the plan
      await page.click('text=Test 1 Day Plan');
      
      // Verify we're on the plan detail page
      await expect(page).toHaveURL(/\/guided-learning\/test-1-day-plan/);
      
      // Check that sections with questions are displayed
      await expect(page.locator('text=JavaScript Fundamentals')).toBeVisible();
      await expect(page.locator('text=1 question')).toBeVisible();
    });

    // Step 9: Test question practice flow
    await test.step('Test Question Practice', async () => {
      await page.click('text=Start Practice');
      
      // Verify we're on the practice page
      await expect(page).toHaveURL(/\/guided-practice/);
      
      // Check that the question is displayed
      await expect(page.locator('text=Test Question: What is hoisting?')).toBeVisible();
      
      // Select an answer
      await page.click('text=Both variables and functions');
      
      // Submit answer
      await page.click('text=Submit Answer');
      
      // Check that explanation is shown
      await expect(page.locator('text=Hoisting moves both variable and function declarations')).toBeVisible();
    });
  });

  test('Admin Content Management Interface', async () => {
    await page.goto(`${BASE_URL}/admin/content`);
    
    // Verify all content sections are displayed
    await expect(page.locator('text=Learning')).toBeVisible();
    await expect(page.locator('text=Practice')).toBeVisible();
    await expect(page.locator('text=Interview Prep')).toBeVisible();
    await expect(page.locator('text=Media')).toBeVisible();
    
    // Check that question counts are displayed
    await expect(page.locator('text=questions')).toBeVisible();
  });

  test('Learning Paths Page Functionality', async () => {
    await page.goto(`${BASE_URL}/learning-paths`);
    
    // Verify learning paths are displayed in correct order
    const learningPaths = await page.locator('[data-testid="learning-path-card"]').all();
    expect(learningPaths.length).toBeGreaterThan(0);
    
    // Check that JavaScript Deep Dive is first (if it exists)
    const firstPath = learningPaths[0];
    const firstPathTitle = await firstPath.locator('h3').textContent();
    if (firstPathTitle?.includes('JavaScript Deep Dive')) {
      expect(firstPathTitle).toContain('JavaScript Deep Dive');
    }
    
    // Test collapsible functionality
    await firstPath.click();
    await expect(firstPath.locator('[data-testid="path-content"]')).toBeVisible();
  });

  test('Question Management Interface', async () => {
    await page.goto(`${BASE_URL}/admin/content/questions`);
    
    // Verify question management interface
    await expect(page.locator('text=Question Management')).toBeVisible();
    await expect(page.locator('text=Add Question')).toBeVisible();
    
    // Test search functionality
    await page.fill('input[placeholder*="Search"]', 'hoisting');
    await page.press('input[placeholder*="Search"]', 'Enter');
    
    // Verify search results
    await expect(page.locator('text=hoisting')).toBeVisible();
  });

  test('Plan Management Interface', async () => {
    await page.goto(`${BASE_URL}/admin/guided-learning`);
    
    // Verify plan management interface
    await expect(page.locator('text=Guided Learning Plans')).toBeVisible();
    await expect(page.locator('text=Create Plan')).toBeVisible();
    
    // Check that plans are sorted by day number
    const planCards = await page.locator('[data-testid="plan-card"]').all();
    if (planCards.length > 1) {
      const firstPlanTitle = await planCards[0].locator('h3').textContent();
      const secondPlanTitle = await planCards[1].locator('h3').textContent();
      
      // Extract day numbers and verify sorting
      const firstDay = firstPlanTitle?.match(/(\d+)/)?.[1];
      const secondDay = secondPlanTitle?.match(/(\d+)/)?.[1];
      
      if (firstDay && secondDay) {
        expect(parseInt(firstDay)).toBeLessThanOrEqual(parseInt(secondDay));
      }
    }
  });

  // Helper function to cleanup test data
  async function cleanupTestData() {
    const cleanupPromises = [];

    // Delete question
    if (testData.questionId) {
      cleanupPromises.push(
        fetch(`${BASE_URL}/api/questions/unified/${testData.questionId}`, { method: 'DELETE' })
      );
    }

    // Delete learning path
    if (testData.learningPathId) {
      cleanupPromises.push(
        fetch(`${BASE_URL}/api/learning-paths/${testData.learningPathId}`, { method: 'DELETE' })
      );
    }

    // Delete topic
    if (testData.topicId) {
      cleanupPromises.push(
        fetch(`${BASE_URL}/api/topics/${testData.topicId}`, { method: 'DELETE' })
      );
    }

    // Delete category
    if (testData.categoryId) {
      cleanupPromises.push(
        fetch(`${BASE_URL}/api/categories/${testData.categoryId}`, { method: 'DELETE' })
      );
    }

    // Delete plan
    if (testData.planId) {
      cleanupPromises.push(
        fetch(`${BASE_URL}/api/guided-learning/plans/${testData.planId}`, { method: 'DELETE' })
      );
    }

    await Promise.allSettled(cleanupPromises);
  }
});
