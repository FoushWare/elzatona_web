'use client';

import { useState, useMemo } from 'react';
import {
  cultureFitQuestions,
  cultureFitCategories,
  CultureFitQuestion,
} from '@/lib/cultureFitQuestions';

export default function CultureFitInterviewsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedQuestion, setSelectedQuestion] =
    useState<CultureFitQuestion | null>(null);

  const filteredQuestions = useMemo(() => {
    let filtered = cultureFitQuestions;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(
        question => question.category === selectedCategory
      );
    }

    // Filter by difficulty
    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(
        question => question.difficulty === selectedDifficulty
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        question =>
          question.question.toLowerCase().includes(query) ||
          question.answer.example.toLowerCase().includes(query) ||
          question.tags.some(tag => tag.toLowerCase().includes(query)) ||
          question.category.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [selectedCategory, selectedDifficulty, searchQuery]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'hard':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getCategoryIcon = (categoryId: string) => {
    const category = cultureFitCategories.find(cat => cat.id === categoryId);
    return category?.icon || '🎯';
  };

  const getCategoryName = (categoryId: string) => {
    const category = cultureFitCategories.find(cat => cat.id === categoryId);
    return category?.name || categoryId;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            🌟 Culture Fit Interviews
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Master culture fit questions and learn how to demonstrate your
            values, teamwork skills, and cultural alignment. Practice with real
            examples and expert guidance.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Search Questions
              </label>
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search by question, answer, or tags..."
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="all">All Categories</option>
                {cultureFitCategories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.icon} {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Difficulty Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Difficulty
              </label>
              <select
                value={selectedDifficulty}
                onChange={e => setSelectedDifficulty(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
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
          <p className="text-gray-600 dark:text-gray-400">
            Showing {filteredQuestions.length} of {cultureFitQuestions.length}{' '}
            questions
          </p>
        </div>

        {/* Questions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredQuestions.map(question => (
            <div
              key={question.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
              onClick={() => setSelectedQuestion(question)}
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">
                      {getCategoryIcon(question.category)}
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                        {getCategoryName(question.category)}
                      </h3>
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(question.difficulty)}`}
                      >
                        {question.difficulty.charAt(0).toUpperCase() +
                          question.difficulty.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Question */}
                <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
                  {question.question}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {question.tags.slice(0, 3).map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                  {question.tags.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                      +{question.tags.length - 3} more
                    </span>
                  )}
                </div>

                {/* Key Points Preview */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                    Key Points:
                  </h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    {question.answer.keyPoints
                      .slice(0, 2)
                      .map((point, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-purple-500 mr-2">•</span>
                          <span className="line-clamp-2">{point}</span>
                        </li>
                      ))}
                    {question.answer.keyPoints.length > 2 && (
                      <li className="text-gray-500 dark:text-gray-500 text-xs">
                        +{question.answer.keyPoints.length - 2} more points
                      </li>
                    )}
                  </ul>
                </div>

                {/* Click to view more */}
                <div className="text-center">
                  <span className="text-purple-600 dark:text-purple-400 text-sm font-medium group-hover:underline">
                    Click to view detailed answer →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredQuestions.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No questions found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search criteria or filters.
            </p>
          </div>
        )}
      </div>

      {/* Question Detail Modal */}
      {selectedQuestion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl">
                    {getCategoryIcon(selectedQuestion.category)}
                  </span>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {getCategoryName(selectedQuestion.category)}
                    </h2>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(selectedQuestion.difficulty)}`}
                    >
                      {selectedQuestion.difficulty.charAt(0).toUpperCase() +
                        selectedQuestion.difficulty.slice(1)}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedQuestion(null)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-2xl"
                >
                  ×
                </button>
              </div>

              {/* Question */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Question:
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                  {selectedQuestion.question}
                </p>
              </div>

              {/* Answer Structure */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Answer Structure:
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {selectedQuestion.answer.structure}
                </p>
              </div>

              {/* Example Answer */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Example Answer:
                </h3>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {selectedQuestion.answer.example}
                  </p>
                </div>
              </div>

              {/* Key Points */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Key Points:
                </h3>
                <ul className="space-y-2">
                  {selectedQuestion.answer.keyPoints.map((point, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-purple-500 mr-3 mt-1">•</span>
                      <span className="text-gray-700 dark:text-gray-300">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tips */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Pro Tips:
                </h3>
                <ul className="space-y-2">
                  {selectedQuestion.answer.tips.map((tip, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-3 mt-1">💡</span>
                      <span className="text-gray-700 dark:text-gray-300">
                        {tip}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Follow-up Questions */}
              {selectedQuestion.followUpQuestions &&
                selectedQuestion.followUpQuestions.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      Follow-up Questions:
                    </h3>
                    <ul className="space-y-2">
                      {selectedQuestion.followUpQuestions.map(
                        (followUp, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-blue-500 mr-3 mt-1">→</span>
                            <span className="text-gray-700 dark:text-gray-300">
                              {followUp}
                            </span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )}

              {/* Tags */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Tags:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedQuestion.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Close Button */}
              <div className="text-center">
                <button
                  onClick={() => setSelectedQuestion(null)}
                  className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
