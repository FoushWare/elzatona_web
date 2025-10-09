// v1.0 - Questions Management Hook
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useFirebaseAuth } from '@/contexts/FirebaseAuthContext';
import { QuestionStats } from '@/lib/unified-question-schema';
import {
  Question,
  QuestionCategory,
  QuestionAttempt,
  getQuestions,
  getQuestion,
  getRandomQuestions,
  getCategories,
  getQuestionStats,
  saveQuestionAttempt,
  getUserQuestionAttempts,
  searchQuestions,
  getQuizQuestions,
} from '@/lib/firebase-questions';

interface QuestionFilters {
  category?: string;
  difficulty?: string;
  tags?: string[];
  [key: string]: unknown;
}

interface QuizConfig {
  count?: number;
  category?: string;
  difficulty?: string;
  tags?: string[];
  [key: string]: unknown;
}

export interface UseQuestionsReturn {
  questions: Question[];
  categories: QuestionCategory[];
  stats: QuestionStats | null;
  currentQuestion: Question | null;
  userAttempts: QuestionAttempt[];
  isLoading: boolean;
  error: string | null;
  loadQuestions: (filters?: QuestionFilters) => Promise<void>;
  loadQuestion: (questionId: string) => Promise<void>;
  loadRandomQuestions: (
    count: number,
    filters?: QuestionFilters
  ) => Promise<void>;
  loadCategories: () => Promise<void>;
  loadStats: () => Promise<void>;
  loadUserAttempts: (questionId?: string) => Promise<void>;
  submitAnswer: (
    questionId: string,
    selectedAnswer: number,
    timeSpent: number,
    attempts: number
  ) => Promise<void>;
  searchQuestions: (
    searchTerm: string,
    filters?: QuestionFilters
  ) => Promise<void>;
  getQuiz: (config: QuizConfig) => Promise<Question[]>;
  clearError: () => void;
}

export const useQuestions = (): UseQuestionsReturn => {
  const { user } = useFirebaseAuth();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [categories, setCategories] = useState<QuestionCategory[]>([]);
  const [stats, setStats] = useState<QuestionStats | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [userAttempts, setUserAttempts] = useState<QuestionAttempt[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadQuestions = useCallback(async (filters?: QuestionFilters) => {
    setIsLoading(true);
    setError(null);

    try {
      const questionsData = await getQuestions(filters);
      setQuestions(questionsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load questions');
      console.error('Error loading questions:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadQuestion = useCallback(async (questionId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const question = await getQuestion(questionId);
      setCurrentQuestion(question);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load question');
      console.error('Error loading question:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadRandomQuestions = useCallback(
    async (count: number, filters?: QuestionFilters) => {
      setIsLoading(true);
      setError(null);

      try {
        const randomQuestions = await getRandomQuestions(count, filters);
        setQuestions(randomQuestions);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to load random questions'
        );
        console.error('Error loading random questions:', err);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const loadCategories = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const categoriesData = await getCategories();
      setCategories(categoriesData);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to load categories'
      );
      console.error('Error loading categories:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadStats = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const statsData = await getQuestionStats();
      setStats(statsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load stats');
      console.error('Error loading stats:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadUserAttempts = useCallback(
    async (questionId?: string) => {
      if (!user?.uid) return;

      setIsLoading(true);
      setError(null);

      try {
        const attempts = await getUserQuestionAttempts(user.uid, questionId);
        setUserAttempts(attempts);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to load user attempts'
        );
        console.error('Error loading user attempts:', err);
      } finally {
        setIsLoading(false);
      }
    },
    [user?.uid]
  );

  const submitAnswer = useCallback(
    async (
      questionId: string,
      selectedAnswer: number,
      timeSpent: number,
      attempts: number
    ) => {
      if (!user?.uid) {
        throw new Error('User not authenticated');
      }

      try {
        const question = await getQuestion(questionId);
        if (!question) {
          throw new Error('Question not found');
        }

        // Check if the selected answer is correct based on the options
        const isCorrect =
          question.options?.some(
            option =>
              option.id === selectedAnswer.toString() && option.isCorrect
          ) || false;

        await saveQuestionAttempt({
          questionId,
          userId: user.uid,
          userAnswer: { answer: selectedAnswer.toString() },
          isCorrect,
          timeSpent,
          points: isCorrect ? 10 : 0,
          hintsUsed: 0,
        });

        // Reload user attempts to show the new attempt
        await loadUserAttempts(questionId);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to submit answer'
        );
        console.error('Error submitting answer:', err);
        throw err;
      }
    },
    [user?.uid, loadUserAttempts]
  );

  const searchQuestionsLocal = useCallback(
    async (searchTerm: string, filters?: QuestionFilters) => {
      setIsLoading(true);
      setError(null);

      try {
        const searchResults = await searchQuestions(searchTerm, filters);
        setQuestions(searchResults);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to search questions'
        );
        console.error('Error searching questions:', err);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const getQuiz = useCallback(
    async (config: QuizConfig): Promise<Question[]> => {
      setIsLoading(true);
      setError(null);

      try {
        const quizQuestions = await getQuizQuestions(config);
        setQuestions(quizQuestions);
        return quizQuestions;
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to get quiz questions'
        );
        console.error('Error getting quiz questions:', err);
        return [];
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Load categories on mount
  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  return {
    questions,
    categories,
    stats,
    currentQuestion,
    userAttempts,
    isLoading,
    error,
    loadQuestions,
    loadQuestion,
    loadRandomQuestions,
    loadCategories,
    loadStats,
    loadUserAttempts,
    submitAnswer,
    searchQuestions: searchQuestionsLocal,
    getQuiz,
    clearError,
  };
};
