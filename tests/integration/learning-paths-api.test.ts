import { NextRequest } from 'next/server';

// Mock Firebase Admin SDK
jest.mock('firebase-admin/app', () => ({
  getApps: jest.fn(() => []),
  initializeApp: jest.fn(),
}));

jest.mock('firebase-admin/firestore', () => ({
  getFirestore: jest.fn(() => ({
    collection: jest.fn(() => ({
      where: jest.fn(() => ({
        get: jest.fn(() => ({
          docs: [
            {
              id: 'question-1',
              data: () => ({
                id: 'question-1',
                question: 'What is HTML?',
                type: 'multiple-choice',
                options: [
                  'HyperText Markup Language',
                  'High Tech Modern Language',
                  'Home Tool Markup Language',
                ],
                correctAnswer: 0,
                explanation: 'HTML stands for HyperText Markup Language.',
                category: 'HTML Basics',
                difficulty: 'beginner',
                learningPath: 'frontend-basics',
              }),
            },
            {
              id: 'question-2',
              data: () => ({
                id: 'question-2',
                question: 'What is CSS?',
                type: 'multiple-choice',
                options: [
                  'Cascading Style Sheets',
                  'Computer Style Sheets',
                  'Creative Style Sheets',
                ],
                correctAnswer: 0,
                explanation: 'CSS stands for Cascading Style Sheets.',
                category: 'CSS Basics',
                difficulty: 'beginner',
                learningPath: 'frontend-basics',
              }),
            },
          ],
        })),
      })),
    })),
  })),
}));

describe('Learning Paths API Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/questions/[learningPath]', () => {
    it('should return questions for a valid learning path', async () => {
      const { GET } = await import('@/app/api/questions/[learningPath]/route');

      const request = new NextRequest(
        'http://localhost:3000/api/questions/frontend-basics'
      );
      const response = await GET(request, {
        params: { learningPath: 'frontend-basics' },
      });

      expect(response.status).toBe(200);

      const data = await response.json();
      expect(data.success).toBe(true);
      expect(data.questions).toHaveLength(2);
      expect(data.questions[0]).toHaveProperty('id', 'question-1');
      expect(data.questions[0]).toHaveProperty('question', 'What is HTML?');
      expect(data.questions[0]).toHaveProperty('type', 'multiple-choice');
    });

    it('should return empty array for non-existent learning path', async () => {
      const { GET } = await import('@/app/api/questions/[learningPath]/route');

      const request = new NextRequest(
        'http://localhost:3000/api/questions/non-existent-path'
      );
      const response = await GET(request, {
        params: { learningPath: 'non-existent-path' },
      });

      expect(response.status).toBe(200);

      const data = await response.json();
      expect(data.success).toBe(true);
      expect(data.questions).toHaveLength(0);
    });

    it('should handle invalid learning path parameter', async () => {
      const { GET } = await import('@/app/api/questions/[learningPath]/route');

      const request = new NextRequest('http://localhost:3000/api/questions/');
      const response = await GET(request, { params: { learningPath: '' } });

      expect(response.status).toBe(400);

      const data = await response.json();
      expect(data.success).toBe(false);
      expect(data.error).toContain('Learning path is required');
    });

    it('should filter questions by type when specified', async () => {
      // Mock different question types
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const mockFirestore = require('firebase-admin/firestore');
      mockFirestore.getFirestore.mockReturnValue({
        collection: jest.fn(() => ({
          where: jest.fn(() => ({
            get: jest.fn(() => ({
              docs: [
                {
                  id: 'question-1',
                  data: () => ({
                    id: 'question-1',
                    question: 'What is HTML?',
                    type: 'multiple-choice',
                    options: [
                      'HyperText Markup Language',
                      'High Tech Modern Language',
                    ],
                    correctAnswer: 0,
                    explanation: 'HTML stands for HyperText Markup Language.',
                    category: 'HTML Basics',
                    difficulty: 'beginner',
                    learningPath: 'frontend-basics',
                  }),
                },
                {
                  id: 'question-2',
                  data: () => ({
                    id: 'question-2',
                    question: 'Explain HTML structure',
                    type: 'open-ended',
                    explanation: 'HTML has a hierarchical structure.',
                    category: 'HTML Basics',
                    difficulty: 'intermediate',
                    learningPath: 'frontend-basics',
                  }),
                },
              ],
            })),
          })),
        })),
      });

      const { GET } = await import('@/app/api/questions/[learningPath]/route');

      const request = new NextRequest(
        'http://localhost:3000/api/questions/frontend-basics?type=multiple-choice'
      );
      const response = await GET(request, {
        params: { learningPath: 'frontend-basics' },
      });

      expect(response.status).toBe(200);

      const data = await response.json();
      expect(data.success).toBe(true);
      expect(data.questions).toHaveLength(1);
      expect(data.questions[0].type).toBe('multiple-choice');
    });
  });

  describe('POST /api/questions/add', () => {
    it('should add a new question successfully', async () => {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const mockFirestore = require('firebase-admin/firestore');
      const mockAdd = jest.fn(() => ({ id: 'new-question-id' }));
      mockFirestore.getFirestore.mockReturnValue({
        collection: jest.fn(() => ({
          add: mockAdd,
        })),
      });

      const { POST } = await import('@/app/api/questions/add/route');

      const questionData = {
        question: 'What is JavaScript?',
        type: 'multiple-choice',
        options: ['Programming Language', 'Markup Language', 'Style Language'],
        correctAnswer: 0,
        explanation: 'JavaScript is a programming language.',
        category: 'JavaScript Basics',
        difficulty: 'beginner',
        learningPath: 'frontend-basics',
      };

      const request = new NextRequest(
        'http://localhost:3000/api/questions/add',
        {
          method: 'POST',
          body: JSON.stringify(questionData),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const response = await POST(request);

      expect(response.status).toBe(200);
      expect(mockAdd).toHaveBeenCalledWith(questionData);

      const data = await response.json();
      expect(data.success).toBe(true);
      expect(data.message).toContain('Question added successfully');
    });

    it('should handle invalid question data', async () => {
      const { POST } = await import('@/app/api/questions/add/route');

      const invalidData = {
        question: '', // Empty question
        type: 'invalid-type',
      };

      const request = new NextRequest(
        'http://localhost:3000/api/questions/add',
        {
          method: 'POST',
          body: JSON.stringify(invalidData),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const response = await POST(request);

      expect(response.status).toBe(400);

      const data = await response.json();
      expect(data.success).toBe(false);
      expect(data.error).toContain('Question text is required');
    });

    it('should validate multiple choice questions', async () => {
      const { POST } = await import('@/app/api/questions/add/route');

      const invalidMCData = {
        question: 'What is HTML?',
        type: 'multiple-choice',
        options: ['Option 1'], // Only one option
        correctAnswer: 0,
        explanation: 'HTML explanation',
        category: 'HTML',
        difficulty: 'beginner',
        learningPath: 'frontend-basics',
      };

      const request = new NextRequest(
        'http://localhost:3000/api/questions/add',
        {
          method: 'POST',
          body: JSON.stringify(invalidMCData),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const response = await POST(request);

      expect(response.status).toBe(400);

      const data = await response.json();
      expect(data.success).toBe(false);
      expect(data.error).toContain(
        'Multiple choice questions must have at least 2 options'
      );
    });

    it('should handle Firebase errors gracefully', async () => {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const mockFirestore = require('firebase-admin/firestore');
      mockFirestore.getFirestore.mockReturnValue({
        collection: jest.fn(() => ({
          add: jest.fn(() => {
            throw new Error('Firebase connection error');
          }),
        })),
      });

      const { POST } = await import('@/app/api/questions/add/route');

      const questionData = {
        question: 'What is JavaScript?',
        type: 'multiple-choice',
        options: ['Programming Language', 'Markup Language'],
        correctAnswer: 0,
        explanation: 'JavaScript is a programming language.',
        category: 'JavaScript Basics',
        difficulty: 'beginner',
        learningPath: 'frontend-basics',
      };

      const request = new NextRequest(
        'http://localhost:3000/api/questions/add',
        {
          method: 'POST',
          body: JSON.stringify(questionData),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const response = await POST(request);

      expect(response.status).toBe(500);

      const data = await response.json();
      expect(data.success).toBe(false);
      expect(data.error).toContain('Failed to add question');
    });
  });

  describe('API Error Handling', () => {
    it('should handle missing request body', async () => {
      const { POST } = await import('@/app/api/questions/add/route');

      const request = new NextRequest(
        'http://localhost:3000/api/questions/add',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const response = await POST(request);

      expect(response.status).toBe(400);

      const data = await response.json();
      expect(data.success).toBe(false);
      expect(data.error).toContain('Request body is required');
    });

    it('should handle malformed JSON', async () => {
      const { POST } = await import('@/app/api/questions/add/route');

      const request = new NextRequest(
        'http://localhost:3000/api/questions/add',
        {
          method: 'POST',
          body: 'invalid json',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const response = await POST(request);

      expect(response.status).toBe(400);

      const data = await response.json();
      expect(data.success).toBe(false);
      expect(data.error).toContain('Invalid JSON');
    });

    it('should handle unsupported HTTP methods', async () => {
      const { GET } = await import('@/app/api/questions/[learningPath]/route');

      const request = new NextRequest(
        'http://localhost:3000/api/questions/frontend-basics',
        {
          method: 'DELETE',
        }
      );

      const response = await GET(request, {
        params: { learningPath: 'frontend-basics' },
      });

      // GET handler should not handle DELETE requests
      expect(response.status).toBe(200); // Should still work as GET
    });
  });

  describe('API Performance', () => {
    it('should handle large number of questions efficiently', async () => {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const mockFirestore = require('firebase-admin/firestore');
      const manyQuestions = Array(100)
        .fill(null)
        .map((_, index) => ({
          id: `question-${index}`,
          data: () => ({
            id: `question-${index}`,
            question: `Question ${index + 1}`,
            type: 'multiple-choice',
            options: ['Option A', 'Option B', 'Option C'],
            correctAnswer: 0,
            explanation: `Explanation for question ${index + 1}`,
            category: 'Test Category',
            difficulty: 'beginner',
            learningPath: 'frontend-basics',
          }),
        }));

      mockFirestore.getFirestore.mockReturnValue({
        collection: jest.fn(() => ({
          where: jest.fn(() => ({
            get: jest.fn(() => ({
              docs: manyQuestions,
            })),
          })),
        })),
      });

      const { GET } = await import('@/app/api/questions/[learningPath]/route');

      const request = new NextRequest(
        'http://localhost:3000/api/questions/frontend-basics'
      );
      const response = await GET(request, {
        params: { learningPath: 'frontend-basics' },
      });

      expect(response.status).toBe(200);

      const data = await response.json();
      expect(data.success).toBe(true);
      expect(data.questions).toHaveLength(100);
    });
  });
});
