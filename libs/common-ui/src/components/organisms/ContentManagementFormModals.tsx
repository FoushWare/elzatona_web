/**
 * ContentManagementFormModals Component
 * Wraps all form modals for content management
 * v1.0
 */

"use client";

import React, { Suspense } from "react";
import { Modal } from "@elzatona/common-ui";
import {
  LearningCard,
  UnifiedQuestion,
  type LearningPlan,
  type AdminCategory as Category,
  type Topic,
} from "@elzatona/types";

// Lazy load forms
const CategoryForm = React.lazy(() =>
  import("@elzatona/common-ui").then((module) => ({
    default: module.CategoryForm,
  })),
);
const TopicForm = React.lazy(() =>
  import("@elzatona/common-ui").then((module) => ({
    default: module.TopicForm,
  })),
);
const QuestionForm = React.lazy(() =>
  import("@elzatona/common-ui").then((module) => ({
    default: module.QuestionForm,
  })),
);
const CardForm = React.lazy(() =>
  import("@elzatona/common-ui").then((module) => ({
    default: module.CardForm,
  })),
);
const PlanForm = React.lazy(() =>
  import("@elzatona/common-ui").then((module) => ({
    default: module.PlanForm,
  })),
);

interface ContentManagementFormModalsProps {
  // Card modal
  isCardModalOpen: boolean;
  onCloseCardModal: () => void;
  editingCard: LearningCard | null;
  onCardFormSubmit: (data: any) => void;
  isCardLoading: boolean;

  // Plan modal
  isPlanModalOpen: boolean;
  onClosePlanModal: () => void;
  editingPlan: LearningPlan | null;
  onPlanFormSubmit: (data: any) => void;
  isPlanLoading: boolean;

  // Category modal
  isCategoryModalOpen: boolean;
  onCloseCategoryModal: () => void;
  editingCategory: Category | null;
  onCategoryFormSubmit: (data: any) => Promise<void>;
  isCategoryLoading: boolean;

  // Topic modal
  isTopicModalOpen: boolean;
  onCloseTopicModal: () => void;
  editingTopic: Topic | null;
  categories: readonly Category[];
  onTopicFormSubmit: (data: any) => Promise<void>;
  isTopicLoading: boolean;

  // Question modal
  isQuestionModalOpen: boolean;
  onCloseQuestionModal: () => void;
  editingQuestion: UnifiedQuestion | null;
  topics: readonly Topic[];
  onQuestionFormSubmit: (data: any) => Promise<void>;
  isQuestionLoading: boolean;
}

export function ContentManagementFormModals({
  isCardModalOpen,
  onCloseCardModal,
  editingCard,
  onCardFormSubmit,
  isCardLoading,
  isPlanModalOpen,
  onClosePlanModal,
  editingPlan,
  onPlanFormSubmit,
  isPlanLoading,
  isCategoryModalOpen,
  onCloseCategoryModal,
  editingCategory,
  onCategoryFormSubmit,
  isCategoryLoading,
  isTopicModalOpen,
  onCloseTopicModal,
  editingTopic,
  categories,
  onTopicFormSubmit,
  isTopicLoading,
  isQuestionModalOpen,
  onCloseQuestionModal,
  editingQuestion,
  topics,
  onQuestionFormSubmit,
  isQuestionLoading,
}: ContentManagementFormModalsProps) {
  return (
    <>
      <Modal
        isOpen={isCardModalOpen}
        onClose={onCloseCardModal}
        title={editingCard ? "Edit Card" : "Create New Card"}
      >
        <Suspense fallback={<div>Loading form...</div>}>
          <CardForm
            card={editingCard}
            onSubmit={onCardFormSubmit}
            onCancel={onCloseCardModal}
            isLoading={isCardLoading}
          />
        </Suspense>
      </Modal>

      <Modal
        isOpen={isPlanModalOpen}
        onClose={onClosePlanModal}
        title={editingPlan ? "Edit Plan" : "Create New Plan"}
      >
        <Suspense fallback={<div>Loading form...</div>}>
          <PlanForm
            plan={editingPlan}
            onSubmit={onPlanFormSubmit}
            onCancel={onClosePlanModal}
            isLoading={isPlanLoading}
          />
        </Suspense>
      </Modal>

      <Modal
        isOpen={isCategoryModalOpen}
        onClose={onCloseCategoryModal}
        title={editingCategory ? "Edit Category" : "Create New Category"}
      >
        <Suspense fallback={<div>Loading form...</div>}>
          <CategoryForm
            category={editingCategory}
            onSubmit={onCategoryFormSubmit}
            onCancel={onCloseCategoryModal}
            isLoading={isCategoryLoading}
          />
        </Suspense>
      </Modal>

      <Modal
        isOpen={isTopicModalOpen}
        onClose={onCloseTopicModal}
        title={editingTopic ? "Edit Topic" : "Create New Topic"}
      >
        <Suspense fallback={<div>Loading form...</div>}>
          <TopicForm
            topic={editingTopic}
            categories={[...categories] as readonly Category[]}
            onSubmit={onTopicFormSubmit}
            onCancel={onCloseTopicModal}
            isLoading={isTopicLoading}
          />
        </Suspense>
      </Modal>

      <Modal
        isOpen={isQuestionModalOpen}
        onClose={onCloseQuestionModal}
        title={editingQuestion ? "Edit Question" : "Create New Question"}
      >
        <Suspense fallback={<div>Loading form...</div>}>
          <QuestionForm
            question={editingQuestion as any}
            topics={
              [...topics] as Array<{
                id: string;
                name: string;
                categoryId: string;
              }>
            }
            categories={[...categories] as Array<{ id: string; name: string }>}
            onSubmit={onQuestionFormSubmit}
            onCancel={onCloseQuestionModal}
            isLoading={isQuestionLoading}
          />
        </Suspense>
      </Modal>
    </>
  );
}

export type ContentManagementFormModalsPropsType =
  ContentManagementFormModalsProps;
