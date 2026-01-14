"use client";

import React, { useCallback } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
  Badge,
} from "../../index";
import {
  Layers,
  Edit,
  Plus,
  ChevronDown,
  ChevronRight,
  BookOpen,
  Trash2,
  Target,
} from "lucide-react";
import {
  AdminLearningCard,
  AdminCategory,
  Topic,
  AdminQuestion,
  ContentManagementStats,
} from "@elzatona/types";

const CARD_ICONS = {
  "Core Technologies": { icon: BookOpen, color: "#3B82F6" },
  "Framework Questions": { icon: Layers, color: "#10B981" },
  "Problem Solving": { icon: Puzzle, color: "#F59E0B" },
  "System Design": { icon: Network, color: "#EF4444" },
  "Frontend Tasks": { icon: Target, color: "#8B5CF6" },
} as const;

// Helper to avoid build errors with missing Icons
import { Puzzle, Network } from "lucide-react";

interface LearningCardsManagerProps {
  cards: AdminLearningCard[];
  categories: AdminCategory[];
  topics: Topic[];
  questions: AdminQuestion[];
  stats: ContentManagementStats;
  expandedCards: Set<string>;
  toggleCard: (id: string) => void;
  expandedCategories: Set<string>;
  toggleCategory: (id: string) => void;
  expandedTopics: Set<string>;
  toggleTopic: (id: string) => void;
  onEditCard: (card: AdminLearningCard) => void;
  onDeleteCard: (card: AdminLearningCard) => void;
  onCreateCard: () => void;
  onEditCategories: () => void;
}

export const LearningCardsManager: React.FC<LearningCardsManagerProps> = ({
  cards,
  categories,
  topics,
  questions,
  stats,
  expandedCards,
  toggleCard,
  expandedCategories,
  toggleCategory,
  expandedTopics,
  toggleTopic,
  onEditCard,
  onDeleteCard,
  onCreateCard,
  onEditCategories,
}) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
          <Layers className="h-5 w-5 mr-2 text-blue-600" />
          Learning Cards ({stats.totalCards})
        </h2>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onEditCategories}
            className="flex items-center space-x-1"
          >
            <Edit className="h-4 w-4" />
            <span>Edit Cards</span>
          </Button>
          <Button
            size="sm"
            onClick={onCreateCard}
            className="flex items-center space-x-1 bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
            <span>Create Card</span>
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {cards.length === 0 ? (
          <Card className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
            <CardContent className="p-8 text-center">
              <Layers className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No Learning Cards
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Create your first learning card to organize categories and
                topics for structured learning.
              </p>
            </CardContent>
          </Card>
        ) : (
          cards.map((card) => {
            const cardCategories = categories.filter(
              (cat) => cat.learning_card_id === card.id,
            );
            const IconComponent =
              CARD_ICONS[card.title as keyof typeof CARD_ICONS]?.icon || Layers;

            return (
              <Card
                key={card.id}
                className="border-l-4"
                style={{ borderLeftColor: card.color }}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => toggleCard(card.id)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        {expandedCards.has(card.id) ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </button>
                      <IconComponent
                        className="h-5 w-5"
                        style={{ color: card.color }}
                      />
                      <div>
                        <CardTitle className="text-lg">{card.title}</CardTitle>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {card.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant="outline"
                        className="bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                      >
                        {cardCategories.length} Categories
                      </Badge>
                      <Badge
                        variant="outline"
                        className="bg-purple-50 text-purple-700 dark:bg-purple-900 dark:text-purple-300"
                      >
                        {cardCategories.reduce((total, cat) => {
                          const categoryTopics = topics.filter(
                            (topic) => topic.category_id === cat.id,
                          );
                          return total + categoryTopics.length;
                        }, 0)}{" "}
                        Topics
                      </Badge>
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-300"
                      >
                        {cardCategories.reduce((total, cat) => {
                          const categoryTopics = topics.filter(
                            (topic) => topic.category_id === cat.id,
                          );
                          return (
                            total +
                            categoryTopics.reduce((topicTotal, _topic) => {
                              const topicQuestions = questions.filter(
                                (q) => q.category_id === cat.id,
                              );
                              return topicTotal + topicQuestions.length;
                            }, 0)
                          );
                        }, 0)}{" "}
                        Questions
                      </Badge>
                      <div className="flex items-center space-x-1 ml-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onEditCard(card)}
                          className="h-8 w-8 p-0 hover:bg-blue-100"
                        >
                          <Edit className="h-4 w-4 text-blue-600" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onDeleteCard(card)}
                          className="h-8 w-8 p-0 hover:bg-red-100"
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                {expandedCards.has(card.id) && (
                  <CardContent className="pt-0">
                    <div className="space-y-4">
                      {cardCategories.map((category) => {
                        const categoryTopics = topics.filter(
                          (topic) => topic.category_id === category.id,
                        );

                        return (
                          <div
                            key={category.id}
                            className="ml-6 border-l-2 border-gray-200 pl-4"
                          >
                            <div className="flex items-center justify-between py-2">
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => toggleCategory(category.id)}
                                  className="p-1 hover:bg-gray-100 rounded"
                                >
                                  {expandedCategories.has(category.id) ? (
                                    <ChevronDown className="h-4 w-4" />
                                  ) : (
                                    <ChevronRight className="h-4 w-4" />
                                  )}
                                </button>
                                <BookOpen className="h-4 w-4 text-purple-600" />
                                <div>
                                  <h4 className="font-medium">
                                    {category.name}
                                  </h4>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {category.description}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Badge
                                  variant="outline"
                                  className="bg-purple-50 text-purple-700 dark:bg-purple-900 dark:text-purple-300"
                                >
                                  {categoryTopics.length} Topics
                                </Badge>
                                <Badge
                                  variant="outline"
                                  className="bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-300"
                                >
                                  {
                                    questions.filter(
                                      (q) => q.category_id === category.id,
                                    ).length
                                  }{" "}
                                  Questions
                                </Badge>
                              </div>
                            </div>

                            {expandedCategories.has(category.id) && (
                              <div className="ml-6 space-y-2">
                                {categoryTopics.map((topic) => {
                                  return (
                                    <div
                                      key={topic.id}
                                      className="border-l-2 border-gray-100 pl-4 py-2"
                                    >
                                      <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                          <button
                                            onClick={() =>
                                              toggleTopic(topic.id)
                                            }
                                            className="p-1 hover:bg-gray-100 rounded"
                                          >
                                            {expandedTopics.has(topic.id) ? (
                                              <ChevronDown className="h-4 w-4" />
                                            ) : (
                                              <ChevronRight className="h-4 w-4" />
                                            )}
                                          </button>
                                          <Target className="h-4 w-4 text-orange-600" />
                                          <div>
                                            <h5 className="font-medium">
                                              {topic.name}
                                            </h5>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                              {topic.description}
                                            </p>
                                          </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                          <Badge
                                            variant="outline"
                                            className="bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-300"
                                          >
                                            {
                                              questions.filter(
                                                (q) => q.topic_id === topic.id,
                                              ).length
                                            }{" "}
                                            Questions
                                          </Badge>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                )}
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
};

export default LearningCardsManager;
