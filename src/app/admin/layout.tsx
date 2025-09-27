'use client';

import React from 'react';
import { AdminAuthProvider, useAdminAuth } from '@/contexts/AdminAuthContext';
import AdminNavbar from '@/components/AdminNavbar';
import { usePathname } from 'next/navigation';
// ThemeProvider is already provided by root layout
import '../globals.css';

interface AdminLayoutProps {
  children: React.ReactNode;
}

function AdminLayoutContent({ children }: AdminLayoutProps) {
  const { isAuthenticated, isLoading } = useAdminAuth();
  const pathname = usePathname();

  // Skip authentication check for login page and admin root page
  const isLoginPage = pathname === '/admin/login';
  const isAdminRootPage = pathname === '/admin';
  const isAuditLogsPage = pathname === '/admin/audit-logs';
  const isGuidedLearningPage = pathname === '/admin/guided-learning';
  const isGuidedLearningEditPage =
    pathname.startsWith('/admin/guided-learning/') &&
    pathname.endsWith('/edit');
  const isPublicPage =
    isLoginPage ||
    isAdminRootPage ||
    isAuditLogsPage ||
    isGuidedLearningPage ||
    isGuidedLearningEditPage;

  // For login page and admin root page, render immediately without waiting for auth check
  if (isPublicPage) {
    // Show navbar for guided learning pages even without auth
    if (isGuidedLearningPage || isGuidedLearningEditPage) {
      return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <AdminNavbar />
          <main className="pt-20">{children}</main>
        </div>
      );
    }
    return <>{children}</>;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">
            Loading admin panel...
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect to login via AdminAuthProvider
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <AdminNavbar />
      <main className="pt-20">{children}</main>
    </div>
  );
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <AdminAuthProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </AdminAuthProvider>
  );
}
