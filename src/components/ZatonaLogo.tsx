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
    sm: 'w-20 h-20',
    md: 'w-28 h-28',
    lg: 'w-32 h-32',
  };

  // Icon only - using the zatona-web-blue01.png as icon (no text)
  return (
    <div className={`${className}`}>
      <Image
        src="/zatona-web-blue01.png"
        alt="Frontend Development Platform Icon"
        width={200}
        height={200}
        className={sizeClasses[size]}
        priority
      />
    </div>
  );
};

export default ZatonaLogo;
