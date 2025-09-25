'use client';

import { useState, useEffect } from 'react';

export default function TestNoContextsPage() {
  const [mounted, setMounted] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('🚀 No contexts test: useEffect running!');
    setMounted(true);

    const interval = setInterval(() => {
      setCount(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Server-side rendering...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          No Contexts Test
        </h1>
        <p className="text-lg text-gray-700 mb-4">
          Mounted: {mounted ? 'Yes' : 'No'}
        </p>
        <p className="text-lg text-gray-700 mb-4">Count: {count}</p>
        <div className="mt-8 p-4 bg-white rounded-lg shadow">
          <p className="text-sm text-gray-600">
            If you can see this and the count is increasing, hydration is
            working!
          </p>
        </div>
      </div>
    </div>
  );
}
