'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, BookOpen, Clock, BarChart2 } from 'lucide-react';
import { useSectors } from '@/hooks/useSectors';
import { useSectorProgress } from '@/hooks/useSectorProgress';
import { SectorCard } from '@/components/SectorCard';
import { LoadingTransition } from '@/components/LoadingTransition';

export default function SectorsPage() {
  const params = useParams();
  const router = useRouter();
  const pathId = params?.id as string;

  const { sectors, isLoading, error } = useSectors(pathId);
  const { getSectorProgress, getPathProgress } = useSectorProgress();

  const handleSectorStart = (sectorId: string) => {
    // Navigate to questions page for the sector
    router.push(`/learning-paths/${pathId}/sectors/${sectorId}/questions`);
  };

  const handleBack = () => {
    router.push('/learning-paths');
  };

  // Calculate progress statistics
  const pathProgress = getPathProgress(pathId);
  const completedSectors = pathProgress.length;
  const totalSectors = sectors.length;
  const averageScore =
    completedSectors > 0
      ? Math.round(
          pathProgress.reduce((sum, progress) => sum + progress.score, 0) /
            completedSectors
        )
      : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-slate-50 dark:from-gray-900 dark:via-gray-800 dark:to-slate-900 py-4 sm:py-6 lg:py-8">
      <main className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 relative z-10">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={handleBack}
            className="inline-flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Learning Paths</span>
          </button>

          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Learning Path Sectors
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Complete each sector to master this learning path. Each sector
              contains focused questions to help you build specific skills.
            </p>
          </div>
        </div>

        {/* Progress Overview */}
        {!isLoading && !error && sectors.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Your Progress
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                  {completedSectors}/{totalSectors}
                </div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">
                  Sectors Completed
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                  {averageScore}%
                </div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">
                  Average Score
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                  {sectors.reduce(
                    (sum, sector) => sum + sector.questionCount,
                    0
                  )}
                </div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">
                  Total Questions
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <LoadingTransition isVisible={true} message="Loading sectors..." />
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 mb-8">
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
                  Error loading sectors
                </h3>
                <div className="mt-2 text-sm text-red-700 dark:text-red-300">
                  {error}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Sectors Grid */}
        {!isLoading && !error && sectors.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sectors.map(sector => {
              const progress = getSectorProgress(sector.id);
              const isCompleted = progress !== null;
              const score = progress?.score || 0;

              return (
                <SectorCard
                  key={sector.id}
                  sector={sector}
                  onStart={handleSectorStart}
                  isCompleted={isCompleted}
                  score={score}
                />
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && sectors.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No sectors available
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              This learning path doesn't have any sectors yet. Check back later!
            </p>
            <button
              onClick={handleBack}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Learning Paths</span>
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
