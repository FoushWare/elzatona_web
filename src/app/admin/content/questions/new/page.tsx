'use client';

import React, { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { ClientAudioUploadService } from '@/lib/audio-upload-client';
import { BackupClientService } from '@/lib/backup-client';
import {
  Plus,
  Trash2,
  Upload,
  Play,
  Pause,
  Volume2,
  Save,
  ArrowLeft,
} from 'lucide-react';
import Link from 'next/link';

interface QuestionOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export default function NewQuestionPage() {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    type: 'single' as 'single' | 'multiple',
    section: 'learning',
    difficulty: 'easy' as 'easy' | 'medium' | 'hard',
    explanation: '',
  });

  const [options, setOptions] = useState<QuestionOption[]>([
    { id: 'a', text: '', isCorrect: false },
    { id: 'b', text: '', isCorrect: false },
  ]);

  const [audioFiles, setAudioFiles] = useState({
    question: null as File | null,
    answer: null as File | null,
  });

  const [audioUrls, setAudioUrls] = useState({
    question: '',
    answer: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const sections = [
    { id: 'learning', name: 'Learning' },
    { id: 'practice', name: 'Practice' },
    { id: 'interview-prep', name: 'Interview Prep' },
    { id: 'media', name: 'Media' },
  ];

  const difficulties = [
    { id: 'easy', name: 'Easy' },
    { id: 'medium', name: 'Medium' },
    { id: 'hard', name: 'Hard' },
  ];

  const addOption = () => {
    const newId = String.fromCharCode(97 + options.length); // a, b, c, d...
    setOptions([...options, { id: newId, text: '', isCorrect: false }]);
  };

  const removeOption = (index: number) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index));
    }
  };

  const updateOption = (
    index: number,
    field: keyof QuestionOption,
    value: string | boolean
  ) => {
    const newOptions = [...options];
    newOptions[index] = { ...newOptions[index], [field]: value };
    setOptions(newOptions);
  };

  const handleAudioUpload = async (type: 'question' | 'answer', file: File) => {
    try {
      setLoading(true);
      const result = await ClientAudioUploadService.uploadQuestionAudio(
        'temp-question-id',
        file
      );

      if (result.success) {
        setAudioUrls(prev => ({ ...prev, [type]: result.url! }));
        setAudioFiles(prev => ({ ...prev, [type]: file }));
        setSuccess(`${type} audio uploaded successfully!`);
      } else {
        setError(result.error || 'Failed to upload audio');
      }
    } catch (err) {
      setError('Failed to upload audio file');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Validate form
      if (!formData.title.trim()) {
        throw new Error('Question title is required');
      }

      if (!formData.content.trim()) {
        throw new Error('Question content is required');
      }

      if (options.some(opt => !opt.text.trim())) {
        throw new Error('All options must have text');
      }

      const correctAnswers = options.filter(opt => opt.isCorrect);
      if (correctAnswers.length === 0) {
        throw new Error('At least one option must be marked as correct');
      }

      if (formData.type === 'single' && correctAnswers.length > 1) {
        throw new Error(
          'Single choice questions can only have one correct answer'
        );
      }

      // Create question object
      const question = {
        ...formData,
        options,
        correctAnswers: correctAnswers.map(opt => opt.id),
        audioQuestion: audioUrls.question,
        audioAnswer: audioUrls.answer,
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true,
      };

      // Here you would save to your database
      console.log('Creating question:', question);

      // Backup the question to its section file
      try {
        const backupResult = await BackupClientService.backupQuestion({
          ...question,
          id: `question_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          createdAt: question.createdAt.toISOString(),
          updatedAt: question.updatedAt.toISOString(),
        });

        if (backupResult.success) {
          console.log('Question backed up successfully:', backupResult);
        } else {
          console.warn('Failed to backup question:', backupResult.error);
        }
      } catch (backupError) {
        console.error('Backup error:', backupError);
      }

      setSuccess('Question created and backed up successfully!');

      // Reset form
      setFormData({
        title: '',
        content: '',
        type: 'single',
        section: 'learning',
        difficulty: 'easy',
        explanation: '',
      });
      setOptions([
        { id: 'a', text: '', isCorrect: false },
        { id: 'b', text: '', isCorrect: false },
      ]);
      setAudioFiles({ question: null, answer: null });
      setAudioUrls({ question: '', answer: '' });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to create question'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-4 mb-4">
              <Link
                href="/admin/content/questions"
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Create New Question
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Add a new question with audio support and multi-choice options
                </p>
              </div>
            </div>
          </div>

          {/* Success/Error Messages */}
          {success && (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-6">
              <p className="text-green-600 dark:text-green-400 text-sm">
                {success}
              </p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
              <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              {/* Basic Information */}
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Basic Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Question Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={e =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="Enter question title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Section *
                  </label>
                  <select
                    value={formData.section}
                    onChange={e =>
                      setFormData({ ...formData, section: e.target.value })
                    }
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  >
                    {sections.map(section => (
                      <option key={section.id} value={section.id}>
                        {section.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Question Type *
                  </label>
                  <select
                    value={formData.type}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        type: e.target.value as 'single' | 'multiple',
                      })
                    }
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  >
                    <option value="single">Single Choice</option>
                    <option value="multiple">Multiple Choice</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Difficulty *
                  </label>
                  <select
                    value={formData.difficulty}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        difficulty: e.target.value as
                          | 'easy'
                          | 'medium'
                          | 'hard',
                      })
                    }
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  >
                    {difficulties.map(difficulty => (
                      <option key={difficulty.id} value={difficulty.id}>
                        {difficulty.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Question Content *
                </label>
                <textarea
                  value={formData.content}
                  onChange={e =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  required
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Enter the question content"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Explanation
                </label>
                <textarea
                  value={formData.explanation}
                  onChange={e =>
                    setFormData({ ...formData, explanation: e.target.value })
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Explain why the correct answer is correct"
                />
              </div>
            </div>

            {/* Answer Options */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Answer Options
                </h2>
                <button
                  type="button"
                  onClick={addOption}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Option</span>
                </button>
              </div>

              <div className="space-y-4">
                {options.map((option, index) => (
                  <div key={option.id} className="flex items-center space-x-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Option {option.id.toUpperCase()}
                      </label>
                      <input
                        type="text"
                        value={option.text}
                        onChange={e =>
                          updateOption(index, 'text', e.target.value)
                        }
                        required
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        placeholder={`Enter option ${option.id}`}
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={option.isCorrect}
                          onChange={e =>
                            updateOption(index, 'isCorrect', e.target.checked)
                          }
                          className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                          Correct
                        </span>
                      </label>
                      {options.length > 2 && (
                        <button
                          type="button"
                          onClick={() => removeOption(index)}
                          className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-200"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Audio Files */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Audio Files (Optional)
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Question Audio */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Question Audio
                  </label>
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                    {audioFiles.question ? (
                      <div className="space-y-2">
                        <Volume2 className="w-8 h-8 text-green-500 mx-auto" />
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {audioFiles.question.name}
                        </p>
                        {audioUrls.question && (
                          <button
                            type="button"
                            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-200"
                          >
                            <Play className="w-4 h-4 mx-auto" />
                          </button>
                        )}
                      </div>
                    ) : (
                      <div>
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          Upload question audio
                        </p>
                        <input
                          type="file"
                          accept="audio/*"
                          onChange={e => {
                            const file = e.target.files?.[0];
                            if (file) handleAudioUpload('question', file);
                          }}
                          className="hidden"
                          id="question-audio"
                        />
                        <label
                          htmlFor="question-audio"
                          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 cursor-pointer"
                        >
                          Choose File
                        </label>
                      </div>
                    )}
                  </div>
                </div>

                {/* Answer Audio */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Answer Audio
                  </label>
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                    {audioFiles.answer ? (
                      <div className="space-y-2">
                        <Volume2 className="w-8 h-8 text-green-500 mx-auto" />
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {audioFiles.answer.name}
                        </p>
                        {audioUrls.answer && (
                          <button
                            type="button"
                            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-200"
                          >
                            <Play className="w-4 h-4 mx-auto" />
                          </button>
                        )}
                      </div>
                    ) : (
                      <div>
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          Upload answer audio
                        </p>
                        <input
                          type="file"
                          accept="audio/*"
                          onChange={e => {
                            const file = e.target.files?.[0];
                            if (file) handleAudioUpload('answer', file);
                          }}
                          className="hidden"
                          id="answer-audio"
                        />
                        <label
                          htmlFor="answer-audio"
                          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 cursor-pointer"
                        >
                          Choose File
                        </label>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <Link
                href="/admin/content/questions"
                className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Creating...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Create Question</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}
