// v1.0 - Enhanced User Dashboard with Progress Tracking
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useUserProgress } from '@/hooks/useUserProgress';
import { useCookieAuth } from '@/contexts/CookieAuthContext';
import {
  BookOpen,
  Code,
  Target,
  Clock,
  Zap,
  BarChart3,
  CheckCircle,
  Loader2,
  LogOut,
  Settings,
  Trophy,
  Star,
  Play,
  ArrowRight,
  Timer,
  Brain,
  Flame,
  Medal,
  ChevronRight,
  Activity,
  RefreshCw,
} from 'lucide-react';

interface DashboardCard {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  href: string;
  stats: string;
  progress?: number;
}

interface RecentActivity {
  id: string;
  type: 'question' | 'challenge' | 'path';
  title: string;
  time: string;
  points: number;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

interface Recommendation {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  estimatedTime: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  href: string;
}

export default function EnhancedDashboard() {
  const { user, signOut } = useCookieAuth();
  const {
    progress,
    dashboardStats,
    continueData,
    isLoading,
    error,
    refreshProgress,
    refreshDashboardStats,
  } = useUserProgress();

  const [showStats, setShowStats] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Dashboard cards with real progress data
  const dashboardCards: DashboardCard[] = [
    {
      id: 'questions',
      title: 'Practice Questions',
      description: 'Continue practicing frontend questions',
      icon: BookOpen,
      color: 'from-blue-500 to-blue-600',
      href: '/questions',
      stats: `${progress?.totalQuestionsCompleted || 0} completed`,
      progress: dashboardStats ? dashboardStats.averageScore || 0 : 0,
    },
    {
      id: 'learning-paths',
      title: 'Learning Paths',
      description: 'Follow structured learning paths',
      icon: Target,
      color: 'from-purple-500 to-purple-600',
      href: '/learning-paths',
      stats: `${progress?.learningPaths?.length || 0} paths in progress`,
      progress: dashboardStats ? dashboardStats.completionRate : 0,
    },
    {
      id: 'challenges',
      title: 'Coding Challenges',
      description: 'Solve real coding problems',
      icon: Code,
      color: 'from-green-500 to-green-600',
      href: '/challenges',
      stats: `${progress?.totalChallengesCompleted || 0} challenges solved`,
      progress: dashboardStats ? dashboardStats.averageScore || 0 : 0,
    },
    {
      id: 'analytics',
      title: 'Progress Analytics',
      description: 'View your learning progress',
      icon: BarChart3,
      color: 'from-orange-500 to-orange-600',
      href: '/progress',
      stats: `${Math.round(dashboardStats?.completionRate || 0)}% completion rate`,
    },
  ];

  // Recent activities from real data
  const recentActivities: RecentActivity[] =
    dashboardStats?.recentActivity?.slice(0, 4).map((activity, index) => ({
      id: `activity-${index}`,
      type: activity.type,
      title: activity.title,
      time: formatTimeAgo(activity.timestamp),
      points: activity.points,
      icon:
        activity.type === 'question'
          ? CheckCircle
          : activity.type === 'challenge'
            ? Trophy
            : Target,
      color:
        activity.type === 'question'
          ? 'text-green-500'
          : activity.type === 'challenge'
            ? 'text-blue-500'
            : 'text-purple-500',
    })) || [];

  // Recommendations based on user progress
  const recommendations: Recommendation[] = [
    {
      id: 'react-hooks',
      title: 'React Hooks Deep Dive',
      description: 'Master useState, useEffect, and custom hooks',
      difficulty: 'Intermediate',
      estimatedTime: '2-3 hours',
      icon: Code,
      color: 'from-blue-500 to-cyan-500',
      href: '/learning-paths/react-hooks',
    },
    {
      id: 'css-grid',
      title: 'CSS Grid Mastery',
      description: 'Learn advanced CSS Grid layouts and techniques',
      difficulty: 'Advanced',
      estimatedTime: '3-4 hours',
      icon: Target,
      color: 'from-purple-500 to-pink-500',
      href: '/learning-paths/css-grid',
    },
    {
      id: 'javascript-es6',
      title: 'JavaScript ES6+ Features',
      description: 'Explore modern JavaScript features and syntax',
      difficulty: 'Intermediate',
      estimatedTime: '2-3 hours',
      icon: Zap,
      color: 'from-green-500 to-emerald-500',
      href: '/learning-paths/javascript-es6',
    },
  ];

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await Promise.all([refreshProgress(), refreshDashboardStats()]);
    } catch (error) {
      console.error('Error refreshing dashboard:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // Show error screen for any error (including timeouts) if we don't have progress data
  if (error && !progress) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">⚠️</div>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={handleRefresh}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // If we have an error but also have progress data, show a warning banner
  if (error && progress) {
    console.log('Showing dashboard with real data despite error:', error);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Error Warning Banner - only show if we have real data but there's an error */}
        {error && progress && (
          <div className="mb-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <div className="flex items-center">
              <div className="text-yellow-600 dark:text-yellow-400 mr-3">
                ⚠️
              </div>
              <div className="flex-1">
                <p className="text-yellow-800 dark:text-yellow-200 text-sm">
                  Some data may not be fully loaded. {error}
                </p>
              </div>
              <button
                onClick={handleRefresh}
                className="ml-3 px-3 py-1 bg-yellow-600 text-white text-sm rounded hover:bg-yellow-700 transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome back, {user?.displayName || 'Developer'}! 👋
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Ready to continue your frontend development journey?
            </p>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-3 mt-4 md:mt-0">
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors disabled:opacity-50"
              title="Refresh Dashboard"
            >
              <RefreshCw
                className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`}
              />
            </button>
            <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
              <Settings className="w-5 h-5" />
            </button>
            <button
              onClick={signOut}
              className="flex items-center space-x-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Continue Where You Left Off */}
        {continueData?.recentPath && (
          <div className="mb-8">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold flex items-center">
                  <Play className="w-6 h-6 mr-2" />
                  Continue Where You Left Off
                </h2>
                <span className="text-blue-200 text-sm">
                  {formatTimeAgo(continueData.recentPath.lastAccessed)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    {continueData.recentPath.pathName}
                  </h3>
                  <p className="text-blue-100 mb-3">
                    {continueData.recentPath.completedSections.length} sections
                    completed
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-blue-200">
                    <span className="flex items-center">
                      <Timer className="w-4 h-4 mr-1" />
                      {formatTimeSpent(continueData.recentPath.timeSpent)}
                    </span>
                    <span className="flex items-center">
                      <Target className="w-4 h-4 mr-1" />
                      {continueData.recentPath.progress}% complete
                    </span>
                  </div>
                </div>
                <Link
                  href={`/learning-paths/${continueData.recentPath.pathId}`}
                  className="flex items-center space-x-2 px-6 py-3 bg-white text-blue-600 rounded-xl hover:bg-blue-50 transition-colors font-semibold"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="mt-4">
                <div className="w-full bg-blue-500/30 rounded-full h-2">
                  <div
                    className="bg-white h-2 rounded-full transition-all duration-500"
                    style={{ width: `${continueData.recentPath.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Statistics Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Your Progress
            </h2>
            <button
              onClick={() => setShowStats(!showStats)}
              className="md:hidden px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {showStats ? 'Hide Stats' : 'Show Stats'}
            </button>
          </div>

          {showStats && (
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">
                      {progress?.totalQuestionsCompleted || 0}
                    </div>
                    <div className="text-gray-600 dark:text-gray-400">
                      Questions Completed
                    </div>
                  </div>
                  <BookOpen className="w-8 h-8 text-blue-500" />
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-purple-600">
                      {progress?.totalPoints || 0}
                    </div>
                    <div className="text-gray-600 dark:text-gray-400">
                      Total Points
                    </div>
                  </div>
                  <Star className="w-8 h-8 text-purple-500" />
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-green-600">
                      {progress?.currentStreak || 0}
                    </div>
                    <div className="text-gray-600 dark:text-gray-400">
                      Day Streak
                    </div>
                  </div>
                  <Flame className="w-8 h-8 text-green-500" />
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-orange-600">
                      {progress?.achievements?.length || 0}
                    </div>
                    <div className="text-gray-600 dark:text-gray-400">
                      Achievements
                    </div>
                  </div>
                  <Medal className="w-8 h-8 text-orange-500" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Dashboard Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardCards.map(card => (
            <Link
              key={card.id}
              href={card.href}
              className="group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <div
                className={`w-16 h-16 bg-gradient-to-r ${card.color} rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}
              >
                <card.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {card.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-3">
                {card.description}
              </p>
              <div className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-2">
                {card.stats}
              </div>
              {card.progress !== undefined && (
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${card.progress}%` }}
                  ></div>
                </div>
              )}
            </Link>
          ))}
        </div>

        {/* Recent Activities & Recommendations */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Activities */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <Activity className="w-5 h-5 mr-2 text-blue-500" />
              Recent Activities
            </h3>
            <div className="space-y-4">
              {recentActivities.length > 0 ? (
                recentActivities.map(activity => (
                  <div
                    key={activity.id}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                      <activity.icon className={`w-5 h-5 ${activity.color}`} />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 dark:text-white">
                        {activity.title}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {activity.time}
                      </div>
                    </div>
                    <div className="text-sm font-bold text-green-600">
                      +{activity.points}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <Activity className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No recent activities yet</p>
                  <p className="text-sm">
                    Start learning to see your progress here!
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <Brain className="w-5 h-5 mr-2 text-yellow-500" />
              Recommended for You
            </h3>
            <div className="space-y-4">
              {recommendations.map(rec => (
                <Link
                  key={rec.id}
                  href={rec.href}
                  className="block p-4 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
                >
                  <div className="flex items-start space-x-3">
                    <div
                      className={`w-12 h-12 bg-gradient-to-r ${rec.color} rounded-lg flex items-center justify-center flex-shrink-0`}
                    >
                      <rec.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {rec.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {rec.description}
                      </p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                        <span className="flex items-center">
                          <Target className="w-3 h-3 mr-1" />
                          {rec.difficulty}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {rec.estimatedTime}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
