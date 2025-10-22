'use client';

export default function ContentManagementPage() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='mb-8'>
          <h1 className='text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
            ⚙️ Content Management
          </h1>
          <p className='text-gray-600 dark:text-gray-400 mt-2 text-lg'>
            Comprehensive admin interface for managing learning content
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8'>
          <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 group'>
            <div className='text-center'>
              <div className='text-4xl mb-4'>📚</div>
              <h3 className='text-xl font-bold text-gray-900 dark:text-white mb-2'>
                Categories
              </h3>
              <p className='text-gray-600 dark:text-gray-400 mb-4'>
                Manage learning categories and topics
              </p>
              <div className='text-3xl font-bold text-blue-600 dark:text-blue-400'>
                0
              </div>
            </div>
          </div>

          <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 group'>
            <div className='text-center'>
              <div className='text-4xl mb-4'>🎯</div>
              <h3 className='text-xl font-bold text-gray-900 dark:text-white mb-2'>
                Topics
              </h3>
              <p className='text-gray-600 dark:text-gray-400 mb-4'>
                Organize content by specific topics
              </p>
              <div className='text-3xl font-bold text-green-600 dark:text-green-400'>
                0
              </div>
            </div>
          </div>

          <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 group'>
            <div className='text-center'>
              <div className='text-4xl mb-4'>📋</div>
              <h3 className='text-xl font-bold text-gray-900 dark:text-white mb-2'>
                Learning Plans
              </h3>
              <p className='text-gray-600 dark:text-gray-400 mb-4'>
                Create structured learning paths
              </p>
              <div className='text-3xl font-bold text-purple-600 dark:text-purple-400'>
                0
              </div>
            </div>
          </div>
        </div>

        <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700'>
          <div className='text-center py-12'>
            <div className='text-6xl mb-4'>🔧</div>
            <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
              Content Management System
            </h2>
            <p className='text-gray-600 dark:text-gray-400 mb-8'>
              This page will contain the unified content management interface.
            </p>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div className='p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg'>
                <h3 className='text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2'>
                  Content Organization
                </h3>
                <p className='text-blue-700 dark:text-blue-300 text-sm'>
                  Manage categories, topics, and learning paths with
                  hierarchical organization.
                </p>
              </div>
              <div className='p-6 bg-green-50 dark:bg-green-900/20 rounded-lg'>
                <h3 className='text-lg font-semibold text-green-900 dark:text-green-100 mb-2'>
                  Content Validation
                </h3>
                <p className='text-green-700 dark:text-green-300 text-sm'>
                  Review and validate content quality, completeness, and
                  educational value.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
