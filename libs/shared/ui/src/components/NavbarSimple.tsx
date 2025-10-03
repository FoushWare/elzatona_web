'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sun,
  Moon,
  Menu,
  X,
  MapPin,
  Compass,
  User,
  LogOut,
  Settings,
  BookOpen,
  Sparkles,
  Zap,
  Star,
  Heart,
  Shield,
  Target,
  Lightbulb,
  GraduationCap,
  Rocket,
} from 'lucide-react';
import { AlzatonaLogo } from './AlzatonaLogo';
import { useUserType } from '@/contexts/UserTypeContext';
import { useMobileMenu } from '@/contexts/MobileMenuContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useFirebaseAuth } from '@/contexts/FirebaseAuthContext';
import { LearningModeSwitcher } from './LearningModeSwitcher';

export const NavbarSimple: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { userType, setUserType } = useUserType();
  const { setIsMobileMenuOpen } = useMobileMenu();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const {
    user,
    isAuthenticated,
    isLoading: isAuthLoading,
    signOut,
  } = useFirebaseAuth();
  const pathname = usePathname();

  // Helper function to check if a link is active
  const isActiveLink = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname?.startsWith(href) || false;
  };

  // Handle sign out
  const handleSignOut = async () => {
    try {
      await signOut();
      setIsOpen(false);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setIsMobileMenuOpen(true);
    } else {
      document.body.style.overflow = 'unset';
      setIsMobileMenuOpen(false);
    }

    return () => {
      document.body.style.overflow = 'unset';
      setIsMobileMenuOpen(false);
    };
  }, [isOpen, setIsMobileMenuOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled
          ? 'bg-white/98 dark:bg-gray-900/98 backdrop-blur-lg shadow-xl border-b border-gray-200 dark:border-gray-700'
          : 'bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-22 lg:h-24">
          {/* Logo */}
          <Link
            href="/"
            className={`flex items-center transition-colors duration-200 ${
              isScrolled
                ? 'text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400'
                : 'text-white hover:text-indigo-100'
            }`}
          >
            <AlzatonaLogo size="sm" showText={false} />
          </Link>

          {/* Desktop/Tablet Navigation - Learning Path Link */}
          <div className="hidden md:flex items-center space-x-6 flex-1 justify-center">
            <Link
              href="/learning-path"
              className={`font-semibold transition-all duration-500 px-6 py-3 rounded-xl flex items-center space-x-3 relative overflow-hidden group ${
                isActiveLink('/learning-path')
                  ? isScrolled
                    ? 'text-white dark:text-white font-bold bg-green-500 border-2 border-green-600 shadow-lg hover:shadow-2xl transform hover:scale-105'
                    : 'text-white dark:text-white font-bold bg-green-500 border-2 border-green-400 shadow-lg hover:shadow-2xl transform hover:scale-105'
                  : isScrolled
                    ? 'text-white dark:text-white hover:text-white dark:hover:text-white hover:bg-green-600 hover:border-2 hover:border-green-200 hover:shadow-xl hover:transform hover:scale-105'
                    : 'text-white dark:text-white hover:text-white dark:hover:text-white hover:bg-green-600 hover:border-2 hover:border-green-200 hover:shadow-xl hover:transform hover:scale-105'
              }`}
            >
              <BookOpen className="w-5 h-5 transition-transform duration-200 group-hover:rotate-6 group-hover:scale-105" />
              <span className="relative z-10">Learning Path</span>
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
            </Link>
          </div>

          {/* Right Section - Desktop/Tablet */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Learning Mode Switcher - Always show */}
            <LearningModeSwitcher isScrolled={isScrolled} />

            {/* Sign In / Logout Link */}
            {isAuthLoading ? (
              <div
                className={`px-4 py-2 rounded-lg font-medium ${
                  isScrolled
                    ? 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                    : 'bg-gray-200/20 text-gray-300'
                }`}
              >
                Loading...
              </div>
            ) : isAuthenticated ? (
              <button
                onClick={handleSignOut}
                className={`px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 ${
                  isScrolled
                    ? 'bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                    : 'bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                }`}
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            ) : (
              <Link
                href="/auth"
                className={`font-semibold transition-all duration-500 px-5 py-2.5 rounded-xl flex items-center space-x-2 relative overflow-hidden group ${
                  isActiveLink('/auth')
                    ? isScrolled
                      ? 'text-white dark:text-white font-bold bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg hover:shadow-2xl transform hover:scale-105'
                      : 'text-white dark:text-white font-bold bg-gradient-to-r from-green-500/80 to-emerald-600/80 backdrop-blur-sm shadow-lg hover:shadow-2xl transform hover:scale-105'
                    : isScrolled
                      ? 'text-white dark:text-white hover:text-white dark:hover:text-white hover:bg-green-500 hover:shadow-lg hover:transform hover:scale-105'
                      : 'text-white dark:text-white hover:text-white dark:hover:text-white hover:bg-green-500 hover:shadow-lg hover:transform hover:scale-105'
                }`}
              >
                <User className="w-4 h-4 transition-transform duration-200 group-hover:rotate-6 group-hover:scale-105" />
                <span className="relative z-10">Sign In</span>
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
              </Link>
            )}

            {/* Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`p-3 rounded-xl transition-all duration-300 ${
                isScrolled
                  ? 'bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 text-gray-700 dark:text-gray-300 hover:from-indigo-100 hover:to-purple-100 dark:hover:from-indigo-800 dark:hover:to-purple-800 shadow-lg hover:shadow-xl transform hover:scale-110'
                  : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 shadow-lg hover:shadow-xl transform hover:scale-110'
              }`}
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          {/* Mobile Menu Button - Only visible on mobile */}
          <div className="flex items-center space-x-1 sm:space-x-2 md:hidden">
            {/* Learning Mode Switcher for Mobile/Tablet - Hidden on very small screens */}
            <div className="hidden xs:block">
              <LearningModeSwitcher isScrolled={isScrolled} />
            </div>

            {/* Theme Toggle for Mobile/Tablet */}
            <button
              onClick={toggleDarkMode}
              className={`p-3 rounded-xl transition-all duration-300 ${
                isScrolled
                  ? 'bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 text-gray-700 dark:text-gray-300 hover:from-indigo-100 hover:to-purple-100 dark:hover:from-indigo-800 dark:hover:to-purple-800 shadow-lg hover:shadow-xl transform hover:scale-110'
                  : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 shadow-lg hover:shadow-xl transform hover:scale-110'
              }`}
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <Sun size={18} className="sm:w-5 sm:h-5" />
              ) : (
                <Moon size={18} className="sm:w-5 sm:h-5" />
              )}
            </button>

            {/* Mobile menu button - Only visible on mobile/tablet */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-3 rounded-xl transition-all duration-300 ${
                isScrolled
                  ? 'bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 text-gray-700 dark:text-gray-300 hover:from-indigo-100 hover:to-purple-100 dark:hover:from-indigo-800 dark:hover:to-purple-800 shadow-lg hover:shadow-xl transform hover:scale-110'
                  : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 shadow-lg hover:shadow-xl transform hover:scale-110'
              }`}
              aria-label="Toggle mobile menu"
            >
              {isOpen ? (
                <X size={18} className="sm:w-5 sm:h-5" />
              ) : (
                <Menu size={18} className="sm:w-5 sm:h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation - Full Screen Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 z-50 lg:hidden">
          <div className="flex flex-col h-full">
            {/* Mobile Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-700">
              <AlzatonaLogo size="sm" showText={false} />
              <button
                onClick={() => setIsOpen(false)}
                className="p-3 rounded-xl bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 text-gray-700 dark:text-gray-300 hover:from-indigo-200 hover:to-purple-200 dark:hover:from-indigo-800 dark:hover:to-purple-800 transition-all duration-300 hover:scale-110 shadow-lg"
                aria-label="Close mobile menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Mobile Navigation Links */}
            <div className="flex-1 px-3 sm:px-4 py-4 sm:py-6 space-y-3 sm:space-y-4">
              {/* Learning Path Link */}
              <Link
                href="/learning-path"
                className={`block text-base sm:text-lg font-semibold py-4 px-6 rounded-xl transition-all duration-500 flex items-center space-x-3 relative overflow-hidden group ${
                  isActiveLink('/learning-path')
                    ? 'text-white dark:text-white font-bold bg-green-500 border-2 border-green-600 shadow-2xl transform scale-105'
                    : 'text-black dark:text-white hover:text-white dark:hover:text-white hover:bg-green-600 hover:border-2 hover:border-green-200 hover:shadow-xl hover:transform hover:scale-105'
                }`}
                onClick={() => setIsOpen(false)}
              >
                <BookOpen className="w-5 h-5 transition-transform duration-200 group-hover:rotate-6 group-hover:scale-105" />
                <span className="relative z-10">Learning Path</span>
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
              </Link>

              {/* Mobile Learning Mode Switcher - Always show */}
              <div className="pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 sm:mb-3 px-3">
                  Learning Mode
                </div>
                <div className="space-y-1 sm:space-y-2">
                  <button
                    onClick={() => {
                      setUserType('guided');
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center space-x-2 sm:space-x-3 px-3 py-2 sm:py-2.5 rounded-lg text-left transition-colors ${
                      userType === 'guided'
                        ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-900 dark:text-indigo-100'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white'
                    }`}
                  >
                    <Compass className="w-4 h-4 flex-shrink-0" />
                    <span className="text-sm sm:text-base font-medium">
                      Guided Learning
                    </span>
                    {userType === 'guided' && (
                      <div className="w-2 h-2 bg-indigo-600 rounded-full ml-auto"></div>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setUserType('self-directed');
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center space-x-2 sm:space-x-3 px-3 py-2 sm:py-2.5 rounded-lg text-left transition-colors ${
                      userType === 'self-directed'
                        ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-900 dark:text-indigo-100'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white'
                    }`}
                  >
                    <Map className="w-4 h-4 flex-shrink-0" />
                    <span className="text-sm sm:text-base font-medium">
                      Free Style Learning
                    </span>
                    {userType === 'self-directed' && (
                      <div className="w-2 h-2 bg-indigo-600 rounded-full ml-auto"></div>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile CTAs */}
            <div className="p-3 sm:p-4 border-t border-gray-200 dark:border-gray-700 space-y-2 sm:space-y-3">
              {isAuthenticated ? (
                <>
                  {/* User Profile Section */}
                  <div className="flex items-center space-x-3 px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    {user?.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt="Profile"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {user?.displayName || 'User'}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {user?.email}
                      </p>
                    </div>
                  </div>

                  {/* Profile Actions */}
                  <Link
                    href="/profile"
                    className={`block w-full text-center py-2.5 sm:py-3 font-medium transition-colors duration-200 text-sm sm:text-base rounded-lg ${
                      isActiveLink('/profile')
                        ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 font-semibold'
                        : 'text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <Settings className="w-4 h-4 inline mr-2" />
                    Profile Settings
                  </Link>

                  {/* Admin Panel Link */}
                  <Link
                    href="/admin"
                    className={`block w-full text-center py-2.5 sm:py-3 font-medium transition-colors duration-200 text-sm sm:text-base rounded-lg ${
                      isActiveLink('/admin')
                        ? 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30 font-semibold'
                        : 'text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <User className="w-4 h-4 inline mr-2" />
                    Admin Panel
                  </Link>

                  <button
                    onClick={handleSignOut}
                    className="block w-full text-center py-2.5 sm:py-3 font-medium transition-colors duration-200 text-sm sm:text-base rounded-lg text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <LogOut className="w-4 h-4 inline mr-2" />
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  {/* Get Started Button - Hidden when authenticated */}
                  {!isAuthLoading && !isAuthenticated && (
                    <Link
                      href="/get-started"
                      className={`block w-full text-center py-2.5 sm:py-3 rounded-lg font-medium shadow-md transition-colors duration-200 text-sm sm:text-base ${
                        isActiveLink('/get-started')
                          ? 'bg-indigo-700 text-white ring-2 ring-indigo-300 dark:ring-indigo-500 font-semibold'
                          : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      Get Started
                    </Link>
                  )}
                  {isAuthLoading ? (
                    <div className="block w-full text-center py-2.5 sm:py-3 font-medium text-sm sm:text-base rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400">
                      Loading...
                    </div>
                  ) : isAuthenticated ? (
                    <button
                      onClick={() => {
                        handleSignOut();
                        setIsOpen(false);
                      }}
                      className="block w-full text-center py-2.5 sm:py-3 font-medium transition-colors duration-200 text-sm sm:text-base rounded-lg bg-red-600 hover:bg-red-700 text-white shadow-md hover:shadow-lg"
                    >
                      Logout
                    </button>
                  ) : (
                    <Link
                      href="/auth"
                      className={`block w-full text-center py-2.5 sm:py-3 font-medium transition-colors duration-200 text-sm sm:text-base rounded-lg ${
                        isActiveLink('/auth')
                          ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 font-semibold'
                          : 'text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      Sign In
                    </Link>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavbarSimple;
