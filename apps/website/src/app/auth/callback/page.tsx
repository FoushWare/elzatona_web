'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import {
  supabaseClient as supabase,
  isSupabaseAvailable,
} from '@/lib/supabase-client';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleAuthCallback = async () => {
      if (!isSupabaseAvailable() || !supabase) {
        console.error('❌ Supabase client not available');
        router.push('/auth?error=service_unavailable');
        return;
      }

      try {
        // Handle the OAuth callback from the URL hash
        const { data, error } = await supabase.auth.getSession();

        console.log('📥 Auth callback - Session data:', data);
        console.log('📥 Auth callback - Error:', error);

        if (error) {
          console.error('❌ Auth callback error:', error);
          router.push('/auth?error=auth_failed');
          return;
        }

        if (data.session) {
          console.log('✅ User authenticated successfully');
          // User is authenticated, redirect to home
          setTimeout(() => {
            router.push('/');
          }, 1000);
        } else {
          console.log('⚠️ No session found, redirecting to auth page');
          // No session, redirect to auth page
          router.push('/auth');
        }
      } catch (error) {
        console.error('❌ Auth callback error:', error);
        router.push('/auth?error=unexpected_error');
      }
    };

    handleAuthCallback();
  }, [router]);

  // Listen for auth state changes
  useEffect(() => {
    if (!isSupabaseAvailable() || !supabase) return;

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('🔄 Auth state changed:', event, session);

      if (event === 'SIGNED_IN' && session) {
        console.log('✅ User signed in:', session.user.email);
        router.push('/');
      } else if (event === 'SIGNED_OUT') {
        console.log('👋 User signed out');
        router.push('/auth');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
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
