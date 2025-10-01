'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Clock,
  Target,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  BookOpen,
  Zap,
  TrendingUp,
  Award,
  RotateCcw,
  Play,
  Pause,
} from 'lucide-react';

interface GuidedSession {
  planId: string;
  day: number;
  totalQuestions: number;
  completedQuestions: number;
  currentSection: string;
  sections: {
    id: string;
    name: string;
    questions: number;
    completed: number;
  }[];
  startTime: Date;
  estimatedTime: number; // in minutes
}

interface Question {
  id: string;
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  section: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export const GuidedPractice: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const planId = searchParams.get('plan');

  const [session, setSession] = useState<GuidedSession | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Mock questions data - in real implementation, this would come from API
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
      correctAnswer: 'To provide metadata about the HTML document',
      explanation:
        'The `<meta>` tag provides metadata about the HTML document, such as character encoding, viewport settings, and SEO information.',
      section: 'html-css',
      difficulty: 'Easy',
    },
    {
      id: '2',
      question: 'What is the difference between `let` and `var` in JavaScript?',
      options: [
        'No difference, they are identical',
        '`let` has block scope, `var` has function scope',
        '`var` has block scope, `let` has function scope',
        '`let` is faster than `var`',
      ],
      correctAnswer: '`let` has block scope, `var` has function scope',
      explanation:
        '`let` declarations are block-scoped, meaning they are only accessible within the block they are declared in, while `var` declarations are function-scoped.',
      section: 'javascript',
      difficulty: 'Medium',
    },
    {
      id: '3',
      question: 'What is the purpose of React hooks?',
      options: [
        'To create class components',
        'To manage state and side effects in functional components',
        'To replace Redux',
        'To improve performance',
      ],
      correctAnswer:
        'To manage state and side effects in functional components',
      explanation:
        'React hooks allow functional components to use state and other React features that were previously only available in class components.',
      section: 'react',
      difficulty: 'Medium',
    },
  ];

  useEffect(() => {
    if (planId) {
      initializeSession();
    }
  }, [planId]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (!isPaused && session) {
      interval = setInterval(() => {
        setSessionTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPaused, session]);

  const initializeSession = () => {
    const mockSession: GuidedSession = {
      planId: planId || 'weekend-prep',
      day: 1,
      totalQuestions: 20,
      completedQuestions: 0,
      currentSection: 'html-css',
      sections: [
        { id: 'html-css', name: 'HTML & CSS', questions: 6, completed: 0 },
        { id: 'javascript', name: 'JavaScript', questions: 8, completed: 0 },
        { id: 'react', name: 'React', questions: 6, completed: 0 },
      ],
      startTime: new Date(),
      estimatedTime: 60,
    };

    setSession(mockSession);
    setCurrentQuestion(mockQuestions[0]);
  };

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleSubmitAnswer = () => {
    if (!currentQuestion || !selectedAnswer) return;

    const correct = selectedAnswer === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);

    // Update session progress
    if (session) {
      const updatedSession = { ...session };
      updatedSession.completedQuestions += 1;

      // Update section progress
      const sectionIndex = updatedSession.sections.findIndex(
        s => s.id === currentQuestion.section
      );
      if (sectionIndex !== -1) {
        updatedSession.sections[sectionIndex].completed += 1;
      }

      setSession(updatedSession);
    }
  };

  const handleNextQuestion = () => {
    if (questionIndex < mockQuestions.length - 1) {
      setQuestionIndex(questionIndex + 1);
      setCurrentQuestion(mockQuestions[questionIndex + 1]);
      setSelectedAnswer('');
      setShowResult(false);
    } else {
      // Session completed
      handleCompleteSession();
    }
  };

  const handleCompleteSession = () => {
    // Save progress to localStorage
    if (session) {
      const progress = {
        planId: session.planId,
        day: session.day,
        completedQuestions: session.completedQuestions,
        totalQuestions: session.totalQuestions,
        timeSpent: sessionTime,
        completedAt: new Date().toISOString(),
      };

      localStorage.setItem('guided-session-progress', JSON.stringify(progress));
    }

    // Redirect to completion page or dashboard
    router.push('/guided-learning?completed=true');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgressPercentage = () => {
    if (!session) return 0;
    return (session.completedQuestions / session.totalQuestions) * 100;
  };

  if (!session || !currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">
            Loading guided session...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 dark:border-gray-700/20 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Guided Learning Session
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Day {session.day} - {session.currentSection}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsPaused(!isPaused)}
                className="p-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg transition-colors"
              >
                {isPaused ? (
                  <Play className="w-5 h-5" />
                ) : (
                  <Pause className="w-5 h-5" />
                )}
              </button>
              <div className="text-right">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Time
                </div>
                <div className="font-semibold text-gray-900 dark:text-white">
                  {formatTime(sessionTime)}
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
              <span>Progress</span>
              <span>
                {session.completedQuestions} / {session.totalQuestions}
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${getProgressPercentage()}%` }}
              />
            </div>
          </div>

          {/* Section Progress */}
          <div className="grid grid-cols-3 gap-4">
            {session.sections.map(section => (
              <div
                key={section.id}
                className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                  {section.name}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  {section.completed} / {section.questions}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/20 dark:border-gray-700/20 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Question {questionIndex + 1} of {mockQuestions.length}
                </div>
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                  {currentQuestion.section} • {currentQuestion.difficulty}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Estimated
              </div>
              <div className="font-semibold text-gray-900 dark:text-white">
                {session.estimatedTime} min
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              {currentQuestion.question}
            </h2>

            {currentQuestion.options && (
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(option)}
                    disabled={showResult}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                      selectedAnswer === option
                        ? showResult
                          ? isCorrect
                            ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                            : 'border-red-500 bg-red-50 dark:bg-red-900/20'
                          : 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          selectedAnswer === option
                            ? showResult
                              ? isCorrect
                                ? 'border-green-500 bg-green-500'
                                : 'border-red-500 bg-red-500'
                              : 'border-blue-500 bg-blue-500'
                            : 'border-gray-300 dark:border-gray-600'
                        }`}
                      >
                        {selectedAnswer === option && (
                          <CheckCircle className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <span className="text-gray-900 dark:text-white">
                        {option}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Result */}
          {showResult && (
            <div
              className={`p-6 rounded-lg mb-6 ${
                isCorrect
                  ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                  : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
              }`}
            >
              <div className="flex items-center space-x-2 mb-3">
                {isCorrect ? (
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                ) : (
                  <div className="w-5 h-5 text-red-600 dark:text-red-400">
                    ✗
                  </div>
                )}
                <span
                  className={`font-semibold ${
                    isCorrect
                      ? 'text-green-800 dark:text-green-200'
                      : 'text-red-800 dark:text-red-200'
                  }`}
                >
                  {isCorrect ? 'Correct!' : 'Incorrect'}
                </span>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                {currentQuestion.explanation}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-between">
            <button
              onClick={() => router.push('/guided-learning')}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Plan</span>
            </button>

            <div className="flex space-x-3">
              {!showResult ? (
                <button
                  onClick={handleSubmitAnswer}
                  disabled={!selectedAnswer}
                  className="px-6 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors"
                >
                  Submit Answer
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg font-semibold transition-all duration-200"
                >
                  <span>
                    {questionIndex < mockQuestions.length - 1
                      ? 'Next Question'
                      : 'Complete Session'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
