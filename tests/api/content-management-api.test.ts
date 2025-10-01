/**
 * API Tests for Content Management Endpoints
 *
 * Tests all API endpoints involved in the content management flow
 */

import {
  describe,
  it,
  expect,
  beforeAll,
  afterAll,
  beforeEach,
} from '@jest/globals';

const BASE_URL = process.env.TEST_BASE_URL || 'http://localhost:3000';

describe('Content Management API Tests', () => {
  let testData: {
    categoryId: string;
    topicId: string;
    learningPathId: string;
    questionId: string;
    planId: string;
  };

  beforeAll(async () => {
    testData = {
      categoryId: '',
      topicId: '',
      learningPathId: '',
      questionId: '',
      planId: '',
    };
  });

  afterAll(async () => {
    // Cleanup test data
    await cleanupTestData();
  });

  describe('Categories API', () => {
    it('POST /api/categories - should create a category', async () => {
      const categoryData = {
        id: 'test-js-core',
        name: 'Test JavaScript (Core)',
        description: 'Test category for JavaScript core concepts',
      };

      const response = await fetch(`${BASE_URL}/api/categories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(categoryData),
      });

      expect(response.status).toBe(201);
      const result = await response.json();
      expect(result.success).toBe(true);
      expect(result.data.id).toBe(categoryData.id);

      testData.categoryId = result.data.id;
    });

    it('GET /api/categories - should retrieve all categories', async () => {
      const response = await fetch(`${BASE_URL}/api/categories`);

      expect(response.status).toBe(200);
      const result = await response.json();
      expect(result.success).toBe(true);
      expect(Array.isArray(result.data)).toBe(true);
      expect(result.data.length).toBeGreaterThan(0);
    });

    it('GET /api/categories/[id] - should retrieve specific category', async () => {
      const response = await fetch(
        `${BASE_URL}/api/categories/${testData.categoryId}`
      );

      expect(response.status).toBe(200);
      const result = await response.json();
      expect(result.success).toBe(true);
      expect(result.data.id).toBe(testData.categoryId);
    });
  });

  describe('Topics API', () => {
    it('POST /api/topics - should create a topic', async () => {
      const topicData = {
        id: 'test-hoisting',
        name: 'Test Hoisting',
        description: 'Test topic for JavaScript hoisting',
        category: testData.categoryId,
        difficulty: 'intermediate',
      };

      const response = await fetch(`${BASE_URL}/api/topics`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(topicData),
      });

      expect(response.status).toBe(201);
      const result = await response.json();
      expect(result.success).toBe(true);
      expect(result.data.id).toBe(topicData.id);

      testData.topicId = result.data.id;
    });

    it('GET /api/topics - should retrieve all topics', async () => {
      const response = await fetch(`${BASE_URL}/api/topics`);

      expect(response.status).toBe(200);
      const result = await response.json();
      expect(result.success).toBe(true);
      expect(Array.isArray(result.data)).toBe(true);
      expect(result.data.length).toBeGreaterThan(0);
    });

    it('GET /api/topics/[id] - should retrieve specific topic', async () => {
      const response = await fetch(
        `${BASE_URL}/api/topics/${testData.topicId}`
      );

      expect(response.status).toBe(200);
      const result = await response.json();
      expect(result.success).toBe(true);
      expect(result.data.id).toBe(testData.topicId);
    });

    it('PUT /api/topics/[id] - should update topic', async () => {
      const updateData = {
        name: 'Updated Test Hoisting',
        description: 'Updated description for hoisting',
        category: testData.categoryId,
        difficulty: 'advanced',
      };

      const response = await fetch(
        `${BASE_URL}/api/topics/${testData.topicId}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updateData),
        }
      );

      expect(response.status).toBe(200);
      const result = await response.json();
      expect(result.success).toBe(true);
      expect(result.data.name).toBe(updateData.name);
    });
  });

  describe('Learning Paths API', () => {
    it('POST /api/learning-paths - should create a learning path', async () => {
      const learningPathData = {
        id: 'test-js-deep-dive',
        name: 'Test JavaScript Deep Dive',
        description: 'Test learning path for advanced JavaScript',
        category: testData.categoryId,
        order: 1,
        questionCount: 0,
      };

      const response = await fetch(`${BASE_URL}/api/learning-paths`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(learningPathData),
      });

      expect(response.status).toBe(201);
      const result = await response.json();
      expect(result.success).toBe(true);
      expect(result.data.id).toBe(learningPathData.id);

      testData.learningPathId = result.data.id;
    });

    it('GET /api/learning-paths - should retrieve all learning paths', async () => {
      const response = await fetch(`${BASE_URL}/api/learning-paths`);

      expect(response.status).toBe(200);
      const result = await response.json();
      expect(result.success).toBe(true);
      expect(Array.isArray(result.data)).toBe(true);
      expect(result.data.length).toBeGreaterThan(0);
    });

    it('GET /api/learning-paths/[id] - should retrieve specific learning path', async () => {
      const response = await fetch(
        `${BASE_URL}/api/learning-paths/${testData.learningPathId}`
      );

      expect(response.status).toBe(200);
      const result = await response.json();
      expect(result.success).toBe(true);
      expect(result.data.id).toBe(testData.learningPathId);
    });
  });

  describe('Questions API', () => {
    it('POST /api/questions/unified - should create a question', async () => {
      const questionData = {
        id: 'test-q1',
        title: 'Test Question: What is hoisting?',
        content: 'Explain the concept of hoisting in JavaScript.',
        type: 'multiple-choice',
        options: [
          'Variables are moved to top',
          'Functions are moved to top',
          'Both',
          'None',
        ],
        correctAnswer: 'Both',
        explanation:
          'Hoisting moves both variable and function declarations to the top.',
        difficulty: 'intermediate',
        category: testData.categoryId,
        topics: [testData.topicId],
        learningPaths: [testData.learningPathId],
      };

      const response = await fetch(`${BASE_URL}/api/questions/unified`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(questionData),
      });

      expect(response.status).toBe(201);
      const result = await response.json();
      expect(result.success).toBe(true);
      expect(result.data.id).toBeDefined();

      testData.questionId = result.data.id;
    });

    it('POST /api/questions/unified - should create bulk questions', async () => {
      const bulkQuestions = [
        {
          id: 'test-q2',
          title: 'Test Question 2',
          content: 'What are closures?',
          type: 'multiple-choice',
          options: ['A', 'B', 'C', 'D'],
          correctAnswer: 'A',
          explanation: 'Closures explanation',
          difficulty: 'intermediate',
          category: testData.categoryId,
          topics: [testData.topicId],
          learningPaths: [testData.learningPathId],
        },
        {
          id: 'test-q3',
          title: 'Test Question 3',
          content: 'What is scope?',
          type: 'multiple-choice',
          options: ['A', 'B', 'C', 'D'],
          correctAnswer: 'B',
          explanation: 'Scope explanation',
          difficulty: 'beginner',
          category: testData.categoryId,
          topics: [testData.topicId],
          learningPaths: [testData.learningPathId],
        },
      ];

      const response = await fetch(`${BASE_URL}/api/questions/unified`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bulk: true,
          questions: bulkQuestions,
        }),
      });

      expect(response.status).toBe(201);
      const result = await response.json();
      expect(result.success).toBe(true);
      expect(result.data.success).toBe(2);
    });

    it('GET /api/questions/unified - should retrieve questions by category', async () => {
      const response = await fetch(
        `${BASE_URL}/api/questions/unified?category=${testData.categoryId}`
      );

      expect(response.status).toBe(200);
      const result = await response.json();
      expect(result.success).toBe(true);
      expect(Array.isArray(result.data)).toBe(true);
      expect(result.data.length).toBeGreaterThan(0);
    });

    it('GET /api/questions/unified - should retrieve questions by learning path', async () => {
      const response = await fetch(
        `${BASE_URL}/api/questions/unified?learningPath=${testData.learningPathId}`
      );

      expect(response.status).toBe(200);
      const result = await response.json();
      expect(result.success).toBe(true);
      expect(Array.isArray(result.data)).toBe(true);
      expect(result.data.length).toBeGreaterThan(0);
    });

    it('GET /api/questions/unified/[id] - should retrieve specific question', async () => {
      const response = await fetch(
        `${BASE_URL}/api/questions/unified/${testData.questionId}`
      );

      expect(response.status).toBe(200);
      const result = await response.json();
      expect(result.success).toBe(true);
      expect(result.data.id).toBe(testData.questionId);
    });
  });

  describe('Learning Plans API', () => {
    it('POST /api/guided-learning/plans - should create a learning plan', async () => {
      const planData = {
        id: 'test-1-day-plan',
        name: 'Test 1 Day Plan',
        description: 'Test intensive preparation plan',
        sections: {
          'js-fundamentals': {
            id: 'js-fundamentals',
            name: 'JavaScript Fundamentals',
            category: testData.categoryId,
            questions: [testData.questionId],
          },
        },
      };

      const response = await fetch(`${BASE_URL}/api/guided-learning/plans`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(planData),
      });

      expect(response.status).toBe(201);
      const result = await response.json();
      expect(result.success).toBe(true);
      expect(result.data.id).toBe(planData.id);

      testData.planId = result.data.id;
    });

    it('GET /api/guided-learning/plans - should retrieve all plans', async () => {
      const response = await fetch(`${BASE_URL}/api/guided-learning/plans`);

      expect(response.status).toBe(200);
      const result = await response.json();
      expect(result.success).toBe(true);
      expect(Array.isArray(result.data)).toBe(true);
      expect(result.data.length).toBeGreaterThan(0);
    });

    it('GET /api/guided-learning/plans/[id] - should retrieve specific plan', async () => {
      const response = await fetch(
        `${BASE_URL}/api/guided-learning/plans/${testData.planId}`
      );

      expect(response.status).toBe(200);
      const result = await response.json();
      expect(result.success).toBe(true);
      expect(result.data.id).toBe(testData.planId);
    });

    it('PUT /api/guided-learning/plans/[id]/sections/[sectionId] - should update plan section with questions', async () => {
      const sectionData = {
        questions: [testData.questionId],
      };

      const response = await fetch(
        `${BASE_URL}/api/guided-learning/plans/${testData.planId}/sections/js-fundamentals`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(sectionData),
        }
      );

      expect(response.status).toBe(200);
      const result = await response.json();
      expect(result.success).toBe(true);
    });
  });

  describe('Content Linking Validation', () => {
    it('should maintain data consistency across all entities', async () => {
      // Verify category exists
      const categoryResponse = await fetch(
        `${BASE_URL}/api/categories/${testData.categoryId}`
      );
      expect(categoryResponse.status).toBe(200);

      // Verify topic is linked to category
      const topicResponse = await fetch(
        `${BASE_URL}/api/topics/${testData.topicId}`
      );
      const topic = await topicResponse.json();
      expect(topic.data.category).toBe(testData.categoryId);

      // Verify learning path is linked to category
      const learningPathResponse = await fetch(
        `${BASE_URL}/api/learning-paths/${testData.learningPathId}`
      );
      const learningPath = await learningPathResponse.json();
      expect(learningPath.data.category).toBe(testData.categoryId);

      // Verify question is linked to all entities
      const questionResponse = await fetch(
        `${BASE_URL}/api/questions/unified/${testData.questionId}`
      );
      const question = await questionResponse.json();
      expect(question.data.category).toBe(testData.categoryId);
      expect(question.data.topics).toContain(testData.topicId);
      expect(question.data.learningPaths).toContain(testData.learningPathId);

      // Verify plan contains the question
      const planResponse = await fetch(
        `${BASE_URL}/api/guided-learning/plans/${testData.planId}`
      );
      const plan = await planResponse.json();
      const jsSection = Object.values(plan.data.sections).find(
        (section: any) => section.name === 'JavaScript Fundamentals'
      );
      expect(jsSection.questions).toContain(testData.questionId);
    });

    it('should handle error cases gracefully', async () => {
      // Test creating topic with non-existent category
      const invalidTopicData = {
        id: 'invalid-topic',
        name: 'Invalid Topic',
        description: 'This should fail',
        category: 'non-existent-category',
        difficulty: 'intermediate',
      };

      const response = await fetch(`${BASE_URL}/api/topics`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(invalidTopicData),
      });

      expect(response.status).toBe(400);
      const result = await response.json();
      expect(result.success).toBe(false);
    });
  });

  // Helper function to cleanup test data
  async function cleanupTestData() {
    const cleanupPromises = [];

    // Delete question
    if (testData.questionId) {
      cleanupPromises.push(
        fetch(`${BASE_URL}/api/questions/unified/${testData.questionId}`, {
          method: 'DELETE',
        })
      );
    }

    // Delete learning path
    if (testData.learningPathId) {
      cleanupPromises.push(
        fetch(`${BASE_URL}/api/learning-paths/${testData.learningPathId}`, {
          method: 'DELETE',
        })
      );
    }

    // Delete topic
    if (testData.topicId) {
      cleanupPromises.push(
        fetch(`${BASE_URL}/api/topics/${testData.topicId}`, {
          method: 'DELETE',
        })
      );
    }

    // Delete category
    if (testData.categoryId) {
      cleanupPromises.push(
        fetch(`${BASE_URL}/api/categories/${testData.categoryId}`, {
          method: 'DELETE',
        })
      );
    }

    // Delete plan
    if (testData.planId) {
      cleanupPromises.push(
        fetch(`${BASE_URL}/api/guided-learning/plans/${testData.planId}`, {
          method: 'DELETE',
        })
      );
    }

    await Promise.allSettled(cleanupPromises);
  }
});
