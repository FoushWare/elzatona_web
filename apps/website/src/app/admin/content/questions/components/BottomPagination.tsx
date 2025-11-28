'use client';

import React from 'react';
import { Button } from '@elzatona/shared-components';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface BottomPaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalCount: number;
  onPageChange: (page: number) => void;
}

export function BottomPagination({
  currentPage,
  totalPages,
  pageSize,
  totalCount,
  onPageChange,
}: BottomPaginationProps) {
  if (totalCount <= pageSize) {
    return null;
  }

  return (
    <div className='mt-6 sm:mt-8 p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm'>
      <div className='flex flex-col sm:flex-row items-center justify-between gap-4'>
        <div className='text-xs sm:text-sm text-gray-700 dark:text-gray-300'>
          Showing <span className='font-medium'>{Math.min((currentPage - 1) * pageSize + 1, totalCount)}</span> to{' '}
          <span className='font-medium'>{Math.min(currentPage * pageSize, totalCount)}</span> of{' '}
          <span className='font-medium'>{totalCount}</span> questions
        </div>
        <div className='flex items-center space-x-2'>
          <Button
            variant='outline'
            size='sm'
            className='h-9'
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className='h-4 w-4' />
          </Button>
          <span className='text-xs sm:text-sm text-gray-600 dark:text-gray-400 px-3'>
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant='outline'
            size='sm'
            className='h-9'
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
          >
            <ChevronRight className='h-4 w-4' />
          </Button>
        </div>
      </div>
    </div>
  );
}

