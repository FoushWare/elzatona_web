/**
 * Question Repository Types
 * Types specific to question repository operations
 */

import { BaseEntity } from "./common";

/**
 * Question difficulty levels
 */
export enum QuestionDifficulty {
  BEGINNER = "beginner",
  INTERMEDIATE = "intermediate",
  ADVANCED = "advanced",
  EXPERT = "expert",
}

/**
 * Question types
 */
export enum QuestionType {
  MULTIPLE_CHOICE = "multiple_choice",
  CODE = "code",
  TRUE_FALSE = "true_false",
  FILL_IN_BLANK = "fill_in_blank",
  MATCHING = "matching",
}

/**
 * Question entity
 */
export interface Question extends BaseEntity {
  title: string;
  content: string;
  type: QuestionType;
  difficulty: QuestionDifficulty;
  categoryId: string;
  topicId: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation?: string;
  code?: string;
  language?: string;
  points: number;
  tags?: string[];
  isPublished: boolean;
  authorId: string;
  viewCount: number;
  successRate?: number;
}

/**
 * Create question DTO
 */
export interface CreateQuestionDTO {
  title: string;
  content: string;
  type: QuestionType;
  difficulty: QuestionDifficulty;
  categoryId: string;
  topicId: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation?: string;
  code?: string;
  language?: string;
  points?: number;
  tags?: string[];
  isPublished?: boolean;
  authorId: string;
}

/**
 * Update question DTO
 */
export interface UpdateQuestionDTO {
  title?: string;
  content?: string;
  type?: QuestionType;
  difficulty?: QuestionDifficulty;
  categoryId?: string;
  topicId?: string;
  options?: string[];
  correctAnswer?: string | string[];
  explanation?: string;
  code?: string;
  language?: string;
  points?: number;
  tags?: string[];
  isPublished?: boolean;
}

/**
 * Question filters
 */
export interface QuestionFilters {
  categoryId?: string;
  topicId?: string;
  difficulty?: QuestionDifficulty;
  type?: QuestionType;
  isPublished?: boolean;
  authorId?: string;
  tags?: string[];
  search?: string;
}

/**
 * Question statistics
 */
export interface QuestionStatistics {
  total: number;
  byDifficulty: Record<QuestionDifficulty, number>;
  byType: Record<QuestionType, number>;
  byCategory: Record<string, number>;
  published: number;
  unpublished: number;
  averageSuccessRate: number;
  totalViews: number;
  lastUpdated: Date;
}
