"use client";

import React from "react";
import { Badge, Button } from "@elzatona/components";
import { Edit, Eye, Trash2 } from "lucide-react";
import type { UnifiedQuestion } from "./QuestionForm";

interface QuestionItemProps {
  question: UnifiedQuestion;
  onView: (question: UnifiedQuestion) => void;
  onEdit: (question: UnifiedQuestion) => void;
  onDelete: (id: string) => void;
}

export const QuestionItem: React.FC<QuestionItemProps> = ({
  question,
  onView,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
      <div className="flex items-start justify-between">
        <div className="flex-1 pr-4">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
            {question.title}
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {question.content}
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {/* Topics Badges */}
            {question.topics && question.topics.length > 0 ? (
              question.topics.map((topic) => (
                <Badge
                  key={`topic-${topic.name}-${topic.is_primary}`}
                  variant={topic.is_primary ? "default" : "outline"}
                  className={`${
                    topic.is_primary
                      ? "bg-purple-600 text-white"
                      : "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                  }`}
                >
                  {topic.is_primary && "⭐ "}Topic: {topic.name}
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
            {question.categories && question.categories.length > 0 ? (
              question.categories.map((category) => (
                <Badge
                  key={`category-${category.name}-${category.is_primary}`}
                  variant={category.is_primary ? "default" : "secondary"}
                  className={`${
                    category.is_primary
                      ? "bg-green-600 text-white"
                      : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                  }`}
                >
                  {category.is_primary && "⭐ "}Category: {category.name}
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
            {question.learning_card ? (
              <Badge
                variant="secondary"
                className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
              >
                Card: {question.learning_card.title}
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
            {question.type && <Badge variant="outline">{question.type}</Badge>}
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={() => onView(question)}>
            <Eye className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={() => onEdit(question)}>
            <Edit className="w-4 h-4" />
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(question.id)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
