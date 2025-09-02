import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { FirebaseAuthProvider } from '@/contexts/FirebaseAuthContext';
import Navbar from '@/components/Navbar';
import ChatGPT from '@/components/ChatGPT';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Zatona Web 🫒 - Master Frontend Development Interviews',
  description:
    'Comprehensive platform for mastering frontend development interviews. Practice questions, learning paths, coding challenges, and real-time AI assistance.',
  keywords:
    'frontend development, interview preparation, React, JavaScript, CSS, HTML, coding challenges, learning paths',
  authors: [{ name: 'Zatona Web Team' }],
  creator: 'Zatona Web',
  publisher: 'Zatona Web',
  robots: 'index, follow',
  openGraph: {
    title: 'Zatona Web 🫒 - Master Frontend Development Interviews',
    description:
      'Comprehensive platform for mastering frontend development interviews. Practice questions, learning paths, coding challenges, and real-time AI assistance.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Zatona Web',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zatona Web 🫒 - Master Frontend Development Interviews',
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
            <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
              <Navbar />
              <main>{children}</main>
              <ChatGPT />
            </div>
          </FirebaseAuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
