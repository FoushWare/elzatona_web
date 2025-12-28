/**
 * AddItemModal Component
 * Step-by-step modal for adding items to plan hierarchy
 * v1.0
 */

"use client";

import React, { useState } from "react";
import { Modal, Button, Badge } from "@elzatona/common-ui";
import {
  Plus,
  Layers,
  BookOpen,
  Target,
  MessageSquare,
  Eye,
  CheckSquare,
  Square,
} from "lucide-react";
import { LearningCard } from "@elzatona/types";
import { UnifiedQuestion } from "@elzatona/types";

// Types
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type LearningPlan = any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Category = any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Topic = any;

interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  addItemContext: {
    planId: string;
    type: "card" | "category" | "topic" | "question";
    parentId?: string;
  } | null;
  cards: readonly LearningCard[];
  categories: readonly Category[];
  topics: readonly Topic[];
  questions: readonly UnifiedQuestion[];
  planHierarchy: Record<string, any>;
  onAddCardToPlan: (planId: string, cardId: string) => Promise<void>;
  onAddCategoryToCard: (cardId: string, categoryId: string) => Promise<void>;
  onAddTopicToCategory: (categoryId: string, topicId: string) => Promise<void>;
  onAddQuestionToTopic: (topicId: string, questionId: string) => Promise<void>;
  onFetchPlanHierarchy: (planId: string) => Promise<void>;
  onViewQuestion: (question: UnifiedQuestion) => void;
}

export function AddItemModal({
  isOpen,
  onClose,
  addItemContext,
  cards,
  categories,
  topics,
  questions,
  planHierarchy,
  onAddCardToPlan,
  onAddCategoryToCard,
  onAddTopicToCategory,
  onAddQuestionToTopic,
  onFetchPlanHierarchy,
  onViewQuestion,
}: AddItemModalProps) {
  const [selectedQuestionIds, setSelectedQuestionIds] = useState<Set<string>>(
    new Set(),
  );

  if (!addItemContext) return null;

  const handleClose = () => {
    setSelectedQuestionIds(new Set());
    onClose();
  };

  const getTitle = () => {
    switch (addItemContext.type) {
      case "card":
        return "Step 1: Select Card";
      case "category":
        return "Step 2: Select Category from Card";
      case "topic":
        return "Step 3: Select Topic from Category";
      case "question":
        return "Step 4: Select Question from Topic";
      default:
        return "Add Item";
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={getTitle()} size="xl">
      <div className="space-y-4">
        {/* Step 1: Select Card */}
        {addItemContext.type === "card" && (
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Available Cards
            </h4>
            <div className="max-h-96 overflow-y-auto space-y-2 border rounded-lg p-2">
              {cards.map((card) => {
                const hierarchy = planHierarchy[addItemContext.planId] || [];
                const isInPlan = hierarchy.some((c: any) => c.id === card.id);
                return (
                  <div
                    key={card.id}
                    className="flex items-center justify-between p-3 rounded border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-center space-x-3 flex-1">
                      <Layers className="h-5 w-5 text-blue-600" />
                      <div>
                        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {card.title}
                        </span>
                        {card.description && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {card.description}
                          </p>
                        )}
                      </div>
                    </div>
                    {isInPlan ? (
                      <Badge variant="secondary">Already in plan</Badge>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={async () => {
                          await onAddCardToPlan(addItemContext.planId, card.id);
                          await onFetchPlanHierarchy(addItemContext.planId);
                          handleClose();
                        }}
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add
                      </Button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 2: Select Category from Card */}
        {addItemContext.type === "category" && addItemContext.parentId && (
          <div>
            <div className="mb-3 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Selected Card:{" "}
                <span className="font-medium">
                  {cards.find((c) => c.id === addItemContext.parentId)?.title}
                </span>
              </p>
            </div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Categories in this Card
            </h4>
            <div className="max-h-96 overflow-y-auto space-y-2 border rounded-lg p-2">
              {categories
                .filter(
                  (cat) =>
                    cat.learning_card_id === addItemContext.parentId ||
                    (cat as any).card_id === addItemContext.parentId,
                )
                .map((category) => {
                  const hierarchy = planHierarchy[addItemContext.planId] || [];
                  const card = hierarchy.find(
                    (c: any) => c.id === addItemContext.parentId,
                  );
                  const isInCard = card?.categories?.some(
                    (cat: any) => cat.id === category.id,
                  );
                  return (
                    <div
                      key={category.id}
                      className="flex items-center justify-between p-3 rounded border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <div className="flex items-center space-x-3 flex-1">
                        <BookOpen className="h-5 w-5 text-purple-600" />
                        <div>
                          <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            {category.name || category.title}
                          </span>
                          {category.description && (
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              {category.description}
                            </p>
                          )}
                        </div>
                      </div>
                      {isInCard ? (
                        <Badge variant="secondary">Already in card</Badge>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={async () => {
                            await onAddCategoryToCard(
                              addItemContext.parentId!,
                              category.id,
                            );
                            await onFetchPlanHierarchy(addItemContext.planId);
                            handleClose();
                          }}
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Add
                        </Button>
                      )}
                    </div>
                  );
                })}
              {categories.filter(
                (cat) =>
                  cat.learning_card_id === addItemContext.parentId ||
                  (cat as any).card_id === addItemContext.parentId,
              ).length === 0 && (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <BookOpen className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>No categories available for this card</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 3: Select Topic from Category */}
        {addItemContext.type === "topic" && addItemContext.parentId && (
          <div>
            <div className="mb-3 p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Selected Category:{" "}
                <span className="font-medium">
                  {categories.find((c) => c.id === addItemContext.parentId)
                    ?.name ||
                    categories.find((c) => c.id === addItemContext.parentId)
                      ?.title}
                </span>
              </p>
            </div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Topics in this Category
            </h4>
            <div className="max-h-96 overflow-y-auto space-y-2 border rounded-lg p-2">
              {topics
                .filter(
                  (topic) => topic.category_id === addItemContext.parentId,
                )
                .map((topic) => {
                  const hierarchy = planHierarchy[addItemContext.planId] || [];
                  const card = hierarchy.find((c: any) =>
                    c.categories?.some(
                      (cat: any) => cat.id === addItemContext.parentId,
                    ),
                  );
                  const category = card?.categories?.find(
                    (cat: any) => cat.id === addItemContext.parentId,
                  );
                  const isInCategory = category?.topics?.some(
                    (t: any) => t.id === topic.id,
                  );
                  return (
                    <div
                      key={topic.id}
                      className="flex items-center justify-between p-3 rounded border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <div className="flex items-center space-x-3 flex-1">
                        <Target className="h-5 w-5 text-orange-600" />
                        <div>
                          <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            {topic.name || topic.title}
                          </span>
                          {topic.description && (
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              {topic.description}
                            </p>
                          )}
                        </div>
                      </div>
                      {isInCategory ? (
                        <Badge variant="secondary">Already in category</Badge>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={async () => {
                            await onAddTopicToCategory(
                              addItemContext.parentId!,
                              topic.id,
                            );
                            await onFetchPlanHierarchy(addItemContext.planId);
                            handleClose();
                          }}
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Add
                        </Button>
                      )}
                    </div>
                  );
                })}
              {topics.filter(
                (topic) => topic.category_id === addItemContext.parentId,
              ).length === 0 && (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <Target className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>No topics available for this category</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 4: Select Question from Topic */}
        {addItemContext.type === "question" && addItemContext.parentId && (
          <div>
            <div className="mb-3 p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Selected Topic:{" "}
                <span className="font-medium">
                  {topics.find((t) => t.id === addItemContext.parentId)?.name ||
                    topics.find((t) => t.id === addItemContext.parentId)?.title}
                </span>
              </p>
            </div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                Questions in this Topic
              </h4>
              {selectedQuestionIds.size > 0 && (
                <Button
                  size="sm"
                  variant="default"
                  onClick={async () => {
                    const addPromises = Array.from(selectedQuestionIds).map(
                      (questionId) =>
                        onAddQuestionToTopic(
                          addItemContext.parentId!,
                          questionId,
                        ),
                    );
                    await Promise.all(addPromises);
                    await onFetchPlanHierarchy(addItemContext.planId);
                    setSelectedQuestionIds(new Set());
                    handleClose();
                  }}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Selected ({selectedQuestionIds.size})
                </Button>
              )}
            </div>
            <div className="max-h-96 overflow-y-auto space-y-2 border rounded-lg p-2">
              {questions
                .filter(
                  (q) =>
                    q.topic_id === addItemContext.parentId ||
                    q.topics?.some((t) => t.id === addItemContext.parentId),
                )
                .slice(0, 100)
                .map((question) => {
                  const hierarchy = planHierarchy[addItemContext.planId] || [];
                  const card = hierarchy.find((c: any) =>
                    c.categories?.some((cat: any) =>
                      cat.topics?.some(
                        (t: any) => t.id === addItemContext.parentId,
                      ),
                    ),
                  );
                  const category = card?.categories?.find((cat: any) =>
                    cat.topics?.some(
                      (t: any) => t.id === addItemContext.parentId,
                    ),
                  );
                  const topic = category?.topics?.find(
                    (t: any) => t.id === addItemContext.parentId,
                  );
                  const isInTopic = topic?.questions?.some(
                    (q: any) => q.id === question.id,
                  );
                  const isSelected = selectedQuestionIds.has(question.id);

                  return (
                    <div
                      key={question.id}
                      className="flex items-center justify-between p-3 rounded border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <div className="flex items-center space-x-3 flex-1">
                        <button
                          onClick={() => {
                            if (isInTopic) return;
                            setSelectedQuestionIds((prev) => {
                              const newSet = new Set(prev);
                              if (newSet.has(question.id)) {
                                newSet.delete(question.id);
                              } else {
                                newSet.add(question.id);
                              }
                              return newSet;
                            });
                          }}
                          disabled={isInTopic}
                          className={`flex-shrink-0 ${
                            isInTopic
                              ? "cursor-not-allowed opacity-50"
                              : "cursor-pointer"
                          }`}
                        >
                          {isSelected ? (
                            <CheckSquare className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                          ) : (
                            <Square className="h-5 w-5 text-gray-400" />
                          )}
                        </button>
                        <MessageSquare className="h-5 w-5 text-red-600" />
                        <div className="flex-1 min-w-0">
                          <span className="text-sm font-medium text-gray-900 dark:text-gray-100 block truncate">
                            {question.title || "Untitled Question"}
                          </span>
                          <div className="flex items-center space-x-2 mt-1">
                            {question.difficulty && (
                              <Badge variant="outline" className="text-xs">
                                {question.difficulty}
                              </Badge>
                            )}
                            {question.type && (
                              <Badge variant="outline" className="text-xs">
                                {question.type}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={async () => {
                            try {
                              const response = await fetch(
                                `/api/questions/unified/${question.id}`,
                              );
                              if (response.ok) {
                                const result = await response.json();
                                if (result.success && result.data) {
                                  const fullQuestion = result.data;
                                  if (
                                    fullQuestion.code &&
                                    typeof fullQuestion.code === "string"
                                  ) {
                                    fullQuestion.code = fullQuestion.code
                                      .replace(/\\n/g, "\n")
                                      .replace(/\\r\\n/g, "\n")
                                      .replace(/\\r/g, "\n")
                                      .replace(/\r\n/g, "\n")
                                      .replace(/\r/g, "\n");
                                  }
                                  onViewQuestion(fullQuestion);
                                } else {
                                  onViewQuestion(question);
                                }
                              } else {
                                onViewQuestion(question);
                              }
                            } catch (error) {
                              console.error("Error fetching question:", error);
                              onViewQuestion(question);
                            }
                          }}
                          className="h-8 w-8 p-0"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        {isInTopic ? (
                          <Badge variant="secondary">Already in topic</Badge>
                        ) : (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={async () => {
                              await onAddQuestionToTopic(
                                addItemContext.parentId!,
                                question.id,
                              );
                              await onFetchPlanHierarchy(addItemContext.planId);
                              setSelectedQuestionIds(new Set());
                              handleClose();
                            }}
                          >
                            <Plus className="h-4 w-4 mr-1" />
                            Add
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                })}
              {questions.filter(
                (q) =>
                  q.topic_id === addItemContext.parentId ||
                  q.topics?.some((t) => t.id === addItemContext.parentId),
              ).length === 0 && (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <MessageSquare className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>No questions available for this topic</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
