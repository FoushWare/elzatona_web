"use client";

import { useState } from "react";
import Link from "next/link";
import {
  seniorInterviewQuestions,
  getQuestionsByCategory,
  getQuestionById,
} from "@/lib/seniorInterviewQA";

export default function SeniorInterviewQAPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all");
  const [viewedQuestions, setViewedQuestions] = useState<Set<string>>(
    new Set()
  );

  const categories = getQuestionsByCategory();
  const categoryList = Object.keys(categories);

  const filteredQuestions = seniorInterviewQuestions.filter((question) => {
    const matchesCategory =
      selectedCategory === "all" || question.category === selectedCategory;
    const matchesDifficulty =
      difficultyFilter === "all" || question.difficulty === difficultyFilter;
    const matchesSearch =
      searchQuery === "" ||
      question.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      question.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      question.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );

    return matchesCategory && matchesDifficulty && matchesSearch;
  });

  const selectedQuestionData = selectedQuestion
    ? getQuestionById(selectedQuestion)
    : null;

  // Track viewed questions
  const handleQuestionSelect = (questionId: string) => {
    setSelectedQuestion(questionId);
    setViewedQuestions((prev) => new Set([...prev, questionId]));
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "hard":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "Easy";
      case "medium":
        return "Medium";
      case "hard":
        return "Hard";
      default:
        return "Unknown";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/internal-resources"
            className="text-blue-600 hover:text-blue-800 mb-4 inline-block"
          >
            ← Back to Internal Resources
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            General Frontend Q&A
          </h1>
          <p className="text-xl text-gray-600">
            Comprehensive questions and detailed explanations for frontend
            development
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-2xl font-bold text-blue-600">
              {seniorInterviewQuestions.length}
            </div>
            <div className="text-gray-600">Total Questions</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-2xl font-bold text-green-600">
              {categoryList.length}
            </div>
            <div className="text-gray-600">Categories</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-2xl font-bold text-yellow-600">
              {
                seniorInterviewQuestions.filter(
                  (q) => q.difficulty === "medium"
                ).length
              }
            </div>
            <div className="text-gray-600">Medium Difficulty</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-2xl font-bold text-red-600">
              {
                seniorInterviewQuestions.filter((q) => q.difficulty === "hard")
                  .length
              }
            </div>
            <div className="text-gray-600">Hard Questions</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-2xl font-bold text-purple-600">
              {viewedQuestions.size}
            </div>
            <div className="text-gray-600">Viewed</div>
            <div className="text-xs text-gray-500 mt-1">
              {Math.round(
                (viewedQuestions.size / seniorInterviewQuestions.length) * 100
              )}
              % Complete
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Filters and Question List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Filters</h3>

              {/* Search */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search Questions
                </label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search questions, answers, or tags..."
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Category Filter */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Categories</option>
                  {categoryList.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Difficulty Filter */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Difficulty
                </label>
                <select
                  value={difficultyFilter}
                  onChange={(e) => setDifficultyFilter(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Difficulties</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>

              <div className="text-sm text-gray-500">
                {filteredQuestions.length} questions found
              </div>
            </div>

            {/* Question List */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Questions
              </h3>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {filteredQuestions.map((question) => (
                  <button
                    key={question.id}
                    onClick={() => handleQuestionSelect(question.id)}
                    className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${
                      selectedQuestion === question.id
                        ? "border-blue-500 bg-blue-50"
                        : viewedQuestions.has(question.id)
                        ? "border-green-200 bg-green-50"
                        : "border-gray-200 hover:border-gray-300 bg-white"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">
                          {question.category === "Webpack & Tooling" && "🔧"}
                          {question.category === "CSS-in-JS" && "🎨"}
                          {question.category === "React – Components & Hooks" &&
                            "⚛️"}
                          {question.category === "React – State Management" &&
                            "📊"}
                          {question.category === "Testing" && "🧪"}
                          {question.category === "Web Performance" && "⚡"}
                        </span>
                        <span className="text-xs text-gray-500 font-medium">
                          {question.category}
                        </span>
                      </div>
                      <span
                        className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(
                          question.difficulty
                        )}`}
                      >
                        {getDifficultyText(question.difficulty)}
                      </span>
                    </div>
                    <h4 className="font-medium text-gray-900 line-clamp-2 mb-2">
                      {question.question}
                    </h4>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                      {question.answer}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {question.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                        {question.tags.length > 3 && (
                          <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                            +{question.tags.length - 3}
                          </span>
                        )}
                      </div>
                      {viewedQuestions.has(question.id) && (
                        <span className="text-green-500 text-sm">✓ Viewed</span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Question Detail */}
          <div className="lg:col-span-2">
            {selectedQuestionData ? (
              <div className="bg-white rounded-lg shadow-sm p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">
                      {selectedQuestionData.category === "Webpack & Tooling" &&
                        "🔧"}
                      {selectedQuestionData.category === "CSS-in-JS" && "🎨"}
                      {selectedQuestionData.category ===
                        "React – Components & Hooks" && "⚛️"}
                      {selectedQuestionData.category ===
                        "React – State Management" && "📊"}
                      {selectedQuestionData.category === "Testing" && "🧪"}
                      {selectedQuestionData.category === "Web Performance" &&
                        "⚡"}
                    </span>
                    <div>
                      <span className="text-sm text-gray-500 font-medium">
                        {selectedQuestionData.category}
                      </span>
                      <h2 className="text-2xl font-bold text-gray-900 mt-1">
                        {selectedQuestionData.question}
                      </h2>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 text-sm font-medium rounded-full ${getDifficultyColor(
                      selectedQuestionData.difficulty
                    )}`}
                  >
                    {getDifficultyText(selectedQuestionData.difficulty)}
                  </span>
                </div>

                {/* Answer */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Answer
                  </h3>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-green-800">
                      {selectedQuestionData.answer}
                    </p>
                  </div>
                </div>

                {/* Detailed Explanation */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Detailed Explanation
                  </h3>
                  <div className="prose max-w-none">
                    <p className="text-gray-700 leading-relaxed">
                      {selectedQuestionData.explanation}
                    </p>
                  </div>
                </div>

                {/* Code Example */}
                {selectedQuestionData.codeExample && (
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Code Example
                    </h3>
                    <div className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto">
                      <pre className="text-sm">
                        {selectedQuestionData.codeExample}
                      </pre>
                    </div>
                  </div>
                )}

                {/* Visual Explanation */}
                {selectedQuestionData.visualExplanation && (
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Visual Explanation
                    </h3>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-blue-800">
                        {selectedQuestionData.visualExplanation}
                      </p>
                    </div>
                  </div>
                )}

                {/* Key Points */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Key Points
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedQuestionData.keyPoints.map((point, index) => (
                      <div
                        key={index}
                        className="flex items-start p-3 bg-gray-50 rounded-lg border border-gray-200"
                      >
                        <span className="text-blue-600 mr-3 mt-1 text-lg">
                          💡
                        </span>
                        <span className="text-gray-700 text-sm">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Related Topics
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedQuestionData.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex justify-between pt-6 border-t border-gray-200">
                  <button
                    onClick={() => {
                      const currentIndex = filteredQuestions.findIndex(
                        (q) => q.id === selectedQuestion
                      );
                      if (currentIndex > 0) {
                        setSelectedQuestion(
                          filteredQuestions[currentIndex - 1].id
                        );
                      }
                    }}
                    disabled={
                      filteredQuestions.findIndex(
                        (q) => q.id === selectedQuestion
                      ) === 0
                    }
                    className="px-4 py-2 text-blue-600 hover:text-blue-800 disabled:text-gray-400 disabled:cursor-not-allowed"
                  >
                    ← Previous
                  </button>
                  <button
                    onClick={() => {
                      const currentIndex = filteredQuestions.findIndex(
                        (q) => q.id === selectedQuestion
                      );
                      if (currentIndex < filteredQuestions.length - 1) {
                        setSelectedQuestion(
                          filteredQuestions[currentIndex + 1].id
                        );
                      }
                    }}
                    disabled={
                      filteredQuestions.findIndex(
                        (q) => q.id === selectedQuestion
                      ) ===
                      filteredQuestions.length - 1
                    }
                    className="px-4 py-2 text-blue-600 hover:text-blue-800 disabled:text-gray-400 disabled:cursor-not-allowed"
                  >
                    Next →
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <div className="text-gray-400 mb-4">
                  <svg
                    className="mx-auto h-12 w-12"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Select a Question
                </h3>
                <p className="text-gray-500">
                  Choose a question from the list to view detailed explanations,
                  code examples, and key points.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Study Resources */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Study Resources
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">
                Practice More
              </h4>
              <div className="space-y-2">
                <Link
                  href="/questions/javascript/promises"
                  className="block text-blue-600 hover:text-blue-800 text-sm"
                >
                  → JavaScript Promises
                </Link>
                <Link
                  href="/questions/react/state-management"
                  className="block text-blue-600 hover:text-blue-800 text-sm"
                >
                  → React State Management
                </Link>
                <Link
                  href="/questions/user-interface/grid-flexbox"
                  className="block text-blue-600 hover:text-blue-800 text-sm"
                >
                  → CSS Grid & Flexbox
                </Link>
              </div>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Study Plans</h4>
              <div className="space-y-2">
                <Link
                  href="/study-plans"
                  className="block text-blue-600 hover:text-blue-800 text-sm"
                >
                  → View Study Plans
                </Link>
                <Link
                  href="/study-plans/one-week-intensive"
                  className="block text-blue-600 hover:text-blue-800 text-sm"
                >
                  → 1 Week Intensive
                </Link>
                <Link
                  href="/study-plans/one-month-balanced"
                  className="block text-blue-600 hover:text-blue-800 text-sm"
                >
                  → 1 Month Balanced
                </Link>
              </div>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">
                Internal Resources
              </h4>
              <div className="space-y-2">
                <Link
                  href="/internal-resources"
                  className="block text-blue-600 hover:text-blue-800 text-sm"
                >
                  → All Resources
                </Link>
                <Link
                  href="/questions"
                  className="block text-blue-600 hover:text-blue-800 text-sm"
                >
                  → Practice Questions
                </Link>
                <Link
                  href="/progress"
                  className="block text-blue-600 hover:text-blue-800 text-sm"
                >
                  → Track Progress
                </Link>
              </div>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">
                External Resources
              </h4>
              <div className="space-y-2">
                <a
                  href="https://webpack.js.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-blue-600 hover:text-blue-800 text-sm"
                >
                  → Webpack Documentation
                </a>
                <a
                  href="https://react.dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-blue-600 hover:text-blue-800 text-sm"
                >
                  → React Documentation
                </a>
                <a
                  href="https://web.dev/performance/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-blue-600 hover:text-blue-800 text-sm"
                >
                  → Web Performance
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
