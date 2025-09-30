'use client';

import { useState, useEffect } from 'react';

export default function SimpleHookTestPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Simple hook test useEffect triggered');

    const fetchData = async () => {
      try {
        console.log('Fetching data...');
        const response = await fetch('/api/questions/learning-paths');
        const result = await response.json();
        console.log('Data received:', result);
        setData(result);
        setLoading(false);
      } catch (err) {
        console.error('Error:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log('Render - loading:', loading, 'error:', error, 'data:', data);

  if (loading) {
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
      <h1 className="text-3xl font-bold mb-6">Simple Hook Test Page</h1>
      <div className="mb-4">
        <p>
          <strong>Loading:</strong> {loading ? 'true' : 'false'}
        </p>
        <p>
          <strong>Error:</strong> {error || 'none'}
        </p>
        <p>
          <strong>Data Success:</strong> {data?.success ? 'true' : 'false'}
        </p>
        <p>
          <strong>Data Count:</strong> {data?.data?.length || 0}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.data?.slice(0, 5).map((path: any) => (
          <div key={path.id} className="border p-4 rounded-lg">
            <h3 className="font-bold">{path.name}</h3>
            <p className="text-sm text-gray-600">{path.description}</p>
            <p className="text-sm">Questions: {path.questionCount}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
