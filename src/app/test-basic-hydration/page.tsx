'use client';

import { useState, useEffect } from 'react';

export default function TestBasicHydrationPage() {
  const [mounted, setMounted] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('🚀 Basic hydration test - useEffect running');
    setMounted(true);

    const interval = setInterval(() => {
      setCount(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Server-side rendering...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Basic Hydration Test
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
          Client-side hydrated! Count: {count}
        </p>
        <div className="mt-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            If you can see this and the count is increasing, React hydration is
            working correctly.
          </p>
        </div>
      </div>
    </div>
  );
}
