"use client";

import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface AdminNavbarVisibilityContextValue {
  isNavbarVisible: boolean;
  setIsNavbarVisible: (isVisible: boolean) => void;
}

const AdminNavbarVisibilityContext = createContext<
  AdminNavbarVisibilityContextValue | undefined
>(undefined);

interface AdminNavbarVisibilityProviderProps {
  children: ReactNode;
  initialVisible?: boolean;
}

export function AdminNavbarVisibilityProvider({
  children,
  initialVisible = true,
}: AdminNavbarVisibilityProviderProps) {
  const [isNavbarVisible, setIsNavbarVisible] = useState(initialVisible);

  return (
    <AdminNavbarVisibilityContext.Provider
      value={{ isNavbarVisible, setIsNavbarVisible }}
    >
      {children}
    </AdminNavbarVisibilityContext.Provider>
  );
}

export function useAdminNavbarVisibility(): AdminNavbarVisibilityContextValue {
  const context = useContext(AdminNavbarVisibilityContext);

  if (!context) {
    throw new Error(
      "useAdminNavbarVisibility must be used within an AdminNavbarVisibilityProvider",
    );
  }

  return context;
}
