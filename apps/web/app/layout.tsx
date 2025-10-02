import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import '@/styles/rtl.css';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { FirebaseAuthProvider } from '@/contexts/FirebaseAuthContext';
import { UserPreferencesProvider } from '@/contexts/UserPreferencesContext';
import { UserTypeProvider } from '@/contexts/UserTypeContext';
import { MobileMenuProvider } from '@/contexts/MobileMenuContext';
import { OnboardingProvider } from '@/contexts/OnboardingContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { RTLProvider } from '@/contexts/RTLContext';
import { ConditionalLayout } from '@/components/ConditionalLayout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Master Frontend Development Interviews',
  description:
    'Comprehensive platform for mastering frontend development interviews. Practice questions, learning paths, coding challenges, and real-time AI assistance.',
  keywords:
    'frontend development, interview preparation, React, JavaScript, CSS, HTML, coding challenges, learning paths',
  authors: [{ name: 'Development Team' }],
  creator: 'Development Team',
  publisher: 'Development Team',
  robots: 'index, follow',
  openGraph: {
    title: 'Master Frontend Development Interviews',
    description:
      'Comprehensive platform for mastering frontend development interviews. Practice questions, learning paths, coding challenges, and real-time AI assistance.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Frontend Development Platform',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Master Frontend Development Interviews',
    description:
      'Comprehensive platform for mastering frontend development interviews. Practice questions, learning paths, coding challenges, and real-time AI assistance.',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

// Removed themeColor export to fix TypeScript build error

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <RTLProvider>
          <ThemeProvider>
            <LanguageProvider>
              <FirebaseAuthProvider>
                <UserPreferencesProvider>
                  <UserTypeProvider>
                    <MobileMenuProvider>
                      <OnboardingProvider>
                        <ConditionalLayout>{children}</ConditionalLayout>
                      </OnboardingProvider>
                    </MobileMenuProvider>
                  </UserTypeProvider>
                </UserPreferencesProvider>
              </FirebaseAuthProvider>
            </LanguageProvider>
          </ThemeProvider>
        </RTLProvider>
      </body>
    </html>
  );
}
