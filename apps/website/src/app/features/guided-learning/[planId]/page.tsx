'use client';

import React, { useState, useEffect } from 'react';

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
  console.warn('Supabase client creation failed:', error);
}

import { useRouter, useParams } from 'next/navigation';
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
} from 'lucide-react';

interface Question {
  id: string;
  title: string;
  topic?: string;
  difficulty: string;
  type: string;
}

interface Topic {
  id: string;
  name: string;
  description: string;
  questionCount: number;
  questions: Question[];
}

interface Category {
  id: string;
  name: string;
  description: string;
  questionCount: number;
  topics: Topic[];
}

interface Card {
  id: string;
  title: string;
  type: string;
  description: string;
  color: string;
  icon: string;
  order: number;
  questionCount: number;
  categories: Category[];
  hasQuestions: boolean;
}

interface LearningPlan {
  id: string;
  name: string;
  description: string;
  duration: number;
  difficulty: string;
  features: string[];
  estimatedTime: string;
  totalQuestions: number;
  sections: any[]; // For backward compatibility
  cards?: Card[]; // New structure
  structure?: {
    needsMigration: boolean;
  };
}

export default function LearningPlanDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [templates, setTemplates] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isStarting, setIsStarting] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [enhancedPlan, setEnhancedPlan] = useState<LearningPlan | null>(null);
  const [loadingEnhanced, setLoadingEnhanced] = useState(true);
  const [currentView, setCurrentView] = useState<
    'cards' | 'categories' | 'questions'
  >('cards');
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [progress, setProgress] = useState({
    completedCards: [] as number[],
    completedCategories: [] as string[],
    completedTopics: [] as string[],
    answeredQuestionIds: [] as string[],
  });

  const planId = params?.planId as string;
  const plan = templates.find(t => t.id === planId);

  // Load progress from localStorage
  useEffect(() => {
    const loadProgress = () => {
      const savedProgress = localStorage.getItem(
        `guided-practice-progress-${planId}`
      );
      if (savedProgress) {
        try {
          const parsedProgress = JSON.parse(savedProgress);
          setProgress(parsedProgress);
          console.log('📊 Progress loaded from localStorage:', parsedProgress);
        } catch (error) {
          console.error('Error parsing saved progress:', error);
        }
      }
    };

    loadProgress();

    // Listen for storage changes to update progress when returning from practice
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === `guided-practice-progress-${planId}` && e.newValue) {
        try {
          const parsedProgress = JSON.parse(e.newValue);
          setProgress(parsedProgress);
          console.log(
            '📊 Progress updated from storage event:',
            parsedProgress
          );
        } catch (error) {
          console.error('Error parsing updated progress:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Also check for progress updates when the page becomes visible
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        loadProgress();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [planId]);

  // Load templates
  useEffect(() => {
    const loadTemplates = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/plans');
        if (response.ok) {
          const data = await response.json();
          setTemplates(data.data || []);
        }
      } catch (error) {
        console.error('Error loading templates:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTemplates();
  }, []);

  // Fetch enhanced plan details
  useEffect(() => {
    const fetchEnhancedPlan = async () => {
      if (!planId) return;

      try {
        setLoadingEnhanced(true);
        const response = await fetch(
          `/api/guided-learning/plan-details/${planId}`
        );
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setEnhancedPlan(data.data);
          }
        }
      } catch (error) {
        console.error('Error fetching enhanced plan:', error);
      } finally {
        setLoadingEnhanced(false);
      }
    };

    fetchEnhancedPlan();
  }, [planId]);

  // Use enhanced plan if available, otherwise fall back to basic plan
  const displayPlan = enhancedPlan || plan;

  // Navigation functions
  const handleBackClick = () => {
    if (currentView === 'questions') {
      setCurrentView('categories');
      setSelectedCategory(null);
    } else if (currentView === 'categories') {
      setCurrentView('cards');
      setSelectedCard(null);
    } else {
      setIsNavigating(true);
      router.push('/features/guided-learning');
    }
  };

  const handleCardClick = (card: Card) => {
    setSelectedCard(card);
    setCurrentView('categories');
  };

  const handleCategoryClick = (category: Category) => {
    // Instead of showing topic breakdown, start practice session for this category
    if (category.questionCount > 0) {
      // Start practice session with this specific category
      router.push(`/guided-practice?plan=${planId}&category=${category.id}`);
    } else {
      // Show topic breakdown for categories with no questions
      setSelectedCategory(category);
      setCurrentView('questions');
    }
  };

  const handleStartPlan = async (selectedPlan: NonNullable<typeof plan>) => {
    if (!selectedPlan) {
      console.error('No plan selected');
      return;
    }

    setIsStarting(true);
    try {
      // Save the plan to localStorage for the practice session (works for both authenticated and guest users)
      localStorage.setItem('active-guided-plan', JSON.stringify(selectedPlan));
      localStorage.setItem('planStartTime', new Date().toISOString());

      // Save to Firestore if authenticated (encouraged but not required)
      if (isAuthenticated && user) {
        // This would be handled by the useLearningPlans hook
        console.log('Saving plan to Firestore:', selectedPlan);
      }

      // Redirect to practice (works for both authenticated and guest users)
      router.push(`/guided-practice?plan=${selectedPlan.id}`);
    } catch (error) {
      console.error('Error starting plan:', error);
    } finally {
      setIsStarting(false);
    }
  };

  if (isLoading || loadingEnhanced) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 flex items-center justify-center'>
        <div className='text-center'>
          <div className='w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg'>
            <Loader2 className='w-10 h-10 animate-spin text-white' />
          </div>
          <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-2'>
            Loading Plan Details
          </h2>
          <p className='text-lg text-gray-600 dark:text-gray-300'>
            Fetching your learning plan...
          </p>
        </div>
      </div>
    );
  }

  if (!displayPlan) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 flex items-center justify-center'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
            Plan Not Found
          </h1>
          <p className='text-gray-600 dark:text-gray-400 mb-8'>
            The learning plan you&apos;re looking for doesn&apos;t exist.
          </p>
          <button
            onClick={() => router.push('/features/guided-learning')}
            className='px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors'
          >
            Back to Learning Plans
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 py-8'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Back Button */}
        <button
          onClick={handleBackClick}
          disabled={isNavigating}
          className='flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-8 disabled:opacity-50 disabled:cursor-not-allowed'
        >
          {isNavigating ? (
            <Loader2 className='w-5 h-5 animate-spin' />
          ) : (
            <ArrowLeft className='w-5 h-5' />
          )}
          <span>
            {isNavigating
              ? 'Loading...'
              : currentView === 'questions'
                ? 'Back to Categories'
                : currentView === 'categories'
                  ? 'Back to Cards'
                  : 'Back to Learning Plans'}
          </span>
        </button>

        {/* Plan Header */}
        <div className='text-center mb-12'>
          <div className='relative mb-8'>
            {/* Animated Background */}
            <div className='absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-3xl blur-3xl opacity-20 scale-110' />

            {/* Plan Icon */}
            <div className='relative w-24 h-24 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 rounded-3xl flex items-center justify-center mx-auto shadow-2xl'>
              <Calendar className='w-12 h-12 text-white' />

              {/* Rotating Ring */}
              <div
                className='absolute inset-0 rounded-3xl border-4 border-white/20 animate-spin'
                style={{ animationDuration: '8s' }}
              />
            </div>
          </div>

          <h1 className='text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4'>
            {displayPlan.name}
          </h1>

          <p className='text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed mb-8'>
            {displayPlan.description}
          </p>

          {/* Plan Badges */}
          <div className='flex items-center justify-center space-x-4 mb-8'>
            {displayPlan.isRecommended && (
              <div className='bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center space-x-1'>
                <Star className='w-4 h-4' />
                <span>Recommended</span>
              </div>
            )}
            <div className='bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-full text-sm font-semibold'>
              {displayPlan.difficulty} Level
            </div>
            {displayPlan.structure?.needsMigration && (
              <div className='bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center space-x-1'>
                <Zap className='w-4 h-4' />
                <span>Needs Content</span>
              </div>
            )}
          </div>
        </div>

        {/* Plan Overview Cards */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-12'>
          <div className='bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 dark:border-gray-700/20 text-center'>
            <div className='w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mx-auto mb-4'>
              <Target className='w-6 h-6 text-blue-600 dark:text-blue-400' />
            </div>
            <div className='text-3xl font-bold text-gray-900 dark:text-white mb-2'>
              {displayPlan.totalQuestions || 0}
            </div>
            <div className='text-sm text-gray-600 dark:text-gray-400'>
              Total Questions
            </div>
          </div>

          <div className='bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 dark:border-gray-700/20 text-center'>
            <div className='w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mx-auto mb-4'>
              <Clock className='w-6 h-6 text-purple-600 dark:text-purple-400' />
            </div>
            <div className='text-3xl font-bold text-gray-900 dark:text-white mb-2'>
              {displayPlan.duration}
            </div>
            <div className='text-sm text-gray-600 dark:text-gray-400'>Days</div>
          </div>

          <div className='bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 dark:border-gray-700/20 text-center'>
            <div className='w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mx-auto mb-4'>
              <TrendingUp className='w-6 h-6 text-green-600 dark:text-green-400' />
            </div>
            <div className='text-3xl font-bold text-gray-900 dark:text-white mb-2'>
              {displayPlan.estimatedTime}
            </div>
            <div className='text-sm text-gray-600 dark:text-gray-400'>
              Duration
            </div>
          </div>
        </div>

        {/* Progress Overview */}
        {progress.completedCards.length > 0 ||
        progress.completedCategories.length > 0 ? (
          <div className='bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/20 dark:border-gray-700/20 mb-12'>
            <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center'>
              <BarChart3 className='w-6 h-6 mr-3 text-green-600' />
              Your Progress
            </h2>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              <div className='bg-green-50 dark:bg-green-900/20 rounded-xl p-6 text-center'>
                <div className='w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mx-auto mb-4'>
                  <CheckCircle className='w-6 h-6 text-green-600 dark:text-green-400' />
                </div>
                <div className='text-3xl font-bold text-gray-900 dark:text-white mb-2'>
                  {progress.completedCards.length}
                </div>
                <div className='text-sm text-gray-600 dark:text-gray-400'>
                  Cards Completed
                </div>
              </div>

              <div className='bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 text-center'>
                <div className='w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mx-auto mb-4'>
                  <BookOpen className='w-6 h-6 text-blue-600 dark:text-blue-400' />
                </div>
                <div className='text-3xl font-bold text-gray-900 dark:text-white mb-2'>
                  {progress.completedCategories.length}
                </div>
                <div className='text-sm text-gray-600 dark:text-gray-400'>
                  Categories Completed
                </div>
              </div>

              <div className='bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6 text-center'>
                <div className='w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mx-auto mb-4'>
                  <Target className='w-6 h-6 text-purple-600 dark:text-purple-400' />
                </div>
                <div className='text-3xl font-bold text-gray-900 dark:text-white mb-2'>
                  {progress.answeredQuestionIds.length}
                </div>
                <div className='text-sm text-gray-600 dark:text-gray-400'>
                  Questions Answered
                </div>
              </div>
            </div>

            <div className='mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg'>
              <p className='text-blue-800 dark:text-blue-200 text-sm font-medium mb-2'>
                💾 Progress saved locally in your browser
              </p>
              <p className='text-blue-700 dark:text-blue-300 text-sm'>
                Your progress is automatically saved and will persist across
                sessions.
                {!isAuthenticated &&
                  ' Sign in to sync your progress across devices.'}
              </p>
            </div>
          </div>
        ) : null}

        {/* Learning Content Navigation */}
        <div className='bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/20 dark:border-gray-700/20 mb-12'>
          <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center'>
            <BookOpen className='w-6 h-6 mr-3 text-indigo-600' />
            {currentView === 'cards' && 'Learning Cards'}
            {currentView === 'categories' &&
              `Categories in ${selectedCard?.title || selectedCard?.name}`}
            {currentView === 'questions' &&
              `Questions in ${selectedCategory?.name}`}
          </h2>

          {currentView === 'cards' && (
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {displayPlan.cards && displayPlan.cards.length > 0 ? (
                displayPlan.cards.map((card: Card, index: number) => (
                  <div
                    key={card.id}
                    className={`rounded-xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer relative ${
                      card.hasQuestions
                        ? 'bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 border border-gray-200 dark:border-gray-600'
                        : 'bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border border-orange-200 dark:border-orange-600'
                    }`}
                    onClick={() => handleCardClick(card)}
                  >
                    {/* Completion Badge */}
                    {progress.completedCards.includes(index) && (
                      <div className='absolute top-4 right-4'>
                        <div className='bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center space-x-1'>
                          <CheckCircle className='w-3 h-3' />
                          <span>Complete</span>
                        </div>
                      </div>
                    )}

                    <div className='flex items-center justify-between mb-4'>
                      <div className='flex items-center space-x-3'>
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                            card.hasQuestions
                              ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
                              : 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400'
                          }`}
                        >
                          {index + 1}
                        </div>
                        <div>
                          <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
                            {card.title || card.name}
                          </h3>
                          <div className='flex items-center space-x-2 mt-1'>
                            <span className='text-lg'>{card.icon}</span>
                            <span className='text-sm text-gray-600 dark:text-gray-400 capitalize'>
                              {card.type.replace('-', ' ')}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className='text-right'>
                        <div
                          className={`text-2xl font-bold ${
                            card.hasQuestions
                              ? 'text-gray-900 dark:text-white'
                              : 'text-orange-600 dark:text-orange-400'
                          }`}
                        >
                          {card.questionCount}
                        </div>
                        <div className='text-sm text-gray-600 dark:text-gray-400'>
                          questions
                        </div>
                      </div>
                    </div>
                    <p className='text-sm text-gray-600 dark:text-gray-400 mb-4'>
                      {card.description}
                    </p>
                    <div className='w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mb-2'>
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ${
                          card.hasQuestions
                            ? 'bg-gradient-to-r from-indigo-500 to-purple-500'
                            : 'bg-gradient-to-r from-orange-400 to-orange-500'
                        }`}
                        style={{
                          width: `${(card.questionCount / (displayPlan.totalQuestions || 1)) * 100 || 0}%`,
                        }}
                      />
                    </div>
                    <div className='flex items-center justify-between'>
                      <div className='text-sm text-gray-600 dark:text-gray-400'>
                        {Math.round(
                          (card.questionCount /
                            (displayPlan.totalQuestions || 1)) *
                            100
                        ) || 0}
                        % of total plan
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className='md:col-span-2 text-center py-12'>
                  <BookOpen className='w-16 h-16 text-gray-400 mx-auto mb-4' />
                  <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
                    No Learning Cards Added Yet
                  </h3>
                  <p className='text-gray-600 dark:text-gray-400 mb-6'>
                    This plan is currently being prepared. Learning cards will
                    be available soon.
                  </p>
                  <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                    <button
                      onClick={() => router.push('/features/guided-learning')}
                      className='px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors'
                    >
                      Back to Plans
                    </button>
                    <button
                      onClick={() => router.push('/features/guided-learning')}
                      className='px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors'
                    >
                      Choose Another Plan
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {currentView === 'categories' && selectedCard && (
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {selectedCard.categories && selectedCard.categories.length > 0 ? (
                selectedCard.categories.map(
                  (category: Category, index: number) => (
                    <div
                      key={category.id}
                      className={`rounded-xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer relative ${
                        category.questionCount > 0
                          ? 'bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-600'
                          : 'bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border border-orange-200 dark:border-orange-600'
                      }`}
                      onClick={() => handleCategoryClick(category)}
                    >
                      {/* Completion Badge */}
                      {progress.completedCategories.includes(category.id) && (
                        <div className='absolute top-4 right-4'>
                          <div className='bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center space-x-1'>
                            <CheckCircle className='w-3 h-3' />
                            <span>Complete</span>
                          </div>
                        </div>
                      )}

                      <div className='flex items-center justify-between mb-4'>
                        <div className='flex items-center space-x-3'>
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                              category.questionCount > 0
                                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                                : 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400'
                            }`}
                          >
                            {index + 1}
                          </div>
                          <div>
                            <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
                              {category.name}
                            </h3>
                            <p className='text-sm text-gray-600 dark:text-gray-400'>
                              {category.description}
                            </p>
                          </div>
                        </div>
                        <div className='text-right'>
                          <div
                            className={`text-2xl font-bold ${
                              category.questionCount > 0
                                ? 'text-gray-900 dark:text-white'
                                : 'text-orange-600 dark:text-orange-400'
                            }`}
                          >
                            {category.questionCount}
                          </div>
                          <div className='text-sm text-gray-600 dark:text-gray-400'>
                            questions
                          </div>
                        </div>
                      </div>
                      <div className='w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mb-2'>
                        <div
                          className={`h-2 rounded-full transition-all duration-500 ${
                            category.questionCount > 0
                              ? 'bg-gradient-to-r from-blue-500 to-indigo-500'
                              : 'bg-gradient-to-r from-orange-400 to-orange-500'
                          }`}
                          style={{
                            width: `${(category.questionCount / (selectedCard.questionCount || 1)) * 100 || 0}%`,
                          }}
                        />
                      </div>
                      <div className='flex items-center justify-between'>
                        <div className='text-sm text-gray-600 dark:text-gray-400'>
                          {Math.round(
                            (category.questionCount /
                              (selectedCard.questionCount || 1)) *
                              100
                          ) || 0}
                          % of card
                        </div>
                      </div>
                    </div>
                  )
                )
              ) : (
                <div className='md:col-span-2 text-center py-12'>
                  <BookOpen className='w-16 h-16 text-gray-400 mx-auto mb-4' />
                  <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
                    No Categories Added Yet
                  </h3>
                  <p className='text-gray-600 dark:text-gray-400 mb-6'>
                    This card is currently being prepared. Categories will be
                    available soon.
                  </p>
                  <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                    <button
                      onClick={() => setCurrentView('cards')}
                      className='px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors'
                    >
                      Back to Cards
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {currentView === 'questions' && selectedCategory && (
            <div className='space-y-6'>
              {selectedCategory.topics && selectedCategory.topics.length > 0 ? (
                selectedCategory.topics.map((topic: Topic) => (
                  <div
                    key={topic.id}
                    className='bg-gray-50 dark:bg-gray-700 rounded-xl p-6 shadow-sm'
                  >
                    <h3 className='text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center'>
                      <ArrowRight className='w-5 h-5 mr-2 text-purple-500' />
                      {topic.name} ({topic.questionCount} questions)
                    </h3>
                    <p className='text-gray-600 dark:text-gray-400 mb-4'>
                      {topic.description}
                    </p>
                    {topic.questions && topic.questions.length > 0 ? (
                      <div className='space-y-4'>
                        {topic.questions.map((question: Question) => (
                          <div
                            key={question.id}
                            className='flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600'
                          >
                            <div className='flex-1'>
                              <p className='text-gray-900 dark:text-white font-medium'>
                                {question.title}
                              </p>
                              <div className='flex items-center space-x-2 mt-2'>
                                <span
                                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                    question.difficulty === 'beginner'
                                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                      : question.difficulty === 'intermediate'
                                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                                        : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                                  }`}
                                >
                                  {question.difficulty}
                                </span>
                                <span className='px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-semibold dark:bg-indigo-900/30 dark:text-indigo-400'>
                                  {question.type}
                                </span>
                                <span className='px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold dark:bg-blue-900/30 dark:text-blue-400'>
                                  📚 {selectedCategory?.name}
                                </span>
                                <span className='px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-semibold dark:bg-purple-900/30 dark:text-purple-400'>
                                  🎯 {topic.name}
                                </span>
                              </div>
                            </div>
                            <ArrowRight className='w-5 h-5 text-gray-400' />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className='text-center py-8 text-gray-600 dark:text-gray-400'>
                        No questions in this topic yet.
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className='text-center py-12'>
                  <BookOpen className='w-16 h-16 text-gray-400 mx-auto mb-4' />
                  <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
                    No Topics Added Yet
                  </h3>
                  <p className='text-gray-600 dark:text-gray-400 mb-6'>
                    This category is currently being prepared. Topics will be
                    available soon.
                  </p>
                  <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                    <button
                      onClick={() => setCurrentView('categories')}
                      className='px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors'
                    >
                      Back to Categories
                    </button>
                    <button
                      onClick={() => setCurrentView('categories')}
                      className='px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors'
                    >
                      Back to Categories
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Features */}
        <div className='bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/20 dark:border-gray-700/20 mb-12'>
          <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center'>
            <Zap className='w-6 h-6 mr-3 text-yellow-500' />
            What You&apos;ll Get
          </h2>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {displayPlan.features?.map((feature: string, index: number) => (
              <div
                key={index}
                className='flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg'
              >
                <CheckCircle className='w-5 h-5 text-green-500 flex-shrink-0' />
                <span className='text-gray-900 dark:text-white'>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Daily Schedule */}
        <div className='bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/20 dark:border-gray-700/20 mb-12'>
          <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center'>
            <Calendar className='w-6 h-6 mr-3 text-green-600' />
            Daily Schedule
          </h2>

          <div className='space-y-4'>
            {Array.from({ length: displayPlan.duration }, (_, dayIndex) => {
              const dayNumber = dayIndex + 1;
              const dailyQuestions = Math.ceil(
                (displayPlan.totalQuestions || 0) / displayPlan.duration
              );
              const sectionsForDay =
                displayPlan.sections?.slice(
                  0,
                  Math.ceil(
                    (displayPlan.sections?.length || 0) / displayPlan.duration
                  )
                ) || [];

              return (
                <div
                  key={dayIndex}
                  className='flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg'
                >
                  <div className='w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center'>
                    <span className='text-lg font-bold text-green-600 dark:text-green-400'>
                      {dayNumber}
                    </span>
                  </div>
                  <div className='flex-1'>
                    <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
                      Day {dayNumber}
                    </h3>
                    <p className='text-gray-600 dark:text-gray-400'>
                      {dailyQuestions} questions •{' '}
                      {sectionsForDay.map((s: any) => s.name).join(', ')}
                    </p>
                  </div>
                  <div className='text-right'>
                    <div className='text-sm text-gray-600 dark:text-gray-400'>
                      ~{displayPlan.estimatedTime}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Start Plan Button */}
        <div className='text-center'>
          <button
            onClick={() => displayPlan && handleStartPlan(displayPlan)}
            disabled={isStarting || !displayPlan}
            className='bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-12 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-3 mx-auto'
          >
            {isStarting ? (
              <>
                <Loader2 className='w-6 h-6 animate-spin' />
                <span>Starting Your Learning Journey...</span>
              </>
            ) : (
              <>
                <Play className='w-6 h-6' />
                <span>Start {displayPlan.name}</span>
                <ArrowRight className='w-6 h-6' />
              </>
            )}
          </button>

          {!isAuthenticated && (
            <div className='bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mt-4'>
              <p className='text-blue-800 dark:text-blue-200 text-sm font-medium mb-2'>
                💡 Sign in to save your progress
              </p>
              <p className='text-blue-700 dark:text-blue-300 text-sm'>
                You can start learning right away! Sign in to save your progress
                across devices and track your improvement over time.
              </p>
              <button
                onClick={() => router.push('/auth')}
                className='mt-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 font-medium text-sm underline'
              >
                Sign in now →
              </button>
            </div>
          )}

          <p className='text-gray-600 dark:text-gray-400 mt-4 text-sm'>
            Ready to begin your {displayPlan.duration}-day learning journey?
          </p>
        </div>
      </div>
    </div>
  );
}
