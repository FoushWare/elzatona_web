"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  ReactNode,
} from "react";
import type { SupabaseClient } from "@supabase/supabase-js";

// Only create Supabase client if environment variables are available
let supabase: SupabaseClient | null = null;
if (
  process.env["NEXT_PUBLIC_SUPABASE_URL"] &&
  process.env["SUPABASE_SERVICE_ROLE_KEY"]
) {
  // Dynamic import to avoid SSR issues
  import("@supabase/supabase-js").then(({ createClient }) => {
    const supabaseUrl = process.env["NEXT_PUBLIC_SUPABASE_URL"] as string;
    const supabaseServiceRoleKey = process.env[
      "SUPABASE_SERVICE_ROLE_KEY"
    ] as string;
    supabase = createClient(supabaseUrl, supabaseServiceRoleKey);
  });
}

interface UserPreferences {
  theme: "light" | "dark" | "system";
  notifications: boolean;
  language: string;
  learningMode: "guided" | "freestyle";
  dailyGoal: number;
  reminderTime: string;
  difficulty: "easy" | "medium" | "hard" | "mixed";
  autoSave: boolean;
}

interface UserPreferencesContextType {
  preferences: UserPreferences;
  updatePreferences: (updates: Partial<UserPreferences>) => Promise<void>;
  isLoading: boolean;
}

const defaultPreferences: UserPreferences = {
  theme: "system",
  notifications: true,
  language: "en",
  learningMode: "guided",
  dailyGoal: 10,
  reminderTime: "09:00",
  difficulty: "mixed",
  autoSave: true,
};

const UserPreferencesContext = createContext<
  UserPreferencesContextType | undefined
>(undefined);

export function useUserPreferences() {
  const context = useContext(UserPreferencesContext);
  if (context === undefined) {
    throw new Error(
      "useUserPreferences must be used within a UserPreferencesProvider",
    );
  }
  return context;
}

interface UserPreferencesProviderProps {
  readonly children: ReactNode;
}

export function UserPreferencesProvider({
  children,
}: UserPreferencesProviderProps) {
  const [user] = useState<{ id: string } | null>(null);
  const updateUserProfile = async (data: { preferences: UserPreferences }) => {
    // Placeholder for user profile update
    console.log("User profile update:", data);
    // If supabase is available, update user preferences in database
    if (supabase && user) {
      // Future implementation: update user preferences in Supabase
    }
  };
  const [preferences, setPreferences] =
    useState<UserPreferences>(defaultPreferences);
  const [isLoading, setIsLoading] = useState(true);

  // Load preferences from user data or localStorage
  useEffect(() => {
    const loadPreferences = () => {
      try {
        // Load from localStorage
        const savedPreferences =
          globalThis.localStorage.getItem("user-preferences");
        if (savedPreferences) {
          const parsed = JSON.parse(savedPreferences);
          setPreferences({
            ...defaultPreferences,
            ...parsed,
          });
        }
      } catch (error) {
        console.error("Error loading preferences:", error);
        setPreferences(defaultPreferences);
      } finally {
        setIsLoading(false);
      }
    };

    loadPreferences();
  }, [user]);

  // Save preferences to localStorage and Firebase
  const updatePreferences = async (updates: Partial<UserPreferences>) => {
    try {
      const newPreferences = { ...preferences, ...updates };
      setPreferences(newPreferences);

      // Save to localStorage immediately
      globalThis.localStorage.setItem(
        "user-preferences",
        JSON.stringify(newPreferences),
      );

      // Save to Firebase if user is authenticated
      if (user) {
        await updateUserProfile({
          preferences: newPreferences,
        });
      }
    } catch (error) {
      globalThis.console.error("Error updating preferences:", error);
      console.error("Error updating preferences:", error);
      throw error;
    }
  };

  // Apply theme preference
  useEffect(() => {
    const applyTheme = () => {
      const { theme } = preferences;

      if (theme === "system") {
        // Use system preference
        const systemTheme = globalThis.matchMedia(
          "(prefers-color-scheme: dark)",
        ).matches
          ? "dark"
          : "light";
        document.documentElement.classList.toggle(
          "dark",
          systemTheme === "dark",
        );
      } else {
        // Use user preference
        document.documentElement.classList.toggle("dark", theme === "dark");
      }
    };

    if (!isLoading) {
      applyTheme();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preferences.theme, isLoading]);

  // Listen for system theme changes when using system preference
  useEffect(() => {
    if (preferences.theme === "system") {
      const mediaQuery = globalThis.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = () => {
        document.documentElement.classList.toggle("dark", mediaQuery.matches);
      };

      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
    return undefined;
  }, [preferences.theme]);

  const value: UserPreferencesContextType = useMemo(
    () => ({
      preferences,
      updatePreferences,
      isLoading,
    }),
    [preferences, updatePreferences, isLoading],
  );

  return (
    <UserPreferencesContext.Provider value={value}>
      {children}
    </UserPreferencesContext.Provider>
  );
}
