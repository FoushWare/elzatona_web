import React from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env['NEXT_PUBLIC_SUPABASE_URL']!;
const supabaseServiceRoleKey = process.env['SUPABASE_SERVICE_ROLE_KEY']!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

export interface FilterButtonProps {
  label: string;
  value: string;
  isSelected: boolean;
  onClick: (value: string) => void;
  variant?: 'difficulty' | 'category';
  className?: string;
}

const getVariantClasses = (variant: string, isSelected: boolean) => {
  const baseClasses =
    'px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 hover:scale-105 transform border-2';

  if (variant === 'difficulty') {
    return `${baseClasses} ${
      isSelected
        ? 'bg-blue-600 border-blue-600 text-white shadow-lg'
        : 'bg-transparent border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white hover:shadow-md'
    }`;
  }

  // category variant
  return `${baseClasses} ${
    isSelected
      ? 'bg-purple-600 border-purple-600 text-white shadow-lg'
      : 'bg-transparent border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white hover:shadow-md'
  }`;
};

export const FilterButton: React.FC<FilterButtonProps> = ({
  label,
  value,
  isSelected,
  onClick,
  variant = 'difficulty',
  className = '',
}) => {
  return (
    <button
      onClick={() => onClick(value)}
      className={`${getVariantClasses(variant, isSelected)} ${className}`}
      data-testid={`filter-button-${value}`}
    >
      {label}
    </button>
  );
};
