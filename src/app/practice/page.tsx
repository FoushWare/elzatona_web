'use client';

import { useState } from 'react';
import Link from 'next/link';

interface PracticeCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  href: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  challengeCount: number;
  estimatedTime: string;
  topics: string[];
}

const practiceCategories: PracticeCategory[] = [
  {
    id: 'frontend-challenges',
    title: 'Frontend Challenges',
    description:
      'Comprehensive frontend development challenges covering React, JavaScript, CSS, DOM manipulation, and responsive design',
    icon: '⚡',
    href: '/practice/frontend-challenges',
    difficulty: 'Intermediate',
    challengeCount: 10,
    estimatedTime: '2-3 hours',
    topics: [
      'React',
      'JavaScript',
      'CSS',
      'DOM Manipulation',
      'Responsive Design',
    ],
  },
  {
    id: 'algorithm-problems',
    title: 'Algorithm Problems',
    description:
      'Data structures and algorithm challenges to improve problem-solving skills and prepare for technical interviews',
    icon: '🧮',
    href: '/practice/algorithm-problems',
    difficulty: 'Advanced',
    challengeCount: 20,
    estimatedTime: '3-4 hours',
    topics: [
      'Arrays',
      'Strings',
      'Trees',
      'Dynamic Programming',
      'Hash Tables',
    ],
  },
];

const difficultyColors = {
  Beginner: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  Intermediate:
    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  Advanced: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
};

export default function PracticePage() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredCategories = practiceCategories.filter(category => {
    const matchesDifficulty =
      selectedDifficulty === 'all' ||
      category.difficulty === selectedDifficulty;
    const matchesSearch =
      category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.topics.some(topic =>
        topic.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesDifficulty && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            💻 Practice Challenges
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Master frontend development through hands-on coding challenges.
            Build real-world skills with interactive problems and solutions.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search challenges..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
          <div className="flex gap-2">
            {['all', 'Beginner', 'Intermediate', 'Advanced'].map(difficulty => (
              <button
                key={difficulty}
                onClick={() => setSelectedDifficulty(difficulty)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedDifficulty === difficulty
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                {difficulty === 'all' ? 'All Levels' : difficulty}
              </button>
            ))}
          </div>
        </div>

        {/* Practice Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map(category => (
            <Link
              key={category.id}
              href={category.href}
              className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">{category.icon}</div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${difficultyColors[category.difficulty]}`}
                  >
                    {category.difficulty}
                  </span>
                </div>

                {/* Title and Description */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {category.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {category.description}
                </p>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <span>📊 {category.challengeCount} challenges</span>
                  <span>⏱️ {category.estimatedTime}</span>
                </div>

                {/* Topics */}
                <div className="flex flex-wrap gap-2">
                  {category.topics.slice(0, 3).map(topic => (
                    <span
                      key={topic}
                      className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-md"
                    >
                      {topic}
                    </span>
                  ))}
                  {category.topics.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-md">
                      +{category.topics.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Hover Effect */}
              <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </Link>
          ))}
        </div>

        {/* Quick Start Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Coding?</h2>
          <p className="text-xl mb-6 opacity-90">
            Choose your practice area and begin your coding journey with
            hands-on challenges
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/practice/frontend-challenges"
              className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              ⚡ Frontend Challenges
            </Link>
            <Link
              href="/practice/algorithm-problems"
              className="px-8 py-3 bg-purple-700 text-white rounded-lg font-semibold hover:bg-purple-800 transition-colors border border-purple-500"
            >
              🧮 Algorithm Problems
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
