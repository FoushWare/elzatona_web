'use client';

import React from 'react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import AdminNavbar from '@/components/AdminNavbar';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
// ThemeProvider is already provided by root layout
import '../globals.css';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { isAuthenticated, isLoading } = useAdminAuth();
  const router = useRouter();
  const pathname = usePathname();

  // Skip authentication check for login page and admin root page
  const isLoginPage = pathname === '/admin/login';
  const isAdminRootPage = pathname === '/admin';

  useEffect(() => {
    if (!isLoading && !isAuthenticated && !isLoginPage && !isAdminRootPage) {
      router.push('/admin/login');
    }
  }, [isAuthenticated, isLoading, router, isLoginPage, isAdminRootPage]);

  // For login page and admin root page, render immediately without waiting for auth check
  if (isLoginPage || isAdminRootPage) {
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
    return null; // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <AdminNavbar />
      <main className="pt-20">{children}</main>
    </div>
  );
}
