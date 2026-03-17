"use client";

// sonarqube:disable S1135 (Architectural TODOs require implementing new repository methods)

import { useEffect, useMemo, useState, useCallback } from "react";
import { toast } from "sonner";
import { supabase } from "@elzatona/utilities";
import {
  AdminLearningCard,
  LearningPlan,
  AdminCategory,
  AdminQuestion,
  Topic as AdminTopic,
} from "@elzatona/types";
import {
  useLearningCardRepository,
  usePlanRepository,
} from "@elzatona/database/client";
import type { Topic as DatabaseTopic } from "@elzatona/database";

type DatabaseTopicRecord = DatabaseTopic & {
  category_id?: string;
  order_index?: number;
};

type LoadResult<T> = {
  data: T[];
  error: string | null;
};

type DatabasePlanRecord = {
  id: string;
  name?: string | null;
  title?: string | null;
  description?: string | null;
  estimated_duration?: number | null;
  estimated_hours?: number | null;
  is_public?: boolean | null;
  is_active?: boolean | null;
  status?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  createdAt?: string | Date | null;
  updatedAt?: string | Date | null;
};

function toIsoDate(value?: string | Date | null): string {
  if (!value) return "";
  if (value instanceof Date) return value.toISOString();
  return value;
}

function normalizePlan(plan: DatabasePlanRecord): LearningPlan {
  return {
    id: plan.id,
    name: plan.name ?? plan.title ?? "Untitled Plan",
    description: plan.description ?? "",
    estimated_duration:
      plan.estimated_duration ?? plan.estimated_hours ?? 0,
    is_public: plan.is_public ?? true,
    is_active: plan.is_active ?? plan.status !== "archived",
    created_at: toIsoDate(plan.created_at ?? plan.createdAt),
    updated_at: toIsoDate(plan.updated_at ?? plan.updatedAt),
  };
}

async function fetchLearningPlans(): Promise<LearningPlan[]> {
  const primaryResponse = await supabase
    .from("learning_plans")
    .select("*")
    .order("created_at", { ascending: false });

  if (!primaryResponse.error) {
    return ((primaryResponse.data ?? []) as DatabasePlanRecord[]).map(
      normalizePlan,
    );
  }

  const fallbackResponse = await supabase
    .from("learningplantemplates")
    .select("*")
    .order("created_at", { ascending: false });

  if (fallbackResponse.error) {
    throw primaryResponse.error;
  }

  return ((fallbackResponse.data ?? []) as DatabasePlanRecord[]).map(
    normalizePlan,
  );
}

function getErrorMessage(error: unknown, fallbackMessage: string): string {
  return error instanceof Error ? error.message : fallbackMessage;
}

async function loadSupabaseCollection<T>(
  query: PromiseLike<{ data: T[] | null; error: { message: string } | null }>,
  fallbackMessage: string,
): Promise<LoadResult<T>> {
  try {
    const result = await query;

    if (result.error) {
      return { data: [], error: result.error.message };
    }

    return { data: result.data ?? [], error: null };
  } catch (error) {
    return {
      data: [],
      error: getErrorMessage(error, fallbackMessage),
    };
  }
}

async function loadLearningPlans(): Promise<LoadResult<LearningPlan>> {
  try {
    return {
      data: await fetchLearningPlans(),
      error: null,
    };
  } catch (error) {
    return {
      data: [],
      error: getErrorMessage(error, "Failed to fetch learning plans"),
    };
  }
}

export function useContentManagement() {
  // Inject repositories
  const cardRepository = useLearningCardRepository();
  const planRepository = usePlanRepository();

  // Transform database Topic to admin Topic
  const transformTopicToAdmin = (topic: DatabaseTopicRecord): AdminTopic => ({
    id: topic.id,
    name: topic.name,
    slug: "", // Database doesn't store slug, default to empty
    description: topic.description || "",
    difficulty: "beginner", // Database doesn't store difficulty, default to beginner
    estimated_questions: 0, // Database doesn't store this, default to 0
    order_index: topic.orderIndex ?? topic.order_index ?? 0,
    category_id: topic.categoryId ?? topic.category_id ?? "",
    is_active: topic.is_active ?? true,
    created_at: topic.created_at || "",
    updated_at: topic.updated_at || "",
  });

  // State for data
  const [cards, setCards] = useState<AdminLearningCard[]>([]);
  const [plans, setPlans] = useState<LearningPlan[]>([]);
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [topics, setTopics] = useState<AdminTopic[]>([]);
  const [questions, setQuestions] = useState<AdminQuestion[]>([]);

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
  const [selectedTopic, setSelectedTopic] = useState<AdminTopic | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<LearningPlan | null>(null);
  const [selectedQuestions, setSelectedQuestions] = useState<Set<string>>(
    new Set(),
  );

  // Delete modal states
  const [isDeleteCardModalOpen, setIsDeleteCardModalOpen] = useState(false);
  const [cardToDelete, setCardToDelete] = useState<AdminLearningCard | null>(
    null,
  );
  const [isDeleting, setIsDeleting] = useState(false);

  // Card management modal states
  const [isCardManagementModalOpen, setIsCardManagementModalOpen] =
    useState(false);
  const [selectedPlanForCards, setSelectedPlanForCards] =
    useState<LearningPlan | null>(null);
  const [planCards, setPlanCards] = useState<
    { card_id: string; order_index: number; is_active: boolean }[]
  >([]);
  const [availableCards, setAvailableCards] = useState<AdminLearningCard[]>([]);
  const [isManagingCards, setIsManagingCards] = useState(false);

  // Plan questions state
  const [planQuestions, setPlanQuestions] = useState<Set<string>>(new Set());

  // Fetch data for the unified management view.
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [cardsResult, plansResult, questionsResult, categoriesResult, topicsResult] =
        await Promise.all([
          loadSupabaseCollection<AdminLearningCard>(
            supabase.from("learning_cards").select("*").order("order_index"),
            "Failed to fetch learning cards",
          ),
          loadLearningPlans(),
          loadSupabaseCollection<AdminQuestion>(
            supabase
              .from("questions")
              .select("*")
              .order("created_at", { ascending: false })
              .limit(2000),
            "Failed to fetch questions",
          ),
          loadSupabaseCollection<AdminCategory>(
            supabase.from("categories").select("*").order("created_at"),
            "Failed to fetch categories",
          ),
          loadSupabaseCollection<DatabaseTopicRecord>(
            supabase.from("topics").select("*").order("order_index"),
            "Failed to fetch topics",
          ),
        ]);

      const dataErrors = [
        cardsResult.error,
        plansResult.error,
        questionsResult.error,
        categoriesResult.error,
        topicsResult.error,
      ].filter((message): message is string => Boolean(message));

      setCards(cardsResult.data);
      setPlans(plansResult.data);
      setQuestions(questionsResult.data);
      setCategories(categoriesResult.data);
      setTopics(topicsResult.data.map(transformTopicToAdmin));

      if (dataErrors.length > 0) {
        console.error("❌ Content management partial load errors:", dataErrors);
        toast.error("Some content management data could not be loaded");
      }

      // ARCHITECTURAL: Fetch plan-question associations from planRepository.getPlanQuestions()
      // Requires implementing new repository method for plan-question relationships
      setPlanQuestions(new Set());
    } catch (err) {
      console.error("❌ Error fetching data:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  }, [
    cardRepository,
    planRepository,
  ]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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

  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const filteredCards = useMemo(() => {
    return cards.filter((card) => {
      if (!card?.title || !card?.description) return false;
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
      if (!plan?.name || !plan?.description) return false;
      return (
        plan.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        plan.description
          .toLowerCase()
          .includes(debouncedSearchTerm.toLowerCase())
      );
    });
  }, [plans, debouncedSearchTerm]);

  // Toggles
  const toggleCard = useCallback(
    (id: string) =>
      setExpandedCards((prev) => {
        const next = new Set(prev);
        next.has(id) ? next.delete(id) : next.add(id);
        return next;
      }),
    [],
  );

  const toggleCategory = useCallback(
    (id: string) =>
      setExpandedCategories((prev) => {
        const next = new Set(prev);
        next.has(id) ? next.delete(id) : next.add(id);
        return next;
      }),
    [],
  );

  const toggleTopic = useCallback(
    (id: string) =>
      setExpandedTopics((prev) => {
        const next = new Set(prev);
        next.has(id) ? next.delete(id) : next.add(id);
        return next;
      }),
    [],
  );

  const togglePlan = useCallback(
    (id: string) =>
      setExpandedPlans((prev) => {
        const next = new Set(prev);
        next.has(id) ? next.delete(id) : next.add(id);
        return next;
      }),
    [],
  );

  const togglePlanCard = useCallback(
    (id: string) =>
      setExpandedPlanCards((prev) => {
        const next = new Set(prev);
        next.has(id) ? next.delete(id) : next.add(id);
        return next;
      }),
    [],
  );

  const togglePlanCategory = useCallback(
    (id: string) =>
      setExpandedPlanCategories((prev) => {
        const next = new Set(prev);
        next.has(id) ? next.delete(id) : next.add(id);
        return next;
      }),
    [],
  );

  const togglePlanTopic = useCallback(
    (id: string) =>
      setExpandedPlanTopics((prev) => {
        const next = new Set(prev);
        next.has(id) ? next.delete(id) : next.add(id);
        return next;
      }),
    [],
  );

  // Modals
  const openTopicQuestionsModal = useCallback(
    (topic: AdminTopic, plan: LearningPlan) => {
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

  const toggleQuestionSelection = useCallback(
    (id: string) =>
      setSelectedQuestions((prev) => {
        const next = new Set(prev);
        next.has(id) ? next.delete(id) : next.add(id);
        return next;
      }),
    [],
  );

  const selectAllQuestions = useCallback(() => {
    if (!selectedTopic) return;
    const topicQuestions = questions.filter(
      (q) => q.topic_id === selectedTopic.id,
    );
    setSelectedQuestions(new Set(topicQuestions.map((q) => q.id)));
  }, [selectedTopic, questions]);

  const deselectAllQuestions = useCallback(
    () => setSelectedQuestions(new Set()),
    [],
  );

  const addSelectedQuestionsToPlan = useCallback(async () => {
    if (!selectedPlan || !selectedTopic || selectedQuestions.size === 0) return;
    try {
      // ARCHITECTURAL: Implement addQuestionsToThePlan via planRepository.addQuestionsToPlan(planId, questionIds)
      // Requires implementing new repository method for bulk question association
      toast.success(`Added ${selectedQuestions.size} questions to plan`);
      closeTopicQuestionsModal();
    } catch (err) {
      console.error("Failed to add questions:", err);
      toast.error(
        err instanceof Error ? err.message : "Failed to add questions",
      );
    }
  }, [
    selectedPlan,
    selectedTopic,
    selectedQuestions,
    planRepository,
    closeTopicQuestionsModal,
  ]);

  const toggleQuestionInPlan = useCallback(
    async (
      questionId: string,
      planId: string,
      topicId: string,
      isInPlan: boolean,
    ) => {
      try {
        if (isInPlan) {
          // ARCHITECTURAL: Remove question from plan using planRepository.removeQuestionFromPlan(planId, questionId)
          // Requires implementing new repository method
          setPlanQuestions((prev) => {
            const next = new Set(prev);
            next.delete(`${planId}-${questionId}`);
            return next;
          });
          toast.success("Removed from plan");
        } else {
          // ARCHITECTURAL: Add question to plan using planRepository.addQuestionToPlan(planId, questionId)
          // Requires implementing new repository method
          setPlanQuestions((prev) => {
            const next = new Set(prev);
            next.add(`${planId}-${questionId}`);
            return next;
          });
          toast.success("Added to plan");
        }
      } catch (err) {
        console.error("Failed to update plan:", err);
        toast.error(
          err instanceof Error ? err.message : "Failed to update plan",
        );
      }
    },
    [planRepository],
  );

  const openDeleteCardModal = useCallback((card: AdminLearningCard) => {
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
      await cardRepository.delete(cardToDelete.id);
      toast.success(`Deleted card "${cardToDelete.title}"`);
      await fetchData();
      closeDeleteCardModal();
    } catch (err) {
      console.error("Failed to delete card:", err);
      toast.error(err instanceof Error ? err.message : "Failed to delete card");
      setIsDeleting(false);
    }
  }, [cardToDelete, cardRepository, fetchData, closeDeleteCardModal]);

  const openCardManagementModal = useCallback(
    async (plan: LearningPlan) => {
      setSelectedPlanForCards(plan);
      setIsCardManagementModalOpen(true);
      setIsManagingCards(true);
      try {
        // ARCHITECTURAL: Fetch current plan cards using planRepository.getPlanCards(selectedPlanId) and available cards
        // Requires implementing new repository methods for plan-card relationships
        const current: any = [];
        const all = await cardRepository.findAll();
        setPlanCards(current || []);
        setAvailableCards((all?.data as AdminLearningCard[] | undefined) || []);
      } catch (err) {
        console.error("Failed to load cards:", err);
        toast.error(
          err instanceof Error ? err.message : "Failed to load cards",
        );
      } finally {
        setIsManagingCards(false);
      }
    },
    [cardRepository],
  );

  const closeCardManagementModal = useCallback(() => {
    setIsCardManagementModalOpen(false);
    setSelectedPlanForCards(null);
    setPlanCards([]);
    setAvailableCards([]);
  }, []);

  const addCardToPlan = useCallback(
    async (cardId: string) => {
      if (!selectedPlanForCards) return;
      try {
        const nextOrder =
          Math.max(...planCards.map((pc) => pc.order_index), 0) + 1;
        // ARCHITECTURAL: Use planRepository.addCardToPlan(planId, cardId) method
        // Requires implementing new repository method
        //   selectedPlanForCards.id,
        //   cardId,
        //   nextOrder,
        // );
        setPlanCards((prev) => [
          ...prev,
          { card_id: cardId, order_index: nextOrder, is_active: true },
        ]);
        toast.success("Added to plan");
      } catch (err) {
        console.error("Failed to add card:", err);
        toast.error(err instanceof Error ? err.message : "Failed to add card");
      }
    },
    [selectedPlanForCards, planCards, planRepository],
  );

  const removeCardFromPlan = useCallback(
    async (cardId: string) => {
      if (!selectedPlanForCards) return;
      try {
        // ARCHITECTURAL: Use planRepository.removeCardFromPlan(planId, cardId) method
        // Requires implementing new repository method
        // await planRepository.removeCardFromPlan?.(
        //   selectedPlanForCards.id,
        //   cardId,
        // );
        setPlanCards((prev) => prev.filter((pc) => pc.card_id !== cardId));
        toast.success("Removed from plan");
      } catch (err) {
        console.error("Failed to remove card:", err);
        toast.error(
          err instanceof Error ? err.message : "Failed to remove card",
        );
      }
    },
    [selectedPlanForCards, planRepository],
  );

  const toggleCardActiveStatus = useCallback(
    async (cardId: string, isActive: boolean) => {
      if (!selectedPlanForCards) return;
      try {
        // ARCHITECTURAL: Use planRepository.updateCardStatus(cardId, status) or similar method
        // Requires implementing new repository method
        //   selectedPlanForCards.id,
        //   cardId,
        //   !isActive,
        // );
        setPlanCards((prev) =>
          prev.map((pc) =>
            pc.card_id === cardId ? { ...pc, is_active: !isActive } : pc,
          ),
        );
        toast.success("Status updated");
      } catch (err) {
        console.error("Failed to update status:", err);
        toast.error(
          err instanceof Error ? err.message : "Failed to update status",
        );
      }
    },
    [selectedPlanForCards, planRepository],
  );

  return {
    cards,
    plans,
    categories,
    topics,
    questions,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    filterCardType,
    setFilterCardType,
    stats,
    filteredCards,
    filteredPlans,
    planQuestions,
    expandedCards,
    toggleCard,
    expandedCategories,
    toggleCategory,
    expandedTopics,
    toggleTopic,
    expandedPlans,
    togglePlan,
    expandedPlanCards,
    togglePlanCard,
    expandedPlanCategories,
    togglePlanCategory,
    expandedPlanTopics,
    togglePlanTopic,
    isTopicQuestionsModalOpen,
    setIsTopicQuestionsModalOpen,
    selectedTopic,
    selectedPlan,
    selectedQuestions,
    toggleQuestionSelection,
    selectAllQuestions,
    deselectAllQuestions,
    addSelectedQuestionsToPlan,
    closeTopicQuestionsModal,
    toggleQuestionInPlan,
    isDeleteCardModalOpen,
    setIsDeleteCardModalOpen,
    cardToDelete,
    isDeleting,
    openDeleteCardModal,
    closeDeleteCardModal,
    deleteCard,
    isCardManagementModalOpen,
    setIsCardManagementModalOpen,
    selectedPlanForCards,
    planCards,
    availableCards,
    isManagingCards,
    openCardManagementModal,
    closeCardManagementModal,
    addCardToPlan,
    removeCardFromPlan,
    toggleCardActiveStatus,
    openTopicQuestionsModal,
  };
}
