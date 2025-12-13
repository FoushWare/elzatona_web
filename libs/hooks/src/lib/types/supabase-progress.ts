// Type definitions for supabase-progress service
// These types are used by shared-hooks but the service is app-specific

export interface UserProgress {
  id: string;
  user_id: string;
  total_points: number;
  current_streak: number;
  longest_streak: number;
  total_questions_answered: number;
  total_correct_answers: number;
  total_time_spent: number;
  level: number;
  experience_points: number;
  badges: string[];
  achievements: string[];
  preferences: {
    difficulty: "beginner" | "intermediate" | "advanced";
    topics: string[];
    notifications: boolean;
    theme: "light" | "dark" | "auto";
    language: string;
  };
  created_at: string;
  updated_at: string;
}

export interface QuestionAttempt {
  id: string;
  question_id: string;
  user_id: string;
  answer: string;
  is_correct: boolean;
  time_spent: number;
  created_at: string;
}

export interface ChallengeAttempt {
  id: string;
  challenge_id: string;
  user_id: string;
  score: number;
  completed: boolean;
  created_at: string;
}

export interface DashboardStats {
  totalQuestions: number;
  correctAnswers: number;
  streak: number;
  totalTimeSpent: number;
  averageScore: number;
  completedChallenges: number;
  learningPathsCompleted: number;
}

export const getUserProgress = async (
  _userId: string,
): Promise<UserProgress | null> => {
  return null;
};

export const saveProgress = async (
  _progress: Omit<UserProgress, "id" | "created_at" | "updated_at">,
): Promise<UserProgress> => {
  throw new Error("Not implemented");
};

export const updateQuestionProgress = async (
  _userId: string,
  _attempt: Omit<QuestionAttempt, "timestamp" | "points">,
): Promise<void> => {
  // Stub implementation
};

export const updateChallengeProgress = async (
  _userId: string,
  _attempt: Omit<ChallengeAttempt, "timestamp" | "points">,
): Promise<void> => {
  // Stub implementation
};

export const updateLearningPathProgress = async (
  _userId: string,
  _pathId: string,
  _pathName: string,
  _sectionId: string,
  _completed: boolean,
  _timeSpent: number,
) => {
  // Stub implementation
};

export const updateUserStreak = async (_userId: string) => {
  // Stub implementation
};

export const getDashboardStats = async (
  _userId: string,
): Promise<DashboardStats> => {
  return {
    totalQuestions: 0,
    correctAnswers: 0,
    streak: 0,
    totalTimeSpent: 0,
    averageScore: 0,
    completedChallenges: 0,
    learningPathsCompleted: 0,
  };
};

export const getContinueWhereLeftOff = async (_userId: string) => {
  return null;
};

export const updateUserPreferences = async (
  _userId: string,
  _preferences: Record<string, unknown>,
) => {
  // Stub implementation
};
