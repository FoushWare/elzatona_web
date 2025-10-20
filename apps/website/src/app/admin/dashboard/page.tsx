'use client';

import { useAdminAuth } from '@elzatona/shared-contexts';
import {
  BookOpen,
  HelpCircle,
  CreditCard,
  FileText,
  Settings,
  Code,
  Calculator,
  BarChart3,
  FolderOpen,
  Users,
  Database,
  TrendingUp,
  CheckCircle,
  Clock,
  Target,
  Activity,
  Zap,
  Star,
  ArrowRight,
  Plus,
  Eye,
  Edit,
  Trash2,
  RefreshCw,
  AlertCircle,
  Info,
  ExternalLink,
} from 'lucide-react';
import { useAdminStats } from '@elzatona/shared-hooks';

interface DashboardStats {
  questions: number;
  categories: number;
  topics: number;
  learningCards: number;
  learningPlans: number;
  frontendTasks: number;
  problemSolvingTasks: number;
  totalContent: number;
  totalUsers: number;
  totalNotifications: number;
  recentActivity: Array<{
    id: string;
    action: string;
    timestamp: any;
    user: string;
    details: string;
  }>;
  recentErrors: Array<{
    id: string;
    error: string;
    timestamp: any;
    severity: string;
    source: string;
  }>;
  systemHealth: {
    databaseConnected: boolean;
    lastUpdated: string;
    apiResponseTime: number;
    totalCollections: number;
    activeCollections: number;
    errorRate: number;
    uptime: string;
  };
  performanceMetrics: {
    averageResponseTime: number;
    databaseQueryTime: number;
    cacheHitRate: number;
    memoryUsage: string;
    cpuUsage: string;
  };
  analytics: {
    contentDistribution: Record<string, number>;
    questionCategories: Record<string, number>;
    questionDifficulty: Record<string, number>;
    questionTypes: Record<string, number>;
    userEngagement: {
      totalUsers: number;
      activeUsers: number;
      totalSessions: number;
      averageSessionDuration: string;
      completionRate: number;
    };
    contentQuality: {
      questionsWithExplanations: number;
      questionsWithHints: number;
      questionsWithSampleAnswers: number;
      averageQuestionLength: number;
    };
  };
}

export default function AdminDashboard() {
  const { user } = useAdminAuth();

  // Use TanStack Query hook for admin stats
  const {
    data: stats,
    isLoading: loading,
    error: statsError,
    refetch: refetchStats,
    isRefetching: refreshing,
  } = useAdminStats();

  const handleRefresh = () => {
    refetchStats();
  };

  const adminMenuItems = [
    {
      href: '/admin/content/questions',
      label: 'Questions',
      icon: HelpCircle,
      description: 'Manage all learning questions',
      color: 'bg-blue-500',
      stats: stats?.questions || 0,
    },
    {
      href: '/admin/content-management',
      label: 'Content Management',
      icon: Settings,
      description: 'Unified learning content management',
      color: 'bg-purple-500',
      stats: `${stats?.categories || 0} categories, ${stats?.topics || 0} topics`,
    },
    {
      href: '/admin/frontend-tasks',
      label: 'Frontend Tasks',
      icon: Code,
      description: 'React/frontend coding challenges',
      color: 'bg-cyan-500',
      stats: stats?.frontendTasks || 0,
    },
    {
      href: '/admin/problem-solving',
      label: 'Problem Solving',
      icon: Calculator,
      description: 'Algorithmic coding challenges',
      color: 'bg-red-500',
      stats: stats?.problemSolvingTasks || 0,
    },
    {
      href: '/admin/reports',
      label: 'Feature Reports',
      icon: BarChart3,
      description: 'View project features and progress',
      color: 'bg-indigo-500',
      stats: 'Reports',
    },
    {
      href: '/admin/users',
      label: 'User Management',
      icon: Users,
      description: 'Create and manage user accounts',
      color: 'bg-pink-500',
      stats: 'Users',
    },
  ];

  const quickActions = [
    {
      title: 'Add New Question',
      description: 'Create a new learning question',
      href: '/admin/content/questions',
      icon: HelpCircle,
      color: 'bg-blue-500',
    },
    {
      title: 'Manage Learning Cards',
      description: 'Configure learning cards and plans',
      href: '/admin/content-management',
      icon: CreditCard,
      color: 'bg-green-500',
    },
    {
      title: 'Create Frontend Task',
      description: 'Add a new React coding challenge',
      href: '/admin/frontend-tasks',
      icon: Code,
      color: 'bg-cyan-500',
    },
    {
      title: 'Add Problem Solving',
      description: 'Create algorithmic challenges',
      href: '/admin/problem-solving',
      icon: Calculator,
      color: 'bg-red-500',
    },
  ];

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* Enhanced Welcome Header */}
        <div className='mb-8'>
          <div className='flex items-center justify-between'>
            <div>
              <h1 className='text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
                🎯 Admin Dashboard
              </h1>
              <p className='text-gray-600 dark:text-gray-400 mt-2 text-lg'>
                Welcome back,{' '}
                <span className='font-semibold text-blue-600 dark:text-blue-400'>
                  {user?.name}
                </span>{' '}
                ({user?.role}) - Unified Learning Management System
              </p>
            </div>
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className='flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50'
            >
              <RefreshCw
                className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`}
              />
              <span className='text-sm font-medium'>Refresh</span>
            </button>
          </div>
        </div>

        {/* Enhanced System Overview Stats */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
          <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 group'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center'>
                <div className='p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl group-hover:scale-110 transition-transform duration-200'>
                  <Database className='h-6 w-6 text-white' />
                </div>
                <div className='ml-4'>
                  <div className='text-sm font-medium text-gray-600 dark:text-gray-400'>
                    Total Questions
                  </div>
                  <div className='text-3xl font-bold text-gray-900 dark:text-white'>
                    {loading ? (
                      <div className='animate-pulse bg-gray-300 dark:bg-gray-600 h-8 w-16 rounded'></div>
                    ) : (
                      (stats?.questions || 0).toLocaleString()
                    )}
                  </div>
                </div>
              </div>
              <div className='text-right'>
                <div className='flex items-center text-green-500 text-sm'>
                  <TrendingUp className='h-4 w-4 mr-1' />
                  <span>Active</span>
                </div>
              </div>
            </div>
          </div>

          <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 group'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center'>
                <div className='p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-xl group-hover:scale-110 transition-transform duration-200'>
                  <BookOpen className='h-6 w-6 text-white' />
                </div>
                <div className='ml-4'>
                  <div className='text-sm font-medium text-gray-600 dark:text-gray-400'>
                    Learning Cards
                  </div>
                  <div className='text-3xl font-bold text-gray-900 dark:text-white'>
                    {loading ? (
                      <div className='animate-pulse bg-gray-300 dark:bg-gray-600 h-8 w-8 rounded'></div>
                    ) : (
                      stats?.learningCards || 0
                    )}
                  </div>
                </div>
              </div>
              <div className='text-right'>
                <div className='flex items-center text-blue-500 text-sm'>
                  <Star className='h-4 w-4 mr-1' />
                  <span>Core</span>
                </div>
              </div>
            </div>
          </div>

          <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 group'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center'>
                <div className='p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl group-hover:scale-110 transition-transform duration-200'>
                  <Target className='h-6 w-6 text-white' />
                </div>
                <div className='ml-4'>
                  <div className='text-sm font-medium text-gray-600 dark:text-gray-400'>
                    Learning Plans
                  </div>
                  <div className='text-3xl font-bold text-gray-900 dark:text-white'>
                    {loading ? (
                      <div className='animate-pulse bg-gray-300 dark:bg-gray-600 h-8 w-8 rounded'></div>
                    ) : (
                      stats?.learningPlans || 0
                    )}
                  </div>
                </div>
              </div>
              <div className='text-right'>
                <div className='flex items-center text-purple-500 text-sm'>
                  <Activity className='h-4 w-4 mr-1' />
                  <span>Plans</span>
                </div>
              </div>
            </div>
          </div>

          <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 group'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center'>
                <div className='p-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl group-hover:scale-110 transition-transform duration-200'>
                  <Zap className='h-6 w-6 text-white' />
                </div>
                <div className='ml-4'>
                  <div className='text-sm font-medium text-gray-600 dark:text-gray-400'>
                    Total Tasks
                  </div>
                  <div className='text-3xl font-bold text-gray-900 dark:text-white'>
                    {loading ? (
                      <div className='animate-pulse bg-gray-300 dark:bg-gray-600 h-8 w-12 rounded'></div>
                    ) : (
                      (stats?.frontendTasks || 0) +
                      (stats?.problemSolvingTasks || 0)
                    )}
                  </div>
                </div>
              </div>
              <div className='text-right'>
                <div className='flex items-center text-orange-500 text-sm'>
                  <Code className='h-4 w-4 mr-1' />
                  <span>Tasks</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Quick Actions */}
        <div className='mb-8'>
          <div className='flex items-center justify-between mb-6'>
            <h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
              Quick Actions
            </h2>
            <div className='flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400'>
              <Clock className='h-4 w-4' />
              <span>Most used features</span>
            </div>
          </div>
          <div className='flex flex-wrap gap-4'>
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={() => (window.location.href = action.href)}
                className='flex items-center space-x-3 px-6 py-3 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 group'
              >
                <div
                  className={`p-2 ${action.color} rounded-lg group-hover:scale-110 transition-transform duration-200`}
                >
                  <action.icon className='h-5 w-5 text-white' />
                </div>
                <div className='text-left'>
                  <h3 className='text-sm font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors'>
                    {action.title}
                  </h3>
                  <p className='text-xs text-gray-600 dark:text-gray-400'>
                    {action.description}
                  </p>
                </div>
                <ArrowRight className='h-4 w-4 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-200' />
              </button>
            ))}
          </div>
        </div>

        {/* Performance Monitoring */}
        <div className='mb-8'>
          <div className='flex items-center justify-between mb-6'>
            <h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
              Performance Monitoring
            </h2>
            <div className='flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400'>
              <Zap className='h-4 w-4' />
              <span>Real-time metrics</span>
            </div>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            <div className='bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm font-medium text-gray-600 dark:text-gray-400'>
                    Response Time
                  </p>
                  <p className='text-2xl font-bold text-gray-900 dark:text-white'>
                    {stats?.performanceMetrics?.averageResponseTime || 0}ms
                  </p>
                </div>
                <Zap className='w-8 h-8 text-yellow-500' />
              </div>
            </div>
            <div className='bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm font-medium text-gray-600 dark:text-gray-400'>
                    Cache Hit Rate
                  </p>
                  <p className='text-2xl font-bold text-gray-900 dark:text-white'>
                    {stats?.performanceMetrics?.cacheHitRate || 0}%
                  </p>
                </div>
                <Activity className='w-8 h-8 text-green-500' />
              </div>
            </div>
            <div className='bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm font-medium text-gray-600 dark:text-gray-400'>
                    Memory Usage
                  </p>
                  <p className='text-2xl font-bold text-gray-900 dark:text-white'>
                    {stats?.performanceMetrics?.memoryUsage || '0%'}
                  </p>
                </div>
                <Database className='w-8 h-8 text-blue-500' />
              </div>
            </div>
            <div className='bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm font-medium text-gray-600 dark:text-gray-400'>
                    CPU Usage
                  </p>
                  <p className='text-2xl font-bold text-gray-900 dark:text-white'>
                    {stats?.performanceMetrics?.cpuUsage || '0%'}
                  </p>
                </div>
                <BarChart3 className='w-8 h-8 text-purple-500' />
              </div>
            </div>
          </div>
        </div>

        {/* User Engagement Analytics */}
        <div className='mb-8'>
          <div className='flex items-center justify-between mb-6'>
            <h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
              User Engagement
            </h2>
            <div className='flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400'>
              <Users className='h-4 w-4' />
              <span>User metrics</span>
            </div>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            <div className='bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm font-medium text-gray-600 dark:text-gray-400'>
                    Total Users
                  </p>
                  <p className='text-2xl font-bold text-gray-900 dark:text-white'>
                    {stats?.totalUsers || 0}
                  </p>
                </div>
                <Users className='w-8 h-8 text-blue-500' />
              </div>
            </div>
            <div className='bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm font-medium text-gray-600 dark:text-gray-400'>
                    Active Users
                  </p>
                  <p className='text-2xl font-bold text-gray-900 dark:text-white'>
                    {stats?.analytics?.userEngagement?.activeUsers || 0}
                  </p>
                </div>
                <TrendingUp className='w-8 h-8 text-green-500' />
              </div>
            </div>
            <div className='bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm font-medium text-gray-600 dark:text-gray-400'>
                    Total Sessions
                  </p>
                  <p className='text-2xl font-bold text-gray-900 dark:text-white'>
                    {stats?.analytics?.userEngagement?.totalSessions || 0}
                  </p>
                </div>
                <Clock className='w-8 h-8 text-orange-500' />
              </div>
            </div>
            <div className='bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm font-medium text-gray-600 dark:text-gray-400'>
                    Completion Rate
                  </p>
                  <p className='text-2xl font-bold text-gray-900 dark:text-white'>
                    {stats?.analytics?.userEngagement?.completionRate || 0}%
                  </p>
                </div>
                <Target className='w-8 h-8 text-purple-500' />
              </div>
            </div>
          </div>
        </div>

        {/* Content Quality Analytics */}
        <div className='mb-8'>
          <div className='flex items-center justify-between mb-6'>
            <h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
              Content Quality
            </h2>
            <div className='flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400'>
              <Star className='h-4 w-4' />
              <span>Quality metrics</span>
            </div>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            <div className='bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm font-medium text-gray-600 dark:text-gray-400'>
                    Questions with Explanations
                  </p>
                  <p className='text-2xl font-bold text-gray-900 dark:text-white'>
                    {stats?.analytics?.contentQuality
                      ?.questionsWithExplanations || 0}
                  </p>
                </div>
                <Info className='w-8 h-8 text-blue-500' />
              </div>
            </div>
            <div className='bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm font-medium text-gray-600 dark:text-gray-400'>
                    Questions with Hints
                  </p>
                  <p className='text-2xl font-bold text-gray-900 dark:text-white'>
                    {stats?.analytics?.contentQuality?.questionsWithHints || 0}
                  </p>
                </div>
                <HelpCircle className='w-8 h-8 text-green-500' />
              </div>
            </div>
            <div className='bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm font-medium text-gray-600 dark:text-gray-400'>
                    Questions with Sample Answers
                  </p>
                  <p className='text-2xl font-bold text-gray-900 dark:text-white'>
                    {stats?.analytics?.contentQuality
                      ?.questionsWithSampleAnswers || 0}
                  </p>
                </div>
                <CheckCircle className='w-8 h-8 text-purple-500' />
              </div>
            </div>
            <div className='bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm font-medium text-gray-600 dark:text-gray-400'>
                    Avg Question Length
                  </p>
                  <p className='text-2xl font-bold text-gray-900 dark:text-white'>
                    {stats?.analytics?.contentQuality?.averageQuestionLength ||
                      0}
                  </p>
                </div>
                <FileText className='w-8 h-8 text-orange-500' />
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Recent Activity */}
        <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700 mb-8'>
          <div className='flex items-center justify-between mb-6'>
            <h3 className='text-xl font-bold text-gray-900 dark:text-white'>
              Recent Activity
            </h3>
            <div className='flex items-center space-x-2 text-blue-500'>
              <Activity className='h-4 w-4' />
              <span className='text-sm font-medium'>Live updates</span>
            </div>
          </div>
          <div className='space-y-3'>
            {loading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className='flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-xl'
                >
                  <div className='animate-pulse bg-gray-300 dark:bg-gray-600 h-4 w-4 rounded mr-3'></div>
                  <div className='animate-pulse bg-gray-300 dark:bg-gray-600 h-4 w-32 rounded mr-3'></div>
                  <div className='animate-pulse bg-gray-300 dark:bg-gray-600 h-4 w-20 rounded'></div>
                </div>
              ))
            ) : (stats?.recentActivity?.length ?? 0) > 0 ? (
              (stats?.recentActivity ?? []).slice(0, 5).map(activity => (
                <div
                  key={activity.id}
                  className='flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors'
                >
                  <div className='w-2 h-2 bg-green-500 rounded-full mr-3'></div>
                  <div className='flex-1'>
                    <span className='text-gray-900 dark:text-white font-medium'>
                      {activity.action}
                    </span>
                    <p className='text-sm text-gray-600 dark:text-gray-400'>
                      {activity.details}
                    </p>
                  </div>
                  <div className='text-sm text-gray-500 dark:text-gray-400'>
                    {activity.user}
                  </div>
                </div>
              ))
            ) : (
              <div className='text-center py-8 text-gray-500 dark:text-gray-400'>
                <Activity className='h-12 w-12 mx-auto mb-4 opacity-50' />
                <p>No recent activity</p>
              </div>
            )}
          </div>
        </div>

        {/* System Health & Error Monitoring */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8'>
          {/* System Health */}
          <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700'>
            <div className='flex items-center justify-between mb-6'>
              <h3 className='text-xl font-bold text-gray-900 dark:text-white'>
                System Health
              </h3>
              <div className='flex items-center space-x-2 text-green-500'>
                <CheckCircle className='h-4 w-4' />
                <span className='text-sm font-medium'>
                  All systems operational
                </span>
              </div>
            </div>
            <div className='space-y-4'>
              <div className='flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-xl'>
                <div className='flex items-center'>
                  <Database className='h-5 w-5 text-blue-500 mr-3' />
                  <span className='text-gray-900 dark:text-white font-medium'>
                    Database
                  </span>
                </div>
                <div className='flex items-center text-green-500'>
                  <CheckCircle className='h-4 w-4 mr-1' />
                  <span className='text-sm'>Connected</span>
                </div>
              </div>
              <div className='flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-xl'>
                <div className='flex items-center'>
                  <Zap className='h-5 w-5 text-yellow-500 mr-3' />
                  <span className='text-gray-900 dark:text-white font-medium'>
                    API Response
                  </span>
                </div>
                <div className='text-sm text-gray-600 dark:text-gray-400'>
                  {stats?.systemHealth?.apiResponseTime || 0}ms
                </div>
              </div>
              <div className='flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-xl'>
                <div className='flex items-center'>
                  <Activity className='h-5 w-5 text-green-500 mr-3' />
                  <span className='text-gray-900 dark:text-white font-medium'>
                    Uptime
                  </span>
                </div>
                <div className='text-sm text-gray-600 dark:text-gray-400'>
                  {stats?.systemHealth?.uptime || '99.9%'}
                </div>
              </div>
              <div className='flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-xl'>
                <div className='flex items-center'>
                  <BarChart3 className='h-5 w-5 text-purple-500 mr-3' />
                  <span className='text-gray-900 dark:text-white font-medium'>
                    Collections
                  </span>
                </div>
                <div className='text-sm text-gray-600 dark:text-gray-400'>
                  {stats?.systemHealth?.activeCollections || 0}/
                  {stats?.systemHealth?.totalCollections || 0}
                </div>
              </div>
            </div>
          </div>

          {/* Recent Errors */}
          <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700'>
            <div className='flex items-center justify-between mb-6'>
              <h3 className='text-xl font-bold text-gray-900 dark:text-white'>
                Recent Errors
              </h3>
              <div className='flex items-center space-x-2 text-red-500'>
                <AlertCircle className='h-4 w-4' />
                <span className='text-sm font-medium'>
                  {stats?.recentErrors?.length || 0} errors
                </span>
              </div>
            </div>
            <div className='space-y-3'>
              {loading ? (
                Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className='flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-xl'
                  >
                    <div className='animate-pulse bg-gray-300 dark:bg-gray-600 h-4 w-4 rounded mr-3'></div>
                    <div className='animate-pulse bg-gray-300 dark:bg-gray-600 h-4 w-32 rounded mr-3'></div>
                    <div className='animate-pulse bg-gray-300 dark:bg-gray-600 h-4 w-20 rounded'></div>
                  </div>
                ))
              ) : (stats?.recentErrors?.length ?? 0) > 0 ? (
                (stats?.recentErrors ?? []).slice(0, 3).map(error => (
                  <div
                    key={error.id}
                    className='flex items-center p-3 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800'
                  >
                    <div className='w-2 h-2 bg-red-500 rounded-full mr-3'></div>
                    <div className='flex-1'>
                      <span className='text-red-900 dark:text-red-300 font-medium'>
                        {error.error}
                      </span>
                      <p className='text-sm text-red-600 dark:text-red-400'>
                        {error.source} - {error.severity}
                      </p>
                    </div>
                    <div className='text-sm text-red-500 dark:text-red-400'>
                      {new Date(
                        error.timestamp || Date.now()
                      ).toLocaleTimeString()}
                    </div>
                  </div>
                ))
              ) : (
                <div className='text-center py-8 text-gray-500 dark:text-gray-400'>
                  <CheckCircle className='h-12 w-12 mx-auto mb-4 opacity-50' />
                  <p>No recent errors</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
