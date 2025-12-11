"use client";

import React, { useEffect, ReactNode } from "react";
import { useAdminAuth } from "@elzatona/contexts";
import AdminNavbar from "./AdminNavbar";
import { useRouter } from "next/navigation";

interface AdminLayoutProps {
  readonly children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { isAuthenticated, isLoading } = useAdminAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/admin/login");
    }
  }, [isAuthenticated, isLoading, router]);

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
