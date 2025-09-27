'use client';

import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export interface LearningPath {
  id: string;
  name: string;
  description: string;
  questionCount: number;
  icon: string;
  color: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced'; // optional
  estimatedTime?: number; // in minutes - optional
  category?: string; // optional
  title?: string; // for backward compatibility
  resources?: Array<{
    id: string;
    title: string;
    url: string;
    type: string;
  }>;
  targetSkills?: string[];
  prerequisites?: string[];
  sectors?: Array<{
    id: string;
    name: string;
    questionCount: number;
  }>;
}

interface LearningPathCardProps {
  path: LearningPath;
  isCollapsed: boolean;
  onToggle: (pathId: string) => void;
  cardRef: (el: HTMLDivElement | null) => void;
  dynamicQuestionCount?: number;
  isQuestionCountLoading?: boolean;
}

export const LearningPathCard: React.FC<LearningPathCardProps> = ({
  path,
  isCollapsed,
  onToggle,
  cardRef,
  dynamicQuestionCount,
  isQuestionCountLoading = false,
}) => {
  const getPathIcon = (pathId: string) => {
    const iconMap: Record<string, string> = {
      'frontend-fundamentals': '🎨',
      'javascript-deep-dive': '⚡',
      'advanced-css-mastery': '📚',
      'react-mastery': '⚛️',
      'typescript-essentials': '🔷',
      'testing-strategies': '✏️',
      'performance-optimization': '📊',
      'security-essentials': '🔒',
      'frontend-system-design': '📚⚙️',
      'build-tools-devops': '📚📚',
    };
    return iconMap[pathId] || '📖';
  };

  const displayQuestionCount =
    dynamicQuestionCount !== undefined
      ? dynamicQuestionCount
      : path.questionCount;

  return (
    <div
      ref={cardRef}
      data-testid="learning-path-card"
      className="bg-gray-800 hover:bg-gray-750 rounded-lg p-4 cursor-pointer transition-all duration-200 border border-gray-700"
      onClick={() => onToggle(path.id)}
    >
      <div className="flex items-center justify-between">
        {/* Left side - Icon and Title */}
        <div className="flex items-center space-x-4">
          <div className="text-2xl">{path.icon || getPathIcon(path.id)}</div>
          <h3 className="text-white font-medium text-lg">
            {path.name || path.title}
          </h3>
        </div>

        {/* Right side - Question count and dropdown */}
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            {isQuestionCountLoading ? '...' : `#${displayQuestionCount} Q`}
          </div>
          <div className="text-white">
            {isCollapsed ? (
              <ChevronDown className="w-5 h-5" />
            ) : (
              <ChevronUp className="w-5 h-5" />
            )}
          </div>
        </div>
      </div>

      {/* Expanded Content */}
      {!isCollapsed && (
        <div className="mt-4 pt-4 border-t border-gray-700">
          <p className="text-gray-300 text-sm mb-4">{path.description}</p>

          {/* Target Skills */}
          {path.targetSkills && path.targetSkills.length > 0 && (
            <div className="mb-4">
              <h4 className="text-white font-medium mb-2">Target Skills</h4>
              <div className="flex flex-wrap gap-2">
                {path.targetSkills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-blue-600 text-blue-100 rounded text-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Prerequisites */}
          {path.prerequisites && path.prerequisites.length > 0 && (
            <div className="mb-4">
              <h4 className="text-white font-medium mb-2">Prerequisites</h4>
              <ul className="space-y-1">
                {path.prerequisites.map((prereq, index) => (
                  <li
                    key={index}
                    className="flex items-center space-x-2 text-gray-300 text-sm"
                  >
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                    <span>{prereq}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Sections */}
          {path.sectors && path.sectors.length > 0 && (
            <div className="mb-4">
              <h4 className="text-white font-medium mb-2">Sections</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {path.sectors.map(section => (
                  <div
                    key={section.id}
                    className="flex items-center justify-between p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">📚</span>
                      <span className="text-gray-300 text-sm font-medium">
                        {section.name}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className="text-blue-400 text-sm font-semibold">
                        {section.questionCount}
                      </span>
                      <span className="text-gray-400 text-xs">
                        {section.questionCount === 1 ? 'question' : 'questions'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Resources */}
          {path.resources && path.resources.length > 0 && (
            <div className="mb-4">
              <h4 className="text-white font-medium mb-2">Resources</h4>
              <div className="space-y-2">
                {path.resources.map(resource => (
                  <a
                    key={resource.id}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 p-2 bg-gray-700 hover:bg-gray-600 rounded text-sm text-gray-300 hover:text-white transition-colors"
                  >
                    <span className="text-lg">
                      {resource.type === 'video'
                        ? '🎥'
                        : resource.type === 'documentation'
                          ? '📚'
                          : resource.type === 'tutorial'
                            ? '📖'
                            : '🔗'}
                    </span>
                    <span className="flex-1">{resource.title}</span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-4 space-y-2">
            <button
              onClick={e => {
                e.stopPropagation();
                // Navigate to learning path
                window.location.href = `/learning-paths/${path.id}`;
              }}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200"
            >
              Start Learning Path
            </button>

            {/* Resources Button */}
            <button
              onClick={e => {
                e.stopPropagation();
                // Navigate to resources page for this learning path
                window.location.href = `/learning-paths/${path.id}/resources`;
              }}
              className="w-full bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <span>📚</span>
              <span>Resources</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
