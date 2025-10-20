'use client';

import React from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

import Link from 'next/link';
import { useTheme } from '@elzatona/shared-contexts';
import AlzatonaLogo from '../common/AlzatonaLogo';

export default function AdminLoginNavbar() {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <nav className='fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-gradient-to-r from-red-600 to-red-800 shadow-lg'>
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
