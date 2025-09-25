'use client';

import React from 'react';
import { CheckCircle, Circle, Star, Trophy, Target } from 'lucide-react';
import { SectorGrade } from '@/hooks/useSectorGrading';
import Link from 'next/link';

interface SectorCardProps {
  sector: SectorGrade;
  pathId: string;
  onStartSector?: (sectorId: string) => void;
  className?: string;
}

export const SectorCard: React.FC<SectorCardProps> = ({
  sector,
  pathId,
  onStartSector,
  className = '',
}) => {
  const getGradeColor = (percentage: number): string => {
    if (percentage >= 80) return 'text-green-600 dark:text-green-400';
    if (percentage >= 60) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getGradeBgColor = (percentage: number): string => {
    if (percentage >= 80) return 'bg-green-100 dark:bg-green-900/30';
    if (percentage >= 60) return 'bg-yellow-100 dark:bg-yellow-900/30';
    return 'bg-red-100 dark:bg-red-900/30';
  };

  const getProgressColor = (percentage: number): string => {
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200 ${className}`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          {sector.isCompleted ? (
            <CheckCircle className="w-5 h-5 text-green-500" />
          ) : (
            <Circle className="w-5 h-5 text-gray-400" />
          )}
          <h3 className="font-semibold text-gray-900 dark:text-white">
            {sector.sectorName}
          </h3>
        </div>
        <div className="flex items-center space-x-2">
          {sector.isCompleted && <Trophy className="w-4 h-4 text-yellow-500" />}
          <span
            className={`text-sm font-bold px-2 py-1 rounded-full ${getGradeBgColor(sector.percentage)} ${getGradeColor(sector.percentage)}`}
          >
            {sector.grade}
          </span>
        </div>
      </div>

      <div className="mb-3">
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
          <span>Progress</span>
          <span>
            {sector.correctAnswers}/{sector.totalQuestions} questions
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(sector.percentage)}`}
            style={{ width: `${sector.percentage}%` }}
          />
        </div>
        <div className="text-right text-sm text-gray-600 dark:text-gray-400 mt-1">
          {sector.percentage}%
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center space-x-1">
            <Target className="w-4 h-4" />
            <span>{sector.totalQuestions} questions</span>
          </div>
          {sector.isCompleted && (
            <div className="flex items-center space-x-1 text-green-600 dark:text-green-400">
              <Star className="w-4 h-4" />
              <span>Completed</span>
            </div>
          )}
        </div>
        <Link
          href={`/learning-paths/${pathId}/questions?sector=${sector.sectorId}`}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
            sector.isCompleted
              ? 'bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/50'
              : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-400 dark:hover:bg-indigo-900/50'
          }`}
        >
          {sector.isCompleted ? 'Review' : 'Start'}
        </Link>
      </div>
    </div>
  );
};
