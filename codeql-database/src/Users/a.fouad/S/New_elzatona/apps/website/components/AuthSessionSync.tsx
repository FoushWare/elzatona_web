"use client";

import { useEffect } from "react";
import type { Session } from "@supabase/supabase-js";
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
      .then(({ data }: { data: { session: Session | null } | null }) => {
        const session = data?.session;
        if (session) {
          try {
            persistSession(session);
          } catch (_) {
            // Ignore errors
          }
          try {
            sessionStorage.setItem(
              "navbar-auth-state",
              JSON.stringify({ isAuthenticated: true, isLoading: false }),
            );
          } catch (_) {
            // Ignore errors
          }
        }
      });

    // Subscribe to auth changes and persist markers
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event: string, session: Session | null) => {
        const authed = !!session;
        try {
          sessionStorage.setItem(
            "navbar-auth-state",
            JSON.stringify({ isAuthenticated: authed, isLoading: false }),
          );
        } catch (_) {
          // Ignore errors
        }
        try {
          if (authed && session) {
            persistSession(session);
          } else {
            clearSession();
          }
        } catch (_) {
          // Ignore errors
        }
      },
    );

    return () => {
      listener?.subscription?.unsubscribe();
    };
  }, []);

  return null;
}
