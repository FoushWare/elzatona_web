"use client";

import React, { useState, useEffect } from "react";
// Note: This page uses API routes, not direct supabase client

import { useAuth } from "@elzatona/contexts";
import { useAdminAuth } from "@elzatona/contexts";
import {
  Users,
  _UserPlus,
  Shield,
  Crown,
  Star,
  _Mail,
  _Calendar,
  Activity,
  Search,
  _Filter,
  _MoreVertical,
  Edit,
  Trash2,
  Eye,
  RefreshCw,
} from "lucide-react";

interface User {
  id: string;
  email: string;
  name: string;
  role: "user" | "premium_user" | "admin" | "super_admin";
  is_active: boolean;
  created_at: string;
  lastLogin?: string;
  preferences?: {
    theme: "light" | "dark" | "system";
    notifications: boolean;
    emailUpdates: boolean;
  };
  progress?: {
    completedQuestions: string[];
    completedPaths: string[];
    streak: number;
    totalTimeSpent: number;
  };
}

export default function UserManagementPage() {
  const { user: currentUser } = useAuth();
  const { isAuthenticated } = useAdminAuth();
  const isAdmin = isAuthenticated;
  const isSuperAdmin = isAuthenticated;
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [refreshing, setRefreshing] = useState(false);

  const fetchUsers = async () => {
    try {
      setRefreshing(true);
      const response = await fetch("/api/users");
      const data = await response.json();

      if (data.success) {
        setUsers(data.users);
        setError(null);
      } else {
        setError(data.error || "Failed to fetch users");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchUsers();
    }
  }, [isAdmin]);

  // Check permissions after hooks
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Shield className="h-16 w-16 text-red-500 mx-auto mb-4" />
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

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      (user.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.email || "").toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = roleFilter === "all" || user.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "super_admin":
        return <Crown className="h-4 w-4 text-purple-500" />;
      case "admin":
        return <Shield className="h-4 w-4 text-blue-500" />;
      case "premium_user":
        return <Star className="h-4 w-4 text-yellow-500" />;
      default:
        return <Users className="h-4 w-4 text-gray-500" />;
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "super_admin":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      case "admin":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "premium_user":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin text-blue-500 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading users...</p>
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
                User Management
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Manage user accounts, roles, and permissions
              </p>
            </div>
            <button
              onClick={fetchUsers}
              disabled={refreshing}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              <RefreshCw
                className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`}
              />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Users
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {users.length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center">
              <Star className="h-8 w-8 text-yellow-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Premium Users
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {users.filter((u) => u.role === "premium_user").length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Admins
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {
                    users.filter(
                      (u) => u.role === "admin" || u.role === "super_admin",
                    ).length
                  }
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center">
              <Activity className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Active Users
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {users.filter((u) => u.is_active).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
            <div className="sm:w-48">
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="all">All Roles</option>
                <option value="user">User</option>
                <option value="premium_user">Premium User</option>
                <option value="admin">Admin</option>
                <option value="super_admin">Super Admin</option>
              </select>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Joined
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Last Login
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
                            <span className="text-white font-medium">
                              {user.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {user.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getRoleIcon(user.role)}
                        <span
                          className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleBadgeColor(user.role)}`}
                        >
                          {user.role.replace("_", " ")}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          user.is_active
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                        }`}
                      >
                        {user.is_active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {new Date(user.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {user.lastLogin
                        ? new Date(user.lastLogin).toLocaleDateString()
                        : "Never"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                          <Eye className="h-4 w-4" />
                        </button>
                        {isSuperAdmin && (
                          <>
                            <button className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </>
                        )}
                      </div>
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
