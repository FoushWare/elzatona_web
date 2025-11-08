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

export const getQuestionStats = async () => {
  return { total: 0, byCategory: {}, byDifficulty: {} };
};

export const saveQuestionAttempt = async (attempt: {
  question_id: string;
  user_id: string;
  answer: string;
  is_correct: boolean;
}) => {
  // Stub implementation
};

export const getUserQuestionAttempts = async (userId: string) => {
  return [];
};

export const searchQuestions = async (query: string) => {
  return [];
};

export const getQuizQuestions = async (filters?: {
  category?: string;
  difficulty?: string;
  limit?: number;
}) => {
  return [];
};
