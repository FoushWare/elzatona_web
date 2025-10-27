'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SimpleGuidedPracticePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [plan, setPlan] = useState<any>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const planId = searchParams.get('plan');

  useEffect(() => {
    console.log('🔍 Simple Guided Practice: Starting...');

    const loadPlan = async () => {
      if (!planId) {
        setError('No plan ID provided');
        setIsLoading(false);
        return;
      }

      try {
        console.log('🔍 Simple Guided Practice: Fetching plan data...');
        const response = await fetch(
          `/api/guided-learning/plan-details/${planId}`
        );

        if (!response.ok) {
          throw new Error('Failed to load plan');
        }

        const data = await response.json();
        console.log('🔍 Simple Guided Practice: API response:', data);

        if (data.success) {
          setPlan(data.data);
          console.log('🔍 Simple Guided Practice: Plan loaded successfully');
        } else {
          throw new Error(data.error || 'Failed to load plan');
        }
      } catch (error) {
        console.error('🔍 Simple Guided Practice: Error:', error);
        setError('Failed to load learning plan');
      } finally {
        console.log('🔍 Simple Guided Practice: Setting isLoading to false');
        setIsLoading(false);
      }
    };

    loadPlan();
  }, [planId]);

  console.log('🔍 Simple Guided Practice Render State:', {
    isLoading,
    error,
    plan: plan
      ? { name: plan.name, totalQuestions: plan.totalQuestions }
      : null,
    timestamp: new Date().toISOString(),
  });

  if (isLoading) {
    console.log('🔍 Simple Guided Practice: Rendering loading state');
    return (
      <div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 flex items-center justify-center'>
        <div className='text-center'>
          <div className='w-12 h-12 bg-blue-600 rounded-full animate-spin mx-auto mb-4'></div>
          <h2 className='text-xl font-semibold text-gray-900 dark:text-white mb-2'>
            Loading Practice Session
          </h2>
          <p className='text-gray-600 dark:text-gray-400'>
            Preparing your learning plan...
          </p>
        </div>
      </div>
    );
  }

  if (error || !plan) {
    console.log('🔍 Simple Guided Practice: Rendering error state');
    return (
      <div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 flex items-center justify-center'>
        <div className='max-w-md w-full text-center'>
          <div className='w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4'>
            <span className='text-red-600 dark:text-red-400 text-2xl'>⚠️</span>
          </div>
          <h2 className='text-xl font-semibold text-gray-900 dark:text-white mb-2'>
            {error || 'Plan Not Found'}
          </h2>
          <p className='text-gray-600 dark:text-gray-400 mb-6'>
            {error || 'The requested learning plan could not be found.'}
          </p>
          <button
            onClick={() => router.push('/features/guided-learning')}
            className='w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
          >
            Back to Plans
          </button>
        </div>
      </div>
    );
  }

  console.log('🔍 Simple Guided Practice: Rendering success state');
  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 pt-24 pb-8'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-8'>
          <h1 className='text-3xl font-bold text-gray-900 dark:text-white mb-4'>
            {plan.name}
          </h1>
          <p className='text-lg text-gray-600 dark:text-gray-400'>
            Total Questions: {plan.totalQuestions}
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {plan.cards?.map((card: any, index: number) => (
            <div
              key={card.id}
              className='bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6'
            >
              <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
                {card.title}
              </h3>
              <p className='text-gray-600 dark:text-gray-400 mb-4'>
                {card.description}
              </p>
              <div className='text-sm text-blue-600 dark:text-blue-400'>
                {card.questionCount} questions
              </div>
            </div>
          ))}
        </div>

        <div className='mt-8 text-center'>
          <button
            onClick={() => router.push('/features/guided-learning')}
            className='px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
          >
            Back to Plans
          </button>
        </div>
      </div>
    </div>
  );
}
