"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import { AdminQuestionForm } from "../../questions/QuestionForm";
import { AdminUnifiedQuestion } from "@elzatona/types";
import { HelpCircle } from "lucide-react";

interface QuestionFormModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  question: AdminUnifiedQuestion | null | undefined;
  topicId?: string;
  cards: Array<{ id: string; title: string }>;
  allCategories: string[];
  allTags?: string[];
  onSubmit: (data: Partial<AdminUnifiedQuestion>) => Promise<void>;
  readOnly?: boolean;
  isLoading?: boolean;
}

export const QuestionFormModal: React.FC<QuestionFormModalProps> = ({
  isOpen,
  onOpenChange,
  question,
  topicId,
  cards,
  allCategories,
  allTags = [],
  onSubmit,
  readOnly = false,
  isLoading = false,
}) => {
  const initialData =
    question || (topicId ? ({ topic_id: topicId } as any) : undefined);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <HelpCircle className="h-5 w-5 text-blue-600" />
            <span>
              {readOnly
                ? "View Question"
                : question
                  ? "Edit Question"
                  : "Create New Question"}
            </span>
          </DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <AdminQuestionForm
            initialData={initialData}
            onSubmit={async (data) => {
              await onSubmit(data);
            }}
            onCancel={() => onOpenChange(false)}
            cards={cards}
            allCategories={allCategories}
            allTags={allTags}
            readOnly={readOnly}
          />
          {isLoading && (
            <div className="absolute inset-0 bg-white/50 flex items-center justify-center z-50">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
