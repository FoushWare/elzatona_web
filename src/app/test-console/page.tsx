'use client';

import { useEffect } from 'react';

export default function TestConsolePage() {
  useEffect(() => {
    console.log('🚀 useEffect triggered in console test page');
    console.log('✅ This should appear in browser console');
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Console Test Page
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
          Check the browser console for logs.
        </p>
        <div className="mt-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Open browser dev tools and check the console tab.
          </p>
        </div>
      </div>
    </div>
  );
}
