"use client";

import React, { useState, useMemo, ReactNode, createContext, useContext } from "react";

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

interface MobileMenuContextType {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
}

const MobileMenuContext = createContext<MobileMenuContextType | undefined>(
  undefined,
);

export const MobileMenuProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <MobileMenuContext.Provider
      value={useMemo(() => ({ isMobileMenuOpen, setIsMobileMenuOpen }), [isMobileMenuOpen, setIsMobileMenuOpen])}
    >
      {children}
    </MobileMenuContext.Provider>
  );
};

export const useMobileMenu = (): MobileMenuContextType => {
  const context = useContext(MobileMenuContext);
  if (context === undefined) {
    throw new Error("useMobileMenu must be used within a MobileMenuProvider");
  }
  return context;
};
