"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface ThemeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  setDarkMode: (dark: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    // Load theme preference from localStorage on mount
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
    } else {
      // Default to dark mode
      setIsDarkMode(true);
    }
  }, []);

  useEffect(() => {
    // Save theme preference to localStorage whenever it changes
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    
    // Apply theme class to document root
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const setDarkMode = (dark: boolean) => {
    setIsDarkMode(dark);
  };

  const value = { isDarkMode, toggleDarkMode, setDarkMode };

  return React.createElement(ThemeContext.Provider, { value }, children);
}

export function useDarkMode() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useDarkMode must be used within a ThemeProvider");
  }
  return context;
}
