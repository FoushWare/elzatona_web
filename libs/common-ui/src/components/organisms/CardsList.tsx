"use client";

import React, { Suspense } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
  Badge,
  EmptyState,
} from "@elzatona/common-ui";
import {
  ChevronDown,
  ChevronRight,
  Edit,
  Trash2,
  Layers,
  BookOpen,
  Target,
  MessageSquare,
  Plus,
} from "lucide-react";

const LoadingSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
  </div>
);

// Card icons mapping
const CARD_ICONS = {
  "Core Technologies": { icon: BookOpen, color: "#3B82F6" },
  "Framework Questions": { icon: Layers, color: "#10B981" },
  "Problem Solving": { icon: Target, color: "#F59E0B" },
  "System Design": { icon: Layers, color: "#EF4444" },
} as const;

// LearningCard interface - compatible with LearningCard from @elzatona/types
// This allows CardsList to work with the full LearningCard type from the types library
// Use LearningCard type from @elzatona/types instead of local interface
// This ensures type compatibility across the codebase
type LearningCard = LearningCardType;

interface Category {
  readonly id: string;
  readonly name?: string;
  readonly description?: string;
  readonly cardType?: string;
}

interface Topic {
  readonly id: string;
  readonly name?: string;
  readonly description?: string;
  readonly categoryId?: string;
}

interface Question {
  readonly id: string;
  readonly title?: string;
  readonly difficulty?: string;
  readonly type?: string;
}

interface CardsListProps {
  readonly cards: readonly LearningCard[];
  readonly categories: readonly Category[];
  readonly topics: readonly Topic[];
  readonly questionsByTopic: Record<string, readonly Question[]>;
  readonly expandedCards: Set<string>;
  readonly expandedCategories: Set<string>;
  readonly expandedTopics: Set<string>;
  readonly onToggleCard: (cardId: string) => void;
  readonly onToggleCategory: (categoryId: string) => void;
  readonly onToggleTopic: (topicId: string) => void;
  readonly onEditCard: (card: LearningCardType) => void;
  readonly onDeleteCard: (cardId: string) => void;
  readonly onEditCategory: (category: Category) => void;
  readonly onDeleteCategory: (categoryId: string) => void;
  readonly onEditTopic: (topic: Topic) => void;
  readonly onDeleteTopic: (topicId: string) => void;
  readonly onEditQuestion: (question: Question) => void;
  readonly onDeleteQuestion: (questionId: string) => void;
  readonly onAddQuestion: () => void;
  readonly totalCards: number;
  readonly isDeletingCard?: boolean;
  readonly isDeletingCategory?: boolean;
  readonly isDeletingTopic?: boolean;
  readonly isDeletingQuestion?: boolean;
}

/**
 * CardsList Component
 * Displays a hierarchical list of learning cards with nested categories, topics, and questions
 */
export function CardsList({
  cards,
  categories,
  topics,
  questionsByTopic,
  expandedCards,
  expandedCategories,
  expandedTopics,
  onToggleCard,
  onToggleCategory,
  onToggleTopic,
  onEditCard,
  onDeleteCard,
  onEditCategory,
  onDeleteCategory,
  onEditTopic,
  onDeleteTopic,
  onEditQuestion,
  onDeleteQuestion,
  onAddQuestion,
  totalCards,
  isDeletingCard = false,
  isDeletingCategory = false,
  isDeletingTopic = false,
  isDeletingQuestion = false,
}: CardsListProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
          <Layers className="h-5 w-5 mr-2 text-blue-600" />
          Learning Cards ({totalCards})
        </h2>
      </div>

      <div className="space-y-4">
        {cards.length === 0 ? (
          <Suspense fallback={<LoadingSkeleton />}>
            <EmptyState
              icon={Layers}
              title="No Learning Cards"
              description="Create your first learning card to organize categories and topics for structured learning."
              action={{
                label: "Create First Card",
                onClick: () => {
                  // This will be handled by parent
                },
              }}
              className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg"
            />
          </Suspense>
        ) : (
          cards.map((card) => {
            const cardCategories = categories.filter(
              (cat) => cat.cardType === card.title,
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
                        onClick={() => onToggleCard(card.id)}
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
                            (topic) => topic.categoryId === cat.id,
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
                            (topic) => topic.categoryId === cat.id,
                          );
                          return (
                            total +
                            categoryTopics.reduce((topicTotal, topic) => {
                              const topicQuestions =
                                questionsByTopic[topic.id] || [];
                              return topicTotal + topicQuestions.length;
                            }, 0)
                          );
                        }, 0)}{" "}
                        Questions
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEditCard(card)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDeleteCard(card.id)}
                        disabled={isDeletingCard}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                {expandedCards.has(card.id) && (
                  <CardContent className="pt-0">
                    <div className="space-y-4">
                      {/* Categories under this card */}
                      {cardCategories.map((category) => {
                        const categoryTopics = topics.filter(
                          (topic) => topic.categoryId === category.id,
                        );

                        return (
                          <div
                            key={category.id}
                            className="ml-6 border-l-2 border-gray-200 pl-4"
                          >
                            <div className="flex items-center justify-between py-2">
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => onToggleCategory(category.id)}
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
                                  {categoryTopics.reduce((total, topic) => {
                                    const topicQuestions =
                                      questionsByTopic[topic.id] || [];
                                    return total + topicQuestions.length;
                                  }, 0)}{" "}
                                  Questions
                                </Badge>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => onEditCategory(category)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => onDeleteCategory(category.id)}
                                  disabled={isDeletingCategory}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>

                            {expandedCategories.has(category.id) && (
                              <div className="ml-6 space-y-2">
                                {categoryTopics.map((topic) => {
                                  const topicQuestions =
                                    questionsByTopic[topic.id] || [];

                                  return (
                                    <div
                                      key={topic.id}
                                      className="border-l-2 border-gray-100 pl-4 py-2"
                                    >
                                      <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                          <button
                                            onClick={() =>
                                              onToggleTopic(topic.id)
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
                                            {topicQuestions.length} Questions
                                          </Badge>
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => onEditTopic(topic)}
                                          >
                                            <Edit className="h-4 w-4" />
                                          </Button>
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() =>
                                              onDeleteTopic(topic.id)
                                            }
                                            disabled={isDeletingTopic}
                                          >
                                            <Trash2 className="h-4 w-4" />
                                          </Button>
                                        </div>
                                      </div>

                                      {expandedTopics.has(topic.id) && (
                                        <div className="ml-6 space-y-2">
                                          {topicQuestions.map((question) => (
                                            <div
                                              key={question.id}
                                              className="flex items-center justify-between py-2 px-3 bg-gray-50 dark:bg-gray-800 rounded"
                                            >
                                              <div className="flex items-center space-x-2">
                                                <MessageSquare className="h-4 w-4 text-red-600" />
                                                <div>
                                                  <h6 className="font-medium text-sm">
                                                    {question.title}
                                                  </h6>
                                                  <p className="text-xs text-gray-600 dark:text-gray-400">
                                                    {question.difficulty} •{" "}
                                                    {question.type}
                                                  </p>
                                                </div>
                                              </div>
                                              <div className="flex items-center space-x-1">
                                                <Button
                                                  variant="ghost"
                                                  size="sm"
                                                  onClick={() =>
                                                    onEditQuestion(question)
                                                  }
                                                >
                                                  <Edit className="h-3 w-3" />
                                                </Button>
                                                <Button
                                                  variant="ghost"
                                                  size="sm"
                                                  onClick={() =>
                                                    onDeleteQuestion(
                                                      question.id,
                                                    )
                                                  }
                                                  disabled={isDeletingQuestion}
                                                >
                                                  <Trash2 className="h-3 w-3" />
                                                </Button>
                                              </div>
                                            </div>
                                          ))}
                                          <Button
                                            onClick={onAddQuestion}
                                            variant="outline"
                                            size="sm"
                                            className="ml-6"
                                          >
                                            <Plus className="h-3 w-3 mr-1" />
                                            Add Question
                                          </Button>
                                        </div>
                                      )}
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
}

export type CardsListPropsType = CardsListProps;
