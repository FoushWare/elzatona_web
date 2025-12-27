"use client";

import React, { useEffect, useMemo, useState, useCallback } from "react";
// Note: This page uses hooks, not direct supabase client

import {
  useCards,
  usePlans,
  useCategories,
  useTopics,
  useQuestionsUnified,
  useCreateCard,
  useUpdateCard,
  useDeleteCard,
  useCreatePlan,
  useUpdatePlan,
  useDeletePlan,
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory,
  useCreateTopic,
  useUpdateTopic,
  useDeleteTopic,
  useCreateQuestion,
  useUpdateQuestion,
  useDeleteQuestion,
} from "@elzatona/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { useNotificationActions } from "@elzatona/hooks";
import { LearningCard } from "@elzatona/types";
import { UnifiedQuestion } from "@elzatona/types";
import {
  useToast,
  ToastContainer,
  ConfirmDeleteDialog,
} from "@elzatona/common-ui";
import { ContentManagementTemplate } from "@elzatona/common-ui";

// Define types for other entities (these should be moved to proper type files)
type LearningPlan = any; // eslint-disable-line @typescript-eslint/no-explicit-any
type Category = any; // eslint-disable-line @typescript-eslint/no-explicit-any
type Topic = any; // eslint-disable-line @typescript-eslint/no-explicit-any

// Lazy load UI components to improve initial bundle size (only those used in modals)
const Button = React.lazy(() =>
  import("@elzatona/common-ui").then((module) => ({
    default: module.Button,
  })),
);
const Badge = React.lazy(() =>
  import("@elzatona/common-ui").then((module) => ({
    default: module.Badge,
  })),
);
import { Modal } from "@elzatona/common-ui";
import { ViewQuestionModal } from "../content/questions/components/ViewQuestionModal";

// Import icons with tree shaking
import {
  Plus,
  MessageSquare,
  BookOpen,
  Layers,
  Target,
  Eye,
  CheckSquare,
  Square,
} from "lucide-react";

// Lazy load forms to reduce initial bundle size
const CategoryForm = React.lazy(() =>
  import("@elzatona/common-ui").then((module) => ({
    default: module.CategoryForm,
  })),
);
const TopicForm = React.lazy(() =>
  import("@elzatona/common-ui").then((module) => ({
    default: module.TopicForm,
  })),
);
const QuestionForm = React.lazy(() =>
  import("@elzatona/common-ui").then((module) => ({
    default: module.QuestionForm,
  })),
);
const CardForm = React.lazy(() =>
  import("@elzatona/common-ui").then((module) => ({
    default: module.CardForm,
  })),
);
const PlanForm = React.lazy(() =>
  import("@elzatona/common-ui").then((module) => ({
    default: module.PlanForm,
  })),
);
// Stats interface is now defined in ContentManagementTemplate

export default function UnifiedAdminPage() {
  // Use TanStack Query hooks for data fetching
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

  // Mutation hooks
  const createCardMutation = useCreateCard();
  const updateCardMutation = useUpdateCard();
  const deleteCardMutation = useDeleteCard();
  const createPlanMutation = useCreatePlan();
  const updatePlanMutation = useUpdatePlan();
  const deletePlanMutation = useDeletePlan();
  const createCategoryMutation = useCreateCategory();
  const updateCategoryMutation = useUpdateCategory();
  const deleteCategoryMutation = useDeleteCategory();
  const createTopicMutation = useCreateTopic();
  const updateTopicMutation = useUpdateTopic();
  const deleteTopicMutation = useDeleteTopic();
  const createQuestionMutation = useCreateQuestion();
  const updateQuestionMutation = useUpdateQuestion();
  const deleteQuestionMutation = useDeleteQuestion();

  // Notification actions
  const { notifyContentUpdate } = useNotificationActions();

  // Query client for manual invalidation
  const queryClient = useQueryClient();

  // Toast notifications
  const { showSuccess, showError, toasts, removeToast } = useToast();

  // Debug logging for TanStack Query
  console.log("TanStack Query Status:", {
    cardsLoading,
    cardsError,
    cardsData: cardsData
      ? { count: cardsData.count, dataLength: cardsData.data?.length }
      : null,
    plansLoading,
    plansError,
    plansData: plansData
      ? { count: plansData.count, dataLength: plansData.data?.length }
      : null,
    categoriesLoading,
    categoriesError,
    categoriesData: categoriesData
      ? { count: categoriesData.count, dataLength: categoriesData.data?.length }
      : null,
    topicsLoading,
    topicsError,
    topicsData: topicsData
      ? { count: topicsData.count, dataLength: topicsData.data?.length }
      : null,
    questionsLoading,
    questionsError,
    questionsData: questionsData
      ? {
          count: questionsData.pagination?.totalCount || 0,
          dataLength: questionsData.data?.length,
        }
      : null,
  });

  // Derived data
  const cards = cardsData?.data || [];
  const plans = plansData?.data || [];
  const categories = categoriesData?.data || [];
  const topics = topicsData?.data || [];
  const questions = questionsData?.data || [];

  // Force fresh data on mount
  useEffect(() => {
    console.log("🔄 Force refreshing all queries on mount...");
    queryClient.invalidateQueries({ queryKey: ["cards"] });
    queryClient.invalidateQueries({ queryKey: ["plans"] });
    queryClient.invalidateQueries({ queryKey: ["categories"] });
    queryClient.invalidateQueries({ queryKey: ["topics"] });
    queryClient.invalidateQueries({ queryKey: ["questionsUnified"] });
  }, []); // Only run on mount

  // Immediate retry on mount if no data
  useEffect(() => {
    console.log("🚀 Component mounted, checking initial data...");

    // If we have loading states but no data after a short delay, retry immediately
    const immediateTimer = setTimeout(() => {
      if (cardsLoading && !cardsData) {
        console.log("🔄 Immediate retry for cards");
        queryClient.invalidateQueries({ queryKey: ["cards"] });
      }
      if (plansLoading && !plansData) {
        console.log("🔄 Immediate retry for plans");
        queryClient.invalidateQueries({ queryKey: ["plans"] });
      }
    }, 500); // Very short delay for immediate retry

    return () => clearTimeout(immediateTimer);
  }, []); // Only run on mount

  // Fallback mechanism - refetch if no data after initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("🔍 Checking data availability after 2 seconds...");

      if (
        !cardsLoading &&
        (!cardsData || !cardsData.data || cardsData.data.length === 0)
      ) {
        console.log("🔄 Refetching cards due to empty data");
        queryClient.invalidateQueries({ queryKey: ["cards"] });
      }
      if (
        !plansLoading &&
        (!plansData || !plansData.data || plansData.data.length === 0)
      ) {
        console.log("🔄 Refetching plans due to empty data");
        queryClient.invalidateQueries({ queryKey: ["plans"] });
      }
      if (
        !categoriesLoading &&
        (!categoriesData ||
          !categoriesData.data ||
          categoriesData.data.length === 0)
      ) {
        console.log("🔄 Refetching categories due to empty data");
        queryClient.invalidateQueries({ queryKey: ["categories"] });
      }
      if (
        !topicsLoading &&
        (!topicsData || !topicsData.data || topicsData.data.length === 0)
      ) {
        console.log("🔄 Refetching topics due to empty data");
        queryClient.invalidateQueries({ queryKey: ["topics"] });
      }
      if (
        !questionsLoading &&
        (!questionsData ||
          !questionsData.data ||
          questionsData.data.length === 0)
      ) {
        console.log("🔄 Refetching questions due to empty data");
        queryClient.invalidateQueries({ queryKey: ["questionsUnified"] });
      }
    }, 2000); // Wait 2 seconds after component mount

    return () => clearTimeout(timer);
  }, [
    cardsLoading,
    cardsData,
    plansLoading,
    plansData,
    categoriesLoading,
    categoriesData,
    topicsLoading,
    topicsData,
    questionsLoading,
    questionsData,
    queryClient,
  ]);

  // Loading state
  const loading =
    cardsLoading ||
    plansLoading ||
    categoriesLoading ||
    topicsLoading ||
    questionsLoading;

  // Stats calculation
  const stats = useMemo(
    () => ({
      totalCards: cardsData?.count || 0,
      totalPlans: plansData?.count || 0,
      totalCategories: categoriesData?.count || 0,
      totalTopics: topicsData?.count || 0,
      totalQuestions: questionsData?.pagination?.totalCount || 0,
    }),
    [cardsData, plansData, categoriesData, topicsData, questionsData],
  );

  // UI state
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCardType, setFilterCardType] = useState("all");
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(),
  );
  const [expandedTopics, setExpandedTopics] = useState<Set<string>>(new Set());
  const [expandedPlans, setExpandedPlans] = useState<Set<string>>(new Set());

  // Modal states
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isTopicModalOpen, setIsTopicModalOpen] = useState(false);
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);

  // Confirmation modal states
  const [isDeleteCardModalOpen, setIsDeleteCardModalOpen] = useState(false);
  const [isDeletePlanModalOpen, setIsDeletePlanModalOpen] = useState(false);
  // Item to delete states
  const [cardToDelete, setCardToDelete] = useState<LearningCard | null>(null);
  const [planToDelete, setPlanToDelete] = useState<LearningPlan | null>(null);

  const [editingCard, setEditingCard] = useState<LearningCard | null>(null);
  const [editingPlan, setEditingPlan] = useState<LearningPlan | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editingTopic, setEditingTopic] = useState<Topic | null>(null);
  const [editingQuestion, setEditingQuestion] =
    useState<UnifiedQuestion | null>(null);

  // Compute questionsByTopic from questions array
  const questionsByTopic = useMemo(() => {
    const grouped: Record<
      string,
      { id: string; title: string; difficulty: string; type: string }[]
    > = {};
    questions.forEach((question) => {
      const topicId = question.topic_id || (question as any).topicId;
      if (topicId) {
        if (!grouped[topicId]) {
          grouped[topicId] = [];
        }
        grouped[topicId].push({
          id: question.id,
          title: question.title || "Untitled Question",
          difficulty: question.difficulty || "unknown",
          type: question.type || "unknown",
        });
      }
    });
    return grouped;
  }, [questions]);

  // Search and filter state for categories and topics
  const [categorySearch, setCategorySearch] = useState("");
  const [topicSearch, setTopicSearch] = useState("");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<
    string | null
  >(null);

  // Collapsible state for categories and topics (closed by default)
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isTopicsOpen, setIsTopicsOpen] = useState(false);

  // Plan hierarchy state
  const [planHierarchy, setPlanHierarchy] = useState<Record<string, any>>({});
  const [loadingPlanHierarchy, setLoadingPlanHierarchy] = useState<
    Record<string, boolean>
  >({});
  const [expandedPlanCards, setExpandedPlanCards] = useState<Set<string>>(
    new Set(),
  );
  const [expandedPlanCategories, setExpandedPlanCategories] = useState<
    Set<string>
  >(new Set());
  const [expandedPlanTopics, setExpandedPlanTopics] = useState<Set<string>>(
    new Set(),
  );

  // Add item modals state - step-by-step selection
  const [addItemContext, setAddItemContext] = useState<{
    planId: string;
    type: "card" | "category" | "topic" | "question";
    parentId?: string; // card_id for category, category_id for topic, topic_id for question
  } | null>(null);

  // Step-by-step selection state (currently not used but kept for future multi-step selection)
  // const [selectionStep, setSelectionStep] = useState<
  //   "card" | "category" | "topic" | "question"
  // >("card");
  // const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  // const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
  //   null,
  // );
  // const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);

  // Question view and selection state
  const [viewingQuestion, setViewingQuestion] =
    useState<UnifiedQuestion | null>(null);
  const [isViewQuestionModalOpen, setIsViewQuestionModalOpen] = useState(false);
  const [selectedQuestionIds, setSelectedQuestionIds] = useState<Set<string>>(
    new Set(),
  );

  // Filtered categories and topics
  const filteredCategories = useMemo(() => {
    if (!categorySearch.trim()) return categories;
    const searchLower = categorySearch.toLowerCase();
    return categories.filter(
      (category) =>
        (category.name || "").toLowerCase().includes(searchLower) ||
        (category.description || "").toLowerCase().includes(searchLower),
    );
  }, [categories, categorySearch]);

  const filteredTopics = useMemo(() => {
    let filtered = topics;

    // Filter by category
    if (selectedCategoryFilter) {
      filtered = filtered.filter(
        (topic) => topic.category_id === selectedCategoryFilter,
      );
    }

    // Filter by search term
    if (topicSearch.trim()) {
      const searchLower = topicSearch.toLowerCase();
      filtered = filtered.filter(
        (topic) =>
          (topic.name || "").toLowerCase().includes(searchLower) ||
          (topic.description || "").toLowerCase().includes(searchLower),
      );
    }

    return filtered;
  }, [topics, topicSearch, selectedCategoryFilter]);

  // CRUD handlers using TanStack Query mutations
  const handleCreateCard = async (cardData: Partial<LearningCard>) => {
    try {
      await createCardMutation.mutateAsync(cardData);
      await notifyContentUpdate("Learning Card", "created");
      showSuccess(
        "Card Created Successfully",
        `"${cardData.title}" has been created successfully.`,
      );
      // Close modal on successful creation
      setIsCardModalOpen(false);
    } catch (error) {
      console.error("Failed to create card:", error);
      showError(
        "Failed to Create Card",
        "There was an error creating the card. Please try again.",
      );
    }
  };

  const handleUpdateCard = async (
    card_id: string,
    cardData: Partial<LearningCard>,
  ) => {
    try {
      await updateCardMutation.mutateAsync({ id: card_id, data: cardData });
      await notifyContentUpdate("Learning Card", "updated");
      showSuccess(
        "Card Updated Successfully",
        `"${cardData.title}" has been updated successfully.`,
      );
      // Close modal on successful update
      setIsCardModalOpen(false);
      setEditingCard(null);
    } catch (error) {
      console.error("Failed to update card:", error);
      showError(
        "Failed to Update Card",
        "There was an error updating the card. Please try again.",
      );
    }
  };

  // Form submission wrappers
  const handleCardFormSubmit = (data: any) => {
    if (editingCard?.id) {
      handleUpdateCard(editingCard.id, data);
    } else {
      handleCreateCard(data);
    }
  };

  const handlePlanFormSubmit = (data: any) => {
    if (editingPlan?.id) {
      handleUpdatePlan(editingPlan.id, data);
    } else {
      handleCreatePlan(data);
    }
  };

  const handleCategoryFormSubmit = async (data: any) => {
    if (editingCategory?.id) {
      await handleUpdateCategory(editingCategory.id, data);
    } else {
      await handleCreateCategory(data);
    }
  };

  const handleTopicFormSubmit = async (data: any) => {
    if (editingTopic?.id) {
      // Editing mode - single topic only
      await handleUpdateTopic(editingTopic.id, data);
    } else {
      // Creating mode - can be single or bulk
      if (Array.isArray(data)) {
        // Bulk creation
        await handleBulkCreateTopics(data);
      } else {
        // Single creation
        await handleCreateTopic(data);
      }
    }
  };

  const handleQuestionFormSubmit = async (data: any) => {
    if (editingQuestion?.id) {
      await handleUpdateQuestion(editingQuestion.id, data);
    } else {
      await handleCreateQuestion(data);
    }
  };

  const handleDeleteCard = async (card_id: string) => {
    const card = cards.find((c) => c.id === card_id);
    if (card) {
      setCardToDelete(card);
      setIsDeleteCardModalOpen(true);
    }
  };

  const handleCreatePlan = async (planData: Partial<LearningPlan>) => {
    try {
      await createPlanMutation.mutateAsync(planData);
      await notifyContentUpdate("Learning Plan", "created");
    } catch (error) {
      console.error("Failed to create plan:", error);
    }
  };

  const handleUpdatePlan = async (
    plan_id: string,
    planData: Partial<LearningPlan>,
  ) => {
    try {
      await updatePlanMutation.mutateAsync({ id: plan_id, data: planData });
      await notifyContentUpdate("Learning Plan", "updated");
      // Close modal on successful update
      setIsPlanModalOpen(false);
      setEditingPlan(null);
    } catch (error) {
      console.error("Failed to update plan:", error);
    }
  };

  const handleDeletePlan = async (plan_id: string) => {
    const plan = plans.find((p) => p.id === plan_id);
    if (plan) {
      setPlanToDelete(plan);
      setIsDeletePlanModalOpen(true);
    }
  };

  // Fetch plan hierarchy
  const fetchPlanHierarchy = async (planId: string) => {
    try {
      // Set loading state
      setLoadingPlanHierarchy((prev) => ({ ...prev, [planId]: true }));

      console.log("🔄 Fetching plan hierarchy for plan:", planId);
      const response = await fetch(`/api/plans/${planId}/hierarchy`);
      const result = await response.json();

      if (result.success) {
        console.log("✅ Plan hierarchy fetched successfully:", result.data);
        setPlanHierarchy((prev) => {
          const updated = { ...prev, [planId]: result.data || [] };
          console.log("📊 Updated plan hierarchy state:", updated);
          return updated;
        });
      } else {
        console.error("❌ Failed to fetch plan hierarchy:", result.error);
      }
    } catch (error) {
      console.error("❌ Error fetching plan hierarchy:", error);
    } finally {
      // Clear loading state
      setLoadingPlanHierarchy((prev) => ({ ...prev, [planId]: false }));
    }
  };

  // Toggle expand for plan cards
  const togglePlanCard = useCallback((cardId: string) => {
    setExpandedPlanCards((prev) => {
      const newExpanded = new Set(prev);
      if (newExpanded.has(cardId)) {
        newExpanded.delete(cardId);
      } else {
        newExpanded.add(cardId);
      }
      return newExpanded;
    });
  }, []);

  // Toggle expand for plan categories
  const togglePlanCategory = useCallback((categoryId: string) => {
    setExpandedPlanCategories((prev) => {
      const newExpanded = new Set(prev);
      if (newExpanded.has(categoryId)) {
        newExpanded.delete(categoryId);
      } else {
        newExpanded.add(categoryId);
      }
      return newExpanded;
    });
  }, []);

  // Toggle expand for plan topics
  const togglePlanTopic = useCallback((topicId: string) => {
    setExpandedPlanTopics((prev) => {
      const newExpanded = new Set(prev);
      if (newExpanded.has(topicId)) {
        newExpanded.delete(topicId);
      } else {
        newExpanded.add(topicId);
      }
      return newExpanded;
    });
  }, []);

  // Add items to hierarchy
  const addCardToPlan = async (planId: string, cardId: string) => {
    try {
      const response = await fetch(`/api/plans/${planId}/cards`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ card_id: cardId }),
      });
      const result = await response.json();
      if (result.success) {
        showSuccess("Card Added", "Card added to plan successfully");
        await fetchPlanHierarchy(planId);
        queryClient.invalidateQueries();
      } else {
        showError(
          "Failed to Add",
          result.error || "Failed to add card to plan",
        );
      }
    } catch (error) {
      console.error("Error adding card to plan:", error);
      showError("Failed to Add", "Failed to add card to plan");
    }
  };

  const addCategoryToCard = async (cardId: string, categoryId: string) => {
    try {
      const response = await fetch(`/api/cards/${cardId}/categories`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category_id: categoryId }),
      });
      const result = await response.json();
      if (result.success) {
        showSuccess("Category Added", "Category added to card successfully");
        // Find which plan contains this card and refresh
        const plan = plans.find((p) => {
          const hierarchy = planHierarchy[p.id] || [];
          return hierarchy.some((c: any) => c.id === cardId);
        });
        if (plan) {
          await fetchPlanHierarchy(plan.id);
        }
        queryClient.invalidateQueries();
      } else {
        showError(
          "Failed to Add",
          result.error || "Failed to add category to card",
        );
      }
    } catch (error) {
      console.error("Error adding category to card:", error);
      showError("Failed to Add", "Failed to add category to card");
    }
  };

  const addTopicToCategory = async (categoryId: string, topicId: string) => {
    try {
      const response = await fetch(`/api/categories/${categoryId}/topics`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic_id: topicId }),
      });
      const result = await response.json();
      if (result.success) {
        showSuccess("Topic Added", "Topic added to category successfully");
        // Find which plan contains this category and refresh
        const plan = plans.find((p) => {
          const hierarchy = planHierarchy[p.id] || [];
          return hierarchy.some((c: any) =>
            c.categories?.some((cat: any) => cat.id === categoryId),
          );
        });
        if (plan) {
          await fetchPlanHierarchy(plan.id);
        }
        queryClient.invalidateQueries();
      } else {
        showError(
          "Failed to Add",
          result.error || "Failed to add topic to category",
        );
      }
    } catch (error) {
      console.error("Error adding topic to category:", error);
      showError("Failed to Add", "Failed to add topic to category");
    }
  };

  const addQuestionToTopic = async (topicId: string, questionId: string) => {
    try {
      const response = await fetch(`/api/topics/${topicId}/questions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question_id: questionId }),
      });
      const result = await response.json();
      if (result.success) {
        showSuccess("Question Added", "Question added to topic successfully");
        // Find which plan contains this topic and refresh
        const plan = plans.find((p) => {
          const hierarchy = planHierarchy[p.id] || [];
          return hierarchy.some((c: any) =>
            c.categories?.some((cat: any) =>
              cat.topics?.some((t: any) => t.id === topicId),
            ),
          );
        });
        if (plan) {
          await fetchPlanHierarchy(plan.id);
        }
        queryClient.invalidateQueries();
      } else {
        showError(
          "Failed to Add",
          result.error || "Failed to add question to topic",
        );
      }
    } catch (error) {
      console.error("Error adding question to topic:", error);
      showError("Failed to Add", "Failed to add question to topic");
    }
  };

  // Remove items from hierarchy
  const removeCardFromPlan = async (planId: string, cardId: string) => {
    try {
      const response = await fetch(
        `/api/plans/${planId}/cards?card_id=${cardId}`,
        {
          method: "DELETE",
        },
      );
      const result = await response.json();
      if (result.success) {
        showSuccess("Card Removed", "Card removed from plan successfully");
        await fetchPlanHierarchy(planId);
        queryClient.invalidateQueries();
      } else {
        showError(
          "Failed to Remove",
          result.error || "Failed to remove card from plan",
        );
      }
    } catch (error) {
      console.error("Error removing card from plan:", error);
      showError("Failed to Remove", "Failed to remove card from plan");
    }
  };

  const removeCategoryFromCard = async (cardId: string, categoryId: string) => {
    try {
      const response = await fetch(
        `/api/cards/${cardId}/categories?category_id=${categoryId}`,
        {
          method: "DELETE",
        },
      );
      const result = await response.json();
      if (result.success) {
        showSuccess(
          "Category Removed",
          "Category removed from card successfully",
        );
        const plan = plans.find((p) => {
          const hierarchy = planHierarchy[p.id] || [];
          return hierarchy.some((c: any) => c.id === cardId);
        });
        if (plan) {
          await fetchPlanHierarchy(plan.id);
        }
        queryClient.invalidateQueries();
      } else {
        showError(
          "Failed to Remove",
          result.error || "Failed to remove category from card",
        );
      }
    } catch (error) {
      console.error("Error removing category from card:", error);
      showError("Failed to Remove", "Failed to remove category from card");
    }
  };

  const removeTopicFromCategory = async (
    categoryId: string,
    topicId: string,
  ) => {
    try {
      const response = await fetch(
        `/api/categories/${categoryId}/topics?topic_id=${topicId}`,
        {
          method: "DELETE",
        },
      );
      const result = await response.json();
      if (result.success) {
        showSuccess(
          "Topic Removed",
          "Topic removed from category successfully",
        );
        const plan = plans.find((p) => {
          const hierarchy = planHierarchy[p.id] || [];
          return hierarchy.some((c: any) =>
            c.categories?.some((cat: any) => cat.id === categoryId),
          );
        });
        if (plan) {
          await fetchPlanHierarchy(plan.id);
        }
        queryClient.invalidateQueries();
      } else {
        showError(
          "Failed to Remove",
          result.error || "Failed to remove topic from category",
        );
      }
    } catch (error) {
      console.error("Error removing topic from category:", error);
      showError("Failed to Remove", "Failed to remove topic from category");
    }
  };

  // Note: removeQuestionFromTopic is not currently used but kept for future use
  // const removeQuestionFromTopic = async (
  //   topicId: string,
  //   questionId: string,
  // ) => {
  //   try {
  //     const response = await fetch(
  //       `/api/topics/${topicId}/questions?question_id=${questionId}`,
  //       {
  //         method: "DELETE",
  //       },
  //     );
  //     const result = await response.json();
  //     if (result.success) {
  //       showSuccess(
  //         "Question Removed",
  //         "Question removed from topic successfully",
  //       );
  //       const plan = plans.find((p) => {
  //         const hierarchy = planHierarchy[p.id] || [];
  //         return hierarchy.some((c: any) =>
  //           c.categories?.some((cat: any) =>
  //             cat.topics?.some((t: any) => t.id === topicId),
  //           ),
  //         );
  //       });
  //       if (plan) {
  //         await fetchPlanHierarchy(plan.id);
  //       }
  //       queryClient.invalidateQueries();
  //     } else {
  //       showError(
  //         "Failed to Remove",
  //         result.error || "Failed to remove question from topic",
  //       );
  //     }
  //   } catch (error) {
  //     console.error("Error removing question from topic:", error);
  //     showError("Failed to Remove", "Failed to remove question from topic");
  //   }
  // };

  // Remove question from both topic and plan
  const removeQuestionFromPlan = async (
    planId: string,
    topicId: string,
    questionId: string,
  ) => {
    try {
      console.log("🗑️ Removing question from plan:", {
        planId,
        topicId,
        questionId,
      });

      // Remove from topic
      const topicResponse = await fetch(
        `/api/topics/${topicId}/questions?question_id=${questionId}`,
        {
          method: "DELETE",
        },
      );
      const topicResult = await topicResponse.json();
      console.log("📋 Topic removal result:", topicResult);

      // Remove from plan
      const planResponse = await fetch(
        `/api/plans/${planId}/questions?question_id=${questionId}`,
        {
          method: "DELETE",
        },
      );
      const planResult = await planResponse.json();
      console.log("📋 Plan removal result:", planResult);

      if (topicResult.success && planResult.success) {
        showSuccess(
          "Question Removed",
          "Question removed from plan and topic successfully",
        );
        // Force refresh the hierarchy
        await fetchPlanHierarchy(planId);
        // Invalidate all related queries
        queryClient.invalidateQueries({ queryKey: ["plan-hierarchy", planId] });
        queryClient.invalidateQueries({ queryKey: ["plans"] });
        queryClient.invalidateQueries({ queryKey: ["questions"] });
        queryClient.invalidateQueries({ queryKey: ["topics"] });
        console.log("✅ Question removed successfully, hierarchy refreshed");
      } else if (topicResult.success) {
        // If topic removal succeeded but plan removal failed, still show success
        showSuccess(
          "Question Removed",
          "Question removed from topic successfully",
        );
        await fetchPlanHierarchy(planId);
        queryClient.invalidateQueries({ queryKey: ["plan-hierarchy", planId] });
        queryClient.invalidateQueries({ queryKey: ["plans"] });
        console.log("⚠️ Topic removed but plan removal may have failed");
      } else if (planResult.success) {
        // If plan removal succeeded but topic removal failed, still show success
        showSuccess(
          "Question Removed",
          "Question removed from plan successfully",
        );
        await fetchPlanHierarchy(planId);
        queryClient.invalidateQueries({ queryKey: ["plan-hierarchy", planId] });
        queryClient.invalidateQueries({ queryKey: ["plans"] });
        console.log("⚠️ Plan removed but topic removal may have failed");
      } else {
        const errorMsg =
          topicResult.error || planResult.error || "Failed to remove question";
        console.error("❌ Failed to remove question:", {
          topicResult,
          planResult,
        });
        showError("Failed to Remove", errorMsg);
      }
    } catch (error) {
      console.error("❌ Error removing question from plan:", error);
      showError("Failed to Remove", "Failed to remove question from plan");
    }
  };

  // Fetch hierarchy when plan is expanded
  useEffect(() => {
    plans.forEach((plan) => {
      if (expandedPlans.has(plan.id) && !planHierarchy[plan.id]) {
        fetchPlanHierarchy(plan.id);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expandedPlans, plans]);

  const confirmDeleteCard = async () => {
    if (!cardToDelete) return;

    try {
      await deleteCardMutation.mutateAsync(cardToDelete.id);
      await notifyContentUpdate("Learning Card", "deleted");
      showSuccess(
        "Card Deleted Successfully",
        `"${cardToDelete.title}" has been deleted successfully.`,
      );
      setIsDeleteCardModalOpen(false);
      setCardToDelete(null);
    } catch (error) {
      console.error("Failed to delete card:", error);
      showError(
        "Failed to Delete Card",
        "There was an error deleting the card. Please try again.",
      );
    }
  };

  const confirmDeletePlan = async () => {
    if (!planToDelete) return;

    try {
      await deletePlanMutation.mutateAsync(planToDelete.id);
      await notifyContentUpdate("Learning Plan", "deleted");
      showSuccess(
        "Plan Deleted Successfully",
        `"${planToDelete.title}" has been deleted successfully.`,
      );
      setIsDeletePlanModalOpen(false);
      setPlanToDelete(null);
    } catch (error) {
      console.error("Failed to delete plan:", error);
      showError(
        "Failed to Delete Plan",
        "There was an error deleting the plan. Please try again.",
      );
    }
  };

  const handleCreateCategory = async (categoryData: Partial<Category>) => {
    try {
      await createCategoryMutation.mutateAsync(categoryData);
    } catch (error) {
      console.error("Failed to create category:", error);
    }
  };

  const handleUpdateCategory = async (
    categoryId: string,
    categoryData: Partial<Category>,
  ) => {
    try {
      await updateCategoryMutation.mutateAsync({
        id: categoryId,
        data: categoryData,
      });
    } catch (error) {
      console.error("Failed to update category:", error);
    }
  };

  const handleDeleteCategory = async (categoryId: string) => {
    try {
      await deleteCategoryMutation.mutateAsync(categoryId);
    } catch (error) {
      console.error("Failed to delete category:", error);
    }
  };

  const handleCreateTopic = async (topicData: Partial<Topic>) => {
    try {
      await createTopicMutation.mutateAsync(topicData);
    } catch (error) {
      console.error("Failed to create topic:", error);
    }
  };

  const handleBulkCreateTopics = async (topicsData: any[]) => {
    try {
      let successCount = 0;
      let failedCount = 0;
      const errors: string[] = [];

      for (let i = 0; i < topicsData.length; i++) {
        const topicData = topicsData[i];
        try {
          await createTopicMutation.mutateAsync(topicData);
          successCount++;
        } catch (error) {
          failedCount++;
          const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
          errors.push(
            `Topic ${i + 1} (${topicData.name || "unnamed"}): ${errorMessage}`,
          );
          console.error(`Failed to create topic ${i + 1}:`, error);
        }
      }

      if (successCount > 0) {
        showSuccess(
          "Topics Created",
          `Successfully created ${successCount} topic${successCount !== 1 ? "s" : ""}${failedCount > 0 ? `, ${failedCount} failed` : ""}`,
        );
      }

      if (failedCount > 0 && errors.length > 0) {
        console.error("Bulk topic creation errors:", errors);
        showError(
          "Some Topics Failed",
          `${failedCount} topic${failedCount !== 1 ? "s" : ""} failed to create. Check console for details.`,
        );
      }

      // Close modal after bulk creation
      if (successCount > 0) {
        setIsTopicModalOpen(false);
      }
    } catch (error) {
      console.error("Error in bulk topic creation:", error);
      showError(
        "Bulk Creation Failed",
        "Failed to create topics. Please try again.",
      );
    }
  };

  const handleUpdateTopic = async (
    topicId: string,
    topicData: Partial<Topic>,
  ) => {
    try {
      await updateTopicMutation.mutateAsync({ id: topicId, data: topicData });
    } catch (error) {
      console.error("Failed to update topic:", error);
    }
  };

  const handleDeleteTopic = async (topicId: string) => {
    try {
      await deleteTopicMutation.mutateAsync(topicId);
    } catch (error) {
      console.error("Failed to delete topic:", error);
    }
  };

  const handleCreateQuestion = async (
    questionData: Partial<UnifiedQuestion>,
  ) => {
    try {
      await createQuestionMutation.mutateAsync(questionData);
    } catch (error) {
      console.error("Failed to create question:", error);
    }
  };

  const handleUpdateQuestion = async (
    question_id: string,
    questionData: Partial<UnifiedQuestion>,
  ) => {
    try {
      await updateQuestionMutation.mutateAsync({
        id: question_id,
        data: questionData,
      });
    } catch (error) {
      console.error("Failed to update question:", error);
    }
  };

  const handleDeleteQuestion = async (question_id: string) => {
    try {
      await deleteQuestionMutation.mutateAsync(question_id);
    } catch (error) {
      console.error("Failed to delete question:", error);
    }
  };

  // Debounced search to improve performance
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Memoized filtered data to prevent unnecessary recalculations
  const filteredCards = useMemo(() => {
    return cards.filter((card) => {
      // Add null checks to prevent runtime errors
      if (!card || !card.title || !card.description) {
        return false;
      }

      const matchesSearch =
        card.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        card.description
          .toLowerCase()
          .includes(debouncedSearchTerm.toLowerCase());
      const matchesCardType =
        filterCardType === "all" || card.title === filterCardType;
      return matchesSearch && matchesCardType;
    });
  }, [cards, debouncedSearchTerm, filterCardType]);

  const filteredPlans = useMemo(() => {
    return plans.filter((plan) => {
      // Add null checks to prevent runtime errors
      if (!plan || !plan.name || !plan.description) {
        return false;
      }

      return (
        plan.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        plan.description
          .toLowerCase()
          .includes(debouncedSearchTerm.toLowerCase())
      );
    });
  }, [plans, debouncedSearchTerm]);

  // Helper functions for UI interactions
  const toggleCard = useCallback((card_id: string) => {
    setExpandedCards((prev) => {
      const newExpanded = new Set(prev);
      if (newExpanded.has(card_id)) {
        newExpanded.delete(card_id);
      } else {
        newExpanded.add(card_id);
      }
      return newExpanded;
    });
  }, []);

  const toggleCategory = useCallback((categoryId: string) => {
    setExpandedCategories((prev) => {
      const newExpanded = new Set(prev);
      if (newExpanded.has(categoryId)) {
        newExpanded.delete(categoryId);
      } else {
        newExpanded.add(categoryId);
      }
      return newExpanded;
    });
  }, []);

  const toggleTopic = useCallback((topicId: string) => {
    setExpandedTopics((prev) => {
      const newExpanded = new Set(prev);
      if (newExpanded.has(topicId)) {
        newExpanded.delete(topicId);
      } else {
        newExpanded.add(topicId);
      }
      return newExpanded;
    });
  }, []);

  const togglePlan = useCallback((plan_id: string) => {
    setExpandedPlans((prev) => {
      const newExpanded = new Set(prev);
      if (newExpanded.has(plan_id)) {
        newExpanded.delete(plan_id);
      } else {
        newExpanded.add(plan_id);
      }
      return newExpanded;
    });
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading unified admin data...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error handling
  if (
    cardsError ||
    plansError ||
    categoriesError ||
    topicsError ||
    questionsError
  ) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Error Loading Data
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              There was an error loading the admin data. Please try refreshing
              the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Refresh Page
            </button>
            <div className="mt-4 text-sm text-gray-500">
              {cardsError && <p>Cards Error: {cardsError.message}</p>}
              {plansError && <p>Plans Error: {plansError.message}</p>}
              {categoriesError && (
                <p>Categories Error: {categoriesError.message}</p>
              )}
              {topicsError && <p>Topics Error: {topicsError.message}</p>}
              {questionsError && (
                <p>Questions Error: {questionsError.message}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <ContentManagementTemplate
        stats={stats}
        searchAndFilters={{
          searchTerm,
          onSearchChange: setSearchTerm,
          filterCardType,
          onFilterChange: setFilterCardType,
        }}
        actionButtons={[
          {
            label: "Add Card",
            onClick: () => {
              setEditingCard(null);
              setIsCardModalOpen(true);
            },
            className: "bg-blue-600 hover:bg-blue-700",
            icon: Plus,
          },
          {
            label: "Add Plan",
            onClick: () => {
              setEditingPlan(null);
              setIsPlanModalOpen(true);
            },
            className: "bg-green-600 hover:bg-green-700",
            icon: Plus,
          },
          {
            label: "Add Category",
            onClick: () => {
              setEditingCategory(null);
              setIsCategoryModalOpen(true);
            },
            className: "bg-purple-600 hover:bg-purple-700",
            icon: Plus,
          },
          {
            label: "Add Topic",
            onClick: () => {
              setEditingTopic(null);
              setIsTopicModalOpen(true);
            },
            className: "bg-orange-600 hover:bg-orange-700",
            icon: Plus,
          },
        ]}
        categoriesList={{
          categories,
          filteredCategories,
          isLoading: categoriesLoading,
          searchTerm: categorySearch,
          onSearchChange: setCategorySearch,
          isOpen: isCategoriesOpen,
          onOpenChange: setIsCategoriesOpen,
          onAdd: () => {
            setEditingCategory(null);
            setIsCategoryModalOpen(true);
          },
          onEdit: (category) => {
            setEditingCategory(category);
            setIsCategoryModalOpen(true);
          },
          onDelete: (category) => handleDeleteCategory(category.id),
        }}
        topicsList={{
          topics,
          filteredTopics,
          categories,
          isLoading: topicsLoading,
          searchTerm: topicSearch,
          onSearchChange: setTopicSearch,
          selectedCategoryFilter,
          onCategoryFilterChange: setSelectedCategoryFilter,
          isOpen: isTopicsOpen,
          onOpenChange: setIsTopicsOpen,
          onAdd: () => {
            setEditingTopic(null);
            setIsTopicModalOpen(true);
          },
          onEdit: (topic) => {
            setEditingTopic(topic);
            setIsTopicModalOpen(true);
          },
          onDelete: (topic) => handleDeleteTopic(topic.id),
        }}
        cardsList={{
          cards: filteredCards,
          categories,
          topics,
          questionsByTopic,
          expandedCards,
          expandedCategories,
          expandedTopics,
          onToggleCard: toggleCard,
          onToggleCategory: toggleCategory,
          onToggleTopic: toggleTopic,
          onEditCard: (card) => {
            setEditingCard(card as LearningCard);
            setIsCardModalOpen(true);
          },
          onDeleteCard: handleDeleteCard,
          onEditCategory: (category) => {
            setEditingCategory(category);
            setIsCategoryModalOpen(true);
          },
          onDeleteCategory: (categoryId) => handleDeleteCategory(categoryId),
          onEditTopic: (topic) => {
            setEditingTopic(topic);
            setIsTopicModalOpen(true);
          },
          onDeleteTopic: (topicId) => handleDeleteTopic(topicId),
          onEditQuestion: (question) => {
            setEditingQuestion(question as UnifiedQuestion);
            setIsQuestionModalOpen(true);
          },
          onDeleteQuestion: (questionId) => handleDeleteQuestion(questionId),
          onAddQuestion: () => {
            setEditingQuestion(null);
            setIsQuestionModalOpen(true);
          },
          totalCards: stats.totalCards,
          isDeletingCard: deleteCardMutation?.isPending,
          isDeletingCategory: deleteCategoryMutation?.isPending,
          isDeletingTopic: deleteTopicMutation?.isPending,
          isDeletingQuestion: deleteQuestionMutation?.isPending,
        }}
        plansList={{
          plans: filteredPlans,
          planHierarchy,
          loadingPlanHierarchy,
          expandedPlans,
          expandedPlanCards,
          expandedPlanCategories,
          expandedPlanTopics,
          onTogglePlan: togglePlan,
          onTogglePlanCard: togglePlanCard,
          onTogglePlanCategory: togglePlanCategory,
          onTogglePlanTopic: togglePlanTopic,
          onEditPlan: (plan) => {
            setEditingPlan(plan);
            setIsPlanModalOpen(true);
          },
          onDeletePlan: handleDeletePlan,
          onAddCardToPlan: (planId) =>
            setAddItemContext({ planId, type: "card" }),
          onAddCategoryToCard: (planId, cardId) =>
            setAddItemContext({ planId, type: "category", parentId: cardId }),
          onAddTopicToCategory: (planId, categoryId) =>
            setAddItemContext({ planId, type: "topic", parentId: categoryId }),
          onAddQuestionToTopic: (planId, topicId) =>
            setAddItemContext({ planId, type: "question", parentId: topicId }),
          onRemoveCardFromPlan: removeCardFromPlan,
          onRemoveCategoryFromCard: removeCategoryFromCard,
          onRemoveTopicFromCategory: removeTopicFromCategory,
          onRemoveQuestionFromPlan: removeQuestionFromPlan,
          totalPlans: stats.totalPlans,
          isDeletingPlan: deletePlanMutation?.isPending,
        }}
      />

      {/* Modals */}
      <Modal
        isOpen={isCardModalOpen}
        onClose={() => {
          setIsCardModalOpen(false);
          setEditingCard(null);
        }}
        title={editingCard ? "Edit Card" : "Create New Card"}
      >
        <CardForm
          card={editingCard}
          onSubmit={handleCardFormSubmit}
          onCancel={() => {
            setIsCardModalOpen(false);
            setEditingCard(null);
          }}
          isLoading={
            createCardMutation.isPending || updateCardMutation.isPending
          }
        />
      </Modal>

      <Modal
        isOpen={isPlanModalOpen}
        onClose={() => {
          setIsPlanModalOpen(false);
          setEditingPlan(null);
        }}
        title={editingPlan ? "Edit Plan" : "Create New Plan"}
      >
        <PlanForm
          plan={editingPlan}
          onSubmit={handlePlanFormSubmit}
          onCancel={() => {
            setIsPlanModalOpen(false);
            setEditingPlan(null);
          }}
          isLoading={
            createPlanMutation.isPending || updatePlanMutation.isPending
          }
        />
      </Modal>

      <Modal
        isOpen={isCategoryModalOpen}
        onClose={() => {
          setIsCategoryModalOpen(false);
          setEditingCategory(null);
        }}
        title={editingCategory ? "Edit Category" : "Create New Category"}
      >
        <CategoryForm
          category={editingCategory}
          onSubmit={handleCategoryFormSubmit}
          onCancel={() => {
            setIsCategoryModalOpen(false);
            setEditingCategory(null);
          }}
          isLoading={
            createCategoryMutation.isPending || updateCategoryMutation.isPending
          }
        />
      </Modal>

      <Modal
        isOpen={isTopicModalOpen}
        onClose={() => {
          setIsTopicModalOpen(false);
          setEditingTopic(null);
        }}
        title={editingTopic ? "Edit Topic" : "Create New Topic"}
      >
        <TopicForm
          topic={editingTopic}
          categories={categories}
          onSubmit={handleTopicFormSubmit}
          onCancel={() => {
            setIsTopicModalOpen(false);
            setEditingTopic(null);
          }}
          isLoading={
            createTopicMutation.isPending || updateTopicMutation.isPending
          }
        />
      </Modal>

      <Modal
        isOpen={isQuestionModalOpen}
        onClose={() => {
          setIsQuestionModalOpen(false);
          setEditingQuestion(null);
        }}
        title={editingQuestion ? "Edit Question" : "Create New Question"}
      >
        <QuestionForm
          question={editingQuestion as any}
          topics={topics}
          categories={categories}
          onSubmit={handleQuestionFormSubmit}
          onCancel={() => {
            setIsQuestionModalOpen(false);
            setEditingQuestion(null);
          }}
          isLoading={
            createQuestionMutation.isPending || updateQuestionMutation.isPending
          }
        />
      </Modal>

      {/* Confirmation Modals */}
      <ConfirmDeleteDialog
        isOpen={isDeleteCardModalOpen}
        onClose={() => {
          setIsDeleteCardModalOpen(false);
          setCardToDelete(null);
        }}
        onConfirm={confirmDeleteCard}
        title="Delete Card"
        itemName={cardToDelete?.title || ""}
        itemType="card"
        isLoading={deleteCardMutation.isPending}
      />

      <ConfirmDeleteDialog
        isOpen={isDeletePlanModalOpen}
        onClose={() => {
          setIsDeletePlanModalOpen(false);
          setPlanToDelete(null);
        }}
        onConfirm={confirmDeletePlan}
        title="Delete Plan"
        itemName={planToDelete?.name || planToDelete?.title || ""}
        itemType="plan"
        isLoading={deletePlanMutation.isPending}
      />

      {/* Add Items Modal - Step by Step Selection */}
      <Modal
        isOpen={!!addItemContext}
        onClose={() => {
          setAddItemContext(null);
          // Reset selection state
          setSelectedQuestionIds(new Set());
        }}
        title={
          addItemContext?.type === "card"
            ? `Step 1: Select Card`
            : addItemContext?.type === "category"
              ? `Step 2: Select Category from Card`
              : addItemContext?.type === "topic"
                ? `Step 3: Select Topic from Category`
                : `Step 4: Select Question from Topic`
        }
        size="xl"
      >
        <div className="space-y-4">
          {/* Step 1: Select Card */}
          {addItemContext?.type === "card" && (
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
                            await addCardToPlan(addItemContext.planId, card.id);
                            await fetchPlanHierarchy(addItemContext.planId);
                            setAddItemContext(null);
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
          {addItemContext?.type === "category" && addItemContext.parentId && (
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
                  .filter((cat) => {
                    // Filter categories that belong to this card (via card_categories or direct learning_card_id)
                    return (
                      cat.learning_card_id === addItemContext.parentId ||
                      (cat as any).card_id === addItemContext.parentId
                    );
                  })
                  .map((category) => {
                    const hierarchy =
                      planHierarchy[addItemContext.planId] || [];
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
                              await addCategoryToCard(
                                addItemContext.parentId!,
                                category.id,
                              );
                              await fetchPlanHierarchy(addItemContext.planId);
                              setAddItemContext(null);
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
          {addItemContext?.type === "topic" && addItemContext.parentId && (
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
                    const hierarchy =
                      planHierarchy[addItemContext.planId] || [];
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
                              await addTopicToCategory(
                                addItemContext.parentId!,
                                topic.id,
                              );
                              await fetchPlanHierarchy(addItemContext.planId);
                              setAddItemContext(null);
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
          {addItemContext?.type === "question" && addItemContext.parentId && (
            <div>
              <div className="mb-3 p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Selected Topic:{" "}
                  <span className="font-medium">
                    {topics.find((t) => t.id === addItemContext.parentId)
                      ?.name ||
                      topics.find((t) => t.id === addItemContext.parentId)
                        ?.title}
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
                      // Add all selected questions
                      const addPromises = Array.from(selectedQuestionIds).map(
                        (questionId) =>
                          addQuestionToTopic(
                            addItemContext.parentId!,
                            questionId,
                          ),
                      );
                      await Promise.all(addPromises);
                      await fetchPlanHierarchy(addItemContext.planId);
                      setSelectedQuestionIds(new Set());
                      setAddItemContext(null);
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
                    const hierarchy =
                      planHierarchy[addItemContext.planId] || [];
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
                          {/* Checkbox for multi-select */}
                          <button
                            onClick={() => {
                              if (isInTopic) return; // Don't allow selection if already in topic
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
                            className={`flex-shrink-0 ${isInTopic ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
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
                          {/* View button */}
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={async () => {
                              // Fetch full question data including code field
                              try {
                                const response = await fetch(
                                  `/api/questions/unified/${question.id}`,
                                );
                                if (response.ok) {
                                  const result = await response.json();
                                  if (result.success && result.data) {
                                    // Process code field to ensure newlines are preserved
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
                                    setViewingQuestion(fullQuestion);
                                    setIsViewQuestionModalOpen(true);
                                  } else {
                                    // Fallback to question from list
                                    setViewingQuestion(question);
                                    setIsViewQuestionModalOpen(true);
                                  }
                                } else {
                                  // Fallback to question from list
                                  setViewingQuestion(question);
                                  setIsViewQuestionModalOpen(true);
                                }
                              } catch (error) {
                                console.error(
                                  "Error fetching question:",
                                  error,
                                );
                                // Fallback to question from list
                                setViewingQuestion(question);
                                setIsViewQuestionModalOpen(true);
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
                                await addQuestionToTopic(
                                  addItemContext.parentId!,
                                  question.id,
                                );
                                await fetchPlanHierarchy(addItemContext.planId);
                                setSelectedQuestionIds(new Set());
                                setAddItemContext(null);
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

      {/* View Question Modal */}
      <ViewQuestionModal
        isOpen={isViewQuestionModalOpen}
        onClose={() => {
          setIsViewQuestionModalOpen(false);
          setViewingQuestion(null);
        }}
        question={viewingQuestion}
        cards={cardsData?.data || []}
        allCategories={categories.map((c) => c.name || c.title).filter(Boolean)}
        categoriesData={categories}
        topicsData={topics}
      />

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </>
  );
}
