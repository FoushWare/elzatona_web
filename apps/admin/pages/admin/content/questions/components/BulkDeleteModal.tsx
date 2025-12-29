"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Button,
  Badge,
} from "@elzatona/common-ui";
import { AlertTriangle, Trash2, Loader2 } from "lucide-react";
import { UnifiedQuestion } from "@elzatona/types";

interface BulkDeleteModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly selectedQuestionIds: Set<string>;
  readonly questions: UnifiedQuestion[];
  readonly onConfirm: () => void;
  readonly loading: boolean;
}

export function BulkDeleteModal({
  isOpen,
  onClose,
  selectedQuestionIds,
  questions,
  onConfirm,
  loading,
}: BulkDeleteModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
            <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white">
              Delete Selected Questions
            </DialogTitle>
          </div>
          <DialogDescription className="text-base text-gray-600 dark:text-gray-400 pt-2">
            Are you sure you want to delete{" "}
            <strong className="text-red-600 dark:text-red-400">
              {selectedQuestionIds.size}
            </strong>{" "}
            question{selectedQuestionIds.size === 1 ? "" : "s"}? This action
            cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <div className="my-4 p-4 bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-sm font-semibold text-red-800 dark:text-red-200 mb-2">
            ⚠️ Warning: This will permanently delete the following questions:
          </p>
          <div className="max-h-48 overflow-y-auto space-y-2">
            {Array.from(selectedQuestionIds)
              .slice(0, 10)
              .map((questionId) => {
                const question = questions.find((q) => q.id === questionId);
                return (
                  <div
                    key={questionId}
                    className="p-2 bg-white dark:bg-gray-800 rounded border border-red-200 dark:border-red-800"
                  >
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {question?.title ||
                        `Question ${questionId.substring(0, 8)}...`}
                    </p>
                    {question?.type && (
                      <Badge variant="outline" className="text-xs mt-1">
                        {question.type}
                      </Badge>
                    )}
                  </div>
                );
              })}
            {selectedQuestionIds.size > 10 && (
              <p className="text-xs text-gray-600 dark:text-gray-400 italic text-center pt-2">
                ... and {selectedQuestionIds.size - 10} more question
                {selectedQuestionIds.size - 10 === 1 ? "" : "s"}
              </p>
            )}
          </div>
        </div>

        <DialogFooter className="gap-3 pt-4">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={loading}
            className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-500"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={loading}
            className="bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600 text-white dark:text-white shadow-sm dark:shadow-md"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4 mr-2" />
                Delete {selectedQuestionIds.size} Question
                {selectedQuestionIds.size === 1 ? "" : "s"}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
