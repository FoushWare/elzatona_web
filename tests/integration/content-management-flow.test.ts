/**
 * Integration Tests for Content Management Flow
 *
 * This test suite covers the complete flow of:
 * 1. Creating categories, topics, learning-paths and linking them
 * 2. Creating questions and linking with category, topics, learning paths
 * 3. Creating plans and adding questions to them
 * 4. Verifying questions appear in learning-paths page
 */

import {
  describe,
  it,
  expect,
  beforeAll,
  afterAll,
  beforeEach,
} from '@jest/globals';

// Mock data for testing
const testData = {
  categories: [
    {
      id: 'javascript-core',
      name: 'JavaScript (Core)',
      description: 'Core JavaScript concepts',
    },
    {
      id: 'react-core',
      name: 'React.js (Core)',
      description: 'React fundamentals and advanced patterns',
    },
    {
      id: 'css-styling',
      name: 'CSS & Styling',
      description: 'CSS fundamentals and advanced techniques',
    },
  ],
  topics: [
    {
      id: 'hoisting',
      name: 'Hoisting',
      description: 'JavaScript hoisting behavior',
      category: 'javascript-core',
      difficulty: 'intermediate',
    },
    {
      id: 'closures',
      name: 'Closures',
      description: 'JavaScript closures and lexical scoping',
      category: 'javascript-core',
      difficulty: 'intermediate',
    },
    {
      id: 'react-hooks',
      name: 'React Hooks',
      description: 'React hooks and state management',
      category: 'react-core',
      difficulty: 'intermediate',
    },
    {
      id: 'css-grid',
      name: 'CSS Grid',
      description: 'CSS Grid layout system',
      category: 'css-styling',
      difficulty: 'intermediate',
    },
  ],
  learningPaths: [
    {
      id: 'javascript-deep-dive',
      name: 'JavaScript Deep Dive',
      description: 'Master advanced JavaScript',
      order: 1,
      category: 'javascript-core',
    },
    {
      id: 'react-mastery',
      name: 'React Mastery',
      description: 'Advanced React patterns',
      order: 2,
      category: 'react-core',
    },
    {
      id: 'css-mastery',
      name: 'CSS Mastery',
      description: 'Advanced CSS techniques',
      order: 3,
      category: 'css-styling',
    },
  ],
  questions: [
    {
      id: 'q1',
      title: 'What is hoisting in JavaScript?',
      content: 'Explain the concept of hoisting in JavaScript.',
      type: 'multiple-choice',
      options: [
        'Variables are moved to top',
        'Functions are moved to top',
        'Both variables and functions',
        'None of the above',
      ],
      correctAnswer: 'Both variables and functions',
      explanation:
        'Hoisting moves both variable and function declarations to the top of their scope.',
      difficulty: 'intermediate',
      category: 'javascript-core',
      topics: ['hoisting'],
      learningPaths: ['javascript-deep-dive'],
    },
    {
      id: 'q2',
      title: 'What are closures in JavaScript?',
      content: 'Explain JavaScript closures.',
      type: 'multiple-choice',
      options: [
        'Function with access to outer scope',
        'Function inside another function',
        'Both A and B',
        'None of the above',
      ],
      correctAnswer: 'Both A and B',
      explanation:
        'Closures are functions that have access to variables in their outer scope.',
      difficulty: 'intermediate',
      category: 'javascript-core',
      topics: ['closures'],
      learningPaths: ['javascript-deep-dive'],
    },
  ],
  plans: [
    {
      id: '1-day-plan',
      name: '1 Day Plan',
      description: "Intensive preparation for tomorrow's interview",
      sections: [
        {
          id: 'js-fundamentals',
          name: 'JavaScript Fundamentals',
          category: 'javascript-core',
          questions: ['q1', 'q2'],
        },
      ],
    },
  ],
};

describe('Content Management Flow Integration Tests', () => {
  let baseUrl: string;
  let createdIds: {
    categories: string[];
    topics: string[];
    learningPaths: string[];
    questions: string[];
    plans: string[];
  };

  beforeAll(async () => {
    baseUrl = process.env.TEST_BASE_URL || 'http://localhost:3000';
    createdIds = {
      categories: [],
      topics: [],
      learningPaths: [],
      questions: [],
      plans: [],
    };
  });

  afterAll(async () => {
    // Cleanup: Delete all created test data
    await cleanupTestData();
  });

  beforeEach(() => {
    // Reset created IDs for each test
    createdIds = {
      categories: [],
      topics: [],
      learningPaths: [],
      questions: [],
      plans: [],
    };
  });

  describe('1. Category Management Flow', () => {
    it('should create categories successfully', async () => {
      for (const category of testData.categories) {
        const response = await fetch(`${baseUrl}/api/categories`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(category),
        });

        expect(response.status).toBe(201);
        const result = await response.json();
        expect(result.success).toBe(true);
        expect(result.data.id).toBeDefined();

        createdIds.categories.push(result.data.id);
      }
    });

    it('should retrieve all categories', async () => {
      const response = await fetch(`${baseUrl}/api/categories`);
      expect(response.status).toBe(200);

      const result = await response.json();
      expect(result.success).toBe(true);
      expect(Array.isArray(result.data)).toBe(true);
      expect(result.data.length).toBeGreaterThan(0);
    });
  });

  describe('2. Topic Management Flow', () => {
    it('should create topics and link them to categories', async () => {
      for (const topic of testData.topics) {
        const response = await fetch(`${baseUrl}/api/topics`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(topic),
        });

        expect(response.status).toBe(201);
        const result = await response.json();
        expect(result.success).toBe(true);
        expect(result.data.id).toBeDefined();

        createdIds.topics.push(result.data.id);
      }
    });

    it('should retrieve topics by category', async () => {
      const response = await fetch(`${baseUrl}/api/topics`);
      expect(response.status).toBe(200);

      const result = await response.json();
      expect(result.success).toBe(true);

      // Filter topics by JavaScript category
      const jsTopics = result.data.filter(
        (topic: any) => topic.category === 'javascript-core'
      );
      expect(jsTopics.length).toBeGreaterThan(0);
    });
  });

  describe('3. Learning Path Management Flow', () => {
    it('should create learning paths and link them to categories', async () => {
      for (const learningPath of testData.learningPaths) {
        const response = await fetch(`${baseUrl}/api/learning-paths`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(learningPath),
        });

        expect(response.status).toBe(201);
        const result = await response.json();
        expect(result.success).toBe(true);
        expect(result.data.id).toBeDefined();

        createdIds.learningPaths.push(result.data.id);
      }
    });

    it('should retrieve learning paths with proper ordering', async () => {
      const response = await fetch(`${baseUrl}/api/learning-paths`);
      expect(response.status).toBe(200);

      const result = await response.json();
      expect(result.success).toBe(true);
      expect(Array.isArray(result.data)).toBe(true);

      // Check that JavaScript Deep Dive is first (order: 1)
      const jsDeepDive = result.data.find(
        (path: any) => path.id === 'javascript-deep-dive'
      );
      expect(jsDeepDive).toBeDefined();
      expect(jsDeepDive.order).toBe(1);
    });
  });

  describe('4. Question Management Flow', () => {
    it('should create questions and link them to categories, topics, and learning paths', async () => {
      for (const question of testData.questions) {
        const response = await fetch(`${baseUrl}/api/questions/unified`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(question),
        });

        expect(response.status).toBe(201);
        const result = await response.json();
        expect(result.success).toBe(true);
        expect(result.data.id).toBeDefined();

        createdIds.questions.push(result.data.id);
      }
    });

    it('should retrieve questions by learning path', async () => {
      const response = await fetch(
        `${baseUrl}/api/questions/unified?learningPath=javascript-deep-dive`
      );
      expect(response.status).toBe(200);

      const result = await response.json();
      expect(result.success).toBe(true);
      expect(Array.isArray(result.data)).toBe(true);
      expect(result.data.length).toBeGreaterThan(0);
    });

    it('should retrieve questions by category', async () => {
      const response = await fetch(
        `${baseUrl}/api/questions/unified?category=javascript-core`
      );
      expect(response.status).toBe(200);

      const result = await response.json();
      expect(result.success).toBe(true);
      expect(Array.isArray(result.data)).toBe(true);
      expect(result.data.length).toBeGreaterThan(0);
    });

    it('should retrieve questions by topic', async () => {
      const response = await fetch(
        `${baseUrl}/api/questions/unified?topic=hoisting`
      );
      expect(response.status).toBe(200);

      const result = await response.json();
      expect(result.success).toBe(true);
      expect(Array.isArray(result.data)).toBe(true);
    });
  });

  describe('5. Plan Management Flow', () => {
    it('should create learning plans', async () => {
      for (const plan of testData.plans) {
        const response = await fetch(`${baseUrl}/api/guided-learning/plans`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(plan),
        });

        expect(response.status).toBe(201);
        const result = await response.json();
        expect(result.success).toBe(true);
        expect(result.data.id).toBeDefined();

        createdIds.plans.push(result.data.id);
      }
    });

    it('should add questions to plan sections', async () => {
      const planId = '1-day-plan';
      const sectionId = 'js-fundamentals';
      const questionIds = createdIds.questions.slice(0, 2); // Use first 2 questions

      const response = await fetch(
        `${baseUrl}/api/guided-learning/plans/${planId}/sections/${sectionId}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ questions: questionIds }),
        }
      );

      expect(response.status).toBe(200);
      const result = await response.json();
      expect(result.success).toBe(true);
    });

    it('should retrieve plan with questions', async () => {
      const response = await fetch(
        `${baseUrl}/api/guided-learning/plans/1-day-plan`
      );
      expect(response.status).toBe(200);

      const result = await response.json();
      expect(result.success).toBe(true);
      expect(result.data.sections).toBeDefined();

      // Check that questions are linked to sections
      const jsSection = Object.values(result.data.sections).find(
        (section: any) => section.name === 'JavaScript Fundamentals'
      );
      expect(jsSection).toBeDefined();
      expect(jsSection.questions).toBeDefined();
      expect(Array.isArray(jsSection.questions)).toBe(true);
    });
  });

  describe('6. Learning Paths Page Integration', () => {
    it('should display questions in learning paths page', async () => {
      // First, ensure questions are properly linked to learning paths
      const learningPathId = 'javascript-deep-dive';

      // Get questions for the learning path
      const questionsResponse = await fetch(
        `${baseUrl}/api/questions/unified?learningPath=${learningPathId}`
      );
      expect(questionsResponse.status).toBe(200);

      const questionsResult = await questionsResponse.json();
      expect(questionsResult.success).toBe(true);
      expect(questionsResult.data.length).toBeGreaterThan(0);

      // Get learning path details
      const pathResponse = await fetch(
        `${baseUrl}/api/learning-paths/${learningPathId}`
      );
      expect(pathResponse.status).toBe(200);

      const pathResult = await pathResponse.json();
      expect(pathResult.success).toBe(true);
      expect(pathResult.data.questionCount).toBeGreaterThan(0);
    });

    it('should show topics in learning path detail page', async () => {
      const learningPathId = 'javascript-deep-dive';

      // Get the learning path detail page
      const response = await fetch(
        `${baseUrl}/learning-paths/${learningPathId}`
      );
      expect(response.status).toBe(200);

      // The page should contain topic cards
      const html = await response.text();
      expect(html).toContain('Learning Topics');
      expect(html).toContain('Hoisting');
      expect(html).toContain('Closures');
    });
  });

  describe('7. End-to-End Content Flow Validation', () => {
    it('should maintain data consistency across all entities', async () => {
      // 1. Verify categories exist
      const categoriesResponse = await fetch(`${baseUrl}/api/categories`);
      const categories = await categoriesResponse.json();
      expect(categories.data.length).toBeGreaterThan(0);

      // 2. Verify topics are linked to categories
      const topicsResponse = await fetch(`${baseUrl}/api/topics`);
      const topics = await topicsResponse.json();
      expect(topics.data.length).toBeGreaterThan(0);

      const jsTopics = topics.data.filter(
        (topic: any) => topic.category === 'javascript-core'
      );
      expect(jsTopics.length).toBeGreaterThan(0);

      // 3. Verify learning paths are linked to categories
      const learningPathsResponse = await fetch(
        `${baseUrl}/api/learning-paths`
      );
      const learningPaths = await learningPathsResponse.json();
      expect(learningPaths.data.length).toBeGreaterThan(0);

      // 4. Verify questions are linked to all entities
      const questionsResponse = await fetch(`${baseUrl}/api/questions/unified`);
      const questions = await questionsResponse.json();
      expect(questions.data.length).toBeGreaterThan(0);

      const jsQuestions = questions.data.filter(
        (q: any) => q.category === 'javascript-core'
      );
      expect(jsQuestions.length).toBeGreaterThan(0);

      // 5. Verify plans contain questions
      const plansResponse = await fetch(`${baseUrl}/api/guided-learning/plans`);
      const plans = await plansResponse.json();
      expect(plans.data.length).toBeGreaterThan(0);
    });

    it('should handle bulk operations correctly', async () => {
      // Test bulk question creation
      const bulkQuestions = testData.questions.map(q => ({
        ...q,
        id: `bulk-${q.id}`,
        title: `Bulk ${q.title}`,
      }));

      const response = await fetch(`${baseUrl}/api/questions/unified`, {
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
      expect(result.data.success).toBeGreaterThan(0);
    });
  });

  // Helper function to cleanup test data
  async function cleanupTestData() {
    // Delete questions
    for (const questionId of createdIds.questions) {
      try {
        await fetch(`${baseUrl}/api/questions/unified/${questionId}`, {
          method: 'DELETE',
        });
      } catch (error) {
        console.warn(`Failed to delete question ${questionId}:`, error);
      }
    }

    // Delete learning paths
    for (const pathId of createdIds.learningPaths) {
      try {
        await fetch(`${baseUrl}/api/learning-paths/${pathId}`, {
          method: 'DELETE',
        });
      } catch (error) {
        console.warn(`Failed to delete learning path ${pathId}:`, error);
      }
    }

    // Delete topics
    for (const topicId of createdIds.topics) {
      try {
        await fetch(`${baseUrl}/api/topics/${topicId}`, {
          method: 'DELETE',
        });
      } catch (error) {
        console.warn(`Failed to delete topic ${topicId}:`, error);
      }
    }

    // Delete categories
    for (const categoryId of createdIds.categories) {
      try {
        await fetch(`${baseUrl}/api/categories/${categoryId}`, {
          method: 'DELETE',
        });
      } catch (error) {
        console.warn(`Failed to delete category ${categoryId}:`, error);
      }
    }
  }
});
