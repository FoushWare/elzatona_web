'use client';

import { useState } from 'react';
import { JavaScriptQuestion } from '@/lib/javascriptQuestions';

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
        return 'bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-800/30 border-green-400 dark:border-green-500 text-green-800 dark:text-green-200 shadow-lg';
      }
      if (isSelected && !isCorrectAnswer) {
        return 'bg-gradient-to-r from-red-100 to-pink-100 dark:from-red-900/30 dark:to-pink-800/30 border-red-400 dark:border-red-500 text-red-800 dark:text-red-200 shadow-lg';
      }
    }

    if (isSelected) {
      return 'bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-800/30 border-blue-400 dark:border-blue-500 text-blue-800 dark:text-blue-200 shadow-lg';
    }

    return 'bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-300 dark:border-yellow-600 text-yellow-800 dark:text-yellow-200 hover:from-yellow-100 hover:to-orange-100 dark:hover:from-yellow-800/30 dark:hover:to-orange-800/30 hover:border-yellow-400 dark:hover:border-yellow-500';
  };

  return (
    <div className="bg-gradient-to-br from-white to-yellow-50 dark:from-gray-800 dark:to-yellow-900/20 border-4 border-yellow-200 dark:border-yellow-700 rounded-3xl p-8 space-y-8 shadow-2xl hover:shadow-3xl transition-all duration-300">
      {/* Question Header - Enhanced Design */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-2xl text-sm font-black shadow-lg border-2 border-yellow-300">
            Question {question.id}
          </div>
          <div className="text-sm text-yellow-700 dark:text-yellow-300 font-bold bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 px-3 py-1 rounded-xl border border-yellow-300 dark:border-yellow-600">
            JavaScript Interview
          </div>
        </div>
        {showAnswer && (
          <div
            className={`px-4 py-2 rounded-2xl text-sm font-black shadow-lg border-2 ${
              isCorrect
                ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white border-green-300'
                : 'bg-gradient-to-r from-red-400 to-pink-500 text-white border-red-300'
            }`}
          >
            {isCorrect ? '✅ Correct!' : '❌ Incorrect'}
          </div>
        )}
      </div>

      {/* Question Text - Enhanced Design */}
      <div className="bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 p-6 rounded-2xl border-2 border-yellow-300 dark:border-yellow-600 shadow-lg">
        <h3 className="text-xl font-black text-yellow-800 dark:text-yellow-200 leading-relaxed">
          {question.question}
        </h3>
      </div>

      {/* Code Block - Enhanced Design */}
      {question.code && (
        <div className="bg-gradient-to-r from-gray-900 to-slate-800 border-4 border-yellow-400 dark:border-yellow-500 rounded-2xl p-6 shadow-2xl">
          <div className="flex items-center justify-between mb-4">
            <span className="text-yellow-300 font-bold text-sm">
              💻 Code Example
            </span>
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
          </div>
          <pre className="text-sm text-yellow-100 overflow-x-auto font-mono">
            <code>{question.code}</code>
          </pre>
        </div>
      )}

      {/* Options - Enhanced Design */}
      <div className="space-y-4">
        <h4 className="font-black text-xl text-yellow-800 dark:text-yellow-200 bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 px-4 py-2 rounded-xl border-2 border-yellow-300 dark:border-yellow-600 shadow-md">
          🎯 Select the correct answer:
        </h4>
        <div className="space-y-3">
          {question.options.map((option, index) => {
            const optionLabel = getOptionLabel(index);
            return (
              <button
                key={index}
                onClick={() => onAnswerSelect?.(optionLabel)}
                disabled={showAnswer}
                className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-300 transform hover:scale-[1.02] ${getOptionStyle(
                  index
                )} ${!showAnswer ? 'cursor-pointer hover:shadow-lg' : 'cursor-default'}`}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full border-2 border-current flex items-center justify-center text-sm font-black shadow-md">
                    {optionLabel}
                  </div>
                  <div className="flex-1 text-base font-semibold leading-relaxed">
                    {option}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Answer and Explanation - Enhanced Design */}
      {showAnswer && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-800/30 border-4 border-green-300 dark:border-green-600 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center space-x-3 mb-3">
              <span className="text-green-700 dark:text-green-300 font-black text-lg">
                🎯 Correct Answer:
              </span>
              <span className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-xl text-lg font-black shadow-lg border-2 border-green-400">
                {question.answer}
              </span>
            </div>
            <p className="text-green-800 dark:text-green-200 text-base font-semibold leading-relaxed">
              {question.options[question.answer.charCodeAt(0) - 65]}
            </p>
          </div>

          <div className="border-4 border-yellow-300 dark:border-yellow-600 rounded-2xl shadow-xl overflow-hidden">
            <button
              onClick={() => setShowExplanation(!showExplanation)}
              className="w-full p-5 text-left flex items-center justify-between bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 hover:from-yellow-200 hover:to-orange-200 dark:hover:from-yellow-800/40 dark:hover:to-orange-800/40 transition-all duration-300"
            >
              <span className="font-black text-xl text-yellow-800 dark:text-yellow-200">
                📚 Explanation
              </span>
              <svg
                className={`w-6 h-6 text-yellow-600 dark:text-yellow-400 transition-transform duration-300 ${
                  showExplanation ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {showExplanation && (
              <div className="px-6 pb-6 bg-gradient-to-br from-white to-yellow-50 dark:from-gray-800 dark:to-yellow-900/20">
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <div
                    className="text-yellow-800 dark:text-yellow-200 text-base leading-relaxed font-medium"
                    dangerouslySetInnerHTML={{
                      __html: question.explanation.replace(
                        /\`([^\`]+)\`/g,
                        '<code class="bg-yellow-200 dark:bg-yellow-800 px-2 py-1 rounded text-sm font-bold text-yellow-900 dark:text-yellow-100">$1</code>'
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
