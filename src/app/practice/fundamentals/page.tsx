'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import {
  getFundamentalCategories,
  getFundamentalsStatistics,
} from '@/lib/fundamentalQuestions';

function FrontendQuestionsPageContent() {
  const categories = getFundamentalCategories();
  const stats = getFundamentalsStatistics();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Frontend Fundamentals
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Master JavaScript, React, CSS, and HTML fundamentals with
            comprehensive practice questions and learning materials
          </p>

          {/* Statistics Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-blue-100 dark:bg-blue-900/20 rounded-lg p-4">
              <div className="text-2xl font-bold text-blue-600">
                {stats.totalQuestions}
              </div>
              <div className="text-sm text-blue-600">Total Questions</div>
            </div>
            <div className="bg-purple-100 dark:bg-purple-900/20 rounded-lg p-4">
              <div className="text-2xl font-bold text-purple-600">
                {stats.totalCategories}
              </div>
              <div className="text-sm text-purple-600">Categories</div>
            </div>
            <div className="bg-green-100 dark:bg-green-900/20 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-600">4</div>
              <div className="text-sm text-green-600">Difficulty Levels</div>
            </div>
            <div className="bg-yellow-100 dark:bg-yellow-900/20 rounded-lg p-4">
              <div className="text-2xl font-bold text-yellow-600">24</div>
              <div className="text-sm text-yellow-600">JavaScript Qs</div>
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {categories.map(category => (
            <div
              key={category.id}
              className={`${category.bgColor} rounded-xl p-6 border-2 border-transparent hover:border-current transition-all duration-300 hover:scale-105`}
            >
              <div className="text-4xl mb-4">{category.icon}</div>
              <h3 className={`text-xl font-bold mb-2 ${category.color}`}>
                {category.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                {category.description}
              </p>

              {/* Question Count */}
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {category.questions.length} Questions
              </div>

              {/* Difficulty Breakdown */}
              <div className="flex gap-2 mb-4">
                <span className="px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 text-xs rounded">
                  {category.difficultyBreakdown.easy} Easy
                </span>
                <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300 text-xs rounded">
                  {category.difficultyBreakdown.medium} Medium
                </span>
                <span className="px-2 py-1 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 text-xs rounded">
                  {category.difficultyBreakdown.hard} Hard
                </span>
              </div>

              {/* Practice Button */}
              <Link
                href={`/practice/fundamentals/${category.id}`}
                className={`inline-flex items-center justify-center w-full px-4 py-2 ${category.color.replace('text-', 'bg-').replace('-600', '-500')} text-white rounded-lg hover:opacity-90 transition-all duration-200 font-medium`}
              >
                Start Practice
              </Link>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Level Up?</h2>
          <p className="text-blue-100 mb-6">
            Choose your category and start practicing with our comprehensive
            question bank
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/coding"
              className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
            >
              💻 Coding Challenges
            </Link>
            <Link
              href="/learning-paths"
              className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
            >
              🗺️ Learning Paths
            </Link>
            <Link
              href="/questions"
              className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
            >
              ❓ Interview Questions
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FrontendQuestionsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mb-4 mx-auto"></div>
            <p className="text-gray-600 dark:text-gray-300">
              Loading frontend fundamentals...
            </p>
          </div>
        </div>
      }
    >
      <FrontendQuestionsPageContent />
    </Suspense>
  );
}
