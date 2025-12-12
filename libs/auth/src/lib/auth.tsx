"use client";

// Auth library exports
import React, { createContext, useContext, useState, useEffect } from "react";

export interface User {
  id: string;
  email: string;
  role: "user" | "premium_user" | "admin" | "super_admin";
  created_at: string;
  updated_at: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const login = async (email: string, _password: string) => {
    setIsLoading(true);
    try {
      // Simulate login - in real implementation, this would call Supabase
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock user for admin
      const mockUser: User = {
        id: "admin-1",
        email: email,
        role: "admin",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      setUser(mockUser);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      // Simulate logout
      await new Promise((resolve) => setTimeout(resolve, 500));
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (_email: string, _password: string) => {
    setIsLoading(true);
    try {
      // Simulate signup
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // In real implementation, this would create a new user
    } catch (error) {
      console.error("Signup failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<User>) => {
    if (!user) return;

    setIsLoading(true);
    try {
      // Simulate profile update
      await new Promise((resolve) => setTimeout(resolve, 500));
      setUser({ ...user, ...updates });
    } catch (error) {
      console.error("Profile update failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    signup,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
