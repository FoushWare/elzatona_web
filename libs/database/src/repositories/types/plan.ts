/**
 * Plan Repository Types
 * Types specific to learning plan repository operations
 */

import { BaseEntity } from "./common";
import { QuestionDifficulty } from "./question";

/**
 * Plan status enumeration
 */
export enum PlanStatus {
  DRAFT = "draft",
  PUBLISHED = "published",
  ARCHIVED = "archived",
}

/**
 * Learning plan entity
 */
export interface Plan extends BaseEntity {
  title: string;
  description: string;
  categoryId: string;
  topicIds: string[];
  difficulty: QuestionDifficulty;
  estimatedHours: number;
  objectives: string[];
  prerequisites?: string[];
  status: PlanStatus;
  authorId: string;
  thumbnailUrl?: string;
  enrollmentCount: number;
  completionCount: number;
  averageRating?: number;
  isPublic: boolean;
}

/**
 * Plan enrollment tracking
 */
export interface PlanEnrollment {
  id: string;
  planId: string;
  userId: string;
  enrolledAt: Date;
  startedAt?: Date;
  completedAt?: Date;
  progress: number;
  currentStep: number;
  totalSteps: number;
  lastAccessedAt: Date;
  isActive: boolean;
}

/**
 * Create plan DTO
 */
export interface CreatePlanDTO {
  title: string;
  description: string;
  categoryId: string;
  topicIds: string[];
  difficulty: QuestionDifficulty;
  estimatedHours: number;
  objectives: string[];
  prerequisites?: string[];
  status?: PlanStatus;
  authorId: string;
  thumbnailUrl?: string;
  isPublic?: boolean;
}

/**
 * Update plan DTO
 */
export interface UpdatePlanDTO {
  title?: string;
  description?: string;
  categoryId?: string;
  topicIds?: string[];
  difficulty?: QuestionDifficulty;
  estimatedHours?: number;
  objectives?: string[];
  prerequisites?: string[];
  status?: PlanStatus;
  thumbnailUrl?: string;
  isPublic?: boolean;
}

/**
 * Plan statistics
 */
export interface PlanStatistics {
  planId: string;
  totalEnrollments: number;
  activeEnrollments: number;
  completions: number;
  completionRate: number;
  averageCompletionTime: number;
  averageRating: number;
  totalRatings: number;
  viewCount: number;
  lastEnrollmentAt?: Date;
}
