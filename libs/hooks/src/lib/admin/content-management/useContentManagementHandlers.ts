/**
 * useContentManagementHandlers Hook
 * Provides all event handlers for content management
 * v1.0
 */

import { useCallback } from "react";
import { LearningCard } from "@elzatona/types";
import { UnifiedQuestion } from "@elzatona/types";

// Types
type LearningPlan = any; // eslint-disable-line @typescript-eslint/no-explicit-any
type Category = any; // eslint-disable-line @typescript-eslint/no-explicit-any
type Topic = any; // eslint-disable-line @typescript-eslint/no-explicit-any

interface UseContentManagementHandlersParams {
  // Data
  cards: readonly LearningCard[];
  plans: readonly LearningPlan[];
  categories: readonly Category[];
  topics: readonly Topic[];
  questions: readonly UnifiedQuestion[];
  // Modals
  setCardToDelete: (card: LearningCard | null) => void;
  setPlanToDelete: (plan: LearningPlan | null) => void;
  setCategoryToDelete: (category: Category | null) => void;
  setTopicToDelete: (topic: Topic | null) => void;
  setQuestionToDelete: (question: UnifiedQuestion | null) => void;
  // Actions
  handleDeleteCard: (card: LearningCard) => Promise<void>;
  handleDeletePlan: (plan: LearningPlan) => Promise<void>;
  handleDeleteCategory: (category: Category) => Promise<void>;
  handleDeleteTopic: (topic: Topic) => Promise<void>;
  handleDeleteQuestion: (question: UnifiedQuestion) => Promise<void>;
  // Form submissions
  handleCreateCard: (data: Partial<LearningCard>) => Promise<void>;
  handleUpdateCard: (id: string, data: Partial<LearningCard>) => Promise<void>;
  handleCreatePlan: (data: Partial<LearningPlan>) => Promise<void>;
  handleUpdatePlan: (id: string, data: Partial<LearningPlan>) => Promise<void>;
  handleCreateCategory: (data: Partial<Category>) => Promise<void>;
  handleUpdateCategory: (id: string, data: Partial<Category>) => Promise<void>;
  handleCreateTopic: (data: Partial<Topic>) => Promise<void>;
  handleBulkCreateTopics: (data: any[]) => Promise<void>;
  handleUpdateTopic: (id: string, data: Partial<Topic>) => Promise<void>;
  handleCreateQuestion: (data: Partial<UnifiedQuestion>) => Promise<void>;
  handleUpdateQuestion: (
    id: string,
    data: Partial<UnifiedQuestion>,
  ) => Promise<void>;
  // Editing states
  editingCard: LearningCard | null;
  editingPlan: LearningPlan | null;
  editingCategory: Category | null;
  editingTopic: Topic | null;
  editingQuestion: UnifiedQuestion | null;
}

export function useContentManagementHandlers({
  cards,
  plans,
  categories,
  topics,
  questions,
  setCardToDelete,
  setPlanToDelete,
  setCategoryToDelete,
  setTopicToDelete,
  setQuestionToDelete,
  handleDeleteCard,
  handleDeletePlan,
  handleDeleteCategory,
  handleDeleteTopic,
  handleDeleteQuestion,
  handleCreateCard,
  handleUpdateCard,
  handleCreatePlan,
  handleUpdatePlan,
  handleCreateCategory,
  handleUpdateCategory,
  handleCreateTopic,
  handleBulkCreateTopics,
  handleUpdateTopic,
  handleCreateQuestion,
  handleUpdateQuestion,
  editingCard,
  editingPlan,
  editingCategory,
  editingTopic,
  editingQuestion,
}: UseContentManagementHandlersParams) {
  // Delete handlers
  const onDeleteCard = useCallback(
    (cardId: string) => {
      const card = cards.find((c) => c.id === cardId);
      if (card) {
        setCardToDelete(card);
      }
    },
    [cards, setCardToDelete],
  );

  const onDeletePlan = useCallback(
    (planId: string) => {
      const plan = plans.find((p) => p.id === planId);
      if (plan) {
        setPlanToDelete(plan);
      }
    },
    [plans, setPlanToDelete],
  );

  const onDeleteCategory = useCallback(
    (categoryId: string) => {
      const category = categories.find((c) => c.id === categoryId);
      if (category) {
        setCategoryToDelete(category);
      }
    },
    [categories, setCategoryToDelete],
  );

  const onDeleteTopic = useCallback(
    (topicId: string) => {
      const topic = topics.find((t) => t.id === topicId);
      if (topic) {
        setTopicToDelete(topic);
      }
    },
    [topics, setTopicToDelete],
  );

  const onDeleteQuestion = useCallback(
    (questionId: string) => {
      const question = questions.find((q) => q.id === questionId);
      if (question) {
        setQuestionToDelete(question);
      }
    },
    [questions, setQuestionToDelete],
  );

  // Confirm delete handlers
  const onConfirmDeleteCard = useCallback(async () => {
    // Wrapper - will be implemented in parent
  }, []);

  const onConfirmDeletePlan = useCallback(async () => {
    // Wrapper - will be implemented in parent
  }, []);

  const onConfirmDeleteCategory = useCallback(async () => {
    // Wrapper - will be implemented in parent
  }, []);

  const onConfirmDeleteTopic = useCallback(async () => {
    // Wrapper - will be implemented in parent
  }, []);

  const onConfirmDeleteQuestion = useCallback(async () => {
    // Wrapper - will be implemented in parent
  }, []);

  // Form submission handlers
  const onCardFormSubmit = useCallback(
    (formData: any) => {
      if (editingCard?.id) {
        handleUpdateCard(editingCard.id, formData);
      } else {
        handleCreateCard(formData);
      }
    },
    [editingCard, handleCreateCard, handleUpdateCard],
  );

  const onPlanFormSubmit = useCallback(
    (formData: any) => {
      if (editingPlan?.id) {
        handleUpdatePlan(editingPlan.id, formData);
      } else {
        handleCreatePlan(formData);
      }
    },
    [editingPlan, handleCreatePlan, handleUpdatePlan],
  );

  const onCategoryFormSubmit = useCallback(
    async (formData: any) => {
      if (editingCategory?.id) {
        await handleUpdateCategory(editingCategory.id, formData);
      } else {
        await handleCreateCategory(formData);
      }
    },
    [editingCategory, handleCreateCategory, handleUpdateCategory],
  );

  const onTopicFormSubmit = useCallback(
    async (formData: any) => {
      if (editingTopic?.id) {
        await handleUpdateTopic(editingTopic.id, formData);
      } else {
        if (Array.isArray(formData)) {
          await handleBulkCreateTopics(formData);
        } else {
          await handleCreateTopic(formData);
        }
      }
    },
    [
      editingTopic,
      handleCreateTopic,
      handleBulkCreateTopics,
      handleUpdateTopic,
    ],
  );

  const onQuestionFormSubmit = useCallback(
    async (formData: any) => {
      if (editingQuestion?.id) {
        await handleUpdateQuestion(editingQuestion.id, formData);
      } else {
        await handleCreateQuestion(formData);
      }
    },
    [editingQuestion, handleCreateQuestion, handleUpdateQuestion],
  );

  return {
    // Delete handlers
    onDeleteCard,
    onDeletePlan,
    onDeleteCategory,
    onDeleteTopic,
    onDeleteQuestion,
    // Confirm delete handlers (to be set by parent)
    onConfirmDeleteCard,
    onConfirmDeletePlan,
    onConfirmDeleteCategory,
    onConfirmDeleteTopic,
    onConfirmDeleteQuestion,
    // Form submission handlers
    onCardFormSubmit,
    onPlanFormSubmit,
    onCategoryFormSubmit,
    onTopicFormSubmit,
    onQuestionFormSubmit,
  };
}
