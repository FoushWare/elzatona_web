'use client';

import React, { useState } from 'react';
import { SectionClientService } from '@/lib/section-client';
import { BulkQuestionData } from '@/lib/section-service';
import {
  Upload,
  FileText,
  Download,
  AlertCircle,
  CheckCircle,
  X,
  Plus,
  Trash2,
  Save,
} from 'lucide-react';

interface BulkQuestionUploaderProps {
  sectionId: string;
  sectionName: string;
  onQuestionsAdded?: (questions: unknown[]) => void;
  onClose?: () => void;
}

export default function BulkQuestionUploader({
  sectionId,
  sectionName,
  onQuestionsAdded,
  onClose,
}: BulkQuestionUploaderProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [questions, setQuestions] = useState<BulkQuestionData[]>([
    {
      title: '',
      content: '',
      type: 'single',
      difficulty: 'easy',
      options: [
        { id: 'a', text: '', isCorrect: false },
        { id: 'b', text: '', isCorrect: false },
        { id: 'c', text: '', isCorrect: false },
        { id: 'd', text: '', isCorrect: false },
      ],
      correctAnswers: [],
      explanation: '',
    },
  ]);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        title: '',
        content: '',
        type: 'single',
        difficulty: 'easy',
        options: [
          { id: 'a', text: '', isCorrect: false },
          { id: 'b', text: '', isCorrect: false },
          { id: 'c', text: '', isCorrect: false },
          { id: 'd', text: '', isCorrect: false },
        ],
        correctAnswers: [],
        explanation: '',
      },
    ]);
  };

  const removeQuestion = (index: number) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((_, i) => i !== index));
    }
  };

  const updateQuestion = (
    index: number,
    field: keyof BulkQuestionData,
    value: string | 'single' | 'multiple' | 'easy' | 'medium' | 'hard'
  ) => {
    const newQuestions = [...questions];
    newQuestions[index] = { ...newQuestions[index], [field]: value };
    setQuestions(newQuestions);
  };

  const updateOption = (
    questionIndex: number,
    optionIndex: number,
    field: 'text' | 'isCorrect',
    value: string | boolean
  ) => {
    const newQuestions = [...questions];
    const question = newQuestions[questionIndex];
    const newOptions = [...question.options];
    newOptions[optionIndex] = { ...newOptions[optionIndex], [field]: value };

    // If this is single choice and we're marking an option as correct, unmark others
    if (field === 'isCorrect' && value === true && question.type === 'single') {
      newOptions.forEach((option, i) => {
        if (i !== optionIndex) option.isCorrect = false;
      });
    }

    question.options = newOptions;
    question.correctAnswers = newOptions
      .filter(opt => opt.isCorrect)
      .map(opt => opt.id);
    setQuestions(newQuestions);
  };

  const addOption = (questionIndex: number) => {
    const newQuestions = [...questions];
    const question = newQuestions[questionIndex];
    const newId = String.fromCharCode(97 + question.options.length);
    question.options = [
      ...question.options,
      { id: newId, text: '', isCorrect: false },
    ];
    setQuestions(newQuestions);
  };

  const removeOption = (questionIndex: number, optionIndex: number) => {
    const newQuestions = [...questions];
    const question = newQuestions[questionIndex];
    if (question.options.length > 2) {
      question.options = question.options.filter((_, i) => i !== optionIndex);
      question.correctAnswers = question.options
        .filter(opt => opt.isCorrect)
        .map(opt => opt.id);
      setQuestions(newQuestions);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    const validQuestions = questions.filter(
      q =>
        q.title.trim() &&
        q.content.trim() &&
        q.options.some(opt => opt.text.trim()) &&
        q.options.some(opt => opt.isCorrect)
    );

    if (validQuestions.length === 0) {
      setError('At least one complete question is required');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const result = await SectionClientService.addBulkQuestions(
        sectionId,
        validQuestions
      );

      if (result.success) {
        setSuccess(`${validQuestions.length} questions added successfully!`);
        setQuestions([
          {
            title: '',
            content: '',
            type: 'single',
            difficulty: 'easy',
            options: [
              { id: 'a', text: '', isCorrect: false },
              { id: 'b', text: '', isCorrect: false },
              { id: 'c', text: '', isCorrect: false },
              { id: 'd', text: '', isCorrect: false },
            ],
            correctAnswers: [],
            explanation: '',
          },
        ]);

        if (onQuestionsAdded) {
          onQuestionsAdded(result.data);
        }
      } else {
        setError(result.error || 'Failed to add questions');
      }
    } catch (error) {
      setError('Failed to add questions');
    } finally {
      setLoading(false);
    }
  };

  const downloadTemplate = () => {
    const template = {
      questions: [
        {
          title: 'Sample Question Title',
          content: 'What is the correct answer?',
          type: 'single',
          difficulty: 'easy',
          options: [
            { id: 'a', text: 'Option A', isCorrect: true },
            { id: 'b', text: 'Option B', isCorrect: false },
            { id: 'c', text: 'Option C', isCorrect: false },
            { id: 'd', text: 'Option D', isCorrect: false },
          ],
          correctAnswers: ['a'],
          explanation: 'This is the correct answer because...',
        },
      ],
    };

    const blob = new Blob([JSON.stringify(template, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bulk-questions-template.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const clearMessages = () => {
    setError(null);
    setSuccess(null);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-h-[80vh] overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Bulk Add Questions to {sectionName}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Add multiple questions at once. Incomplete questions will be saved
            for later editing.
          </p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        )}
      </div>

      {/* Messages */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mr-2" />
            <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
          </div>
        </div>
      )}

      {success && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" />
            <p className="text-green-600 dark:text-green-400 text-sm">
              {success}
            </p>
          </div>
        </div>
      )}

      {/* Template Download */}
      <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-blue-900 dark:text-blue-100">
              Need a template?
            </h3>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Download our JSON template to see the expected format
            </p>
          </div>
          <button
            onClick={downloadTemplate}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Download Template</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {questions.map((question, questionIndex) => (
          <div
            key={questionIndex}
            className="border border-gray-200 dark:border-gray-700 rounded-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Question {questionIndex + 1}
              </h3>
              {questions.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeQuestion(questionIndex)}
                  className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="space-y-4">
              {/* Question Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Question Title
                </label>
                <input
                  type="text"
                  value={question.title}
                  onChange={e =>
                    updateQuestion(questionIndex, 'title', e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Enter question title"
                />
              </div>

              {/* Question Content */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Question Content
                </label>
                <textarea
                  value={question.content}
                  onChange={e =>
                    updateQuestion(questionIndex, 'content', e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Enter the question content..."
                  rows={3}
                />
              </div>

              {/* Question Type and Difficulty */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Question Type
                  </label>
                  <select
                    value={question.type}
                    onChange={e =>
                      updateQuestion(questionIndex, 'type', e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  >
                    <option value="single">Single Choice</option>
                    <option value="multiple">Multiple Choice</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Difficulty Level
                  </label>
                  <select
                    value={question.difficulty}
                    onChange={e =>
                      updateQuestion(
                        questionIndex,
                        'difficulty',
                        e.target.value
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
              </div>

              {/* Options */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Answer Options
                  </label>
                  <button
                    type="button"
                    onClick={() => addOption(questionIndex)}
                    className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors flex items-center space-x-1"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Option</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {question.options.map((option, optionIndex) => (
                    <div
                      key={option.id}
                      className="flex items-center space-x-3"
                    >
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={option.isCorrect}
                          onChange={e =>
                            updateOption(
                              questionIndex,
                              optionIndex,
                              'isCorrect',
                              e.target.checked
                            )
                          }
                          className="mr-2"
                        />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 w-6">
                          {option.id.toUpperCase()}.
                        </span>
                      </div>
                      <input
                        type="text"
                        value={option.text}
                        onChange={e =>
                          updateOption(
                            questionIndex,
                            optionIndex,
                            'text',
                            e.target.value
                          )
                        }
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        placeholder={`Option ${option.id.toUpperCase()}`}
                      />
                      {question.options.length > 2 && (
                        <button
                          type="button"
                          onClick={() =>
                            removeOption(questionIndex, optionIndex)
                          }
                          className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Explanation */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Explanation
                </label>
                <textarea
                  value={question.explanation}
                  onChange={e =>
                    updateQuestion(questionIndex, 'explanation', e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Explain why the correct answer is correct..."
                  rows={2}
                />
              </div>
            </div>
          </div>
        ))}

        {/* Add Question Button */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={addQuestion}
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add Another Question</span>
          </button>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700">
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white rounded-lg transition-colors flex items-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>
              {loading ? 'Adding...' : `Add ${questions.length} Questions`}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}
