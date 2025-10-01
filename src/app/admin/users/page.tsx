'use client';

import { useAdminAuth } from '@/hooks/useAdminAuth';

import AdminManagement from '@/components/AdminManagement';

export default function AdminUsersPage() {
  const { user } = useAdminAuth();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          User Management
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Manage admin accounts and user permissions
        </p>
      </div>

      {/* Admin Management Component */}
      {user ? (
        <AdminManagement currentUser={user} />
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Admin Management
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Please log in to manage admin accounts.
          </p>
        </div>
      )}
    </div>
  );
}
