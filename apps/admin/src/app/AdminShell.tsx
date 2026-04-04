"use client";

import React from "react";
import { AdminNavbar } from "@elzatona/common-ui";
import { useAdminNavbarVisibility } from "@elzatona/contexts";
import { Toaster } from "sonner";

interface AdminShellProps {
  children: React.ReactNode;
}

export default function AdminShell({ children }: AdminShellProps) {
  const { isNavbarVisible } = useAdminNavbarVisibility();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {isNavbarVisible ? <AdminNavbar /> : null}
      <main className={isNavbarVisible ? "pt-16" : "pt-0"}>{children}</main>
      <Toaster position="top-right" />
    </div>
  );
}
