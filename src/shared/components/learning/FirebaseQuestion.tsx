// v1.0 - Firebase-powered Question Component
'use client';

import { useState, useEffect } from 'react';
import { useQuestions } from '@/hooks/useQuestions';
import {
  CheckCircle,
  XCircle,
  Clock,
  RotateCcw,
  ArrowRight,
  ArrowLeft,
  Loader2,
  AlertCircle,
} from 'lucide-react';

interface FirebaseQuestionProps {
  questionId?: string;
  category?: string;
  difficulty?: string;
  onNext?: () => void;
  onComplete?: (result: QuestionResult) => void;
  showNavigation?: boolean;
  autoAdvance?: boolean;
}

interface QuestionResult {
  questionId: string;
  isCorrect: boolean;
  points: number;
  timeSpent: number;
  attempts: number;
}

export default function FirebaseQuestion({
  questionId,
  category,
  difficulty,
  onNext,
  onComplete,
  showNavigation = true,
  autoAdvance = false,
}: FirebaseQuestionProps) {
  const {
    currentQuestion,
    userAttempts,
    isLoading,
    error,
    loadQuestion,
    loadRandomQuestions,
    submitAnswer,
    loadUserAttempts,
  } = useQuestions();

  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [startTime] = useState(Date.now());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [questionResult, setQuestionResult] = useState<QuestionResult | null>(
    null
  );

  // Load question on mount or when questionId changes
  useEffect(() => {
    if (questionId) {
      loadQuestion(questionId);
      loadUserAttempts(questionId);
    } else if (category || difficulty) {
      loadRandomQuestions(1, { category, difficulty });
    }
  }, [
    questionId,
    category,
    difficulty,
    loadQuestion,
    loadRandomQuestions,
    loadUserAttempts,
  ]);

  // Get previous attempts for this question
  const previousAttempts = userAttempts.filter(
    attempt => attempt.questionId === currentQuestion?.id
  );

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult || isSubmitting) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmit = async () => {
    if (selectedAnswer === null || !currentQuestion) return;

    setIsSubmitting(true);
    try {
      const timeSpent = Math.floor((Date.now() - startTime) / 1000);
      const correctAnswerIndex = currentQuestion.options?.findIndex(
        option => option.isCorrect
      );
      const isCorrect = selectedAnswer === correctAnswerIndex;

      await submitAnswer(
        currentQuestion.id,
        selectedAnswer,
        timeSpent,
        attempts + 1
      );

      const points = isCorrect
        ? Math.max(1, (currentQuestion.points || 1) - attempts * 2)
        : 0;

      const result: QuestionResult = {
        questionId: currentQuestion.id,
        isCorrect,
        points,
        timeSpent,
        attempts: attempts + 1,
      };

      setQuestionResult(result);
      setShowResult(true);
      setAttempts(prev => prev + 1);

      if (onComplete) {
        onComplete(result);
      }

      if (autoAdvance && onNext) {
        setTimeout(() => {
          onNext();
        }, 2000);
      }
    } catch (error) {
      console.error('Error submitting answer:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRetry = () => {
    setSelectedAnswer(null);
    setShowResult(false);
    setQuestionResult(null);
  };

  const handleNext = () => {
    if (onNext) {
      onNext();
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'hard':
        return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  const getPointsForQuestion = () => {
    if (!questionResult) return 0;
    return questionResult.points;
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mr-3" />
          <span className="text-gray-600 dark:text-gray-400">
            Loading question...
          </span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="text-center py-12">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Error Loading Question
          </h3>
          <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="text-center py-12">
          <div className="text-4xl mb-4">❓</div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            No Question Available
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            No questions found for the specified criteria.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
      {/* Question Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(currentQuestion.difficulty)}`}
          >
            {currentQuestion.difficulty.toUpperCase()}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {currentQuestion.category}
          </span>
          {currentQuestion.tags && currentQuestion.tags.length > 0 && (
            <div className="flex items-center space-x-1">
              {currentQuestion.tags.slice(0, 2).map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            <span>Attempt {attempts + 1}</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium">{currentQuestion.points} pts</span>
          </div>
        </div>
      </div>

      {/* Previous Attempts */}
      {previousAttempts.length > 0 && (
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
          <h4 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
            Previous Attempts ({previousAttempts.length})
          </h4>
          <div className="space-y-1">
            {previousAttempts.slice(0, 3).map((attempt, index) => (
              <div
                key={index}
                className="flex items-center justify-between text-xs"
              >
                <span className="text-blue-700 dark:text-blue-300">
                  Attempt {index + 1}:{' '}
                  {attempt.isCorrect ? 'Correct' : 'Incorrect'}
                </span>
                <span className="text-blue-600 dark:text-blue-400">
                  {attempt.timeSpent}s
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Question */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          {currentQuestion.content}
        </h2>
      </div>

      {/* Answer Options */}
      <div className="space-y-3 mb-8">
        {(currentQuestion.options || []).map((option, index) => {
          const isSelected = selectedAnswer === index;
          const correctAnswerIndex = currentQuestion.options?.findIndex(
            opt => opt.isCorrect
          );
          const isCorrect = index === correctAnswerIndex;
          const isWrong = showResult && isSelected && !isCorrect;

          let optionClasses =
            'p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ';

          if (showResult) {
            if (isCorrect) {
              optionClasses +=
                'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300';
            } else if (isWrong) {
              optionClasses +=
                'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300';
            } else {
              optionClasses +=
                'border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400';
            }
          } else {
            optionClasses += isSelected
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
              : 'border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/10';
          }

          return (
            <div
              key={index}
              className={optionClasses}
              onClick={() => handleAnswerSelect(index)}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{option.text}</span>
                {showResult && isCorrect && (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                )}
                {showResult && isWrong && (
                  <XCircle className="w-5 h-5 text-red-500" />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Result Section */}
      {showResult && questionResult && (
        <div className="mb-8 p-6 rounded-lg border border-gray-200 dark:border-gray-600">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              {questionResult.isCorrect ? (
                <>
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <span className="text-lg font-semibold text-green-600 dark:text-green-400">
                    Correct!
                  </span>
                </>
              ) : (
                <>
                  <XCircle className="w-6 h-6 text-red-500" />
                  <span className="text-lg font-semibold text-red-600 dark:text-red-400">
                    Incorrect
                  </span>
                </>
              )}
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Points earned
              </div>
              <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
                +{getPointsForQuestion()}
              </div>
            </div>
          </div>

          <div className="text-gray-700 dark:text-gray-300">
            <strong>Explanation:</strong> {currentQuestion.explanation}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {!showResult && (
            <button
              onClick={handleSubmit}
              disabled={selectedAnswer === null || isSubmitting}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Answer'}
            </button>
          )}

          {showResult && !questionResult?.isCorrect && (
            <button
              onClick={handleRetry}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Try Again</span>
            </button>
          )}
        </div>

        {showNavigation && showResult && (
          <button
            onClick={handleNext}
            className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            <span>Next Question</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Submission Indicator */}
      {isSubmitting && (
        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400">
            <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm">Saving your answer...</span>
          </div>
        </div>
      )}
    </div>
  );
}
