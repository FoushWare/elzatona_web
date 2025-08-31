import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/hooks/useDarkMode';
import Navigation from '@/components/Navigation';
import ChatGPT from '@/components/ChatGPT';
import { AuthProvider } from '@/contexts/AuthContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Frontend KodDev - Your Path to Frontend Interview Success',
  description:
    'Master frontend development interviews with hands-on coding challenges. Practice HTML, CSS, and JavaScript with 500+ interview questions. KodDev - Your Path to Frontend Interview Success',
  keywords:
    'frontend development, interview preparation, coding challenges, HTML, CSS, JavaScript, React, frontend interview questions',
  authors: [{ name: 'Frontend KodDev Team' }],
  creator: 'Frontend KodDev',
  publisher: 'Frontend KodDev',
  robots: 'index, follow',
  openGraph: {
    title: 'Frontend KodDev - Your Path to Frontend Interview Success',
    description:
      'Master frontend development interviews with hands-on coding challenges. Practice HTML, CSS, and JavaScript with 500+ interview questions.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Frontend KodDev',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Frontend KodDev - Your Path to Frontend Interview Success',
    description:
      'Master frontend development interviews with hands-on coding challenges. Practice HTML, CSS, and JavaScript with 500+ interview questions.',
  },
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#3B82F6',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <AuthProvider>
            <Navigation />
            <main>{children}</main>
            <ChatGPT />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
