'use client';

import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className='bg-white dark:bg-gray-900 shadow-lg'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between h-16'>
          <div className='flex items-center'>
            <Link href='/' className='flex items-center'>
              <div className='w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-3'>
                <span className='text-white font-bold text-sm'>E</span>
              </div>
              <span className='text-xl font-bold text-gray-900 dark:text-white'>
                Elzatona
              </span>
            </Link>
          </div>

          <div className='flex items-center space-x-4'>
            <Link
              href='/features/guided-learning'
              className='text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            >
              Guided Learning
            </Link>
            <Link
              href='/practice'
              className='text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            >
              Practice
            </Link>
            <Link
              href='/questions'
              className='text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            >
              Questions
            </Link>
            <Link
              href='/resources'
              className='text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            >
              Resources
            </Link>

            {/* Simple Dark Mode Toggle */}
            <button
              onClick={() => {
                const html = document.documentElement;
                const isDark = html.classList.contains('dark');
                if (isDark) {
                  html.classList.remove('dark');
                  localStorage.setItem('theme', 'light');
                } else {
                  html.classList.add('dark');
                  localStorage.setItem('theme', 'dark');
                }
              }}
              className='w-10 h-10 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors'
              aria-label='Toggle dark mode'
            >
              <svg
                className='w-5 h-5 text-gray-700 dark:text-gray-300'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z'
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
