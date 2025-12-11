import { createClient } from "@supabase/supabase-js";

// Get Supabase credentials from environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// Validate that we have the required credentials
const isValidConfig =
  supabaseUrl &&
  supabaseUrl !== "" &&
  supabaseUrl !== "https://placeholder.supabase.co" &&
  supabaseAnonKey &&
  supabaseAnonKey !== "" &&
  supabaseAnonKey !== "placeholder_key";

// Log configuration status (only in development)
if (process.env["NODE_ENV"] === "development" && !isValidConfig) {
  console.warn("⚠️ Supabase configuration is missing or invalid in admin app");
}

// Create Supabase client
export const supabaseClient = isValidConfig
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
      },
    })
  : null;

// Export a helper to check if Supabase is available
export const isSupabaseAvailable = () => supabaseClient !== null;

// Mirror auth session to cookie for simple client persistence across reloads
if (supabaseClient && typeof window !== "undefined") {
  supabaseClient.auth.onAuthStateChange((event, session) => {
    try {
      if (typeof document === "undefined") return;
      if (session?.access_token) {
        const expires = new Date(
          Date.now() +
            (session.expires_in ? session.expires_in * 1000 : 7 * 86400000),
        ).toUTCString();
        document.cookie = `sb_session=1; path=/; expires=${expires}`;
      } else {
        document.cookie =
          "sb_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      }
    } catch (e) {
      // no-op
    }
  });
}
