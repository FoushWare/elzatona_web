'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@elzatona/shared-components';
import { Button } from '@elzatona/shared-components';
import { Badge } from '@elzatona/shared-components';
import { Plus, Edit, Trash2, Loader2, Eye } from 'lucide-react';
import { UnifiedQuestion } from '../../../lib/unified-question-schema';

type Question = UnifiedQuestion;

export default function AdminContentQuestionsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        console.log('🔍 Fetching questions...', { currentPage, pageSize });
        setLoading(true);
        setError(null);

        const response = await fetch(
          `/api/questions/unified?page=${currentPage}&pageSize=${pageSize}`
        );

        console.log('📡 Response:', response.status, response.ok);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log('📊 Result:', result);

        setQuestions(result.data || []);
        setTotalCount(result.pagination?.totalCount || 0);
        setLoading(false);
        console.log('✅ Questions loaded:', result.data?.length || 0);
      } catch (err) {
        console.error('❌ Error:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [currentPage, pageSize]);

  if (loading) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
          <h1 className='text-4xl font-bold text-gray-900 dark:text-white mb-8'>
            Question Management
          </h1>
          <div className='flex items-center justify-center h-64'>
            <div className='text-center'>
              <Loader2 className='w-8 h-8 animate-spin mx-auto mb-4 text-blue-600' />
              <p className='text-gray-600 dark:text-gray-400'>
                Loading questions...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
          <h1 className='text-4xl font-bold text-gray-900 dark:text-white mb-8'>
            Question Management
          </h1>
          <div className='flex items-center justify-center h-64'>
            <div className='text-center p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-lg'>
              <p className='font-semibold mb-2'>Error loading questions:</p>
              <p>{error}</p>
              <Button onClick={() => window.location.reload()} className='mt-4'>
                Retry
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <h1 className='text-4xl font-bold text-gray-900 dark:text-white mb-8'>
          Question Management
        </h1>

        {/* Stats Cards */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
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
                  {new Set(questions.map(q => q.category)).size}
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
                  {questions.filter(q => q.is_active).length}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Questions List */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center justify-between'>
              <span>Questions ({totalCount})</span>
              <Button className='flex items-center space-x-2'>
                <Plus className='w-4 h-4' />
                Add New Question
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className='p-0'>
            <div className='overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800'>
              {questions.length === 0 ? (
                <div className='text-center py-12'>
                  <div className='w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center mx-auto mb-4'>
                    <span className='text-gray-400 font-bold'>Q</span>
                  </div>
                  <h3 className='text-lg font-medium text-gray-900 dark:text-white mb-2'>
                    No questions found
                  </h3>
                  <p className='text-gray-600 dark:text-gray-400'>
                    No questions available
                  </p>
                </div>
              ) : (
                <div className='space-y-1'>
                  {questions.map(question => (
                    <div
                      key={question.id}
                      className='p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors'
                    >
                      <div className='flex items-start justify-between'>
                        <div className='flex-1 pr-4'>
                          <h4 className='text-lg font-semibold text-gray-900 dark:text-white mb-1'>
                            {question.title}
                          </h4>
                          <p className='text-sm text-gray-600 dark:text-gray-400 line-clamp-2'>
                            {question.content}
                          </p>
                          <div className='mt-2 flex flex-wrap gap-2'>
                            {question.category && (
                              <Badge variant='secondary'>
                                {question.category}
                              </Badge>
                            )}
                            {question.difficulty && (
                              <Badge
                                variant={
                                  question.difficulty === 'beginner'
                                    ? 'default'
                                    : question.difficulty === 'intermediate'
                                      ? 'outline'
                                      : 'destructive'
                                }
                              >
                                {question.difficulty}
                              </Badge>
                            )}
                            {question.type && (
                              <Badge variant='outline'>{question.type}</Badge>
                            )}
                          </div>
                        </div>
                        <div className='flex space-x-2'>
                          <Button variant='outline' size='sm'>
                            <Eye className='w-4 h-4' />
                          </Button>
                          <Button variant='outline' size='sm'>
                            <Edit className='w-4 h-4' />
                          </Button>
                          <Button variant='destructive' size='sm'>
                            <Trash2 className='w-4 h-4' />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Pagination */}
        {totalCount > pageSize && (
          <div className='flex items-center justify-between mt-6'>
            <div className='text-sm text-gray-700 dark:text-gray-300'>
              Showing {Math.min((currentPage - 1) * pageSize + 1, totalCount)}{' '}
              to {Math.min(currentPage * pageSize, totalCount)} of {totalCount}{' '}
              questions
            </div>
            <div className='flex items-center space-x-2'>
              <Button
                variant='outline'
                size='sm'
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <span className='text-sm text-gray-600 dark:text-gray-400'>
                Page {currentPage} of {Math.ceil(totalCount / pageSize)}
              </span>
              <Button
                variant='outline'
                size='sm'
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage >= Math.ceil(totalCount / pageSize)}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
