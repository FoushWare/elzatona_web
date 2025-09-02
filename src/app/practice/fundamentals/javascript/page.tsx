'use client';

import { useState } from 'react';
import { javascriptQuestions } from '@/lib/javascriptQuestions';
import JavaScriptQuestionCard from '@/components/JavaScriptQuestionCard';

export default function JSQuestionsPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [showStatistics, setShowStatistics] = useState(false);

  const questions = javascriptQuestions;
  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSelect = (answer: string) => {
    if (showAnswer) return;
    setSelectedAnswer(answer);
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswer) return;

    const isCorrect = selectedAnswer === currentQuestion.answer;
    if (isCorrect) {
      setScore(score + 1);
    }
    setTotalAnswered(totalAnswered + 1);
    setShowAnswer(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer('');
      setShowAnswer(false);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedAnswer('');
      setShowAnswer(false);
    }
  };

  const handleReset = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer('');
    setShowAnswer(false);
    setScore(0);
    setTotalAnswered(0);
  };

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const accuracy =
    totalAnswered > 0 ? ((score / totalAnswered) * 100).toFixed(1) : '0';

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 dark:from-gray-900 dark:via-yellow-900/20 dark:to-orange-900/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header - Enhanced Design */}
        <div className="mb-12 text-center">
          <div className="w-32 h-32 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl animate-pulse border-4 border-white/20">
            <span className="text-6xl">⚡</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 bg-clip-text text-transparent mb-6 tracking-tight drop-shadow-lg">
            JavaScript Fundamentals
          </h1>
          <p className="text-2xl text-gray-700 dark:text-gray-200 max-w-4xl mx-auto mb-10 leading-relaxed font-medium">
            Test your JavaScript knowledge with 155 comprehensive interview
            questions covering fundamentals to advanced concepts
          </p>

          {/* Mobile Toggle Button - Enhanced Design */}
          <div className="flex justify-center mt-8 md:hidden">
            <button
              onClick={() => setShowStatistics(!showStatistics)}
              className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 hover:from-yellow-500 hover:via-orange-600 hover:to-red-600 text-white font-black text-lg rounded-2xl transition-all duration-300 transform hover:scale-110 shadow-xl hover:shadow-2xl border-2 border-transparent hover:border-yellow-300"
            >
              {showStatistics ? '🙈 Hide' : '📊 Show'} Statistics
              <span className="ml-3 text-2xl animate-pulse">✨</span>
            </button>
          </div>
        </div>

        {/* Progress and Stats - Enhanced Design */}
        <div
          className={`${showStatistics ? 'block' : 'hidden md:grid'} grid-cols-1 md:grid-cols-4 gap-8 mb-10`}
        >
          <div className="bg-gradient-to-br from-yellow-50 to-orange-100 dark:from-yellow-900/30 dark:to-orange-800/30 p-8 rounded-3xl shadow-xl border-4 border-yellow-300 dark:border-yellow-700 hover:shadow-2xl transition-all duration-300 hover:scale-110 transform">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-black text-yellow-800 dark:text-yellow-200">
                Progress
              </h3>
              <span className="text-4xl animate-bounce">📈</span>
            </div>
            <p className="text-4xl font-black bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
              {currentQuestionIndex + 1} / {questions.length}
            </p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/30 dark:to-emerald-800/30 p-8 rounded-3xl shadow-xl border-4 border-green-300 dark:border-green-700 hover:shadow-2xl transition-all duration-300 hover:scale-110 transform">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-black text-green-800 dark:text-green-200">
                Accuracy
              </h3>
              <span className="text-4xl animate-pulse">🎯</span>
            </div>
            <p className="text-4xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              {accuracy}%
            </p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-800/30 p-8 rounded-3xl shadow-xl border-4 border-blue-300 dark:border-blue-700 hover:shadow-2xl transition-all duration-300 hover:scale-110 transform">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-black text-blue-800 dark:text-blue-200">
                Score
              </h3>
              <span className="text-4xl animate-spin">🏆</span>
            </div>
            <p className="text-4xl font-black bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              {score} / {totalAnswered}
            </p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900/30 dark:to-pink-800/30 p-8 rounded-3xl shadow-xl border-4 border-purple-300 dark:border-purple-700 hover:shadow-2xl transition-all duration-300 hover:scale-110 transform">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-black text-purple-800 dark:text-purple-200">
                Remaining
              </h3>
              <span className="text-4xl animate-ping">⏳</span>
            </div>
            <p className="text-4xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {questions.length - totalAnswered}
            </p>
          </div>
        </div>

        {/* Progress Bar - Enhanced Design */}
        <div className="mb-10">
          <div className="w-full bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-2xl h-6 shadow-inner border-2 border-gray-300 dark:border-gray-600 overflow-hidden">
            <div
              className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 h-full rounded-xl transition-all duration-700 shadow-lg relative overflow-hidden"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
            </div>
          </div>
          <div className="flex justify-between mt-4 text-base font-bold text-gray-700 dark:text-gray-300">
            <span className="px-4 py-2 bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 text-yellow-800 dark:text-yellow-200 rounded-xl border-2 border-yellow-300 dark:border-yellow-700">
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
            <span className="px-4 py-2 bg-gradient-to-r from-red-100 to-pink-100 dark:from-red-900/30 dark:to-pink-900/30 text-red-800 dark:text-red-200 rounded-xl border-2 border-red-300 dark:border-red-700">
              {Math.round(progress)}% Complete
            </span>
          </div>
        </div>

        {/* Question Card */}
        <div className="mb-8 relative">
          {/* Floating Progress Indicator */}
          <div className="absolute -top-4 -right-4 z-10">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-2xl font-black text-sm shadow-2xl border-2 border-white/20 backdrop-blur-sm">
              {Math.round(progress)}% Complete
            </div>
          </div>

          <JavaScriptQuestionCard
            question={currentQuestion}
            showAnswer={showAnswer}
            onAnswerSelect={handleAnswerSelect}
            selectedAnswer={selectedAnswer}
            isCorrect={
              showAnswer ? selectedAnswer === currentQuestion.answer : undefined
            }
          />
        </div>

        {/* Motivational Section */}
        <div className="mb-10 text-center">
          <div className="bg-gradient-to-r from-yellow-100 via-orange-100 to-red-100 dark:from-yellow-900/30 dark:via-orange-900/30 dark:to-red-900/30 p-8 rounded-3xl border-4 border-yellow-300 dark:border-yellow-600 shadow-xl">
            <h3 className="text-2xl font-black text-yellow-800 dark:text-yellow-200 mb-4">
              🚀 Keep Going! You&apos;re Doing Great!
            </h3>
            <p className="text-lg text-yellow-700 dark:text-yellow-300 font-semibold">
              Every question you answer brings you closer to mastering
              JavaScript fundamentals!
            </p>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-8">
          <div className="flex gap-3">
            <button
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
              className="px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-bold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              ← Previous
            </button>
            <button
              onClick={handleNextQuestion}
              disabled={currentQuestionIndex === questions.length - 1}
              className="px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-bold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Next →
            </button>
          </div>

          <div className="flex gap-3">
            {!showAnswer && selectedAnswer && (
              <button
                onClick={handleSubmitAnswer}
                className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Submit Answer
              </button>
            )}
            <button
              onClick={handleReset}
              className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-bold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Reset Quiz
            </button>
          </div>
        </div>

        {/* Compact Question Navigation */}
        <div className="mt-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border-2 border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                Question Navigation
              </h3>
              <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 rounded-full font-medium">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </span>
                <span>•</span>
                <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-200 rounded-full font-medium">
                  Group {Math.floor(currentQuestionIndex / 20) + 1} of{' '}
                  {Math.ceil(questions.length / 20)}
                </span>
              </div>
            </div>

            {/* Quick Navigation Bar */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    const newIndex = Math.max(0, currentQuestionIndex - 20);
                    setCurrentQuestionIndex(newIndex);
                    setSelectedAnswer('');
                    setShowAnswer(false);
                  }}
                  disabled={currentQuestionIndex < 20}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white font-bold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  ← Previous Group
                </button>
                <button
                  onClick={() => {
                    const newIndex = Math.max(0, currentQuestionIndex - 1);
                    setCurrentQuestionIndex(newIndex);
                    setSelectedAnswer('');
                    setShowAnswer(false);
                  }}
                  disabled={currentQuestionIndex === 0}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white font-bold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  ← Previous
                </button>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    const newIndex = Math.min(
                      questions.length - 1,
                      currentQuestionIndex + 1
                    );
                    setCurrentQuestionIndex(newIndex);
                    setSelectedAnswer('');
                    setShowAnswer(false);
                  }}
                  disabled={currentQuestionIndex === questions.length - 1}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white font-bold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  Next →
                </button>
                <button
                  onClick={() => {
                    const newIndex = Math.min(
                      questions.length - 1,
                      currentQuestionIndex + 20
                    );
                    setCurrentQuestionIndex(newIndex);
                    setSelectedAnswer('');
                    setShowAnswer(false);
                  }}
                  disabled={currentQuestionIndex >= questions.length - 20}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white font-bold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  Next Group →
                </button>
              </div>
            </div>

            {/* Current Group Questions */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-bold text-gray-700 dark:text-gray-300">
                  Current Group: Questions{' '}
                  {Math.floor(currentQuestionIndex / 20) * 20 + 1} -{' '}
                  {Math.min(
                    Math.floor(currentQuestionIndex / 20) * 20 + 20,
                    questions.length
                  )}
                </h4>
                <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-200 rounded-full text-sm font-medium">
                  {Math.min(
                    20,
                    questions.length -
                      Math.floor(currentQuestionIndex / 20) * 20
                  )}{' '}
                  questions
                </span>
              </div>
              <div className="grid grid-cols-10 gap-2">
                {Array.from(
                  {
                    length: Math.min(
                      20,
                      questions.length -
                        Math.floor(currentQuestionIndex / 20) * 20
                    ),
                  },
                  (_, index) => {
                    const questionIndex =
                      Math.floor(currentQuestionIndex / 20) * 20 + index;
                    const isAnswered = questionIndex < totalAnswered;
                    const isCorrect = questionIndex < score;

                    return (
                      <button
                        key={questionIndex}
                        onClick={() => {
                          setCurrentQuestionIndex(questionIndex);
                          setSelectedAnswer('');
                          setShowAnswer(false);
                        }}
                        className={`p-2 text-sm font-bold rounded-lg border-2 transition-all duration-200 transform hover:scale-110 ${
                          questionIndex === currentQuestionIndex
                            ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-yellow-500 shadow-lg'
                            : isAnswered
                              ? isCorrect
                                ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white border-green-500 shadow-md'
                                : 'bg-gradient-to-r from-red-400 to-pink-500 text-white border-red-500 shadow-md'
                              : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 shadow-sm'
                        }`}
                      >
                        {questionIndex + 1}
                      </button>
                    );
                  }
                )}
              </div>
            </div>

            {/* Group Navigation */}
            <div className="border-t-2 border-gray-200 dark:border-gray-700 pt-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-bold text-gray-700 dark:text-gray-300">
                  All Groups
                </h4>
                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full text-sm font-medium">
                  Click to jump to any group
                </span>
              </div>
              <div className="grid grid-cols-8 gap-3">
                {Array.from(
                  { length: Math.ceil(questions.length / 20) },
                  (_, groupIndex) => {
                    const startIndex = groupIndex * 20;
                    const endIndex = Math.min(
                      startIndex + 20,
                      questions.length
                    );
                    const isCurrentGroup =
                      Math.floor(currentQuestionIndex / 20) === groupIndex;

                    return (
                      <button
                        key={groupIndex}
                        onClick={() => {
                          setCurrentQuestionIndex(startIndex);
                          setSelectedAnswer('');
                          setShowAnswer(false);
                        }}
                        className={`p-3 rounded-xl border-2 transition-all duration-200 transform hover:scale-105 ${
                          isCurrentGroup
                            ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-yellow-500 shadow-lg'
                            : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 shadow-md'
                        }`}
                      >
                        <div className="font-bold text-lg">
                          {groupIndex + 1}
                        </div>
                        <div className="text-xs opacity-75">
                          {startIndex + 1}-{endIndex}
                        </div>
                      </button>
                    );
                  }
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
