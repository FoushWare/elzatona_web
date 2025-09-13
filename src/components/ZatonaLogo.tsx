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
  const sizeConfig = {
    sm: { class: 'w-20 h-20', width: 80, height: 80 },
    md: { class: 'w-28 h-28', width: 112, height: 112 },
    lg: { class: 'w-32 h-32', width: 128, height: 128 },
  };

  const config = sizeConfig[size];

  // Icon only - using the zatona-web-blue01.png as icon (no text)
  return (
    <div className={`${className}`}>
      <Image
        src="/zatona-web-blue01.png"
        alt="Frontend Development Platform Icon"
        width={config.width}
        height={config.height}
        className={`${config.class} object-contain`}
        priority
      />
    </div>
  );
};

export default ZatonaLogo;
