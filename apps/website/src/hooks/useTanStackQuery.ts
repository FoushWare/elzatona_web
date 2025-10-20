import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { LearningCard } from '@/types/learning-cards';
import { UnifiedQuestion } from '@/lib/unified-question-schema';

// Temporary type definitions until proper interfaces are created
type LearningPlan = any;
type Category = any;
type Topic = any;
type ApiResponse<T> = { success: boolean; data: T; count?: number };
type PaginatedResponse<T> = {
  success: boolean;
  data: T[];
  count: number;
  total: number;
};

interface AdminStats {
  questions: number;
  categories: number;
  topics: number;
  learningCards: number;
  learningPlans: number;
  frontendTasks: number;
  problemSolvingTasks: number;
  totalContent: number;
  totalUsers: number;
  recentErrors?: Array<{
    id: string;
    message: string;
    error: string;
    source: string;
    timestamp: string;
    severity: string;
  }>;
  recentActivity: Array<{
    id: string;
    action: string;
    timestamp: any;
    user: string;
    details: string;
  }>;
  systemHealth: {
    databaseConnected: boolean;
    lastUpdated: string;
    apiResponseTime: number;
    uptime: string;
    activeCollections: number;
    totalCollections: number;
  };
  performanceMetrics?: {
    averageResponseTime: number;
    totalRequests: number;
    errorRate: number;
    cacheHitRate: number;
    memoryUsage: string;
    cpuUsage: string;
  };
  analytics?: {
    userEngagement?: {
      activeUsers: number;
      totalSessions: number;
      averageSessionDuration: number;
      completionRate: number;
    };
    contentQuality?: {
      questionsWithExplanations: number;
      questionsWithHints: number;
      questionsWithSampleAnswers: number;
      averageQuestionRating: number;
      averageQuestionLength: number;
      totalReviews: number;
    };
  };
}

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
  categoriesByCard: (cardType: string) =>
    ['categories', 'by-card', cardType] as const,

  // Topics
  topics: ['topics'] as const,
  topic: (id: string) => ['topics', id] as const,
  topicsByCategory: (categoryId: string) =>
    ['topics', 'by-category', categoryId] as const,

  // Questions
  questions: ['questions'] as const,
  question: (id: string) => ['questions', id] as const,
  questionsByTopic: (topicId: string) =>
    ['questions', 'by-topic', topicId] as const,
  questionsByCategory: (categoryId: string) =>
    ['questions', 'by-category', categoryId] as const,
  questionsByCard: (cardType: string) =>
    ['questions', 'by-card', cardType] as const,
  questionsUnified: ['questions', 'unified'] as const,
  questionsUnifiedById: (id: string) => ['questions', 'unified', id] as const,

  // Frontend Tasks
  frontendTasks: ['frontend-tasks'] as const,
  frontendTask: (id: string) => ['frontend-tasks', id] as const,

  // Problem Solving Tasks
  problemSolvingTasks: ['problem-solving-tasks'] as const,
  problemSolvingTask: (id: string) => ['problem-solving-tasks', id] as const,

  // Learning Paths
  learningPaths: ['learning-paths'] as const,
  learningPath: (id: string) => ['learning-paths', id] as const,

  // Questions by Learning Path
  questionsByLearningPath: (learningPath: string) =>
    ['questions-by-learning-path', learningPath] as const,

  // Admin Stats
  adminStats: ['admin', 'stats'] as const,

  // Bulk Operations
  bulkOperations: ['bulk-operations'] as const,
  bulkOperation: (id: string) => ['bulk-operations', id] as const,
  bulkOperationStats: ['bulk-operations', 'stats'] as const,
  bulkOperationProgress: (operationId: string) =>
    ['bulk-operations', 'progress', operationId] as const,

  // Audit Logs
  auditLogs: ['audit-logs'] as const,
  auditLogStats: ['audit-log-stats'] as const,

  // User Analytics
  userProgress: (userId: string) => ['analytics', 'progress', userId] as const,
  userAnalytics: (userId: string) => ['analytics', 'user', userId] as const,
  userInsights: (userId: string) => ['analytics', 'insights', userId] as const,
  systemAnalytics: ['analytics', 'system'] as const,

  // Backup Operations
  backups: ['backups'] as const,
  backupStats: ['backup-stats'] as const,
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
  getCards: async () => {
    const response = await api.fetch<{
      success: boolean;
      data: LearningCard[];
      count: number;
    }>('/api/cards');
    return { data: response.data, count: response.count };
  },
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
  getPlans: async () => {
    const response = await api.fetch<{
      success: boolean;
      data: LearningPlan[];
      count: number;
    }>('/api/plans');
    return { data: response.data, count: response.count };
  },
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
  getCategories: async () => {
    const response = await api.fetch<{
      success: boolean;
      data: Category[];
      count: number;
    }>('/api/categories');
    return { data: response.data, count: response.count };
  },
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
  getTopics: async () => {
    const response = await api.fetch<{
      success: boolean;
      data: Topic[];
      count: number;
    }>('/api/topics');
    return { data: response.data, count: response.count };
  },
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
  getQuestions: async (params?: {
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
    const response = await api.fetch<{
      success: boolean;
      data: UnifiedQuestion[];
      count: number;
    }>(`/api/questions${queryString ? `?${queryString}` : ''}`);
    return { data: response.data, count: response.count };
  },
  getQuestion: (id: string) =>
    api.fetch<UnifiedQuestion>(`/api/questions/${id}`),
  getQuestionsByTopic: async (topicId: string) => {
    const response = await api.fetch<{
      success: boolean;
      data: UnifiedQuestion[];
      count: number;
    }>(`/api/questions/by-topic/${topicId}`);
    return { data: response.data, count: response.count };
  },
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
    const url = `/api/questions/unified${queryString ? `?${queryString}` : ''}`;
    console.log('API Debug - getQuestionsUnified:', { params, url });
    return api.fetch<{
      data: UnifiedQuestion[];
      pagination: { totalCount: number };
    }>(url);
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

  // Learning Paths
  getLearningPaths: () =>
    api.fetch<{ success: boolean; data: any[] }>('/api/learning-paths'),
  getLearningPath: (id: string) => api.fetch<any>(`/api/learning-paths/${id}`),

  // Questions by Learning Path
  getQuestionsByLearningPath: (learningPath: string) =>
    api.fetch<{ success: boolean; questions: any[] }>(
      `/api/questions/by-learning-path/${learningPath}`
    ),

  // Backup Operations

  // Bulk Operations
  bulkDelete: (
    type: 'cards' | 'plans' | 'categories' | 'topics' | 'questions',
    ids: string[]
  ) =>
    api.fetch<{
      success: boolean;
      operation: any;
    }>('/api/admin/bulk-operations', {
      method: 'POST',
      body: JSON.stringify({
        type: 'delete',
        targetType: type,
        targetIds: ids,
      }),
    }),
  bulkEdit: (
    type: 'cards' | 'plans' | 'categories' | 'topics' | 'questions',
    ids: string[],
    updates: Record<string, any>
  ) =>
    api.fetch<{
      success: boolean;
      operation: any;
    }>('/api/admin/bulk-operations', {
      method: 'POST',
      body: JSON.stringify({
        type: 'edit',
        targetType: type,
        targetIds: ids,
        operationData: updates,
      }),
    }),
  bulkActivate: (
    type: 'cards' | 'plans' | 'categories' | 'topics' | 'questions',
    ids: string[]
  ) =>
    api.fetch<{
      success: boolean;
      operation: any;
    }>('/api/admin/bulk-operations', {
      method: 'POST',
      body: JSON.stringify({
        type: 'activate',
        targetType: type,
        targetIds: ids,
      }),
    }),
  bulkDeactivate: (
    type: 'cards' | 'plans' | 'categories' | 'topics' | 'questions',
    ids: string[]
  ) =>
    api.fetch<{
      success: boolean;
      operation: any;
    }>('/api/admin/bulk-operations', {
      method: 'POST',
      body: JSON.stringify({
        type: 'deactivate',
        targetType: type,
        targetIds: ids,
      }),
    }),
  getBulkOperations: (limit?: number) =>
    api.fetch<{
      success: boolean;
      operations: any[];
    }>(`/api/admin/bulk-operations${limit ? `?limit=${limit}` : ''}`),
  getBulkOperation: (operationId: string) =>
    api.fetch<{
      success: boolean;
      operation: any;
    }>(`/api/admin/bulk-operations/${operationId}`),
  getBulkOperationStats: () =>
    api.fetch<{
      success: boolean;
      stats: any;
    }>('/api/admin/bulk-operations/stats'),
  getBulkOperationProgress: (operationId: string) =>
    api.fetch<{ success: boolean; progress: any }>(
      `/api/admin/bulk-operations/${operationId}`
    ),
  cancelBulkOperation: (operationId: string) =>
    api.fetch<{ success: boolean }>(
      `/api/admin/bulk-operations/${operationId}`,
      {
        method: 'DELETE',
      }
    ),

  // Audit Logs
  getAuditLogs: (contentId?: string, contentType?: string, limit?: number) => {
    const params = new URLSearchParams();
    if (contentId) params.append('contentId', contentId);
    if (contentType) params.append('contentType', contentType);
    if (limit) params.append('limit', limit.toString());
    return api.fetch<{
      success: boolean;
      logs: any[];
      summary: any;
      count: number;
    }>(`/api/admin/audit-logs?${params}`);
  },
  getAuditLogStats: (days?: number) => {
    const params = new URLSearchParams();
    if (days) params.append('days', days.toString());
    return api.fetch<{ success: boolean; stats: any }>(
      `/api/admin/audit-logs/stats?${params}`
    );
  },

  // User Analytics
  trackProgress: (data: {
    userId: string;
    userEmail: string;
    contentType: string;
    contentId: string;
    contentName: string;
    status: string;
    progress?: number;
    timeSpent?: number;
    score?: number;
    metadata?: any;
  }) =>
    api.fetch<{ success: boolean; progressId: string }>(
      '/api/analytics/progress',
      {
        method: 'POST',
        body: JSON.stringify(data),
      }
    ),
  getUserProgress: (userId: string, contentId?: string) => {
    const params = new URLSearchParams();
    params.append('userId', userId);
    if (contentId) params.append('contentId', contentId);
    return api.fetch<{ success: boolean; data: any; count: number }>(
      `/api/analytics/progress?${params}`
    );
  },
  startSession: (data: {
    userId: string;
    userEmail: string;
    sessionType: string;
    learningPath?: string;
    metadata?: any;
  }) =>
    api.fetch<{ success: boolean; sessionId: string }>(
      '/api/analytics/sessions',
      {
        method: 'POST',
        body: JSON.stringify(data),
      }
    ),
  endSession: (
    sessionId: string,
    data: {
      contentCompleted?: string[];
      totalQuestions?: number;
      correctAnswers?: number;
      averageScore?: number;
    }
  ) =>
    api.fetch<{ success: boolean }>(`/api/analytics/sessions/${sessionId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  getUserAnalytics: (userId: string, regenerate?: boolean) => {
    const params = new URLSearchParams();
    if (regenerate) params.append('regenerate', 'true');
    return api.fetch<{ success: boolean; analytics: any }>(
      `/api/analytics/user/${userId}?${params}`
    );
  },
  getUserInsights: (userId: string) =>
    api.fetch<{ success: boolean; insights: any }>(
      `/api/analytics/insights/${userId}`
    ),
  getSystemAnalytics: () =>
    api.fetch<{ success: boolean; analytics: any }>('/api/analytics/system'),

  // Backup Operations
  getBackups: () =>
    api.fetch<{ success: boolean; data: any[] }>('/api/admin/backups'),
  getBackupStats: () =>
    api.fetch<{ success: boolean; stats: any }>('/api/admin/backup-stats'),
  createBackup: (name: string, description: string) =>
    api.fetch<{ success: boolean; backupId: string }>('/api/admin/backups', {
      method: 'POST',
      body: JSON.stringify({ name, description }),
    }),
  restoreBackup: (backupId: string, options?: any) =>
    api.fetch<{ success: boolean }>(`/api/admin/backups/${backupId}/restore`, {
      method: 'POST',
      body: JSON.stringify(options),
    }),
  deleteBackup: (backupId: string) =>
    api.fetch<{ success: boolean }>(`/api/admin/backups/${backupId}`, {
      method: 'DELETE',
    }),
  scheduleBackup: (schedule: any) =>
    api.fetch<{ success: boolean }>('/api/admin/backup-schedule', {
      method: 'POST',
      body: JSON.stringify(schedule),
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
    refetchOnMount: true, // Always refetch on mount
    refetchOnWindowFocus: false, // Don't refetch on window focus
    retry: 3, // Retry failed requests 3 times
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
    refetchOnMount: true, // Always refetch on mount
    refetchOnWindowFocus: false, // Don't refetch on window focus
    retry: 3, // Retry failed requests 3 times
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
    refetchOnMount: true, // Always refetch on mount
    refetchOnWindowFocus: false, // Don't refetch on window focus
    retry: 3, // Retry failed requests 3 times
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
    refetchOnMount: true, // Always refetch on mount
    refetchOnWindowFocus: false, // Don't refetch on window focus
    retry: 3, // Retry failed requests 3 times
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

export const useQuestionsUnified = (params?: {
  page?: number;
  limit?: number;
}) => {
  return useQuery({
    queryKey: [...queryKeys.questionsUnified, params],
    queryFn: () => api.getQuestionsUnified(params),
    staleTime: 2 * 60 * 1000, // 2 minutes
    refetchOnMount: true, // Always refetch on mount
    refetchOnWindowFocus: false, // Don't refetch on window focus
    retry: 3, // Retry failed requests 3 times
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
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<UnifiedQuestion>;
    }) => api.updateQuestion(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.questions });
      queryClient.invalidateQueries({ queryKey: queryKeys.question(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.questionsUnified });
      queryClient.invalidateQueries({
        queryKey: queryKeys.questionsUnifiedById(id),
      });
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
      queryClient.invalidateQueries({
        queryKey: queryKeys.problemSolvingTasks,
      });
    },
  });
};

export const useUpdateProblemSolvingTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      api.updateProblemSolvingTask(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.problemSolvingTasks,
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.problemSolvingTask(id),
      });
    },
  });
};

export const useDeleteProblemSolvingTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.deleteProblemSolvingTask,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.problemSolvingTasks,
      });
    },
  });
};

// ============================================================================
// LEARNING PATHS HOOKS
// ============================================================================

export const useLearningPaths = () => {
  return useQuery({
    queryKey: queryKeys.learningPaths,
    queryFn: api.getLearningPaths,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useLearningPath = (id: string) => {
  return useQuery({
    queryKey: queryKeys.learningPath(id),
    queryFn: () => api.getLearningPath(id),
    enabled: !!id,
  });
};

// ============================================================================
// QUESTIONS BY LEARNING PATH HOOKS
// ============================================================================

export const useQuestionsByLearningPath = (learningPath: string) => {
  return useQuery({
    queryKey: queryKeys.questionsByLearningPath(learningPath),
    queryFn: () => api.getQuestionsByLearningPath(learningPath),
    enabled: !!learningPath,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// ============================================================================
// ADMIN STATS HOOKS
// ============================================================================

export const useAdminStats = () => {
  return useQuery({
    queryKey: queryKeys.adminStats,
    queryFn: () => api.fetch<AdminStats>('/api/admin/stats'),
    staleTime: 1 * 60 * 1000, // 1 minute
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    retry: 3,
  });
};

// ============================================================================
// BACKUP HOOKS
// ============================================================================

export const useBackups = () => {
  return useQuery({
    queryKey: queryKeys.backups,
    queryFn: api.getBackups,
    staleTime: 2 * 60 * 1000, // 2 minutes
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    retry: 3,
  });
};

export const useBackupStats = () => {
  return useQuery({
    queryKey: queryKeys.backupStats,
    queryFn: api.getBackupStats,
    staleTime: 1 * 60 * 1000, // 1 minute
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    retry: 3,
  });
};

export const useCreateBackup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      name,
      description,
    }: {
      name: string;
      description: string;
    }) => api.createBackup(name, description),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.backups });
      queryClient.invalidateQueries({ queryKey: queryKeys.backupStats });
    },
  });
};

export const useRestoreBackup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ backupId, options }: { backupId: string; options?: any }) =>
      api.restoreBackup(backupId, options),
    onSuccess: () => {
      // Invalidate all queries since data has been restored
      queryClient.invalidateQueries();
    },
  });
};

export const useDeleteBackup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (backupId: string) => api.deleteBackup(backupId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.backups });
      queryClient.invalidateQueries({ queryKey: queryKeys.backupStats });
    },
  });
};

export const useScheduleBackup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (schedule: 'daily' | 'weekly' | 'monthly') =>
      api.scheduleBackup(schedule),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.backupStats });
    },
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

// ============================================================================
// BULK OPERATIONS HOOKS
// ============================================================================

export const useBulkDelete = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      type,
      ids,
    }: {
      type: 'cards' | 'plans' | 'categories' | 'topics' | 'questions';
      ids: string[];
    }) => api.bulkDelete(type, ids),
    onSuccess: (_, { type }) => {
      // Invalidate relevant queries based on type
      queryClient.invalidateQueries({ queryKey: queryKeys[type] });
      queryClient.invalidateQueries({ queryKey: queryKeys.adminStats });
      queryClient.invalidateQueries({ queryKey: queryKeys.bulkOperations });
    },
  });
};

export const useBulkEdit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      type,
      ids,
      updates,
    }: {
      type: 'cards' | 'plans' | 'categories' | 'topics' | 'questions';
      ids: string[];
      updates: Record<string, any>;
    }) => api.bulkEdit(type, ids, updates),
    onSuccess: (_, { type }) => {
      // Invalidate relevant queries based on type
      queryClient.invalidateQueries({ queryKey: queryKeys[type] });
      queryClient.invalidateQueries({ queryKey: queryKeys.adminStats });
      queryClient.invalidateQueries({ queryKey: queryKeys.bulkOperations });
    },
  });
};

export const useBulkActivate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      type,
      ids,
    }: {
      type: 'cards' | 'plans' | 'categories' | 'topics' | 'questions';
      ids: string[];
    }) => api.bulkActivate(type, ids),
    onSuccess: (_, { type }) => {
      // Invalidate relevant queries based on type
      queryClient.invalidateQueries({ queryKey: queryKeys[type] });
      queryClient.invalidateQueries({ queryKey: queryKeys.adminStats });
      queryClient.invalidateQueries({ queryKey: queryKeys.bulkOperations });
    },
  });
};

export const useBulkDeactivate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      type,
      ids,
    }: {
      type: 'cards' | 'plans' | 'categories' | 'topics' | 'questions';
      ids: string[];
    }) => api.bulkDeactivate(type, ids),
    onSuccess: (_, { type }) => {
      // Invalidate relevant queries based on type
      queryClient.invalidateQueries({ queryKey: queryKeys[type] });
      queryClient.invalidateQueries({ queryKey: queryKeys.adminStats });
      queryClient.invalidateQueries({ queryKey: queryKeys.bulkOperations });
    },
  });
};

export const useBulkOperations = (limit?: number) => {
  return useQuery({
    queryKey: queryKeys.bulkOperations,
    queryFn: () => api.getBulkOperations(limit),
  });
};

export const useBulkOperation = (operationId: string) => {
  return useQuery({
    queryKey: queryKeys.bulkOperation(operationId),
    queryFn: () => api.getBulkOperation(operationId),
    enabled: !!operationId,
  });
};

export const useBulkOperationStats = () => {
  return useQuery({
    queryKey: queryKeys.bulkOperationStats,
    queryFn: api.getBulkOperationStats,
  });
};

export const useBulkOperationProgress = (operationId: string) => {
  return useQuery({
    queryKey: queryKeys.bulkOperation(operationId),
    queryFn: () => api.getBulkOperation(operationId),
    enabled: !!operationId,
    refetchInterval: 1000, // Poll every second for progress updates
  });
};

export const useCancelBulkOperation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (operationId: string) => api.cancelBulkOperation(operationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.bulkOperations });
    },
  });
};

// ============================================================================
// AUDIT LOGS HOOKS
// ============================================================================

export const useAuditLogs = (
  contentId?: string,
  contentType?: string,
  limit?: number
) => {
  return useQuery({
    queryKey: queryKeys.auditLogs,
    queryFn: () => api.getAuditLogs(contentId, contentType, limit),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useAuditLogStats = (days?: number) => {
  return useQuery({
    queryKey: queryKeys.auditLogStats,
    queryFn: () => api.getAuditLogStats(days),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// ============================================================================
// USER ANALYTICS HOOKS
// ============================================================================

export const useTrackProgress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.trackProgress,
    onSuccess: () => {
      // Invalidate user progress queries
      queryClient.invalidateQueries({ queryKey: ['analytics', 'progress'] });
    },
  });
};

export const useUserProgress = (userId: string, contentId?: string) => {
  return useQuery({
    queryKey: queryKeys.userProgress(userId),
    queryFn: () => api.getUserProgress(userId, contentId),
    enabled: !!userId,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useStartSession = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.startSession,
    onSuccess: () => {
      // Invalidate user analytics queries
      queryClient.invalidateQueries({ queryKey: ['analytics', 'user'] });
    },
  });
};

export const useEndSession = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ sessionId, data }: { sessionId: string; data: any }) =>
      api.endSession(sessionId, data),
    onSuccess: () => {
      // Invalidate user analytics queries
      queryClient.invalidateQueries({ queryKey: ['analytics', 'user'] });
    },
  });
};

export const useUserAnalytics = (userId: string, regenerate?: boolean) => {
  return useQuery({
    queryKey: queryKeys.userAnalytics(userId),
    queryFn: () => api.getUserAnalytics(userId, regenerate),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useUserInsights = (userId: string) => {
  return useQuery({
    queryKey: queryKeys.userInsights(userId),
    queryFn: () => api.getUserInsights(userId),
    enabled: !!userId,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useSystemAnalytics = () => {
  return useQuery({
    queryKey: queryKeys.systemAnalytics,
    queryFn: api.getSystemAnalytics,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
