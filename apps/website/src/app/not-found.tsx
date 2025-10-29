import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 pt-24 pb-12'>
      <div className='text-center px-4'>
        <h1 className='text-6xl font-bold text-gray-900 dark:text-white mb-6'>
          404
        </h1>
        <h2 className='text-3xl font-semibold text-gray-700 dark:text-gray-300 mb-4'>
          Page Not Found
        </h2>
        <p className='text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto'>
          Oops! It looks like you&apos;ve wandered off the beaten path. The page
          you&apos;re looking for doesn&apos;t exist.
        </p>
      </div>

      <div className='mt-6 flex flex-col items-center gap-4'>
        <Link
          href='/'
          className='inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200'
        >
          Go Home
        </Link>

        <div className='text-sm text-gray-600 dark:text-gray-400'>
          <p>Or jump into a learning mode:</p>
          <div className='flex flex-wrap justify-center gap-4 mt-3'>
            <Link
              href='/features/guided-learning'
              className='px-4 py-2 rounded-md bg-white/80 dark:bg-gray-800/60 border border-white/30 dark:border-gray-700/30 text-indigo-700 dark:text-indigo-300 hover:bg-white/90 dark:hover:bg-gray-800/80 transition'
            >
              Guided Learning
            </Link>
            <Link
              href='/free-style'
              className='px-4 py-2 rounded-md bg-white/80 dark:bg-gray-800/60 border border-white/30 dark:border-gray-700/30 text-emerald-700 dark:text-emerald-300 hover:bg-white/90 dark:hover:bg-gray-800/80 transition'
            >
              Free Style
            </Link>
            <Link
              href='/dashboard'
              className='px-4 py-2 rounded-md bg-white/80 dark:bg-gray-800/60 border border-white/30 dark:border-gray-700/30 text-gray-800 dark:text-gray-200 hover:bg-white/90 dark:hover:bg-gray-800/80 transition'
            >
              Dashboard
            </Link>
            <Link
              href='/browse-practice-questions'
              className='px-4 py-2 rounded-md bg-white/80 dark:bg-gray-800/60 border border-white/30 dark:border-gray-700/30 text-blue-700 dark:text-blue-300 hover:bg-white/90 dark:hover:bg-gray-800/80 transition'
            >
              Browse Questions
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
