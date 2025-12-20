"use client";

// Only create Supabase client if environment variables are available
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const _supabase: any = null;
if (
  process.env["NEXT_PUBLIC_SUPABASE_URL"] &&
  process.env["SUPABASE_SERVICE_ROLE_KEY"]
) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { createClient } = require("@supabase/supabase-js");
  const supabaseUrl = process.env["NEXT_PUBLIC_SUPABASE_URL"];
  const supabaseServiceRoleKey = process.env["SUPABASE_SERVICE_ROLE_KEY"];
  createClient(supabaseUrl, supabaseServiceRoleKey);
}
import React, {
  useState,
  useEffect,
  useMemo,
  ReactNode,
  createContext,
  useContext,
} from "react";

export type UserType = "guided" | "self-directed" | null;

interface UserTypeContextType {
  userType: UserType;
  setUserType: (type: UserType) => void;
  hasCompletedOnboarding: boolean;
  setHasCompletedOnboarding: (completed: boolean) => void;
  isFirstVisit: boolean;
  setIsFirstVisit: (isFirst: boolean) => void;
  resetUserPreferences: () => void;
}

const UserTypeContext = createContext<UserTypeContextType | undefined>(
  undefined,
);

interface UserTypeProviderProps {
  children: ReactNode;
}

export const UserTypeProvider: React.FC<UserTypeProviderProps> = ({
  children,
}) => {
  // Default to 'guided' when no preference exists
  const [userType, setUserType] = useState<UserType>("guided");
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(false);

  // Load user preferences from localStorage on mount
  useEffect(() => {
    if (typeof globalThis !== "undefined") {
      try {
        // Fallback to localStorage only
        const savedUserType = globalThis.localStorage.getItem("userType") as UserType;
        if (savedUserType) {
          setUserType(savedUserType);
        } else {
          setUserType("guided");
          globalThis.localStorage.setItem("userType", "guided");
        }

        const savedOnboarding =
          globalThis.localStorage.getItem("hasCompletedOnboarding") === "true";
        const savedFirstVisit = globalThis.localStorage.getItem("isFirstVisit") === "true";

        setHasCompletedOnboarding(savedOnboarding);
        setIsFirstVisit(savedFirstVisit);
      } catch (error) {
        console.error("Error loading user preferences:", error);
        // Set defaults if localStorage fails
        setUserType("guided");
        setHasCompletedOnboarding(false);
        setIsFirstVisit(true);
      }
    }
  }, []);

  // Save user preferences to localStorage when they change
  useEffect(() => {
    if (typeof globalThis !== "undefined") {
      try {
        if (userType) {
          globalThis.localStorage.setItem("userType", userType);
        }
        globalThis.localStorage.setItem(
          "hasCompletedOnboarding",
          hasCompletedOnboarding.toString(),
        );
        globalThis.localStorage.setItem("isFirstVisit", isFirstVisit.toString());
      } catch (error) {
        console.error("Error saving user preferences:", error);
      }
    }
  }, [userType, hasCompletedOnboarding, isFirstVisit]);

  const resetUserPreferences = () => {
    setUserType("guided");
    setHasCompletedOnboarding(false);
    setIsFirstVisit(false);
    if (typeof globalThis !== "undefined") {
      try {
        globalThis.localStorage.removeItem("userType");
        globalThis.localStorage.removeItem("hasCompletedOnboarding");
        globalThis.localStorage.removeItem("isFirstVisit");
      } catch (error) {
        console.error("Error resetting user preferences:", error);
      }
    }
  };

  const value: UserTypeContextType = useMemo(() => ({
    userType,
    setUserType,
    hasCompletedOnboarding,
    setHasCompletedOnboarding,
    isFirstVisit,
    setIsFirstVisit,
    resetUserPreferences,
  }), [userType, setUserType, hasCompletedOnboarding, setHasCompletedOnboarding, isFirstVisit, setIsFirstVisit, resetUserPreferences]);

  return (
    <UserTypeContext.Provider value={value}>
      {children}
    </UserTypeContext.Provider>
  );
};

export const useUserType = (): UserTypeContextType => {
  const context = useContext(UserTypeContext);
  if (context === undefined) {
    throw new Error("useUserType must be used within a UserTypeProvider");
  }
  return context;
};

export default UserTypeProvider;
