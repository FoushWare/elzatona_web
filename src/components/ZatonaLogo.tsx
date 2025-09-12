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
    // Icon only - using the new olive-themed icon
    return (
      <div className={`${className}`}>
        <Image
          src="/zatona-web-icon.svg"
          alt="Zatona Web Icon"
          width={100}
          height={100}
          className="w-10 h-10"
          priority
        />
      </div>
    );
  }

  if (variant === 'stacked') {
    // Stacked logo design using the new SVG
    return (
      <div className={`flex flex-col items-center space-y-2 ${className}`}>
        <Image
          src="/zatona-web-logo.svg"
          alt="Zatona Web Logo"
          width={200}
          height={200}
          className="w-48 h-48"
          priority
        />
      </div>
    );
  }

  // Horizontal logo design (default) using the new SVG
  return (
    <div className={`${className}`}>
      <Image
        src="/zatona-web-logo-horizontal.svg"
        alt="Zatona Web Logo"
        width={300}
        height={80}
        className={sizeClasses[size]}
        priority
      />
    </div>
  );
};

export default ZatonaLogo;
