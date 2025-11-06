'use client';

// import { useTranslation } from '@elzatona/shared-hooks'; // Removed - useTranslation is not exported
import { useEffect } from 'react';

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  // useTranslation hook removed - not available in shared-hooks
  // Default to 'en' for document language
  useEffect(() => {
    // Update document language to default 'en'
    document.documentElement.lang = 'en';
  }, []);

  return <div className='min-h-screen'>{children}</div>;
}
