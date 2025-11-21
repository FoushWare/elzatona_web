'use client';

import { useAdminAuth } from '@elzatona/shared-contexts';
import {
  BookOpen,
  HelpCircle,
  CreditCard,
  Settings,
  Code,
  Calculator,
  BarChart3,
  Database,
  TrendingUp,
  Clock,
  Target,
  Activity,
  Zap,
  Star,
  ArrowRight,
  RefreshCw,
  Users,
  Tag,
  Folder,
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
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8'>
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
                <div className='p-3 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl group-hover:scale-110 transition-transform duration-200'>
                  <Tag className='h-6 w-6 text-white' />
                </div>
                <div className='ml-4'>
                  <div className='text-sm font-medium text-gray-600 dark:text-gray-400'>
                    Topics
                  </div>
                  <div className='text-3xl font-bold text-gray-900 dark:text-white'>
                    {loading ? (
                      <div className='animate-pulse bg-gray-300 dark:bg-gray-600 h-8 w-12 rounded'></div>
                    ) : (
                      (stats?.topics || 0).toLocaleString()
                    )}
                  </div>
                </div>
              </div>
              <div className='text-right'>
                <div className='flex items-center text-indigo-500 text-sm'>
                  <Tag className='h-4 w-4 mr-1' />
                  <span>Topics</span>
                </div>
              </div>
            </div>
          </div>

          <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 group'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center'>
                <div className='p-3 bg-gradient-to-r from-pink-500 to-pink-600 rounded-xl group-hover:scale-110 transition-transform duration-200'>
                  <Folder className='h-6 w-6 text-white' />
                </div>
                <div className='ml-4'>
                  <div className='text-sm font-medium text-gray-600 dark:text-gray-400'>
                    Categories
                  </div>
                  <div className='text-3xl font-bold text-gray-900 dark:text-white'>
                    {loading ? (
                      <div className='animate-pulse bg-gray-300 dark:bg-gray-600 h-8 w-12 rounded'></div>
                    ) : (
                      (stats?.categories || 0).toLocaleString()
                    )}
                  </div>
                </div>
              </div>
              <div className='text-right'>
                <div className='flex items-center text-pink-500 text-sm'>
                  <Folder className='h-4 w-4 mr-1' />
                  <span>Categories</span>
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

      </div>
    </div>
  );
}
