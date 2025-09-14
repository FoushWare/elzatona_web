'use client';

import { useState } from 'react';
import {
  getJavaScriptQuestions,
  // getJavaScriptQuestionById,
} from '@/lib/javascriptQuestions';
// import JavaScriptQuestionCard from "@/components/JavaScriptQuestionCard";

export default function JavaScriptQuestionsPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);

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

  const handleRandomQuestion = () => {
    const randomIndex = Math.floor(Math.random() * questions.length);
    setCurrentQuestionIndex(randomIndex);
    setSelectedAnswer('');
    setShowAnswer(false);
  };

  const progress = (currentQuestionIndex / questions.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 p-3 rounded-lg">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                JavaScript Interview Questions
              </h1>
              <p className="text-muted-foreground">
                Test your JavaScript knowledge with 155 comprehensive questions
              </p>
            </div>
          </div>

          {/* Progress and Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {currentQuestionIndex + 1}
              </div>
              <div className="text-sm text-muted-foreground">
                Current Question
              </div>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {score}
              </div>
              <div className="text-sm text-muted-foreground">
                Correct Answers
              </div>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {totalAnswered}
              </div>
              <div className="text-sm text-muted-foreground">
                Questions Answered
              </div>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {totalAnswered > 0
                  ? Math.round((score / totalAnswered) * 100)
                  : 0}
                %
              </div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="bg-muted rounded-full h-2 mb-6">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="mb-8">
          {/* <JavaScriptQuestionCard
            question={currentQuestion}
            showAnswer={showAnswer}
            onAnswerSelect={handleAnswerSelect}
            selectedAnswer={selectedAnswer}
            isCorrect={selectedAnswer === currentQuestion.answer}
          /> */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-card-foreground mb-4">
              {currentQuestion.question}
            </h3>
            {currentQuestion.code && (
              <div className="bg-muted border border-border rounded-lg p-4 mb-4">
                <pre className="text-sm text-card-foreground overflow-x-auto">
                  <code>{currentQuestion.code}</code>
                </pre>
              </div>
            )}
            <div className="space-y-2">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() =>
                    handleAnswerSelect(String.fromCharCode(65 + index))
                  }
                  className={`w-full text-left p-3 rounded-lg border transition-colors ${
                    selectedAnswer === String.fromCharCode(65 + index)
                      ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
                      : 'bg-card border-border hover:bg-muted'
                  }`}
                >
                  {String.fromCharCode(65 + index)}. {option}
                </button>
              ))}
            </div>
            {showAnswer && (
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">
                  {selectedAnswer === currentQuestion.answer
                    ? 'Correct!'
                    : 'Incorrect'}
                </p>
                <p className="text-sm text-card-foreground">
                  {currentQuestion.explanation}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
              className="px-4 py-2 bg-muted hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
            >
              Previous
            </button>
            <button
              onClick={handleRandomQuestion}
              className="px-4 py-2 bg-muted hover:bg-accent rounded-lg transition-colors"
            >
              Random Question
            </button>
            <button
              onClick={handleNextQuestion}
              disabled={currentQuestionIndex === questions.length - 1}
              className="px-4 py-2 bg-muted hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
            >
              Next
            </button>
          </div>

          <div className="flex items-center space-x-2">
            {!showAnswer && selectedAnswer && (
              <button
                onClick={handleSubmitAnswer}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Submit Answer
              </button>
            )}
            {showAnswer && (
              <button
                onClick={handleNextQuestion}
                disabled={currentQuestionIndex === questions.length - 1}
                className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
              >
                {currentQuestionIndex === questions.length - 1
                  ? 'Finish'
                  : 'Next Question'}
              </button>
            )}
          </div>
        </div>

        {/* Question Navigation */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Question Navigation
          </h3>
          <div className="grid grid-cols-5 sm:grid-cols-10 md:grid-cols-15 lg:grid-cols-20 gap-2">
            {questions.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentQuestionIndex(index);
                  setSelectedAnswer('');
                  setShowAnswer(false);
                }}
                className={`p-2 text-sm rounded-lg border transition-colors ${
                  index === currentQuestionIndex
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-card border-border hover:bg-muted text-card-foreground'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
