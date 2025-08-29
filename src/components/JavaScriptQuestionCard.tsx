"use client";

import { useState } from "react";
import { JavaScriptQuestion } from "@/lib/javascriptQuestions";

interface JavaScriptQuestionCardProps {
  question: JavaScriptQuestion;
  showAnswer?: boolean;
  onAnswerSelect?: (selectedAnswer: string) => void;
  selectedAnswer?: string;
  isCorrect?: boolean;
}

export default function JavaScriptQuestionCard({
  question,
  showAnswer = false,
  onAnswerSelect,
  selectedAnswer,
  isCorrect,
}: JavaScriptQuestionCardProps) {
  const [showExplanation, setShowExplanation] = useState(false);

  const getOptionLabel = (index: number) => {
    return String.fromCharCode(65 + index); // A, B, C, D, etc.
  };

  const getOptionStyle = (index: number) => {
    const optionLabel = getOptionLabel(index);
    const isSelected = selectedAnswer === optionLabel;
    const isCorrectAnswer = question.answer === optionLabel;

    if (showAnswer) {
      if (isCorrectAnswer) {
        return "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200";
      }
      if (isSelected && !isCorrectAnswer) {
        return "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200";
      }
    }

    if (isSelected) {
      return "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200";
    }

    return "bg-card border-border hover:border-border/60 text-card-foreground hover:bg-muted/50";
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-6">
      {/* Question Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full text-sm font-medium">
            Question {question.id}
          </div>
          <div className="text-sm text-muted-foreground">
            JavaScript Interview
          </div>
        </div>
        {showAnswer && (
          <div
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              isCorrect
                ? "bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400"
                : "bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400"
            }`}
          >
            {isCorrect ? "Correct!" : "Incorrect"}
          </div>
        )}
      </div>

      {/* Question Text */}
      <div>
        <h3 className="text-lg font-semibold text-card-foreground mb-4">
          {question.question}
        </h3>
      </div>

      {/* Code Block */}
      {question.code && (
        <div className="bg-muted border border-border rounded-lg p-4">
          <pre className="text-sm text-card-foreground overflow-x-auto">
            <code>{question.code}</code>
          </pre>
        </div>
      )}

      {/* Options */}
      <div className="space-y-3">
        <h4 className="font-medium text-card-foreground">
          Select the correct answer:
        </h4>
        <div className="space-y-2">
          {question.options.map((option, index) => {
            const optionLabel = getOptionLabel(index);
            return (
              <button
                key={index}
                onClick={() => onAnswerSelect?.(optionLabel)}
                disabled={showAnswer}
                className={`w-full text-left p-4 rounded-lg border transition-colors ${getOptionStyle(
                  index
                )} ${!showAnswer ? "cursor-pointer" : "cursor-default"}`}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full border-2 border-current flex items-center justify-center text-xs font-medium">
                    {optionLabel}
                  </div>
                  <div className="flex-1 text-sm">{option}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Answer and Explanation */}
      {showAnswer && (
        <div className="space-y-4">
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-green-600 dark:text-green-400 font-medium">
                Correct Answer:
              </span>
              <span className="bg-green-600 dark:bg-green-400 text-white px-2 py-1 rounded text-sm font-medium">
                {question.answer}
              </span>
            </div>
            <p className="text-green-800 dark:text-green-200 text-sm">
              {question.options[question.answer.charCodeAt(0) - 65]}
            </p>
          </div>

          <div className="border border-border rounded-lg">
            <button
              onClick={() => setShowExplanation(!showExplanation)}
              className="w-full p-4 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
            >
              <span className="font-medium text-card-foreground">
                Explanation
              </span>
              <svg
                className={`w-5 h-5 text-muted-foreground transition-transform ${
                  showExplanation ? "rotate-180" : ""
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

            {showExplanation && (
              <div className="px-4 pb-4">
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <div
                    className="text-muted-foreground text-sm leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: question.explanation.replace(
                        /\`([^\`]+)\`/g,
                        '<code class="bg-muted px-1 py-0.5 rounded text-xs">$1</code>'
                      ),
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
