/**
 * useContentManagementState Hook
 * Manages all UI state for content management page
 * v1.0
 */

import { useState, useMemo, useCallback, useEffect } from "react";
import {
  LearningCard,
  UnifiedQuestion,
  type LearningPlan,
  type Category,
  type Topic,
} from "@elzatona/types";

export function useContentManagementState(
  categories: readonly Category[],
  topics: readonly Topic[],
  questions: readonly UnifiedQuestion[],
  allCards: readonly LearningCard[],
  allPlans: readonly LearningPlan[],
) {
  // Search and filter state
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCardType, setFilterCardType] = useState("all");
  const [categorySearch, setCategorySearch] = useState("");
  const [topicSearch, setTopicSearch] = useState("");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<
    string | null
  >(null);

  // Expanded state
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(),
  );
  const [expandedTopics, setExpandedTopics] = useState<Set<string>>(new Set());
  const [expandedPlans, setExpandedPlans] = useState<Set<string>>(new Set());

  // Collapsible state
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isTopicsOpen, setIsTopicsOpen] = useState(false);

  // Questions by topic
  const questionsByTopic = useMemo(() => {
    const grouped: Record<
      string,
      { id: string; title: string; difficulty: string; type: string }[]
    > = {};
    questions.forEach((question) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  // Filtered categories and topics
  const filteredCategories = useMemo(() => {
    if (!categorySearch.trim()) return categories;
    const searchLower = categorySearch.toLowerCase();
    return categories.filter((category) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const cat = category as any;
      return (
        (cat.name || "").toLowerCase().includes(searchLower) ||
        (cat.description || "").toLowerCase().includes(searchLower)
      );
    });
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

  // Debounced search
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Filtered cards and plans
  const filteredCards = useMemo(() => {
    return allCards.filter((card) => {
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
  }, [allCards, debouncedSearchTerm, filterCardType]);

  const filteredPlans = useMemo(() => {
    return allPlans.filter((plan) => {
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
  }, [allPlans, debouncedSearchTerm]);

  // Toggle functions
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

  return {
    // Search and filter
    searchTerm,
    setSearchTerm,
    debouncedSearchTerm,
    setDebouncedSearchTerm,
    filterCardType,
    setFilterCardType,
    categorySearch,
    setCategorySearch,
    topicSearch,
    setTopicSearch,
    selectedCategoryFilter,
    setSelectedCategoryFilter,
    // Expanded state
    expandedCards,
    expandedCategories,
    expandedTopics,
    expandedPlans,
    toggleCard,
    toggleCategory,
    toggleTopic,
    togglePlan,
    // Collapsible
    isCategoriesOpen,
    setIsCategoriesOpen,
    isTopicsOpen,
    setIsTopicsOpen,
    // Filtered data
    filteredCategories,
    filteredTopics,
    questionsByTopic,
    filteredCards,
    filteredPlans,
  };
}
