'use client';

import { useState, useMemo } from 'react';
import { multipleChoiceQuestions } from '@/lib/multipleChoiceQuestions';
import Link from 'next/link';

export default function JSQuestionsPage() {
  const [showStatistics, setShowStatistics] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState<
    'all' | 'easy' | 'medium' | 'hard'
  >('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter JavaScript questions
  const javascriptQuestions = useMemo(() => {
    return multipleChoiceQuestions.filter(q => q.category === 'javascript');
  }, []);

  // Filter and search questions
  const filteredQuestions = useMemo(() => {
    const filtered = javascriptQuestions.filter(question => {
      const matchesSearch = question.question
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesDifficulty =
        selectedDifficulty === 'all' ||
        question.difficulty === selectedDifficulty;

      return matchesSearch && matchesDifficulty;
    });

    // Sort by difficulty
    filtered.sort((a, b) => {
      const difficultyOrder = { easy: 1, medium: 2, hard: 3 };
      return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
    });

    return filtered;
  }, [javascriptQuestions, searchQuery, selectedDifficulty]);

  const getDifficultyColor = (difficulty: 'easy' | 'medium' | 'hard') => {
    switch (difficulty) {
      case 'easy':
        return 'text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'hard':
        return 'text-red-600 bg-red-100 dark:bg-red-900/20 dark:text-red-400';
    }
  };

  const getDifficultyIcon = (difficulty: 'easy' | 'medium' | 'hard') => {
    switch (difficulty) {
      case 'easy':
        return '🟢';
      case 'medium':
        return '🟡';
      case 'hard':
        return '🔴';
    }
  };

  const getDifficultyCount = (difficulty: 'easy' | 'medium' | 'hard') => {
    return javascriptQuestions.filter(q => q.difficulty === difficulty).length;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 dark:from-gray-900 dark:via-yellow-900/20 dark:to-orange-900/20">
      <div className="container mx-auto px-4 py-8">
        {/* Enhanced Header */}
        <div className="mb-12 text-center">
          <div className="w-32 h-32 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl animate-pulse">
            <span className="text-6xl">⚡</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 bg-clip-text text-transparent mb-6 tracking-tight drop-shadow-lg">
            JavaScript Fundamentals
          </h1>
          <p className="text-2xl text-gray-700 dark:text-gray-200 max-w-4xl mx-auto mb-10 leading-relaxed font-medium">
            Master JavaScript with interactive interview questions and hands-on
            practice
          </p>

          {/* Enhanced Mobile Toggle Button */}
          <div className="flex justify-center mt-8 md:hidden">
            <button
              onClick={() => setShowStatistics(!showStatistics)}
              className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white rounded-xl font-bold transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              {showStatistics ? '📊 Hide Statistics' : '📊 Show Statistics'}
              <span className="text-lg">{showStatistics ? '👆' : '👇'}</span>
            </button>
          </div>
        </div>

        {/* Statistics Dashboard */}
        <div
          className={`grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 transition-all duration-500 ${
            showStatistics ? 'block' : 'hidden md:grid'
          }`}
        >
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
            <div className="text-4xl font-bold mb-2">
              {javascriptQuestions.length}
            </div>
            <div className="text-blue-100 font-semibold">Total Questions</div>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
            <div className="text-4xl font-bold mb-2">
              {getDifficultyCount('easy')}
            </div>
            <div className="text-green-100 font-semibold">Easy</div>
          </div>
          <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
            <div className="text-4xl font-bold mb-2">
              {getDifficultyCount('medium')}
            </div>
            <div className="text-yellow-100 font-semibold">Medium</div>
          </div>
          <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
            <div className="text-4xl font-bold mb-2">
              {getDifficultyCount('hard')}
            </div>
            <div className="text-red-100 font-semibold">Hard</div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                🔍 Search Questions
              </label>
              <input
                type="text"
                placeholder="Search by question content..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
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
                  setSelectedDifficulty(
                    e.target.value as 'all' | 'easy' | 'medium' | 'hard'
                  )
                }
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
              >
                <option value="all">All Difficulties</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Showing{' '}
            <span className="font-semibold text-yellow-600 dark:text-yellow-400">
              {filteredQuestions.length}
            </span>{' '}
            of{' '}
            <span className="font-semibold text-gray-700 dark:text-gray-300">
              {javascriptQuestions.length}
            </span>{' '}
            questions
          </p>
        </div>

        {/* Questions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {filteredQuestions.map((question, index) => (
            <div
              key={question.id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-2xl hover:scale-105 transform transition-all duration-300 cursor-pointer group"
            >
              {/* Question Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {index + 1}
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-xs font-bold ${getDifficultyColor(question.difficulty)}`}
                  >
                    {getDifficultyIcon(question.difficulty)}{' '}
                    {question.difficulty.toUpperCase()}
                  </div>
                </div>
                <div className="text-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                  💭
                </div>
              </div>

              {/* Question Content */}
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 leading-relaxed group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors duration-200">
                {question.question}
              </h3>

              {/* Options Preview */}
              <div className="space-y-2 mb-4">
                {question.options.slice(0, 2).map((option, optionIndex) => (
                  <div
                    key={optionIndex}
                    className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
                  >
                    <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {String.fromCharCode(65 + optionIndex)}
                    </div>
                    <span className="text-sm text-gray-700 dark:text-gray-300 truncate">
                      {option}
                    </span>
                  </div>
                ))}
                {question.options.length > 2 && (
                  <div className="text-center text-sm text-gray-500 dark:text-gray-400 py-2">
                    +{question.options.length - 2} more options
                  </div>
                )}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {question.tags.slice(0, 3).map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-3 py-1 bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/20 dark:to-orange-900/20 text-yellow-800 dark:text-yellow-200 text-xs rounded-full font-medium border border-yellow-200 dark:border-yellow-700"
                  >
                    {tag}
                  </span>
                ))}
                {question.tags.length > 3 && (
                  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full font-medium">
                    +{question.tags.length - 3}
                  </span>
                )}
              </div>

              {/* Action Button */}
              <Link
                href={`/questions/javascript/${question.id}`}
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white py-3 px-6 rounded-xl font-bold hover:scale-105 transform transition-all duration-200 text-center block shadow-lg hover:shadow-xl"
              >
                🚀 Practice This Question
              </Link>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredQuestions.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              No questions found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Try adjusting your search criteria or difficulty filter
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedDifficulty('all');
              }}
              className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white rounded-xl font-bold transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Enhanced Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white text-center shadow-2xl">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Master JavaScript?
          </h2>
          <p className="text-xl mb-6 opacity-90">
            Practice with our comprehensive question bank and coding challenges
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/coding"
              className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold hover:bg-gray-100 transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              💻 Coding Challenges
            </Link>
            <Link
              href="/practice/fundamentals"
              className="px-8 py-4 border-2 border-white text-white rounded-xl font-bold hover:bg-white hover:text-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              🔄 Back to Fundamentals
            </Link>
            <Link
              href="/questions/multiple-choice"
              className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white rounded-xl font-bold transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              📝 All Questions
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
