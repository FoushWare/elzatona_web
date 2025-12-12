import { useState, useEffect, useCallback } from "react";

interface ProgressData {
  userId: string;
  sessionId: string;
  question_id: string;
  answer: number;
  isCorrect: boolean;
  timeSpent: number;
  section: string;
  difficulty: string;
  timestamp: number;
  learningMode: "guided" | "free-style";
  planId?: string;
}

interface ProgressSummary {
  userId: string;
  totalQuestions: number;
  correctAnswers: number;
  accuracy: number;
  timeSpent: number;
  lastActivity: string;
  currentPlan?: {
    plan_id: string;
    questionsCompleted: number;
    totalQuestions: number;
    progress: number;
  };
}

interface UseSecureProgressReturn {
  progress: ProgressSummary | null;
  isLoading: boolean;
  error: string | null;
  saveProgress: (data: Omit<ProgressData, "userId">) => Promise<boolean>;
  syncProgress: () => Promise<void>;
  clearLocalCache: () => void;
}

export function useSecureProgress(): UseSecureProgressReturn {
  const [user, setUser] = useState({ uid: "placeholder-user" });
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [progress, setProgress] = useState<ProgressSummary | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Generate a unique session ID for this session
  const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  // Load progress from localStorage cache on mount
  useEffect(() => {
    if (isAuthenticated && user) {
      loadCachedProgress();
    }
  }, [isAuthenticated, user]);

  const loadCachedProgress = useCallback(() => {
    try {
      const cachedProgress = localStorage.getItem(`progress_${user?.uid}`);
      if (cachedProgress) {
        const parsed = JSON.parse(cachedProgress);
        // Check if cache is not too old (24 hours)
        const cacheAge = Date.now() - parsed.cachedAt;
        if (cacheAge < 24 * 60 * 60 * 1000) {
          setProgress(parsed.data);
        }
      }
    } catch (error) {
      console.error("Error loading cached progress:", error);
    }
  }, [user?.uid]);

  const saveProgress = useCallback(
    async (data: Omit<ProgressData, "userId">): Promise<boolean> => {
      if (!isAuthenticated || !user) {
        console.log("⚠️ User not authenticated, skipping progress save");
        return false;
      }

      setIsLoading(true);
      setError(null);

      try {
        const progressData: ProgressData = {
          ...data,
          userId: user.uid,
          sessionId: `session_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`,
        };

        // Save to server
        const response = await fetch("/api/progress/save", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(progressData),
          credentials: "include", // Include cookies
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("❌ Progress save failed:", {
            status: response.status,
            statusText: response.statusText,
            errorData,
            url: "/api/progress/save",
          });

          // If it's an authentication error, try to set the cookie again
          if (
            errorData.error === "Authentication required" ||
            errorData.error === "Invalid authentication token"
          ) {
            console.warn(
              "Authentication cookie not set, trying to set it again...",
            );

            // Try to get a fresh token and set the cookie
            try {
              if (!firebaseUser) {
                throw new Error("No Firebase user available for token refresh");
              }
              const { cookieManager } = await import("./types/cookie-manager");
              const success = await cookieManager.retryAuthCookie(firebaseUser);
              if (success) {
                console.log(
                  "✅ Auth cookie set successfully, retrying progress save...",
                );

                // Retry the request
                const retryResponse = await fetch("/api/progress/save", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(progressData),
                  credentials: "include",
                });

                if (retryResponse.ok) {
                  await retryResponse.json();
                  console.log("✅ Progress saved successfully after retry");

                  // Update local cache
                  updateLocalCache(progressData);
                  return true;
                }
              }
            } catch (retryError) {
              console.warn(
                "Retry failed, continuing with local storage only:",
                retryError,
              );
            }
          }

          console.error(
            "❌ Progress save failed:",
            errorData.error || "Failed to save progress",
          );
          setError(errorData.error || "Failed to save progress");
          return false;
        }

        const result = await response.json();

        // Check if we're in development mode
        if (result.warning) {
          console.warn("Development mode:", result.warning);
        }

        // Update local cache
        updateLocalCache(progressData);

        // Sync with server to get updated progress
        await syncProgress();

        return true;
      } catch (error) {
        console.error("Error saving progress:", error);
        setError(
          error instanceof Error ? error.message : "Failed to save progress",
        );

        // Still save to localStorage as backup
        updateLocalCache({ ...data, userId: user.uid });

        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [isAuthenticated, user],
  );

  const updateLocalCache = useCallback(
    (progressData: ProgressData) => {
      try {
        const cacheKey = `progress_${user?.uid}`;
        const existingCache = localStorage.getItem(cacheKey);
        const cachedData = existingCache
          ? JSON.parse(existingCache)
          : { data: null, cachedAt: Date.now() };

        // Update the cached progress data
        if (!cachedData.data) {
          cachedData.data = {
            userId: user?.uid,
            totalQuestions: 0,
            correctAnswers: 0,
            accuracy: 0,
            timeSpent: 0,
            lastActivity: new Date().toISOString(),
          };
        }

        // Update counters
        cachedData.data.totalQuestions += 1;
        if (progressData.isCorrect) {
          cachedData.data.correctAnswers += 1;
        }
        cachedData.data.timeSpent += progressData.timeSpent;
        cachedData.data.accuracy = Math.round(
          (cachedData.data.correctAnswers / cachedData.data.totalQuestions) *
            100,
        );
        cachedData.data.lastActivity = new Date().toISOString();

        // Update plan progress if guided mode
        if (progressData.learningMode === "guided" && progressData.planId) {
          if (
            !cachedData.data.currentPlan ||
            cachedData.data.currentPlan.planId !== progressData.planId
          ) {
            cachedData.data.currentPlan = {
              plan_id: progressData.planId,
              questionsCompleted: 0,
              totalQuestions: 5, // From our testing setup
              progress: 0,
            };
          }
          cachedData.data.currentPlan.questionsCompleted += 1;
          cachedData.data.currentPlan.progress = Math.round(
            (cachedData.data.currentPlan.questionsCompleted /
              cachedData.data.currentPlan.totalQuestions) *
              100,
          );
        }

        cachedData.cachedAt = Date.now();
        localStorage.setItem(cacheKey, JSON.stringify(cachedData));
        setProgress(cachedData.data);
      } catch (error) {
        console.error("Error updating local cache:", error);
      }
    },
    [user?.uid],
  );

  const syncProgress = useCallback(async (): Promise<void> => {
    if (!isAuthenticated || !user) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/progress/get", {
        method: "GET",
        credentials: "include", // Include cookies
      });

      if (!response.ok) {
        try {
          const errorData = await response.json();
          console.warn(
            "Progress fetch failed, but continuing with local cache:",
            errorData,
          );
          // Don't throw error, just return early and use local cache
          return;
        } catch (parseError_) {
          console.warn(
            "Failed to parse error response, continuing with local cache",
            parseError_,
          );
          return;
        }
      }

      const result = await response.json();

      // Check if we're in development mode
      if (result.warning) {
        console.warn("Development mode:", result.warning);
      }

      if (result.success && result.progress) {
        // Update both state and localStorage cache
        const cacheData = {
          data: result.progress,
          cachedAt: Date.now(),
        };

        localStorage.setItem(`progress_${user.uid}`, JSON.stringify(cacheData));
        setProgress(result.progress);
      }
    } catch (error) {
      console.error("Error syncing progress:", error);
      setError(
        error instanceof Error ? error.message : "Failed to sync progress",
      );
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, user]);

  const clearLocalCache = useCallback(() => {
    if (user?.uid) {
      localStorage.removeItem(`progress_${user.uid}`);
      setProgress(null);
    }
  }, [user?.uid]);

  return {
    progress,
    isLoading,
    error,
    saveProgress,
    syncProgress,
    clearLocalCache,
  };
}
