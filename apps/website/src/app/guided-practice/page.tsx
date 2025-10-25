'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

// Conditional Supabase client creation with fallback values
let supabase = null;
try {
  const { createClient } = require('@supabase/supabase-js');
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
  const supabaseServiceRoleKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder_key';

  if (
    supabaseUrl !== 'https://placeholder.supabase.co' &&
    supabaseServiceRoleKey !== 'placeholder_key'
  ) {
    supabase = createClient(supabaseUrl, supabaseServiceRoleKey);
  }
} catch (error) {
  console.warn('Supabase client creation failed in guided practice:', error);
}

import {
  ArrowLeft,
  Clock,
  Target,
  CheckCircle,
  BookOpen,
  Zap,
  TrendingUp,
  Award,
  Users,
  Star,
  Play,
  Calendar,
  BarChart3,
  ArrowRight,
  Loader2,
  RotateCcw,
  Home,
} from 'lucide-react';

interface Question {
  id: string;
  title: string;
  content: string;
  topic?: string;
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

export default function GuidedPracticePage() {
  const [plan, setPlan] = useState<Plan | null>(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [currentTopicIndex, setCurrentTopicIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState({
    totalQuestions: 0,
    answeredQuestions: 0,
    correctAnswers: 0,
    currentCard: 0,
    completedCards: [] as number[],
    completedCategories: [] as string[],
    completedTopics: [] as string[],
    answeredQuestionIds: [] as string[], // Track which specific questions were answered
  });
  const [currentAnswer, setCurrentAnswer] = useState<{
    isCorrect: boolean;
    selectedOption?: string;
  } | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const planId = searchParams.get('plan');
  const categoryId = searchParams.get('category');

  // Load plan data
  useEffect(() => {
    const loadPlan = async () => {
      if (!planId) {
        setError('No plan ID provided');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const response = await fetch(
          `/api/guided-learning/plan-details/${planId}`
        );

        if (!response.ok) {
          throw new Error('Failed to load plan');
        }

        const data = await response.json();
        if (data.success) {
          console.log('🔍 Guided Practice: Plan data loaded:', {
            planName: data.data.name,
            totalQuestions: data.data.totalQuestions,
            cardsCount: data.data.cards?.length || 0,
            firstCard: data.data.cards?.[0]
              ? {
                  title: data.data.cards[0].title,
                  questionCount: data.data.cards[0].questionCount,
                  categoriesCount: data.data.cards[0].categories?.length || 0,
                  firstCategory: data.data.cards[0].categories?.[0]
                    ? {
                        name: data.data.cards[0].categories[0].name,
                        questionCount:
                          data.data.cards[0].categories[0].questionCount,
                        topicsCount:
                          data.data.cards[0].categories[0].topics?.length || 0,
                      }
                    : null,
                }
              : null,
          });

          setPlan(data.data);
          setProgress(prev => ({
            ...prev,
            totalQuestions: data.data.totalQuestions || 0,
          }));

          // Find the first available question and set initial state
          const firstAvailableQuestion = findFirstAvailableQuestion(
            data.data,
            categoryId
          );
          if (firstAvailableQuestion) {
            setCurrentCardIndex(firstAvailableQuestion.cardIndex);
            setCurrentCategoryIndex(firstAvailableQuestion.categoryIndex);
            setCurrentTopicIndex(firstAvailableQuestion.topicIndex);
            setCurrentQuestionIndex(firstAvailableQuestion.questionIndex);
            console.log(
              '🔍 Guided Practice: Starting with first available question:',
              firstAvailableQuestion
            );
          } else {
            console.log('🔍 Guided Practice: No questions found in plan');
          }
        } else {
          throw new Error(data.error || 'Failed to load plan');
        }
      } catch (error) {
        console.error('Error loading plan:', error);
        setError('Failed to load learning plan');
      } finally {
        setIsLoading(false);
      }
    };

    loadPlan();
  }, [planId, categoryId]);

  // Helper function to find the first available question
  const findFirstAvailableQuestion = (
    planData: Plan,
    targetCategoryId?: string | null
  ) => {
    for (let cardIndex = 0; cardIndex < planData.cards.length; cardIndex++) {
      const card = planData.cards[cardIndex];
      for (
        let categoryIndex = 0;
        categoryIndex < card.categories.length;
        categoryIndex++
      ) {
        const category = card.categories[categoryIndex];

        // If a specific category is requested, only look in that category
        if (targetCategoryId && category.id !== targetCategoryId) {
          continue;
        }

        for (
          let topicIndex = 0;
          topicIndex < category.topics.length;
          topicIndex++
        ) {
          const topic = category.topics[topicIndex];
          if (topic.questions && topic.questions.length > 0) {
            return {
              cardIndex,
              categoryIndex,
              topicIndex,
              questionIndex: 0,
              question: topic.questions[0],
            };
          }
        }
      }
    }
    return null;
  };

  // Load saved progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem(
      `guided-practice-progress-${planId}`
    );

    if (savedProgress) {
      try {
        const parsed = JSON.parse(savedProgress);
        setProgress(prev => ({ ...prev, ...parsed }));
        console.log('📊 Loaded saved progress:', parsed);
      } catch (error) {
        console.error('Error loading saved progress:', error);
      }
    }
  }, [planId]);

  // Load saved position after plan data is loaded
  useEffect(() => {
    if (!plan) {
      console.log('📍 Plan not loaded yet, skipping position restoration');
      return;
    }

    const savedPosition = localStorage.getItem(
      `guided-practice-position-${planId}`
    );

    console.log('📍 Attempting to load saved position...');
    console.log('📍 Current URL categoryId:', categoryId);
    console.log('📍 Plan loaded with cards:', plan.cards.length);

    if (savedPosition) {
      try {
        const parsed = JSON.parse(savedPosition);
        console.log('📍 Parsed saved position:', parsed);

        // If we're in a category-specific session, only restore position if it matches the saved category
        if (categoryId) {
          console.log('📍 Category-specific session detected');
          console.log('📍 Saved categoryId:', parsed.categoryId);
          console.log('📍 Current categoryId:', categoryId);
          console.log('📍 Category match:', parsed.categoryId === categoryId);

          // Check if the saved position is for the same category
          if (parsed.categoryId === categoryId) {
            console.log('📍 Same category, attempting to restore position');

            // Find the correct card and category indices for this categoryId
            const targetCardIndex = plan.cards.findIndex(card =>
              card.categories.some(cat => cat.id === categoryId)
            );
            const targetCategoryIndex = plan.cards[
              targetCardIndex
            ]?.categories.findIndex(cat => cat.id === categoryId);

            console.log('📍 Found targetCardIndex:', targetCardIndex);
            console.log('📍 Found targetCategoryIndex:', targetCategoryIndex);

            if (targetCardIndex !== -1 && targetCategoryIndex !== -1) {
              setCurrentCardIndex(targetCardIndex);
              setCurrentCategoryIndex(targetCategoryIndex);
              setCurrentTopicIndex(parsed.topicIndex || 0);
              setCurrentQuestionIndex(parsed.questionIndex || 0);
              console.log(
                '📍 Successfully restored position for same category session:',
                {
                  cardIndex: targetCardIndex,
                  categoryIndex: targetCategoryIndex,
                  topicIndex: parsed.topicIndex || 0,
                  questionIndex: parsed.questionIndex || 0,
                }
              );
            } else {
              console.log(
                '📍 Category not found in plan, starting from beginning'
              );
            }
          } else {
            console.log(
              '📍 Different category session, starting from beginning of this category'
            );
            // Start from the beginning of the current category
            const targetCardIndex = plan.cards.findIndex(card =>
              card.categories.some(cat => cat.id === categoryId)
            );
            const targetCategoryIndex = plan.cards[
              targetCardIndex
            ]?.categories.findIndex(cat => cat.id === categoryId);

            if (targetCardIndex !== -1 && targetCategoryIndex !== -1) {
              setCurrentCardIndex(targetCardIndex);
              setCurrentCategoryIndex(targetCategoryIndex);
              setCurrentTopicIndex(0);
              setCurrentQuestionIndex(0);
              console.log('📍 Started fresh category session');
            }
          }
        } else {
          // Full plan session - restore exact position
          setCurrentCardIndex(parsed.cardIndex || 0);
          setCurrentCategoryIndex(parsed.categoryIndex || 0);
          setCurrentTopicIndex(parsed.topicIndex || 0);
          setCurrentQuestionIndex(parsed.questionIndex || 0);
          console.log('📍 Loaded saved position for full plan:', parsed);
        }
      } catch (error) {
        console.error('Error loading saved position:', error);
      }
    } else {
      console.log('📍 No saved position found');
    }
  }, [planId, categoryId, plan]);

  // Auto-save position with proper delay to ensure state is updated
  useEffect(() => {
    if (plan && planId) {
      // Use a longer delay to ensure React has finished updating state
      const timeoutId = setTimeout(() => {
        console.log('📍 Auto-saving position after state update:', {
          currentCardIndex,
          currentCategoryIndex,
          currentTopicIndex,
          currentQuestionIndex,
        });
        savePosition();
      }, 200);

      return () => clearTimeout(timeoutId);
    }
  }, [
    currentCardIndex,
    currentCategoryIndex,
    currentTopicIndex,
    currentQuestionIndex,
    planId,
  ]);

  // Save progress to localStorage
  const saveProgress = (newProgress: typeof progress) => {
    localStorage.setItem(
      `guided-practice-progress-${planId}`,
      JSON.stringify(newProgress)
    );
    setProgress(newProgress);
  };

  // Save current position to localStorage
  const savePosition = () => {
    const position = {
      cardIndex: currentCardIndex,
      categoryIndex: currentCategoryIndex,
      topicIndex: currentTopicIndex,
      questionIndex: currentQuestionIndex,
      categoryId: categoryId, // Include categoryId to identify category-specific sessions
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem(
      `guided-practice-position-${planId}`,
      JSON.stringify(position)
    );
    console.log('📍 Saved position:', position);
    console.log('📍 Current URL categoryId:', categoryId);
    console.log('📍 Current indices:', {
      currentCardIndex,
      currentCategoryIndex,
      currentTopicIndex,
      currentQuestionIndex,
    });
  };

  const handleAnswerQuestion = (
    isCorrect: boolean,
    selectedOption?: string
  ) => {
    setCurrentAnswer({ isCorrect, selectedOption });
  };

  const proceedToNext = () => {
    if (!currentAnswer) return;

    const currentCard = plan?.cards[currentCardIndex];
    const currentCategory = currentCard?.categories[currentCategoryIndex];
    const currentTopic = currentCategory?.topics[currentTopicIndex];
    const currentQuestion = currentTopic?.questions[currentQuestionIndex];

    if (!currentQuestion) return;

    const newProgress = {
      ...progress,
      answeredQuestions: progress.answeredQuestions + 1,
      correctAnswers: currentAnswer.isCorrect
        ? progress.correctAnswers + 1
        : progress.correctAnswers,
      answeredQuestionIds: [
        ...progress.answeredQuestionIds,
        currentQuestion.id,
      ],
    };

    // Check if current topic is completed
    if (currentTopic && !progress.completedTopics.includes(currentTopic.id)) {
      const allTopicQuestionsAnswered = currentTopic.questions.every(q =>
        newProgress.answeredQuestionIds.includes(q.id)
      );

      if (allTopicQuestionsAnswered) {
        newProgress.completedTopics.push(currentTopic.id);
        console.log(`🎉 Topic completed: ${currentTopic.name}`);
      }
    }

    // Check if current category is completed
    if (
      currentCategory &&
      !progress.completedCategories.includes(currentCategory.id)
    ) {
      const allCategoryQuestionsAnswered = currentCategory.topics.every(topic =>
        topic.questions.every(q =>
          newProgress.answeredQuestionIds.includes(q.id)
        )
      );

      if (allCategoryQuestionsAnswered) {
        newProgress.completedCategories.push(currentCategory.id);
        console.log(`🎉 Category completed: ${currentCategory.name}`);
      }
    }

    // Check if current card is completed
    if (currentCard && !progress.completedCards.includes(currentCardIndex)) {
      const allCardQuestionsAnswered = currentCard.categories.every(category =>
        category.topics.every(topic =>
          topic.questions.every(q =>
            newProgress.answeredQuestionIds.includes(q.id)
          )
        )
      );

      if (allCardQuestionsAnswered) {
        newProgress.completedCards.push(currentCardIndex);
        console.log(`🎉 Card completed: ${currentCard.title}`);
      }
    }

    saveProgress(newProgress);

    // Reset current answer
    setCurrentAnswer(null);

    // Move to next question
    if (
      currentTopic &&
      currentQuestionIndex < currentTopic.questions.length - 1
    ) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      // Position will be auto-saved by useEffect
    } else {
      // Move to next topic/category/card
      handleNext();
    }
  };

  const handleNext = () => {
    const currentCard = plan?.cards[currentCardIndex];
    const currentCategory = currentCard?.categories[currentCategoryIndex];

    if (currentTopicIndex < (currentCategory?.topics.length || 0) - 1) {
      setCurrentTopicIndex(currentTopicIndex + 1);
      setCurrentQuestionIndex(0);
      // Position will be auto-saved by useEffect
    } else if (
      currentCategoryIndex <
      (currentCard?.categories.length || 0) - 1
    ) {
      setCurrentCategoryIndex(currentCategoryIndex + 1);
      setCurrentTopicIndex(0);
      setCurrentQuestionIndex(0);
      // Position will be auto-saved by useEffect
    } else if (currentCardIndex < (plan?.cards.length || 0) - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setCurrentCategoryIndex(0);
      setCurrentTopicIndex(0);
      setCurrentQuestionIndex(0);

      // Mark current card as completed
      const newProgress = {
        ...progress,
        currentCard: currentCardIndex + 1,
        completedCards: [...progress.completedCards, currentCardIndex],
      };
      saveProgress(newProgress);
      // Position will be auto-saved by useEffect
    } else {
      // Plan completed
      router.push(`/features/guided-learning/${planId}?completed=true`);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else if (currentTopicIndex > 0) {
      setCurrentTopicIndex(currentTopicIndex - 1);
      const currentCard = plan?.cards[currentCardIndex];
      const currentCategory = currentCard?.categories[currentCategoryIndex];
      const prevTopic = currentCategory?.topics[currentTopicIndex - 1];
      setCurrentQuestionIndex((prevTopic?.questions.length || 1) - 1);
    } else if (currentCategoryIndex > 0) {
      setCurrentCategoryIndex(currentCategoryIndex - 1);
      const currentCard = plan?.cards[currentCardIndex];
      const prevCategory = currentCard?.categories[currentCategoryIndex - 1];
      setCurrentTopicIndex((prevCategory?.topics.length || 1) - 1);
      const prevTopic =
        prevCategory?.topics[(prevCategory?.topics.length || 1) - 1];
      setCurrentQuestionIndex((prevTopic?.questions.length || 1) - 1);
    } else if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      const prevCard = plan?.cards[currentCardIndex - 1];
      setCurrentCategoryIndex((prevCard?.categories.length || 1) - 1);
      const prevCategory =
        prevCard?.categories[(prevCard?.categories.length || 1) - 1];
      setCurrentTopicIndex((prevCategory?.topics.length || 1) - 1);
      const prevTopic =
        prevCategory?.topics[(prevCategory?.topics.length || 1) - 1];
      setCurrentQuestionIndex((prevTopic?.questions.length || 1) - 1);
    }
  };

  const resetProgress = () => {
    const newProgress = {
      totalQuestions: plan?.totalQuestions || 0,
      answeredQuestions: 0,
      correctAnswers: 0,
      currentCard: 0,
      completedCards: [],
      completedCategories: [],
      completedTopics: [],
      answeredQuestionIds: [],
    };
    saveProgress(newProgress);
    setCurrentCardIndex(0);
    setCurrentCategoryIndex(0);
    setCurrentTopicIndex(0);
    setCurrentQuestionIndex(0);

    // Clear saved position
    localStorage.removeItem(`guided-practice-position-${planId}`);
    console.log('🔄 Reset progress and cleared saved position');
  };

  if (isLoading) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 flex items-center justify-center'>
        <div className='text-center'>
          <Loader2 className='w-12 h-12 animate-spin text-blue-600 dark:text-blue-400 mx-auto mb-4' />
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
    return (
      <div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 flex items-center justify-center'>
        <div className='max-w-md w-full text-center'>
          <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8'>
            <div className='w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4'>
              <Target className='w-8 h-8 text-red-600 dark:text-red-400' />
            </div>
            <h2 className='text-xl font-semibold text-gray-900 dark:text-white mb-2'>
              Plan Not Found
            </h2>
            <p className='text-gray-600 dark:text-gray-400 mb-6'>
              {error || "The learning plan you're looking for doesn't exist."}
            </p>
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

  const currentCard = plan.cards[currentCardIndex];
  const currentCategory = currentCard?.categories[currentCategoryIndex];
  const currentTopic = currentCategory?.topics[currentTopicIndex];
  const currentQuestion = currentTopic?.questions[currentQuestionIndex];

  // Debug logging
  console.log('🔍 Guided Practice Debug:', {
    currentCardIndex,
    currentCategoryIndex,
    currentTopicIndex,
    currentQuestionIndex,
    currentCard: currentCard
      ? {
          title: currentCard.title,
          questionCount: currentCard.questionCount,
          categoriesCount: currentCard.categories?.length || 0,
        }
      : null,
    currentCategory: currentCategory
      ? {
          name: currentCategory.name,
          questionCount: currentCategory.questionCount,
          topicsCount: currentCategory.topics?.length || 0,
        }
      : null,
    currentTopic: currentTopic
      ? {
          name: currentTopic.name,
          questionCount: currentTopic.questionCount,
          questionsCount: currentTopic.questions?.length || 0,
        }
      : null,
    currentQuestion: currentQuestion
      ? {
          id: currentQuestion.id,
          title: currentQuestion.title,
        }
      : null,
  });

  const progressPercentage =
    progress.totalQuestions > 0
      ? Math.round((progress.answeredQuestions / progress.totalQuestions) * 100)
      : 0;

  const accuracyPercentage =
    progress.answeredQuestions > 0
      ? Math.round((progress.correctAnswers / progress.answeredQuestions) * 100)
      : 0;

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900'>
      {/* Header */}
      <div className='bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-b border-white/20 dark:border-gray-700/20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-4'>
              <button
                onClick={() =>
                  router.push(`/features/guided-learning/${planId}`)
                }
                className='p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors'
              >
                <ArrowLeft className='w-6 h-6 text-gray-600 dark:text-gray-400' />
              </button>
              <div>
                <h1 className='text-xl font-bold text-gray-900 dark:text-white'>
                  {plan.name}
                </h1>
                <p className='text-sm text-gray-600 dark:text-gray-400'>
                  Practice Session
                </p>
              </div>
            </div>

            <div className='flex items-center space-x-4'>
              <button
                onClick={resetProgress}
                className='flex items-center space-x-2 px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors'
              >
                <RotateCcw className='w-4 h-4' />
                <span>Reset</span>
              </button>
              <button
                onClick={() => router.push('/')}
                className='flex items-center space-x-2 px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors'
              >
                <Home className='w-4 h-4' />
                <span>Home</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
        <div className='bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm'>
          <div className='flex items-center justify-between mb-2'>
            <div className='flex items-center space-x-4'>
              <div className='text-sm font-medium text-gray-900 dark:text-white'>
                Progress: {progress.answeredQuestions}/{progress.totalQuestions}
              </div>
              <div className='text-sm text-gray-600 dark:text-gray-400'>
                Accuracy: {accuracyPercentage}%
              </div>
            </div>
            <div className='text-sm text-gray-600 dark:text-gray-400'>
              {progressPercentage}%
            </div>
          </div>
          <div className='w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2'>
            <div
              className='bg-blue-600 h-2 rounded-full transition-all duration-300'
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {currentQuestion ? (
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
            {/* Question Panel */}
            <div className='lg:col-span-2'>
              <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8'>
                {/* Card Info */}
                <div className='flex items-center justify-between mb-6'>
                  <div className='flex items-center space-x-3'>
                    <div
                      className='w-3 h-3 rounded-full'
                      style={{
                        backgroundColor: currentCard?.color || '#3B82F6',
                      }}
                    />
                    <span className='text-sm font-medium text-gray-600 dark:text-gray-400'>
                      {currentCard?.title} → {currentCategory?.name} →{' '}
                      {currentTopic?.name}
                    </span>
                  </div>

                  {/* Completion Badges */}
                  <div className='flex items-center space-x-2'>
                    {currentCard &&
                      progress.completedCards.includes(currentCardIndex) && (
                        <div className='flex items-center space-x-1 px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200 text-xs font-medium rounded-full'>
                          <CheckCircle className='w-3 h-3' />
                          <span>Card Complete</span>
                        </div>
                      )}
                    {currentCategory &&
                      progress.completedCategories.includes(
                        currentCategory.id
                      ) && (
                        <div className='flex items-center space-x-1 px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 text-xs font-medium rounded-full'>
                          <CheckCircle className='w-3 h-3' />
                          <span>Category Complete</span>
                        </div>
                      )}
                    {currentTopic &&
                      progress.completedTopics.includes(currentTopic.id) && (
                        <div className='flex items-center space-x-1 px-2 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-200 text-xs font-medium rounded-full'>
                          <CheckCircle className='w-3 h-3' />
                          <span>Topic Complete</span>
                        </div>
                      )}
                  </div>
                </div>

                {/* Question */}
                <div className='mb-8'>
                  <div className='flex items-center space-x-2 mb-4'>
                    <span className='px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 text-sm font-medium rounded-full'>
                      Question {currentQuestionIndex + 1} of{' '}
                      {currentTopic?.questions.length}
                    </span>
                    <span className='px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm font-medium rounded-full'>
                      {currentQuestion.difficulty}
                    </span>
                  </div>

                  {/* Topic and Category Badges */}
                  <div className='flex items-center space-x-2 mb-6'>
                    {currentCard && (
                      <span className='px-3 py-1 bg-indigo-100 dark:bg-indigo-900/20 text-indigo-800 dark:text-indigo-200 text-sm font-medium rounded-full flex items-center space-x-1'>
                        <div
                          className='w-2 h-2 rounded-full'
                          style={{
                            backgroundColor: currentCard.color || '#3B82F6',
                          }}
                        />
                        <span>{currentCard.title}</span>
                      </span>
                    )}
                    {currentCategory && (
                      <span className='px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 text-sm font-medium rounded-full'>
                        📚 {currentCategory.name}
                      </span>
                    )}
                    {currentTopic && (
                      <span className='px-3 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-200 text-sm font-medium rounded-full'>
                        🎯 {currentTopic.name}
                      </span>
                    )}
                  </div>

                  <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
                    {currentQuestion.title}
                  </h2>

                  {currentQuestion.content && (
                    <div className='bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 mb-6'>
                      <p className='text-gray-700 dark:text-gray-300 leading-relaxed'>
                        {currentQuestion.content}
                      </p>
                    </div>
                  )}

                  {/* Multiple Choice Options */}
                  {currentQuestion.type === 'multiple-choice' &&
                    currentQuestion.options &&
                    currentQuestion.options.length > 0 && (
                      <div className='space-y-3 mb-6'>
                        <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
                          Choose your answer:
                        </h3>
                        {currentQuestion.options.map((option, index) => {
                          const optionId = option.id || `option-${index}`;
                          const optionLetter = option.id
                            ? option.id.toUpperCase()
                            : String.fromCharCode(65 + index); // A, B, C, D
                          const isSelected =
                            currentAnswer?.selectedOption === optionId;
                          const isCorrect = option.isCorrect;
                          const isDisabled = currentAnswer !== null;

                          return (
                            <button
                              key={optionId}
                              onClick={() =>
                                handleAnswerQuestion(option.isCorrect, optionId)
                              }
                              disabled={isDisabled}
                              className={`w-full text-left p-4 border rounded-lg transition-colors ${
                                isDisabled
                                  ? isSelected
                                    ? isCorrect
                                      ? 'bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-600'
                                      : 'bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-600'
                                    : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 opacity-50'
                                  : 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-500'
                              }`}
                            >
                              <div className='flex items-center space-x-3'>
                                <span
                                  className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium ${
                                    isDisabled && isSelected
                                      ? isCorrect
                                        ? 'bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300'
                                        : 'bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-300'
                                      : 'bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                                  }`}
                                >
                                  {optionLetter}
                                </span>
                                <span
                                  className={`${
                                    isDisabled && isSelected
                                      ? isCorrect
                                        ? 'text-green-900 dark:text-green-100'
                                        : 'text-red-900 dark:text-red-100'
                                      : 'text-gray-900 dark:text-white'
                                  }`}
                                >
                                  {option.text}
                                </span>
                                {isDisabled && isCorrect && (
                                  <CheckCircle className='w-5 h-5 text-green-600 dark:text-green-400 ml-auto' />
                                )}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    )}

                  {/* True/False Options */}
                  {currentQuestion.type === 'true-false' && (
                    <div className='space-y-3 mb-6'>
                      <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
                        Choose your answer:
                      </h3>
                      <div className='grid grid-cols-2 gap-4'>
                        <button
                          onClick={() => handleAnswerQuestion(true, 'true')}
                          disabled={currentAnswer !== null}
                          className={`p-4 border rounded-lg transition-colors ${
                            currentAnswer !== null
                              ? currentAnswer.selectedOption === 'true'
                                ? currentAnswer.isCorrect
                                  ? 'bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-600'
                                  : 'bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-600'
                                : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 opacity-50'
                              : 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:bg-green-50 dark:hover:bg-green-900/20 hover:border-green-300 dark:hover:border-green-500'
                          }`}
                        >
                          <div className='flex items-center justify-center space-x-2'>
                            <CheckCircle className='w-5 h-5 text-green-600 dark:text-green-400' />
                            <span className='text-gray-900 dark:text-white font-medium'>
                              True
                            </span>
                          </div>
                        </button>
                        <button
                          onClick={() => handleAnswerQuestion(false, 'false')}
                          disabled={currentAnswer !== null}
                          className={`p-4 border rounded-lg transition-colors ${
                            currentAnswer !== null
                              ? currentAnswer.selectedOption === 'false'
                                ? !currentAnswer.isCorrect
                                  ? 'bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-600'
                                  : 'bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-600'
                                : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 opacity-50'
                              : 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-red-300 dark:hover:border-red-500'
                          }`}
                        >
                          <div className='flex items-center justify-center space-x-2'>
                            <Target className='w-5 h-5 text-red-600 dark:text-red-400' />
                            <span className='text-gray-900 dark:text-white font-medium'>
                              False
                            </span>
                          </div>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Other question types fallback */}
                  {currentQuestion.type !== 'multiple-choice' &&
                    currentQuestion.type !== 'true-false' && (
                      <div className='bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 mb-6'>
                        <p className='text-gray-700 dark:text-gray-300 leading-relaxed'>
                          This question type ({currentQuestion.type}) is not yet
                          supported in the practice mode.
                        </p>
                      </div>
                    )}

                  {/* Answer Result and Explanation */}
                  {currentAnswer && (
                    <div className='mt-6 p-6 rounded-lg border-2'>
                      <div
                        className={`flex items-center space-x-3 mb-4 ${
                          currentAnswer.isCorrect
                            ? 'text-green-800 dark:text-green-200 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                            : 'text-red-800 dark:text-red-200 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                        }`}
                      >
                        {currentAnswer.isCorrect ? (
                          <CheckCircle className='w-6 h-6 text-green-600 dark:text-green-400' />
                        ) : (
                          <Target className='w-6 h-6 text-red-600 dark:text-red-400' />
                        )}
                        <span className='text-lg font-semibold'>
                          {currentAnswer.isCorrect ? 'Correct!' : 'Incorrect'}
                        </span>
                      </div>

                      {currentQuestion.explanation && (
                        <div className='mb-4'>
                          <h4 className='text-sm font-semibold text-gray-900 dark:text-white mb-2'>
                            Explanation:
                          </h4>
                          <p className='text-gray-700 dark:text-gray-300 leading-relaxed'>
                            {currentQuestion.explanation}
                          </p>
                        </div>
                      )}

                      <button
                        onClick={proceedToNext}
                        className='w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium'
                      >
                        Continue to Next Question
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Progress Panel */}
            <div className='space-y-6'>
              {/* Current Progress */}
              <div className='bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6'>
                <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
                  Current Progress
                </h3>
                <div className='space-y-3'>
                  <div className='flex justify-between'>
                    <span className='text-sm text-gray-600 dark:text-gray-400'>
                      Questions Answered
                    </span>
                    <span className='text-sm font-medium text-gray-900 dark:text-white'>
                      {progress.answeredQuestions}/{progress.totalQuestions}
                    </span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-sm text-gray-600 dark:text-gray-400'>
                      Correct Answers
                    </span>
                    <span className='text-sm font-medium text-green-600 dark:text-green-400'>
                      {progress.correctAnswers}
                    </span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-sm text-gray-600 dark:text-gray-400'>
                      Accuracy
                    </span>
                    <span className='text-sm font-medium text-blue-600 dark:text-blue-400'>
                      {accuracyPercentage}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Completion Overview */}
              <div className='bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6'>
                <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
                  Completion Status
                </h3>
                <div className='space-y-3'>
                  <div className='flex justify-between items-center'>
                    <span className='text-sm text-gray-600 dark:text-gray-400'>
                      Cards Completed
                    </span>
                    <div className='flex items-center space-x-2'>
                      <span className='text-sm font-medium text-gray-900 dark:text-white'>
                        {progress.completedCards.length}/
                        {plan?.cards.length || 0}
                      </span>
                      {progress.completedCards.length > 0 && (
                        <CheckCircle className='w-4 h-4 text-green-600 dark:text-green-400' />
                      )}
                    </div>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span className='text-sm text-gray-600 dark:text-gray-400'>
                      Categories Completed
                    </span>
                    <div className='flex items-center space-x-2'>
                      <span className='text-sm font-medium text-gray-900 dark:text-white'>
                        {progress.completedCategories.length}
                      </span>
                      {progress.completedCategories.length > 0 && (
                        <CheckCircle className='w-4 h-4 text-blue-600 dark:text-blue-400' />
                      )}
                    </div>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span className='text-sm text-gray-600 dark:text-gray-400'>
                      Topics Completed
                    </span>
                    <div className='flex items-center space-x-2'>
                      <span className='text-sm font-medium text-gray-900 dark:text-white'>
                        {progress.completedTopics.length}
                      </span>
                      {progress.completedTopics.length > 0 && (
                        <CheckCircle className='w-4 h-4 text-purple-600 dark:text-purple-400' />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className='bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6'>
                <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
                  Navigation
                </h3>
                <div className='space-y-3'>
                  <button
                    onClick={handlePrevious}
                    disabled={
                      currentCardIndex === 0 &&
                      currentCategoryIndex === 0 &&
                      currentTopicIndex === 0 &&
                      currentQuestionIndex === 0
                    }
                    className='w-full flex items-center justify-center space-x-2 px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
                  >
                    <ArrowLeft className='w-4 h-4' />
                    <span>Previous</span>
                  </button>
                  <button
                    onClick={handleNext}
                    className='w-full flex items-center justify-center space-x-2 px-4 py-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 transition-colors'
                  >
                    <span>Next</span>
                    <ArrowRight className='w-4 h-4' />
                  </button>
                </div>
              </div>

              {/* Progress Storage Info */}
              <div className='bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4'>
                <p className='text-blue-800 dark:text-blue-200 text-sm font-medium mb-2'>
                  💾 Progress Saved Locally
                </p>
                <p className='text-blue-700 dark:text-blue-300 text-sm mb-3'>
                  Your progress is automatically saved in your browser. This
                  includes completed cards, categories, topics, answered
                  questions, and your current position. You can reload the page
                  and continue from where you left off.
                </p>
                <div className='space-y-2'>
                  <button
                    onClick={() => router.push('/auth')}
                    className='text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 font-medium text-sm underline block'
                  >
                    Sign in to sync across devices →
                  </button>
                  <button
                    onClick={resetProgress}
                    className='text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200 font-medium text-sm underline block'
                  >
                    Clear all progress
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className='text-center'>
            <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 max-w-md mx-auto'>
              <div className='w-16 h-16 bg-yellow-100 dark:bg-yellow-900/20 rounded-full flex items-center justify-center mx-auto mb-4'>
                <BookOpen className='w-8 h-8 text-yellow-600 dark:text-yellow-400' />
              </div>
              <h2 className='text-xl font-semibold text-gray-900 dark:text-white mb-2'>
                No Questions Available
              </h2>
              <p className='text-gray-600 dark:text-gray-400 mb-6'>
                This plan doesn't have any questions available yet. Please check
                back later or try a different plan.
              </p>
              <div className='space-y-3'>
                <button
                  onClick={() =>
                    router.push(`/features/guided-learning/${planId}`)
                  }
                  className='w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
                >
                  Back to Plan
                </button>
                <button
                  onClick={() => router.push('/features/guided-learning')}
                  className='w-full px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors'
                >
                  Choose Another Plan
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
