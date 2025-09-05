'use client';

import { useState, useMemo } from 'react';
import { sampleChallenges } from '@/lib/challenges';
import { Difficulty, Category } from '@/types/challenge';
import Link from 'next/link';

export default function CodingPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<
    Difficulty | 'all'
  >('all');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>(
    'all'
  );
  const [sortBy, setSortBy] = useState<'difficulty' | 'title' | 'category'>(
    'difficulty'
  );

  const challenges = sampleChallenges;

  // Filter and search challenges
  const filteredChallenges = useMemo(() => {
    const filtered = challenges.filter(challenge => {
      const matchesSearch =
        challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        challenge.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDifficulty =
        selectedDifficulty === 'all' ||
        challenge.difficulty === selectedDifficulty;
      const matchesCategory =
        selectedCategory === 'all' || challenge.category === selectedCategory;

      return matchesSearch && matchesDifficulty && matchesCategory;
    });

    // Sort challenges
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'difficulty':
          const difficultyOrder = { easy: 1, medium: 2, hard: 3 };
          return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
        case 'title':
          return a.title.localeCompare(b.title);
        case 'category':
          return a.category.localeCompare(b.category);
        default:
          return 0;
      }
    });

    return filtered;
  }, [challenges, searchQuery, selectedDifficulty, selectedCategory, sortBy]);

  const getDifficultyColor = (difficulty: Difficulty) => {
    switch (difficulty) {
      case 'easy':
        return 'text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'hard':
        return 'text-red-600 bg-red-100 dark:bg-red-900/20 dark:text-red-400';
    }
  };

  const getDifficultyIcon = (difficulty: Difficulty) => {
    switch (difficulty) {
      case 'easy':
        return '🟢';
      case 'medium':
        return '🟡';
      case 'hard':
        return '🔴';
    }
  };

  const getCategoryIcon = (category: Category) => {
    switch (category) {
      case 'html':
        return '🌐';
      case 'css':
        return '🎨';
      case 'javascript':
        return '⚡';
      case 'react':
        return '⚛️';
    }
  };

  const getCategoryColor = (category: Category) => {
    switch (category) {
      case 'html':
        return 'text-orange-600 bg-orange-100 dark:bg-orange-900/20 dark:text-orange-400';
      case 'css':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400';
      case 'javascript':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'react':
        return 'text-cyan-600 bg-cyan-100 dark:bg-cyan-900/20 dark:text-cyan-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6 tracking-tight drop-shadow-lg">
            💻 Coding Challenges
          </h1>
          <p className="text-2xl text-gray-700 dark:text-gray-200 max-w-4xl mx-auto mb-8 leading-relaxed font-medium">
            Master frontend development with hands-on coding challenges
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl px-6 py-4 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                {challenges.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Total Problems
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl px-6 py-4 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                {challenges.filter(c => c.difficulty === 'easy').length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Easy
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl px-6 py-4 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
                {challenges.filter(c => c.difficulty === 'medium').length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Medium
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl px-6 py-4 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="text-3xl font-bold text-red-600 dark:text-red-400">
                {challenges.filter(c => c.difficulty === 'hard').length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Hard
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                🔍 Search Problems
              </label>
              <input
                type="text"
                placeholder="Search by title or description..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Difficulty Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                📊 Difficulty
              </label>
              <select
                value={selectedDifficulty}
                onChange={e =>
                  setSelectedDifficulty(e.target.value as Difficulty | 'all')
                }
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              >
                <option value="all">All Difficulties</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                🏷️ Category
              </label>
              <select
                value={selectedCategory}
                onChange={e =>
                  setSelectedCategory(e.target.value as Category | 'all')
                }
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              >
                <option value="all">All Categories</option>
                <option value="html">HTML</option>
                <option value="css">CSS</option>
                <option value="javascript">JavaScript</option>
                <option value="react">React</option>
              </select>
            </div>
          </div>

          {/* Sort Options */}
          <div className="mt-4 flex items-center gap-4">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              🔄 Sort by:
            </label>
            <div className="flex gap-2">
              {[
                { value: 'difficulty', label: 'Difficulty' },
                { value: 'title', label: 'Title' },
                { value: 'category', label: 'Category' },
              ].map(option => (
                <button
                  key={option.value}
                  onClick={() =>
                    setSortBy(
                      option.value as 'difficulty' | 'title' | 'category'
                    )
                  }
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    sortBy === option.value
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Showing{' '}
            <span className="font-semibold text-blue-600 dark:text-blue-400">
              {filteredChallenges.length}
            </span>{' '}
            of{' '}
            <span className="font-semibold text-gray-700 dark:text-gray-300">
              {challenges.length}
            </span>{' '}
            problems
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/practice/algorithm-problems"
            className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all duration-200 hover:scale-105 shadow-lg"
          >
            🧮 Algorithm Problems
          </Link>
          <Link
            href="/practice/frontend-challenges"
            className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold rounded-xl transition-all duration-200 hover:scale-105 shadow-lg"
          >
            🎨 Frontend Challenges
          </Link>
        </div>

        {/* Problems Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredChallenges.map(challenge => (
            <Link
              key={challenge.id}
              href={`/coding/${challenge.id}`}
              className="group"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-2xl hover:scale-105 transform transition-all duration-300 cursor-pointer">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">
                      {getCategoryIcon(challenge.category)}
                    </span>
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-bold ${getCategoryColor(challenge.category)}`}
                    >
                      {challenge.category.toUpperCase()}
                    </div>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-xs font-bold ${getDifficultyColor(challenge.difficulty)}`}
                  >
                    {getDifficultyIcon(challenge.difficulty)}{' '}
                    {challenge.difficulty.toUpperCase()}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                  {challenge.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 leading-relaxed">
                  {challenge.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {challenge.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-lg font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                  {challenge.tags.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-lg font-medium">
                      +{challenge.tags.length - 3}
                    </span>
                  )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <span>📝 {challenge.testCases.length} test cases</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <span>⏱️ 15-30 min</span>
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {filteredChallenges.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              No problems found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Try adjusting your search criteria or filters
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedDifficulty('all');
                setSelectedCategory('all');
              }}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors duration-200"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Code?</h2>
            <p className="text-xl mb-6 opacity-90">
              Start with easy problems and work your way up to advanced
              challenges
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/learning-paths"
                className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold hover:bg-gray-100 transition-colors duration-200"
              >
                Start Learning
              </Link>
              <Link
                href="/study-plans"
                className="px-8 py-4 border-2 border-white text-white rounded-xl font-bold hover:bg-white hover:text-blue-600 transition-all duration-200"
              >
                View Study Plans
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
