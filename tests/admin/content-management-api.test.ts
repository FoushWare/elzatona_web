/**
 * Content Management API Tests
 *
 * Comprehensive tests for all CRUD operations in the content management system:
 * - Cards API endpoints
 * - Plans API endpoints
 * - Categories API endpoints
 * - Topics API endpoints
 * - Questions API endpoints
 */

import { NextRequest } from 'next/server';

// Mock Firebase Admin
jest.mock('firebase-admin', () => ({
  initializeApp: jest.fn(),
  credential: {
    cert: jest.fn(),
  },
  firestore: jest.fn(() => ({
    collection: jest.fn(() => ({
      doc: jest.fn(() => ({
        get: jest.fn(),
        set: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      })),
      add: jest.fn(),
      where: jest.fn(() => ({
        get: jest.fn(),
      })),
      orderBy: jest.fn(() => ({
        get: jest.fn(),
      })),
    })),
  })),
}));

describe('Content Management API Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Cards API', () => {
    describe('GET /api/cards', () => {
      it('should return all learning cards', async () => {
        // Mock Firebase response
        const mockCards = [
          {
            id: 'core-technologies',
            name: 'Core Technologies',
            description: 'Fundamental web technologies',
            type: 'core-technologies',
            color: 'blue',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: 'framework-questions',
            name: 'Framework Questions',
            description: 'React, Vue, Angular questions',
            type: 'framework-questions',
            color: 'green',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ];

        // Mock Firebase collection query
        const mockFirestore = require('firebase-admin').firestore();
        mockFirestore.collection.mockReturnValue({
          get: jest.fn().mockResolvedValue({
            docs: mockCards.map(card => ({
              id: card.id,
              data: () => card,
            })),
          }),
        });

        // Import and test the API route
        const { GET } = await import('@/app/api/cards/route');
        const request = new NextRequest('http://localhost:3000/api/cards');

        const response = await GET(request);
        const data = await response.json();

        expect(response.status).toBe(200);
        expect(data.success).toBe(true);
        expect(data.data).toHaveLength(2);
        expect(data.data[0]).toMatchObject({
          id: 'core-technologies',
          name: 'Core Technologies',
          type: 'core-technologies',
        });
      });

      it('should handle Firebase errors gracefully', async () => {
        // Mock Firebase error
        const mockFirestore = require('firebase-admin').firestore();
        mockFirestore.collection.mockReturnValue({
          get: jest
            .fn()
            .mockRejectedValue(new Error('Firebase connection failed')),
        });

        const { GET } = await import('@/app/api/cards/route');
        const request = new NextRequest('http://localhost:3000/api/cards');

        const response = await GET(request);
        const data = await response.json();

        expect(response.status).toBe(500);
        expect(data.success).toBe(false);
        expect(data.error).toContain('Failed to fetch cards');
      });
    });

    describe('POST /api/cards', () => {
      it('should create a new learning card', async () => {
        const newCard = {
          name: 'Test Card',
          description: 'Test description',
          type: 'core-technologies',
          color: 'blue',
        };

        // Mock Firebase add operation
        const mockFirestore = require('firebase-admin').firestore();
        const mockDocRef = { id: 'test-card-id' };
        mockFirestore.collection.mockReturnValue({
          add: jest.fn().mockResolvedValue(mockDocRef),
        });

        const { POST } = await import('@/app/api/cards/route');
        const request = new NextRequest('http://localhost:3000/api/cards', {
          method: 'POST',
          body: JSON.stringify(newCard),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const response = await POST(request);
        const data = await response.json();

        expect(response.status).toBe(201);
        expect(data.success).toBe(true);
        expect(data.data.id).toBe('test-card-id');
        expect(data.data.name).toBe('Test Card');
      });

      it('should validate required fields', async () => {
        const invalidCard = {
          description: 'Missing name and type',
        };

        const { POST } = await import('@/app/api/cards/route');
        const request = new NextRequest('http://localhost:3000/api/cards', {
          method: 'POST',
          body: JSON.stringify(invalidCard),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const response = await POST(request);
        const data = await response.json();

        expect(response.status).toBe(400);
        expect(data.success).toBe(false);
        expect(data.error).toContain('validation');
      });
    });

    describe('PUT /api/cards/[id]', () => {
      it('should update an existing learning card', async () => {
        const cardId = 'test-card-id';
        const updateData = {
          name: 'Updated Card Name',
          description: 'Updated description',
        };

        // Mock Firebase update operation
        const mockFirestore = require('firebase-admin').firestore();
        mockFirestore.collection.mockReturnValue({
          doc: jest.fn(() => ({
            update: jest.fn().mockResolvedValue({}),
          })),
        });

        const { PUT } = await import('@/app/api/cards/[id]/route');
        const request = new NextRequest(
          `http://localhost:3000/api/cards/${cardId}`,
          {
            method: 'PUT',
            body: JSON.stringify(updateData),
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        const response = await PUT(request, { params: { id: cardId } });
        const data = await response.json();

        expect(response.status).toBe(200);
        expect(data.success).toBe(true);
        expect(data.message).toContain('updated');
      });
    });

    describe('DELETE /api/cards/[id]', () => {
      it('should delete a learning card', async () => {
        const cardId = 'test-card-id';

        // Mock Firebase delete operation
        const mockFirestore = require('firebase-admin').firestore();
        mockFirestore.collection.mockReturnValue({
          doc: jest.fn(() => ({
            delete: jest.fn().mockResolvedValue({}),
          })),
        });

        const { DELETE } = await import('@/app/api/cards/[id]/route');
        const request = new NextRequest(
          `http://localhost:3000/api/cards/${cardId}`,
          {
            method: 'DELETE',
          }
        );

        const response = await DELETE(request, { params: { id: cardId } });
        const data = await response.json();

        expect(response.status).toBe(200);
        expect(data.success).toBe(true);
        expect(data.message).toContain('deleted');
      });
    });
  });

  describe('Plans API', () => {
    describe('GET /api/plans', () => {
      it('should return all learning plans', async () => {
        const mockPlans = [
          {
            id: 'plan-1-day',
            name: '1 Day Plan',
            description: 'Quick learning plan',
            duration: 1,
            difficulty: 'beginner',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ];

        const mockFirestore = require('firebase-admin').firestore();
        mockFirestore.collection.mockReturnValue({
          get: jest.fn().mockResolvedValue({
            docs: mockPlans.map(plan => ({
              id: plan.id,
              data: () => plan,
            })),
          }),
        });

        const { GET } = await import('@/app/api/plans/route');
        const request = new NextRequest('http://localhost:3000/api/plans');

        const response = await GET(request);
        const data = await response.json();

        expect(response.status).toBe(200);
        expect(data.success).toBe(true);
        expect(data.data).toHaveLength(1);
        expect(data.data[0].name).toBe('1 Day Plan');
      });
    });

    describe('POST /api/plans', () => {
      it('should create a new learning plan', async () => {
        const newPlan = {
          name: 'Test Plan',
          description: 'Test plan description',
          duration: 3,
          difficulty: 'intermediate',
        };

        const mockFirestore = require('firebase-admin').firestore();
        const mockDocRef = { id: 'test-plan-id' };
        mockFirestore.collection.mockReturnValue({
          add: jest.fn().mockResolvedValue(mockDocRef),
        });

        const { POST } = await import('@/app/api/plans/route');
        const request = new NextRequest('http://localhost:3000/api/plans', {
          method: 'POST',
          body: JSON.stringify(newPlan),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const response = await POST(request);
        const data = await response.json();

        expect(response.status).toBe(201);
        expect(data.success).toBe(true);
        expect(data.data.id).toBe('test-plan-id');
      });
    });
  });

  describe('Categories API', () => {
    describe('GET /api/categories', () => {
      it('should return all categories', async () => {
        const mockCategories = [
          {
            id: 'react',
            name: 'React',
            description: 'React framework questions',
            cardType: 'framework-questions',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ];

        const mockFirestore = require('firebase-admin').firestore();
        mockFirestore.collection.mockReturnValue({
          get: jest.fn().mockResolvedValue({
            docs: mockCategories.map(category => ({
              id: category.id,
              data: () => category,
            })),
          }),
        });

        const { GET } = await import('@/app/api/categories/route');
        const request = new NextRequest('http://localhost:3000/api/categories');

        const response = await GET(request);
        const data = await response.json();

        expect(response.status).toBe(200);
        expect(data.success).toBe(true);
        expect(data.data).toHaveLength(1);
        expect(data.data[0].name).toBe('React');
      });
    });

    describe('POST /api/categories', () => {
      it('should create a new category', async () => {
        const newCategory = {
          name: 'Test Category',
          description: 'Test category description',
          cardType: 'core-technologies',
        };

        const mockFirestore = require('firebase-admin').firestore();
        const mockDocRef = { id: 'test-category-id' };
        mockFirestore.collection.mockReturnValue({
          add: jest.fn().mockResolvedValue(mockDocRef),
        });

        const { POST } = await import('@/app/api/categories/route');
        const request = new NextRequest(
          'http://localhost:3000/api/categories',
          {
            method: 'POST',
            body: JSON.stringify(newCategory),
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        const response = await POST(request);
        const data = await response.json();

        expect(response.status).toBe(201);
        expect(data.success).toBe(true);
        expect(data.data.id).toBe('test-category-id');
      });
    });
  });

  describe('Topics API', () => {
    describe('GET /api/topics', () => {
      it('should return all topics', async () => {
        const mockTopics = [
          {
            id: 'react-hooks',
            name: 'React Hooks',
            description: 'useState, useEffect, etc.',
            categoryId: 'react',
            difficulty: 'intermediate',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ];

        const mockFirestore = require('firebase-admin').firestore();
        mockFirestore.collection.mockReturnValue({
          get: jest.fn().mockResolvedValue({
            docs: mockTopics.map(topic => ({
              id: topic.id,
              data: () => topic,
            })),
          }),
        });

        const { GET } = await import('@/app/api/topics/route');
        const request = new NextRequest('http://localhost:3000/api/topics');

        const response = await GET(request);
        const data = await response.json();

        expect(response.status).toBe(200);
        expect(data.success).toBe(true);
        expect(data.data).toHaveLength(1);
        expect(data.data[0].name).toBe('React Hooks');
      });
    });

    describe('POST /api/topics', () => {
      it('should create a new topic', async () => {
        const newTopic = {
          name: 'Test Topic',
          description: 'Test topic description',
          categoryId: 'react',
          difficulty: 'beginner',
        };

        const mockFirestore = require('firebase-admin').firestore();
        const mockDocRef = { id: 'test-topic-id' };
        mockFirestore.collection.mockReturnValue({
          add: jest.fn().mockResolvedValue(mockDocRef),
        });

        const { POST } = await import('@/app/api/topics/route');
        const request = new NextRequest('http://localhost:3000/api/topics', {
          method: 'POST',
          body: JSON.stringify(newTopic),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const response = await POST(request);
        const data = await response.json();

        expect(response.status).toBe(201);
        expect(data.success).toBe(true);
        expect(data.data.id).toBe('test-topic-id');
      });
    });
  });

  describe('Questions API', () => {
    describe('GET /api/questions', () => {
      it('should return all questions with pagination', async () => {
        const mockQuestions = [
          {
            id: 'question-1',
            question: 'What is React?',
            type: 'multiple-choice',
            difficulty: 'beginner',
            category: 'react',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ];

        const mockFirestore = require('firebase-admin').firestore();
        mockFirestore.collection.mockReturnValue({
          get: jest.fn().mockResolvedValue({
            docs: mockQuestions.map(question => ({
              id: question.id,
              data: () => question,
            })),
          }),
        });

        const { GET } = await import('@/app/api/questions/route');
        const request = new NextRequest(
          'http://localhost:3000/api/questions?page=1&limit=10'
        );

        const response = await GET(request);
        const data = await response.json();

        expect(response.status).toBe(200);
        expect(data.success).toBe(true);
        expect(data.data).toHaveLength(1);
        expect(data.data[0].question).toBe('What is React?');
      });
    });

    describe('POST /api/questions', () => {
      it('should create a new question', async () => {
        const newQuestion = {
          question: 'What is JavaScript?',
          type: 'multiple-choice',
          difficulty: 'beginner',
          category: 'javascript',
          options: ['Programming language', 'Database', 'Framework'],
          correctAnswer: 0,
        };

        const mockFirestore = require('firebase-admin').firestore();
        const mockDocRef = { id: 'test-question-id' };
        mockFirestore.collection.mockReturnValue({
          add: jest.fn().mockResolvedValue(mockDocRef),
        });

        const { POST } = await import('@/app/api/questions/route');
        const request = new NextRequest('http://localhost:3000/api/questions', {
          method: 'POST',
          body: JSON.stringify(newQuestion),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const response = await POST(request);
        const data = await response.json();

        expect(response.status).toBe(201);
        expect(data.success).toBe(true);
        expect(data.data.id).toBe('test-question-id');
      });
    });
  });
});
