/**
 * AdminLayout Component
 * Layout wrapper for admin routes with authentication and navigation
 * v1.0
 */

"use client";

import React from "react";
import {
  AdminAuthProvider,
  useAdminAuth,
  NotificationProvider,
} from "@elzatona/contexts";
import {
  AdminNavbar,
  NotificationContainer,
  FirestoreErrorBoundary,
} from "@elzatona/common-ui";
import { usePathname } from "next/navigation";

interface AdminLayoutProps {
  readonly children: React.ReactNode;
}

function AdminLayoutContent({ children }: AdminLayoutProps) {
  const { isAuthenticated, isLoading } = useAdminAuth();
  const pathname = usePathname();

  // Skip authentication check only for login page and admin root page
  const isLoginPage = pathname === "/admin/login";
  const isAdminRootPage = pathname === "/admin";

  // For login page and admin root page, render immediately without waiting for auth check
  if (isLoginPage || isAdminRootPage) {
    return <>{children}</>;
  }

  // Show loading state while checking authentication
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

  // Check authentication for all admin routes (except login and root)
  if (!isAuthenticated) {
    return null; // Will redirect to login via AdminAuthProvider
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <AdminNavbar />
      <main className="pt-16">
        <FirestoreErrorBoundary>{children}</FirestoreErrorBoundary>
      </main>
      <NotificationContainer />
    </div>
  );
}

// Wrapper component to access user from AdminAuthProvider
function AdminLayoutWithNotifications({ children }: AdminLayoutProps) {
  const { user } = useAdminAuth();
  return (
    <NotificationProvider adminId={user?.id}>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </NotificationProvider>
  );
}

export function AdminLayout({ children }: AdminLayoutProps) {
  // All admin routes require authentication (except login and root which are handled in AdminLayoutContent)
  return (
    <AdminAuthProvider>
      <AdminLayoutWithNotifications>{children}</AdminLayoutWithNotifications>
    </AdminAuthProvider>
  );
}

export default AdminLayout;
