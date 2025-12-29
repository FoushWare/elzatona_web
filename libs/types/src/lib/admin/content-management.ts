/**
 * Admin Content Management Types
 * Shared types for content management functionality in admin apps
 * v1.0
 */

import { LearningCard } from "../learning-cards";
import { UnifiedQuestion } from "../unified-question-schema";

// Base entity types (these match the database schema)
// Using any for now as they come from Supabase queries with flexible schemas
// TODO: Replace with proper types from database schema when available
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type LearningPlan = any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Category = any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Topic = any;

// Add Item Context - used in AddItemModal and ContentManagementModals
export interface AddItemContext {
  planId: string;
  type: "card" | "category" | "topic" | "question";
  parentId?: string;
}

// Content Management Stats
export interface ContentManagementStats {
  totalCards: number;
  totalPlans: number;
  totalCategories: number;
  totalTopics: number;
  totalQuestions: number;
}

// Content Management Data Structure
export interface ContentManagementData {
  cards: readonly LearningCard[];
  categories: readonly Category[];
  topics: readonly Topic[];
  questions: readonly UnifiedQuestion[];
  cardsData?: { data: readonly LearningCard[]; count?: number };
  plansData?: { data: readonly LearningPlan[]; count?: number };
  categoriesData?: { data: readonly Category[]; count?: number };
  topicsData?: { data: readonly Topic[]; count?: number };
  questionsData?: {
    data: readonly UnifiedQuestion[];
    pagination?: { totalCount: number };
  };
}

// Modal States
export interface ContentManagementModalStates {
  isCardModalOpen: boolean;
  isPlanModalOpen: boolean;
  isCategoryModalOpen: boolean;
  isTopicModalOpen: boolean;
  isQuestionModalOpen: boolean;
  isViewQuestionModalOpen: boolean;
  editingCard: LearningCard | null;
  editingPlan: LearningPlan | null;
  editingCategory: Category | null;
  editingTopic: Topic | null;
  editingQuestion: UnifiedQuestion | null;
  cardToDelete: LearningCard | null;
  planToDelete: LearningPlan | null;
  categoryToDelete: Category | null;
  topicToDelete: Topic | null;
  questionToDelete: UnifiedQuestion | null;
  viewingQuestion: UnifiedQuestion | null;
  addItemContext: AddItemContext | null;
  selectedQuestionIds: Set<string>;
}

// Modal Actions
export interface ContentManagementModalActions {
  closeCardModal: () => void;
  closePlanModal: () => void;
  closeCategoryModal: () => void;
  closeTopicModal: () => void;
  closeQuestionModal: () => void;
  setCardToDelete: (card: LearningCard | null) => void;
  setPlanToDelete: (plan: LearningPlan | null) => void;
  setCategoryToDelete: (category: Category | null) => void;
  setTopicToDelete: (topic: Topic | null) => void;
  setQuestionToDelete: (question: UnifiedQuestion | null) => void;
  setViewingQuestion: (question: UnifiedQuestion | null) => void;
  setIsViewQuestionModalOpen: (open: boolean) => void;
  setAddItemContext: (context: AddItemContext | null) => void;
  setSelectedQuestionIds: (ids: Set<string>) => void;
  openCardModal: (card?: LearningCard) => void;
  openPlanModal: (plan?: LearningPlan) => void;
  openCategoryModal: (category?: Category) => void;
  openTopicModal: (topic?: Topic) => void;
  openQuestionModal: (question?: UnifiedQuestion) => void;
}

// Form Handlers
export interface ContentManagementFormHandlers {
  onCardFormSubmit: (data: any) => void | Promise<void>;
  onPlanFormSubmit: (data: any) => void | Promise<void>;
  onCategoryFormSubmit: (data: any) => void | Promise<void>;
  onTopicFormSubmit: (data: any) => void | Promise<void>;
  onQuestionFormSubmit: (data: any) => void | Promise<void>;
}

// Mutation States
export interface ContentManagementMutationStates {
  createCardMutation: { isPending: boolean };
  updateCardMutation: { isPending: boolean };
  createPlanMutation: { isPending: boolean };
  updatePlanMutation: { isPending: boolean };
  createCategoryMutation: { isPending: boolean };
  updateCategoryMutation: { isPending: boolean };
  createTopicMutation: { isPending: boolean };
  updateTopicMutation: { isPending: boolean };
  createQuestionMutation: { isPending: boolean };
  updateQuestionMutation: { isPending: boolean };
  deleteCardMutation: { isPending: boolean };
  deleteCategoryMutation: { isPending: boolean };
  deleteTopicMutation: { isPending: boolean };
  deleteQuestionMutation: { isPending: boolean };
  deletePlanMutation: { isPending: boolean };
}

// Hierarchy Actions
export interface ContentManagementHierarchyActions {
  addCardToPlan: (planId: string, cardId: string) => Promise<void>;
  addCategoryToCard: (cardId: string, categoryId: string) => Promise<void>;
  addTopicToCategory: (categoryId: string, topicId: string) => Promise<void>;
  addQuestionToTopic: (topicId: string, questionId: string) => Promise<void>;
}

// Delete Handlers
export interface ContentManagementDeleteHandlers {
  card: () => Promise<void>;
  plan: () => Promise<void>;
  category: () => Promise<void>;
  topic: () => Promise<void>;
  question: () => Promise<void>;
}

// Plan Hierarchy
export interface ContentManagementPlanHierarchy {
  planHierarchy: Record<string, any>;
  fetchPlanHierarchy: (planId: string) => Promise<void>;
}
