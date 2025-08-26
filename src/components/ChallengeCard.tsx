"use client";

import { Challenge } from "@/types/challenge";

interface ChallengeCardProps {
  challenge: Challenge;
  onClick?: () => void;
}

export default function ChallengeCard({
  challenge,
  onClick,
}: ChallengeCardProps) {
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

  return (
    <div
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer border border-gray-200"
      onClick={onClick}
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {challenge.title}
          </h3>
          <div className="flex gap-2">
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(
                challenge.difficulty
              )}`}
            >
              {challenge.difficulty}
            </span>
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(
                challenge.category
              )}`}
            >
              {challenge.category.toUpperCase()}
            </span>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {challenge.description}
        </p>

        <div className="flex flex-wrap gap-1 mb-4">
          {challenge.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
            >
              {tag}
            </span>
          ))}
          {challenge.tags.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
              +{challenge.tags.length - 3}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>
            Created: {new Date(challenge.createdAt).toLocaleDateString()}
          </span>
          <span>ID: {challenge.id}</span>
        </div>
      </div>
    </div>
  );
}
