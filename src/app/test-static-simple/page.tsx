'use client';

export default function TestStaticSimplePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Static Test Page
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
          This is a completely static page with no hooks or dynamic content.
        </p>
        <div className="mt-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            If you can see this, React is working correctly.
          </p>
        </div>
      </div>
    </div>
  );
}
