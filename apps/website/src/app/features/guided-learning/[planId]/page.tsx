'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  ArrowLeft,
  CheckCircle,
  Play,
  ArrowRight,
  Loader2,
  XCircle,
} from 'lucide-react';

interface Question {
  id: string;
  title: string;
  content: string;
  difficulty: string;
  type: string;
  options?: Array<{
    id: string;
    text: string;
    isCorrect: boolean;
  }>;
  correct_answer?: string;
  explanation?: string;
}

interface Topic {
  id: string;
  name: string;
  questions: Question[];
  questionCount: number;
}

interface Category {
  id: string;
  name: string;
  topics: Topic[];
  questionCount: number;
}

interface Card {
  id: string;
  title: string;
  type: string;
  description: string;
  color: string;
  icon: string;
  categories: Category[];
  questionCount: number;
  hasQuestions: boolean;
}

interface Plan {
  id: string;
  name: string;
  description: string;
  duration: number;
  difficulty: string;
  cards: Card[];
  totalQuestions: number;
}

interface Progress {
  planId: string;
  completedQuestions: string[];
  completedTopics: string[];
  completedCategories: string[];
  completedCards: string[];
  currentPosition: {
    cardIndex: number;
    categoryIndex: number;
    topicIndex: number;
    questionIndex: number;
  };
  lastUpdated: string;
}

export default function PlanDetailPage() {
  const params = useParams();
  const planId = params?.planId as string;

  const [plan, setPlan] = useState<Plan | null>(null);
  const [progress, setProgress] = useState<Progress | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch plan data
  useEffect(() => {
    const loadProgress = (): Progress | null => {
      if (!planId) return null;
      try {
        const saved = localStorage.getItem(
          `guided-practice-progress-${planId}`
        );
        return saved ? JSON.parse(saved) : null;
      } catch (error) {
        console.error('Error loading progress:', error);
        return null;
      }
    };

    const fetchPlanData = async () => {
      if (!planId) {
        setError('Plan ID is required');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const baseUrl =
          process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
        const response = await fetch(
          `${baseUrl}/api/guided-learning/plan-details/${planId}`,
          {
            cache: 'no-store',
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch plan data: ${response.status}`);
        }

        const data = await response.json();

        if (!data.success) {
          throw new Error('API returned success: false');
        }

        setPlan(data.data);

        // Load progress
        const savedProgress = loadProgress();
        if (savedProgress) {
          setProgress(savedProgress);
        }
      } catch (error) {
        console.error('Error fetching plan data:', error);
        setError('Failed to load plan data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlanData();
  }, [planId]);

  const getCardProgress = (card: Card) => {
    let total = 0;
    let completed = 0;

    // Count actual questions with options
    for (const category of card.categories) {
      for (const topic of category.topics) {
        for (const question of topic.questions) {
          // Only count questions that have options (valid for practice)
          if (
            question.options &&
            Array.isArray(question.options) &&
            question.options.length > 0
          ) {
            total++;
            if (progress && progress.completedQuestions.includes(question.id)) {
              completed++;
            }
          }
        }
      }
    }

    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { completed, total, percentage };
  };

  const getCategoryProgress = (category: Category) => {
    let total = 0;
    let completed = 0;

    // Count actual questions with options
    for (const topic of category.topics) {
      for (const question of topic.questions) {
        // Only count questions that have options (valid for practice)
        if (
          question.options &&
          Array.isArray(question.options) &&
          question.options.length > 0
        ) {
          total++;
          if (progress && progress.completedQuestions.includes(question.id)) {
            completed++;
          }
        }
      }
    }

    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { completed, total, percentage };
  };

  const isCardCompleted = (card: Card) => {
    if (!progress) return false;
    return progress.completedCards.includes(card.id);
  };

  const isCategoryCompleted = (category: Category) => {
    if (!progress) return false;
    return progress.completedCategories.includes(category.id);
  };

  const resetProgress = () => {
    if (!planId) return;
    try {
      localStorage.removeItem(`guided-practice-progress-${planId}`);
      setProgress(null);
      // Show a success message
      window.location.reload();
    } catch (error) {
      console.error('Error resetting progress:', error);
    }
  };

  const getCardOrder = () => {
    if (!plan) return [];

    const cardOrder = [
      'Core Technologies',
      'Framework Questions',
      'Problem Solving',
      'System Design',
      'Frontend Tasks',
    ];

    return cardOrder
      .map(title =>
        plan.cards.find(card =>
          card.title.toLowerCase().includes(title.toLowerCase())
        )
      )
      .filter(Boolean) as Card[];
  };

  if (isLoading) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 pt-24 pb-8 flex items-center justify-center'>
        <div className='text-center'>
          <Loader2 className='w-8 h-8 animate-spin text-blue-600 mx-auto mb-4' />
          <p className='text-gray-600 dark:text-gray-400'>
            Loading plan details...
          </p>
        </div>
      </div>
    );
  }

  if (error || !planId) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 pt-24 pb-8 flex items-center justify-center'>
        <div className='text-center'>
          <XCircle className='w-16 h-16 text-red-500 mx-auto mb-6' />
          <h1 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
            {error || 'Plan ID Required'}
          </h1>
          <p className='text-gray-600 dark:text-gray-400 mb-6'>
            {error || 'Please provide a plan ID to view plan details.'}
          </p>
          <Link
            href='/features/guided-learning'
            className='px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
          >
            Back to Plans
          </Link>
        </div>
      </div>
    );
  }

  if (!plan) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 pt-24 pb-8 flex items-center justify-center'>
        <div className='text-center'>
          <XCircle className='w-16 h-16 text-red-500 mx-auto mb-6' />
          <h1 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
            Plan Not Found
          </h1>
          <p className='text-gray-600 dark:text-gray-400 mb-6'>
            The requested learning plan could not be found.
          </p>
          <Link
            href='/features/guided-learning'
            className='px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
          >
            Back to Plans
          </Link>
        </div>
      </div>
    );
  }

  const orderedCards = getCardOrder();

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 pt-24 pb-8'>
      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='mb-8'>
          <Link
            href='/features/guided-learning'
            className='inline-flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-4'
          >
            <ArrowLeft className='w-5 h-5' />
            <span>Back to Plans</span>
          </Link>

          <div className='bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border-2 border-white/20 dark:border-gray-700/20'>
            <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6'>
              <div className='mb-4 lg:mb-0'>
                <h1 className='text-3xl font-bold text-gray-900 dark:text-white mb-2'>
                  {plan.name}
                </h1>
                <p className='text-gray-600 dark:text-gray-400 text-lg'>
                  {plan.description}
                </p>
              </div>

              <div className='flex flex-wrap gap-4'>
                <div className='bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-4 min-w-[120px]'>
                  <div className='text-2xl font-bold text-indigo-600 dark:text-indigo-400'>
                    {plan.totalQuestions}
                  </div>
                  <div className='text-sm text-gray-600 dark:text-gray-400'>
                    Total Questions
                  </div>
                </div>
                <div className='bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-4 min-w-[120px]'>
                  <div className='text-2xl font-bold text-green-600 dark:text-green-400'>
                    {plan.duration}
                  </div>
                  <div className='text-sm text-gray-600 dark:text-gray-400'>
                    Days
                  </div>
                </div>
                <div className='bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-4 min-w-[120px]'>
                  <div className='text-2xl font-bold text-purple-600 dark:text-purple-400'>
                    {plan.difficulty}
                  </div>
                  <div className='text-sm text-gray-600 dark:text-gray-400'>
                    Difficulty
                  </div>
                </div>
              </div>
            </div>

            {/* Start Button */}
            <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
              <Link
                href={`/guided-practice?plan=${planId}`}
                className='inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105'
              >
                <Play className='w-6 h-6' />
                <span>Start 1-Day Interview Prep</span>
                <ArrowRight className='w-6 h-6' />
              </Link>

              {progress && (
                <button
                  onClick={resetProgress}
                  className='inline-flex items-center space-x-2 px-6 py-4 bg-gray-600 hover:bg-gray-700 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105'
                >
                  <span>Reset Progress</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Learning Cards */}
        <div className='space-y-8'>
          <h2 className='text-2xl font-bold text-gray-900 dark:text-white text-center mb-8'>
            Learning Path
          </h2>

          {orderedCards.map(card => {
            const cardProgress = getCardProgress(card);
            const isCompleted = isCardCompleted(card);

            return (
              <div
                key={card.id}
                className={`bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border-2 transition-all duration-300 ${
                  isCompleted
                    ? 'border-green-500/50 bg-green-50/50 dark:bg-green-900/20'
                    : 'border-white/20 dark:border-gray-700/20'
                }`}
              >
                <div className='flex items-center justify-between mb-4'>
                  <div className='flex items-center space-x-4'>
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-lg ${
                        isCompleted
                          ? 'bg-green-500 text-white'
                          : 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle className='w-6 h-6' />
                      ) : (
                        card.icon
                      )}
                    </div>
                    <div>
                      <h3 className='text-xl font-bold text-gray-900 dark:text-white flex items-center space-x-2'>
                        <span>{card.title}</span>
                        {isCompleted && (
                          <CheckCircle className='w-5 h-5 text-green-500' />
                        )}
                      </h3>
                      <p className='text-gray-600 dark:text-gray-400'>
                        {card.description}
                      </p>
                    </div>
                  </div>

                  <div className='text-right'>
                    <div className='text-sm text-gray-500 dark:text-gray-400 mb-1'>
                      Progress
                    </div>
                    <div className='text-lg font-semibold text-gray-900 dark:text-white'>
                      {cardProgress.completed}/{cardProgress.total}
                    </div>
                    <div className='text-sm text-gray-500 dark:text-gray-400'>
                      ({cardProgress.percentage}%)
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className='mb-6'>
                  <div className='w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3'>
                    <div
                      className={`h-3 rounded-full transition-all duration-500 ${
                        isCompleted
                          ? 'bg-green-500'
                          : 'bg-gradient-to-r from-indigo-500 to-purple-500'
                      }`}
                      style={{ width: `${cardProgress.percentage}%` }}
                    ></div>
                  </div>
                </div>

                {/* Categories */}
                <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
                  {card.categories.map(category => {
                    const categoryProgress = getCategoryProgress(category);
                    const categoryIsCompleted = isCategoryCompleted(category);

                    return (
                      <div
                        key={category.id}
                        className={`p-4 rounded-xl border transition-all duration-300 ${
                          categoryIsCompleted
                            ? 'border-green-500/50 bg-green-50/50 dark:bg-green-900/20'
                            : 'border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-700/50'
                        }`}
                      >
                        <div className='flex items-center justify-between mb-2'>
                          <h4 className='font-semibold text-gray-900 dark:text-white flex items-center space-x-2'>
                            <span>{category.name}</span>
                            {categoryIsCompleted && (
                              <CheckCircle className='w-4 h-4 text-green-500' />
                            )}
                          </h4>
                          <span className='text-sm text-gray-500 dark:text-gray-400'>
                            {categoryProgress.completed}/
                            {categoryProgress.total}
                          </span>
                        </div>

                        <div className='w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mb-2'>
                          <div
                            className={`h-2 rounded-full transition-all duration-500 ${
                              categoryIsCompleted
                                ? 'bg-green-500'
                                : 'bg-indigo-500'
                            }`}
                            style={{ width: `${categoryProgress.percentage}%` }}
                          ></div>
                        </div>

                        <div className='text-xs text-gray-500 dark:text-gray-400'>
                          {categoryProgress.percentage}% complete
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
