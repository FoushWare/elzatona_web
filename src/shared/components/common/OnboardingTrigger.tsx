'use client';

import React from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

import { HelpCircle } from 'lucide-react';
import { useOnboarding } from '@/contexts/OnboardingContext';

export const OnboardingTrigger: React.FC = () => {
  const { startOnboarding } = useOnboarding();

  return (
    <button
      onClick={startOnboarding}
      className="flex items-center space-x-2 px-3 py-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
      title="Take a tour of our features"
    >
      <HelpCircle className="w-4 h-4" />
      <span className="hidden sm:inline text-sm">Tour</span>
    </button>
  );
};
