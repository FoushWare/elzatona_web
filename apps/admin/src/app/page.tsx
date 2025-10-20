import { Button } from '../../../../libs/ui/src/lib/ui';
import { useAuth } from '../../../../libs/auth/src/lib/auth';

export default function AdminDashboard() {
  // For now, let's handle the case where auth is not available
  let user = null;
  let isAuthenticated = false;

  try {
    const auth = useAuth();
    user = auth.user;
    isAuthenticated = auth.isAuthenticated;
  } catch (error) {
    // Auth context not available, treat as not authenticated
    console.log('Auth context not available:', error);
  }

  if (!isAuthenticated) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold mb-4'>Admin Access Required</h1>
          <p className='text-gray-600 mb-6'>
            Please log in to access the admin dashboard.
          </p>
          <Button>Login</Button>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='bg-white shadow'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between h-16'>
            <div className='flex items-center'>
              <h1 className='text-xl font-semibold text-gray-900'>
                Admin Dashboard
              </h1>
            </div>
            <div className='flex items-center'>
              <span className='text-sm text-gray-700'>
                Welcome, {user?.email}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className='max-w-7xl mx-auto py-6 sm:px-6 lg:px-8'>
        <div className='px-4 py-6 sm:px-0'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            <div className='bg-white overflow-hidden shadow rounded-lg'>
              <div className='p-5'>
                <div className='flex items-center'>
                  <div className='flex-shrink-0'>
                    <div className='w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center'>
                      <span className='text-white text-sm font-medium'>Q</span>
                    </div>
                  </div>
                  <div className='ml-5 w-0 flex-1'>
                    <dl>
                      <dt className='text-sm font-medium text-gray-500 truncate'>
                        Questions
                      </dt>
                      <dd className='text-lg font-medium text-gray-900'>
                        Manage Questions
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className='bg-white overflow-hidden shadow rounded-lg'>
              <div className='p-5'>
                <div className='flex items-center'>
                  <div className='flex-shrink-0'>
                    <div className='w-8 h-8 bg-green-500 rounded-md flex items-center justify-center'>
                      <span className='text-white text-sm font-medium'>U</span>
                    </div>
                  </div>
                  <div className='ml-5 w-0 flex-1'>
                    <dl>
                      <dt className='text-sm font-medium text-gray-500 truncate'>
                        Users
                      </dt>
                      <dd className='text-lg font-medium text-gray-900'>
                        Manage Users
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className='bg-white overflow-hidden shadow rounded-lg'>
              <div className='p-5'>
                <div className='flex items-center'>
                  <div className='flex-shrink-0'>
                    <div className='w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center'>
                      <span className='text-white text-sm font-medium'>S</span>
                    </div>
                  </div>
                  <div className='ml-5 w-0 flex-1'>
                    <dl>
                      <dt className='text-sm font-medium text-gray-500 truncate'>
                        Settings
                      </dt>
                      <dd className='text-lg font-medium text-gray-900'>
                        System Settings
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
