'use client';

import React, {
  useState,
  useEffect,
  useCallback,
  ReactNode,
  createContext,
  useContext,
} from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

// Create Supabase client
const supabaseUrl =
  process.env['NEXT_PUBLIC_SUPABASE_URL'] ||
  'https://hpnewqkvpnthpohvxcmq.supabase.co';
const supabaseAnonKey =
  process.env['NEXT_PUBLIC_SUPABASE_ANON_KEY'] ||
  'YOUR_SUPABASE_KEY_HERE.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwbmV3cWt2cG50aHBvaHZ4Y21xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2NjA0MTgsImV4cCI6MjA3NjIzNjQxOH0.UMmriJb5HRr9W_56GilNNDWksvlFEb1V9c_PuBK-H3s';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface AdminSession {
  id: string;
  email: string;
  role: string;
  name?: string;
  expiresAt: string;
  created_at?: string;
  updated_at?: string;
}

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

interface AdminAuthProviderProps {
  children: ReactNode;
}

export function AdminAuthProvider({ children }: AdminAuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Start with false for development
  const [user, setUser] = useState<AdminSession | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isHydrated, setIsHydrated] = useState(true); // Start as hydrated for development

  const router = useRouter();
  const pathname = usePathname();

  // Load session from localStorage on mount (for mock authentication)
  useEffect(() => {
    const checkSession = async () => {
      try {
        if (typeof window === 'undefined') {
          setIsLoading(false);
          return;
        }

        // Mark as hydrated first
        setIsHydrated(true);

        // Check for mock session in localStorage first
        const storedSession = localStorage.getItem('admin_session');
        if (storedSession) {
          try {
            const mockSession = JSON.parse(storedSession);
            // Check if session is still valid (not expired)
            if (new Date(mockSession.expiresAt) > new Date()) {
              console.log('✅ Restoring mock admin session');
              setUser(mockSession);
              setIsAuthenticated(true);
              setIsLoading(false);
              return;
            } else {
              // Session expired, remove it
              localStorage.removeItem('admin_session');
            }
          } catch (error) {
            console.error('Error parsing stored session:', error);
            localStorage.removeItem('admin_session');
          }
        }

        // If no mock session, check Supabase session
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        console.log('🔍 AdminAuthProvider checking Supabase session:', {
          hasSession: !!session,
          pathname,
          error: error?.message,
        });

        if (error) {
          console.error('Error getting session:', error);
          setIsAuthenticated(false);
          setUser(null);
          return;
        }

        if (session?.user) {
          // Check if user is an admin by querying the admins table
          const { data: adminData, error: adminError } = await supabase
            .from('admins')
            .select('*')
            .eq('email', session.user.email)
            .single();

          if (adminError || !adminData) {
            console.log('❌ User is not an admin:', adminError?.message);
            setIsAuthenticated(false);
            setUser(null);
            // Sign out the user if they're not an admin
            await supabase.auth.signOut();
            return;
          }

          console.log('✅ Valid admin session found');
          const adminSession: AdminSession = {
            id: session.user.id,
            email: session.user.email || '',
            role: adminData.role || 'admin',
            name: adminData.name || adminData.email,
            expiresAt: new Date(session.expires_at! * 1000).toISOString(),
            created_at: adminData.created_at,
            updated_at: adminData.updated_at,
          };

          setUser(adminSession);
          setIsAuthenticated(true);
        } else {
          console.log('❌ No Supabase session found');
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (error) {
        console.error('Error checking session:', error);
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
    const isDevelopment = process.env['NODE_ENV'] === 'development';
    const skipAuthForTesting =
      isDevelopment &&
      (pathname === '/' ||
        pathname?.includes('/admin/content/questions') ||
        pathname?.includes('/admin/enhanced-structure') ||
        pathname?.includes('/admin/content-management') ||
        pathname?.includes('/admin/dashboard'));

    const isProtectedRoute =
      pathname?.startsWith('/admin') && !isLoginPage && !skipAuthForTesting;

    console.log('🔄 AdminAuthProvider redirect logic:', {
      isLoading,
      isAuthenticated,
      isLoginPage,
      isAdminRootPage,
      skipAuthForTesting,
      isProtectedRoute,
      pathname,
    });

    // Handle /admin root path redirects
    if (isAdminRootPage) {
      if (isAuthenticated) {
        console.log('✅ User authenticated, redirecting to dashboard');
        router.replace('/admin/dashboard');
      } else {
        console.log('🚨 User not authenticated, redirecting to login');
        router.replace('/admin/login');
      }
      return;
    }

    // Redirect authenticated users away from login page
    if (isAuthenticated && isLoginPage) {
      console.log('✅ User already authenticated, redirecting to dashboard');
      router.replace('/admin/dashboard');
      return;
    }

    // Only redirect from protected routes, not from login or testing routes
    if (!isAuthenticated && isProtectedRoute) {
      console.log(
        '🚨 Redirecting to login - not authenticated on protected route'
      );
      router.replace('/admin/login');
    }
  }, [isAuthenticated, isLoading, router, pathname]);

  // Login function
  const login = useCallback(
    async (email: string, password: string) => {
      setIsLoading(true);
      setError(null);

      try {
        console.log('🔐 Attempting Supabase login for:', email);

        // TEMPORARY: Mock authentication for testing dropdown functionality
        if (
          email === 'afouadsoftwareengineer@gmail.com' &&
          password === 'ZatonaFoushware$8888'
        ) {
          console.log('✅ Mock admin login successful (temporary)');

          const mockSession: AdminSession = {
            id: 'mock-admin-id',
            email: email,
            role: 'super_admin',
            name: 'Admin User',
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours from now
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          };

          setUser(mockSession);
          setIsAuthenticated(true);
          setIsLoading(false);

          // Store session in localStorage for persistence
          localStorage.setItem('admin_session', JSON.stringify(mockSession));

          return { success: true };
        }

        // If not mock authentication, show error
        setError('Invalid credentials. Please try again.');
        return { success: false, error: 'Invalid credentials' };
      } catch (error) {
        const errorMessage = 'An unexpected error occurred during login';
        console.error('Login error:', error);
        setError(errorMessage);
        return { success: false, error: errorMessage };
      } finally {
        setIsLoading(false);
      }
    },
    [router]
  );

  // Logout function
  const logout = useCallback(async () => {
    try {
      console.log('🚪 Logging out admin user');

      // Clear mock session from localStorage
      localStorage.removeItem('admin_session');

      // Clear local state
      setUser(null);
      setIsAuthenticated(false);
      setError(null);

      console.log('✅ Admin logout successful');
    } catch (error) {
      console.error('Logout error:', error);
      // Still clear local state even if logout fails
      setUser(null);
      setIsAuthenticated(false);
      setError(null);
    }
  }, []);

  const value = {
    isAuthenticated,
    isLoading: isLoading || !isHydrated,
    user,
    login,
    logout,
    error,
  };

  // Show loading state during hydration to prevent mismatches
  if (!isHydrated) {
    return (
      <AdminAuthContext.Provider value={value}>
        <div className='min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600'></div>
        </div>
      </AdminAuthContext.Provider>
    );
  }

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
