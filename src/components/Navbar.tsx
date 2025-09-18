'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, X, Sun, Moon, ChevronDown, User, LogOut } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useFirebaseAuth } from '@/contexts/FirebaseAuthContext';
import AlzatonaLogo from './AlzatonaLogo';

interface DropdownItem {
  href: string;
  label: string;
  icon?: string;
  description?: string;
}

interface DropdownMenu {
  label: string;
  icon: string;
  items: DropdownItem[];
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [screenSize, setScreenSize] = useState<'tablet' | 'laptop' | 'desktop'>(
    'desktop'
  );
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { isAuthenticated, user, signOut } = useFirebaseAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);

  // Dropdown menu data
  const dropdownMenus: DropdownMenu[] = [
    {
      label: 'Learning',
      icon: '📚',
      items: [
        {
          href: '/learning-paths',
          label: 'Learning Paths',
          icon: '🗺️',
          description: 'Structured learning paths for frontend development',
        },
        {
          href: '/tutorials',
          label: 'Tutorials',
          icon: '🎓',
          description: 'Step-by-step tutorials for all skill levels',
        },
        {
          href: '/cheatsheet',
          label: 'Cheat Sheet',
          icon: '📋',
          description: 'Quick reference for frontend best practices',
        },
        {
          href: '/resources',
          label: 'Resources',
          icon: '📖',
          description: 'Curated learning materials and tools',
        },
        {
          href: '/articles',
          label: 'Articles',
          icon: '📰',
          description: 'High-quality frontend development articles',
        },
        {
          href: '/video-courses',
          label: 'Video Courses',
          icon: '🎥',
          description: 'Comprehensive video-based learning content',
        },
        {
          href: '/documentation',
          label: 'Documentation',
          icon: '📚',
          description: 'Official docs and API references',
        },
        {
          href: '/reports',
          label: 'Feature Reports',
          icon: '📊',
          description: 'View all features, development status, and stories',
        },
      ],
    },
    {
      label: 'Practice',
      icon: '💻',
      items: [
        {
          href: '/practice/frontend-challenges',
          label: 'Frontend Challenges',
          icon: '⚡',
          description: 'React, JavaScript, CSS, and DOM challenges',
        },
        {
          href: '/practice/algorithm-problems',
          label: 'Algorithm Problems',
          icon: '🧮',
          description: 'Data structures and algorithm challenges',
        },
        {
          href: '/practice/coding-exercises',
          label: 'Coding Exercises',
          icon: '⌨️',
          description: 'Interactive coding exercises with instant feedback',
        },
        {
          href: '/practice/projects',
          label: 'Projects',
          icon: '🚀',
          description: 'Build real-world projects to showcase your skills',
        },
        {
          href: '/practice/code-reviews',
          label: 'Code Reviews',
          icon: '👀',
          description: 'Review and improve existing code examples',
        },
        {
          href: '/practice/quiz',
          label: 'Quiz & Tests',
          icon: '🧠',
          description: 'Test your knowledge with interactive quizzes',
        },
        {
          href: '/questions/behavioral',
          label: 'Behavioral Questions',
          icon: '🤝',
          description:
            'Practice behavioral interview questions with text input',
        },
        {
          href: '/questions/company-specific',
          label: 'Company-Specific Questions',
          icon: '🏢',
          description: 'Questions tailored for specific companies',
        },
        {
          href: '/flashcards',
          label: 'Interactive Flashcards',
          icon: '🃏',
          description: 'Reinforce learning with spaced repetition',
        },
      ],
    },
    {
      label: 'Interview Prep',
      icon: '🎯',
      items: [
        {
          href: '/mock-interviews',
          label: 'Mock Interviews',
          icon: '🎬',
          description: 'Video mock interviews and practice sessions',
        },
        {
          href: '/ai-mock-interview',
          label: 'AI Mock Interview',
          icon: '🤖',
          description:
            'Practice with AI interviewer and get real-time feedback',
        },
        {
          href: '/culture-fit-interviews',
          label: 'Culture Fit Questions',
          icon: '🌟',
          description:
            'Master culture fit questions and demonstrate your values',
        },
        {
          href: '/preparation-guides',
          label: 'Preparation Guides',
          icon: '📖',
          description: 'Comprehensive interview preparation guides',
        },
      ],
    },
    {
      label: 'Media',
      icon: '🎧',
      items: [
        {
          href: '/podcasts',
          label: 'Podcasts',
          icon: '🎧',
          description: 'Tech podcasts and audio content',
        },
      ],
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setScreenSize('desktop');
      } else if (width >= 768) {
        setScreenSize('laptop');
      } else {
        setScreenSize('tablet');
      }
    };

    // Set initial screen size
    handleResize();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
      // Prevent scroll on touch devices
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      // Restore body scroll
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [isOpen]);

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown(null);
      }
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target as Node)
      ) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle escape key to close mobile menu
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [isOpen]);

  const toggleDropdown = (dropdownLabel: string) => {
    setActiveDropdown(activeDropdown === dropdownLabel ? null : dropdownLabel);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-gray-200 dark:border-gray-700'
          : 'bg-gradient-to-r from-blue-600 to-blue-800'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link
            href="/"
            className={`flex items-center space-x-2 transition-colors duration-200 ${
              isScrolled
                ? 'text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400'
                : 'text-white hover:text-blue-100'
            }`}
          >
            <AlzatonaLogo size="sm" showText={false} />
          </Link>

          {/* Desktop Navigation with Dropdowns */}
          <div
            className="hidden md:flex items-center space-x-2 lg:space-x-3 xl:space-x-4"
            ref={dropdownRef}
          >
            {/* Show limited menus based on screen size */}
            {dropdownMenus
              .slice(
                0,
                screenSize === 'desktop' ? 4 : screenSize === 'laptop' ? 3 : 2
              )
              .map(menu => (
                <div key={menu.label} className="relative">
                  <button
                    onClick={() => toggleDropdown(menu.label)}
                    className={`flex items-center space-x-1 md:space-x-2 px-2 md:px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 relative group font-medium ${
                      isScrolled
                        ? 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                        : 'text-white hover:text-blue-100 hover:bg-blue-700/50'
                    } ${
                      activeDropdown === menu.label
                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                        : ''
                    }`}
                  >
                    <span className="text-base md:text-lg">{menu.icon}</span>
                    <span className="font-medium text-xs md:text-sm hidden md:inline">
                      {menu.label}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        activeDropdown === menu.label ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {activeDropdown === menu.label && (
                    <div className="absolute top-full left-0 mt-2 w-80 md:w-96 lg:w-96 xl:w-96 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 py-3 z-50 animate-in slide-in-from-top-2 duration-200 md:left-0 lg:left-0 xl:left-0 right-auto md:right-auto lg:right-auto xl:right-auto">
                      {/* Parent Section Header */}
                      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-t-xl">
                        <h3 className="font-bold text-gray-900 dark:text-white flex items-center text-base lg:text-lg">
                          <span className="mr-2 lg:mr-3 text-lg lg:text-xl">
                            {menu.icon}
                          </span>
                          {menu.label}
                          <span className="ml-1 lg:ml-2 text-xs bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full">
                            {menu.items.length} items
                          </span>
                        </h3>
                        <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-400 mt-1 ml-6 lg:ml-8">
                          Explore all {menu.label.toLowerCase()} resources
                        </p>
                      </div>

                      {/* Child Items */}
                      <div className="py-2 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
                        {menu.items.map((item, index) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-start px-3 lg:px-4 py-2 lg:py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 group border-l-2 border-transparent hover:border-blue-400 dark:hover:border-blue-500"
                            onClick={() => setActiveDropdown(null)}
                          >
                            <span className="text-base lg:text-lg mr-2 lg:mr-3 group-hover:scale-110 transition-transform duration-200 flex-shrink-0">
                              {item.icon}
                            </span>
                            <div className="flex-1 min-w-0">
                              <div className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 flex items-center text-sm lg:text-base">
                                {item.label}
                                <span className="ml-1 lg:ml-2 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-1 lg:px-2 py-0.5 rounded-full">
                                  #{index + 1}
                                </span>
                              </div>
                              <div className="text-xs lg:text-sm text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                                {item.description}
                              </div>
                            </div>
                            {/* Arrow indicator */}
                            <div className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                              <ChevronDown className="w-4 h-4 text-gray-400 rotate-[-90deg]" />
                            </div>
                          </Link>
                        ))}
                      </div>

                      {/* Footer */}
                      <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 rounded-b-xl">
                        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                          💡 Click any item to explore{' '}
                          {menu.label.toLowerCase()} content
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}

            {/* More Dropdown - Show when there are hidden menus or Job Aggregator */}
            {(dropdownMenus.length >
              (screenSize === 'desktop'
                ? 4
                : screenSize === 'laptop'
                  ? 3
                  : 2) ||
              screenSize !== 'desktop') && (
              <div className="relative">
                <button
                  onClick={() => toggleDropdown('More')}
                  className={`flex items-center space-x-1 md:space-x-2 px-2 md:px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 relative group font-medium ${
                    isScrolled
                      ? 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                      : 'text-white hover:text-blue-100 hover:bg-blue-700/50'
                  } ${
                    activeDropdown === 'More'
                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                      : ''
                  }`}
                >
                  <span className="text-base md:text-lg">⚡</span>
                  <span className="font-medium text-xs md:text-sm hidden md:inline">
                    More
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      activeDropdown === 'More' ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* More Dropdown Menu */}
                {activeDropdown === 'More' && (
                  <div className="absolute top-full left-0 mt-2 w-80 md:w-96 lg:w-96 xl:w-96 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 py-3 z-50 animate-in slide-in-from-top-2 duration-200 md:left-0 lg:left-0 xl:left-0 right-auto md:right-auto lg:right-auto xl:right-auto">
                    {/* More Section Header */}
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-t-xl">
                      <h3 className="font-bold text-gray-900 dark:text-white flex items-center text-base lg:text-lg">
                        <span className="mr-2 lg:mr-3 text-lg lg:text-xl">
                          ⚡
                        </span>
                        More Features
                        <span className="ml-1 lg:ml-2 text-xs bg-purple-100 dark:bg-purple-800 text-purple-700 dark:text-purple-300 px-2 py-1 rounded-full">
                          {dropdownMenus.slice(
                            screenSize === 'desktop'
                              ? 4
                              : screenSize === 'laptop'
                                ? 3
                                : 2
                          ).length + (screenSize !== 'desktop' ? 1 : 0)}{' '}
                          items
                        </span>
                      </h3>
                      <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-400 mt-1 ml-6 lg:ml-8">
                        Additional features and resources
                      </p>
                    </div>

                    {/* Hidden Menu Items */}
                    <div className="py-2 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
                      {/* Job Aggregator - Special section */}
                      <div className="px-3 lg:px-4 py-2 lg:py-3 mb-2">
                        <Link
                          href="/jobs"
                          className="flex items-center px-3 py-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 hover:from-green-100 hover:to-emerald-100 dark:hover:from-green-900/30 dark:hover:to-emerald-900/30 transition-all duration-200 group border-l-4 border-transparent hover:border-green-400 dark:hover:border-green-500 rounded-lg shadow-sm hover:shadow-md"
                          onClick={() => setActiveDropdown(null)}
                        >
                          <span className="text-2xl mr-3 group-hover:scale-110 transition-transform duration-200 flex-shrink-0">
                            💼
                          </span>
                          <div className="flex-1">
                            <div className="font-bold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-200 text-sm lg:text-base">
                              Job Aggregator
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              Find frontend development jobs from multiple
                              sources
                            </div>
                          </div>
                          <div className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <ChevronDown className="w-4 h-4 text-gray-400 rotate-[-90deg]" />
                          </div>
                        </Link>
                      </div>

                      {/* Divider */}
                      <div className="mx-3 my-2 border-t border-gray-200 dark:border-gray-700"></div>

                      {dropdownMenus
                        .slice(
                          screenSize === 'desktop'
                            ? 4
                            : screenSize === 'laptop'
                              ? 3
                              : 2
                        )
                        .map((menu, index) => (
                          <div
                            key={menu.label}
                            className="px-3 lg:px-4 py-2 lg:py-3"
                          >
                            {/* Sub-menu Header */}
                            <div className="flex items-center mb-2 px-2 py-1 bg-gray-50 dark:bg-gray-700 rounded-lg">
                              <span className="text-base lg:text-lg mr-2 lg:mr-3">
                                {menu.icon}
                              </span>
                              <div className="flex-1">
                                <div className="font-semibold text-gray-900 dark:text-white text-sm lg:text-base">
                                  {menu.label}
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                  {menu.items.length} items
                                </div>
                              </div>
                            </div>

                            {/* Sub-menu Items */}
                            <div className="ml-4 space-y-1">
                              {menu.items.slice(0, 3).map((item, itemIndex) => (
                                <Link
                                  key={item.href}
                                  href={item.href}
                                  className="flex items-start px-2 py-1 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 group border-l-2 border-transparent hover:border-purple-400 dark:hover:border-purple-500 rounded"
                                  onClick={() => setActiveDropdown(null)}
                                >
                                  <span className="text-sm mr-2 group-hover:scale-110 transition-transform duration-200 flex-shrink-0">
                                    {item.icon}
                                  </span>
                                  <div className="flex-1 min-w-0">
                                    <div className="font-medium text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-200 text-xs lg:text-sm">
                                      {item.label}
                                    </div>
                                  </div>
                                </Link>
                              ))}
                              {menu.items.length > 3 && (
                                <div className="text-xs text-gray-500 dark:text-gray-400 px-2 py-1">
                                  +{menu.items.length - 3} more items
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                    </div>

                    {/* Footer */}
                    <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 rounded-b-xl">
                      <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                        💡 Click any item to explore more features
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Job Aggregator - Show on desktop only, hide on tablet/laptop */}
            {screenSize === 'desktop' && (
              <Link
                href="/jobs"
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 font-medium ${
                  isScrolled
                    ? 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                    : 'text-white hover:text-blue-100 hover:bg-blue-700/50'
                }`}
              >
                <span className="text-lg">💼</span>
                <span className="text-sm">Job Aggregator</span>
              </Link>
            )}

            {/* User Dropdown or Auth Button */}
            {isAuthenticated ? (
              <div className="relative" ref={userDropdownRef}>
                <button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className={`p-2 rounded-lg transition-colors duration-200 ${
                    isScrolled
                      ? 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                      : 'bg-white/20 text-white hover:bg-white/30 border border-white/30'
                  }`}
                  aria-label="User menu"
                >
                  <User size={20} />
                </button>

                {/* User Dropdown Menu */}
                {isUserDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-52 md:w-56 lg:w-64 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 py-3 z-50 animate-in slide-in-from-top-2 duration-200">
                    {/* User Info Header */}
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-t-xl">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                          {user?.displayName?.charAt(0) ||
                            user?.email?.charAt(0) ||
                            'U'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p
                            className="text-sm font-semibold text-gray-900 dark:text-white truncate"
                            title={user?.displayName || user?.email || 'User'}
                          >
                            {user?.displayName || user?.email || 'User'}
                          </p>
                          <p
                            className="text-xs text-gray-500 dark:text-gray-400 truncate"
                            title={user?.email}
                          >
                            {user?.email}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      <Link
                        href="/dashboard"
                        className="flex items-center px-3 lg:px-4 py-2 lg:py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 group border-l-2 border-transparent hover:border-blue-400 dark:hover:border-blue-500"
                        onClick={() => setIsUserDropdownOpen(false)}
                      >
                        <span className="mr-2 lg:mr-3 text-base lg:text-lg group-hover:scale-110 transition-transform duration-200">
                          📊
                        </span>
                        <div className="flex-1">
                          <div className="font-medium text-sm lg:text-base">
                            Dashboard
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            View your progress
                          </div>
                        </div>
                      </Link>

                      <Link
                        href="/flashcards"
                        className="flex items-center px-3 lg:px-4 py-2 lg:py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-200 group border-l-2 border-transparent hover:border-purple-400 dark:hover:border-purple-500"
                        onClick={() => setIsUserDropdownOpen(false)}
                      >
                        <span className="mr-2 lg:mr-3 text-base lg:text-lg group-hover:scale-110 transition-transform duration-200">
                          🃏
                        </span>
                        <div className="flex-1">
                          <div className="font-medium text-sm lg:text-base">
                            Flashcards
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            Review saved questions
                          </div>
                        </div>
                      </Link>
                    </div>

                    {/* Sign Out Section */}
                    <div className="border-t border-gray-200 dark:border-gray-700 mt-2 pt-2">
                      <button
                        onClick={() => {
                          signOut();
                          setIsUserDropdownOpen(false);
                        }}
                        className="flex items-center w-full px-3 lg:px-4 py-2 lg:py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 group border-l-2 border-transparent hover:border-red-400 dark:hover:border-red-500"
                      >
                        <LogOut
                          size={16}
                          className="mr-2 lg:mr-3 group-hover:scale-110 transition-transform duration-200"
                        />
                        <div className="flex-1 text-left">
                          <div className="font-medium text-sm lg:text-base">
                            Sign Out
                          </div>
                          <div className="text-xs text-red-500 dark:text-red-400">
                            End your session
                          </div>
                        </div>
                      </button>
                    </div>

                    {/* Footer */}
                    <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 rounded-b-xl">
                      <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                        💡 Click outside to close
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/auth"
                className={`px-3 md:px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 text-center ${
                  isScrolled
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-green-500 text-white hover:bg-green-600'
                }`}
              >
                <span className="hidden md:inline text-sm">Save Progress</span>
                <span className="md:hidden text-xs">Save</span>
              </Link>
            )}
          </div>

          {/* Theme Toggle */}
          <div className="flex items-center space-x-2 md:space-x-3 lg:space-x-4 xl:space-x-6">
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                isScrolled
                  ? 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  : 'bg-white/20 text-white hover:bg-white/30 border border-white/30'
              }`}
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`md:hidden p-2 rounded-lg transition-colors duration-200 ${
                isScrolled
                  ? 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  : 'bg-white/20 text-white hover:bg-white/30 border border-white/30'
              }`}
              aria-label="Toggle mobile menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation - Full Screen Overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 top-16 bg-white dark:bg-gray-900 z-40 overflow-hidden animate-in slide-in-from-top-4 duration-300"
          onClick={e => {
            // Close menu when clicking on the backdrop (not on content)
            if (e.target === e.currentTarget) {
              setIsOpen(false);
            }
          }}
        >
          <div className="flex flex-col h-full">
            {/* User Section - Right after logo */}
            <div className="px-4 pt-4 pb-2">
              {isAuthenticated ? (
                <div className="space-y-2">
                  {/* User Info */}
                  <div className="px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <p
                      className="text-sm font-medium text-gray-900 dark:text-white truncate"
                      title={user?.displayName || user?.email || 'User'}
                    >
                      {user?.displayName || user?.email || 'User'}
                    </p>
                    <p
                      className="text-xs text-gray-500 dark:text-gray-400 truncate"
                      title={user?.email}
                    >
                      {user?.email}
                    </p>
                  </div>

                  {/* Dashboard Link */}
                  <Link
                    href="/dashboard"
                    className="block w-full px-4 py-3 rounded-lg text-base font-medium transition-colors bg-blue-600 text-white hover:bg-blue-700 text-center"
                    onClick={() => setIsOpen(false)}
                  >
                    📊 Dashboard
                  </Link>

                  {/* Flashcards Link */}
                  <Link
                    href="/flashcards"
                    className="block w-full px-4 py-3 rounded-lg text-base font-medium transition-colors bg-purple-600 text-white hover:bg-purple-700 text-center"
                    onClick={() => setIsOpen(false)}
                  >
                    🃏 Flashcards
                  </Link>

                  {/* Sign Out Button */}
                  <button
                    onClick={() => {
                      signOut();
                      setIsOpen(false);
                    }}
                    className="block w-full px-4 py-3 rounded-lg text-base font-medium transition-colors bg-red-600 text-white hover:bg-red-700 text-center"
                  >
                    🚪 Sign Out
                  </button>
                </div>
              ) : (
                <Link
                  href="/auth"
                  className="block w-full px-4 py-3 rounded-lg text-base font-medium transition-colors bg-green-600 text-white hover:bg-green-700 text-center"
                  onClick={() => setIsOpen(false)}
                >
                  Save Progress
                </Link>
              )}
            </div>

            {/* Navigation Links - Scrollable Container */}
            <div
              className="flex-1 px-4 pt-4 space-y-6 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent"
              style={{ touchAction: 'pan-y' }}
            >
              {dropdownMenus.map((menu, index) => (
                <div key={menu.label}>
                  <div className="space-y-2">
                    {/* Parent Section Header */}
                    <div className="flex items-center px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200 dark:border-blue-800 shadow-md">
                      <span className="text-3xl mr-4">{menu.icon}</span>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                          {menu.label}
                          <span className="ml-3 text-sm bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full font-semibold">
                            {menu.items.length} items
                          </span>
                        </h3>
                        <p className="text-base text-gray-600 dark:text-gray-400 mt-1">
                          Explore all {menu.label.toLowerCase()} resources
                        </p>
                      </div>
                    </div>

                    {/* Child Items */}
                    <div className="pl-4 space-y-1">
                      {menu.items.map((item, itemIndex) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block px-5 py-4 rounded-xl text-lg font-semibold transition-all duration-300 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 border-l-4 border-transparent hover:border-blue-400 dark:hover:border-blue-500 shadow-sm hover:shadow-md hover:scale-105"
                          onClick={() => setIsOpen(false)}
                        >
                          <div className="flex items-center">
                            <span className="text-2xl mr-4 flex-shrink-0">
                              {item.icon}
                            </span>
                            <div className="flex-1">
                              <div className="font-bold flex items-center text-lg">
                                {item.label}
                                <span className="ml-3 text-sm bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-3 py-1 rounded-full font-semibold">
                                  #{itemIndex + 1}
                                </span>
                              </div>
                              <div className="text-base text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">
                                {item.description}
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Divider after each section (except the last one) */}
                  {index < dropdownMenus.length - 1 && (
                    <div className="my-6 border-t border-gray-200 dark:border-gray-700"></div>
                  )}
                </div>
              ))}

              {/* Job Aggregator - Standalone Link */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <Link
                  href="/jobs"
                  className="block px-4 py-4 rounded-lg text-lg font-medium transition-colors text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                  onClick={() => setIsOpen(false)}
                >
                  💼 Job Aggregator
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
