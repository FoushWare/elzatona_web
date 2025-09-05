import React from 'react';
import Link from 'next/link';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

interface LearningPath {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedHours: number;
  questionCount: number;
  category: string;
  skills: string[];
  prerequisites: string[];
  resources: Array<{
    title: string;
    url: string;
    type: 'documentation' | 'course' | 'blog' | 'tutorial';
  }>;
}

interface LearningPathCardProps {
  path: LearningPath;
  isCollapsed: boolean;
  onToggle: (pathId: string) => void;
}

const getCategoryIcon = (category: string): string => {
  const icons: Record<string, string> = {
    frontend: '🎨',
    backend: '⚙️',
    fullstack: '🚀',
    mobile: '📱',
    devops: '🔧',
    data: '📊',
    ai: '🤖',
    security: '🔒',
  };
  return icons[category] || '📚';
};

const getDifficultyIcon = (difficulty: string): string => {
  const icons: Record<string, string> = {
    beginner: '🌱',
    intermediate: '🌿',
    advanced: '🌳',
  };
  return icons[difficulty] || '🌱';
};

const getDifficultyColor = (difficulty: string): string => {
  const colors: Record<string, string> = {
    beginner:
      'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    intermediate:
      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    advanced: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  };
  return (
    colors[difficulty] ||
    'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
  );
};

export const LearningPathCard: React.FC<LearningPathCardProps> = ({
  path,
  isCollapsed,
  onToggle,
}) => {
  return (
    <div
      data-testid="learning-path-card"
      className="bg-card rounded-lg shadow-sm border border-border hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 transform group"
    >
      {/* Header - Always Visible */}
      <div
        data-testid="card-header"
        className="p-4 cursor-pointer border-b border-border hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
        onClick={() => onToggle(path.id)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 min-w-0 flex-1">
            <span className="text-xl flex-shrink-0">
              {getCategoryIcon(path.category)}
            </span>
            <div className="min-w-0 flex-1">
              <h3 className="text-lg font-semibold text-foreground truncate">
                {path.title}
              </h3>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded-full">
              {path.questionCount} questions
            </span>
            <div className="flex-shrink-0">
              {isCollapsed ? (
                <ChevronDownIcon className="h-5 w-5 text-muted-foreground" />
              ) : (
                <ChevronUpIcon className="h-5 w-5 text-muted-foreground" />
              )}
            </div>
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
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(
                  path.difficulty
                )}`}
              >
                {path.difficulty.charAt(0).toUpperCase() +
                  path.difficulty.slice(1)}
              </span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <span>⏱️</span>
              <span>{path.estimatedHours} hours</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>📚</span>
              <span>{path.resources.length} resources</span>
            </div>
          </div>

          {/* Skills */}
          {path.skills.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-medium text-foreground mb-2">
                Skills you&apos;ll learn:
              </h4>
              <div className="flex flex-wrap gap-2">
                {path.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Prerequisites */}
          {path.prerequisites.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-medium text-foreground mb-2">
                Prerequisites:
              </h4>
              <div className="flex flex-wrap gap-2">
                {path.prerequisites.map((prereq, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
                  >
                    {prereq}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Featured Resources */}
          {path.resources.length > 0 && (
            <div className="mb-6">
              <h4 className="text-sm font-medium text-foreground mb-2">
                Featured Resources:
              </h4>
              <div className="space-y-2">
                {path.resources.slice(0, 3).map((resource, index) => (
                  <a
                    key={index}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-2 rounded-md bg-muted hover:bg-muted/80 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">
                        {resource.title}
                      </span>
                      <span className="text-xs text-muted-foreground capitalize">
                        {resource.type}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href={`/learning-paths/${path.id}/questions`}
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md text-sm font-medium text-center transition-colors"
            >
              Practice Questions
            </Link>
            <Link
              href={`/learning-paths/${path.id}/resources`}
              className="flex-1 border border-border hover:bg-muted px-4 py-2 rounded-md text-sm font-medium text-center transition-colors"
            >
              View Resources
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
