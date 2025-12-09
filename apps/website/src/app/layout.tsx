import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { JotaiProvider } from '@/providers/JotaiProvider';
import { QueryProvider } from '@/providers/QueryProvider';
import { SpeedInsights } from '@vercel/speed-insights/next';

import { UserTypeProvider } from '@elzatona/contexts';
import { MobileMenuProvider } from '@elzatona/contexts';
import { ThemeProvider } from '@elzatona/contexts';
import { LanguageProvider } from '@elzatona/contexts';
import { OnboardingProvider } from '@elzatona/contexts';
import { AuthProvider } from '@elzatona/contexts';
import NavbarSimple from '../components/NavbarSimple';
import { NotificationProvider } from '@/components/NotificationSystem';
import AuthSessionSync from '@/components/AuthSessionSync';
import { LearningTypeProvider } from '../context/LearningTypeContext';
import { SentryErrorBoundary } from '../components/SentryErrorBoundary';

// Force dynamic rendering to prevent static generation issues with auth context
export const dynamic = 'force-dynamic';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  fallback: ['system-ui', 'arial'],
});

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={inter.className}>
        <QueryProvider>
          <JotaiProvider>
            <AuthProvider>
              <UserTypeProvider>
                <MobileMenuProvider>
                  <ThemeProvider>
                    <LanguageProvider>
                      <OnboardingProvider>
                        <NotificationProvider>
                          <LearningTypeProvider>
                            <SentryErrorBoundary>
                              {/* Ensure auth snapshot sync runs before navbar to avoid flicker */}
                              <AuthSessionSync />
                              <NavbarSimple />
                              {children}
                              <SpeedInsights />
                            </SentryErrorBoundary>
                          </LearningTypeProvider>
                        </NotificationProvider>
                      </OnboardingProvider>
                    </LanguageProvider>
                  </ThemeProvider>
                </MobileMenuProvider>
              </UserTypeProvider>
            </AuthProvider>
          </JotaiProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
