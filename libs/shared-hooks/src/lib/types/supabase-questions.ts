// Type definitions for supabase-questions service
// These types are used by shared-hooks but the service is app-specific

export interface QuestionOption {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation?: string;
}

export interface Question {
  id: string;
  title: string;
  content: string;
  question_type: 'multiple-choice' | 'open-ended' | 'code';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  topic_id: string;
  tags: string[];
  options?: QuestionOption[];
  correct_answer: string;
  explanation: string;
  learning_card_id?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface QuestionCategory {
  id: string;
  name: string;
  description?: string;
  order_index?: number;
}

export interface QuestionAttempt {
  id: string;
  question_id: string;
  user_id: string;
  answer: string;
  is_correct: boolean;
  timestamp: string;
}

export const getQuestions = async (filters?: {
  category?: string;
  difficulty?: string;
  tags?: string[];
  limit?: number;
  offset?: number;
}): Promise<Question[]> => {
  return [];
};

export const getQuestion = async (id: string): Promise<Question | null> => {
  return null;
};

export const getRandomQuestions = async (
  count: number,
  filters?: {
    category?: string;
    difficulty?: string;
  }
): Promise<Question[]> => {
  return [];
};

export const getCategories = async (): Promise<QuestionCategory[]> => {
  return [];
};

export const getQuestionStats = async (): Promise<{
  totalQuestions: number;
  questionsByCategory: Record<string, number>;
  questionsByDifficulty: Record<string, number>;
  questionsByLearningPath: Record<string, number>;
  questionsBySection: Record<string, number>;
  activeQuestions: number;
  inactiveQuestions: number;
  averageDifficulty: number;
  lastUpdated: string;
  topCategories: Array<{
    category: string;
    count: number;
    percentage: number;
  }>;
  recentActivity: Array<{
    date: string;
    questionsAdded: number;
    questionsUpdated: number;
    questionsDeleted: number;
  }>;
}> => {
  return {
    totalQuestions: 0,
    questionsByCategory: {},
    questionsByDifficulty: {},
    questionsByLearningPath: {},
    questionsBySection: {},
    activeQuestions: 0,
    inactiveQuestions: 0,
    averageDifficulty: 0,
    lastUpdated: new Date().toISOString(),
    topCategories: [],
    recentActivity: [],
  };
};

export const saveQuestionAttempt = async (attempt: {
  question_id: string;
  user_id: string;
  answer: string;
  is_correct: boolean;
  time_spent?: number;
}) => {
  // Stub implementation
};

export const getUserQuestionAttempts = async (
  userId: string,
  questionId?: string
) => {
  return [];
};

export const searchQuestions = async (
  query: string,
  filters?: {
    category?: string;
    difficulty?: string;
    tags?: string[];
  }
) => {
  return [];
};

export const getQuizQuestions = async (
  count: number,
  filters?: {
    category?: string;
    difficulty?: string;
    tags?: string[];
  }
) => {
  return [];
};
