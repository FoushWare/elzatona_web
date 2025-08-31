'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useDarkMode } from '@/hooks/useDarkMode';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleDropdownToggle = (dropdownName: string) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  const closeDropdowns = () => {
    setOpenDropdown(null);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle scroll detection
  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 0);
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 border-b border-blue-500/30 shadow-soft backdrop-blur-md transition-all duration-300 ${
        isScrolled
          ? 'bg-blue-600/95 text-white shadow-medium'
          : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white'
      }`}
    >
      <div className="container mx-auto px-4" ref={dropdownRef}>
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="text-xl font-bold transition-all duration-200 text-white hover:text-blue-100 hover:scale-100"
          >
            <span className="text-blue-100">Frontend</span>
            <span className="text-white">KodDev</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <div className="relative">
              <Link
                href="/"
                className="nav-link text-white hover:text-blue-100 transition-all duration-200 hover:scale-105 hover:bg-blue-700/50 px-3 py-2 rounded-lg"
              >
                Home
              </Link>
            </div>

            <div className="relative">
              <Link
                href="/dashboard"
                className="nav-link text-white hover:text-blue-100 transition-all duration-200 hover:scale-105 hover:bg-blue-700/50 px-3 py-2 rounded-lg"
              >
                Dashboard
              </Link>
            </div>

            <div className="relative">
              <button
                onClick={() => handleDropdownToggle('practice')}
                className="nav-link flex items-center space-x-1 text-white hover:text-blue-100 transition-all duration-200 hover:scale-105 hover:bg-blue-700/50 px-3 py-2 rounded-lg"
              >
                <span>Practice</span>
                <svg
                  className={`w-4 h-4 transition-transform ${
                    openDropdown === 'practice' ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>
              {openDropdown === 'practice' && (
                <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50">
                  <div className="py-1">
                    <Link
                      href="/progress"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                      onClick={closeDropdowns}
                    >
                      📊 Progress Tracking
                    </Link>
                    <Link
                      href="/gamification"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                      onClick={closeDropdowns}
                    >
                      🏆 Gamification
                    </Link>
                    <Link
                      href="/coding"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                      onClick={closeDropdowns}
                    >
                      💻 Coding Challenges
                    </Link>
                    <Link
                      href="/system-design"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                      onClick={closeDropdowns}
                    >
                      🏗️ System Design
                    </Link>
                    <Link
                      href="/practice/fundamentals"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                      onClick={closeDropdowns}
                    >
                      📚 Fundamentals
                    </Link>
                    <Link
                      href="/practice/advanced"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                      onClick={closeDropdowns}
                    >
                      🚀 Advanced
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => handleDropdownToggle('learn')}
                className="nav-link flex items-center space-x-1 text-white hover:text-blue-100 transition-all duration-200 hover:scale-105 hover:bg-blue-700/50 px-3 py-2 rounded-lg"
              >
                <span>Learn</span>
                <svg
                  className={`w-4 h-4 transition-transform ${
                    openDropdown === 'learn' ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>
              {openDropdown === 'learn' && (
                <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50">
                  <div className="py-1">
                    <Link
                      href="/learning-paths"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                      onClick={closeDropdowns}
                    >
                      🗺️ Learning Paths
                    </Link>
                    <Link
                      href="/study-plans"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                      onClick={closeDropdowns}
                    >
                      📅 Study Plans
                    </Link>
                    <Link
                      href="/preparation-guides"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                      onClick={closeDropdowns}
                    >
                      📖 Preparation Guides
                    </Link>
                    <Link
                      href="/resources"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                      onClick={closeDropdowns}
                    >
                      📚 Resources
                    </Link>
                    <Link
                      href="/cheatsheet"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                      onClick={closeDropdowns}
                    >
                      📋 Cheat Sheet
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <Link
                href="/jobs"
                className="nav-link text-white hover:text-blue-100 transition-all duration-200 hover:scale-105 hover:bg-blue-700/50 px-3 py-2 rounded-lg"
              >
                💼 Jobs
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-2">
              <Link
                href="/login"
                className="px-4 py-2 text-sm font-medium text-white hover:text-blue-100 transition-colors duration-200"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 text-sm font-medium bg-white text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 hover:scale-105"
              >
                Sign Up
              </Link>
            </div>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg transition-all duration-200 focus-ring text-white hover:text-blue-100 hover:bg-blue-700/50 hover:scale-110"
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-md focus-ring text-white hover:text-blue-100 hover:bg-blue-700"
              aria-label="Toggle mobile menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-blue-500/30 bg-blue-600/95 backdrop-blur-md">
              <Link
                href="/"
                className="block px-3 py-2 rounded-md text-base font-medium transition-colors text-white hover:text-blue-100 hover:bg-blue-700"
                onClick={() => setIsOpen(false)}
              >
                <span className="text-blue-100">Frontend</span>
                <span className="text-white">KodDev</span>
              </Link>
              <Link
                href="/coding"
                className="block px-3 py-2 rounded-md text-base font-medium transition-colors text-white hover:text-blue-100 hover:bg-blue-700"
                onClick={() => setIsOpen(false)}
              >
                💻 Coding Challenges
              </Link>
              <Link
                href="/system-design"
                className="block px-3 py-2 rounded-md text-base font-medium transition-colors text-white hover:text-blue-100 hover:bg-blue-700"
                onClick={() => setIsOpen(false)}
              >
                🏗️ System Design
              </Link>
              <Link
                href="/practice/fundamentals"
                className="block px-3 py-2 rounded-md text-base font-medium transition-colors text-white hover:text-blue-100 hover:bg-blue-700"
                onClick={() => setIsOpen(false)}
              >
                📚 Fundamentals
              </Link>
              <Link
                href="/practice/advanced"
                className="block px-3 py-2 rounded-md text-base font-medium transition-colors text-white hover:text-blue-100 hover:bg-blue-700"
                onClick={() => setIsOpen(false)}
              >
                🚀 Advanced
              </Link>
              <Link
                href="/learning-paths"
                className="block px-3 py-2 rounded-md text-base font-medium transition-colors text-white hover:text-blue-100 hover:bg-blue-700"
                onClick={() => setIsOpen(false)}
              >
                🗺️ Learning Paths
              </Link>
              <Link
                href="/study-plans"
                className="block px-3 py-2 rounded-md text-base font-medium transition-colors text-white hover:text-blue-100 hover:bg-blue-700"
                onClick={() => setIsOpen(false)}
              >
                📅 Study Plans
              </Link>
              <Link
                href="/preparation-guides"
                className="block px-3 py-2 rounded-md text-base font-medium transition-colors text-white hover:text-blue-100 hover:bg-blue-700"
                onClick={() => setIsOpen(false)}
              >
                📖 Preparation Guides
              </Link>
              <Link
                href="/resources"
                className="block px-3 py-2 rounded-md text-base font-medium transition-colors text-white hover:text-blue-100 hover:bg-blue-700"
                onClick={() => setIsOpen(false)}
              >
                📚 Resources
              </Link>
              <Link
                href="/jobs"
                className="block px-3 py-2 rounded-md text-base font-medium transition-colors text-white hover:text-blue-100 hover:bg-blue-700"
                onClick={() => setIsOpen(false)}
              >
                💼 Jobs
              </Link>
              <Link
                href="/progress"
                className="block px-3 py-2 rounded-md text-base font-medium transition-colors text-white hover:text-blue-100 hover:bg-blue-700"
                onClick={() => setIsOpen(false)}
              >
                📊 Progress
              </Link>
              <Link
                href="/gamification"
                className="block px-3 py-2 rounded-md text-base font-medium transition-colors text-white hover:text-blue-100 hover:bg-blue-700"
                onClick={() => setIsOpen(false)}
              >
                🏆 Gamification
              </Link>

              {/* Mobile Auth Buttons */}
              <div className="pt-4 border-t border-blue-500/30">
                <Link
                  href="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium transition-colors text-white hover:text-blue-100 hover:bg-blue-700"
                  onClick={() => setIsOpen(false)}
                >
                  🔐 Login
                </Link>
                <Link
                  href="/signup"
                  className="block px-3 py-2 rounded-md text-base font-medium bg-white text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 mx-3"
                  onClick={() => setIsOpen(false)}
                >
                  ✨ Sign Up
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
