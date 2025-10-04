'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Menu,
  X,
  User,
  LogOut,
  Settings,
  BarChart3,
  Shield,
  ChevronDown,
  FileText,
  HelpCircle,
  FolderOpen,
  BookOpen,
  Home,
  LayoutDashboard,
  Users,
  MessageSquare,
  BarChart2,
  PlusCircle,
  List,
  ShieldCheck,
} from 'lucide-react';
import { useTheme } from '@elzatona/shared/contexts';
import { ThemeToggle } from './ThemeToggle';
import { Button } from './ui/button';

interface AdminNavbarProps {
  user?: {
    id: string;
    name: string;
    email: string;
    role: string;
    avatar?: string;
  } | null;
  logout?: () => void;
}

export default function AdminNavbar({ user, logout }: AdminNavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isAdminDropdownOpen, setIsAdminDropdownOpen] = useState(false);
  const { isDarkMode } = useTheme();
  const router = useRouter();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setIsUserDropdownOpen(false);
      setIsAdminDropdownOpen(false);
    };

    if (isUserDropdownOpen || isAdminDropdownOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isUserDropdownOpen, isAdminDropdownOpen]);

  const handleLogout = () => {
    if (logout) {
      logout();
    }
    setIsUserDropdownOpen(false);
    setIsOpen(false); // Close mobile menu if open
    // Redirect to login page using Next.js router
    router.replace('/admin/login');
  };

  const adminMenuItems = [
    {
      href: '/admin/dashboard',
      label: 'Dashboard',
      icon: BarChart3,
      description: 'Admin overview and statistics',
    },
    {
      href: '/admin/content/questions',
      label: 'Questions',
      icon: HelpCircle,
      description: 'Add, edit, and manage questions',
    },
    {
      href: '/admin/guided-learning',
      label: 'Guided Learning',
      icon: BookOpen,
      description: 'Create and manage learning plans',
    },
    {
      href: '/admin/learning-cards',
      label: 'Learning Cards',
      icon: FileText,
      description: 'Manage learning cards and categories',
    },
    {
      href: '/admin/sections',
      label: 'Learning Sections',
      icon: FileText,
      description: 'Manage learning path sections',
    },
    {
      href: '/admin/enhanced-structure',
      label: 'Categories & Topics',
      icon: Settings,
      description: 'Create and manage topics and categories',
    },
    {
      href: '/admin/reports',
      label: 'Feature Reports',
      icon: BarChart3,
      description: 'View project features and progress',
    },
    {
      href: '/admin/backup',
      label: 'Backup Management',
      icon: FolderOpen,
      description: 'Manage question backups',
    },
    {
      href: '/admin/audit-logs',
      label: 'Audit Logs',
      icon: FileText,
      description: 'Monitor admin actions and system events',
    },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/98 dark:bg-gray-900/98 backdrop-blur-lg shadow-xl border-b border-gray-200 dark:border-gray-700'
          : 'bg-gradient-to-r from-red-600 to-red-800'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link
            href="/admin/dashboard"
            className={`flex items-center space-x-3 transition-colors duration-200 ${
              isScrolled
                ? 'text-gray-900 dark:text-white hover:text-red-600 dark:hover:text-red-400'
                : 'text-white hover:text-red-100'
            }`}
          >
            {/* Website Logo */}
            <div className="w-10 h-10 rounded-lg overflow-hidden shadow-lg">
              <img
                src="/Elzatona-web01.png"
                alt="Elzatona Web Logo"
                className="w-full h-full object-contain bg-white dark:bg-gray-800"
                onError={e => {
                  // Fallback to simple icon if image fails to load
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling.style.display = 'flex';
                }}
              />
              <div
                className="w-full h-full bg-white dark:bg-gray-800 flex items-center justify-center"
                style={{ display: 'none' }}
              >
                <span className="text-red-600 dark:text-red-400 font-bold text-lg">
                  E
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold">Admin Panel</span>
              <span className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">
                Elzatona Web
              </span>
            </div>
          </Link>

          {/* Desktop Navigation - Horizontal Menu */}
          <div className="hidden lg:flex items-center space-x-2">
            {adminMenuItems.slice(0, 6).map(item => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-2 px-5 py-3 rounded-lg text-base font-semibold transition-all duration-200 ${
                  isScrolled
                    ? 'text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                    : 'text-white hover:text-red-100 hover:bg-red-700/50'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            ))}

            {/* More Menu Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsAdminDropdownOpen(!isAdminDropdownOpen)}
                className={`flex items-center space-x-2 px-5 py-3 rounded-lg text-base font-semibold transition-all duration-200 ${
                  isScrolled
                    ? 'text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                    : 'text-white hover:text-red-100 hover:bg-red-700/50'
                }`}
              >
                <span>More</span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${isAdminDropdownOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {/* More Dropdown */}
              {isAdminDropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-50">
                  <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                    <p className="text-base font-semibold text-gray-900 dark:text-white">
                      Additional Tools
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      More admin functions
                    </p>
                  </div>

                  {adminMenuItems.slice(6).map(item => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center px-4 py-4 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                      onClick={() => setIsAdminDropdownOpen(false)}
                    >
                      <item.icon className="w-5 h-5 mr-3 text-red-600 dark:text-red-400" />
                      <div>
                        <div className="font-semibold text-base">
                          {item.label}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {item.description}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right side - Theme toggle and User menu */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <ThemeToggle
              size="md"
              className={`${
                isScrolled
                  ? 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                  : 'bg-red-700/20 hover:bg-red-700/30'
              }`}
            />

            {/* User Menu */}
            {user && (
              <div className="relative">
                <button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className={`flex items-center space-x-2 p-2 rounded-md transition-colors duration-200 ${
                    isScrolled
                      ? 'text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                      : 'text-white hover:text-red-100 hover:bg-red-700/50'
                  }`}
                >
                  <User className="w-5 h-5" />
                  <span className="hidden sm:block text-sm font-medium">
                    {user.name || user.email}
                  </span>
                </button>

                {/* User Dropdown */}
                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex items-center space-x-3">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={
                            user.avatar ||
                            `https://ui-avatars.com/api/?name=${
                              user.name || user.email
                            }&background=random`
                          }
                          alt="User Avatar"
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {user.name || 'Admin User'}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {user.email}
                          </p>
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200">
                            {user.role}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="py-1">
                      <Link
                        href="/admin/profile"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                        onClick={() => setIsUserDropdownOpen(false)}
                      >
                        <User className="w-4 h-4 mr-3 text-gray-400" />
                        Profile Settings
                      </Link>

                      <Link
                        href="/admin/settings"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                        onClick={() => setIsUserDropdownOpen(false)}
                      >
                        <Settings className="w-4 h-4 mr-3 text-gray-400" />
                        System Settings
                      </Link>
                    </div>

                    <div className="border-t border-gray-200 dark:border-gray-700 py-1">
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"
                      >
                        <LogOut className="w-4 h-4 mr-3" />
                        Sign Out
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
                  ? 'text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  : 'text-white hover:text-red-100 hover:bg-red-700/50'
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
          <div className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
            <div className="px-4 pt-4 pb-6">
              {/* Quick Actions Grid */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {adminMenuItems.slice(0, 6).map(item => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex flex-col items-center p-4 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    <item.icon className="w-6 h-6 text-red-600 dark:text-red-400 mb-2" />
                    <span className="text-center">{item.label}</span>
                  </Link>
                ))}
              </div>

              {/* Additional Tools */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                  Additional Tools
                </h3>
                <div className="space-y-2">
                  {adminMenuItems.slice(6).map(item => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setIsOpen(false)}
                    >
                      <item.icon className="w-4 h-4 text-red-600 dark:text-red-400" />
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* User Section */}
              {user && (
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                  <div className="flex items-center px-3 py-2 mb-3">
                    <img
                      className="h-8 w-8 rounded-full mr-3"
                      src={
                        user.avatar ||
                        `https://ui-avatars.com/api/?name=${
                          user.name || user.email
                        }&background=random`
                      }
                      alt="User Avatar"
                    />
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {user.name || 'Admin User'}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {user.email}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 w-full px-3 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                  >
                    <LogOut className="w-4 h-4" />
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
