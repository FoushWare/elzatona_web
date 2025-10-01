'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLearningPaths } from '@/hooks/useLearningPaths';
import { LearningPathCard } from '@/components/LearningPathCard';
import { LoadingTransition } from '@/components/LoadingTransition';
import { useLearningPathStats } from '@/hooks/useLearningPathStats';

export default function LearningPathsPage() {
  console.log('🎯 LearningPathsPage component rendering');
  const router = useRouter();

  const {
    learningPaths: dynamicLearningPaths,
    isLoading,
    error,
  } = useLearningPaths();
  console.log('🎯 useLearningPaths result:', {
    dynamicLearningPaths: dynamicLearningPaths?.length,
    isLoading,
    error,
  });
  const {
    stats,
    isLoading: isStatsLoading,
    getQuestionCount,
  } = useLearningPathStats();
  const [collapsedCards, setCollapsedCards] = useState<Set<string>>(new Set());
  const [lastOpenedCard, setLastOpenedCard] = useState<string | null>(null);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Deduplicate learning paths by ID to prevent duplicate key errors
  const deduplicatedDynamicPaths = dynamicLearningPaths.reduce(
    (acc, path) => {
      if (!acc.find(existingPath => existingPath.id === path.id)) {
        acc.push(path);
      }
      return acc;
    },
    [] as typeof dynamicLearningPaths
  );

  // Debug logging
  console.log('LearningPathsPage render:', {
    dynamicLearningPaths: dynamicLearningPaths?.length,
    isLoading,
    error,
    stats: stats?.length,
    deduplicatedDynamicPaths: deduplicatedDynamicPaths?.length,
  });

  // Initialize all cards as collapsed when learning paths are loaded
  useEffect(() => {
    if (deduplicatedDynamicPaths.length > 0 && collapsedCards.size === 0) {
      const allPathIds = new Set(deduplicatedDynamicPaths.map(path => path.id));
      setCollapsedCards(allPathIds);
    }
  }, [deduplicatedDynamicPaths, collapsedCards.size]);

  // Force render for debugging
  if (typeof window !== 'undefined') {
    console.log('Client-side render:', {
      isLoading,
      error,
      dynamicLearningPaths: dynamicLearningPaths?.length,
    });
  }

  // Show loading state while data is being fetched
  if (isLoading && dynamicLearningPaths.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 py-8">
        <main className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">
              Learning Paths
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Your path to success in interviews
            </p>
          </div>
          <div className="flex justify-center items-center py-12">
            <LoadingTransition
              isVisible={true}
              message="Loading learning paths..."
            />
          </div>
        </main>
      </div>
    );
  }

  const toggleCard = (pathId: string) => {
    setCollapsedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(pathId)) {
        newSet.delete(pathId);
        setLastOpenedCard(pathId);
      } else {
        newSet.add(pathId);
      }
      return newSet;
    });
  };

  const handleLearningPathSelect = (pathId: string) => {
    router.push(`/learning-paths/${pathId}/sectors`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 py-8">
      <main className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Learning Paths</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Your path to success in interviews
          </p>
        </div>

        {/* Action Button */}
        <div className="flex justify-center mb-12">
          <button
            onClick={() => router.push('/mock-interviews')}
            className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-lg transition-all"
          >
            <span>📹</span>
            <span>Mock Interview</span>
          </button>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <LoadingTransition
              isVisible={true}
              message="Loading learning paths..."
            />
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 mb-8 max-w-4xl mx-auto">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                  Error loading learning paths
                </h3>
                <div className="mt-2 text-sm text-red-700 dark:text-red-300">
                  {error}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Learning Paths Grid */}
        {(!isLoading || deduplicatedDynamicPaths.length > 0) &&
          !error &&
          deduplicatedDynamicPaths.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {deduplicatedDynamicPaths.map(path => {
                // Convert API data to match original interface
                const convertedPath = {
                  id: path.id,
                  name: path.name,
                  title: path.name,
                  description: path.description,
                  difficulty: 'intermediate' as const, // Default difficulty since API doesn't provide it
                  estimatedTime: Math.ceil(path.questionCount / 10) || 1, // Convert to hours, default to 1
                  questionCount: path.questionCount,
                  sectors: path.sectors || [], // Include sections data
                  resources: [], // Empty for now, can be populated from API later
                  targetSkills: [], // Empty for now, can be populated from API later
                  prerequisites: [], // Empty for now, can be populated from API later
                  icon: 'book-open', // Default icon
                  color: 'blue', // Default color
                  order: 0, // Default order
                  isActive: true, // Default active
                  createdAt: new Date().toISOString(), // Default creation date
                  updatedAt: new Date().toISOString(), // Default update date
                };

                return (
                  <LearningPathCard
                    key={path.id}
                    path={convertedPath}
                    isCollapsed={collapsedCards.has(path.id)}
                    onToggle={toggleCard}
                    cardRef={el => (cardRefs.current[path.id] = el)}
                    dynamicQuestionCount={getQuestionCount(path.id)}
                    isQuestionCountLoading={isStatsLoading}
                  />
                );
              })}
            </div>
          )}

        {/* Debug State */}
        <div className="bg-yellow-100 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-8 max-w-4xl mx-auto">
          <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200 mb-2">
            Debug Info:
          </h3>
          <div className="text-sm text-yellow-700 dark:text-yellow-300">
            <p>Loading: {isLoading ? 'true' : 'false'}</p>
            <p>Error: {error || 'none'}</p>
            <p>Dynamic Paths: {dynamicLearningPaths?.length || 0}</p>
            <p>Deduplicated Paths: {deduplicatedDynamicPaths?.length || 0}</p>
          </div>
        </div>

        {/* Empty State */}
        {!isLoading && !error && deduplicatedDynamicPaths.length === 0 && (
          <div className="text-center py-12 text-gray-300">
            <p className="text-xl font-medium">No learning paths available.</p>
            <p className="mt-2">Please check back later or contact support.</p>
          </div>
        )}
      </main>
    </div>
  );
}
