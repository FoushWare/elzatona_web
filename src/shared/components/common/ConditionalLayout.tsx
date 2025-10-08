'use client';

import { usePathname } from 'next/navigation';
import { NavbarSimple } from './NavbarSimple';
import ChatGPT from './ChatGPT';
import { useState, useEffect } from 'react';

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  // Check if current route is admin route - this works on both server and client
  const isAdminRoute = pathname?.startsWith('/admin') || false;

  // Ensure consistent rendering between server and client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // If we're on an admin route, render children without the main layout
  // The admin routes have their own layouts that provide the necessary structure
  // This prevents navbar switching during SSR and hydration
  if (isAdminRoute) {
    return <>{children}</>;
  }

  // During SSR or before hydration, render the main layout
  // This prevents hydration mismatch for non-admin routes
  if (!isClient) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white relative">
        <NavbarSimple />
        <main className="pt-16 sm:pt-18 lg:pt-20 relative">{children}</main>
        <ChatGPT />
      </div>
    );
  }

  // Otherwise, render the main layout with navbar and other components
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white relative">
      <NavbarSimple />
      <main className="pt-16 sm:pt-18 lg:pt-20 relative">{children}</main>
      <ChatGPT />
    </div>
  );
}
