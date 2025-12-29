/**
 * Content Management Page (Refactored)
 * Main page component for content management - uses custom hooks for separation of concerns
 * Target: <300 lines
 * v1.0
 */

"use client";

import React, { useMemo, Suspense } from "react";
import {
  useToast,
  ToastContainer,
  ContentManagementTemplate,
} from "@elzatona/common-ui";

// Custom hooks
import {
  useContentManagementData,
  useContentManagementState,
  useContentManagementModals,
  usePlanHierarchy,
  useContentManagementActions,
  useContentManagementTemplateProps,
  useContentManagementHandlers,
  useContentManagementDeleteHandlers,
} from "@elzatona/hooks";

// Components
import {
  ContentManagementErrorState,
  ContentManagementLoadingState,
} from "@elzatona/common-ui";
import { ContentManagementModals } from "@elzatona/common-ui";
import { AddItemModal } from "./components/AddItemModal";
import { ViewQuestionModal } from "../content/questions/components/ViewQuestionModal";

// Types are defined in hooks/components

export default function UnifiedAdminPage() {
  // Data fetching
  const data = useContentManagementData();

  // UI state management
  const state = useContentManagementState(
    data.categories,
    data.topics,
    data.questions,
    data.cards,
    data.plans,
  );

  // Modal state management
  const modals = useContentManagementModals();

  // Plan hierarchy management
  const hierarchy = usePlanHierarchy(data.plans);

  // CRUD actions
  const actions = useContentManagementActions({
    cards: data.cards,
    plans: data.plans,
    planHierarchy: hierarchy.planHierarchy,
    fetchPlanHierarchy: hierarchy.fetchPlanHierarchy,
    onCardModalClose: modals.closeCardModal,
    onPlanModalClose: modals.closePlanModal,
    onTopicModalClose: modals.closeTopicModal,
  });

  // Toast notifications
  const { toasts, removeToast } = useToast();

  // Stats calculation
  const stats = useMemo(
    () => ({
      totalCards: data.cardsData?.count || 0,
      totalPlans: data.plansData?.count || 0,
      totalCategories: data.categoriesData?.count || 0,
      totalTopics: data.topicsData?.count || 0,
      totalQuestions: data.questionsData?.pagination?.totalCount || 0,
    }),
    [
      data.cardsData,
      data.plansData,
      data.categoriesData,
      data.topicsData,
      data.questionsData,
    ],
  );

  // Filtered cards and plans (computed in state hook)
  const { filteredCards, filteredPlans } = state;

  // Event handlers (must be defined before templateProps)
  const handlers = useContentManagementHandlers({
    cards: data.cards,
    plans: data.plans,
    categories: data.categories,
    topics: data.topics,
    questions: data.questions,
    setCardToDelete: modals.setCardToDelete,
    setPlanToDelete: modals.setPlanToDelete,
    setCategoryToDelete: modals.setCategoryToDelete,
    setTopicToDelete: modals.setTopicToDelete,
    setQuestionToDelete: modals.setQuestionToDelete,
    handleDeleteCard: actions.handleDeleteCard,
    handleDeletePlan: actions.handleDeletePlan,
    handleDeleteCategory: actions.handleDeleteCategory,
    handleDeleteTopic: actions.handleDeleteTopic,
    handleDeleteQuestion: actions.handleDeleteQuestion,
    handleCreateCard: actions.handleCreateCard,
    handleUpdateCard: actions.handleUpdateCard,
    handleCreatePlan: actions.handleCreatePlan,
    handleUpdatePlan: actions.handleUpdatePlan,
    handleCreateCategory: actions.handleCreateCategory,
    handleUpdateCategory: actions.handleUpdateCategory,
    handleCreateTopic: actions.handleCreateTopic,
    handleBulkCreateTopics: actions.handleBulkCreateTopics,
    handleUpdateTopic: actions.handleUpdateTopic,
    handleCreateQuestion: actions.handleCreateQuestion,
    handleUpdateQuestion: actions.handleUpdateQuestion,
    editingCard: modals.editingCard,
    editingPlan: modals.editingPlan,
    editingCategory: modals.editingCategory,
    editingTopic: modals.editingTopic,
    editingQuestion: modals.editingQuestion,
  });

  // Template props
  const templateProps = useContentManagementTemplateProps({
    stats,
    data: {
      cards: data.cards,
      plans: data.plans,
      categories: data.categories,
      topics: data.topics,
      questions: data.questions,
      categoriesLoading: data.categoriesLoading,
      topicsLoading: data.topicsLoading,
    },
    state: {
      searchTerm: state.searchTerm,
      setSearchTerm: state.setSearchTerm,
      filterCardType: state.filterCardType,
      setFilterCardType: state.setFilterCardType,
      categorySearch: state.categorySearch,
      setCategorySearch: state.setCategorySearch,
      topicSearch: state.topicSearch,
      setTopicSearch: state.setTopicSearch,
      selectedCategoryFilter: state.selectedCategoryFilter,
      setSelectedCategoryFilter: state.setSelectedCategoryFilter,
      isCategoriesOpen: state.isCategoriesOpen,
      setIsCategoriesOpen: state.setIsCategoriesOpen,
      isTopicsOpen: state.isTopicsOpen,
      setIsTopicsOpen: state.setIsTopicsOpen,
      filteredCategories: state.filteredCategories,
      filteredTopics: state.filteredTopics,
      questionsByTopic: state.questionsByTopic,
      expandedCards: state.expandedCards,
      expandedCategories: state.expandedCategories,
      expandedTopics: state.expandedTopics,
      toggleCard: state.toggleCard,
      toggleCategory: state.toggleCategory,
      toggleTopic: state.toggleTopic,
    },
    hierarchy: {
      planHierarchy: hierarchy.planHierarchy,
      loadingPlanHierarchy: hierarchy.loadingPlanHierarchy,
      expandedPlans: hierarchy.expandedPlans,
      expandedPlanCards: hierarchy.expandedPlanCards,
      expandedPlanCategories: hierarchy.expandedPlanCategories,
      expandedPlanTopics: hierarchy.expandedPlanTopics,
      togglePlan: hierarchy.togglePlan,
      togglePlanCard: hierarchy.togglePlanCard,
      togglePlanCategory: hierarchy.togglePlanCategory,
      togglePlanTopic: hierarchy.togglePlanTopic,
    },
    modals: {
      openCardModal: modals.openCardModal,
      openPlanModal: modals.openPlanModal,
      openCategoryModal: modals.openCategoryModal,
      openTopicModal: modals.openTopicModal,
      openQuestionModal: modals.openQuestionModal,
      setAddItemContext: modals.setAddItemContext,
      setViewingQuestion: modals.setViewingQuestion,
      setIsViewQuestionModalOpen: modals.setIsViewQuestionModalOpen,
    },
    handlers: {
      onDeleteCard: handlers.onDeleteCard,
      onDeletePlan: handlers.onDeletePlan,
      onDeleteCategory: handlers.onDeleteCategory,
      onDeleteTopic: handlers.onDeleteTopic,
      onDeleteQuestion: handlers.onDeleteQuestion,
    },
    actions: {
      removeCardFromPlan: actions.removeCardFromPlan,
      removeCategoryFromCard: actions.removeCategoryFromCard,
      removeTopicFromCategory: actions.removeTopicFromCategory,
      removeQuestionFromPlan: actions.removeQuestionFromPlan,
      deleteCardMutation: actions.deleteCardMutation,
      deleteCategoryMutation: actions.deleteCategoryMutation,
      deleteTopicMutation: actions.deleteTopicMutation,
      deleteQuestionMutation: actions.deleteQuestionMutation,
      deletePlanMutation: actions.deletePlanMutation,
    },
    filteredCards,
    filteredPlans,
  });

  // Confirm delete handlers
  const confirmDeleteHandlers = useContentManagementDeleteHandlers({
    modals,
    actions,
  });

  // Loading state
  if (data.loading) {
    return <ContentManagementLoadingState />;
  }

  // Error state
  if (data.hasError) {
    return (
      <ContentManagementErrorState
        cardsError={data.cardsError}
        plansError={data.plansError}
        categoriesError={data.categoriesError}
        topicsError={data.topicsError}
        questionsError={data.questionsError}
      />
    );
  }

  return (
    <>
      <Suspense
        fallback={
          <div className="container mx-auto p-6">
            <div className="animate-pulse h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        }
      >
        <ContentManagementTemplate {...templateProps} />
      </Suspense>

      {/* All Modals */}
      <ContentManagementModals
        data={{
          cards: data.cards,
          categories: data.categories,
          topics: data.topics,
          questions: data.questions,
          cardsData: data.cardsData,
        }}
        modals={modals}
        handlers={handlers}
        actions={actions}
        hierarchy={hierarchy}
        confirmDeleteHandlers={confirmDeleteHandlers}
        appSpecificModals={{
          AddItemModal,
          ViewQuestionModal,
        }}
      />

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </>
  );
}
