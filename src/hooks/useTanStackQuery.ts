import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { LearningCard } from '@/types/learning-cards';
import { UnifiedQuestion } from '@/lib/unified-question-schema';

// Temporary type definitions until proper interfaces are created
type LearningPlan = any;
type Category = any;
type Topic = any;
type ApiResponse<T> = { success: boolean; data: T; count?: number };
type PaginatedResponse<T> = { success: boolean; data: T[]; count: number; total: number };

// ============================================================================
// QUERY KEYS - Centralized key management for consistency
// ============================================================================

export const queryKeys = {
  // Learning Cards
  cards: ['cards'] as const,
  card: (id: string) => ['cards', id] as const,
  
  // Learning Plans
  plans: ['plans'] as const,
  plan: (id: string) => ['plans', id] as const,
  
  // Categories
  categories: ['categories'] as const,
  category: (id: string) => ['categories', id] as const,
  categoriesByCard: (cardType: string) => ['categories', 'by-card', cardType] as const,
  
  // Topics
  topics: ['topics'] as const,
  topic: (id: string) => ['topics', id] as const,
  topicsByCategory: (categoryId: string) => ['topics', 'by-category', categoryId] as const,
  
  // Questions
  questions: ['questions'] as const,
  question: (id: string) => ['questions', id] as const,
  questionsByTopic: (topicId: string) => ['questions', 'by-topic', topicId] as const,
  questionsByCategory: (categoryId: string) => ['questions', 'by-category', categoryId] as const,
  questionsByCard: (cardType: string) => ['questions', 'by-card', cardType] as const,
  questionsUnified: ['questions', 'unified'] as const,
  questionsUnifiedById: (id: string) => ['questions', 'unified', id] as const,
  
  // Frontend Tasks
  frontendTasks: ['frontend-tasks'] as const,
  frontendTask: (id: string) => ['frontend-tasks', id] as const,
  
  // Problem Solving Tasks
  problemSolvingTasks: ['problem-solving-tasks'] as const,
  problemSolvingTask: (id: string) => ['problem-solving-tasks', id] as const,
  
  // Admin Stats
  adminStats: ['admin', 'stats'] as const,
} as const;

// ============================================================================
// API FUNCTIONS - Centralized API calls
// ============================================================================

const api = {
  // Generic fetch wrapper with error handling
  async fetch<T>(url: string, options?: RequestInit): Promise<T> {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`API Error: ${response.status} - ${error}`);
    }

    return response.json();
  },

  // Learning Cards
  getCards: () => api.fetch<{ data: LearningCard[]; count: number }>('/api/cards'),
  getCard: (id: string) => api.fetch<LearningCard>(`/api/cards/${id}`),
  createCard: (data: Partial<LearningCard>) => 
    api.fetch<LearningCard>('/api/cards', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  updateCard: (id: string, data: Partial<LearningCard>) =>
    api.fetch<LearningCard>(`/api/cards/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  deleteCard: (id: string) =>
    api.fetch<{ success: boolean }>(`/api/cards/${id}`, {
      method: 'DELETE',
    }),

  // Learning Plans
  getPlans: () => api.fetch<{ data: LearningPlan[]; count: number }>('/api/plans'),
  getPlan: (id: string) => api.fetch<LearningPlan>(`/api/plans/${id}`),
  createPlan: (data: Partial<LearningPlan>) =>
    api.fetch<LearningPlan>('/api/plans', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  updatePlan: (id: string, data: Partial<LearningPlan>) =>
    api.fetch<LearningPlan>(`/api/plans/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  deletePlan: (id: string) =>
    api.fetch<{ success: boolean }>(`/api/plans/${id}`, {
      method: 'DELETE',
    }),

  // Categories
  getCategories: () => api.fetch<{ data: Category[]; count: number }>('/api/categories'),
  getCategory: (id: string) => api.fetch<Category>(`/api/categories/${id}`),
  createCategory: (data: Partial<Category>) =>
    api.fetch<Category>('/api/categories', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  updateCategory: (id: string, data: Partial<Category>) =>
    api.fetch<Category>(`/api/categories/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  deleteCategory: (id: string) =>
    api.fetch<{ success: boolean }>(`/api/categories/${id}`, {
      method: 'DELETE',
    }),

  // Topics
  getTopics: () => api.fetch<{ data: Topic[]; count: number }>('/api/topics'),
  getTopic: (id: string) => api.fetch<Topic>(`/api/topics/${id}`),
  createTopic: (data: Partial<Topic>) =>
    api.fetch<Topic>('/api/topics', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  updateTopic: (id: string, data: Partial<Topic>) =>
    api.fetch<Topic>(`/api/topics/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  deleteTopic: (id: string) =>
    api.fetch<{ success: boolean }>(`/api/topics/${id}`, {
      method: 'DELETE',
    }),

  // Questions
  getQuestions: (params?: {
    cardType?: string;
    category?: string;
    topic?: string;
    difficulty?: string;
    type?: string;
    limit?: number;
  }) => {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString());
        }
      });
    }
    const queryString = searchParams.toString();
    return api.fetch<{ data: UnifiedQuestion[]; count: number }>(
      `/api/questions${queryString ? `?${queryString}` : ''}`
    );
  },
  getQuestion: (id: string) => api.fetch<UnifiedQuestion>(`/api/questions/${id}`),
  getQuestionsByTopic: (topicId: string) =>
    api.fetch<{ data: UnifiedQuestion[]; count: number }>(`/api/questions/by-topic/${topicId}`),
  getQuestionsUnified: (params?: { page?: number; limit?: number }) => {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString());
        }
      });
    }
    const queryString = searchParams.toString();
    return api.fetch<{ data: UnifiedQuestion[]; count: number }>(
      `/api/questions/unified${queryString ? `?${queryString}` : ''}`
    );
  },
  getQuestionUnified: (id: string) =>
    api.fetch<UnifiedQuestion>(`/api/questions/unified/${id}`),
  createQuestion: (data: Partial<UnifiedQuestion>) =>
    api.fetch<UnifiedQuestion>('/api/questions/unified', {
      method: 'POST',
      body: JSON.stringify({ questions: [data] }),
    }),
  updateQuestion: (id: string, data: Partial<UnifiedQuestion>) =>
    api.fetch<UnifiedQuestion>(`/api/questions/unified/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  deleteQuestion: (id: string) =>
    api.fetch<{ success: boolean }>(`/api/questions/unified/${id}`, {
      method: 'DELETE',
    }),

  // Frontend Tasks
  getFrontendTasks: () =>
    api.fetch<{ data: any[]; total: number }>('/api/admin/frontend-tasks'),
  getFrontendTask: (id: string) =>
    api.fetch<any>(`/api/admin/frontend-tasks/${id}`),
  createFrontendTask: (data: any) =>
    api.fetch<any>('/api/admin/frontend-tasks', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  updateFrontendTask: (id: string, data: any) =>
    api.fetch<any>(`/api/admin/frontend-tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  deleteFrontendTask: (id: string) =>
    api.fetch<{ success: boolean }>(`/api/admin/frontend-tasks/${id}`, {
      method: 'DELETE',
    }),

  // Problem Solving Tasks
  getProblemSolvingTasks: () =>
    api.fetch<{ data: any[]; total: number }>('/api/admin/problem-solving'),
  getProblemSolvingTask: (id: string) =>
    api.fetch<any>(`/api/admin/problem-solving/${id}`),
  createProblemSolvingTask: (data: any) =>
    api.fetch<any>('/api/admin/problem-solving', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  updateProblemSolvingTask: (id: string, data: any) =>
    api.fetch<any>(`/api/admin/problem-solving/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  deleteProblemSolvingTask: (id: string) =>
    api.fetch<{ success: boolean }>(`/api/admin/problem-solving/${id}`, {
      method: 'DELETE',
    }),
};

// ============================================================================
// LEARNING CARDS HOOKS
// ============================================================================

export const useCards = () => {
  return useQuery({
    queryKey: queryKeys.cards,
    queryFn: api.getCards,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useCard = (id: string) => {
  return useQuery({
    queryKey: queryKeys.card(id),
    queryFn: () => api.getCard(id),
    enabled: !!id,
  });
};

export const useCreateCard = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: api.createCard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.cards });
    },
  });
};

export const useUpdateCard = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<LearningCard> }) =>
      api.updateCard(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.cards });
      queryClient.invalidateQueries({ queryKey: queryKeys.card(id) });
    },
  });
};

export const useDeleteCard = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: api.deleteCard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.cards });
    },
  });
};

// ============================================================================
// LEARNING PLANS HOOKS
// ============================================================================

export const usePlans = () => {
  return useQuery({
    queryKey: queryKeys.plans,
    queryFn: api.getPlans,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const usePlan = (id: string) => {
  return useQuery({
    queryKey: queryKeys.plan(id),
    queryFn: () => api.getPlan(id),
    enabled: !!id,
  });
};

export const useCreatePlan = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: api.createPlan,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.plans });
    },
  });
};

export const useUpdatePlan = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<LearningPlan> }) =>
      api.updatePlan(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.plans });
      queryClient.invalidateQueries({ queryKey: queryKeys.plan(id) });
    },
  });
};

export const useDeletePlan = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: api.deletePlan,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.plans });
    },
  });
};

// ============================================================================
// CATEGORIES HOOKS
// ============================================================================

export const useCategories = () => {
  return useQuery({
    queryKey: queryKeys.categories,
    queryFn: api.getCategories,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useCategory = (id: string) => {
  return useQuery({
    queryKey: queryKeys.category(id),
    queryFn: () => api.getCategory(id),
    enabled: !!id,
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: api.createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.categories });
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Category> }) =>
      api.updateCategory(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.categories });
      queryClient.invalidateQueries({ queryKey: queryKeys.category(id) });
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: api.deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.categories });
    },
  });
};

// ============================================================================
// TOPICS HOOKS
// ============================================================================

export const useTopics = () => {
  return useQuery({
    queryKey: queryKeys.topics,
    queryFn: api.getTopics,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useTopic = (id: string) => {
  return useQuery({
    queryKey: queryKeys.topic(id),
    queryFn: () => api.getTopic(id),
    enabled: !!id,
  });
};

export const useCreateTopic = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: api.createTopic,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.topics });
    },
  });
};

export const useUpdateTopic = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Topic> }) =>
      api.updateTopic(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.topics });
      queryClient.invalidateQueries({ queryKey: queryKeys.topic(id) });
    },
  });
};

export const useDeleteTopic = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: api.deleteTopic,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.topics });
    },
  });
};

// ============================================================================
// QUESTIONS HOOKS
// ============================================================================

export const useQuestions = (params?: {
  cardType?: string;
  category?: string;
  topic?: string;
  difficulty?: string;
  type?: string;
  limit?: number;
}) => {
  return useQuery({
    queryKey: [...queryKeys.questions, params],
    queryFn: () => api.getQuestions(params),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useQuestion = (id: string) => {
  return useQuery({
    queryKey: queryKeys.question(id),
    queryFn: () => api.getQuestion(id),
    enabled: !!id,
  });
};

export const useQuestionsByTopic = (topicId: string) => {
  return useQuery({
    queryKey: queryKeys.questionsByTopic(topicId),
    queryFn: () => api.getQuestionsByTopic(topicId),
    enabled: !!topicId,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useQuestionsUnified = (params?: { page?: number; limit?: number }) => {
  return useQuery({
    queryKey: [...queryKeys.questionsUnified, params],
    queryFn: () => api.getQuestionsUnified(params),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useQuestionUnified = (id: string) => {
  return useQuery({
    queryKey: queryKeys.questionsUnifiedById(id),
    queryFn: () => api.getQuestionUnified(id),
    enabled: !!id,
  });
};

export const useCreateQuestion = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: api.createQuestion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.questions });
      queryClient.invalidateQueries({ queryKey: queryKeys.questionsUnified });
    },
  });
};

export const useUpdateQuestion = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<UnifiedQuestion> }) =>
      api.updateQuestion(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.questions });
      queryClient.invalidateQueries({ queryKey: queryKeys.question(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.questionsUnified });
      queryClient.invalidateQueries({ queryKey: queryKeys.questionsUnifiedById(id) });
    },
  });
};

export const useDeleteQuestion = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: api.deleteQuestion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.questions });
      queryClient.invalidateQueries({ queryKey: queryKeys.questionsUnified });
    },
  });
};

// ============================================================================
// FRONTEND TASKS HOOKS
// ============================================================================

export const useFrontendTasks = () => {
  return useQuery({
    queryKey: queryKeys.frontendTasks,
    queryFn: api.getFrontendTasks,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useFrontendTask = (id: string) => {
  return useQuery({
    queryKey: queryKeys.frontendTask(id),
    queryFn: () => api.getFrontendTask(id),
    enabled: !!id,
  });
};

export const useCreateFrontendTask = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: api.createFrontendTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.frontendTasks });
    },
  });
};

export const useUpdateFrontendTask = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      api.updateFrontendTask(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.frontendTasks });
      queryClient.invalidateQueries({ queryKey: queryKeys.frontendTask(id) });
    },
  });
};

export const useDeleteFrontendTask = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: api.deleteFrontendTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.frontendTasks });
    },
  });
};

// ============================================================================
// PROBLEM SOLVING TASKS HOOKS
// ============================================================================

export const useProblemSolvingTasks = () => {
  return useQuery({
    queryKey: queryKeys.problemSolvingTasks,
    queryFn: api.getProblemSolvingTasks,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useProblemSolvingTask = (id: string) => {
  return useQuery({
    queryKey: queryKeys.problemSolvingTask(id),
    queryFn: () => api.getProblemSolvingTask(id),
    enabled: !!id,
  });
};

export const useCreateProblemSolvingTask = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: api.createProblemSolvingTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.problemSolvingTasks });
    },
  });
};

export const useUpdateProblemSolvingTask = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      api.updateProblemSolvingTask(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.problemSolvingTasks });
      queryClient.invalidateQueries({ queryKey: queryKeys.problemSolvingTask(id) });
    },
  });
};

export const useDeleteProblemSolvingTask = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: api.deleteProblemSolvingTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.problemSolvingTasks });
    },
  });
};

// ============================================================================
// ADMIN STATS HOOKS
// ============================================================================

export const useAdminStats = () => {
  return useQuery({
    queryKey: queryKeys.adminStats,
    queryFn: async () => {
      const [questionsRes, categoriesRes, topicsRes, cardsRes, plansRes, frontendTasksRes, problemSolvingRes] = await Promise.all([
        api.fetch<{ count: number }>('/api/questions').catch(() => ({ count: 0 })),
        api.fetch<{ count: number }>('/api/categories').catch(() => ({ count: 0 })),
        api.fetch<{ count: number }>('/api/topics').catch(() => ({ count: 0 })),
        api.fetch<{ count: number }>('/api/cards').catch(() => ({ count: 0 })),
        api.fetch<{ count: number }>('/api/plans').catch(() => ({ count: 0 })),
        api.fetch<{ total: number }>('/api/admin/frontend-tasks').catch(() => ({ total: 0 })),
        api.fetch<{ total: number }>('/api/admin/problem-solving').catch(() => ({ total: 0 })),
      ]);

      return {
        questions: questionsRes.count || 0,
        categories: categoriesRes.count || 0,
        topics: topicsRes.count || 0,
        learningCards: cardsRes.count || 0,
        learningPlans: plansRes.count || 0,
        frontendTasks: frontendTasksRes.total || 0,
        problemSolvingTasks: problemSolvingRes.total || 0,
      };
    },
    staleTime: 1 * 60 * 1000, // 1 minute
  });
};

// ============================================================================
// UTILITY HOOKS
// ============================================================================

// Hook to prefetch related data
export const usePrefetchRelatedData = () => {
  const queryClient = useQueryClient();

  const prefetchCardData = async (cardType: string) => {
    await Promise.all([
      queryClient.prefetchQuery({
        queryKey: queryKeys.categoriesByCard(cardType),
        queryFn: () => api.getCategories(),
        staleTime: 5 * 60 * 1000,
      }),
      queryClient.prefetchQuery({
        queryKey: queryKeys.questionsByCard(cardType),
        queryFn: () => api.getQuestions({ cardType }),
        staleTime: 2 * 60 * 1000,
      }),
    ]);
  };

  const prefetchCategoryData = async (categoryId: string) => {
    await Promise.all([
      queryClient.prefetchQuery({
        queryKey: queryKeys.topicsByCategory(categoryId),
        queryFn: () => api.getTopics(),
        staleTime: 5 * 60 * 1000,
      }),
      queryClient.prefetchQuery({
        queryKey: queryKeys.questionsByCategory(categoryId),
        queryFn: () => api.getQuestions({ category: categoryId }),
        staleTime: 2 * 60 * 1000,
      }),
    ]);
  };

  return {
    prefetchCardData,
    prefetchCategoryData,
  };
};

// Hook for optimistic updates
export const useOptimisticUpdate = <T>(
  queryKey: readonly unknown[],
  updateFn: (oldData: T, newData: Partial<T>) => T
) => {
  const queryClient = useQueryClient();

  const optimisticUpdate = (newData: Partial<T>) => {
    queryClient.setQueryData(queryKey, (old: T | undefined) => {
      if (!old) return old;
      return updateFn(old, newData);
    });
  };

  return optimisticUpdate;
};
