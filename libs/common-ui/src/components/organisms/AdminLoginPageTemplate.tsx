"use client";

import React from "react";
import Link from "next/link";
import AdminLoginNavbar from "../../auth/AdminLoginNavbar";

interface AdminLoginPageTemplateProps {
  readonly children: React.ReactNode;
  readonly isLoading?: boolean;
}

/**
 * AdminLoginPageTemplate Component
 * Page layout template for admin login page
 * Matches the original styling from fix/main-branch-import-paths
 * Red gradient background with centered form
 */
export function AdminLoginPageTemplate({
  children,
  isLoading = false,
}: AdminLoginPageTemplateProps) {
  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 dark:from-gray-900 dark:to-gray-800">
        <AdminLoginNavbar />
        <div className="pt-20 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 dark:from-gray-900 dark:to-gray-800">
      <AdminLoginNavbar />
      <div className="pt-20 flex items-center justify-center min-h-screen p-4">
        <div className="max-w-md w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Admin Login
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Access the admin dashboard
            </p>
          </div>

          {/* Login Form */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            {children}

            {/* Back to Home Link */}
            <div className="mt-6 text-center">
              <Link
                href="/"
                className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 text-sm transition-colors"
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
