import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { FirebaseAuthProvider } from '@/contexts/FirebaseAuthContext';
import { UserPreferencesProvider } from '@/contexts/UserPreferencesContext';
import { UserTypeProvider } from '@/contexts/UserTypeContext';
import { MobileMenuProvider } from '@/contexts/MobileMenuContext';
import { OnboardingProvider } from '@/contexts/OnboardingContext';
import { NavbarSimple } from '@/components/NavbarSimple';
import ChatGPT from '@/components/ChatGPT';
import { ComprehensiveGuidanceDetector } from '@/components/ComprehensiveGuidanceDetector';
import { SignInGuidanceDetector } from '@/components/SignInGuidanceDetector';
import { FirstTimeVisitorDetector } from '@/components/FirstTimeVisitorDetector';
import { LearningModeDetector } from '@/components/LearningModeDetector';

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

export const themeColor = '#3B82F6';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <FirebaseAuthProvider>
            <UserPreferencesProvider>
              <UserTypeProvider>
                <MobileMenuProvider>
                  <OnboardingProvider>
                    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white relative">
                      <NavbarSimple />
                      <main className="pt-16 sm:pt-18 lg:pt-20 relative">
                        {children}
                        <ChatGPT />
                      </main>
                      <ComprehensiveGuidanceDetector />
                      <SignInGuidanceDetector />
                      <FirstTimeVisitorDetector />
                      <LearningModeDetector />
                    </div>
                  </OnboardingProvider>
                </MobileMenuProvider>
              </UserTypeProvider>
            </UserPreferencesProvider>
          </FirebaseAuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
