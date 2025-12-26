"use client";

import React from "react";
import AdminLoginNavbar from "../../auth/AdminLoginNavbar";
import Link from "next/link";

interface LoginPageTemplateProps {
  readonly children: React.ReactNode;
  readonly error?: string | null;
}

/**
 * LoginPageTemplate Component
 * Page layout template for admin login page
 * Composes AdminLoginNavbar with centered login form area
 */
export function LoginPageTemplate({ children, error }: LoginPageTemplateProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <AdminLoginNavbar />

      {/* Main content area with padding for navbar */}
      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          {/* Page Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Admin Login
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Sign in to access the admin dashboard
            </p>
          </div>

          {/* Page-level error (if any) */}
          {error && (
            <div className="mb-6 rounded-md bg-red-50 dark:bg-red-900/20 p-4 border border-red-200 dark:border-red-800">
              <div className="text-sm text-red-800 dark:text-red-200">
                {error}
              </div>
            </div>
          )}

          {/* Login Form Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
            {children}
          </div>

          {/* Back to Home Link (for test compatibility) */}
          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
