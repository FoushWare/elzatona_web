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
      {/* Professional Logo Design */}
      <div className={`${sizeClasses[size]} relative`}>
        {/* Main container with modern design */}
        <div className="w-full h-full bg-gradient-to-br from-emerald-600 via-green-500 to-emerald-700 rounded-2xl p-0.5 shadow-xl">
          {/* Inner container */}
          <div className="w-full h-full bg-white dark:bg-gray-900 rounded-2xl flex items-center justify-center relative">
            {/* Olive branch icon - clean and professional */}
            <div className="relative w-7 h-7">
              {/* Main stem - vertical */}
              <div className="absolute left-1/2 top-1 w-1 h-5 bg-emerald-600 transform -translate-x-1/2"></div>

              {/* Horizontal branch */}
              <div className="absolute left-1/2 top-2 w-4 h-0.5 bg-emerald-600 transform -translate-x-1/2"></div>

              {/* Left olive */}
              <div className="absolute left-1 top-1 w-2 h-2 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full shadow-sm"></div>

              {/* Right olive */}
              <div className="absolute right-1 top-1 w-2 h-2 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full shadow-sm"></div>

              {/* Center olive */}
              <div className="absolute left-1/2 top-1 w-2 h-2 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full transform -translate-x-1/2 shadow-sm"></div>

              {/* Small leaf accents */}
              <div className="absolute left-1/2 top-3 w-1 h-0.5 bg-emerald-500 rounded-full transform -translate-x-1/2"></div>
              <div className="absolute left-1/2 top-4 w-1 h-0.5 bg-emerald-500 rounded-full transform -translate-x-1/2"></div>
            </div>

            {/* Subtle inner glow */}
            <div className="absolute inset-1 bg-gradient-to-br from-emerald-50/40 to-green-50/40 dark:from-emerald-900/30 dark:to-green-900/30 rounded-xl"></div>
          </div>
        </div>

        {/* Top-right accent */}
        <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-amber-400 rounded-full shadow-sm"></div>
      </div>

      {/* Text Logo */}
      {showText && (
        <div className="flex flex-col">
          <span
            className={`${textSizes[size]} font-bold bg-gradient-to-r from-emerald-600 to-green-700 bg-clip-text text-transparent leading-tight tracking-tight`}
          >
            Zatona
          </span>
          <span
            className={`${textSizes[size]} font-semibold text-gray-800 dark:text-gray-200 leading-tight tracking-tight`}
          >
            Web
          </span>
        </div>
      )}
    </div>
  );
};

export default ZatonaLogo;
