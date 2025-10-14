'use client';

import React, { useState } from 'react';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { useRoleBasedAccess } from '@/hooks/useRoleBasedAccess';
import {
  Database,
  Download,
  Upload,
  Trash2,
  Clock,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Plus,
  Calendar,
  HardDrive,
  Shield,
  FileText,
  Settings,
} from 'lucide-react';
import {
  useBackups,
  useBackupStats,
  useCreateBackup,
  useRestoreBackup,
  useDeleteBackup,
  useScheduleBackup,
} from '@/hooks/useTanStackQuery';

interface BackupData {
  id: string;
  name: string;
  description: string;
  metadata: {
    createdAt: Date;
    createdBy: string;
    version: string;
    totalDocuments: number;
    collectionsCount: number;
  };
  status: 'completed' | 'failed' | 'in_progress';
  error?: string;
}

export default function AdminBackupPage() {
  const { user: currentUser } = useAdminAuth();
  const { isAdmin } = useRoleBasedAccess();

  // TanStack Query hooks
  const {
    data: backupsData,
    isLoading: backupsLoading,
    error: backupsError,
  } = useBackups();
  const { data: statsData, isLoading: statsLoading } = useBackupStats();

  // Mutation hooks
  const createBackupMutation = useCreateBackup();
  const restoreBackupMutation = useRestoreBackup();
  const deleteBackupMutation = useDeleteBackup();
  const scheduleBackupMutation = useScheduleBackup();

  // Local state
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showRestoreModal, setShowRestoreModal] = useState(false);
  const [selectedBackup, setSelectedBackup] = useState<BackupData | null>(null);
  const [restoreOptions, setRestoreOptions] = useState({
    overwriteExisting: false,
    dryRun: false,
  });

  // Form state
  const [backupName, setBackupName] = useState('');
  const [backupDescription, setBackupDescription] = useState('');

  // Check permissions
  if (!isAdmin()) {
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

  const backups = backupsData?.backups || [];
  const stats = statsData || {
    totalBackups: 0,
    totalSize: 0,
    collectionsCount: 0,
  };

  const handleCreateBackup = async () => {
    if (!backupName.trim() || !backupDescription.trim()) {
      alert('Please fill in all fields');
      return;
    }

    try {
      await createBackupMutation.mutateAsync({
        name: backupName,
        description: backupDescription,
      });

      setBackupName('');
      setBackupDescription('');
      setShowCreateModal(false);
    } catch (error) {
      console.error('Failed to create backup:', error);
    }
  };

  const handleRestoreBackup = async () => {
    if (!selectedBackup) return;

    try {
      await restoreBackupMutation.mutateAsync({
        backupId: selectedBackup.id,
        options: restoreOptions,
      });

      setShowRestoreModal(false);
      setSelectedBackup(null);
    } catch (error) {
      console.error('Failed to restore backup:', error);
    }
  };

  const handleDeleteBackup = async (backupId: string) => {
    if (
      !confirm(
        'Are you sure you want to delete this backup? This action cannot be undone.'
      )
    ) {
      return;
    }

    try {
      await deleteBackupMutation.mutateAsync(backupId);
    } catch (error) {
      console.error('Failed to delete backup:', error);
    }
  };

  const handleScheduleBackup = async (
    schedule: 'daily' | 'weekly' | 'monthly'
  ) => {
    try {
      await scheduleBackupMutation.mutateAsync(schedule);
      alert(`Backup scheduled for ${schedule} intervals`);
    } catch (error) {
      console.error('Failed to schedule backup:', error);
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString();
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (backupsLoading || statsLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin text-blue-500 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">
            Loading backup data...
          </p>
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
                Data Backup & Recovery
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Manage system backups, restore data, and schedule automatic
                backups
              </p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowCreateModal(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Plus className="h-4 w-4" />
                <span>Create Backup</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center">
              <Database className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Backups
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.totalBackups}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center">
              <HardDrive className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Size
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatFileSize(stats.totalSize)}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-purple-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Collections
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.collectionsCount}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-orange-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Last Backup
                </p>
                <p className="text-sm font-bold text-gray-900 dark:text-white">
                  {stats.lastBackup ? formatDate(stats.lastBackup) : 'Never'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => handleScheduleBackup('daily')}
              className="flex items-center space-x-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
            >
              <Calendar className="h-5 w-5 text-blue-500" />
              <span className="text-blue-700 dark:text-blue-300">
                Schedule Daily
              </span>
            </button>
            <button
              onClick={() => handleScheduleBackup('weekly')}
              className="flex items-center space-x-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
            >
              <Calendar className="h-5 w-5 text-green-500" />
              <span className="text-green-700 dark:text-green-300">
                Schedule Weekly
              </span>
            </button>
            <button
              onClick={() => handleScheduleBackup('monthly')}
              className="flex items-center space-x-2 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
            >
              <Calendar className="h-5 w-5 text-purple-500" />
              <span className="text-purple-700 dark:text-purple-300">
                Schedule Monthly
              </span>
            </button>
          </div>
        </div>

        {/* Backups List */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Available Backups
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Size
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {backups.map((backup: BackupData) => (
                  <tr
                    key={backup.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {backup.name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {backup.description}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          backup.status === 'completed'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : backup.status === 'failed'
                              ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                        }`}
                      >
                        {backup.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {backup.metadata.totalDocuments} docs
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(backup.metadata.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setSelectedBackup(backup);
                            setShowRestoreModal(true);
                          }}
                          className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                          title="Restore"
                        >
                          <Upload className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteBackup(backup.id)}
                          className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Create Backup Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Create New Backup
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Backup Name
                  </label>
                  <input
                    type="text"
                    value={backupName}
                    onChange={e => setBackupName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="Enter backup name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    value={backupDescription}
                    onChange={e => setBackupDescription(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    rows={3}
                    placeholder="Enter backup description"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateBackup}
                  disabled={createBackupMutation.isPending}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {createBackupMutation.isPending
                    ? 'Creating...'
                    : 'Create Backup'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Restore Backup Modal */}
        {showRestoreModal && selectedBackup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Restore Backup: {selectedBackup.name}
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <p className="text-sm text-yellow-800 dark:text-yellow-200">
                    ⚠️ This will restore all data from the backup. Make sure you
                    have a current backup before proceeding.
                  </p>
                </div>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={restoreOptions.overwriteExisting}
                      onChange={e =>
                        setRestoreOptions({
                          ...restoreOptions,
                          overwriteExisting: e.target.checked,
                        })
                      }
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Overwrite existing data
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={restoreOptions.dryRun}
                      onChange={e =>
                        setRestoreOptions({
                          ...restoreOptions,
                          dryRun: e.target.checked,
                        })
                      }
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Dry run (preview only)
                    </span>
                  </label>
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowRestoreModal(false)}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRestoreBackup}
                  disabled={restoreBackupMutation.isPending}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                >
                  {restoreBackupMutation.isPending
                    ? 'Restoring...'
                    : 'Restore Backup'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
