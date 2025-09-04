'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import ZatonaLogo from './ZatonaLogo';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isDarkMode, toggleDarkMode } = useTheme();

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
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-gray-200 dark:border-gray-700'
          : 'bg-gradient-to-r from-blue-600 to-blue-800'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            href="/"
            className={`flex items-center space-x-2 transition-colors duration-200 ${
              isScrolled
                ? 'text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400'
                : 'text-white hover:text-blue-100'
            }`}
          >
            <ZatonaLogo size="sm" showText={true} />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/learning-paths"
              className={`nav-link transition-all duration-200 hover:scale-105 px-3 py-2 rounded-lg ${
                isScrolled
                  ? 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                  : 'text-white hover:text-blue-100 hover:bg-blue-700/50'
              }`}
            >
              Learning Paths
            </Link>

            <Link
              href="/coding"
              className={`nav-link transition-all duration-200 hover:scale-105 px-3 py-2 rounded-lg ${
                isScrolled
                  ? 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                  : 'text-white hover:text-blue-100 hover:bg-blue-700/50'
              }`}
            >
              Coding
            </Link>

            <Link
              href="/preparation-guides"
              className={`nav-link transition-all duration-200 hover:scale-105 px-3 py-2 rounded-lg ${
                isScrolled
                  ? 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                  : 'text-white hover:text-blue-100 hover:bg-blue-700/50'
              }`}
            >
              📖 Preparation Guides
            </Link>

            <Link
              href="/jobs"
              className={`nav-link transition-all duration-200 hover:scale-105 px-3 py-2 rounded-lg ${
                isScrolled
                  ? 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                  : 'text-white hover:text-blue-100 hover:bg-blue-700/50'
              }`}
            >
              💼 Job Aggregator
            </Link>

            <Link
              href="/auth"
              className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                isScrolled
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-white text-blue-600 hover:bg-blue-50'
              }`}
            >
              <span className="hidden lg:inline">Save Progress</span>
              <span className="lg:hidden">Save</span>
            </Link>
          </div>

          {/* Theme Toggle */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                isScrolled
                  ? 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  : 'bg-white/20 text-white hover:bg-white/30 border border-white/30'
              }`}
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`md:hidden p-2 rounded-lg transition-colors duration-200 ${
                isScrolled
                  ? 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  : 'bg-white/20 text-white hover:bg-white/30 border border-white/30'
              }`}
              aria-label="Toggle mobile menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation - Full Screen Overlay */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-white dark:bg-gray-900 z-40">
          <div className="flex flex-col h-full">
            {/* Navigation Links */}
            <div className="flex-1 px-4 pt-8 space-y-4">
              <Link
                href="/learning-paths"
                className="block px-4 py-4 rounded-lg text-lg font-medium transition-colors text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                onClick={() => setIsOpen(false)}
              >
                🗺️ Learning Paths
              </Link>

              <Link
                href="/coding"
                className="block px-4 py-4 rounded-lg text-lg font-medium transition-colors text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                onClick={() => setIsOpen(false)}
              >
                💻 Coding Challenges
              </Link>

              <Link
                href="/preparation-guides"
                className="block px-4 py-4 rounded-lg text-lg font-medium transition-colors text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                onClick={() => setIsOpen(false)}
              >
                📖 Preparation Guides
              </Link>

              <Link
                href="/jobs"
                className="block px-4 py-4 rounded-lg text-lg font-medium transition-colors text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                onClick={() => setIsOpen(false)}
              >
                💼 Job Aggregator
              </Link>

              <Link
                href="/auth"
                className="block px-4 py-4 rounded-lg text-lg font-medium transition-colors bg-blue-600 text-white hover:bg-blue-700 mt-8"
                onClick={() => setIsOpen(false)}
              >
                Save Progress
              </Link>
            </div>

            {/* Bottom Section with Logo */}
            <div className="px-4 pb-8 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex justify-center">
                <ZatonaLogo size="lg" showText={true} variant="stacked" />
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
