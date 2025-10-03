'use client';

import { useState, useEffect, useRef } from 'react';
import {
  learningResources,
  resourceCategories,
  getResourcesByFilter,
} from '@/lib/resources';
import {
  LearningResource,
  ResourceCategory,
  ResourceType,
} from '@/types/resource';
import ResourceCard from '@/components/ResourceCard';
import CategoryCard from '@/components/CategoryCard';

export default function ResourcesPage() {
  const [filteredResources, setFilteredResources] =
    useState<LearningResource[]>(learningResources);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<
    ResourceCategory | 'all'
  >('all');
  const [selectedType, setSelectedType] = useState<ResourceType | 'all'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<
    'beginner' | 'intermediate' | 'advanced' | 'all'
  >('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [resourcesPerPage] = useState(12);
  const [showFilters, setShowFilters] = useState(false);
  const [showStatistics, setShowStatistics] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null); // Ref for the filter panel

  useEffect(() => {
    const filtered = getResourcesByFilter({
      category: selectedCategory !== 'all' ? selectedCategory : undefined,
      type: selectedType !== 'all' ? selectedType : undefined,
      difficulty: selectedDifficulty !== 'all' ? selectedDifficulty : undefined,
      searchTerm: searchTerm || undefined,
    });
    setFilteredResources(filtered);
    setCurrentPage(1);

    // Scroll to resources section when filters change
    if (
      selectedCategory !== 'all' ||
      selectedType !== 'all' ||
      selectedDifficulty !== 'all' ||
      searchTerm
    ) {
      setTimeout(() => {
        const resourcesSection = document.getElementById('resources-section');
        if (resourcesSection) {
          resourcesSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      }, 100);
    }
  }, [selectedCategory, selectedType, selectedDifficulty, searchTerm]);

  // Click outside to close filters
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setShowFilters(false);
      }
    };

    if (showFilters) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showFilters]);

  // Pagination
  const indexOfLastResource = currentPage * resourcesPerPage;
  const indexOfFirstResource = indexOfLastResource - resourcesPerPage;
  const currentResources = filteredResources.slice(
    indexOfFirstResource,
    indexOfLastResource
  );
  const totalPages = Math.ceil(filteredResources.length / resourcesPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedType('all');
    setSelectedDifficulty('all');
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/20';
      case 'intermediate':
        return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/20';
      case 'advanced':
        return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/20';
      default:
        return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'article':
        return '📄';
      case 'video':
        return '🎥';
      case 'tool':
        return '⚙️';
      case 'course':
        return '📚';
      case 'book':
        return '📖';
      case 'cheatsheet':
        return '📋';
      case 'documentation':
        return '📝';
      default:
        return '🔗';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card shadow-sm border-b border-border">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Frontend Learning Resources
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Curated collection of the best frontend development resources,
              tools, and learning materials
            </p>
            {/* Mobile Toggle Buttons - Hidden on desktop */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6 md:hidden">
              <button
                onClick={() => setShowStatistics(!showStatistics)}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                {showStatistics ? 'Hide Statistics' : 'Show Statistics'}
                <span className="ml-2">📊</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Categories and Filters */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground mb-4 lg:mb-0">
              Browse by Category
            </h2>

            {/* Mobile Toggle Buttons */}
            <div className="md:hidden flex gap-2 mb-4">
              <button
                onClick={() => setShowStatistics(!showStatistics)}
                className="px-4 py-2 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white text-sm rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md"
              >
                {showStatistics ? 'Hide Stats' : 'Show Stats'}
              </button>
            </div>

            {/* Filters Toggle Button */}
            <div className="relative">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
              >
                <svg
                  className={`w-5 h-5 mr-2 transition-transform duration-300 ${
                    showFilters ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  />
                </svg>
                <span className="font-medium">
                  {showFilters ? 'Hide Filters' : 'Show Filters'}
                </span>
              </button>

              {/* Filters Panel */}
              {showFilters && (
                <div
                  ref={filterRef}
                  className="absolute top-full right-0 mt-2 w-96 bg-card rounded-xl shadow-2xl border border-border p-6 z-10"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-foreground flex items-center">
                      <svg
                        className="w-5 h-5 text-blue-600 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                        />
                      </svg>
                      Advanced Filters
                    </h3>
                    <button
                      onClick={() => setShowFilters(false)}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {/* Search */}
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        🔍 Search Resources
                      </label>
                      <input
                        type="text"
                        placeholder="Search by title, description, or tags..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-background hover:bg-muted"
                      />
                    </div>

                    {/* Category Filter */}
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        📂 Category
                      </label>
                      <select
                        value={selectedCategory}
                        onChange={e =>
                          setSelectedCategory(
                            e.target.value as ResourceCategory | 'all'
                          )
                        }
                        className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-background hover:bg-muted"
                      >
                        <option value="all">All Categories</option>
                        {resourceCategories.map(category => (
                          <option key={category.id} value={category.id}>
                            {category.name} ({category.count})
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Type Filter */}
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        🎯 Type
                      </label>
                      <select
                        value={selectedType}
                        onChange={e =>
                          setSelectedType(
                            e.target.value as ResourceType | 'all'
                          )
                        }
                        className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-background hover:bg-muted"
                      >
                        <option value="all">All Types</option>
                        <option value="article">📄 Articles</option>
                        <option value="video">🎥 Videos</option>
                        <option value="tool">⚙️ Tools</option>
                        <option value="course">📚 Courses</option>
                        <option value="book">📖 Books</option>
                        <option value="cheatsheet">📋 Cheatsheets</option>
                        <option value="documentation">📝 Documentation</option>
                      </select>
                    </div>

                    {/* Difficulty Filter */}
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        🎯 Difficulty
                      </label>
                      <select
                        value={selectedDifficulty}
                        onChange={e =>
                          setSelectedDifficulty(
                            e.target.value as
                              | 'beginner'
                              | 'intermediate'
                              | 'advanced'
                              | 'all'
                          )
                        }
                        className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-background hover:bg-muted"
                      >
                        <option value="all">All Difficulties</option>
                        <option value="beginner">🟢 Beginner</option>
                        <option value="intermediate">🟡 Intermediate</option>
                        <option value="advanced">🔴 Advanced</option>
                      </select>
                    </div>

                    {/* Clear Filters Button */}
                    <button
                      onClick={clearFilters}
                      className="w-full px-4 py-3 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md"
                    >
                      🗑️ Clear All Filters
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Category Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {resourceCategories.map(category => (
              <CategoryCard
                key={category.id}
                category={category}
                isSelected={selectedCategory === category.id}
                onClick={() => setSelectedCategory(category.id)}
              />
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div
          id="resources-section"
          className="flex justify-between items-center mb-6 mt-8"
        >
          <p className="text-muted-foreground">
            Showing {filteredResources.length} of {learningResources.length}{' '}
            resources
          </p>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>Type:</span>
            {selectedType !== 'all' && (
              <span className="inline-flex items-center px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                {getTypeIcon(selectedType)} {selectedType}
              </span>
            )}
            {selectedDifficulty !== 'all' && (
              <span
                className={`inline-flex items-center px-2 py-1 rounded-full ${getDifficultyColor(
                  selectedDifficulty
                )}`}
              >
                {selectedDifficulty}
              </span>
            )}
          </div>
        </div>

        {/* Resources Grid */}
        {currentResources.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {currentResources.map(resource => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-muted-foreground text-6xl mb-4">🔍</div>
            <h3 className="text-lg font-medium text-foreground mb-2">
              No resources found
            </h3>
            <p className="text-muted-foreground">
              Try adjusting your filters or search terms
            </p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center">
            <nav className="flex items-center space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-2 text-sm font-medium text-muted-foreground bg-card border border-border rounded-md hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-2 text-sm font-medium rounded-md ${
                    currentPage === page
                      ? 'bg-blue-600 text-white'
                      : 'text-muted-foreground bg-card border border-border hover:bg-muted'
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-2 text-sm font-medium text-muted-foreground bg-card border border-border rounded-md hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </nav>
          </div>
        )}

        {/* Internal Resources Section */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Self-Contained Learning Resources
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              No external links needed! Our internal resources provide
              comprehensive learning content with interactive questions,
              detailed explanations, and progress tracking.
            </p>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg p-8 border border-green-200 dark:border-green-800">
            <div className="text-center">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                JavaScript, React & CSS Interview Questions
              </h3>
              <p className="text-lg text-muted-foreground mb-6">
                Master frontend development with our carefully crafted
                questions, complete with code examples, explanations, and
                interactive learning.
              </p>
              <a
                href="/internal-resources"
                className="inline-block bg-green-600 text-white px-8 py-3 rounded-md font-medium hover:bg-green-700 transition-colors duration-200"
              >
                Explore Internal Resources
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
