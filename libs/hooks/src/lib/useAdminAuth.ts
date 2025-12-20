import { useState, useEffect, useCallback } from "react";
import { AdminAuthService, AdminSession } from "./types/admin-auth";

interface UseAdminAuthReturn {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: AdminSession | null;
  login: (
    email: string,
    password: string,
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  error: string | null;
}

const ADMIN_SESSION_KEY = "admin_session";

export const useAdminAuth = (): UseAdminAuthReturn => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Start with true to properly handle initial state
  const [user, setUser] = useState<AdminSession | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Load session from localStorage on mount
  useEffect(() => {
    const checkSession = () => {
      try {
        if (globalThis.window === undefined) {
          setIsLoading(false);
          return;
        }

        const sessionData = localStorage.getItem(ADMIN_SESSION_KEY);
        console.log(
          "🔍 Checking session data:",
          sessionData ? "Found" : "Not found",
        );

        if (sessionData) {
          const session: AdminSession = JSON.parse(sessionData);
          console.log("📋 Session details:", {
            id: session.id,
            email: session.email,
            expiresAt: session.expiresAt,
            isExpired: new Date() > new Date(session.expiresAt),
          });

          // Check if session has expired locally first
          if (new Date() > new Date(session.expiresAt)) {
            console.log("⏰ Session expired, removing from localStorage");
            localStorage.removeItem(ADMIN_SESSION_KEY);
            setIsAuthenticated(false);
            setUser(null);
          } else {
            // Session exists and is not expired, set authenticated state
            console.log("✅ Valid session found, setting authenticated state");
            setUser(session);
            setIsAuthenticated(true);
          }
        } else {
          // No session data found
          console.log("❌ No session data found");
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (error) {
        console.error("Error checking session:", error);
        if (globalThis.window !== undefined) {
          localStorage.removeItem(ADMIN_SESSION_KEY);
        }
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        // Always set loading to false after checking
        console.log("🏁 Session check complete, setting isLoading to false");
        setIsLoading(false);
      }
    };

    // Run immediately
    checkSession();
  }, []);

  // Login function
  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await AdminAuthService.authenticateAdmin(email, password);

      if (result.success && result.admin) {
        // Save session to localStorage (only in browser)
        if (globalThis.window !== undefined) {
          localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(result.admin));
        }

        setUser(result.admin);
        setIsAuthenticated(true);

        return { success: true };
      } else {
        setError(result.error || "Login failed");
        return { success: false, error: result.error };
      }
    } catch (error) {
      const errorMessage = "An unexpected error occurred during login";
      console.error("Login error:", error);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Logout function
  const logout = useCallback(() => {
    if (typeof window !== "undefined") {
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
