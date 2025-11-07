/**
 * Frontend Tasks & Problem Solving API Tests
 *
 * Comprehensive tests for CRUD operations in:
 * - Frontend Tasks API endpoints
 * - Problem Solving API endpoints
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
      order: jest.fn(),
    })),
  })),
}));

describe('Frontend Tasks & Problem Solving API Tests', () => {
  const { createClient } = require('@supabase/supabase-js');
  let mockSupabaseClient: any;

  beforeEach(() => {
    jest.clearAllMocks();
    mockSupabaseClient = createClient();
    mockSupabaseClient.from.mockClear();
  });

  describe('Frontend Tasks API', () => {
    describe('GET /api/frontend-tasks', () => {
      it('should return all frontend tasks', async () => {
        const mockTasks = [
          {
            id: 'task-1',
            title: 'Build a Todo App',
            description: 'Create a React todo application',
            difficulty: 'easy',
            category: 'react',
            estimatedTime: 120,
            starterCode: 'const App = () => { return <div>Todo App</div>; };',
            testCases: [
              {
                input: 'Add task "Learn React"',
                expectedOutput: 'Task added successfully',
              },
            ],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ];

        const mockOrder = jest.fn().mockResolvedValue({
          data: mockTasks,
          error: null,
        });

        const mockSelect = jest.fn().mockReturnValue({
          order: mockOrder,
        });

        mockSupabaseClient.from.mockReturnValue({
          select: mockSelect,
        });

        const { GET } = await import('@/app/api/admin/frontend-tasks/route');
        const request = new NextRequest(
          'http://localhost:3000/api/admin/frontend-tasks'
        );

        const response = await GET(request);
        const data = await response.json();

        expect(response.status).toBe(200);
        expect(data.success).toBe(true);
        expect(data.data).toHaveLength(1);
        expect(data.data[0].title).toBe('Build a Todo App');
        expect(data.data[0].difficulty).toBe('easy');
      });

      it('should filter tasks by difficulty', async () => {
        const mockTasks = [
          {
            id: 'task-1',
            title: 'Easy Task',
            difficulty: 'easy',
            category: 'react',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ];

        const mockOrder = jest.fn().mockResolvedValue({
          data: mockTasks,
          error: null,
        });

        const mockEq = jest.fn().mockReturnValue({
          order: mockOrder,
        });

        const mockSelect = jest.fn().mockReturnValue({
          eq: mockEq,
        });

        mockSupabaseClient.from.mockReturnValue({
          select: mockSelect,
        });

        const { GET } = await import('@/app/api/admin/frontend-tasks/route');
        const request = new NextRequest(
          'http://localhost:3000/api/admin/frontend-tasks?difficulty=easy'
        );

        const response = await GET(request);
        const data = await response.json();

        expect(response.status).toBe(200);
        expect(data.success).toBe(true);
        expect(data.data).toHaveLength(1);
        expect(data.data[0].difficulty).toBe('easy');
      });
    });

    describe('POST /api/frontend-tasks', () => {
      it('should create a new frontend task', async () => {
        const newTask = {
          title: 'Build a Calculator',
          description: 'Create a calculator app with React',
          difficulty: 'medium',
          category: 'react',
          estimatedTime: 180,
          starterCode:
            'const Calculator = () => { return <div>Calculator</div>; };',
          testCases: [
            {
              input: '2 + 2',
              expectedOutput: '4',
            },
          ],
        };

        const mockSingle = jest.fn().mockResolvedValue({
          data: { id: 'test-task-id', ...newTask },
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

        const { POST } = await import('@/app/api/admin/frontend-tasks/route');
        const request = new NextRequest(
          'http://localhost:3000/api/admin/frontend-tasks',
          {
            method: 'POST',
            body: JSON.stringify(newTask),
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        const response = await POST(request);
        const data = await response.json();

        expect(response.status).toBe(201);
        expect(data.success).toBe(true);
        expect(data.data.id).toBe('test-task-id');
        expect(data.data.title).toBe('Build a Calculator');
      });

      it('should validate required fields for frontend tasks', async () => {
        const invalidTask = {
          description: 'Missing title and difficulty',
        };

        const { POST } = await import('@/app/api/admin/frontend-tasks/route');
        const request = new NextRequest(
          'http://localhost:3000/api/admin/frontend-tasks',
          {
            method: 'POST',
            body: JSON.stringify(invalidTask),
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        const response = await POST(request);
        const data = await response.json();

        expect(response.status).toBe(400);
        expect(data.success).toBe(false);
        expect(data.error).toBeDefined();
      });
    });

    describe('PUT /api/admin/frontend-tasks/[id]', () => {
      it('should update an existing frontend task', async () => {
        const taskId = 'test-task-id';
        const updateData = {
          title: 'Updated Task Title',
          description: 'Updated description',
          estimatedTime: 240,
        };

        const mockSingle = jest.fn().mockResolvedValue({
          data: { id: taskId, ...updateData },
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

        const { PUT } = await import(
          '@/app/api/admin/frontend-tasks/[id]/route'
        );
        const request = new NextRequest(
          `http://localhost:3000/api/admin/frontend-tasks/${taskId}`,
          {
            method: 'PUT',
            body: JSON.stringify(updateData),
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        const response = await PUT(request, { params: { id: taskId } });
        const data = await response.json();

        expect(response.status).toBe(200);
        expect(data.success).toBe(true);
      });
    });

    describe('DELETE /api/admin/frontend-tasks/[id]', () => {
      it('should delete a frontend task', async () => {
        const taskId = 'test-task-id';

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

        const { DELETE } = await import(
          '@/app/api/admin/frontend-tasks/[id]/route'
        );
        const request = new NextRequest(
          `http://localhost:3000/api/admin/frontend-tasks/${taskId}`,
          {
            method: 'DELETE',
          }
        );

        const response = await DELETE(request, { params: { id: taskId } });
        const data = await response.json();

        expect(response.status).toBe(200);
        expect(data.success).toBe(true);
      });
    });
  });

  describe('Problem Solving API', () => {
    describe('GET /api/admin/problem-solving', () => {
      it('should return all problem solving tasks', async () => {
        const mockProblems = [
          {
            id: 'problem-1',
            title: 'Two Sum',
            description: 'Find two numbers that add up to target',
            difficulty: 'easy',
            category: 'arrays',
            testCases: [
              {
                input: '[2,7,11,15], 9',
                expectedOutput: '[0,1]',
              },
            ],
            hints: ['Use a hash map to store complements'],
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ];

        const mockOrder = jest.fn().mockResolvedValue({
          data: mockProblems,
          error: null,
        });

        const mockSelect = jest.fn().mockReturnValue({
          order: mockOrder,
        });

        mockSupabaseClient.from.mockReturnValue({
          select: mockSelect,
        });

        const { GET } = await import('@/app/api/admin/problem-solving/route');
        const request = new NextRequest(
          'http://localhost:3000/api/admin/problem-solving'
        );

        const response = await GET(request);
        const data = await response.json();

        expect(response.status).toBe(200);
        expect(data.success).toBe(true);
        expect(data.data).toHaveLength(1);
        expect(data.data[0].title).toBe('Two Sum');
        expect(data.data[0].difficulty).toBe('easy');
      });

      it('should filter problems by category', async () => {
        const mockProblems = [
          {
            id: 'problem-1',
            title: 'Array Problem',
            category: 'arrays',
            difficulty: 'easy',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ];

        const mockOrder = jest.fn().mockResolvedValue({
          data: mockProblems,
          error: null,
        });

        const mockEq = jest.fn().mockReturnValue({
          order: mockOrder,
        });

        const mockSelect = jest.fn().mockReturnValue({
          eq: mockEq,
        });

        mockSupabaseClient.from.mockReturnValue({
          select: mockSelect,
        });

        const { GET } = await import('@/app/api/admin/problem-solving/route');
        const request = new NextRequest(
          'http://localhost:3000/api/admin/problem-solving?category=arrays'
        );

        const response = await GET(request);
        const data = await response.json();

        expect(response.status).toBe(200);
        expect(data.success).toBe(true);
        expect(data.data).toHaveLength(1);
        expect(data.data[0].category).toBe('arrays');
      });
    });

    describe('POST /api/admin/problem-solving', () => {
      it('should create a new problem solving task', async () => {
        const newProblem = {
          title: 'Reverse String',
          description: 'Reverse a given string',
          difficulty: 'easy',
          category: 'strings',
          testCases: [
            {
              input: '"hello"',
              expectedOutput: '"olleh"',
            },
          ],
          hints: ['Use two pointers'],
        };

        const mockSingle = jest.fn().mockResolvedValue({
          data: { id: 'test-problem-id', ...newProblem },
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

        const { POST } = await import('@/app/api/admin/problem-solving/route');
        const request = new NextRequest(
          'http://localhost:3000/api/admin/problem-solving',
          {
            method: 'POST',
            body: JSON.stringify(newProblem),
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        const response = await POST(request);
        const data = await response.json();

        expect(response.status).toBe(201);
        expect(data.success).toBe(true);
        expect(data.data.id).toBe('test-problem-id');
        expect(data.data.title).toBe('Reverse String');
      });

      it('should validate required fields for problem solving tasks', async () => {
        const invalidProblem = {
          description: 'Missing title and difficulty',
        };

        const { POST } = await import('@/app/api/admin/problem-solving/route');
        const request = new NextRequest(
          'http://localhost:3000/api/admin/problem-solving',
          {
            method: 'POST',
            body: JSON.stringify(invalidProblem),
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        const response = await POST(request);
        const data = await response.json();

        expect(response.status).toBe(400);
        expect(data.success).toBe(false);
        expect(data.error).toBeDefined();
      });
    });

    describe('PUT /api/admin/problem-solving/[id]', () => {
      it('should update an existing problem solving task', async () => {
        const problemId = 'test-problem-id';
        const updateData = {
          title: 'Updated Problem Title',
          description: 'Updated description',
          hints: ['Updated hint'],
        };

        const mockSingle = jest.fn().mockResolvedValue({
          data: { id: problemId, ...updateData },
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

        const { PUT } = await import(
          '@/app/api/admin/problem-solving/[id]/route'
        );
        const request = new NextRequest(
          `http://localhost:3000/api/admin/problem-solving/${problemId}`,
          {
            method: 'PUT',
            body: JSON.stringify(updateData),
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        const response = await PUT(request, { params: { id: problemId } });
        const data = await response.json();

        expect(response.status).toBe(200);
        expect(data.success).toBe(true);
      });
    });

    describe('DELETE /api/admin/problem-solving/[id]', () => {
      it('should delete a problem solving task', async () => {
        const problemId = 'test-problem-id';

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

        const { DELETE } = await import(
          '@/app/api/admin/problem-solving/[id]/route'
        );
        const request = new NextRequest(
          `http://localhost:3000/api/admin/problem-solving/${problemId}`,
          {
            method: 'DELETE',
          }
        );

        const response = await DELETE(request, { params: { id: problemId } });
        const data = await response.json();

        expect(response.status).toBe(200);
        expect(data.success).toBe(true);
      });
    });
  });

  describe('Error Handling', () => {
    it('should handle Supabase connection errors gracefully', async () => {
      const mockOrder = jest
        .fn()
        .mockRejectedValue(new Error('Supabase connection failed'));

      const mockSelect = jest.fn().mockReturnValue({
        order: mockOrder,
      });

      mockSupabaseClient.from.mockReturnValue({
        select: mockSelect,
      });

      const { GET } = await import('@/app/api/admin/frontend-tasks/route');
      const request = new NextRequest(
        'http://localhost:3000/api/admin/frontend-tasks'
      );

      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.success).toBe(false);
      expect(data.error).toBeDefined();
    });

    it('should handle invalid JSON in request body', async () => {
      const { POST } = await import('@/app/api/admin/frontend-tasks/route');
      const request = new NextRequest(
        'http://localhost:3000/api/admin/frontend-tasks',
        {
          method: 'POST',
          body: 'invalid json',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toBeDefined();
    });

    it('should handle missing Content-Type header', async () => {
      const { POST } = await import('@/app/api/admin/frontend-tasks/route');
      const request = new NextRequest(
        'http://localhost:3000/api/admin/frontend-tasks',
        {
          method: 'POST',
          body: JSON.stringify({ title: 'Test Task' }),
        }
      );

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toBeDefined();
    });
  });
});
