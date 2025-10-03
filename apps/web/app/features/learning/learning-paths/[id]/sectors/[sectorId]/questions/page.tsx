'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  ArrowLeft,
  CheckCircle,
  Clock,
  BarChart2,
  RotateCcw,
} from 'lucide-react';
import { useSectorProgress } from '@/hooks/useSectorProgress';
import { LoadingTransition } from '@/components/LoadingTransition';

// Mock question data - in a real app, this would come from an API
const mockQuestions = [
  {
    id: '1',
    question: 'What is the difference between let and var in JavaScript?',
    options: [
      'let has block scope, var has function scope',
      'var has block scope, let has function scope',
      'They are identical',
      'let is only available in modern browsers',
    ],
    correctAnswer: 0,
    explanation:
      'let has block scope, meaning it is only accessible within the block it is declared in, while var has function scope.',
  },
  {
    id: '2',
    question: 'Which method is used to add an element to the end of an array?',
    options: ['push()', 'append()', 'add()', 'insert()'],
    correctAnswer: 0,
    explanation:
      'The push() method adds one or more elements to the end of an array and returns the new length.',
  },
  {
    id: '3',
    question: 'What does the === operator do in JavaScript?',
    options: [
      'Compares values and types',
      'Compares only values',
      'Assigns a value',
      'Checks if a variable exists',
    ],
    correctAnswer: 0,
    explanation:
      'The === operator performs strict equality comparison, checking both value and type.',
  },
];

export default function QuestionsPage() {
  const params = useParams();
  const router = useRouter();
  const pathId = params?.id as string;
  const sectorId = params?.sectorId as string;

  const { getSectorProgress, saveProgress } = useSectorProgress();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [startTime] = useState(Date.now());

  const currentQuestion = mockQuestions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === mockQuestions.length - 1;
  const progress = getSectorProgress(sectorId);

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;

    setShowResult(true);

    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      // Complete the sector
      const finalScore = Math.round(
        ((score + (selectedAnswer === currentQuestion.correctAnswer ? 1 : 0)) /
          mockQuestions.length) *
          100
      );
      const totalTimeSpent = Math.floor((Date.now() - startTime) / 1000);

      saveProgress({
        sectorId,
        pathId,
        score: finalScore,
        completedAt: new Date().toISOString(),
        timeSpent: totalTimeSpent,
        isCompleted: true,
      });

      setIsCompleted(true);
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setIsCompleted(false);
  };

  const handleBack = () => {
    router.push(`/learning-paths/${pathId}/sectors`);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (isCompleted) {
    const finalScore = Math.round((score / mockQuestions.length) * 100);

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-slate-50 dark:from-gray-900 dark:via-gray-800 dark:to-slate-900 py-4 sm:py-6 lg:py-8">
        <main className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={handleBack}
              className="inline-flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Sectors</span>
            </button>
          </div>

          {/* Completion Screen */}
          <div className="text-center">
            <div className="w-24 h-24 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
            </div>

            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Sector Completed!
            </h1>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div
                    className={`text-4xl font-bold mb-2 ${getScoreColor(finalScore)}`}
                  >
                    {finalScore}%
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 font-medium">
                    Final Score
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                    {score}/{mockQuestions.length}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 font-medium">
                    Correct Answers
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                    {Math.floor(timeSpent / 60)}:
                    {(timeSpent % 60).toString().padStart(2, '0')}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 font-medium">
                    Time Spent
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleBack}
                className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Sectors</span>
              </button>
              <button
                onClick={handleRestart}
                className="px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2"
              >
                <RotateCcw className="w-5 h-5" />
                <span>Try Again</span>
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-slate-50 dark:from-gray-900 dark:via-gray-800 dark:to-slate-900 py-4 sm:py-6 lg:py-8">
      <main className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={handleBack}
            className="inline-flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Sectors</span>
          </button>

          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Question {currentQuestionIndex + 1} of {mockQuestions.length}
            </h1>
            <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>
                  {Math.floor(timeSpent / 60)}:
                  {(timeSpent % 60).toString().padStart(2, '0')}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <BarChart2 className="w-4 h-4" />
                <span>
                  Score: {score}/{currentQuestionIndex}
                </span>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-8">
            <div
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${((currentQuestionIndex + 1) / mockQuestions.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            {currentQuestion.question}
          </h2>

          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => {
              let buttonClass =
                'w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ';

              if (showResult) {
                if (index === currentQuestion.correctAnswer) {
                  buttonClass +=
                    'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300';
                } else if (
                  index === selectedAnswer &&
                  index !== currentQuestion.correctAnswer
                ) {
                  buttonClass +=
                    'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300';
                } else {
                  buttonClass +=
                    'border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300';
                }
              } else {
                if (selectedAnswer === index) {
                  buttonClass +=
                    'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300';
                } else {
                  buttonClass +=
                    'border-gray-200 dark:border-gray-600 hover:border-indigo-300 dark:hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/10 text-gray-700 dark:text-gray-300';
                }
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={buttonClass}
                  disabled={showResult}
                >
                  <span className="font-medium">
                    {String.fromCharCode(65 + index)}.
                  </span>{' '}
                  {option}
                </button>
              );
            })}
          </div>

          {showResult && (
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                Explanation:
              </h3>
              <p className="text-blue-800 dark:text-blue-200">
                {currentQuestion.explanation}
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center">
          {!showResult ? (
            <button
              onClick={handleSubmitAnswer}
              disabled={selectedAnswer === null}
              className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
            >
              Submit Answer
            </button>
          ) : (
            <button
              onClick={handleNextQuestion}
              className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
            >
              {isLastQuestion ? 'Complete Sector' : 'Next Question'}
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
