'use client';

import { useState, useEffect } from 'react';

export default function TestHydrationPage() {
  const [mounted, setMounted] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('🚀 TestHydrationPage useEffect is running!');
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
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Server-side rendering...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <h1 className="text-3xl font-bold mb-6">Hydration Test Page</h1>
      <div className="space-y-4">
        <p className="text-lg">Mounted: {mounted ? 'Yes' : 'No'}</p>
        <p className="text-lg">Count: {count}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          If you can see this and the count is increasing, React hydration is
          working correctly.
        </p>
      </div>
    </div>
  );
}
