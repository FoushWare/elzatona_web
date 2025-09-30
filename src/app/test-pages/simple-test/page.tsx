'use client';

import React, { useState, useEffect } from 'react';

export default function SimpleTestPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        console.log('Simple test: Starting fetch...');
        const response = await fetch('/api/learning-paths');
        console.log('Simple test: Response status:', response.status);

        const result = await response.json();
        console.log('Simple test: Result:', result);

        setData(result);
        setLoading(false);
      } catch (err) {
        console.error('Simple test: Error:', err);
        setError(err.message);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-4">Simple Test Page</h1>

      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-2">Direct API Call:</h2>
        <p>Loading: {loading ? 'true' : 'false'}</p>
        <p>Error: {error || 'none'}</p>
        <p>Data: {data ? JSON.stringify(data, null, 2) : 'none'}</p>

        {data && (
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Raw Response:</h3>
            <pre className="bg-gray-100 p-2 rounded text-sm overflow-auto max-h-96">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
