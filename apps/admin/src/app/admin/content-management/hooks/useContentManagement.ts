"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import { supabase } from "@elzatona/utilities";
import { toast } from "sonner";
import {
  AdminLearningCard,
  LearningPlan,
  AdminCategory,
  Topic,
  AdminQuestion,
  ContentManagementStats,
} from "@elzatona/types";

export function useContentManagement() {
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
        supabase.from("questions").select("*").order("created_at").limit(1000),
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

      const planQuestionsSet = new Set(
        planQuestionsResult.data?.map(
          (pq) => `${pq.plan_id}-${pq.question_id}`,
        ) || [],
      );
      setPlanQuestions(planQuestionsSet);
    } catch (err) {
      console.error("❌ Error fetching data:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  }, []);

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
      if (!card || !card.title || !card.description) return false;
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
      if (!plan || !plan.name || !plan.description) return false;
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
      const inserts = Array.from(selectedQuestions).map((id) => ({
        plan_id: selectedPlan.id,
        question_id: id,
        topic_id: selectedTopic.id,
        is_active: true,
      }));
      const { error } = await supabase.from("plan_questions").insert(inserts);
      if (error) throw error;
      setPlanQuestions((prev) => {
        const next = new Set(prev);
        selectedQuestions.forEach((id) => next.add(`${selectedPlan.id}-${id}`));
        return next;
      });
      toast.success(`Added ${selectedQuestions.size} questions to plan`);
      closeTopicQuestionsModal();
    } catch (err) {
      toast.error("Failed to add questions");
    }
  }, [
    selectedPlan,
    selectedTopic,
    selectedQuestions,
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
          const { error } = await supabase
            .from("plan_questions")
            .delete()
            .eq("plan_id", planId)
            .eq("question_id", questionId);
          if (error) throw error;
          setPlanQuestions((prev) => {
            const next = new Set(prev);
            next.delete(`${planId}-${questionId}`);
            return next;
          });
          toast.success("Removed from plan");
        } else {
          const { error } = await supabase.from("plan_questions").insert({
            plan_id: planId,
            question_id: questionId,
            topic_id: topicId,
            is_active: true,
          });
          if (error) throw error;
          setPlanQuestions((prev) => {
            const next = new Set(prev);
            next.add(`${planId}-${questionId}`);
            return next;
          });
          toast.success("Added to plan");
        }
      } catch (err) {
        toast.error("Failed to update plan");
      }
    },
    [],
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
      const { error } = await supabase
        .from("learning_cards")
        .delete()
        .eq("id", cardToDelete.id);
      if (error) throw error;
      toast.success(`Deleted card "${cardToDelete.title}"`);
      await fetchData();
      closeDeleteCardModal();
    } catch (err) {
      toast.error("Failed to delete card");
      setIsDeleting(false);
    }
  }, [cardToDelete, fetchData, closeDeleteCardModal]);

  const openCardManagementModal = useCallback(async (plan: LearningPlan) => {
    setSelectedPlanForCards(plan);
    setIsCardManagementModalOpen(true);
    setIsManagingCards(true);
    try {
      const [{ data: current }, { data: all }] = await Promise.all([
        supabase
          .from("plan_cards")
          .select("card_id, order_index, is_active")
          .eq("plan_id", plan.id)
          .order("order_index"),
        supabase
          .from("learning_cards")
          .select("*")
          .eq("is_active", true)
          .order("title"),
      ]);
      setPlanCards(current || []);
      setAvailableCards(all || []);
    } catch (err) {
      toast.error("Failed to load cards");
    } finally {
      setIsManagingCards(false);
    }
  }, []);

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
        const { error } = await supabase.from("plan_cards").insert({
          plan_id: selectedPlanForCards.id,
          card_id: cardId,
          order_index: nextOrder,
          is_active: true,
        });
        if (error) throw error;
        setPlanCards((prev) => [
          ...prev,
          { card_id: cardId, order_index: nextOrder, is_active: true },
        ]);
        toast.success("Added to plan");
      } catch (err) {
        toast.error("Failed to add card");
      }
    },
    [selectedPlanForCards, planCards],
  );

  const removeCardFromPlan = useCallback(
    async (cardId: string) => {
      if (!selectedPlanForCards) return;
      try {
        const { error } = await supabase
          .from("plan_cards")
          .delete()
          .eq("plan_id", selectedPlanForCards.id)
          .eq("card_id", cardId);
        if (error) throw error;
        setPlanCards((prev) => prev.filter((pc) => pc.card_id !== cardId));
        toast.success("Removed from plan");
      } catch (err) {
        toast.error("Failed to remove card");
      }
    },
    [selectedPlanForCards],
  );

  const toggleCardActiveStatus = useCallback(
    async (cardId: string, isActive: boolean) => {
      if (!selectedPlanForCards) return;
      try {
        const { error } = await supabase
          .from("plan_cards")
          .update({ is_active: !isActive })
          .eq("plan_id", selectedPlanForCards.id)
          .eq("card_id", cardId);
        if (error) throw error;
        setPlanCards((prev) =>
          prev.map((pc) =>
            pc.card_id === cardId ? { ...pc, is_active: !isActive } : pc,
          ),
        );
        toast.success("Status updated");
      } catch (err) {
        toast.error("Failed to update status");
      }
    },
    [selectedPlanForCards],
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
