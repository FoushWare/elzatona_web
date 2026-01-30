/**
 * Repository Context Provider for React
 * Provides repository instances to React components via Context API
 */

"use client";

import React, { createContext, useContext, ReactNode, useMemo } from "react";
import {
  IQuestionRepository,
  IUserRepository,
  IPlanRepository,
  ILearningCardRepository,
  ICategoryRepository,
  ITopicRepository,
} from "./interfaces";
import { RepositoryFactory, getRepositoryFactory } from "./RepositoryFactory";

/**
 * Repository context value
 */
interface RepositoryContextValue {
  questionRepository: IQuestionRepository;
  userRepository: IUserRepository;
  planRepository: IPlanRepository;
  learningCardRepository: ILearningCardRepository;
  categoryRepository: ICategoryRepository;
  topicRepository: ITopicRepository;
  factory: RepositoryFactory;
}

/**
 * Repository context
 */

export const RepositoryContext = createContext<RepositoryContextValue | null>(
  null,
);

/**
 * Repository provider props
 */
interface RepositoryProviderProps {
  children: ReactNode;
  factory?: RepositoryFactory;
}

/**
 * Repository provider component
 * Provides repository instances to child components
 */
export function RepositoryProvider({
  children,
  factory: customFactory,
}: Readonly<RepositoryProviderProps>): JSX.Element {
  const factory = customFactory || getRepositoryFactory();

  const value = useMemo<RepositoryContextValue>(() => ({
    questionRepository: factory.getQuestionRepository(),
    userRepository: factory.getUserRepository(),
    planRepository: factory.getPlanRepository(),
    learningCardRepository: factory.getLearningCardRepository(),
    categoryRepository: factory.getCategoryRepository(),
    topicRepository: factory.getTopicRepository(),
    factory,
  }), [factory]);

  return (
    <RepositoryContext.Provider value={value}>
      {children}
    </RepositoryContext.Provider>
  );
}

/**
 * Hook to access repository context
 * @throws Error if used outside RepositoryProvider
 */
export function useRepositories(): RepositoryContextValue {
  const context = useContext(RepositoryContext);

  if (!context) {
    throw new Error("useRepositories must be used within a RepositoryProvider");
  }

  return context;
}

/**
 * Hook to access Question Repository
 */
export function useQuestionRepository(): IQuestionRepository {
  const { questionRepository } = useRepositories();
  return questionRepository;
}

/**
 * Hook to access User Repository
 */
export function useUserRepository(): IUserRepository {
  const { userRepository } = useRepositories();
  return userRepository;
}

/**
 * Hook to access Plan Repository
 */
export function usePlanRepository(): IPlanRepository {
  const { planRepository } = useRepositories();
  return planRepository;
}

/**
 * Hook to access Learning Card Repository
 */
export function useLearningCardRepository(): ILearningCardRepository {
  const { learningCardRepository } = useRepositories();
  return learningCardRepository;
}

/**
 * Hook to access Category Repository
 */
export function useCategoryRepository(): ICategoryRepository {
  const { categoryRepository } = useRepositories();
  return categoryRepository;
}

/**
 * Hook to access Topic Repository
 */
export function useTopicRepository(): ITopicRepository {
  const { topicRepository } = useRepositories();
  return topicRepository;
}

/**
 * Hook to access Repository Factory
 */
export function useRepositoryFactory(): RepositoryFactory {
  const { factory } = useRepositories();
  return factory;
}
