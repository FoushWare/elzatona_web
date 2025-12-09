// v1.0 - Unified Questions Hook
// React hook for managing questions from the unified Firebase system

import { useState, useEffect, useCallback } from "react";
import {
  UnifiedQuestion,
  BulkQuestionData,
  QuestionStats,
  LearningPath,
} from "@elzatona/types";

interface UseUnifiedQuestionsOptions {
  autoLoad?: boolean;
  initialFilters?: {
    category?: string;
    subcategory?: string;
    difficulty?: string;
    learningPath?: string;
    topic?: string;
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

  // Pagination state
  currentPage: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;

  // Actions
  loadQuestions: (
    filters?: UseUnifiedQuestionsOptions["initialFilters"],
  ) => Promise<void>;
  loadQuestion: (id: string) => Promise<void>;
  loadLearningPaths: () => Promise<void>;
  loadStats: () => Promise<void>;
  createQuestion: (
    questionData: Omit<UnifiedQuestion, "id" | "createdAt" | "updatedAt">,
  ) => Promise<string | null>;
  updateQuestion: (
    id: string,
    updates: Partial<UnifiedQuestion>,
  ) => Promise<void>;
  deleteQuestion: (id: string) => Promise<void>;
  bulkImportQuestions: (
    questions: BulkQuestionData[],
  ) => Promise<{ success: number; failed: number; errors: string[] }>;
  searchQuestions: (
    searchTerm: string,
    filters?: UseUnifiedQuestionsOptions["initialFilters"],
  ) => Promise<void>;
  getRandomQuestions: (
    count: number,
    filters?: UseUnifiedQuestionsOptions["initialFilters"],
  ) => Promise<void>;

  // Pagination actions
  goToPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  changePageSize: (pageSize: number) => void;

  // Utilities
  clearError: () => void;
  clearQuestions: () => void;
}

export function useUnifiedQuestions(
  options: UseUnifiedQuestionsOptions = {},
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

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrev, setHasPrev] = useState(false);

  // API calls
  const apiCall = useCallback(
    async (url: string, options: RequestInit = {}) => {
      try {
        const response = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
            ...options.headers,
          },
          ...options,
        });

        if (!response.ok) {
          const errorData = await response
            .json()
            .catch(() => ({ error: "Unknown error" }));
          throw new Error(errorData.error || `HTTP ${response.status}`);
        }

        return response.json();
      } catch (err) {
        // Handle Firebase "Target ID already exists" errors gracefully
        if (
          err instanceof Error &&
          err.message.includes("Target ID already exists")
        ) {
          console.warn(
            "Firebase listener conflict, retrying in 500ms...",
            err.message,
          );
          // Wait a bit and retry once
          await new Promise((resolve) => setTimeout(resolve, 500));
          const response = await fetch(url, {
            headers: {
              "Content-Type": "application/json",
              ...options.headers,
            },
            ...options,
          });

          if (!response.ok) {
            const errorData = await response
              .json()
              .catch(() => ({ error: "Unknown error" }));
            throw new Error(errorData.error || `HTTP ${response.status}`);
          }

          return response.json();
        }
        throw err;
      }
    },
    [],
  );

  // Load questions
  const loadQuestions = useCallback(
    async (
      filters?: UseUnifiedQuestionsOptions["initialFilters"],
      page: number = currentPage,
    ) => {
      console.log(
        "🔄 useUnifiedQuestions: loadQuestions called with filters:",
        filters,
        "page:",
        page,
      );
      setIsLoading(true);
      setError(null);

      try {
        const queryParams = new URLSearchParams();

        // Add pagination parameters
        queryParams.append("page", String(page));
        queryParams.append("pageSize", String(pageSize));
        queryParams.append("includePagination", "true");

        if (filters) {
          Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
              queryParams.append(key, String(value));
            }
          });
        }

        const queryString = queryParams.toString();
        const url = `/api/questions/unified${queryString ? `?${queryString}` : ""}`;
        console.log("🔄 useUnifiedQuestions: Making API call to:", url);
        const response = await apiCall(url);
        console.log("🔄 useUnifiedQuestions: API response received:", response);

        if (response.success) {
          console.log(
            "✅ useUnifiedQuestions: Questions loaded successfully:",
            response.data,
          );
          console.log(
            "✅ useUnifiedQuestions: Setting questions with data length:",
            response.data?.length,
          );
          setQuestions(response.data);

          // Update pagination state
          if (response.pagination) {
            setCurrentPage(response.pagination.page);
            setTotalCount(response.pagination.totalCount);
            setTotalPages(response.pagination.totalPages);
            setHasNext(response.pagination.hasNext);
            setHasPrev(response.pagination.hasPrev);
            console.log("📄 Pagination updated:", response.pagination);
          }
        } else {
          console.error(
            "❌ useUnifiedQuestions: Failed to load questions:",
            response.error,
          );
          throw new Error(response.error || "Failed to load questions");
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to load questions";
        setError(errorMessage);
        console.error("Error loading questions:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [apiCall, currentPage, pageSize],
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
        throw new Error(response.error || "Failed to load question");
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to load question";
      setError(errorMessage);
      console.error("Error loading question:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Load learning paths
  const loadLearningPaths = useCallback(async () => {
    try {
      const response = await apiCall("/api/questions/learning-paths");

      if (response.success) {
        setLearningPaths(response.data);
      } else {
        throw new Error(response.error || "Failed to load learning paths");
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to load learning paths";
      setError(errorMessage);
      console.error("Error loading learning paths:", err);
      // Don't throw the error to prevent breaking the component
    }
  }, [apiCall]);

  // Load statistics
  const loadStats = useCallback(async () => {
    try {
      const response = await apiCall("/api/questions/stats");

      if (response.success) {
        setStats(response.data);
      } else {
        throw new Error(response.error || "Failed to load statistics");
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to load statistics";
      setError(errorMessage);
      console.error("Error loading statistics:", err);
      // Don't throw the error to prevent breaking the component
    }
  }, [apiCall]);

  // Create question
  const createQuestion = useCallback(
    async (
      questionData: Omit<UnifiedQuestion, "id" | "createdAt" | "updatedAt">,
    ): Promise<string | null> => {
      setIsCreating(true);
      setError(null);

      try {
        const response = await apiCall("/api/questions/unified", {
          method: "POST",
          body: JSON.stringify(questionData),
        });

        if (response.success) {
          // Reload questions to include the new one
          await loadQuestions(initialFilters);
          return response.data.id;
        } else {
          throw new Error(response.error || "Failed to create question");
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to create question";
        setError(errorMessage);
        console.error("Error creating question:", err);
        return null;
      } finally {
        setIsCreating(false);
      }
    },
    [loadQuestions, initialFilters],
  );

  // Update question
  const updateQuestion = useCallback(
    async (id: string, updates: Partial<UnifiedQuestion>) => {
      setIsUpdating(true);
      setError(null);

      try {
        const response = await apiCall(`/api/questions/unified/${id}`, {
          method: "PUT",
          body: JSON.stringify(updates),
        });

        if (response.success) {
          // Update local state
          setQuestions((prev) =>
            prev.map((q) => (q.id === id ? { ...q, ...updates } : q)),
          );
          if (currentQuestion?.id === id) {
            setCurrentQuestion((prev) =>
              prev ? { ...prev, ...updates } : null,
            );
          }
        } else {
          throw new Error(response.error || "Failed to update question");
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to update question";
        setError(errorMessage);
        console.error("Error updating question:", err);
      } finally {
        setIsUpdating(false);
      }
    },
    [currentQuestion],
  );

  // Delete question
  const deleteQuestion = useCallback(
    async (id: string) => {
      setIsDeleting(true);
      setError(null);

      try {
        const response = await apiCall(`/api/questions/unified/${id}`, {
          method: "DELETE",
        });

        if (response.success) {
          // Remove from local state
          setQuestions((prev) => prev.filter((q) => q.id !== id));
          if (currentQuestion?.id === id) {
            setCurrentQuestion(null);
          }
        } else {
          throw new Error(response.error || "Failed to delete question");
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to delete question";
        setError(errorMessage);
        console.error("Error deleting question:", err);
      } finally {
        setIsDeleting(false);
      }
    },
    [currentQuestion],
  );

  // Bulk import questions
  const bulkImportQuestions = useCallback(
    async (
      questionsData: BulkQuestionData[],
    ): Promise<{ success: number; failed: number; errors: string[] }> => {
      setIsCreating(true);
      setError(null);

      try {
        // Flatten all questions from all BulkQuestionData objects
        const allQuestions = questionsData.flatMap(
          (bulkData) => bulkData.questions,
        );

        console.log("🚀 Sending questions to API:", {
          totalQuestions: allQuestions.length,
          firstQuestion: allQuestions[0]?.title || "No title",
          questionsDataLength: questionsData.length,
        });

        const response = await apiCall("/api/questions/unified", {
          method: "POST",
          body: JSON.stringify({
            questions: allQuestions,
            isBulkImport: true,
          }),
        });

        console.log("📥 API Response:", response);

        if (response.success) {
          // Reload questions to include the new ones
          await loadQuestions(initialFilters);
          return {
            success: response.data?.length || allQuestions.length,
            failed: 0,
            errors: [],
          };
        } else {
          throw new Error(response.error || "Failed to bulk import questions");
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Failed to bulk import questions";
        setError(errorMessage);
        console.error("Error bulk importing questions:", err);
        return {
          success: 0,
          failed: questionsData.flatMap((bd) => bd.questions).length,
          errors: [errorMessage],
        };
      } finally {
        setIsCreating(false);
      }
    },
    [loadQuestions, initialFilters],
  );

  // Search questions
  const searchQuestions = useCallback(
    async (
      searchTerm: string,
      filters?: UseUnifiedQuestionsOptions["initialFilters"],
    ) => {
      setIsLoading(true);
      setError(null);

      try {
        const queryParams = new URLSearchParams();
        queryParams.append("search", searchTerm);

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
          throw new Error(response.error || "Failed to search questions");
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to search questions";
        setError(errorMessage);
        console.error("Error searching questions:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  // Get random questions
  const getRandomQuestions = useCallback(
    async (
      count: number,
      filters?: UseUnifiedQuestionsOptions["initialFilters"],
    ) => {
      setIsLoading(true);
      setError(null);

      try {
        const queryParams = new URLSearchParams();
        queryParams.append("random", "true");
        queryParams.append("count", String(count));

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
          throw new Error(response.error || "Failed to get random questions");
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to get random questions";
        setError(errorMessage);
        console.error("Error getting random questions:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [],
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
    console.log(
      "🔄 useUnifiedQuestions: useEffect called with autoLoad:",
      autoLoad,
    );
    if (autoLoad) {
      console.log(
        "🔄 useUnifiedQuestions: autoLoad is true, calling loadQuestions",
      );

      // Load questions first, then other data with delays to prevent Firebase conflicts
      const loadDataSequentially = async () => {
        try {
          await loadQuestions(initialFilters);

          // Add small delays between API calls to prevent Firebase "Target ID already exists" errors
          setTimeout(() => {
            loadLearningPaths().catch((err) =>
              console.error("Error loading learning paths:", err),
            );
          }, 100);

          setTimeout(() => {
            loadStats().catch((err) =>
              console.error("Error loading stats:", err),
            );
          }, 200);
        } catch (err) {
          console.error("Error in sequential data loading:", err);
        }
      };

      loadDataSequentially();
    }
  }, [autoLoad, loadQuestions, loadLearningPaths, loadStats, initialFilters]);

  // Pagination functions
  const goToPage = useCallback(
    (page: number) => {
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
        loadQuestions(initialFilters, page);
      }
    },
    [totalPages, loadQuestions, initialFilters],
  );

  const nextPage = useCallback(() => {
    if (hasNext) {
      goToPage(currentPage + 1);
    }
  }, [hasNext, currentPage, goToPage]);

  const prevPage = useCallback(() => {
    if (hasPrev) {
      goToPage(currentPage - 1);
    }
  }, [hasPrev, currentPage, goToPage]);

  const changePageSize = useCallback(
    (newPageSize: number) => {
      setPageSize(newPageSize);
      setCurrentPage(1);
      loadQuestions(initialFilters, 1);
    },
    [loadQuestions, initialFilters],
  );

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

    // Pagination state
    currentPage,
    pageSize,
    totalCount,
    totalPages,
    hasNext,
    hasPrev,

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

    // Pagination actions
    goToPage,
    nextPage,
    prevPage,
    changePageSize,

    // Utilities
    clearError,
    clearQuestions,
  };
}

// export default useUnifiedQuestions; // Removed default export, use named export instead
