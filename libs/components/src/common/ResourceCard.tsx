"use client";

import { useState } from "react";
import { LearningResource } from "@elzatona/types";

interface ResourceCardProps {
  resource: LearningResource;
  featured?: boolean;
}

export default function ResourceCard({
  resource,
  featured = false,
}: ResourceCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(
    resource.isBookmarked || false,
  );

  // Note: resourceCategories should be passed as a prop or imported from the website app
  // For now, using a fallback
  const category: { icon?: string; name?: string } | null = null;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/20";
      case "intermediate":
        return "text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/20";
      case "advanced":
        return "text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/20";
      default:
        return "text-muted-foreground bg-muted";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "article":
        return "📄";
      case "video":
        return "🎥";
      case "tool":
        return "⚙️";
      case "course":
        return "📚";
      case "book":
        return "📖";
      case "cheatsheet":
        return "📋";
      case "documentation":
        return "📝";
      default:
        return "🔗";
    }
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
  };

  const handleCardClick = () => {
    window.open(resource.url, "_blank", "noopener,noreferrer");
  };

  return (
    <button
      type="button"
      className={`bg-card rounded-lg shadow-sm border border-border hover:shadow-md transition-shadow cursor-pointer text-left w-full ${
        featured ? "ring-2 ring-blue-500" : ""
      }`}
      onClick={handleCardClick}
      aria-label={`Open resource: ${resource.title}`}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">{getTypeIcon(resource.type)}</span>
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              {resource.type}
            </span>
          </div>
          <button
            onClick={handleBookmark}
            className={`p-2 rounded-full hover:bg-muted transition-colors ${
              isBookmarked ? "text-red-500" : "text-muted-foreground"
            }`}
          >
            <svg
              className="w-5 h-5"
              fill={isBookmarked ? "currentColor" : "none"}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
          </button>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-card-foreground mb-2 line-clamp-2">
          {resource.title}
        </h3>

        {/* Description */}
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
          {resource.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {resource.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground"
            >
              {tag}
            </span>
          ))}
          {resource.tags.length > 3 && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
              +{resource.tags.length - 3} more
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            {/* Category */}
            {category && (
              <div className="flex items-center space-x-1">
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                <span className="text-sm">{(category as any)?.icon}</span>
                <span className="text-xs text-muted-foreground">
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  {(category as any)?.name}
                </span>
              </div>
            )}
            {!category && resource.category && (
              <div className="flex items-center space-x-1">
                <span className="text-xs text-muted-foreground">
                  {resource.category}
                </span>
              </div>
            )}

            {/* Difficulty */}
            <span
              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(
                resource.difficulty,
              )}`}
            >
              {resource.difficulty}
            </span>
          </div>

          {/* Read Time */}
          {resource.estimatedReadTime && (
            <span className="text-xs text-muted-foreground">
              {resource.estimatedReadTime} min read
            </span>
          )}
        </div>

        {/* Featured Badge */}
        {featured && (
          <div className="absolute top-2 right-2">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300">
              ⭐ Featured
            </span>
          </div>
        )}
      </div>
    </button>
  );
}
