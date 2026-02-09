/**
 * Learning Card Repository Types
 * Types specific to learning card repository operations
 */

import { BaseEntity } from "./common";

/**
 * Card type enumeration
 */
export enum CardType {
  CONCEPT = "concept",
  EXAMPLE = "example",
  TIP = "tip",
  WARNING = "warning",
  BEST_PRACTICE = "best_practice",
}

/**
 * Learning card entity
 */
export interface LearningCard extends BaseEntity {
  title: string;
  content: string;
  type: CardType;
  categoryId: string;
  topicId: string;
  keywords: string[];
  relatedQuestions?: string[];
  relatedCards?: string[];
  codeExample?: string;
  language?: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  isPublished: boolean;
  authorId: string;
  viewCount: number;
  likeCount: number;
  order: number;
}

/**
 * User card interaction tracking
 */
export interface UserCardInteraction {
  id: string;
  userId: string;
  cardId: string;
  viewedAt: Date;
  masteryLevel: number; // 0-5
  lastReviewedAt?: Date;
  reviewCount: number;
  isBookmarked: boolean;
  notes?: string;
}

/**
 * Create learning card DTO
 */
export interface CreateLearningCardDTO {
  title: string;
  content: string;
  type: CardType;
  categoryId: string;
  topicId: string;
  keywords: string[];
  relatedQuestions?: string[];
  relatedCards?: string[];
  codeExample?: string;
  language?: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  isPublished?: boolean;
  authorId: string;
  order?: number;
}

/**
 * Update learning card DTO
 */
export interface UpdateLearningCardDTO {
  title?: string;
  content?: string;
  type?: CardType;
  categoryId?: string;
  topicId?: string;
  keywords?: string[];
  relatedQuestions?: string[];
  relatedCards?: string[];
  codeExample?: string;
  language?: string;
  difficulty?: "beginner" | "intermediate" | "advanced";
  isPublished?: boolean;
  order?: number;
}

/**
 * Learning card statistics
 */
export interface LearningCardStatistics {
  total: number;
  byType: Record<CardType, number>;
  byCategory: Record<string, number>;
  byDifficulty: Record<string, number>;
  published: number;
  unpublished: number;
  totalViews: number;
  totalLikes: number;
  averageMasteryLevel: number;
  lastUpdated: Date;
}
