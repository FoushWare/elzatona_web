'use client';

export default function FrontendTasksPage() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='mb-8'>
          <h1 className='text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
            💻 Frontend Tasks
          </h1>
          <p className='text-gray-600 dark:text-gray-400 mt-2 text-lg'>
            Create and manage React/frontend coding challenges
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
          <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 group'>
            <div className='text-center'>
              <div className='text-4xl mb-4'>⚛️</div>
              <h3 className='text-xl font-bold text-gray-900 dark:text-white mb-2'>
                React Tasks
              </h3>
              <p className='text-gray-600 dark:text-gray-400 mb-4'>
                Component and hook challenges
              </p>
              <div className='text-3xl font-bold text-blue-600 dark:text-blue-400'>
                0
              </div>
            </div>
          </div>

          <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 group'>
            <div className='text-center'>
              <div className='text-4xl mb-4'>🎨</div>
              <h3 className='text-xl font-bold text-gray-900 dark:text-white mb-2'>
                CSS Tasks
              </h3>
              <p className='text-gray-600 dark:text-gray-400 mb-4'>
                Styling and layout challenges
              </p>
              <div className='text-3xl font-bold text-green-600 dark:text-green-400'>
                0
              </div>
            </div>
          </div>

          <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 group'>
            <div className='text-center'>
              <div className='text-4xl mb-4'>🔧</div>
              <h3 className='text-xl font-bold text-gray-900 dark:text-white mb-2'>
                JavaScript Tasks
              </h3>
              <p className='text-gray-600 dark:text-gray-400 mb-4'>
                DOM manipulation and events
              </p>
              <div className='text-3xl font-bold text-yellow-600 dark:text-yellow-400'>
                0
              </div>
            </div>
          </div>

          <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 group'>
            <div className='text-center'>
              <div className='text-4xl mb-4'>📱</div>
              <h3 className='text-xl font-bold text-gray-900 dark:text-white mb-2'>
                Responsive Tasks
              </h3>
              <p className='text-gray-600 dark:text-gray-400 mb-4'>
                Mobile-first design challenges
              </p>
              <div className='text-3xl font-bold text-purple-600 dark:text-purple-400'>
                0
              </div>
            </div>
          </div>
        </div>

        <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700'>
          <div className='text-center py-12'>
            <div className='text-6xl mb-4'>🚀</div>
            <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
              Frontend Development Challenges
            </h2>
            <p className='text-gray-600 dark:text-gray-400 mb-8'>
              This page will contain interactive coding challenges for frontend
              development.
            </p>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              <div className='p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg'>
                <h3 className='text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2'>
                  Interactive Editor
                </h3>
                <p className='text-blue-700 dark:text-blue-300 text-sm'>
                  Live coding environment with React, HTML, CSS, and JavaScript
                  support.
                </p>
              </div>
              <div className='p-6 bg-green-50 dark:bg-green-900/20 rounded-lg'>
                <h3 className='text-lg font-semibold text-green-900 dark:text-green-100 mb-2'>
                  Real-time Preview
                </h3>
                <p className='text-green-700 dark:text-green-300 text-sm'>
                  See your code changes instantly with live preview and hot
                  reload.
                </p>
              </div>
              <div className='p-6 bg-purple-50 dark:bg-purple-900/20 rounded-lg'>
                <h3 className='text-lg font-semibold text-purple-900 dark:text-purple-100 mb-2'>
                  Automated Testing
                </h3>
                <p className='text-purple-700 dark:text-purple-300 text-sm'>
                  Built-in test runner to validate your solutions automatically.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
