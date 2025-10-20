'use client';

import React, { useState, useEffect, ReactNode } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

import { useRouter, useParams } from 'next/navigation';
import {
  BookOpen,
  ArrowRight,
  Clock,
  Target,
  Users,
  Star,
  ChevronRight,
  Code,
  Palette,
  Zap,
  Shield,
  Layers,
  Settings,
  Brain,
  Globe,
  Play,
  CheckCircle,
  Circle,
  HelpCircle,
  Trophy,
  TrendingUp,
} from 'lucide-react';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
  points: number;
  timeLimit?: number;
  is_active: boolean;
}

interface QuestionsResponse {
  success: boolean;
  data: Question[];
  error?: string;
}

interface LearningPath {
  id: string;
  name: string;
  order?: number;
  questionCount?: number;
  sectors: Array<{
    id: string;
    name: string;
    question_count: number;
  }>;
}

interface LearningPathResponse {
  success: boolean;
  data: LearningPath;
  error?: string;
}

export default function LearningPathSectionPage() {
  const router = useRouter();
  const params = useParams();
  const pathId = params?.id as string;
  const sectionId = params?.sectionId as string;

  const [learningPath, setLearningPath] = useState<LearningPath | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [completedQuestions, setCompletedQuestions] = useState<Set<string>>(
    new Set()
  );

  useEffect(() => {
    if (pathId && sectionId) {
      fetchData();
    }
  }, [pathId, sectionId]);

  const fetchData = async () => {
    try {
      setLoading(true);

      // Fetch learning path
      const pathResponse = await fetch(`/api/learning-paths/${pathId}`);
      const pathData: LearningPathResponse = await pathResponse.json();

      if (pathData.success) {
        setLearningPath(pathData.data);
      }

      // Fetch questions for this section
      const questionsResponse = await fetch(
        `/api/questions/by-learning-path/${pathId}`
      );
      const questionsData: QuestionsResponse = await questionsResponse.json();

      if (questionsData.success) {
        setQuestions(questionsData.data);
      } else {
        setError(questionsData.error || 'Failed to fetch questions');
      }
    } catch (err) {
      setError('Failed to fetch data');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;

    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

    if (isCorrect) {
      setScore(score + currentQuestion.points);
    }

    setCompletedQuestions(prev => new Set([...prev, currentQuestion.id]));
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'hard':
        return 'text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const getPathIcon = (pathId: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      'javascript-practice': <Code className='w-6 h-6' />,
      'javascript-deep-dive': <Code className='w-6 h-6' />,
      'css-practice': <Palette className='w-6 h-6' />,
      'css-mastery': <Palette className='w-6 h-6' />,
      'react-practice': <Zap className='w-6 h-6' />,
      'react-mastery': <Zap className='w-6 h-6' />,
      'html-practice': <Globe className='w-6 h-6' />,
      'typescript-essentials': <Code className='w-6 h-6' />,
      'security-essentials': <Shield className='w-6 h-6' />,
      'performance-optimization': <Zap className='w-6 h-6' />,
      'testing-strategies': <Target className='w-6 h-6' />,
      'build-tools-devops': <Settings className='w-6 h-6' />,
      'frontend-system-design': <Layers className='w-6 h-6' />,
      'api-integration': <Globe className='w-6 h-6' />,
      'ai-tools-frontend': <Brain className='w-6 h-6' />,
    };
    return iconMap[pathId] || <BookOpen className='w-6 h-6' />;
  };

  if (loading) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center'>
        <div className='text-center'>
          <div className='w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4'></div>
          <p className='text-gray-600 dark:text-gray-400 text-lg'>
            Loading questions...
          </p>
        </div>
      </div>
    );
  }

  if (error || !learningPath || questions.length === 0) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center'>
        <div className='text-center'>
          <div className='w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4'>
            <HelpCircle className='w-8 h-8 text-red-600' />
          </div>
          <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-2'>
            No Questions Available
          </h2>
          <p className='text-gray-600 dark:text-gray-400 mb-4'>
            {error || 'No questions found for this section'}
          </p>
          <button
            onClick={() => router.push(`/learning-paths/${pathId}`)}
            className='px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors'
          >
            Back to Learning Path
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const currentSection = learningPath.sectors.find(s => s.id === sectionId);
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className='min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900'>
      <div className='container mx-auto px-4 py-8'>
        {/* Header */}
        <div className='mb-8'>
          <div className='flex items-center gap-4 mb-4'>
            <button
              onClick={() => router.push(`/learning-paths/${pathId}`)}
              className='p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors'
            >
              <ArrowRight className='w-6 h-6 rotate-180' />
            </button>
            <div className='flex items-center gap-3'>
              <div className='w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center text-white'>
                {getPathIcon(pathId)}
              </div>
              <div>
                <h1 className='text-2xl font-bold text-gray-900 dark:text-white'>
                  {learningPath.name}
                </h1>
                <p className='text-gray-600 dark:text-gray-400'>
                  {currentSection?.name}
                </p>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className='bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg'>
            <div className='flex items-center justify-between mb-2'>
              <span className='text-sm font-medium text-gray-700 dark:text-gray-300'>
                Question {currentQuestionIndex + 1} of {questions.length}
              </span>
              <span className='text-sm font-medium text-gray-700 dark:text-gray-300'>
                Score: {score} points
              </span>
            </div>
            <div className='w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2'>
              <div
                className='bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-300'
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Question Card */}
        <div className='max-w-4xl mx-auto'>
          <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8'>
            {/* Question Header */}
            <div className='flex items-center justify-between mb-6'>
              <div className='flex items-center gap-3'>
                <div className='w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center text-white'>
                  <HelpCircle className='w-6 h-6' />
                </div>
                <div>
                  <h2 className='text-xl font-bold text-gray-900 dark:text-white'>
                    Question {currentQuestionIndex + 1}
                  </h2>
                  <div className='flex items-center gap-2'>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(currentQuestion.difficulty)}`}
                    >
                      {currentQuestion.difficulty}
                    </span>
                    <span className='text-sm text-gray-600 dark:text-gray-400'>
                      {currentQuestion.points} points
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Question */}
            <div className='mb-8'>
              <p className='text-lg text-gray-900 dark:text-white leading-relaxed'>
                {currentQuestion.question}
              </p>
            </div>

            {/* Answer Options */}
            <div className='space-y-3 mb-8'>
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 ${
                    selectedAnswer === index
                      ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 text-gray-900 dark:text-white'
                  }`}
                >
                  <div className='flex items-center gap-3'>
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        selectedAnswer === index
                          ? 'border-indigo-500 bg-indigo-500'
                          : 'border-gray-300 dark:border-gray-600'
                      }`}
                    >
                      {selectedAnswer === index && (
                        <CheckCircle className='w-4 h-4 text-white' />
                      )}
                    </div>
                    <span className='font-medium'>{option}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Submit Button */}
            {!showExplanation && (
              <div className='text-center'>
                <button
                  onClick={handleSubmitAnswer}
                  disabled={selectedAnswer === null}
                  className='px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105'
                >
                  Submit Answer
                </button>
              </div>
            )}

            {/* Explanation */}
            {showExplanation && (
              <div className='mb-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200 dark:border-green-800'>
                <div className='flex items-center gap-2 mb-3'>
                  <CheckCircle className='w-5 h-5 text-green-600' />
                  <h3 className='text-lg font-semibold text-green-800 dark:text-green-200'>
                    Explanation
                  </h3>
                </div>
                <p className='text-green-700 dark:text-green-300 leading-relaxed'>
                  {currentQuestion.explanation}
                </p>
                <div className='mt-3 text-sm text-green-600 dark:text-green-400'>
                  Correct Answer:{' '}
                  {currentQuestion.options[currentQuestion.correctAnswer]}
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className='flex items-center justify-between'>
              <button
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
                className='flex items-center gap-2 px-6 py-3 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
              >
                <ArrowRight className='w-4 h-4 rotate-180' />
                <span>Previous</span>
              </button>

              <div className='flex items-center gap-2'>
                {questions.map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full ${
                      index === currentQuestionIndex
                        ? 'bg-indigo-500'
                        : index < currentQuestionIndex
                          ? 'bg-green-500'
                          : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={handleNextQuestion}
                disabled={currentQuestionIndex === questions.length - 1}
                className='flex items-center gap-2 px-6 py-3 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
              >
                <span>Next</span>
                <ArrowRight className='w-4 h-4' />
              </button>
            </div>
          </div>
        </div>

        {/* Completion Stats */}
        {currentQuestionIndex === questions.length - 1 && showExplanation && (
          <div className='max-w-4xl mx-auto mt-8'>
            <div className='bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-8 text-white text-center'>
              <Trophy className='w-16 h-16 mx-auto mb-4' />
              <h2 className='text-3xl font-bold mb-2'>Section Complete!</h2>
              <p className='text-green-100 mb-4'>
                You&apos;ve completed all questions in this section.
              </p>
              <div className='flex items-center justify-center gap-6'>
                <div className='text-center'>
                  <div className='text-2xl font-bold'>{score}</div>
                  <div className='text-green-100'>Total Points</div>
                </div>
                <div className='text-center'>
                  <div className='text-2xl font-bold'>{questions.length}</div>
                  <div className='text-green-100'>Questions</div>
                </div>
                <div className='text-center'>
                  <div className='text-2xl font-bold'>
                    {Math.round((score / (questions.length * 10)) * 100)}%
                  </div>
                  <div className='text-green-100'>Accuracy</div>
                </div>
              </div>
              <button
                onClick={() => router.push(`/learning-paths/${pathId}`)}
                className='mt-6 px-8 py-3 bg-white text-green-600 rounded-xl font-semibold hover:bg-green-50 transition-colors'
              >
                Back to Learning Path
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
