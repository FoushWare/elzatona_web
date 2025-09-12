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
    sm: 'w-16 h-16',
    md: 'w-20 h-20',
    lg: 'w-24 h-24',
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
