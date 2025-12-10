"use client";

import { useState } from "react";

interface Question {
  id: string;
  title: string;
  question: string;
  answer: string;
  explanation?: string;
  options?: string[];
  correctAnswer?: number;
  category?: string;
  difficulty?: string;
  codeExample?: string;
}

interface QuestionGroup {
  id: string;
  title: string;
  questions: Question[];
}

interface QuestionsData {
  groups: QuestionGroup[];
}

interface MobilePaginationProps {
  readonly currentGroup: QuestionGroup;
  readonly currentQuestionIndex: number;
  readonly questionsData: QuestionsData;
  readonly onPrevious: () => void;
  readonly onNext: () => void;
  readonly onNavigateToQuestion: (groupIndex: number, questionIndex: number) => void;
  readonly isNavigating: boolean;
  readonly showAnswer: boolean;
  readonly answeredQuestions: Set<string>;
  readonly expandedGroups: Set<string>;
  readonly onToggleGroupExpansion: (groupId: string) => void;
}

export default function MobilePagination({
  currentGroup,
  currentQuestionIndex,
  questionsData,
  onPrevious,
  onNext,
  onNavigateToQuestion,
  isNavigating,
  showAnswer,
  answeredQuestions,
  expandedGroups,
  onToggleGroupExpansion,
}: MobilePaginationProps) {
  const [showFullNavigation, setShowFullNavigation] = useState(false);

  const currentGroupIndex = questionsData.groups.findIndex(
    (g: QuestionGroup) => g.id === currentGroup.id,
  );
  const isFirstQuestion = currentQuestionIndex === 0 && currentGroupIndex === 0;

  // Calculate total questions across all groups
  const totalQuestions = questionsData.groups.reduce(
    (total, group) => total + group.questions.length,
    0,
  );

  return (
    <div className="mt-8 max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        {/* Mobile Navigation Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Questions
          </h3>

          {/* Mobile: Show More Questions Button */}
          <div className="block md:hidden">
            <button
              onClick={() => setShowFullNavigation(!showFullNavigation)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <span className="mr-2">
                {showFullNavigation
                  ? "Hide"
                  : `More ${totalQuestions} Questions`}
              </span>
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${
                  showFullNavigation ? "rotate-180" : "rotate-0"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>

          {/* Desktop: Show Previous/Next Buttons */}
          <div className="hidden md:flex items-center space-x-2">
            <button
              onClick={onPrevious}
              disabled={isNavigating || isFirstQuestion}
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
              onClick={onNext}
              disabled={isNavigating} // Removed !showAnswer condition to allow free navigation
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

        {/* Mobile: Simple Previous/Next */}
        <div className="block md:hidden mb-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onPrevious}
              disabled={isNavigating || isFirstQuestion}
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

            <span className="text-sm text-gray-500 dark:text-gray-400">
              {currentQuestionIndex + 1} of {currentGroup.questions.length}
            </span>

            <button
              onClick={onNext}
              disabled={isNavigating} // Removed !showAnswer condition to allow free navigation
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

        {/* Full Navigation - Hidden on mobile by default */}
        <div className={`${showFullNavigation ? "block" : "hidden md:block"}`}>
          {/* Group Navigation */}
          <div className="space-y-4">
            {questionsData?.groups.map(
              (group: QuestionGroup, groupIndex: number) => {
                const isExpanded = expandedGroups.has(group.id);
                const answeredInGroup = group.questions.filter((q: Question) =>
                  answeredQuestions.has(q.id),
                ).length;
                const totalInGroup = group.questions.length;

                return (
                  <div
                    key={group.id}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
                  >
                    {/* Group Header - Clickable to toggle */}
                    <button
                      onClick={() => onToggleGroupExpansion(group.id)}
                      className="w-full p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`transform transition-transform duration-200 ${
                              isExpanded ? "rotate-90" : "rotate-0"
                            }`}
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
                          ? "max-h-[500px] opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="p-4 pt-3 max-h-[500px] overflow-y-auto">
                        <div className="grid grid-cols-5 sm:grid-cols-10 md:grid-cols-15 lg:grid-cols-20 gap-3">
                          {group.questions.map(
                            (question: Question, questionIndex: number) => {
                              const isCurrentQuestion =
                                currentGroup?.id === group.id &&
                                currentQuestionIndex === questionIndex;
                              const isAnswered = answeredQuestions.has(
                                question.id,
                              );

                              return (
                                <button
                                  key={question.id}
                                  onClick={() =>
                                    onNavigateToQuestion(
                                      groupIndex,
                                      questionIndex,
                                    )
                                  }
                                  disabled={isNavigating}
                                  className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                                    (() => {
                                      if (isCurrentQuestion) {
                                        return "bg-blue-600 text-white";
                                      }
                                      if (isAnswered) {
                                        return "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-300 dark:border-green-700";
                                      }
                                      return "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600";
                                    })()
                                  }`}
                                >
                                  {questionIndex + 1}
                                </button>
                              );
                            },
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              },
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
