"use client";

import { ReactNode, createContext, useMemo } from "react";

// Temporary fallback until Jotai is properly installed
const JotaiContext = createContext({});

interface JotaiProviderProps {
  readonly children: ReactNode;
}

export function JotaiProvider({ children }: JotaiProviderProps) {
  const contextValue = useMemo(() => ({}), []);
  return (
    <JotaiContext.Provider value={contextValue}>
      {children}
    </JotaiContext.Provider>
  );
}
