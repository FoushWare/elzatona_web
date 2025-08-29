"use client";

import { useState } from "react";
import Link from "next/link";
import { InternalResource } from "@/lib/internalResources";

interface InternalResourceCardProps {
  resource: InternalResource;
}

export default function InternalResourceCard({
  resource,
}: InternalResourceCardProps) {
  const [showDetails, setShowDetails] = useState(false);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/20";
      case "intermediate":
        return "text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/20";
      case "advanced":
        return "text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/20";
      default:
        return "text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800";
    }
  };

  const getDifficultyBgColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800";
      case "intermediate":
        return "bg-yellow-50 dark:bg-yellow-900/10 border-yellow-200 dark:border-yellow-800";
      case "advanced":
        return "bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800";
      default:
        return "bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700";
    }
  };

  return (
    <div
      className={`border rounded-lg p-6 ${getDifficultyBgColor(
        resource.difficulty
      )} hover:shadow-lg transition-shadow duration-200`}
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
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(
            resource.difficulty
          )}`}
        >
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
          <div className="text-card-foreground font-semibold mb-1">Time</div>
          <div className="text-2xl font-bold text-green-600">
            {resource.estimatedTime} min
          </div>
        </div>
      </div>

      {/* Video Indicator */}
      {resource.videoUrl && (
        <div className="mb-4">
          <div className="flex items-center space-x-2 text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
            </svg>
            <span className="text-sm font-medium">
              📹 Video Tutorial Available
            </span>
          </div>
        </div>
      )}

      <div className="mb-4">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium flex items-center space-x-1"
        >
          <span>{showDetails ? "Hide" : "Show"} Details</span>
          <svg
            className={`w-4 h-4 transform transition-transform ${
              showDetails ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>

      {showDetails && (
        <div className="space-y-4 mb-4">
          <div>
            <h4 className="font-medium text-card-foreground mb-2">
              Prerequisites
            </h4>
            <div className="flex flex-wrap gap-2">
              {resource.prerequisites.map((prereq, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded"
                >
                  {prereq}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-medium text-card-foreground mb-2">
              Learning Outcomes
            </h4>
            <ul className="space-y-1">
              {resource.learningOutcomes.map((outcome, index) => (
                <li
                  key={index}
                  className="text-sm text-muted-foreground font-medium flex items-start"
                >
                  <span className="text-green-500 mr-2">✓</span>
                  {outcome}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className="flex space-x-3">
        <Link
          href={`/internal-resources/${resource.id}`}
          className="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium"
        >
          Start Learning
        </Link>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="px-4 py-2 border border-border text-muted-foreground rounded-md hover:bg-muted transition-colors duration-200"
        >
          Preview
        </button>
      </div>
    </div>
  );
}
