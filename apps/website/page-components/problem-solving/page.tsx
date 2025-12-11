"use client";

import React, { useState, useEffect } from "react";
// Note: This page uses hooks/API routes, not direct supabase client

import { useRouter } from "next/navigation";
import { Play, Clock, Users, Code, Search, Filter } from "lucide-react";
import { ProblemSolvingTask } from "@/types/admin";

export default function ProblemSolvingPage() {
  const router = useRouter();
  const [tasks, setTasks] = useState<ProblemSolvingTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Fetch tasks from API
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        if (searchTerm) params.append("search", searchTerm);
        if (selectedCategory) params.append("category", selectedCategory);
        if (selectedDifficulty) params.append("difficulty", selectedDifficulty);

        const response = await fetch(`/api/admin/problem-solving?${params}`);
        const data = await response.json();

        if (data.success) {
          setTasks(data.data);
          setError(null);
        } else {
          setError(data.error || "Failed to fetch tasks");
        }
      } catch (err) {
        setError("Failed to fetch tasks");
        console.error("Error fetching tasks:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [searchTerm, selectedCategory, selectedDifficulty]);

  const categories = [
    "Arrays",
    "Strings",
    "Linked Lists",
    "Trees",
    "Graphs",
    "Dynamic Programming",
    "Sorting",
    "Searching",
    "Math",
    "Hash Tables",
    "Stacks & Queues",
    "Greedy",
    "Backtracking",
    "Bit Manipulation",
  ];

  const difficulties = [
    { value: "easy", label: "Easy", color: "bg-green-600" },
    { value: "medium", label: "Medium", color: "bg-yellow-600" },
    { value: "hard", label: "Hard", color: "bg-red-600" },
  ];

  const getDifficultyColor = (difficulty: string) => {
    const diff = difficulties.find((d) => d.value === difficulty);
    return diff?.color || "bg-gray-600";
  };

  const handleTaskClick = (taskId: string) => {
    router.push(`/problem-solving/${taskId}`);
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      !searchTerm ||
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase()),
      );

    const matchesCategory =
      !selectedCategory || task.category === selectedCategory;
    const matchesDifficulty =
      !selectedDifficulty || task.difficulty === selectedDifficulty;

    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const totalQuestions = filteredTasks.length;
  const totalHours = filteredTasks.reduce((sum, task) => {
    const difficultyMultiplier =
      task.difficulty === "easy" ? 1 : task.difficulty === "medium" ? 2 : 3;
    return sum + difficultyMultiplier;
  }, 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading problems...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Error Loading Problems
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Problem Solving Challenges
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Master algorithmic thinking with our curated collection of coding
              problems
            </p>

            {/* Stats */}
            <div className="flex justify-center gap-8 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">
                  {totalQuestions}
                </div>
                <div className="text-sm text-gray-500">Problems</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  {totalHours}
                </div>
                <div className="text-sm text-gray-500">Hours of Practice</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">
                  {categories.length}
                </div>
                <div className="text-sm text-gray-500">Categories</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            {/* Search */}
            <div className="flex-1 w-full">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search problems..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="w-full sm:w-48">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Difficulty Filter */}
            <div className="w-full sm:w-32">
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Levels</option>
                {difficulties.map((difficulty) => (
                  <option key={difficulty.value} value={difficulty.value}>
                    {difficulty.label}
                  </option>
                ))}
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-3 py-2 ${viewMode === "grid" ? "bg-blue-600 text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`px-3 py-2 ${viewMode === "list" ? "bg-blue-600 text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}
              >
                List
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        {filteredTasks.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No problems found
            </h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        ) : (
          <>
            {/* Grid View */}
            {viewMode === "grid" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTasks.map((task) => (
                  <div
                    key={task.id}
                    onClick={() => handleTaskClick(task.id)}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-blue-300 transition-all duration-200 cursor-pointer group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full text-white ${getDifficultyColor(task.difficulty)}`}
                        >
                          {task.difficulty.charAt(0).toUpperCase() +
                            task.difficulty.slice(1)}
                        </span>
                        {task.difficulty === "easy" && (
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                            Beginner Friendly
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-gray-400">
                        <Code className="w-4 h-4" />
                        <span className="text-sm">{task.functionName}</span>
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {task.title}
                    </h3>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {task.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                            {task.category}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Play className="w-4 h-4" />
                          <span>{task.testCases.length} tests</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span>
                          {task.difficulty === "easy"
                            ? "15-30 min"
                            : task.difficulty === "medium"
                              ? "30-60 min"
                              : "60+ min"}
                        </span>
                      </div>
                    </div>

                    {/* Tags */}
                    {task.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-4">
                        {task.tags.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                        {task.tags.length > 3 && (
                          <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                            +{task.tags.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* List View */}
            {viewMode === "list" && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="text-left p-4 font-medium text-gray-900">
                          Problem
                        </th>
                        <th className="text-left p-4 font-medium text-gray-900">
                          Category
                        </th>
                        <th className="text-left p-4 font-medium text-gray-900">
                          Difficulty
                        </th>
                        <th className="text-left p-4 font-medium text-gray-900">
                          Function
                        </th>
                        <th className="text-left p-4 font-medium text-gray-900">
                          Tests
                        </th>
                        <th className="text-left p-4 font-medium text-gray-900">
                          Time
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredTasks.map((task) => (
                        <tr
                          key={task.id}
                          onClick={() => handleTaskClick(task.id)}
                          className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors"
                        >
                          <td className="p-4">
                            <div className="font-medium text-gray-900">
                              {task.title}
                            </div>
                            <div className="text-sm text-gray-500 truncate max-w-md">
                              {task.description}
                            </div>
                            {task.difficulty === "easy" && (
                              <span className="inline-block mt-1 px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                                Beginner Friendly
                              </span>
                            )}
                          </td>
                          <td className="p-4">
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                              {task.category}
                            </span>
                          </td>
                          <td className="p-4">
                            <span
                              className={`px-2 py-1 text-xs font-medium rounded-full text-white ${getDifficultyColor(task.difficulty)}`}
                            >
                              {task.difficulty.charAt(0).toUpperCase() +
                                task.difficulty.slice(1)}
                            </span>
                          </td>
                          <td className="p-4 font-mono text-sm text-gray-600">
                            {task.functionName}
                          </td>
                          <td className="p-4 text-sm text-gray-600">
                            {task.testCases.length}
                          </td>
                          <td className="p-4 text-sm text-gray-600">
                            {task.difficulty === "easy"
                              ? "15-30 min"
                              : task.difficulty === "medium"
                                ? "30-60 min"
                                : "60+ min"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
