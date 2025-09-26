'use client';

import React from 'react';
import { BookOpen, Clock, CheckCircle } from 'lucide-react';

export interface Sector {
  id: string;
  name: string;
  description: string;
  questionCount: number;
  difficulty: 'easy' | 'medium' | 'hard';
  order: number;
  isActive: boolean;
}

interface SectorCardProps {
  sector: Sector;
  onStart: (sectorId: string) => void;
  isCompleted?: boolean;
  score?: number;
}

export const SectorCard: React.FC<SectorCardProps> = ({
  sector,
  onStart,
  isCompleted = false,
  score,
}) => {
  const getDifficultyClasses = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'hard':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getEstimatedTime = (questionCount: number) => {
    return Math.ceil(questionCount * 2); // 2 minutes per question
  };

  const getButtonText = () => {
    return isCompleted ? 'Review Again' : 'Start Sector';
  };

  const getButtonClasses = () => {
    if (isCompleted) {
      return 'w-full font-medium py-2 px-4 rounded-lg transition-colors bg-green-600 hover:bg-green-700 text-white';
    }
    return 'w-full font-medium py-2 px-4 rounded-lg transition-colors bg-indigo-600 hover:bg-indigo-700 text-white';
  };

  const getCardClasses = () => {
    const baseClasses =
      'bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-all';
    return isCompleted ? `${baseClasses} ring-2 ring-green-500` : baseClasses;
  };

  return (
    <div data-testid="sector-card" className={getCardClasses()}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              isCompleted ? 'bg-green-500' : 'bg-gray-300'
            }`}
          >
            {isCompleted ? (
              <CheckCircle
                data-testid="completion-check"
                className="w-5 h-5 text-white"
              />
            ) : (
              <span className="text-sm font-medium text-gray-600">
                {sector.order}
              </span>
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {sector.name}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              {sector.description}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyClasses(
              sector.difficulty
            )}`}
          >
            {sector.difficulty}
          </span>
          {isCompleted && score && (
            <span className="text-sm font-medium text-green-600">{score}%</span>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
          <div className="flex items-center space-x-1">
            <BookOpen className="w-4 h-4" />
            <span>{sector.questionCount} questions</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>~{getEstimatedTime(sector.questionCount)} min</span>
          </div>
        </div>
      </div>

      <button onClick={() => onStart(sector.id)} className={getButtonClasses()}>
        {getButtonText()}
      </button>
    </div>
  );
};
