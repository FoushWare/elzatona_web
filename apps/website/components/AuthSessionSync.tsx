"use client";

import { useEffect } from "react";
import {
  supabaseClient as supabase,
  isSupabaseAvailable,
} from "../lib/supabase-client";
import { persistSession, clearSession } from "../lib/auth-session";

export default function AuthSessionSync() {
  useEffect(() => {
    if (!isSupabaseAvailable() || !supabase) return;

    // Initial session sync
    supabase.auth
      .getSession()
      .then(({ data }: { data: { session: unknown } | null }) => {
        const session = data?.session;
        if (session) {
          try {
             
            persistSession(session as unknown);
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
      (_event: unknown, session: unknown) => {
        const authed = !!session;
        try {
          sessionStorage.setItem(
            "navbar-auth-state",
            JSON.stringify({ isAuthenticated: authed, isLoading: false }),
          );
        } catch (_) {}
        try {
          if (authed && session) {
             
            persistSession(session as unknown);
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
