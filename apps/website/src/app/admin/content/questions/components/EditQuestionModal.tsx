"use client";

import React, { useState } from "react";
import { FormModal } from "@elzatona/components";
import { UnifiedQuestion } from "@elzatona/types";
import { QuestionForm } from "./QuestionForm";

interface EditQuestionModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly question: UnifiedQuestion | null;
  readonly onSubmit: (question: Partial<UnifiedQuestion>) => void;
  readonly cards: Array<{ id: string; title: string }>;
  readonly allCategories: string[];
  readonly categoriesData: Array<{ id: string; name: string }>;
  readonly topicsData: Array<{ id: string; name: string }>;
}

export function EditQuestionModal({
  isOpen,
  onClose,
  question,
  onSubmit,
  cards,
  allCategories,
  categoriesData,
  topicsData,
}: EditQuestionModalProps) {
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

  if (!question) return null;

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Question"
      onSave={handleSave}
      saveLabel="Save Changes"
      cancelLabel="Cancel"
      maxWidth="max-w-3xl"
    >
      <QuestionForm
        initialData={question}
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
