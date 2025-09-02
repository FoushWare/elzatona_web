'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  codingChallenges,
  getChallengesByCategory,
} from '@/lib/codingChallenges';

export default function CodingPage() {
  const [selectedCategory, setSelectedCategory] = useState<
    'all' | 'frontend' | 'problem-solving'
  >('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<
    'all' | 'easy' | 'medium' | 'hard'
  >('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showStatistics, setShowStatistics] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const filteredChallenges = useMemo(() => {
    let filtered = codingChallenges;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = getChallengesByCategory(selectedCategory);
    }

    // Filter by difficulty
    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(
        challenge => challenge.difficulty === selectedDifficulty
      );
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        challenge =>
          challenge.title.toLowerCase().includes(query) ||
          challenge.description.toLowerCase().includes(query) ||
          challenge.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [selectedCategory, selectedDifficulty, searchQuery]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/20';
      case 'medium':
        return 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/20';
      case 'hard':
        return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/20';
      default:
        return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  const getDifficultyBorder = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'border-green-200 dark:border-green-800';
      case 'medium':
        return 'border-yellow-200 dark:border-yellow-800';
      case 'hard':
        return 'border-red-200 dark:border-red-800';
      default:
        return 'border-gray-200 dark:border-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'frontend':
        return '🎨';
      case 'problem-solving':
        return '🧮';
      default:
        return '💻';
    }
  };

  // const getCategoryColor = (category: string) => {
  //   switch (category) {
  //     case 'frontend':
  //     return 'text-purple-600 dark:text-purple-400';
  //     case 'problem-solving':
  //     return 'text-blue-600 dark:text-blue-400';
  //     default:
  //     return 'text-indigo-600 dark:text-indigo-400';
  //   }
  // };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg">
              <span className="text-4xl">💻</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 dark:from-white dark:via-blue-200 dark:to-indigo-200 bg-clip-text text-transparent mb-6">
              Coding Challenges
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Master frontend development with LeetCode-style challenges. Write
              clean code, solve real problems, and ace your interviews.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filters */}
        <div
          className={`mb-8 space-y-6 transition-all duration-300 ${
            showFilters ? 'block' : 'hidden md:block'
          }`}
        >
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search challenges..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 text-lg"
            />
            <svg
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* Category and Difficulty Filters */}
          <div className="flex flex-wrap gap-4">
            {/* Category Filter */}
            <div className="flex-1 min-w-48">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={e =>
                  setSelectedCategory(
                    e.target.value as 'all' | 'frontend' | 'problem-solving'
                  )
                }
                className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
              >
                <option value="all">All Categories</option>
                <option value="frontend">Frontend Challenges</option>
                <option value="problem-solving">Problem Solving</option>
              </select>
            </div>

            {/* Difficulty Filter */}
            <div className="flex-1 min-w-48">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Difficulty
              </label>
              <select
                value={selectedDifficulty}
                onChange={e =>
                  setSelectedDifficulty(
                    e.target.value as 'all' | 'easy' | 'medium' | 'hard'
                  )
                }
                className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
              >
                <option value="all">All Difficulties</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="mb-8">
          <div className="text-center mb-6">
            {/* Mobile Toggle Buttons - Hidden on desktop */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:hidden">
              <button
                onClick={() => setShowStatistics(!showStatistics)}
                className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200 shadow-sm"
              >
                {showStatistics ? 'Hide Statistics' : 'Show Statistics'}
                <span className="ml-2">📊</span>
              </button>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="inline-flex items-center px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-all duration-200 shadow-sm"
              >
                {showFilters ? 'Hide Filters' : 'Show Filters'}
                <span className="ml-2">🔍</span>
              </button>
            </div>
          </div>

          <div
            className={`grid grid-cols-1 md:grid-cols-4 gap-4 transition-all duration-300 ${
              showStatistics ? 'block' : 'hidden md:grid'
            }`}
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {codingChallenges.length}
              </div>
              <div className="text-gray-600 dark:text-gray-400 text-sm">
                Total Challenges
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">
                {codingChallenges.filter(c => c.difficulty === 'easy').length}
              </div>
              <div className="text-gray-600 dark:text-gray-400 text-sm">
                Easy
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 mb-1">
                {codingChallenges.filter(c => c.difficulty === 'medium').length}
              </div>
              <div className="text-gray-600 dark:text-gray-400 text-sm">
                Medium
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="text-2xl font-bold text-red-600 dark:text-red-400 mb-1">
                {codingChallenges.filter(c => c.difficulty === 'hard').length}
              </div>
              <div className="text-gray-600 dark:text-gray-400 text-sm">
                Hard
              </div>
            </div>
          </div>
        </div>

        {/* Challenges List */}
        {filteredChallenges.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
              No challenges found
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Try adjusting your search criteria or filters.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredChallenges.map(challenge => (
              <Link
                key={challenge.id}
                href={`/coding/${challenge.id}`}
                className="block"
              >
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] hover:border-blue-300 dark:hover:border-blue-600 group">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
                          <span className="text-2xl">
                            {getCategoryIcon(challenge.category)}
                          </span>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2">
                            {challenge.title}
                          </h3>
                          <div className="flex items-center gap-3">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-bold ${getDifficultyColor(challenge.difficulty)} border-2 ${getDifficultyBorder(challenge.difficulty)}`}
                            >
                              {challenge.difficulty.toUpperCase()}
                            </span>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-700`}
                            >
                              {challenge.category
                                .replace('-', ' ')
                                .toUpperCase()}
                            </span>
                          </div>
                        </div>
                      </div>

                      <p className="text-gray-600 dark:text-gray-400 text-base mb-6 leading-relaxed line-clamp-2">
                        {challenge.description}
                      </p>

                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                          <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                            {challenge.estimatedTime}
                          </div>
                          <div className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                            MINUTES
                          </div>
                        </div>
                        <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                          <div className="text-lg font-bold text-green-600 dark:text-green-400">
                            {challenge.completionRate}%
                          </div>
                          <div className="text-xs text-green-600 dark:text-green-400 font-medium">
                            SUCCESS
                          </div>
                        </div>
                        <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                          <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                            {challenge.tags.length}
                          </div>
                          <div className="text-xs text-purple-600 dark:text-purple-400 font-medium">
                            TOPICS
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {challenge.tags.slice(0, 4).map((tag, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 text-gray-700 dark:text-gray-300 text-xs rounded-full font-semibold border border-gray-300 dark:border-gray-600"
                          >
                            {tag}
                          </span>
                        ))}
                        {challenge.tags.length > 4 && (
                          <span className="px-3 py-1 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 text-gray-700 dark:text-gray-300 text-xs rounded-full font-semibold border border-gray-300 dark:border-gray-600">
                            +{challenge.tags.length - 4}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="ml-8 flex flex-col items-end">
                      <div className="text-right mb-6">
                        <div className="text-sm text-gray-500 dark:text-gray-400 mb-1 font-medium">
                          ACCEPTANCE RATE
                        </div>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                          {challenge.completionRate}%
                        </div>
                      </div>

                      <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm font-bold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
                        SOLVE NOW
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 bg-white dark:bg-gray-800 rounded-lg p-8 text-center shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Level Up?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Choose your challenge and start coding now!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/practice/fundamentals"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-sm"
            >
              Practice Questions
            </Link>
            <Link
              href="/study-plans"
              className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-sm"
            >
              Study Plans
            </Link>
            <Link
              href="/learning-paths"
              className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-sm"
            >
              Learning Paths
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
