// v1.0 - Progress Analytics Component
"use client";

import { useState } from "react";
// import { useUserProgress } from '@elzatona/hooks'; // Removed - useUserProgress is not exported
import {
  BarChart3,
  TrendingUp,
  Target,
  Clock,
  Award,
  Brain,
  Zap,
  Calendar,
  Loader2,
  RefreshCw,
} from "lucide-react";

interface AnalyticsCard {
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export default function ProgressAnalytics() {
  // useUserProgress hook removed - not available in shared-hooks
  const dashboardStats = null as any;
  const isLoading = false;
  const error = null;
  const refreshDashboardStats = async () => {};
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await refreshDashboardStats();
    } catch (error) {
      console.error("Error refreshing analytics:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const formatTimeSpent = (minutes: number): string => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  const analyticsCards: AnalyticsCard[] = dashboardStats
    ? [
        {
          title: "Total Time Spent",
          value: formatTimeSpent(dashboardStats.totalTimeSpent),
          subtitle: "Learning time",
          icon: Clock,
          color: "text-blue-600",
          trend: {
            value: dashboardStats.currentStreak,
            isPositive: true,
          },
        },
        {
          title: "Average Score",
          value: `${Math.round(dashboardStats.accuracy)}%`,
          subtitle: "Question accuracy",
          icon: Target,
          color: "text-green-600",
          trend: {
            value: dashboardStats.accuracy - 70, // Assuming 70% as baseline
            isPositive: dashboardStats.accuracy > 70,
          },
        },
        {
          title: "Completion Rate",
          value: `${Math.round(dashboardStats.accuracy)}%`,
          subtitle: "Learning paths",
          icon: TrendingUp,
          color: "text-purple-600",
          trend: {
            value: dashboardStats.accuracy - 50, // Assuming 50% as baseline
            isPositive: dashboardStats.accuracy > 50,
          },
        },
        {
          title: "Weekly Progress",
          value: dashboardStats.currentStreak,
          subtitle: "Questions this week",
          icon: Calendar,
          color: "text-orange-600",
          trend: {
            value: dashboardStats.currentStreak - 5, // Assuming 5 as baseline
            isPositive: dashboardStats.currentStreak > 5,
          },
        },
      ]
    : [];

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin text-blue-600 mr-2" />
          <span className="text-gray-600 dark:text-gray-400">
            Loading analytics...
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
          <p className="text-red-600 mb-4">Failed to load analytics</p>
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
          <BarChart3 className="w-6 h-6 mr-2 text-blue-500" />
          Progress Analytics
        </h2>
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors disabled:opacity-50"
          title="Refresh Analytics"
        >
          <RefreshCw
            className={`w-5 h-5 ${isRefreshing ? "animate-spin" : ""}`}
          />
        </button>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {analyticsCards.map((card, index) => (
          <div
            key={`analytics-card-${card.title}-${index}`}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg bg-gray-100 dark:bg-gray-700`}>
                <card.icon className={`w-6 h-6 ${card.color}`} />
              </div>
              {card.trend && (
                <div
                  className={`flex items-center text-sm ${
                    card.trend.isPositive ? "text-green-600" : "text-red-600"
                  }`}
                >
                  <TrendingUp
                    className={`w-4 h-4 mr-1 ${
                      card.trend.isPositive ? "" : "rotate-180"
                    }`}
                  />
                  {Math.abs(card.trend.value).toFixed(1)}
                </div>
              )}
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {card.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {card.subtitle}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Top Categories */}
      {dashboardStats?.recentActivity &&
        dashboardStats?.recentActivity.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <Brain className="w-5 h-5 mr-2 text-purple-500" />
              Top Performing Categories
            </h3>
            <div className="space-y-4">
              {dashboardStats?.recentActivity?.map(
                (activity: any, index: number) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {activity.type}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {activity.description}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900 dark:text-white">
                        {activity.points}
                      </div>
                      <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                          style={{
                            width: `${Math.min(100, activity.points)}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        )}

      {/* Recent Activity Summary */}
      {dashboardStats?.recentActivity &&
        dashboardStats?.recentActivity.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <Zap className="w-5 h-5 mr-2 text-yellow-500" />
              Recent Activity Summary
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  {dashboardStats?.recentActivity?.filter(
                    (a: any) => a.type === "question",
                  ).length ?? 0}
                </div>
                <div className="text-sm text-blue-600 dark:text-blue-400">
                  Questions
                </div>
              </div>
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="text-2xl font-bold text-green-600 mb-1">
                  {dashboardStats?.recentActivity?.filter(
                    (a: any) => a.type === "challenge",
                  ).length ?? 0}
                </div>
                <div className="text-sm text-green-600 dark:text-green-400">
                  Challenges
                </div>
              </div>
              <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="text-2xl font-bold text-purple-600 mb-1">
                  {dashboardStats?.recentActivity?.filter(
                    (a: any) => a.type === "path",
                  ).length ?? 0}
                </div>
                <div className="text-sm text-purple-600 dark:text-purple-400">
                  Learning Paths
                </div>
              </div>
            </div>
          </div>
        )}

      {/* Insights */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
        <h3 className="text-xl font-bold mb-4 flex items-center">
          <Award className="w-5 h-5 mr-2" />
          Learning Insights
        </h3>
        <div className="space-y-3">
          {dashboardStats && (
            <>
              {dashboardStats.accuracy > 80 && (
                <div className="flex items-center space-x-2">
                  <span className="text-green-300">🎯</span>
                  <span>
                    Excellent accuracy! You&apos;re mastering the concepts.
                  </span>
                </div>
              )}
              {dashboardStats.currentStreak > 10 && (
                <div className="flex items-center space-x-2">
                  <span className="text-blue-300">🔥</span>
                  <span>Great consistency! Keep up the daily practice.</span>
                </div>
              )}
              {dashboardStats.accuracy > 70 && (
                <div className="flex items-center space-x-2">
                  <span className="text-purple-300">🏆</span>
                  <span>Outstanding progress on learning paths!</span>
                </div>
              )}
              {dashboardStats.totalTimeSpent > 300 && (
                <div className="flex items-center space-x-2">
                  <span className="text-yellow-300">⏰</span>
                  <span>
                    You&apos;ve invested significant time in learning. Well
                    done!
                  </span>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
