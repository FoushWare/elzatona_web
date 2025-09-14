'use client';

import { useAdminAuth } from '@/hooks/useAdminAuth';
import AdminLayout from '@/components/AdminLayout';
import AdminManagement from '@/components/AdminManagement';

export default function AdminUsersPage() {
  const { user } = useAdminAuth();

  return (
    <AdminLayout>
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
        <AdminManagement />
      </div>
    </AdminLayout>
  );
}
