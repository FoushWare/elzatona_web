/**
 * Authentication utilities for enhanced security and persistence
 */

import { getCurrentUser, refreshUserToken } from './firebase';

// Check if user session is still valid
export const isSessionValid = async (): Promise<boolean> => {
  try {
    const user = getCurrentUser();
    if (!user) {
      return false;
    }

    // Try to refresh the token to ensure it's still valid
    const refreshResult = await refreshUserToken();
    return refreshResult.success;
  } catch (error) {
    console.error('Session validation error:', error);
    return false;
  }
};

// Get user authentication status with validation
export const getAuthStatus = async () => {
  const user = getCurrentUser();
  if (!user) {
    return { isAuthenticated: false, user: null };
  }

  const isValid = await isSessionValid();
  if (!isValid) {
    return { isAuthenticated: false, user: null };
  }

  return { isAuthenticated: true, user };
};

// Clear all authentication-related data
export const clearAuthData = () => {
  if (typeof window !== 'undefined') {
    // Clear localStorage
    Object.keys(localStorage).forEach(key => {
      if (
        key.startsWith('firebase:') ||
        key.startsWith('auth_') ||
        key.includes('user')
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
      if (name.includes('auth') || name.includes('firebase')) {
        document.cookie =
          name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
      }
    });
  }
};

// Set up automatic token refresh
export const setupTokenRefresh = () => {
  if (typeof window === 'undefined') return;

  // Refresh token every 50 minutes (tokens expire after 1 hour)
  const refreshInterval = setInterval(
    async () => {
      const user = getCurrentUser();
      if (user) {
        try {
          await refreshUserToken();
          console.log('Token refreshed successfully');
        } catch (error) {
          console.error('Token refresh failed:', error);
          // If refresh fails, the user will be logged out automatically
          // by Firebase Auth state change listener
        }
      } else {
        clearInterval(refreshInterval);
      }
    },
    50 * 60 * 1000
  ); // 50 minutes

  return () => clearInterval(refreshInterval);
};
