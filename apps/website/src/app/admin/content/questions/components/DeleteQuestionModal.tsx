'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Button,
} from '@elzatona/components';
import { AlertTriangle, Trash2, Loader2, BookOpen } from 'lucide-react';
import { UnifiedQuestion } from '@elzatona/shared-types';

interface DeleteQuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  question: UnifiedQuestion | null;
  onConfirm: () => void;
  loading: boolean;
}

export function DeleteQuestionModal({
  isOpen,
  onClose,
  question,
  onConfirm,
  loading,
}: DeleteQuestionModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='max-w-lg'>
        <DialogHeader>
          <div className='flex items-center gap-3 mb-2'>
            <div className='flex-shrink-0 w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center'>
              <AlertTriangle className='w-6 h-6 text-red-600 dark:text-red-400' />
            </div>
            <div>
              <DialogTitle className='text-xl font-bold text-gray-900 dark:text-white'>
                Delete Question
              </DialogTitle>
              <DialogDescription className='text-sm text-gray-600 dark:text-gray-400 mt-1'>
                This action cannot be undone
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className='py-4'>
          <p className='text-sm text-gray-700 dark:text-gray-300 mb-4'>
            Are you sure you want to delete this question? All associated data
            will be permanently removed.
          </p>

          {question && (
            <div className='bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/10 dark:to-orange-900/10 rounded-lg p-4 border-2 border-red-200 dark:border-red-800/50'>
              <div className='flex items-start gap-3'>
                <div className='flex-shrink-0 mt-0.5'>
                  <BookOpen className='w-5 h-5 text-red-600 dark:text-red-400' />
                </div>
                <div className='flex-1 min-w-0'>
                  <h4 className='font-semibold text-gray-900 dark:text-white mb-1.5 text-base'>
                    {question.title}
                  </h4>
                  <p className='text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mb-3'>
                    {question.content || question.title}
                  </p>
                  <div className='flex flex-wrap gap-2 mt-2'>
                    {question.type && (
                      <span className='inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600'>
                        {question.type}
                      </span>
                    )}
                    {question.difficulty && (
                      <span className='inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600'>
                        {question.difficulty}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className='gap-3 pt-2 sm:flex-row sm:justify-end'>
          <Button
            variant='outline'
            onClick={onClose}
            disabled={loading}
            className='w-full sm:w-auto border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-500 disabled:opacity-50 transition-colors'
          >
            Cancel
          </Button>
          <Button
            variant='destructive'
            onClick={onConfirm}
            disabled={loading}
            className='w-full sm:w-auto bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600 text-white dark:text-white shadow-sm dark:shadow-md disabled:opacity-50 transition-colors font-medium'
          >
            {loading ? (
              <>
                <Loader2 className='w-4 h-4 mr-2 animate-spin' />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className='w-4 h-4 mr-2' />
                Delete Question
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

