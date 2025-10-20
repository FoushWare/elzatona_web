'use client';

import { useAdminAuth } from '@/contexts/AdminAuthContext';

// import QuestionAudioManager from '@/shared/components/learning/QuestionAudioManager';

export default function AdminQuestionsPage() {
  const { user } = useAdminAuth();

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
      {/* Header */}
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-gray-900 dark:text-white'>
          Question Management
        </h1>
        <p className='text-gray-600 dark:text-gray-400 mt-2'>
          Manage questions and audio files for all learning paths
        </p>
      </div>

      {/* Question Audio Manager */}
      {/* <QuestionAudioManager learningPathId="frontend-basics" /> */}
    </div>
  );
}
