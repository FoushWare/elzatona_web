"use client";

import React, { useState, useRef } from "react";
import { FormModal, Switch, Label } from "@elzatona/common-ui";
import { QuestionPracticeView } from "./QuestionPracticeView";
import {
  QuestionForm,
  type UnifiedQuestion,
} from "../src/pages_legacy/admin/content/questions/components/QuestionForm";
import { Edit, Eye } from "lucide-react";

interface ViewQuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  question: UnifiedQuestion | null;
  cards: Array<{ id: string; title: string }>;
  allCategories: string[];
  onUpdate: (question: Partial<UnifiedQuestion>) => Promise<void>;
  editFormRef: React.RefObject<HTMLFormElement>;
}

export const ViewQuestionModal: React.FC<ViewQuestionModalProps> = ({
  isOpen,
  onClose,
  question,
  cards,
  allCategories,
  onUpdate,
  editFormRef,
}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const localFormRef = useRef<HTMLFormElement>(null);

  const handleToggleEdit = () => {
    setIsEditMode(!isEditMode);
  };

  const handleSave = async () => {
    if (isEditMode && (editFormRef.current || localFormRef.current)) {
      const formRef = editFormRef.current || localFormRef.current;
      if (formRef) {
        setIsSaving(true);
        try {
          formRef.requestSubmit();
        } catch (error) {
          console.error("Error saving question:", error);
        } finally {
          setIsSaving(false);
        }
      }
    }
  };

  const handleUpdate = async (updatedQuestion: Partial<UnifiedQuestion>) => {
    setIsSaving(true);
    try {
      await onUpdate(updatedQuestion);
      setIsEditMode(false); // Switch back to view mode after successful update
    } catch (error) {
      console.error("Error updating question:", error);
    } finally {
      setIsSaving(false);
    }
  };

  if (!question) return null;

  return (
    <FormModal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        setIsEditMode(false); // Reset to view mode when closing
      }}
      title={isEditMode ? "Edit Question" : "View Question"}
      maxWidth="max-w-6xl"
      saveLabel={isEditMode ? "Update Question" : undefined}
      onSave={handleSave}
      saveDisabled={isSaving}
      saveLoading={isSaving}
    >
      {/* Toggle Switch */}
      <div className="mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Label
              htmlFor="edit-toggle"
              className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer"
            >
              {isEditMode ? (
                <span className="flex items-center gap-2">
                  <Edit className="w-4 h-4" />
                  Edit Mode
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  View Mode
                </span>
              )}
            </Label>
            <Switch
              id="edit-toggle"
              checked={isEditMode}
              onCheckedChange={handleToggleEdit}
            />
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {isEditMode
              ? "You can now edit the question fields below"
              : "Toggle to edit this question"}
          </p>
        </div>
      </div>

      {/* Content based on mode */}
      {isEditMode ? (
        <QuestionForm
          ref={editFormRef || localFormRef}
          initialData={question}
          onSubmit={handleUpdate}
          onCancel={onClose}
          cards={cards}
          allCategories={allCategories}
          allTags={[]}
          readOnly={false}
        />
      ) : (
        <QuestionPracticeView
          question={{
            id: question.id,
            title: question.title || "",
            content: question.content,
            type: question.type || "multiple-choice",
            difficulty:
              (question.difficulty === "beginner"
                ? "easy"
                : question.difficulty === "intermediate"
                  ? "medium"
                  : question.difficulty === "advanced"
                    ? "hard"
                    : question.difficulty) || "medium",
            explanation: question.explanation,
            options: question.options,
            correct_answer: question.correct_answer,
            resources: (question as { resources?: unknown[] }).resources || [],
          }}
        />
      )}
    </FormModal>
  );
};
