import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'No Contexts Test Page',
  description: 'A test page without any context providers to debug hydration.',
};

export default function TestNoContextsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <div className="min-h-screen bg-white text-gray-900">{children}</div>
      </body>
    </html>
  );
}
