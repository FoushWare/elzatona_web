"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { LearningPlan, DailyGoal } from "../types";
import { generateDailyGoals } from "../utils/daily-goals";

interface UseActivePlanResult {
  currentPlan: LearningPlan | null;
  dailyGoals: DailyGoal[];
  currentDay: number;
  resumePlan: () => void;
  resetPlan: () => void;
  selectPlan: (plan: LearningPlan) => void;
}

export function useActivePlan(isAuthenticated: boolean): UseActivePlanResult {
  const router = useRouter();
  const [currentPlan, setCurrentPlan] = useState<LearningPlan | null>(null);
  const [dailyGoals, setDailyGoals] = useState<DailyGoal[]>([]);
  const [currentDay, setCurrentDay] = useState(1);

  useEffect(() => {
    if (!isAuthenticated || typeof window === "undefined") return;

    const stored = localStorage.getItem("active-guided-plan");
    if (stored) {
      try {
        const plan = JSON.parse(stored) as LearningPlan;
        setCurrentPlan(plan);
        setDailyGoals(generateDailyGoals(plan));

        // Calculate current day based on start date
        const startDateStr = localStorage.getItem("plan-start-date");
        if (startDateStr) {
          const startDate = new Date(startDateStr);
          const today = new Date();
          const diffTime = Math.abs(today.getTime() - startDate.getTime());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          setCurrentDay(Math.min(diffDays, plan.duration));
        }
      } catch {
        localStorage.removeItem("active-guided-plan");
      }
    }
  }, [isAuthenticated]);

  const resumePlan = useCallback(() => {
    if (currentPlan) {
      router.push(`/guided-practice?plan=${currentPlan.id}`);
    }
  }, [currentPlan, router]);

  const resetPlan = useCallback(() => {
    localStorage.removeItem("active-guided-plan");
    localStorage.removeItem("plan-start-date");
    setCurrentPlan(null);
    setDailyGoals([]);
    setCurrentDay(1);
  }, []);

  const selectPlan = useCallback(
    (plan: LearningPlan) => {
      localStorage.setItem("active-guided-plan", JSON.stringify(plan));
      localStorage.setItem("plan-start-date", new Date().toISOString());
      setCurrentPlan(plan);
      setDailyGoals(generateDailyGoals(plan));
      setCurrentDay(1);
      router.push(`/guided-practice?plan=${plan.id}`);
    },
    [router]
  );

  return {
    currentPlan,
    dailyGoals,
    currentDay,
    resumePlan,
    resetPlan,
    selectPlan,
  };
}
