'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useDarkMode } from '@/hooks/useDarkMode';
import { useAuth } from '@/contexts/AuthContext';
import { Menu, X, Sun, Moon, LogOut, User } from 'lucide-react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isPracticeDropdownOpen, setIsPracticeDropdownOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { user, isAuthenticated, logout } = useAuth();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, []);

  const closeDropdowns = () => {
    setIsDropdownOpen(false);
    setIsPracticeDropdownOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  return (
    <nav className="bg-blue-600 shadow-lg sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="flex items-center space-x-2 text-white hover:text-blue-100 transition-colors duration-200"
            >
              <span className="text-2xl">💻</span>
              <span className="text-xl font-bold">Frontend KodDev</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="nav-link text-white hover:text-blue-100 transition-all duration-200 hover:scale-105 hover:bg-blue-700/50 px-3 py-2 rounded-lg"
            >
              Home
            </Link>

            {/* Learning Paths Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="nav-link text-white hover:text-blue-100 transition-all duration-200 hover:scale-105 hover:bg-blue-700/50 px-3 py-2 rounded-lg flex items-center space-x-1"
              >
                <span>Learning Paths</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isDropdownOpen ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-50">
                  <Link
                    href="/learning-paths"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                    onClick={closeDropdowns}
                  >
                    🗺️ All Learning Paths
                  </Link>
                  <Link
                    href="/study-plans"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                    onClick={closeDropdowns}
                  >
                    📚 Study Plans
                  </Link>
                  <Link
                    href="/preparation-guides"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                    onClick={closeDropdowns}
                  >
                    📖 Preparation Guides
                  </Link>
                  <Link
                    href="/system-design"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                    onClick={closeDropdowns}
                  >
                    🏗️ System Design
                  </Link>
                </div>
              )}
            </div>

            {/* Practice Dropdown */}
            <div className="relative">
              <button
                onClick={() =>
                  setIsPracticeDropdownOpen(!isPracticeDropdownOpen)
                }
                className="nav-link text-white hover:text-blue-100 transition-all duration-200 hover:scale-105 hover:bg-blue-700/50 px-3 py-2 rounded-lg flex items-center space-x-1"
              >
                <span>Practice</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isPracticeDropdownOpen ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {isPracticeDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-50">
                  <Link
                    href="/practice/fundamentals"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                    onClick={closeDropdowns}
                  >
                    📚 Fundamentals
                  </Link>
                  <Link
                    href="/coding"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                    onClick={closeDropdowns}
                  >
                    💻 Coding Challenges
                  </Link>
                  <Link
                    href="/questions"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                    onClick={closeDropdowns}
                  >
                    ❓ Interview Questions
                  </Link>
                  <Link
                    href="/practice/advanced"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                    onClick={closeDropdowns}
                  >
                    🚀 Advanced Topics
                  </Link>
                  {isAuthenticated && (
                    <>
                      <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
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
                    </>
                  )}
                </div>
              )}
            </div>

            <Link
              href="/resources"
              className="nav-link text-white hover:text-blue-100 transition-all duration-200 hover:scale-105 hover:bg-blue-700/50 px-3 py-2 rounded-lg"
            >
              Resources
            </Link>

            <Link
              href="/blog"
              className="nav-link text-white hover:text-blue-100 transition-all duration-200 hover:scale-105 hover:bg-blue-700/50 px-3 py-2 rounded-lg"
            >
              Blog
            </Link>

            <Link
              href="/jobs"
              className="nav-link text-white hover:text-blue-100 transition-all duration-200 hover:scale-105 hover:bg-blue-700/50 px-3 py-2 rounded-lg"
            >
              Jobs
            </Link>

            <Link
              href="/cheatsheet"
              className="nav-link text-white hover:text-blue-100 transition-all duration-200 hover:scale-105 hover:bg-blue-700/50 px-3 py-2 rounded-lg"
            >
              Cheatsheet
            </Link>

            {/* Dashboard Link - Only show when authenticated */}
            {isAuthenticated && (
              <div className="relative">
                <Link
                  href="/dashboard"
                  className="nav-link text-white hover:text-blue-100 transition-all duration-200 hover:scale-105 hover:bg-blue-700/50 px-3 py-2 rounded-lg"
                >
                  Dashboard
                </Link>
              </div>
            )}
          </div>

          {/* Right side - Theme toggle and Auth */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 text-white hover:text-blue-100 hover:bg-blue-700/50 rounded-lg transition-all duration-200 hover:scale-105"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {/* Auth Section */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                {/* User Info */}
                <div className="flex items-center space-x-2 text-white">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium">
                    {user?.name || 'User'}
                  </span>
                </div>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-4 py-2 text-sm font-medium bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all duration-200 hover:scale-105"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <Link
                href="/auth"
                className="px-6 py-2 text-sm font-medium bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-lg transition-all duration-200 hover:scale-105 shadow-lg flex items-center space-x-2"
              >
                <span>💾</span>
                <span>Want to store your progress?</span>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-blue-100 transition-colors duration-200"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-blue-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/"
              className="block px-3 py-2 rounded-md text-base font-medium transition-colors text-white hover:text-blue-100 hover:bg-blue-700"
              onClick={() => setIsOpen(false)}
            >
              🏠 Home
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
              📚 Study Plans
            </Link>

            <Link
              href="/preparation-guides"
              className="block px-3 py-2 rounded-md text-base font-medium transition-colors text-white hover:text-blue-100 hover:bg-blue-700"
              onClick={() => setIsOpen(false)}
            >
              📖 Preparation Guides
            </Link>

            <Link
              href="/practice/fundamentals"
              className="block px-3 py-2 rounded-md text-base font-medium transition-colors text-white hover:text-blue-100 hover:bg-blue-700"
              onClick={() => setIsOpen(false)}
            >
              📚 Practice Fundamentals
            </Link>

            <Link
              href="/coding"
              className="block px-3 py-2 rounded-md text-base font-medium transition-colors text-white hover:text-blue-100 hover:bg-blue-700"
              onClick={() => setIsOpen(false)}
            >
              💻 Coding Challenges
            </Link>

            <Link
              href="/questions"
              className="block px-3 py-2 rounded-md text-base font-medium transition-colors text-white hover:text-blue-100 hover:bg-blue-700"
              onClick={() => setIsOpen(false)}
            >
              ❓ Interview Questions
            </Link>

            <Link
              href="/resources"
              className="block px-3 py-2 rounded-md text-base font-medium transition-colors text-white hover:text-blue-100 hover:bg-blue-700"
              onClick={() => setIsOpen(false)}
            >
              📚 Resources
            </Link>

            <Link
              href="/blog"
              className="block px-3 py-2 rounded-md text-base font-medium transition-colors text-white hover:text-blue-100 hover:bg-blue-700"
              onClick={() => setIsOpen(false)}
            >
              📝 Blog
            </Link>

            <Link
              href="/jobs"
              className="block px-3 py-2 rounded-md text-base font-medium transition-colors text-white hover:text-blue-100 hover:bg-blue-700"
              onClick={() => setIsOpen(false)}
            >
              💼 Jobs
            </Link>

            <Link
              href="/cheatsheet"
              className="block px-3 py-2 rounded-md text-base font-medium transition-colors text-white hover:text-blue-100 hover:bg-blue-700"
              onClick={() => setIsOpen(false)}
            >
              📋 Cheatsheet
            </Link>

            {/* Auth Section - Mobile */}
            <div className="pt-4 border-t border-blue-500/30">
              {isAuthenticated ? (
                <>
                  <div className="px-3 py-2 text-white text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                        <User className="w-3 h-3" />
                      </div>
                      <span>{user?.name || 'User'}</span>
                    </div>
                  </div>

                  <Link
                    href="/dashboard"
                    className="block px-3 py-2 rounded-md text-base font-medium transition-colors text-white hover:text-blue-100 hover:bg-blue-700"
                    onClick={() => setIsOpen(false)}
                  >
                    📊 Dashboard
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

                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors text-red-300 hover:text-red-100 hover:bg-red-700/20"
                  >
                    🚪 Logout
                  </button>
                </>
              ) : (
                <Link
                  href="/auth"
                  className="block px-3 py-3 rounded-md text-base font-medium bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white transition-all duration-200 mx-3 text-center shadow-lg"
                  onClick={() => setIsOpen(false)}
                >
                  💾 Want to store your progress?
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
