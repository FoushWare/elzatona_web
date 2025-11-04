/**
 * Frontend Tasks & Problem Solving API Tests
 *
 * Comprehensive tests for CRUD operations in:
 * - Frontend Tasks API endpoints
 * - Problem Solving API endpoints
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

describe('Frontend Tasks & Problem Solving API Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
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
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ];

        const mockFirestore = require('firebase-admin').firestore();
        mockFirestore.collection.mockReturnValue({
          get: jest.fn().mockResolvedValue({
            docs: mockTasks.map(task => ({
              id: task.id,
              data: () => task,
            })),
          }),
        });

        const { GET } = await import('@/app/api/frontend-tasks/route');
        const request = new NextRequest(
          'http://localhost:3000/api/frontend-tasks'
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
          },
          {
            id: 'task-2',
            title: 'Hard Task',
            difficulty: 'hard',
            category: 'react',
          },
        ];

        const mockFirestore = require('firebase-admin').firestore();
        mockFirestore.collection.mockReturnValue({
          where: jest.fn(() => ({
            get: jest.fn().mockResolvedValue({
              docs: mockTasks
                .filter(task => task.difficulty === 'easy')
                .map(task => ({
                  id: task.id,
                  data: () => task,
                })),
            }),
          })),
        });

        const { GET } = await import('@/app/api/frontend-tasks/route');
        const request = new NextRequest(
          'http://localhost:3000/api/frontend-tasks?difficulty=easy'
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

        const mockFirestore = require('firebase-admin').firestore();
        const mockDocRef = { id: 'test-task-id' };
        mockFirestore.collection.mockReturnValue({
          add: jest.fn().mockResolvedValue(mockDocRef),
        });

        const { POST } = await import('@/app/api/frontend-tasks/route');
        const request = new NextRequest(
          'http://localhost:3000/api/frontend-tasks',
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

        const { POST } = await import('@/app/api/frontend-tasks/route');
        const request = new NextRequest(
          'http://localhost:3000/api/frontend-tasks',
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
        expect(data.error).toContain('validation');
      });
    });

    describe('PUT /api/frontend-tasks/[id]', () => {
      it('should update an existing frontend task', async () => {
        const taskId = 'test-task-id';
        const updateData = {
          title: 'Updated Task Title',
          description: 'Updated description',
          estimatedTime: 240,
        };

        const mockFirestore = require('firebase-admin').firestore();
        mockFirestore.collection.mockReturnValue({
          doc: jest.fn(() => ({
            update: jest.fn().mockResolvedValue({}),
          })),
        });

        const { PUT } = await import('@/app/api/frontend-tasks/[id]/route');
        const request = new NextRequest(
          `http://localhost:3000/api/frontend-tasks/${taskId}`,
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
        expect(data.message).toContain('updated');
      });
    });

    describe('DELETE /api/frontend-tasks/[id]', () => {
      it('should delete a frontend task', async () => {
        const taskId = 'test-task-id';

        const mockFirestore = require('firebase-admin').firestore();
        mockFirestore.collection.mockReturnValue({
          doc: jest.fn(() => ({
            delete: jest.fn().mockResolvedValue({}),
          })),
        });

        const { DELETE } = await import('@/app/api/frontend-tasks/[id]/route');
        const request = new NextRequest(
          `http://localhost:3000/api/frontend-tasks/${taskId}`,
          {
            method: 'DELETE',
          }
        );

        const response = await DELETE(request, { params: { id: taskId } });
        const data = await response.json();

        expect(response.status).toBe(200);
        expect(data.success).toBe(true);
        expect(data.message).toContain('deleted');
      });
    });
  });

  describe('Problem Solving API', () => {
    describe('GET /api/problem-solving', () => {
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
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ];

        const mockFirestore = require('firebase-admin').firestore();
        mockFirestore.collection.mockReturnValue({
          get: jest.fn().mockResolvedValue({
            docs: mockProblems.map(problem => ({
              id: problem.id,
              data: () => problem,
            })),
          }),
        });

        const { GET } = await import('@/app/api/problem-solving/route');
        const request = new NextRequest(
          'http://localhost:3000/api/problem-solving'
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
          },
          {
            id: 'problem-2',
            title: 'String Problem',
            category: 'strings',
            difficulty: 'medium',
          },
        ];

        const mockFirestore = require('firebase-admin').firestore();
        mockFirestore.collection.mockReturnValue({
          where: jest.fn(() => ({
            get: jest.fn().mockResolvedValue({
              docs: mockProblems
                .filter(problem => problem.category === 'arrays')
                .map(problem => ({
                  id: problem.id,
                  data: () => problem,
                })),
            }),
          })),
        });

        const { GET } = await import('@/app/api/problem-solving/route');
        const request = new NextRequest(
          'http://localhost:3000/api/problem-solving?category=arrays'
        );

        const response = await GET(request);
        const data = await response.json();

        expect(response.status).toBe(200);
        expect(data.success).toBe(true);
        expect(data.data).toHaveLength(1);
        expect(data.data[0].category).toBe('arrays');
      });
    });

    describe('POST /api/problem-solving', () => {
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

        const mockFirestore = require('firebase-admin').firestore();
        const mockDocRef = { id: 'test-problem-id' };
        mockFirestore.collection.mockReturnValue({
          add: jest.fn().mockResolvedValue(mockDocRef),
        });

        const { POST } = await import('@/app/api/problem-solving/route');
        const request = new NextRequest(
          'http://localhost:3000/api/problem-solving',
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

        const { POST } = await import('@/app/api/problem-solving/route');
        const request = new NextRequest(
          'http://localhost:3000/api/problem-solving',
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
        expect(data.error).toContain('validation');
      });
    });

    describe('PUT /api/problem-solving/[id]', () => {
      it('should update an existing problem solving task', async () => {
        const problemId = 'test-problem-id';
        const updateData = {
          title: 'Updated Problem Title',
          description: 'Updated description',
          hints: ['Updated hint'],
        };

        const mockFirestore = require('firebase-admin').firestore();
        mockFirestore.collection.mockReturnValue({
          doc: jest.fn(() => ({
            update: jest.fn().mockResolvedValue({}),
          })),
        });

        const { PUT } = await import('@/app/api/problem-solving/[id]/route');
        const request = new NextRequest(
          `http://localhost:3000/api/problem-solving/${problemId}`,
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
        expect(data.message).toContain('updated');
      });
    });

    describe('DELETE /api/problem-solving/[id]', () => {
      it('should delete a problem solving task', async () => {
        const problemId = 'test-problem-id';

        const mockFirestore = require('firebase-admin').firestore();
        mockFirestore.collection.mockReturnValue({
          doc: jest.fn(() => ({
            delete: jest.fn().mockResolvedValue({}),
          })),
        });

        const { DELETE } = await import('@/app/api/problem-solving/[id]/route');
        const request = new NextRequest(
          `http://localhost:3000/api/problem-solving/${problemId}`,
          {
            method: 'DELETE',
          }
        );

        const response = await DELETE(request, { params: { id: problemId } });
        const data = await response.json();

        expect(response.status).toBe(200);
        expect(data.success).toBe(true);
        expect(data.message).toContain('deleted');
      });
    });
  });

  describe('Error Handling', () => {
    it('should handle Firebase connection errors gracefully', async () => {
      const mockFirestore = require('firebase-admin').firestore();
      mockFirestore.collection.mockReturnValue({
        get: jest
          .fn()
          .mockRejectedValue(new Error('Firebase connection failed')),
      });

      const { GET } = await import('@/app/api/frontend-tasks/route');
      const request = new NextRequest(
        'http://localhost:3000/api/frontend-tasks'
      );

      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.success).toBe(false);
      expect(data.error).toContain('Failed to fetch');
    });

    it('should handle invalid JSON in request body', async () => {
      const { POST } = await import('@/app/api/frontend-tasks/route');
      const request = new NextRequest(
        'http://localhost:3000/api/frontend-tasks',
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
      expect(data.error).toContain('Invalid JSON');
    });

    it('should handle missing Content-Type header', async () => {
      const { POST } = await import('@/app/api/frontend-tasks/route');
      const request = new NextRequest(
        'http://localhost:3000/api/frontend-tasks',
        {
          method: 'POST',
          body: JSON.stringify({ title: 'Test Task' }),
        }
      );

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toContain('Content-Type');
    });
  });
});
