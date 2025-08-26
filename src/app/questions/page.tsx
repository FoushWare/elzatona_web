"use client";

import { useState, useEffect } from "react";

// Types for the questions page
interface Question {
  id: string;
  title: string;
  description: string;
  category: "coding" | "system-design" | "quiz";
  subCategory: "javascript-functions" | "user-interface" | "algorithmic" | "react-hooks" | "css-layouts" | "html-semantics";
  difficulty: "easy" | "medium" | "hard";
  frameworks: string[];
  tags: string[];
  completionCount: number;
  estimatedTime: number;
  isPremium?: boolean;
  isWarmUp?: boolean;
}

interface Topic {
  id: string;
  name: string;
  count: number;
}

interface Company {
  id: string;
  name: string;
  count: number;
}

// Sample data
const sampleQuestions: Question[] = [
  {
    id: "1",
    title: "Counter",
    description: "Build a simple counter that increments whenever a button is clicked",
    category: "coding",
    subCategory: "user-interface",
    difficulty: "easy",
    frameworks: ["React", "Angular", "Vue", "Svelte"],
    tags: ["UI coding", "State management", "Event handling"],
    completionCount: 34400,
    estimatedTime: 15,
    isWarmUp: true
  },
  {
    id: "2",
    title: "Make Counter",
    description: "Implement a function that accepts an integer value and returns a function that can be repeatedly called to return increasing values",
    category: "coding",
    subCategory: "javascript-functions",
    difficulty: "easy",
    frameworks: ["JavaScript", "TypeScript"],
    tags: ["JS functions", "Closures", "Higher-order functions"],
    completionCount: 16600,
    estimatedTime: 20
  },
  {
    id: "3",
    title: "Mean",
    description: "Implement a function that finds the mean of the values inside an array",
    category: "coding",
    subCategory: "javascript-functions",
    difficulty: "easy",
    frameworks: ["JavaScript", "TypeScript"],
    tags: ["JS functions", "Array methods", "Mathematics"],
    completionCount: 14000,
    estimatedTime: 15
  },
  {
    id: "4",
    title: "Function.prototype.call",
    description: "Implement the Function.prototype.call() function that calls the function with a given `this` value and provided arguments",
    category: "coding",
    subCategory: "javascript-functions",
    difficulty: "easy",
    frameworks: ["JavaScript"],
    tags: ["JS functions", "Prototypes", "Context binding"],
    completionCount: 5360,
    estimatedTime: 25
  },
  {
    id: "5",
    title: "Min By",
    description: "Implement a function that finds the minimum element based on the specified criteria",
    category: "coding",
    subCategory: "algorithmic",
    difficulty: "easy",
    frameworks: ["JavaScript", "TypeScript"],
    tags: ["Algorithmic coding", "Array methods", "Comparison"],
    completionCount: 5420,
    estimatedTime: 20
  },
  {
    id: "6",
    title: "Selection Sort",
    description: "Implement a function that performs a selection sort",
    category: "coding",
    subCategory: "algorithmic",
    difficulty: "easy",
    frameworks: ["JavaScript", "TypeScript"],
    tags: ["Algorithmic coding", "Sorting", "Algorithms"],
    completionCount: 3260,
    estimatedTime: 30
  },
  {
    id: "7",
    title: "Stack",
    description: "Implement a stack data structure containing the common stack methods",
    category: "coding",
    subCategory: "algorithmic",
    difficulty: "easy",
    frameworks: ["JavaScript", "TypeScript"],
    tags: ["Algorithmic coding", "Data structures", "Stack"],
    completionCount: 9150,
    estimatedTime: 25
  },
  {
    id: "8",
    title: "useBoolean",
    description: "Implement a hook that manages a boolean state, with additional convenience utility methods",
    category: "coding",
    subCategory: "react-hooks",
    difficulty: "easy",
    frameworks: ["React"],
    tags: ["React Hooks", "State management", "Custom hooks"],
    completionCount: 3340,
    estimatedTime: 20
  }
];

const topics: Topic[] = [
  { id: "oop", name: "OOP", count: 45 },
  { id: "accessibility", name: "Accessibility", count: 32 },
  { id: "react-hooks", name: "React Hooks", count: 28 },
  { id: "networking", name: "Networking", count: 25 },
  { id: "array", name: "Array", count: 38 },
  { id: "async", name: "Async", count: 35 },
  { id: "breadth-first-search", name: "Breadth-first search", count: 18 },
  { id: "binary", name: "Binary", count: 22 },
  { id: "binary-search", name: "Binary search", count: 20 },
  { id: "binary-search-tree", name: "Binary search tree", count: 15 },
  { id: "binary-tree", name: "Binary tree", count: 25 },
  { id: "closure", name: "Closure", count: 30 },
  { id: "depth-first-search", name: "Depth-first search", count: 16 },
  { id: "dynamic-programming", name: "Dynamic programming", count: 12 },
  { id: "graph", name: "Graph", count: 14 },
  { id: "greedy", name: "Greedy", count: 10 },
  { id: "heap", name: "Heap", count: 8 },
  { id: "intervals", name: "Intervals", count: 12 },
  { id: "linked-list", name: "Linked list", count: 20 },
  { id: "matrix", name: "Matrix", count: 15 },
  { id: "queue", name: "Queue", count: 12 },
  { id: "recursion", name: "Recursion", count: 18 },
  { id: "sorting", name: "Sorting", count: 25 },
  { id: "stack", name: "Stack", count: 16 },
  { id: "string", name: "String", count: 30 },
  { id: "topological-sort", name: "Topological sort", count: 8 },
  { id: "tree", name: "Tree", count: 22 },
  { id: "trie", name: "Trie", count: 6 },
  { id: "web-apis", name: "Web APIs", count: 35 }
];

const companies: Company[] = [
  { id: "google", name: "Google", count: 45 },
  { id: "amazon", name: "Amazon", count: 38 },
  { id: "apple", name: "Apple", count: 32 },
  { id: "bytedance", name: "ByteDance", count: 25 },
  { id: "microsoft", name: "Microsoft", count: 40 },
  { id: "openai", name: "OpenAI", count: 18 },
  { id: "tiktok", name: "TikTok", count: 22 },
  { id: "uber", name: "Uber", count: 28 },
  { id: "linkedin", name: "LinkedIn", count: 30 },
  { id: "atlassian", name: "Atlassian", count: 20 },
  { id: "stripe", name: "Stripe", count: 25 },
  { id: "lyft", name: "Lyft", count: 22 },
  { id: "airbnb", name: "Airbnb", count: 28 },
  { id: "dropbox", name: "Dropbox", count: 18 }
];

export default function QuestionsPage() {
  const [activeTab, setActiveTab] = useState<"coding" | "system-design" | "quiz">("coding");
  const [activeSubCategory, setActiveSubCategory] = useState<string>("javascript-functions");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"popularity" | "difficulty" | "newest">("popularity");

  // Filter questions based on current selections
  const filteredQuestions = sampleQuestions.filter(question => {
    if (question.category !== activeTab) return false;
    if (activeTab === "coding" && question.subCategory !== activeSubCategory) return false;
    if (searchTerm && !question.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !question.description.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    if (selectedTopics.length > 0 && !selectedTopics.some(topic => question.tags.some(tag => tag.toLowerCase().includes(topic.toLowerCase())))) return false;
    if (selectedCompanies.length > 0 && !selectedCompanies.some(company => question.tags.some(tag => tag.toLowerCase().includes(company.toLowerCase())))) return false;
    return true;
  });

  // Sort questions
  const sortedQuestions = [...filteredQuestions].sort((a, b) => {
    switch (sortBy) {
      case "popularity":
        return b.completionCount - a.completionCount;
      case "difficulty":
        const difficultyOrder = { easy: 1, medium: 2, hard: 3 };
        return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
      case "newest":
        return parseInt(b.id) - parseInt(a.id);
      default:
        return 0;
    }
  });

  // Calculate statistics
  const totalQuestions = sampleQuestions.length;
  const totalHours = sampleQuestions.reduce((sum, q) => sum + q.estimatedTime, 0);

  const toggleTopic = (topicId: string) => {
    setSelectedTopics(prev => 
      prev.includes(topicId) 
        ? prev.filter(id => id !== topicId)
        : [...prev, topicId]
    );
  };

  const toggleCompany = (companyId: string) => {
    setSelectedCompanies(prev => 
      prev.includes(companyId) 
        ? prev.filter(id => id !== companyId)
        : [...prev, companyId]
    );
  };

  const clearAllFilters = () => {
    setSelectedTopics([]);
    setSelectedCompanies([]);
    setSearchTerm("");
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return "text-green-400";
      case "medium": return "text-yellow-400";
      case "hard": return "text-red-400";
      default: return "text-gray-400";
    }
  };

  const getDifficultyBgColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return "bg-green-100 text-green-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "hard": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const formatCompletionCount = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">All Practice Questions</h1>
          <p className="text-lg text-gray-400 mb-6">The largest question bank of 500+ practice questions for front end interviews</p>
          
          {/* Feature Highlights */}
          <div className="flex flex-wrap gap-4 mb-6">
            <span className="flex items-center bg-gray-800 px-3 py-1 rounded-full text-sm">
              <svg className="w-4 h-4 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Solved by ex-interviewers
            </span>
            <span className="flex items-center bg-gray-800 px-3 py-1 rounded-full text-sm">
              <svg className="w-4 h-4 mr-2 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
              </svg>
              Test cases
            </span>
            <span className="flex items-center bg-gray-800 px-3 py-1 rounded-full text-sm">
              <svg className="w-4 h-4 mr-2 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Code in browser
            </span>
          </div>

          <p className="text-gray-300 max-w-3xl">
            Save the trouble of searching the web for front end interview questions. We have 500+ practice questions in every framework, format, and topic, each with high quality answers and tests from big tech senior / staff engineers.
          </p>
        </div>

        {/* Search and Sort */}
        <div className="flex items-center space-x-4 mb-8">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search within this list of questions"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100"
            />
            <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-gray-800 px-4 py-2 rounded-lg border border-gray-700 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100"
          >
            <option value="popularity">Sort by popularity</option>
            <option value="difficulty">Sort by difficulty</option>
            <option value="newest">Sort by newest</option>
          </select>
        </div>

        {/* Main Content and Sidebar */}
        <div className="flex gap-8">
          {/* Main Content */}
          <div className="flex-grow">
            {/* Tabs */}
            <div className="flex border-b border-gray-700 mb-8">
              <button
                onClick={() => setActiveTab("coding")}
                className={`px-6 py-3 font-medium transition-colors ${
                  activeTab === "coding" 
                    ? "text-blue-400 border-b-2 border-blue-400" 
                    : "text-gray-400 hover:text-gray-200"
                }`}
              >
                Coding
              </button>
              <button
                onClick={() => setActiveTab("system-design")}
                className={`px-6 py-3 font-medium transition-colors ${
                  activeTab === "system-design" 
                    ? "text-blue-400 border-b-2 border-blue-400" 
                    : "text-gray-400 hover:text-gray-200"
                }`}
              >
                System design
              </button>
              <button
                onClick={() => setActiveTab("quiz")}
                className={`px-6 py-3 font-medium transition-colors ${
                  activeTab === "quiz" 
                    ? "text-blue-400 border-b-2 border-blue-400" 
                    : "text-gray-400 hover:text-gray-200"
                }`}
              >
                Quiz
              </button>
            </div>

            {/* Coding Sub-filters */}
            {activeTab === "coding" && (
              <div className="flex space-x-4 mb-8">
                <button
                  onClick={() => setActiveSubCategory("javascript-functions")}
                  className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeSubCategory === "javascript-functions"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-700"
                  }`}
                >
                  <span className="mr-2">⚡</span>
                  JavaScript functions
                </button>
                <button
                  onClick={() => setActiveSubCategory("user-interface")}
                  className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeSubCategory === "user-interface"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-700"
                  }`}
                >
                  <span className="mr-2">🎨</span>
                  User interface coding
                </button>
                <button
                  onClick={() => setActiveSubCategory("algorithmic")}
                  className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeSubCategory === "algorithmic"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-700"
                  }`}
                >
                  <span className="mr-2">🧮</span>
                  Algorithmic coding
                </button>
                <button
                  onClick={() => setActiveSubCategory("react-hooks")}
                  className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeSubCategory === "react-hooks"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-700"
                  }`}
                >
                  <span className="mr-2">⚛️</span>
                  React Hooks
                </button>
                <button
                  onClick={() => setActiveSubCategory("css-layouts")}
                  className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeSubCategory === "css-layouts"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-700"
                  }`}
                >
                  <span className="mr-2">🎯</span>
                  CSS Layouts
                </button>
                <button
                  onClick={() => setActiveSubCategory("html-semantics")}
                  className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeSubCategory === "html-semantics"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-700"
                  }`}
                >
                  <span className="mr-2">📝</span>
                  HTML Semantics
                </button>
              </div>
            )}

            {/* Stats */}
            <div className="flex space-x-6 mb-8 text-gray-400">
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm12 12H4V6h12v10z" clipRule="evenodd" />
                </svg>
                {totalQuestions} questions
              </span>
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l3 3a1 1 0 001.414-1.414L11 9.586V6z" clipRule="evenodd" />
                </svg>
                {totalHours} hours total
              </span>
            </div>

            {/* Questions List */}
            <div className="space-y-4">
              {sortedQuestions.map((question) => (
                <div key={question.id} className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gray-750 transition-colors cursor-pointer">
                  <div className="flex justify-between items-start">
                    <div className="flex-grow">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-semibold">{question.title}</h3>
                        {question.isWarmUp && (
                          <span className="px-3 py-1 bg-orange-500 text-white text-xs rounded-full">
                            Warm up question
                          </span>
                        )}
                        {question.isPremium && (
                          <span className="px-3 py-1 bg-yellow-500 text-white text-xs rounded-full">
                            Premium
                          </span>
                        )}
                      </div>
                      <p className="text-gray-300 mb-4">{question.description}</p>
                      <div className="flex items-center flex-wrap gap-3 text-sm text-gray-400">
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                          </svg>
                          {question.subCategory.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())}
                        </span>
                        <span className={`flex items-center ${getDifficultyColor(question.difficulty)}`}>
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          {question.difficulty}
                        </span>
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l3 3a1 1 0 001.414-1.414L11 9.586V6z" clipRule="evenodd" />
                          </svg>
                          {question.estimatedTime} min
                        </span>
                        <div className="flex items-center gap-1">
                          {question.frameworks.map((framework, index) => (
                            <span key={index} className="px-2 py-1 bg-gray-700 rounded text-xs">
                              {framework}
                            </span>
                          ))}
                        </div>
                        <span className="flex items-center ml-auto text-green-400">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          {formatCompletionCount(question.completionCount)} done
                        </span>
                      </div>
                    </div>
                    <svg className="w-6 h-6 text-gray-400 ml-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>

            {sortedQuestions.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">🔍</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No questions found</h3>
                <p className="text-gray-600">Try adjusting your filters or search terms</p>
              </div>
            )}
          </div>

          {/* Right Sidebar - Filters */}
          <div className="w-80 flex-shrink-0">
            <div className="sticky top-8">
              {/* Clear Filters */}
              {(selectedTopics.length > 0 || selectedCompanies.length > 0 || searchTerm) && (
                <div className="mb-6">
                  <button
                    onClick={clearAllFilters}
                    className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
                  >
                    🗑️ Clear all filters
                  </button>
                </div>
              )}

              {/* Topics Section */}
              <div className="bg-gray-800 rounded-lg p-4 mb-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <svg className="w-5 h-5 text-blue-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" clipRule="evenodd" />
                  </svg>
                  Topics
                </h3>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {topics.map((topic) => (
                    <label key={topic.id} className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedTopics.includes(topic.id)}
                        onChange={() => toggleTopic(topic.id)}
                        className="mr-3 rounded border-gray-600 text-blue-600 focus:ring-blue-500 focus:ring-offset-gray-800"
                      />
                      <span className="text-sm text-gray-300">
                        {topic.name} ({topic.count})
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Company Section */}
              <div className="bg-gray-800 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <svg className="w-5 h-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm12 12H4V6h12v10z" clipRule="evenodd" />
                  </svg>
                  Company
                </h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {companies.map((company) => (
                    <label key={company.id} className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedCompanies.includes(company.id)}
                        onChange={() => toggleCompany(company.id)}
                        className="mr-3 rounded border-gray-600 text-green-600 focus:ring-green-500 focus:ring-offset-gray-800"
                      />
                      <span className="text-sm text-gray-300">
                        {company.name} ({company.count})
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Online Users */}
              <div className="mt-6 bg-gray-800 rounded-lg p-4 text-center">
                <div className="text-sm text-gray-400 mb-2">550 online</div>
                <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
                  Feedback
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
