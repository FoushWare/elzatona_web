'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@elzatona/shared/contexts';
import { AlzatonaLogo } from '@elzatona/shared/ui';

export default function AdminLoginNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { isDarkMode, toggleDarkMode } = useTheme();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/98 dark:bg-gray-900/98 backdrop-blur-lg shadow-xl border-b border-gray-200 dark:border-gray-700'
          : 'bg-gradient-to-r from-red-600 to-red-800'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link
            href="/"
            className={`flex items-center space-x-2 transition-colors duration-200 ${
              isScrolled
                ? 'text-gray-900 dark:text-white hover:text-red-600 dark:hover:text-red-400'
                : 'text-white hover:text-red-100'
            }`}
          >
            <AlzatonaLogo
              size="sm"
              showText={false}
              forceDarkMode={!isScrolled}
            />
          </Link>

          {/* Center Title */}
          <div className="flex-1 text-center">
            <h1
              className={`text-xl font-bold transition-colors duration-200 ${
                isScrolled ? 'text-gray-900 dark:text-white' : 'text-white'
              }`}
            >
              Admin Access Portal
            </h1>
            <p
              className={`text-sm transition-colors duration-200 ${
                isScrolled ? 'text-gray-600 dark:text-gray-400' : 'text-red-100'
              }`}
            >
              Secure Authentication Required
            </p>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                isScrolled
                  ? 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  : 'text-white hover:bg-white hover:bg-opacity-10'
              }`}
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {/* Back to Home */}
            <Link
              href="/"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                isScrolled
                  ? 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  : 'text-white hover:bg-white hover:bg-opacity-10'
              }`}
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
