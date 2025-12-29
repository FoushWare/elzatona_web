/**
 * ContentManagementDeleteModals Component
 * Wraps all delete confirmation modals
 * v1.0
 */

"use client";

import React from "react";
import { ConfirmDeleteDialog } from "../molecules/ConfirmDeleteDialog";
import { LearningCard } from "@elzatona/types";
import { UnifiedQuestion } from "@elzatona/types";

// Types
type LearningPlan = any; // eslint-disable-line @typescript-eslint/no-explicit-any
type Category = any; // eslint-disable-line @typescript-eslint/no-explicit-any
type Topic = any; // eslint-disable-line @typescript-eslint/no-explicit-any

interface ContentManagementDeleteModalsProps {
  categoryToDelete: Category | null;
  onCloseCategoryDelete: () => void;
  onConfirmDeleteCategory: () => Promise<void>;
  isDeletingCategory: boolean;

  topicToDelete: Topic | null;
  onCloseTopicDelete: () => void;
  onConfirmDeleteTopic: () => Promise<void>;
  isDeletingTopic: boolean;

  questionToDelete: UnifiedQuestion | null;
  onCloseQuestionDelete: () => void;
  onConfirmDeleteQuestion: () => Promise<void>;
  isDeletingQuestion: boolean;

  cardToDelete: LearningCard | null;
  onCloseCardDelete: () => void;
  onConfirmDeleteCard: () => Promise<void>;
  isDeletingCard: boolean;

  planToDelete: LearningPlan | null;
  onClosePlanDelete: () => void;
  onConfirmDeletePlan: () => Promise<void>;
  isDeletingPlan: boolean;
}

export function ContentManagementDeleteModals({
  categoryToDelete,
  onCloseCategoryDelete,
  onConfirmDeleteCategory,
  isDeletingCategory,
  topicToDelete,
  onCloseTopicDelete,
  onConfirmDeleteTopic,
  isDeletingTopic,
  questionToDelete,
  onCloseQuestionDelete,
  onConfirmDeleteQuestion,
  isDeletingQuestion,
  cardToDelete,
  onCloseCardDelete,
  onConfirmDeleteCard,
  isDeletingCard,
  planToDelete,
  onClosePlanDelete,
  onConfirmDeletePlan,
  isDeletingPlan,
}: ContentManagementDeleteModalsProps) {
  return (
    <>
      <ConfirmDeleteDialog
        isOpen={!!categoryToDelete}
        onClose={onCloseCategoryDelete}
        onConfirm={onConfirmDeleteCategory}
        title="Delete Category"
        itemName={categoryToDelete?.name || categoryToDelete?.title || ""}
        itemType="category"
        isLoading={isDeletingCategory}
      />

      <ConfirmDeleteDialog
        isOpen={!!topicToDelete}
        onClose={onCloseTopicDelete}
        onConfirm={onConfirmDeleteTopic}
        title="Delete Topic"
        itemName={topicToDelete?.name || topicToDelete?.title || ""}
        itemType="topic"
        isLoading={isDeletingTopic}
      />

      <ConfirmDeleteDialog
        isOpen={!!questionToDelete}
        onClose={onCloseQuestionDelete}
        onConfirm={onConfirmDeleteQuestion}
        title="Delete Question"
        itemName={questionToDelete?.title || ""}
        itemType="question"
        isLoading={isDeletingQuestion}
      />

      <ConfirmDeleteDialog
        isOpen={!!cardToDelete}
        onClose={onCloseCardDelete}
        onConfirm={onConfirmDeleteCard}
        title="Delete Card"
        itemName={cardToDelete?.title || ""}
        itemType="card"
        isLoading={isDeletingCard}
      />

      <ConfirmDeleteDialog
        isOpen={!!planToDelete}
        onClose={onClosePlanDelete}
        onConfirm={onConfirmDeletePlan}
        title="Delete Plan"
        itemName={planToDelete?.name || planToDelete?.title || ""}
        itemType="plan"
        isLoading={isDeletingPlan}
      />
    </>
  );
}

export type ContentManagementDeleteModalsPropsType =
  ContentManagementDeleteModalsProps;
