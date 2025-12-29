/**
 * useContentManagementModals Hook
 * Manages all modal states for content management page
 * v1.0
 */

import { useState } from "react";
import {
  LearningCard,
  UnifiedQuestion,
  type LearningPlan,
  type Category,
  type Topic,
} from "@elzatona/types";

export function useContentManagementModals() {
  // Form modal states
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isTopicModalOpen, setIsTopicModalOpen] = useState(false);
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);

  // Editing states
  const [editingCard, setEditingCard] = useState<LearningCard | null>(null);
  const [editingPlan, setEditingPlan] = useState<LearningPlan | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editingTopic, setEditingTopic] = useState<Topic | null>(null);
  const [editingQuestion, setEditingQuestion] =
    useState<UnifiedQuestion | null>(null);

  // Delete confirmation states
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(
    null,
  );
  const [topicToDelete, setTopicToDelete] = useState<Topic | null>(null);
  const [questionToDelete, setQuestionToDelete] =
    useState<UnifiedQuestion | null>(null);
  const [cardToDelete, setCardToDelete] = useState<LearningCard | null>(null);
  const [planToDelete, setPlanToDelete] = useState<LearningPlan | null>(null);

  // Add item modal state
  const [addItemContext, setAddItemContext] = useState<{
    planId: string;
    type: "card" | "category" | "topic" | "question";
    parentId?: string;
  } | null>(null);

  // Question view modal state
  const [viewingQuestion, setViewingQuestion] =
    useState<UnifiedQuestion | null>(null);
  const [isViewQuestionModalOpen, setIsViewQuestionModalOpen] = useState(false);
  const [selectedQuestionIds, setSelectedQuestionIds] = useState<Set<string>>(
    new Set(),
  );

  // Helper functions to open modals
  const openCardModal = (card?: LearningCard) => {
    setEditingCard(card || null);
    setIsCardModalOpen(true);
  };

  const openPlanModal = (plan?: LearningPlan) => {
    setEditingPlan(plan || null);
    setIsPlanModalOpen(true);
  };

  const openCategoryModal = (category?: Category) => {
    setEditingCategory(category || null);
    setIsCategoryModalOpen(true);
  };

  const openTopicModal = (topic?: Topic) => {
    setEditingTopic(topic || null);
    setIsTopicModalOpen(true);
  };

  const openQuestionModal = (question?: UnifiedQuestion) => {
    setEditingQuestion(question || null);
    setIsQuestionModalOpen(true);
  };

  // Helper functions to close modals
  const closeCardModal = () => {
    setIsCardModalOpen(false);
    setEditingCard(null);
  };

  const closePlanModal = () => {
    setIsPlanModalOpen(false);
    setEditingPlan(null);
  };

  const closeCategoryModal = () => {
    setIsCategoryModalOpen(false);
    setEditingCategory(null);
  };

  const closeTopicModal = () => {
    setIsTopicModalOpen(false);
    setEditingTopic(null);
  };

  const closeQuestionModal = () => {
    setIsQuestionModalOpen(false);
    setEditingQuestion(null);
  };

  return {
    // Form modals
    isCardModalOpen,
    isPlanModalOpen,
    isCategoryModalOpen: isCategoryModalOpen,
    isTopicModalOpen,
    isQuestionModalOpen,
    openCardModal,
    openPlanModal,
    openCategoryModal,
    openTopicModal,
    openQuestionModal,
    closeCardModal,
    closePlanModal,
    closeCategoryModal,
    closeTopicModal,
    closeQuestionModal,
    // Editing states
    editingCard,
    editingPlan,
    editingCategory,
    editingTopic,
    editingQuestion,
    // Delete confirmation
    categoryToDelete,
    setCategoryToDelete,
    topicToDelete,
    setTopicToDelete,
    questionToDelete,
    setQuestionToDelete,
    cardToDelete,
    setCardToDelete,
    planToDelete,
    setPlanToDelete,
    // Add item modal
    addItemContext,
    setAddItemContext,
    // Question view modal
    viewingQuestion,
    setViewingQuestion,
    isViewQuestionModalOpen,
    setIsViewQuestionModalOpen,
    selectedQuestionIds,
    setSelectedQuestionIds,
  };
}
