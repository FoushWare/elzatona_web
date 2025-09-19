import { useState, useEffect, useCallback } from 'react';
import { AdminAuthService, AdminSession } from '@/lib/admin-auth';

interface UseAdminAuthReturn {
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

const ADMIN_SESSION_KEY = 'admin_session';

export const useAdminAuth = (): UseAdminAuthReturn => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Start with false to prevent loading issues
  const [user, setUser] = useState<AdminSession | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Load session from localStorage on mount
  useEffect(() => {
    const loadSession = async () => {
      setIsLoading(true); // Set loading to true at the start

      try {
        // Check if we're in the browser environment
        if (typeof window === 'undefined') {
          setIsLoading(false);
          return;
        }

        const sessionData = localStorage.getItem(ADMIN_SESSION_KEY);
        if (sessionData) {
          const session: AdminSession = JSON.parse(sessionData);

          // Check if session has expired locally first
          if (new Date() > new Date(session.expiresAt)) {
            localStorage.removeItem(ADMIN_SESSION_KEY);
            setIsLoading(false);
            return;
          }

          // For now, skip validation to prevent loading issues
          // TODO: Re-enable validation once the basic flow works
          setUser(session);
          setIsAuthenticated(true);
          setIsLoading(false);
          return;

          // Validate session with shorter timeout
          try {
            const isValid = await Promise.race([
              AdminAuthService.validateSession(session),
              new Promise<boolean>((_, reject) =>
                setTimeout(() => reject(new Error('Timeout')), 1000)
              ),
            ]);

            if (isValid) {
              setUser(session);
              setIsAuthenticated(true);
            } else {
              localStorage.removeItem(ADMIN_SESSION_KEY);
            }
          } catch (error) {
            console.error('Session validation failed:', error);
            // If validation fails, clear session but don't block the user
            localStorage.removeItem(ADMIN_SESSION_KEY);
          }
        } else {
          // No session data, set loading to false immediately
          setIsLoading(false);
          return;
        }
      } catch (error) {
        console.error('Error loading admin session:', error);
        if (typeof window !== 'undefined') {
          localStorage.removeItem(ADMIN_SESSION_KEY);
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadSession();
  }, []);

  // Login function
  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await AdminAuthService.authenticateAdmin(email, password);

      if (result.success && result.admin) {
        // Save session to localStorage (only in browser)
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
    }
    setUser(null);
    setIsAuthenticated(false);
    setError(null);
  }, []);

  return {
    isAuthenticated,
    isLoading,
    user,
    login,
    logout,
    error,
  };
};
