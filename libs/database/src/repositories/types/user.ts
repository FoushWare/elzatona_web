/**
 * User Repository Types
 * Types specific to user repository operations
 */

import { BaseEntity } from "./common";

/**
 * User role enumeration
 */
export enum UserRole {
  ADMIN = "admin",
  INSTRUCTOR = "instructor",
  STUDENT = "student",
}

/**
 * User entity
 */
export interface User extends BaseEntity {
  email: string;
  displayName?: string;
  firstName?: string;
  lastName?: string;
  role: UserRole;
  avatarUrl?: string;
  bio?: string;
  isActive: boolean;
  emailVerified: boolean;
  lastLoginAt?: Date;
}

/**
 * User progress tracking
 */
export interface UserProgress {
  userId: string;
  totalQuestionsAttempted: number;
  totalQuestionsCorrect: number;
  totalPoints: number;
  currentStreak: number;
  longestStreak: number;
  completedPlans: string[];
  inProgressPlans: string[];
  masteredTopics: string[];
  weakTopics: string[];
  lastActivityAt: Date;
}

/**
 * User preferences
 */
export interface UserPreferences {
  userId: string;
  theme: "light" | "dark" | "system";
  language: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  difficulty: "beginner" | "intermediate" | "advanced" | "mixed";
  dailyGoal?: number;
  preferredCategories?: string[];
}

/**
 * Create user DTO
 */
export interface CreateUserDTO {
  email: string;
  displayName?: string;
  firstName?: string;
  lastName?: string;
  role?: UserRole;
  avatarUrl?: string;
  bio?: string;
}

/**
 * Update user DTO
 */
export interface UpdateUserDTO {
  displayName?: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
  bio?: string;
  isActive?: boolean;
}

/**
 * User statistics
 */
export interface UserStatistics {
  userId: string;
  totalQuestionsAttempted: number;
  totalQuestionsCorrect: number;
  successRate: number;
  totalPoints: number;
  currentStreak: number;
  longestStreak: number;
  plansCompleted: number;
  plansInProgress: number;
  topicsExplored: number;
  topicsMastered: number;
  averageSessionDuration: number;
  totalTimeSpent: number;
  lastActivityAt: Date;
}
