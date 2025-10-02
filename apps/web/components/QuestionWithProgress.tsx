// v1.0 - Example Question Component with Progress Tracking
'use client';

import { useState, useEffect } from 'react';
import { useProgressTracking } from '@/components/ProgressTracker';
import { CheckCircle, XCircle, Clock, RotateCcw } from 'lucide-react';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface QuestionWithProgressProps {
  question: Question;
  onNext?: () => void;
  onComplete?: () => void;
}

export default function QuestionWithProgress({
  question,
  onNext,
  onComplete,
}: QuestionWithProgressProps) {
  const { trackQuestion } = useProgressTracking();
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [startTime] = useState(Date.now());
  const [isTracking, setIsTracking] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmit = async () => {
    if (selectedAnswer === null) return;

    setAttempts(prev => prev + 1);
    setShowResult(true);

    // Calculate time spent
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    const isCorrect = selectedAnswer === question.correctAnswer;

    // Track progress
    setIsTracking(true);
    try {
      await trackQuestion(
        question.id,
        question.category,
        question.difficulty,
        isCorrect,
        attempts + 1,
        timeSpent
      );
    } catch (error) {
      console.error('Error tracking question progress:', error);
    } finally {
      setIsTracking(false);
    }

    // Call completion callback
    if (onComplete) {
      onComplete();
    }
  };

  const handleNext = () => {
    if (onNext) {
      onNext();
    }
  };

  const handleRetry = () => {
    setSelectedAnswer(null);
    setShowResult(false);
    setAttempts(0);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'text-green-600 bg-green-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'hard':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getPointsForQuestion = () => {
    if (!showResult) return 0;
    const isCorrect = selectedAnswer === question.correctAnswer;
    if (!isCorrect) return 0;

    const basePoints = {
      easy: 5,
      medium: 10,
      hard: 20,
    };

    const points = basePoints[question.difficulty] || 5;
    const attemptPenalty = Math.max(0, (attempts - 1) * 2);

    return Math.max(1, points - attemptPenalty);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
      {/* Question Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(question.difficulty)}`}
          >
            {question.difficulty.toUpperCase()}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {question.category}
          </span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <Clock className="w-4 h-4" />
          <span>Attempt {attempts + 1}</span>
        </div>
      </div>

      {/* Question */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          {question.question}
        </h2>
      </div>

      {/* Answer Options */}
      <div className="space-y-3 mb-8">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrect = index === question.correctAnswer;
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
                <span className="font-medium">{option}</span>
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
      {showResult && (
        <div className="mb-8 p-6 rounded-lg border border-gray-200 dark:border-gray-600">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              {selectedAnswer === question.correctAnswer ? (
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
            <strong>Explanation:</strong> {question.explanation}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {!showResult && (
            <button
              onClick={handleSubmit}
              disabled={selectedAnswer === null}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
            >
              Submit Answer
            </button>
          )}

          {showResult && selectedAnswer !== question.correctAnswer && (
            <button
              onClick={handleRetry}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Try Again</span>
            </button>
          )}
        </div>

        {showResult && (
          <button
            onClick={handleNext}
            disabled={isTracking}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {isTracking ? 'Saving Progress...' : 'Next Question'}
          </button>
        )}
      </div>

      {/* Progress Tracking Indicator */}
      {isTracking && (
        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400">
            <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm">Saving your progress...</span>
          </div>
        </div>
      )}
    </div>
  );
}
