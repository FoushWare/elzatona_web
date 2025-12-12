"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface NavigationContextType {
  isNavigating: boolean;
  setIsNavigating: (value: boolean) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(
  undefined,
);

export function NavigationProvider({
  children,
}: {
  readonly children: ReactNode;
}) {
  const [isNavigating, setIsNavigating] = useState(false);

  return (
    <NavigationContext.Provider value={{ isNavigating, setIsNavigating }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  // Return a default context if not available (for graceful degradation)
  // This prevents errors when the hook is used outside the provider
  if (context === undefined) {
    console.warn(
      "useNavigation called outside NavigationProvider, returning default values",
    );
    return {
      isNavigating: false,
      setIsNavigating: () => {},
    };
  }
  return context;
}
