'use client';

import { useAdminAuth } from '@elzatona/shared-contexts';
import { useDashboardStats } from '@elzatona/shared-hooks';
import { useState, useEffect } from 'react';
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

export default function AdminDashboard() {
  const { user } = useAdminAuth();
  const { stats, loading, error, refetch } = useDashboardStats();
  const [isClient, setIsClient] = useState(false);

  // Prevent hydration mismatch by only using stats after client-side hydration
  useEffect(() => {
    setIsClient(true);
  }, []);

  const adminMenuItems = [
    {
      href: '/admin/content/questions',
      label: 'Questions',
      icon: HelpCircle,
      description: 'Manage all learning questions',
      color: 'bg-blue-500',
      stats: !isClient || loading ? '...' : stats.questions,
    },
    {
      href: '/admin/content-management',
      label: 'Content Management',
      icon: Settings,
      description: 'Unified learning content management',
      color: 'bg-purple-500',
      stats:
        !isClient || loading
          ? '...'
          : `${stats.categories} categories, ${stats.topics} topics`,
    },
    {
      href: '/admin/frontend-tasks',
      label: 'Frontend Tasks',
      icon: Code,
      description: 'React/frontend coding challenges',
      color: 'bg-cyan-500',
      stats: !isClient || loading ? '...' : stats.totalTasks,
    },
    {
      href: '/admin/problem-solving',
      label: 'Problem Solving',
      icon: Calculator,
      description: 'Algorithmic coding challenges',
      color: 'bg-red-500',
      stats: !isClient || loading ? '...' : stats.totalTasks,
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
      stats: !isClient || loading ? '...' : stats.admins,
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
    <div
      className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800'
      suppressHydrationWarning
    >
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
                  {user?.email}
                </span>{' '}
                ({user?.role}) - Unified Learning Management System
              </p>
            </div>
            <button
              onClick={refetch}
              disabled={!isClient || loading}
              className='flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50'
              suppressHydrationWarning
            >
              <RefreshCw
                className={`h-4 w-4 ${!isClient || loading ? 'animate-spin' : ''}`}
              />
              <span className='text-sm font-medium' suppressHydrationWarning>
                {!isClient || loading ? 'Refreshing...' : 'Refresh'}
              </span>
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
                    {!isClient || loading ? '...' : stats.questions}
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
                    {!isClient || loading ? '...' : stats.cards}
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
                    {!isClient || loading ? '...' : stats.learningPlans}
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
                    {!isClient || loading ? '...' : stats.totalTasks}
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

        {/* Error Display */}
        {error && (
          <div className='mb-8 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4'>
            <div className='flex items-center'>
              <AlertCircle className='h-5 w-5 text-red-500 mr-2' />
              <div>
                <h3 className='text-sm font-medium text-red-800 dark:text-red-200'>
                  Dashboard Stats Error
                </h3>
                <p className='text-sm text-red-600 dark:text-red-400 mt-1'>
                  {error}
                </p>
              </div>
            </div>
          </div>
        )}

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

        {/* System Health */}
        <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700 mb-8'>
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
                0ms
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
                99.9%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
