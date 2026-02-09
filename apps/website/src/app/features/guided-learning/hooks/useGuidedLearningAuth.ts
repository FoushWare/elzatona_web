"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@elzatona/contexts";
import { AuthState } from "../types";

const AUTH_STORAGE_KEYS = [
  "navbar-auth-state",
  "auth",
  "auth-state",
  "authentication",
  "isAuthenticated",
  "authStatus",
  "authState",
  "user-auth",
  "session-auth",
];

function checkStorageAuth(): boolean {
  if (typeof window === "undefined") return false;

  // Check sessionStorage
  for (const key of AUTH_STORAGE_KEYS) {
    const value = sessionStorage.getItem(key);
    if (value) {
      try {
        const parsed = JSON.parse(value);
        if (parsed?.isAuthenticated === true) return true;
      } catch {
        if (value === "true") return true;
      }
    }
  }

  // Check localStorage
  if (localStorage.getItem("isAuthenticated") === "true") return true;

  // Check auth token + user
  const authToken = localStorage.getItem("auth-token");
  const storedUser = localStorage.getItem("frontend-koddev-user");
  if (authToken && storedUser) {
    try {
      const userData = JSON.parse(storedUser);
      if (userData.id) return true;
    } catch {
      // Invalid JSON
    }
  }

  return false;
}

export function useGuidedLearningAuth(): AuthState {
  const { user, isAuthenticated: contextAuth } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      if (contextAuth && user) {
        setIsAuthenticated(true);
        setIsLoading(false);
        return;
      }

      const storageAuth = checkStorageAuth();
      setIsAuthenticated(storageAuth);
      setIsLoading(false);
    };

    checkAuth();

    // Listen for storage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (
        e.key &&
        (AUTH_STORAGE_KEYS.includes(e.key) || e.key === "auth-token")
      ) {
        checkAuth();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("auth-state-changed", checkAuth);

    // Poll interval (reduced from 1s to 5s for performance)
    const interval = setInterval(checkAuth, 5000);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("auth-state-changed", checkAuth);
      clearInterval(interval);
    };
  }, [contextAuth, user]);

  return {
    isAuthenticated,
    user: user ?? null,
    isLoading,
  };
}
