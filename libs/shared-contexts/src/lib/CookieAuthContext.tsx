'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

interface CookieUser {
  id: string;
  email: string | null;
  name: string | null;
  image: string | null;
}

interface CookieAuthContextType {
  user: CookieUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (provider: 'google' | 'github') => Promise<void>;
  signOut: () => Promise<void>;
  refreshAuth: () => Promise<void>;
}

const CookieAuthContext = createContext<CookieAuthContextType | undefined>(
  undefined
);

export function useCookieAuth() {
  const context = useContext(CookieAuthContext);
  if (context === undefined) {
    throw new Error('useCookieAuth must be used within a CookieAuthProvider');
  }
  return context;
}

interface CookieAuthProviderProps {
  children: ReactNode;
}

export function CookieAuthProvider({ children }: CookieAuthProviderProps) {
  const [user, setUser] = useState<CookieUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state from cookies
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Check if user data exists in cookies (immediate, no flash)
        const userDataCookie = getCookie('user-data');

        if (userDataCookie) {
          const userData = JSON.parse(userDataCookie);
          setUser(userData);
          setIsLoading(false);
          return; // Exit early to prevent flashing
        }

        // If no cookie, verify session with server
        const response = await fetch('/api/auth/session');
        const sessionData = await response.json();

        if (sessionData.isAuthenticated && sessionData.user) {
          setUser(sessionData.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const signIn = async (provider: 'google' | 'github') => {
    try {
      setIsLoading(true);

      // Redirect to NextAuth sign-in
      const signInUrl = `/api/auth/signin/${provider}`;
      window.location.href = signInUrl;
    } catch (error) {
      console.error('Sign in error:', error);
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);

      // Clear cookies
      await fetch('/api/auth/session', {
        method: 'DELETE',
      });

      // Clear local state
      setUser(null);

      // Redirect to NextAuth sign-out
      window.location.href = '/api/auth/signout';
    } catch (error) {
      console.error('Sign out error:', error);
      setIsLoading(false);
    }
  };

  const refreshAuth = async () => {
    try {
      const response = await fetch('/api/auth/session');
      const sessionData = await response.json();

      if (sessionData.isAuthenticated && sessionData.user) {
        setUser(sessionData.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Auth refresh error:', error);
    }
  };

  const value: CookieAuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    signIn,
    signOut,
    refreshAuth,
  };

  return (
    <CookieAuthContext.Provider value={value}>
      {children}
    </CookieAuthContext.Provider>
  );
}

// Helper function to get cookie value
function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() || null;
  }
  return null;
}
