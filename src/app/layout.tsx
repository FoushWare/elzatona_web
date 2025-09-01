import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { FirebaseAuthProvider } from '@/contexts/FirebaseAuthContext';
import { Navbar } from '@/components/Navbar';
import { ChatGPT } from '@/components/ChatGPT';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Frontend KodDev - Master Frontend Development Interviews',
  description:
    'Comprehensive platform for mastering frontend development interviews. Practice questions, learning paths, coding challenges, and real-time AI assistance.',
  keywords:
    'frontend development, interview preparation, React, JavaScript, CSS, HTML, coding challenges, learning paths',
  authors: [{ name: 'Frontend KodDev Team' }],
  creator: 'Frontend KodDev',
  publisher: 'Frontend KodDev',
  robots: 'index, follow',
  openGraph: {
    title: 'Frontend KodDev - Master Frontend Development Interviews',
    description:
      'Comprehensive platform for mastering frontend development interviews. Practice questions, learning paths, coding challenges, and real-time AI assistance.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Frontend KodDev',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Frontend KodDev - Master Frontend Development Interviews',
    description:
      'Comprehensive platform for mastering frontend development interviews. Practice questions, learning paths, coding challenges, and real-time AI assistance.',
  },
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#3B82F6',
};

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
            <div className="min-h-screen bg-background text-foreground">
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
