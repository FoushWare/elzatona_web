"use client";

import React, { ReactNode } from "react";
import {
  AdminAuthProvider,
  useAdminAuth,
  NotificationProvider,
} from "@elzatona/contexts";
import {
  AdminNavbar,
  NotificationContainer,
  FirestoreErrorBoundary,
} from "@elzatona/components";
import { usePathname } from "next/navigation";
// ThemeProvider is already provided by root layout
import "../globals.css";

interface AdminLayoutProps {
  children: React.ReactNode;
}

function AdminLayoutContent({ children }: AdminLayoutProps) {
  const { isAuthenticated, isLoading } = useAdminAuth();
  const pathname = usePathname();

  // Skip authentication check for login page and admin root page
  const isLoginPage = pathname === "/admin/login";
  const isAdminRootPage = pathname === "/admin";

  // TEMPORARY: Skip authentication for development/testing
  const isDevelopment = process.env["NODE_ENV"] === "development";
  const skipAuthForTesting =
    isDevelopment &&
    (pathname?.includes("/admin/content/questions") ||
      pathname?.includes("/admin/enhanced-structure") ||
      pathname?.includes("/admin/content-management") ||
      pathname?.includes("/admin/dashboard") ||
      pathname?.includes("/admin/frontend-tasks") ||
      pathname?.includes("/admin/problem-solving"));

  // For login page and admin root page, render immediately without waiting for auth check
  if (isLoginPage || isAdminRootPage) {
    return <>{children}</>;
  }

  // For testing pages, render with navbar but skip auth check
  if (skipAuthForTesting) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <AdminNavbar />
        <main className="pt-16">{children}</main>
        <NotificationContainer />
      </div>
    );
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

  // Check authentication for all other admin routes
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

export default function AdminLayout({ children }: AdminLayoutProps) {
  // TEMPORARY: Skip AdminAuthProvider for testing
  const pathname = usePathname();
  const isDevelopment = process.env["NODE_ENV"] === "development";
  const skipAuthForTesting =
    isDevelopment &&
    (pathname?.includes("/admin/content/questions") ||
      pathname?.includes("/admin/enhanced-structure") ||
      pathname?.includes("/admin/content-management") ||
      pathname?.includes("/admin/dashboard") ||
      pathname?.includes("/admin/frontend-tasks") ||
      pathname?.includes("/admin/problem-solving"));

  if (skipAuthForTesting) {
    return (
      <AdminAuthProvider>
        <NotificationProvider>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <AdminNavbar />
            <main className="pt-16">{children}</main>
            <NotificationContainer />
          </div>
        </NotificationProvider>
      </AdminAuthProvider>
    );
  }

  return (
    <AdminAuthProvider>
      <AdminLayoutWithNotifications>{children}</AdminLayoutWithNotifications>
    </AdminAuthProvider>
  );
}
