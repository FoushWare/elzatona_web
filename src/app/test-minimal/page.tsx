'use client';

import { useState, useEffect } from 'react';

export default function TestMinimalPage() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('🚀 TestMinimalPage useEffect triggered');

    const fetchData = async () => {
      try {
        console.log('🔄 Setting loading to true');
        setIsLoading(true);
        setError(null);

        console.log('🔄 Fetching learning paths...');
        const response = await fetch('/api/questions/learning-paths');
        console.log('📡 Response received, parsing JSON...');
        const data = await response.json();

        console.log('📊 Learning paths response:', data);

        if (!data.success) {
          throw new Error(data.error || 'Failed to load learning paths');
        }

        console.log('✅ Data processed successfully');
        setData(data);
        setIsLoading(false);
        console.log('✅ State updates complete');
      } catch (err: any) {
        console.error('❌ Error fetching data:', err);
        setError(err.message || 'Failed to load data');
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Loading test data...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <p className="text-lg text-red-500">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <h1 className="text-3xl font-bold mb-6">Minimal Test Page</h1>
      <p className="mb-4">Data loaded successfully!</p>
      <p className="mb-4">Learning Paths Count: {data?.data?.length || 0}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.data?.slice(0, 5).map((path: any) => (
          <div
            key={path.id}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow"
          >
            <h2 className="text-xl font-semibold">{path.name || path.title}</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Questions: {path.questionCount || 0}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
