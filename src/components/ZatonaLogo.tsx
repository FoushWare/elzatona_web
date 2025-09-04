import React from 'react';
import Image from 'next/image';

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
    sm: 'w-28 h-10',
    md: 'w-36 h-14',
    lg: 'w-48 h-18',
  };

  if (!showText) {
    // Icon only - extract just the olive icon part
    return (
      <div className={`${className}`}>
        <svg
          className="w-10 h-10"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-labelledby="icon-title"
        >
          <title id="icon-title">Zatona Web Icon</title>
          <defs>
            <linearGradient
              id="oliveGradIcon"
              x1="0.25"
              x2="0.75"
              y1="0.2"
              y2="0.8"
            >
              <stop offset="0%" stopColor="#a5c94b" />
              <stop offset="100%" stopColor="#4f6e1c" />
            </linearGradient>
            <radialGradient
              id="oliveHighlightIcon"
              cx="0.35"
              cy="0.28"
              r="0.45"
            >
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </radialGradient>
          </defs>
          <g transform="translate(100,100)">
            <ellipse
              rx="35"
              ry="47"
              fill="url(#oliveGradIcon)"
              stroke="#2f4013"
              strokeWidth="4"
            />
            <ellipse
              cx="-10"
              cy="-15"
              rx="12"
              ry="20"
              fill="url(#oliveHighlightIcon)"
              opacity="0.7"
            />
          </g>
        </svg>
      </div>
    );
  }

  if (variant === 'stacked') {
    // Stacked logo design using the new SVG
    return (
      <div className={`flex flex-col items-center space-y-2 ${className}`}>
        <Image
          src="/zatona-web-logo.svg"
          alt="ZatonaWeb Logo"
          width={200}
          height={260}
          className="w-48 h-60"
          priority
        />
      </div>
    );
  }

  // Horizontal logo design (default) using the new SVG
  return (
    <div className={`${className}`}>
      <Image
        src="/zatona-web-logo.svg"
        alt="ZatonaWeb Logo"
        width={200}
        height={260}
        className={sizeClasses[size]}
        priority
      />
    </div>
  );
};

export default ZatonaLogo;
