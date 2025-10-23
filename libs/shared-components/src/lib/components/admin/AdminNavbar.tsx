'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
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
} from 'lucide-react';
import { useAdminAuth, useTheme } from '@elzatona/shared-contexts';
import AlzatonaLogo from '../../common/AlzatonaLogo';

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

  // Prevent hydration mismatch by only using theme after client-side hydration
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Check if we're on the login page
  const isLoginPage = pathname === '/admin/login';

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
    logout();
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
      href: '/admin/content-management',
      label: 'Content Management',
      icon: Settings,
      description:
        'Comprehensive admin interface for managing learning content',
    },
    {
      href: '/admin/frontend-tasks',
      label: 'Frontend Tasks',
      icon: Code,
      description: 'Create and manage React/frontend coding challenges',
    },
    {
      href: '/admin/problem-solving',
      label: 'Problem Solving',
      icon: Calculator,
      description: 'Create and manage algorithmic coding challenges',
    },
    {
      href: '/admin/reports',
      label: 'Feature Reports',
      icon: BarChart3,
      description: 'View project features and progress',
    },
  ];

  // Simple navbar for login page - matching the UI from feat/seed-questions-to-firebase branch
  if (isLoginPage) {
    return (
      <nav
        className='fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-gradient-to-r from-red-600 to-red-800 shadow-lg'
        suppressHydrationWarning
      >
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center h-20'>
            {/* Logo */}
            <Link
              href='/'
              className='flex items-center space-x-2 transition-colors duration-200 text-white hover:text-red-100'
            >
              <AlzatonaLogo size='sm' showText={false} forceDarkMode={false} />
            </Link>

            {/* Center Title */}
            <div className='flex-1 text-center'>
              <h1 className='text-xl font-bold text-white'>
                Admin Access Portal
              </h1>
              <p className='text-sm text-red-100'>
                Secure Authentication Required
              </p>
            </div>

            {/* Right Side Actions */}
            <div className='flex items-center space-x-4'>
              {/* Theme Toggle */}
              <button
                onClick={toggleDarkMode}
                className='p-2 rounded-lg transition-colors duration-200 bg-white/20 text-white hover:bg-white/30 border border-white/30'
                aria-label='Toggle theme'
                suppressHydrationWarning
              >
                {isClient && isDarkMode ? (
                  <Sun className='w-5 h-5' />
                ) : (
                  <Moon className='w-5 h-5' />
                )}
              </button>

              {/* Back to Main Site */}
              <Link
                href='/'
                className='px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 text-center bg-white/20 text-white hover:bg-white/30 border border-white/30'
              >
                <span className='text-sm'>Back to Site</span>
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
          ? 'bg-white/98 dark:bg-gray-900/98 backdrop-blur-lg shadow-xl border-b border-gray-200 dark:border-gray-700'
          : 'bg-gradient-to-r from-red-600 to-red-800'
      }`}
    >
      <div className='w-full px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          {/* Left side - Logo and User Profile */}
          <div className='flex items-center space-x-4'>
            {/* Logo */}
            <Link
              href='/admin/dashboard'
              className={`flex items-center space-x-2 transition-colors duration-200 ${
                isScrolled
                  ? 'text-gray-900 dark:text-white hover:text-red-600 dark:hover:text-red-400'
                  : 'text-white hover:text-red-100'
              }`}
            >
              <AlzatonaLogo
                size='sm'
                showText={false}
                forceDarkMode={!isScrolled}
              />
              <span className='text-lg font-bold'>Admin</span>
            </Link>

            {/* User Profile Dropdown */}
            {isAuthenticated && user && (
              <div className='relative'>
                <button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className={`flex items-center space-x-2 p-2 rounded-md transition-colors duration-200 ${
                    isScrolled
                      ? 'text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                      : 'text-white hover:text-red-100 hover:bg-red-700/50'
                  }`}
                >
                  <User className='w-5 h-5' />
                  <span className='hidden sm:block text-sm font-medium'>
                    {user.email}
                  </span>
                  <ChevronDown className='w-4 h-4' />
                </button>

                {/* User Dropdown */}
                {isUserDropdownOpen && (
                  <div className='absolute left-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50'>
                    <div className='px-4 py-2 border-b border-gray-200 dark:border-gray-700'>
                      <p className='text-sm font-medium text-gray-900 dark:text-white truncate'>
                        {user.email}
                      </p>
                      <p className='text-xs text-gray-500 dark:text-gray-400 capitalize'>
                        Role: {user.role}
                      </p>
                    </div>

                    <Link
                      href='/admin/profile'
                      className='flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      onClick={() => setIsUserDropdownOpen(false)}
                    >
                      <User className='w-4 h-4 mr-2' />
                      Profile
                    </Link>

                    <Link
                      href='/admin/settings'
                      className='flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      onClick={() => setIsUserDropdownOpen(false)}
                    >
                      <Settings className='w-4 h-4 mr-2' />
                      Settings
                    </Link>

                    <div className='border-t border-gray-200 dark:border-gray-700'>
                      <button
                        onClick={handleLogout}
                        className='flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                      >
                        <LogOut className='w-4 h-4 mr-2' />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Desktop Navigation - Single Dropdown */}
          <div className='hidden md:flex items-center'>
            <div className='relative'>
              <button
                onClick={() => setIsAdminDropdownOpen(!isAdminDropdownOpen)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isScrolled
                    ? 'text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                    : 'text-white hover:text-red-100 hover:bg-red-700/50'
                }`}
              >
                <Shield className='w-4 h-4' />
                <span>Admin Panel</span>
                <ChevronDown className='w-4 h-4' />
              </button>

              {/* Admin Dropdown */}
              {isAdminDropdownOpen && (
                <div className='absolute right-0 mt-2 w-80 max-w-[90vw] bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50 max-h-[80vh] overflow-y-auto'>
                  <div className='px-4 py-2 border-b border-gray-200 dark:border-gray-700'>
                    <p className='text-sm font-medium text-gray-900 dark:text-white'>
                      Admin Panel
                    </p>
                    <p className='text-xs text-gray-500 dark:text-gray-400'>
                      Manage your application
                    </p>
                  </div>

                  <div className='grid grid-cols-1 gap-1'>
                    {adminMenuItems.map(item => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className='flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200'
                        onClick={() => setIsAdminDropdownOpen(false)}
                      >
                        <item.icon className='w-4 h-4 mr-3 text-red-600 dark:text-red-400 flex-shrink-0' />
                        <div className='min-w-0'>
                          <div className='font-medium truncate'>
                            {item.label}
                          </div>
                          <div className='text-xs text-gray-500 dark:text-gray-400 truncate'>
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

          {/* Right side - Mobile menu button */}
          <div className='flex items-center space-x-4'>
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
                <X className='w-6 h-6' />
              ) : (
                <Menu className='w-6 h-6' />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className='md:hidden max-h-[70vh] overflow-y-auto'>
            <div className='px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700'>
              {/* Admin Panel Section */}
              <div className='px-3 py-2 border-b border-gray-200 dark:border-gray-700 mb-2'>
                <p className='text-sm font-medium text-gray-900 dark:text-white'>
                  Admin Panel
                </p>
                <p className='text-xs text-gray-500 dark:text-gray-400'>
                  Manage your application
                </p>
              </div>

              <div className='grid grid-cols-1 gap-1'>
                {adminMenuItems.map(item => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className='flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                    onClick={() => setIsOpen(false)}
                  >
                    <item.icon className='w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0' />
                    <div className='min-w-0'>
                      <div className='font-medium truncate'>{item.label}</div>
                      <div className='text-xs text-gray-500 dark:text-gray-400 truncate'>
                        {item.description}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {isAuthenticated && user && (
                <div className='border-t border-gray-200 dark:border-gray-700 pt-2 mt-2'>
                  <div className='px-3 py-2'>
                    <p className='text-sm font-medium text-gray-900 dark:text-white truncate'>
                      {user.email}
                    </p>
                    <p className='text-xs text-gray-500 dark:text-gray-400 capitalize'>
                      Role: {user.role}
                    </p>
                  </div>

                  <button
                    onClick={handleLogout}
                    className='flex items-center space-x-2 w-full px-3 py-2 text-base font-medium text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                  >
                    <LogOut className='w-5 h-5' />
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
