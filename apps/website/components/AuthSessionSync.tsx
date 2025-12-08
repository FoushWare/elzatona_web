"use client";

import { useEffect } from "react";
import {
  supabaseClient as supabase,
  isSupabaseAvailable,
} from '@/lib/supabase-client';
import { persistSession, clearSession } from '@/lib/auth-session';

export default function AuthSessionSync() {
  useEffect(() => {
    if (!isSupabaseAvailable() || !supabase) return;

    // Initial session sync
    supabase.auth.getSession().then(({ data }) => {
      const session = data?.session;
      if (session) {
        try {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          persistSession(session as any);
        } catch (_) {}
        try {
          sessionStorage.setItem(
            "navbar-auth-state",
            JSON.stringify({ isAuthenticated: true, isLoading: false }),
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
            "navbar-auth-state",
            JSON.stringify({ isAuthenticated: authed, isLoading: false }),
          );
        } catch (_) {}
        try {
          if (authed && session) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            persistSession(session as any);
          } else {
            clearSession();
          }
        } catch (_) {}
      },
    );

    return () => {
      listener?.subscription?.unsubscribe();
    };
  }, []);

  return null;
}
