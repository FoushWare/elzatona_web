"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { supabase } from "@elzatona/utilities";
import { toast } from "sonner";
import {
  AdminLearningCard,
  AdminCategory,
  Topic,
  AdminQuestion,
  ContentManagementStats,
} from "@elzatona/types";

export function useLearningCards() {
  const [cards, setCards] = useState<AdminLearningCard[]>([]);
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [questions, setQuestions] = useState<AdminQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // UI state for hierarchy expansion
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(),
  );
  const [expandedTopics, setExpandedTopics] = useState<Set<string>>(new Set());

  const extractArray = <T>(payload: unknown): T[] => {
    if (!payload || typeof payload !== "object") return [];

    const data = (payload as { data?: unknown }).data;
    if (Array.isArray(data)) return data as T[];

    if (data && typeof data === "object") {
      const nestedData = (data as { data?: unknown }).data;
      if (Array.isArray(nestedData)) return nestedData as T[];
      const nestedItems = (data as { items?: unknown }).items;
      if (Array.isArray(nestedItems)) return nestedItems as T[];
    }

    const items = (payload as { items?: unknown }).items;
    return Array.isArray(items) ? (items as T[]) : [];
  };

  const loadApiCollection = useCallback(
    async <T>(endpoint: string, fallbackMessage: string) => {
      try {
        const response = await fetch(endpoint, {
          method: "GET",
          credentials: "same-origin",
          cache: "no-store",
          headers: {
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          return {
            data: [] as T[],
            error: `${fallbackMessage} (HTTP ${response.status})`,
          };
        }

        const payload = (await response.json()) as {
          success?: boolean;
          error?: string;
          message?: string;
          data?: unknown;
        };

        if (payload.success === false) {
          return {
            data: [] as T[],
            error: payload.error ?? payload.message ?? fallbackMessage,
          };
        }

        return {
          data: extractArray<T>(payload),
          error: null as string | null,
        };
      } catch (error) {
        return {
          data: [] as T[],
          error: error instanceof Error ? error.message : fallbackMessage,
        };
      }
    },
    [],
  );

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [cardsRes, categoriesRes, topicsRes, questionsRes] =
        await Promise.all([
          loadApiCollection<AdminLearningCard>(
            "/api/cards",
            "Failed to fetch learning cards",
          ),
          loadApiCollection<AdminCategory>(
            "/api/categories",
            "Failed to fetch categories",
          ),
          loadApiCollection<Topic>("/api/topics", "Failed to fetch topics"),
          loadApiCollection<AdminQuestion>(
            "/api/questions/unified?page=1&pageSize=2000&includePagination=false",
            "Failed to fetch questions",
          ),
        ]);

      const dataErrors = [
        cardsRes.error,
        categoriesRes.error,
        topicsRes.error,
        questionsRes.error,
      ].filter((msg): msg is string => Boolean(msg));

      setCards(cardsRes.data);
      setCategories(categoriesRes.data);
      setTopics(topicsRes.data);
      setQuestions(questionsRes.data);

      if (dataErrors.length > 0) {
        console.error("❌ Learning cards partial load errors:", dataErrors);
        setError(dataErrors[0]);
        toast.error("Failed to load learning cards data");
      }
    } catch (err: unknown) {
      const errorObj = err as Error;
      console.error("Error fetching learning cards data:", errorObj);
      setError(errorObj.message);
      toast.error("Failed to load learning cards data");
    } finally {
      setLoading(false);
    }
  }, [loadApiCollection]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const stats = useMemo((): ContentManagementStats => {
    return {
      totalCards: cards.length,
      totalPlans: 0, // Not managing plans in this specific view
      totalCategories: categories.length,
      totalTopics: topics.length,
      totalQuestions: questions.length,
    };
  }, [cards, categories, topics, questions]);

  // Expansion Toggles
  const toggleCard = (id: string) => {
    setExpandedCards((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleCategory = (id: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleTopic = (id: string) => {
    setExpandedTopics((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Mutation Handlers
  const createCard = async (data: Partial<AdminLearningCard>) => {
    try {
      const { data: newCard, error } = await supabase
        .from("learning_cards")
        .insert([data])
        .select()
        .single();

      if (error) throw error;
      setCards((prev) => [...prev, newCard]);
      toast.success("Learning card created successfully");
      return newCard;
    } catch (err: unknown) {
      const errorObj = err as Error;
      toast.error(errorObj.message || "Failed to create card");
      return null;
    }
  };

  const updateCard = async (id: string, data: Partial<AdminLearningCard>) => {
    try {
      const { data: updatedCard, error } = await supabase
        .from("learning_cards")
        .update(data)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      setCards((prev) => prev.map((c) => (c.id === id ? updatedCard : c)));
      toast.success("Learning card updated successfully");
      return updatedCard;
    } catch (err: unknown) {
      const errorObj = err as Error;
      toast.error(errorObj.message || "Failed to update card");
      return null;
    }
  };

  const deleteCard = async (id: string) => {
    try {
      const { error } = await supabase
        .from("learning_cards")
        .delete()
        .eq("id", id);
      if (error) throw error;

      setCards((prev) => prev.filter((c) => c.id !== id));
      toast.success("Learning card deleted successfully");
      return true;
    } catch (err: unknown) {
      const errorObj = err as Error;
      toast.error(errorObj.message || "Failed to delete card");
      return false;
    }
  };

  return {
    cards,
    categories,
    topics,
    questions,
    stats,
    loading,
    error,
    expandedCards,
    toggleCard,
    expandedCategories,
    toggleCategory,
    expandedTopics,
    toggleTopic,
    createCard,
    updateCard,
    deleteCard,
    refresh: fetchData,
  };
}
