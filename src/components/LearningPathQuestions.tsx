'use client';

import { useState } from 'react';
import {
  generalFrontendQuestions,
  javascriptQuestions,
  reactQuestions,
  cssQuestions,
} from '@/lib/internalResources';
import { greatFrontendQuestions } from '@/lib/greatfrontendQuestions';
import EnhancedTTS from '@/components/EnhancedTTS';

interface LearningPathQuestionsProps {
  category: string;
  title: string;
  description: string;
  onBack?: () => void;
}

export default function LearningPathQuestions({
  category,
  title,
  description,
  onBack,
}: LearningPathQuestionsProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [showStatistics, setShowStatistics] = useState(false);

  // Get questions based on category
  const getQuestionsByCategory = (): any[] => {
    switch (category) {
      case 'javascript':
        return javascriptQuestions;
      case 'react':
        return reactQuestions;
      case 'css':
        return cssQuestions;
      case 'html':
        return generalFrontendQuestions.filter(q => q.category === 'html');
      case 'git':
        return generalFrontendQuestions.filter(q => q.category === 'git');
      case 'websockets':
        return generalFrontendQuestions.filter(q =>
          q.tags.includes('websockets')
        );
      case 'general':
        return generalFrontendQuestions;
      default:
        return generalFrontendQuestions;
    }
  };

  const questions = getQuestionsByCategory();
  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSelect = (answer: string) => {
    if (selectedAnswer) return; // Prevent changing answer after selection
    setSelectedAnswer(answer);
    setTotalAnswered(prev => prev + 1);

    // Handle different question types
    if ('correctAnswer' in currentQuestion) {
      // MultipleChoiceQuestion type
      if (answer === currentQuestion.correctAnswer.toString()) {
        setScore(prev => prev + 1);
      }
    } else {
      // JavaScriptQuestion or ReactQuestion type
      if (answer === currentQuestion.correctAnswer) {
        setScore(prev => prev + 1);
      }
    }
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

  const getOptionLabel = (index: number) => String.fromCharCode(65 + index);

  const scorePercentage = totalAnswered > 0 ? (score / totalAnswered) * 100 : 0;

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            No Questions Available
          </h2>
          <p className="text-muted-foreground">
            This category doesn&apos;t have any questions yet.
          </p>
          {onBack && (
            <button
              onClick={onBack}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              ← Back to Learning Paths
            </button>
          )}
        </div>
      </div>
    );
  }

  // Get the correct answer for the current question
  const getCorrectAnswer = () => {
    if ('correctAnswer' in currentQuestion) {
      // MultipleChoiceQuestion type
      return currentQuestion.correctAnswer.toString();
    } else {
      // JavaScriptQuestion or ReactQuestion type
      return currentQuestion.answer;
    }
  };

  // Get difficulty for the current question
  const getDifficulty = () => {
    if ('difficulty' in currentQuestion) {
      return currentQuestion.difficulty;
    }
    return 'medium'; // Default difficulty for JS/React questions
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          {onBack && (
            <button
              onClick={onBack}
              className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mb-4 transition-colors"
            >
              ← Back to Learning Paths
            </button>
          )}
          <h1 className="text-4xl font-bold text-foreground mb-4">{title}</h1>
          <p className="text-muted-foreground text-lg">{description}</p>

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
              {scorePercentage.toFixed(1)}%
            </p>
          </div>
          <div className="bg-card p-4 rounded-lg border border-border">
            <h3 className="text-sm font-medium text-muted-foreground">Score</h3>
            <p className="text-2xl font-bold text-card-foreground">
              {score} / {totalAnswered}
            </p>
          </div>
          <div className="bg-card p-4 rounded-lg border border-border">
            <h3 className="text-sm font-medium text-muted-foreground">Group</h3>
            <p className="text-2xl font-bold text-card-foreground">
              {Math.floor(currentQuestionIndex / 20) + 1} /{' '}
              {Math.ceil(questions.length / 20)}
            </p>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-card border border-border rounded-lg p-6 space-y-6 mb-8">
          {/* Question Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full text-sm font-medium">
                Question {currentQuestion.id}
              </div>
              <div className="text-sm text-muted-foreground">
                {category.charAt(0).toUpperCase() + category.slice(1)} Interview
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-muted text-muted-foreground">
                {getDifficulty()}
              </span>
            </div>
          </div>

          {/* Question Text */}
          <div>
            <div className="flex items-start gap-3 mb-4">
              <h3 className="text-lg font-semibold text-card-foreground flex-1">
                {currentQuestion.question}
              </h3>
              <EnhancedTTS
                text={currentQuestion.question}
                className="flex-shrink-0 mt-1"
              />
            </div>
          </div>

          {/* Options */}
          <div className="space-y-3">
            <h4 className="font-medium text-card-foreground">
              Select the correct answer:
            </h4>
            <div className="space-y-2">
              {currentQuestion.options.map((option: any, index: number) => {
                const optionLabel = getOptionLabel(index);
                const isSelected = selectedAnswer === optionLabel;
                const isCorrect = optionLabel === getCorrectAnswer();
                const showResult = selectedAnswer && (isSelected || isCorrect);

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(optionLabel)}
                    disabled={selectedAnswer !== ''}
                    className={`w-full p-4 text-left rounded-lg border transition-all ${
                      isSelected
                        ? isCorrect
                          ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200'
                          : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200'
                        : showResult && isCorrect
                          ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200'
                          : 'bg-card border-border hover:border-border/60 text-card-foreground hover:bg-muted/50'
                    } ${selectedAnswer ? 'cursor-default' : 'cursor-pointer'}`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-medium ${
                          isSelected
                            ? isCorrect
                              ? 'bg-green-500 border-green-500 text-white'
                              : 'bg-red-500 border-red-500 text-white'
                            : showResult && isCorrect
                              ? 'bg-green-500 border-green-500 text-white'
                              : 'border-border'
                        }`}
                      >
                        {showResult ? (isCorrect ? '✓' : '✗') : optionLabel}
                      </div>
                      <span>{option}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Explanation */}
          {selectedAnswer && (
            <div className="mt-6 p-4 bg-muted rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-foreground">Explanation</h4>
                <button
                  onClick={() => setShowAnswer(!showAnswer)}
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
                >
                  {showAnswer ? 'Hide' : 'Show'}
                </button>
              </div>
              {showAnswer && (
                <p className="text-muted-foreground">
                  {currentQuestion.explanation}
                </p>
              )}
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between pt-4">
            <button
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
              className="px-4 py-2 border border-border text-muted-foreground rounded-md hover:bg-muted transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ← Previous
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  const newIndex = Math.max(0, currentQuestionIndex - 20);
                  setCurrentQuestionIndex(newIndex);
                  setSelectedAnswer('');
                  setShowAnswer(false);
                }}
                disabled={currentQuestionIndex < 20}
                className="px-3 py-1 text-sm bg-muted hover:bg-accent text-muted-foreground hover:text-foreground rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ← 20
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
                className="px-3 py-1 text-sm bg-muted hover:bg-accent text-muted-foreground hover:text-foreground rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                20 →
              </button>
            </div>

            <button
              onClick={handleNextQuestion}
              disabled={currentQuestionIndex === questions.length - 1}
              className="px-4 py-2 border border-border text-muted-foreground rounded-md hover:bg-muted transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next →
            </button>
          </div>
        </div>

        {/* Question Navigation */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">
              Question Navigation
            </h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>
                Group {Math.floor(currentQuestionIndex / 20) + 1} of{' '}
                {Math.ceil(questions.length / 20)}
              </span>
            </div>
          </div>

          {/* Current Group */}
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
                  questions.length - Math.floor(currentQuestionIndex / 20) * 20
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
                  const isCurrent = questionIndex === currentQuestionIndex;

                  return (
                    <button
                      key={questionIndex}
                      onClick={() => {
                        setCurrentQuestionIndex(questionIndex);
                        setSelectedAnswer('');
                        setShowAnswer(false);
                      }}
                      className={`p-2 text-xs rounded border transition-colors ${
                        isCurrent
                          ? 'bg-blue-600 text-white border-blue-600'
                          : isAnswered
                            ? isCorrect
                              ? 'bg-green-100 text-green-800 border-green-300'
                              : 'bg-red-100 text-red-800 border-red-300'
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

          <div className="border-t border-border my-4"></div>

          {/* All Groups */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-foreground">
                All Groups
              </h4>
              <span className="text-xs text-muted-foreground">
                Click to jump to any group
              </span>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {Array.from(
                { length: Math.ceil(questions.length / 20) },
                (_, groupIndex) => {
                  const startIndex = groupIndex * 20;
                  const endIndex = Math.min(startIndex + 20, questions.length);
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
                      className={`p-3 text-sm rounded border transition-colors ${
                        isCurrentGroup
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-card text-card-foreground border-border hover:bg-muted'
                      }`}
                    >
                      <div className="font-medium">Group {groupIndex + 1}</div>
                      <div className="text-xs opacity-80">
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
  );
}
