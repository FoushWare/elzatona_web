/* eslint-disable @typescript-eslint/no-explicit-any */
// This file uses 'any' types for content creation data structures
"use client";

import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

import { Card, CardContent, CardHeader, CardTitle } from "@elzatona/components";
import { Button } from "@elzatona/components";
import { Badge } from "@elzatona/components";
import { Skeleton } from "@elzatona/components";
import {
  useCards,
  usePlans,
  useCategories,
  useTopics,
  useQuestionsUnified,
  useCreateCard,
  useCreatePlan,
  useCreateCategory,
  useCreateTopic,
  useCreateQuestion,
  useUpdateCard,
  useUpdatePlan,
  useUpdateCategory,
  useUpdateTopic,
  useUpdateQuestion,
  useDeleteCard,
  useDeletePlan,
  useDeleteCategory,
  useDeleteTopic,
  useDeleteQuestion,
} from "@elzatona/hooks";
import {
  ChevronDown,
  ChevronRight,
  Plus,
  Edit,
  Trash2,
  Layers,
  Calendar,
  BookOpen,
  Target,
  MessageSquare,
  Loader2,
} from "lucide-react";

// Loading skeleton for cards
const CardSkeleton = () => (
  <Card>
    <CardHeader>
      <Skeleton className="h-6 w-48" />
      <Skeleton className="h-4 w-32" />
    </CardHeader>
    <CardContent>
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </CardContent>
  </Card>
);

// Main content management component using TanStack Query
export const TanStackContentManagement: React.FC = () => {
  // State for expanded items
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(),
  );
  const [expandedTopics, setExpandedTopics] = useState<Set<string>>(new Set());
  const [expandedPlans, setExpandedPlans] = useState<Set<string>>(new Set());

  // Fetch data using custom hooks
  const {
    data: cardsData,
    isLoading: cardsLoading,
    error: cardsError,
  } = useCards();

  const {
    data: plansData,
    isLoading: plansLoading,
    error: plansError,
  } = usePlans();

  const {
    data: categoriesData,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useCategories();

  const {
    data: topicsData,
    isLoading: topicsLoading,
    error: topicsError,
  } = useTopics();

  const {
    data: questionsData,
    isLoading: questionsLoading,
    error: questionsError,
  } = useQuestionsUnified();

  // Mutation hooks for CRUD operations
  const createCardMutation = useCreateCard();
  const createPlanMutation = useCreatePlan();
  const createCategoryMutation = useCreateCategory();
  const createTopicMutation = useCreateTopic();
  const createQuestionMutation = useCreateQuestion();

  const updateCardMutation = useUpdateCard();
  const updatePlanMutation = useUpdatePlan();
  const updateCategoryMutation = useUpdateCategory();
  const updateTopicMutation = useUpdateTopic();
  const updateQuestionMutation = useUpdateQuestion();

  const deleteCardMutation = useDeleteCard();
  const deletePlanMutation = useDeletePlan();
  const deleteCategoryMutation = useDeleteCategory();
  const deleteTopicMutation = useDeleteTopic();
  const deleteQuestionMutation = useDeleteQuestion();

  // Toggle functions
  const toggleCard = (card_id: string) => {
    setExpandedCards((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(card_id)) {
        newSet.delete(card_id);
      } else {
        newSet.add(card_id);
      }
      return newSet;
    });
  };

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

  const toggleTopic = (topicId: string) => {
    setExpandedTopics((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(topicId)) {
        newSet.delete(topicId);
      } else {
        newSet.add(topicId);
      }
      return newSet;
    });
  };

  const togglePlan = (plan_id: string) => {
    setExpandedPlans((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(plan_id)) {
        newSet.delete(plan_id);
      } else {
        newSet.add(plan_id);
      }
      return newSet;
    });
  };

  // Handle CRUD operations
  const handleCreateCard = async (cardData: any) => {
    try {
      await createCardMutation.mutateAsync(cardData);
      // Success handled by mutation's onSuccess callback
    } catch (error) {
      console.error("Failed to create card:", error);
    }
  };

  const handleCreatePlan = async (planData: any) => {
    try {
      await createPlanMutation.mutateAsync(planData);
    } catch (error) {
      console.error("Failed to create plan:", error);
    }
  };

  const handleCreateCategory = async (categoryData: any) => {
    try {
      await createCategoryMutation.mutateAsync(categoryData);
    } catch (error) {
      console.error("Failed to create category:", error);
    }
  };

  const handleCreateTopic = async (topicData: any) => {
    try {
      await createTopicMutation.mutateAsync(topicData);
    } catch (error) {
      console.error("Failed to create topic:", error);
    }
  };

  const handleCreateQuestion = async (questionData: any) => {
    try {
      await createQuestionMutation.mutateAsync(questionData);
    } catch (error) {
      console.error("Failed to create question:", error);
    }
  };

  const handleDeleteCard = async (card_id: string) => {
    try {
      await deleteCardMutation.mutateAsync(card_id);
    } catch (error) {
      console.error("Failed to delete card:", error);
    }
  };

  const handleDeletePlan = async (plan_id: string) => {
    try {
      await deletePlanMutation.mutateAsync(plan_id);
    } catch (error) {
      console.error("Failed to delete plan:", error);
    }
  };

  const handleDeleteCategory = async (categoryId: string) => {
    try {
      await deleteCategoryMutation.mutateAsync(categoryId);
    } catch (error) {
      console.error("Failed to delete category:", error);
    }
  };

  const handleDeleteTopic = async (topicId: string) => {
    try {
      await deleteTopicMutation.mutateAsync(topicId);
    } catch (error) {
      console.error("Failed to delete topic:", error);
    }
  };

  const handleDeleteQuestion = async (question_id: string) => {
    try {
      await deleteQuestionMutation.mutateAsync(question_id);
    } catch (error) {
      console.error("Failed to delete question:", error);
    }
  };

  // Check if any data is loading
  const isLoading =
    cardsLoading ||
    plansLoading ||
    categoriesLoading ||
    topicsLoading ||
    questionsLoading;

  // Check if there are any errors
  const hasError =
    cardsError ||
    plansError ||
    categoriesError ||
    topicsError ||
    questionsError;

  if (hasError) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-red-500 mb-4">
                <Layers className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Error Loading Content
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                There was an error loading the content management data.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          🎯 Unified Learning Management
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Comprehensive admin interface for managing learning cards, plans,
          categories, topics, and questions
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5 mb-8">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Cards
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {cardsLoading ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                cardsData?.count || 0
              )}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Plans
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {plansLoading ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                plansData?.count || 0
              )}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {categoriesLoading ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                categoriesData?.count || 0
              )}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Topics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {topicsLoading ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                topicsData?.count || 0
              )}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Questions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {questionsLoading ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                questionsData?.pagination.totalCount || 0
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Learning Cards Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
            <Layers className="h-5 w-5 mr-2" />
            Learning Cards
          </h2>
          <Button
            onClick={() =>
              handleCreateCard({
                name: "New Card",
                description: "A new learning card",
              })
            }
            disabled={createCardMutation.isPending}
          >
            {createCardMutation.isPending ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Plus className="h-4 w-4 mr-2" />
            )}
            Add Card
          </Button>
        </div>

        <div className="space-y-4">
          {cardsLoading ? (
            <div className="grid gap-4 md:grid-cols-2">
              {[...Array(4)].map((_, i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          ) : (
            cardsData?.data?.map((card) => {
              const cardCategories =
                categoriesData?.data?.filter(
                  (cat) => cat.cardType === card.title,
                ) || [];

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
                        <Layers
                          className="h-5 w-5"
                          style={{ color: card.color }}
                        />
                        <div>
                          <CardTitle className="text-lg">
                            {card.title}
                          </CardTitle>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {card.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">
                          {cardCategories.length} Categories
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteCard(card.id)}
                          disabled={deleteCardMutation.isPending}
                        >
                          {deleteCardMutation.isPending ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardHeader>

                  {expandedCards.has(card.id) && (
                    <CardContent className="pt-0">
                      <div className="space-y-4">
                        {cardCategories.map((category) => (
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
                                <Button variant="ghost" size="sm">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    handleDeleteCategory(category.id)
                                  }
                                  disabled={deleteCategoryMutation.isPending}
                                >
                                  {deleteCategoryMutation.isPending ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                  ) : (
                                    <Trash2 className="h-4 w-4" />
                                  )}
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  )}
                </Card>
              );
            })
          )}
        </div>
      </div>

      {/* Learning Plans Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Learning Plans
          </h2>
          <Button
            onClick={() =>
              handleCreatePlan({
                name: "New Plan",
                description: "A new learning plan",
              })
            }
            disabled={createPlanMutation.isPending}
          >
            {createPlanMutation.isPending ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Plus className="h-4 w-4 mr-2" />
            )}
            Add Plan
          </Button>
        </div>

        <div className="space-y-4">
          {plansLoading ? (
            <div className="grid gap-4 md:grid-cols-2">
              {[...Array(3)].map((_, i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          ) : (
            plansData?.data?.map((plan) => (
              <Card
                key={plan.id}
                className="border-l-4"
                style={{ borderLeftColor: plan.color }}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => togglePlan(plan.id)}
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
                        style={{ color: plan.color }}
                      />
                      <div>
                        <CardTitle className="text-lg">{plan.name}</CardTitle>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {plan.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">
                        {plan.duration} • {plan.difficulty}
                      </Badge>
                      <Badge variant="outline">{plan.estimatedHours}h</Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeletePlan(plan.id)}
                        disabled={deletePlanMutation.isPending}
                      >
                        {deletePlanMutation.isPending ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                {expandedPlans.has(plan.id) && (
                  <CardContent className="pt-0">
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      <p>
                        <strong>Duration:</strong> {plan.duration}
                      </p>
                      <p>
                        <strong>Difficulty:</strong> {plan.difficulty}
                      </p>
                      <p>
                        <strong>Estimated Hours:</strong> {plan.estimatedHours}
                      </p>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TanStackContentManagement;
