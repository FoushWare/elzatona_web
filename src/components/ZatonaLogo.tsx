import React from 'react';

interface ZatonaLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showText?: boolean;
}

export const ZatonaLogo: React.FC<ZatonaLogoProps> = ({
  size = 'md',
  className = '',
  showText = true,
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-2xl',
  };

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Creative Olive-Inspired Logo */}
      <div className={`${sizeClasses[size]} relative`}>
        {/* Main circular background */}
        <div className="w-full h-full bg-gradient-to-br from-emerald-600 to-green-700 rounded-full flex items-center justify-center shadow-lg">
          {/* Olive branch design - completely unique */}
          <div className="relative">
            {/* Central stem */}
            <div className="w-1 h-4 bg-yellow-300 rounded-full transform rotate-12"></div>

            {/* Left olive */}
            <div className="absolute -left-2 -top-1 w-3 h-3 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full shadow-sm"></div>

            {/* Right olive */}
            <div className="absolute -right-2 -top-1 w-3 h-3 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full shadow-sm"></div>

            {/* Small leaves */}
            <div className="absolute -left-1 top-2 w-2 h-1 bg-green-400 rounded-full transform -rotate-45"></div>
            <div className="absolute -right-1 top-2 w-2 h-1 bg-green-400 rounded-full transform rotate-45"></div>

            {/* Growth symbol - small sprout */}
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-2 bg-green-300 rounded-full"></div>
          </div>
        </div>

        {/* Subtle glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-green-600/20 rounded-full animate-pulse"></div>
      </div>

      {/* Text Logo */}
      {showText && (
        <div className="flex flex-col">
          <span
            className={`${textSizes[size]} font-bold bg-gradient-to-r from-emerald-600 to-green-700 bg-clip-text text-transparent`}
          >
            Zatona
          </span>
          <span
            className={`${textSizes[size]} font-medium text-gray-600 dark:text-gray-300`}
          >
            Web
          </span>
        </div>
      )}
    </div>
  );
};

export default ZatonaLogo;
