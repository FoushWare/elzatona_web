"use client";

// v1.0
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { supabaseClient } from "../lib/supabase-client";

export type LearningType = "guided" | "free-style" | "custom";

type LearningTypeContextValue = {
  learningType: LearningType;
  setLearningType: (type: LearningType) => void;
  solvedQuestionIds: string[];
  addSolvedQuestion: (questionId: string) => void;
  clearSolvedQuestions: () => void;
  userId: string | null;
};

const LearningTypeContext = createContext<LearningTypeContextValue | undefined>(
  undefined,
);

const BASE_KEY = "learning-preferences";

function buildStorageKey(userId: string | null, suffix: string) {
  const scope = userId ? `${BASE_KEY}:${userId}` : BASE_KEY;
  return `${scope}:${suffix}`;
}

export function LearningTypeProvider({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  const [userId, setUserId] = useState<string | null>(null);
  const initializedRef = useRef(false);

  // Initialize learning type from localStorage on mount (before auth check)
  const getInitialLearningType = (): LearningType => {
    // Always return default during SSR - actual value will be loaded in useEffect
    if (typeof globalThis.window === "undefined") return "guided";
    try {
      // First try universal key (works for logged out users)
      const universalTypeKey = buildStorageKey(null, "type");
      const universalType = globalThis.window?.localStorage?.getItem(universalTypeKey);
      if (
        universalType === "guided" ||
        universalType === "free-style" ||
        universalType === "custom"
      ) {
        return universalType;
      }
    } catch (error_) {
      // Silently fail during initialization
      console.debug("Failed to load initial learning type:", error_);
    }
    return "guided";
  };

  const [learningType, setLearningTypeState] = useState<LearningType>(
    getInitialLearningType(),
  );
  const [solvedQuestionIds, setSolvedQuestionIds] = useState<string[]>([]);

  // Load user and persist on auth changes
  useEffect(() => {
    let mounted = true;
    const init = async () => {
      try {
        if (!supabaseClient) return;
        const { data } = await supabaseClient.auth.getUser();
        if (!mounted) return;
        const newUserId = data.user?.id ?? null;
        setUserId(newUserId);

        // When userId changes (including logout), reload learning type from appropriate storage
        const universalTypeKey = buildStorageKey(null, "type");
        const userTypeKey = buildStorageKey(newUserId, "type");
        const keyToLoad = newUserId ? userTypeKey : universalTypeKey;

        try {
          if (globalThis.window !== undefined && globalThis.window.localStorage) {
            const rawType = globalThis.window.localStorage.getItem(keyToLoad);
            if (
              rawType === "guided" ||
              rawType === "free-style" ||
              rawType === "custom"
            ) {
              setLearningTypeState(rawType);
            }
          }
        } catch (error_) {
          // Silently fail when loading learning type
          console.error("Failed to load learning type:", error_);
        }
      } catch (_) {
        setUserId(null);
        // Load from universal key when logged out
        try {
          if (globalThis.window !== undefined && globalThis.window.localStorage) {
            const universalTypeKey = buildStorageKey(null, "type");
            const rawType = globalThis.window.localStorage.getItem(universalTypeKey);
            if (
              rawType === "guided" ||
              rawType === "free-style" ||
              rawType === "custom"
            ) {
              setLearningTypeState(rawType);
            }
          }
        } catch (error_) {
          // Silently fail when loading learning type
          console.error("Failed to load learning type:", error_);
        }
      }
    };
    init();
    if (!supabaseClient) {
      return () => {
        mounted = false;
      };
    }
    const { data: sub } = supabaseClient.auth.onAuthStateChange(
      (_event, session) => {
        const newUserId = session?.user?.id ?? null;
        setUserId(newUserId);

        // Reload learning type when auth state changes
        const universalTypeKey = buildStorageKey(null, "type");
        const userTypeKey = buildStorageKey(newUserId, "type");
        const keyToLoad = newUserId ? userTypeKey : universalTypeKey;

        try {
          if (globalThis.window !== undefined && globalThis.window.localStorage) {
            const rawType = globalThis.window.localStorage.getItem(keyToLoad);
            if (
              rawType === "guided" ||
              rawType === "free-style" ||
              rawType === "custom"
            ) {
              setLearningTypeState(rawType);
            }
          }
        } catch (error_) {
          // Silently fail when loading learning type
          console.error("Failed to load learning type:", error_);
        }
      },
    );
    return () => {
      mounted = false;
      sub.subscription?.unsubscribe();
    };
  }, []);

  // Load from storage when userId known (or at first run)
  useEffect(() => {
    const typeKey = buildStorageKey(userId, "type");
    const universalTypeKey = buildStorageKey(null, "type"); // Universal key that persists across logout
    const solvedKey = buildStorageKey(userId, "solved");
    try {
      // Priority: userId-specific key (if logged in) > universal key (if logged out)
      let rawType: string | null = null;

      if (globalThis.window !== undefined && globalThis.window.localStorage) {
        if (userId) {
          // When logged in, try user-specific key first, fallback to universal
          rawType =
            globalThis.window.localStorage.getItem(typeKey) ||
            globalThis.window.localStorage.getItem(universalTypeKey);
        } else {
          // When logged out, use universal key
          rawType = globalThis.window.localStorage.getItem(universalTypeKey);
        }
      }

      if (
        rawType === "guided" ||
        rawType === "free-style" ||
        rawType === "custom"
      ) {
        setLearningTypeState(rawType);
      }
      const rawSolved =
        typeof globalThis.window !== "undefined" && globalThis.window.localStorage
          ? globalThis.window.localStorage.getItem(solvedKey)
          : null;
      if (rawSolved) {
        const parsed = JSON.parse(rawSolved);
        if (Array.isArray(parsed))
          setSolvedQuestionIds(parsed.filter((x) => typeof x === "string"));
      }
    } catch (error_) {
      // Silently fail when loading learning type
      console.debug("Failed to load learning type:", error_);
    } finally {
      initializedRef.current = true;
    }
  }, [userId]);

  // Persist changes - save to both userId-specific and universal key
  useEffect(() => {
    if (!initializedRef.current) return;
    try {
      const typeKey = buildStorageKey(userId, "type");
      const universalTypeKey = buildStorageKey(null, "type"); // Universal key that persists across logout

      if (typeof globalThis.window !== "undefined" && globalThis.window.localStorage) {
        // Save to userId-specific key if logged in
        if (userId) {
          globalThis.window.localStorage.setItem(typeKey, learningType);
        }

        // Always save to universal key so it persists after logout
        globalThis.window.localStorage.setItem(universalTypeKey, learningType);
      }
    } catch (error_) {
      // Silently fail when saving learning type
      console.debug("Failed to save learning type:", error_);
    }
  }, [learningType, userId]);

  useEffect(() => {
    if (!initializedRef.current) return;
    try {
      if (typeof globalThis.window !== "undefined" && globalThis.window.localStorage) {
        const solvedKey = buildStorageKey(userId, "solved");
        globalThis.window.localStorage.setItem(
          solvedKey,
          JSON.stringify(solvedQuestionIds),
        );
      }
    } catch (error_) {
      // Silently fail when saving solved questions
      console.debug("Failed to save solved questions:", error_);
    }
  }, [solvedQuestionIds, userId]);

  const setLearningType = useCallback((type: LearningType) => {
    setLearningTypeState(type);
    // Optionally sync preference to API here in future
  }, []);

  const addSolvedQuestion = useCallback((questionId: string) => {
    setSolvedQuestionIds((prev) =>
      prev.includes(questionId) ? prev : [...prev, questionId],
    );
  }, []);

  const clearSolvedQuestions = useCallback(() => {
    setSolvedQuestionIds([]);
  }, []);

  const value = useMemo(
    () => ({
      learningType,
      setLearningType,
      solvedQuestionIds,
      addSolvedQuestion,
      clearSolvedQuestions,
      userId,
    }),
    [
      learningType,
      setLearningType,
      solvedQuestionIds,
      addSolvedQuestion,
      clearSolvedQuestions,
      userId,
    ],
  );

  return (
    <LearningTypeContext.Provider value={value}>
      {children}
    </LearningTypeContext.Provider>
  );
}

export function useLearningType() {
  const ctx = useContext(LearningTypeContext);
  if (!ctx)
    throw new Error("useLearningType must be used within LearningTypeProvider");
  return ctx;
}
