'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { internalResources } from '@/lib/internalResources';

function FrontendQuestionsPageContent() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [showStatistics, setShowStatistics] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Handle URL parameters for category filtering
  useEffect(() => {
    const categoryFromUrl = searchParams.get('category');
    if (
      categoryFromUrl &&
      ['javascript', 'react', 'css'].includes(categoryFromUrl)
    ) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [searchParams]);

  // Filter resources to include frontend fundamentals and Git (JS, React, CSS, Git)
  const frontendResources = useMemo(() => {
    return internalResources.filter(resource =>
      ['javascript', 'react', 'css', 'git'].includes(resource.category)
    );
  }, []);

  // Filter resources based on search and filters
  const filteredResources = useMemo(() => {
    return frontendResources.filter(resource => {
      const matchesSearch =
        searchQuery === '' ||
        resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        resource.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'all' || resource.category === selectedCategory;
      const matchesDifficulty =
        selectedDifficulty === 'all' ||
        resource.difficulty === selectedDifficulty;

      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [frontendResources, searchQuery, selectedCategory, selectedDifficulty]);

  // Calculate totals
  const totalResources = frontendResources.length;
  const totalQuestions = frontendResources.reduce(
    (sum, resource) => sum + resource.totalQuestions,
    0
  );
  const totalMinutes = frontendResources.reduce(
    (sum, resource) => sum + resource.estimatedTime,
    0
  );

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Frontend Fundamentals
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Master JavaScript, React, and CSS fundamentals with comprehensive
            practice questions and learning materials
          </p>
          {/* Mobile Toggle Buttons - Hidden on desktop */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:hidden">
            <button
              onClick={() => setShowStatistics(!showStatistics)}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              {showStatistics ? 'Hide Statistics' : 'Show Statistics'}
              <span className="ml-2">📊</span>
            </button>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              {showFilters ? 'Hide Filters' : 'Show Filters'}
              <span className="ml-2">🔍</span>
            </button>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-card rounded-lg shadow-sm border border-border p-6 mb-8">
          <div
            className={`grid grid-cols-1 md:grid-cols-4 gap-4 transition-all duration-300 ${
              showFilters ? 'block' : 'hidden md:grid'
            }`}
          >
            <div className="md:col-span-2">
              <label
                htmlFor="search"
                className="block text-sm font-medium text-card-foreground mb-2"
              >
                Search
              </label>
              <input
                type="text"
                id="search"
                placeholder="Search questions, topics, or concepts..."
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-card-foreground mb-2"
              >
                Filter by Category
              </label>
              <select
                id="category"
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground"
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                <option value="javascript">JavaScript</option>
                <option value="react">React</option>
                <option value="css">CSS</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="difficulty"
                className="block text-sm font-medium text-card-foreground mb-2"
              >
                Filter by Difficulty
              </label>
              <select
                id="difficulty"
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground"
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

        {/* Statistics */}
        <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 transition-all duration-300 ${
            showStatistics ? 'block' : 'hidden md:grid'
          }`}
        >
          <div className="group relative overflow-hidden bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 rounded-xl shadow-lg border border-blue-200 dark:border-blue-800 p-6 text-center text-white transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -translate-y-12 translate-x-12" />

            {/* Content */}
            <div className="relative">
              <div className="text-4xl font-bold mb-2 flex items-center justify-center">
                <span className="mr-2">📚</span>
                {totalResources}
              </div>
              <div className="text-blue-100 font-medium">
                Learning Resources
              </div>
            </div>

            {/* Hover Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          <div className="group relative overflow-hidden bg-gradient-to-br from-green-500 via-emerald-600 to-teal-700 rounded-xl shadow-lg border border-green-200 dark:border-green-800 p-6 text-center text-white transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
            <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/5 rounded-full translate-y-10 -translate-x-10" />

            {/* Content */}
            <div className="relative">
              <div className="text-4xl font-bold mb-2 flex items-center justify-center">
                <span className="mr-2">❓</span>
                {totalQuestions}
              </div>
              <div className="text-green-100 font-medium">
                Practice Questions
              </div>
            </div>

            {/* Hover Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          <div className="group relative overflow-hidden bg-gradient-to-br from-purple-500 via-pink-600 to-rose-700 rounded-xl shadow-lg border border-purple-200 dark:border-purple-800 p-6 text-center text-white transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
            <div className="absolute top-0 left-0 w-28 h-28 bg-white/5 rounded-full -translate-y-14 -translate-x-14" />

            {/* Content */}
            <div className="relative">
              <div className="text-4xl font-bold mb-2 flex items-center justify-center">
                <span className="mr-2">⏱️</span>
                {Math.round(totalMinutes / 60)}h {totalMinutes % 60}m
              </div>
              <div className="text-purple-100 font-medium">
                Total Learning Time
              </div>
            </div>

            {/* Hover Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map(resource => {
            // Define color schemes for different categories
            const getCategoryColors = (category: string) => {
              switch (category) {
                case 'javascript':
                  return {
                    gradient: 'from-yellow-400 via-orange-500 to-red-500',
                    hoverGradient: 'from-yellow-500 via-orange-600 to-red-600',
                    icon: '⚡',
                    bgColor: 'bg-yellow-50 dark:bg-yellow-950/20',
                    borderColor: 'border-yellow-200 dark:border-yellow-800',
                    textColor: 'text-yellow-800 dark:text-yellow-200',
                  };
                case 'react':
                  return {
                    gradient: 'from-blue-400 via-cyan-500 to-blue-600',
                    hoverGradient: 'from-blue-500 via-cyan-600 to-blue-700',
                    icon: '⚛️',
                    bgColor: 'bg-blue-50 dark:bg-blue-950/20',
                    borderColor: 'border-blue-200 dark:border-blue-800',
                    textColor: 'text-blue-800 dark:text-blue-200',
                  };
                case 'css':
                  return {
                    gradient: 'from-pink-400 via-purple-500 to-indigo-600',
                    hoverGradient: 'from-pink-500 via-purple-600 to-indigo-700',
                    icon: '🎨',
                    bgColor: 'bg-purple-50 dark:bg-purple-950/20',
                    borderColor: 'border-purple-200 dark:border-purple-800',
                    textColor: 'text-purple-800 dark:text-purple-200',
                  };
                case 'git':
                  return {
                    gradient: 'from-green-400 via-emerald-500 to-teal-600',
                    hoverGradient: 'from-green-500 via-emerald-600 to-teal-700',
                    icon: '📚',
                    bgColor: 'bg-green-50 dark:bg-green-950/20',
                    borderColor: 'border-green-200 dark:border-green-800',
                    textColor: 'text-green-800 dark:text-green-200',
                  };
                default:
                  return {
                    gradient: 'from-gray-400 via-gray-500 to-gray-600',
                    hoverGradient: 'from-gray-500 via-gray-600 to-gray-700',
                    icon: '📚',
                    bgColor: 'bg-gray-50 dark:bg-gray-950/20',
                    borderColor: 'border-gray-200 dark:border-gray-800',
                    textColor: 'text-gray-800 dark:text-gray-200',
                  };
              }
            };

            const colors = getCategoryColors(resource.category);
            const difficultyColors = {
              beginner:
                'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800',
              intermediate:
                'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800',
              advanced:
                'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800',
            };

            return (
              <div
                key={resource.id}
                className={`group relative overflow-hidden rounded-xl shadow-lg border-2 ${colors.borderColor} hover:shadow-2xl transition-all duration-500 hover:scale-105 transform`}
              >
                {/* Background Pattern */}
                <div
                  className={`absolute inset-0 ${colors.bgColor} opacity-50`}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent dark:from-white/5" />

                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/10 to-transparent rounded-full -translate-y-16 translate-x-16" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-white/10 to-transparent rounded-full translate-y-12 -translate-x-12" />

                {/* Content */}
                <div className="relative p-6">
                  {/* Header with Icon and Category */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">{colors.icon}</span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${colors.textColor} ${colors.bgColor} border border-current`}
                      >
                        {resource.category}
                      </span>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold border ${difficultyColors[resource.difficulty as keyof typeof difficultyColors] || difficultyColors.beginner}`}
                    >
                      {resource.difficulty}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-white transition-all duration-300">
                    {resource.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground mb-6 line-clamp-3 leading-relaxed">
                    {resource.description}
                  </p>

                  {/* Stats with Icons */}
                  <div className="flex items-center justify-between text-sm mb-6">
                    <div className="flex items-center space-x-2">
                      <span className="text-blue-500">📝</span>
                      <span className="font-semibold text-foreground">
                        {resource.totalQuestions} questions
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-green-500">⏱️</span>
                      <span className="font-semibold text-foreground">
                        {resource.estimatedTime} min
                      </span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <a
                    href={`/practice/fundamentals/${resource.category}`}
                    className={`group/btn relative inline-flex items-center justify-center w-full px-6 py-3 bg-gradient-to-r ${colors.gradient} hover:${colors.hoverGradient} text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl overflow-hidden`}
                  >
                    {/* Button Background Animation */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />

                    {/* Button Content */}
                    <span className="relative flex items-center space-x-2">
                      <span>Start Learning</span>
                      <span className="transform group-hover/btn:translate-x-1 transition-transform duration-200">
                        🚀
                      </span>
                    </span>
                  </a>

                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </div>

                {/* Corner Accent */}
                <div
                  className={`absolute top-0 right-0 w-0 h-0 border-l-[20px] border-l-transparent border-t-[20px] border-t-current ${colors.textColor} opacity-20`}
                />
              </div>
            );
          })}
        </div>

        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No resources found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function FrontendQuestionsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading fundamentals...</p>
          </div>
        </div>
      }
    >
      <FrontendQuestionsPageContent />
    </Suspense>
  );
}
