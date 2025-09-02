'use client';

import Link from 'next/link';

export default function HTMLPracticePage() {
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/practice/fundamentals"
            className="text-blue-600 hover:text-blue-800 mb-4 inline-block"
          >
            ← Back to Fundamentals
          </Link>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            HTML Practice
          </h1>
          <p className="text-xl text-muted-foreground">
            Master HTML fundamentals with comprehensive practice questions
          </p>
        </div>

        {/* Temporary message while debugging */}
        <div className="bg-yellow-100 dark:bg-yellow-900/20 border border-yellow-300 dark:border-yellow-700 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
            🚧 Page Under Development
          </h3>
          <p className="text-yellow-700 dark:text-yellow-300 mb-4">
            This page is being updated to fix build issues. Please visit other
            practice pages:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/practice/fundamentals/javascript"
              className="inline-flex items-center justify-center px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
            >
              📝 JavaScript Practice
            </Link>
            <Link
              href="/practice/fundamentals/react"
              className="inline-flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              ⚛️ React Practice
            </Link>
            <Link
              href="/coding"
              className="inline-flex items-center justify-center px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
            >
              💻 Coding Challenges
            </Link>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Practice HTML?</h2>
          <p className="text-blue-100 mb-6">
            Start with our fundamental practice areas to build your skills
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/practice/fundamentals/javascript"
              className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
            >
              🚀 JavaScript Fundamentals
            </Link>
            <Link
              href="/practice/fundamentals/react"
              className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
            >
              ⚛️ React Essentials
            </Link>
            <Link
              href="/coding"
              className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
            >
              💻 Coding Challenges
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
