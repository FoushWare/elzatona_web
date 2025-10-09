// v1.0 - Continue Where You Left Off Component
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useUserProgress } from '@/hooks/useUserProgress';
import {
  Play,
  BookOpen,
  Code,
  Target,
  Clock,
  ArrowRight,
  Timer,
  TrendingUp,
  Award,
  Loader2,
} from 'lucide-react';

interface ContinueItem {
  id: string;
  type: 'learningPath' | 'question' | 'challenge';
  title: string;
  description: string;
  progress?: number;
  lastAccessed: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  timeSpent?: number;
  points?: number;
}

export default function ContinueWhereLeftOff() {
  const { continueData, isLoading, error } = useUserProgress();
  const [continueItems, setContinueItems] = useState<ContinueItem[]>([]);

  useEffect(() => {
    if (continueData) {
      const items: ContinueItem[] = [];

      // Add recent learning path
      if (continueData.recentPath) {
        items.push({
          id: continueData.recentPath.pathId,
          type: 'learningPath',
          title: continueData.recentPath.pathName,
          description: `${continueData.recentPath.completedSections.length} sections completed`,
          progress: continueData.recentPath.progress,
          lastAccessed: continueData.recentPath.lastAccessed,
          href: `/learning-paths/${continueData.recentPath.pathId}`,
          icon: Target,
          color: 'from-purple-500 to-purple-600',
          timeSpent: continueData.recentPath.timeSpent,
        });
      }

      // Add recent questions
      if (
        continueData.recentQuestions &&
        continueData.recentQuestions.length > 0
      ) {
        (
          continueData.recentQuestions as Array<{
            questionId: string;
            category: string;
            answeredCorrectly: boolean;
            timestamp: string;
            points?: number;
          }>
        )
          .slice(0, 2)
          .forEach(
            (
              question: {
                questionId: string;
                category: string;
                answeredCorrectly: boolean;
                timestamp: string;
                points?: number;
              },
              index: number
            ) => {
              items.push({
                id: `question-${question.questionId}`,
                type: 'question',
                title: `${question.category} Question`,
                description: question.answeredCorrectly
                  ? 'Completed correctly'
                  : 'Needs review',
                lastAccessed: question.timestamp,
                href: `/questions/${question.questionId}`,
                icon: BookOpen,
                color: question.answeredCorrectly
                  ? 'from-green-500 to-green-600'
                  : 'from-orange-500 to-orange-600',
                points: question.points,
              });
            }
          );
      }

      // Add recent challenges
      if (
        continueData.recentChallenges &&
        continueData.recentChallenges.length > 0
      ) {
        continueData.recentChallenges.slice(0, 2).forEach(
          (
            challenge: {
              challengeId: string;
              challengeName: string;
              completed: boolean;
              timestamp: string;
              points?: number;
            },
            index: number
          ) => {
            items.push({
              id: `challenge-${challenge.challengeId}`,
              type: 'challenge',
              title: challenge.challengeName,
              description: challenge.completed ? 'Completed' : 'In progress',
              lastAccessed: challenge.timestamp,
              href: `/challenges/${challenge.challengeId}`,
              icon: Code,
              color: challenge.completed
                ? 'from-blue-500 to-blue-600'
                : 'from-yellow-500 to-yellow-600',
              points: challenge.points,
            });
          }
        );
      }

      setContinueItems(items);
    }
  }, [continueData]);

  const formatTimeAgo = (timestamp: string): string => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInSeconds = Math.floor((now.getTime() - time.getTime()) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };

  const formatTimeSpent = (minutes: number): string => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin text-blue-600 mr-2" />
          <span className="text-gray-600 dark:text-gray-400">
            Loading your progress...
          </span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="text-center py-8">
          <div className="text-red-500 mb-4">⚠️</div>
          <p className="text-red-600 mb-4">Failed to load progress</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  if (continueItems.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
          <Play className="w-5 h-5 mr-2 text-blue-500" />
          Continue Where You Left Off
        </h3>
        <div className="text-center py-8">
          <div className="text-4xl mb-4">🚀</div>
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            Ready to start your learning journey?
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Begin with practice questions or explore learning paths
          </p>
          <div className="mt-6 flex justify-center space-x-4">
            <Link
              href="/questions"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Start Practicing
            </Link>
            <Link
              href="/learning-paths"
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Explore Paths
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
        <Play className="w-5 h-5 mr-2 text-blue-500" />
        Continue Where You Left Off
      </h3>

      <div className="space-y-4">
        {continueItems.map((item, index) => (
          <Link
            key={item.id}
            href={item.href}
            className="block p-4 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div
                  className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-lg flex items-center justify-center flex-shrink-0`}
                >
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {item.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {item.description}
                  </p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                    <span className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {formatTimeAgo(item.lastAccessed)}
                    </span>
                    {item.timeSpent && (
                      <span className="flex items-center">
                        <Timer className="w-3 h-3 mr-1" />
                        {formatTimeSpent(item.timeSpent)}
                      </span>
                    )}
                    {item.points && (
                      <span className="flex items-center">
                        <Award className="w-3 h-3 mr-1" />
                        {item.points} points
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {item.progress !== undefined && (
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {item.progress}%
                    </div>
                    <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${item.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
                <ArrowRight className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {continueItems.length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-600">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Last activity:{' '}
              {formatTimeAgo(
                continueData?.lastActivity || new Date().toISOString()
              )}
            </div>
            <Link
              href="/progress"
              className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
            >
              View all progress →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
