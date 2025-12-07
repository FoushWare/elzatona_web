"use client";

import React from "react";
import { Button, Badge, Checkbox } from "@elzatona/components";
import { Eye, Edit, Trash2 } from "lucide-react";
import { UnifiedQuestion } from "@elzatona/types";

interface QuestionItemProps {
  question: UnifiedQuestion;
  isSelected: boolean;
  onSelect: (questionId: string) => void;
  onView: (question: UnifiedQuestion) => void;
  onEdit: (question: UnifiedQuestion) => void;
  onDelete: (question: UnifiedQuestion) => void;
}

export function QuestionItem({
  question,
  isSelected,
  onSelect,
  onView,
  onEdit,
  onDelete,
}: QuestionItemProps) {
  // Handle both array and single object formats for topics
  const topics = (question as any).topics;
  const topicsArray = Array.isArray(topics)
    ? topics
    : topics && typeof topics === "object"
      ? [topics]
      : [];

  // Handle both array and single object formats for categories
  const categories = (question as any).categories;
  const categoriesArray = Array.isArray(categories)
    ? categories
    : categories && typeof categories === "object"
      ? [categories]
      : [];

  return (
    <div
      className={`p-4 sm:p-5 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors ${
        isSelected
          ? "bg-blue-50 dark:bg-blue-900/20 border-l-4 border-l-blue-500"
          : ""
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <Checkbox
            checked={isSelected}
            onCheckedChange={() => onSelect(question.id)}
            className="mt-1 h-5 w-5 flex-shrink-0"
          />
          <div className="flex-1 min-w-0 pr-2">
            <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {question.title}
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
              {question.content}
            </p>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {/* Topics Badges */}
              {topicsArray.length > 0 ? (
                topicsArray.map((topic: any, index: number) => (
                  <Badge
                    key={`${question.id}-topic-${index}`}
                    variant={topic.is_primary ? "default" : "outline"}
                    className={`${
                      topic.is_primary
                        ? "bg-purple-600 text-white"
                        : "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                    }`}
                  >
                    {topic.is_primary && "⭐ "}Topic:{" "}
                    {topic.name || topic.title || "Unknown Topic"}
                  </Badge>
                ))
              ) : (
                <Badge
                  variant="outline"
                  className="bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                >
                  Topic: No Topic
                </Badge>
              )}

              {/* Categories Badges */}
              {categoriesArray.length > 0 ? (
                categoriesArray.map((category: any, index: number) => (
                  <Badge
                    key={`${question.id}-category-${index}`}
                    variant={category.is_primary ? "default" : "secondary"}
                    className={`${
                      category.is_primary
                        ? "bg-green-600 text-white"
                        : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                    }`}
                  >
                    {category.is_primary && "⭐ "}Category:{" "}
                    {category.name || category.title || "Unknown Category"}
                  </Badge>
                ))
              ) : (
                <Badge
                  variant="outline"
                  className="bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                >
                  Category: No Category
                </Badge>
              )}

              {/* Card Badge */}
              {(question as any).learning_card ||
              (question as any).learning_cards ? (
                <Badge
                  variant="secondary"
                  className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                >
                  Card:{" "}
                  {(question as any).learning_card?.title ||
                    (question as any).learning_cards?.title ||
                    "Unknown Card"}
                </Badge>
              ) : (
                <Badge
                  variant="outline"
                  className="bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                >
                  Card: No Card
                </Badge>
              )}

              {/* Difficulty Badge */}
              {question.difficulty && (
                <Badge
                  variant={
                    question.difficulty === "beginner"
                      ? "default"
                      : question.difficulty === "intermediate"
                        ? "outline"
                        : "destructive"
                  }
                >
                  {question.difficulty}
                </Badge>
              )}

              {/* Type Badge */}
              {question.type && (
                <Badge variant="outline">{question.type}</Badge>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 flex-shrink-0">
          <Button
            variant="outline"
            size="sm"
            className="h-9 w-9 sm:w-auto sm:px-3 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-500"
            onClick={() => onView(question)}
            title="View question details"
          >
            <Eye className="w-4 h-4 sm:mr-2" />
            <span className="hidden sm:inline">View</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-9 w-9 sm:w-auto sm:px-3 border-blue-300 dark:border-blue-600 text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-400 dark:hover:border-blue-500"
            onClick={() => onEdit(question)}
            title="Edit question"
          >
            <Edit className="w-4 h-4 sm:mr-2" />
            <span className="hidden sm:inline">Edit</span>
          </Button>
          <Button
            variant="destructive"
            size="sm"
            className="h-9 w-9 sm:w-auto sm:px-3 bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600 text-white dark:text-white border-red-600 dark:border-red-700"
            onClick={() => onDelete(question)}
            title="Delete question"
          >
            <Trash2 className="w-4 h-4 sm:mr-2" />
            <span className="hidden sm:inline">Delete</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
