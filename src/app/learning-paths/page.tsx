"use client";

import { useState } from "react";
import { learningPaths, getResourceById } from "@/lib/resources";
import Link from "next/link";

export default function LearningPathsPage() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<
    "beginner" | "intermediate" | "advanced" | "all"
  >("all");

  const filteredPaths = learningPaths.filter(
    (path) =>
      selectedDifficulty === "all" || path.difficulty === selectedDifficulty
  );

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "text-green-600 bg-green-100";
      case "intermediate":
        return "text-yellow-600 bg-yellow-100";
      case "advanced":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "🌱";
      case "intermediate":
        return "🚀";
      case "advanced":
        return "⚡";
      default:
        return "📚";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Learning Paths
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Structured learning journeys to master frontend development
              concepts
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Difficulty Filter */}
        <div className="mb-8">
          <div className="flex justify-center space-x-4">
            {["all", "beginner", "intermediate", "advanced"].map(
              (difficulty) => (
                <button
                  key={difficulty}
                  onClick={() =>
                    setSelectedDifficulty(
                      difficulty as
                        | "beginner"
                        | "intermediate"
                        | "advanced"
                        | "all"
                    )
                  }
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedDifficulty === difficulty
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
                  }`}
                >
                  {difficulty === "all"
                    ? "All Levels"
                    : difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                </button>
              )
            )}
          </div>
        </div>

        {/* Learning Paths Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {filteredPaths.map((path) => (
            <div
              key={path.id}
              className="bg-white rounded-lg shadow-sm border p-6"
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {path.title}
                  </h3>
                  <p className="text-gray-600 mb-3">{path.description}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">
                    {getDifficultyIcon(path.difficulty)}
                  </span>
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(
                      path.difficulty
                    )}`}
                  >
                    {path.difficulty}
                  </span>
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center space-x-6 mb-6 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <span>📚</span>
                  <span>{path.resources.length} resources</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span>⏱️</span>
                  <span>{path.estimatedTime} hours</span>
                </div>
              </div>

              {/* Target Skills */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Skills you'll learn:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {path.targetSkills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Prerequisites */}
              {path.prerequisites && path.prerequisites.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Prerequisites:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {path.prerequisites.map((prereq) => (
                      <span
                        key={prereq}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600"
                      >
                        {prereq}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Resources Preview */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Resources in this path:
                </h4>
                <div className="space-y-2">
                  {path.resources.slice(0, 3).map((resourceId) => {
                    const resource = getResourceById(resourceId);
                    return resource ? (
                      <div
                        key={resourceId}
                        className="flex items-center space-x-2 text-sm text-gray-600"
                      >
                        <span>📄</span>
                        <span className="truncate">{resource.title}</span>
                      </div>
                    ) : null;
                  })}
                  {path.resources.length > 3 && (
                    <div className="text-sm text-gray-500">
                      +{path.resources.length - 3} more resources
                    </div>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <Link
                href={`/learning-paths/${path.id}`}
                className="inline-flex items-center justify-center w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Start Learning Path
              </Link>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredPaths.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📚</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No learning paths found
            </h3>
            <p className="text-gray-600">
              Try selecting a different difficulty level
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
