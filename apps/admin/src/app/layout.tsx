import React from "react";
import type { Metadata } from "next";
import {
  AdminAuthProvider,
  AdminNavbarVisibilityProvider,
  ThemeProvider,
} from "@elzatona/contexts";
import { RepositoryProvider } from "@elzatona/database/client";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import AdminShell from "./AdminShell";
import "./globals.css";

export const metadata: Metadata = {
  title: "Admin Dashboard - Elzatona",
  description: "Admin dashboard for managing Elzatona content",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NuqsAdapter>
          <RepositoryProvider>
            <ThemeProvider>
              <AdminNavbarVisibilityProvider>
                <AdminAuthProvider>
                  <AdminShell>{children}</AdminShell>
                </AdminAuthProvider>
              </AdminNavbarVisibilityProvider>
            </ThemeProvider>
          </RepositoryProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
