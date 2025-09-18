'use client';

import { useAdminAuth } from '@/hooks/useAdminAuth';
import AdminLayout from '@/components/AdminLayout';

export default function AdminDashboard() {
  const { user } = useAdminAuth();

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Welcome back, {user?.name} ({user?.role})
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Quick Stats */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Quick Stats
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Total Questions:
                </span>
                <span className="font-medium text-gray-900 dark:text-white">
                  -
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Audio Files:
                </span>
                <span className="font-medium text-gray-900 dark:text-white">
                  -
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Active Admins:
                </span>
                <span className="font-medium text-gray-900 dark:text-white">
                  -
                </span>
              </div>
            </div>
          </div>

          {/* Audio Management */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Audio Management
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Upload and manage audio files for questions and answers.
            </p>
            <button
              onClick={() => {
                console.log('Manage Audio Files button clicked!');
                alert('Button clicked! Navigating to /admin/audio');
                window.location.href = '/admin/audio';
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white py-2 px-4 rounded-lg transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Manage Audio Files
            </button>
          </div>

          {/* Admin Management */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              User Management
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Create and manage user accounts.
            </p>
            <button
              onClick={() => {
                console.log('Manage Users button clicked!');
                alert('Button clicked! Navigating to /admin/users');
                window.location.href = '/admin/users';
              }}
              className="w-full bg-green-600 hover:bg-green-700 active:bg-green-800 text-white py-2 px-4 rounded-lg transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Manage Users
            </button>
          </div>

          {/* Project Reports */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Project Reports
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              View comprehensive project features, progress, and status reports.
            </p>
            <button
              onClick={() => {
                console.log('Feature Reports button clicked!');
                window.location.href = '/admin/reports';
              }}
              className="w-full bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white py-2 px-4 rounded-lg transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              Feature Reports
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Recent Activity
          </h3>
          <div className="text-gray-600 dark:text-gray-400 text-center py-8">
            No recent activity to display.
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
