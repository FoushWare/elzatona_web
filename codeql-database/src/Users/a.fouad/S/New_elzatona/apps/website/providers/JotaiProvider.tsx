"use client";

import { ReactNode, createContext } from "react";

// Temporary fallback until Jotai is properly installed
const JotaiContext = createContext({});

interface JotaiProviderProps {
  children: ReactNode;
}

export function JotaiProvider({ children }: JotaiProviderProps) {
  return <JotaiContext.Provider value={{}}>{children}</JotaiContext.Provider>;
}
