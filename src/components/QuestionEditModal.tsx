'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { UnifiedQuestion } from '@/lib/unified-question-schema';
import { useUnifiedQuestions } from '@/hooks/useUnifiedQuestions';

interface QuestionEditModalProps {
  question: UnifiedQuestion;
  learningPaths: Array<{ id: string; name: string }>;
  onClose: () => void;
  onSuccess: () => void;
}

export function QuestionEditModal({
  question,
  learningPaths,
  onClose,
  onSuccess,
}: QuestionEditModalProps) {
  const { updateQuestion } = useUnifiedQuestions();

  const [formData, setFormData] = useState({
    content: question.content,
    type: question.type,
    explanation: question.explanation,
    learningPath: question.learningPath,
    category: question.category,
    difficulty: question.difficulty,
    audioQuestion: question.audioQuestion || '',
    audioAnswer: question.audioAnswer || '',
    showQuestionAudio: question.showQuestionAudio ?? true,
    showAnswerAudio: question.showAnswerAudio ?? true,
    // Open-ended question fields
    expectedAnswer: question.expectedAnswer || '',
    aiValidationPrompt: question.aiValidationPrompt || '',
    acceptPartialCredit: question.acceptPartialCredit ?? true,
  });

  const [options, setOptions] = useState(question.options);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const categories = [
    'JavaScript',
    'CSS',
    'React',
    'TypeScript',
    'Testing',
    'Performance',
    'Security',
    'HTML',
    'Node.js',
    'General',
  ];

  const difficulties = [
    { value: 'easy', label: 'Easy' },
    { value: 'medium', label: 'Medium' },
    { value: 'hard', label: 'Hard' },
  ] as const;

  const handleOptionChange = (
    index: number,
    field: 'text' | 'isCorrect',
    value: string | boolean
  ) => {
    const newOptions = [...options];
    newOptions[index] = {
      ...newOptions[index],
      [field]: value,
    };
    setOptions(newOptions);
  };

  const addOption = () => {
    const newOption = {
      id: `opt${options.length + 1}`,
      text: '',
      isCorrect: false,
    };
    setOptions([...options, newOption]);
  };

  const removeOption = (index: number) => {
    if (options.length > 2) {
      const newOptions = options.filter((_, i) => i !== index);
      setOptions(newOptions);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.content.trim()) {
      setError('Question content is required');
      return;
    }

    // Validation for non-open-ended questions
    if (formData.type !== 'open-ended') {
      if (options.length < 2) {
        setError('At least 2 options are required');
        return;
      }

      const correctOptions = options.filter(opt => opt.isCorrect);
      if (correctOptions.length === 0) {
        setError('At least one option must be marked as correct');
        return;
      }

      if (formData.type === 'single' && correctOptions.length > 1) {
        setError('Single choice questions can only have one correct answer');
        return;
      }
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const updatedQuestion: Partial<UnifiedQuestion> = {
        content: formData.content,
        type: formData.type,
        options: options,
        explanation: formData.explanation,
        learningPath: formData.learningPath,
        category: formData.category,
        difficulty: formData.difficulty,
        audioQuestion: formData.audioQuestion || undefined,
        audioAnswer: formData.audioAnswer || undefined,
        showQuestionAudio: formData.showQuestionAudio,
        showAnswerAudio: formData.showAnswerAudio,
        // Open-ended question fields
        expectedAnswer: formData.expectedAnswer || undefined,
        aiValidationPrompt: formData.aiValidationPrompt || undefined,
        acceptPartialCredit: formData.acceptPartialCredit,
      };

      await updateQuestion(question.id, updatedQuestion);
      onSuccess();
      onClose();
    } catch (err) {
      setError('Error updating question. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Edit Question
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
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
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]"
        >
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Learning Path
              </label>
              <select
                value={formData.learningPath}
                onChange={e =>
                  setFormData({ ...formData, learningPath: e.target.value })
                }
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
              >
                {learningPaths.map(path => (
                  <option key={path.id} value={path.id}>
                    {path.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category
              </label>
              <select
                value={formData.category}
                onChange={e =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Difficulty
              </label>
              <select
                value={formData.difficulty}
                onChange={e =>
                  setFormData({
                    ...formData,
                    difficulty: e.target.value as 'easy' | 'medium' | 'hard',
                  })
                }
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
              >
                {difficulties.map(diff => (
                  <option key={diff.value} value={diff.value}>
                    {diff.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Question Content */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Question Content
            </label>
            <textarea
              value={formData.content}
              onChange={e =>
                setFormData({ ...formData, content: e.target.value })
              }
              className="w-full h-32 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
              placeholder="Enter your question here..."
              required
            />
          </div>

          {/* Question Type */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Question Type
            </label>
            <div className="flex gap-4 flex-wrap">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="single"
                  checked={formData.type === 'single'}
                  onChange={e =>
                    setFormData({
                      ...formData,
                      type: e.target.value as
                        | 'single'
                        | 'multiple'
                        | 'text'
                        | 'code'
                        | 'open-ended',
                    })
                  }
                  className="mr-2"
                />
                Single Choice
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="multiple"
                  checked={formData.type === 'multiple'}
                  onChange={e =>
                    setFormData({
                      ...formData,
                      type: e.target.value as
                        | 'single'
                        | 'multiple'
                        | 'text'
                        | 'code'
                        | 'open-ended',
                    })
                  }
                  className="mr-2"
                />
                Multiple Choice
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="open-ended"
                  checked={formData.type === 'open-ended'}
                  onChange={e =>
                    setFormData({
                      ...formData,
                      type: e.target.value as
                        | 'single'
                        | 'multiple'
                        | 'text'
                        | 'code'
                        | 'open-ended',
                    })
                  }
                  className="mr-2"
                />
                Open-ended (AI Validated)
              </label>
            </div>
          </div>

          {/* Options */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Answer Options
              </label>
              <button
                type="button"
                onClick={addOption}
                className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
              >
                Add Option
              </button>
            </div>

            <div className="space-y-3">
              {options.map((option, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 border border-gray-300 dark:border-gray-600 rounded-lg"
                >
                  <input
                    type="checkbox"
                    checked={option.isCorrect}
                    onChange={e =>
                      handleOptionChange(index, 'isCorrect', e.target.checked)
                    }
                    className="w-4 h-4"
                  />
                  <input
                    type="text"
                    value={option.text}
                    onChange={e =>
                      handleOptionChange(index, 'text', e.target.value)
                    }
                    className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder={`Option ${index + 1}`}
                  />
                  {options.length > 2 && (
                    <button
                      type="button"
                      onClick={() => removeOption(index)}
                      className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Explanation */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Explanation
            </label>
            <textarea
              value={formData.explanation}
              onChange={e =>
                setFormData({ ...formData, explanation: e.target.value })
              }
              className="w-full h-24 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
              placeholder="Enter explanation for the correct answer..."
              required
            />
          </div>

          {/* Audio Files */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Question Audio Path
              </label>
              <input
                type="text"
                value={formData.audioQuestion}
                onChange={e =>
                  setFormData({ ...formData, audioQuestion: e.target.value })
                }
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="/audio/learning-path/questions/question-1.mp3"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Answer Audio Path
              </label>
              <input
                type="text"
                value={formData.audioAnswer}
                onChange={e =>
                  setFormData({ ...formData, audioAnswer: e.target.value })
                }
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="/audio/learning-path/questions/answer-1.mp3"
              />
            </div>
          </div>

          {/* Audio Display Controls */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Audio Display Controls
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="showQuestionAudio"
                  checked={formData.showQuestionAudio}
                  onChange={e =>
                    setFormData({
                      ...formData,
                      showQuestionAudio: e.target.checked,
                    })
                  }
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="showQuestionAudio"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Show Question Audio Button
                </label>
              </div>
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="showAnswerAudio"
                  checked={formData.showAnswerAudio}
                  onChange={e =>
                    setFormData({
                      ...formData,
                      showAnswerAudio: e.target.checked,
                    })
                  }
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="showAnswerAudio"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Show Answer Audio Button
                </label>
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              💡 Tip: For code questions, you might want to disable question
              audio but keep answer audio enabled.
            </p>
          </div>

          {/* Open-ended Question Fields */}
          {formData.type === 'open-ended' && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                AI Validation Settings
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Expected Answer (Optional)
                  </label>
                  <textarea
                    value={formData.expectedAnswer}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        expectedAnswer: e.target.value,
                      })
                    }
                    className="w-full h-24 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                    placeholder="Enter the expected answer or key points that should be covered..."
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    This helps the AI provide better validation feedback.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Custom AI Validation Prompt (Optional)
                  </label>
                  <textarea
                    value={formData.aiValidationPrompt}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        aiValidationPrompt: e.target.value,
                      })
                    }
                    className="w-full h-20 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                    placeholder="Custom instructions for AI validation (e.g., 'Focus on technical accuracy', 'Check for specific concepts')"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Leave empty to use default validation logic.
                  </p>
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="acceptPartialCredit"
                    checked={formData.acceptPartialCredit}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        acceptPartialCredit: e.target.checked,
                      })
                    }
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="acceptPartialCredit"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Accept Partial Credit
                  </label>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  🤖 AI will validate answers and provide detailed feedback with
                  scoring.
                </p>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-red-700 dark:text-red-300">{error}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Updating...' : 'Update Question'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
