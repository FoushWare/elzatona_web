// v1.0 - Open-ended Question Component with AI Validation

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UnifiedQuestion } from '@/lib/unified-question-schema';

interface OpenEndedQuestionProps {
  question: UnifiedQuestion;
  onAnswer: (
    answer: string,
    validation: { isCorrect: boolean; feedback: string }
  ) => void;
  isAnswered?: boolean;
  userAnswer?: string;
  validationResult?: { isCorrect: boolean; feedback: string } | null;
}

export function OpenEndedQuestion({
  question,
  onAnswer,
  isAnswered = false,
  userAnswer = '',
  validationResult = null,
}: OpenEndedQuestionProps) {
  const [answer, setAnswer] = useState(userAnswer);
  const [isValidating, setIsValidating] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!answer.trim()) {
      setValidationError('Please enter an answer');
      return;
    }

    setIsValidating(true);
    setValidationError(null);

    try {
      const response = await fetch('/api/questions/validate-answer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: question.content,
          userAnswer: answer.trim(),
          expectedAnswer: question.expectedAnswer,
          customPrompt: question.aiValidationPrompt,
          acceptPartialCredit: question.acceptPartialCredit,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to validate answer');
      }

      const data = await response.json();
      onAnswer(answer, data.result);
    } catch (error) {
      console.error('Validation error:', error);
      setValidationError('Failed to validate answer. Please try again.');
    } finally {
      setIsValidating(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80)
      return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-200';
    if (score >= 60)
      return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-200';
    return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-200';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return '🎉';
    if (score >= 60) return '👍';
    return '📚';
  };

  return (
    <div className="space-y-6">
      {/* Question Content */}
      <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {question.title}
        </h3>
        <div className="prose dark:prose-invert max-w-none">
          <div dangerouslySetInnerHTML={{ __html: question.content }} />
        </div>
      </div>

      {/* Answer Input */}
      {!isAnswered && (
        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Your Answer
          </label>
          <textarea
            value={answer}
            onChange={e => setAnswer(e.target.value)}
            className="w-full h-32 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Type your answer here..."
            disabled={isValidating}
          />

          {validationError && (
            <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-red-700 dark:text-red-300 text-sm">
                {validationError}
              </p>
            </div>
          )}

          <div className="mt-4 flex justify-end">
            <motion.button
              onClick={handleSubmit}
              disabled={isValidating || !answer.trim()}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors disabled:cursor-not-allowed flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isValidating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Validating with AI...
                </>
              ) : (
                <>🤖 Validate Answer</>
              )}
            </motion.button>
          </div>
        </div>
      )}

      {/* Validation Result */}
      {isAnswered && validationResult && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
              AI Validation Result
            </h4>
            <div
              className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(validationResult.score)}`}
            >
              {getScoreIcon(validationResult.score)} {validationResult.score}%
            </div>
          </div>

          <div className="space-y-4">
            {/* Your Answer */}
            <div>
              <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Your Answer:
              </h5>
              <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-gray-900 dark:text-white whitespace-pre-wrap">
                  {userAnswer}
                </p>
              </div>
            </div>

            {/* AI Feedback */}
            <div>
              <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                AI Feedback:
              </h5>
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-gray-900 dark:text-white">
                  {validationResult.feedback}
                </p>
              </div>
            </div>

            {/* Suggestions */}
            {validationResult.suggestions &&
              validationResult.suggestions.length > 0 && (
                <div>
                  <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Suggestions:
                  </h5>
                  <ul className="space-y-1">
                    {validationResult.suggestions.map(
                      (suggestion: string, index: number) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300"
                        >
                          <span className="text-blue-500 mt-0.5">•</span>
                          {suggestion}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}

            {/* Explanation */}
            {question.explanation && (
              <div>
                <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Explanation:
                </h5>
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="prose dark:prose-invert max-w-none text-sm">
                    <div
                      dangerouslySetInnerHTML={{ __html: question.explanation }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}
