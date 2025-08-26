"use client";

import { useState } from "react";
import { LearningResource } from "@/types/resource";
import { resourceCategories } from "@/lib/resources";

interface ResourceCardProps {
  resource: LearningResource;
  featured?: boolean;
}

export default function ResourceCard({
  resource,
  featured = false,
}: ResourceCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(
    resource.isBookmarked || false
  );

  const category = resourceCategories.find(
    (cat) => cat.id === resource.category
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
    <div
      className={`bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow cursor-pointer ${
        featured ? "ring-2 ring-blue-500" : ""
      }`}
      onClick={handleCardClick}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">{getTypeIcon(resource.type)}</span>
            <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
              {resource.type}
            </span>
          </div>
          <button
            onClick={handleBookmark}
            className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${
              isBookmarked ? "text-red-500" : "text-gray-400"
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
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {resource.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {resource.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {resource.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
            >
              {tag}
            </span>
          ))}
          {resource.tags.length > 3 && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
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
                <span className="text-sm">{category.icon}</span>
                <span className="text-xs text-gray-600">{category.name}</span>
              </div>
            )}

            {/* Difficulty */}
            <span
              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(
                resource.difficulty
              )}`}
            >
              {resource.difficulty}
            </span>
          </div>

          {/* Read Time */}
          {resource.estimatedReadTime && (
            <span className="text-xs text-gray-500">
              {resource.estimatedReadTime} min read
            </span>
          )}
        </div>

        {/* Featured Badge */}
        {featured && (
          <div className="absolute top-2 right-2">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              ⭐ Featured
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
