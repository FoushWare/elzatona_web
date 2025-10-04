'use client';

import React from 'react';
import { Languages, RotateCcw } from 'lucide-react';
import { useRTL } from '@elzatona/shared/contexts';
import { rtlClass } from '@elzatona/shared/utils';

interface RTLToggleProps {
  className?: string;
  showLabel?: boolean;
  variant?: 'button' | 'switch' | 'icon';
}

export const RTLToggle: React.FC<RTLToggleProps> = ({
  className = '',
  showLabel = true,
  variant = 'button',
}) => {
  const { isRTL, toggleDirection } = useRTL();

  if (variant === 'switch') {
    return (
      <div className={`flex items-center space-x-3 ${className}`}>
        {showLabel && (
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            RTL
          </span>
        )}
        <button
          onClick={toggleDirection}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
            isRTL ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'
          }`}
          role="switch"
          aria-checked={isRTL}
          aria-label="Toggle RTL mode"
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
              isRTL ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>
    );
  }

  if (variant === 'icon') {
    return (
      <button
        onClick={toggleDirection}
        className={`p-2 rounded-lg transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${className}`}
        title={`Switch to ${isRTL ? 'LTR' : 'RTL'} mode`}
        aria-label={`Switch to ${isRTL ? 'LTR' : 'RTL'} mode`}
      >
        <div className="relative">
          <Languages
            className={`w-5 h-5 text-gray-600 dark:text-gray-400 transition-transform duration-200 ${rtlClass(isRTL, 'rtl-mirror-icon', '')}`}
          />
          {isRTL && (
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
          )}
        </div>
      </button>
    );
  }

  // Default button variant
  return (
    <button
      onClick={toggleDirection}
      className={`inline-flex items-center ${rtlClass(isRTL, 'space-x-reverse space-x-2', 'space-x-2')} px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 ${className}`}
      aria-label={`Switch to ${isRTL ? 'LTR' : 'RTL'} mode`}
    >
      <Languages
        className={`w-4 h-4 ${rtlClass(isRTL, 'rtl-mirror-icon', '')}`}
      />
      {showLabel && <span>{isRTL ? 'LTR' : 'RTL'}</span>}
      <RotateCcw className="w-3 h-3 opacity-60" />
    </button>
  );
};

// Floating RTL toggle for easy access
export const FloatingRTLToggle: React.FC = () => {
  const { isRTL } = useRTL();

  return (
    <div
      className={`fixed bottom-4 z-50 ${rtlClass(isRTL, 'left-4', 'right-4')}`}
    >
      <RTLToggle
        variant="icon"
        className="shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
      />
    </div>
  );
};

// RTL indicator for development/testing
export const RTLIndicator: React.FC = () => {
  const { isRTL } = useRTL();

  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <div className={`fixed top-4 z-50 ${rtlClass(isRTL, 'left-4', 'right-4')}`}>
      <div
        className={`px-3 py-1 text-xs font-mono bg-black/80 text-white rounded-full ${
          isRTL ? 'bg-orange-500/80' : 'bg-blue-500/80'
        }`}
      >
        {isRTL ? 'RTL' : 'LTR'}
      </div>
    </div>
  );
};
