import React from 'react';

interface ZatonaLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showText?: boolean;
  variant?: 'horizontal' | 'stacked';
}

export const ZatonaLogo: React.FC<ZatonaLogoProps> = ({
  size = 'md',
  className = '',
  showText = true,
  variant = 'horizontal',
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

  if (!showText) {
    // Icon only - use the olive icon from the stacked design
    return (
      <div className={`${className}`}>
        <svg
          className={sizeClasses[size]}
          viewBox="0 0 120 120"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-labelledby="icon-title"
        >
          <title id="icon-title">Zatona Web Icon</title>
          <defs>
            <radialGradient id="oliveRad" cx="40%" cy="30%" r="70%">
              <stop offset="0" stopColor="#7EA142" />
              <stop offset="1" stopColor="#486127" />
            </radialGradient>
          </defs>
          <circle
            cx="60"
            cy="60"
            r="60"
            fill="url(#oliveRad)"
            stroke="#2F421A"
            strokeWidth="3"
          />
          <ellipse
            cx="75"
            cy="55"
            rx="14"
            ry="10"
            fill="#253810"
            opacity="0.95"
          />
          <g transform="translate(10,15) rotate(-25)">
            <path
              d="M0 0 C20 -9, 42.5 -9, 70 0 C47.5 10, 20 10, 0 0 Z"
              fill="#5E7E3B"
              stroke="#2F421A"
              strokeWidth="2"
            />
          </g>
        </svg>
      </div>
    );
  }

  if (variant === 'stacked') {
    // Stacked logo design
    return (
      <div className={`flex flex-col items-center space-y-2 ${className}`}>
        <svg
          className={sizeClasses[size]}
          viewBox="0 0 120 120"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-labelledby="stacked-title"
        >
          <title id="stacked-title">Zatona Web Icon</title>
          <defs>
            <radialGradient id="oliveRad" cx="40%" cy="30%" r="70%">
              <stop offset="0" stopColor="#7EA142" />
              <stop offset="1" stopColor="#486127" />
            </radialGradient>
          </defs>
          <circle
            cx="60"
            cy="60"
            r="60"
            fill="url(#oliveRad)"
            stroke="#2F421A"
            strokeWidth="3"
          />
          <ellipse
            cx="75"
            cy="55"
            rx="14"
            ry="10"
            fill="#253810"
            opacity="0.95"
          />
          <g transform="translate(10,15) rotate(-25)">
            <path
              d="M0 0 C20 -9, 42.5 -9, 70 0 C47.5 10, 20 10, 0 0 Z"
              fill="#5E7E3B"
              stroke="#2F421A"
              strokeWidth="2"
            />
          </g>
        </svg>
        <div className="text-center">
          <div
            className={`${textSizes[size]} font-bold text-gray-900 dark:text-white leading-tight`}
          >
            ZATONA
          </div>
          <div
            className={`${textSizes[size]} font-bold text-gray-700 dark:text-gray-300 leading-tight`}
          >
            WEB
          </div>
        </div>
      </div>
    );
  }

  // Horizontal logo design (default)
  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <svg
        className={sizeClasses[size]}
        viewBox="0 0 120 120"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-labelledby="horizontal-title"
      >
        <title id="horizontal-title">Zatona Web Icon</title>
        <defs>
          <radialGradient id="oliveRad" cx="40%" cy="30%" r="70%">
            <stop offset="0" stopColor="#7EA142" />
            <stop offset="1" stopColor="#486127" />
          </radialGradient>
        </defs>
        <circle
          cx="60"
          cy="60"
          r="60"
          fill="url(#oliveRad)"
          stroke="#2F421A"
          strokeWidth="3"
        />
        <ellipse
          cx="75"
          cy="55"
          rx="14"
          ry="10"
          fill="#253810"
          opacity="0.95"
        />
        <g transform="translate(10,15) rotate(-25)">
          <path
            d="M0 0 C20 -9, 42.5 -9, 70 0 C47.5 10, 20 10, 0 0 Z"
            fill="#5E7E3B"
            stroke="#2F421A"
            strokeWidth="2"
          />
        </g>
      </svg>
      <div className="flex flex-col">
        <span
          className={`${textSizes[size]} font-bold text-gray-900 dark:text-white leading-tight tracking-tight`}
        >
          ZATONA
        </span>
        <span
          className={`${textSizes[size]} font-semibold text-gray-700 dark:text-gray-300 leading-tight tracking-tight`}
        >
          WEB
        </span>
      </div>
    </div>
  );
};

export default ZatonaLogo;
