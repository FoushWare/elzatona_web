'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sun,
  Moon,
  Menu,
  X,
  Map,
  Compass,
  User,
  LogOut,
  Settings,
} from 'lucide-react';
import { AlzatonaLogo } from './AlzatonaLogo';
import { useUserType } from '@/contexts/UserTypeContextSafe';
import { useMobileMenu } from '@/contexts/MobileMenuContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useFirebaseAuth } from '@/contexts/FirebaseAuthContext';
import { LearningModeSwitcher } from '../learning/LearningModeSwitcher';

export const NavbarSimple: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [stableAuthState, setStableAuthState] = useState<{
    isAuthenticated: boolean;
    isLoading: boolean;
  }>({ isAuthenticated: false, isLoading: true });

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

  // Prevent hydration mismatch and flashing by using stable auth state
  useEffect(() => {
    setIsHydrated(true);

    // Initialize stable auth state from session storage if available
    const storedAuthState = sessionStorage.getItem('navbar-auth-state');
    if (storedAuthState) {
      try {
        const parsed = JSON.parse(storedAuthState);
        setStableAuthState(parsed);
      } catch (error) {
        console.warn('Failed to parse stored auth state:', error);
      }
    }
  }, []);

  // Update stable auth state when Firebase auth changes, but only after hydration
  useEffect(() => {
    if (isHydrated) {
      const newState = {
        isAuthenticated,
        isLoading: isAuthLoading,
      };

      // Only update if the state actually changed to prevent unnecessary re-renders
      if (
        stableAuthState.isAuthenticated !== newState.isAuthenticated ||
        stableAuthState.isLoading !== newState.isLoading
      ) {
        setStableAuthState(newState);

        // Store in session storage for persistence across page reloads
        sessionStorage.setItem('navbar-auth-state', JSON.stringify(newState));
      }
    }
  }, [
    isAuthenticated,
    isAuthLoading,
    isHydrated,
    stableAuthState.isAuthenticated,
    stableAuthState.isLoading,
  ]);

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
      setIsUserDropdownOpen(false);
      // Clear the stable auth state and session storage
      setStableAuthState({ isAuthenticated: false, isLoading: false });
      sessionStorage.removeItem('navbar-auth-state');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  // Handle scroll effect and mobile detection
  useEffect(() => {
    if (!isHydrated) return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    // Initial check
    handleResize();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [isHydrated]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (!isHydrated) return;

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
  }, [isOpen, setIsMobileMenuOpen, isHydrated]);

  // Cleanup effect for page unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      // Clear session storage on page unload to ensure fresh state on next visit
      sessionStorage.removeItem('navbar-auth-state');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled
          ? 'bg-white/98 dark:bg-gray-900/98 backdrop-blur-lg shadow-xl border-b border-gray-200 dark:border-gray-700'
          : 'bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600'
      }`}
    >
      <div className="w-full px-3 sm:px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18 lg:h-20">
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

          {/* Desktop Navigation - Only show for authenticated users */}
          {stableAuthState.isAuthenticated && (
            <div className="hidden lg:flex items-center space-x-6 flex-1 justify-center">
              {/* Navigation Links - Only for authenticated users */}
              <Link
                href="/practice"
                className={`font-medium transition-colors duration-200 ${
                  isActiveLink('/practice')
                    ? isScrolled
                      ? 'text-indigo-600 dark:text-indigo-400 font-semibold border-b-2 border-indigo-600 dark:border-indigo-400 pb-1'
                      : 'text-indigo-100 font-semibold border-b-2 border-indigo-100 pb-1'
                    : isScrolled
                      ? 'text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400'
                      : 'text-white hover:text-indigo-100'
                }`}
              >
                Practice
              </Link>
              <Link
                href="/progress"
                className={`font-medium transition-colors duration-200 ${
                  isActiveLink('/progress')
                    ? isScrolled
                      ? 'text-indigo-600 dark:text-indigo-400 font-semibold border-b-2 border-indigo-600 dark:border-indigo-400 pb-1'
                      : 'text-indigo-100 font-semibold border-b-2 border-indigo-100 pb-1'
                    : isScrolled
                      ? 'text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400'
                      : 'text-white hover:text-indigo-100'
                }`}
              >
                Progress
              </Link>
              <Link
                href="/my-plans"
                className={`font-medium transition-colors duration-200 ${
                  isActiveLink('/my-plans')
                    ? isScrolled
                      ? 'text-indigo-600 dark:text-indigo-400 font-semibold border-b-2 border-indigo-600 dark:border-indigo-400 pb-1'
                      : 'text-indigo-100 font-semibold border-b-2 border-indigo-100 pb-1'
                    : isScrolled
                      ? 'text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400'
                      : 'text-white hover:text-indigo-100'
                }`}
              >
                My Plans
              </Link>
              <Link
                href={
                  userType === 'self-directed'
                    ? '/free-style-roadmap'
                    : '/learn'
                }
                className={`font-medium transition-colors duration-200 ${
                  isActiveLink(
                    userType === 'self-directed'
                      ? '/free-style-roadmap'
                      : '/learn'
                  )
                    ? isScrolled
                      ? 'text-indigo-600 dark:text-indigo-400 font-semibold border-b-2 border-indigo-600 dark:border-indigo-400 pb-1'
                      : 'text-indigo-100 font-semibold border-b-2 border-indigo-100 pb-1'
                    : isScrolled
                      ? 'text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400'
                      : 'text-white hover:text-indigo-100'
                }`}
              >
                {userType === 'self-directed' ? 'My Roadmap' : 'Learn'}
              </Link>
            </div>
          )}

          {/* Right Section - Desktop Only */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Language Switcher */}
            {/* Learning Mode Switcher - Always show */}
            <LearningModeSwitcher isScrolled={isScrolled} />

            {/* Sign In / Logout Link */}
            {stableAuthState.isLoading ? (
              <div
                className={`px-4 py-2 rounded-lg font-medium ${
                  isScrolled
                    ? 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                    : 'bg-gray-200/20 text-gray-300'
                }`}
              >
                Loading...
              </div>
            ) : stableAuthState.isAuthenticated ? (
              <button
                onClick={handleSignOut}
                className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                  isScrolled
                    ? 'bg-red-600 hover:bg-red-700 text-white shadow-md hover:shadow-lg'
                    : 'bg-red-500 hover:bg-red-600 text-white shadow-md hover:shadow-lg'
                }`}
              >
                Logout
              </button>
            ) : (
              <Link
                href="/auth"
                className={`font-medium transition-colors duration-200 ${
                  isActiveLink('/auth')
                    ? isScrolled
                      ? 'text-indigo-600 dark:text-indigo-400 font-semibold border-b-2 border-indigo-600 dark:border-indigo-400 pb-1'
                      : 'text-indigo-100 font-semibold border-b-2 border-indigo-100 pb-1'
                    : isScrolled
                      ? 'text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400'
                      : 'text-white hover:text-indigo-100'
                }`}
              >
                Sign In
              </Link>
            )}

            {/* Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`p-2.5 rounded-lg transition-colors duration-200 ${
                isScrolled
                  ? 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-indigo-800'
                  : 'bg-white/20 text-white hover:bg-white/30 border border-white/30'
              }`}
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          {/* Mobile/Tablet Menu Button */}
          <div className="flex items-center space-x-1 sm:space-x-2 lg:hidden">
            {/* Learning Mode Switcher for Mobile/Tablet - Hidden on very small screens */}
            <div className="hidden xs:block">
              <LearningModeSwitcher isScrolled={isScrolled} />
            </div>

            {/* Theme Toggle for Mobile/Tablet */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 sm:p-2.5 rounded-lg transition-colors duration-200 ${
                isScrolled
                  ? 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-indigo-800'
                  : 'bg-white/20 text-white hover:bg-white/30 border border-white/30'
              }`}
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <Sun size={18} className="sm:w-5 sm:h-5" />
              ) : (
                <Moon size={18} className="sm:w-5 sm:h-5" />
              )}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 sm:p-2.5 rounded-lg transition-colors duration-200 ${
                isScrolled
                  ? 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-indigo-800'
                  : 'bg-white/20 text-white hover:bg-white/30 border border-white/30'
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
        <div className="fixed inset-0 bg-white dark:bg-gray-900 z-50 lg:hidden">
          <div className="flex flex-col h-full">
            {/* Mobile Header */}
            <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-200 dark:border-gray-700">
              <AlzatonaLogo size="sm" showText={false} />
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                aria-label="Close mobile menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Mobile Navigation Links - Only for authenticated users */}
            {stableAuthState.isAuthenticated && (
              <div className="flex-1 px-3 sm:px-4 py-4 sm:py-6 space-y-3 sm:space-y-4">
                <Link
                  href="/practice"
                  className={`block text-base sm:text-lg font-medium py-2 px-3 rounded-lg transition-colors ${
                    isActiveLink('/practice')
                      ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 font-semibold'
                      : 'text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  Practice
                </Link>
                <Link
                  href="/progress"
                  className={`block text-base sm:text-lg font-medium py-2 px-3 rounded-lg transition-colors ${
                    isActiveLink('/progress')
                      ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 font-semibold'
                      : 'text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  Progress
                </Link>
                <Link
                  href="/my-plans"
                  className={`block text-base sm:text-lg font-medium py-2 px-3 rounded-lg transition-colors ${
                    isActiveLink('/my-plans')
                      ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 font-semibold'
                      : 'text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  My Plans
                </Link>
                <Link
                  href={
                    userType === 'self-directed'
                      ? '/free-style-roadmap'
                      : '/learn'
                  }
                  className={`block text-base sm:text-lg font-medium py-2 px-3 rounded-lg transition-colors ${
                    isActiveLink(
                      userType === 'self-directed'
                        ? '/free-style-roadmap'
                        : '/learn'
                    )
                      ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 font-semibold'
                      : 'text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {userType === 'self-directed' ? 'My Roadmap' : 'Learn'}
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
            )}

            {/* Mobile CTAs */}
            <div className="p-3 sm:p-4 border-t border-gray-200 dark:border-gray-700 space-y-2 sm:space-y-3">
              {/* Learning Mode Switcher for non-authenticated users */}
              {!stableAuthState.isAuthenticated && (
                <div className="mb-4">
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
              )}

              {stableAuthState.isAuthenticated ? (
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
                  {!stableAuthState.isLoading &&
                    !stableAuthState.isAuthenticated && (
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
                  {stableAuthState.isLoading ? (
                    <div className="block w-full text-center py-2.5 sm:py-3 font-medium text-sm sm:text-base rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400">
                      Loading...
                    </div>
                  ) : stableAuthState.isAuthenticated ? (
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
