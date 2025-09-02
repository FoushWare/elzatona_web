'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
// import { internalResources } from "@/lib/internalResources";

export default function SeniorDevPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [showStatistics, setShowStatistics] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Filter resources to only include senior dev content
  const seniorDevResources = useMemo(() => {
    // return internalResources.filter(
    //   (resource) => resource.category === "senior-dev"
    // );
    return [] as Array<{
      id: string;
      title: string;
      description: string;
      category: string;
      difficulty: string;
      totalQuestions: number;
      estimatedTime: number;
    }>; // Temporarily disabled to isolate build error
  }, []);

  // Filter resources based on search and filters
  const filteredResources = useMemo(() => {
    return seniorDevResources.filter(resource => {
      const matchesSearch =
        searchQuery === '' ||
        resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDifficulty =
        selectedDifficulty === 'all' ||
        resource.difficulty === selectedDifficulty;

      return matchesSearch && matchesDifficulty;
    });
  }, [seniorDevResources, searchQuery, selectedDifficulty]);

  // Calculate totals
  const totalResources = seniorDevResources.length;
  const totalQuestions = seniorDevResources.reduce(
    (sum, resource) => sum + resource.totalQuestions,
    0
  );
  const totalMinutes = seniorDevResources.reduce(
    (sum, resource) => sum + resource.estimatedTime,
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-indigo-900/20 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">🚀</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Advanced Frontend Topics
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Advanced frontend concepts for senior developers. Master Webpack,
            performance optimization, system design, and modern frontend
            architecture.
          </p>

          {/* Mobile Toggle Buttons */}
          <div className="flex flex-wrap gap-3 justify-center mt-6 md:hidden">
            <button
              onClick={() => setShowStatistics(!showStatistics)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              {showStatistics ? 'Hide Statistics' : 'Show Statistics'}
              <span>📊</span>
            </button>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              {showFilters ? 'Hide Filters' : 'Show Filters'}
              <span>🔍</span>
            </button>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className={`${showFilters ? 'block' : 'hidden md:block'} mb-8`}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border-2 border-gray-200 dark:border-gray-700 p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <label
                  htmlFor="search"
                  className="block text-lg font-bold text-gray-700 dark:text-gray-300 mb-3"
                >
                  🔍 Search Advanced Topics
                </label>
                <input
                  type="text"
                  id="search"
                  placeholder="Search senior-level questions, topics, or concepts..."
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-lg transition-all duration-200"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="difficulty"
                  className="block text-lg font-bold text-gray-700 dark:text-gray-300 mb-3"
                >
                  🎯 Filter by Difficulty
                </label>
                <select
                  id="difficulty"
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-lg transition-all duration-200"
                  value={selectedDifficulty}
                  onChange={e => setSelectedDifficulty(e.target.value)}
                >
                  <option value="all">All Difficulties</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div
          className={`${showStatistics ? 'block' : 'hidden md:grid'} grid-cols-1 md:grid-cols-4 gap-6 mb-8`}
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border-2 border-blue-200 dark:border-blue-800 p-6 text-center hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-center mb-4">
              <span className="text-3xl">📚</span>
            </div>
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
              {totalResources}
            </div>
            <div className="text-gray-700 dark:text-gray-300 font-bold text-lg">
              Total Resources
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border-2 border-green-200 dark:border-green-800 p-6 text-center hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-center mb-4">
              <span className="text-3xl">❓</span>
            </div>
            <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
              {totalQuestions}
            </div>
            <div className="text-gray-700 dark:text-gray-300 font-bold text-lg">
              Total Questions
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border-2 border-yellow-200 dark:border-yellow-800 p-6 text-center hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-center mb-4">
              <span className="text-3xl">⏱️</span>
            </div>
            <div className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent mb-2">
              {totalMinutes}
            </div>
            <div className="text-gray-700 dark:text-gray-300 font-bold text-lg">
              Total Minutes
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border-2 border-purple-200 dark:border-purple-800 p-6 text-center hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-center mb-4">
              <span className="text-3xl">🎯</span>
            </div>
            <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              {filteredResources.length}
            </div>
            <div className="text-gray-700 dark:text-gray-300 font-bold text-lg">
              Filtered Results
            </div>
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredResources.map(resource => (
            <div
              key={resource.id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border-2 border-purple-200 dark:border-purple-800 p-8 hover:shadow-2xl transition-all duration-300 hover:scale-105 transform"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center text-3xl shadow-lg">
                    {resource.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {resource.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-lg">
                      {resource.description}
                    </p>
                  </div>
                </div>
                <span className="px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg">
                  {resource.difficulty}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-4 border-2 border-blue-200 dark:border-blue-800">
                  <div className="text-gray-700 dark:text-gray-300 font-bold text-lg mb-2">
                    Questions
                  </div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    {resource.totalQuestions}
                  </div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-4 border-2 border-green-200 dark:border-green-800">
                  <div className="text-gray-700 dark:text-gray-300 font-bold text-lg mb-2">
                    Time
                  </div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    {resource.estimatedTime} min
                  </div>
                </div>
              </div>

              {/* Video Tutorial Section */}
              {resource.videoUrl && (
                <div className="mb-6">
                  <div className="flex items-center space-x-3 bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 rounded-xl p-4 border-2 border-purple-200 dark:border-purple-800">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path>
                      </svg>
                    </div>
                    <span className="text-lg font-bold text-purple-700 dark:text-purple-300">
                      📹 Video Tutorial Available
                    </span>
                  </div>
                </div>
              )}

              <div className="mb-6">
                <button className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 text-lg font-bold flex items-center space-x-2 transition-colors duration-200">
                  <span>Show Details</span>
                  <svg
                    className="w-5 h-5 transform transition-transform hover:scale-110"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </button>
              </div>

              <div className="flex space-x-4">
                <a
                  className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-center py-3 px-6 rounded-xl font-bold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                  href={`/practice/advanced/${resource.id}`}
                >
                  🚀 Start Learning
                </a>
                <button className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 font-bold">
                  👁️ Preview
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 rounded-2xl p-8 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
            <div className="relative z-10">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🎯</span>
              </div>
              <h2 className="text-4xl font-bold mb-4 drop-shadow-lg">
                Ready to Level Up Your Frontend Skills?
              </h2>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Master advanced concepts, performance optimization, and modern
                frontend architecture.
              </p>
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <Link
                  href="/practice/fundamentals"
                  className="bg-white text-purple-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  📚 Frontend Fundamentals
                </Link>
                <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-purple-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
                  🚀 Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
