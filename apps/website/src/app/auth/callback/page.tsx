'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Conditional Supabase client creation with fallback values
let supabase = null;
try {
  const { createClient } = require('@supabase/supabase-js');
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
  // Use anonymous key for client-side authentication
  const supabaseAnonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder_key';

  if (
    supabaseUrl !== 'https://placeholder.supabase.co' &&
    supabaseAnonKey !== 'placeholder_key'
  ) {
    // Create client with anonymous key for client-side use
    supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
      },
    });
  }
} catch (error) {
  console.warn('Supabase client creation failed in auth callback:', error);
}

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleAuthCallback = async () => {
      if (!supabase) {
        console.error('Supabase client not available');
        router.push('/auth?error=service_unavailable');
        return;
      }

      try {
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          console.error('Auth callback error:', error);
          router.push('/auth?error=auth_failed');
          return;
        }

        if (data.session) {
          // User is authenticated, redirect to home
          router.push('/');
        } else {
          // No session, redirect to auth page
          router.push('/auth');
        }
      } catch (error) {
        console.error('Auth callback error:', error);
        router.push('/auth?error=unexpected_error');
      }
    };

    handleAuthCallback();
  }, [router]);

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4'>
      <div className='max-w-md w-full text-center'>
        <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4'></div>
          <h2 className='text-xl font-semibold text-gray-900 dark:text-white mb-2'>
            Completing Authentication
          </h2>
          <p className='text-gray-600 dark:text-gray-400'>
            Please wait while we complete your login...
          </p>
        </div>
      </div>
    </div>
  );
}
