'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, X, Sun, Moon, ChevronDown } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import ZatonaLogo from './ZatonaLogo';

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
  const { isDarkMode, toggleDarkMode } = useTheme();
  const dropdownRef = useRef<HTMLDivElement>(null);

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

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown(null);
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
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            href="/"
            className={`flex items-center space-x-2 transition-colors duration-200 ${
              isScrolled
                ? 'text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400'
                : 'text-white hover:text-blue-100'
            }`}
          >
            <ZatonaLogo size="sm" showText={true} />
          </Link>

          {/* Desktop Navigation with Dropdowns */}
          <div
            className="hidden md:flex items-center space-x-6"
            ref={dropdownRef}
          >
            {dropdownMenus.map(menu => (
              <div key={menu.label} className="relative">
                <button
                  onClick={() => toggleDropdown(menu.label)}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-200 hover:scale-105 ${
                    isScrolled
                      ? 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                      : 'text-white hover:text-blue-100 hover:bg-blue-700/50'
                  }`}
                >
                  <span>{menu.icon}</span>
                  <span className="font-medium">{menu.label}</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      activeDropdown === menu.label ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {activeDropdown === menu.label && (
                  <div className="absolute top-full left-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                      <h3 className="font-semibold text-gray-900 dark:text-white flex items-center">
                        <span className="mr-2">{menu.icon}</span>
                        {menu.label}
                      </h3>
                    </div>
                    <div className="py-2">
                      {menu.items.map(item => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="flex items-start px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 group"
                          onClick={() => setActiveDropdown(null)}
                        >
                          <span className="text-lg mr-3 group-hover:scale-110 transition-transform duration-200">
                            {item.icon}
                          </span>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                              {item.label}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                              {item.description}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Job Aggregator - Standalone Link */}
            <Link
              href="/jobs"
              className={`nav-link transition-all duration-200 hover:scale-105 px-3 py-2 rounded-lg ${
                isScrolled
                  ? 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                  : 'text-white hover:text-blue-100 hover:bg-blue-700/50'
              }`}
            >
              💼 Job Aggregator
            </Link>

            <Link
              href="/auth"
              className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                isScrolled
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-white text-blue-600 hover:bg-blue-50'
              }`}
            >
              <span className="hidden lg:inline">Save Progress</span>
              <span className="lg:hidden">Save</span>
            </Link>
          </div>

          {/* Theme Toggle */}
          <div className="flex items-center space-x-4">
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
            {/* Save Progress Button - Right after logo */}
            <div className="px-4 pt-4 pb-2">
              <Link
                href="/auth"
                className="block w-full px-4 py-3 rounded-lg text-base font-medium transition-colors bg-blue-600 text-white hover:bg-blue-700 text-center"
                onClick={() => setIsOpen(false)}
              >
                💾 Save Progress
              </Link>
            </div>

            {/* Navigation Links - Scrollable Container */}
            <div
              className="flex-1 px-4 pt-4 space-y-6 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent"
              style={{ touchAction: 'pan-y' }}
            >
              {dropdownMenus.map(menu => (
                <div key={menu.label} className="space-y-2">
                  <div className="flex items-center px-4 py-2">
                    <span className="text-xl mr-3">{menu.icon}</span>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {menu.label}
                    </h3>
                  </div>
                  <div className="pl-8 space-y-1">
                    {menu.items.map(item => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block px-4 py-3 rounded-lg text-base font-medium transition-colors text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                        onClick={() => setIsOpen(false)}
                      >
                        <div className="flex items-center">
                          <span className="text-lg mr-3">{item.icon}</span>
                          <div>
                            <div className="font-medium">{item.label}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {item.description}
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
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
