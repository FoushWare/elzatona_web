"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
import { useTheme, useAdminAuth } from "@elzatona/contexts";
import { NotificationDropdown } from "../common/NotificationDropdown";
import AlzatonaLogo from "../common/AlzatonaLogo";

export default function AdminNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isAdminDropdownOpen, setIsAdminDropdownOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { isAuthenticated, user, logout } = useAdminAuth();
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
  }, [isOpen]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      // Don't close if clicking inside the dropdown or the button
      if (
        target.closest("[data-admin-dropdown]") ||
        target.closest("[data-admin-dropdown-button]")
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

          {/* Center - Admin Menu Dropdown (Desktop only) */}
          <div className="hidden lg:flex items-center flex-1 justify-center">
            <div className="relative">
              <button
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

              {/* Admin Dropdown - Aligned with button center */}
              {isAdminDropdownOpen && (
                <div
                  data-admin-dropdown
                  className="absolute left-1/2 transform -translate-x-1/2 top-full mt-3 w-80 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 z-[100] overflow-hidden"
                >
                  {/* Header */}
                  <div className="px-4 py-3 bg-gradient-to-r from-red-50 to-red-100 dark:from-gray-800 dark:to-gray-700 border-b border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      Admin Menu
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                      Quick navigation
                    </p>
                  </div>

                  {/* Menu Items */}
                  <div className="py-2">
                    {adminMenuItems.map((item, index) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-start gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-gray-700/50 transition-all duration-150 group"
                        onClick={() => setIsAdminDropdownOpen(false)}
                      >
                        <div className="flex-shrink-0 mt-0.5">
                          <div className="p-1.5 rounded-md bg-red-100 dark:bg-red-900/30 group-hover:bg-red-200 dark:group-hover:bg-red-900/50 transition-colors">
                            <item.icon className="w-4 h-4 text-red-600 dark:text-red-400" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                            {item.label}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2">
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

            {/* User Menu */}
            {isAuthenticated && user && (
              <div className="relative">
                <button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className={`flex items-center space-x-2 p-2 rounded-md transition-colors duration-200 ${
                    isOpen
                      ? "text-white hover:text-red-100 hover:bg-red-700/50"
                      : isScrolled
                        ? "text-gray-700 dark:text-white hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700/50"
                        : "text-white hover:text-red-100 hover:bg-red-700/50"
                  }`}
                >
                  <User className="w-5 h-5" />
                  <span className="hidden sm:block text-sm font-medium">
                    {user.name || user.email}
                  </span>
                </button>

                {/* User Dropdown */}
                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50">
                    <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {user.name || "Admin User"}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 break-all">
                        {user.email}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                        Role: {user.role.replace("_", " ")}
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

            {/* Mobile menu button - Hidden on large screens, shows hamburger/cross icon */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`lg:hidden p-2.5 rounded-lg transition-all duration-200 relative z-[102] ${
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

        {/* Mobile Navigation - Full height from top to bottom */}
        {isOpen && (
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
