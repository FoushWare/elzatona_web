'use client';

// v1.0
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { supabaseClient } from '@/app/../src/lib/supabase-client';

export type LearningType = 'guided' | 'free-style' | 'custom';

type LearningTypeContextValue = {
  learningType: LearningType;
  setLearningType: (type: LearningType) => void;
  solvedQuestionIds: string[];
  addSolvedQuestion: (questionId: string) => void;
  clearSolvedQuestions: () => void;
  userId: string | null;
};

const LearningTypeContext = createContext<LearningTypeContextValue | undefined>(
  undefined
);

const BASE_KEY = 'learning-preferences';

function buildStorageKey(userId: string | null, suffix: string) {
  const scope = userId ? `${BASE_KEY}:${userId}` : BASE_KEY;
  return `${scope}:${suffix}`;
}

export function LearningTypeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userId, setUserId] = useState<string | null>(null);
  const initializedRef = useRef(false);

  const [learningType, setLearningTypeState] = useState<LearningType>('guided');
  const [solvedQuestionIds, setSolvedQuestionIds] = useState<string[]>([]);

  // Load user and persist on auth changes
  useEffect(() => {
    let mounted = true;
    const init = async () => {
      try {
        const { data } = await supabaseClient.auth.getUser();
        if (!mounted) return;
        setUserId(data.user?.id ?? null);
      } catch (_) {
        setUserId(null);
      }
    };
    init();
    const { data: sub } = supabaseClient.auth.onAuthStateChange(
      (_event, session) => {
        setUserId(session?.user?.id ?? null);
      }
    );
    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  // Load from storage when userId known (or at first run)
  useEffect(() => {
    const typeKey = buildStorageKey(userId, 'type');
    const solvedKey = buildStorageKey(userId, 'solved');
    try {
      const rawType =
        typeof window !== 'undefined'
          ? window.localStorage.getItem(typeKey)
          : null;
      if (
        rawType === 'guided' ||
        rawType === 'free-style' ||
        rawType === 'custom'
      ) {
        setLearningTypeState(rawType);
      }
      const rawSolved =
        typeof window !== 'undefined'
          ? window.localStorage.getItem(solvedKey)
          : null;
      if (rawSolved) {
        const parsed = JSON.parse(rawSolved);
        if (Array.isArray(parsed))
          setSolvedQuestionIds(parsed.filter(x => typeof x === 'string'));
      }
    } catch (_e) {
      // ignore
    } finally {
      initializedRef.current = true;
    }
  }, [userId]);

  // Persist changes
  useEffect(() => {
    if (!initializedRef.current) return;
    try {
      const typeKey = buildStorageKey(userId, 'type');
      window.localStorage.setItem(typeKey, learningType);
    } catch (_e) {
      // ignore
    }
  }, [learningType, userId]);

  useEffect(() => {
    if (!initializedRef.current) return;
    try {
      const solvedKey = buildStorageKey(userId, 'solved');
      window.localStorage.setItem(solvedKey, JSON.stringify(solvedQuestionIds));
    } catch (_e) {
      // ignore
    }
  }, [solvedQuestionIds, userId]);

  const setLearningType = useCallback((type: LearningType) => {
    setLearningTypeState(type);
    // Optionally sync preference to API here in future
  }, []);

  const addSolvedQuestion = useCallback((questionId: string) => {
    setSolvedQuestionIds(prev =>
      prev.includes(questionId) ? prev : [...prev, questionId]
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
    ]
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
    throw new Error('useLearningType must be used within LearningTypeProvider');
  return ctx;
}
