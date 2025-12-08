"use client";

import React, {
  useEffect,
  useMemo,
  useState,
  useCallback,
  Suspense,
} from "react";
import { createClient } from "@supabase/supabase-js";
import { toast } from "sonner";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
  Badge,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Input,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Checkbox,
} from "@elzatona/components";

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
  Loader2,
} from "lucide-react";

// Import types and components
import type {
  LearningCard,
  LearningPlan,
  Category,
  Topic,
  Question,
  Stats,
} from "./components/types";
import { StatsSection } from "./components/StatsSection";
import { SearchAndFilters } from "./components/SearchAndFilters";

// Memoized constants to prevent recreation on each render
const CARD_ICONS = {
  "Core Technologies": { icon: BookOpen, color: "#3B82F6" },
  "Framework Questions": { icon: Layers, color: "#10B981" },
  "Problem Solving": { icon: Puzzle, color: "#F59E0B" },
  "System Design": { icon: Network, color: "#EF4444" },
  "Frontend Tasks": { icon: Target, color: "#8B5CF6" },
} as const;

// Loading skeleton component for better UX
const LoadingSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
  </div>
);

export default function ContentManagementPage() {
  // State for data
  const [cards, setCards] = useState<LearningCard[]>([]);
  const [plans, setPlans] = useState<LearningPlan[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);

  // Loading states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // UI state
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCardType, setFilterCardType] = useState("all");
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(),
  );
  const [expandedTopics, setExpandedTopics] = useState<Set<string>>(new Set());
  const [expandedPlans, setExpandedPlans] = useState<Set<string>>(new Set());

  // Plan structure collapsible states
  const [expandedPlanCards, setExpandedPlanCards] = useState<Set<string>>(
    new Set(),
  );
  const [expandedPlanCategories, setExpandedPlanCategories] = useState<
    Set<string>
  >(new Set());
  const [expandedPlanTopics, setExpandedPlanTopics] = useState<Set<string>>(
    new Set(),
  );

  // Modal states
  const [isTopicQuestionsModalOpen, setIsTopicQuestionsModalOpen] =
    useState(false);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<LearningPlan | null>(null);
  const [selectedQuestions, setSelectedQuestions] = useState<Set<string>>(
    new Set(),
  );

  // Delete modal states
  const [isDeleteCardModalOpen, setIsDeleteCardModalOpen] = useState(false);
  const [cardToDelete, setCardToDelete] = useState<LearningCard | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Card management modal states
  const [isCardManagementModalOpen, setIsCardManagementModalOpen] =
    useState(false);
  const [selectedPlanForCards, setSelectedPlanForCards] =
    useState<LearningPlan | null>(null);
  const [planCards, setPlanCards] = useState<
    { card_id: string; order_index: number; is_active: boolean }[]
  >([]);
  const [availableCards, setAvailableCards] = useState<LearningCard[]>([]);
  const [isManagingCards, setIsManagingCards] = useState(false);

  // Plan questions state
  const [planQuestions, setPlanQuestions] = useState<Set<string>>(new Set());

  // Fetch data from Supabase
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch all data in parallel
      const [
        cardsResult,
        plansResult,
        categoriesResult,
        topicsResult,
        questionsResult,
        planQuestionsResult,
      ] = await Promise.all([
        supabase.from("learning_cards").select("*").order("order_index"),
        supabase.from("learning_plans").select("*").order("created_at"),
        supabase.from("categories").select("*").order("created_at"),
        supabase.from("topics").select("*").order("order_index"),
        supabase.from("questions").select("*").order("created_at").limit(1000), // Limit to prevent performance issues
        supabase
          .from("plan_questions")
          .select("plan_id, question_id")
          .eq("is_active", true),
      ]);

      if (cardsResult.error) throw cardsResult.error;
      if (plansResult.error) throw plansResult.error;
      if (categoriesResult.error) throw categoriesResult.error;
      if (topicsResult.error) throw topicsResult.error;
      if (questionsResult.error) throw questionsResult.error;
      if (planQuestionsResult.error) throw planQuestionsResult.error;

      setCards(cardsResult.data || []);
      setPlans(plansResult.data || []);
      setCategories(categoriesResult.data || []);
      setTopics(topicsResult.data || []);
      setQuestions(questionsResult.data || []);

      // Convert plan questions to Set for efficient lookup
      const planQuestionsSet = new Set(
        planQuestionsResult.data?.map(
          (pq) => `${pq.plan_id}-${pq.question_id}`,
        ) || [],
      );
      setPlanQuestions(planQuestionsSet);

      console.log("📊 Data loaded:", {
        cards: cardsResult.data?.length || 0,
        plans: plansResult.data?.length || 0,
        categories: categoriesResult.data?.length || 0,
        topics: topicsResult.data?.length || 0,
        questions: questionsResult.data?.length || 0,
        planQuestions: planQuestionsResult.data?.length || 0,
      });
    } catch (err) {
      console.error("❌ Error fetching data:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  }, []);

  // Load data on mount
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Stats calculation
  const stats = useMemo(
    () => ({
      totalCards: cards.length,
      totalPlans: plans.length,
      totalCategories: categories.length,
      totalTopics: topics.length,
      totalQuestions: questions.length,
    }),
    [cards, plans, categories, topics, questions],
  );

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

  // Plan structure toggle functions
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

  // Modal helper functions
  const openTopicQuestionsModal = useCallback(
    (topic: Topic, plan: LearningPlan) => {
      setSelectedTopic(topic);
      setSelectedPlan(plan);
      setSelectedQuestions(new Set());
      setIsTopicQuestionsModalOpen(true);
    },
    [],
  );

  const closeTopicQuestionsModal = useCallback(() => {
    setIsTopicQuestionsModalOpen(false);
    setSelectedTopic(null);
    setSelectedPlan(null);
    setSelectedQuestions(new Set());
  }, []);

  const toggleQuestionSelection = useCallback((questionId: string) => {
    setSelectedQuestions((prev) => {
      const newSelected = new Set(prev);
      if (newSelected.has(questionId)) {
        newSelected.delete(questionId);
      } else {
        newSelected.add(questionId);
      }
      return newSelected;
    });
  }, []);

  const selectAllQuestions = useCallback(() => {
    if (!selectedTopic) return;
    const topicQuestions = questions.filter(
      (q) => q.topic_id === selectedTopic.id,
    );
    setSelectedQuestions(new Set(topicQuestions.map((q) => q.id)));
  }, [selectedTopic, questions]);

  const deselectAllQuestions = useCallback(() => {
    setSelectedQuestions(new Set());
  }, []);

  const addSelectedQuestionsToPlan = useCallback(async () => {
    if (!selectedPlan || !selectedTopic || selectedQuestions.size === 0) return;

    try {
      // Add questions to plan_questions table
      const planQuestionInserts = Array.from(selectedQuestions).map(
        (questionId) => ({
          plan_id: selectedPlan.id,
          question_id: questionId,
          topic_id: selectedTopic.id,
          is_active: true,
        }),
      );

      const { error } = await supabase
        .from("plan_questions")
        .insert(planQuestionInserts);

      if (error) throw error;

      // Update local state
      const newPlanQuestions = new Set(planQuestions);
      selectedQuestions.forEach((questionId) => {
        newPlanQuestions.add(`${selectedPlan.id}-${questionId}`);
      });
      setPlanQuestions(newPlanQuestions);

      toast.success(
        `Successfully added ${selectedQuestions.size} questions to plan "${selectedPlan.name}"`,
      );
      closeTopicQuestionsModal();
    } catch (error) {
      console.error("Error adding questions to plan:", error);
      toast.error("Failed to add questions to plan");
    }
  }, [
    selectedPlan,
    selectedTopic,
    selectedQuestions,
    planQuestions,
    closeTopicQuestionsModal,
  ]);

  // Toggle question in plan (for radio button functionality)
  const toggleQuestionInPlan = useCallback(
    async (
      questionId: string,
      planId: string,
      topicId: string,
      isInPlan: boolean,
    ) => {
      try {
        if (isInPlan) {
          // Remove question from plan
          const { error } = await supabase
            .from("plan_questions")
            .delete()
            .eq("plan_id", planId)
            .eq("question_id", questionId);

          if (error) throw error;

          // Update local state
          setPlanQuestions((prev) => {
            const newSet = new Set(prev);
            newSet.delete(`${planId}-${questionId}`);
            return newSet;
          });

          toast.success("Question removed from plan");
        } else {
          // Add question to plan
          const { error } = await supabase.from("plan_questions").insert({
            plan_id: planId,
            question_id: questionId,
            topic_id: topicId,
            is_active: true,
          });

          if (error) throw error;

          // Update local state
          setPlanQuestions((prev) => {
            const newSet = new Set(prev);
            newSet.add(`${planId}-${questionId}`);
            return newSet;
          });

          toast.success("Question added to plan");
        }
      } catch (error) {
        console.error("Error toggling question in plan:", error);
        toast.error("Failed to update question in plan");
      }
    },
    [],
  );

  // Delete card helper functions
  const openDeleteCardModal = useCallback((card: LearningCard) => {
    setCardToDelete(card);
    setIsDeleteCardModalOpen(true);
  }, []);

  const closeDeleteCardModal = useCallback(() => {
    setIsDeleteCardModalOpen(false);
    setCardToDelete(null);
    setIsDeleting(false);
  }, []);

  const deleteCard = useCallback(async () => {
    if (!cardToDelete) return;

    setIsDeleting(true);
    try {
      // Delete the card from Supabase
      const { error } = await supabase
        .from("learning_cards")
        .delete()
        .eq("id", cardToDelete.id);

      if (error) {
        throw error;
      }

      // Show success toast
      toast.success(`Successfully deleted card "${cardToDelete.title}"`);

      // Refresh the data to reflect the deletion
      await fetchData();
      closeDeleteCardModal();
    } catch (error) {
      console.error("Error deleting card:", error);
      toast.error("Failed to delete card. Please try again.");
      setIsDeleting(false);
    }
  }, [cardToDelete, fetchData, closeDeleteCardModal]);

  // Card management helper functions
  const openCardManagementModal = useCallback(async (plan: LearningPlan) => {
    setSelectedPlanForCards(plan);
    setIsCardManagementModalOpen(true);
    setIsManagingCards(true);

    try {
      // Fetch current cards in this plan
      const { data: currentPlanCards, error: planCardsError } = await supabase
        .from("plan_cards")
        .select("card_id, order_index, is_active")
        .eq("plan_id", plan.id)
        .order("order_index");

      if (planCardsError) throw planCardsError;

      setPlanCards(currentPlanCards || []);

      // Get all available cards
      const { data: allCards, error: cardsError } = await supabase
        .from("learning_cards")
        .select("*")
        .eq("is_active", true)
        .order("title");

      if (cardsError) throw cardsError;

      setAvailableCards(allCards || []);
    } catch (error) {
      console.error("Error fetching plan cards:", error);
      toast.error("Failed to load plan cards");
    } finally {
      setIsManagingCards(false);
    }
  }, []);

  const closeCardManagementModal = useCallback(() => {
    setIsCardManagementModalOpen(false);
    setSelectedPlanForCards(null);
    setPlanCards([]);
    setAvailableCards([]);
    setIsManagingCards(false);
  }, []);

  const addCardToPlan = useCallback(
    async (cardId: string) => {
      if (!selectedPlanForCards) return;

      try {
        // Check if card is already in plan
        const existingCard = planCards.find((pc) => pc.card_id === cardId);
        if (existingCard) {
          toast.error("This card is already in the plan");
          return;
        }

        // Get the next order index
        const maxOrderIndex = Math.max(
          ...planCards.map((pc) => pc.order_index),
          0,
        );
        const nextOrderIndex = maxOrderIndex + 1;

        // Add card to plan
        const { error } = await supabase.from("plan_cards").insert({
          plan_id: selectedPlanForCards.id,
          card_id: cardId,
          order_index: nextOrderIndex,
          is_active: true,
        });

        if (error) throw error;

        // Update local state
        setPlanCards((prev) => [
          ...prev,
          { card_id: cardId, order_index: nextOrderIndex, is_active: true },
        ]);

        toast.success("Card added to plan successfully");
      } catch (error) {
        console.error("Error adding card to plan:", error);
        toast.error("Failed to add card to plan");
      }
    },
    [selectedPlanForCards, planCards],
  );

  const removeCardFromPlan = useCallback(
    async (cardId: string) => {
      if (!selectedPlanForCards) return;

      try {
        // Remove card from plan
        const { error } = await supabase
          .from("plan_cards")
          .delete()
          .eq("plan_id", selectedPlanForCards.id)
          .eq("card_id", cardId);

        if (error) throw error;

        // Update local state
        setPlanCards((prev) => prev.filter((pc) => pc.card_id !== cardId));

        toast.success("Card removed from plan successfully");
      } catch (error) {
        console.error("Error removing card from plan:", error);
        toast.error("Failed to remove card from plan");
      }
    },
    [selectedPlanForCards],
  );

  const toggleCardActiveStatus = useCallback(
    async (cardId: string, isActive: boolean) => {
      if (!selectedPlanForCards) return;

      try {
        // Update card status in plan
        const { error } = await supabase
          .from("plan_cards")
          .update({ is_active: !isActive })
          .eq("plan_id", selectedPlanForCards.id)
          .eq("card_id", cardId);

        if (error) throw error;

        // Update local state
        setPlanCards((prev) =>
          prev.map((pc) =>
            pc.card_id === cardId ? { ...pc, is_active: !isActive } : pc,
          ),
        );

        toast.success(
          `Card ${!isActive ? "activated" : "deactivated"} in plan`,
        );
      } catch (error) {
        console.error("Error updating card status:", error);
        toast.error("Failed to update card status");
      }
    },
    [selectedPlanForCards],
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
              <p className="text-gray-600 dark:text-gray-400">
                Loading content management data...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error handling
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="text-red-500 text-6xl mb-4">⚠️</div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Error Loading Data
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                There was an error loading the content management data. Please
                try refreshing the page.
              </p>
              <Button
                onClick={() => window.location.reload()}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Refresh Page
              </Button>
              <div className="mt-4 text-sm text-gray-500">
                <p>Error: {error}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            🎯 Unified Learning Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Comprehensive admin interface for managing learning cards, plans,
            categories, topics, and questions
          </p>
        </div>

        {/* Stats */}
        <StatsSection stats={stats} />

        {/* Search and Filters */}
        <SearchAndFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filterCardType={filterCardType}
          onFilterChange={setFilterCardType}
        />

        {/* Cards Section */}
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
                onClick={() => {
                  // TODO: Implement edit cards functionality
                  console.log("Edit cards clicked");
                }}
                className="flex items-center space-x-1"
              >
                <Edit className="h-4 w-4" />
                <span>Edit Cards</span>
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  // TODO: Implement create card functionality
                  console.log("Create card clicked");
                }}
                className="flex items-center space-x-1 bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="h-4 w-4" />
                <span>Create Card</span>
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {filteredCards.length === 0 ? (
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
              filteredCards.map((card) => {
                const cardCategories = categories.filter(
                  (cat) => cat.learning_card_id === card.id,
                );
                const IconComponent =
                  CARD_ICONS[card.title as keyof typeof CARD_ICONS]?.icon ||
                  Layers;

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
                            <CardTitle className="text-lg">
                              {card.title}
                            </CardTitle>
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
                                categoryTopics.reduce((topicTotal, topic) => {
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
                              onClick={() => {
                                // TODO: Implement edit card functionality
                                console.log("Edit card clicked:", card.id);
                              }}
                              className="h-8 w-8 p-0 hover:bg-blue-100"
                            >
                              <Edit className="h-4 w-4 text-blue-600" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                openDeleteCardModal(card);
                              }}
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
                          {/* Categories under this card */}
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
                                      onClick={() =>
                                        toggleCategory(category.id)
                                      }
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
                                      const topicQuestions = questions.filter(
                                        (q) => q.category_id === category.id,
                                      );

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
                                                {expandedTopics.has(
                                                  topic.id,
                                                ) ? (
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
                                                {topicQuestions.length}{" "}
                                                Questions
                                              </Badge>
                                            </div>
                                          </div>

                                          {expandedTopics.has(topic.id) && (
                                            <div className="ml-6 space-y-2">
                                              {topicQuestions
                                                .slice(0, 5)
                                                .map((question) => (
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
                                                          {question.difficulty}{" "}
                                                          • {question.type}
                                                        </p>
                                                      </div>
                                                    </div>
                                                  </div>
                                                ))}
                                              {topicQuestions.length > 5 && (
                                                <p className="text-xs text-gray-500 ml-6">
                                                  ... and{" "}
                                                  {topicQuestions.length - 5}{" "}
                                                  more questions
                                                </p>
                                              )}
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
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  // TODO: Implement edit plans functionality
                  console.log("Edit plans clicked");
                }}
                className="flex items-center space-x-1"
              >
                <Edit className="h-4 w-4" />
                <span>Edit Plans</span>
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  // TODO: Implement create plan functionality
                  console.log("Create plan clicked");
                }}
                className="flex items-center space-x-1 bg-green-600 hover:bg-green-700"
              >
                <Plus className="h-4 w-4" />
                <span>Create Plan</span>
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {filteredPlans.length === 0 ? (
              <Card className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
                <CardContent className="p-8 text-center">
                  <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    No Learning Plans
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Create your first learning plan to provide structured
                    learning paths for users.
                  </p>
                </CardContent>
              </Card>
            ) : (
              filteredPlans.map((plan) => (
                <Card key={plan.id} className="border-l-4 border-l-green-500">
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
                        <Calendar className="h-5 w-5 text-green-600" />
                        <div>
                          <CardTitle className="text-lg">{plan.name}</CardTitle>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {plan.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">
                          {plan.estimated_duration} days
                        </Badge>
                        <Badge variant="outline">
                          {plan.is_public ? "Public" : "Private"}
                        </Badge>
                        <div className="flex items-center space-x-1 ml-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              // TODO: Implement edit plan functionality
                              console.log("Edit plan clicked:", plan.id);
                            }}
                            className="h-8 w-8 p-0 hover:bg-green-100"
                          >
                            <Edit className="h-4 w-4 text-green-600" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              // TODO: Implement delete plan functionality
                              console.log("Delete plan clicked:", plan.id);
                            }}
                            className="h-8 w-8 p-0 hover:bg-red-100"
                          >
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  {expandedPlans.has(plan.id) && (
                    <CardContent className="pt-0">
                      <div className="space-y-6">
                        {/* Plan Details */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <div className="text-sm">
                            <strong className="text-gray-900 dark:text-white">
                              Duration:
                            </strong>{" "}
                            <span className="text-gray-600 dark:text-gray-400">
                              {plan.estimated_duration} days
                            </span>
                          </div>
                          <div className="text-sm">
                            <strong className="text-gray-900 dark:text-white">
                              Status:
                            </strong>{" "}
                            <Badge
                              variant={plan.is_active ? "default" : "secondary"}
                            >
                              {plan.is_active ? "Active" : "Inactive"}
                            </Badge>
                          </div>
                          <div className="text-sm">
                            <strong className="text-gray-900 dark:text-white">
                              Visibility:
                            </strong>{" "}
                            <Badge
                              variant={plan.is_public ? "default" : "outline"}
                            >
                              {plan.is_public ? "Public" : "Private"}
                            </Badge>
                          </div>
                        </div>

                        {/* Plan Management Actions */}
                        <div className="flex flex-wrap gap-2 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <Button
                            size="sm"
                            onClick={() => openCardManagementModal(plan)}
                            className="flex items-center space-x-1 bg-blue-600 hover:bg-blue-700"
                          >
                            <Layers className="h-4 w-4" />
                            <span>Manage Cards</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              // TODO: Implement add questions to plan functionality
                              console.log("Add questions to plan:", plan.id);
                            }}
                            className="flex items-center space-x-1"
                          >
                            <MessageSquare className="h-4 w-4" />
                            <span>Add Questions</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              // TODO: Implement copy from another plan functionality
                              console.log("Copy from another plan:", plan.id);
                            }}
                            className="flex items-center space-x-1"
                          >
                            <Target className="h-4 w-4" />
                            <span>Copy from Plan</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              // TODO: Implement plan structure management functionality
                              console.log("Manage plan structure:", plan.id);
                            }}
                            className="flex items-center space-x-1"
                          >
                            <Network className="h-4 w-4" />
                            <span>Manage Structure</span>
                          </Button>
                        </div>

                        {/* Plan Structure: Cards -> Categories -> Topics -> Questions */}
                        <div className="space-y-4">
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                            <Layers className="h-5 w-5 mr-2 text-blue-600" />
                            Plan Structure
                          </h4>

                          {/* Cards in this plan */}
                          {cards.map((card) => {
                            const cardCategories = categories.filter(
                              (cat) => cat.learning_card_id === card.id,
                            );
                            const IconComponent =
                              CARD_ICONS[card.title as keyof typeof CARD_ICONS]
                                ?.icon || Layers;

                            return (
                              <div
                                key={card.id}
                                className="ml-4 border-l-2 border-blue-200 pl-4"
                              >
                                <div className="flex items-center justify-between py-2">
                                  <div className="flex items-center space-x-2">
                                    <button
                                      onClick={() => togglePlanCard(card.id)}
                                      className="p-1 hover:bg-gray-100 rounded"
                                    >
                                      {expandedPlanCards.has(card.id) ? (
                                        <ChevronDown className="h-4 w-4" />
                                      ) : (
                                        <ChevronRight className="h-4 w-4" />
                                      )}
                                    </button>
                                    <IconComponent
                                      className="h-4 w-4"
                                      style={{ color: card.color }}
                                    />
                                    <div>
                                      <h5 className="font-medium text-gray-900 dark:text-white">
                                        {card.title}
                                      </h5>
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
                                    <div className="flex items-center space-x-1">
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => {
                                          // TODO: Implement add card to plan functionality
                                          console.log(
                                            "Add card to plan:",
                                            card.id,
                                            plan.id,
                                          );
                                        }}
                                        className="h-6 px-2 text-blue-600 hover:bg-blue-100"
                                      >
                                        <Plus className="h-3 w-3" />
                                      </Button>
                                    </div>
                                  </div>
                                </div>

                                {/* Categories under this card */}
                                {expandedPlanCards.has(card.id) &&
                                  cardCategories.map((category) => {
                                    const categoryTopics = topics.filter(
                                      (topic) =>
                                        topic.category_id === category.id,
                                    );

                                    return (
                                      <div
                                        key={category.id}
                                        className="ml-6 border-l-2 border-purple-200 pl-4 mt-2"
                                      >
                                        <div className="flex items-center justify-between py-2">
                                          <div className="flex items-center space-x-2">
                                            <button
                                              onClick={() =>
                                                togglePlanCategory(category.id)
                                              }
                                              className="p-1 hover:bg-gray-100 rounded"
                                            >
                                              {expandedPlanCategories.has(
                                                category.id,
                                              ) ? (
                                                <ChevronDown className="h-4 w-4" />
                                              ) : (
                                                <ChevronRight className="h-4 w-4" />
                                              )}
                                            </button>
                                            <BookOpen className="h-4 w-4 text-purple-600" />
                                            <div>
                                              <h6 className="font-medium text-gray-900 dark:text-white">
                                                {category.name}
                                              </h6>
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
                                            <div className="flex items-center space-x-1">
                                              <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => {
                                                  // TODO: Implement add category to plan functionality
                                                  console.log(
                                                    "Add category to plan:",
                                                    category.id,
                                                    plan.id,
                                                  );
                                                }}
                                                className="h-6 px-2 text-purple-600 hover:bg-purple-100"
                                              >
                                                <Plus className="h-3 w-3" />
                                              </Button>
                                            </div>
                                          </div>
                                        </div>

                                        {/* Topics under this category */}
                                        {expandedPlanCategories.has(
                                          category.id,
                                        ) &&
                                          categoryTopics.map((topic) => {
                                            const topicQuestions =
                                              questions.filter(
                                                (q) => q.topic_id === topic.id,
                                              );

                                            return (
                                              <div
                                                key={topic.id}
                                                className="ml-6 border-l-2 border-orange-200 pl-4 mt-2"
                                              >
                                                <div
                                                  className={`flex items-center justify-between py-2 px-3 rounded-lg transition-colors ${
                                                    topicQuestions.some((q) =>
                                                      planQuestions.has(
                                                        `${plan.id}-${q.id}`,
                                                      ),
                                                    )
                                                      ? "bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800"
                                                      : "hover:bg-gray-50 dark:hover:bg-gray-800"
                                                  }`}
                                                >
                                                  <div className="flex items-center space-x-2">
                                                    <button
                                                      onClick={() =>
                                                        togglePlanTopic(
                                                          topic.id,
                                                        )
                                                      }
                                                      className="p-1 hover:bg-gray-100 rounded"
                                                    >
                                                      {expandedPlanTopics.has(
                                                        topic.id,
                                                      ) ? (
                                                        <ChevronDown className="h-4 w-4" />
                                                      ) : (
                                                        <ChevronRight className="h-4 w-4" />
                                                      )}
                                                    </button>
                                                    <div className="flex items-center space-x-2">
                                                      <Target
                                                        className={`h-4 w-4 ${
                                                          topicQuestions.some(
                                                            (q) =>
                                                              planQuestions.has(
                                                                `${plan.id}-${q.id}`,
                                                              ),
                                                          )
                                                            ? "text-orange-600"
                                                            : "text-gray-400"
                                                        }`}
                                                      />
                                                      {topicQuestions.some(
                                                        (q) =>
                                                          planQuestions.has(
                                                            `${plan.id}-${q.id}`,
                                                          ),
                                                      ) && (
                                                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                                                      )}
                                                    </div>
                                                    <div>
                                                      <h6
                                                        className={`font-medium ${
                                                          topicQuestions.some(
                                                            (q) =>
                                                              planQuestions.has(
                                                                `${plan.id}-${q.id}`,
                                                              ),
                                                          )
                                                            ? "text-orange-900 dark:text-orange-100"
                                                            : "text-gray-900 dark:text-white"
                                                        }`}
                                                      >
                                                        {topic.name}
                                                      </h6>
                                                      <p className="text-sm text-gray-600 dark:text-gray-400">
                                                        {topic.description}
                                                      </p>
                                                    </div>
                                                  </div>
                                                  <div className="flex items-center space-x-2">
                                                    <Badge
                                                      variant="outline"
                                                      className="bg-orange-50 text-orange-700 dark:bg-orange-900 dark:text-orange-300"
                                                    >
                                                      {topicQuestions.length}{" "}
                                                      Questions
                                                    </Badge>
                                                    <div className="flex items-center space-x-2">
                                                      <div className="flex items-center space-x-2">
                                                        <div className="relative">
                                                          <input
                                                            type="checkbox"
                                                            checked={topicQuestions.some(
                                                              (q) =>
                                                                planQuestions.has(
                                                                  `${plan.id}-${q.id}`,
                                                                ),
                                                            )}
                                                            onChange={() => {
                                                              const hasQuestionsInPlan =
                                                                topicQuestions.some(
                                                                  (q) =>
                                                                    planQuestions.has(
                                                                      `${plan.id}-${q.id}`,
                                                                    ),
                                                                );

                                                              if (
                                                                hasQuestionsInPlan
                                                              ) {
                                                                // Remove all questions from this topic in the plan
                                                                topicQuestions.forEach(
                                                                  (
                                                                    question,
                                                                  ) => {
                                                                    if (
                                                                      planQuestions.has(
                                                                        `${plan.id}-${question.id}`,
                                                                      )
                                                                    ) {
                                                                      toggleQuestionInPlan(
                                                                        question.id,
                                                                        plan.id,
                                                                        topic.id,
                                                                        true,
                                                                      );
                                                                    }
                                                                  },
                                                                );
                                                              } else {
                                                                // Add all questions from this topic to the plan
                                                                topicQuestions.forEach(
                                                                  (
                                                                    question,
                                                                  ) => {
                                                                    if (
                                                                      !planQuestions.has(
                                                                        `${plan.id}-${question.id}`,
                                                                      )
                                                                    ) {
                                                                      toggleQuestionInPlan(
                                                                        question.id,
                                                                        plan.id,
                                                                        topic.id,
                                                                        false,
                                                                      );
                                                                    }
                                                                  },
                                                                );
                                                              }
                                                            }}
                                                            className="sr-only"
                                                            id={`topic-${topic.id}-${plan.id}`}
                                                          />
                                                          <label
                                                            htmlFor={`topic-${topic.id}-${plan.id}`}
                                                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                                                              topicQuestions.some(
                                                                (q) =>
                                                                  planQuestions.has(
                                                                    `${plan.id}-${q.id}`,
                                                                  ),
                                                              )
                                                                ? "bg-orange-500"
                                                                : "bg-gray-300 dark:bg-gray-600"
                                                            }`}
                                                          >
                                                            <span
                                                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                                                topicQuestions.some(
                                                                  (q) =>
                                                                    planQuestions.has(
                                                                      `${plan.id}-${q.id}`,
                                                                    ),
                                                                )
                                                                  ? "translate-x-6"
                                                                  : "translate-x-1"
                                                              }`}
                                                            />
                                                          </label>
                                                        </div>
                                                        <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                                                          {topicQuestions.some(
                                                            (q) =>
                                                              planQuestions.has(
                                                                `${plan.id}-${q.id}`,
                                                              ),
                                                          )
                                                            ? "Included"
                                                            : "Include Topic"}
                                                        </span>
                                                      </div>
                                                      <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => {
                                                          openTopicQuestionsModal(
                                                            topic,
                                                            plan,
                                                          );
                                                        }}
                                                        className="h-7 px-3 text-orange-600 border-orange-200 hover:bg-orange-50 hover:border-orange-300"
                                                        title="Manage individual questions"
                                                      >
                                                        <Plus className="h-3 w-3 mr-1" />
                                                        <span className="text-xs">
                                                          Manage
                                                        </span>
                                                      </Button>
                                                    </div>
                                                  </div>
                                                </div>

                                                {/* Questions under this topic */}
                                                {expandedPlanTopics.has(
                                                  topic.id,
                                                ) &&
                                                  topicQuestions
                                                    .slice(0, 3)
                                                    .map((question) => (
                                                      <div
                                                        key={question.id}
                                                        className="ml-6 border-l-2 border-green-200 pl-4 mt-2"
                                                      >
                                                        <div
                                                          className={`flex items-center justify-between py-2 px-3 rounded-lg transition-colors ${
                                                            planQuestions.has(
                                                              `${plan.id}-${question.id}`,
                                                            )
                                                              ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
                                                              : "hover:bg-gray-50 dark:hover:bg-gray-800"
                                                          }`}
                                                        >
                                                          <div className="flex items-center space-x-2">
                                                            <div className="flex items-center space-x-2">
                                                              <MessageSquare
                                                                className={`h-4 w-4 ${
                                                                  planQuestions.has(
                                                                    `${plan.id}-${question.id}`,
                                                                  )
                                                                    ? "text-green-600"
                                                                    : "text-gray-400"
                                                                }`}
                                                              />
                                                              {planQuestions.has(
                                                                `${plan.id}-${question.id}`,
                                                              ) && (
                                                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                              )}
                                                            </div>
                                                            <div>
                                                              <h6
                                                                className={`font-medium text-sm ${
                                                                  planQuestions.has(
                                                                    `${plan.id}-${question.id}`,
                                                                  )
                                                                    ? "text-green-900 dark:text-green-100"
                                                                    : "text-gray-900 dark:text-white"
                                                                }`}
                                                              >
                                                                {question.title}
                                                              </h6>
                                                              <p className="text-xs text-gray-600 dark:text-gray-400">
                                                                {
                                                                  question.difficulty
                                                                }{" "}
                                                                •{" "}
                                                                {question.type}
                                                              </p>
                                                            </div>
                                                          </div>
                                                          <div className="flex items-center space-x-2">
                                                            <div className="flex items-center space-x-2">
                                                              <div className="relative">
                                                                <input
                                                                  type="checkbox"
                                                                  checked={planQuestions.has(
                                                                    `${plan.id}-${question.id}`,
                                                                  )}
                                                                  onChange={() => {
                                                                    const isInPlan =
                                                                      planQuestions.has(
                                                                        `${plan.id}-${question.id}`,
                                                                      );
                                                                    toggleQuestionInPlan(
                                                                      question.id,
                                                                      plan.id,
                                                                      topic.id,
                                                                      isInPlan,
                                                                    );
                                                                  }}
                                                                  className="sr-only"
                                                                  id={`question-${question.id}-${plan.id}`}
                                                                />
                                                                <label
                                                                  htmlFor={`question-${question.id}-${plan.id}`}
                                                                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors cursor-pointer ${
                                                                    planQuestions.has(
                                                                      `${plan.id}-${question.id}`,
                                                                    )
                                                                      ? "bg-green-500"
                                                                      : "bg-gray-300 dark:bg-gray-600"
                                                                  }`}
                                                                >
                                                                  <span
                                                                    className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                                                                      planQuestions.has(
                                                                        `${plan.id}-${question.id}`,
                                                                      )
                                                                        ? "translate-x-5"
                                                                        : "translate-x-1"
                                                                    }`}
                                                                  />
                                                                </label>
                                                              </div>
                                                              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                                                                {planQuestions.has(
                                                                  `${plan.id}-${question.id}`,
                                                                )
                                                                  ? "Included"
                                                                  : "Include"}
                                                              </span>
                                                            </div>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    ))}
                                                {expandedPlanTopics.has(
                                                  topic.id,
                                                ) &&
                                                  topicQuestions.length > 3 && (
                                                    <div className="ml-6 pl-4 mt-2">
                                                      <p className="text-xs text-gray-500">
                                                        ... and{" "}
                                                        {topicQuestions.length -
                                                          3}{" "}
                                                        more questions
                                                      </p>
                                                    </div>
                                                  )}
                                              </div>
                                            );
                                          })}
                                      </div>
                                    );
                                  })}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Topic Questions Modal */}
      <Dialog
        open={isTopicQuestionsModalOpen}
        onOpenChange={setIsTopicQuestionsModalOpen}
      >
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col mx-auto my-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-orange-600" />
              <span>Add Questions to Plan</span>
            </DialogTitle>
            <DialogDescription>
              Select questions from &quot;{selectedTopic?.name}&quot; to add to
              &quot;
              {selectedPlan?.name}&quot;
            </DialogDescription>
          </DialogHeader>

          <div className="flex-1 overflow-hidden flex flex-col">
            {/* Selection Controls */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg mb-4">
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={selectAllQuestions}
                  className="flex items-center space-x-1"
                >
                  <Checkbox className="h-4 w-4" />
                  <span>Select All</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={deselectAllQuestions}
                  className="flex items-center space-x-1"
                >
                  <span>Deselect All</span>
                </Button>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {selectedQuestions.size} of{" "}
                {
                  questions.filter((q) => q.topic_id === selectedTopic?.id)
                    .length
                }{" "}
                selected
              </div>
            </div>

            {/* Questions List */}
            <div className="flex-1 overflow-y-auto space-y-2">
              {selectedTopic &&
                questions
                  .filter((q) => q.topic_id === selectedTopic.id)
                  .map((question) => (
                    <div
                      key={question.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedQuestions.has(question.id)
                          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                          : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                      }`}
                      onClick={() => toggleQuestionSelection(question.id)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="mt-1">
                          <Checkbox
                            checked={selectedQuestions.has(question.id)}
                            onChange={() =>
                              toggleQuestionSelection(question.id)
                            }
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-gray-900 dark:text-white">
                              {question.title}
                            </h4>
                            <div className="flex items-center space-x-2">
                              <Badge
                                variant="outline"
                                className={`text-xs ${
                                  question.difficulty === "beginner"
                                    ? "bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-300"
                                    : question.difficulty === "intermediate"
                                      ? "bg-yellow-50 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                                      : "bg-red-50 text-red-700 dark:bg-red-900 dark:text-red-300"
                                }`}
                              >
                                {question.difficulty}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {question.type}
                              </Badge>
                            </div>
                          </div>
                          {question.explanation && (
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                              {question.explanation}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
          </div>

          <DialogFooter className="flex items-center justify-between">
            <Button variant="outline" onClick={closeTopicQuestionsModal}>
              Cancel
            </Button>
            <Button
              onClick={addSelectedQuestionsToPlan}
              disabled={selectedQuestions.size === 0}
              className="flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Add {selectedQuestions.size} Questions to Plan</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Card Confirmation Modal */}
      <Dialog
        open={isDeleteCardModalOpen}
        onOpenChange={setIsDeleteCardModalOpen}
      >
        <DialogContent className="max-w-md mx-auto my-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Trash2 className="h-5 w-5 text-red-600" />
              <span>Delete Learning Card</span>
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete &quot;{cardToDelete?.title}&quot;?
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-red-800 dark:text-red-200">
                    Warning: This will permanently delete the card
                  </h4>
                  <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                    All associated categories, topics, and questions will be
                    affected. This action cannot be undone.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={closeDeleteCardModal}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={deleteCard}
              disabled={isDeleting}
              className="flex items-center space-x-2"
            >
              {isDeleting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Deleting...</span>
                </>
              ) : (
                <>
                  <Trash2 className="h-4 w-4" />
                  <span>Delete Card</span>
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Card Management Modal */}
      <Dialog
        open={isCardManagementModalOpen}
        onOpenChange={setIsCardManagementModalOpen}
      >
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col mx-auto my-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Layers className="h-5 w-5 text-blue-600" />
              <span>
                Manage Cards for &quot;{selectedPlanForCards?.name}&quot;
              </span>
            </DialogTitle>
            <DialogDescription>
              Add or remove learning cards from this plan. You can also
              activate/deactivate cards.
            </DialogDescription>
          </DialogHeader>

          <div className="flex-1 overflow-hidden flex flex-col">
            {isManagingCards ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                <span className="ml-2 text-gray-600">Loading cards...</span>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Current Cards in Plan */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                    <Layers className="h-5 w-5 mr-2 text-green-600" />
                    Cards in Plan ({planCards.length})
                  </h3>

                  <div className="max-h-96 overflow-y-auto space-y-2">
                    {planCards.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        <Layers className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                        <p>No cards in this plan</p>
                      </div>
                    ) : (
                      planCards.map((planCard) => {
                        const card = availableCards.find(
                          (c) => c.id === planCard.card_id,
                        );
                        if (!card) return null;

                        const IconComponent =
                          CARD_ICONS[card.title as keyof typeof CARD_ICONS]
                            ?.icon || Layers;

                        return (
                          <div
                            key={planCard.card_id}
                            className={`p-4 border rounded-lg transition-colors ${
                              planCard.is_active
                                ? "border-green-200 bg-green-50 dark:bg-green-900/20"
                                : "border-gray-200 bg-gray-50 dark:bg-gray-800"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <IconComponent
                                  className="h-5 w-5"
                                  style={{ color: card.color }}
                                />
                                <div>
                                  <h4 className="font-medium text-gray-900 dark:text-white">
                                    {card.title}
                                  </h4>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {card.description}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    toggleCardActiveStatus(
                                      planCard.card_id,
                                      planCard.is_active,
                                    )
                                  }
                                  className={`h-8 px-2 ${
                                    planCard.is_active
                                      ? "text-green-600 hover:bg-green-100"
                                      : "text-gray-400 hover:bg-gray-100"
                                  }`}
                                >
                                  {planCard.is_active ? "Active" : "Inactive"}
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    removeCardFromPlan(planCard.card_id)
                                  }
                                  className="h-8 w-8 p-0 hover:bg-red-100"
                                >
                                  <Trash2 className="h-4 w-4 text-red-600" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>

                {/* Available Cards to Add */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                    <Plus className="h-5 w-5 mr-2 text-blue-600" />
                    Available Cards (
                    {
                      availableCards.filter(
                        (card) =>
                          !planCards.find((pc) => pc.card_id === card.id),
                      ).length
                    }
                    )
                  </h3>

                  <div className="max-h-96 overflow-y-auto space-y-2">
                    {availableCards
                      .filter(
                        (card) =>
                          !planCards.find((pc) => pc.card_id === card.id),
                      )
                      .map((card) => {
                        const IconComponent =
                          CARD_ICONS[card.title as keyof typeof CARD_ICONS]
                            ?.icon || Layers;

                        return (
                          <div
                            key={card.id}
                            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <IconComponent
                                  className="h-5 w-5"
                                  style={{ color: card.color }}
                                />
                                <div>
                                  <h4 className="font-medium text-gray-900 dark:text-white">
                                    {card.title}
                                  </h4>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {card.description}
                                  </p>
                                </div>
                              </div>
                              <Button
                                size="sm"
                                onClick={() => addCardToPlan(card.id)}
                                className="flex items-center space-x-1 bg-blue-600 hover:bg-blue-700"
                              >
                                <Plus className="h-4 w-4" />
                                <span>Add</span>
                              </Button>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            )}
          </div>

          <DialogFooter className="flex items-center justify-between">
            <Button variant="outline" onClick={closeCardManagementModal}>
              Close
            </Button>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {planCards.length} cards in plan
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
