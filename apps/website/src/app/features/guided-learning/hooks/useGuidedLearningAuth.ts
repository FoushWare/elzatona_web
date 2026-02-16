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
  if (globalThis.window === undefined) return false;

  // Check sessionStorage for auth keys
  if (checkSessionStorageAuth()) return true;

  // Check localStorage for direct auth flag
  if (localStorage.getItem("isAuthenticated") === "true") return true;

  // Check for auth token and user data
  return checkTokenAndUserAuth();
}

function checkSessionStorageAuth(): boolean {
  for (const key of AUTH_STORAGE_KEYS) {
    const value = sessionStorage.getItem(key);
    if (!value) continue;

    try {
      const parsed = JSON.parse(value);
      if (parsed?.isAuthenticated === true) return true;
    } catch {
      if (value === "true") return true;
    }
  }
  return false;
}

function checkTokenAndUserAuth(): boolean {
  const authToken = localStorage.getItem("auth-token");
  const storedUser = localStorage.getItem("frontend-koddev-user");

  if (!authToken || !storedUser) return false;

  try {
    const userData = JSON.parse(storedUser);
    return !!userData.id;
  } catch {
    return false;
  }
}

export function useGuidedLearningAuth(): AuthState {
  const { user, isAuthenticated: contextAuth } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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

  const handleStorageChange = (e: StorageEvent) => {
    if (
      e.key &&
      (AUTH_STORAGE_KEYS.includes(e.key) || e.key === "auth-token")
    ) {
      checkAuth();
    }
  };

  const setupEventListeners = () => {
    globalThis.window.addEventListener("storage", handleStorageChange);
    globalThis.window.addEventListener("auth-state-changed", checkAuth);

    // Poll interval (reduced from 1s to 5s for performance)
    const interval = setInterval(checkAuth, 5000);

    return () => {
      globalThis.window.removeEventListener("storage", handleStorageChange);
      globalThis.window.removeEventListener("auth-state-changed", checkAuth);
      clearInterval(interval);
    };
  };

  useEffect(() => {
    checkAuth();
    const cleanup = setupEventListeners();
    return cleanup;
  }, [checkAuth, setupEventListeners, contextAuth, user]);

  return {
    isAuthenticated,
    user: user ?? null,
    isLoading,
  };
}
