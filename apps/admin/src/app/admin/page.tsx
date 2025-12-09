'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminAuth } from '@elzatona/contexts';

export default function AdminRootPage() {
  const { isAuthenticated, isLoading } = useAdminAuth();
  const router = useRouter();

  useEffect(() => {
    console.log('🔄 AdminRootPage useEffect:', { isLoading, isAuthenticated });

    // Don't redirect if still loading
    if (isLoading) {
      console.log('⏳ Still loading, waiting...');
      return;
    }

    // Redirect based on authentication status
    if (isAuthenticated) {
      console.log('✅ User authenticated, redirecting to dashboard');
      router.replace('/admin/dashboard');
    } else {
      console.log('🚨 User not authenticated, redirecting to login');
      router.replace('/admin/login');
    }
  }, [isAuthenticated, isLoading, router]);

  // Show loading while redirecting
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900'>
      <div className='text-center'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4'></div>
        <p className='text-gray-600 dark:text-gray-400'>
          {isLoading ? 'Loading...' : 'Redirecting...'}
        </p>
        <p className='text-sm text-gray-500 dark:text-gray-500 mt-2'>
          Auth: {isAuthenticated ? 'Yes' : 'No'} | Loading:{' '}
          {isLoading ? 'Yes' : 'No'}
        </p>
      </div>
    </div>
  );
}
