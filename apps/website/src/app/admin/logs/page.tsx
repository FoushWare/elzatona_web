'use client';

import React, { useState, useEffect } from 'react';
// Note: This page uses API routes, not direct supabase client

import { useAdminAuth } from '@elzatona/shared-contexts';
// useRoleBasedAccess is not available - removed for now
// import { useRoleBasedAccess } from '@elzatona/shared-hooks';
import {
  Bug,
  AlertTriangle,
  Info,
  Activity,
  Clock,
  CheckCircle,
  XCircle,
  RefreshCw,
  Filter,
  Search,
  Eye,
  Check,
  BarChart3,
  TrendingUp,
  AlertCircle,
} from 'lucide-react';

interface ErrorLog {
  id: string;
  level: 'error' | 'warning' | 'info' | 'debug';
  message: string;
  stack?: string;
  context: {
    userId?: string;
    adminId?: string;
    sessionId?: string;
    userAgent?: string;
    url?: string;
    method?: string;
    statusCode?: number;
    timestamp: Date;
  };
  metadata?: {
    component?: string;
    action?: string;
    entityId?: string;
    entityType?: string;
    [key: string]: any;
  };
  resolved: boolean;
  resolvedAt?: Date;
  resolvedBy?: string;
}

interface PerformanceLog {
  id: string;
  operation: string;
  duration: number;
  success: boolean;
  context: {
    userId?: string;
    adminId?: string;
    sessionId?: string;
    url?: string;
    method?: string;
    timestamp: Date;
  };
  metadata?: {
    component?: string;
    apiEndpoint?: string;
    databaseOperation?: string;
    [key: string]: any;
  };
}

interface LogStats {
  errorStats: {
    total: number;
    byLevel: Record<string, number>;
    unresolved: number;
    recentErrors: number;
  };
  performanceStats: {
    averageResponseTime: number;
    successRate: number;
    slowestOperations: Array<{ operation: string; duration: number }>;
    totalOperations: number;
  };
}

export default function AdminLogsPage() {
  const { user: currentUser } = useAdminAuth();
  const { isAuthenticated } = useAdminAuth();
  const isAdmin = isAuthenticated; // Simplified check - use admin auth for now
  const [logs, setLogs] = useState<(ErrorLog | PerformanceLog)[]>([]);
  const [stats, setStats] = useState<LogStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [logType, setLogType] = useState<'errors' | 'performance'>('errors');
  const [levelFilter, setLevelFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const fetchLogs = async () => {
    try {
      setRefreshing(true);
      const response = await fetch(`/api/admin/logs?type=${logType}&limit=100`);
      const data = await response.json();

      if (data.success) {
        setLogs(data.logs);
        setError(null);
      } else {
        setError(data.error || 'Failed to fetch logs');
      }
    } catch (error) {
      console.error('Error fetching logs:', error);
      setError('Failed to fetch logs');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/logs?type=stats');
      const data = await response.json();

      if (data.success) {
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchLogs();
      fetchStats();
    }
  }, [logType, isAdmin]);

  // Check permissions after hooks
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Access Denied
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            You don't have permission to access this page.
          </p>
        </div>
      </div>
    );
  }

  const filteredLogs = logs.filter(log => {
    if (logType === 'errors') {
      const errorLog = log as ErrorLog;
      const matchesSearch =
        errorLog.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        errorLog.context.url?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesLevel =
        levelFilter === 'all' || errorLog.level === levelFilter;

      return matchesSearch && matchesLevel;
    } else {
      const perfLog = log as PerformanceLog;
      const matchesSearch =
        perfLog.operation.toLowerCase().includes(searchTerm.toLowerCase()) ||
        perfLog.context.url?.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesSearch;
    }
  });

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'error':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'info':
        return <Info className="h-4 w-4 text-blue-500" />;
      case 'debug':
        return <Bug className="h-4 w-4 text-gray-500" />;
      default:
        return <Info className="h-4 w-4 text-gray-500" />;
    }
  };

  const getLevelBadgeColor = (level: string) => {
    switch (level) {
      case 'error':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'info':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'debug':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin text-blue-500 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading logs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                System Logs & Monitoring
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Monitor system errors, performance metrics, and application
                health
              </p>
            </div>
            <button
              onClick={() => {
                fetchLogs();
                fetchStats();
              }}
              disabled={refreshing}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              <RefreshCw
                className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`}
              />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex items-center">
                <Bug className="h-8 w-8 text-red-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Total Errors
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stats.errorStats.total}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex items-center">
                <AlertTriangle className="h-8 w-8 text-yellow-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Unresolved
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stats.errorStats.unresolved}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex items-center">
                <Activity className="h-8 w-8 text-green-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Success Rate
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stats.performanceStats.successRate.toFixed(1)}%
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-blue-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Avg Response
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stats.performanceStats.averageResponseTime.toFixed(0)}ms
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search logs..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
            <div className="sm:w-48">
              <select
                value={logType}
                onChange={e =>
                  setLogType(e.target.value as 'errors' | 'performance')
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="errors">Error Logs</option>
                <option value="performance">Performance Logs</option>
              </select>
            </div>
            {logType === 'errors' && (
              <div className="sm:w-48">
                <select
                  value={levelFilter}
                  onChange={e => setLevelFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  <option value="all">All Levels</option>
                  <option value="error">Error</option>
                  <option value="warning">Warning</option>
                  <option value="info">Info</option>
                  <option value="debug">Debug</option>
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Logs Table */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    {logType === 'errors' ? 'Error' : 'Operation'}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Level/Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Context
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredLogs.map(log => (
                  <tr
                    key={log.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {logType === 'errors'
                          ? (log as ErrorLog).message
                          : (log as PerformanceLog).operation}
                      </div>
                      {logType === 'errors' &&
                        (log as ErrorLog).metadata?.component && (
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            Component: {(log as ErrorLog).metadata?.component}
                          </div>
                        )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {logType === 'errors' ? (
                        <div className="flex items-center">
                          {getLevelIcon((log as ErrorLog).level)}
                          <span
                            className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getLevelBadgeColor((log as ErrorLog).level)}`}
                          >
                            {(log as ErrorLog).level}
                          </span>
                        </div>
                      ) : (
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            (log as PerformanceLog).success
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                          }`}
                        >
                          {(log as PerformanceLog).success
                            ? 'Success'
                            : 'Failed'}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      <div>
                        {log.context.url && (
                          <div
                            className="truncate max-w-xs"
                            title={log.context.url}
                          >
                            {log.context.url}
                          </div>
                        )}
                        {logType === 'performance' && (
                          <div className="text-xs">
                            {(log as PerformanceLog).duration}ms
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {formatTimeAgo(log.context.timestamp)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                        <Eye className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {error && (
          <div className="mt-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <p className="text-red-800 dark:text-red-200">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}
