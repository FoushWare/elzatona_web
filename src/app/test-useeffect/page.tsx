'use client';

import { useEffect, useState } from 'react';

export default function TestUseEffectPage() {
  const [count, setCount] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    console.log('🚀 useEffect is running!');
    setMounted(true);
    setCount(1);
  }, []);

  console.log('🔄 Component rendering, mounted:', mounted, 'count:', count);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          useEffect Test Page
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
          Mounted: {mounted ? 'Yes' : 'No'}
        </p>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
          Count: {count}
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
