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
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<AdminSession | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Load session from localStorage on mount
  useEffect(() => {
    const loadSession = async () => {
      try {
        const sessionData = localStorage.getItem(ADMIN_SESSION_KEY);
        if (sessionData) {
          const session: AdminSession = JSON.parse(sessionData);

          // Check if session has expired locally first
          if (new Date() > new Date(session.expiresAt)) {
            localStorage.removeItem(ADMIN_SESSION_KEY);
            setIsLoading(false);
            return;
          }

          // Validate session with timeout
          try {
            const isValid = await Promise.race([
              AdminAuthService.validateSession(session),
              new Promise<boolean>((_, reject) =>
                setTimeout(() => reject(new Error('Timeout')), 5000)
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
        }
      } catch (error) {
        console.error('Error loading admin session:', error);
        localStorage.removeItem(ADMIN_SESSION_KEY);
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
        // Save session to localStorage
        localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(result.admin));

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
    localStorage.removeItem(ADMIN_SESSION_KEY);
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
