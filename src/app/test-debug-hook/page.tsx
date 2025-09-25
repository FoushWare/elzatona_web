'use client';

import { useLearningPathStatsDebug } from '@/hooks/useLearningPathStatsDebug';
import { Loader2 } from 'lucide-react';

export default function TestDebugHookPage() {
  const { learningPaths, isLoading, error } = useLearningPathStatsDebug();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
        <p className="ml-3 text-lg text-gray-700 dark:text-gray-300">
          Loading debug hook...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <p className="text-lg text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <h1 className="text-3xl font-bold mb-6">Debug Hook Test Page</h1>
      <p className="mb-4">Learning Paths Loaded: {learningPaths.length}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {learningPaths.map(path => (
          <div
            key={path.id}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow"
          >
            <h2 className="text-xl font-semibold">{path.title}</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Questions: {path.questionCount}
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Difficulty: {path.difficulty}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
