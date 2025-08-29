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
        return "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300";
      case "medium":
        return "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300";
      case "hard":
        return "bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300";
      default:
        return "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "html":
        return "bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-300";
      case "css":
        return "bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300";
      case "javascript":
        return "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300";
      default:
        return "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300";
    }
  };

  return (
    <div
      className="bg-card rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer border border-border"
      onClick={onClick}
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-lg font-semibold text-card-foreground mb-2">
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

        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
          {challenge.description}
        </p>

        <div className="flex flex-wrap gap-1 mb-4">
          {challenge.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded"
            >
              {tag}
            </span>
          ))}
          {challenge.tags.length > 3 && (
            <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded">
              +{challenge.tags.length - 3}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>
            Created: {new Date(challenge.createdAt).toLocaleDateString()}
          </span>
          <span>ID: {challenge.id}</span>
        </div>
      </div>
    </div>
  );
}
