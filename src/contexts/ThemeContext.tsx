'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  setDarkMode: (dark: boolean) => void;
  isLoaded: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load theme preference from localStorage on mount
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    } else {
      // Default to dark mode
      setIsDarkMode(true);
    }
    setIsLoaded(true);

    // Debug logging
    console.log(
      'ThemeContext: Initial theme loaded:',
      savedTheme || 'dark (default)'
    );
  }, []);

  useEffect(() => {
    // Save theme preference to localStorage whenever it changes
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');

    // Apply theme class to document root with proper cleanup
    const root = document.documentElement;

    if (isDarkMode) {
      root.classList.remove('light');
      root.classList.add('dark');
      // Also set data attribute for additional CSS targeting
      root.setAttribute('data-theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
      // Also set data attribute for additional CSS targeting
      root.setAttribute('data-theme', 'light');
    }

    // Debug logging
    console.log('ThemeContext: Theme applied:', isDarkMode ? 'dark' : 'light');
    console.log('ThemeContext: Root classes:', root.className);
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    console.log('ThemeContext: Theme toggled to:', newMode ? 'dark' : 'light');
  };

  const setDarkMode = (dark: boolean) => {
    setIsDarkMode(dark);
  };

  const value = { isDarkMode, toggleDarkMode, setDarkMode, isLoaded };

  return React.createElement(ThemeContext.Provider, { value }, children);
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

// Export the context for direct usage if needed
export { ThemeContext };
