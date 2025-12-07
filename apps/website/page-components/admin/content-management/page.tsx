"use client";

import React, {
  useEffect,
  useMemo,
  useState,
  useCallback,
  Suspense,
} from "react";
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
import { useToast, ToastContainer } from "@elzatona/components";

// Define types for other entities (these should be moved to proper type files)
interface LearningPlan {
  id: string;
  name: string;
  description?: string;
  duration?: string;
  difficulty?: string;
  color?: string;
  estimatedHours?: number;
  [key: string]: unknown;
}

interface Category {
  id: string;
  name: string;
  description?: string;
  card_id?: string;
  [key: string]: unknown;
}

interface Topic {
  id: string;
  name: string;
  description?: string;
  category_id?: string;
  [key: string]: unknown;
}

// Lazy load UI components to improve initial bundle size
const Button = React.lazy(() =>
  import("@elzatona/components").then((module) => ({
    default: module.Button,
  })),
);
const Input = React.lazy(() =>
  import("@elzatona/components").then((module) => ({
    default: module.Input,
  })),
);
const Badge = React.lazy(() =>
  import("@elzatona/components").then((module) => ({
    default: module.Badge,
  })),
);
const Card = React.lazy(() =>
  import("@elzatona/components").then((module) => ({
    default: module.Card,
  })),
);
const CardContent = React.lazy(() =>
  import("@elzatona/components").then((module) => ({
    default: module.CardContent,
  })),
);
const CardHeader = React.lazy(() =>
  import("@elzatona/components").then((module) => ({
    default: module.CardHeader,
  })),
);
const CardTitle = React.lazy(() =>
  import("@elzatona/components").then((module) => ({
    default: module.CardTitle,
  })),
);
const Select = React.lazy(() =>
  import("@elzatona/components").then((module) => ({
    default: module.Select,
  })),
);
const SelectContent = React.lazy(() =>
  import("@elzatona/components").then((module) => ({
    default: module.SelectContent,
  })),
);
const SelectItem = React.lazy(() =>
  import("@elzatona/components").then((module) => ({
    default: module.SelectItem,
  })),
);
const SelectTrigger = React.lazy(() =>
  import("@elzatona/components").then((module) => ({
    default: module.SelectTrigger,
  })),
);
const SelectValue = React.lazy(() =>
  import("@elzatona/components").then((module) => ({
    default: module.SelectValue,
  })),
);
const Collapsible = React.lazy(() =>
  import("@elzatona/components").then((module) => ({
    default: module.Collapsible,
  })),
);
const CollapsibleTrigger = React.lazy(() =>
  import("@elzatona/components").then((module) => ({
    default: module.CollapsibleTrigger,
  })),
);
const CollapsibleContent = React.lazy(() =>
  import("@elzatona/components").then((module) => ({
    default: module.CollapsibleContent,
  })),
);
import { Modal } from "@elzatona/components";
import { ViewQuestionModal } from "../content/questions/components/ViewQuestionModal";
import { StatsSection } from "./components/StatsSection";
import { CategoriesList } from "./components/CategoriesList";
import { TopicsList } from "./components/TopicsList";
import { SearchAndFilters } from "./components/SearchAndFilters";
import { ActionButtons } from "./components/ActionButtons";

// Import icons with tree shaking
import {
  ChevronDown,
  ChevronRight,
  Plus,
  Edit,
  Trash2,
  MessageSquare,
  BookOpen,
  Layers,
  Puzzle,
  Network,
  Users,
  Calendar,
  Target,
  Search,
  X,
  Eye,
  CheckSquare,
  Square,
} from "lucide-react";

// Lazy load forms to reduce initial bundle size
const CategoryForm = React.lazy(() =>
  import("@elzatona/components").then((module) => ({
    default: module.CategoryForm,
  })),
);
const TopicForm = React.lazy(() =>
  import("@elzatona/components").then((module) => ({
    default: module.TopicForm,
  })),
);
const QuestionForm = React.lazy(() =>
  import("@elzatona/components").then((module) => ({
    default: module.QuestionForm,
  })),
);
const CardForm = React.lazy(() =>
  import("@elzatona/components").then((module) => ({
    default: module.CardForm,
  })),
);
const PlanForm = React.lazy(() =>
  import("@elzatona/components").then((module) => ({
    default: module.PlanForm,
  })),
);
const EmptyState = React.lazy(() =>
  import("@elzatona/components").then((module) => ({
    default: module.EmptyState,
  })),
);

// Stats interface - kept for potential future use
// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Stats {
  totalCards: number;
  totalPlans: number;
  totalCategories: number;
  totalTopics: number;
  totalQuestions: number;
}

// Memoized constants to prevent recreation on each render
const CARD_ICONS = {
  "Core Technologies": { icon: BookOpen, color: "#3B82F6" },
  "Framework Questions": { icon: Layers, color: "#10B981" },
  "Problem Solving": { icon: Puzzle, color: "#F59E0B" },
  "System Design": { icon: Network, color: "#EF4444" },
} as const;

// Loading skeleton component for better UX
const LoadingSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
  </div>
);

// Memoized stats card component
const StatsCard = React.memo(
  ({
    icon: Icon,
    label,
    value,
    color,
  }: {
    icon: React.ComponentType<{
      className?: string;
      style?: React.CSSProperties;
    }>;
    label: string;
    value: number;
    color: string;
  }) => (
    <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-center">
          <Icon className="h-8 w-8 mr-3" style={{ color }} />
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
              {label}
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {value}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  ),
);

StatsCard.displayName = "StatsCard";

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

  // Extract data from query results - these are stable references from React Query
  const cards = useMemo(() => cardsData?.data || [], [cardsData?.data]);
  const plans = useMemo(() => plansData?.data || [], [plansData?.data]);
  const categories = useMemo(
    () => categoriesData?.data || [],
    [categoriesData?.data],
  );
  const topics = useMemo(() => topicsData?.data || [], [topicsData?.data]);
  const questions = questionsData?.data || [];

  // Force fresh data on mount
  useEffect(() => {
    console.log("🔄 Force refreshing all queries on mount...");
    queryClient.invalidateQueries({ queryKey: ["cards"] });
    queryClient.invalidateQueries({ queryKey: ["plans"] });
    queryClient.invalidateQueries({ queryKey: ["categories"] });
    queryClient.invalidateQueries({ queryKey: ["topics"] });
    queryClient.invalidateQueries({ queryKey: ["questionsUnified"] });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
  // Unused delete modal states - kept for potential future use
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isDeleteCategoryModalOpen, setIsDeleteCategoryModalOpen] =
    useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isDeleteTopicModalOpen, setIsDeleteTopicModalOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isDeleteQuestionModalOpen, setIsDeleteQuestionModalOpen] =
    useState(false);

  // Item to delete states
  const [cardToDelete, setCardToDelete] = useState<LearningCard | null>(null);
  const [planToDelete, setPlanToDelete] = useState<LearningPlan | null>(null);
  // Unused delete states - kept for potential future use
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(
    null,
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [topicToDelete, setTopicToDelete] = useState<Topic | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [questionToDelete, setQuestionToDelete] =
    useState<UnifiedQuestion | null>(null);

  const [editingCard, setEditingCard] = useState<LearningCard | null>(null);
  const [editingPlan, setEditingPlan] = useState<LearningPlan | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editingTopic, setEditingTopic] = useState<Topic | null>(null);
  const [editingQuestion, setEditingQuestion] =
    useState<UnifiedQuestion | null>(null);

  // Questions state
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [questionsByTopic, setQuestionsByTopic] = useState<
    Record<
      string,
      { id: string; title: string; difficulty: string; type: string }[]
    >
  >({});

  // Search and filter state for categories and topics
  const [categorySearch, setCategorySearch] = useState("");
  const [topicSearch, setTopicSearch] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<
    string | null
  >(null);

  // Collapsible state for categories and topics (closed by default)
  // Independent states so they can be opened/closed separately
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isTopicsOpen, setIsTopicsOpen] = useState(false);

  // Plan hierarchy state - array of cards with nested structure
  type PlanHierarchyCard = {
    id: string;
    name?: string;
    title?: string;
    categories?: Array<{
      id: string;
      name?: string;
      title?: string;
      topics?: Array<{
        id: string;
        name?: string;
        title?: string;
        totalQuestionCount?: number;
        planQuestionCount?: number;
        questions?: Array<{ id: string; title?: string }>;
      }>;
    }>;
    [key: string]: unknown;
  };
  const [planHierarchy, setPlanHierarchy] = useState<
    Record<string, PlanHierarchyCard[]>
  >({});
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

  // Step-by-step selection state - kept for potential future use
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectionStep, setSelectionStep] = useState<
    "card" | "category" | "topic" | "question"
  >("card");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null,
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);

  // Question view and selection state
  const [viewingQuestion, setViewingQuestion] =
    useState<UnifiedQuestion | null>(null);
  const [isViewQuestionModalOpen, setIsViewQuestionModalOpen] = useState(false);
  const [selectedQuestionIds, setSelectedQuestionIds] = useState<Set<string>>(
    new Set(),
  );

  // Loading state for adding questions
  const [addingQuestionToTopic, setAddingQuestionToTopic] = useState<
    Record<string, boolean>
  >({});

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

  // Form submission wrappers - forms use their own data types
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleCardFormSubmit = (data: any) => {
    if (editingCard?.id) {
      handleUpdateCard(editingCard.id, data);
    } else {
      handleCreateCard(data);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlePlanFormSubmit = (data: any) => {
    if (editingPlan?.id) {
      handleUpdatePlan(editingPlan.id, data);
    } else {
      handleCreatePlan(data);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleCategoryFormSubmit = async (data: any) => {
    if (editingCategory?.id) {
      await handleUpdateCategory(editingCategory.id, data);
    } else {
      await handleCreateCategory(data);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
          const hierarchy: PlanHierarchyCard[] = planHierarchy[p.id] || [];
          return hierarchy.some((c) => c.id === cardId);
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
          const hierarchy: PlanHierarchyCard[] = planHierarchy[p.id] || [];
          return hierarchy.some((c) =>
            c.categories?.some((cat) => cat.id === categoryId),
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

  const addQuestionToTopic = async (
    topicId: string,
    questionId: string,
    planId?: string,
  ) => {
    const loadingKey = `${topicId}-${questionId}`;
    try {
      setAddingQuestionToTopic((prev) => ({ ...prev, [loadingKey]: true }));

      // Step 1: Add question to topic
      const topicResponse = await fetch(`/api/topics/${topicId}/questions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question_id: questionId }),
      });
      const topicResult = await topicResponse.json();

      if (!topicResult.success) {
        throw new Error(topicResult.error || "Failed to add question to topic");
      }

      // Step 2: If planId is provided, also add question to plan
      if (planId) {
        const planResponse = await fetch(`/api/plans/${planId}/questions`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            question_id: questionId,
            topic_id: topicId,
          }),
        });
        const planResult = await planResponse.json();

        if (
          !planResult.success &&
          planResult.error !== "Question is already in this plan"
        ) {
          console.warn(
            "Question added to topic but failed to add to plan:",
            planResult.error,
          );
          // Don't throw - question is still added to topic
        }
      }

      showSuccess(
        "Question Added",
        "Question added to topic and plan successfully",
      );

      // Find which plan contains this topic and refresh
      const plan = planId
        ? plans.find((p) => p.id === planId)
        : plans.find((p) => {
            const hierarchy: PlanHierarchyCard[] = planHierarchy[p.id] || [];
            return hierarchy.some((c) =>
              c.categories?.some((cat) =>
                cat.topics?.some((t) => t.id === topicId),
              ),
            );
          });

      if (plan) {
        await fetchPlanHierarchy(plan.id);
      }
      queryClient.invalidateQueries();
    } catch (error) {
      console.error("Error adding question to topic:", error);
      showError(
        "Failed to Add",
        error instanceof Error
          ? error.message
          : "Failed to add question to topic",
      );
    } finally {
      setAddingQuestionToTopic((prev) => {
        const newState = { ...prev };
        delete newState[loadingKey];
        return newState;
      });
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
          return hierarchy.some((c: { id?: string }) => c.id === cardId);
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
          const hierarchy: PlanHierarchyCard[] = planHierarchy[p.id] || [];
          return hierarchy.some((c) =>
            c.categories?.some((cat) => cat.id === categoryId),
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const removeQuestionFromTopic = async (
    topicId: string,
    questionId: string,
  ) => {
    try {
      const response = await fetch(
        `/api/topics/${topicId}/questions?question_id=${questionId}`,
        {
          method: "DELETE",
        },
      );
      const result = await response.json();
      if (result.success) {
        showSuccess(
          "Question Removed",
          "Question removed from topic successfully",
        );
        const plan = plans.find((p) => {
          const hierarchy: PlanHierarchyCard[] = planHierarchy[p.id] || [];
          return hierarchy.some((c) =>
            c.categories?.some((cat) =>
              cat.topics?.some((t) => t.id === topicId),
            ),
          );
        });
        if (plan) {
          await fetchPlanHierarchy(plan.id);
        }
        queryClient.invalidateQueries();
      } else {
        showError(
          "Failed to Remove",
          result.error || "Failed to remove question from topic",
        );
      }
    } catch (error) {
      console.error("Error removing question from topic:", error);
      showError("Failed to Remove", "Failed to remove question from topic");
    }
  };

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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    <div className="container mx-auto p-6">
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

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <StatsCard
          icon={Layers}
          label="Cards"
          value={stats.totalCards}
          color="#3B82F6"
        />
        <StatsCard
          icon={Users}
          label="Plans"
          value={stats.totalPlans}
          color="#10B981"
        />
        <StatsCard
          icon={BookOpen}
          label="Categories"
          value={stats.totalCategories}
          color="#8B5CF6"
        />
        <StatsCard
          icon={Target}
          label="Topics"
          value={stats.totalTopics}
          color="#F59E0B"
        />
        <StatsCard
          icon={MessageSquare}
          label="Questions"
          value={stats.totalQuestions}
          color="#EF4444"
        />
      </div>

      {/* Topics and Categories Lists */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Categories List */}
        <Suspense fallback={<LoadingSkeleton />}>
          <Card className="bg-white dark:bg-gray-800 border-2 border-purple-200 dark:border-purple-800 shadow-lg">
            <Collapsible
              open={isCategoriesOpen}
              onOpenChange={setIsCategoriesOpen}
            >
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors border-b border-purple-100 dark:border-purple-800">
                  <CardTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                    {isCategoriesOpen ? (
                      <ChevronDown className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    )}
                    <BookOpen className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    Categories ({categories.length})
                  </CardTitle>
                </CardHeader>
              </CollapsibleTrigger>
              {isCategoriesOpen && (
                <CollapsibleContent
                  className="data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up"
                  onClick={(e) => e.stopPropagation()}
                >
                  <CardContent
                    className="pt-4 bg-purple-50/30 dark:bg-gray-800"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Search and Add button */}
                    <div className="mb-4 space-y-3">
                      {/* Search Input */}
                      <div
                        className="relative"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
                        <Input
                          placeholder="Search categories..."
                          value={categorySearch}
                          onChange={(e) => setCategorySearch(e.target.value)}
                          className="pl-10 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                        />
                        {categorySearch && (
                          <button
                            onClick={() => setCategorySearch("")}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        )}
                      </div>

                      {/* Add button */}
                      <div className="flex justify-end">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingCategory(null);
                            setIsCategoryModalOpen(true);
                          }}
                          className="bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/40 border-purple-200 dark:border-purple-700"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Category
                        </Button>
                      </div>
                    </div>

                    {categoriesLoading ? (
                      <div className="text-center py-4">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600 mx-auto"></div>
                      </div>
                    ) : filteredCategories.length === 0 ? (
                      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                        <BookOpen className="h-12 w-12 mx-auto mb-2 opacity-50" />
                        <p>
                          {categorySearch
                            ? "No categories found"
                            : "No categories yet"}
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2 max-h-96 overflow-y-auto">
                        {filteredCategories.map((category) => (
                          <div
                            key={category.id}
                            className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                          >
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-gray-900 dark:text-gray-100 truncate">
                                {category.name || "Unnamed Category"}
                              </p>
                              {category.description && (
                                <p className="text-sm text-gray-500 dark:text-gray-400 truncate mt-1">
                                  {category.description}
                                </p>
                              )}
                            </div>
                            <div className="flex items-center gap-2 ml-4">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setEditingCategory(category);
                                  setIsCategoryModalOpen(true);
                                }}
                                className="h-8 w-8 p-0"
                                title="Edit category"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteCategory(category);
                                }}
                                className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                                title="Delete category"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </CollapsibleContent>
              )}
            </Collapsible>
          </Card>
        </Suspense>

        {/* Topics List */}
        <Suspense fallback={<LoadingSkeleton />}>
          <Card className="bg-white dark:bg-gray-800 border-2 border-orange-200 dark:border-orange-800 shadow-lg">
            <Collapsible open={isTopicsOpen} onOpenChange={setIsTopicsOpen}>
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors border-b border-orange-100 dark:border-orange-800">
                  <CardTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                    {isTopicsOpen ? (
                      <ChevronDown className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                    )}
                    <Target className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                    Topics ({topics.length})
                  </CardTitle>
                </CardHeader>
              </CollapsibleTrigger>
              {isTopicsOpen && (
                <CollapsibleContent
                  className="data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up"
                  onClick={(e) => e.stopPropagation()}
                >
                  <CardContent
                    className="pt-4 bg-orange-50/30 dark:bg-gray-800"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Search and Add button */}
                    <div className="mb-4 space-y-3">
                      {/* Search Input */}
                      <div
                        className="relative"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
                        <Input
                          placeholder="Search topics..."
                          value={topicSearch}
                          onChange={(e) => setTopicSearch(e.target.value)}
                          className="pl-10 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                        />
                        {topicSearch && (
                          <button
                            onClick={() => setTopicSearch("")}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        )}
                      </div>

                      {/* Add button */}
                      <div className="flex justify-end">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingTopic(null);
                            setIsTopicModalOpen(true);
                          }}
                          className="bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-900/40 border-orange-200 dark:border-orange-700"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Topic
                        </Button>
                      </div>
                    </div>

                    {topicsLoading ? (
                      <div className="text-center py-4">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-600 mx-auto"></div>
                      </div>
                    ) : filteredTopics.length === 0 ? (
                      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                        <Target className="h-12 w-12 mx-auto mb-2 opacity-50" />
                        <p>
                          {topicSearch ? "No topics found" : "No topics yet"}
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2 max-h-96 overflow-y-auto">
                        {filteredTopics.map((topic) => (
                          <div
                            key={topic.id}
                            className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                          >
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-gray-900 dark:text-gray-100 truncate">
                                {topic.name || "Unnamed Topic"}
                              </p>
                              {topic.description && (
                                <p className="text-sm text-gray-500 dark:text-gray-400 truncate mt-1">
                                  {topic.description}
                                </p>
                              )}
                              {topic.category_id && (
                                <Badge
                                  variant="secondary"
                                  className="mt-1 text-xs"
                                >
                                  Category:{" "}
                                  {categories.find(
                                    (c) => c.id === topic.category_id,
                                  )?.name || "Unknown"}
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-2 ml-4">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setEditingTopic(topic);
                                  setIsTopicModalOpen(true);
                                }}
                                className="h-8 w-8 p-0"
                                title="Edit topic"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteTopic(topic);
                                }}
                                className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                                title="Delete topic"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </CollapsibleContent>
              )}
            </Collapsible>
          </Card>
        </Suspense>
      </div>

      {/* Search and Filters */}
      <SearchAndFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filterCardType={filterCardType}
        onFilterChange={setFilterCardType}
      />

      {/* Action Buttons */}
      <ActionButtons
        onAddCard={() => {
          setEditingCard(null);
          setIsCardModalOpen(true);
        }}
        onAddPlan={() => {
          setEditingPlan(null);
          setIsPlanModalOpen(true);
        }}
        onAddCategory={() => {
          setEditingCategory(null);
          setIsCategoryModalOpen(true);
        }}
        onAddTopic={() => {
          setEditingTopic(null);
          setIsTopicModalOpen(true);
        }}
      />

      {/* Cards Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
            <Layers className="h-5 w-5 mr-2 text-blue-600" />
            Learning Cards ({stats.totalCards})
          </h2>
        </div>

        <div className="space-y-4">
          {filteredCards.length === 0 ? (
            <Suspense fallback={<LoadingSkeleton />}>
              <EmptyState
                icon={Layers}
                title="No Learning Cards"
                description="Create your first learning card to organize categories and topics for structured learning."
                action={{
                  label: "Create First Card",
                  onClick: () => {
                    setEditingCard(null);
                    setIsCardModalOpen(true);
                  },
                }}
                className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg"
              />
            </Suspense>
          ) : (
            filteredCards.map((card) => {
              const cardCategories = categories.filter(
                (cat) => cat.cardType === card.title,
              );
              const IconComponent =
                CARD_ICONS[card.title as keyof typeof CARD_ICONS]?.icon ||
                Layers;

              return (
                <Card
                  key={card.id}
                  className="border-l-4 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow"
                  style={{ borderLeftColor: card.color }}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => toggleCard(card.id)}
                          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                        >
                          {expandedCards.has(card.id) ? (
                            <ChevronDown className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                          ) : (
                            <ChevronRight className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                          )}
                        </button>
                        <IconComponent
                          className="h-5 w-5"
                          style={{ color: card.color }}
                        />
                        <div>
                          <CardTitle className="text-lg text-gray-900 dark:text-white">
                            {card.title}
                          </CardTitle>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
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
                          onClick={() => {
                            setEditingCard(card);
                            setIsCardModalOpen(true);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteCard(card.id)}
                          disabled={deleteCardMutation?.isPending}
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
                              className="ml-6 border-l-2 border-gray-200 dark:border-gray-700 pl-4"
                            >
                              <div className="flex items-center justify-between py-2">
                                <div className="flex items-center space-x-2">
                                  <button
                                    onClick={() => toggleCategory(category.id)}
                                    className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                                  >
                                    {expandedCategories.has(category.id) ? (
                                      <ChevronDown className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                                    ) : (
                                      <ChevronRight className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                                    )}
                                  </button>
                                  <BookOpen className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                                  <div>
                                    <h4 className="font-medium text-gray-900 dark:text-white">
                                      {category.name}
                                    </h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">
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
                                    onClick={() => {
                                      setEditingCategory(category);
                                      setIsCategoryModalOpen(true);
                                    }}
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                      handleDeleteCategory(category.id)
                                    }
                                    disabled={deleteCategoryMutation?.isPending}
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
                                        className="border-l-2 border-gray-100 dark:border-gray-700 pl-4 py-2"
                                      >
                                        <div className="flex items-center justify-between">
                                          <div className="flex items-center space-x-2">
                                            <button
                                              onClick={() =>
                                                toggleTopic(topic.id)
                                              }
                                              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                                            >
                                              {expandedTopics.has(topic.id) ? (
                                                <ChevronDown className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                                              ) : (
                                                <ChevronRight className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                                              )}
                                            </button>
                                            <Target className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                                            <div>
                                              <h5 className="font-medium text-gray-900 dark:text-white">
                                                {topic.name}
                                              </h5>
                                              <p className="text-sm text-gray-600 dark:text-gray-300">
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
                                              onClick={() => {
                                                setEditingTopic(topic);
                                                setIsTopicModalOpen(true);
                                              }}
                                            >
                                              <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button
                                              variant="ghost"
                                              size="sm"
                                              onClick={() =>
                                                handleDeleteTopic(topic.id)
                                              }
                                              disabled={
                                                deleteTopicMutation?.isPending
                                              }
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
                                                className="flex items-center justify-between py-2 px-3 bg-gray-50 dark:bg-gray-800/50 rounded border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
                                              >
                                                <div className="flex items-center space-x-2">
                                                  <MessageSquare className="h-4 w-4 text-red-600 dark:text-red-400" />
                                                  <div>
                                                    <h6 className="font-medium text-sm text-gray-900 dark:text-white">
                                                      {question.title}
                                                    </h6>
                                                    <p className="text-xs text-gray-600 dark:text-gray-300">
                                                      {question.difficulty} •{" "}
                                                      {question.type}
                                                    </p>
                                                  </div>
                                                </div>
                                                <div className="flex items-center space-x-1">
                                                  <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => {
                                                      setEditingQuestion(
                                                        question as UnifiedQuestion,
                                                      );
                                                      setIsQuestionModalOpen(
                                                        true,
                                                      );
                                                    }}
                                                  >
                                                    <Edit className="h-3 w-3" />
                                                  </Button>
                                                  <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() =>
                                                      handleDeleteQuestion(
                                                        question.id,
                                                      )
                                                    }
                                                    disabled={
                                                      deleteQuestionMutation?.isPending
                                                    }
                                                  >
                                                    <Trash2 className="h-3 w-3" />
                                                  </Button>
                                                </div>
                                              </div>
                                            ))}
                                            <Button
                                              onClick={() => {
                                                setEditingQuestion(null);
                                                setIsQuestionModalOpen(true);
                                              }}
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

      {/* Plans Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
            <Users className="h-5 w-5 mr-2 text-green-600" />
            Learning Plans ({stats.totalPlans})
          </h2>
        </div>

        <div className="space-y-4">
          {filteredPlans.length === 0 ? (
            <Suspense fallback={<LoadingSkeleton />}>
              <EmptyState
                icon={Calendar}
                title="No Learning Plans"
                description="Create your first learning plan to provide structured learning paths for users."
                action={{
                  label: "Create First Plan",
                  onClick: () => {
                    setEditingPlan(null);
                    setIsPlanModalOpen(true);
                  },
                }}
                className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg"
              />
            </Suspense>
          ) : (
            filteredPlans.map((plan) => (
              <Card
                key={plan.id}
                className="border-l-4 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow"
                style={{ borderLeftColor: plan.color }}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => togglePlan(plan.id)}
                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                      >
                        {expandedPlans.has(plan.id) ? (
                          <ChevronDown className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                        ) : (
                          <ChevronRight className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                        )}
                      </button>
                      <Calendar
                        className="h-5 w-5"
                        style={{ color: plan.color }}
                      />
                      <div>
                        <CardTitle className="text-lg text-gray-900 dark:text-white">
                          {plan.name}
                        </CardTitle>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
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
                        onClick={() => {
                          setEditingPlan(plan);
                          setIsPlanModalOpen(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeletePlan(plan.id)}
                        disabled={deletePlanMutation?.isPending}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                {expandedPlans.has(plan.id) && (
                  <CardContent className="pt-0">
                    <div className="space-y-4">
                      <div className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                        <p>
                          <strong className="text-gray-900 dark:text-white">
                            Duration:
                          </strong>{" "}
                          {plan.duration}
                        </p>
                        <p>
                          <strong className="text-gray-900 dark:text-white">
                            Difficulty:
                          </strong>{" "}
                          {plan.difficulty}
                        </p>
                        <p>
                          <strong className="text-gray-900 dark:text-white">
                            Estimated Hours:
                          </strong>{" "}
                          {plan.estimatedHours}
                        </p>
                      </div>

                      {/* Hierarchical Tree: Cards → Categories → Topics → Questions */}
                      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                            Plan Structure
                          </h3>
                          <Suspense fallback={<LoadingSkeleton />}>
                            <Button
                              onClick={() =>
                                setAddItemContext({
                                  planId: plan.id,
                                  type: "card",
                                })
                              }
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
                            {/* Loading skeleton for cards */}
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
                            {planHierarchy[plan.id].map(
                              (card: PlanHierarchyCard) => (
                                <div
                                  key={card.id}
                                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 bg-gray-50 dark:bg-gray-800/50"
                                >
                                  {/* Card Level */}
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2 flex-1">
                                      {/* Checkbox to toggle card inclusion */}
                                      <button
                                        onClick={async () => {
                                          await removeCardFromPlan(
                                            plan.id,
                                            card.id,
                                          );
                                        }}
                                        className="flex-shrink-0 p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                                        title="Remove from plan"
                                      >
                                        <CheckSquare className="h-4 w-4 text-green-600 dark:text-green-400" />
                                      </button>
                                      <button
                                        onClick={() => togglePlanCard(card.id)}
                                        className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
                                      >
                                        {expandedPlanCards.has(card.id) ? (
                                          <ChevronDown className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                                        ) : (
                                          <ChevronRight className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                                        )}
                                      </button>
                                      <Layers className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                      <span className="font-medium text-gray-900 dark:text-gray-100">
                                        {card.title}
                                      </span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <Suspense fallback={<LoadingSkeleton />}>
                                        <Button
                                          onClick={() =>
                                            setAddItemContext({
                                              planId: plan.id,
                                              type: "category",
                                              parentId: card.id,
                                            })
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
                                        {card.categories.map(
                                          (category: {
                                            id: string;
                                            name?: string;
                                            title?: string;
                                            topics?: Array<{
                                              id: string;
                                              name?: string;
                                              title?: string;
                                              totalQuestionCount?: number;
                                              planQuestionCount?: number;
                                              questions?: Array<{
                                                id: string;
                                                title?: string;
                                              }>;
                                            }>;
                                          }) => (
                                            <div
                                              key={category.id}
                                              className="border border-gray-200 dark:border-gray-700 rounded p-2 bg-white dark:bg-gray-900"
                                            >
                                              <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-2 flex-1">
                                                  {/* Checkbox to toggle category inclusion */}
                                                  <button
                                                    onClick={async () => {
                                                      await removeCategoryFromCard(
                                                        card.id,
                                                        category.id,
                                                      );
                                                    }}
                                                    className="flex-shrink-0 p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                                                    title="Remove from plan"
                                                  >
                                                    <CheckSquare className="h-3 w-3 text-green-600 dark:text-green-400" />
                                                  </button>
                                                  <button
                                                    onClick={() =>
                                                      togglePlanCategory(
                                                        category.id,
                                                      )
                                                    }
                                                    className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
                                                  >
                                                    {expandedPlanCategories.has(
                                                      category.id,
                                                    ) ? (
                                                      <ChevronDown className="h-3 w-3 text-gray-700 dark:text-gray-300" />
                                                    ) : (
                                                      <ChevronRight className="h-3 w-3 text-gray-700 dark:text-gray-300" />
                                                    )}
                                                  </button>
                                                  <BookOpen className="h-3 w-3 text-purple-600 dark:text-purple-400" />
                                                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                                    {category.name ||
                                                      category.title}
                                                  </span>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                  <Suspense
                                                    fallback={
                                                      <LoadingSkeleton />
                                                    }
                                                  >
                                                    <Button
                                                      onClick={() =>
                                                        setAddItemContext({
                                                          planId: plan.id,
                                                          type: "topic",
                                                          parentId: category.id,
                                                        })
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
                                                    {category.topics.map(
                                                      (topic: {
                                                        id: string;
                                                        name?: string;
                                                        title?: string;
                                                        totalQuestionCount?: number;
                                                        planQuestionCount?: number;
                                                        questions?: Array<{
                                                          id: string;
                                                          title?: string;
                                                        }>;
                                                      }) => (
                                                        <div
                                                          key={topic.id}
                                                          className="border border-gray-200 dark:border-gray-700 rounded p-2 bg-gray-50 dark:bg-gray-800/50"
                                                        >
                                                          <div className="flex items-center justify-between">
                                                            <div className="flex items-center space-x-2 flex-1">
                                                              {/* Checkbox to toggle topic inclusion */}
                                                              <button
                                                                onClick={async () => {
                                                                  await removeTopicFromCategory(
                                                                    category.id,
                                                                    topic.id,
                                                                  );
                                                                }}
                                                                className="flex-shrink-0 p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                                                                title="Remove from plan"
                                                              >
                                                                <CheckSquare className="h-3 w-3 text-green-600 dark:text-green-400" />
                                                              </button>
                                                              <button
                                                                onClick={(
                                                                  e,
                                                                ) => {
                                                                  e.stopPropagation();
                                                                  console.log(
                                                                    "🔍 Toggling topic:",
                                                                    topic.id,
                                                                    "Current expanded:",
                                                                    Array.from(
                                                                      expandedPlanTopics,
                                                                    ),
                                                                  );
                                                                  togglePlanTopic(
                                                                    topic.id,
                                                                  );
                                                                }}
                                                                className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
                                                                title={
                                                                  expandedPlanTopics.has(
                                                                    topic.id,
                                                                  )
                                                                    ? "Collapse questions"
                                                                    : "Expand questions"
                                                                }
                                                              >
                                                                {expandedPlanTopics.has(
                                                                  topic.id,
                                                                ) ? (
                                                                  <ChevronDown className="h-3 w-3 text-gray-700 dark:text-gray-300" />
                                                                ) : (
                                                                  <ChevronRight className="h-3 w-3 text-gray-700 dark:text-gray-300" />
                                                                )}
                                                              </button>
                                                              <Target className="h-3 w-3 text-orange-600 dark:text-orange-400" />
                                                              <div className="flex items-center space-x-2 flex-1">
                                                                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                                                  {topic.name ||
                                                                    topic.title}
                                                                </span>
                                                                {/* Show question counts with styled badges */}
                                                                <div className="flex items-center gap-2">
                                                                  {/* Total questions in topic badge */}
                                                                  {topic.totalQuestionCount !==
                                                                    undefined && (
                                                                    <Badge
                                                                      variant="outline"
                                                                      className="text-xs font-semibold bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-700 px-2 py-0.5"
                                                                      title={`Total questions in this topic`}
                                                                    >
                                                                      <MessageSquare className="h-3 w-3 mr-1 inline text-purple-600 dark:text-purple-400" />
                                                                      {
                                                                        topic.totalQuestionCount
                                                                      }{" "}
                                                                      in topic
                                                                    </Badge>
                                                                  )}
                                                                  {/* Questions in plan badge */}
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
                                                                      title={`Questions included in this plan`}
                                                                    >
                                                                      <CheckSquare className="h-3 w-3 mr-1 inline text-blue-600 dark:text-blue-400" />
                                                                      {
                                                                        topic.planQuestionCount
                                                                      }{" "}
                                                                      in plan
                                                                    </Badge>
                                                                  )}
                                                                </div>
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
                                                                    setAddItemContext(
                                                                      {
                                                                        planId:
                                                                          plan.id,
                                                                        type: "question",
                                                                        parentId:
                                                                          topic.id,
                                                                      },
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
                                                          ) && (
                                                            <div className="mt-2 ml-6 space-y-1">
                                                              {topic.questions &&
                                                              topic.questions
                                                                .length > 0 ? (
                                                                topic.questions.map(
                                                                  (question: {
                                                                    id: string;
                                                                    title?: string;
                                                                  }) => (
                                                                    <div
                                                                      key={
                                                                        question.id
                                                                      }
                                                                      className="flex items-center justify-between py-1 px-2 rounded bg-white dark:bg-gray-900"
                                                                    >
                                                                      <div className="flex items-center space-x-2 flex-1">
                                                                        {/* Checkbox to toggle question inclusion - removes from both topic and plan */}
                                                                        <button
                                                                          onClick={async () => {
                                                                            await removeQuestionFromPlan(
                                                                              plan.id,
                                                                              topic.id,
                                                                              question.id,
                                                                            );
                                                                          }}
                                                                          className="flex-shrink-0 p-0.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                                                                          title="Remove from plan"
                                                                        >
                                                                          <CheckSquare className="h-3 w-3 text-green-600 dark:text-green-400" />
                                                                        </button>
                                                                        <MessageSquare className="h-3 w-3 text-red-600 dark:text-red-400" />
                                                                        <span className="text-xs text-gray-900 dark:text-gray-100 truncate">
                                                                          {question.title ||
                                                                            "Untitled Question"}
                                                                        </span>
                                                                      </div>
                                                                      <div className="flex items-center space-x-1">
                                                                        {/* View Question Button */}
                                                                        <Suspense
                                                                          fallback={
                                                                            <LoadingSkeleton />
                                                                          }
                                                                        >
                                                                          <Button
                                                                            size="sm"
                                                                            variant="ghost"
                                                                            onClick={async () => {
                                                                              // Fetch full question data including code field
                                                                              try {
                                                                                const response =
                                                                                  await fetch(
                                                                                    `/api/questions/unified/${question.id}`,
                                                                                  );
                                                                                if (
                                                                                  response.ok
                                                                                ) {
                                                                                  const result =
                                                                                    await response.json();
                                                                                  if (
                                                                                    result.success &&
                                                                                    result.data
                                                                                  ) {
                                                                                    // Process code field to ensure newlines are preserved
                                                                                    const fullQuestion =
                                                                                      result.data;
                                                                                    if (
                                                                                      fullQuestion.code &&
                                                                                      typeof fullQuestion.code ===
                                                                                        "string"
                                                                                    ) {
                                                                                      fullQuestion.code =
                                                                                        fullQuestion.code
                                                                                          .replace(
                                                                                            /\\n/g,
                                                                                            "\n",
                                                                                          )
                                                                                          .replace(
                                                                                            /\\r\\n/g,
                                                                                            "\n",
                                                                                          )
                                                                                          .replace(
                                                                                            /\\r/g,
                                                                                            "\n",
                                                                                          )
                                                                                          .replace(
                                                                                            /\r\n/g,
                                                                                            "\n",
                                                                                          )
                                                                                          .replace(
                                                                                            /\r/g,
                                                                                            "\n",
                                                                                          );
                                                                                    }
                                                                                    setViewingQuestion(
                                                                                      fullQuestion,
                                                                                    );
                                                                                    setIsViewQuestionModalOpen(
                                                                                      true,
                                                                                    );
                                                                                  } else {
                                                                                    // Fallback to question from list - fetch full question
                                                                                    try {
                                                                                      const fallbackResponse =
                                                                                        await fetch(
                                                                                          `/api/questions/unified/${question.id}`,
                                                                                        );
                                                                                      if (
                                                                                        fallbackResponse.ok
                                                                                      ) {
                                                                                        const fallbackResult =
                                                                                          await fallbackResponse.json();
                                                                                        if (
                                                                                          fallbackResult.success &&
                                                                                          fallbackResult.data
                                                                                        ) {
                                                                                          setViewingQuestion(
                                                                                            fallbackResult.data,
                                                                                          );
                                                                                          setIsViewQuestionModalOpen(
                                                                                            true,
                                                                                          );
                                                                                        }
                                                                                      }
                                                                                    } catch {
                                                                                      // If fetch fails, skip setting question
                                                                                    }
                                                                                  }
                                                                                } else {
                                                                                  // Fallback to question from list - fetch full question
                                                                                  try {
                                                                                    const fallbackResponse =
                                                                                      await fetch(
                                                                                        `/api/questions/unified/${question.id}`,
                                                                                      );
                                                                                    if (
                                                                                      fallbackResponse.ok
                                                                                    ) {
                                                                                      const fallbackResult =
                                                                                        await fallbackResponse.json();
                                                                                      if (
                                                                                        fallbackResult.success &&
                                                                                        fallbackResult.data
                                                                                      ) {
                                                                                        setViewingQuestion(
                                                                                          fallbackResult.data,
                                                                                        );
                                                                                        setIsViewQuestionModalOpen(
                                                                                          true,
                                                                                        );
                                                                                      }
                                                                                    }
                                                                                  } catch {
                                                                                    // If fetch fails, skip setting question
                                                                                  }
                                                                                  setIsViewQuestionModalOpen(
                                                                                    true,
                                                                                  );
                                                                                }
                                                                              } catch (error) {
                                                                                console.error(
                                                                                  "Error fetching question:",
                                                                                  error,
                                                                                );
                                                                                // Fallback - question from hierarchy is incomplete, skip viewing
                                                                                showError(
                                                                                  "Failed to Load",
                                                                                  "Could not load question details",
                                                                                );
                                                                              }
                                                                            }}
                                                                            className="h-6 w-6 p-0 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                                                                            title="View question details"
                                                                          >
                                                                            <Eye className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                                                                          </Button>
                                                                        </Suspense>
                                                                      </div>
                                                                    </div>
                                                                  ),
                                                                )
                                                              ) : (
                                                                <div className="text-xs text-gray-500 dark:text-gray-400 py-2 px-3 bg-gray-50 dark:bg-gray-800/50 rounded border border-gray-200 dark:border-gray-700">
                                                                  No questions
                                                                  in this topic
                                                                </div>
                                                              )}
                                                            </div>
                                                          )}
                                                        </div>
                                                      ),
                                                    )}
                                                  </div>
                                                )}
                                            </div>
                                          ),
                                        )}
                                      </div>
                                    )}
                                </div>
                              ),
                            )}
                          </div>
                        ) : planHierarchy[plan.id] !== undefined ? (
                          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                            <Layers className="h-12 w-12 mx-auto mb-2 opacity-50" />
                            <p>No cards in this plan yet</p>
                            <p className="text-xs mt-1">
                              Click &quot;Add Card&quot; to get started
                            </p>
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
          plan={editingPlan as unknown}
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
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          category={editingCategory as any}
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
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          topic={editingTopic as any}
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
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      <Modal
        isOpen={isDeleteCardModalOpen}
        onClose={() => {
          setIsDeleteCardModalOpen(false);
          setCardToDelete(null);
        }}
        title="Delete Card"
      >
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete the card &quot;{cardToDelete?.title}
            &quot;? This action cannot be undone.
          </p>
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => {
                setIsDeleteCardModalOpen(false);
                setCardToDelete(null);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDeleteCard}
              disabled={deleteCardMutation.isPending}
            >
              {deleteCardMutation.isPending ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isDeletePlanModalOpen}
        onClose={() => {
          setIsDeletePlanModalOpen(false);
          setPlanToDelete(null);
        }}
        title="Delete Plan"
      >
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete the plan &quot;
            {planToDelete?.name ||
              String((planToDelete as { title?: string })?.title || "")}
            &quot;? This action cannot be undone.
          </p>
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => {
                setIsDeletePlanModalOpen(false);
                setPlanToDelete(null);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDeletePlan}
              disabled={deletePlanMutation.isPending}
            >
              {deletePlanMutation.isPending ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Add Items Modal - Step by Step Selection */}
      <Modal
        isOpen={!!addItemContext}
        onClose={() => {
          setAddItemContext(null);
          setSelectionStep("card");
          setSelectedCardId(null);
          setSelectedCategoryId(null);
          setSelectedTopicId(null);
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
                  const hierarchy: PlanHierarchyCard[] =
                    planHierarchy[addItemContext.planId] || [];
                  const isInPlan = hierarchy.some((c) => c.id === card.id);
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
                      (cat as Category & { card_id?: string }).card_id ===
                        addItemContext.parentId
                    );
                  })
                  .map((category) => {
                    const hierarchy: PlanHierarchyCard[] =
                      planHierarchy[addItemContext.planId] || [];
                    const card = hierarchy.find(
                      (c) => c.id === addItemContext.parentId,
                    );
                    const isInCard = card?.categories?.some(
                      (cat) => cat.id === category.id,
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
                    (cat as Category & { card_id?: string }).card_id ===
                      addItemContext.parentId,
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
                    const hierarchy: PlanHierarchyCard[] =
                      planHierarchy[addItemContext.planId] || [];
                    const card = hierarchy.find((c) =>
                      c.categories?.some(
                        (cat) => cat.id === addItemContext.parentId,
                      ),
                    );
                    const category = card?.categories?.find(
                      (cat) => cat.id === addItemContext.parentId,
                    );
                    const isInCategory = category?.topics?.some(
                      (t) => t.id === topic.id,
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
                            addItemContext.planId,
                          ),
                      );
                      await Promise.all(addPromises);
                      await fetchPlanHierarchy(addItemContext.planId);
                      setSelectedQuestionIds(new Set());
                      setAddItemContext(null);
                    }}
                    className="bg-green-600 hover:bg-green-700"
                    disabled={Array.from(selectedQuestionIds).some(
                      (qId) =>
                        addingQuestionToTopic[
                          `${addItemContext.parentId}-${qId}`
                        ],
                    )}
                  >
                    {Array.from(selectedQuestionIds).some(
                      (qId) =>
                        addingQuestionToTopic[
                          `${addItemContext.parentId}-${qId}`
                        ],
                    ) ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-1" />
                        Adding...
                      </>
                    ) : (
                      <>
                        <Plus className="h-4 w-4 mr-1" />
                        Add Selected ({selectedQuestionIds.size})
                      </>
                    )}
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
                    const hierarchy: PlanHierarchyCard[] =
                      planHierarchy[addItemContext.planId] || [];
                    const card = hierarchy.find((c) =>
                      c.categories?.some((cat) =>
                        cat.topics?.some(
                          (t) => t.id === addItemContext.parentId,
                        ),
                      ),
                    );
                    const category = card?.categories?.find((cat) =>
                      cat.topics?.some((t) => t.id === addItemContext.parentId),
                    );
                    const topic = category?.topics?.find(
                      (t) => t.id === addItemContext.parentId,
                    );
                    const isInTopic = topic?.questions?.some(
                      (q) => q.id === question.id,
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
                                    // Fallback - question from hierarchy is incomplete, skip viewing
                                    showError(
                                      "Failed to Load",
                                      "Could not load question details",
                                    );
                                  }
                                } else {
                                  // Fallback - question from hierarchy is incomplete, skip viewing
                                  showError(
                                    "Failed to Load",
                                    "Could not load question details",
                                  );
                                }
                              } catch (error) {
                                console.error(
                                  "Error fetching question:",
                                  error,
                                );
                                // Fallback - question from hierarchy is incomplete, skip viewing
                                showError(
                                  "Failed to Load",
                                  "Could not load question details",
                                );
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
                                  addItemContext.planId,
                                );
                                await fetchPlanHierarchy(addItemContext.planId);
                                setSelectedQuestionIds((prev) => {
                                  const newSet = new Set(prev);
                                  newSet.delete(question.id);
                                  return newSet;
                                });
                                // Don't close modal - allow adding more questions
                              }}
                              disabled={
                                addingQuestionToTopic[
                                  `${addItemContext.parentId}-${question.id}`
                                ]
                              }
                            >
                              {addingQuestionToTopic[
                                `${addItemContext.parentId}-${question.id}`
                              ] ? (
                                <>
                                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent mr-1" />
                                  Adding...
                                </>
                              ) : (
                                <>
                                  <Plus className="h-4 w-4 mr-1" />
                                  Add
                                </>
                              )}
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
    </div>
  );
}
