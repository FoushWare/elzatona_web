'use client';

import { useAdminAuth } from '@/hooks/useAdminAuth';

import QuestionAudioManager from '@/components/QuestionAudioManager';

export default function AdminAudioPage() {
  useAdminAuth();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Audio Management
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Upload and manage audio files for questions and answers
        </p>
      </div>

      {/* Audio Upload Instructions */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
          📁 Local Audio Storage
        </h3>
        <p className="text-blue-800 dark:text-blue-200 text-sm mb-4">
          Audio files are stored locally in your project&apos;s{' '}
          <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded">
            public/audio/
          </code>{' '}
          directory. This is a free alternative to Firebase Storage.
        </p>
        <div className="text-blue-800 dark:text-blue-200 text-sm">
          <p>
            <strong>Supported formats:</strong> MP3, WAV, OGG, M4A, AAC, WebM
          </p>
          <p>
            <strong>Max file size:</strong> 10MB per file
          </p>
          <p>
            <strong>Storage location:</strong>{' '}
            <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded">
              public/audio/questions/
            </code>{' '}
            and{' '}
            <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded">
              public/audio/answers/
            </code>
          </p>
        </div>
      </div>

      {/* Question Audio Manager */}
      <QuestionAudioManager learningPathId="frontend-basics" />
    </div>
  );
}
