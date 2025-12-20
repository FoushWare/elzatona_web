"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
} from "@elzatona/components";
import { Plus, BookOpen } from "lucide-react";
import { QuestionItem } from "./QuestionItem";
import { PaginationControls } from "./PaginationControls";
import type { UnifiedQuestion } from "./QuestionForm";

interface QuestionsListProps {
  questions: UnifiedQuestion[];
  currentPage: number;
  totalPages: number;
  totalCount: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  onView: (question: UnifiedQuestion) => void;
  onEdit: (question: UnifiedQuestion) => void;
  onDelete: (id: string) => void;
  onCreate: () => void;
}

export const QuestionsList: React.FC<QuestionsListProps> = ({
  questions,
  currentPage,
  totalPages,
  totalCount,
  pageSize,
  onPageChange,
  onPageSizeChange,
  onView,
  onEdit,
  onDelete,
  onCreate,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Questions ({questions.length})</span>
          <Button className="flex items-center space-x-2" onClick={onCreate}>
            <Plus className="w-4 h-4" />
            Add New Question
          </Button>
        </CardTitle>
      </CardHeader>

      {/* Pagination Before Questions List */}
      {totalCount > 0 && (
        <div className="px-6 pb-4 border-b border-gray-200 dark:border-gray-700">
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            totalCount={totalCount}
            pageSize={pageSize}
            onPageChange={onPageChange}
            onPageSizeChange={onPageSizeChange}
          />
        </div>
      )}

      <CardContent className="p-0">
        <div className="overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800">
          {questions.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No questions found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                No questions available
              </p>
            </div>
          ) : (
            <div className="space-y-1">
              {questions.map((question) => (
                <QuestionItem
                  key={question.id}
                  question={question}
                  onView={onView}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestionsList;
