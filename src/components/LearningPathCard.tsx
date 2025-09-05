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
  className = '',
}) => {
  const category = path.id.split('-')[0];

  return (
    <div
      data-testid="learning-path-card"
      className={`bg-card rounded-lg shadow-sm border border-border hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 transform group ${className}`}
    >
      {/* Header Row - Always Visible */}
      <div
        data-testid="card-header"
        className="p-4 cursor-pointer border-b border-border hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
        onClick={() => onToggle(path.id)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 min-w-0 flex-1">
            <span className="text-xl flex-shrink-0">
              {getCategoryIcon(category)}
            </span>
            <h3 className="text-lg font-semibold text-foreground truncate">
              {path.title}
            </h3>
          </div>
          <div className="flex items-center space-x-3 flex-shrink-0">
            {path.questionCount && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
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

          {/* Difficulty Badge */}
          <div className="mb-4">
            <div className="flex items-center space-x-2">
              <span className="text-lg">
                {getDifficultyIcon(path.difficulty)}
              </span>
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(path.difficulty)}`}
              >
                {path.difficulty}
              </span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-1 sm:gap-2 lg:gap-4 mb-3 sm:mb-4 lg:mb-6 text-xs sm:text-sm text-muted-foreground">
            <div className="flex flex-col items-center text-center">
              <span className="text-base sm:text-lg lg:text-xl mb-1">📚</span>
              <span className="text-xs sm:text-sm">
                {path.resources.length} resources
              </span>
            </div>
            <div className="flex flex-col items-center text-center">
              <span className="text-base sm:text-lg lg:text-xl mb-1">⏱️</span>
              <span className="text-xs sm:text-sm">
                {path.estimatedTime} hours
              </span>
            </div>
            <div className="flex flex-col items-center text-center">
              <span className="text-base sm:text-lg lg:text-xl mb-1">🎯</span>
              <span className="text-xs sm:text-sm">
                {path.targetSkills.length} skills
              </span>
            </div>
            {path.questionCount && (
              <div className="flex flex-col items-center text-center">
                <span className="text-base sm:text-lg lg:text-xl mb-1">❓</span>
                <span className="text-xs sm:text-sm text-blue-600 font-medium">
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
            <div className="flex flex-wrap gap-1 sm:gap-2">
              {path.targetSkills.slice(0, 4).map(skill => (
                <span
                  key={skill}
                  className="inline-flex items-center px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
                >
                  {skill}
                </span>
              ))}
              {path.targetSkills.length > 4 && (
                <span className="inline-flex items-center px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400">
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
          <div className="flex flex-col sm:flex-row gap-2">
            <Link
              href={`/learning-paths/${path.id}/questions`}
              className="flex-1 inline-flex items-center justify-center px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 lg:py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 hover:scale-105 transform transition-all duration-200 group-hover:shadow-lg text-xs sm:text-sm lg:text-base"
            >
              🧠 Practice Questions
            </Link>
            <Link
              href={`/learning-paths/${path.id}/resources`}
              className="flex-1 inline-flex items-center justify-center px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 lg:py-2.5 bg-transparent border-2 border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-600 hover:text-white hover:scale-105 transform transition-all duration-200 group-hover:shadow-lg text-xs sm:text-sm lg:text-base"
            >
              📚 View Resources
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
