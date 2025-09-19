import React from 'react';
import Image from 'next/image';

interface AlzatonaLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
  showText?: boolean;
  variant?: 'horizontal' | 'stacked';
}

export const AlzatonaLogo: React.FC<AlzatonaLogoProps> = ({
  size = 'md',
  className = '',
  showText = true,
  variant = 'horizontal',
}) => {
  const sizeConfig = {
    xs: { class: 'w-16 h-16', width: 64, height: 64 },
    sm: { class: 'w-24 h-24', width: 96, height: 96 },
    md: { class: 'w-32 h-32', width: 128, height: 128 },
    lg: { class: 'w-40 h-40', width: 160, height: 160 },
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

export default AlzatonaLogo;
