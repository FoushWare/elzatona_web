/**
 * useContentManagementDeleteHandlers Hook
 * Manages delete confirmation handlers
 * v1.0
 */

import { useMemo } from "react";
import { LearningCard, UnifiedQuestion } from "@elzatona/types";

type LearningPlan = any; // eslint-disable-line @typescript-eslint/no-explicit-any
type Category = any; // eslint-disable-line @typescript-eslint/no-explicit-any
type Topic = any; // eslint-disable-line @typescript-eslint/no-explicit-any

interface UseContentManagementDeleteHandlersParams {
  modals: {
    cardToDelete: LearningCard | null;
    planToDelete: LearningPlan | null;
    categoryToDelete: Category | null;
    topicToDelete: Topic | null;
    questionToDelete: UnifiedQuestion | null;
    setCardToDelete: (card: LearningCard | null) => void;
    setPlanToDelete: (plan: LearningPlan | null) => void;
    setCategoryToDelete: (category: Category | null) => void;
    setTopicToDelete: (topic: Topic | null) => void;
    setQuestionToDelete: (question: UnifiedQuestion | null) => void;
  };
  actions: {
    handleDeleteCard: (card: LearningCard) => Promise<void>;
    handleDeletePlan: (plan: LearningPlan) => Promise<void>;
    handleDeleteCategory: (category: Category) => Promise<void>;
    handleDeleteTopic: (topic: Topic) => Promise<void>;
    handleDeleteQuestion: (question: UnifiedQuestion) => Promise<void>;
  };
}

export function useContentManagementDeleteHandlers({
  modals,
  actions,
}: UseContentManagementDeleteHandlersParams) {
  return useMemo(
    () => ({
      card: async () => {
        if (modals.cardToDelete) {
          await actions.handleDeleteCard(modals.cardToDelete);
          modals.setCardToDelete(null);
        }
      },
      plan: async () => {
        if (modals.planToDelete) {
          await actions.handleDeletePlan(modals.planToDelete);
          modals.setPlanToDelete(null);
        }
      },
      category: async () => {
        if (modals.categoryToDelete) {
          await actions.handleDeleteCategory(modals.categoryToDelete);
          modals.setCategoryToDelete(null);
        }
      },
      topic: async () => {
        if (modals.topicToDelete) {
          await actions.handleDeleteTopic(modals.topicToDelete);
          modals.setTopicToDelete(null);
        }
      },
      question: async () => {
        if (modals.questionToDelete) {
          await actions.handleDeleteQuestion(modals.questionToDelete);
          modals.setQuestionToDelete(null);
        }
      },
    }),
    [
      modals.cardToDelete,
      modals.planToDelete,
      modals.categoryToDelete,
      modals.topicToDelete,
      modals.questionToDelete,
      actions,
    ],
  );
}
