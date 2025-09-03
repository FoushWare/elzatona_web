'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import ZatonaLogo from './ZatonaLogo';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

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
            className="flex items-center space-x-2 text-white hover:text-blue-100 transition-colors duration-200"
          >
            <ZatonaLogo size="md" showText={true} />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/learning-paths"
              className="nav-link text-white hover:text-blue-100 transition-all duration-200 hover:scale-105 hover:bg-blue-700/50 px-3 py-2 rounded-lg"
            >
              Learning Paths
            </Link>

            <Link
              href="/coding"
              className="nav-link text-white hover:text-blue-100 transition-all duration-200 hover:scale-105 hover:bg-blue-700/50 px-3 py-2 rounded-lg"
            >
              Coding
            </Link>

            <Link
              href="/preparation-guides"
              className="nav-link text-white hover:text-blue-100 transition-all duration-200 hover:scale-105 hover:bg-blue-700/50 px-3 py-2 rounded-lg"
            >
              📖 Preparation Guides
            </Link>

            <Link
              href="/jobs"
              className="nav-link text-white hover:text-blue-100 transition-all duration-200 hover:scale-105 hover:bg-blue-700/50 px-3 py-2 rounded-lg"
            >
              💼 Job Aggregator
            </Link>

            <Link
              href="/auth"
              className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors duration-200"
            >
              Want to store your app progress?
            </Link>
          </div>

          {/* Theme Toggle */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors duration-200"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors duration-200"
              aria-label="Toggle mobile menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/learning-paths"
              className="block px-3 py-2 rounded-md text-base font-medium transition-colors text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
              onClick={() => setIsOpen(false)}
            >
              🗺️ Learning Paths
            </Link>

            <Link
              href="/coding"
              className="block px-3 py-2 rounded-md text-base font-medium transition-colors text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
              onClick={() => setIsOpen(false)}
            >
              💻 Coding Challenges
            </Link>

            <Link
              href="/preparation-guides"
              className="block px-3 py-2 rounded-md text-base font-medium transition-colors text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
              onClick={() => setIsOpen(false)}
            >
              📖 Preparation Guides
            </Link>

            <Link
              href="/jobs"
              className="block px-3 py-2 rounded-md text-base font-medium transition-colors text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
              onClick={() => setIsOpen(false)}
            >
              💼 Job Aggregator
            </Link>

            <Link
              href="/auth"
              className="block px-3 py-2 rounded-md text-base font-medium transition-colors bg-blue-600 text-white hover:bg-blue-700"
              onClick={() => setIsOpen(false)}
            >
              Want to store your app progress?
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
