/**
 * useContentManagementTemplateProps Hook
 * Prepares all props for ContentManagementTemplate
 * v1.0
 */

import { useMemo } from "react";
import { Plus } from "lucide-react";
import {
  LearningCard,
  UnifiedQuestion,
  type LearningPlan,
  type Category,
  type Topic,
} from "@elzatona/types";

interface UseContentManagementTemplatePropsParams {
  stats: {
    totalCards: number;
    totalPlans: number;
    totalCategories: number;
    totalTopics: number;
    totalQuestions: number;
  };
  data: {
    cards: readonly LearningCard[];
    plans: readonly LearningPlan[];
    categories: readonly Category[];
    topics: readonly Topic[];
    questions: readonly UnifiedQuestion[];
    categoriesLoading: boolean;
    topicsLoading: boolean;
  };
  state: {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    filterCardType: string;
    setFilterCardType: (type: string) => void;
    categorySearch: string;
    setCategorySearch: (term: string) => void;
    topicSearch: string;
    setTopicSearch: (term: string) => void;
    selectedCategoryFilter: string | null;
    setSelectedCategoryFilter: (id: string | null) => void;
    isCategoriesOpen: boolean;
    setIsCategoriesOpen: (open: boolean) => void;
    isTopicsOpen: boolean;
    setIsTopicsOpen: (open: boolean) => void;
    filteredCategories: readonly Category[];
    filteredTopics: readonly Topic[];
    questionsByTopic: Record<
      string,
      { id: string; title: string; difficulty: string; type: string }[]
    >;
    expandedCards: Set<string>;
    expandedCategories: Set<string>;
    expandedTopics: Set<string>;
    toggleCard: (id: string) => void;
    toggleCategory: (id: string) => void;
    toggleTopic: (id: string) => void;
  };
  hierarchy: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    planHierarchy: Record<string, any>;
    loadingPlanHierarchy: Record<string, boolean>;
    expandedPlans: Set<string>;
    expandedPlanCards: Set<string>;
    expandedPlanCategories: Set<string>;
    expandedPlanTopics: Set<string>;
    togglePlan: (id: string) => void;
    togglePlanCard: (id: string) => void;
    togglePlanCategory: (id: string) => void;
    togglePlanTopic: (id: string) => void;
  };
  modals: {
    openCardModal: (card?: LearningCard) => void;
    openPlanModal: (plan?: LearningPlan) => void;
    openCategoryModal: (category?: Category) => void;
    openTopicModal: (topic?: Topic) => void;
    openQuestionModal: (question?: UnifiedQuestion) => void;
    setAddItemContext: (context: {
      planId: string;
      type: "card" | "category" | "topic" | "question";
      parentId?: string;
    }) => void;
    setViewingQuestion: (question: UnifiedQuestion | null) => void;
    setIsViewQuestionModalOpen: (open: boolean) => void;
  };
  handlers: {
    onDeleteCard: (cardId: string) => void;
    onDeletePlan: (planId: string) => void;
    onDeleteCategory: (categoryId: string) => void;
    onDeleteTopic: (topicId: string) => void;
    onDeleteQuestion: (questionId: string) => void;
  };
  actions: {
    removeCardFromPlan: (planId: string, cardId: string) => Promise<void>;
    removeCategoryFromCard: (
      cardId: string,
      categoryId: string,
    ) => Promise<void>;
    removeTopicFromCategory: (
      categoryId: string,
      topicId: string,
    ) => Promise<void>;
    removeQuestionFromPlan: (
      planId: string,
      topicId: string,
      questionId: string,
    ) => Promise<void>;
    deleteCardMutation: { isPending: boolean };
    deleteCategoryMutation: { isPending: boolean };
    deleteTopicMutation: { isPending: boolean };
    deleteQuestionMutation: { isPending: boolean };
    deletePlanMutation: { isPending: boolean };
  };
  filteredCards: readonly LearningCard[];
  filteredPlans: readonly LearningPlan[];
}

export function useContentManagementTemplateProps({
  stats,
  data,
  state,
  hierarchy,
  modals,
  handlers,
  actions,
  filteredCards,
  filteredPlans,
}: UseContentManagementTemplatePropsParams) {
  return useMemo(
    () => ({
      stats,
      searchAndFilters: {
        searchTerm: state.searchTerm,
        onSearchChange: state.setSearchTerm,
        filterCardType: state.filterCardType,
        onFilterChange: state.setFilterCardType,
      },
      actionButtons: [
        {
          label: "Add Card",
          onClick: () => modals.openCardModal(),
          className: "bg-blue-600 hover:bg-blue-700",
          icon: Plus,
        },
        {
          label: "Add Plan",
          onClick: () => modals.openPlanModal(),
          className: "bg-green-600 hover:bg-green-700",
          icon: Plus,
        },
        {
          label: "Add Category",
          onClick: () => modals.openCategoryModal(),
          className: "bg-purple-600 hover:bg-purple-700",
          icon: Plus,
        },
        {
          label: "Add Topic",
          onClick: () => modals.openTopicModal(),
          className: "bg-orange-600 hover:bg-orange-700",
          icon: Plus,
        },
      ],
      categoriesList: {
        categories: data.categories,
        filteredCategories: state.filteredCategories,
        isLoading: data.categoriesLoading,
        searchTerm: state.categorySearch,
        onSearchChange: state.setCategorySearch,
        isOpen: state.isCategoriesOpen,
        onOpenChange: state.setIsCategoriesOpen,
        onAdd: () => modals.openCategoryModal(),
        onEdit: (category: Category) => modals.openCategoryModal(category),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onDelete: (category: any) => handlers.onDeleteCategory((category as any).id),
      },
      topicsList: {
        topics: data.topics,
        filteredTopics: state.filteredTopics,
        categories: data.categories,
        isLoading: data.topicsLoading,
        searchTerm: state.topicSearch,
        onSearchChange: state.setTopicSearch,
        selectedCategoryFilter: state.selectedCategoryFilter,
        onCategoryFilterChange: state.setSelectedCategoryFilter,
        isOpen: state.isTopicsOpen,
        onOpenChange: state.setIsTopicsOpen,
        onAdd: () => modals.openTopicModal(),
        onEdit: (topic: Topic) => modals.openTopicModal(topic),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onDelete: (topic: any) => handlers.onDeleteTopic(topic.id),
      },
      cardsList: {
        cards: filteredCards,
        categories: data.categories,
        topics: data.topics,
        questionsByTopic: state.questionsByTopic,
        expandedCards: state.expandedCards,
        expandedCategories: state.expandedCategories,
        expandedTopics: state.expandedTopics,
        onToggleCard: state.toggleCard,
        onToggleCategory: state.toggleCategory,
        onToggleTopic: state.toggleTopic,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onEditCard: (card: any) => modals.openCardModal(card as any),
        onDeleteCard: handlers.onDeleteCard,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onEditCategory: (category: any) => modals.openCategoryModal(category),
        onDeleteCategory: handlers.onDeleteCategory,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onEditTopic: (topic: any) => modals.openTopicModal(topic),
        onDeleteTopic: handlers.onDeleteTopic,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onEditQuestion: (question: any) =>
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          modals.openQuestionModal(question as any),
        onDeleteQuestion: handlers.onDeleteQuestion,
        onAddQuestion: () => modals.openQuestionModal(),
        totalCards: stats.totalCards,
        isDeletingCard: actions.deleteCardMutation.isPending,
        isDeletingCategory: actions.deleteCategoryMutation.isPending,
        isDeletingTopic: actions.deleteTopicMutation.isPending,
        isDeletingQuestion: actions.deleteQuestionMutation.isPending,
      },
      plansList: {
        plans: filteredPlans,
        planHierarchy: hierarchy.planHierarchy,
        loadingPlanHierarchy: hierarchy.loadingPlanHierarchy,
        expandedPlans: hierarchy.expandedPlans,
        expandedPlanCards: hierarchy.expandedPlanCards,
        expandedPlanCategories: hierarchy.expandedPlanCategories,
        expandedPlanTopics: hierarchy.expandedPlanTopics,
        onTogglePlan: hierarchy.togglePlan,
        onTogglePlanCard: hierarchy.togglePlanCard,
        onTogglePlanCategory: hierarchy.togglePlanCategory,
        onTogglePlanTopic: hierarchy.togglePlanTopic,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onEditPlan: (plan: any) => modals.openPlanModal(plan),
        onDeletePlan: handlers.onDeletePlan,
        onAddCardToPlan: (planId: string) =>
          modals.setAddItemContext({ planId, type: "card" }),
        onAddCategoryToCard: (planId: string, cardId: string) =>
          modals.setAddItemContext({
            planId,
            type: "category",
            parentId: cardId,
          }),
        onAddTopicToCategory: (planId: string, categoryId: string) =>
          modals.setAddItemContext({
            planId,
            type: "topic",
            parentId: categoryId,
          }),
        onAddQuestionToTopic: (planId: string, topicId: string) =>
          modals.setAddItemContext({
            planId,
            type: "question",
            parentId: topicId,
          }),
        onRemoveCardFromPlan: actions.removeCardFromPlan,
        onRemoveCategoryFromCard: actions.removeCategoryFromCard,
        onRemoveTopicFromCategory: actions.removeTopicFromCategory,
        onRemoveQuestionFromPlan: actions.removeQuestionFromPlan,
        totalPlans: stats.totalPlans,
        isDeletingPlan: actions.deletePlanMutation.isPending,
        onViewQuestion: (question: any) => {
          modals.setViewingQuestion(question);
          modals.setIsViewQuestionModalOpen(true);
        },
      },
    }),
    [
      stats,
      data,
      state,
      hierarchy,
      modals,
      handlers,
      actions,
      filteredCards,
      filteredPlans,
    ],
  );
}
