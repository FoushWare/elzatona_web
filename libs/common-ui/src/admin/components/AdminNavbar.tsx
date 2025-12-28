"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Menu,
  X,
  Sun,
  Moon,
  User,
  Users,
  LogOut,
  LogIn,
  Settings,
  BarChart3,
  Shield,
  ChevronDown,
  HelpCircle,
  Code,
  Calculator,
  Key,
  Bell,
  Activity,
  FileText,
} from "lucide-react";
import { useTheme, useAdminAuth } from "@elzatona/contexts";
import AlzatonaLogo from "../../common/AlzatonaLogo";

export default function AdminNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isAdminDropdownOpen, setIsAdminDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [dropdownPosition, setDropdownPosition] = useState<{
    left: number;
    top: number;
  } | null>(null);
  const { isDarkMode, toggleDarkMode } = useTheme();
  const {
    isAuthenticated,
    user,
    logout,
    isLoading: authLoading,
  } = useAdminAuth();
  const router = useRouter();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      // Save current scroll position
      const scrollY = window.scrollY;
      // Prevent body scroll
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";

      return () => {
        // Restore scroll position when menu closes
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        document.body.style.overflow = "";
        window.scrollTo(0, scrollY);
      };
    }
    return undefined;
  }, [isOpen]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      // Don't close if clicking inside the dropdown or the button
      if (
        target.closest("[data-admin-dropdown]") ||
        target.closest("[data-admin-dropdown-button]") ||
        target.closest("[data-user-dropdown]") ||
        target.closest("[data-user-dropdown-button]")
      ) {
        return;
      }
      setIsUserDropdownOpen(false);
      setIsAdminDropdownOpen(false);
    };

    if (isUserDropdownOpen || isAdminDropdownOpen) {
      document.addEventListener("click", handleClickOutside);
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }
    return undefined;
  }, [isUserDropdownOpen, isAdminDropdownOpen]);

  // Calculate dropdown position when it opens (for portal positioning)
  useEffect(() => {
    if (isAdminDropdownOpen && buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const centerX = buttonRect.left + buttonRect.width / 2;
      const top = buttonRect.bottom + 12; // mt-3 = 12px
      setDropdownPosition({ left: centerX, top });
    } else {
      setDropdownPosition(null);
    }
  }, [isAdminDropdownOpen]);

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

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[101] transition-all duration-300 ${
        isOpen
          ? "bg-red-600 dark:bg-red-800 shadow-xl border-b-2 border-red-700 dark:border-red-900"
          : isScrolled
            ? "bg-gray-100 dark:bg-gray-800/95 backdrop-blur-lg shadow-xl border-b-2 border-gray-300 dark:border-gray-600"
            : isDarkMode
              ? "bg-gradient-to-r from-red-600 to-red-800 border-b-2 border-red-700/50 shadow-lg"
              : "bg-red-600 border-b-2 border-red-700/30"
      }`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            href="/admin/dashboard"
            className={`flex items-center space-x-2 transition-colors duration-200 ${
              isOpen
                ? "text-white hover:text-red-100"
                : isScrolled
                  ? "text-gray-900 dark:text-white hover:text-red-600 dark:hover:text-red-400"
                  : "text-white hover:text-red-100"
            }`}
          >
            <AlzatonaLogo size="sm" showText={false} />
          </Link>

          {/* Center - Admin Menu Dropdown (Visible on all screens) */}
          <div
            ref={parentRef}
            className="flex items-center flex-1 justify-center"
            style={{ overflow: "visible", minWidth: 0 }}
          >
            <div
              ref={wrapperRef}
              className="relative"
              style={{ overflow: "visible" }}
            >
              <button
                ref={buttonRef}
                data-admin-dropdown-button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsAdminDropdownOpen(!isAdminDropdownOpen);
                }}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isScrolled
                    ? "text-gray-700 dark:text-white hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700/50"
                    : "text-white hover:text-red-100 hover:bg-red-700/50"
                }`}
              >
                <Shield className="w-4 h-4" />
                <span>Admin Menu</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${isAdminDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {/* Admin Dropdown - Rendered via portal to avoid parent constraints */}
              {isAdminDropdownOpen &&
                dropdownPosition &&
                typeof window !== "undefined" &&
                createPortal(
                  <>
                    {/* Backdrop overlay */}
                    <div
                      className="fixed inset-0 bg-black/10 dark:bg-black/30 z-[99] animate-in fade-in duration-150"
                      onClick={() => setIsAdminDropdownOpen(false)}
                      aria-hidden="true"
                    />

                    {/* Dropdown content */}
                    <div
                      data-admin-dropdown
                      ref={dropdownRef}
                      className="fixed rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 z-[100] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200"
                      style={{
                        left: `${dropdownPosition.left}px`,
                        top: `${dropdownPosition.top}px`,
                        transform: "translateX(-50%)",
                        width: "1600px",
                        minWidth: "1400px",
                        maxWidth: "calc(100vw - 2rem)",
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {/* Clean header */}
                      <div className="px-6 py-4 bg-gradient-to-r from-red-600 to-red-700 dark:from-red-900 dark:to-red-800 border-b border-red-500/20 dark:border-red-700/30">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-white/20 dark:bg-white/10">
                              <Shield className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <h3 className="text-base font-bold text-white">
                                Admin Menu
                              </h3>
                              <p className="text-xs text-red-100 dark:text-red-200 mt-0.5">
                                Quick navigation
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => setIsAdminDropdownOpen(false)}
                            className="p-1.5 rounded-md hover:bg-white/20 transition-colors"
                            aria-label="Close menu"
                          >
                            <X className="w-4 h-4 text-white" />
                          </button>
                        </div>
                      </div>

                      {/* Menu Items Grid - Clean and simple */}
                      <div className="p-5 bg-white dark:bg-gray-800">
                        <div className="grid grid-cols-2 gap-3">
                          {adminMenuItems.map((item, _index) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              className="group flex items-start gap-3 px-4 py-4 rounded-lg hover:bg-red-50 dark:hover:bg-gray-700/50 transition-all duration-200 border border-transparent hover:border-red-200 dark:hover:border-gray-600"
                              onClick={() => setIsAdminDropdownOpen(false)}
                            >
                              {/* Icon */}
                              <div className="flex-shrink-0 mt-0.5">
                                <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30 group-hover:bg-red-200 dark:group-hover:bg-red-900/50 transition-colors">
                                  <item.icon className="w-5 h-5 text-red-600 dark:text-red-400" />
                                </div>
                              </div>

                              {/* Content */}
                              <div className="flex-1 min-w-0">
                                <div className="font-semibold text-sm text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                                  {item.label}
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                                  {item.description}
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>,
                  document.body,
                )}
            </div>
          </div>

          {/* Right side - Theme toggle, Notifications and User menu */}
          <div className="flex items-center space-x-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-md transition-colors duration-200 ${
                isOpen
                  ? "text-white hover:text-red-100 hover:bg-red-700/50"
                  : isScrolled
                    ? "text-gray-700 dark:text-white hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700/50"
                    : "text-white hover:text-red-100 hover:bg-red-700/50"
              }`}
              title="Toggle theme"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {/* Notifications - Hidden until notifications are implemented */}
            {/* <NotificationDropdown /> */}

            {/* User Menu - Always visible with logout option */}
            <div className="relative">
              <button
                data-user-dropdown-button
                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                className={`flex items-center space-x-2 p-2 rounded-md transition-colors duration-200 ${
                  isOpen
                    ? "text-white hover:text-red-100 hover:bg-red-700/50"
                    : isScrolled
                      ? "text-gray-700 dark:text-white hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700/50"
                      : "text-white hover:text-red-100 hover:bg-red-700/50"
                }`}
                title={
                  isAuthenticated && user
                    ? `${user.name || user.email}`
                    : "User menu"
                }
              >
                <User className="w-5 h-5" />
                {isAuthenticated && user && (
                  <span className="hidden sm:block text-sm font-medium">
                    {user.name || user.email}
                  </span>
                )}
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${isUserDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {/* User Dropdown */}
              {isUserDropdownOpen && (
                <div
                  data-user-dropdown
                  className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50"
                >
                  {/* Show loading state while checking authentication */}
                  {authLoading ? (
                    <div className="px-4 py-3">
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                        <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                          Loading...
                        </span>
                      </div>
                    </div>
                  ) : isAuthenticated && user ? (
                    /* Show user menu when authenticated */
                    <>
                      {/* User Info Header */}
                      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-700">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                          {user.name || "Admin User"}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400 break-all mt-1">
                          {user.email}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 capitalize mt-1">
                          Role: {user.role?.replace("_", " ") || "Admin"}
                        </p>
                      </div>

                      {/* User Account Section */}
                      <div className="py-1">
                        <p className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Account
                        </p>
                        <Link
                          href="/admin/profile"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                          onClick={() => setIsUserDropdownOpen(false)}
                        >
                          <User className="w-4 h-4 mr-3" />
                          My Profile
                        </Link>
                        <Link
                          href="/admin/settings"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                          onClick={() => setIsUserDropdownOpen(false)}
                        >
                          <Settings className="w-4 h-4 mr-3" />
                          Settings
                        </Link>
                        <Link
                          href="/admin/profile?tab=security"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                          onClick={() => setIsUserDropdownOpen(false)}
                        >
                          <Key className="w-4 h-4 mr-3" />
                          Security & Privacy
                        </Link>
                      </div>

                      {/* User Management Section */}
                      <div className="py-1 border-t border-gray-200 dark:border-gray-700">
                        <p className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Management
                        </p>
                        <Link
                          href="/admin/users"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                          onClick={() => setIsUserDropdownOpen(false)}
                        >
                          <Users className="w-4 h-4 mr-3" />
                          Manage Users
                        </Link>
                        <Link
                          href="/admin/activity"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                          onClick={() => setIsUserDropdownOpen(false)}
                        >
                          <Activity className="w-4 h-4 mr-3" />
                          Activity Log
                        </Link>
                        <Link
                          href="/admin/notifications"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                          onClick={() => setIsUserDropdownOpen(false)}
                        >
                          <Bell className="w-4 h-4 mr-3" />
                          Notifications
                        </Link>
                      </div>

                      {/* Documentation & Help Section */}
                      <div className="py-1 border-t border-gray-200 dark:border-gray-700">
                        <p className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Help & Support
                        </p>
                        <Link
                          href="/admin/docs"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                          onClick={() => setIsUserDropdownOpen(false)}
                        >
                          <FileText className="w-4 h-4 mr-3" />
                          Documentation
                        </Link>
                        <Link
                          href="/admin/help"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                          onClick={() => setIsUserDropdownOpen(false)}
                        >
                          <HelpCircle className="w-4 h-4 mr-3" />
                          Help Center
                        </Link>
                      </div>

                      {/* Logout Section - Always visible when authenticated */}
                      <div className="border-t border-gray-200 dark:border-gray-700 mt-1">
                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                        >
                          <LogOut className="w-4 h-4 mr-3" />
                          Logout
                        </button>
                      </div>
                    </>
                  ) : (
                    /* Not Authenticated - Show Login (only if not loading) */
                    !authLoading && (
                      <div className="px-4 py-3">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                          Please log in to access admin features
                        </p>
                        <Link
                          href="/admin/login"
                          className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
                          onClick={() => setIsUserDropdownOpen(false)}
                        >
                          <LogIn className="w-4 h-4 mr-2" />
                          Login
                        </Link>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>

            {/* Mobile menu button - Hidden when dropdown is available, shows hamburger/cross icon */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`hidden p-2.5 rounded-lg transition-all duration-200 relative z-[102] ${
                isOpen
                  ? "bg-white text-red-600 hover:bg-white/90 shadow-lg"
                  : isScrolled
                    ? "text-gray-700 dark:text-white hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700/50"
                    : "text-white hover:text-red-100 hover:bg-red-700/50"
              }`}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? (
                <X className="w-6 h-6 font-bold" strokeWidth={3} />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation - Full height from top to bottom (Hidden since dropdown is always visible) */}
        {false && isOpen && (
          <div className="lg:hidden fixed top-0 left-0 right-0 bottom-0 bg-white dark:bg-gray-800 z-[100] overflow-y-auto pt-16">
            {/* Close section at top of menu */}
            <div className="sticky top-0 bg-white dark:bg-gray-800 z-[101] border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between px-4 py-4">
                {/* Menu text - centered vertically */}
                <div className="flex items-center">
                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    Admin Menu
                  </p>
                </div>

                {/* Close button with cross icon */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 shadow-lg transition-all duration-200 active:scale-95"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" strokeWidth={3} />
                  <span className="font-medium">Close</span>
                </button>
              </div>
            </div>

            <div className="px-2 py-2 space-y-1">
              {adminMenuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center space-x-3 px-3 py-3 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <div className="font-medium">{item.label}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      {item.description}
                    </div>
                  </div>
                </Link>
              ))}

              {/* Logout button */}
              <div className="border-t border-gray-200 dark:border-gray-700 mt-2 pt-2">
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="flex items-center space-x-3 px-3 py-3 rounded-md text-sm font-medium text-red-600 dark:text-red-400 hover:text-white dark:hover:text-white hover:bg-red-600 dark:hover:bg-red-600 transition-all duration-200 w-full"
                >
                  <LogOut className="w-5 h-5 flex-shrink-0" />
                  <div className="min-w-0 flex-1 text-left">
                    <div className="font-medium">Logout</div>
                    <div className="text-xs text-red-500 dark:text-red-400 mt-0.5">
                      Sign out of your account
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
