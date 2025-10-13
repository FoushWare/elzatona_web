'use client';

import { useAdminAuth } from '@/contexts/AdminAuthContext';
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

interface DashboardStats {
  questions: number;
  categories: number;
  topics: number;
  learningCards: number;
  learningPlans: number;
  frontendTasks: number;
  problemSolvingTasks: number;
}

export default function AdminDashboard() {
  const { user } = useAdminAuth();
  const [stats, setStats] = useState<DashboardStats>({
    questions: 0,
    categories: 0,
    topics: 0,
    learningCards: 0,
    learningPlans: 0,
    frontendTasks: 0,
    problemSolvingTasks: 0,
  });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadDashboardStats();
  }, []);

  const loadDashboardStats = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      // Load stats from all our API endpoints
      const [
        questionsRes,
        categoriesRes,
        topicsRes,
        cardsRes,
        plansRes,
        frontendTasksRes,
        problemSolvingRes,
      ] = await Promise.all([
        fetch('/api/questions').then(res =>
          res.ok ? res.json() : { count: 0 }
        ),
        fetch('/api/categories').then(res =>
          res.ok ? res.json() : { count: 0 }
        ),
        fetch('/api/topics').then(res => (res.ok ? res.json() : { count: 0 })),
        fetch('/api/cards').then(res => (res.ok ? res.json() : { count: 0 })),
        fetch('/api/plans').then(res => (res.ok ? res.json() : { count: 0 })),
        fetch('/api/admin/frontend-tasks').then(res =>
          res.ok ? res.json() : { total: 0 }
        ),
        fetch('/api/admin/problem-solving').then(res =>
          res.ok ? res.json() : { total: 0 }
        ),
      ]);

      setStats({
        questions: questionsRes.count || 0,
        categories: categoriesRes.count || 0,
        topics: topicsRes.count || 0,
        learningCards: cardsRes.count || 0,
        learningPlans: plansRes.count || 0,
        frontendTasks: frontendTasksRes.total || 0,
        problemSolvingTasks: problemSolvingRes.total || 0,
      });
    } catch (error) {
      console.error('Error loading dashboard stats:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const adminMenuItems = [
    {
      href: '/admin/content/questions',
      label: 'Questions',
      icon: HelpCircle,
      description: 'Manage all learning questions',
      color: 'bg-blue-500',
      stats: stats.questions,
    },
    {
      href: '/admin/content-management',
      label: 'Content Management',
      icon: Settings,
      description: 'Unified learning content management',
      color: 'bg-purple-500',
      stats: `${stats.categories} categories, ${stats.topics} topics`,
    },
    {
      href: '/admin/frontend-tasks',
      label: 'Frontend Tasks',
      icon: Code,
      description: 'React/frontend coding challenges',
      color: 'bg-cyan-500',
      stats: stats.frontendTasks,
    },
    {
      href: '/admin/problem-solving',
      label: 'Problem Solving',
      icon: Calculator,
      description: 'Algorithmic coding challenges',
      color: 'bg-red-500',
      stats: stats.problemSolvingTasks,
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Welcome Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                🎯 Admin Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">
                Welcome back,{' '}
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  {user?.name}
                </span>{' '}
                ({user?.role}) - Unified Learning Management System
              </p>
            </div>
            <button
              onClick={() => loadDashboardStats(true)}
              disabled={refreshing}
              className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50"
            >
              <RefreshCw
                className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`}
              />
              <span className="text-sm font-medium">Refresh</span>
            </button>
          </div>
        </div>

        {/* Enhanced System Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl group-hover:scale-110 transition-transform duration-200">
                  <Database className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Total Questions
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {loading ? (
                      <div className="animate-pulse bg-gray-300 dark:bg-gray-600 h-8 w-16 rounded"></div>
                    ) : (
                      stats.questions.toLocaleString()
                    )}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center text-green-500 text-sm">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span>Active</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-xl group-hover:scale-110 transition-transform duration-200">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Learning Cards
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {loading ? (
                      <div className="animate-pulse bg-gray-300 dark:bg-gray-600 h-8 w-8 rounded"></div>
                    ) : (
                      stats.learningCards
                    )}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center text-blue-500 text-sm">
                  <Star className="h-4 w-4 mr-1" />
                  <span>Core</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl group-hover:scale-110 transition-transform duration-200">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Learning Plans
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {loading ? (
                      <div className="animate-pulse bg-gray-300 dark:bg-gray-600 h-8 w-8 rounded"></div>
                    ) : (
                      stats.learningPlans
                    )}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center text-purple-500 text-sm">
                  <Activity className="h-4 w-4 mr-1" />
                  <span>Plans</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl group-hover:scale-110 transition-transform duration-200">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Total Tasks
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {loading ? (
                      <div className="animate-pulse bg-gray-300 dark:bg-gray-600 h-8 w-12 rounded"></div>
                    ) : (
                      stats.frontendTasks + stats.problemSolvingTasks
                    )}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center text-orange-500 text-sm">
                  <Code className="h-4 w-4 mr-1" />
                  <span>Tasks</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Quick Actions */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Quick Actions
            </h2>
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <Clock className="h-4 w-4" />
              <span>Most used features</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={() => (window.location.href = action.href)}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 text-left group border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600"
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`p-3 ${action.color} rounded-xl group-hover:scale-110 transition-transform duration-200`}
                  >
                    <action.icon className="h-6 w-6 text-white" />
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-200" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {action.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {action.description}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Enhanced Admin Management Sections */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Admin Management
            </h2>
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <Settings className="h-4 w-4" />
              <span>Complete system control</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {adminMenuItems.map((item, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 cursor-pointer group border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600"
                onClick={() => (window.location.href = item.href)}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div
                      className={`p-3 ${item.color} rounded-xl group-hover:scale-110 transition-transform duration-200`}
                    >
                      <item.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {item.label}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                        {item.stats}
                      </p>
                    </div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-blue-500 group-hover:scale-110 transition-all duration-200" />
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced System Status */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              System Status
            </h3>
            <div className="flex items-center space-x-2 text-green-500">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">
                All Systems Operational
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
              <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
              <div>
                <span className="text-gray-900 dark:text-white font-medium">
                  Firebase Connected
                </span>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Real-time database active
                </p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
              <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
              <div>
                <span className="text-gray-900 dark:text-white font-medium">
                  Admin Authentication
                </span>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Secure access enabled
                </p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
              <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
              <div>
                <span className="text-gray-900 dark:text-white font-medium">
                  Real-time Sync
                </span>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Live updates active
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Recent Changes */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Recent System Updates
            </h3>
            <div className="flex items-center space-x-2 text-blue-500">
              <Info className="h-4 w-4" />
              <span className="text-sm font-medium">Latest features</span>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
              <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
              <div>
                <span className="text-gray-900 dark:text-white font-medium">
                  Unified Content Management System
                </span>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Complete admin interface for managing all learning content
                </p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
              <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
              <div>
                <span className="text-gray-900 dark:text-white font-medium">
                  Learning Cards & Plans Management
                </span>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Card-based learning system with hierarchical content
                  organization
                </p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
              <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
              <div>
                <span className="text-gray-900 dark:text-white font-medium">
                  Frontend Tasks & Problem Solving
                </span>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  CodeSandbox-like and LeetCode-like interfaces for coding
                  challenges
                </p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl">
              <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
              <div>
                <span className="text-gray-900 dark:text-white font-medium">
                  Enhanced Questions Page with Relationship Badges
                </span>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Visual indicators showing question relationships to cards,
                  categories, and plans
                </p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-cyan-50 dark:bg-cyan-900/20 rounded-xl">
              <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
              <div>
                <span className="text-gray-900 dark:text-white font-medium">
                  Comprehensive CRUD Operations
                </span>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Full create, read, update, delete functionality for all
                  content types
                </p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-pink-50 dark:bg-pink-900/20 rounded-xl">
              <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
              <div>
                <span className="text-gray-900 dark:text-white font-medium">
                  Performance Optimizations
                </span>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Lazy loading, memoization, and Core Web Vitals improvements
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
