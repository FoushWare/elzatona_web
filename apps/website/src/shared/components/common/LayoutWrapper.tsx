'use client';

import { useTranslation } from '@/hooks/useTranslation';
import { useEffect } from 'react';

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const { locale } = useTranslation();

  useEffect(() => {
    // Update document language
    document.documentElement.lang = locale;
  }, [locale]);

  return <div className='min-h-screen'>{children}</div>;
}
