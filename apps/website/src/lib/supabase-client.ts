import { createClient } from '@supabase/supabase-js';

// Get Supabase credentials from environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Validate that we have the required credentials
const isValidConfig =
  supabaseUrl &&
  supabaseUrl !== '' &&
  supabaseUrl !== 'https://placeholder.supabase.co' &&
  supabaseAnonKey &&
  supabaseAnonKey !== '' &&
  supabaseAnonKey !== 'placeholder_key';

// Log configuration status
if (!isValidConfig) {
  console.error('❌ Supabase configuration is missing or invalid!');
  console.error('Please check your .env.local file has:');
  console.error('- NEXT_PUBLIC_SUPABASE_URL');
  console.error('- NEXT_PUBLIC_SUPABASE_ANON_KEY');
} else {
  console.log('✅ Supabase client configured successfully');
  console.log('URL:', supabaseUrl);
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
