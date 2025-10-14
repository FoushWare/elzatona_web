'use client';

import React, { useState, useMemo } from 'react';
import {
  useSystemAnalytics,
  useUserAnalytics,
  useUserInsights,
  useUserProgress,
} from '@/hooks/useTanStackQuery';
import {
  BarChart3,
  Users,
  TrendingUp,
  Clock,
  Target,
  Award,
  Activity,
  BookOpen,
  Brain,
  Zap,
  RefreshCw,
  Download,
  Filter,
} from 'lucide-react';

interface AnalyticsDashboardProps {
  selectedUserId?: string;
}

export default function AnalyticsDashboard({
  selectedUserId,
}: AnalyticsDashboardProps) {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>(
    '30d'
  );
  const [regenerateAnalytics, setRegenerateAnalytics] = useState(false);

  // System analytics
  const {
    data: systemAnalytics,
    isLoading: systemLoading,
    error: systemError,
    refetch: refetchSystem,
  } = useSystemAnalytics();

  // User analytics (if userId provided)
  const {
    data: userAnalytics,
    isLoading: userLoading,
    error: userError,
    refetch: refetchUser,
  } = useUserAnalytics(selectedUserId || '', regenerateAnalytics);

  // User insights (if userId provided)
  const {
    data: userInsights,
    isLoading: insightsLoading,
    error: insightsError,
  } = useUserInsights(selectedUserId || '');

  // User progress (if userId provided)
  const {
    data: userProgress,
    isLoading: progressLoading,
    error: progressError,
  } = useUserProgress(selectedUserId || '');

  const handleRegenerateAnalytics = () => {
    setRegenerateAnalytics(true);
    refetchUser();
    setTimeout(() => setRegenerateAnalytics(false), 1000);
  };

  const handleRefreshAll = () => {
    refetchSystem();
    if (selectedUserId) {
      refetchUser();
    }
  };

  // Loading state
  if (systemLoading || (selectedUserId && userLoading)) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-gray-800 rounded-lg p-6"
                >
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (systemError || (selectedUserId && userError)) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
            <div className="flex items-center">
              <Activity className="h-5 w-5 text-red-500 mr-2" />
              <h3 className="text-lg font-medium text-red-800 dark:text-red-200">
                Error Loading Analytics
              </h3>
            </div>
            <p className="mt-2 text-red-700 dark:text-red-300">
              {systemError?.message ||
                userError?.message ||
                'Failed to load analytics data'}
            </p>
            <button
              onClick={handleRefreshAll}
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              <RefreshCw className="h-4 w-4 mr-2 inline" />
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  const analytics = systemAnalytics?.analytics;
  const userData = userAnalytics?.analytics;
  const insights = userInsights?.insights;
  const progress = userProgress?.data;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Analytics Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              {selectedUserId
                ? `User Analytics for ${selectedUserId}`
                : 'System-wide Analytics'}
            </p>
          </div>

          <div className="flex items-center space-x-4">
            {/* Time Range Selector */}
            <select
              value={timeRange}
              onChange={e => setTimeRange(e.target.value as any)}
              className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>

            {/* Refresh Button */}
            <button
              onClick={handleRefreshAll}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </button>

            {/* Regenerate Analytics Button (for user view) */}
            {selectedUserId && (
              <button
                onClick={handleRegenerateAnalytics}
                disabled={regenerateAnalytics}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center disabled:opacity-50"
              >
                <Zap className="h-4 w-4 mr-2" />
                {regenerateAnalytics ? 'Regenerating...' : 'Regenerate'}
              </button>
            )}
          </div>
        </div>

        {/* System Analytics Overview */}
        {analytics && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              System Overview
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* Total Users */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Total Users
                    </p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                      {analytics.totalUsers || 0}
                    </p>
                  </div>
                  <Users className="h-8 w-8 text-blue-500" />
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-green-600 dark:text-green-400">
                    +{analytics.newUsersThisMonth || 0} this month
                  </span>
                </div>
              </div>

              {/* Active Sessions */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Active Sessions
                    </p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                      {analytics.activeSessions || 0}
                    </p>
                  </div>
                  <Activity className="h-8 w-8 text-green-500" />
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <Clock className="h-4 w-4 text-blue-500 mr-1" />
                  <span className="text-blue-600 dark:text-blue-400">
                    Avg: {analytics.averageSessionDuration || '0'} min
                  </span>
                </div>
              </div>

              {/* Content Completion */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Completion Rate
                    </p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                      {analytics.averageCompletionRate || 0}%
                    </p>
                  </div>
                  <Target className="h-8 w-8 text-purple-500" />
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <BookOpen className="h-4 w-4 text-purple-500 mr-1" />
                  <span className="text-purple-600 dark:text-purple-400">
                    {analytics.totalCompletions || 0} completed
                  </span>
                </div>
              </div>

              {/* Learning Paths */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Learning Paths
                    </p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                      {analytics.totalLearningPaths || 0}
                    </p>
                  </div>
                  <Brain className="h-8 w-8 text-orange-500" />
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <Award className="h-4 w-4 text-orange-500 mr-1" />
                  <span className="text-orange-600 dark:text-orange-400">
                    {analytics.popularPath || 'Most Popular'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* User Analytics (if userId provided) */}
        {selectedUserId && userData && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              User Analytics
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {/* User Progress */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Overall Progress
                    </p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                      {userData.overallProgress || 0}%
                    </p>
                  </div>
                  <Target className="h-8 w-8 text-blue-500" />
                </div>
                <div className="mt-4">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${userData.overallProgress || 0}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Time Spent */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Time Spent
                    </p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                      {userData.totalTimeSpent || 0}h
                    </p>
                  </div>
                  <Clock className="h-8 w-8 text-green-500" />
                </div>
                <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                  {userData.averageSessionTime || 0} min per session
                </div>
              </div>

              {/* Average Score */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Average Score
                    </p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                      {userData.averageScore || 0}%
                    </p>
                  </div>
                  <Award className="h-8 w-8 text-purple-500" />
                </div>
                <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                  {userData.totalQuestionsAnswered || 0} questions answered
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Learning Insights */}
        {selectedUserId && insights && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Learning Insights
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Strengths */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Strengths
                </h3>
                <div className="space-y-3">
                  {insights.strengths?.map(
                    (strength: string, index: number) => (
                      <div key={index} className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                        <span className="text-gray-700 dark:text-gray-300">
                          {strength}
                        </span>
                      </div>
                    )
                  ) || (
                    <p className="text-gray-500 dark:text-gray-400">
                      No strengths identified yet
                    </p>
                  )}
                </div>
              </div>

              {/* Areas for Improvement */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Areas for Improvement
                </h3>
                <div className="space-y-3">
                  {insights.improvementAreas?.map(
                    (area: string, index: number) => (
                      <div key={index} className="flex items-center">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                        <span className="text-gray-700 dark:text-gray-300">
                          {area}
                        </span>
                      </div>
                    )
                  ) || (
                    <p className="text-gray-500 dark:text-gray-400">
                      No improvement areas identified yet
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Progress Details */}
        {selectedUserId && progress && Array.isArray(progress) && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Progress Details
            </h2>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Content Progress
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Content
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Progress
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Score
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {progress.slice(0, 10).map((item: any, index: number) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                          {item.contentName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {item.contentType}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              item.status === 'completed'
                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                : item.status === 'in-progress'
                                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                                  : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                            }`}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {item.progress || 0}%
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {item.score || 'N/A'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Export Button */}
        <div className="flex justify-end">
          <button className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Export Analytics
          </button>
        </div>
      </div>
    </div>
  );
}
