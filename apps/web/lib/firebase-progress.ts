// v1.0 - Enhanced Firebase Progress Tracking System
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
  Timestamp,
  increment,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';
import { db } from './firebase';

// Progress tracking interfaces
export interface UserProgress {
  userId: string;
  totalQuestionsCompleted: number;
  totalChallengesCompleted: number;
  totalPoints: number;
  currentStreak: number;
  longestStreak: number;
  lastActivityDate: string;
  badges: string[];
  achievements: Achievement[];
  learningPaths: LearningPathProgress[];
  questionHistory: QuestionAttempt[];
  challengeHistory: ChallengeAttempt[];
  preferences: UserPreferences;
  createdAt: string;
  updatedAt: string;
}

export interface LearningPathProgress {
  pathId: string;
  pathName: string;
  progress: number; // 0-100
  completedSections: string[];
  currentSection: string;
  lastAccessed: string;
  timeSpent: number; // in minutes
  startedAt: string;
  completedAt?: string;
}

export interface QuestionAttempt {
  questionId: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  answeredCorrectly: boolean;
  timeSpent: number; // in seconds
  attempts: number;
  timestamp: string;
  points: number;
}

export interface ChallengeAttempt {
  challengeId: string;
  challengeName: string;
  category: string;
  completed: boolean;
  timeSpent: number; // in minutes
  score: number;
  maxScore: number;
  timestamp: string;
  points: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'learning' | 'streak' | 'challenge' | 'milestone';
  unlockedAt: string;
  points: number;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: string;
  notifications: boolean;
  emailUpdates: boolean;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'mixed';
  focusAreas: string[];
}

export interface DashboardStats {
  totalTimeSpent: number;
  averageScore: number;
  completionRate: number;
  weeklyProgress: number;
  monthlyProgress: number;
  topCategories: Array<{
    category: string;
    score: number;
    questionsCompleted: number;
  }>;
  recentActivity: Array<{
    type: 'question' | 'challenge' | 'path';
    title: string;
    timestamp: string;
    points: number;
  }>;
}

// Progress tracking functions
export const initializeUserProgress = async (
  userId: string
): Promise<UserProgress> => {
  if (!db) {
    throw new Error('Firestore not initialized');
  }

  const initialProgress: UserProgress = {
    userId,
    totalQuestionsCompleted: 0,
    totalChallengesCompleted: 0,
    totalPoints: 0,
    currentStreak: 0,
    longestStreak: 0,
    lastActivityDate: new Date().toISOString(),
    badges: [],
    achievements: [],
    learningPaths: [],
    questionHistory: [],
    challengeHistory: [],
    preferences: {
      theme: 'system',
      language: 'en',
      notifications: true,
      emailUpdates: false,
      difficulty: 'mixed',
      focusAreas: [],
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  try {
    const userProgressRef = doc(db, 'userProgress', userId);
    await setDoc(userProgressRef, initialProgress);
    return initialProgress;
  } catch (error) {
    console.error('Error initializing user progress:', error);
    throw error;
  }
};

export const getUserProgress = async (
  userId: string
): Promise<UserProgress | null> => {
  if (!db) {
    console.warn('Firestore not available');
    return null;
  }

  try {
    const userProgressRef = doc(db, 'userProgress', userId);
    const userProgressSnap = await getDoc(userProgressRef);

    if (userProgressSnap.exists()) {
      return userProgressSnap.data() as UserProgress;
    } else {
      // Initialize progress for new user
      return await initializeUserProgress(userId);
    }
  } catch (error) {
    console.error('Error getting user progress:', error);
    return null;
  }
};

export const updateQuestionProgress = async (
  userId: string,
  questionAttempt: Omit<QuestionAttempt, 'timestamp' | 'points'>
): Promise<void> => {
  if (!db) {
    throw new Error('Firestore not available');
  }

  try {
    const userProgressRef = doc(db, 'userProgress', userId);
    const timestamp = new Date().toISOString();

    // Calculate points based on difficulty and correctness
    const points = calculateQuestionPoints(
      questionAttempt.difficulty,
      questionAttempt.answeredCorrectly,
      questionAttempt.attempts
    );

    const fullAttempt: QuestionAttempt = {
      ...questionAttempt,
      timestamp,
      points,
    };

    // Update progress document
    await updateDoc(userProgressRef, {
      totalQuestionsCompleted: increment(1),
      totalPoints: increment(points),
      lastActivityDate: timestamp,
      updatedAt: timestamp,
      questionHistory: arrayUnion(fullAttempt),
    });

    // Check for achievements
    await checkAndUnlockAchievements(userId);
  } catch (error) {
    console.error('Error updating question progress:', error);
    throw error;
  }
};

export const updateChallengeProgress = async (
  userId: string,
  challengeAttempt: Omit<ChallengeAttempt, 'timestamp' | 'points'>
): Promise<void> => {
  if (!db) {
    throw new Error('Firestore not available');
  }

  try {
    const userProgressRef = doc(db, 'userProgress', userId);
    const timestamp = new Date().toISOString();

    // Calculate points based on score and completion
    const points = calculateChallengePoints(
      challengeAttempt.score,
      challengeAttempt.maxScore,
      challengeAttempt.completed
    );

    const fullAttempt: ChallengeAttempt = {
      ...challengeAttempt,
      timestamp,
      points,
    };

    // Update progress document
    await updateDoc(userProgressRef, {
      totalChallengesCompleted: challengeAttempt.completed
        ? increment(1)
        : increment(0),
      totalPoints: increment(points),
      lastActivityDate: timestamp,
      updatedAt: timestamp,
      challengeHistory: arrayUnion(fullAttempt),
    });

    // Check for achievements
    await checkAndUnlockAchievements(userId);
  } catch (error) {
    console.error('Error updating challenge progress:', error);
    throw error;
  }
};

export const updateLearningPathProgress = async (
  userId: string,
  pathId: string,
  pathName: string,
  sectionId: string,
  completed: boolean,
  timeSpent: number
): Promise<void> => {
  if (!db) {
    throw new Error('Firestore not available');
  }

  try {
    const userProgressRef = doc(db, 'userProgress', userId);
    const userProgress = await getUserProgress(userId);

    if (!userProgress) {
      throw new Error('User progress not found');
    }

    const existingPathIndex = userProgress.learningPaths.findIndex(
      path => path.pathId === pathId
    );

    let updatedPaths: LearningPathProgress[];

    if (existingPathIndex >= 0) {
      // Update existing path
      updatedPaths = [...userProgress.learningPaths];
      const existingPath = updatedPaths[existingPathIndex];

      if (completed && !existingPath.completedSections.includes(sectionId)) {
        existingPath.completedSections.push(sectionId);
        existingPath.progress = Math.min(
          100,
          (existingPath.completedSections.length / 10) * 100
        ); // Assuming 10 sections per path
      }

      existingPath.currentSection = sectionId;
      existingPath.lastAccessed = new Date().toISOString();
      existingPath.timeSpent += timeSpent;

      if (existingPath.progress === 100) {
        existingPath.completedAt = new Date().toISOString();
      }
    } else {
      // Create new path progress
      const newPath: LearningPathProgress = {
        pathId,
        pathName,
        progress: completed ? 10 : 0, // Assuming 10 sections per path
        completedSections: completed ? [sectionId] : [],
        currentSection: sectionId,
        lastAccessed: new Date().toISOString(),
        timeSpent,
        startedAt: new Date().toISOString(),
      };

      updatedPaths = [...userProgress.learningPaths, newPath];
    }

    await updateDoc(userProgressRef, {
      learningPaths: updatedPaths,
      lastActivityDate: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    // Check for achievements
    await checkAndUnlockAchievements(userId);
  } catch (error) {
    console.error('Error updating learning path progress:', error);
    throw error;
  }
};

export const updateUserStreak = async (userId: string): Promise<void> => {
  if (!db) {
    throw new Error('Firestore not available');
  }

  try {
    const userProgressRef = doc(db, 'userProgress', userId);
    const userProgress = await getUserProgress(userId);

    if (!userProgress) {
      throw new Error('User progress not found');
    }

    const today = new Date().toDateString();
    const lastActivity = new Date(userProgress.lastActivityDate).toDateString();

    let newStreak = userProgress.currentStreak;

    if (today === lastActivity) {
      // User already active today, no change
      return;
    } else if (
      new Date(today).getTime() - new Date(lastActivity).getTime() ===
      86400000
    ) {
      // Consecutive day, increment streak
      newStreak += 1;
    } else {
      // Streak broken, reset to 1
      newStreak = 1;
    }

    const longestStreak = Math.max(userProgress.longestStreak, newStreak);

    await updateDoc(userProgressRef, {
      currentStreak: newStreak,
      longestStreak,
      lastActivityDate: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    // Check for streak achievements
    await checkStreakAchievements(userId, newStreak);
  } catch (error) {
    console.error('Error updating user streak:', error);
    throw error;
  }
};

export const getDashboardStats = async (
  userId: string
): Promise<DashboardStats> => {
  if (!db) {
    throw new Error('Firestore not available');
  }

  try {
    const userProgress = await getUserProgress(userId);

    if (!userProgress) {
      throw new Error('User progress not found');
    }

    // Calculate total time spent
    const totalTimeSpent =
      userProgress.questionHistory.reduce(
        (sum, attempt) => sum + attempt.timeSpent,
        0
      ) +
      userProgress.challengeHistory.reduce(
        (sum, attempt) => sum + attempt.timeSpent * 60,
        0
      );

    // Calculate average score
    const totalQuestions = userProgress.questionHistory.length;
    const correctAnswers = userProgress.questionHistory.filter(
      attempt => attempt.answeredCorrectly
    ).length;
    const averageScore =
      totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;

    // Calculate completion rate
    const totalPaths = userProgress.learningPaths.length;
    const completedPaths = userProgress.learningPaths.filter(
      path => path.progress === 100
    ).length;
    const completionRate =
      totalPaths > 0 ? (completedPaths / totalPaths) * 100 : 0;

    // Calculate weekly and monthly progress
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const oneMonthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    const weeklyQuestions = userProgress.questionHistory.filter(
      attempt => new Date(attempt.timestamp) >= oneWeekAgo
    ).length;

    const monthlyQuestions = userProgress.questionHistory.filter(
      attempt => new Date(attempt.timestamp) >= oneMonthAgo
    ).length;

    // Get top categories
    const categoryStats = userProgress.questionHistory.reduce(
      (acc, attempt) => {
        if (!acc[attempt.category]) {
          acc[attempt.category] = { score: 0, questionsCompleted: 0 };
        }
        acc[attempt.category].questionsCompleted += 1;
        if (attempt.answeredCorrectly) {
          acc[attempt.category].score += 1;
        }
        return acc;
      },
      {} as Record<string, { score: number; questionsCompleted: number }>
    );

    const topCategories = Object.entries(categoryStats)
      .map(([category, stats]) => ({
        category,
        score:
          stats.questionsCompleted > 0
            ? (stats.score / stats.questionsCompleted) * 100
            : 0,
        questionsCompleted: stats.questionsCompleted,
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);

    // Get recent activity
    const recentActivity = [
      ...userProgress.questionHistory.slice(-5).map(attempt => ({
        type: 'question' as const,
        title: `${attempt.category} Question`,
        timestamp: attempt.timestamp,
        points: attempt.points,
      })),
      ...userProgress.challengeHistory.slice(-5).map(attempt => ({
        type: 'challenge' as const,
        title: attempt.challengeName,
        timestamp: attempt.timestamp,
        points: attempt.points,
      })),
    ]
      .sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      )
      .slice(0, 10);

    return {
      totalTimeSpent,
      averageScore,
      completionRate,
      weeklyProgress: weeklyQuestions,
      monthlyProgress: monthlyQuestions,
      topCategories,
      recentActivity,
    };
  } catch (error) {
    console.error('Error getting dashboard stats:', error);
    throw error;
  }
};

export const getContinueWhereLeftOff = async (userId: string) => {
  if (!db) {
    throw new Error('Firestore not available');
  }

  try {
    const userProgress = await getUserProgress(userId);

    if (!userProgress) {
      return null;
    }

    // Find the most recently accessed learning path
    const recentPath = userProgress.learningPaths.sort(
      (a, b) =>
        new Date(b.lastAccessed).getTime() - new Date(a.lastAccessed).getTime()
    )[0];

    // Find recent question attempts
    const recentQuestions = userProgress.questionHistory
      .sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      )
      .slice(0, 5);

    // Find recent challenge attempts
    const recentChallenges = userProgress.challengeHistory
      .sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      )
      .slice(0, 5);

    return {
      recentPath,
      recentQuestions,
      recentChallenges,
      lastActivity: userProgress.lastActivityDate,
    };
  } catch (error) {
    console.error('Error getting continue where left off:', error);
    return null;
  }
};

// Helper functions
const calculateQuestionPoints = (
  difficulty: string,
  answeredCorrectly: boolean,
  attempts: number
): number => {
  if (!answeredCorrectly) return 0;

  const basePoints = {
    easy: 5,
    medium: 10,
    hard: 20,
  };

  const points = basePoints[difficulty as keyof typeof basePoints] || 5;
  const attemptPenalty = Math.max(0, (attempts - 1) * 2);

  return Math.max(1, points - attemptPenalty);
};

const calculateChallengePoints = (
  score: number,
  maxScore: number,
  completed: boolean
): number => {
  if (!completed) return 0;

  const percentage = score / maxScore;
  return Math.round(percentage * 50); // Max 50 points per challenge
};

const checkAndUnlockAchievements = async (userId: string): Promise<void> => {
  // Implementation for checking and unlocking achievements
  // This would check various conditions and unlock new achievements
  // For now, we'll implement basic achievement checking
};

const checkStreakAchievements = async (
  userId: string,
  streak: number
): Promise<void> => {
  // Implementation for checking streak-based achievements
  // This would check if the user has reached milestone streaks
};

export const updateUserPreferences = async (
  userId: string,
  preferences: Partial<UserPreferences>
): Promise<void> => {
  if (!db) {
    throw new Error('Firestore not available');
  }

  try {
    const userProgressRef = doc(db, 'userProgress', userId);
    await updateDoc(userProgressRef, {
      preferences: preferences,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error updating user preferences:', error);
    throw error;
  }
};
