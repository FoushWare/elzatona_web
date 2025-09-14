import React, { useState, useEffect } from 'react';
import { ClientAudioUploadService } from '@/lib/audio-upload-client';
import { useFirebaseQuestions } from '@/hooks/useFirebaseQuestions';

interface QuestionAudioManagerProps {
  learningPathId: string;
}

export default function QuestionAudioManager({
  learningPathId,
}: QuestionAudioManagerProps) {
  const [selectedQuestionId, setSelectedQuestionId] = useState<string>('');
  const [questionAudioFile, setQuestionAudioFile] = useState<File | null>(null);
  const [answerAudioFile, setAnswerAudioFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({
    question: 0,
    answer: 0,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { questions: firebaseQuestions, loading } =
    useFirebaseQuestions(learningPathId);

  // Filter questions to only show multiple choice questions
  const availableQuestions =
    firebaseQuestions?.filter(
      q =>
        q.type === 'multiple-choice' &&
        q.question &&
        q.options &&
        q.options.length > 0
    ) || [];

  const handleQuestionAudioUpload = async () => {
    if (!selectedQuestionId || !questionAudioFile) {
      setError('Please select a question and audio file');
      return;
    }

    setIsUploading(true);
    setError('');
    setSuccess('');

    try {
      const formData = new FormData();
      formData.append('file', questionAudioFile);
      formData.append('questionId', selectedQuestionId);
      formData.append('type', 'question');

      const response = await fetch('/api/audio/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setSuccess('Question audio uploaded successfully!');
        setQuestionAudioFile(null);
        // TODO: Update question in Firestore with audio URL
      } else {
        setError(result.error || 'Failed to upload question audio');
      }
    } catch (error) {
      setError('An unexpected error occurred');
    } finally {
      setIsUploading(false);
    }
  };

  const handleAnswerAudioUpload = async () => {
    if (!selectedQuestionId || !answerAudioFile) {
      setError('Please select a question and audio file');
      return;
    }

    setIsUploading(true);
    setError('');
    setSuccess('');

    try {
      const formData = new FormData();
      formData.append('file', answerAudioFile);
      formData.append('questionId', selectedQuestionId);
      formData.append('type', 'answer');

      const response = await fetch('/api/audio/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setSuccess('Answer audio uploaded successfully!');
        setAnswerAudioFile(null);
        // TODO: Update question in Firestore with audio URL
      } else {
        setError(result.error || 'Failed to upload answer audio');
      }
    } catch (error) {
      setError('An unexpected error occurred');
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (file: File | null, type: 'question' | 'answer') => {
    if (file) {
      // Validate file size (10MB max)
      if (file.size > 10 * 1024 * 1024) {
        setError('File size must be less than 10MB');
        return;
      }

      // Validate file type
      const allowedTypes = [
        'audio/mpeg',
        'audio/mp3',
        'audio/wav',
        'audio/ogg',
        'audio/m4a',
        'audio/aac',
        'audio/webm',
      ];
      if (!allowedTypes.includes(file.type)) {
        setError(
          'File type not supported. Please use MP3, WAV, OGG, M4A, AAC, or WebM'
        );
        return;
      }
    }

    setError('');
    if (type === 'question') {
      setQuestionAudioFile(file);
    } else {
      setAnswerAudioFile(file);
    }
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Question Audio Manager
        </h3>
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">
            Loading questions...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
        Question Audio Manager
      </h3>

      {/* Success/Error Messages */}
      {success && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-4">
          <p className="text-green-600 dark:text-green-400 text-sm">
            {success}
          </p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4">
          <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
        </div>
      )}

      {/* Question Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Select Question
        </label>
        <select
          value={selectedQuestionId}
          onChange={e => setSelectedQuestionId(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-600 dark:text-white"
        >
          <option value="">Choose a question...</option>
          {availableQuestions.map(question => (
            <option key={question.id} value={question.id}>
              {question.title || question.question?.substring(0, 100) + '...'}
            </option>
          ))}
        </select>
      </div>

      {selectedQuestionId && (
        <div className="space-y-6">
          {/* Question Audio Upload */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-3">
              Question Audio
            </h4>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Upload Question Audio
                </label>
                <input
                  type="file"
                  accept="audio/*"
                  onChange={e =>
                    handleFileChange(e.target.files?.[0] || null, 'question')
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-600 dark:text-white"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Max file size: 10MB. Supported formats: MP3, WAV, OGG, M4A,
                  AAC, WebM
                </p>
              </div>

              {questionAudioFile && (
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {questionAudioFile.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {ClientAudioUploadService.formatFileSize(
                        questionAudioFile.size
                      )}
                    </p>
                  </div>
                  <button
                    onClick={() => setQuestionAudioFile(null)}
                    className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 text-sm"
                  >
                    Remove
                  </button>
                </div>
              )}

              <button
                onClick={handleQuestionAudioUpload}
                disabled={!questionAudioFile || isUploading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-2 px-4 rounded-lg transition-colors"
              >
                {isUploading ? 'Uploading...' : 'Upload Question Audio'}
              </button>
            </div>
          </div>

          {/* Answer Audio Upload */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-3">
              Answer Audio
            </h4>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Upload Answer Audio
                </label>
                <input
                  type="file"
                  accept="audio/*"
                  onChange={e =>
                    handleFileChange(e.target.files?.[0] || null, 'answer')
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-600 dark:text-white"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Max file size: 10MB. Supported formats: MP3, WAV, OGG, M4A,
                  AAC, WebM
                </p>
              </div>

              {answerAudioFile && (
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {answerAudioFile.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {ClientAudioUploadService.formatFileSize(
                        answerAudioFile.size
                      )}
                    </p>
                  </div>
                  <button
                    onClick={() => setAnswerAudioFile(null)}
                    className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 text-sm"
                  >
                    Remove
                  </button>
                </div>
              )}

              <button
                onClick={handleAnswerAudioUpload}
                disabled={!answerAudioFile || isUploading}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-2 px-4 rounded-lg transition-colors"
              >
                {isUploading ? 'Uploading...' : 'Upload Answer Audio'}
              </button>
            </div>
          </div>
        </div>
      )}

      {availableQuestions.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-600 dark:text-gray-400">
            No questions available for this learning path.
          </p>
        </div>
      )}
    </div>
  );
}
