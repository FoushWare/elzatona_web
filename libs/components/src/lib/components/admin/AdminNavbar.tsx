"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  Menu,
  X,
  Sun,
  Moon,
  User,
  LogOut,
  Settings,
  BarChart3,
  Shield,
  ChevronDown,
  HelpCircle,
  Code,
  Calculator,
} from "lucide-react";
import { useAdminAuth, useTheme } from "@elzatona/contexts";
import AlzatonaLogo from "../../common/AlzatonaLogo";

const getThemeClasses = (isDarkMode: boolean, isClient: boolean) => ({
  navbarBg: isClient && isDarkMode ? "bg-red-700" : "bg-red-600",
  logoText:
    isClient && isDarkMode
      ? "text-white hover:text-red-100"
      : "text-white hover:text-red-50",
  titleText:
    isClient && isDarkMode
      ? "text-white drop-shadow-sm"
      : "text-white drop-shadow-md",
  subtitleText:
    isClient && isDarkMode
      ? "text-red-50 drop-shadow-sm"
      : "text-red-100 drop-shadow-sm",
  themeButton:
    isClient && isDarkMode
      ? "bg-white/25 text-white hover:bg-white/35 border border-white/40"
      : "bg-white/30 text-white hover:bg-white/40 border border-white/50",
});

export default function AdminNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isAdminDropdownOpen, setIsAdminDropdownOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const { user, isAuthenticated, logout } = useAdminAuth();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  const themeClasses = getThemeClasses(isDarkMode, isClient);

  // Prevent hydration mismatch by only using theme after client-side hydration
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Check if we're on the login page
  const isLoginPage = pathname === "/admin/login";

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setIsUserDropdownOpen(false);
      setIsAdminDropdownOpen(false);
    };

    if (isUserDropdownOpen || isAdminDropdownOpen) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
    return undefined;
  }, [isUserDropdownOpen, isAdminDropdownOpen]);

  const handleLogout = () => {
    logout();
    setIsUserDropdownOpen(false);
    setIsOpen(false); // Close mobile menu if open
    // Redirect to login page using Next.js router
    router.replace("/admin/login");
  };

  const adminMenuItems = [
    {
      href: "/admin/dashboard",
      label: "Dashboard",
      icon: BarChart3,
      description: "Admin overview and statistics",
    },
    {
      href: "/admin/content/questions",
      label: "Questions",
      icon: HelpCircle,
      description: "Add, edit, and manage questions",
    },
    {
      href: "/admin/content-management",
      label: "Content Management",
      icon: Settings,
      description:
        "Comprehensive admin interface for managing learning content",
    },
    {
      href: "/admin/frontend-tasks",
      label: "Frontend Tasks",
      icon: Code,
      description: "Create and manage React/frontend coding challenges",
    },
    {
      href: "/admin/problem-solving",
      label: "Problem Solving",
      icon: Calculator,
      description: "Create and manage algorithmic coding challenges",
    },
    {
      href: "/admin/reports",
      label: "Feature Reports",
      icon: BarChart3,
      description: "View project features and progress",
    },
  ];

  // Simple navbar for login page - matching the UI from feat/seed-questions-to-firebase branch
  if (isLoginPage) {
    return (
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 shadow-lg backdrop-blur-sm ${
          themeClasses.navbarBg
        }`}
        suppressHydrationWarning
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20 gap-4">
            {/* Logo */}
            <Link
              href="/"
              className={`flex items-center space-x-2 transition-colors duration-200 flex-shrink-0 ${
                themeClasses.logoText
              }`}
              aria-label="Go to home page"
            >
              <AlzatonaLogo size="sm" showText={false} forceDarkMode={false} />
            </Link>

            {/* Center Title - Hidden on mobile, visible on tablet+ */}
            <div className="flex-1 text-center hidden md:block min-w-0">
              <h1
                className={`text-lg sm:text-xl font-bold truncate ${
                  themeClasses.titleText
                }`}
              >
                Admin Access Portal
              </h1>
              <p
                className={`text-xs sm:text-sm font-medium truncate ${
                  themeClasses.subtitleText
                }`}
              >
                Secure Authentication Required
              </p>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
              {/* Theme Toggle */}
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md hover:scale-105 active:scale-95 ${
                  themeClasses.themeButton
                }`}
                aria-label="Toggle theme"
                title={
                  isClient && isDarkMode
                    ? "Switch to light mode"
                    : "Switch to dark mode"
                }
                suppressHydrationWarning
              >
                {isClient && isDarkMode ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>

              {/* Back to Main Site */}
              <Link
                href="/"
                className={`px-3 sm:px-4 py-2 rounded-lg font-semibold transition-all duration-200 hover:scale-105 active:scale-95 text-center shadow-sm hover:shadow-md whitespace-nowrap ${
                  isClient && isDarkMode
                    ? "bg-white/25 text-white hover:bg-white/35 border border-white/40"
                    : "bg-white/30 text-white hover:bg-white/40 border border-white/50"
                }`}
                aria-label="Back to main site"
              >
                <span
                  className={`text-xs sm:text-sm font-medium tracking-wide ${
                    isClient && isDarkMode ? "drop-shadow-sm" : "drop-shadow-md"
                  }`}
                >
                  Back to Site
                </span>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  // Full navbar for other pages
  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/98 dark:bg-gray-900/98 backdrop-blur-lg shadow-xl border-b border-gray-200 dark:border-gray-700"
          : "bg-gradient-to-r from-red-600 to-red-800"
      }`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Logo only */}
          <div className="flex items-center">
            {/* Logo */}
            <Link
              href="/admin/dashboard"
              className={`flex items-center space-x-2 transition-colors duration-200 ${
                isScrolled
                  ? "text-gray-900 dark:text-white hover:text-red-600 dark:hover:text-red-400"
                  : "text-white hover:text-red-100"
              }`}
            >
              <AlzatonaLogo
                size="sm"
                showText={false}
                forceDarkMode={!isScrolled}
              />
            </Link>
          </div>

          {/* Desktop Navigation - Single Dropdown */}
          <div className="hidden md:flex items-center">
            <div className="relative">
              <button
                onClick={() => setIsAdminDropdownOpen(!isAdminDropdownOpen)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isScrolled
                    ? "text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                    : "text-white hover:text-red-100 hover:bg-red-700/50"
                }`}
              >
                <Shield className="w-4 h-4" />
                <span>Admin Panel</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {/* Admin Dropdown */}
              {isAdminDropdownOpen && (
                <div className="absolute right-0 mt-2 w-80 max-w-[90vw] bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50 max-h-[80vh] overflow-y-auto">
                  <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Admin Panel
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Manage your application
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-1">
                    {adminMenuItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                        onClick={() => setIsAdminDropdownOpen(false)}
                      >
                        <item.icon className="w-4 h-4 mr-3 text-red-600 dark:text-red-400 flex-shrink-0" />
                        <div className="min-w-0">
                          <div className="font-medium truncate">
                            {item.label}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                            {item.description}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right side - User Profile Dropdown and Mobile menu button */}
          <div className="flex items-center space-x-4">
            {/* User Profile Dropdown */}
            {isAuthenticated && user && (
              <div className="relative">
                <button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className={`flex items-center space-x-2 p-2 rounded-md transition-colors duration-200 ${
                    isScrolled
                      ? "text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                      : "text-white hover:text-red-100 hover:bg-red-700/50"
                  }`}
                >
                  <User className="w-5 h-5" />
                  <span className="hidden sm:block text-sm font-medium">
                    {user.email}
                  </span>
                  <ChevronDown className="w-4 h-4" />
                </button>

                {/* User Dropdown */}
                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50">
                    <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {user.email}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                        Role: {user.role}
                      </p>
                    </div>

                    <Link
                      href="/admin/profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setIsUserDropdownOpen(false)}
                    >
                      <User className="w-4 h-4 mr-2" />
                      Profile
                    </Link>

                    <Link
                      href="/admin/settings"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setIsUserDropdownOpen(false)}
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </Link>

                    <div className="border-t border-gray-200 dark:border-gray-700">
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`md:hidden p-2 rounded-md transition-colors duration-200 ${
                isScrolled
                  ? "text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                  : "text-white hover:text-red-100 hover:bg-red-700/50"
              }`}
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden max-h-[70vh] overflow-y-auto">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
              {/* Admin Panel Section */}
              <div className="px-3 py-2 border-b border-gray-200 dark:border-gray-700 mb-2">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Admin Panel
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Manage your application
                </p>
              </div>

              <div className="grid grid-cols-1 gap-1">
                {adminMenuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setIsOpen(false)}
                  >
                    <item.icon className="w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0" />
                    <div className="min-w-0">
                      <div className="font-medium truncate">{item.label}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {item.description}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {isAuthenticated && user && (
                <div className="border-t border-gray-200 dark:border-gray-700 pt-2 mt-2">
                  <div className="px-3 py-2">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {user.email}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                      Role: {user.role}
                    </p>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 w-full px-3 py-2 text-base font-medium text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
