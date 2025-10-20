import React from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

import Image from 'next/image';
import { useTheme } from '@elzatona/shared-contexts';

interface AlzatonaLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
  showText?: boolean;
  variant?: 'horizontal' | 'stacked';
  forceDarkMode?: boolean; // For cases where we need to force dark mode logo
}

export const AlzatonaLogo: React.FC<AlzatonaLogoProps> = ({
  size = 'md',
  className = '',
  showText = true,
  variant = 'horizontal',
  forceDarkMode = false,
}) => {
  const { isDarkMode } = useTheme();

  const sizeConfig = {
    xs: { class: 'w-20 h-20', width: 80, height: 80 }, // Increased from 16x16
    sm: { class: 'w-28 h-28', width: 112, height: 112 }, // Increased from 24x24
    md: { class: 'w-36 h-36', width: 144, height: 144 }, // Increased from 32x32
    lg: { class: 'w-44 h-44', width: 176, height: 176 }, // Increased from 40x40
  };

  const config = sizeConfig[size];

  // Determine which logo to use based on dark mode
  const shouldUseDarkLogo = forceDarkMode || isDarkMode;
  const logoSrc = shouldUseDarkLogo
    ? '/Elzatona-web01.png'
    : '/Elzatona-black-all.png';
  const logoAlt = shouldUseDarkLogo
    ? 'Frontend Development Platform Icon (Dark Mode)'
    : 'Frontend Development Platform Icon (Light Mode)';

  return (
    <div className={`${className}`}>
      <Image
        src={logoSrc}
        alt={logoAlt}
        width={config.width}
        height={config.height}
        className={`${config.class} object-contain`}
        priority
      />
    </div>
  );
};

export default AlzatonaLogo;
