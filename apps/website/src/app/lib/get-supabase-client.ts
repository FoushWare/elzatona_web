// v1.0 - Lazy Supabase client creation utility
// This utility creates Supabase clients only when needed (at runtime), not during build
// Prevents "supabaseKey is required" errors during Next.js build phase

import { createClient } from "@supabase/supabase-js";

/**
 * Get a Supabase client with service role key (lazy initialization)
 * This function creates the client only when called, not at module load time
 * This prevents build-time errors when environment variables are not available
 * @returns Supabase client instance
 * @throws Error if required environment variables are missing
 */
export function getSupabaseClient() {
  const supabaseUrl = process.env["NEXT_PUBLIC_SUPABASE_URL"];
  const supabaseServiceRoleKey = process.env["SUPABASE_SERVICE_ROLE_KEY"];

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    throw new Error(
      "Missing required Supabase environment variables: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set",
    );
  }

  return createClient(supabaseUrl, supabaseServiceRoleKey);
}

/**
 * Get a Supabase client with anon key (lazy initialization)
 * Use this for client-side operations or when service role key is not available
 * @returns Supabase client instance
 * @throws Error if required environment variables are missing
 */
export function getSupabaseClientWithAnonKey() {
  const supabaseUrl = process.env["NEXT_PUBLIC_SUPABASE_URL"];
  const supabaseAnonKey =
    process.env["SUPABASE_SERVICE_ROLE_KEY"] ||
    process.env["NEXT_PUBLIC_SUPABASE_ANON_KEY"];

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Missing required Supabase environment variables: NEXT_PUBLIC_SUPABASE_URL and (SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_ANON_KEY) must be set",
    );
  }

  return createClient(supabaseUrl, supabaseAnonKey);
}
