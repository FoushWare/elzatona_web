'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function JSQuestionsPage() {
  const [showStatistics, setShowStatistics] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 dark:from-gray-900 dark:via-yellow-900/20 dark:to-orange-900/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header - Simplified for debugging */}
        <div className="mb-12 text-center">
          <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 bg-clip-text text-transparent mb-6 tracking-tight drop-shadow-lg">
            JavaScript Fundamentals
          </h1>
          <p className="text-2xl text-gray-700 dark:text-gray-200 max-w-4xl mx-auto mb-10 leading-relaxed font-medium">
            Test your JavaScript knowledge with comprehensive interview
            questions
          </p>

          {/* Mobile Toggle Button */}
          <div className="flex justify-center mt-8 md:hidden">
            <button
              onClick={() => setShowStatistics(!showStatistics)}
              className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 hover:from-yellow-500 hover:via-orange-600 hover:to-red-600 text-white font-black text-lg rounded-2xl transition-all duration-300 transform hover:scale-110 shadow-xl hover:shadow-2xl border-2 border-transparent hover:border-yellow-300"
            >
              {showStatistics ? '🙈 Hide' : '📊 Show'} Statistics
              <span className="ml-3 text-2xl animate-pulse">✨</span>
            </button>
          </div>
        </div>

        {/* Temporary message while debugging */}
        <div className="bg-yellow-100 dark:bg-yellow-900/20 border border-yellow-300 dark:border-yellow-700 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
            🚧 Page Under Development
          </h3>
          <p className="text-yellow-700 dark:text-yellow-300 mb-4">
            This page is being updated to fix build issues. The full
            functionality will be restored soon.
          </p>
          <div className="space-y-3">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              In the meantime, you can:
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/coding"
                className="inline-flex items-center px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white text-sm font-medium rounded-lg transition-colors"
              >
                Try Coding Challenges
              </Link>
              <Link
                href="/practice/fundamentals"
                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
              >
                Practice Other Fundamentals
              </Link>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Practice?</h2>
          <p className="text-blue-100 mb-6">
            JavaScript fundamentals are essential for frontend development
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/coding"
              className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
            >
              💻 Coding Challenges
            </Link>
            <Link
              href="/practice/fundamentals"
              className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
            >
              🔄 Back to Fundamentals
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
