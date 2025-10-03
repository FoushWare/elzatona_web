'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { AdminAuthService, AdminSession } from '@/lib/admin-auth';

interface AdminAuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: AdminSession | null;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  error: string | null;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(
  undefined
);

const ADMIN_SESSION_KEY = 'admin_session';
const REDIRECT_KEY = 'admin_redirect_attempted';

interface AdminAuthProviderProps {
  children: ReactNode;
}

export function AdminAuthProvider({ children }: AdminAuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<AdminSession | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [redirectAttempted, setRedirectAttempted] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  // Load session from localStorage on mount
  useEffect(() => {
    const checkSession = () => {
      try {
        if (typeof window === 'undefined') {
          setIsLoading(false);
          return;
        }

        const sessionData = localStorage.getItem(ADMIN_SESSION_KEY);
        const redirectData = localStorage.getItem(REDIRECT_KEY);

        console.log('🔍 AdminAuthProvider checking session:', {
          hasSession: !!sessionData,
          hasRedirectAttempt: !!redirectData,
          pathname,
        });

        if (sessionData) {
          const session: AdminSession = JSON.parse(sessionData);

          // Check if session has expired
          if (new Date() > new Date(session.expiresAt)) {
            console.log('⏰ Session expired, clearing data');
            localStorage.removeItem(ADMIN_SESSION_KEY);
            localStorage.removeItem(REDIRECT_KEY);
            setIsAuthenticated(false);
            setUser(null);
          } else {
            console.log('✅ Valid session found');
            setUser(session);
            setIsAuthenticated(true);
          }
        } else {
          console.log('❌ No session data found');
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (error) {
        console.error('Error checking session:', error);
        if (typeof window !== 'undefined') {
          localStorage.removeItem(ADMIN_SESSION_KEY);
          localStorage.removeItem(REDIRECT_KEY);
        }
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  // Handle redirects based on authentication state
  useEffect(() => {
    if (isLoading) return;

    const isLoginPage = pathname === '/admin/login';
    const isAdminRootPage = pathname === '/admin';
    const isPublicPage = isLoginPage || isAdminRootPage;
    const hasRedirectAttempted = localStorage.getItem(REDIRECT_KEY) === 'true';

    console.log('🔄 AdminAuthProvider redirect logic:', {
      isLoading,
      isAuthenticated,
      isLoginPage,
      isAdminRootPage,
      isPublicPage,
      pathname,
      hasRedirectAttempted,
    });

    // Prevent infinite redirects by tracking redirect attempts
    if (hasRedirectAttempted) {
      console.log('🚫 Redirect already attempted, skipping');
      return;
    }

    if (!isAuthenticated && !isPublicPage) {
      console.log('🚨 Redirecting to login - not authenticated');
      localStorage.setItem(REDIRECT_KEY, 'true');
      router.replace('/admin/login');
    } else if (isAuthenticated && isPublicPage) {
      console.log('🚨 Redirecting to dashboard - authenticated');
      localStorage.setItem(REDIRECT_KEY, 'true');
      router.replace('/admin/dashboard');
    } else {
      // Clear redirect flag when we're in the right place
      localStorage.removeItem(REDIRECT_KEY);
    }
  }, [isAuthenticated, isLoading, router, pathname]);

  // Login function
  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    localStorage.removeItem(REDIRECT_KEY); // Clear any previous redirect attempts

    try {
      const result = await AdminAuthService.authenticateAdmin(email, password);

      if (result.success && result.admin) {
        // Save session to localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(result.admin));
        }

        setUser(result.admin);
        setIsAuthenticated(true);

        return { success: true };
      } else {
        setError(result.error || 'Login failed');
        return { success: false, error: result.error };
      }
    } catch (error) {
      const errorMessage = 'An unexpected error occurred during login';
      console.error('Login error:', error);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Logout function
  const logout = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(ADMIN_SESSION_KEY);
      localStorage.removeItem(REDIRECT_KEY);
    }
    setUser(null);
    setIsAuthenticated(false);
    setError(null);
    setRedirectAttempted(false);
  }, []);

  const value = {
    isAuthenticated,
    isLoading,
    user,
    login,
    logout,
    error,
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
}
