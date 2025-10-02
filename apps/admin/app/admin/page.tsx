'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { Loader2 } from 'lucide-react';

export default function AdminPage() {
  const { isAuthenticated, isLoading } = useAdminAuth();
  const router = useRouter();

  // Redirect is now handled by AdminAuthProvider context
  // No need for local redirect logic here

  // Show loading state while checking authentication
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-12 h-12 animate-spin text-indigo-600 mx-auto mb-4" />
        <p className="text-gray-600 dark:text-gray-400">
          Checking authentication...
        </p>
      </div>
    </div>
  );
}
