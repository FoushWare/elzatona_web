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
        return "text-green-600 bg-green-100";
      case "intermediate":
        return "text-yellow-600 bg-yellow-100";
      case "advanced":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getDifficultyBgColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-50 border-green-200";
      case "intermediate":
        return "bg-yellow-50 border-yellow-200";
      case "advanced":
        return "bg-red-50 border-red-200";
      default:
        return "bg-gray-50 border-gray-200";
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
            <h3 className="text-xl font-semibold text-gray-900 mb-1">
              {resource.title}
            </h3>
            <p className="text-gray-700 text-sm font-medium">
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
        <div className="bg-white bg-opacity-50 rounded-lg p-3">
          <div className="text-gray-800 font-semibold mb-1">Questions</div>
          <div className="text-2xl font-bold text-blue-600">
            {resource.totalQuestions}
          </div>
        </div>
        <div className="bg-white bg-opacity-50 rounded-lg p-3">
          <div className="text-gray-800 font-semibold mb-1">Time</div>
          <div className="text-2xl font-bold text-green-600">
            {resource.estimatedTime} min
          </div>
        </div>
      </div>

      <div className="mb-4">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center space-x-1"
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
            <h4 className="font-medium text-gray-900 mb-2">Prerequisites</h4>
            <div className="flex flex-wrap gap-2">
              {resource.prerequisites.map((prereq, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                >
                  {prereq}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-2">
              Learning Outcomes
            </h4>
            <ul className="space-y-1">
              {resource.learningOutcomes.map((outcome, index) => (
                <li
                  key={index}
                  className="text-sm text-gray-700 font-medium flex items-start"
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
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-200"
        >
          Preview
        </button>
      </div>
    </div>
  );
}
