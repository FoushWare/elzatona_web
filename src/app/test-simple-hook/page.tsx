'use client';

import { useLearningPathStatsSimple } from '@/hooks/useLearningPathStatsSimple';

export default function TestSimpleHookPage() {
  const { learningPaths, isLoading, error } = useLearningPathStatsSimple();

  console.log(
    '🔍 Test page render - isLoading:',
    isLoading,
    'error:',
    error,
    'paths:',
    learningPaths.length
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Loading simple hook...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center p-6 rounded-lg shadow-lg bg-white dark:bg-gray-800">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-700 dark:text-gray-300">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Simple Hook Test
        </h1>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Hook Status
          </h2>
          <div className="space-y-2">
            <p>
              <strong>Loading:</strong> {isLoading ? 'Yes' : 'No'}
            </p>
            <p>
              <strong>Error:</strong> {error || 'None'}
            </p>
            <p>
              <strong>Paths Count:</strong> {learningPaths.length}
            </p>
          </div>
        </div>

        <div className="grid gap-4">
          {learningPaths.map(path => (
            <div
              key={path.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {path.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-2">
                {path.description}
              </p>
              <div className="flex gap-4 text-sm text-gray-500 dark:text-gray-400">
                <span>Questions: {path.questionCount}</span>
                <span>Difficulty: {path.difficulty}</span>
                <span>Time: {path.estimatedTime} min</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
