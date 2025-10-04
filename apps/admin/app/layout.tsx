import { ReactNode } from 'react';
import './globals.css';
import { AdminAuthProvider } from '../contexts/AdminAuthContext';
import { ThemeProvider } from '@elzatona/shared/contexts';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div id="admin-root">
          <ThemeProvider>
            <AdminAuthProvider>{children}</AdminAuthProvider>
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
