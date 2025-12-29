/**
 * AdminRootLayout Component
 * Root layout for admin app with necessary providers
 * v1.0
 */

import type { Metadata } from "next";
import { AdminAuthProvider, ThemeProvider } from "@elzatona/contexts";
import { AdminNavbar } from "@elzatona/common-ui";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "sonner";

export const adminMetadata: Metadata = {
  title: "Admin Dashboard - Elzatona",
  description: "Admin dashboard for managing Elzatona content",
};

export interface AdminRootLayoutProps {
  readonly children: React.ReactNode;
}

export function AdminRootLayout({ children }: AdminRootLayoutProps) {
  return (
    <html lang="en">
      <body>
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
      </body>
    </html>
  );
}

export default AdminRootLayout;
