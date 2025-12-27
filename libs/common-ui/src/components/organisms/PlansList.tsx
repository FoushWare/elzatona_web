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
  Users,
  Calendar,
  Layers,
  BookOpen,
  Target,
  MessageSquare,
  Plus,
  CheckSquare,
} from "lucide-react";

const LoadingSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
  </div>
);

interface LearningPlan {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly duration?: string;
  readonly difficulty?: string;
  readonly estimatedHours?: number;
  readonly color?: string;
}

interface PlanHierarchyItem {
  readonly id: string;
  readonly title?: string;
  readonly name?: string;
  readonly categories?: PlanCategory[];
}

interface PlanCategory {
  readonly id: string;
  readonly name?: string;
  readonly title?: string;
  readonly topics?: PlanTopic[];
}

interface PlanTopic {
  readonly id: string;
  readonly name?: string;
  readonly title?: string;
  readonly totalQuestionCount?: number;
  readonly planQuestionCount?: number;
  readonly questions?: PlanQuestion[];
}

interface PlanQuestion {
  readonly id: string;
  readonly title?: string;
}

interface PlansListProps {
  readonly plans: readonly LearningPlan[];
  readonly planHierarchy: Record<string, readonly PlanHierarchyItem[]>;
  readonly loadingPlanHierarchy: Record<string, boolean>;
  readonly expandedPlans: Set<string>;
  readonly expandedPlanCards: Set<string>;
  readonly expandedPlanCategories: Set<string>;
  readonly expandedPlanTopics: Set<string>;
  readonly onTogglePlan: (planId: string) => void;
  readonly onTogglePlanCard: (cardId: string) => void;
  readonly onTogglePlanCategory: (categoryId: string) => void;
  readonly onTogglePlanTopic: (topicId: string) => void;
  readonly onEditPlan: (plan: LearningPlan) => void;
  readonly onDeletePlan: (planId: string) => void;
  readonly onAddCardToPlan: (planId: string) => void;
  readonly onAddCategoryToCard: (planId: string, cardId: string) => void;
  readonly onAddTopicToCategory: (planId: string, categoryId: string) => void;
  readonly onAddQuestionToTopic: (planId: string, topicId: string) => void;
  readonly onRemoveCardFromPlan: (
    planId: string,
    cardId: string,
  ) => Promise<void>;
  readonly onRemoveCategoryFromCard: (
    cardId: string,
    categoryId: string,
  ) => Promise<void>;
  readonly onRemoveTopicFromCategory: (
    categoryId: string,
    topicId: string,
  ) => Promise<void>;
  readonly onRemoveQuestionFromPlan: (
    planId: string,
    topicId: string,
    questionId: string,
  ) => Promise<void>;
  readonly totalPlans: number;
  readonly isDeletingPlan?: boolean;
}

/**
 * PlansList Component
 * Displays a hierarchical list of learning plans with nested cards, categories, topics, and questions
 */
export function PlansList({
  plans,
  planHierarchy,
  loadingPlanHierarchy,
  expandedPlans,
  expandedPlanCards,
  expandedPlanCategories,
  expandedPlanTopics,
  onTogglePlan,
  onTogglePlanCard,
  onTogglePlanCategory,
  onTogglePlanTopic,
  onEditPlan,
  onDeletePlan,
  onAddCardToPlan,
  onAddCategoryToCard,
  onAddTopicToCategory,
  onAddQuestionToTopic,
  onRemoveCardFromPlan,
  onRemoveCategoryFromCard,
  onRemoveTopicFromCategory,
  onRemoveQuestionFromPlan,
  totalPlans,
  isDeletingPlan = false,
}: PlansListProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
          <Users className="h-5 w-5 mr-2 text-green-600" />
          Learning Plans ({totalPlans})
        </h2>
      </div>

      <div className="space-y-4">
        {plans.length === 0 ? (
          <Suspense fallback={<LoadingSkeleton />}>
            <EmptyState
              icon={Calendar}
              title="No Learning Plans"
              description="Create your first learning plan to provide structured learning paths for users."
              action={{
                label: "Create First Plan",
                onClick: () => {
                  // This will be handled by parent
                },
              }}
              className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg"
            />
          </Suspense>
        ) : (
          plans.map((plan) => (
            <Card
              key={plan.id}
              className="border-l-4"
              style={{ borderLeftColor: plan.color || "#10B981" }}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => onTogglePlan(plan.id)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      {expandedPlans.has(plan.id) ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </button>
                    <Calendar
                      className="h-5 w-5"
                      style={{ color: plan.color || "#10B981" }}
                    />
                    <div>
                      <CardTitle className="text-lg">{plan.name}</CardTitle>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {plan.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {plan.duration && plan.difficulty && (
                      <Badge variant="outline">
                        {plan.duration} • {plan.difficulty}
                      </Badge>
                    )}
                    {plan.estimatedHours && (
                      <Badge variant="outline">{plan.estimatedHours}h</Badge>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEditPlan(plan)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDeletePlan(plan.id)}
                      disabled={isDeletingPlan}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {expandedPlans.has(plan.id) && (
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      {plan.duration && (
                        <p>
                          <strong>Duration:</strong> {plan.duration}
                        </p>
                      )}
                      {plan.difficulty && (
                        <p>
                          <strong>Difficulty:</strong> {plan.difficulty}
                        </p>
                      )}
                      {plan.estimatedHours && (
                        <p>
                          <strong>Estimated Hours:</strong>{" "}
                          {plan.estimatedHours}
                        </p>
                      )}
                    </div>

                    {/* Hierarchical Tree: Cards → Categories → Topics → Questions */}
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                          Plan Structure
                        </h3>
                        <Suspense fallback={<LoadingSkeleton />}>
                          <Button
                            onClick={() => onAddCardToPlan(plan.id)}
                            size="sm"
                            variant="outline"
                            className="text-blue-600 border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                          >
                            <Plus className="h-4 w-4 mr-1" />
                            Add Card
                          </Button>
                        </Suspense>
                      </div>

                      {loadingPlanHierarchy[plan.id] ? (
                        <div className="space-y-2">
                          {/* Loading skeleton */}
                          {[1, 2].map((i) => (
                            <div
                              key={i}
                              className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 bg-gray-50 dark:bg-gray-800/50 animate-pulse"
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2 flex-1">
                                  <div className="h-4 w-4 bg-gray-300 dark:bg-gray-600 rounded" />
                                  <div className="h-4 w-4 bg-gray-300 dark:bg-gray-600 rounded" />
                                  <div className="h-4 w-32 bg-gray-300 dark:bg-gray-600 rounded" />
                                </div>
                                <div className="flex items-center space-x-2">
                                  <div className="h-7 w-20 bg-gray-300 dark:bg-gray-600 rounded" />
                                  <div className="h-7 w-7 bg-gray-300 dark:bg-gray-600 rounded" />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : planHierarchy[plan.id] &&
                        planHierarchy[plan.id].length > 0 ? (
                        <div className="space-y-2">
                          {planHierarchy[plan.id].map((card) => (
                            <div
                              key={card.id}
                              className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 bg-gray-50 dark:bg-gray-800/50"
                            >
                              {/* Card Level */}
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2 flex-1">
                                  <button
                                    onClick={() =>
                                      onRemoveCardFromPlan(plan.id, card.id)
                                    }
                                    className="flex-shrink-0 p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                                    title="Remove from plan"
                                  >
                                    <CheckSquare className="h-4 w-4 text-green-600 dark:text-green-400" />
                                  </button>
                                  <button
                                    onClick={() => onTogglePlanCard(card.id)}
                                    className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                                  >
                                    {expandedPlanCards.has(card.id) ? (
                                      <ChevronDown className="h-4 w-4" />
                                    ) : (
                                      <ChevronRight className="h-4 w-4" />
                                    )}
                                  </button>
                                  <Layers className="h-4 w-4 text-blue-600" />
                                  <span className="font-medium text-gray-900 dark:text-gray-100">
                                    {card.title || card.name}
                                  </span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Suspense fallback={<LoadingSkeleton />}>
                                    <Button
                                      onClick={() =>
                                        onAddCategoryToCard(plan.id, card.id)
                                      }
                                      size="sm"
                                      variant="ghost"
                                      className="h-7 px-2 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                                    >
                                      <Plus className="h-3 w-3 mr-1" />
                                      Add Category
                                    </Button>
                                  </Suspense>
                                </div>
                              </div>

                              {/* Categories Level */}
                              {expandedPlanCards.has(card.id) &&
                                card.categories &&
                                card.categories.length > 0 && (
                                  <div className="mt-2 ml-6 space-y-2">
                                    {card.categories.map((category) => (
                                      <div
                                        key={category.id}
                                        className="border border-gray-200 dark:border-gray-700 rounded p-2 bg-white dark:bg-gray-900"
                                      >
                                        <div className="flex items-center justify-between">
                                          <div className="flex items-center space-x-2 flex-1">
                                            <button
                                              onClick={() =>
                                                onRemoveCategoryFromCard(
                                                  card.id,
                                                  category.id,
                                                )
                                              }
                                              className="flex-shrink-0 p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                                              title="Remove from plan"
                                            >
                                              <CheckSquare className="h-3 w-3 text-green-600 dark:text-green-400" />
                                            </button>
                                            <button
                                              onClick={() =>
                                                onTogglePlanCategory(
                                                  category.id,
                                                )
                                              }
                                              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                                            >
                                              {expandedPlanCategories.has(
                                                category.id,
                                              ) ? (
                                                <ChevronDown className="h-3 w-3" />
                                              ) : (
                                                <ChevronRight className="h-3 w-3" />
                                              )}
                                            </button>
                                            <BookOpen className="h-3 w-3 text-purple-600" />
                                            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                              {category.name || category.title}
                                            </span>
                                          </div>
                                          <div className="flex items-center space-x-2">
                                            <Suspense
                                              fallback={<LoadingSkeleton />}
                                            >
                                              <Button
                                                onClick={() =>
                                                  onAddTopicToCategory(
                                                    plan.id,
                                                    category.id,
                                                  )
                                                }
                                                size="sm"
                                                variant="ghost"
                                                className="h-6 px-2 text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20 text-xs"
                                              >
                                                <Plus className="h-3 w-3 mr-1" />
                                                Add Topic
                                              </Button>
                                            </Suspense>
                                          </div>
                                        </div>

                                        {/* Topics Level */}
                                        {expandedPlanCategories.has(
                                          category.id,
                                        ) &&
                                          category.topics &&
                                          category.topics.length > 0 && (
                                            <div className="mt-2 ml-6 space-y-2">
                                              {category.topics.map((topic) => (
                                                <div
                                                  key={topic.id}
                                                  className="border border-gray-200 dark:border-gray-700 rounded p-2 bg-gray-50 dark:bg-gray-800/50"
                                                >
                                                  <div className="flex items-center justify-between">
                                                    <div className="flex items-center space-x-2 flex-1">
                                                      <button
                                                        onClick={() =>
                                                          onRemoveTopicFromCategory(
                                                            category.id,
                                                            topic.id,
                                                          )
                                                        }
                                                        className="flex-shrink-0 p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                                                        title="Remove from plan"
                                                      >
                                                        <CheckSquare className="h-3 w-3 text-green-600 dark:text-green-400" />
                                                      </button>
                                                      <button
                                                        onClick={() =>
                                                          onTogglePlanTopic(
                                                            topic.id,
                                                          )
                                                        }
                                                        className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                                                      >
                                                        {expandedPlanTopics.has(
                                                          topic.id,
                                                        ) ? (
                                                          <ChevronDown className="h-3 w-3" />
                                                        ) : (
                                                          <ChevronRight className="h-3 w-3" />
                                                        )}
                                                      </button>
                                                      <Target className="h-3 w-3 text-orange-600" />
                                                      <div className="flex items-center space-x-2 flex-1">
                                                        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                                          {topic.name ||
                                                            topic.title}
                                                        </span>
                                                        {topic.totalQuestionCount !==
                                                          undefined && (
                                                          <Badge
                                                            variant="outline"
                                                            className="text-xs font-semibold bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-700 px-2 py-0.5"
                                                          >
                                                            <MessageSquare className="h-3 w-3 mr-1 inline" />
                                                            {
                                                              topic.totalQuestionCount
                                                            }{" "}
                                                            in topic
                                                          </Badge>
                                                        )}
                                                        {topic.planQuestionCount !==
                                                          undefined && (
                                                          <Badge
                                                            variant="outline"
                                                            className={`text-xs font-semibold px-2 py-0.5 ${
                                                              topic.planQuestionCount >
                                                              0
                                                                ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700"
                                                                : "bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-700"
                                                            }`}
                                                          >
                                                            <CheckSquare className="h-3 w-3 mr-1 inline" />
                                                            {
                                                              topic.planQuestionCount
                                                            }{" "}
                                                            in plan
                                                          </Badge>
                                                        )}
                                                      </div>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                      <Suspense
                                                        fallback={
                                                          <LoadingSkeleton />
                                                        }
                                                      >
                                                        <Button
                                                          onClick={() =>
                                                            onAddQuestionToTopic(
                                                              plan.id,
                                                              topic.id,
                                                            )
                                                          }
                                                          size="sm"
                                                          variant="ghost"
                                                          className="h-6 px-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 text-xs"
                                                        >
                                                          <Plus className="h-3 w-3 mr-1" />
                                                          Add Question
                                                        </Button>
                                                      </Suspense>
                                                    </div>
                                                  </div>

                                                  {/* Questions Level */}
                                                  {expandedPlanTopics.has(
                                                    topic.id,
                                                  ) &&
                                                    topic.questions &&
                                                    topic.questions.length >
                                                      0 && (
                                                      <div className="mt-2 ml-6 space-y-1">
                                                        {topic.questions.map(
                                                          (question) => (
                                                            <div
                                                              key={question.id}
                                                              className="flex items-center justify-between py-1 px-2 rounded bg-white dark:bg-gray-900"
                                                            >
                                                              <div className="flex items-center space-x-2 flex-1">
                                                                <button
                                                                  onClick={() =>
                                                                    onRemoveQuestionFromPlan(
                                                                      plan.id,
                                                                      topic.id,
                                                                      question.id,
                                                                    )
                                                                  }
                                                                  className="flex-shrink-0 p-0.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                                                                  title="Remove from plan"
                                                                >
                                                                  <CheckSquare className="h-3 w-3 text-green-600 dark:text-green-400" />
                                                                </button>
                                                                <MessageSquare className="h-3 w-3 text-red-600" />
                                                                <span className="text-xs text-gray-900 dark:text-gray-100 truncate">
                                                                  {question.title ||
                                                                    "Untitled Question"}
                                                                </span>
                                                              </div>
                                                            </div>
                                                          ),
                                                        )}
                                                      </div>
                                                    )}
                                                </div>
                                              ))}
                                            </div>
                                          )}
                                      </div>
                                    ))}
                                  </div>
                                )}
                            </div>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

export type PlansListPropsType = PlansListProps;
