import type { Metadata } from 'next';
import { AdminAuthProvider, ThemeProvider } from '@elzatona/shared-contexts';
import { AdminNavbar } from '@elzatona/shared-components';
import { NuqsAdapter } from 'nuqs/adapters/next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Admin Dashboard - Elzatona',
  description: 'Admin dashboard for managing Elzatona content',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <NuqsAdapter>
          <ThemeProvider>
            <AdminAuthProvider>
              <div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
                <AdminNavbar />
                <main className='pt-16'>{children}</main>
              </div>
            </AdminAuthProvider>
          </ThemeProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
