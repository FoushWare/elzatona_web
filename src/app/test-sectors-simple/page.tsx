'use client';

import { useState, useEffect } from 'react';

export default function TestSectorsSimplePage() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('🚀 Starting fetch...');
        setIsLoading(true);
        setError(null);

        // Test sectors API
        console.log('🔄 Fetching sectors...');
        const sectorsResponse = await fetch(
          '/api/sectors?learningPathId=javascript-deep-dive'
        );
        console.log('📡 Sectors response:', sectorsResponse);
        const sectorsData = await sectorsResponse.json();
        console.log('📊 Sectors data:', sectorsData);

        // Test learning paths API
        console.log('🔄 Fetching learning paths...');
        const pathsResponse = await fetch('/api/questions/learning-paths');
        console.log('📡 Paths response:', pathsResponse);
        const pathsData = await pathsResponse.json();
        console.log('📊 Paths data:', pathsData);

        setData({
          sectors: sectorsData,
          paths: pathsData,
        });
        setIsLoading(false);
        console.log('✅ Data loaded successfully');
      } catch (err: any) {
        console.error('❌ Error:', err);
        setError(err.message);
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
          <p className="text-lg text-gray-700 dark:text-gray-300">
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
      <h1 className="text-3xl font-bold mb-6">Simple Sectors Test Page</h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Sectors Data</h2>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <pre className="text-sm whitespace-pre-wrap">
            {JSON.stringify(data?.sectors, null, 2)}
          </pre>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Learning Paths Data</h2>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <pre className="text-sm whitespace-pre-wrap">
            {JSON.stringify(data?.paths, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}
