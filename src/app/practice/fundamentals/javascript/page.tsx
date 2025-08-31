'use client';

import { useState } from 'react';
import {
  getJavaScriptQuestions,
  getJavaScriptQuestionById,
} from '@/lib/javascriptQuestions';
import JavaScriptQuestionCard from '@/components/JavaScriptQuestionCard';

export default function JSQuestionsPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [showStatistics, setShowStatistics] = useState(false);

  const questions = getJavaScriptQuestions();
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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            JavaScript Fundamentals
          </h1>
          <p className="text-muted-foreground text-lg">
            Test your JavaScript knowledge with 155 comprehensive interview
            questions covering fundamentals to advanced concepts
          </p>

          {/* Mobile Toggle Button */}
          <div className="flex justify-center mt-6 md:hidden">
            <button
              onClick={() => setShowStatistics(!showStatistics)}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              {showStatistics ? 'Hide Statistics' : 'Show Statistics'}
              <span className="ml-2">📊</span>
            </button>
          </div>
        </div>

        {/* Progress and Stats */}
        <div
          className={`${showStatistics ? 'block' : 'hidden md:grid'} grid-cols-1 md:grid-cols-4 gap-4 mb-8`}
        >
          <div className="bg-card p-4 rounded-lg border border-border">
            <h3 className="text-sm font-medium text-muted-foreground">
              Progress
            </h3>
            <p className="text-2xl font-bold text-card-foreground">
              {currentQuestionIndex + 1} / {questions.length}
            </p>
          </div>
          <div className="bg-card p-4 rounded-lg border border-border">
            <h3 className="text-sm font-medium text-muted-foreground">
              Accuracy
            </h3>
            <p className="text-2xl font-bold text-card-foreground">
              {accuracy}%
            </p>
          </div>
          <div className="bg-card p-4 rounded-lg border border-border">
            <h3 className="text-sm font-medium text-muted-foreground">Score</h3>
            <p className="text-2xl font-bold text-card-foreground">
              {score} / {totalAnswered}
            </p>
          </div>
          <div className="bg-card p-4 rounded-lg border border-border">
            <h3 className="text-sm font-medium text-muted-foreground">
              Remaining
            </h3>
            <p className="text-2xl font-bold text-card-foreground">
              {questions.length - totalAnswered}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="mb-8">
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

        {/* Navigation Controls */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="flex gap-2">
            <button
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
              className="px-4 py-2 bg-muted hover:bg-accent text-muted-foreground hover:text-foreground rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={handleNextQuestion}
              disabled={currentQuestionIndex === questions.length - 1}
              className="px-4 py-2 bg-muted hover:bg-accent text-muted-foreground hover:text-foreground rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>

          <div className="flex gap-2">
            {!showAnswer && selectedAnswer && (
              <button
                onClick={handleSubmitAnswer}
                className="px-6 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors"
              >
                Submit Answer
              </button>
            )}
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-lg transition-colors"
            >
              Reset Quiz
            </button>
          </div>
        </div>

        {/* Compact Question Navigation */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">
              Question Navigation
            </h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>
                Question {currentQuestionIndex + 1} of {questions.length}
              </span>
              <span>•</span>
              <span>
                Group {Math.floor(currentQuestionIndex / 20) + 1} of{' '}
                {Math.ceil(questions.length / 20)}
              </span>
            </div>
          </div>

          {/* Compact Navigation Controls */}
          <div className="bg-card border border-border rounded-lg p-4">
            {/* Quick Navigation Bar */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const newIndex = Math.max(0, currentQuestionIndex - 20);
                    setCurrentQuestionIndex(newIndex);
                    setSelectedAnswer('');
                    setShowAnswer(false);
                  }}
                  disabled={currentQuestionIndex < 20}
                  className="px-3 py-1 text-xs bg-muted hover:bg-accent text-muted-foreground hover:text-foreground rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
                  className="px-3 py-1 text-xs bg-muted hover:bg-accent text-muted-foreground hover:text-foreground rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ← Previous
                </button>
              </div>

              <div className="flex items-center gap-2">
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
                  className="px-3 py-1 text-xs bg-muted hover:bg-accent text-muted-foreground hover:text-foreground rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
                  className="px-3 py-1 text-xs bg-muted hover:bg-accent text-muted-foreground hover:text-foreground rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next Group →
                </button>
              </div>
            </div>

            {/* Current Group Questions */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium text-foreground">
                  Current Group: Questions{' '}
                  {Math.floor(currentQuestionIndex / 20) * 20 + 1} -{' '}
                  {Math.min(
                    Math.floor(currentQuestionIndex / 20) * 20 + 20,
                    questions.length
                  )}
                </h4>
                <span className="text-xs text-muted-foreground">
                  {Math.min(
                    20,
                    questions.length -
                      Math.floor(currentQuestionIndex / 20) * 20
                  )}{' '}
                  questions
                </span>
              </div>
              <div className="grid grid-cols-10 gap-1">
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
                        className={`p-1 text-xs rounded border transition-colors ${
                          questionIndex === currentQuestionIndex
                            ? 'bg-primary text-primary-foreground border-primary'
                            : isAnswered
                              ? isCorrect
                                ? 'bg-green-500/20 text-green-700 border-green-500 dark:text-green-400 dark:border-green-400'
                                : 'bg-red-500/20 text-red-700 border-red-500 dark:text-red-400 dark:border-red-400'
                              : 'bg-card text-card-foreground border-border hover:bg-muted'
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
            <div className="border-t border-border pt-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium text-foreground">
                  All Groups
                </h4>
                <span className="text-xs text-muted-foreground">
                  Click to jump to any group
                </span>
              </div>
              <div className="grid grid-cols-8 gap-2">
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
                        className={`p-2 text-xs rounded border transition-colors ${
                          isCurrentGroup
                            ? 'bg-primary text-primary-foreground border-primary'
                            : 'bg-card text-card-foreground border-border hover:bg-muted'
                        }`}
                      >
                        <div className="font-medium">{groupIndex + 1}</div>
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
