"use client";

import { useState } from "react";
import Link from "next/link";

interface CodingChallenge {
  id: string;
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  category: "frontend" | "problem-solving";
  subcategory: string;
  estimatedTime: number;
  tags: string[];
  isCompleted?: boolean;
  completionRate?: number;
}

// Sample coding challenges - you can expand this
const codingChallenges: CodingChallenge[] = [
  // Frontend Coding Challenges
  {
    id: "fe-1",
    title: "Build a Responsive Navigation Bar",
    description:
      "Create a responsive navigation bar that works on desktop, tablet, and mobile devices.",
    difficulty: "easy",
    category: "frontend",
    subcategory: "CSS Layout",
    estimatedTime: 30,
    tags: ["HTML", "CSS", "Responsive Design", "Flexbox"],
    completionRate: 85,
  },
  {
    id: "fe-2",
    title: "Todo List Application",
    description:
      "Build a todo list app with add, delete, and mark as complete functionality.",
    difficulty: "medium",
    category: "frontend",
    subcategory: "React",
    estimatedTime: 60,
    tags: ["React", "JavaScript", "State Management", "Components"],
    completionRate: 72,
  },
  {
    id: "fe-3",
    title: "Weather Dashboard",
    description:
      "Create a weather dashboard that fetches and displays weather data from an API.",
    difficulty: "medium",
    category: "frontend",
    subcategory: "API Integration",
    estimatedTime: 90,
    tags: ["JavaScript", "API", "Async/Await", "DOM Manipulation"],
    completionRate: 68,
  },
  {
    id: "fe-4",
    title: "E-commerce Product Grid",
    description:
      "Build a responsive product grid with filtering and sorting capabilities.",
    difficulty: "hard",
    category: "frontend",
    subcategory: "Advanced UI",
    estimatedTime: 120,
    tags: ["React", "CSS Grid", "State Management", "Filtering"],
    completionRate: 45,
  },
  {
    id: "fe-5",
    title: "Real-time Chat Interface",
    description:
      "Create a chat interface with real-time message updates and user typing indicators.",
    difficulty: "hard",
    category: "frontend",
    subcategory: "Real-time",
    estimatedTime: 150,
    tags: ["WebSocket", "React", "Real-time", "UI/UX"],
    completionRate: 38,
  },
  // Problem Solving Coding Challenges
  {
    id: "ps-1",
    title: "Two Sum",
    description:
      "Given an array of integers and a target sum, find two numbers that add up to the target.",
    difficulty: "easy",
    category: "problem-solving",
    subcategory: "Arrays",
    estimatedTime: 20,
    tags: ["Arrays", "Hash Map", "Algorithms"],
    completionRate: 92,
  },
  {
    id: "ps-2",
    title: "Valid Parentheses",
    description:
      "Determine if a string of parentheses is valid (properly closed and nested).",
    difficulty: "easy",
    category: "problem-solving",
    subcategory: "Stacks",
    estimatedTime: 25,
    tags: ["Stack", "String Manipulation", "Algorithms"],
    completionRate: 88,
  },
  {
    id: "ps-3",
    title: "Reverse Linked List",
    description: "Reverse a singly linked list in-place.",
    difficulty: "medium",
    category: "problem-solving",
    subcategory: "Linked Lists",
    estimatedTime: 30,
    tags: ["Linked Lists", "Pointers", "Algorithms"],
    completionRate: 75,
  },
  {
    id: "ps-4",
    title: "Binary Tree Traversal",
    description:
      "Implement inorder, preorder, and postorder traversal of a binary tree.",
    difficulty: "medium",
    category: "problem-solving",
    subcategory: "Trees",
    estimatedTime: 45,
    tags: ["Trees", "Recursion", "Algorithms"],
    completionRate: 65,
  },
  {
    id: "ps-5",
    title: "Longest Substring Without Repeating Characters",
    description:
      "Find the length of the longest substring without repeating characters.",
    difficulty: "hard",
    category: "problem-solving",
    subcategory: "Sliding Window",
    estimatedTime: 60,
    tags: ["Sliding Window", "Hash Map", "Algorithms"],
    completionRate: 52,
  },
];

export default function CodingPage() {
  const [selectedCategory, setSelectedCategory] = useState<
    "frontend" | "problem-solving" | null
  >(null);

  const frontendChallenges = codingChallenges.filter(
    (challenge) => challenge.category === "frontend"
  );
  const problemSolvingChallenges = codingChallenges.filter(
    (challenge) => challenge.category === "problem-solving"
  );

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "hard":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  const renderChallenges = (challenges: CodingChallenge[]) => {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {challenges.map((challenge) => (
          <div
            key={challenge.id}
            className="bg-card rounded-lg shadow-sm border border-border p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-lg font-semibold text-foreground hover:text-blue-600 cursor-pointer">
                {challenge.title}
              </h3>
              <div className="flex items-center space-x-2">
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(
                    challenge.difficulty
                  )}`}
                >
                  {challenge.difficulty}
                </span>
              </div>
            </div>

            <p className="text-muted-foreground mb-4">
              {challenge.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {challenge.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded dark:bg-blue-900/20 dark:text-blue-400"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <span>⏱️ {challenge.estimatedTime} min</span>
                <span>📊 {challenge.completionRate}% completed</span>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded dark:bg-gray-800 dark:text-gray-400">
                  {challenge.subcategory}
                </span>
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Start Challenge
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Coding Challenges
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Master frontend development and problem solving with hands-on coding
            challenges
          </p>
        </div>

        {/* Category Selection */}
        {!selectedCategory && (
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {/* Frontend Challenges Card */}
              <div
                className="bg-card rounded-lg shadow-sm border border-border p-8 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedCategory("frontend")}
              >
                <div className="text-center">
                  <div className="text-6xl mb-4">🎨</div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    Frontend Challenges
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Build real-world frontend applications with HTML, CSS,
                    JavaScript, and React
                  </p>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div>• Responsive Design & Layout</div>
                    <div>• React Components & State Management</div>
                    <div>• API Integration & Data Fetching</div>
                    <div>• Advanced UI/UX Patterns</div>
                  </div>
                  <div className="mt-6">
                    <span className="text-2xl font-bold text-blue-600">
                      {frontendChallenges.length}
                    </span>
                    <span className="text-muted-foreground ml-2">
                      challenges
                    </span>
                  </div>
                </div>
              </div>

              {/* Problem Solving Challenges Card */}
              <div
                className="bg-card rounded-lg shadow-sm border border-border p-8 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedCategory("problem-solving")}
              >
                <div className="text-center">
                  <div className="text-6xl mb-4">🧮</div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    Problem Solving
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Master algorithms and data structures with hands-on coding
                    problems
                  </p>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div>• Arrays & Hash Maps</div>
                    <div>• Linked Lists & Trees</div>
                    <div>• Stacks & Queues</div>
                    <div>• Dynamic Programming</div>
                  </div>
                  <div className="mt-6">
                    <span className="text-2xl font-bold text-green-600">
                      {problemSolvingChallenges.length}
                    </span>
                    <span className="text-muted-foreground ml-2">
                      challenges
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-card rounded-lg shadow-sm border border-border p-6 text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {codingChallenges.length}
                </div>
                <div className="text-card-foreground font-medium">
                  Total Challenges
                </div>
              </div>
              <div className="bg-card rounded-lg shadow-sm border border-border p-6 text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {codingChallenges.reduce(
                    (sum, challenge) => sum + challenge.estimatedTime,
                    0
                  )}
                </div>
                <div className="text-card-foreground font-medium">
                  Total Minutes
                </div>
              </div>
              <div className="bg-card rounded-lg shadow-sm border border-border p-6 text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {Math.round(
                    codingChallenges.reduce(
                      (sum, challenge) => sum + (challenge.completionRate || 0),
                      0
                    ) / codingChallenges.length
                  )}
                  %
                </div>
                <div className="text-card-foreground font-medium">
                  Avg. Success Rate
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Selected Category View */}
        {selectedCategory && (
          <div>
            {/* Back Button */}
            <div className="mb-8">
              <button
                onClick={() => setSelectedCategory(null)}
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
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
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                <span>Back to Categories</span>
              </button>
            </div>

            {/* Category Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-2">
                {selectedCategory === "frontend"
                  ? "Frontend Challenges"
                  : "Problem Solving Challenges"}
              </h2>
              <p className="text-muted-foreground">
                {selectedCategory === "frontend"
                  ? "Build real-world frontend applications and master modern web development"
                  : "Master algorithms and data structures with hands-on coding problems"}
              </p>
            </div>

            {/* Challenges */}
            {renderChallenges(
              selectedCategory === "frontend"
                ? frontendChallenges
                : problemSolvingChallenges
            )}
          </div>
        )}

        {/* Call to Action */}
        {!selectedCategory && (
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Start Coding?
              </h2>
              <p className="text-xl mb-6 opacity-90">
                Choose a category and start building your skills today
              </p>
              <div className="flex justify-center space-x-4">
                <Link
                  href="/practice/fundamentals"
                  className="bg-white text-blue-600 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors duration-200"
                >
                  Frontend Fundamentals
                </Link>
                <Link
                  href="/practice/advanced"
                  className="border-2 border-white text-white px-6 py-3 rounded-md font-medium hover:bg-white hover:text-blue-600 transition-colors duration-200"
                >
                  Advanced Topics
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
