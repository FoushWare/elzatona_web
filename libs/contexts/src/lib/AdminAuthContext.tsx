"use client";

import React, {
  useState,
  useEffect,
  useCallback,
  ReactNode,
  createContext,
  useContext,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

// Create Supabase client (environment variables required)
const supabaseUrl = process.env["NEXT_PUBLIC_SUPABASE_URL"];
const supabaseAnonKey = process.env["NEXT_PUBLIC_SUPABASE_ANON_KEY"];

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing required Supabase environment variables: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY must be set",
  );
}

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
    password: string,
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  error: string | null;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(
  undefined,
);

interface AdminAuthProviderProps {
  children: ReactNode;
}

export function AdminAuthProvider({ children }: AdminAuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Start with true to check session first
  const [user, setUser] = useState<AdminSession | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isHydrated, setIsHydrated] = useState(false); // Start as not hydrated, will be set to true after check

  const router = useRouter();
  const pathname = usePathname();

  // Load session from localStorage on mount (for mock authentication)
  useEffect(() => {
    const checkSession = async () => {
      try {
        if (typeof window === "undefined") {
          setIsLoading(false);
          return;
        }

        // Check for admin session in localStorage first (primary auth method)
        const storedSession = localStorage.getItem("admin_session");
        if (storedSession) {
          try {
            const adminSession = JSON.parse(storedSession);
            // Check if session is still valid (not expired)
            const expiresAt = new Date(adminSession.expiresAt);
            const now = new Date();
            if (expiresAt > now) {
              console.log("✅ Restoring admin session from localStorage:", {
                email: adminSession.email,
                name: adminSession.name,
                role: adminSession.role,
                expiresAt: adminSession.expiresAt,
              });
              setUser(adminSession);
              setIsAuthenticated(true);
              setIsHydrated(true);
              setIsLoading(false);
              return; // Exit early, session restored successfully
            } else {
              // Session expired, remove it
              console.log(
                "⏰ Admin session expired, removing from localStorage",
              );
              localStorage.removeItem("admin_session");
            }
          } catch (error) {
            console.error("❌ Error parsing stored session:", error);
            localStorage.removeItem("admin_session");
          }
        }

        // Mark as hydrated after checking localStorage
        setIsHydrated(true);

        // If no mock session, check Supabase session
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        // Security: Removed pathname from debug logging to prevent information disclosure

        if (error) {
          console.error("Error getting session:", error);
          setIsAuthenticated(false);
          setUser(null);
          setIsLoading(false);
          return;
        }

        if (session?.user) {
          // Check if user is an admin by querying the admins table
          const { data: adminData, error: adminError } = await supabase
            .from("admins")
            .select("*")
            .eq("email", session.user.email)
            .single();

          if (adminError || !adminData) {
            console.log("❌ User is not an admin:", adminError?.message);
            setIsAuthenticated(false);
            setUser(null);
            // Sign out the user if they're not an admin
            await supabase.auth.signOut();
            return;
          }

          console.log("✅ Valid admin session found");
          const adminSession: AdminSession = {
            id: session.user.id,
            email: session.user.email || "",
            role: adminData.role || "admin",
            name: adminData.name || adminData.email,
            expiresAt: new Date(session.expires_at! * 1000).toISOString(),
            created_at: adminData.created_at,
            updated_at: adminData.updated_at,
          };

          setUser(adminSession);
          setIsAuthenticated(true);
          console.log("✅ Admin session restored from Supabase");
        } else {
          console.log("❌ No Supabase session found");
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (error) {
        console.error("❌ Error checking session:", error);
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        console.log("🏁 Session check complete. Final state:", {
          isAuthenticated,
          hasUser: !!user,
          isLoading: false,
        });
        setIsLoading(false);
        setIsHydrated(true);
      }
    };

    checkSession();
  }, []);

  // Handle redirects for protected admin routes (excluding /admin root and /admin/login)
  useEffect(() => {
    if (isLoading) return;

    const isLoginPage = pathname === "/admin/login";
    const isAdminRootPage = pathname === "/admin";

    // All admin routes require authentication (except login and root)
    const isProtectedRoute =
      pathname?.startsWith("/admin") && !isLoginPage && !isAdminRootPage;

    console.log("🔄 AdminAuthProvider redirect logic:", {
      isLoading,
      isAuthenticated,
      isLoginPage,
      isAdminRootPage,
      isProtectedRoute,
      pathname,
    });

    // Handle /admin root path redirects
    if (isAdminRootPage) {
      if (isAuthenticated) {
        console.log("✅ User authenticated, redirecting to dashboard");
        router.replace("/admin/dashboard");
      } else {
        console.log("🚨 User not authenticated, redirecting to login");
        router.replace("/admin/login");
      }
      return;
    }

    // Redirect authenticated users away from login page
    if (isAuthenticated && isLoginPage) {
      console.log("✅ User already authenticated, redirecting to dashboard");
      router.replace("/admin/dashboard");
      return;
    }

    // Redirect unauthenticated users from protected routes to login
    if (!isAuthenticated && isProtectedRoute) {
      console.log(
        "🚨 Redirecting to login - not authenticated on protected route",
      );
      router.replace("/admin/login");
    }
  }, [isAuthenticated, isLoading, router, pathname]);

  // Login function
  const login = useCallback(
    async (email: string, password: string) => {
      setIsLoading(true);
      setError(null);

      try {
        console.log("🔐 Attempting admin login for:", email);

        // Call the admin authentication API
        const response = await fetch("/api/admin/auth", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (data.success && data.admin) {
          console.log("✅ Admin login successful");

          const session: AdminSession = {
            id: data.admin.id,
            email: data.admin.email,
            role: data.admin.role,
            name: data.admin.name || "Admin User",
            expiresAt: data.admin.expiresAt,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          };

          setUser(session);
          setIsAuthenticated(true);
          setIsLoading(false);

          // Store session in localStorage for persistence
          localStorage.setItem("admin_session", JSON.stringify(session));

          // Redirect to admin dashboard
          router.push("/admin/dashboard");

          return { success: true };
        } else {
          const errorMessage = data.error || "Invalid credentials";
          console.error("❌ Login failed:", errorMessage);
          setError(errorMessage);
          return { success: false, error: errorMessage };
        }
      } catch (error) {
        const errorMessage = "An unexpected error occurred during login";
        console.error("Login error:", error);
        setError(errorMessage);
        return { success: false, error: errorMessage };
      } finally {
        setIsLoading(false);
      }
    },
    [router],
  );

  // Logout function
  const logout = useCallback(async () => {
    try {
      console.log("🚪 Logging out admin user");

      // Clear mock session from localStorage
      localStorage.removeItem("admin_session");

      // Clear local state
      setUser(null);
      setIsAuthenticated(false);
      setError(null);

      console.log("✅ Admin logout successful");
    } catch (error) {
      console.error("Logout error:", error);
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
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
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
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return context;
}
