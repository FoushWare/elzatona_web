'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, Badge, Button } from '@elzatona/shared-components';
import { BookOpen, Eye, Edit } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  description?: string;
  slug: string;
  questionCount: number;
}

interface CategoriesOverviewProps {
  categoryCounts: Category[];
}

export const CategoriesOverview: React.FC<CategoriesOverviewProps> = ({
  categoryCounts,
}) => {
  return (
    <Card className='mb-8'>
      <CardHeader>
        <CardTitle className='flex items-center space-x-2'>
          <BookOpen className='h-5 w-5 text-blue-600' />
          <span>Categories Overview</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {categoryCounts.length === 0 ? (
          <div className='text-center py-8'>
            <BookOpen className='w-12 h-12 text-gray-400 mx-auto mb-4' />
            <h3 className='text-lg font-medium text-gray-900 dark:text-white mb-2'>
              No Categories Found
            </h3>
            <p className='text-gray-600 dark:text-gray-400'>
              No categories available in the system.
            </p>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {categoryCounts.map(category => {
              return (
                <div
                  key={category.id}
                  className='p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow duration-200'
                >
                  <div className='flex items-center justify-between mb-2'>
                    <h4 className='font-semibold text-gray-900 dark:text-white'>
                      {category.name}
                    </h4>
                    <Badge
                      variant='outline'
                      className='bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                    >
                      {category.questionCount} questions
                    </Badge>
                  </div>
                  <p className='text-sm text-gray-600 dark:text-gray-400 mb-3'>
                    {category.description || 'No description available'}
                  </p>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center space-x-2'>
                      <span className='text-xs text-gray-500 dark:text-gray-400'>
                        Slug: {category.slug}
                      </span>
                    </div>
                    <div className='flex items-center space-x-1'>
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={() => {
                          // TODO: Implement view category questions functionality
                          console.log(
                            'View category questions:',
                            category.id
                          );
                        }}
                        className='h-8 px-2 text-blue-600 hover:bg-blue-100'
                      >
                        <Eye className='h-4 w-4' />
                      </Button>
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={() => {
                          // TODO: Implement edit category functionality
                          console.log('Edit category:', category.id);
                        }}
                        className='h-8 px-2 text-green-600 hover:bg-green-100'
                      >
                        <Edit className='h-4 w-4' />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};






