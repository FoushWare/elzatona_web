import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800'>
      <div className='text-center'>
        <h1 className='text-6xl font-bold text-gray-900 dark:text-white mb-6'>
          404
        </h1>
        <h2 className='text-3xl font-semibold text-gray-700 dark:text-gray-300 mb-4'>
          Page Not Found
        </h2>
        <p className='text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto'>
          Oops! It looks like you&apos;ve wandered off the beaten path. The page
          you&apos;re looking for doesn&apos;t exist.
        </p>
      </div>

      <div className='space-y-4'>
        <Link
          href='/'
          className='inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200'
        >
          Go Home
        </Link>

        <div className='text-sm text-gray-500 dark:text-gray-400'>
          <p>Or try one of these popular pages:</p>
          <div className='flex flex-wrap justify-center gap-4 mt-3'>
            <Link
              href='/practice'
              className='text-blue-600 dark:text-blue-400 hover:underline'
            >
              Practice
            </Link>
            <Link
              href='/coding'
              className='text-blue-600 dark:text-blue-400 hover:underline'
            >
              Coding Challenges
            </Link>
            <Link
              href='/preparation-guides'
              className='text-blue-600 dark:text-blue-400 hover:underline'
            >
              Preparation Guides
            </Link>
            <Link
              href='/learning-paths'
              className='text-blue-600 dark:text-blue-400 hover:underline'
            >
              Learning Paths
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
