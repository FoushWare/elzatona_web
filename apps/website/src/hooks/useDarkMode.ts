'use client';

import { useTheme } from '@/contexts/ThemeContext';

// Re-export the theme hook for backward compatibility
export const useDarkMode = useTheme;
