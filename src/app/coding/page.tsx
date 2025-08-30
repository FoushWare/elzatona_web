"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  codingChallenges,
  getChallengesByCategory,
  getChallengesByDifficulty,
} from "@/lib/codingChallenges";

export default function CodingPage() {
  const [selectedCategory, setSelectedCategory] = useState<
    "all" | "frontend" | "problem-solving"
  >("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<
    "all" | "easy" | "medium" | "hard"
  >("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showStatistics, setShowStatistics] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const filteredChallenges = useMemo(() => {
    let filtered = codingChallenges;

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = getChallengesByCategory(selectedCategory);
    }

    // Filter by difficulty
    if (selectedDifficulty !== "all") {
      filtered = filtered.filter(
        (challenge) => challenge.difficulty === selectedDifficulty
      );
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (challenge) =>
          challenge.title.toLowerCase().includes(query) ||
          challenge.description.toLowerCase().includes(query) ||
          challenge.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [selectedCategory, selectedDifficulty, searchQuery]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-gradient-to-r from-green-500 to-emerald-500 text-white";
      case "medium":
        return "bg-gradient-to-r from-yellow-500 to-orange-500 text-white";
      case "hard":
        return "bg-gradient-to-r from-red-500 to-pink-500 text-white";
      default:
        return "bg-gradient-to-r from-gray-500 to-slate-500 text-white";
    }
  };

  const getDifficultyBgColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20";
      case "medium":
        return "from-yellow-100 to-orange-100 dark:from-yellow-900/20 dark:to-orange-900/20";
      case "hard":
        return "from-red-100 to-pink-100 dark:from-red-900/20 dark:to-pink-900/20";
      default:
        return "from-gray-100 to-slate-100 dark:from-gray-900/20 dark:to-slate-900/20";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "frontend":
        return "🎨";
      case "problem-solving":
        return "🧮";
      default:
        return "💻";
    }
  };

  const getCategoryGradient = (category: string) => {
    switch (category) {
      case "frontend":
        return "from-purple-500 to-pink-500";
      case "problem-solving":
        return "from-blue-500 to-cyan-500";
      default:
        return "from-indigo-500 to-purple-500";
    }
  };

  const getCategoryBgGradient = (category: string) => {
    switch (category) {
      case "frontend":
        return "from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20";
      case "problem-solving":
        return "from-blue-100 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-900/20";
      default:
        return "from-indigo-100 to-purple-100 dark:from-indigo-900/20 dark:to-purple-900/20";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <div className="text-6xl mb-6 animate-bounce">🚀</div>
            <h1 className="text-5xl font-bold mb-6 tracking-tight drop-shadow-lg">
              Coding Challenges
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed drop-shadow-sm">
              Practice your coding skills with interactive challenges. Write
              code, run tests, and improve your problem-solving abilities.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <div className="px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-white font-medium">
                🎯 {codingChallenges.length} Challenges
              </div>
              <div className="px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-white font-medium">
                ⚡ Interactive Editor
              </div>
              <div className="px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-white font-medium">
                🏆 Real-time Testing
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Filters */}
        <div className={`mb-12 space-y-6 transition-all duration-300 ${
          showFilters ? 'block' : 'hidden md:block'
        }`}>
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="🔍 Search challenges..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl shadow-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 text-lg"
            />
            <svg
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400"
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
          <div className="flex flex-wrap gap-6">
            {/* Category Filter */}
            <div className="flex-1 min-w-48">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                📂 Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) =>
                  setSelectedCategory(e.target.value as "all" | "frontend" | "problem-solving")
                }
                className="w-full px-4 py-3 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl shadow-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300"
              >
                <option value="all">🌟 All Categories</option>
                <option value="frontend">🎨 Frontend Challenges</option>
                <option value="problem-solving">🧮 Problem Solving</option>
              </select>
            </div>

            {/* Difficulty Filter */}
            <div className="flex-1 min-w-48">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                🎯 Difficulty
              </label>
              <select
                value={selectedDifficulty}
                onChange={(e) =>
                  setSelectedDifficulty(e.target.value as "all" | "easy" | "medium" | "hard")
                }
                className="w-full px-4 py-3 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl shadow-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300"
              >
                <option value="all">🌈 All Difficulties</option>
                <option value="easy">🌱 Easy</option>
                <option value="medium">🚀 Medium</option>
                <option value="hard">⚡ Hard</option>
              </select>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="mb-8">
          <div className="text-center mb-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setShowStatistics(!showStatistics)}
                className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              >
                {showStatistics ? "Hide Statistics" : "Show Statistics"}
                <span className="ml-2">📊</span>
              </button>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="inline-flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors"
              >
                {showFilters ? "Hide Filters" : "Show Filters"}
                <span className="ml-2">🔍</span>
              </button>
            </div>
          </div>
          
          <div className={`grid grid-cols-1 md:grid-cols-4 gap-6 transition-all duration-300 ${
            showStatistics ? 'block' : 'hidden md:grid'
          }`}>
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="text-3xl font-bold mb-2">{codingChallenges.length}</div>
            <div className="text-blue-100">Total Challenges</div>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="text-3xl font-bold mb-2">
              {codingChallenges.filter((c) => c.difficulty === "easy").length}
            </div>
            <div className="text-green-100">Easy</div>
          </div>
          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="text-3xl font-bold mb-2">
              {codingChallenges.filter((c) => c.difficulty === "medium").length}
            </div>
            <div className="text-yellow-100">Medium</div>
          </div>
          <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="text-3xl font-bold mb-2">
              {codingChallenges.filter((c) => c.difficulty === "hard").length}
            </div>
            <div className="text-red-100">Hard</div>
          </div>
        </div>

        {/* Challenges Grid */}
        {filteredChallenges.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-8xl mb-6 animate-pulse">🔍</div>
            <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-4">
              No challenges found
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              Try adjusting your search criteria or filters.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredChallenges.map((challenge) => (
              <Link
                key={challenge.id}
                href={`/coding/${challenge.id}`}
                className="group block"
              >
                <div className={`bg-gradient-to-br ${getCategoryBgGradient(challenge.category)} rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-white/20 cursor-pointer group-hover:bg-gradient-to-br group-hover:from-white group-hover:to-gray-50 dark:group-hover:from-gray-800 dark:group-hover:to-gray-700`}>
                  <div className="mb-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 bg-gradient-to-r ${getCategoryGradient(challenge.category)} rounded-xl flex items-center justify-center text-2xl shadow-lg`}>
                          {getCategoryIcon(challenge.category)}
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 leading-tight group-hover:text-gray-900 dark:group-hover:text-white">
                          {challenge.title}
                        </h3>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-bold shadow-lg ${getDifficultyColor(challenge.difficulty)}`}>
                        {challenge.difficulty}
                      </span>
                    </div>

                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 line-clamp-3 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-300">
                      {challenge.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {challenge.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-white/50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 text-xs rounded-full font-medium backdrop-blur-sm"
                        >
                          {tag}
                        </span>
                      ))}
                      {challenge.tags.length > 3 && (
                        <span className="px-3 py-1 bg-white/50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 text-xs rounded-full font-medium backdrop-blur-sm">
                          +{challenge.tags.length - 3}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-6">
                      <span className="font-semibold flex items-center">
                        ⏱️ {challenge.estimatedTime} min
                      </span>
                      <span className="font-semibold flex items-center">
                        🏆 {challenge.completionRate}% success
                      </span>
                    </div>

                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-6 rounded-xl font-bold text-center shadow-lg hover:shadow-xl transition-all duration-300 group-hover:from-blue-600 group-hover:to-purple-600">
                      🚀 Start Challenge
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white text-center shadow-2xl">
          <h2 className="text-3xl font-bold mb-4">Ready to Level Up?</h2>
          <p className="text-xl text-indigo-100 mb-8">
            Choose your challenge and start coding now!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/practice/fundamentals"
              className="px-8 py-4 bg-white text-indigo-600 rounded-xl font-bold hover:bg-indigo-50 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              📚 Practice Questions
            </Link>
            <Link
              href="/study-plans"
              className="px-8 py-4 bg-white text-indigo-600 rounded-xl font-bold hover:bg-indigo-50 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              📅 Study Plans
            </Link>
            <Link
              href="/learning-paths"
              className="px-8 py-4 bg-white text-indigo-600 rounded-xl font-bold hover:bg-indigo-50 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              🛤️ Learning Paths
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
