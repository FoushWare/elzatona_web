import React from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  action,
  className = '',
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center py-12 px-6 text-center ${className}`}
    >
      <div className='mb-4 p-4 rounded-full bg-gray-100 dark:bg-gray-800'>
        <Icon className='h-8 w-8 text-gray-400 dark:text-gray-500' />
      </div>
      <h3 className='text-lg font-medium text-gray-900 dark:text-white mb-2'>
        {title}
      </h3>
      <p className='text-sm text-gray-600 dark:text-gray-400 mb-6 max-w-sm'>
        {description}
      </p>
      {action && (
        <button
          onClick={action.onClick}
          className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors'
        >
          {action.label}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
