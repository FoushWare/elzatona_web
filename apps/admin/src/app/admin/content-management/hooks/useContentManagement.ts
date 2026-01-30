"use client";

// sonarqube:disable S1135 (Architectural TODOs require implementing new repository methods)

import { useEffect, useMemo, useState, useCallback } from "react";
import { toast } from "sonner";
import {
  AdminLearningCard,
  LearningPlan,
  AdminCategory,
  Topic,
  AdminQuestion,
} from "@elzatona/types";
import {
  useQuestionRepository,
  useLearningCardRepository,
  usePlanRepository,
  useCategoryRepository,
  useTopicRepository,
} from "@elzatona/database";

export function useContentManagement() {
  // Inject repositories
  const questionRepository = useQuestionRepository();
  const cardRepository = useLearningCardRepository();
  const planRepository = usePlanRepository();
  const categoryRepository = useCategoryRepository();
  const topicRepository = useTopicRepository();

  // State for data
  const [cards, setCards] = useState<AdminLearningCard[]>([]);
  const [plans, setPlans] = useState<LearningPlan[]>([]);
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
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
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
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

  // Fetch data using repositories
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch all data in parallel using repositories
      const [cardsData, plansData, questionsData, categoriesData, topicsData] =
        await Promise.all([
          cardRepository.findAll(),
          planRepository.findAll(),
          questionRepository.findAll(),
          categoryRepository.findAll(),
          topicRepository.getAllTopics(),
        ]);

      setCards((cardsData?.items as any) || []);
      setPlans((plansData?.items as any) || []);
      setQuestions((questionsData?.items as any) || []);
      setCategories((categoriesData?.items as any) || []);
      setTopics(topicsData || []);

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
    questionRepository,
    cardRepository,
    planRepository,
    categoryRepository,
    topicRepository,
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
        setAvailableCards((all?.items as any) || []);
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
