"use client";

import React from "react";
import { AdminAuthProvider, ThemeProvider } from "@elzatona/contexts";
import { AdminNavbar } from "@elzatona/common-ui";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "sonner";

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <NuqsAdapter>
      <ThemeProvider>
        <AdminAuthProvider>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <AdminNavbar />
            <main className="pt-16">{children}</main>
            <Toaster position="top-right" />
          </div>
        </AdminAuthProvider>
      </ThemeProvider>
    </NuqsAdapter>
  );
}
