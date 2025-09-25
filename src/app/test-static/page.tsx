'use client';

export default function TestStaticPage() {
  console.log('🔍 Static page render');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Static Test Page
        </h1>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Static Content
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            This is a static page that should render immediately without any
            hooks or API calls.
          </p>
        </div>

        <div className="grid gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Test Card 1
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              This is a test card with static content.
            </p>
            <div className="flex gap-4 text-sm text-gray-500 dark:text-gray-400">
              <span>Questions: 25</span>
              <span>Difficulty: intermediate</span>
              <span>Time: 50 min</span>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Test Card 2
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              Another test card with static content.
            </p>
            <div className="flex gap-4 text-sm text-gray-500 dark:text-gray-400">
              <span>Questions: 15</span>
              <span>Difficulty: beginner</span>
              <span>Time: 30 min</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
