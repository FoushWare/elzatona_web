'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  XCircle,
  Filter,
  Search,
  BookOpen,
  Loader2,
  Target,
  TrendingUp,
  Clock,
  Star,
} from 'lucide-react';
import { useUserType } from '@elzatona/shared-contexts';

import { useSecureProgress } from '@elzatona/shared-hooks';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  section: string;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
}

interface FilterOptions {
  sections: string[];
  difficulties: string[];
  tags: string[];
}

export default function FreeStylePracticePage() {
  const { userType } = useUserType();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const { saveProgress, progress: userProgress } = useSecureProgress();
  const router = useRouter();

  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [sessionStats, setSessionStats] = useState({
    correct: 0,
    total: 0,
    timeSpent: 0,
  });
  const [questionStartTime, setQuestionStartTime] = useState<number>(
    Date.now()
  );
  const [filters, setFilters] = useState<FilterOptions>({
    sections: [],
    difficulties: [],
    tags: [],
  });
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sessionStartTime] = useState(Date.now());

  // Available sections
  const availableSections = [
    'HTML',
    'CSS',
    'JavaScript',
    'TypeScript',
    'React',
    'Next.js',
    'System Design',
    'Performance',
    'Security',
    'Design Patterns',
    'Problem Solving',
  ];

  // Available difficulties
  const availableDifficulties = ['easy', 'medium', 'hard'];

  // Available tags
  const availableTags = [
    'fundamentals',
    'advanced',
    'interview',
    'practical',
    'theory',
    'best-practices',
    'optimization',
    'security',
    'accessibility',
  ];

  // Mock questions data
  const mockQuestions: Question[] = [
    {
      id: '1',
      question: 'What is the purpose of the HTML `<meta>` tag?',
      options: [
        'To define the document title',
        'To provide metadata about the HTML document',
        'To create a link to external stylesheets',
        'To define the document structure',
      ],
      correctAnswer: 1,
      explanation:
        'The `<meta>` tag provides metadata about the HTML document, such as character encoding, viewport settings, and SEO information.',
      section: 'HTML',
      difficulty: 'easy',
      tags: ['fundamentals', 'interview'],
    },
    {
      id: '2',
      question: 'Which CSS property is used to change the text color?',
      options: ['font-color', 'text-color', 'color', 'text-style'],
      correctAnswer: 2,
      explanation:
        'The `color` property is used to set the color of text in CSS.',
      section: 'CSS',
      difficulty: 'easy',
      tags: ['fundamentals'],
    },
    {
      id: '3',
      question: 'What is the difference between `let` and `var` in JavaScript?',
      options: [
        'No difference, they are identical',
        '`let` has block scope, `var` has function scope',
        '`var` has block scope, `let` has function scope',
        '`let` is faster than `var`',
      ],
      correctAnswer: 1,
      explanation:
        "`let` has block scope (limited to the block where it's declared), while `var` has function scope (accessible throughout the entire function).",
      section: 'JavaScript',
      difficulty: 'medium',
      tags: ['fundamentals', 'interview'],
    },
    {
      id: '4',
      question: "What is the purpose of React's `useEffect` hook?",
      options: [
        'To manage component state',
        'To perform side effects in functional components',
        'To create custom hooks',
        'To handle form submissions',
      ],
      correctAnswer: 1,
      explanation:
        '`useEffect` is used to perform side effects in functional components, such as data fetching, subscriptions, or manually changing the DOM.',
      section: 'React',
      difficulty: 'medium',
      tags: ['fundamentals', 'interview'],
    },
    {
      id: '5',
      question: 'What is the purpose of Next.js `getServerSideProps`?',
      options: [
        'To fetch data on the client side',
        'To fetch data on the server side before rendering',
        'To optimize images',
        'To handle routing',
      ],
      correctAnswer: 1,
      explanation:
        '`getServerSideProps` is used to fetch data on the server side before rendering the page, ensuring the data is available when the page loads.',
      section: 'Next.js',
      difficulty: 'medium',
      tags: ['advanced', 'interview'],
    },
  ];

  useEffect(() => {
    if (!isAuthLoading && userType !== 'self-directed') {
      router.push('/learning-mode');
      return;
    }

    // Load first question
    loadNextQuestion();
  }, [userType, isAuthLoading, router]);

  const getFilteredQuestions = () => {
    return mockQuestions.filter(question => {
      // Filter by sections
      if (
        filters.sections.length > 0 &&
        !filters.sections.includes(question.section)
      ) {
        return false;
      }

      // Filter by difficulties
      if (
        filters.difficulties.length > 0 &&
        !filters.difficulties.includes(question.difficulty)
      ) {
        return false;
      }

      // Filter by tags
      if (
        filters.tags.length > 0 &&
        !filters.tags.some(tag => question.tags.includes(tag))
      ) {
        return false;
      }

      // Filter by search term
      if (
        searchTerm &&
        !question.question.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false;
      }

      return true;
    });
  };

  const loadNextQuestion = () => {
    const filteredQuestions = getFilteredQuestions();
    if (filteredQuestions.length === 0) {
      // No questions match the current filters
      setCurrentQuestion(null);
      return;
    }

    const randomQuestion =
      filteredQuestions[Math.floor(Math.random() * filteredQuestions.length)];
    setCurrentQuestion(randomQuestion);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setIsCorrect(null);
    setQuestionStartTime(Date.now());
  };

  const handleAnswerSelect = async (answerIndex: number) => {
    if (showExplanation || !currentQuestion) return;

    setSelectedAnswer(answerIndex);
    const correct = answerIndex === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    setShowExplanation(true);

    // Calculate time spent on this question
    const timeSpent = Date.now() - questionStartTime;

    // Update session stats
    setSessionStats(prev => ({
      ...prev,
      total: prev.total + 1,
      correct: prev.correct + (correct ? 1 : 0),
      timeSpent: prev.timeSpent + Math.round(timeSpent / 1000),
    }));

    // Save progress securely
    if (isAuthenticated) {
      try {
        const success = await saveProgress({
          sessionId: `free-style_${Date.now()}`,
          question_id: currentQuestion.id,
          answer: answerIndex,
          isCorrect: correct,
          timeSpent: Math.round(timeSpent / 1000), // Convert to seconds
          section: currentQuestion.section,
          difficulty: currentQuestion.difficulty,
          timestamp: Date.now(),
          learningMode: 'free-style',
        });

        if (success) {
          console.log('✅ Progress saved successfully');
        } else {
          console.log('⚠️ Progress save failed, but continuing');
        }
      } catch (error) {
        console.error('❌ Error saving progress:', error);
        // Continue with the question flow even if progress save fails
      }
    }
  };

  const handleNextQuestion = () => {
    loadNextQuestion();
  };

  const handleFilterChange = (type: keyof FilterOptions, value: string) => {
    setFilters(prev => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter(item => item !== value)
        : [...prev[type], value],
    }));
  };

  const clearFilters = () => {
    setFilters({
      sections: [],
      difficulties: [],
      tags: [],
    });
    setSearchTerm('');
  };

  const getAccuracyPercentage = () => {
    if (sessionStats.total === 0) return 0;
    return Math.round((sessionStats.correct / sessionStats.total) * 100);
  };

  const getSessionTime = () => {
    return Math.round((Date.now() - sessionStartTime) / 1000 / 60); // minutes
  };

  if (isAuthLoading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900'>
        <Loader2 className='w-8 h-8 animate-spin text-indigo-600' />
        <p className='ml-3 text-lg text-gray-700 dark:text-gray-300'>
          Loading free style practice...
        </p>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900'>
      {/* Header */}
      <div className='bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-b border-white/20 dark:border-gray-700/20'>
        <div className='container mx-auto px-4 py-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-4'>
              <button
                onClick={() => router.push('/free-style-roadmap')}
                className='p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors'
              >
                <ArrowLeft className='w-5 h-5 text-gray-600 dark:text-gray-400' />
              </button>
              <div>
                <h1 className='text-xl font-bold text-gray-900 dark:text-white'>
                  Free Style Practice
                </h1>
                <p className='text-sm text-gray-600 dark:text-gray-400'>
                  Practice questions at your own pace
                </p>
              </div>
            </div>

            <div className='flex items-center space-x-4'>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className='p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors'
              >
                <Filter className='w-5 h-5 text-gray-600 dark:text-gray-400' />
              </button>
              <button
                onClick={() => router.push('/free-style-analytics')}
                className='p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors'
              >
                <TrendingUp className='w-5 h-5 text-gray-600 dark:text-gray-400' />
              </button>
              <div className='text-center'>
                <div className='text-lg font-bold text-gray-900 dark:text-white'>
                  {sessionStats.correct}/{sessionStats.total}
                </div>
                <div className='text-xs text-gray-600 dark:text-gray-400'>
                  {getAccuracyPercentage()}% accuracy
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className='bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-b border-white/20 dark:border-gray-700/20'>
          <div className='container mx-auto px-4 py-4'>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
              {/* Search */}
              <div>
                <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                  Search Questions
                </label>
                <div className='relative'>
                  <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400' />
                  <input
                    type='text'
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    placeholder='Search questions...'
                    className='w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                  />
                </div>
              </div>

              {/* Sections */}
              <div>
                <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                  Sections
                </label>
                <div className='space-y-1 max-h-32 overflow-y-auto'>
                  {availableSections.map(section => (
                    <label key={section} className='flex items-center'>
                      <input
                        type='checkbox'
                        checked={filters.sections.includes(section)}
                        onChange={() => handleFilterChange('sections', section)}
                        className='mr-2'
                      />
                      <span className='text-sm text-gray-700 dark:text-gray-300'>
                        {section}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Difficulties */}
              <div>
                <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                  Difficulty
                </label>
                <div className='space-y-1'>
                  {availableDifficulties.map(difficulty => (
                    <label key={difficulty} className='flex items-center'>
                      <input
                        type='checkbox'
                        checked={filters.difficulties.includes(difficulty)}
                        onChange={() =>
                          handleFilterChange('difficulties', difficulty)
                        }
                        className='mr-2'
                      />
                      <span className='text-sm text-gray-700 dark:text-gray-300 capitalize'>
                        {difficulty}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                  Tags
                </label>
                <div className='space-y-1 max-h-32 overflow-y-auto'>
                  {availableTags.map(tag => (
                    <label key={tag} className='flex items-center'>
                      <input
                        type='checkbox'
                        checked={filters.tags.includes(tag)}
                        onChange={() => handleFilterChange('tags', tag)}
                        className='mr-2'
                      />
                      <span className='text-sm text-gray-700 dark:text-gray-300'>
                        {tag}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className='flex justify-end mt-4'>
              <button
                onClick={clearFilters}
                className='px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors'
              >
                Clear All Filters
              </button>
            </div>
          </div>
        </div>
      )}

      <div className='container mx-auto px-4 py-8 max-w-4xl'>
        {/* No Questions Message */}
        {!currentQuestion && (
          <div className='bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/20 dark:border-gray-700/20 text-center'>
            <Target className='w-16 h-16 text-gray-400 mx-auto mb-4' />
            <h2 className='text-xl font-semibold text-gray-900 dark:text-white mb-2'>
              No Questions Found
            </h2>
            <p className='text-gray-600 dark:text-gray-400 mb-6'>
              No questions match your current filters. Try adjusting your search
              criteria.
            </p>
            <button
              onClick={clearFilters}
              className='px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors'
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Question Card */}
        {currentQuestion && (
          <div className='bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/20 dark:border-gray-700/20 mb-8'>
            <div className='flex items-center justify-between mb-6'>
              <div className='flex items-center space-x-3'>
                <div className='w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center'>
                  <BookOpen className='w-4 h-4 text-purple-600 dark:text-purple-400' />
                </div>
                <div>
                  <div className='font-semibold text-gray-900 dark:text-white'>
                    {currentQuestion.section}
                  </div>
                  <div className='text-sm text-gray-600 dark:text-gray-400 capitalize'>
                    {currentQuestion.difficulty} difficulty
                  </div>
                </div>
              </div>
              <div className='flex items-center space-x-2'>
                {currentQuestion.tags.map(tag => (
                  <span
                    key={tag}
                    className='px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-xs rounded-full'
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-6'>
              {currentQuestion.question}
            </h3>

            <div className='space-y-3 mb-6'>
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showExplanation}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                    showExplanation
                      ? index === currentQuestion.correctAnswer
                        ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                        : selectedAnswer === index
                          ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                          : 'border-gray-200 dark:border-gray-700'
                      : selectedAnswer === index
                        ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600'
                  }`}
                >
                  <div className='flex items-center space-x-3'>
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        showExplanation
                          ? index === currentQuestion.correctAnswer
                            ? 'border-green-500 bg-green-500'
                            : selectedAnswer === index
                              ? 'border-red-500 bg-red-500'
                              : 'border-gray-300 dark:border-gray-600'
                          : selectedAnswer === index
                            ? 'border-purple-500 bg-purple-500'
                            : 'border-gray-300 dark:border-gray-600'
                      }`}
                    >
                      {showExplanation &&
                        index === currentQuestion.correctAnswer && (
                          <CheckCircle className='w-4 h-4 text-white' />
                        )}
                      {showExplanation &&
                        selectedAnswer === index &&
                        index !== currentQuestion.correctAnswer && (
                          <XCircle className='w-4 h-4 text-white' />
                        )}
                    </div>
                    <span className='text-gray-900 dark:text-white'>
                      {option}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {showExplanation && (
              <div className='bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6'>
                <h4 className='font-semibold text-gray-900 dark:text-white mb-2'>
                  Explanation:
                </h4>
                <p className='text-gray-700 dark:text-gray-300'>
                  {currentQuestion.explanation}
                </p>
              </div>
            )}

            {showExplanation && (
              <div className='flex justify-end'>
                <button
                  onClick={handleNextQuestion}
                  className='px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center space-x-2'
                >
                  <span>Next Question</span>
                  <ArrowRight className='w-5 h-5' />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Session Stats */}
        <div className='bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 dark:border-gray-700/20'>
          <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center'>
            <TrendingUp className='w-5 h-5 mr-2 text-green-500' />
            Session Statistics
          </h3>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            <div className='text-center'>
              <div className='text-2xl font-bold text-gray-900 dark:text-white'>
                {sessionStats.total}
              </div>
              <div className='text-sm text-gray-600 dark:text-gray-400'>
                Questions Answered
              </div>
            </div>
            <div className='text-center'>
              <div className='text-2xl font-bold text-gray-900 dark:text-white'>
                {getAccuracyPercentage()}%
              </div>
              <div className='text-sm text-gray-600 dark:text-gray-400'>
                Accuracy Rate
              </div>
            </div>
            <div className='text-center'>
              <div className='text-2xl font-bold text-gray-900 dark:text-white'>
                {getSessionTime()}m
              </div>
              <div className='text-sm text-gray-600 dark:text-gray-400'>
                Time Spent
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
