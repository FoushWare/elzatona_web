"use client";

import { useState } from "react";
import { internalResources } from "@/lib/internalResources";
import InternalResourceCard from "@/components/InternalResourceCard";
import { useTranslation } from "@/hooks/useTranslation";

export default function InternalResourcesPage() {
  const { t, isRTL } = useTranslation();
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterDifficulty, setFilterDifficulty] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6); // Show 6 items per page (3 rows on desktop, 2 on tablet)

  const categories = [
    "all",
    "javascript",
    "react",
    "css",
    "html",
    "dom",
    "async",
    "es6",
  ];
  const difficulties = ["all", "beginner", "intermediate", "advanced"];

  const filteredResources = internalResources.filter((resource) => {
    const matchesCategory =
      filterCategory === "all" || resource.category === filterCategory;
    const matchesDifficulty =
      filterDifficulty === "all" || resource.difficulty === filterDifficulty;
    const matchesSearch =
      searchQuery === "" ||
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );

    return matchesCategory && matchesDifficulty && matchesSearch;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredResources.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentResources = filteredResources.slice(startIndex, endIndex);

  // Reset to first page when filters change
  const handleFilterChange = (newFilter: string, filterType: 'category' | 'difficulty' | 'search') => {
    setCurrentPage(1);
    if (filterType === 'category') setFilterCategory(newFilter);
    else if (filterType === 'difficulty') setFilterDifficulty(newFilter);
    else if (filterType === 'search') setSearchQuery(newFilter);
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t("internalResources.title")}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t("internalResources.description")}
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <label
                htmlFor="search"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                {t("common.search")}
              </label>
              <input
                type="text"
                id="search"
                placeholder={t("internalResources.searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => handleFilterChange(e.target.value, 'search')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                {t("internalResources.filterByCategory")}
              </label>
              <select
                id="category"
                value={filterCategory}
                onChange={(e) => handleFilterChange(e.target.value, 'category')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === "all"
                      ? t("common.all")
                      : category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Difficulty Filter */}
            <div>
              <label
                htmlFor="difficulty"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                {t("internalResources.filterByDifficulty")}
              </label>
              <select
                id="difficulty"
                value={filterDifficulty}
                onChange={(e) => handleFilterChange(e.target.value, 'difficulty')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {difficulties.map((difficulty) => (
                  <option key={difficulty} value={difficulty}>
                    {difficulty === "all"
                      ? t("common.all")
                      : t(`common.${difficulty}`)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {internalResources.length}
            </div>
            <div className="text-gray-600">{t("internalResources.stats.totalResources")}</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {internalResources.reduce(
                (total, resource) => total + resource.totalQuestions,
                0
              )}
            </div>
            <div className="text-gray-600">{t("internalResources.stats.totalQuestions")}</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="text-3xl font-bold text-yellow-600 mb-2">
              {internalResources.reduce(
                (total, resource) => total + resource.estimatedTime,
                0
              )}
            </div>
            <div className="text-gray-600">{t("internalResources.stats.totalMinutes")}</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {filteredResources.length}
            </div>
            <div className="text-gray-600">{t("internalResources.stats.filteredResults")}</div>
            {totalPages > 1 && (
              <div className="text-sm text-gray-500 mt-1">
                {t("internalResources.stats.page")} {currentPage} {t("internalResources.stats.of")} {totalPages}
              </div>
            )}
          </div>
        </div>

        {/* Resources Grid */}
        {currentResources.length > 0 ? (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {currentResources.map((resource) => (
                <InternalResourceCard key={resource.id} resource={resource} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* Page Info */}
                <div className="text-sm text-gray-700">
                  {t("internalResources.stats.showing")} {startIndex + 1} {t("internalResources.stats.to")} {Math.min(endIndex, filteredResources.length)} {t("internalResources.stats.of")} {filteredResources.length} {t("internalResources.stats.resources")}
                </div>

                {/* Pagination Controls */}
                <div className="flex items-center space-x-2">
                  {/* Previous Button */}
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    {t("pagination.previous")}
                  </button>

                  {/* Page Numbers */}
                  <div className="flex items-center space-x-1">
                    {getPageNumbers().map((page, index) => (
                      <button
                        key={index}
                        onClick={() => typeof page === 'number' && setCurrentPage(page)}
                        disabled={page === '...'}
                        className={`px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                          page === currentPage
                            ? 'bg-blue-600 text-white'
                            : page === '...'
                            ? 'text-gray-400 cursor-default'
                            : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  {/* Next Button */}
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    {t("pagination.next")}
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              {t("internalResources.noResults")}
            </h3>
            <p className="text-gray-600">
              {t("internalResources.noResultsDescription")}
            </p>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">
              {t("internalResources.cta.title")}
            </h2>
            <p className="text-xl mb-6 opacity-90">
              {t("internalResources.cta.description")}
            </p>
            <div className="flex justify-center space-x-4">
              <button className="bg-white text-blue-600 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors duration-200">
                {t("internalResources.cta.viewProgress")}
              </button>
              <button className="border-2 border-white text-white px-6 py-3 rounded-md font-medium hover:bg-white hover:text-blue-600 transition-colors duration-200">
                {t("internalResources.cta.learnMore")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
