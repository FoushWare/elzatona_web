/**
 * WebsiteRootLayout Component
 * Root layout for website app with all necessary providers
 * v1.0
 */

import type { Metadata } from "next";
import { Inter } from "next/font/google";
// Note: JotaiProvider and QueryProvider should be imported from the consuming app
// They are app-specific and not part of the shared library
import { SpeedInsights } from "@vercel/speed-insights/next";

import {
  UserTypeProvider,
  MobileMenuProvider,
  ThemeProvider,
  LanguageProvider,
  OnboardingProvider,
  AuthProvider,
  NotificationProvider,
} from "@elzatona/contexts";
import { ErrorBoundary } from "@elzatona/common-ui";

// Note: These should be provided by the consuming app
// LearningTypeProvider, NavigationProvider, JotaiProvider, and QueryProvider are app-specific
export interface WebsiteRootLayoutProps {
  readonly children: React.ReactNode;
  readonly ConditionalNavbar?: React.ComponentType;
  readonly LearningTypeProvider?: React.ComponentType<{
    children: React.ReactNode;
  }>;
  readonly NavigationProvider?: React.ComponentType<{
    children: React.ReactNode;
  }>;
  readonly JotaiProvider?: React.ComponentType<{
    children: React.ReactNode;
  }>;
  readonly QueryProvider?: React.ComponentType<{
    children: React.ReactNode;
  }>;
}

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  fallback: ["system-ui", "arial"],
});

export const websiteMetadata: Metadata = {
  title: "Master Frontend Development Interviews",
  description:
    "Comprehensive platform for mastering frontend development interviews. Practice questions, learning paths, coding challenges, and real-time AI assistance.",
  keywords:
    "frontend development, interview preparation, React, JavaScript, CSS, HTML, coding challenges, learning paths",
  authors: [{ name: "Development Team" }],
  creator: "Development Team",
  publisher: "Development Team",
  robots: "index, follow",
  openGraph: {
    title: "Master Frontend Development Interviews",
    description:
      "Comprehensive platform for mastering frontend development interviews. Practice questions, learning paths, coding challenges, and real-time AI assistance.",
    type: "website",
    locale: "en_US",
    siteName: "Frontend Development Platform",
  },
  twitter: {
    card: "summary_large_image",
    title: "Master Frontend Development Interviews",
    description:
      "Comprehensive platform for mastering frontend development interviews. Practice questions, learning paths, coding challenges, and real-time AI assistance.",
  },
};

export const websiteViewport = {
  width: "device-width",
  initialScale: 1,
};

export function WebsiteRootLayout({
  children,
  ConditionalNavbar,
  LearningTypeProvider,
  NavigationProvider,
  JotaiProvider,
  QueryProvider,
}: WebsiteRootLayoutProps) {
  // If app-specific providers are not provided, use fragments
  const LearningProvider = LearningTypeProvider || React.Fragment;
  const NavProvider = NavigationProvider || React.Fragment;
  const Navbar = ConditionalNavbar || React.Fragment;
  const Jotai = JotaiProvider || React.Fragment;
  const Query = QueryProvider || React.Fragment;

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Query>
          <Jotai>
            <AuthProvider>
              <UserTypeProvider>
                <MobileMenuProvider>
                  <ThemeProvider>
                    <LanguageProvider>
                      <OnboardingProvider>
                        <NotificationProvider>
                          <LearningProvider>
                            <NavProvider>
                              <ErrorBoundary>
                                {ConditionalNavbar && <Navbar />}
                                {children}
                                <SpeedInsights />
                              </ErrorBoundary>
                            </NavProvider>
                          </LearningProvider>
                        </NotificationProvider>
                      </OnboardingProvider>
                    </LanguageProvider>
                  </ThemeProvider>
                </MobileMenuProvider>
              </UserTypeProvider>
            </AuthProvider>
          </Jotai>
        </Query>
      </body>
    </html>
  );
}

export default WebsiteRootLayout;
