/**
 * useQuestionRepository Hook
 * Provides access to question repository in React components
 */

"use client";

import { useContext } from "react";
import { RepositoryContext } from "../repositories/RepositoryContext";
import { IQuestionRepository } from "../repositories/interfaces/IQuestionRepository";

/**
 * Hook to access the question repository from React components
 * Must be used within a RepositoryProvider
 *
 * @example
 * ```tsx
 * const questionRepo = useQuestionRepository();
 * const questions = await questionRepo.findAll({ page: 1, limit: 10 });
 * ```
 *
 * @returns IQuestionRepository instance
 * @throws Error if used outside RepositoryProvider
 */
export function useQuestionRepository(): IQuestionRepository {
  const context = useContext(RepositoryContext);

  if (!context) {
    throw new Error(
      "useQuestionRepository must be used within a RepositoryProvider",
    );
  }

  return context.questionRepository;
}

/**
 * Hook to access the user repository from React components
 * Must be used within a RepositoryProvider
 *
 * @returns IUserRepository instance
 * @throws Error if used outside RepositoryProvider
 */
export function useUserRepository() {
  const context = useContext(RepositoryContext);

  if (!context) {
    throw new Error(
      "useUserRepository must be used within a RepositoryProvider",
    );
  }

  return context.userRepository;
}

/**
 * Hook to access the plan repository from React components
 * Must be used within a RepositoryProvider
 *
 * @returns IPlanRepository instance
 * @throws Error if used outside RepositoryProvider
 */
export function usePlanRepository() {
  const context = useContext(RepositoryContext);

  if (!context) {
    throw new Error(
      "usePlanRepository must be used within a RepositoryProvider",
    );
  }

  return context.planRepository;
}

/**
 * Hook to access the learning card repository from React components
 * Must be used within a RepositoryProvider
 *
 * @returns ILearningCardRepository instance
 * @throws Error if used outside RepositoryProvider
 */
export function useLearningCardRepository() {
  const context = useContext(RepositoryContext);

  if (!context) {
    throw new Error(
      "useLearningCardRepository must be used within a RepositoryProvider",
    );
  }

  return context.learningCardRepository;
}
