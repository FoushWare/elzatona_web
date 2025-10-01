/**
 * API Integration Tests for Auto-linking System
 * Tests the complete API flow for questions, sections, and guided learning
 */

const {
  describe,
  test,
  expect,
  beforeAll,
  afterAll,
  beforeEach,
} = require('@jest/globals');
const request = require('supertest');

// Mock Next.js app for testing
const createMockApp = () => {
  const express = require('express');
  const app = express();

  app.use(express.json());

  // Mock API routes
  app.post('/api/admin/questions', async (req, res) => {
    const { title, content, category, learningPath, type, difficulty } =
      req.body;

    // Simulate question creation with auto-linking
    const questionId = `question_${Date.now()}`;

    // Mock auto-linking to sections
    const mockSections = [
      { id: 'section1', category: 'JavaScript', learningPathId: 'frontend' },
      { id: 'section2', category: 'React', learningPathId: 'frontend' },
    ];

    const matchingSections = mockSections.filter(
      section =>
        section.category === category && section.learningPathId === learningPath
    );

    res.json({
      success: true,
      questionId,
      autoLinkedSections: matchingSections.map(s => s.id),
      message: `Question created and auto-linked to ${matchingSections.length} sections`,
    });
  });

  app.get('/api/admin/sections', async (req, res) => {
    const { sectionId, getQuestions } = req.query;

    if (sectionId && getQuestions === 'true') {
      // Mock getting questions for a specific section
      const mockQuestions = [
        {
          id: 'question1',
          title: 'JavaScript Question 1',
          category: 'JavaScript',
          learningPath: 'frontend',
        },
        {
          id: 'question2',
          title: 'JavaScript Question 2',
          category: 'JavaScript',
          learningPath: 'frontend',
        },
      ];

      res.json({
        success: true,
        data: mockQuestions,
        count: mockQuestions.length,
      });
    } else {
      // Mock getting all sections
      const mockSections = [
        {
          id: 'section1',
          title: 'JavaScript Fundamentals',
          category: 'JavaScript',
          learningPathId: 'frontend',
          questions: ['question1', 'question2'],
        },
        {
          id: 'section2',
          title: 'React Fundamentals',
          category: 'React',
          learningPathId: 'frontend',
          questions: [],
        },
      ];

      res.json({
        success: true,
        data: mockSections,
        count: mockSections.length,
      });
    }
  });

  app.get('/api/guided-learning/plans', async (req, res) => {
    const { getSections, category, learningPath } = req.query;

    if (getSections) {
      // Mock getting filtered sections for plan creation
      const mockSections = [
        {
          id: 'section1',
          title: 'JavaScript Fundamentals',
          category: 'JavaScript',
          learningPathId: 'frontend',
          order: 1,
          weight: 25,
        },
        {
          id: 'section2',
          title: 'React Fundamentals',
          category: 'React',
          learningPathId: 'frontend',
          order: 2,
          weight: 25,
        },
      ];

      let filteredSections = mockSections;

      if (category) {
        filteredSections = filteredSections.filter(
          s => s.category === category
        );
      }

      if (learningPath) {
        filteredSections = filteredSections.filter(
          s => s.learningPathId === learningPath
        );
      }

      res.json({
        success: true,
        data: filteredSections,
        count: filteredSections.length,
      });
    } else {
      // Mock getting all learning plans
      const mockPlans = [
        {
          id: 'plan1',
          title: '1-Day Frontend Quick Start',
          difficulty: 'beginner',
          totalQuestions: 10,
          sections: [
            { sectionId: 'section1', order: 1, weight: 50 },
            { sectionId: 'section2', order: 2, weight: 50 },
          ],
        },
      ];

      res.json({
        success: true,
        plans: mockPlans,
      });
    }
  });

  app.put('/api/guided-learning/plans/:planId', async (req, res) => {
    const { planId } = req.params;
    const { sections, totalQuestions, dailyQuestions } = req.body;

    // Mock updating a learning plan
    res.json({
      success: true,
      planId,
      message: 'Plan updated successfully',
      updatedSections: sections.length,
      totalQuestions,
      dailyQuestions,
    });
  });

  app.post('/api/guided-learning/plans', async (req, res) => {
    const { title, description, sections, difficulty } = req.body;

    // Mock creating a new learning plan
    const planId = `plan_${Date.now()}`;

    res.json({
      success: true,
      planId,
      message: 'Plan created successfully',
      title,
      sections: sections.length,
    });
  });

  return app;
};

describe('API Integration Tests for Auto-linking System', () => {
  let app;

  beforeAll(() => {
    app = createMockApp();
  });

  describe('Question Creation API', () => {
    test('should create question and return auto-linking information', async () => {
      const questionData = {
        title: 'JavaScript Fundamentals Test',
        content: 'What is the output of typeof null?',
        category: 'JavaScript',
        learningPath: 'frontend',
        type: 'single',
        difficulty: 'medium',
      };

      const response = await request(app)
        .post('/api/admin/questions')
        .send(questionData)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.questionId).toBeDefined();
      expect(response.body.autoLinkedSections).toContain('section1');
      expect(response.body.message).toContain('auto-linked to 1 sections');
    });

    test('should not auto-link question with non-matching category', async () => {
      const questionData = {
        title: 'Python Test Question',
        content: 'What is Python?',
        category: 'Python',
        learningPath: 'backend',
        type: 'single',
        difficulty: 'easy',
      };

      const response = await request(app)
        .post('/api/admin/questions')
        .send(questionData)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.autoLinkedSections).toHaveLength(0);
      expect(response.body.message).toContain('auto-linked to 0 sections');
    });
  });

  describe('Sections API', () => {
    test('should get all sections', async () => {
      const response = await request(app)
        .get('/api/admin/sections')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveLength(2);
      expect(response.body.data[0].title).toBe('JavaScript Fundamentals');
      expect(response.body.data[1].title).toBe('React Fundamentals');
    });

    test('should get questions for specific section', async () => {
      const response = await request(app)
        .get('/api/admin/sections?sectionId=section1&getQuestions=true')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveLength(2);
      expect(response.body.data[0].category).toBe('JavaScript');
      expect(response.body.data[1].category).toBe('JavaScript');
    });

    test('should return empty array for section with no questions', async () => {
      const response = await request(app)
        .get('/api/admin/sections?sectionId=section2&getQuestions=true')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveLength(0);
    });
  });

  describe('Guided Learning Plans API', () => {
    test('should get all learning plans', async () => {
      const response = await request(app)
        .get('/api/guided-learning/plans')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.plans).toHaveLength(1);
      expect(response.body.plans[0].title).toBe('1-Day Frontend Quick Start');
    });

    test('should get filtered sections for plan creation', async () => {
      const response = await request(app)
        .get('/api/guided-learning/plans?getSections=true')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveLength(2);
      expect(response.body.data[0].category).toBe('JavaScript');
      expect(response.body.data[1].category).toBe('React');
    });

    test('should filter sections by category', async () => {
      const response = await request(app)
        .get('/api/guided-learning/plans?getSections=true&category=JavaScript')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0].category).toBe('JavaScript');
    });

    test('should filter sections by learning path', async () => {
      const response = await request(app)
        .get(
          '/api/guided-learning/plans?getSections=true&learningPath=frontend'
        )
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveLength(2);
      expect(
        response.body.data.every(s => s.learningPathId === 'frontend')
      ).toBe(true);
    });

    test('should filter sections by both category and learning path', async () => {
      const response = await request(app)
        .get(
          '/api/guided-learning/plans?getSections=true&category=JavaScript&learningPath=frontend'
        )
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0].category).toBe('JavaScript');
      expect(response.body.data[0].learningPathId).toBe('frontend');
    });
  });

  describe('Learning Plan Management API', () => {
    test('should update existing learning plan', async () => {
      const updateData = {
        sections: [
          { sectionId: 'section1', order: 1, weight: 50 },
          { sectionId: 'section2', order: 2, weight: 50 },
        ],
        totalQuestions: 20,
        dailyQuestions: 20,
      };

      const response = await request(app)
        .put('/api/guided-learning/plans/plan1')
        .send(updateData)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.planId).toBe('plan1');
      expect(response.body.updatedSections).toBe(2);
      expect(response.body.totalQuestions).toBe(20);
    });

    test('should create new learning plan', async () => {
      const planData = {
        title: '2-Day Frontend Fundamentals',
        description: 'Comprehensive frontend development course',
        difficulty: 'intermediate',
        sections: [
          { sectionId: 'section1', order: 1, weight: 40 },
          { sectionId: 'section2', order: 2, weight: 60 },
        ],
      };

      const response = await request(app)
        .post('/api/guided-learning/plans')
        .send(planData)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.planId).toBeDefined();
      expect(response.body.title).toBe('2-Day Frontend Fundamentals');
      expect(response.body.sections).toBe(2);
    });
  });

  describe('Error Handling', () => {
    test('should handle invalid question data', async () => {
      const invalidData = {
        title: '', // Empty title
        category: 'JavaScript',
        // Missing required fields
      };

      const response = await request(app)
        .post('/api/admin/questions')
        .send(invalidData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBeDefined();
    });

    test('should handle non-existent section', async () => {
      const response = await request(app)
        .get('/api/admin/sections?sectionId=nonexistent&getQuestions=true')
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBeDefined();
    });

    test('should handle invalid plan update', async () => {
      const invalidData = {
        sections: [], // Empty sections
      };

      const response = await request(app)
        .put('/api/guided-learning/plans/invalid')
        .send(invalidData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBeDefined();
    });
  });

  describe('Integration Flow Tests', () => {
    test('should complete full workflow: create question -> auto-link -> add to plan', async () => {
      // Step 1: Create a question
      const questionResponse = await request(app)
        .post('/api/admin/questions')
        .send({
          title: 'Integration Test Question',
          content: 'Test question content',
          category: 'JavaScript',
          learningPath: 'frontend',
          type: 'single',
          difficulty: 'medium',
        })
        .expect(200);

      expect(questionResponse.body.success).toBe(true);
      expect(questionResponse.body.autoLinkedSections).toContain('section1');

      // Step 2: Get sections with questions
      const sectionsResponse = await request(app)
        .get('/api/admin/sections?sectionId=section1&getQuestions=true')
        .expect(200);

      expect(sectionsResponse.body.success).toBe(true);
      expect(sectionsResponse.body.data.length).toBeGreaterThan(0);

      // Step 3: Create a learning plan with the section
      const planResponse = await request(app)
        .post('/api/guided-learning/plans')
        .send({
          title: 'Integration Test Plan',
          description: 'Test plan for integration',
          difficulty: 'beginner',
          sections: [{ sectionId: 'section1', order: 1, weight: 100 }],
        })
        .expect(200);

      expect(planResponse.body.success).toBe(true);
      expect(planResponse.body.sections).toBe(1);

      // Step 4: Update the plan with more details
      const updateResponse = await request(app)
        .put(`/api/guided-learning/plans/${planResponse.body.planId}`)
        .send({
          sections: [{ sectionId: 'section1', order: 1, weight: 100 }],
          totalQuestions: sectionsResponse.body.count,
          dailyQuestions: sectionsResponse.body.count,
        })
        .expect(200);

      expect(updateResponse.body.success).toBe(true);
      expect(updateResponse.body.totalQuestions).toBe(
        sectionsResponse.body.count
      );
    });
  });
});
