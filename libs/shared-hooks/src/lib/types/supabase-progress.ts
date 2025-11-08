// Type definitions for supabase-progress service
// These types are used by shared-hooks but the service is app-specific

export interface UserProgress {
  id: string;
  userId: string;
  questionId: string;
  isCorrect: boolean;
  timestamp: string;
}

export const getUserProgress = async (
  userId: string
): Promise<UserProgress[]> => {
  return [];
};

export const saveProgress = async (
  progress: Omit<UserProgress, 'id' | 'timestamp'>
): Promise<UserProgress> => {
  throw new Error('Not implemented');
};

export const updateLearningPathProgress = async (
  userId: string,
  pathId: string,
  progress: number
) => {
  // Stub implementation
};

export const updateUserStreak = async (userId: string) => {
  // Stub implementation
};

export const getDashboardStats = async (userId: string) => {
  return { totalQuestions: 0, correctAnswers: 0, streak: 0 };
};

export const getContinueWhereLeftOff = async (userId: string) => {
  return null;
};

export const updateUserPreferences = async (
  userId: string,
  preferences: Record<string, unknown>
) => {
  // Stub implementation
};
