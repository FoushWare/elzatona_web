/**
 * ContentManagementModals Component
 * Consolidates all modals (forms, delete, add item, view question)
 * v1.0
 */

import React, { Suspense } from "react";
import { LearningCard, UnifiedQuestion } from "@elzatona/types";
import type {
  LearningPlan,
  AdminCategory as Category,
  Topic,
  AddItemContext,
} from "@elzatona/types";
import {
  ContentManagementFormModals,
  ContentManagementDeleteModals,
} from "../organisms";

interface ContentManagementModalsProps {
  // Data
  data: {
    cards: readonly LearningCard[];
    categories: readonly Category[];
    topics: readonly Topic[];
    questions: readonly UnifiedQuestion[];
    cardsData?: { data: readonly LearningCard[] };
  };
  // Modals state
  modals: {
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
    setAddItemContext: (
      context: {
        planId: string;
        type: "card" | "category" | "topic" | "question";
        parentId?: string;
      } | null,
    ) => void;
    setSelectedQuestionIds: (ids: Set<string>) => void;
  };
  // Handlers
  handlers: {
    onCardFormSubmit: (data: any) => void;
    onPlanFormSubmit: (data: any) => void;
    onCategoryFormSubmit: (data: any) => void | Promise<void>;
    onTopicFormSubmit: (data: any) => void | Promise<void>;
    onQuestionFormSubmit: (data: any) => void | Promise<void>;
  };
  // Actions
  actions: {
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
    addCardToPlan: (planId: string, cardId: string) => Promise<void>;
    addCategoryToCard: (cardId: string, categoryId: string) => Promise<void>;
    addTopicToCategory: (categoryId: string, topicId: string) => Promise<void>;
    addQuestionToTopic: (topicId: string, questionId: string) => Promise<void>;
  };
  // Hierarchy
  hierarchy: {
    planHierarchy: Record<string, any>;
    fetchPlanHierarchy: (planId: string) => Promise<void>;
  };
  // Delete handlers
  confirmDeleteHandlers: {
    card: () => Promise<void>;
    plan: () => Promise<void>;
    category: () => Promise<void>;
    topic: () => Promise<void>;
    question: () => Promise<void>;
  };
  // Optional app-specific modals
  appSpecificModals?: {
    AddItemModal?: React.ComponentType<{
      isOpen: boolean;
      onClose: () => void;
      addItemContext: AddItemContext | null;
      cards: readonly LearningCard[];
      categories: readonly Category[];
      topics: readonly Topic[];
      questions: readonly UnifiedQuestion[];
      planHierarchy: Record<string, any>;
      onAddCardToPlan: (planId: string, cardId: string) => Promise<void>;
      onAddCategoryToCard: (
        cardId: string,
        categoryId: string,
      ) => Promise<void>;
      onAddTopicToCategory: (
        categoryId: string,
        topicId: string,
      ) => Promise<void>;
      onAddQuestionToTopic: (
        topicId: string,
        questionId: string,
      ) => Promise<void>;
      onFetchPlanHierarchy: (planId: string) => Promise<void>;
      onViewQuestion: (question: UnifiedQuestion) => void;
    }>;
    ViewQuestionModal?: React.ComponentType<{
      isOpen: boolean;
      onClose: () => void;
      question: UnifiedQuestion | null;
      cards: readonly LearningCard[];
      allCategories: string[];
      categoriesData: readonly Category[];
      topicsData: readonly Topic[];
    }>;
  };
}

export function ContentManagementModals({
  data,
  modals,
  handlers,
  actions,
  hierarchy,
  confirmDeleteHandlers,
  appSpecificModals,
}: ContentManagementModalsProps) {
  const AddItemModal = appSpecificModals?.AddItemModal;
  const ViewQuestionModal = appSpecificModals?.ViewQuestionModal;

  return (
    <Suspense fallback={null}>
      {/* Form Modals */}
      <ContentManagementFormModals
        isCardModalOpen={modals.isCardModalOpen}
        onCloseCardModal={modals.closeCardModal}
        editingCard={modals.editingCard}
        onCardFormSubmit={handlers.onCardFormSubmit}
        isCardLoading={
          actions.createCardMutation.isPending ||
          actions.updateCardMutation.isPending
        }
        isPlanModalOpen={modals.isPlanModalOpen}
        onClosePlanModal={modals.closePlanModal}
        editingPlan={modals.editingPlan}
        onPlanFormSubmit={handlers.onPlanFormSubmit}
        isPlanLoading={
          actions.createPlanMutation.isPending ||
          actions.updatePlanMutation.isPending
        }
        isCategoryModalOpen={modals.isCategoryModalOpen}
        onCloseCategoryModal={modals.closeCategoryModal}
        editingCategory={modals.editingCategory}
        onCategoryFormSubmit={async (data: any) => {
          await handlers.onCategoryFormSubmit(data);
        }}
        isCategoryLoading={
          actions.createCategoryMutation.isPending ||
          actions.updateCategoryMutation.isPending
        }
        isTopicModalOpen={modals.isTopicModalOpen}
        onCloseTopicModal={modals.closeTopicModal}
        editingTopic={modals.editingTopic}
        categories={data.categories}
        onTopicFormSubmit={async (data: any) => {
          await handlers.onTopicFormSubmit(data);
        }}
        isTopicLoading={
          actions.createTopicMutation.isPending ||
          actions.updateTopicMutation.isPending
        }
        isQuestionModalOpen={modals.isQuestionModalOpen}
        onCloseQuestionModal={modals.closeQuestionModal}
        editingQuestion={modals.editingQuestion}
        topics={data.topics}
        onQuestionFormSubmit={async (data: any) => {
          await handlers.onQuestionFormSubmit(data);
        }}
        isQuestionLoading={
          actions.createQuestionMutation.isPending ||
          actions.updateQuestionMutation.isPending
        }
      />

      {/* Delete Confirmation Modals */}
      <ContentManagementDeleteModals
        categoryToDelete={modals.categoryToDelete}
        onCloseCategoryDelete={() => modals.setCategoryToDelete(null)}
        onConfirmDeleteCategory={confirmDeleteHandlers.category}
        isDeletingCategory={actions.deleteCategoryMutation.isPending}
        topicToDelete={modals.topicToDelete}
        onCloseTopicDelete={() => modals.setTopicToDelete(null)}
        onConfirmDeleteTopic={confirmDeleteHandlers.topic}
        isDeletingTopic={actions.deleteTopicMutation.isPending}
        questionToDelete={modals.questionToDelete}
        onCloseQuestionDelete={() => modals.setQuestionToDelete(null)}
        onConfirmDeleteQuestion={confirmDeleteHandlers.question}
        isDeletingQuestion={actions.deleteQuestionMutation.isPending}
        cardToDelete={modals.cardToDelete}
        onCloseCardDelete={() => modals.setCardToDelete(null)}
        onConfirmDeleteCard={confirmDeleteHandlers.card}
        isDeletingCard={actions.deleteCardMutation.isPending}
        planToDelete={modals.planToDelete}
        onClosePlanDelete={() => modals.setPlanToDelete(null)}
        onConfirmDeletePlan={confirmDeleteHandlers.plan}
        isDeletingPlan={actions.deletePlanMutation.isPending}
      />

      {/* Add Item Modal - App-specific */}
      {AddItemModal && (
        <AddItemModal
          isOpen={!!modals.addItemContext}
          onClose={() => {
            modals.setAddItemContext(null);
            modals.setSelectedQuestionIds(new Set());
          }}
          addItemContext={modals.addItemContext}
          cards={data.cards}
          categories={data.categories}
          topics={data.topics}
          questions={data.questions}
          planHierarchy={hierarchy.planHierarchy}
          onAddCardToPlan={actions.addCardToPlan}
          onAddCategoryToCard={actions.addCategoryToCard}
          onAddTopicToCategory={actions.addTopicToCategory}
          onAddQuestionToTopic={actions.addQuestionToTopic}
          onFetchPlanHierarchy={hierarchy.fetchPlanHierarchy}
          onViewQuestion={(question) => {
            modals.setViewingQuestion(question);
            modals.setIsViewQuestionModalOpen(true);
          }}
        />
      )}

      {/* View Question Modal - App-specific */}
      {ViewQuestionModal && (
        <ViewQuestionModal
          isOpen={modals.isViewQuestionModalOpen}
          onClose={() => {
            modals.setIsViewQuestionModalOpen(false);
            modals.setViewingQuestion(null);
          }}
          question={modals.viewingQuestion}
          cards={data.cardsData?.data || data.cards}
          allCategories={data.categories
            .map((c) => c.name || c.title)
            .filter(Boolean)}
          categoriesData={data.categories}
          topicsData={data.topics}
        />
      )}
    </Suspense>
  );
}

export type ContentManagementModalsPropsType = ContentManagementModalsProps;
