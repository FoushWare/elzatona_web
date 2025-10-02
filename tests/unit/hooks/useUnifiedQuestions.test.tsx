import { renderHook, act } from '@testing-library/react';
import { useUnifiedQuestions } from '@/hooks/useUnifiedQuestions';

// Mock fetch
global.fetch = jest.fn();

// Mock console methods to avoid noise in tests
const originalConsoleError = console.error;
const originalConsoleLog = console.log;

beforeAll(() => {
  console.error = jest.fn();
  console.log = jest.fn();
});

afterAll(() => {
  console.error = originalConsoleError;
  console.log = originalConsoleLog;
});

describe('useUnifiedQuestions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockClear();
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useUnifiedQuestions());

    expect(result.current.questions).toEqual([]);
    expect(result.current.currentQuestion).toBeNull();
    expect(result.current.learningPaths).toEqual([]);
    expect(result.current.stats).toBeNull();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isCreating).toBe(false);
    expect(result.current.isUpdating).toBe(false);
    expect(result.current.isDeleting).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.currentPage).toBe(1);
    expect(result.current.pageSize).toBe(10);
    expect(result.current.totalCount).toBe(0);
    expect(result.current.totalPages).toBe(0);
    expect(result.current.hasNext).toBe(false);
    expect(result.current.hasPrev).toBe(false);
  });

  it('should load questions on mount when autoLoad is true', async () => {
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

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        success: true,
        data: mockQuestions,
        pagination: {
          page: 1,
          pageSize: 10,
          totalCount: 1,
          totalPages: 1,
          hasNext: false,
          hasPrev: false,
        },
      }),
    });

    const { result } = renderHook(() =>
      useUnifiedQuestions({ autoLoad: true })
    );

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.questions).toEqual(mockQuestions);
    expect(result.current.totalCount).toBe(1);
  });

  it('should not load questions on mount when autoLoad is false', async () => {
    const { result } = renderHook(() =>
      useUnifiedQuestions({ autoLoad: false })
    );

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.questions).toEqual([]);
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('should load questions with filters', async () => {
    const mockQuestions = [
      {
        id: '1',
        title: 'React Question',
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

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        success: true,
        data: mockQuestions,
        pagination: {
          page: 1,
          pageSize: 10,
          totalCount: 1,
          totalPages: 1,
          hasNext: false,
          hasPrev: false,
        },
      }),
    });

    const { result } = renderHook(() => useUnifiedQuestions());

    await act(async () => {
      await result.current.loadQuestions({
        category: 'React',
        difficulty: 'easy',
      });
    });

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('category=React&difficulty=easy')
    );
    expect(result.current.questions).toEqual(mockQuestions);
  });

  it('should handle loading states correctly', async () => {
    let resolveFetch: (value: unknown) => void;
    const fetchPromise = new Promise(resolve => {
      resolveFetch = resolve;
    });

    (global.fetch as jest.Mock).mockReturnValueOnce(fetchPromise);

    const { result } = renderHook(() => useUnifiedQuestions());

    act(() => {
      result.current.loadQuestions();
    });

    expect(result.current.isLoading).toBe(true);

    await act(async () => {
      resolveFetch!({
        ok: true,
        json: async () => ({
          success: true,
          data: [],
          pagination: {
            page: 1,
            pageSize: 10,
            totalCount: 0,
            totalPages: 0,
            hasNext: false,
            hasPrev: false,
          },
        }),
      });
    });

    expect(result.current.isLoading).toBe(false);
  });

  it('should handle errors correctly', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(
      new Error('Network error')
    );

    const { result } = renderHook(() => useUnifiedQuestions());

    await act(async () => {
      await result.current.loadQuestions();
    });

    expect(result.current.error).toBe('Network error');
    expect(result.current.isLoading).toBe(false);
  });

  it('should create a question', async () => {
    const newQuestion = {
      title: 'New Question',
      content: 'What is TypeScript?',
      type: 'multiple-choice' as const,
      options: ['A', 'B', 'C', 'D'],
      correctAnswers: ['A'],
      explanation: 'TypeScript is a typed superset of JavaScript',
      category: 'TypeScript',
      difficulty: 'intermediate' as const,
      learningPath: 'typescript-basics',
      isActive: true,
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        success: true,
        id: 'new-question-id',
      }),
    });

    const { result } = renderHook(() => useUnifiedQuestions());

    let questionId: string | null = null;
    await act(async () => {
      questionId = await result.current.createQuestion(newQuestion);
    });

    expect(questionId).toBe('new-question-id');
    expect(result.current.isCreating).toBe(false);
  });

  it('should update a question', async () => {
    const updateData = {
      title: 'Updated Question',
      content: 'Updated content',
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        success: true,
      }),
    });

    const { result } = renderHook(() => useUnifiedQuestions());

    await act(async () => {
      await result.current.updateQuestion('question-id', updateData);
    });

    expect(global.fetch).toHaveBeenCalledWith(
      '/api/questions/unified/question-id',
      expect.objectContaining({
        method: 'PUT',
        body: JSON.stringify(updateData),
      })
    );
    expect(result.current.isUpdating).toBe(false);
  });

  it('should delete a question', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        success: true,
      }),
    });

    const { result } = renderHook(() => useUnifiedQuestions());

    await act(async () => {
      await result.current.deleteQuestion('question-id');
    });

    expect(global.fetch).toHaveBeenCalledWith(
      '/api/questions/unified/question-id',
      expect.objectContaining({
        method: 'DELETE',
      })
    );
    expect(result.current.isDeleting).toBe(false);
  });

  it('should handle pagination', async () => {
    const mockQuestions = Array.from({ length: 20 }, (_, i) => ({
      id: `${i + 1}`,
      title: `Question ${i + 1}`,
      content: `Content ${i + 1}`,
      type: 'multiple-choice' as const,
      options: ['A', 'B', 'C', 'D'],
      correctAnswers: ['A'],
      explanation: `Explanation ${i + 1}`,
      category: 'Test',
      difficulty: 'beginner' as const,
      learningPath: 'test-basics',
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        success: true,
        data: mockQuestions.slice(0, 10),
        pagination: {
          page: 1,
          pageSize: 10,
          totalCount: 20,
          totalPages: 2,
          hasNext: true,
          hasPrev: false,
        },
      }),
    });

    const { result } = renderHook(() => useUnifiedQuestions());

    await act(async () => {
      await result.current.loadQuestions();
    });

    expect(result.current.totalCount).toBe(20);
    expect(result.current.totalPages).toBe(2);
    expect(result.current.hasNext).toBe(true);
    expect(result.current.hasPrev).toBe(false);

    // Test next page
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        success: true,
        data: mockQuestions.slice(10, 20),
        pagination: {
          page: 2,
          pageSize: 10,
          totalCount: 20,
          totalPages: 2,
          hasNext: false,
          hasPrev: true,
        },
      }),
    });

    await act(async () => {
      result.current.nextPage();
    });

    expect(result.current.currentPage).toBe(2);
    expect(result.current.hasNext).toBe(false);
    expect(result.current.hasPrev).toBe(true);
  });

  it('should search questions', async () => {
    const mockQuestions = [
      {
        id: '1',
        title: 'React Question',
        content: 'What is React?',
        type: 'multiple-choice' as const,
        options: ['A', 'B', 'C', 'D'],
        correctAnswers: ['A'],
        explanation: 'React is a library',
        category: 'React',
        difficulty: 'beginner' as const,
        learningPath: 'react-basics',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        success: true,
        data: mockQuestions,
        pagination: {
          page: 1,
          pageSize: 10,
          totalCount: 1,
          totalPages: 1,
          hasNext: false,
          hasPrev: false,
        },
      }),
    });

    const { result } = renderHook(() => useUnifiedQuestions());

    await act(async () => {
      await result.current.searchQuestions('React');
    });

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('search=React')
    );
    expect(result.current.questions).toEqual(mockQuestions);
  });

  it('should clear error', () => {
    const { result } = renderHook(() => useUnifiedQuestions());

    act(() => {
      result.current.clearError();
    });

    expect(result.current.error).toBeNull();
  });

  it('should clear questions', () => {
    const { result } = renderHook(() => useUnifiedQuestions());

    act(() => {
      result.current.clearQuestions();
    });

    expect(result.current.questions).toEqual([]);
  });

  it('should handle bulk import', async () => {
    const bulkQuestions = [
      {
        questions: [
          {
            id: '1',
            title: 'Question 1',
            content: 'Content 1',
            type: 'multiple-choice' as const,
            options: ['A', 'B'],
            correctAnswers: ['A'],
            explanation: 'Explanation 1',
            category: 'Test',
            difficulty: 'beginner' as const,
            learningPath: 'test-basics',
            isActive: true,
            createdAt: '2024-01-01T00:00:00Z',
            updatedAt: '2024-01-01T00:00:00Z',
          },
          {
            id: '2',
            title: 'Question 2',
            content: 'Content 2',
            type: 'multiple-choice' as const,
            options: ['A', 'B'],
            correctAnswers: ['B'],
            explanation: 'Explanation 2',
            category: 'Test',
            difficulty: 'intermediate' as const,
            learningPath: 'test-basics',
            isActive: true,
            createdAt: '2024-01-02T00:00:00Z',
            updatedAt: '2024-01-02T00:00:00Z',
          },
        ],
        metadata: {
          source: 'test',
          version: '1.0',
          totalCount: 2,
          categories: ['Test'],
          difficulties: ['easy', 'medium'],
          learningPaths: ['test-basics'],
        },
        validation: {
          isValid: true,
          errors: [],
        },
      },
    ];

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        success: true,
        result: {
          success: 2,
          failed: 0,
          errors: [],
        },
      }),
    });

    const { result } = renderHook(() => useUnifiedQuestions());

    let importResult:
      | { success: number; failed: number; errors: string[] }
      | undefined;
    await act(async () => {
      importResult = await result.current.bulkImportQuestions(bulkQuestions);
    });

    expect(importResult).toEqual({
      success: 2,
      failed: 0,
      errors: [],
    });
    expect(result.current.isCreating).toBe(false);
  });
});
