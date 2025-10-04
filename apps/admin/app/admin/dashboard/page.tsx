'use client';

import { useState, useEffect } from 'react';
import { useAdminAuth } from '../../../contexts/AdminAuthContext';
import {
  Users,
  HelpCircle,
  BookOpen,
  BarChart3,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  Settings,
  FileText,
  Headphones,
  Shield,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';

export default function AdminDashboard() {
  const { user } = useAdminAuth();
  const [stats, setStats] = useState({
    totalQuestions: 0,
    totalUsers: 0,
    totalLearningPlans: 0,
    totalAudioFiles: 0,
    activeAdmins: 1,
    recentActivity: [],
  });

  useEffect(() => {
    // Simulate loading stats (in real app, this would fetch from API)
    const loadStats = async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      setStats({
        totalQuestions: 1247,
        totalUsers: 89,
        totalLearningPlans: 12,
        totalAudioFiles: 156,
        activeAdmins: 1,
        recentActivity: [
          {
            id: 1,
            action: 'New question added',
            user: 'Admin',
            time: '2 minutes ago',
            type: 'success',
          },
          {
            id: 2,
            action: 'Learning plan updated',
            user: 'Admin',
            time: '15 minutes ago',
            type: 'info',
          },
          {
            id: 3,
            action: 'User registered',
            user: 'System',
            time: '1 hour ago',
            type: 'success',
          },
          {
            id: 4,
            action: 'Audio file uploaded',
            user: 'Admin',
            time: '2 hours ago',
            type: 'info',
          },
        ],
      });
    };

    loadStats();
  }, []);

  const statCards = [
    {
      title: 'Total Questions',
      value: stats.totalQuestions.toLocaleString(),
      icon: HelpCircle,
      color: 'blue',
      change: '+12%',
      changeType: 'increase',
    },
    {
      title: 'Active Users',
      value: stats.totalUsers.toLocaleString(),
      icon: Users,
      color: 'green',
      change: '+8%',
      changeType: 'increase',
    },
    {
      title: 'Learning Plans',
      value: stats.totalLearningPlans.toLocaleString(),
      icon: BookOpen,
      color: 'purple',
      change: '+3',
      changeType: 'increase',
    },
    {
      title: 'Audio Files',
      value: stats.totalAudioFiles.toLocaleString(),
      icon: Headphones,
      color: 'orange',
      change: '+5%',
      changeType: 'increase',
    },
  ];

  const quickActions = [
    {
      title: 'Questions Management',
      description: 'Add, edit, and organize questions',
      icon: HelpCircle,
      href: '/admin/questions',
      color: 'blue',
    },
    {
      title: 'Learning Cards',
      description: 'Manage learning card categories',
      icon: FileText,
      href: '/admin/learning-cards',
      color: 'green',
    },
    {
      title: 'Guided Learning',
      description: 'Create and manage learning plans',
      icon: BookOpen,
      href: '/admin/guided-learning',
      color: 'purple',
    },
    {
      title: 'User Management',
      description: 'Manage user accounts and roles',
      icon: Users,
      href: '/admin/users',
      color: 'orange',
    },
    {
      title: 'Audio Management',
      description: 'Upload and manage audio files',
      icon: Headphones,
      href: '/admin/audio',
      color: 'pink',
    },
    {
      title: 'System Settings',
      description: 'Configure admin panel settings',
      icon: Settings,
      href: '/admin/settings',
      color: 'gray',
    },
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-500 text-white',
      green: 'bg-green-500 text-white',
      purple: 'bg-purple-500 text-white',
      orange: 'bg-orange-500 text-white',
      pink: 'bg-pink-500 text-white',
      gray: 'bg-gray-500 text-white',
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getChangeIcon = (changeType: string) => {
    return changeType === 'increase' ? ArrowUpRight : ArrowDownRight;
  };

  const getChangeColor = (changeType: string) => {
    return changeType === 'increase' ? 'text-green-500' : 'text-red-500';
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">
                Welcome back,{' '}
                <span className="font-semibold text-red-600 dark:text-red-400">
                  {user?.name}
                </span>
                <span className="ml-2 px-2 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 text-sm rounded-full">
                  {user?.role}
                </span>
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Last login
                </p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Just now
                </p>
              </div>
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            const ChangeIcon = getChangeIcon(stat.changeType);
            return (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                      {stat.value}
                    </p>
                    <div className="flex items-center mt-2">
                      <ChangeIcon
                        className={`w-4 h-4 ${getChangeColor(stat.changeType)}`}
                      />
                      <span
                        className={`text-sm font-medium ml-1 ${getChangeColor(stat.changeType)}`}
                      >
                        {stat.change}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
                        from last month
                      </span>
                    </div>
                  </div>
                  <div
                    className={`p-3 rounded-lg ${getColorClasses(stat.color)}`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Quick Actions
                </h2>
                <Plus className="w-5 h-5 text-gray-400" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={index}
                      onClick={() => (window.location.href = action.href)}
                      className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-md transition-all text-left group"
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`p-2 rounded-lg ${getColorClasses(action.color)}`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                            {action.title}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {action.description}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Recent Activity
              </h2>
              <Activity className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {stats.recentActivity.map(activity => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${
                      activity.type === 'success'
                        ? 'bg-green-500'
                        : activity.type === 'info'
                          ? 'bg-blue-500'
                          : 'bg-yellow-500'
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {activity.action}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {activity.user} • {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium">
              View all activity
            </button>
          </div>
        </div>

        {/* System Status */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            System Status
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  Database
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  All systems operational
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  Authentication
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Firebase connected
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  API Services
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Running smoothly
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
