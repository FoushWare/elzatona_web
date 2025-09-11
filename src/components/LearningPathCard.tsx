import React from 'react';
import Link from 'next/link';
// import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { getResourceById } from '@/lib/resources';

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number;
  questionCount?: number;
  resources: string[];
  targetSkills: string[];
  prerequisites?: string[];
}

export interface LearningPathCardProps {
  path: LearningPath;
  isCollapsed: boolean;
  onToggle: (pathId: string) => void;
  cardRef?: (el: HTMLDivElement | null) => void;
  className?: string;
}

const getCategoryIcon = (category: string): string => {
  const icons: Record<string, string> = {
    frontend: '🎨',
    javascript: '⚡',
    react: '⚛️',
    css: '🎨',
    typescript: '📘',
    testing: '🧪',
    performance: '⚡',
    security: '🔒',
    'system-design': '🏗️',
    tools: '🛠️',
    'ai-tools': '🤖',
    interview: '💼',
    english: '📚',
  };
  return icons[category] || '📚';
};

const getDifficultyIcon = (difficulty: string): string => {
  const icons: Record<string, string> = {
    beginner: '🌱',
    intermediate: '🚀',
    advanced: '⚡',
  };
  return icons[difficulty] || '📚';
};

const getDifficultyColor = (difficulty: string): string => {
  switch (difficulty) {
    case 'beginner':
      return 'text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400';
    case 'intermediate':
      return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400';
    case 'advanced':
      return 'text-red-600 bg-red-100 dark:bg-red-900/20 dark:text-red-400';
    default:
      return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20 dark:text-gray-400';
  }
};

export const LearningPathCard: React.FC<LearningPathCardProps> = ({
  path,
  isCollapsed,
  onToggle,
  cardRef,
  className = '',
}) => {
  const category = path.id.split('-')[0];

  return (
    <div className="relative">
      <div
        ref={cardRef}
        data-testid="learning-path-card"
        className={`bg-gradient-to-br from-gray-50 via-slate-50 via-gray-50 to-slate-50 dark:from-gray-800/20 dark:via-slate-800/20 dark:via-gray-800/20 dark:to-slate-800/20 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 transform group hover:scale-[1.02] backdrop-blur-sm ${className}`}
      >
        {/* Header Row - Always Visible */}
        <div
          data-testid="card-header"
          className="p-4 cursor-pointer border-b border-gray-200 dark:border-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:via-slate-50 hover:to-gray-50 dark:hover:from-gray-800/30 dark:hover:via-slate-800/30 dark:hover:to-gray-800/30 transition-all duration-300 rounded-t-2xl"
          onClick={() => onToggle(path.id)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 min-w-0 flex-1">
              <span className="text-xl flex-shrink-0">
                {getCategoryIcon(category)}
              </span>
              <h3 className="text-lg font-bold bg-gradient-to-r from-gray-700 via-slate-700 to-gray-700 dark:from-gray-300 dark:via-slate-300 dark:to-gray-300 bg-clip-text text-transparent truncate drop-shadow-sm">
                {path.title}
              </h3>
            </div>
            <div className="flex items-center space-x-3 flex-shrink-0">
              {path.questionCount && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 dark:from-blue-600 dark:via-purple-600 dark:to-pink-600 text-white border-2 border-white dark:border-gray-800 shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300 animate-pulse">
                  <span className="mr-1">🧠</span>
                  {path.questionCount} questions
                </span>
              )}
              <svg
                className={`w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${
                  isCollapsed ? '' : 'rotate-180'
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Collapsible Content */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isCollapsed ? 'max-h-0 opacity-0' : 'max-h-[2000px] opacity-100'
          }`}
        >
          <div className="p-4 sm:p-6">
            {/* Description */}
            <div className="mb-4">
              <p className="text-muted-foreground text-sm leading-relaxed">
                {path.description}
              </p>
            </div>

            {/* Tags Badge - Only visible when expanded */}
            <div className="mb-4">
              <div className="flex flex-wrap gap-1">
                {path.targetSkills.slice(0, 3).map(skill => (
                  <span
                    key={skill}
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 dark:from-blue-600 dark:via-purple-600 dark:to-pink-600 text-white border border-white dark:border-gray-800 shadow-lg"
                  >
                    {skill}
                  </span>
                ))}
                {path.targetSkills.length > 3 && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-gray-500 to-gray-600 dark:from-gray-600 dark:to-gray-700 text-white border border-white dark:border-gray-800 shadow-lg">
                    +{path.targetSkills.length - 3}
                  </span>
                )}
              </div>
            </div>

            {/* Difficulty Badge */}
            <div className="mb-4">
              <div className="flex items-center space-x-2">
                <span className="text-lg">
                  {getDifficultyIcon(path.difficulty)}
                </span>
                <span
                  className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold border-2 ${getDifficultyColor(path.difficulty)} shadow-sm`}
                >
                  {path.difficulty}
                </span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 lg:gap-4 mb-3 sm:mb-4 lg:mb-6">
              <div className="flex flex-col items-center text-center p-3 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 dark:from-emerald-600 dark:via-teal-600 dark:to-cyan-600 rounded-xl border-2 border-white dark:border-gray-800 shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300">
                <span className="text-lg sm:text-xl lg:text-2xl mb-1">📚</span>
                <span className="text-xs sm:text-sm font-semibold text-white">
                  {path.resources.length} resources
                </span>
              </div>
              <div className="flex flex-col items-center text-center p-3 bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 dark:from-orange-600 dark:via-red-600 dark:to-pink-600 rounded-xl border-2 border-white dark:border-gray-800 shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300">
                <span className="text-lg sm:text-xl lg:text-2xl mb-1">⏱️</span>
                <span className="text-xs sm:text-sm font-semibold text-white">
                  {path.estimatedTime} hours
                </span>
              </div>
              <div className="flex flex-col items-center text-center p-3 bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 dark:from-violet-600 dark:via-purple-600 dark:to-fuchsia-600 rounded-xl border-2 border-white dark:border-gray-800 shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300">
                <span className="text-lg sm:text-xl lg:text-2xl mb-1">🎯</span>
                <span className="text-xs sm:text-sm font-semibold text-white">
                  {path.targetSkills.length} skills
                </span>
              </div>
              {path.questionCount && (
                <div className="flex flex-col items-center text-center p-3 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 dark:from-blue-600 dark:via-purple-600 dark:to-pink-600 rounded-xl border-2 border-white dark:border-gray-800 shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300">
                  <span className="text-lg sm:text-xl lg:text-2xl mb-1">
                    🧠
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-white">
                    {path.questionCount} questions
                  </span>
                </div>
              )}
            </div>

            {/* Target Skills */}
            <div className="mb-3 sm:mb-4 lg:mb-6">
              <h4 className="text-xs sm:text-sm font-medium text-card-foreground mb-2">
                Skills you&apos;ll learn:
              </h4>
              <div className="flex flex-wrap gap-2">
                {path.targetSkills.slice(0, 4).map(skill => (
                  <span
                    key={skill}
                    className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-gray-100 via-slate-100 to-gray-100 dark:from-gray-800/40 dark:via-slate-800/40 dark:to-gray-800/40 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 shadow-sm"
                  >
                    {skill}
                  </span>
                ))}
                {path.targetSkills.length > 4 && (
                  <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-slate-100 via-gray-100 to-slate-100 dark:from-slate-800/40 dark:via-gray-800/40 dark:to-slate-800/40 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600 shadow-sm">
                    +{path.targetSkills.length - 4} more
                  </span>
                )}
              </div>
            </div>

            {/* Prerequisites */}
            {path.prerequisites && path.prerequisites.length > 0 && (
              <div className="mb-3 sm:mb-4 lg:mb-6">
                <h4 className="text-xs sm:text-sm font-medium text-card-foreground mb-2">
                  Prerequisites:
                </h4>
                <div className="flex flex-wrap gap-1 sm:gap-2">
                  {path.prerequisites.map(prereq => (
                    <span
                      key={prereq}
                      className="inline-flex items-center px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                    >
                      {prereq}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Resources Preview */}
            <div className="mb-3 sm:mb-4 lg:mb-6">
              <h4 className="text-xs sm:text-sm font-medium text-card-foreground mb-2">
                Featured Resources:
              </h4>
              <div className="space-y-1 sm:space-y-2">
                {path.resources.slice(0, 3).map(resourceId => {
                  const resource = getResourceById(resourceId);
                  return resource ? (
                    <div
                      key={resourceId}
                      className="flex items-center space-x-2 text-xs sm:text-sm text-muted-foreground"
                    >
                      <span>📄</span>
                      <span className="truncate">{resource.title}</span>
                    </div>
                  ) : null;
                })}
                {path.resources.length > 3 && (
                  <div className="text-xs sm:text-sm text-muted-foreground">
                    +{path.resources.length - 3} more resources
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div
              data-action-buttons
              className="flex flex-col sm:flex-row gap-3"
            >
              <Link
                href={`/learning-paths/${path.id}/questions`}
                className="flex-1 inline-flex items-center justify-center px-4 py-3 bg-gradient-to-r from-gray-600 to-gray-700 dark:from-gray-500 dark:to-gray-600 text-white font-semibold rounded-xl hover:from-gray-700 hover:to-gray-800 dark:hover:from-gray-600 dark:hover:to-gray-700 hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-gray-500/20 dark:hover:shadow-gray-400/25 text-sm lg:text-base"
              >
                🧠 Practice Questions
              </Link>
              <Link
                href={`/learning-paths/${path.id}/resources`}
                className="flex-1 inline-flex items-center justify-center px-4 py-3 bg-gradient-to-r from-slate-600 to-slate-700 dark:from-slate-500 dark:to-slate-600 text-white font-semibold rounded-xl hover:from-slate-700 hover:to-slate-800 dark:hover:from-slate-600 dark:hover:to-slate-700 hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-slate-500/20 dark:hover:shadow-slate-400/25 text-sm lg:text-base"
              >
                📚 View Resources
              </Link>
            </div>

            {/* Flashcard Icon at the End */}
            <div className="flex justify-end mt-4">
              <Link
                href={`/learning-paths/${path.id}/questions`}
                className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 dark:from-yellow-600 dark:via-orange-600 dark:to-red-600 text-white shadow-lg hover:shadow-xl hover:scale-110 transform transition-all duration-300 border-2 border-white dark:border-gray-800"
                title="Add to Flashcards"
                aria-label="Add learning path to flashcards"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
