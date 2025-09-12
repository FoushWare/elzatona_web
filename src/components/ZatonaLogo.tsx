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
    sm: 'w-10 h-10',
    md: 'w-14 h-14',
    lg: 'w-18 h-18',
  };

  if (!showText) {
    // Icon only - using the new zatona-web-black.png as icon
    return (
      <div className={`${className}`}>
        <Image
          src="/zatona-web-black.png"
          alt="Zatona Web Icon"
          width={580}
          height={564}
          className="w-10 h-10"
          priority
        />
      </div>
    );
  }

  if (variant === 'stacked') {
    // Stacked logo design using the new zatona-web-black.png with text
    return (
      <div className={`flex flex-col items-center space-y-2 ${className}`}>
        <Image
          src="/zatona-web-black.png"
          alt="Zatona Web Logo"
          width={580}
          height={564}
          className="w-48 h-48"
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

  // Horizontal logo design (default) using the new zatona-web-black.png with text below
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <Image
        src="/zatona-web-black.png"
        alt="Zatona Web Logo"
        width={580}
        height={564}
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
