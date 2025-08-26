"use client";

import { useState, useEffect } from "react";
import ChallengeCard from "@/components/ChallengeCard";
import {
  getChallenges,
  getChallengesByCategory,
  getChallengesByDifficulty,
  sampleChallenges,
} from "@/lib/challenges";
import { Challenge, Category, Difficulty } from "@/types/challenge";

export default function ChallengesPage() {
  const [challenges, setChallenges] = useState<Challenge[]>(sampleChallenges);
  const [filteredChallenges, setFilteredChallenges] =
    useState<Challenge[]>(sampleChallenges);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | "all">(
    "all"
  );
  const [selectedDifficulty, setSelectedDifficulty] = useState<
    Difficulty | "all"
  >("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [challengesPerPage] = useState(9);

  // No need for useEffect since we're setting initial state directly

  useEffect(() => {
    let filtered = [...challenges];

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (challenge) => challenge.category === selectedCategory
      );
    }

    // Filter by difficulty
    if (selectedDifficulty !== "all") {
      filtered = filtered.filter(
        (challenge) => challenge.difficulty === selectedDifficulty
      );
    }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (challenge) =>
          challenge.title.toLowerCase().includes(term) ||
          challenge.description.toLowerCase().includes(term) ||
          challenge.tags.some((tag) => tag.toLowerCase().includes(term))
      );
    }

    setFilteredChallenges(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [challenges, selectedCategory, selectedDifficulty, searchTerm]);

  // Pagination
  const indexOfLastChallenge = currentPage * challengesPerPage;
  const indexOfFirstChallenge = indexOfLastChallenge - challengesPerPage;
  const currentChallenges = filteredChallenges.slice(
    indexOfFirstChallenge,
    indexOfLastChallenge
  );
  const totalPages = Math.ceil(filteredChallenges.length / challengesPerPage);

  const handleChallengeClick = (challengeId: string) => {
    // Navigate to challenge detail page
    window.location.href = `/challenges/${challengeId}`;
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSelectedDifficulty("all");
  };

  const getDifficultyStats = () => {
    const stats = { easy: 0, medium: 0, hard: 0 };
    challenges.forEach((challenge) => {
      stats[challenge.difficulty]++;
    });
    return stats;
  };

  const getCategoryStats = () => {
    const stats = { html: 0, css: 0, javascript: 0 };
    challenges.forEach((challenge) => {
      stats[challenge.category]++;
    });
    return stats;
  };

  const difficultyStats = getDifficultyStats();
  const categoryStats = getCategoryStats();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Coding Challenges
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Master frontend development with hands-on coding challenges
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600">
                {challenges.length}
              </div>
              <div className="text-sm text-blue-600">Total</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-600">
                {difficultyStats.easy}
              </div>
              <div className="text-sm text-green-600">Easy</div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {difficultyStats.medium}
              </div>
              <div className="text-sm text-yellow-600">Medium</div>
            </div>
            <div className="bg-red-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-red-600">
                {difficultyStats.hard}
              </div>
              <div className="text-sm text-red-600">Hard</div>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-orange-600">
                {categoryStats.html}
              </div>
              <div className="text-sm text-orange-600">HTML</div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600">
                {categoryStats.css}
              </div>
              <div className="text-sm text-blue-600">CSS</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="flex-1 w-full lg:w-auto">
              <input
                type="text"
                placeholder="Search challenges..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2">
              <select
                value={selectedCategory}
                onChange={(e) =>
                  setSelectedCategory(e.target.value as Category | "all")
                }
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                <option value="html">HTML</option>
                <option value="css">CSS</option>
                <option value="javascript">JavaScript</option>
              </select>

              {/* Difficulty Filter */}
              <select
                value={selectedDifficulty}
                onChange={(e) =>
                  setSelectedDifficulty(e.target.value as Difficulty | "all")
                }
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Difficulties</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>

              {/* Clear Filters */}
              <button
                onClick={clearFilters}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Clear
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredChallenges.length} of {challenges.length}{" "}
            challenges
          </p>
        </div>

        {/* Challenges Grid */}
        {currentChallenges.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {currentChallenges.map((challenge) => (
              <ChallengeCard
                key={challenge.id}
                challenge={challenge}
                onClick={() => handleChallengeClick(challenge.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No challenges found
            </h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search terms or filters
            </p>
            <button
              onClick={clearFilters}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === page
                    ? "bg-blue-600 text-white"
                    : "border border-gray-300 hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
