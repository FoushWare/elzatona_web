"use client";

import React, { useState } from "react";
import { FormModal } from "@elzatona/components";
import { UnifiedQuestion } from "@elzatona/types";
import { QuestionForm } from "./QuestionForm";

interface CreateQuestionModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly onSubmit: (question: Partial<UnifiedQuestion>) => void;
  readonly cards: any[];
  readonly allCategories: string[];
  readonly categoriesData: any[];
  readonly topicsData: any[];
}

export function CreateQuestionModal({
  isOpen,
  onClose,
  onSubmit,
  cards,
  allCategories,
  categoriesData,
  topicsData,
}: CreateQuestionModalProps) {
  const [submitTrigger, setSubmitTrigger] = useState(0);

  const handleSave = () => {
    // Trigger form submission by incrementing the trigger
    setSubmitTrigger((prev) => prev + 1);
  };

  // Reset trigger when modal closes
  React.useEffect(() => {
    if (!isOpen) {
      setSubmitTrigger(0);
    }
  }, [isOpen]);

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Question"
      onSave={handleSave}
      saveLabel="Create Question"
      cancelLabel="Cancel"
      maxWidth="max-w-3xl"
    >
      <QuestionForm
        onSubmit={onSubmit}
        onCancel={onClose}
        cards={cards}
        allCategories={allCategories}
        allTags={[]}
        categoriesData={categoriesData}
        topicsData={topicsData}
        hideFooter={true}
        externalSubmitTrigger={submitTrigger}
      />
    </FormModal>
  );
}
