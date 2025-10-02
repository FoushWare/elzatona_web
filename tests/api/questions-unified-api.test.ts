import { NextRequest } from 'next/server';

// Mock Firebase
jest.mock('@/lib/firebase-server', () => ({
  db: {
    collection: jest.fn(),
  },
  collection: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  orderBy: jest.fn(),
  limit: jest.fn(),
  startAfter: jest.fn(),
  getDocs: jest.fn(),
  addDoc: jest.fn(),
  updateDoc: jest.fn(),
  deleteDoc: jest.fn(),
  doc: jest.fn(),
}));

// Mock UnifiedQuestionService
jest.mock('@/lib/unified-question-schema', () => ({
  UnifiedQuestionService: jest.fn().mockImplementation(() => ({
    getQuestions: jest.fn(),
    createQuestion: jest.fn(),
    updateQuestion: jest.fn(),
    deleteQuestion: jest.fn(),
    getQuestionStats: jest.fn(),
  })),
}));

// Import after mocking
const { GET, POST, PUT, DELETE } = require('@/app/api/questions/unified/route');

describe('Questions Unified API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/questions/unified', () => {
    it('should return questions with pagination', async () => {
      const mockQuestions = [
        {
          id: '1',
          title: 'Test Question',
          content: 'What is React?',
          type: 'single',
          options: ['A', 'B', 'C', 'D'],
          correctAnswers: ['A'],
          explanation: 'React is a library',
          category: 'React',
          difficulty: 'easy',
          learningPath: 'react-basics',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      // Mock Firebase functions are available globally
      const {
        UnifiedQuestionService,
      } = require('@/lib/unified-question-schema');
      const { getDocs } = require('@/lib/firebase-server');

      getDocs.mockResolvedValue({
        docs: mockQuestions.map(q => ({ id: q.id, data: () => q })),
        empty: false,
        size: 1,
      });

      const mockService = {
        getQuestions: jest.fn().mockResolvedValue({
          questions: mockQuestions,
          totalCount: 1,
          hasNext: false,
          hasPrev: false,
        }),
      };

      UnifiedQuestionService.mockImplementation(() => mockService);

      const request = new NextRequest(
        'http://localhost:3000/api/questions/unified?page=1&pageSize=10'
      );
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data).toHaveLength(1);
      expect(data.pagination).toBeDefined();
    });

    it('should handle filtering by category', async () => {
      const {
        UnifiedQuestionService,
      } = require('@/lib/unified-question-schema');
      const mockService = {
        getQuestions: jest.fn().mockResolvedValue({
          questions: [],
          totalCount: 0,
          hasNext: false,
          hasPrev: false,
        }),
      };

      UnifiedQuestionService.mockImplementation(() => mockService);

      const request = new NextRequest(
        'http://localhost:3000/api/questions/unified?category=React'
      );
      const response = await GET(request);

      expect(response.status).toBe(200);
      expect(mockService.getQuestions).toHaveBeenCalledWith(
        expect.objectContaining({
          category: 'React',
        })
      );
    });

    it('should handle filtering by learning path', async () => {
      const {
        UnifiedQuestionService,
      } = require('@/lib/unified-question-schema');
      const mockService = {
        getQuestions: jest.fn().mockResolvedValue({
          questions: [],
          totalCount: 0,
          hasNext: false,
          hasPrev: false,
        }),
      };

      UnifiedQuestionService.mockImplementation(() => mockService);

      const request = new NextRequest(
        'http://localhost:3000/api/questions/unified?learningPath=react-basics'
      );
      const response = await GET(request);

      expect(response.status).toBe(200);
      expect(mockService.getQuestions).toHaveBeenCalledWith(
        expect.objectContaining({
          learningPath: 'react-basics',
        })
      );
    });

    it('should handle errors gracefully', async () => {
      const {
        UnifiedQuestionService,
      } = require('@/lib/unified-question-schema');
      const mockService = {
        getQuestions: jest.fn().mockRejectedValue(new Error('Database error')),
      };

      UnifiedQuestionService.mockImplementation(() => mockService);

      const request = new NextRequest(
        'http://localhost:3000/api/questions/unified'
      );
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.success).toBe(false);
      expect(data.error).toContain('Database error');
    });
  });

  describe('POST /api/questions/unified', () => {
    it('should create a new question', async () => {
      const {
        UnifiedQuestionService,
      } = require('@/lib/unified-question-schema');
      const mockService = {
        createQuestion: jest.fn().mockResolvedValue('new-question-id'),
      };

      UnifiedQuestionService.mockImplementation(() => mockService);

      const questionData = {
        title: 'New Question',
        content: 'What is TypeScript?',
        type: 'single',
        options: ['A', 'B', 'C', 'D'],
        correctAnswers: ['A'],
        explanation: 'TypeScript is a typed superset of JavaScript',
        category: 'TypeScript',
        difficulty: 'medium',
        learningPath: 'typescript-basics',
      };

      const request = new NextRequest(
        'http://localhost:3000/api/questions/unified',
        {
          method: 'POST',
          body: JSON.stringify(questionData),
          headers: { 'Content-Type': 'application/json' },
        }
      );

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.success).toBe(true);
      expect(data.id).toBe('new-question-id');
      expect(mockService.createQuestion).toHaveBeenCalledWith(questionData);
    });

    it('should handle validation errors', async () => {
      const {
        UnifiedQuestionService,
      } = require('@/lib/unified-question-schema');
      const mockService = {
        createQuestion: jest
          .fn()
          .mockRejectedValue(new Error('Validation failed')),
      };

      UnifiedQuestionService.mockImplementation(() => mockService);

      const invalidData = {
        title: '', // Invalid: empty title
        content: 'What is TypeScript?',
      };

      const request = new NextRequest(
        'http://localhost:3000/api/questions/unified',
        {
          method: 'POST',
          body: JSON.stringify(invalidData),
          headers: { 'Content-Type': 'application/json' },
        }
      );

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toContain('Validation failed');
    });
  });

  describe('PUT /api/questions/unified/[id]', () => {
    it('should update an existing question', async () => {
      const {
        UnifiedQuestionService,
      } = require('@/lib/unified-question-schema');
      const mockService = {
        updateQuestion: jest.fn().mockResolvedValue(undefined),
      };

      UnifiedQuestionService.mockImplementation(() => mockService);

      const updateData = {
        title: 'Updated Question',
        content: 'What is React?',
      };

      const request = new NextRequest(
        'http://localhost:3000/api/questions/unified/1',
        {
          method: 'PUT',
          body: JSON.stringify(updateData),
          headers: { 'Content-Type': 'application/json' },
        }
      );

      const response = await PUT(request, {
        params: Promise.resolve({ id: '1' }),
      });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(mockService.updateQuestion).toHaveBeenCalledWith('1', updateData);
    });

    it('should handle question not found', async () => {
      const {
        UnifiedQuestionService,
      } = require('@/lib/unified-question-schema');
      const mockService = {
        updateQuestion: jest
          .fn()
          .mockRejectedValue(new Error('Question not found')),
      };

      UnifiedQuestionService.mockImplementation(() => mockService);

      const request = new NextRequest(
        'http://localhost:3000/api/questions/unified/nonexistent',
        {
          method: 'PUT',
          body: JSON.stringify({ title: 'Updated' }),
          headers: { 'Content-Type': 'application/json' },
        }
      );

      const response = await PUT(request, {
        params: Promise.resolve({ id: 'nonexistent' }),
      });
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data.success).toBe(false);
      expect(data.error).toContain('Question not found');
    });
  });

  describe('DELETE /api/questions/unified/[id]', () => {
    it('should delete a question', async () => {
      const {
        UnifiedQuestionService,
      } = require('@/lib/unified-question-schema');
      const mockService = {
        deleteQuestion: jest.fn().mockResolvedValue(undefined),
      };

      UnifiedQuestionService.mockImplementation(() => mockService);

      const request = new NextRequest(
        'http://localhost:3000/api/questions/unified/1',
        {
          method: 'DELETE',
        }
      );

      const response = await DELETE(request, {
        params: Promise.resolve({ id: '1' }),
      });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(mockService.deleteQuestion).toHaveBeenCalledWith('1');
    });

    it('should handle question not found during deletion', async () => {
      const {
        UnifiedQuestionService,
      } = require('@/lib/unified-question-schema');
      const mockService = {
        deleteQuestion: jest
          .fn()
          .mockRejectedValue(new Error('Question not found')),
      };

      UnifiedQuestionService.mockImplementation(() => mockService);

      const request = new NextRequest(
        'http://localhost:3000/api/questions/unified/nonexistent',
        {
          method: 'DELETE',
        }
      );

      const response = await DELETE(request, {
        params: Promise.resolve({ id: 'nonexistent' }),
      });
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data.success).toBe(false);
      expect(data.error).toContain('Question not found');
    });
  });
});
