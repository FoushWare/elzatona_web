"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  ReactNode,
} from "react";
// import { UserAuthService } from '../../../../apps/website/lib/user-auth';
// Note: syncAllProgressOnLogin is website-specific and should be imported where needed
// import { syncAllProgressOnLogin } from '@/lib/sync-progress-on-login';
import { Loader2 } from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: "user" | "premium_user" | "admin" | "super_admin";
  preferences?: {
    theme: "light" | "dark" | "system";
    notifications: boolean;
    emailUpdates: boolean;
  };
  progress?: {
    completedQuestions: string[];
    completedPaths: string[];
    streak: number;
    totalTimeSpent: number;
  };
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isLoggingOut: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: Readonly<AuthProviderProps>) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Check if user is already logged in on mount
  useEffect(() => {
    const checkAuthStatus = () => {
      try {
        const storedUser = localStorage.getItem("frontend-koddev-user");
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          setUser(userData);
        }
      } catch (error) {
        console.warn("Invalid stored auth user, clearing cache:", error);
        localStorage.removeItem("frontend-koddev-user");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);

      // Call the authentication API
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success && data.user) {
        // Convert session to user format
        const userData: User = {
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          role: data.user.role,
        };

        setUser(userData);
        localStorage.setItem("frontend-koddev-user", JSON.stringify(userData));
        localStorage.setItem("auth-token", data.user.token);

        // Sync all localStorage progress to database after successful login
        // Note: This is website-specific functionality and should be handled in the website app
        // The syncAllProgressOnLogin function should be imported and called in the website app's login flow
        // try {
        //   console.log('🔄 Syncing progress to database after login...');
        //   const syncResult = await syncAllProgressOnLogin(
        //     data.user.token,
        //     data.user.id
        //   );
        //   if (syncResult.success) {
        //     console.log('✅ Progress synced successfully after login');
        //   } else {
        //     console.warn('⚠️ Some progress failed to sync:', {
        //       guided: syncResult.guided.errors,
        //       freeStyle: syncResult.freeStyle.error,
        //     });
        //   }
        // } catch (syncError) {
        //   // Don't block login if sync fails
        //   console.error(
        //     '❌ Error syncing progress on login (non-blocking):',
        //     syncError
        //   );
        // }

        return true;
      }

      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (
    name: string,
    email: string,
    password: string,
  ): Promise<boolean> => {
    try {
      setIsLoading(true);

      // Call the registration API
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (data.success) {
        // After successful registration, automatically log in
        return await login(email, password);
      }

      return false;
    } catch (error) {
      console.error("Signup error:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoggingOut(true);

      // Clear user state
      setUser(null);

      // Clear localStorage
      localStorage.removeItem("frontend-koddev-user");
      localStorage.removeItem("auth-token");

      // Clear sessionStorage (including navbar-auth-state)
      try {
        sessionStorage.clear();
      } catch (error) {
        console.error("Error clearing sessionStorage:", error);
      }

      // Clear isAuthenticated flags
      localStorage.removeItem("isAuthenticated");

      // Dispatch auth state change event
      if (typeof globalThis !== "undefined") {
        globalThis.dispatchEvent(new Event("auth-state-changed"));
      }

      // Small delay to ensure state updates are processed
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Navigate to home page
      if (typeof globalThis !== "undefined" && "location" in globalThis) {
        globalThis.location.href = "/";
      }
    } catch (error) {
      console.error("Logout error:", error);
      // Still navigate even if there's an error
      if (typeof globalThis !== "undefined" && "location" in globalThis) {
        globalThis.location.href = "/";
      }
    } finally {
      // This may not execute if navigation happens, but it's good to have
      setIsLoggingOut(false);
    }
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem("frontend-koddev-user", JSON.stringify(updatedUser));
    }
  };

  const value: AuthContextType = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      isLoading,
      isLoggingOut,
      login,
      signup,
      logout,
      updateUser,
    }),
    [user, isLoading, isLoggingOut],
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
      {/* Global logout loading overlay */}
      {isLoggingOut && (
        <div className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-2xl flex flex-col items-center space-y-4 min-w-[200px]">
            <Loader2 className="w-8 h-8 text-indigo-600 dark:text-indigo-400 animate-spin" />
            <p className="text-gray-900 dark:text-white font-medium text-center">
              Logging out...
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
              Redirecting to home
            </p>
          </div>
        </div>
      )}
    </AuthContext.Provider>
  );
}
