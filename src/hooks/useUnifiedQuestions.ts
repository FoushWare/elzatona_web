// v1.0 - Unified Questions Hook
// React hook for managing questions from the unified Firebase system

import { useState, useEffect, useCallback } from 'react';
import {
  UnifiedQuestion,
  BulkQuestionData,
  QuestionStats,
  LearningPath,
} from '@/lib/unified-question-schema';

interface UseUnifiedQuestionsOptions {
  autoLoad?: boolean;
  initialFilters?: {
    category?: string;
    subcategory?: string;
    difficulty?: string;
    learningPath?: string;
    sectionId?: string;
    isActive?: boolean;
    isComplete?: boolean;
    limit?: number;
  };
}

interface UseUnifiedQuestionsReturn {
  // Data
  questions: UnifiedQuestion[];
  currentQuestion: UnifiedQuestion | null;
  learningPaths: LearningPath[];
  stats: QuestionStats | null;

  // Loading states
  isLoading: boolean;
  isCreating: boolean;
  isUpdating: boolean;
  isDeleting: boolean;

  // Error states
  error: string | null;

  // Actions
  loadQuestions: (
    filters?: UseUnifiedQuestionsOptions['initialFilters']
  ) => Promise<void>;
  loadQuestion: (id: string) => Promise<void>;
  loadLearningPaths: () => Promise<void>;
  loadStats: () => Promise<void>;
  createQuestion: (
    questionData: Omit<UnifiedQuestion, 'id' | 'createdAt' | 'updatedAt'>
  ) => Promise<string | null>;
  updateQuestion: (
    id: string,
    updates: Partial<UnifiedQuestion>
  ) => Promise<void>;
  deleteQuestion: (id: string) => Promise<void>;
  bulkImportQuestions: (
    questions: BulkQuestionData[]
  ) => Promise<{ success: number; failed: number; errors: string[] }>;
  searchQuestions: (
    searchTerm: string,
    filters?: UseUnifiedQuestionsOptions['initialFilters']
  ) => Promise<void>;
  getRandomQuestions: (
    count: number,
    filters?: UseUnifiedQuestionsOptions['initialFilters']
  ) => Promise<void>;

  // Utilities
  clearError: () => void;
  clearQuestions: () => void;
}

export function useUnifiedQuestions(
  options: UseUnifiedQuestionsOptions = {}
): UseUnifiedQuestionsReturn {
  const { autoLoad = true, initialFilters } = options;

  // State
  const [questions, setQuestions] = useState<UnifiedQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] =
    useState<UnifiedQuestion | null>(null);
  const [learningPaths, setLearningPaths] = useState<LearningPath[]>([]);
  const [stats, setStats] = useState<QuestionStats | null>(null);

  // Loading states
  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Error state
  const [error, setError] = useState<string | null>(null);

  // API calls
  const apiCall = async (url: string, options: RequestInit = {}) => {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ error: 'Unknown error' }));
      throw new Error(errorData.error || `HTTP ${response.status}`);
    }

    return response.json();
  };

  // Load questions
  const loadQuestions = useCallback(
    async (filters?: UseUnifiedQuestionsOptions['initialFilters']) => {
      setIsLoading(true);
      setError(null);

      try {
        const queryParams = new URLSearchParams();
        if (filters) {
          Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
              queryParams.append(key, String(value));
            }
          });
        }

        const url = `/api/questions/unified${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
        const response = await apiCall(url);

        if (response.success) {
          console.log('✅ useUnifiedQuestions: Questions loaded successfully:', response.data);
          setQuestions(response.data);
        } else {
          console.error('❌ useUnifiedQuestions: Failed to load questions:', response.error);
          throw new Error(response.error || 'Failed to load questions');
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to load questions';
        setError(errorMessage);
        console.error('Error loading questions:', err);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  // Load single question
  const loadQuestion = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiCall(`/api/questions/unified/${id}`);

      if (response.success) {
        setCurrentQuestion(response.data);
      } else {
        throw new Error(response.error || 'Failed to load question');
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to load question';
      setError(errorMessage);
      console.error('Error loading question:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Load learning paths
  const loadLearningPaths = useCallback(async () => {
    try {
      const response = await apiCall('/api/questions/learning-paths');

      if (response.success) {
        setLearningPaths(response.data);
      } else {
        throw new Error(response.error || 'Failed to load learning paths');
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to load learning paths';
      setError(errorMessage);
      console.error('Error loading learning paths:', err);
    }
  }, []);

  // Load statistics
  const loadStats = useCallback(async () => {
    try {
      const response = await apiCall('/api/questions/stats');

      if (response.success) {
        setStats(response.data);
      } else {
        throw new Error(response.error || 'Failed to load statistics');
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to load statistics';
      setError(errorMessage);
      console.error('Error loading statistics:', err);
    }
  }, []);

  // Create question
  const createQuestion = useCallback(
    async (
      questionData: Omit<UnifiedQuestion, 'id' | 'createdAt' | 'updatedAt'>
    ): Promise<string | null> => {
      setIsCreating(true);
      setError(null);

      try {
        const response = await apiCall('/api/questions/unified', {
          method: 'POST',
          body: JSON.stringify(questionData),
        });

        if (response.success) {
          // Reload questions to include the new one
          await loadQuestions(initialFilters);
          return response.data.id;
        } else {
          throw new Error(response.error || 'Failed to create question');
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to create question';
        setError(errorMessage);
        console.error('Error creating question:', err);
        return null;
      } finally {
        setIsCreating(false);
      }
    },
    [loadQuestions, initialFilters]
  );

  // Update question
  const updateQuestion = useCallback(
    async (id: string, updates: Partial<UnifiedQuestion>) => {
      setIsUpdating(true);
      setError(null);

      try {
        const response = await apiCall(`/api/questions/unified/${id}`, {
          method: 'PUT',
          body: JSON.stringify(updates),
        });

        if (response.success) {
          // Update local state
          setQuestions(prev =>
            prev.map(q => (q.id === id ? { ...q, ...updates } : q))
          );
          if (currentQuestion?.id === id) {
            setCurrentQuestion(prev => (prev ? { ...prev, ...updates } : null));
          }
        } else {
          throw new Error(response.error || 'Failed to update question');
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to update question';
        setError(errorMessage);
        console.error('Error updating question:', err);
      } finally {
        setIsUpdating(false);
      }
    },
    [currentQuestion]
  );

  // Delete question
  const deleteQuestion = useCallback(
    async (id: string) => {
      setIsDeleting(true);
      setError(null);

      try {
        const response = await apiCall(`/api/questions/unified/${id}`, {
          method: 'DELETE',
        });

        if (response.success) {
          // Remove from local state
          setQuestions(prev => prev.filter(q => q.id !== id));
          if (currentQuestion?.id === id) {
            setCurrentQuestion(null);
          }
        } else {
          throw new Error(response.error || 'Failed to delete question');
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to delete question';
        setError(errorMessage);
        console.error('Error deleting question:', err);
      } finally {
        setIsDeleting(false);
      }
    },
    [currentQuestion]
  );

  // Bulk import questions
  const bulkImportQuestions = useCallback(
    async (
      questionsData: BulkQuestionData[]
    ): Promise<{ success: number; failed: number; errors: string[] }> => {
      setIsCreating(true);
      setError(null);

      try {
        const response = await apiCall('/api/questions/unified', {
          method: 'POST',
          body: JSON.stringify({ bulk: true, questions: questionsData }),
        });

        if (response.success) {
          // Reload questions to include the new ones
          await loadQuestions(initialFilters);
          return response.data;
        } else {
          throw new Error(response.error || 'Failed to bulk import questions');
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : 'Failed to bulk import questions';
        setError(errorMessage);
        console.error('Error bulk importing questions:', err);
        return {
          success: 0,
          failed: questionsData.length,
          errors: [errorMessage],
        };
      } finally {
        setIsCreating(false);
      }
    },
    [loadQuestions, initialFilters]
  );

  // Search questions
  const searchQuestions = useCallback(
    async (
      searchTerm: string,
      filters?: UseUnifiedQuestionsOptions['initialFilters']
    ) => {
      setIsLoading(true);
      setError(null);

      try {
        const queryParams = new URLSearchParams();
        queryParams.append('search', searchTerm);

        if (filters) {
          Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
              queryParams.append(key, String(value));
            }
          });
        }

        const url = `/api/questions/unified/search?${queryParams.toString()}`;
        const response = await apiCall(url);

        if (response.success) {
          setQuestions(response.data);
        } else {
          throw new Error(response.error || 'Failed to search questions');
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to search questions';
        setError(errorMessage);
        console.error('Error searching questions:', err);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  // Get random questions
  const getRandomQuestions = useCallback(
    async (
      count: number,
      filters?: UseUnifiedQuestionsOptions['initialFilters']
    ) => {
      setIsLoading(true);
      setError(null);

      try {
        const queryParams = new URLSearchParams();
        queryParams.append('random', 'true');
        queryParams.append('count', String(count));

        if (filters) {
          Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
              queryParams.append(key, String(value));
            }
          });
        }

        const url = `/api/questions/unified?${queryParams.toString()}`;
        const response = await apiCall(url);

        if (response.success) {
          setQuestions(response.data);
        } else {
          throw new Error(response.error || 'Failed to get random questions');
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to get random questions';
        setError(errorMessage);
        console.error('Error getting random questions:', err);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  // Utility functions
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const clearQuestions = useCallback(() => {
    setQuestions([]);
    setCurrentQuestion(null);
  }, []);

  // Auto-load on mount
  useEffect(() => {
    if (autoLoad) {
      loadQuestions(initialFilters);
      loadLearningPaths();
      loadStats();
    }
  }, [autoLoad, loadQuestions, loadLearningPaths, loadStats, initialFilters]);

  return {
    // Data
    questions,
    currentQuestion,
    learningPaths,
    stats,

    // Loading states
    isLoading,
    isCreating,
    isUpdating,
    isDeleting,

    // Error state
    error,

    // Actions
    loadQuestions,
    loadQuestion,
    loadLearningPaths,
    loadStats,
    createQuestion,
    updateQuestion,
    deleteQuestion,
    bulkImportQuestions,
    searchQuestions,
    getRandomQuestions,

    // Utilities
    clearError,
    clearQuestions,
  };
}

export default useUnifiedQuestions;
