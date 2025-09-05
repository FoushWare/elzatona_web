'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { learningPaths } from '@/lib/resources';
import {
  QuestionGroup,
  QuestionsData,
  getQuestionsForPath,
} from '@/lib/questions';

export default function QuestionsPage() {
  const params = useParams();
  const router = useRouter();
  const pathId = params.id as string;

  const [questionsData, setQuestionsData] = useState<QuestionsData | null>(
    null
  );
  const [currentGroup, setCurrentGroup] = useState<QuestionGroup | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<string>>(
    new Set()
  );
  const [loading, setLoading] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

  const learningPath = learningPaths.find(path => path.id === pathId);

  const loadQuestions = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getQuestionsForPath(pathId);
      setQuestionsData(data);
      if (data.groups.length > 0) {
        setCurrentGroup(data.groups[0]);
      }
    } catch (error) {
      console.error('Error loading questions:', error);
    } finally {
      setLoading(false);
    }
  }, [pathId]);

  useEffect(() => {
    if (pathId) {
      loadQuestions();
    }
  }, [pathId, loadQuestions]);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex.toString());
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswer || !currentGroup) return;

    const currentQuestion = currentGroup.questions[currentQuestionIndex];
    const selectedIndex = parseInt(selectedAnswer);
    const isCorrect = selectedIndex === currentQuestion.correctAnswer;

    if (isCorrect && !answeredQuestions.has(currentQuestion.id)) {
      setScore(prev => prev + 1);
      setAnsweredQuestions(prev => new Set([...prev, currentQuestion.id]));
    }

    setShowAnswer(true);
  };

  const handleNextQuestion = () => {
    if (!currentGroup) return;

    setIsNavigating(true);

    // Simulate network delay with variation
    const delay = 800 + Math.random() * 800; // 800-1600ms
    setTimeout(() => {
      if (currentQuestionIndex < currentGroup.questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        // Move to next group or finish
        const currentGroupIndex =
          questionsData?.groups.findIndex(g => g.id === currentGroup.id) || 0;
        if (
          questionsData &&
          currentGroupIndex < questionsData.groups.length - 1
        ) {
          const nextGroup = questionsData.groups[currentGroupIndex + 1];
          setCurrentGroup(nextGroup);
          setCurrentQuestionIndex(0);
        }
      }

      setSelectedAnswer(null);
      setShowAnswer(false);
      setIsNavigating(false);
    }, delay);
  };

  const handlePreviousQuestion = () => {
    setIsNavigating(true);

    // Simulate network delay with variation
    const delay = 800 + Math.random() * 800; // 800-1600ms
    setTimeout(() => {
      if (currentQuestionIndex > 0) {
        setCurrentQuestionIndex(prev => prev - 1);
      } else {
        // Move to previous group
        const currentGroupIndex =
          questionsData?.groups.findIndex(g => g.id === currentGroup?.id) || 0;
        if (questionsData && currentGroupIndex > 0) {
          const prevGroup = questionsData.groups[currentGroupIndex - 1];
          setCurrentGroup(prevGroup);
          setCurrentQuestionIndex(prevGroup.questions.length - 1);
        }
      }

      setSelectedAnswer(null);
      setShowAnswer(false);
      setIsNavigating(false);
    }, delay);
  };

  const navigateToQuestion = (groupIndex: number, questionIndex: number) => {
    if (questionsData && questionsData.groups[groupIndex]) {
      setIsNavigating(true);

      // Simulate network delay with variation
      const delay = 800 + Math.random() * 800; // 800-1600ms
      setTimeout(() => {
        setCurrentGroup(questionsData.groups[groupIndex]);
        setCurrentQuestionIndex(questionIndex);
        setSelectedAnswer(null);
        setShowAnswer(false);
        setIsDrawerOpen(false);
        setIsNavigating(false);
      }, delay);
    }
  };

  const toggleGroupExpansion = (groupId: string) => {
    setExpandedGroups(prev => {
      const newSet = new Set(prev);
      if (newSet.has(groupId)) {
        newSet.delete(groupId);
      } else {
        newSet.add(groupId);
      }
      return newSet;
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">
            Loading questions...
          </p>
        </div>
      </div>
    );
  }

  if (!learningPath || !questionsData || !currentGroup) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Questions Not Found
          </h1>
          <button
            onClick={() => router.back()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = currentGroup.questions[currentQuestionIndex];
  // Progress calculations removed as they were unused

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Navigation Loader Overlay */}
      {isNavigating && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-2xl">
            <div className="flex items-center space-x-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <div className="text-lg font-medium text-gray-900 dark:text-white">
                Fetching question...
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8 relative">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => router.back()}
              className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Learning Path
            </button>

            <button
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
              className="inline-flex items-center px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              Questions List
            </button>
          </div>

          {/* Centered Title and Description */}
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {learningPath.title} - Practice Questions
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
              Test your knowledge with interactive questions
            </p>

            {/* Question Progress */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
              <div className="flex items-center justify-center space-x-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {currentGroup.title}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Questions {currentQuestionIndex + 1} of{' '}
                    {currentGroup.questions.length}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Score */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center bg-white dark:bg-gray-800 rounded-lg px-6 py-3 shadow-lg">
            <span className="text-2xl font-bold text-green-600 mr-2">🏆</span>
            <span className="text-lg font-semibold text-gray-900 dark:text-white">
              Score: {score} / {answeredQuestions.size}
            </span>
          </div>
        </div>

        {/* Side Drawer */}
        {isDrawerOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            <div
              className="absolute inset-0 bg-black bg-opacity-50"
              onClick={() => setIsDrawerOpen(false)}
            ></div>
            <div className="absolute right-0 top-0 h-full w-80 bg-white dark:bg-gray-800 shadow-xl">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Questions List
                  </h2>
                  <button
                    onClick={() => setIsDrawerOpen(false)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <div className="space-y-4 max-h-[calc(100vh-120px)] overflow-y-auto">
                  {questionsData?.groups.map((group, groupIndex) => {
                    const isExpanded = expandedGroups.has(group.id);
                    const answeredInGroup = group.questions.filter(q =>
                      answeredQuestions.has(q.id)
                    ).length;
                    const totalInGroup = group.questions.length;

                    return (
                      <div
                        key={group.id}
                        className="border-b border-gray-200 dark:border-gray-700 pb-4"
                      >
                        {/* Group Header - Clickable to toggle */}
                        <button
                          onClick={() => toggleGroupExpansion(group.id)}
                          className="w-full text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg p-2 -m-2 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <div
                                className={`transform transition-transform duration-200 ${isExpanded ? 'rotate-90' : 'rotate-0'}`}
                              >
                                <svg
                                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                  />
                                </svg>
                              </div>
                              <h3 className="font-semibold text-gray-900 dark:text-white">
                                {group.title}
                              </h3>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {answeredInGroup}/{totalInGroup}
                              </span>
                              <div className="w-12 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-green-500 transition-all duration-300"
                                  style={{
                                    width: `${(answeredInGroup / totalInGroup) * 100}%`,
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </button>

                        {/* Collapsible Questions */}
                        <div
                          className={`transition-all duration-300 ease-in-out overflow-hidden ${
                            isExpanded
                              ? 'max-h-96 opacity-100'
                              : 'max-h-0 opacity-0'
                          }`}
                        >
                          <div className="p-4 pt-3 space-y-3">
                            {group.questions.map((question, questionIndex) => {
                              const isCurrentQuestion =
                                currentGroup?.id === group.id &&
                                currentQuestionIndex === questionIndex;
                              const isAnswered = answeredQuestions.has(
                                question.id
                              );

                              return (
                                <button
                                  key={question.id}
                                  onClick={() =>
                                    navigateToQuestion(
                                      groupIndex,
                                      questionIndex
                                    )
                                  }
                                  disabled={isNavigating}
                                  className={`w-full text-left p-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                                    isCurrentQuestion
                                      ? 'bg-blue-100 dark:bg-blue-900/30 border-2 border-blue-500'
                                      : isAnswered
                                        ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                                        : 'bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600'
                                  }`}
                                >
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400 mr-2">
                                        Q{questionIndex + 1}
                                      </span>
                                      <span className="text-sm text-gray-900 dark:text-white truncate">
                                        {question.title}
                                      </span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                      {isAnswered && (
                                        <span className="text-green-600 dark:text-green-400 text-xs">
                                          ✓
                                        </span>
                                      )}
                                      {isCurrentQuestion && (
                                        <span className="text-blue-600 dark:text-blue-400 text-xs">
                                          ●
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Question Card */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium">
                  {currentQuestion.category}
                </span>
                <span className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm font-medium">
                  {currentQuestion.difficulty}
                </span>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {currentQuestion.title}
              </h2>

              <div className="prose dark:prose-invert max-w-none">
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  {currentQuestion.question}
                </p>
              </div>
            </div>

            {/* Code Example */}
            {currentQuestion.codeExample && (
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Code Example:
                </h4>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                  <pre className="text-sm">
                    <code>{currentQuestion.codeExample}</code>
                  </pre>
                </div>
              </div>
            )}

            {/* Answer Options */}
            <div className="space-y-3 mb-6">
              {currentQuestion.options?.map((option, index) => {
                const isSelected = selectedAnswer === index.toString();
                const isCorrect = index === currentQuestion.correctAnswer;
                const showResult = showAnswer;

                let buttonClass =
                  'w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ';

                if (showResult) {
                  if (isCorrect) {
                    buttonClass +=
                      'border-green-500 bg-green-50 dark:bg-green-900/20';
                  } else if (isSelected && !isCorrect) {
                    buttonClass +=
                      'border-red-500 bg-red-50 dark:bg-red-900/20';
                  } else {
                    buttonClass += 'border-gray-200 dark:border-gray-600';
                  }
                } else {
                  buttonClass += isSelected
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500';
                }

                return (
                  <button
                    key={index}
                    onClick={() => !showAnswer && handleAnswerSelect(index)}
                    disabled={showAnswer}
                    className={buttonClass}
                  >
                    <div className="flex items-center">
                      <div
                        className={`w-4 h-4 rounded-full border-2 mr-3 ${
                          isSelected
                            ? 'border-blue-500 bg-blue-500'
                            : 'border-gray-300 dark:border-gray-600'
                        }`}
                      >
                        {isSelected && (
                          <div className="w-full h-full rounded-full bg-white scale-50"></div>
                        )}
                      </div>
                      <span
                        className={`text-gray-900 dark:text-white ${
                          showResult && isCorrect ? 'font-semibold' : ''
                        }`}
                      >
                        {option}
                      </span>
                      {showResult && isCorrect && (
                        <span className="ml-auto text-green-600 dark:text-green-400 font-semibold">
                          ✓ Correct
                        </span>
                      )}
                      {showResult && isSelected && !isCorrect && (
                        <span className="ml-auto text-red-600 dark:text-red-400 font-semibold">
                          ✗ Incorrect
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Submit Button */}
            {!showAnswer && (
              <button
                onClick={handleSubmitAnswer}
                disabled={!selectedAnswer}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200"
              >
                Submit Answer
              </button>
            )}

            {/* Answer Explanation */}
            {showAnswer && (
              <div className="mt-6 p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Answer & Explanation
                </h3>
                <div className="prose dark:prose-invert max-w-none">
                  <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                    {currentQuestion.answer}
                  </div>
                  {currentQuestion.explanation && (
                    <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">
                        Why this is correct:
                      </h4>
                      <p className="text-blue-800 dark:text-blue-300">
                        {currentQuestion.explanation}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-8 max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Navigation
              </h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handlePreviousQuestion}
                  disabled={
                    isNavigating ||
                    (currentQuestionIndex === 0 &&
                      questionsData.groups.findIndex(
                        g => g.id === currentGroup.id
                      ) === 0)
                  }
                  className="flex items-center px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  Previous
                </button>

                <button
                  onClick={handleNextQuestion}
                  disabled={isNavigating || !showAnswer}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  Next
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
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Group Navigation */}
            <div className="space-y-4">
              {questionsData?.groups.map((group, groupIndex) => {
                const isExpanded = expandedGroups.has(group.id);
                const answeredInGroup = group.questions.filter(q =>
                  answeredQuestions.has(q.id)
                ).length;
                const totalInGroup = group.questions.length;

                return (
                  <div
                    key={group.id}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
                  >
                    {/* Group Header - Clickable to toggle */}
                    <button
                      onClick={() => toggleGroupExpansion(group.id)}
                      className="w-full p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`transform transition-transform duration-200 ${isExpanded ? 'rotate-90' : 'rotate-0'}`}
                          >
                            <svg
                              className="w-5 h-5 text-gray-500 dark:text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">
                              {group.title}
                            </h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {answeredInGroup}/{totalInGroup} questions
                              answered
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {/* Progress indicator */}
                          <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-green-500 transition-all duration-300"
                              style={{
                                width: `${(answeredInGroup / totalInGroup) * 100}%`,
                              }}
                            />
                          </div>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {Math.round((answeredInGroup / totalInGroup) * 100)}
                            %
                          </span>
                        </div>
                      </div>
                    </button>

                    {/* Collapsible Content */}
                    <div
                      className={`transition-all duration-300 ease-in-out overflow-hidden ${
                        isExpanded
                          ? 'max-h-96 opacity-100'
                          : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="p-4 pt-3">
                        <div className="grid grid-cols-5 sm:grid-cols-10 md:grid-cols-15 lg:grid-cols-20 gap-3">
                          {group.questions.map((question, questionIndex) => {
                            const isCurrentQuestion =
                              currentGroup?.id === group.id &&
                              currentQuestionIndex === questionIndex;
                            const isAnswered = answeredQuestions.has(
                              question.id
                            );

                            return (
                              <button
                                key={question.id}
                                onClick={() =>
                                  navigateToQuestion(groupIndex, questionIndex)
                                }
                                disabled={isNavigating}
                                className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                                  isCurrentQuestion
                                    ? 'bg-blue-600 text-white'
                                    : isAnswered
                                      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-300 dark:border-green-700'
                                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                }`}
                              >
                                {questionIndex + 1}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
