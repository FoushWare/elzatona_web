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
    sm: 'w-8 h-12',
    md: 'w-12 h-18',
    lg: 'w-16 h-24',
  };

  if (!showText) {
    // Icon only - using the new zatona-web-logo2.svg as icon
    return (
      <div className={`${className}`}>
        <Image
          src="/zatona-web-logo2.svg"
          alt="Zatona Web Icon"
          width={40}
          height={60}
          className="w-8 h-12"
          priority
        />
      </div>
    );
  }

  if (variant === 'stacked') {
    // Stacked logo design using the new zatona-web-logo2.svg with text
    return (
      <div className={`flex flex-col items-center space-y-2 ${className}`}>
        <Image
          src="/zatona-web-logo2.svg"
          alt="Zatona Web Logo"
          width={200}
          height={300}
          className="w-48 h-72"
          priority
        />
        <div className="text-center">
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            Zatona Web
          </span>
        </div>
      </div>
    );
  }

  // Horizontal logo design (default) using the new zatona-web-logo2.svg with text below
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <Image
        src="/zatona-web-logo2.svg"
        alt="Zatona Web Logo"
        width={200}
        height={300}
        className={sizeClasses[size]}
        priority
      />
      <span className="text-[10px] font-semibold mt-0.5 text-center leading-tight">
        Zatona Web
      </span>
    </div>
  );
};

export default ZatonaLogo;
