'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  XCircle,
  Info,
} from 'lucide-react';
import { multipleChoiceQuestions } from '@/lib/multipleChoiceQuestions';
import { javascriptQuestions } from '@/lib/javascriptQuestions';
import { reactQuestions } from '@/lib/reactQuestions';
import { greatFrontendQuestions } from '@/lib/greatfrontendQuestions';
import EnhancedTTS from '@/components/EnhancedTTS';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export default function LearningPathQuestionsPage() {
  const params = useParams();
  const router = useRouter();
  const section = params.section as string;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(
    new Set()
  );
  const [currentGroup, setCurrentGroup] = useState(0);
  const [questionsPerGroup] = useState(20);

  // Get questions based on section
  const getQuestionsBySection = (): Question[] => {
    switch (section) {
      case 'javascript':
        return javascriptQuestions.map(q => ({
          id: q.id,
          question: q.question,
          options: q.options || [q.answer, 'Option B', 'Option C', 'Option D'],
          correctAnswer: 0, // First option is correct for JS questions
          explanation: q.explanation || 'This is a JavaScript question.',
          category: 'javascript',
          difficulty: q.difficulty || 'medium',
        }));
      case 'react':
        return reactQuestions.map(q => ({
          id: q.id,
          question: q.question,
          options: q.options || [q.answer, 'Option B', 'Option C', 'Option D'],
          correctAnswer: 0, // First option is correct for React questions
          explanation: q.explanation || 'This is a React question.',
          category: 'react',
          difficulty: q.difficulty || 'medium',
        }));
      case 'css':
        return multipleChoiceQuestions
          .filter(q => q.category === 'css')
          .map(q => ({
            id: q.id,
            question: q.question,
            options: q.options,
            correctAnswer: q.correctAnswer,
            explanation: q.explanation,
            category: q.category,
            difficulty: q.difficulty,
          }));
      case 'html':
        return multipleChoiceQuestions
          .filter(q => q.category === 'html')
          .map(q => ({
            id: q.id,
            question: q.question,
            options: q.options,
            correctAnswer: q.correctAnswer,
            explanation: q.explanation,
            category: q.category,
            difficulty: q.difficulty,
          }));
      case 'git':
        return multipleChoiceQuestions
          .filter(q => q.category === 'git')
          .map(q => ({
            id: q.id,
            question: q.question,
            options: q.options,
            correctAnswer: q.correctAnswer,
            explanation: q.explanation,
            category: q.category,
            difficulty: q.difficulty,
          }));
      default:
        return multipleChoiceQuestions;
    }
  };

  const questions = getQuestionsBySection();
  const totalGroups = Math.ceil(questions.length / questionsPerGroup);
  const currentQuestion = questions[currentQuestionIndex];

  // Update current group when question index changes
  useEffect(() => {
    setCurrentGroup(Math.floor(currentQuestionIndex / questionsPerGroup));
  }, [currentQuestionIndex, questionsPerGroup]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null) return; // Prevent changing answer after selection

    setSelectedAnswer(answerIndex);
    setTotalAnswered(prev => prev + 1);
    setAnsweredQuestions(prev => new Set(prev).add(currentQuestionIndex));

    if (answerIndex === currentQuestion.correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowAnswer(false);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedAnswer(null);
      setShowAnswer(false);
    }
  };

  const goToGroup = (groupIndex: number) => {
    const startIndex = groupIndex * questionsPerGroup;
    setCurrentQuestionIndex(startIndex);
    setSelectedAnswer(null);
    setShowAnswer(false);
    setCurrentGroup(groupIndex);
  };

  const goToNextGroup = () => {
    if (currentGroup < totalGroups - 1) {
      goToGroup(currentGroup + 1);
    }
  };

  const goToPreviousGroup = () => {
    if (currentGroup > 0) {
      goToGroup(currentGroup - 1);
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
            This section doesn&apos;t have any questions yet.
          </p>
          <Link
            href="/learning-paths"
            className="mt-4 inline-flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            ← Back to Learning Paths
          </Link>
        </div>
      </div>
    );
  }

  const getSectionTitle = () => {
    switch (section) {
      case 'javascript':
        return 'JavaScript Fundamentals';
      case 'react':
        return 'React Fundamentals';
      case 'css':
        return 'CSS Fundamentals';
      case 'html':
        return 'HTML Fundamentals';
      case 'git':
        return 'Git Fundamentals';
      default:
        return 'Learning Path Questions';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'hard':
        return 'text-red-600 bg-red-100 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/learning-paths"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Learning Paths
          </Link>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            {getSectionTitle()}
          </h1>
          <p className="text-muted-foreground text-lg">
            Practice questions to master {section} fundamentals
          </p>
        </div>

        {/* Progress and Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
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
              {currentGroup + 1} / {totalGroups}
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
                {section.charAt(0).toUpperCase() + section.slice(1)} Interview
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(currentQuestion.difficulty)}`}
              >
                {currentQuestion.difficulty}
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
              {currentQuestion.options.map((option, index) => {
                const optionLabel = getOptionLabel(index);
                const isSelected = selectedAnswer === index;
                const isCorrect = index === currentQuestion.correctAnswer;
                const showResult =
                  selectedAnswer !== null && (isSelected || isCorrect);

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={selectedAnswer !== null}
                    className={`w-full p-4 text-left rounded-lg border transition-all ${
                      isSelected
                        ? isCorrect
                          ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200'
                          : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200'
                        : showResult && isCorrect
                          ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200'
                          : 'bg-card border-border hover:border-border/60 text-card-foreground hover:bg-muted/50'
                    } ${selectedAnswer !== null ? 'cursor-default' : 'cursor-pointer'}`}
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
                        {showResult ? (
                          isCorrect ? (
                            <CheckCircle className="w-4 h-4" />
                          ) : (
                            <XCircle className="w-4 h-4" />
                          )
                        ) : (
                          optionLabel
                        )}
                      </div>
                      <span>{option}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Explanation */}
          {selectedAnswer !== null && (
            <div className="mt-6 p-4 bg-muted rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-foreground flex items-center gap-2">
                  <Info className="w-4 h-4" />
                  Explanation
                </h4>
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
              className="px-4 py-2 border border-border text-muted-foreground rounded-md hover:bg-muted transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={goToPreviousGroup}
                disabled={currentGroup === 0}
                className="px-3 py-1 text-sm bg-muted hover:bg-accent text-muted-foreground hover:text-foreground rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
              >
                <ArrowLeft className="w-3 h-3" />
                Group {currentGroup}
              </button>
              <button
                onClick={goToNextGroup}
                disabled={currentGroup >= totalGroups - 1}
                className="px-3 py-1 text-sm bg-muted hover:bg-accent text-muted-foreground hover:text-foreground rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
              >
                Group {currentGroup + 2}
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <button
              onClick={handleNextQuestion}
              disabled={currentQuestionIndex === questions.length - 1}
              className="px-4 py-2 border border-border text-muted-foreground rounded-md hover:bg-muted transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              Next
              <ArrowRight className="w-4 h-4" />
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
                Group {currentGroup + 1} of {totalGroups}
              </span>
            </div>
          </div>

          {/* Current Group */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-foreground">
                Current Group: Questions {currentGroup * questionsPerGroup + 1}{' '}
                -{' '}
                {Math.min(
                  (currentGroup + 1) * questionsPerGroup,
                  questions.length
                )}
              </h4>
              <span className="text-xs text-muted-foreground">
                {Math.min(
                  questionsPerGroup,
                  questions.length - currentGroup * questionsPerGroup
                )}{' '}
                questions
              </span>
            </div>
            <div className="grid grid-cols-10 gap-1">
              {Array.from(
                {
                  length: Math.min(
                    questionsPerGroup,
                    questions.length - currentGroup * questionsPerGroup
                  ),
                },
                (_, index) => {
                  const questionIndex =
                    currentGroup * questionsPerGroup + index;
                  const isAnswered = answeredQuestions.has(questionIndex);
                  const isCorrect = questionIndex < score;
                  const isCurrent = questionIndex === currentQuestionIndex;

                  return (
                    <button
                      key={questionIndex}
                      onClick={() => {
                        setCurrentQuestionIndex(questionIndex);
                        setSelectedAnswer(null);
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
              {Array.from({ length: totalGroups }, (_, groupIndex) => {
                const startIndex = groupIndex * questionsPerGroup;
                const endIndex = Math.min(
                  startIndex + questionsPerGroup,
                  questions.length
                );
                const isCurrentGroup = currentGroup === groupIndex;

                return (
                  <button
                    key={groupIndex}
                    onClick={() => goToGroup(groupIndex)}
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
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
