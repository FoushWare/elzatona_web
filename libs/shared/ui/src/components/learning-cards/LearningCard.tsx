'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Clock, Users, Target, CheckCircle, PlayCircle } from 'lucide-react';
import type { LearningCard } from '@elzatona/shared/types/learning-cards';

interface LearningCardProps {
  card: LearningCard;
  progress?: {
    status: 'not-started' | 'in-progress' | 'completed' | 'skipped';
    progress: number;
    timeSpent: number;
    questionsCompleted: number;
  };
  onStart?: () => void;
  onContinue?: () => void;
  onViewDetails?: () => void;
  className?: string;
}

const CARD_ICONS = {
  'core-technologies': '💻',
  'framework-questions': '⚛️',
  'problem-solving': '🧩',
  'system-design': '🏗️',
} as const;

const CARD_COLORS = {
  blue: 'border-blue-200 bg-blue-50 hover:bg-blue-100',
  green: 'border-green-200 bg-green-50 hover:bg-green-100',
  purple: 'border-purple-200 bg-purple-50 hover:bg-purple-100',
  orange: 'border-orange-200 bg-orange-50 hover:bg-orange-100',
} as const;

const STATUS_COLORS = {
  'not-started': 'bg-gray-100 text-gray-600',
  'in-progress': 'bg-blue-100 text-blue-600',
  completed: 'bg-green-100 text-green-600',
  skipped: 'bg-yellow-100 text-yellow-600',
} as const;

const STATUS_ICONS = {
  'not-started': <PlayCircle className="w-4 h-4" />,
  'in-progress': <Clock className="w-4 h-4" />,
  completed: <CheckCircle className="w-4 h-4" />,
  skipped: <Target className="w-4 h-4" />,
} as const;

export function LearningCardComponent({
  card,
  progress,
  onStart,
  onContinue,
  onViewDetails,
  className = '',
}: LearningCardProps) {
  const cardIcon = CARD_ICONS[card.type] || '📚';
  const cardColorClass =
    CARD_COLORS[card.color as keyof typeof CARD_COLORS] || CARD_COLORS.blue;
  const statusColorClass = progress
    ? STATUS_COLORS[progress.status]
    : STATUS_COLORS['not-started'];
  const statusIcon = progress
    ? STATUS_ICONS[progress.status]
    : STATUS_ICONS['not-started'];

  const getActionButton = () => {
    if (!progress) {
      return (
        <Button onClick={onStart} className="w-full">
          <PlayCircle className="w-4 h-4 mr-2" />
          Start Learning
        </Button>
      );
    }

    switch (progress.status) {
      case 'completed':
        return (
          <Button variant="outline" onClick={onViewDetails} className="w-full">
            <CheckCircle className="w-4 h-4 mr-2" />
            Review
          </Button>
        );
      case 'in-progress':
        return (
          <Button onClick={onContinue} className="w-full">
            <Clock className="w-4 h-4 mr-2" />
            Continue ({Math.round(progress.progress)}%)
          </Button>
        );
      case 'skipped':
        return (
          <Button variant="outline" onClick={onStart} className="w-full">
            <PlayCircle className="w-4 h-4 mr-2" />
            Start Again
          </Button>
        );
      default:
        return (
          <Button onClick={onStart} className="w-full">
            <PlayCircle className="w-4 h-4 mr-2" />
            Start Learning
          </Button>
        );
    }
  };

  return (
    <Card
      className={`transition-all duration-200 hover:shadow-md ${cardColorClass} ${className}`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">{cardIcon}</span>
            <div>
              <CardTitle className="text-lg">{card.title}</CardTitle>
              <CardDescription className="text-sm">
                {card.description}
              </CardDescription>
            </div>
          </div>
          {progress && (
            <Badge
              className={`${statusColorClass} flex items-center space-x-1`}
            >
              {statusIcon}
              <span className="capitalize">
                {progress.status.replace('-', ' ')}
              </span>
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Progress Bar */}
        {progress && progress.status === 'in-progress' && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Progress</span>
              <span>{Math.round(progress.progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress.progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Card Stats */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <Target className="w-4 h-4 text-gray-500" />
            <span>{card.config.questionCount} questions</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-gray-500" />
            <span>{card.config.timeLimit || 'No limit'} min</span>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-gray-500" />
            <span className="capitalize">{card.config.difficulty}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-gray-500">📚</span>
            <span>{card.content.resources.length} resources</span>
          </div>
        </div>

        {/* Topics */}
        <div className="space-y-2">
          <span className="text-sm font-medium text-gray-700">Topics:</span>
          <div className="flex flex-wrap gap-1">
            {card.config.topics.map(topic => (
              <Badge key={topic} variant="secondary" className="text-xs">
                {topic}
              </Badge>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">{getActionButton()}</div>

        {/* Additional Info */}
        {progress && progress.status === 'in-progress' && (
          <div className="text-xs text-gray-500 space-y-1">
            <div>Questions completed: {progress.questionsCompleted}</div>
            <div>Time spent: {Math.round(progress.timeSpent)} minutes</div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default LearningCardComponent;
