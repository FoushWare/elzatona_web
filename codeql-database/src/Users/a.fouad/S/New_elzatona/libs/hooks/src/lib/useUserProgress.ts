// v1.0 - User Progress Management Hook
"use client";

import { useState, useEffect, useCallback, useRef } from "react";

import {
  UserProgress,
  QuestionAttempt,
  ChallengeAttempt,
  DashboardStats,
  getUserProgress,
  updateQuestionProgress,
  updateChallengeProgress,
  updateLearningPathProgress,
  updateUserStreak,
  getDashboardStats,
  getContinueWhereLeftOff,
  updateUserPreferences,
} from "./types/supabase-progress";

export interface ContinueData {
  recentPath?: {
    pathId: string;
    pathName: string;
    completedSections: unknown[];
    progress: number;
    lastAccessed: string;
    timeSpent: number;
  };
  recentQuestions: unknown[];
  recentChallenges: unknown[];
  lastActivity: string;
}

export interface UseUserProgressReturn {
  progress: UserProgress | null;
  dashboardStats: DashboardStats | null;
  continueData: ContinueData | null;
  isLoading: boolean;
  error: string | null;
  updateQuestion: (
    attempt: Omit<QuestionAttempt, "timestamp" | "points">,
  ) => Promise<void>;
  updateChallenge: (
    attempt: Omit<ChallengeAttempt, "timestamp" | "points">,
  ) => Promise<void>;
  updateLearningPath: (
    pathId: string,
    pathName: string,
    sectionId: string,
    completed: boolean,
    timeSpent: number,
  ) => Promise<void>;
  updateStreak: () => Promise<void>;
  updatePreferences: (
    preferences: Partial<UserProgress["preferences"]>,
  ) => Promise<void>;
  refreshProgress: () => Promise<void>;
  refreshDashboardStats: () => Promise<void>;
  refreshContinueData: () => Promise<void>;
}

export const useUserProgress = (): UseUserProgressReturn => {
  const [user, setUser] = useState({ uid: "placeholder-user" });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(
    null,
  );
  const [continueData, setContinueData] = useState<ContinueData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isLoadingRef = useRef(false);

  const loadUserProgress = useCallback(async () => {
    if (!user?.uid || isLoadingRef.current) return;

    isLoadingRef.current = true;
    setIsLoading(true);
    setError(null);

    try {
      const userProgress = await getUserProgress(user.uid);
      if (userProgress) {
        setProgress(userProgress);
      } else {
        // If getUserProgress returns null, set error instead of default data
        setError(
          "No user progress data found. Please try refreshing the page.",
        );
        console.warn("No user progress data found for user:", user.uid);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load progress");
      console.error("Error loading user progress:", err);
    } finally {
      setIsLoading(false);
      isLoadingRef.current = false;
    }
  }, [user?.uid]);

  const loadDashboardStats = useCallback(async () => {
    if (!user?.uid) return;

    try {
      const stats = await getDashboardStats(user.uid);
      if (stats) {
        setDashboardStats(stats);
      } else {
        // Don't set default stats - let it remain null
        console.warn("No dashboard stats found for user:", user.uid);
      }
    } catch (err) {
      console.error("Error loading dashboard stats:", err);
      // Don't set default stats on error - let it remain null
    }
  }, [user?.uid]);

  const loadContinueData = useCallback(async () => {
    if (!user?.uid) return;

    try {
      const data = await getContinueWhereLeftOff(user.uid);
      setContinueData(data as ContinueData | null);
    } catch (err) {
      console.error("Error loading continue data:", err);
      setContinueData(null);
    }
  }, [user?.uid]);

  const updateQuestion = useCallback(
    async (attempt: Omit<QuestionAttempt, "timestamp" | "points">) => {
      if (!user?.uid) {
        throw new Error("User not authenticated");
      }

      try {
        await updateQuestionProgress(user.uid, attempt);
        await loadUserProgress();
        await loadDashboardStats();
        await updateUserStreak(user.uid);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to update question progress",
        );
        throw err;
      }
    },
    [user?.uid, loadUserProgress, loadDashboardStats],
  );

  const updateChallenge = useCallback(
    async (attempt: Omit<ChallengeAttempt, "timestamp" | "points">) => {
      if (!user?.uid) {
        throw new Error("User not authenticated");
      }

      try {
        await updateChallengeProgress(user.uid, attempt);
        await loadUserProgress();
        await loadDashboardStats();
        await updateUserStreak(user.uid);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to update challenge progress",
        );
        throw err;
      }
    },
    [user?.uid, loadUserProgress, loadDashboardStats],
  );

  const updateLearningPath = useCallback(
    async (
      pathId: string,
      pathName: string,
      sectionId: string,
      completed: boolean,
      timeSpent: number,
    ) => {
      if (!user?.uid) {
        throw new Error("User not authenticated");
      }

      try {
        await updateLearningPathProgress(
          user.uid,
          pathId,
          pathName,
          sectionId,
          completed,
          timeSpent,
        );
        await loadUserProgress();
        await loadDashboardStats();
        await loadContinueData();
        await updateUserStreak(user.uid);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to update learning path progress",
        );
        throw err;
      }
    },
    [user?.uid, loadUserProgress, loadDashboardStats, loadContinueData],
  );

  const updateStreak = useCallback(async () => {
    if (!user?.uid) {
      throw new Error("User not authenticated");
    }

    try {
      await updateUserStreak(user.uid);
      await loadUserProgress();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update streak");
      throw err;
    }
  }, [user?.uid, loadUserProgress]);

  const updatePreferences = useCallback(
    async (preferences: Partial<UserProgress["preferences"]>) => {
      if (!user?.uid) {
        throw new Error("User not authenticated");
      }

      try {
        await updateUserPreferences(user.uid, preferences);
        await loadUserProgress();
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to update preferences",
        );
        throw err;
      }
    },
    [user?.uid, loadUserProgress],
  );

  const refreshProgress = useCallback(async () => {
    await loadUserProgress();
  }, [loadUserProgress]);

  const refreshDashboardStats = useCallback(async () => {
    await loadDashboardStats();
  }, [loadDashboardStats]);

  const refreshContinueData = useCallback(async () => {
    await loadContinueData();
  }, [loadContinueData]);

  // Load user progress when user changes
  useEffect(() => {
    if (isAuthenticated && user?.uid) {
      loadUserProgress();

      // Add a timeout to prevent infinite loading
      const timeout = setTimeout(() => {
        console.warn("User progress loading timeout - setting default values");
        setIsLoading(false);
        setError("Loading timeout - using default values");
      }, 10000); // 10 second timeout

      return () => clearTimeout(timeout);
    } else {
      setProgress(null);
      setDashboardStats(null);
      setContinueData(null);
    }
  }, [isAuthenticated, user?.uid, loadUserProgress]);

  // Load dashboard stats and continue data when progress is loaded
  useEffect(() => {
    if (progress) {
      loadDashboardStats();
      loadContinueData();
    }
  }, [progress, loadDashboardStats, loadContinueData]);

  return {
    progress,
    dashboardStats,
    continueData,
    isLoading,
    error,
    updateQuestion,
    updateChallenge,
    updateLearningPath,
    updateStreak,
    updatePreferences,
    refreshProgress,
    refreshDashboardStats,
    refreshContinueData,
  };
};
