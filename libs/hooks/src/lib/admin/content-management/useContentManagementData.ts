/**
 * useContentManagementData Hook
 * Handles all data fetching for content management page
 * v1.0
 */

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  useCards,
  usePlans,
  useCategories,
  useTopics,
  useQuestionsUnified,
} from "@elzatona/hooks";

export function useContentManagementData() {
  const queryClient = useQueryClient();

  // Data fetching hooks
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

    const immediateTimer = setTimeout(() => {
      if (cardsLoading && !cardsData) {
        console.log("🔄 Immediate retry for cards");
        queryClient.invalidateQueries({ queryKey: ["cards"] });
      }
      if (plansLoading && !plansData) {
        console.log("🔄 Immediate retry for plans");
        queryClient.invalidateQueries({ queryKey: ["plans"] });
      }
    }, 500);

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
    }, 2000);

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

  // Derived data
  const cards = cardsData?.data || [];
  const plans = plansData?.data || [];
  const categories = categoriesData?.data || [];
  const topics = topicsData?.data || [];
  const questions = questionsData?.data || [];

  // Loading state
  const loading =
    cardsLoading ||
    plansLoading ||
    categoriesLoading ||
    topicsLoading ||
    questionsLoading;

  // Error state
  const hasError =
    cardsError ||
    plansError ||
    categoriesError ||
    topicsError ||
    questionsError;

  return {
    // Data
    cards,
    plans,
    categories,
    topics,
    questions,
    // Loading states
    loading,
    cardsLoading,
    plansLoading,
    categoriesLoading,
    topicsLoading,
    questionsLoading,
    // Error states
    hasError,
    cardsError,
    plansError,
    categoriesError,
    topicsError,
    questionsError,
    // Raw data (for counts)
    cardsData,
    plansData,
    categoriesData,
    topicsData,
    questionsData,
    // Query client for manual invalidation
    queryClient,
  };
}
