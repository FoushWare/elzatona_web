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

// Set up environment variables
process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co';
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-anon-key';
process.env.SUPABASE_SERVICE_ROLE_KEY = 'test-service-role-key';

// Mock Supabase instead of Firebase
jest.mock('@supabase/supabase-js', () => ({
  createClient: jest.fn(() => ({
    from: jest.fn(() => ({
      select: jest.fn(),
      insert: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      eq: jest.fn(),
      single: jest.fn(),
      orderBy: jest.fn(),
    })),
  })),
}));

describe('Content Management API Tests', () => {
  const { createClient } = require('@supabase/supabase-js');
  let mockSupabaseClient: any;

  beforeEach(() => {
    jest.clearAllMocks();
    mockSupabaseClient = createClient();
    mockSupabaseClient.from.mockClear();
  });

  describe('Cards API', () => {
    describe('GET /api/cards', () => {
      it('should return all learning cards', async () => {
        // Mock Supabase response
        const mockCards = [
          {
            id: 'core-technologies',
            name: 'Core Technologies',
            description: 'Fundamental web technologies',
            type: 'core-technologies',
            color: 'blue',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          {
            id: 'framework-questions',
            name: 'Framework Questions',
            description: 'React, Vue, Angular questions',
            type: 'framework-questions',
            color: 'green',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ];

        // Mock Supabase query
        const mockOrderBy = jest.fn().mockResolvedValue({
          data: mockCards,
          error: null,
        });

        const mockSelect = jest.fn().mockReturnValue({
          orderBy: mockOrderBy,
        });

        mockSupabaseClient.from.mockReturnValue({
          select: mockSelect,
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

      it('should handle Supabase errors gracefully', async () => {
        // Mock Supabase error
        const mockOrderBy = jest
          .fn()
          .mockRejectedValue(new Error('Supabase connection failed'));

        const mockSelect = jest.fn().mockReturnValue({
          orderBy: mockOrderBy,
        });

        mockSupabaseClient.from.mockReturnValue({
          select: mockSelect,
        });

        const { GET } = await import('@/app/api/cards/route');
        const request = new NextRequest('http://localhost:3000/api/cards');

        const response = await GET(request);
        const data = await response.json();

        expect(response.status).toBe(500);
        expect(data.success).toBe(false);
        expect(data.error).toBeDefined();
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

        // Mock Supabase insert operation
        const mockSingle = jest.fn().mockResolvedValue({
          data: { id: 'test-card-id', ...newCard },
          error: null,
        });

        const mockInsert = jest.fn().mockReturnValue({
          select: jest.fn().mockReturnValue({
            single: mockSingle,
          }),
        });

        mockSupabaseClient.from.mockReturnValue({
          insert: mockInsert,
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
        expect(data.error).toBeDefined();
      });
    });

    describe('PUT /api/cards/[id]', () => {
      it('should update an existing learning card', async () => {
        const cardId = 'test-card-id';
        const updateData = {
          name: 'Updated Card Name',
          description: 'Updated description',
        };

        // Mock Supabase update operation
        const mockSingle = jest.fn().mockResolvedValue({
          data: { id: cardId, ...updateData },
          error: null,
        });

        const mockEq = jest.fn().mockReturnValue({
          select: jest.fn().mockReturnValue({
            single: mockSingle,
          }),
        });

        const mockUpdate = jest.fn().mockReturnValue({
          eq: mockEq,
        });

        mockSupabaseClient.from.mockReturnValue({
          update: mockUpdate,
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
      });
    });

    describe('DELETE /api/cards/[id]', () => {
      it('should delete a learning card', async () => {
        const cardId = 'test-card-id';

        // Mock Supabase delete operation
        const mockEq = jest.fn().mockResolvedValue({
          data: null,
          error: null,
        });

        const mockDelete = jest.fn().mockReturnValue({
          eq: mockEq,
        });

        mockSupabaseClient.from.mockReturnValue({
          delete: mockDelete,
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
            duration_days: 1,
            difficulty: 'beginner',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ];

        const mockOrderBy = jest.fn().mockResolvedValue({
          data: mockPlans,
          error: null,
        });

        const mockSelect = jest.fn().mockReturnValue({
          orderBy: mockOrderBy,
        });

        mockSupabaseClient.from.mockReturnValue({
          select: mockSelect,
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
          duration_days: 3,
          difficulty: 'intermediate',
        };

        const mockSingle = jest.fn().mockResolvedValue({
          data: { id: 'test-plan-id', ...newPlan },
          error: null,
        });

        const mockInsert = jest.fn().mockReturnValue({
          select: jest.fn().mockReturnValue({
            single: mockSingle,
          }),
        });

        mockSupabaseClient.from.mockReturnValue({
          insert: mockInsert,
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
            card_type: 'framework-questions',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ];

        const mockOrderBy = jest.fn().mockResolvedValue({
          data: mockCategories,
          error: null,
        });

        const mockSelect = jest.fn().mockReturnValue({
          orderBy: mockOrderBy,
        });

        mockSupabaseClient.from.mockReturnValue({
          select: mockSelect,
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
          card_type: 'core-technologies',
        };

        const mockSingle = jest.fn().mockResolvedValue({
          data: { id: 'test-category-id', ...newCategory },
          error: null,
        });

        const mockInsert = jest.fn().mockReturnValue({
          select: jest.fn().mockReturnValue({
            single: mockSingle,
          }),
        });

        mockSupabaseClient.from.mockReturnValue({
          insert: mockInsert,
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
            category_id: 'react',
            difficulty: 'intermediate',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ];

        const mockOrderBy = jest.fn().mockResolvedValue({
          data: mockTopics,
          error: null,
        });

        const mockSelect = jest.fn().mockReturnValue({
          orderBy: mockOrderBy,
        });

        mockSupabaseClient.from.mockReturnValue({
          select: mockSelect,
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
          category_id: 'react',
          difficulty: 'beginner',
        };

        const mockSingle = jest.fn().mockResolvedValue({
          data: { id: 'test-topic-id', ...newTopic },
          error: null,
        });

        const mockInsert = jest.fn().mockReturnValue({
          select: jest.fn().mockReturnValue({
            single: mockSingle,
          }),
        });

        mockSupabaseClient.from.mockReturnValue({
          insert: mockInsert,
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
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ];

        const mockOrderBy = jest.fn().mockResolvedValue({
          data: mockQuestions,
          error: null,
        });

        const mockSelect = jest.fn().mockReturnValue({
          orderBy: mockOrderBy,
        });

        mockSupabaseClient.from.mockReturnValue({
          select: mockSelect,
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
          correct_answer: 0,
        };

        const mockSingle = jest.fn().mockResolvedValue({
          data: { id: 'test-question-id', ...newQuestion },
          error: null,
        });

        const mockInsert = jest.fn().mockReturnValue({
          select: jest.fn().mockReturnValue({
            single: mockSingle,
          }),
        });

        mockSupabaseClient.from.mockReturnValue({
          insert: mockInsert,
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
