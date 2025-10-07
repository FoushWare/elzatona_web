'use client';

import React, { useState } from 'react';
import { SectionClientService } from '@/lib/section-client';
import { SectionQuestion } from '@/lib/section-service';
import {
  Plus,
  Trash2,
  Save,
  X,
  AlertCircle,
  CheckCircle,
  Upload,
  Mic,
  MicOff,
} from 'lucide-react';

interface QuestionCreatorProps {
  sectionId: string;
  sectionName: string;
  onQuestionAdded?: (question: SectionQuestion) => void;
  onClose?: () => void;
}

export default function QuestionCreator({
  sectionId,
  sectionName,
  onQuestionAdded,
  onClose,
}: QuestionCreatorProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    type: 'single' as 'single' | 'multiple',
    difficulty: 'easy' as 'easy' | 'medium' | 'hard',
    explanation: '',
    audioQuestion: '',
    audioAnswer: '',
  });

  const [options, setOptions] = useState([
    { id: 'a', text: '', isCorrect: false },
    { id: 'b', text: '', isCorrect: false },
    { id: 'c', text: '', isCorrect: false },
    { id: 'd', text: '', isCorrect: false },
  ]);

  const [questionAudioFile, setQuestionAudioFile] = useState<File | null>(null);
  const [answerAudioFile, setAnswerAudioFile] = useState<File | null>(null);

  const handleOptionChange = (
    index: number,
    field: 'text' | 'isCorrect',
    value: string | boolean
  ) => {
    const newOptions = [...options];
    newOptions[index] = { ...newOptions[index], [field]: value };

    // If this is single choice and we're marking an option as correct, unmark others
    if (field === 'isCorrect' && value === true && formData.type === 'single') {
      newOptions.forEach((option, i) => {
        if (i !== index) option.isCorrect = false;
      });
    }

    setOptions(newOptions);
  };

  const addOption = () => {
    const newId = String.fromCharCode(97 + options.length); // a, b, c, d, e, f, etc.
    setOptions([...options, { id: newId, text: '', isCorrect: false }]);
  };

  const removeOption = (index: number) => {
    if (options.length > 2) {
      const newOptions = options.filter((_, i) => i !== index);
      setOptions(newOptions);
    }
  };

  const handleAudioUpload = async (file: File, type: 'question' | 'answer') => {
    try {
      const uploadFormData = new FormData();
      uploadFormData.append('file', file);
      uploadFormData.append('type', type);
      uploadFormData.append('questionId', `temp_${Date.now()}`);

      const response = await fetch('/api/audio/upload', {
        method: 'POST',
        body: uploadFormData,
      });

      const result = await response.json();

      if (result.success) {
        const audioUrl = String(result.url || '');
        if (type === 'question') {
          setFormData(prev => ({ ...prev, audioQuestion: audioUrl }));
        } else {
          setFormData(prev => ({ ...prev, audioAnswer: audioUrl }));
        }
        return audioUrl;
      } else {
        throw new Error(result.error || 'Upload failed');
      }
    } catch (error) {
      console.error('Audio upload error:', error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.title.trim()) {
      setError('Question title is required');
      return;
    }

    if (!formData.content.trim()) {
      setError('Question content is required');
      return;
    }

    const validOptions = options.filter(opt => opt.text.trim() !== '');
    if (validOptions.length < 2) {
      setError('At least 2 options are required');
      return;
    }

    const correctAnswers = validOptions
      .filter(opt => opt.isCorrect)
      .map(opt => opt.id);
    if (correctAnswers.length === 0) {
      setError('At least one correct answer is required');
      return;
    }

    if (formData.type === 'single' && correctAnswers.length > 1) {
      setError('Single choice questions can only have one correct answer');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Upload audio files if present
      let audioQuestionUrl = formData.audioQuestion;
      let audioAnswerUrl = formData.audioAnswer;

      if (questionAudioFile) {
        audioQuestionUrl = await handleAudioUpload(
          questionAudioFile,
          'question'
        );
      }

      if (answerAudioFile) {
        audioAnswerUrl = await handleAudioUpload(answerAudioFile, 'answer');
      }

      // Create question data
      const questionData: Partial<SectionQuestion> = {
        title: formData.title.trim(),
        content: formData.content.trim(),
        type: formData.type,
        difficulty: formData.difficulty,
        options: validOptions,
        correctAnswers,
        explanation: formData.explanation.trim(),
        audioQuestion: audioQuestionUrl,
        audioAnswer: audioAnswerUrl,
      };

      const result = await SectionClientService.addQuestion(
        sectionId,
        questionData
      );

      if (result.success) {
        setSuccess('Question added successfully!');
        setFormData({
          title: '',
          content: '',
          type: 'single',
          difficulty: 'easy',
          explanation: '',
          audioQuestion: '',
          audioAnswer: '',
        });
        setOptions([
          { id: 'a', text: '', isCorrect: false },
          { id: 'b', text: '', isCorrect: false },
          { id: 'c', text: '', isCorrect: false },
          { id: 'd', text: '', isCorrect: false },
        ]);
        setQuestionAudioFile(null);
        setAnswerAudioFile(null);

        if (onQuestionAdded) {
          onQuestionAdded(result.data as SectionQuestion);
        }
      } else {
        setError(result.error || 'Failed to add question');
      }
    } catch (error) {
      setError('Failed to add question');
    } finally {
      setLoading(false);
    }
  };

  const clearMessages = () => {
    setError(null);
    setSuccess(null);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Add Question to {sectionName}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Create a new question for this learning section
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

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="Enter question title"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Difficulty Level
            </label>
            <select
              value={formData.difficulty}
              onChange={e =>
                setFormData({
                  ...formData,
                  difficulty: e.target.value as 'easy' | 'medium' | 'hard',
                })
              }
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
        </div>

        {/* Question Content */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Question Content *
          </label>
          <textarea
            value={formData.content}
            onChange={e =>
              setFormData({ ...formData, content: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="Enter the question content..."
            rows={4}
            required
          />
        </div>

        {/* Question Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Question Type
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="single"
                checked={formData.type === 'single'}
                onChange={e =>
                  setFormData({
                    ...formData,
                    type: e.target.value as 'single' | 'multiple',
                  })
                }
                className="mr-2"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Single Choice
              </span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="multiple"
                checked={formData.type === 'multiple'}
                onChange={e =>
                  setFormData({
                    ...formData,
                    type: e.target.value as 'single' | 'multiple',
                  })
                }
                className="mr-2"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Multiple Choice
              </span>
            </label>
          </div>
        </div>

        {/* Options */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Answer Options *
            </label>
            <button
              type="button"
              onClick={addOption}
              className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors flex items-center space-x-1"
            >
              <Plus className="w-4 h-4" />
              <span>Add Option</span>
            </button>
          </div>

          <div className="space-y-3">
            {options.map((option, index) => (
              <div key={option.id} className="flex items-center space-x-3">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={option.isCorrect}
                    onChange={e =>
                      handleOptionChange(index, 'isCorrect', e.target.checked)
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
                    handleOptionChange(index, 'text', e.target.value)
                  }
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder={`Option ${option.id.toUpperCase()}`}
                />
                {options.length > 2 && (
                  <button
                    type="button"
                    onClick={() => removeOption(index)}
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
            value={formData.explanation}
            onChange={e =>
              setFormData({ ...formData, explanation: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="Explain why the correct answer is correct..."
            rows={3}
          />
        </div>

        {/* Audio Uploads */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Question Audio (Optional)
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="file"
                accept="audio/*"
                onChange={e =>
                  setQuestionAudioFile(e.target.files?.[0] || null)
                }
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
              {formData.audioQuestion && (
                <div className="flex items-center text-green-600 dark:text-green-400">
                  <Mic className="w-4 h-4 mr-1" />
                  <span className="text-sm">Uploaded</span>
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Answer Audio (Optional)
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="file"
                accept="audio/*"
                onChange={e => setAnswerAudioFile(e.target.files?.[0] || null)}
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
              {formData.audioAnswer && (
                <div className="flex items-center text-green-600 dark:text-green-400">
                  <Mic className="w-4 h-4 mr-1" />
                  <span className="text-sm">Uploaded</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-3">
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
            <span>{loading ? 'Adding...' : 'Add Question'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
