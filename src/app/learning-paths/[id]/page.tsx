'use client';

import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import { getLearningPathById, getResourceById } from '@/lib/resources';
import { useState, useEffect, useMemo } from 'react';
import useUnifiedQuestions from '@/hooks/useUnifiedQuestions';

export default function LearningPathDetailPage() {
  const params = useParams();
  const pathId = params.id as string;

  const learningPath = getLearningPathById(pathId);

  if (!learningPath) {
    notFound();
  }

  // State for questions
  const [selectedAnswer, setSelectedAnswer] = useState<
    string | string[] | null
  >(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  // Memoize initial filters to prevent unnecessary re-renders
  const initialFilters = useMemo(
    () => ({
      learningPath: pathId,
      isActive: true,
    }),
    [pathId]
  );

  // Create a stable reference for the hook
  const stableFilters = useMemo(() => initialFilters, [initialFilters]);

  // Debug logging
  useEffect(() => {
    console.log('🔍 LearningPathPage: Component mounted with pathId:', pathId);
    console.log('🔍 LearningPathPage: initialFilters:', initialFilters);
  }, [pathId, initialFilters]);

  // Use unified questions hook
  const {
    questions: unifiedQuestions,
    isLoading: questionsLoading,
    error: questionsError,
  } = useUnifiedQuestions({
    initialFilters: stableFilters,
  });

  // Debug logging for questions
  useEffect(() => {
    console.log('🔍 LearningPathPage: Questions state:', {
      unifiedQuestions: unifiedQuestions?.length || 0,
      questionsLoading,
      questionsError,
    });
  }, [unifiedQuestions, questionsLoading, questionsError]);

  // Filter questions for this learning path
  const pathQuestions = useMemo(() => {
    if (!unifiedQuestions || unifiedQuestions.length === 0) {
      return [];
    }
    return unifiedQuestions.filter(
      q => q.learningPath === pathId && q.isActive
    );
  }, [unifiedQuestions, pathId]);

  const currentQuestion = pathQuestions[currentQuestionIndex];

  // Question handling functions
  const handleAnswerSelect = (answer: string | string[]) => {
    setSelectedAnswer(answer);
    setShowExplanation(false);
    setIsAnswerCorrect(null);
  };

  const handleSubmitAnswer = () => {
    if (!currentQuestion || selectedAnswer === null) return;

    let correct = false;
    if (
      currentQuestion.type === 'conceptual' ||
      currentQuestion.type === 'open-ended'
    ) {
      // For conceptual/open-ended questions, we'll show the answer and explanation
      // In a real implementation, you might want to use AI to evaluate the answer
      correct = true; // For now, we'll consider all answers as correct to show the explanation
    } else if (currentQuestion.type === 'multiple-choice') {
      correct = selectedAnswer === currentQuestion.correctAnswer;
    } else if (currentQuestion.type === 'multiple-select') {
      const selectedArray = Array.isArray(selectedAnswer)
        ? selectedAnswer
        : [selectedAnswer];
      const correctArray = Array.isArray(currentQuestion.correctAnswer)
        ? currentQuestion.correctAnswer
        : [currentQuestion.correctAnswer];

      correct =
        selectedArray.length === correctArray.length &&
        selectedArray.every(answer => correctArray.includes(answer));
    } else if (currentQuestion.type === 'true-false') {
      correct = selectedAnswer === currentQuestion.correctAnswer;
    }

    setIsAnswerCorrect(correct);
    setShowExplanation(true);

    if (correct) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < pathQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setIsAnswerCorrect(null);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setIsAnswerCorrect(null);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400';
      case 'intermediate':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'advanced':
        return 'text-red-600 bg-red-100 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return '🌱';
      case 'intermediate':
        return '🚀';
      case 'advanced':
        return '⚡';
      default:
        return '📚';
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link
            href="/learning-paths"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to Learning Paths
          </Link>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(learningPath.difficulty)}`}
            >
              {getDifficultyIcon(learningPath.difficulty)}{' '}
              {learningPath.difficulty}
            </span>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground">
              {learningPath.estimatedTime} hours
            </span>
          </div>

          <h1 className="text-4xl font-bold text-foreground mb-4">
            {learningPath.title}
          </h1>

          <p className="text-xl text-muted-foreground mb-6">
            {learningPath.description}
          </p>

          {/* Target Skills */}
          {learningPath.targetSkills && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">
                Target Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {learningPath.targetSkills.map(skill => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Prerequisites */}
          {learningPath.prerequisites &&
            learningPath.prerequisites.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Prerequisites
                </h3>
                <div className="flex flex-wrap gap-2">
                  {learningPath.prerequisites.map(prereq => (
                    <Link
                      key={prereq}
                      href={`/learning-paths/${prereq}`}
                      className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300 rounded-full text-sm hover:bg-yellow-200 dark:hover:bg-yellow-900/30 transition-colors"
                    >
                      {prereq}
                    </Link>
                  ))}
                </div>
              </div>
            )}
        </div>

        {/* Questions Section */}
        {questionsLoading ? (
          <div className="bg-card rounded-lg shadow-sm border border-border p-6">
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-2 text-muted-foreground">
                Loading questions...
              </span>
            </div>
          </div>
        ) : questionsError ? (
          <div className="bg-card rounded-lg shadow-sm border border-red-200 dark:border-red-800 p-6">
            <p className="text-red-600 dark:text-red-400">
              Error loading questions: {questionsError}
            </p>
          </div>
        ) : pathQuestions.length === 0 ? (
          <div className="bg-card rounded-lg shadow-sm border border-yellow-200 dark:border-yellow-800 p-6">
            <p className="text-yellow-600 dark:text-yellow-400">
              No questions available for this learning path yet.
            </p>
          </div>
        ) : (
          <div className="bg-card rounded-lg shadow-sm border border-border p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">
                Practice Questions
              </h2>
              <div className="text-sm text-muted-foreground">
                Question {currentQuestionIndex + 1} of {pathQuestions.length}
              </div>
            </div>

            {/* Question Card */}
            {currentQuestion && (
              <div className="bg-muted/50 rounded-lg border border-border p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(currentQuestion.difficulty)}`}
                  >
                    {currentQuestion.difficulty}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {currentQuestion.type
                      .replace('-', ' ')
                      .replace(/\b\w/g, l => l.toUpperCase())}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-foreground mb-4">
                  {currentQuestion.title}
                </h3>

                {/* Question Content */}
                <div className="mb-6">
                  <div
                    className="text-muted-foreground mb-4 prose dark:prose-invert max-w-none"
                    dangerouslySetInnerHTML={{
                      __html: currentQuestion.content
                        .replace(/\n/g, '<br>')
                        .replace(
                          /```([\s\S]*?)```/g,
                          '<pre class="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto my-4"><code>$1</code></pre>'
                        )
                        .replace(
                          /`([^`]+)`/g,
                          '<code class="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded text-sm font-mono">$1</code>'
                        ),
                    }}
                  />

                  {/* Answer Input for Conceptual/Open-ended Questions */}
                  {(currentQuestion.type === 'conceptual' ||
                    currentQuestion.type === 'open-ended') && (
                    <div className="space-y-4">
                      <textarea
                        value={(selectedAnswer as string) || ''}
                        onChange={e => handleAnswerSelect(e.target.value)}
                        placeholder="Type your answer here..."
                        className="w-full p-4 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        rows={4}
                        disabled={showExplanation}
                      />
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                {!showExplanation && (
                  <button
                    onClick={handleSubmitAnswer}
                    disabled={selectedAnswer === null}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:bg-muted disabled:cursor-not-allowed transition-colors"
                  >
                    Submit Answer
                  </button>
                )}

                {/* Explanation */}
                {showExplanation && (
                  <div
                    className={`mt-6 p-4 rounded-lg ${
                      isAnswerCorrect
                        ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                        : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
                    }`}
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      {isAnswerCorrect ? (
                        <span className="text-green-600 dark:text-green-400 font-medium">
                          ✓ Great!
                        </span>
                      ) : (
                        <span className="text-red-600 dark:text-red-400 font-medium">
                          ✗ Incorrect
                        </span>
                      )}
                    </div>

                    {/* Show the correct answer for conceptual/open-ended questions */}
                    {(currentQuestion.type === 'conceptual' ||
                      currentQuestion.type === 'open-ended') &&
                      currentQuestion.answer && (
                        <div className="mb-4">
                          <h4 className="font-semibold text-foreground mb-2">
                            Correct Answer:
                          </h4>
                          <p className="text-muted-foreground bg-muted/50 p-3 rounded-lg">
                            {currentQuestion.answer}
                          </p>
                        </div>
                      )}

                    {/* Show explanation */}
                    {currentQuestion.explanation && (
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">
                          Explanation:
                        </h4>
                        <div
                          className="text-muted-foreground prose dark:prose-invert max-w-none"
                          dangerouslySetInnerHTML={{
                            __html: currentQuestion.explanation
                              .replace(/\n/g, '<br>')
                              .replace(
                                /```([\s\S]*?)```/g,
                                '<pre class="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto my-4"><code>$1</code></pre>'
                              )
                              .replace(
                                /`([^`]+)`/g,
                                '<code class="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded text-sm font-mono">$1</code>'
                              ),
                          }}
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* Navigation */}
                <div className="flex justify-between mt-6">
                  <button
                    onClick={handlePreviousQuestion}
                    disabled={currentQuestionIndex === 0}
                    className="px-4 py-2 text-muted-foreground hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    ← Previous
                  </button>
                  <button
                    onClick={handleNextQuestion}
                    disabled={currentQuestionIndex === pathQuestions.length - 1}
                    className="px-4 py-2 text-muted-foreground hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next →
                  </button>
                </div>
              </div>
            )}

            {/* Progress */}
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex justify-between text-sm text-muted-foreground mb-2">
                <span>Progress</span>
                <span>
                  {Math.round(
                    ((currentQuestionIndex + 1) / pathQuestions.length) * 100
                  )}
                  %
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${((currentQuestionIndex + 1) / pathQuestions.length) * 100}%`,
                  }}
                ></div>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground mt-2">
                <span>
                  Score: {score}/{currentQuestionIndex + 1}
                </span>
                <span>
                  Accuracy:{' '}
                  {currentQuestionIndex > 0
                    ? Math.round((score / (currentQuestionIndex + 1)) * 100)
                    : 0}
                  %
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Resources */}
        <div className="bg-card rounded-lg shadow-sm border border-border p-6">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Learning Resources
          </h2>

          <div className="space-y-4">
            {learningPath.resources.map(resourceId => {
              const resource = getResourceById(resourceId);
              if (!resource) return null;

              return (
                <div
                  key={resource.id}
                  className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        {resource.title}
                      </h3>
                      <p className="text-muted-foreground mb-3">
                        {resource.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="capitalize">{resource.type}</span>
                        <span>•</span>
                        <span className="capitalize">{resource.category}</span>
                        <span>•</span>
                        <span className="capitalize">
                          {resource.difficulty}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <Link
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        View Resource
                        <svg
                          className="w-4 h-4 ml-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Link
            href="/learning-paths"
            className="flex-1 bg-muted text-foreground px-6 py-3 rounded-lg text-center hover:bg-muted/80 transition-colors"
          >
            Browse All Learning Paths
          </Link>
          <Link
            href="/study-plans"
            className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg text-center hover:bg-blue-700 transition-colors"
          >
            View Study Plans
          </Link>
        </div>
      </div>
    </div>
  );
}
