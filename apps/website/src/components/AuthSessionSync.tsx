'use client';

import { useEffect } from 'react';
import {
  supabaseClient as supabase,
  isSupabaseAvailable,
} from '@/lib/supabase-client';
import { setSessionCookie, clearSession } from '@/lib/auth-session';

export default function AuthSessionSync() {
  useEffect(() => {
    if (!isSupabaseAvailable() || !supabase) return;

    // Initial session sync
    supabase.auth.getSession().then(({ data }) => {
      const token = data?.session?.access_token;
      if (token) {
        try {
          setSessionCookie(token);
        } catch (_) {}
        try {
          sessionStorage.setItem(
            'navbar-auth-state',
            JSON.stringify({ isAuthenticated: true, isLoading: false })
          );
        } catch (_) {}
      }
    });

    // Subscribe to auth changes and persist markers
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        const authed = !!session;
        try {
          sessionStorage.setItem(
            'navbar-auth-state',
            JSON.stringify({ isAuthenticated: authed, isLoading: false })
          );
        } catch (_) {}
        try {
          if (authed && session?.access_token)
            setSessionCookie(session.access_token);
          else clearSession();
        } catch (_) {}
      }
    );

    return () => {
      listener?.subscription?.unsubscribe();
    };
  }, []);

  return null;
}
