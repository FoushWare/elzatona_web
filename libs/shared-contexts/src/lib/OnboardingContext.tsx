'use client';

// Only create Supabase client if environment variables are available
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let supabase: any = null;
if (
  process.env['NEXT_PUBLIC_SUPABASE_URL'] &&
  process.env['SUPABASE_SERVICE_ROLE_KEY']
) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { createClient } = require('@supabase/supabase-js');
  const supabaseUrl = process.env['NEXT_PUBLIC_SUPABASE_URL'];
  const supabaseServiceRoleKey = process.env['SUPABASE_SERVICE_ROLE_KEY'];
  supabase = createClient(supabaseUrl, supabaseServiceRoleKey);
}
import React, {
  useState,
  useEffect,
  ReactNode,
  createContext,
  useContext,
} from 'react';

interface OnboardingContextType {
  hasSeenOnboarding: boolean;
  showOnboarding: boolean;
  startOnboarding: () => void;
  completeOnboarding: () => void;
  skipOnboarding: () => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(
  undefined
);

export const OnboardingProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    // Check if user has seen onboarding (only after they sign in)
    // For now, we'll check localStorage but only after authentication
    if (typeof window !== 'undefined') {
      const seen = localStorage.getItem('hasSeenOnboarding');
      setHasSeenOnboarding(seen === 'true');
    }
  }, []);

  const startOnboarding = () => {
    setShowOnboarding(true);
  };

  const completeOnboarding = () => {
    setShowOnboarding(false);
    setHasSeenOnboarding(true);
    // Only save to localStorage if user is authenticated
    if (typeof window !== 'undefined') {
      localStorage.setItem('hasSeenOnboarding', 'true');
    }
  };

  const skipOnboarding = () => {
    setShowOnboarding(false);
    setHasSeenOnboarding(true);
    // Only save to localStorage if user is authenticated
    if (typeof window !== 'undefined') {
      localStorage.setItem('hasSeenOnboarding', 'true');
    }
  };

  return (
    <OnboardingContext.Provider
      value={{
        hasSeenOnboarding,
        showOnboarding,
        startOnboarding,
        completeOnboarding,
        skipOnboarding,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = (): OnboardingContextType => {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};
