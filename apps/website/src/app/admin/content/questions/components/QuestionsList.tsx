'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
  Checkbox,
} from '@elzatona/shared-components';
import { Plus, Trash2, Upload } from 'lucide-react';
import { UnifiedQuestion } from '@elzatona/shared-types';
import { QuestionItem } from './QuestionItem';
import { PaginationControls } from './PaginationControls';
import { BookOpen } from 'lucide-react';

interface QuestionsListProps {
  questions: UnifiedQuestion[];
  selectedQuestionIds: Set<string>;
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalCount: number;
  searchTerm: string;
  onSelectQuestion: (questionId: string) => void;
  onSelectAll: () => void;
  onView: (question: UnifiedQuestion) => void;
  onEdit: (question: UnifiedQuestion) => void;
  onDelete: (question: UnifiedQuestion) => void;
  onBulkDelete: () => void;
  onBulkUpload: () => void;
  onCreate: () => void;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export function QuestionsList({
  questions,
  selectedQuestionIds,
  currentPage,
  totalPages,
  pageSize,
  totalCount,
  searchTerm,
  onSelectQuestion,
  onSelectAll,
  onView,
  onEdit,
  onDelete,
  onBulkDelete,
  onBulkUpload,
  onCreate,
  onPageChange,
  onPageSizeChange,
}: QuestionsListProps) {
  return (
    <Card className='border border-gray-200 dark:border-gray-700 shadow-sm'>
      <CardHeader className='pb-4 border-b border-gray-200 dark:border-gray-700'>
        <CardTitle className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
          <div className='flex items-center gap-4'>
            {questions.length > 0 && (
              <div className='flex items-center gap-3'>
                <Checkbox
                  checked={
                    selectedQuestionIds.size === questions.length &&
                    questions.length > 0
                  }
                  onCheckedChange={onSelectAll}
                  className='h-5 w-5'
                />
                <span className='text-sm text-gray-600 dark:text-gray-400'>
                  {selectedQuestionIds.size > 0
                    ? `${selectedQuestionIds.size} selected`
                    : 'Select all'}
                </span>
              </div>
            )}
            <span className='text-lg sm:text-xl font-semibold'>
              Questions{' '}
              <span className='text-gray-500 dark:text-gray-400 font-normal'>
                ({questions.length})
              </span>
            </span>
          </div>
          <div className='flex items-center space-x-2 sm:space-x-3'>
            {selectedQuestionIds.size > 0 && (
              <Button
                variant='destructive'
                size='sm'
                className='flex items-center space-x-2 h-9 sm:h-10 bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600 text-white dark:text-white shadow-sm dark:shadow-md'
                onClick={onBulkDelete}
              >
                <Trash2 className='w-4 h-4' />
                <span className='hidden sm:inline'>
                  Delete Selected ({selectedQuestionIds.size})
                </span>
                <span className='sm:hidden'>Delete ({selectedQuestionIds.size})</span>
              </Button>
            )}
            <Button
              variant='outline'
              size='sm'
              className='flex items-center space-x-2 h-9 sm:h-10 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-500'
              onClick={onBulkUpload}
            >
              <Upload className='w-4 h-4' />
              <span className='hidden sm:inline'>Bulk Upload</span>
              <span className='sm:hidden'>Upload</span>
            </Button>
            <Button
              size='sm'
              className='flex items-center space-x-2 h-9 sm:h-10 bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600 text-white dark:text-white shadow-sm dark:shadow-md'
              onClick={onCreate}
            >
              <Plus className='w-4 h-4' />
              <span className='hidden sm:inline'>Add New Question</span>
              <span className='sm:hidden'>Add</span>
            </Button>
          </div>
        </CardTitle>
      </CardHeader>

      {/* Pagination Before Questions List */}
      {totalPages > 1 && (
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          totalCount={totalCount}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
          showPageSize={true}
        />
      )}

      <CardContent className='p-0'>
        <div className='overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800'>
          {questions.length === 0 ? (
            <div className='text-center py-16 px-4'>
              <BookOpen className='w-16 h-16 text-gray-400 mx-auto mb-4' />
              <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
                No questions found
              </h3>
              <p className='text-sm text-gray-600 dark:text-gray-400 mb-4'>
                {searchTerm
                  ? 'Try adjusting your search terms'
                  : 'Get started by adding your first question'}
              </p>
              {!searchTerm && (
                <Button
                  onClick={onCreate}
                  className='mt-2 bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600 text-white dark:text-white shadow-sm dark:shadow-md'
                >
                  <Plus className='w-4 h-4 mr-2' />
                  Add New Question
                </Button>
              )}
            </div>
          ) : (
            <div className='divide-y divide-gray-200 dark:divide-gray-700'>
              {questions.map(question => (
                <QuestionItem
                  key={question.id}
                  question={question}
                  isSelected={selectedQuestionIds.has(question.id)}
                  onSelect={onSelectQuestion}
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
}

