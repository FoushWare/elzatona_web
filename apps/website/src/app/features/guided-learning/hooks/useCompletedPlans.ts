"use client";

import { useState, useEffect } from "react";

interface UseCompletedPlansResult {
  completedPlans: Set<string>;
  planGrades: Map<string, number>;
}

export function useCompletedPlans(): UseCompletedPlansResult {
  const [completedPlans, setCompletedPlans] = useState<Set<string>>(new Set());
  const [planGrades, setPlanGrades] = useState<Map<string, number>>(new Map());

  useEffect(() => {
    if (typeof window === "undefined") return;

    const completedData = localStorage.getItem("completed-guided-plans");
    if (completedData) {
      try {
        setCompletedPlans(new Set(JSON.parse(completedData)));
      } catch {
        // Invalid data
      }
    }

    const gradesData = localStorage.getItem("plan-grades");
    if (gradesData) {
      try {
        const parsed = JSON.parse(gradesData);
        setPlanGrades(new Map(Object.entries(parsed)));
      } catch {
        // Invalid data
      }
    }
  }, []);

  return { completedPlans, planGrades };
}
