"use client";

import React, { useState, useMemo } from "react";
import {
  Target,
  CheckCircle,
  XCircle,
  Info,
  BookOpen,
  Video,
  FileText,
  GraduationCap,
  ExternalLink,
  Clock,
} from "lucide-react";
import { QuestionContent, Button } from "@elzatona/common-ui";

interface Question {
  id: string;
  title: string;
  content?: string;
  type: "multiple-choice" | "open-ended" | "true-false" | "code";
  difficulty:
    | "beginner"
    | "intermediate"
    | "advanced"
    | "easy"
    | "medium"
    | "hard";
  explanation?: string;
  options?: {
    id?: string;
    text: string;
    isCorrect?: boolean;
  }[];
  correct_answer?: string | number;
  resources?: Array<{
    type: "video" | "course" | "article";
    title: string;
    url: string;
    description?: string;
    duration?: string;
    author?: string;
  }>;
}

interface QuestionPracticeViewProps {
  question:
    | Question
    | {
        id?: string;
        title?: string;
        content?: string;
        options?:
          | string
          | Array<{
              id?: string;
              text?: string;
              label?: string;
              option?: string;
              isCorrect?: boolean;
              correct?: boolean;
            }>;
        correct_answer?: string | number;
        explanation?: string;
        resources?: string | Array<unknown>;
        difficulty?: string;
        [key: string]: unknown;
      };
}

const getOptionLetter = (index: number): string => {
  return String.fromCodePoint(65 + index); // A, B, C, D, etc.
};

export const QuestionPracticeView: React.FC<QuestionPracticeViewProps> = ({
  question,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  // Parse resources if they come as a string
  const parsedResources = useMemo(() => {
    if (!question.resources) return [];
    if (Array.isArray(question.resources)) return question.resources;
    if (typeof question.resources === "string") {
      try {
        return JSON.parse(question.resources);
      } catch (e) {
        console.error("Failed to parse resources:", e);
        return [];
      }
    }
    return [];
  }, [question.resources]);

  // Transform options to match guided practice format
  const shuffledOptions = useMemo(() => {
    if (!question.options) return [];

    // Handle options as string (JSON)
    let optionsArray: Array<
      | string
      | {
          id?: string;
          text?: string;
          label?: string;
          option?: string;
          isCorrect?: boolean;
          correct?: boolean;
        }
    > = [];
    if (typeof question.options === "string") {
      try {
        optionsArray = JSON.parse(question.options);
      } catch (e) {
        console.error("Failed to parse options:", e);
        return [];
      }
    } else if (Array.isArray(question.options)) {
      optionsArray = question.options;
    } else {
      return [];
    }

    if (optionsArray.length === 0) return [];

    return optionsArray.map(
      (
        option:
          | string
          | {
              id?: string;
              text?: string;
              label?: string;
              option?: string;
              isCorrect?: boolean;
              correct?: boolean;
            },
        index: number,
      ) => {
        // Handle different option formats
        if (typeof option === "string") {
          return {
            id: `option-${index}`,
            text: option,
            isCorrect: false,
          };
        }

        return {
          id: option.id || `option-${index}`,
          text: option.text || option.label || option.option || String(option),
          isCorrect: option.isCorrect ?? option.correct ?? false,
        };
      },
    );
  }, [question.options]);

  // Check if answer is correct
  const isCorrectAnswer = (answerText: string): boolean => {
    if (!question.correct_answer && !shuffledOptions.length) return false;

    // Check if it matches the correct answer directly
    if (question.correct_answer) {
      const correctAnswerStr = String(question.correct_answer)
        .toLowerCase()
        .trim();
      const answerStr = answerText.toLowerCase().trim();

      // Try exact match
      if (correctAnswerStr === answerStr) return true;

      // Try matching by index (if correct_answer is a number)
      const correctIndex =
        typeof question.correct_answer === "number"
          ? question.correct_answer
          : Number.parseInt(correctAnswerStr, 10);

      if (
        !Number.isNaN(correctIndex) &&
        shuffledOptions[correctIndex]?.text.toLowerCase().trim() === answerStr
      ) {
        return true;
      }
    }

    // Check if the option is marked as correct
    const option = shuffledOptions.find(
      (opt) =>
        opt.text.toLowerCase().trim() === answerText.toLowerCase().trim(),
    );
    return option?.isCorrect ?? false;
  };

  const handleAnswerSelect = (answerText: string) => {
    if (selectedAnswer) return; // Already answered

    setSelectedAnswer(answerText);
    setShowExplanation(true);
  };

  const cleanQuestionTitle = (title: string): string => {
    if (!title) return "";
    return title
      .replaceAll("&nbsp;", " ")
      .replaceAll("&lt;", "<")
      .replaceAll("&gt;", ">")
      .replaceAll("&amp;", "&")
      .replaceAll("&quot;", '"')
      .replaceAll("&#39;", "'")
      .trim();
  };

  const formatOptionText = (text: string) => {
    // Simple inline code detection for options
    const codePattern = /(`[^`]+`|{[^}]+}|\[[^\]]+\])/g;
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match;

    while ((match = codePattern.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }
      const codeContent = match[1].replaceAll(/[`{}[\]]/g, "");
      parts.push(
        <code
          key={match.index}
          className="px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded text-sm font-mono"
        >
          {codeContent}
        </code>,
      );
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return parts.length > 0 ? <span>{parts}</span> : <span>{text}</span>;
  };

  const difficultyMap: Record<string, string> = {
    beginner: "easy",
    intermediate: "medium",
    advanced: "hard",
    easy: "easy",
    medium: "medium",
    hard: "hard",
  };

  const displayDifficulty =
    (question.difficulty && difficultyMap[question.difficulty]) ||
    question.difficulty ||
    "medium";

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Question Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-800/50 dark:to-purple-800/50 rounded-lg shadow-sm">
              <Target className="w-5 h-5 text-indigo-600 dark:text-indigo-300" />
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-sm">
                {displayDifficulty}
              </span>
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600">
                {String(question.type || "multiple-choice")}
              </span>
            </div>
          </div>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
          <QuestionContent content={cleanQuestionTitle(question.title || "")} />
        </h2>

        {/* Question Content */}
        {question.content && (
          <div className="prose dark:prose-invert max-w-none prose-sm sm:prose-base lg:prose-lg mb-6">
            <QuestionContent content={question.content} />
          </div>
        )}
      </div>

      {/* Answer Options */}
      {shuffledOptions && shuffledOptions.length > 0 ? (
        <div className="space-y-3 sm:space-y-4 mb-6">
          {shuffledOptions.map((option, index) => {
            const optionId = option.id || `option-${index}`;
            const optionLetter = getOptionLetter(index);
            const isCorrect = selectedAnswer && isCorrectAnswer(option.text);
            const isSelected = selectedAnswer === option.text;
            const isWrong = isSelected && !isCorrect;

            return (
              <button
                key={optionId}
                onClick={() => handleAnswerSelect(option.text)}
                disabled={!!selectedAnswer}
                className={`w-full text-left p-4 sm:p-5 rounded-xl sm:rounded-2xl border-2 transition-all duration-300 transform ${
                  !selectedAnswer
                    ? "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-indigo-500 dark:hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:shadow-xl hover:shadow-indigo-200/50 dark:hover:shadow-indigo-900/30 hover:scale-[1.02] active:scale-[0.98] text-gray-900 dark:text-gray-100"
                    : isCorrect
                      ? "border-green-500 dark:border-green-400 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/40 dark:to-emerald-900/40 text-green-900 dark:text-green-100 shadow-xl shadow-green-200/50 dark:shadow-green-900/30 scale-[1.02]"
                      : isWrong
                        ? "border-red-500 dark:border-red-400 bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-900/40 dark:to-rose-900/40 text-red-900 dark:text-red-100 shadow-xl shadow-red-200/50 dark:shadow-red-900/30 scale-[1.02]"
                        : "border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700/70 text-gray-500 dark:text-gray-500 opacity-70 dark:opacity-60"
                } ${selectedAnswer ? "cursor-default" : "cursor-pointer"}`}
              >
                <div className="flex items-center space-x-4 sm:space-x-5">
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-base sm:text-lg font-bold shadow-md transition-all duration-300 flex-shrink-0 ${
                      isCorrect
                        ? "bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-green-500/50"
                        : isWrong
                          ? "bg-gradient-to-br from-red-500 to-rose-600 text-white shadow-red-500/50"
                          : "bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-800/60 dark:to-purple-800/60 text-indigo-700 dark:text-indigo-200"
                    }`}
                  >
                    {optionLetter}
                  </div>
                  <div className="flex-1 min-w-0">
                    {formatOptionText(option.text)}
                  </div>
                  {isCorrect && (
                    <div className="flex-shrink-0 animate-in fade-in slide-in-from-right-2 duration-300">
                      <CheckCircle className="w-6 h-6 sm:w-7 sm:h-7 text-green-600 dark:text-green-400" />
                    </div>
                  )}
                  {isWrong && (
                    <div className="flex-shrink-0 animate-in fade-in slide-in-from-right-2 duration-300">
                      <XCircle className="w-6 h-6 sm:w-7 sm:h-7 text-red-600 dark:text-red-400" />
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      ) : (
        <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg mb-6">
          <div className="flex items-center space-x-2">
            <XCircle className="w-5 h-5 text-red-600" />
            <p className="text-red-800 dark:text-red-200 font-medium">
              No answer options available for this question
            </p>
          </div>
        </div>
      )}

      {/* Explanation */}
      {question.type !== "code" && showExplanation && question.explanation && (
        <div className="mt-6 sm:mt-8 p-5 sm:p-6 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-900/30 dark:via-indigo-900/30 dark:to-purple-900/30 border-2 border-blue-300 dark:border-blue-700 rounded-xl sm:rounded-2xl shadow-xl shadow-blue-200/50 dark:shadow-blue-900/30 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2.5 bg-blue-500 dark:bg-blue-600 rounded-lg shadow-md">
              <Info className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <p className="text-base sm:text-lg font-bold text-blue-900 dark:text-blue-100">
              Explanation
            </p>
          </div>
          <div className="text-sm sm:text-base text-blue-800 dark:text-blue-200 leading-relaxed pl-1">
            <QuestionContent content={question.explanation} />
          </div>
        </div>
      )}

      {/* Resources */}
      {question.type !== "code" &&
        showExplanation &&
        parsedResources &&
        parsedResources.length > 0 && (
          <div className="mt-6 sm:mt-8 p-5 sm:p-6 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-purple-900/30 dark:via-pink-900/30 dark:to-orange-900/30 border-2 border-purple-300 dark:border-purple-700 rounded-xl sm:rounded-2xl shadow-xl shadow-purple-200/50 dark:shadow-purple-900/30 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2.5 bg-purple-500 dark:bg-purple-600 rounded-lg shadow-md">
                <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <p className="text-base sm:text-lg font-bold text-purple-900 dark:text-purple-100">
                Learning Resources
              </p>
            </div>
            <div className="space-y-3 sm:space-y-4">
              {parsedResources.map(
                (
                  resource: {
                    type?: string;
                    url?: string;
                    title?: string;
                    description?: string;
                    duration?: string;
                    author?: string;
                  },
                  index: number,
                ) => {
                  const getIcon = () => {
                    switch (resource.type) {
                      case "video":
                        return <Video className="w-5 h-5 sm:w-6 sm:h-6" />;
                      case "course":
                        return (
                          <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6" />
                        );
                      case "article":
                        return <FileText className="w-5 h-5 sm:w-6 sm:h-6" />;
                      default:
                        return <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />;
                    }
                  };

                  const getTypeColor = () => {
                    switch (resource.type) {
                      case "video":
                        return "from-red-500 to-pink-600 dark:from-red-600 dark:to-pink-700";
                      case "course":
                        return "from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700";
                      case "article":
                        return "from-green-500 to-emerald-600 dark:from-green-600 dark:to-emerald-700";
                      default:
                        return "from-purple-500 to-indigo-600 dark:from-purple-600 dark:to-indigo-700";
                    }
                  };

                  const getTypeLabel = () => {
                    switch (resource.type) {
                      case "video":
                        return "Video";
                      case "course":
                        return "Course";
                      case "article":
                        return "Article";
                      default:
                        return "Resource";
                    }
                  };

                  return (
                    <a
                      key={resource.url || `resource-${index}`}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block p-4 sm:p-5 bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl border-2 border-purple-200 dark:border-purple-800 hover:border-purple-400 dark:hover:border-purple-600 transition-all duration-300 hover:shadow-lg hover:shadow-purple-200/50 dark:hover:shadow-purple-900/30 transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <div className="flex items-start space-x-4">
                        <div
                          className={`p-2.5 sm:p-3 rounded-lg bg-gradient-to-br ${getTypeColor()} text-white shadow-md flex-shrink-0`}
                        >
                          {getIcon()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                              {getTypeLabel()}
                            </span>
                            <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 text-purple-500 dark:text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                          <h4 className="text-sm sm:text-base font-bold text-gray-900 dark:text-gray-100 mb-1 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                            {resource.title}
                          </h4>
                          {resource.description && (
                            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                              {resource.description}
                            </p>
                          )}
                          <div className="flex items-center space-x-3 text-xs sm:text-sm text-gray-500 dark:text-gray-500">
                            {resource.duration && (
                              <div className="flex items-center space-x-1">
                                <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                                <span>{resource.duration}</span>
                              </div>
                            )}
                            {resource.author && (
                              <div className="flex items-center space-x-1">
                                <span className="text-gray-400 dark:text-gray-500">
                                  by
                                </span>
                                <span className="font-medium">
                                  {resource.author}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </a>
                  );
                },
              )}
            </div>
          </div>
        )}

      {/* Reset Button */}
      {selectedAnswer && (
        <div className="mt-6 text-center">
          <Button
            onClick={() => {
              setSelectedAnswer(null);
              setShowExplanation(false);
            }}
            variant="outline"
            className="px-6 py-2"
          >
            Reset & Try Again
          </Button>
        </div>
      )}
    </div>
  );
};
