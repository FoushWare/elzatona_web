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
  let modalTitle = "Create New Question";
  if (readOnly) {
    modalTitle = "View Question";
  } else if (question) {
    modalTitle = "Edit Question";
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        className="z-[200] h-[100dvh] w-[100vw] max-w-none overflow-hidden rounded-none border-0 p-0"
        onOpenChange={onOpenChange}
      >
        <div className="flex h-full flex-col bg-white dark:bg-gray-900">
          <DialogHeader className="px-6 pt-6 pb-4 flex-shrink-0">
            <DialogTitle className="flex items-center space-x-2">
              <HelpCircle className="h-5 w-5 text-blue-600" />
              <span>{modalTitle}</span>
            </DialogTitle>
          </DialogHeader>

          <div className="relative flex-1 overflow-y-auto px-6 py-4">
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
        </div>
      </DialogContent>
    </Dialog>
  );
};
