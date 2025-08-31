"use client";

import { useState, useMemo } from "react";
import { internalResources } from "@/lib/internalResources";

export default function SeniorDevPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [showStatistics, setShowStatistics] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Filter resources to only include senior dev content
  const seniorDevResources = useMemo(() => {
    return internalResources.filter(
      (resource) => resource.category === "senior-dev"
    );
  }, []);

  // Filter resources based on search and filters
  const filteredResources = useMemo(() => {
    return seniorDevResources.filter((resource) => {
      const matchesSearch =
        searchQuery === "" ||
        resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDifficulty =
        selectedDifficulty === "all" ||
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
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Advanced Frontend Topics
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Advanced frontend concepts for senior developers. Master Webpack,
            performance optimization, system design, and modern frontend
            architecture.
          </p>

          {/* Mobile Toggle Buttons */}
          <div className="flex flex-wrap gap-3 justify-center mt-6 md:hidden">
            <button
              onClick={() => setShowStatistics(!showStatistics)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              {showStatistics ? "Hide Statistics" : "Show Statistics"}
            </button>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
            >
              {showFilters ? "Hide Filters" : "Show Filters"}
            </button>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className={`${showFilters ? 'block' : 'hidden md:block'} mb-8`}>
          <div className="bg-card rounded-lg shadow-sm border border-border p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                  placeholder="Search senior-level questions, topics, or concepts..."
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
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
        </div>

        {/* Statistics Cards */}
        <div className={`${showStatistics ? 'block' : 'hidden md:grid'} grid-cols-1 md:grid-cols-4 gap-6 mb-8`}>
          <div className="bg-card rounded-lg shadow-sm border border-border p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {totalResources}
            </div>
            <div className="text-card-foreground font-medium">
              Total Resources
            </div>
          </div>
          <div className="bg-card rounded-lg shadow-sm border border-border p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {totalQuestions}
            </div>
            <div className="text-card-foreground font-medium">
              Total Questions
            </div>
          </div>
          <div className="bg-card rounded-lg shadow-sm border border-border p-6 text-center">
            <div className="text-3xl font-bold text-yellow-600 mb-2">
              {totalMinutes}
            </div>
            <div className="text-card-foreground font-medium">
              Total Minutes
            </div>
          </div>
          <div className="bg-card rounded-lg shadow-sm border border-border p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {filteredResources.length}
            </div>
            <div className="text-card-foreground font-medium">
              Filtered Results
            </div>
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredResources.map((resource) => (
            <div
              key={resource.id}
              className="border rounded-lg p-6 bg-purple-50 dark:bg-purple-900/10 border-purple-200 dark:border-purple-800 hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl">{resource.icon}</span>
                  <div>
                    <h3 className="text-xl font-semibold text-card-foreground mb-1">
                      {resource.title}
                    </h3>
                    <p className="text-muted-foreground text-sm font-medium">
                      {resource.description}
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-medium text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/20">
                  {resource.difficulty}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div className="bg-card/50 rounded-lg p-3">
                  <div className="text-card-foreground font-semibold mb-1">
                    Questions
                  </div>
                  <div className="text-2xl font-bold text-blue-600">
                    {resource.totalQuestions}
                  </div>
                </div>
                <div className="bg-card/50 rounded-lg p-3">
                  <div className="text-card-foreground font-semibold mb-1">
                    Time
                  </div>
                  <div className="text-2xl font-bold text-green-600">
                    {resource.estimatedTime} min
                  </div>
                </div>
              </div>

              {/* Video Tutorial Section */}
              {resource.videoUrl && (
                <div className="mb-4">
                  <div className="flex items-center space-x-2 text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path>
                    </svg>
                    <span className="text-sm font-medium">
                      📹 Video Tutorial Available
                    </span>
                  </div>
                </div>
              )}

              <div className="mb-4">
                <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium flex items-center space-x-1">
                  <span>Show Details</span>
                  <svg
                    className="w-4 h-4 transform transition-transform"
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

              <div className="flex space-x-3">
                <a
                  className="flex-1 bg-purple-600 text-white text-center py-2 px-4 rounded-md hover:bg-purple-700 transition-colors duration-200 font-medium"
                  href={`/practice/advanced/${resource.id}`}
                >
                  Start Learning
                </a>
                <button className="px-4 py-2 border border-border text-muted-foreground rounded-md hover:bg-muted transition-colors duration-200">
                  Preview
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Level Up Your Frontend Skills?
            </h2>
            <p className="text-xl mb-6 opacity-90">
              Master advanced concepts, performance optimization, and modern
              frontend architecture.
            </p>
            <div className="flex justify-center space-x-4">
              <a
                href="/practice/fundamentals"
                className="bg-white text-purple-600 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors duration-200"
              >
                Frontend Fundamentals
              </a>
              <button className="border-2 border-white text-white px-6 py-3 rounded-md font-medium hover:bg-white hover:text-purple-600 transition-colors duration-200">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
