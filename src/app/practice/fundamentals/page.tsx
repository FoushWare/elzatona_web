"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { internalResources } from "@/lib/internalResources";

function FrontendQuestionsPageContent() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [showStatistics, setShowStatistics] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Handle URL parameters for category filtering
  useEffect(() => {
    const categoryFromUrl = searchParams.get("category");
    if (categoryFromUrl && ["javascript", "react", "css"].includes(categoryFromUrl)) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [searchParams]);

  // Filter resources to only include frontend fundamentals (JS, React, CSS)
  const frontendResources = useMemo(() => {
    return internalResources.filter((resource) =>
      ["javascript", "react", "css"].includes(resource.category)
    );
  }, []);

  // Filter resources based on search and filters
  const filteredResources = useMemo(() => {
    return frontendResources.filter((resource) => {
      const matchesSearch =
        searchQuery === "" ||
        resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        resource.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" || resource.category === selectedCategory;
      const matchesDifficulty =
        selectedDifficulty === "all" ||
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

        {/* Search and Filter Section */}
        <div className="bg-card rounded-lg shadow-sm border border-border p-6 mb-8">
          <div className={`grid grid-cols-1 md:grid-cols-4 gap-4 transition-all duration-300 ${
            showFilters ? 'block' : 'hidden md:grid'
          }`}>
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
                onChange={(e) => setSearchQuery(e.target.value)}
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
                onChange={(e) => setSelectedCategory(e.target.value)}
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
                onChange={(e) => setSelectedDifficulty(e.target.value)}
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
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 transition-all duration-300 ${
          showStatistics ? 'block' : 'hidden md:grid'
        }`}>
          <div className="bg-card rounded-lg shadow-sm border border-border p-6 text-center">
            <div className="text-3xl font-bold text-foreground mb-2">
              {totalResources}
            </div>
            <div className="text-muted-foreground">Resources</div>
          </div>
          <div className="bg-card rounded-lg shadow-sm border border-border p-6 text-center">
            <div className="text-3xl font-bold text-foreground mb-2">
              {totalQuestions}
            </div>
            <div className="text-muted-foreground">Questions</div>
          </div>
          <div className="bg-card rounded-lg shadow-sm border border-border p-6 text-center">
            <div className="text-3xl font-bold text-foreground mb-2">
              {Math.round(totalMinutes / 60)}h {totalMinutes % 60}m
            </div>
            <div className="text-muted-foreground">Total Time</div>
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => (
            <div
              key={resource.id}
              className="bg-card rounded-lg shadow-sm border border-border p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-muted-foreground">
                  {resource.category}
                </span>
                <span className="text-sm font-medium text-muted-foreground">
                  {resource.difficulty}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {resource.title}
              </h3>
              <p className="text-muted-foreground mb-4 line-clamp-3">
                {resource.description}
              </p>
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                <span>{resource.totalQuestions} questions</span>
                <span>{resource.estimatedTime} min</span>
              </div>
              <a
                href={resource.link}
                className="inline-flex items-center justify-center w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                Start Learning
              </a>
            </div>
          ))}
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
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading fundamentals...</p>
        </div>
      </div>
    }>
      <FrontendQuestionsPageContent />
    </Suspense>
  );
}
