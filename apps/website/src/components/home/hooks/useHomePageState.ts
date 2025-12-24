"use client";

import { useState, useEffect } from "react";
import type { UserType, ActivePlan } from "@/types/homePage.types";
import { parseActivePlan } from "@/lib/utils/homePageHelpers";
import { LOCAL_STORAGE_KEYS, ANIMATION_DELAYS } from "@/lib/constants/homePage.constants";

interface UseHomePageStateReturn {
  hasActivePlan: boolean;
  activePlan: ActivePlan | null;
  showAnimation: boolean;
}

/**
 * Custom hook for managing home page state
 */
export function useHomePageState(userType: UserType): UseHomePageStateReturn {
  const [hasActivePlan, setHasActivePlan] = useState(false);
  const [activePlan, setActivePlan] = useState<ActivePlan | null>(null);
  const [showAnimation, setShowAnimation] = useState(false);

  // Trigger animation on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnimation(true);
    }, ANIMATION_DELAYS.INITIAL);
    return () => clearTimeout(timer);
  }, []);

  // Check for active guided learning plan
  useEffect(() => {
    if (userType === "guided" && typeof window !== "undefined") {
      const activePlanData = window.localStorage.getItem(
        LOCAL_STORAGE_KEYS.ACTIVE_GUIDED_PLAN
      );
      const parsedPlan = parseActivePlan(activePlanData);
      
      if (parsedPlan) {
        setActivePlan(parsedPlan);
        setHasActivePlan(true);
      } else {
        setActivePlan(null);
        setHasActivePlan(false);
        // Clean up invalid data
        if (activePlanData) {
          window.localStorage.removeItem(LOCAL_STORAGE_KEYS.ACTIVE_GUIDED_PLAN);
        }
      }
    } else {
      setActivePlan(null);
      setHasActivePlan(false);
    }
  }, [userType]);

  return {
    hasActivePlan,
    activePlan,
    showAnimation,
  };
}

