import { UnifiedQuestionService } from '@/lib/unified-question-schema';

// Mock Firebase
const mockDb = {
  collection: jest.fn(),
};

jest.mock('@/lib/firebase-server', () => ({
  db: mockDb,
}));

// Mock Firebase functions
const mockCollection = jest.fn();
const mockQuery = jest.fn();
const mockWhere = jest.fn();
const mockOrderBy = jest.fn();
const mockLimit = jest.fn();
const mockStartAfter = jest.fn();
const mockGetDocs = jest.fn();
const mockAddDoc = jest.fn();
const mockUpdateDoc = jest.fn();
const mockDeleteDoc = jest.fn();
const mockDoc = jest.fn();
const mockWriteBatch = jest.fn();

jest.mock('firebase/firestore', () => ({
  collection: mockCollection,
  query: mockQuery,
  where: mockWhere,
  orderBy: mockOrderBy,
  limit: mockLimit,
  startAfter: mockStartAfter,
  getDocs: mockGetDocs,
  addDoc: mockAddDoc,
  updateDoc: mockUpdateDoc,
  deleteDoc: mockDeleteDoc,
  doc: mockDoc,
  writeBatch: mockWriteBatch,
  serverTimestamp: jest.fn(() => 'server-timestamp'),
  increment: jest.fn(() => 'increment'),
}));

describe('UnifiedQuestionService', () => {
  let service: UnifiedQuestionService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new UnifiedQuestionService(mockDb);
  });

  describe('getQuestions', () => {
    it('should fetch questions with basic filters', async () => {
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

      mockCollection.mockReturnValue('questions-collection');
      mockQuery.mockReturnValue('query');
      mockWhere.mockReturnValue('where');
      mockOrderBy.mockReturnValue('orderBy');
      mockLimit.mockReturnValue('limit');
      mockGetDocs.mockResolvedValue({
        docs: mockQuestions.map(q => ({ id: q.id, data: () => q })),
        empty: false,
        size: 1,
      });

      const result = await service.getQuestions({
        category: 'React',
        difficulty: 'easy',
      });

      expect(result.questions).toHaveLength(1);
      expect(result.questions[0].title).toBe('Test Question');
      expect(result.totalCount).toBe(1);
    });

    it('should handle pagination', async () => {
      const mockQuestions = Array.from({ length: 15 }, (_, i) => ({
        id: `${i + 1}`,
        title: `Question ${i + 1}`,
        content: `Content ${i + 1}`,
        type: 'single',
        options: ['A', 'B', 'C', 'D'],
        correctAnswers: ['A'],
        explanation: `Explanation ${i + 1}`,
        category: 'Test',
        difficulty: 'easy',
        learningPath: 'test-basics',
        createdAt: new Date(),
        updatedAt: new Date(),
      }));

      mockCollection.mockReturnValue('questions-collection');
      mockQuery.mockReturnValue('query');
      mockWhere.mockReturnValue('where');
      mockOrderBy.mockReturnValue('orderBy');
      mockLimit.mockReturnValue('limit');
      mockGetDocs.mockResolvedValue({
        docs: mockQuestions
          .slice(0, 10)
          .map(q => ({ id: q.id, data: () => q })),
        empty: false,
        size: 10,
      });

      const result = await service.getQuestions({
        page: 1,
        pageSize: 10,
      });

      expect(result.questions).toHaveLength(10);
      expect(result.page).toBe(1);
      expect(result.pageSize).toBe(10);
      expect(result.hasNext).toBe(true);
    });

    it('should handle empty results', async () => {
      mockCollection.mockReturnValue('questions-collection');
      mockQuery.mockReturnValue('query');
      mockWhere.mockReturnValue('where');
      mockOrderBy.mockReturnValue('orderBy');
      mockLimit.mockReturnValue('limit');
      mockGetDocs.mockResolvedValue({
        docs: [],
        empty: true,
        size: 0,
      });

      const result = await service.getQuestions({});

      expect(result.questions).toHaveLength(0);
      expect(result.totalCount).toBe(0);
    });

    it('should handle errors', async () => {
      mockCollection.mockReturnValue('questions-collection');
      mockQuery.mockReturnValue('query');
      mockWhere.mockReturnValue('where');
      mockOrderBy.mockReturnValue('orderBy');
      mockLimit.mockReturnValue('limit');
      mockGetDocs.mockRejectedValue(new Error('Database error'));

      await expect(service.getQuestions({})).rejects.toThrow('Database error');
    });
  });

  describe('createQuestion', () => {
    it('should create a new question', async () => {
      const questionData = {
        title: 'New Question',
        content: 'What is TypeScript?',
        type: 'single' as const,
        options: ['A', 'B', 'C', 'D'],
        correctAnswers: ['A'],
        explanation: 'TypeScript is a typed superset of JavaScript',
        category: 'TypeScript',
        difficulty: 'medium' as const,
        learningPath: 'typescript-basics',
      };

      mockCollection.mockReturnValue('questions-collection');
      mockAddDoc.mockResolvedValue({ id: 'new-question-id' });

      const result = await service.createQuestion(questionData);

      expect(result).toBe('new-question-id');
      expect(mockAddDoc).toHaveBeenCalledWith(
        'questions-collection',
        expect.objectContaining({
          ...questionData,
          createdAt: 'server-timestamp',
          updatedAt: 'server-timestamp',
        })
      );
    });

    it('should handle creation errors', async () => {
      const questionData = {
        title: 'New Question',
        content: 'What is TypeScript?',
        type: 'single' as const,
        options: ['A', 'B', 'C', 'D'],
        correctAnswers: ['A'],
        explanation: 'TypeScript is a typed superset of JavaScript',
        category: 'TypeScript',
        difficulty: 'medium' as const,
        learningPath: 'typescript-basics',
      };

      mockCollection.mockReturnValue('questions-collection');
      mockAddDoc.mockRejectedValue(new Error('Creation failed'));

      await expect(service.createQuestion(questionData)).rejects.toThrow(
        'Creation failed'
      );
    });
  });

  describe('updateQuestion', () => {
    it('should update an existing question', async () => {
      const questionId = 'question-id';
      const updateData = {
        title: 'Updated Question',
        content: 'Updated content',
      };

      mockDoc.mockReturnValue('question-doc');
      mockUpdateDoc.mockResolvedValue(undefined);

      await service.updateQuestion(questionId, updateData);

      expect(mockUpdateDoc).toHaveBeenCalledWith(
        'question-doc',
        expect.objectContaining({
          ...updateData,
          updatedAt: 'server-timestamp',
        })
      );
    });

    it('should handle update errors', async () => {
      const questionId = 'question-id';
      const updateData = {
        title: 'Updated Question',
      };

      mockDoc.mockReturnValue('question-doc');
      mockUpdateDoc.mockRejectedValue(new Error('Update failed'));

      await expect(
        service.updateQuestion(questionId, updateData)
      ).rejects.toThrow('Update failed');
    });
  });

  describe('deleteQuestion', () => {
    it('should delete a question', async () => {
      const questionId = 'question-id';

      mockDoc.mockReturnValue('question-doc');
      mockDeleteDoc.mockResolvedValue(undefined);

      await service.deleteQuestion(questionId);

      expect(mockDeleteDoc).toHaveBeenCalledWith('question-doc');
    });

    it('should handle deletion errors', async () => {
      const questionId = 'question-id';

      mockDoc.mockReturnValue('question-doc');
      mockDeleteDoc.mockRejectedValue(new Error('Deletion failed'));

      await expect(service.deleteQuestion(questionId)).rejects.toThrow(
        'Deletion failed'
      );
    });
  });

  describe('getQuestionStats', () => {
    it('should return question statistics', async () => {
      const mockQuestions = [
        {
          id: '1',
          title: 'Question 1',
          category: 'React',
          difficulty: 'easy',
          createdAt: new Date('2024-01-01'),
          updatedAt: new Date('2024-01-01'),
        },
        {
          id: '2',
          title: 'Question 2',
          category: 'React',
          difficulty: 'medium',
          createdAt: new Date('2024-01-02'),
          updatedAt: new Date('2024-01-02'),
        },
        {
          id: '3',
          title: 'Question 3',
          category: 'TypeScript',
          difficulty: 'hard',
          createdAt: new Date('2024-01-03'),
          updatedAt: new Date('2024-01-03'),
        },
      ];

      mockCollection.mockReturnValue('questions-collection');
      mockQuery.mockReturnValue('query');
      mockWhere.mockReturnValue('where');
      mockOrderBy.mockReturnValue('orderBy');
      mockLimit.mockReturnValue('limit');
      mockGetDocs.mockResolvedValue({
        docs: mockQuestions.map(q => ({ id: q.id, data: () => q })),
        empty: false,
        size: 3,
      });

      const result = await service.getQuestionStats();

      expect(result.totalQuestions).toBe(3);
      expect(result.questionsByCategory).toEqual({
        React: 2,
        TypeScript: 1,
      });
      expect(result.questionsByDifficulty).toEqual({
        easy: 1,
        medium: 1,
        hard: 1,
      });
      expect(result.recentActivity).toHaveLength(3);
    });

    it('should handle empty questions', async () => {
      mockCollection.mockReturnValue('questions-collection');
      mockQuery.mockReturnValue('query');
      mockWhere.mockReturnValue('where');
      mockOrderBy.mockReturnValue('orderBy');
      mockLimit.mockReturnValue('limit');
      mockGetDocs.mockResolvedValue({
        docs: [],
        empty: true,
        size: 0,
      });

      const result = await service.getQuestionStats();

      expect(result.totalQuestions).toBe(0);
      expect(result.questionsByCategory).toEqual({});
      expect(result.questionsByDifficulty).toEqual({});
      expect(result.recentActivity).toEqual([]);
    });
  });

  describe('bulkImportQuestions', () => {
    it('should import multiple questions', async () => {
      const questions = [
        {
          title: 'Question 1',
          content: 'Content 1',
          type: 'single' as const,
          options: ['A', 'B'],
          correctAnswers: ['A'],
          explanation: 'Explanation 1',
          category: 'Test',
          difficulty: 'easy' as const,
          learningPath: 'test-basics',
        },
        {
          title: 'Question 2',
          content: 'Content 2',
          type: 'single' as const,
          options: ['A', 'B'],
          correctAnswers: ['B'],
          explanation: 'Explanation 2',
          category: 'Test',
          difficulty: 'medium' as const,
          learningPath: 'test-basics',
        },
      ];

      const mockBatch = {
        set: jest.fn(),
        commit: jest.fn().mockResolvedValue(undefined),
      };
      mockWriteBatch.mockReturnValue(mockBatch);
      mockCollection.mockReturnValue('questions-collection');
      mockDoc.mockReturnValue('question-doc');

      const result = await service.bulkImportQuestions(questions);

      expect(result.success).toBe(2);
      expect(result.failed).toBe(0);
      expect(result.errors).toHaveLength(0);
      expect(mockBatch.set).toHaveBeenCalledTimes(2);
      expect(mockBatch.commit).toHaveBeenCalled();
    });

    it('should handle partial failures', async () => {
      const questions = [
        {
          title: 'Valid Question',
          content: 'Valid content',
          type: 'single' as const,
          options: ['A', 'B'],
          correctAnswers: ['A'],
          explanation: 'Valid explanation',
          category: 'Test',
          difficulty: 'easy' as const,
          learningPath: 'test-basics',
        },
        {
          title: '', // Invalid: empty title
          content: 'Invalid content',
          type: 'single' as const,
          options: ['A', 'B'],
          correctAnswers: ['A'],
          explanation: 'Invalid explanation',
          category: 'Test',
          difficulty: 'easy' as const,
          learningPath: 'test-basics',
        },
      ];

      const mockBatch = {
        set: jest.fn(),
        commit: jest.fn().mockResolvedValue(undefined),
      };
      mockWriteBatch.mockReturnValue(mockBatch);
      mockCollection.mockReturnValue('questions-collection');
      mockDoc.mockReturnValue('question-doc');

      const result = await service.bulkImportQuestions(questions);

      expect(result.success).toBe(1);
      expect(result.failed).toBe(1);
      expect(result.errors).toHaveLength(1);
      expect(result.errors[0]).toContain('Title is required');
    });
  });
});
