'use client';

import { useLearningPathStats } from '@/hooks/useLearningPathStats';

export default function DebugHookPage() {
  const { learningPaths, isLoading, error } = useLearningPathStats();

  console.log('Debug Hook - isLoading:', isLoading);
  console.log('Debug Hook - error:', error);
  console.log('Debug Hook - learningPaths:', learningPaths);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-700">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-700">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">Debug Hook Page</h1>
      <div className="mb-4">
        <p>
          <strong>Loading:</strong> {isLoading ? 'true' : 'false'}
        </p>
        <p>
          <strong>Error:</strong> {error || 'none'}
        </p>
        <p>
          <strong>Learning Paths Count:</strong> {learningPaths.length}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {learningPaths.map(path => (
          <div key={path.id} className="border p-4 rounded-lg">
            <h3 className="font-bold">{path.title}</h3>
            <p className="text-sm text-gray-600">{path.description}</p>
            <p className="text-sm">Questions: {path.questionCount}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
