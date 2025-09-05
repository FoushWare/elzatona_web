'use client';

import { useState } from 'react';
import { learningPaths, getResourceById } from '@/lib/resources';
import Link from 'next/link';
// import LearningPathQuestions from '@/components/LearningPathQuestions';

export default function LearningPathsPage() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<
    'beginner' | 'intermediate' | 'advanced' | 'all'
  >('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showStatistics, setShowStatistics] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  // const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [collapsedCards, setCollapsedCards] = useState<Set<string>>(
    new Set(learningPaths.map(path => path.id))
  );

  const filteredPaths = learningPaths.filter(
    path =>
      (selectedDifficulty === 'all' ||
        path.difficulty === selectedDifficulty) &&
      (selectedCategory === 'all' || path.id.includes(selectedCategory))
  );

  const categories = [
    'all',
    'javascript',
    'react',
    'css',
    'typescript',
    'testing',
    'performance',
    'security',
    'system-design',
    'tools',
    'ai-tools',
    'interview',
    'english',
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400';
      case 'intermediate':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'advanced':
        return 'text-red-600 bg-red-100 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return '🌱';
      case 'intermediate':
        return '🚀';
      case 'advanced':
        return '⚡';
      default:
        return '📚';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'javascript':
        return '⚡';
      case 'react':
        return '⚛️';
      case 'css':
        return '🎨';
      case 'typescript':
        return '📘';
      case 'testing':
        return '🧪';
      case 'performance':
        return '⚡';
      case 'security':
        return '🔒';
      case 'system-design':
        return '🏗️';
      case 'tools':
        return '🛠️';
      case 'ai-tools':
        return '🤖';
      case 'interview':
        return '💼';
      case 'english':
        return '📚';
      default:
        return '📚';
    }
  };

  const toggleCard = (pathId: string) => {
    setCollapsedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(pathId)) {
        newSet.delete(pathId);
      } else {
        newSet.add(pathId);
      }
      return newSet;
    });
  };

  const isCardCollapsed = (pathId: string) => collapsedCards.has(pathId);

  return (
    <div className="min-h-screen bg-background py-4 sm:py-6 lg:py-8">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3 sm:mb-4">
            Learning Paths
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto px-2">
            Curated educational journeys to master frontend development skills
            through carefully selected resources
          </p>
          <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4 px-4">
            <Link
              href="/study-plans"
              className="bg-transparent border-2 border-blue-600 text-blue-600 px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-blue-600 hover:text-white hover:scale-105 transform transition-all duration-200 shadow-lg hover:shadow-xl text-sm sm:text-base"
            >
              📅 View Study Plans
            </Link>
            <Link
              href="/preparation-guides"
              className="bg-transparent border-2 border-purple-600 text-purple-600 px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-purple-600 hover:text-white hover:scale-105 transform transition-all duration-200 shadow-lg hover:shadow-xl text-sm sm:text-base"
            >
              🎯 Preparation Guides
            </Link>
            <Link
              href="/learning-paths/enhanced"
              className="bg-transparent border-2 border-green-600 text-green-600 px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-green-600 hover:text-white hover:scale-105 transform transition-all duration-200 shadow-lg hover:shadow-xl text-sm sm:text-base"
            >
              🚀 Enhanced Learning Path (Interactive)
            </Link>
          </div>

          {/* Mobile Toggle Buttons - Hidden on desktop */}
          <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:hidden px-4">
            <button
              onClick={() => setShowStatistics(!showStatistics)}
              className="inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg text-sm sm:text-base"
            >
              {showStatistics ? 'Hide Statistics' : 'Show Statistics'}
              <span className="ml-2">📊</span>
            </button>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg text-sm sm:text-base"
            >
              {showFilters ? 'Hide Filters' : 'Show Filters'}
              <span className="ml-2">🔍</span>
            </button>
            <Link
              href="/learning-paths/enhanced"
              className="inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg text-sm sm:text-base"
            >
              🚀 Enhanced Learning
            </Link>
          </div>
        </div>

        {/* Statistics */}
        <div
          className={`grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8 transition-all duration-300 ${
            showStatistics ? 'block' : 'hidden md:grid'
          }`}
        >
          <div className="bg-card rounded-lg shadow-sm border border-border p-3 sm:p-4 lg:p-6 text-center">
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-600 mb-1 sm:mb-2">
              {learningPaths.length}
            </div>
            <div className="text-card-foreground font-medium text-xs sm:text-sm lg:text-base">
              Learning Paths
            </div>
          </div>
          <div className="bg-card rounded-lg shadow-sm border border-border p-3 sm:p-4 lg:p-6 text-center">
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-600 mb-1 sm:mb-2">
              {learningPaths.reduce((sum, path) => sum + path.estimatedTime, 0)}
            </div>
            <div className="text-card-foreground font-medium text-xs sm:text-sm lg:text-base">
              Total Hours
            </div>
          </div>
          <div className="bg-card rounded-lg shadow-sm border border-border p-3 sm:p-4 lg:p-6 text-center">
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-purple-600 mb-1 sm:mb-2">
              {learningPaths.reduce(
                (sum, path) => sum + path.resources.length,
                0
              )}
            </div>
            <div className="text-card-foreground font-medium text-xs sm:text-sm lg:text-base">
              Total Resources
            </div>
          </div>
          <div className="bg-card rounded-lg shadow-sm border border-border p-3 sm:p-4 lg:p-6 text-center">
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-orange-600 mb-1 sm:mb-2">
              {categories.length - 1}
            </div>
            <div className="text-card-foreground font-medium text-xs sm:text-sm lg:text-base">
              Categories
            </div>
          </div>
        </div>

        {/* Filters */}
        <div
          className={`bg-card rounded-lg shadow-sm border border-border p-4 sm:p-6 mb-6 sm:mb-8 transition-all duration-300 ${
            showFilters ? 'block' : 'hidden md:block'
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            <div>
              <label className="block text-sm font-medium text-card-foreground mb-2">
                Difficulty Level
              </label>
              <div className="flex flex-wrap gap-2">
                {(['all', 'beginner', 'intermediate', 'advanced'] as const).map(
                  difficulty => (
                    <button
                      key={difficulty}
                      onClick={() => setSelectedDifficulty(difficulty)}
                      className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 hover:scale-105 transform border-2 ${
                        selectedDifficulty === difficulty
                          ? 'bg-blue-600 border-blue-600 text-white shadow-lg'
                          : 'bg-transparent border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white hover:shadow-md'
                      }`}
                    >
                      {difficulty === 'all'
                        ? 'All Levels'
                        : difficulty.charAt(0).toUpperCase() +
                          difficulty.slice(1)}
                    </button>
                  )
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-card-foreground mb-2">
                Category
              </label>
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 hover:scale-105 transform border-2 ${
                      selectedCategory === category
                        ? 'bg-purple-600 border-purple-600 text-white shadow-lg'
                        : 'bg-transparent border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white hover:shadow-md'
                    }`}
                  >
                    {category === 'all'
                      ? 'All Categories'
                      : category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Learning Paths Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-8">
          {filteredPaths.map(path => (
            <div
              key={path.id}
              className={`bg-card rounded-lg shadow-sm border border-border hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 transform group overflow-hidden ${
                isCardCollapsed(path.id)
                  ? 'max-h-0 opacity-0'
                  : 'max-h-[2000px] opacity-100'
              }`}
            >
              {/* Header */}
              <div
                className="p-3 sm:p-4 lg:p-6 cursor-pointer"
                onClick={() => toggleCard(path.id)}
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-3">
                  <div className="flex items-start space-x-2 sm:space-x-3 min-w-0 flex-1">
                    <span className="text-lg sm:text-xl lg:text-2xl flex-shrink-0">
                      {getCategoryIcon(path.id.split('-')[0])}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-foreground mb-1 break-words">
                        {path.title}
                      </h3>
                      <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                        {path.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 sm:space-x-2 sm:flex-shrink-0">
                    <span className="text-base sm:text-lg lg:text-xl">
                      {getDifficultyIcon(path.difficulty)}
                    </span>
                    <span
                      className={`inline-flex items-center px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium ${getDifficultyColor(path.difficulty)}`}
                    >
                      {path.difficulty}
                    </span>
                    {path.questionCount && (
                      <span className="inline-flex items-center px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                        {path.questionCount} questions
                      </span>
                    )}
                    <button
                      className="ml-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                      onClick={e => {
                        e.stopPropagation();
                        toggleCard(path.id);
                      }}
                    >
                      <svg
                        className={`w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${
                          isCardCollapsed(path.id) ? '' : 'rotate-180'
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="px-3 sm:px-4 lg:px-6 pb-3 sm:pb-4 lg:pb-6">
                {/* Stats */}
                <div className="grid grid-cols-3 gap-1 sm:gap-2 lg:gap-4 mb-3 sm:mb-4 lg:mb-6 text-xs sm:text-sm text-muted-foreground">
                  <div className="flex flex-col items-center text-center">
                    <span className="text-base sm:text-lg lg:text-xl mb-1">
                      📚
                    </span>
                    <span className="text-xs sm:text-sm">
                      {path.resources.length} resources
                    </span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <span className="text-base sm:text-lg lg:text-xl mb-1">
                      ⏱️
                    </span>
                    <span className="text-xs sm:text-sm">
                      {path.estimatedTime} hours
                    </span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <span className="text-base sm:text-lg lg:text-xl mb-1">
                      🎯
                    </span>
                    <span className="text-xs sm:text-sm">
                      {path.targetSkills.length} skills
                    </span>
                  </div>
                  {path.questionCount && (
                    <div className="flex flex-col items-center text-center">
                      <span className="text-base sm:text-lg lg:text-xl mb-1">
                        ❓
                      </span>
                      <span className="text-xs sm:text-sm text-blue-600 font-medium">
                        {path.questionCount} questions
                      </span>
                    </div>
                  )}
                </div>

                {/* Target Skills */}
                <div className="mb-3 sm:mb-4 lg:mb-6">
                  <h4 className="text-xs sm:text-sm font-medium text-card-foreground mb-2">
                    Skills you&apos;ll learn:
                  </h4>
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    {path.targetSkills.slice(0, 4).map(skill => (
                      <span
                        key={skill}
                        className="inline-flex items-center px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
                      >
                        {skill}
                      </span>
                    ))}
                    {path.targetSkills.length > 4 && (
                      <span className="inline-flex items-center px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                        +{path.targetSkills.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Prerequisites */}
                {path.prerequisites && path.prerequisites.length > 0 && (
                  <div className="mb-3 sm:mb-4 lg:mb-6">
                    <h4 className="text-xs sm:text-sm font-medium text-card-foreground mb-2">
                      Prerequisites:
                    </h4>
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      {path.prerequisites.map(prereq => (
                        <span
                          key={prereq}
                          className="inline-flex items-center px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                        >
                          {prereq}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Resources Preview */}
                <div className="mb-3 sm:mb-4 lg:mb-6">
                  <h4 className="text-xs sm:text-sm font-medium text-card-foreground mb-2">
                    Featured Resources:
                  </h4>
                  <div className="space-y-1 sm:space-y-2">
                    {path.resources.slice(0, 3).map(resourceId => {
                      const resource = getResourceById(resourceId);
                      return resource ? (
                        <div
                          key={resourceId}
                          className="flex items-center space-x-2 text-xs sm:text-sm text-muted-foreground"
                        >
                          <span>📄</span>
                          <span className="truncate">{resource.title}</span>
                        </div>
                      ) : null;
                    })}
                    {path.resources.length > 3 && (
                      <div className="text-xs sm:text-sm text-muted-foreground">
                        +{path.resources.length - 3} more resources
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-2">
                  <Link
                    href={`/learning-paths/${path.id}/questions`}
                    className="flex-1 inline-flex items-center justify-center px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 lg:py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 hover:scale-105 transform transition-all duration-200 group-hover:shadow-lg text-xs sm:text-sm lg:text-base"
                  >
                    🧠 Practice Questions
                  </Link>
                  <Link
                    href={`/learning-paths/${path.id}/resources`}
                    className="flex-1 inline-flex items-center justify-center px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 lg:py-2.5 bg-transparent border-2 border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-600 hover:text-white hover:scale-105 transform transition-all duration-200 group-hover:shadow-lg text-xs sm:text-sm lg:text-base"
                  >
                    📚 View Resources
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredPaths.length === 0 && (
          <div className="text-center py-8 sm:py-12 px-4">
            <div className="text-4xl sm:text-6xl mb-4">🔍</div>
            <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">
              No learning paths found
            </h3>
            <p className="text-muted-foreground mb-4 text-sm sm:text-base">
              Try adjusting your filters or check out our other learning
              resources
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
              <button
                onClick={() => {
                  setSelectedDifficulty('all');
                  setSelectedCategory('all');
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
              >
                Clear Filters
              </button>
              <Link
                href="/study-plans"
                className="px-4 py-2 border border-border text-foreground rounded-lg hover:bg-muted transition-colors text-sm sm:text-base"
              >
                View Study Plans
              </Link>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-12 sm:mt-16 text-center px-4">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 sm:p-8 text-white">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
              Ready to Start Learning?
            </h2>
            <p className="text-lg sm:text-xl mb-4 sm:mb-6 opacity-90">
              Choose your learning path and begin your frontend development
              journey
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
              <Link
                href="/study-plans"
                className="bg-white text-blue-600 px-4 sm:px-6 py-2 sm:py-3 rounded-md font-medium hover:bg-gray-100 transition-colors duration-200 text-sm sm:text-base"
              >
                📅 Study Plans
              </Link>
              <Link
                href="/preparation-guides"
                className="border-2 border-white text-white px-4 sm:px-6 py-2 sm:py-3 rounded-md font-medium hover:bg-white hover:text-blue-600 transition-colors duration-200 text-sm sm:text-base"
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
