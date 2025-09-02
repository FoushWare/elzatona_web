'use client';

export default function CodingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6 tracking-tight drop-shadow-lg">
            💻 Coding Challenges
          </h1>
          <p className="text-2xl text-gray-700 dark:text-gray-200 max-w-4xl mx-auto mb-10 leading-relaxed font-medium">
            Master frontend development with hands-on coding challenges
          </p>

          <div className="bg-yellow-100 dark:bg-yellow-900/20 border border-yellow-300 dark:border-yellow-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
              🚧 Page Under Development
            </h3>
            <p className="text-yellow-700 dark:text-yellow-300">
              This page is being updated to fix build issues. The full
              functionality will be restored soon.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
