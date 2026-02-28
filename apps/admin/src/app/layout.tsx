import type { Metadata } from "next";
import { AdminAuthProvider, ThemeProvider } from "@elzatona/contexts";
import { RepositoryProvider } from "@elzatona/database/client";
import { AdminNavbar } from "@elzatona/common-ui";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "sonner";
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
              <AdminAuthProvider>
                <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                  <AdminNavbar />
                  <main className="pt-16">{children}</main>
                  <Toaster position="top-right" />
                </div>
              </AdminAuthProvider>
            </ThemeProvider>
          </RepositoryProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
