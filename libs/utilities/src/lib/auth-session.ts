"use client";

import type { Session } from "@supabase/supabase-js";

export function persistSession(session: Session) {
  try {
    if (globalThis.window !== undefined) {
      localStorage.setItem("sb_session_present", "1");
    }
    if (typeof document !== "undefined") {
      const expires = new Date(
        Date.now() +
          (session.expires_in ? session.expires_in * 1000 : 7 * 86400000),
      ).toUTCString();
      document.cookie = `sb_session=1; path=/; expires=${expires}`;
    }
  } catch (e) {
    console.warn("persistSession: failed to write storage", e);
  }
}

export function clearSession() {
  try {
    if (globalThis.window !== undefined) {
      localStorage.removeItem("sb_session_present");
    }
    if (typeof document !== "undefined") {
      document.cookie =
        "sb_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
  } catch (e) {
    console.warn("clearSession: failed to clear storage", e);
  }
}
