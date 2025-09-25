'use client';

import { useState, useEffect } from 'react';

export default function TestUseEffectSimplePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    console.log('🚀 useEffect triggered in test page');

    // Simulate a delay without making any API calls
    const timer = setTimeout(() => {
      console.log('✅ Timer completed, updating state');
      setIsLoading(false);
      setMessage('useEffect is working correctly!');
    }, 1000);

    return () => {
      console.log('🧹 Cleanup function called');
      clearTimeout(timer);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Testing useEffect...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          useEffect Test Page
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
          {message}
        </p>
        <div className="mt-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Check the browser console for useEffect logs.
          </p>
        </div>
      </div>
    </div>
  );
}
