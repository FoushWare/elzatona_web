"use client";

import { useState } from "react";
import { learningPaths, getResourceById } from "@/lib/resources";
import Link from "next/link";

export default function LearningPathsPage() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<
    "beginner" | "intermediate" | "advanced" | "all"
  >("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showStatistics, setShowStatistics] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const filteredPaths = learningPaths.filter(
    (path) =>
      (selectedDifficulty === "all" || path.difficulty === selectedDifficulty) &&
      (selectedCategory === "all" || path.id.includes(selectedCategory))
  );

  const categories = ["all", "javascript", "react", "css", "typescript", "testing", "performance", "security", "system-design", "tools", "ai-tools", "interview"];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400";
      case "intermediate":
        return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "advanced":
        return "text-red-600 bg-red-100 dark:bg-red-900/20 dark:text-red-400";
      default:
        return "text-gray-600 bg-gray-100 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "🌱";
      case "intermediate":
        return "🚀";
      case "advanced":
        return "⚡";
      default:
        return "📚";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "javascript":
        return "⚡";
      case "react":
        return "⚛️";
      case "css":
        return "🎨";
      case "typescript":
        return "📘";
      case "testing":
        return "🧪";
      case "performance":
        return "⚡";
      case "security":
        return "🔒";
      case "system-design":
        return "🏗️";
      case "tools":
        return "🛠️";
      case "ai-tools":
        return "🤖";
      case "interview":
        return "💼";
      default:
        return "📚";
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Learning Paths
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Curated educational journeys to master frontend development skills through carefully selected resources
          </p>
          <div className="mt-6 flex justify-center space-x-4">
            <Link
              href="/study-plans"
              className="bg-transparent border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-600 hover:text-white hover:scale-105 transform transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              📅 View Study Plans
            </Link>
            <Link
              href="/preparation-guides"
              className="bg-transparent border-2 border-purple-600 text-purple-600 px-6 py-3 rounded-lg hover:bg-purple-600 hover:text-white hover:scale-105 transform transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              🎯 Preparation Guides
            </Link>
          </div>
          
          {/* Mobile Toggle Buttons - Hidden on desktop */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center md:hidden">
            <button
              onClick={() => setShowStatistics(!showStatistics)}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              {showStatistics ? "Hide Statistics" : "Show Statistics"}
              <span className="ml-2">📊</span>
            </button>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              {showFilters ? "Hide Filters" : "Show Filters"}
              <span className="ml-2">🔍</span>
            </button>
          </div>
        </div>

        {/* Statistics */}
        <div className={`grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 transition-all duration-300 ${
          showStatistics ? 'block' : 'hidden md:grid'
        }`}>
          <div className="bg-card rounded-lg shadow-sm border border-border p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{learningPaths.length}</div>
            <div className="text-card-foreground font-medium">Learning Paths</div>
          </div>
          <div className="bg-card rounded-lg shadow-sm border border-border p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {learningPaths.reduce((sum, path) => sum + path.estimatedTime, 0)}
            </div>
            <div className="text-card-foreground font-medium">Total Hours</div>
          </div>
          <div className="bg-card rounded-lg shadow-sm border border-border p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {learningPaths.reduce((sum, path) => sum + path.resources.length, 0)}
            </div>
            <div className="text-card-foreground font-medium">Total Resources</div>
          </div>
          <div className="bg-card rounded-lg shadow-sm border border-border p-6 text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">
              {categories.length - 1}
            </div>
            <div className="text-card-foreground font-medium">Categories</div>
          </div>
        </div>

        {/* Filters */}
        <div className={`bg-card rounded-lg shadow-sm border border-border p-6 mb-8 transition-all duration-300 ${
          showFilters ? 'block' : 'hidden md:block'
        }`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-card-foreground mb-2">
                Difficulty Level
              </label>
              <div className="flex flex-wrap gap-2">
                {["all", "beginner", "intermediate", "advanced"].map((difficulty) => (
                  <button
                    key={difficulty}
                    onClick={() => setSelectedDifficulty(difficulty as any)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105 transform border-2 ${
                      selectedDifficulty === difficulty
                        ? "bg-blue-600 border-blue-600 text-white shadow-lg"
                        : "bg-transparent border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white hover:shadow-md"
                    }`}
                  >
                    {difficulty === "all" ? "All Levels" : difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-card-foreground mb-2">
                Category
              </label>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105 transform border-2 ${
                      selectedCategory === category
                        ? "bg-purple-600 border-purple-600 text-white shadow-lg"
                        : "bg-transparent border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white hover:shadow-md"
                    }`}
                  >
                    {category === "all" ? "All Categories" : category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Learning Paths Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {filteredPaths.map((path) => (
            <div
              key={path.id}
              className="bg-card rounded-lg shadow-sm border border-border p-6 hover:shadow-xl hover:scale-[1.02] hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 transform cursor-pointer group"
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{getCategoryIcon(path.category)}</span>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-1">
                      {path.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">{path.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xl">{getDifficultyIcon(path.difficulty)}</span>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(path.difficulty)}`}>
                    {path.difficulty}
                  </span>
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center space-x-6 mb-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <span>📚</span>
                  <span>{path.resources.length} resources</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span>⏱️</span>
                  <span>{path.estimatedTime} hours</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span>🎯</span>
                  <span>{path.targetSkills.length} skills</span>
                </div>
              </div>

              {/* Target Skills */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-card-foreground mb-2">
                  Skills you'll learn:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {path.targetSkills.slice(0, 4).map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
                    >
                      {skill}
                    </span>
                  ))}
                  {path.targetSkills.length > 4 && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                      +{path.targetSkills.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              {/* Prerequisites */}
              {path.prerequisites && path.prerequisites.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-card-foreground mb-2">
                    Prerequisites:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {path.prerequisites.map((prereq) => (
                      <span
                        key={prereq}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                      >
                        {prereq}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Resources Preview */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-card-foreground mb-2">
                  Featured Resources:
                </h4>
                <div className="space-y-2">
                  {path.resources.slice(0, 3).map((resourceId) => {
                    const resource = getResourceById(resourceId);
                    return resource ? (
                      <div
                        key={resourceId}
                        className="flex items-center space-x-2 text-sm text-muted-foreground"
                      >
                        <span>📄</span>
                        <span className="truncate">{resource.title}</span>
                      </div>
                    ) : null;
                  })}
                  {path.resources.length > 3 && (
                    <div className="text-sm text-muted-foreground">
                      +{path.resources.length - 3} more resources
                    </div>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <Link
                href={`/learning-paths/${path.id}`}
                className="inline-flex items-center justify-center w-full px-4 py-2 bg-transparent border-2 border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-600 hover:text-white hover:scale-105 transform transition-all duration-200 group-hover:shadow-lg"
              >
                Start Learning Path
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredPaths.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No learning paths found
            </h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your filters or check out our other learning resources
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => {
                  setSelectedDifficulty("all");
                  setSelectedCategory("all");
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Clear Filters
              </button>
              <Link
                href="/study-plans"
                className="px-4 py-2 border border-border text-foreground rounded-lg hover:bg-muted transition-colors"
              >
                View Study Plans
              </Link>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Start Learning?
            </h2>
            <p className="text-xl mb-6 opacity-90">
              Choose your learning path and begin your frontend development journey
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                href="/study-plans"
                className="bg-white text-blue-600 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors duration-200"
              >
                📅 Study Plans
              </Link>
              <Link
                href="/preparation-guides"
                className="border-2 border-white text-white px-6 py-3 rounded-md font-medium hover:bg-white hover:text-blue-600 transition-colors duration-200"
              >
                🎯 Preparation Guides
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
