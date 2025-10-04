'use client';

import React from 'react';
import { AdminAuthProvider, useAdminAuth } from '@/contexts/AdminAuthContext';
import AdminNavbarSimple from '../../../../libs/shared/ui/src/components/AdminNavbarSimple';
import { NotificationContainer } from '@elzatona/shared/ui';
import { usePathname } from 'next/navigation';
// ThemeProvider is already provided by root layout

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
    pathname?.startsWith('/admin/guided-learning/') &&
    pathname?.endsWith('/edit');
  const isQuestionsPage = pathname === '/admin/content/questions';
  const isSimpleTestPage = pathname === '/admin/simple-test';
  const isGuidedLearningMinimalPage =
    pathname === '/admin/guided-learning-minimal';
  const isGuidedLearningSimplePage =
    pathname === '/admin/guided-learning-simple';
  const isGuidedLearningDebugPage = pathname === '/admin/guided-learning-debug';
  const isImportTestPage = pathname === '/admin/import-test';
  const isGuidedLearningMinimal2Page =
    pathname === '/admin/guided-learning-minimal2';
  const isLearningPlansPage = pathname === '/admin/learning-plans';
  const isLearningCardsPage = pathname === '/admin/learning-cards';
  const isNavbarTestPage = pathname === '/admin/navbar-test';
  const isPublicPage =
    isLoginPage ||
    isAdminRootPage ||
    isAuditLogsPage ||
    isGuidedLearningPage ||
    isGuidedLearningEditPage ||
    isQuestionsPage ||
    isSimpleTestPage ||
    isGuidedLearningMinimalPage ||
    isGuidedLearningSimplePage ||
    isGuidedLearningDebugPage ||
    isImportTestPage ||
    isGuidedLearningMinimal2Page ||
    isLearningPlansPage ||
    isLearningCardsPage ||
    isNavbarTestPage;

  // For login page and admin root page, render immediately without waiting for auth check
  if (isPublicPage) {
    // Show navbar for guided learning pages and questions page even without auth
    if (
      isGuidedLearningPage ||
      isGuidedLearningEditPage ||
      isQuestionsPage ||
      isLearningPlansPage ||
      isLearningCardsPage
    ) {
      return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <AdminNavbarSimple />
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

  // Temporarily bypass authentication for development
  // if (!isAuthenticated) {
  //   return null; // Will redirect to login via AdminAuthProvider
  // }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <AdminNavbarSimple />
      <main className="pt-20">{children}</main>
      <NotificationContainer />
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
