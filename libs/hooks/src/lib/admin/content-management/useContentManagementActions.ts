/**
 * useContentManagementActions Hook
 * Handles all CRUD operations for content management
 * v1.0
 */

import { useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  useCreateCard,
  useUpdateCard,
  useDeleteCard,
  useCreatePlan,
  useUpdatePlan,
  useDeletePlan,
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory,
  useCreateTopic,
  useUpdateTopic,
  useDeleteTopic,
  useCreateQuestion,
  useUpdateQuestion,
  useDeleteQuestion,
  useNotificationActions,
} from "@elzatona/hooks";
import {
  LearningCard,
  UnifiedQuestion,
  type LearningPlan,
  type Category,
  type Topic,
} from "@elzatona/types";
import { useToast } from "@elzatona/common-ui";

interface UseContentManagementActionsProps {
  cards: readonly LearningCard[];
  plans: readonly LearningPlan[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  planHierarchy: Record<string, any>;
  fetchPlanHierarchy: (planId: string) => Promise<void>;
  onCardModalClose: () => void;
  onPlanModalClose: () => void;
  onTopicModalClose: () => void;
}

export function useContentManagementActions({
  cards,
  plans,
  planHierarchy,
  fetchPlanHierarchy,
  onCardModalClose,
  onPlanModalClose,
  onTopicModalClose,
}: UseContentManagementActionsProps) {
  // cards parameter is kept for API consistency but not directly used in this hook
  void cards;
  const queryClient = useQueryClient();
  const { notifyContentUpdate } = useNotificationActions();
  const { showSuccess, showError } = useToast();

  // Mutation hooks
  const createCardMutation = useCreateCard();
  const updateCardMutation = useUpdateCard();
  const deleteCardMutation = useDeleteCard();
  const createPlanMutation = useCreatePlan();
  const updatePlanMutation = useUpdatePlan();
  const deletePlanMutation = useDeletePlan();
  const createCategoryMutation = useCreateCategory();
  const updateCategoryMutation = useUpdateCategory();
  const deleteCategoryMutation = useDeleteCategory();
  const createTopicMutation = useCreateTopic();
  const updateTopicMutation = useUpdateTopic();
  const deleteTopicMutation = useDeleteTopic();
  const createQuestionMutation = useCreateQuestion();
  const updateQuestionMutation = useUpdateQuestion();
  const deleteQuestionMutation = useDeleteQuestion();

  // Card operations
  const handleCreateCard = useCallback(
    async (cardData: Partial<LearningCard>) => {
      try {
        await createCardMutation.mutateAsync(cardData);
        await notifyContentUpdate("Learning Card", "created");
        showSuccess(
          "Card Created Successfully",
          `"${cardData.title}" has been created successfully.`,
        );
        onCardModalClose();
      } catch (error) {
        console.error("Failed to create card:", error);
        showError(
          "Failed to Create Card",
          "There was an error creating the card. Please try again.",
        );
      }
    },
    [
      createCardMutation,
      notifyContentUpdate,
      showSuccess,
      showError,
      onCardModalClose,
    ],
  );

  const handleUpdateCard = useCallback(
    async (card_id: string, cardData: Partial<LearningCard>) => {
      try {
        await updateCardMutation.mutateAsync({ id: card_id, data: cardData });
        await notifyContentUpdate("Learning Card", "updated");
        showSuccess(
          "Card Updated Successfully",
          `"${cardData.title}" has been updated successfully.`,
        );
        onCardModalClose();
      } catch (error) {
        console.error("Failed to update card:", error);
        showError(
          "Failed to Update Card",
          "There was an error updating the card. Please try again.",
        );
      }
    },
    [
      updateCardMutation,
      notifyContentUpdate,
      showSuccess,
      showError,
      onCardModalClose,
    ],
  );

  const handleDeleteCard = useCallback(
    async (card: LearningCard) => {
      try {
        await deleteCardMutation.mutateAsync(card.id);
        await notifyContentUpdate("Learning Card", "deleted");
        showSuccess(
          "Card Deleted Successfully",
          `"${card.title}" has been deleted successfully.`,
        );
      } catch (error) {
        console.error("Failed to delete card:", error);
        showError(
          "Failed to Delete Card",
          "There was an error deleting the card. Please try again.",
        );
      }
    },
    [deleteCardMutation, notifyContentUpdate, showSuccess, showError],
  );

  // Plan operations
  const handleCreatePlan = useCallback(
    async (planData: Partial<LearningPlan>) => {
      try {
        await createPlanMutation.mutateAsync(planData);
        await notifyContentUpdate("Learning Plan", "created");
      } catch (error) {
        console.error("Failed to create plan:", error);
      }
    },
    [createPlanMutation, notifyContentUpdate],
  );

  const handleUpdatePlan = useCallback(
    async (plan_id: string, planData: Partial<LearningPlan>) => {
      try {
        await updatePlanMutation.mutateAsync({ id: plan_id, data: planData });
        await notifyContentUpdate("Learning Plan", "updated");
        onPlanModalClose();
      } catch (error) {
        console.error("Failed to update plan:", error);
      }
    },
    [updatePlanMutation, notifyContentUpdate, onPlanModalClose],
  );

  const handleDeletePlan = useCallback(
    async (plan: LearningPlan) => {
      try {
        await deletePlanMutation.mutateAsync(plan.id);
        await notifyContentUpdate("Learning Plan", "deleted");
        showSuccess(
          "Plan Deleted Successfully",
          `"${plan.name || plan.title}" has been deleted successfully.`,
        );
      } catch (error) {
        console.error("Failed to delete plan:", error);
        showError(
          "Failed to Delete Plan",
          "There was an error deleting the plan. Please try again.",
        );
      }
    },
    [deletePlanMutation, notifyContentUpdate, showSuccess, showError],
  );

  // Category operations
  const handleCreateCategory = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (categoryData: any) => {
      try {
        await createCategoryMutation.mutateAsync(categoryData);
      } catch (error) {
        console.error("Failed to create category:", error);
      }
    },
    [createCategoryMutation],
  );

  const handleUpdateCategory = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (categoryId: string, categoryData: any) => {
      try {
        await updateCategoryMutation.mutateAsync({
          id: categoryId,
          data: categoryData,
        });
      } catch (error) {
        console.error("Failed to update category:", error);
      }
    },
    [updateCategoryMutation],
  );

  const handleDeleteCategory = useCallback(
    async (category: Category) => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const categoryId = (category as any).id;
        await deleteCategoryMutation.mutateAsync(categoryId);
        await notifyContentUpdate("Category", "deleted");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const categoryName = (category as any).name || (category as any).title || "Category";
        showSuccess(
          "Category Deleted Successfully",
          `"${categoryName}" has been deleted.`,
        );
      } catch (error) {
        console.error("Failed to delete category:", error);
        showError(
          "Failed to Delete Category",
          "There was an error deleting the category. Please try again.",
        );
      }
    },
    [deleteCategoryMutation, notifyContentUpdate, showSuccess, showError],
  );

  // Topic operations
  const handleCreateTopic = useCallback(
    async (topicData: Partial<Topic>) => {
      try {
        await createTopicMutation.mutateAsync(topicData);
      } catch (error) {
        console.error("Failed to create topic:", error);
      }
    },
    [createTopicMutation],
  );

  const handleBulkCreateTopics = useCallback(
    async (topicsData: any[]) => {
      let successCount = 0;
      let failedCount = 0;
      const errors: string[] = [];

      for (let i = 0; i < topicsData.length; i++) {
        const topicData = topicsData[i];
        try {
          await createTopicMutation.mutateAsync(topicData);
          successCount++;
        } catch (error) {
          failedCount++;
          const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
          errors.push(
            `Topic ${i + 1} (${topicData.name || "unnamed"}): ${errorMessage}`,
          );
          console.error(`Failed to create topic ${i + 1}:`, error);
        }
      }

      if (successCount > 0) {
        showSuccess(
          "Topics Created",
          `Successfully created ${successCount} topic${successCount !== 1 ? "s" : ""}${failedCount > 0 ? `, ${failedCount} failed` : ""}`,
        );
      }

      if (failedCount > 0 && errors.length > 0) {
        console.error("Bulk topic creation errors:", errors);
        showError(
          "Some Topics Failed",
          `${failedCount} topic${failedCount !== 1 ? "s" : ""} failed to create. Check console for details.`,
        );
      }

      if (successCount > 0) {
        onTopicModalClose();
      }
    },
    [createTopicMutation, showSuccess, showError, onTopicModalClose],
  );

  const handleUpdateTopic = useCallback(
    async (topicId: string, topicData: Partial<Topic>) => {
      try {
        await updateTopicMutation.mutateAsync({ id: topicId, data: topicData });
      } catch (error) {
        console.error("Failed to update topic:", error);
      }
    },
    [updateTopicMutation],
  );

  const handleDeleteTopic = useCallback(
    async (topic: Topic) => {
      try {
        await deleteTopicMutation.mutateAsync(topic.id);
        await notifyContentUpdate("Topic", "deleted");
        showSuccess(
          "Topic Deleted Successfully",
          `"${topic.name || topic.title}" has been deleted.`,
        );
      } catch (error) {
        console.error("Failed to delete topic:", error);
        showError(
          "Failed to Delete Topic",
          "There was an error deleting the topic. Please try again.",
        );
      }
    },
    [deleteTopicMutation, notifyContentUpdate, showSuccess, showError],
  );

  // Question operations
  const handleCreateQuestion = useCallback(
    async (questionData: Partial<UnifiedQuestion>) => {
      try {
        await createQuestionMutation.mutateAsync(questionData);
      } catch (error) {
        console.error("Failed to create question:", error);
      }
    },
    [createQuestionMutation],
  );

  const handleUpdateQuestion = useCallback(
    async (question_id: string, questionData: Partial<UnifiedQuestion>) => {
      try {
        await updateQuestionMutation.mutateAsync({
          id: question_id,
          data: questionData,
        });
      } catch (error) {
        console.error("Failed to update question:", error);
      }
    },
    [updateQuestionMutation],
  );

  const handleDeleteQuestion = useCallback(
    async (question: UnifiedQuestion) => {
      try {
        await deleteQuestionMutation.mutateAsync(question.id);
        await notifyContentUpdate("Question", "deleted");
        showSuccess(
          "Question Deleted Successfully",
          `"${question.title}" has been deleted.`,
        );
      } catch (error) {
        console.error("Failed to delete question:", error);
        showError(
          "Failed to Delete Question",
          "There was an error deleting the question. Please try again.",
        );
      }
    },
    [deleteQuestionMutation, notifyContentUpdate, showSuccess, showError],
  );

  // Hierarchy operations (add/remove items)
  const addCardToPlan = useCallback(
    async (planId: string, cardId: string) => {
      try {
        const response = await fetch(`/api/plans/${planId}/cards`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ card_id: cardId }),
        });
        const result = await response.json();
        if (result.success) {
          showSuccess("Card Added", "Card added to plan successfully");
          await fetchPlanHierarchy(planId);
          queryClient.invalidateQueries();
        } else {
          showError(
            "Failed to Add",
            result.error || "Failed to add card to plan",
          );
        }
      } catch (error) {
        console.error("Error adding card to plan:", error);
        showError("Failed to Add", "Failed to add card to plan");
      }
    },
    [fetchPlanHierarchy, queryClient, showSuccess, showError],
  );

  const addCategoryToCard = useCallback(
    async (cardId: string, categoryId: string) => {
      try {
        const response = await fetch(`/api/cards/${cardId}/categories`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ category_id: categoryId }),
        });
        const result = await response.json();
        if (result.success) {
          showSuccess("Category Added", "Category added to card successfully");
          const plan = plans.find((p) => {
            const hierarchy = planHierarchy[p.id] || [];
            return hierarchy.some((c: any) => c.id === cardId);
          });
          if (plan) {
            await fetchPlanHierarchy(plan.id);
          }
          queryClient.invalidateQueries();
        } else {
          showError(
            "Failed to Add",
            result.error || "Failed to add category to card",
          );
        }
      } catch (error) {
        console.error("Error adding category to card:", error);
        showError("Failed to Add", "Failed to add category to card");
      }
    },
    [
      plans,
      planHierarchy,
      fetchPlanHierarchy,
      queryClient,
      showSuccess,
      showError,
    ],
  );

  const addTopicToCategory = useCallback(
    async (categoryId: string, topicId: string) => {
      try {
        const response = await fetch(`/api/categories/${categoryId}/topics`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ topic_id: topicId }),
        });
        const result = await response.json();
        if (result.success) {
          showSuccess("Topic Added", "Topic added to category successfully");
          const plan = plans.find((p) => {
            const hierarchy = planHierarchy[p.id] || [];
            return hierarchy.some((c: any) =>
              c.categories?.some((cat: any) => cat.id === categoryId),
            );
          });
          if (plan) {
            await fetchPlanHierarchy(plan.id);
          }
          queryClient.invalidateQueries();
        } else {
          showError(
            "Failed to Add",
            result.error || "Failed to add topic to category",
          );
        }
      } catch (error) {
        console.error("Error adding topic to category:", error);
        showError("Failed to Add", "Failed to add topic to category");
      }
    },
    [
      plans,
      planHierarchy,
      fetchPlanHierarchy,
      queryClient,
      showSuccess,
      showError,
    ],
  );

  const addQuestionToTopic = useCallback(
    async (topicId: string, questionId: string) => {
      try {
        const response = await fetch(`/api/topics/${topicId}/questions`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question_id: questionId }),
        });
        const result = await response.json();
        if (result.success) {
          showSuccess("Question Added", "Question added to topic successfully");
          const plan = plans.find((p) => {
            const hierarchy = planHierarchy[p.id] || [];
            return hierarchy.some((c: any) =>
              c.categories?.some((cat: any) =>
                cat.topics?.some((t: any) => t.id === topicId),
              ),
            );
          });
          if (plan) {
            await fetchPlanHierarchy(plan.id);
          }
          queryClient.invalidateQueries();
        } else {
          showError(
            "Failed to Add",
            result.error || "Failed to add question to topic",
          );
        }
      } catch (error) {
        console.error("Error adding question to topic:", error);
        showError("Failed to Add", "Failed to add question to topic");
      }
    },
    [
      plans,
      planHierarchy,
      fetchPlanHierarchy,
      queryClient,
      showSuccess,
      showError,
    ],
  );

  const removeCardFromPlan = useCallback(
    async (planId: string, cardId: string) => {
      try {
        const response = await fetch(
          `/api/plans/${planId}/cards?card_id=${cardId}`,
          {
            method: "DELETE",
          },
        );
        const result = await response.json();
        if (result.success) {
          showSuccess("Card Removed", "Card removed from plan successfully");
          await fetchPlanHierarchy(planId);
          queryClient.invalidateQueries();
        } else {
          showError(
            "Failed to Remove",
            result.error || "Failed to remove card from plan",
          );
        }
      } catch (error) {
        console.error("Error removing card from plan:", error);
        showError("Failed to Remove", "Failed to remove card from plan");
      }
    },
    [fetchPlanHierarchy, queryClient, showSuccess, showError],
  );

  const removeCategoryFromCard = useCallback(
    async (cardId: string, categoryId: string) => {
      try {
        const response = await fetch(
          `/api/cards/${cardId}/categories?category_id=${categoryId}`,
          {
            method: "DELETE",
          },
        );
        const result = await response.json();
        if (result.success) {
          showSuccess(
            "Category Removed",
            "Category removed from card successfully",
          );
          const plan = plans.find((p) => {
            const hierarchy = planHierarchy[p.id] || [];
            return hierarchy.some((c: any) => c.id === cardId);
          });
          if (plan) {
            await fetchPlanHierarchy(plan.id);
          }
          queryClient.invalidateQueries();
        } else {
          showError(
            "Failed to Remove",
            result.error || "Failed to remove category from card",
          );
        }
      } catch (error) {
        console.error("Error removing category from card:", error);
        showError("Failed to Remove", "Failed to remove category from card");
      }
    },
    [
      plans,
      planHierarchy,
      fetchPlanHierarchy,
      queryClient,
      showSuccess,
      showError,
    ],
  );

  const removeTopicFromCategory = useCallback(
    async (categoryId: string, topicId: string) => {
      try {
        const response = await fetch(
          `/api/categories/${categoryId}/topics?topic_id=${topicId}`,
          {
            method: "DELETE",
          },
        );
        const result = await response.json();
        if (result.success) {
          showSuccess(
            "Topic Removed",
            "Topic removed from category successfully",
          );
          const plan = plans.find((p) => {
            const hierarchy = planHierarchy[p.id] || [];
            return hierarchy.some((c: any) =>
              c.categories?.some((cat: any) => cat.id === categoryId),
            );
          });
          if (plan) {
            await fetchPlanHierarchy(plan.id);
          }
          queryClient.invalidateQueries();
        } else {
          showError(
            "Failed to Remove",
            result.error || "Failed to remove topic from category",
          );
        }
      } catch (error) {
        console.error("Error removing topic from category:", error);
        showError("Failed to Remove", "Failed to remove topic from category");
      }
    },
    [
      plans,
      planHierarchy,
      fetchPlanHierarchy,
      queryClient,
      showSuccess,
      showError,
    ],
  );

  const removeQuestionFromPlan = useCallback(
    async (planId: string, topicId: string, questionId: string) => {
      try {
        console.log("🗑️ Removing question from plan:", {
          planId,
          topicId,
          questionId,
        });

        const topicResponse = await fetch(
          `/api/topics/${topicId}/questions?question_id=${questionId}`,
          {
            method: "DELETE",
          },
        );
        const topicResult = await topicResponse.json();

        const planResponse = await fetch(
          `/api/plans/${planId}/questions?question_id=${questionId}`,
          {
            method: "DELETE",
          },
        );
        const planResult = await planResponse.json();

        if (topicResult.success && planResult.success) {
          showSuccess(
            "Question Removed",
            "Question removed from plan and topic successfully",
          );
          await fetchPlanHierarchy(planId);
          queryClient.invalidateQueries({
            queryKey: ["plan-hierarchy", planId],
          });
          queryClient.invalidateQueries({ queryKey: ["plans"] });
          queryClient.invalidateQueries({ queryKey: ["questions"] });
          queryClient.invalidateQueries({ queryKey: ["topics"] });
        } else if (topicResult.success) {
          showSuccess(
            "Question Removed",
            "Question removed from topic successfully",
          );
          await fetchPlanHierarchy(planId);
          queryClient.invalidateQueries({
            queryKey: ["plan-hierarchy", planId],
          });
          queryClient.invalidateQueries({ queryKey: ["plans"] });
        } else if (planResult.success) {
          showSuccess(
            "Question Removed",
            "Question removed from plan successfully",
          );
          await fetchPlanHierarchy(planId);
          queryClient.invalidateQueries({
            queryKey: ["plan-hierarchy", planId],
          });
          queryClient.invalidateQueries({ queryKey: ["plans"] });
        } else {
          const errorMsg =
            topicResult.error ||
            planResult.error ||
            "Failed to remove question";
          showError("Failed to Remove", errorMsg);
        }
      } catch (error) {
        console.error("❌ Error removing question from plan:", error);
        showError("Failed to Remove", "Failed to remove question from plan");
      }
    },
    [fetchPlanHierarchy, queryClient, showSuccess, showError],
  );

  return {
    // Card operations
    handleCreateCard,
    handleUpdateCard,
    handleDeleteCard,
    // Plan operations
    handleCreatePlan,
    handleUpdatePlan,
    handleDeletePlan,
    // Category operations
    handleCreateCategory,
    handleUpdateCategory,
    handleDeleteCategory,
    // Topic operations
    handleCreateTopic,
    handleBulkCreateTopics,
    handleUpdateTopic,
    handleDeleteTopic,
    // Question operations
    handleCreateQuestion,
    handleUpdateQuestion,
    handleDeleteQuestion,
    // Hierarchy operations
    addCardToPlan,
    addCategoryToCard,
    addTopicToCategory,
    addQuestionToTopic,
    removeCardFromPlan,
    removeCategoryFromCard,
    removeTopicFromCategory,
    removeQuestionFromPlan,
    // Mutation states (for loading indicators)
    createCardMutation,
    updateCardMutation,
    deleteCardMutation,
    createPlanMutation,
    updatePlanMutation,
    deletePlanMutation,
    createCategoryMutation,
    updateCategoryMutation,
    deleteCategoryMutation,
    createTopicMutation,
    updateTopicMutation,
    deleteTopicMutation,
    createQuestionMutation,
    updateQuestionMutation,
    deleteQuestionMutation,
  };
}
