'use client';

import React, { useState, useEffect } from 'react';
import { BackupClientService, BackupStats } from '@/lib/backup-client';
import { BackupQuestion } from '@/lib/backup-service';

export default function BackupManager() {
  const [stats, setStats] = useState<BackupStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSection, setSelectedSection] = useState<string>('');
  const [sectionQuestions, setSectionQuestions] = useState<BackupQuestion[]>(
    []
  );
  const [showSectionDetails, setShowSectionDetails] = useState(false);

  useEffect(() => {
    loadBackupStats();
  }, []);

  const loadBackupStats = async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await BackupClientService.getBackupStats();

      if (result.success) {
        setStats(result.data as BackupStats);
      } else {
        setError(result.error || 'Failed to load backup statistics');
      }
    } catch (error) {
      setError('Failed to load backup statistics');
    } finally {
      setLoading(false);
    }
  };

  const loadSectionQuestions = async (section: string) => {
    try {
      setLoading(true);
      setError(null);

      const result = await BackupClientService.getSectionBackup(section);

      if (result.success) {
        setSectionQuestions(result.data as BackupQuestion[]);
        setSelectedSection(section);
        setShowSectionDetails(true);
      } else {
        setError(result.error || 'Failed to load section questions');
      }
    } catch (error) {
      setError('Failed to load section questions');
    } finally {
      setLoading(false);
    }
  };

  const deleteSectionBackup = async (section: string) => {
    if (
      !confirm(
        `Are you sure you want to delete the backup for ${BackupClientService.formatSectionName(section)}?`
      )
    ) {
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const result = await BackupClientService.deleteSectionBackup(section);

      if (result.success) {
        // Reload stats
        await loadBackupStats();
        setShowSectionDetails(false);
        setSelectedSection('');
      } else {
        setError(result.error || 'Failed to delete section backup');
      }
    } catch (error) {
      setError('Failed to delete section backup');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !stats) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-gray-400">
          Loading backup information...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            📁 Backup Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage question backups organized by section
          </p>
        </div>
        <button
          onClick={loadBackupStats}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
        >
          Refresh
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
        </div>
      )}

      {/* Backup Statistics */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <span className="text-2xl">📁</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Backup Files
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.totalFiles}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <span className="text-2xl">❓</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Questions
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.totalQuestions}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                <span className="text-2xl">📊</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Active Sections
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {Object.keys(stats.sections).length}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Section List */}
      {stats && Object.keys(stats.sections).length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Backup Sections
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Click on a section to view its backup questions
            </p>
          </div>

          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {Object.entries(stats.sections).map(([section, count]) => (
              <div
                key={section}
                className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">
                      {BackupClientService.getSectionIcon(section)}
                    </span>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {BackupClientService.formatSectionName(section)}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {count} question{count !== 1 ? 's' : ''} backed up
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => loadSectionQuestions(section)}
                      className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors"
                    >
                      View Questions
                    </button>
                    <button
                      onClick={() => deleteSectionBackup(section)}
                      className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded transition-colors"
                    >
                      Delete Backup
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Section Details Modal */}
      {showSectionDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">
                    {BackupClientService.getSectionIcon(selectedSection)}
                  </span>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {BackupClientService.formatSectionName(selectedSection)}{' '}
                      Backup
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {sectionQuestions.length} question
                      {sectionQuestions.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowSectionDetails(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <span className="text-gray-500 dark:text-gray-400">✕</span>
                </button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto max-h-[60vh]">
              {sectionQuestions.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-600 dark:text-gray-400">
                    No questions found in this backup
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {sectionQuestions.map(question => (
                    <div
                      key={question.id}
                      className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                            {question.title}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                            {question.content}
                          </p>

                          <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                            <span
                              className={`px-2 py-1 rounded ${
                                question.difficulty === 'easy'
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                                  : question.difficulty === 'medium'
                                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                                    : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                              }`}
                            >
                              {question.difficulty.charAt(0).toUpperCase() +
                                question.difficulty.slice(1)}
                            </span>
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 rounded">
                              {question.type === 'single'
                                ? 'Single Choice'
                                : 'Multiple Choice'}
                            </span>
                            <span>
                              Created:{' '}
                              {new Date(
                                question.createdAt
                              ).toLocaleDateString()}
                            </span>
                          </div>
                        </div>

                        <div className="ml-4">
                          <span
                            className={`px-2 py-1 rounded text-xs ${
                              question.isActive
                                ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                                : 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
                            }`}
                          >
                            {question.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {stats && Object.keys(stats.sections).length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📁</div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No Backup Files Found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Questions will be automatically backed up when you create them in
            the admin panel.
          </p>
        </div>
      )}
    </div>
  );
}
