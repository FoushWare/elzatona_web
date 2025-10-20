/**
 * Authentication utilities for enhanced security and persistence
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

// Check if user session is still valid
export const isSessionValid = async (): Promise<boolean> => {
  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();
    if (error || !session) {
      return false;
    }

    // Check if session is expired
    const now = new Date().getTime() / 1000;
    if (session.expires_at && session.expires_at < now) {
      return false;
    }

    return true;
  } catch (error) {
    console.error('Session validation error:', error);
    return false;
  }
};

// Get user authentication status with validation
export const getAuthStatus = async () => {
  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    if (error || !user) {
      return { isAuthenticated: false, user: null };
    }

    const isValid = await isSessionValid();
    if (!isValid) {
      return { isAuthenticated: false, user: null };
    }

    return { isAuthenticated: true, user };
  } catch (error) {
    console.error('Auth status error:', error);
    return { isAuthenticated: false, user: null };
  }
};

// Set HTTP-only cookie for authentication
export const setAuthCookie = async (token: string): Promise<void> => {
  try {
    await fetch('/api/auth/set-cookie', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
      credentials: 'include',
    });
  } catch (error) {
    console.error('Error setting auth cookie:', error);
  }
};

// Clear HTTP-only cookie
export const clearAuthCookie = async (): Promise<void> => {
  try {
    await fetch('/api/auth/clear-cookie', {
      method: 'POST',
      credentials: 'include',
    });
  } catch (error) {
    console.error('Error clearing auth cookie:', error);
  }
};

// Clear all authentication-related data
export const clearAuthData = async () => {
  try {
    // Sign out from Supabase
    await supabase.auth.signOut();

    if (typeof window !== 'undefined') {
      // Clear localStorage
      Object.keys(localStorage).forEach(key => {
        if (
          key.startsWith('supabase:') ||
          key.startsWith('auth_') ||
          key.includes('user') ||
          key.startsWith('progress_')
        ) {
          localStorage.removeItem(key);
        }
      });

      // Clear sessionStorage
      sessionStorage.clear();

      // Clear any cookies (if any)
      document.cookie.split(';').forEach(cookie => {
        const eqPos = cookie.indexOf('=');
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        if (name.includes('auth') || name.includes('supabase')) {
          document.cookie =
            name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
        }
      });
    }
  } catch (error) {
    console.error('Error clearing auth data:', error);
  }
};

// Set up automatic token refresh
export const setupTokenRefresh = () => {
  if (typeof window === 'undefined') return;

  // Supabase handles token refresh automatically
  // We just need to listen for auth state changes
  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange(async (event, session) => {
    if (event === 'SIGNED_OUT' || !session) {
      console.log('User signed out or session expired');
      await clearAuthData();
    } else if (event === 'TOKEN_REFRESHED') {
      console.log('Token refreshed successfully');
    }
  });

  return () => subscription.unsubscribe();
};

// Get current user (Supabase equivalent)
export const getCurrentUser = async () => {
  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    if (error || !user) {
      return null;
    }
    return user;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

// Refresh user token (Supabase handles this automatically)
export const refreshUserToken = async () => {
  try {
    const { data, error } = await supabase.auth.refreshSession();
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true, session: data.session };
  } catch (error) {
    console.error('Token refresh failed:', error);
    return { success: false, error: 'Token refresh failed' };
  }
};
