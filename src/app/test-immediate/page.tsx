'use client';

import { useState } from 'react';

export default function TestImmediatePage() {
  const [message, setMessage] = useState('Initial message');

  // This will run immediately when the component mounts
  if (message === 'Initial message') {
    setMessage('Updated immediately!');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Immediate Test Page
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
          Message: {message}
        </p>
        <div className="mt-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            This should show "Updated immediately!" if React is working.
          </p>
        </div>
      </div>
    </div>
  );
}
