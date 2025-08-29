"use client";

import { useState, useMemo } from "react";
import { internalResources } from "@/lib/internalResources";

export default function FrontendQuestionsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");

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
        </div>

        {/* Search and Filter Section */}
        <div className="bg-card rounded-lg shadow-sm border border-border p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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
              className="border rounded-lg p-6 bg-yellow-50 dark:bg-yellow-900/10 border-yellow-200 dark:border-yellow-800 hover:shadow-lg transition-shadow duration-200"
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
                <span className="px-3 py-1 rounded-full text-xs font-medium text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/20">
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
                  className="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium"
                  href={`/practice/fundamentals/${resource.id}`}
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
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Master Frontend Development?
            </h2>
            <p className="text-xl mb-6 opacity-90">
              Track your progress, explore study plans, and take your skills to
              the next level.
            </p>
            <div className="flex justify-center space-x-4">
              <a
                href="/practice/advanced"
                className="bg-white text-blue-600 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors duration-200"
              >
                Advanced Topics
              </a>
              <button className="border-2 border-white text-white px-6 py-3 rounded-md font-medium hover:bg-white hover:text-blue-600 transition-colors duration-200">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
