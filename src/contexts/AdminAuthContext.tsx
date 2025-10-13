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

interface AdminAuthProviderProps {
  children: ReactNode;
}

export function AdminAuthProvider({ children }: AdminAuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<AdminSession | null>(null);
  const [error, setError] = useState<string | null>(null);

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

        console.log('🔍 AdminAuthProvider checking session:', {
          hasSession: !!sessionData,
          pathname,
        });

        if (sessionData) {
          const session: AdminSession = JSON.parse(sessionData);

          // Check if session has expired
          if (new Date() > new Date(session.expiresAt)) {
            console.log('⏰ Session expired, clearing data');
            localStorage.removeItem(ADMIN_SESSION_KEY);
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
        }
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  // Handle redirects for protected admin routes (excluding /admin root and /admin/login)
  useEffect(() => {
    if (isLoading) return;

    const isLoginPage = pathname === '/admin/login';
    const isAdminRootPage = pathname === '/admin';

    // TEMPORARY: Skip authentication for development/testing
    const isDevelopment = process.env.NODE_ENV === 'development';
    const skipAuthForTesting =
      isDevelopment &&
      (pathname?.includes('/admin/content/questions') ||
        pathname?.includes('/admin/enhanced-structure') ||
        pathname?.includes('/admin/content-management') ||
        pathname?.includes('/admin/dashboard'));

    const isProtectedRoute =
      pathname?.startsWith('/admin/') &&
      !isLoginPage &&
      !isAdminRootPage &&
      !skipAuthForTesting;

    console.log('🔄 AdminAuthProvider redirect logic:', {
      isLoading,
      isAuthenticated,
      isLoginPage,
      isAdminRootPage,
      skipAuthForTesting,
      isProtectedRoute,
      pathname,
    });

    // Redirect authenticated users away from login page
    if (isAuthenticated && isLoginPage) {
      console.log('✅ User already authenticated, redirecting to dashboard');
      router.replace('/admin/dashboard');
      return;
    }

    // Only redirect from protected routes, not from /admin root or login or testing routes
    if (!isAuthenticated && isProtectedRoute) {
      console.log(
        '🚨 Redirecting to login - not authenticated on protected route'
      );
      router.replace('/admin/login');
    }
  }, [isAuthenticated, isLoading, router, pathname]);

  // Login function
  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await AdminAuthService.authenticateAdmin(email, password);

      if (result.success && result.admin) {
        // Save session to localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(result.admin));
        }

        setUser(result.admin);
        setIsAuthenticated(true);

        // Redirect to admin dashboard after successful login
        console.log('✅ Login successful, redirecting to admin dashboard');
        router.push('/admin/dashboard');

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
    }
    setUser(null);
    setIsAuthenticated(false);
    setError(null);
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
