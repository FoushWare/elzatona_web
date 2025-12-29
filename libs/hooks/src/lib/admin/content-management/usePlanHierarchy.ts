/**
 * usePlanHierarchy Hook
 * Manages plan hierarchy state and operations
 * v1.0
 */

import { useState, useCallback, useEffect } from "react";
import { type LearningPlan } from "@elzatona/types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PlanHierarchyData = Record<string, any>;

export function usePlanHierarchy(plans: readonly LearningPlan[]) {
  // Hierarchy state
  const [planHierarchy, setPlanHierarchy] = useState<PlanHierarchyData>({});
  const [loadingPlanHierarchy, setLoadingPlanHierarchy] = useState<
    Record<string, boolean>
  >({});
  const [expandedPlans, setExpandedPlans] = useState<Set<string>>(new Set());
  const [expandedPlanCards, setExpandedPlanCards] = useState<Set<string>>(
    new Set(),
  );
  const [expandedPlanCategories, setExpandedPlanCategories] = useState<
    Set<string>
  >(new Set());
  const [expandedPlanTopics, setExpandedPlanTopics] = useState<Set<string>>(
    new Set(),
  );

  // Fetch plan hierarchy
  const fetchPlanHierarchy = useCallback(async (planId: string) => {
    try {
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
      setLoadingPlanHierarchy((prev) => ({ ...prev, [planId]: false }));
    }
  }, []);

  // Toggle functions
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

  // Fetch hierarchy when plan is expanded
  useEffect(() => {
    plans.forEach((plan) => {
      if (expandedPlans.has(plan.id) && !planHierarchy[plan.id]) {
        fetchPlanHierarchy(plan.id);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expandedPlans, plans, fetchPlanHierarchy]);

  return {
    // State
    planHierarchy,
    loadingPlanHierarchy,
    expandedPlans,
    expandedPlanCards,
    expandedPlanCategories,
    expandedPlanTopics,
    // Actions
    fetchPlanHierarchy,
    togglePlan,
    togglePlanCard,
    togglePlanCategory,
    togglePlanTopic,
  };
}
