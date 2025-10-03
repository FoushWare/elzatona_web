/**
 * Firestore data models and interfaces
 */

export interface FirestoreUser {
  uid: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
  provider: string;
  isEmailVerified: boolean;
  createdAt: string;
  lastLoginAt: string;
  preferences: UserPreferences;
  progress: UserProgress;
  achievements: UserAchievements;
  learningPlans: LearningPlanProgress[];
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  notifications: {
    email: boolean;
    push: boolean;
    learningReminders: boolean;
    achievementAlerts: boolean;
  };
  language: string;
  timezone: string;
  learningMode: 'guided' | 'free-style' | null;
  dailyGoal: number; // questions per day
  studyHours: {
    start: string; // HH:MM format
    end: string; // HH:MM format
  };
  difficultyPreference: 'easy' | 'medium' | 'hard' | 'mixed';
  sections: string[]; // preferred learning sections
}

export interface UserProgress {
  totalQuestions: number;
  correctAnswers: number;
  accuracy: number;
  totalTimeSpent: number; // in seconds
  currentStreak: number;
  longestStreak: number;
  lastActivityAt: string;
  weeklyProgress: WeeklyProgress[];
  monthlyProgress: MonthlyProgress[];
  sectionProgress: SectionProgress[];
  learningSessions: LearningSession[];
}

export interface WeeklyProgress {
  weekStart: string; // YYYY-MM-DD
  weekEnd: string; // YYYY-MM-DD
  questionsAnswered: number;
  correctAnswers: number;
  timeSpent: number;
  accuracy: number;
}

export interface MonthlyProgress {
  month: string; // YYYY-MM
  questionsAnswered: number;
  correctAnswers: number;
  timeSpent: number;
  accuracy: number;
  streakDays: number;
}

export interface SectionProgress {
  section: string;
  totalQuestions: number;
  correctAnswers: number;
  accuracy: number;
  timeSpent: number;
  lastPracticedAt: string;
  masteryLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

export interface LearningSession {
  sessionId: string;
  startTime: string;
  endTime: string | null;
  learningMode: 'guided' | 'free-style';
  planId?: string;
  questionsAnswered: number;
  correctAnswers: number;
  timeSpent: number;
  sections: string[];
  difficulty: string[];
}

export interface LearningPlanProgress {
  planId: string;
  planName: string;
  startDate: string;
  endDate: string | null;
  status: 'active' | 'completed' | 'paused' | 'cancelled';
  totalQuestions: number;
  questionsCompleted: number;
  progress: number; // percentage
  dailyGoals: DailyGoal[];
  currentDay: number;
  totalDays: number;
}

export interface DailyGoal {
  day: number;
  date: string;
  targetQuestions: number;
  completedQuestions: number;
  completed: boolean;
  sections: {
    section: string;
    questions: number;
    completed: number;
  }[];
}

export interface UserAchievements {
  badges: Badge[];
  certificates: Certificate[];
  milestones: Milestone[];
  totalPoints: number;
  level: number;
  experience: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'learning' | 'streak' | 'accuracy' | 'speed' | 'mastery';
  earnedAt: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface Certificate {
  id: string;
  name: string;
  description: string;
  issuedAt: string;
  validUntil: string | null;
  score: number;
  sections: string[];
}

export interface Milestone {
  id: string;
  name: string;
  description: string;
  achievedAt: string;
  value: number;
  type: 'questions' | 'streak' | 'accuracy' | 'time' | 'sections';
}

// Question and learning content interfaces
export interface FirestoreQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  section: string;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
  createdAt: string;
  updatedAt: string;
  createdBy: string; // user ID
  approved: boolean;
  usageCount: number;
  averageTime: number;
  accuracy: number;
}

export interface FirestoreLearningPlan {
  id: string;
  name: string;
  description: string;
  duration: number; // days
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  totalQuestions: number;
  dailyQuestions: number;
  sections: PlanSection[];
  features: string[];
  estimatedTime: string;
  isRecommended: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  usageCount: number;
  averageRating: number;
}

export interface PlanSection {
  id: string;
  name: string;
  questions: number;
  weight: number;
  order: number;
}

// Analytics and reporting interfaces
export interface UserAnalytics {
  userId: string;
  date: string;
  learningTime: number;
  questionsAnswered: number;
  accuracy: number;
  sections: string[];
  difficulty: string[];
  learningMode: 'guided' | 'free-style';
  device: string;
  browser: string;
}

export interface SystemAnalytics {
  totalUsers: number;
  activeUsers: number;
  questionsAnswered: number;
  averageAccuracy: number;
  popularSections: string[];
  averageSessionTime: number;
  completionRate: number;
  lastUpdated: string;
}
