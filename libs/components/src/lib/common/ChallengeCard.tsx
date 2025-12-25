"use client";

import { Challenge } from "@elzatona/types";

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
        return "badge-success";
      case "medium":
        return "badge-warning";
      case "hard":
        return "badge-destructive";
      default:
        return "badge-secondary";
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
        return "badge-secondary";
    }
  };

  // Convert to button for accessibility if onClick is provided
  const CardWrapper = onClick ? "button" : "div";
  const cardProps = onClick
    ? {
        onClick,
        type: "button" as const,
        className: "card cursor-pointer transition-smooth text-left w-full",
        "aria-label": `View challenge: ${challenge.title}`,
      }
    : {
        className: "card cursor-pointer transition-smooth",
      };

  return (
    <CardWrapper {...cardProps}>
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-lg font-semibold text-card-foreground mb-2 leading-tight">
            {challenge.title}
          </h3>
          <div className="flex gap-2">
            <span
              className={`badge ${getDifficultyColor(challenge.difficulty)}`}
            >
              {challenge.difficulty}
            </span>
            <span className={`badge ${getCategoryColor(challenge.category)}`}>
              {challenge.category.toUpperCase()}
            </span>
          </div>
        </div>

        <p className="text-muted-foreground text-sm mb-4 line-clamp-3 leading-relaxed">
          {challenge.description}
        </p>

        <div className="flex flex-wrap gap-1 mb-4">
          {challenge.tags.slice(0, 3).map((tag: any, index: number) => (
            <span
              key={index}
              className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded font-medium"
            >
              {tag}
            </span>
          ))}
          {challenge.tags.length > 3 && (
            <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded font-medium">
              +{challenge.tags.length - 3}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="font-medium">
            Created: {new Date(challenge.created_at).toLocaleDateString()}
          </span>
          <span className="font-mono">ID: {challenge.id}</span>
        </div>
      </div>
    </CardWrapper>
  );
}
