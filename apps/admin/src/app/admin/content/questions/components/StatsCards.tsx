'use client';

import React from 'react';
import { Card, CardContent } from '@elzatona/shared-components';

interface StatsCardsProps {
  totalCount: number;
  categoryCount: number;
  activeQuestionsCount: number;
  filteredResultsCount: number;
}

export const StatsCards: React.FC<StatsCardsProps> = ({
  totalCount,
  categoryCount,
  activeQuestionsCount,
  filteredResultsCount,
}) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-4 gap-6 mb-8'>
      <Card className='hover:shadow-lg transition-shadow duration-300'>
        <CardContent className='p-6 flex items-center space-x-4'>
          <div className='w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center'>
            <span className='text-blue-600 dark:text-blue-400 font-bold'>
              Q
            </span>
          </div>
          <div>
            <p className='text-sm font-medium text-gray-500 dark:text-gray-400'>
              Total Questions
            </p>
            <p className='text-2xl font-bold text-gray-900 dark:text-white'>
              {totalCount}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className='hover:shadow-lg transition-shadow duration-300'>
        <CardContent className='p-6 flex items-center space-x-4'>
          <div className='w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center'>
            <span className='text-green-600 dark:text-green-400 font-bold'>
              C
            </span>
          </div>
          <div>
            <p className='text-sm font-medium text-gray-500 dark:text-gray-400'>
              Categories
            </p>
            <p className='text-2xl font-bold text-gray-900 dark:text-white'>
              {categoryCount}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className='hover:shadow-lg transition-shadow duration-300'>
        <CardContent className='p-6 flex items-center space-x-4'>
          <div className='w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center'>
            <span className='text-purple-600 dark:text-purple-400 font-bold'>
              A
            </span>
          </div>
          <div>
            <p className='text-sm font-medium text-gray-500 dark:text-gray-400'>
              Active Questions
            </p>
            <p className='text-2xl font-bold text-gray-900 dark:text-white'>
              {activeQuestionsCount}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className='hover:shadow-lg transition-shadow duration-300'>
        <CardContent className='p-6 flex items-center space-x-4'>
          <div className='w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center'>
            <span className='text-orange-600 dark:text-orange-400 font-bold'>
              F
            </span>
          </div>
          <div>
            <p className='text-sm font-medium text-gray-500 dark:text-gray-400'>
              Filtered Results
            </p>
            <p className='text-2xl font-bold text-gray-900 dark:text-white'>
              {filteredResultsCount}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};




