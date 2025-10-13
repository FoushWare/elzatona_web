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

  useEffect(() => {
    loadDashboardStats();
  }, []);

  const loadDashboardStats = async () => {
    try {
      setLoading(true);

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
      href: '/admin/learning-cards',
      label: 'Learning Cards',
      icon: CreditCard,
      description: 'Manage learning cards for plans',
      color: 'bg-green-500',
      stats: stats.learningCards,
    },
    {
      href: '/admin/sections',
      label: 'Learning Sections',
      icon: FileText,
      description: 'Manage learning path sections',
      color: 'bg-orange-500',
      stats: '6 paths',
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
      href: '/admin/backup',
      label: 'Backup Management',
      icon: FolderOpen,
      description: 'Manage question backups',
      color: 'bg-gray-500',
      stats: 'Backups',
    },
    {
      href: '/admin/audit-logs',
      label: 'Audit Logs',
      icon: FileText,
      description: 'Monitor admin actions and system events',
      color: 'bg-yellow-500',
      stats: 'Logs',
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          🎯 Admin Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Welcome back, {user?.name} ({user?.role}) - Unified Learning
          Management System
        </p>
      </div>

      {/* System Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Database className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Questions
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {loading ? '...' : stats.questions.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
              <BookOpen className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Learning Cards
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {loading ? '...' : stats.learningCards}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <Target className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Learning Plans
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {loading ? '...' : stats.learningPlans}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
              <TrendingUp className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Tasks
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {loading
                  ? '...'
                  : stats.frontendTasks + stats.problemSolvingTasks}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={() => (window.location.href = action.href)}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow text-left group"
            >
              <div className="flex items-center mb-2">
                <div
                  className={`p-2 ${action.color} rounded-lg group-hover:scale-110 transition-transform`}
                >
                  <action.icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="ml-3 font-medium text-gray-900 dark:text-white">
                  {action.title}
                </h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {action.description}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Admin Management Sections */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Admin Management
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminMenuItems.map((item, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer group"
              onClick={() => (window.location.href = item.href)}
            >
              <div className="flex items-center mb-4">
                <div
                  className={`p-3 ${item.color} rounded-lg group-hover:scale-110 transition-transform`}
                >
                  <item.icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {item.label}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {item.stats}
                  </p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* System Status */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          System Status
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center">
            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
            <span className="text-gray-900 dark:text-white">
              Firebase Connected
            </span>
          </div>
          <div className="flex items-center">
            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
            <span className="text-gray-900 dark:text-white">
              Admin Authentication
            </span>
          </div>
          <div className="flex items-center">
            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
            <span className="text-gray-900 dark:text-white">
              Real-time Sync
            </span>
          </div>
        </div>
      </div>

      {/* Recent Changes */}
      <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Recent System Updates
        </h3>
        <div className="space-y-3">
          <div className="flex items-center text-sm">
            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
            <span className="text-gray-900 dark:text-white">
              ✅ Unified Content Management System
            </span>
          </div>
          <div className="flex items-center text-sm">
            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
            <span className="text-gray-900 dark:text-white">
              ✅ Learning Cards & Plans Management
            </span>
          </div>
          <div className="flex items-center text-sm">
            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
            <span className="text-gray-900 dark:text-white">
              ✅ Frontend Tasks & Problem Solving
            </span>
          </div>
          <div className="flex items-center text-sm">
            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
            <span className="text-gray-900 dark:text-white">
              ✅ Enhanced Questions Page with Relationship Badges
            </span>
          </div>
          <div className="flex items-center text-sm">
            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
            <span className="text-gray-900 dark:text-white">
              ✅ Comprehensive CRUD Operations
            </span>
          </div>
          <div className="flex items-center text-sm">
            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
            <span className="text-gray-900 dark:text-white">
              ✅ Performance Optimizations
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
