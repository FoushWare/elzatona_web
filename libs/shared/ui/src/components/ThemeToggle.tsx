'use client';

import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@elzatona/shared/contexts';

interface ThemeToggleProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  className = '',
  size = 'md',
}) => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  return (
    <button
      onClick={toggleDarkMode}
      className={`
        ${sizeClasses[size]}
        ${className}
        rounded-lg
        bg-gray-100 dark:bg-gray-800
        hover:bg-gray-200 dark:hover:bg-gray-700
        text-gray-600 dark:text-gray-300
        hover:text-gray-900 dark:hover:text-white
        transition-all duration-200
        flex items-center justify-center
        focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
      `}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDarkMode ? (
        <Sun
          className={`${iconSizes[size]} transition-transform duration-200`}
        />
      ) : (
        <Moon
          className={`${iconSizes[size]} transition-transform duration-200`}
        />
      )}
    </button>
  );
};

export default ThemeToggle;
