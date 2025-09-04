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
    sm: 'w-32 h-12',
    md: 'w-40 h-16',
    lg: 'w-56 h-20',
  };

  if (!showText) {
    // Icon only - extract just the olive icon part
    return (
      <div className={`${className}`}>
        <svg
          className="w-12 h-12"
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
    // Stacked logo design using the new SVG
    return (
      <div className={`flex flex-col items-center space-y-2 ${className}`}>
        <Image
          src="/zatona-web-logo.svg"
          alt="ZatonaWeb Logo"
          width={300}
          height={120}
          className="w-72 h-28"
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
        width={400}
        height={160}
        className={sizeClasses[size]}
        priority
      />
    </div>
  );
};

export default ZatonaLogo;
