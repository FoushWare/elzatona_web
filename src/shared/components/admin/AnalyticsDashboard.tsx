'use client';

import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shared/components/ui/tabs';
import {
  Users,
  Activity,
  TrendingUp,
  Clock,
  Target,
  BarChart3,
  PieChart,
  LineChart,
  Calendar,
  Award,
  BookOpen,
  MessageSquare,
  Layers,
  Loader2,
} from 'lucide-react';
import {
  useSystemAnalytics,
  useUserAnalytics,
  useUserInsights,
} from '@/hooks/useTanStackQuery';

interface AnalyticsDashboardProps {
  userId?: string;
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({
  userId,
}) => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('overview');

  // Hooks
  const { data: systemAnalytics, isLoading: systemLoading } =
    useSystemAnalytics();
  const { data: userAnalytics, isLoading: userLoading } = useUserAnalytics(
    userId || ''
  );
  const { data: userInsights, isLoading: insightsLoading } = useUserInsights(
    userId || ''
  );

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const formatDuration = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`;
    if (seconds < 3600) return `${Math.round(seconds / 60)}m`;
    return `${Math.round(seconds / 3600)}h`;
  };

  const formatPercentage = (num: number) => {
    return `${Math.round(num)}%`;
  };

  const StatCard = ({
    icon: Icon,
    title,
    value,
    subtitle,
    color = '#3B82F6',
    trend,
  }: {
    icon: any;
    title: string;
    value: string | number;
    subtitle?: string;
    color?: string;
    trend?: { value: number; isPositive: boolean };
  }) => (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {title}
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {value}
            </p>
            {subtitle && (
              <p className="text-xs text-gray-500 dark:text-gray-500">
                {subtitle}
              </p>
            )}
          </div>
          <div className="flex items-center">
            <div
              className="p-3 rounded-full"
              style={{ backgroundColor: `${color}20` }}
            >
              <Icon className="h-6 w-6" style={{ color }} />
            </div>
          </div>
        </div>
        {trend && (
          <div className="mt-2 flex items-center">
            <TrendingUp
              className={`h-4 w-4 mr-1 ${
                trend.isPositive ? 'text-green-500' : 'text-red-500'
              }`}
            />
            <span
              className={`text-sm ${
                trend.isPositive ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {trend.isPositive ? '+' : ''}
              {trend.value}%
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );

  if (systemLoading || userLoading || insightsLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            📊 Analytics Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {userId
              ? 'User-specific analytics and insights'
              : 'System-wide analytics and performance metrics'}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Select
            value={selectedTimeRange}
            onValueChange={setSelectedTimeRange}
          >
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedMetric} onValueChange={setSelectedMetric}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="overview">Overview</SelectItem>
              <SelectItem value="engagement">Engagement</SelectItem>
              <SelectItem value="performance">Performance</SelectItem>
              <SelectItem value="content">Content</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* System Analytics */}
      {!userId && systemAnalytics && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              icon={Users}
              title="Total Users"
              value={formatNumber(systemAnalytics.totalUsers)}
              color="#3B82F6"
            />
            <StatCard
              icon={Activity}
              title="Active Users"
              value={formatNumber(systemAnalytics.activeUsers)}
              subtitle="Last 30 days"
              color="#10B981"
            />
            <StatCard
              icon={Clock}
              title="Avg Session Duration"
              value={formatDuration(systemAnalytics.averageSessionDuration)}
              color="#F59E0B"
            />
            <StatCard
              icon={MessageSquare}
              title="Questions Answered"
              value={formatNumber(systemAnalytics.totalQuestionsAnswered)}
              color="#EF4444"
            />
          </div>

          {/* User Engagement */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                User Engagement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {formatNumber(
                      systemAnalytics.userEngagement.dailyActiveUsers
                    )}
                  </div>
                  <div className="text-sm text-gray-600">
                    Daily Active Users
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {formatNumber(
                      systemAnalytics.userEngagement.weeklyActiveUsers
                    )}
                  </div>
                  <div className="text-sm text-gray-600">
                    Weekly Active Users
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {formatNumber(
                      systemAnalytics.userEngagement.monthlyActiveUsers
                    )}
                  </div>
                  <div className="text-sm text-gray-600">
                    Monthly Active Users
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Content Performance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Content Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="questions" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="questions">Questions</TabsTrigger>
                  <TabsTrigger value="topics">Topics</TabsTrigger>
                  <TabsTrigger value="cards">Cards</TabsTrigger>
                  <TabsTrigger value="plans">Plans</TabsTrigger>
                </TabsList>
                <TabsContent value="questions" className="mt-4">
                  <div className="space-y-2">
                    {systemAnalytics.contentPerformance.mostAnsweredQuestions.map(
                      (questionId, index) => (
                        <div
                          key={questionId}
                          className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded"
                        >
                          <span className="text-sm">Question {questionId}</span>
                          <Badge variant="secondary">#{index + 1}</Badge>
                        </div>
                      )
                    )}
                  </div>
                </TabsContent>
                <TabsContent value="topics" className="mt-4">
                  <div className="space-y-2">
                    {systemAnalytics.contentPerformance.mostCompletedTopics.map(
                      (topicId, index) => (
                        <div
                          key={topicId}
                          className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded"
                        >
                          <span className="text-sm">Topic {topicId}</span>
                          <Badge variant="secondary">#{index + 1}</Badge>
                        </div>
                      )
                    )}
                  </div>
                </TabsContent>
                <TabsContent value="cards" className="mt-4">
                  <div className="space-y-2">
                    {systemAnalytics.contentPerformance.mostPopularCards.map(
                      (cardId, index) => (
                        <div
                          key={cardId}
                          className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded"
                        >
                          <span className="text-sm">Card {cardId}</span>
                          <Badge variant="secondary">#{index + 1}</Badge>
                        </div>
                      )
                    )}
                  </div>
                </TabsContent>
                <TabsContent value="plans" className="mt-4">
                  <div className="space-y-2">
                    {systemAnalytics.contentPerformance.mostCompletedPlans.map(
                      (planId, index) => (
                        <div
                          key={planId}
                          className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded"
                        >
                          <span className="text-sm">Plan {planId}</span>
                          <Badge variant="secondary">#{index + 1}</Badge>
                        </div>
                      )
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      )}

      {/* User Analytics */}
      {userId && userAnalytics && (
        <div className="space-y-6">
          {/* User Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              icon={Clock}
              title="Total Time Spent"
              value={formatDuration(userAnalytics.totalTimeSpent)}
              color="#3B82F6"
            />
            <StatCard
              icon={MessageSquare}
              title="Questions Answered"
              value={userAnalytics.totalQuestionsAnswered}
              color="#10B981"
            />
            <StatCard
              icon={BookOpen}
              title="Topics Completed"
              value={userAnalytics.totalTopicsCompleted}
              color="#F59E0B"
            />
            <StatCard
              icon={Award}
              title="Average Score"
              value={formatPercentage(userAnalytics.averageScore)}
              color="#EF4444"
            />
          </div>

          {/* Learning Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5" />
                Learning Progress Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-600">
                    {userAnalytics.progressDistribution.notStarted}
                  </div>
                  <div className="text-sm text-gray-600">Not Started</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">
                    {userAnalytics.progressDistribution.inProgress}
                  </div>
                  <div className="text-sm text-gray-600">In Progress</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {userAnalytics.progressDistribution.completed}
                  </div>
                  <div className="text-sm text-gray-600">Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">
                    {userAnalytics.progressDistribution.skipped}
                  </div>
                  <div className="text-sm text-gray-600">Skipped</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Learning Patterns */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LineChart className="h-5 w-5" />
                Learning Patterns
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">
                    {userAnalytics.learningPatterns.preferredTimeOfDay}
                  </div>
                  <div className="text-sm text-gray-600">Preferred Time</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">
                    {formatDuration(
                      userAnalytics.learningPatterns.averageSessionDuration
                    )}
                  </div>
                  <div className="text-sm text-gray-600">
                    Avg Session Duration
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">
                    {userAnalytics.learningPatterns.mostActiveDay}
                  </div>
                  <div className="text-sm text-gray-600">Most Active Day</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* User Insights */}
          {userInsights && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Strengths
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {userInsights.strengths.map((strength, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm">{strength}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {userInsights.recommendations.map(
                      (recommendation, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-sm">{recommendation}</span>
                        </div>
                      )
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
