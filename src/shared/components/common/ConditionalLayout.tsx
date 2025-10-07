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
  const [isAdminRoute, setIsAdminRoute] = useState(false);

  // Ensure consistent rendering between server and client
  useEffect(() => {
    setIsClient(true);
    // Check if current route is admin route
    setIsAdminRoute(pathname?.startsWith('/admin') || false);
  }, [pathname]);

  // During SSR or before hydration, always render the main layout
  // to prevent hydration mismatch and navbar switching
  if (!isClient) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white relative">
        <NavbarSimple />
        <main className="pt-16 sm:pt-18 lg:pt-20 relative">{children}</main>
        <ChatGPT />
      </div>
    );
  }

  // If we're on an admin route, render children without the main layout
  // The admin routes have their own layouts that provide the necessary structure
  if (isAdminRoute) {
    return <>{children}</>;
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
