"use client";

import React, { useState, useEffect, useLayoutEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import AlzatonaLogo from "./AlzatonaLogo";
import { useUserType } from "@elzatona/contexts";
import { useMobileMenu } from "@elzatona/contexts";
import { useTheme } from "@elzatona/contexts";
import { useAuth } from "@elzatona/contexts";
import { clearSession } from "../lib/auth-session";
import { useLearningType } from "../context/LearningTypeContext";
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
  Loader2,
} from "lucide-react";
import {
  supabaseClient as supabase,
  isSupabaseAvailable,
} from "../lib/supabase-client";
import type { AuthChangeEvent, Session } from "@supabase/supabase-js";

export const NavbarSimple: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [hasSnapshotApplied, setHasSnapshotApplied] = useState(false);
  const [supabaseChecked, setSupabaseChecked] = useState(false);
  const [stableAuthState, setStableAuthState] = useState<{
    isAuthenticated: boolean;
    isLoading: boolean;
  }>(() => ({ isAuthenticated: false, isLoading: true }));
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [isModeSwitching, setIsModeSwitching] = useState(false);
  const [switchingToMode, setSwitchingToMode] = useState<
    "guided" | "self-directed" | null
  >(null);

  const { userType, setUserType } = useUserType();
  const { learningType, setLearningType } = useLearningType();
  const { setIsMobileMenuOpen } = useMobileMenu();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { user, isAuthenticated, isLoading: isAuthLoading, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  // Read persisted auth snapshot before paint to avoid visible flicker
  useLayoutEffect(() => {
    try {
      const stored = window.sessionStorage.getItem("navbar-auth-state");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (
          typeof parsed?.isAuthenticated === "boolean" &&
          typeof parsed?.isLoading === "boolean"
        ) {
          setStableAuthState(parsed);
        }
      }
    } catch (_) {}
    setHasSnapshotApplied(true);
    setIsHydrated(true);
  }, []);

  // Update stable auth state when auth changes, but only after hydration
  useEffect(() => {
    if (!isHydrated) return;
    // Never downgrade to unauthenticated from the app auth context; Supabase owns final truth.
    if (!isAuthenticated) return;
    const newState = {
      isAuthenticated: true,
      isLoading: isAuthLoading,
    };

    if (
      stableAuthState.isAuthenticated !== newState.isAuthenticated ||
      stableAuthState.isLoading !== newState.isLoading
    ) {
      setStableAuthState(newState);
      sessionStorage.setItem("navbar-auth-state", JSON.stringify(newState));
    }
  }, [
    isAuthenticated,
    isAuthLoading,
    isHydrated,
    stableAuthState.isAuthenticated,
    stableAuthState.isLoading,
  ]);

  // Also reflect Supabase auth state in navbar (for OAuth logins)
  useEffect(() => {
    if (!isSupabaseAvailable() || !supabase) return;

    // Initial check
    supabase.auth
      .getSession()
      .then(({ data }: { data: { session: unknown } | null }) => {
        const authed = !!data?.session;
        if (authed) {
          setStableAuthState({ isAuthenticated: true, isLoading: false });
          sessionStorage.setItem(
            "navbar-auth-state",
            JSON.stringify({ isAuthenticated: true, isLoading: false }),
          );
        }
      })
      .finally(() => setSupabaseChecked(true));

    // Fast retry loop for first load after social redirect (max ~2s)
    let retries = 10;
    const interval = setInterval(async () => {
      if (supabaseChecked || !supabase) {
        clearInterval(interval);
        return;
      }
      try {
        const { data } = await supabase.auth.getSession();
        if (data?.session) {
          setStableAuthState({ isAuthenticated: true, isLoading: false });
          sessionStorage.setItem(
            "navbar-auth-state",
            JSON.stringify({ isAuthenticated: true, isLoading: false }),
          );
          clearInterval(interval);
          setSupabaseChecked(true);
        }
      } catch (_) {}
      if (--retries <= 0) {
        clearInterval(interval);
        setSupabaseChecked(true);
      }
    }, 200);

    // Subscribe to changes
    if (!supabase) return;
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (event: AuthChangeEvent, session: Session | null) => {
        const authed = !!session;
        setStableAuthState({ isAuthenticated: authed, isLoading: false });
        sessionStorage.setItem(
          "navbar-auth-state",
          JSON.stringify({ isAuthenticated: authed, isLoading: false }),
        );
        setSupabaseChecked(true);
      },
    );

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  // Helper function to check if a link is active
  const isActiveLink = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname?.startsWith(href) || false;
  };

  // Handle learning mode switching
  const handleModeSwitch = async (newMode: "guided" | "self-directed") => {
    // Don't switch if already in that mode or currently switching
    if (userType === newMode || isModeSwitching) return;

    // Set loading state
    setIsModeSwitching(true);
    setSwitchingToMode(newMode);

    // Update user type and learning type IMMEDIATELY to hide/show cart
    setUserType(newMode);
    // Explicitly set learning type to hide cart when guided is selected
    if (newMode === "guided") {
      setLearningType("guided");
    } else {
      setLearningType("free-style");
    }

    // Navigate directly to the appropriate page (no intermediate pages)
    if (newMode === "guided") {
      // Navigate directly to guided learning
      if (!pathname?.startsWith("/features/guided-learning")) {
        try {
          // Use replace to avoid adding to history and ensure direct navigation
          router.replace("/features/guided-learning");
          // Clear loading state after navigation
          setTimeout(() => {
            setIsModeSwitching(false);
            setSwitchingToMode(null);
          }, 100);
        } catch (_error) {
          console.error("Navigation error:", _error);
          setIsModeSwitching(false);
          setSwitchingToMode(null);
        }
      } else {
        // Already on the page, clear loading immediately
        setIsModeSwitching(false);
        setSwitchingToMode(null);
      }
    } else {
      // Navigate directly to browse practice questions for free style
      if (!pathname?.startsWith("/browse-practice-questions")) {
        try {
          // Use replace to avoid adding to history and ensure direct navigation
          router.replace("/browse-practice-questions");
          // Clear loading state after navigation
          setTimeout(() => {
            setIsModeSwitching(false);
            setSwitchingToMode(null);
          }, 100);
        } catch (_error) {
          console.error("Navigation error:", _error);
          setIsModeSwitching(false);
          setSwitchingToMode(null);
        }
      } else {
        // Already on the page, clear loading immediately
        setIsModeSwitching(false);
        setSwitchingToMode(null);
      }
    }
  };

  // Handle sign out
  const handleSignOut = async () => {
    try {
      setIsSigningOut(true);
      // Sign out from app auth context (if used)
      if (typeof logout === "function") {
        await logout();
      }
      // Sign out from Supabase OAuth session
      if (isSupabaseAvailable() && supabase) {
        try {
          await supabase.auth.signOut();
        } catch (_) {}
      }
      // Clear persisted markers
      clearSession();
      setIsOpen(false);
      setIsUserDropdownOpen(false);
      // Clear the stable auth state and session storage
      setStableAuthState({ isAuthenticated: false, isLoading: false });
      try {
        sessionStorage.clear();
      } catch (_) {}
      try {
        localStorage.clear();
      } catch (_) {}
      // Navigate to home after logout for clarity
      router.push("/");
    } catch (_error) {
      console.error("Sign out error:", _error);
    } finally {
      // If navigation is blocked for any reason, avoid leaving the UI stuck
      setIsSigningOut(false);
    }
  };

  // Sync learningType with userType on mount and when userType changes
  useEffect(() => {
    if (!isHydrated) return;

    // If userType is 'guided', ensure learningType is also 'guided'
    if (userType === "guided" && learningType !== "guided") {
      setLearningType("guided");
    }
    // If userType is 'self-directed', ensure learningType is 'free-style'
    else if (
      userType === "self-directed" &&
      learningType !== "free-style" &&
      learningType !== "custom"
    ) {
      setLearningType("free-style");
    }
  }, [isHydrated, userType, learningType, setLearningType]);

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

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [isHydrated]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (!isHydrated) return;

    if (isOpen) {
      document.body.style.overflow = "hidden";
      setIsMobileMenuOpen(true);
    } else {
      document.body.style.overflow = "unset";
      setIsMobileMenuOpen(false);
    }

    return () => {
      document.body.style.overflow = "unset";
      setIsMobileMenuOpen(false);
    };
  }, [isOpen, setIsMobileMenuOpen, isHydrated]);

  // Clear mode switching state when pathname changes (navigation completed)
  useEffect(() => {
    if (isModeSwitching && pathname) {
      // Clear loading state after navigation completes
      const timer = setTimeout(() => {
        setIsModeSwitching(false);
        setSwitchingToMode(null);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [pathname, isModeSwitching]);

  // Persist last-known auth state across reloads to prevent flicker
  // (No beforeunload cleanup to keep navbar-auth-state available on refresh)

  // Hide navbar on admin routes (admin has its own navbar)
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
          isScrolled
            ? "bg-white/98 dark:bg-gray-900/98 backdrop-blur-lg shadow-xl border-b border-gray-200 dark:border-gray-700"
            : "bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600"
        }`}
      >
        <div className="w-full px-3 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18 lg:h-20">
            {/* Logo */}
            <Link
              href="/"
              className={`flex items-center transition-colors duration-200 ${
                isScrolled
                  ? "text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400"
                  : "text-white hover:text-indigo-100"
              }`}
            >
              <AlzatonaLogo size="sm" showText={false} />
            </Link>

            {/* Desktop Navigation - hidden for now per product decision */}
            {stableAuthState.isAuthenticated && (
              <div className="hidden lg:flex items-center space-x-6 flex-1 justify-center"></div>
            )}

            {/* Right Section - Desktop Only */}
            <div
              className="hidden lg:flex items-center space-x-4"
              suppressHydrationWarning
            >
              {/* Learning Mode Switcher */}
              <div className="flex items-center space-x-1 bg-white/20 dark:bg-gray-800/20 rounded-lg p-1">
                <button
                  onClick={() => handleModeSwitch("guided")}
                  disabled={isModeSwitching}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed ${
                    userType === "guided"
                      ? isScrolled
                        ? "bg-indigo-600 text-white shadow-sm"
                        : "bg-white text-indigo-600 shadow-sm"
                      : isScrolled
                        ? "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                        : "text-white hover:text-indigo-100"
                  }`}
                >
                  {isModeSwitching && switchingToMode === "guided" ? (
                    <Loader2 className="w-4 h-4 inline mr-1 animate-spin" />
                  ) : (
                    <Compass className="w-4 h-4 inline mr-1" />
                  )}
                  Guided
                </button>
                <button
                  onClick={() => handleModeSwitch("self-directed")}
                  disabled={isModeSwitching}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed ${
                    userType === "self-directed"
                      ? isScrolled
                        ? "bg-indigo-600 text-white shadow-sm"
                        : "bg-white text-indigo-600 shadow-sm"
                      : isScrolled
                        ? "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                        : "text-white hover:text-indigo-100"
                  }`}
                >
                  {isModeSwitching && switchingToMode === "self-directed" ? (
                    <Loader2 className="w-4 h-4 inline mr-1 animate-spin" />
                  ) : (
                    <Map className="w-4 h-4 inline mr-1" />
                  )}
                  Free Style
                </button>
              </div>

              {/* Auth Controls - render stable placeholder until snapshot applied */}
              {!hasSnapshotApplied ? (
                <div
                  className={`px-4 py-2 rounded-lg font-medium ${
                    isScrolled
                      ? "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                      : "bg-gray-200/20 text-gray-300"
                  }`}
                >
                  Loading...
                </div>
              ) : stableAuthState.isLoading ? (
                <div
                  className={`px-4 py-2 rounded-lg font-medium ${
                    isScrolled
                      ? "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                      : "bg-gray-200/20 text-gray-300"
                  }`}
                >
                  Loading...
                </div>
              ) : stableAuthState.isAuthenticated ? (
                <div className="flex items-center gap-2 relative">
                  <Link
                    href="/dashboard"
                    className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                      isScrolled
                        ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md hover:shadow-lg"
                        : "bg-indigo-500 hover:bg-indigo-600 text-white shadow-md hover:shadow-lg"
                    }`}
                    data-testid="dashboard-link"
                  >
                    Dashboard
                  </Link>
                  {/* User menu trigger */}
                  <button
                    type="button"
                    aria-haspopup="menu"
                    aria-expanded={isUserDropdownOpen}
                    onClick={() => setIsUserDropdownOpen((v: boolean) => !v)}
                    title="Account menu"
                    data-testid="user-menu-button"
                    className={`px-2.5 py-2 rounded-lg transition-colors duration-200 ${
                      isScrolled
                        ? "bg-gray-200 hover:bg-gray-300 text-gray-800"
                        : "bg-white/20 hover:bg-white/30 text-white border border-white/30"
                    }`}
                  >
                    <User size={18} />
                  </button>

                  {/* Dropdown menu */}
                  {isUserDropdownOpen && (
                    <div
                      role="menu"
                      aria-label="User menu"
                      className={`absolute right-0 top-12 w-44 rounded-lg shadow-lg border ${
                        isScrolled
                          ? "bg-white border-gray-200"
                          : "bg-white/95 border-white/30 backdrop-blur"
                      }`}
                    >
                      <Link
                        href="/dashboard"
                        role="menuitem"
                        className="block w-full text-left px-3 py-2 text-sm text-gray-800 hover:bg-gray-100 rounded-t-lg"
                        onClick={() => setIsUserDropdownOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <Link
                        href="/my-plans"
                        role="menuitem"
                        className="block w-full text-left px-3 py-2 text-sm text-gray-800 hover:bg-gray-100"
                        onClick={() => setIsUserDropdownOpen(false)}
                      >
                        My Plans
                      </Link>
                      <Link
                        href="/settings"
                        role="menuitem"
                        className="block w-full text-left px-3 py-2 text-sm text-gray-800 hover:bg-gray-100"
                        onClick={() => setIsUserDropdownOpen(false)}
                      >
                        Settings
                      </Link>
                      <button
                        role="menuitem"
                        onClick={() => {
                          setIsUserDropdownOpen(false);
                          handleSignOut();
                        }}
                        data-testid="user-menu-logout"
                        disabled={isSigningOut}
                        className={`block w-full text-left px-3 py-2 text-sm rounded-b-lg ${
                          isSigningOut
                            ? "text-red-400 bg-red-50/70 cursor-not-allowed"
                            : "text-red-600 hover:bg-red-50"
                        }`}
                      >
                        {isSigningOut ? "Signing out…" : "Sign out"}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/auth"
                  className={`font-medium transition-colors duration-200 ${
                    isActiveLink("/auth")
                      ? isScrolled
                        ? "text-indigo-600 dark:text-indigo-400 font-semibold border-b-2 border-indigo-600 dark:border-indigo-400 pb-1"
                        : "text-indigo-100 font-semibold border-b-2 border-indigo-100 pb-1"
                      : isScrolled
                        ? "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                        : "text-white hover:text-indigo-100"
                  }`}
                  data-testid="signin-link"
                >
                  Sign In
                </Link>
              )}

              {/* Theme Toggle */}
              <button
                onClick={toggleDarkMode}
                className={`p-2.5 rounded-lg transition-colors duration-200 ${
                  isScrolled
                    ? "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-indigo-800"
                    : "bg-white/20 text-white hover:bg-white/30 border border-white/30"
                }`}
                aria-label="Toggle theme"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>

            {/* Mobile/Tablet Menu Button */}
            <div className="flex items-center space-x-1 sm:space-x-2 lg:hidden">
              {/* Theme Toggle for Mobile/Tablet */}
              <button
                onClick={toggleDarkMode}
                className={`p-2 sm:p-2.5 rounded-lg transition-colors duration-200 ${
                  isScrolled
                    ? "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-indigo-800"
                    : "bg-white/20 text-white hover:bg-white/30 border border-white/30"
                }`}
                aria-label="Toggle theme"
              >
                {isDarkMode ? (
                  <Sun size={18} className="sm:w-5 sm:h-5" />
                ) : (
                  <Moon size={18} className="sm:w-5 sm:h-5" />
                )}
              </button>

              {/* Mobile Logout (visible when authenticated) */}
              {stableAuthState.isAuthenticated && (
                <button
                  onClick={handleSignOut}
                  title="Sign out"
                  className={`p-2 sm:p-2.5 rounded-lg transition-colors duration-200 bg-gray-200 hover:bg-gray-300 text-gray-800`}
                  aria-label="Sign out"
                  disabled={isSigningOut}
                >
                  <LogOut size={18} className="sm:w-5 sm:h-5" />
                </button>
              )}

              {/* Mobile menu button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`p-2 sm:p-2.5 rounded-lg transition-colors duration-200 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-indigo-800`}
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

              {/* Mobile Navigation Links - hidden for now per product decision */}
              {/* Remove spacer to reduce extra empty space before CTAs */}

              {/* Mobile CTAs */}
              <div className="pt-2 pb-3 px-2 sm:px-3 border-t border-gray-200 dark:border-gray-700 space-y-2 sm:space-y-2">
                {/* Learning Mode Switcher for Mobile */}
                <div className="mb-2">
                  <div className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 mb-1 sm:mb-2 px-2">
                    Learning Mode
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <button
                      onClick={() => {
                        handleModeSwitch("guided");
                        setIsOpen(false);
                      }}
                      className={`w-full flex items-center space-x-2 sm:space-x-3 px-3 py-2 sm:py-2.5 rounded-lg text-left transition-colors ${
                        userType === "guided"
                          ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-900 dark:text-indigo-100"
                          : "hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
                      }`}
                    >
                      <Compass className="w-4 h-4 flex-shrink-0" />
                      <span className="text-sm sm:text-base font-medium">
                        Guided Learning
                      </span>
                      {userType === "guided" && (
                        <div className="w-2 h-2 bg-indigo-600 rounded-full ml-auto"></div>
                      )}
                    </button>
                    <button
                      onClick={() => {
                        handleModeSwitch("self-directed");
                        setIsOpen(false);
                      }}
                      className={`w-full flex items-center space-x-2 sm:space-x-3 px-3 py-2 sm:py-2.5 rounded-lg text-left transition-colors ${
                        userType === "self-directed"
                          ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-900 dark:text-indigo-100"
                          : "hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
                      }`}
                    >
                      <Map className="w-4 h-4 flex-shrink-0" />
                      <span className="text-sm sm:text-base font-medium">
                        Free Style Learning
                      </span>
                      {userType === "self-directed" && (
                        <div className="w-2 h-2 bg-indigo-600 rounded-full ml-auto"></div>
                      )}
                    </button>
                  </div>
                </div>

                {stableAuthState.isAuthenticated ? (
                  <>
                    {/* User Profile Section */}
                    <div className="flex items-center space-x-3 px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                      {(user as any)?.photoURL ||
                      (user as any)?.avatar_url ? (
                        <img
                          src={
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            (user as any)?.photoURL ||
                            (user as any)?.avatar_url
                          }
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
                          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                          {(user as unknown)?.displayName ||
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            (user as unknown)?.name ||
                            "User"}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          {user?.email}
                        </p>
                      </div>
                    </div>

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
                    {/* Learning Mode Switcher for non-authenticated users */}
                    <div className="mb-4">
                      <div className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 sm:mb-3 px-3">
                        Learning Mode
                      </div>
                      <div className="space-y-1 sm:space-y-2">
                        <button
                          onClick={() => {
                            handleModeSwitch("guided");
                            setIsOpen(false);
                          }}
                          className={`w-full flex items-center space-x-2 sm:space-x-3 px-3 py-2 sm:py-2.5 rounded-lg text-left transition-colors ${
                            userType === "guided"
                              ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-900 dark:text-indigo-100"
                              : "hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
                          }`}
                        >
                          <Compass className="w-4 h-4 flex-shrink-0" />
                          <span className="text-sm sm:text-base font-medium">
                            Guided Learning
                          </span>
                          {userType === "guided" && (
                            <div className="w-2 h-2 bg-indigo-600 rounded-full ml-auto"></div>
                          )}
                        </button>
                        <button
                          onClick={() => {
                            handleModeSwitch("self-directed");
                            setIsOpen(false);
                          }}
                          className={`w-full flex items-center space-x-2 sm:space-x-3 px-3 py-2 sm:py-2.5 rounded-lg text-left transition-colors ${
                            userType === "self-directed"
                              ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-900 dark:text-indigo-100"
                              : "hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
                          }`}
                        >
                          <Map className="w-4 h-4 flex-shrink-0" />
                          <span className="text-sm sm:text-base font-medium">
                            Free Style Learning
                          </span>
                          {userType === "self-directed" && (
                            <div className="w-2 h-2 bg-indigo-600 rounded-full ml-auto"></div>
                          )}
                        </button>
                      </div>
                    </div>

                    {stableAuthState.isLoading ? (
                      <div className="block w-full text-center py-2.5 sm:py-3 font-medium text-sm sm:text-base rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400">
                        Loading...
                      </div>
                    ) : (
                      <Link
                        href="/auth"
                        className={`block w-full text-center py-2.5 sm:py-3 font-medium transition-colors duration-200 text-sm sm:text-base rounded-lg ${
                          isActiveLink("/auth")
                            ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 font-semibold"
                            : "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-800"
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
      {/* Page Loading Overlay */}
      {isModeSwitching && (
        <div className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-2xl flex flex-col items-center space-y-4">
            <Loader2 className="w-8 h-8 text-indigo-600 dark:text-indigo-400 animate-spin" />
            <p className="text-gray-900 dark:text-white font-medium">
              Switching to{" "}
              {switchingToMode === "guided" ? "Guided" : "Free Style"}{" "}
              Learning...
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default NavbarSimple;
