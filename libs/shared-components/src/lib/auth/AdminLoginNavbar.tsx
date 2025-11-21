'use client';

import React from 'react';
import Link from 'next/link';
import { useTheme } from '@elzatona/shared-contexts';
import AlzatonaLogo from '../common/AlzatonaLogo';

export default function AdminLoginNavbar() {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 shadow-lg backdrop-blur-sm border-b-2 ${
        isDarkMode ? 'bg-red-700 border-red-800' : 'bg-red-600 border-red-700/30'
      }`}
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-20 gap-4'>
          {/* Logo */}
          <Link
            href='/'
            className={`flex items-center space-x-2 transition-colors duration-200 flex-shrink-0 ${
              isDarkMode
                ? 'text-white hover:text-red-100'
                : 'text-white hover:text-red-50'
            }`}
            aria-label='Go to home page'
          >
            <AlzatonaLogo size='sm' showText={false} forceDarkMode={false} />
          </Link>

          {/* Center Title - Hidden on mobile, visible on tablet+ */}
          <div className='flex-1 text-center hidden md:block min-w-0'>
            <h1
              className={`text-lg sm:text-xl font-bold truncate ${
                isDarkMode
                  ? 'text-white drop-shadow-sm'
                  : 'text-white drop-shadow-md'
              }`}
            >
              Admin Access Portal
            </h1>
            <p
              className={`text-xs sm:text-sm font-medium truncate ${
                isDarkMode
                  ? 'text-red-50 drop-shadow-sm'
                  : 'text-red-100 drop-shadow-sm'
              }`}
            >
              Secure Authentication Required
            </p>
          </div>

          {/* Right Side Actions */}
          <div className='flex items-center space-x-2 sm:space-x-4 flex-shrink-0'>
            {/* Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md hover:scale-105 active:scale-95 ${
                isDarkMode
                  ? 'bg-white/25 text-white hover:bg-white/35 border border-white/40'
                  : 'bg-white/30 text-white hover:bg-white/40 border border-white/50'
              }`}
              aria-label='Toggle theme'
              title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='20'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='lucide lucide-sun'
                  aria-hidden='true'
                >
                  <circle cx='12' cy='12' r='4'></circle>
                  <path d='M12 2v2'></path>
                  <path d='M12 20v2'></path>
                  <path d='m4.93 4.93 1.41 1.41'></path>
                  <path d='m17.66 17.66 1.41 1.41'></path>
                  <path d='M2 12h2'></path>
                  <path d='M20 12h2'></path>
                  <path d='m6.34 17.66-1.41 1.41'></path>
                  <path d='m19.07 4.93-1.41 1.41'></path>
                </svg>
              ) : (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='20'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='lucide lucide-moon'
                  aria-hidden='true'
                >
                  <path d='M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z'></path>
                </svg>
              )}
            </button>

            {/* Back to Main Site */}
            <Link
              href='/'
              className={`px-3 sm:px-4 py-2 rounded-lg font-semibold transition-all duration-200 hover:scale-105 active:scale-95 text-center shadow-sm hover:shadow-md whitespace-nowrap ${
                isDarkMode
                  ? 'bg-white/25 text-white hover:bg-white/35 border border-white/40'
                  : 'bg-white/30 text-white hover:bg-white/40 border border-white/50'
              }`}
              aria-label='Back to main site'
            >
              <span
                className={`text-xs sm:text-sm font-medium tracking-wide ${
                  isDarkMode ? 'drop-shadow-sm' : 'drop-shadow-md'
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
