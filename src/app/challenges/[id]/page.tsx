"use client";

import { useState, useEffect } from "react";
import { getChallengeById } from "@/lib/challenges";
import { Challenge } from "@/types/challenge";
import { notFound } from "next/navigation";

interface ChallengeDetailPageProps {
  params: {
    id: string;
  };
}

export default function ChallengeDetailPage({
  params,
}: ChallengeDetailPageProps) {
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [activeTab, setActiveTab] = useState<
    "problem" | "starter" | "solution"
  >("problem");

  useEffect(() => {
    const foundChallenge = getChallengeById(params.id);
    if (!foundChallenge) {
      notFound();
    }
    setChallenge(foundChallenge);
  }, [params.id]);

  if (!challenge) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading challenge...</p>
        </div>
      </div>
    );
  }

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

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "html":
        return "bg-orange-100 text-orange-800";
      case "css":
        return "bg-blue-100 text-blue-800";
      case "javascript":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleStartChallenge = () => {
    // Navigate to code editor with challenge data
    const challengeData = encodeURIComponent(JSON.stringify(challenge));
    window.location.href = `/editor/${challenge.id}?data=${challengeData}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <button
                onClick={() => window.history.back()}
                className="text-blue-600 hover:text-blue-800 mb-2 flex items-center"
              >
                ← Back to Challenges
              </button>
              <h1 className="text-3xl font-bold text-gray-900">
                {challenge.title}
              </h1>
              <div className="flex items-center gap-4 mt-2">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(
                    challenge.difficulty
                  )}`}
                >
                  {challenge.difficulty}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(
                    challenge.category
                  )}`}
                >
                  {challenge.category.toUpperCase()}
                </span>
                <span className="text-sm text-gray-500">
                  ID: {challenge.id}
                </span>
              </div>
            </div>
            <button
              onClick={handleStartChallenge}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Start Challenge
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-sm mb-6">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  <button
                    onClick={() => setActiveTab("problem")}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === "problem"
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    Problem
                  </button>
                  <button
                    onClick={() => setActiveTab("starter")}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === "starter"
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    Starter Code
                  </button>
                  <button
                    onClick={() => setActiveTab("solution")}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === "solution"
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    Solution
                  </button>
                </nav>
              </div>

              <div className="p-6">
                {activeTab === "problem" && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                      Problem Description
                    </h2>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                      {challenge.description}
                    </p>

                    {challenge.testCases.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                          Test Cases
                        </h3>
                        <div className="space-y-3">
                          {challenge.testCases.map((testCase) => (
                            <div
                              key={testCase.id}
                              className="bg-gray-50 p-4 rounded-lg"
                            >
                              <h4 className="font-medium text-gray-900 mb-2">
                                {testCase.name}
                              </h4>
                              <p className="text-gray-600 text-sm mb-2">
                                {testCase.description}
                              </p>
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <span className="font-medium text-gray-700">
                                    Input:
                                  </span>
                                  <pre className="bg-white p-2 rounded mt-1 text-xs">
                                    {JSON.stringify(testCase.input, null, 2)}
                                  </pre>
                                </div>
                                <div>
                                  <span className="font-medium text-gray-700">
                                    Expected Output:
                                  </span>
                                  <pre className="bg-white p-2 rounded mt-1 text-xs">
                                    {JSON.stringify(
                                      testCase.expectedOutput,
                                      null,
                                      2
                                    )}
                                  </pre>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "starter" && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                      Starter Code
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          HTML
                        </h3>
                        <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
                          <code>{challenge.starterCode.html}</code>
                        </pre>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          CSS
                        </h3>
                        <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
                          <code>{challenge.starterCode.css}</code>
                        </pre>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          JavaScript
                        </h3>
                        <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
                          <code>{challenge.starterCode.javascript}</code>
                        </pre>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "solution" && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                      Solution
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          HTML
                        </h3>
                        <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
                          <code>{challenge.solution.html}</code>
                        </pre>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          CSS
                        </h3>
                        <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
                          <code>{challenge.solution.css}</code>
                        </pre>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          JavaScript
                        </h3>
                        <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
                          <code>{challenge.solution.javascript}</code>
                        </pre>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          Explanation
                        </h3>
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <p className="text-gray-700 leading-relaxed">
                            {challenge.explanation}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Challenge Info
              </h3>

              <div className="space-y-4">
                <div>
                  <span className="text-sm font-medium text-gray-500">
                    Difficulty
                  </span>
                  <div className="mt-1">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(
                        challenge.difficulty
                      )}`}
                    >
                      {challenge.difficulty}
                    </span>
                  </div>
                </div>

                <div>
                  <span className="text-sm font-medium text-gray-500">
                    Category
                  </span>
                  <div className="mt-1">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(
                        challenge.category
                      )}`}
                    >
                      {challenge.category.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div>
                  <span className="text-sm font-medium text-gray-500">
                    Tags
                  </span>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {challenge.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-sm font-medium text-gray-500">
                    Created
                  </span>
                  <p className="text-sm text-gray-900 mt-1">
                    {new Date(challenge.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div>
                  <span className="text-sm font-medium text-gray-500">
                    Last Updated
                  </span>
                  <p className="text-sm text-gray-900 mt-1">
                    {new Date(challenge.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={handleStartChallenge}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Start Coding
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
