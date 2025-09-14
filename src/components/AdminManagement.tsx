import React, { useState, useEffect } from 'react';
import { AdminAuthService, AdminCredential } from '@/lib/admin-auth';

interface AdminManagementProps {
  currentUser: {
    id: string;
    role: 'super_admin' | 'admin';
  };
}

export default function AdminManagement({ currentUser }: AdminManagementProps) {
  const [admins, setAdmins] = useState<AdminCredential[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Form state for creating new admin
  const [newAdmin, setNewAdmin] = useState({
    email: '',
    password: '',
    name: '',
    role: 'admin' as 'super_admin' | 'admin',
  });

  // Load admins on component mount
  useEffect(() => {
    loadAdmins();
  }, []);

  const loadAdmins = async () => {
    try {
      setIsLoading(true);
      const adminList = await AdminAuthService.getAllAdmins();
      setAdmins(adminList);
    } catch (error) {
      setError('Failed to load admins');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const result = await AdminAuthService.createAdmin(
        newAdmin.email,
        newAdmin.password,
        newAdmin.name,
        newAdmin.role
      );

      if (result.success) {
        setSuccess('Admin created successfully!');
        setNewAdmin({ email: '', password: '', name: '', role: 'admin' });
        setShowCreateForm(false);
        loadAdmins(); // Reload the list
      } else {
        setError(result.error || 'Failed to create admin');
      }
    } catch (error) {
      setError('An unexpected error occurred');
    }
  };

  const handleDeactivateAdmin = async (adminId: string, adminEmail: string) => {
    if (!confirm(`Are you sure you want to deactivate ${adminEmail}?`)) {
      return;
    }

    try {
      const result = await AdminAuthService.deactivateAdmin(adminId);

      if (result.success) {
        setSuccess('Admin deactivated successfully!');
        loadAdmins(); // Reload the list
      } else {
        setError(result.error || 'Failed to deactivate admin');
      }
    } catch (error) {
      setError('An unexpected error occurred');
    }
  };

  // Only super admins can manage other admins
  if (currentUser.role !== 'super_admin') {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Admin Management
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Only super admins can manage admin accounts.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Admin Management
        </h3>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          {showCreateForm ? 'Cancel' : 'Create Admin'}
        </button>
      </div>

      {/* Success/Error Messages */}
      {success && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-4">
          <p className="text-green-600 dark:text-green-400 text-sm">
            {success}
          </p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4">
          <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
        </div>
      )}

      {/* Create Admin Form */}
      {showCreateForm && (
        <form
          onSubmit={handleCreateAdmin}
          className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
        >
          <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-4">
            Create New Admin
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                value={newAdmin.email}
                onChange={e =>
                  setNewAdmin({ ...newAdmin, email: e.target.value })
                }
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-600 dark:text-white"
                placeholder="admin@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Name
              </label>
              <input
                type="text"
                value={newAdmin.name}
                onChange={e =>
                  setNewAdmin({ ...newAdmin, name: e.target.value })
                }
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-600 dark:text-white"
                placeholder="Admin Name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                value={newAdmin.password}
                onChange={e =>
                  setNewAdmin({ ...newAdmin, password: e.target.value })
                }
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-600 dark:text-white"
                placeholder="Secure password"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Role
              </label>
              <select
                value={newAdmin.role}
                onChange={e =>
                  setNewAdmin({
                    ...newAdmin,
                    role: e.target.value as 'super_admin' | 'admin',
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-600 dark:text-white"
              >
                <option value="admin">Admin</option>
                <option value="super_admin">Super Admin</option>
              </select>
            </div>
          </div>

          <div className="mt-4 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setShowCreateForm(false)}
              className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Create Admin
            </button>
          </div>
        </form>
      )}

      {/* Admins List */}
      <div>
        <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-4">
          Admin Accounts
        </h4>

        {isLoading ? (
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Loading admins...
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {admins.map(admin => (
              <div
                key={admin.id}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <div>
                  <div className="flex items-center space-x-3">
                    <span className="font-medium text-gray-900 dark:text-white">
                      {admin.name}
                    </span>
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                      {admin.role}
                    </span>
                    {!admin.isActive && (
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200">
                        Inactive
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {admin.email}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    Created: {new Date(admin.createdAt).toLocaleDateString()}
                    {admin.lastLogin && (
                      <span>
                        {' '}
                        • Last login:{' '}
                        {new Date(admin.lastLogin).toLocaleDateString()}
                      </span>
                    )}
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  {admin.isActive && admin.id !== currentUser.id && (
                    <button
                      onClick={() =>
                        handleDeactivateAdmin(admin.id, admin.email)
                      }
                      className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 text-sm transition-colors"
                    >
                      Deactivate
                    </button>
                  )}
                </div>
              </div>
            ))}

            {admins.length === 0 && (
              <p className="text-gray-600 dark:text-gray-400 text-center py-4">
                No admin accounts found.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
