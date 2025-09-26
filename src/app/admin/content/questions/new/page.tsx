'use client';

import React, { useState } from 'react';

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
    category: '',
    learningPath: '',
    sector: '',
    topicId: '', // Add topic selection
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

  const [isPlaying, setIsPlaying] = useState({
    question: false,
    answer: false,
  });

  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const addOption = () => {
    const newId = String.fromCharCode(97 + options.length); // a, b, c, d, etc.
    setOptions([...options, { id: newId, text: '', isCorrect: false }]);
  };

  const removeOption = (id: string) => {
    if (options.length > 2) {
      setOptions(options.filter(option => option.id !== id));
    }
  };

  const updateOption = (
    id: string,
    field: keyof QuestionOption,
    value: any
  ) => {
    setOptions(
      options.map(option =>
        option.id === id ? { ...option, [field]: value } : option
      )
    );
  };

  const handleAudioUpload = async (type: 'question' | 'answer', file: File) => {
    setIsUploading(true);
    setError(null);

    try {
      const audioService = new ClientAudioUploadService();
      const url = await audioService.uploadAudio(file);

      setAudioUrls(prev => ({ ...prev, [type]: url }));
      setAudioFiles(prev => ({ ...prev, [type]: file }));
    } catch (err) {
      setError(
        `Failed to upload ${type} audio: ${err instanceof Error ? err.message : 'Unknown error'}`
      );
    } finally {
      setIsUploading(false);
    }
  };

  const handleAudioPlay = async (type: 'question' | 'answer') => {
    const url = audioUrls[type];
    if (!url) return;

    try {
      const audio = new Audio(url);
      audio.onended = () => setIsPlaying(prev => ({ ...prev, [type]: false }));

      if (isPlaying[type]) {
        audio.pause();
        setIsPlaying(prev => ({ ...prev, [type]: false }));
      } else {
        await audio.play();
        setIsPlaying(prev => ({ ...prev, [type]: true }));
      }
    } catch (err) {
      setError(
        `Failed to play ${type} audio: ${err instanceof Error ? err.message : 'Unknown error'}`
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Validate form
      if (!formData.title.trim()) {
        throw new Error('Question title is required');
      }
      if (!formData.content.trim()) {
        throw new Error('Question content is required');
      }
      if (options.length < 2) {
        throw new Error('At least 2 options are required');
      }
      if (options.some(opt => !opt.text.trim())) {
        throw new Error('All options must have text');
      }
      if (!options.some(opt => opt.isCorrect)) {
        throw new Error('At least one option must be marked as correct');
      }

      // Prepare question data
      const questionData = {
        title: formData.title.trim(),
        content: formData.content.trim(),
        type: formData.type,
        section: formData.section,
        difficulty: formData.difficulty,
        explanation: formData.explanation.trim(),
        category: formData.category.trim(),
        learningPath: formData.learningPath.trim(),
        sector: formData.sector.trim(),
        topicId: formData.topicId || undefined,
        options: options.map(opt => ({
          id: opt.id,
          text: opt.text.trim(),
          isCorrect: opt.isCorrect,
        })),
        audioUrls: {
          question: audioUrls.question || undefined,
          answer: audioUrls.answer || undefined,
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Submit to API
      const response = await fetch('/api/questions/unified', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(questionData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create question');
      }

      // Backup to local storage
      try {
        const backupService = new BackupClientService();
        await backupService.backupQuestion(questionData);
      } catch (backupErr) {
        console.warn('Failed to backup question:', backupErr);
      }

      setSuccess(true);
      setTimeout(() => {
        window.location.href = '/admin/content/questions';
      }, 2000);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to create question'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center py-8">
          <div className="text-green-600 text-6xl mb-4">✓</div>
          <h1 className="text-2xl font-bold text-green-600 mb-2">
            Question Created!
          </h1>
          <p className="text-muted-foreground">
            Redirecting to questions list...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/content/questions">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Questions
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Add New Question</h1>
          <p className="text-muted-foreground mt-2">
            Create a new question for the system
          </p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Basic Info */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Question Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={e =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter question title..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Question Content *
              </label>
              <textarea
                value={formData.content}
                onChange={e =>
                  setFormData({ ...formData, content: e.target.value })
                }
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter the question content..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Explanation
              </label>
              <textarea
                value={formData.explanation}
                onChange={e =>
                  setFormData({ ...formData, explanation: e.target.value })
                }
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter explanation for the answer..."
              />
            </div>
          </div>

          {/* Right Column - Configuration */}
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type
                </label>
                <select
                  value={formData.type}
                  onChange={e =>
                    setFormData({
                      ...formData,
                      type: e.target.value as 'single' | 'multiple',
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="single">Single Choice</option>
                  <option value="multiple">Multiple Choice</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={e =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., JavaScript, React"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Learning Path
                </label>
                <input
                  type="text"
                  value={formData.learningPath}
                  onChange={e =>
                    setFormData({ ...formData, learningPath: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., frontend-basics"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Section
                </label>
                <select
                  value={formData.section}
                  onChange={e =>
                    setFormData({ ...formData, section: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="learning">Learning</option>
                  <option value="practice">Practice</option>
                  <option value="assessment">Assessment</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sector
                </label>
                <input
                  type="text"
                  value={formData.sector}
                  onChange={e =>
                    setFormData({ ...formData, sector: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., fundamentals"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Topic ID (Optional)
              </label>
              <input
                type="text"
                value={formData.topicId}
                onChange={e =>
                  setFormData({ ...formData, topicId: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., closure-in-javascript"
              />
            </div>
          </div>
        </div>

        {/* Options Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Answer Options</h3>
            <Button
              type="button"
              onClick={addOption}
              variant="outline"
              size="sm"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Option
            </Button>
          </div>

          {options.map((option, index) => (
            <div
              key={option.id}
              className="flex items-center gap-4 p-4 border rounded-lg"
            >
              <div className="flex items-center gap-2">
                <input
                  type={formData.type === 'single' ? 'radio' : 'checkbox'}
                  name={
                    formData.type === 'single'
                      ? 'correct'
                      : `correct-${option.id}`
                  }
                  checked={option.isCorrect}
                  onChange={e =>
                    updateOption(option.id, 'isCorrect', e.target.checked)
                  }
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                />
                <span className="font-medium">{option.id.toUpperCase()}</span>
              </div>
              <input
                type="text"
                value={option.text}
                onChange={e => updateOption(option.id, 'text', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={`Option ${option.id.toUpperCase()}...`}
              />
              {options.length > 2 && (
                <Button
                  type="button"
                  onClick={() => removeOption(option.id)}
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </div>

        {/* Audio Upload Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Audio Files (Optional)</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Question Audio
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="file"
                  accept="audio/*"
                  onChange={e => {
                    const file = e.target.files?.[0];
                    if (file) handleAudioUpload('question', file);
                  }}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {audioUrls.question && (
                  <Button
                    type="button"
                    onClick={() => handleAudioPlay('question')}
                    variant="outline"
                    size="sm"
                  >
                    {isPlaying.question ? (
                      <Pause className="h-4 w-4" />
                    ) : (
                      <Play className="h-4 w-4" />
                    )}
                  </Button>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Answer Audio
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="file"
                  accept="audio/*"
                  onChange={e => {
                    const file = e.target.files?.[0];
                    if (file) handleAudioUpload('answer', file);
                  }}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {audioUrls.answer && (
                  <Button
                    type="button"
                    onClick={() => handleAudioPlay('answer')}
                    variant="outline"
                    size="sm"
                  >
                    {isPlaying.answer ? (
                      <Pause className="h-4 w-4" />
                    ) : (
                      <Play className="h-4 w-4" />
                    )}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end gap-4">
          <Link href="/admin/content/questions">
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </Link>
          <Button
            type="submit"
            disabled={isSubmitting || isUploading}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Creating...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Create Question
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
