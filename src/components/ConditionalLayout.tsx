'use client';

import { usePathname } from 'next/navigation';
import { NavbarSimple } from '@/components/NavbarSimple';
import ChatGPT from '@/components/ChatGPT';
import { useState, useEffect } from 'react';

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  // Ensure consistent rendering between server and client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // During SSR or before hydration, always render the main layout
  // to prevent hydration mismatch
  const isAdminRoute = isClient && pathname?.startsWith('/admin');

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
