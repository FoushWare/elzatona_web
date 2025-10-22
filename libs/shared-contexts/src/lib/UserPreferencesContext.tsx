'use client';

// Only create Supabase client if environment variables are available
let supabase: any = null;
if (
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.SUPABASE_SERVICE_ROLE_KEY
) {
  const { createClient } = require('@supabase/supabase-js');
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  supabase = createClient(supabaseUrl, supabaseServiceRoleKey);
}
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  notifications: boolean;
  language: string;
  learningMode: 'guided' | 'freestyle';
  dailyGoal: number;
  reminderTime: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'mixed';
  autoSave: boolean;
}

interface UserPreferencesContextType {
  preferences: UserPreferences;
  updatePreferences: (updates: Partial<UserPreferences>) => Promise<void>;
  isLoading: boolean;
}

const defaultPreferences: UserPreferences = {
  theme: 'system',
  notifications: true,
  language: 'en',
  learningMode: 'guided',
  dailyGoal: 10,
  reminderTime: '09:00',
  difficulty: 'mixed',
  autoSave: true,
};

const UserPreferencesContext = createContext<
  UserPreferencesContextType | undefined
>(undefined);

export function useUserPreferences() {
  const context = useContext(UserPreferencesContext);
  if (context === undefined) {
    throw new Error(
      'useUserPreferences must be used within a UserPreferencesProvider'
    );
  }
  return context;
}

interface UserPreferencesProviderProps {
  children: ReactNode;
}

export function UserPreferencesProvider({
  children,
}: UserPreferencesProviderProps) {
  const [user, setUser] = useState(null);
  const updateUserProfile = async (data: any) => {
    // Placeholder for user profile update
    console.log('User profile update:', data);
  };
  const [preferences, setPreferences] =
    useState<UserPreferences>(defaultPreferences);
  const [isLoading, setIsLoading] = useState(true);

  // Load preferences from user data or localStorage
  useEffect(() => {
    const loadPreferences = () => {
      try {
        // Load from localStorage
        const savedPreferences = localStorage.getItem('user-preferences');
        if (savedPreferences) {
          const parsed = JSON.parse(savedPreferences);
          setPreferences({
            ...defaultPreferences,
            ...parsed,
          });
        }
      } catch (error) {
        console.error('Error loading preferences:', error);
        setPreferences(defaultPreferences);
      } finally {
        setIsLoading(false);
      }
    };

    loadPreferences();
  }, [user]);

  // Save preferences to localStorage and Firebase
  const updatePreferences = async (updates: Partial<UserPreferences>) => {
    try {
      const newPreferences = { ...preferences, ...updates };
      setPreferences(newPreferences);

      // Save to localStorage immediately
      localStorage.setItem('user-preferences', JSON.stringify(newPreferences));

      // Save to Firebase if user is authenticated
      if (user) {
        await updateUserProfile({
          preferences: newPreferences,
        });
      }
    } catch (error) {
      console.error('Error updating preferences:', error);
      throw error;
    }
  };

  // Apply theme preference
  useEffect(() => {
    const applyTheme = () => {
      const { theme } = preferences;

      if (theme === 'system') {
        // Use system preference
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
          .matches
          ? 'dark'
          : 'light';
        document.documentElement.classList.toggle(
          'dark',
          systemTheme === 'dark'
        );
      } else {
        // Use user preference
        document.documentElement.classList.toggle('dark', theme === 'dark');
      }
    };

    if (!isLoading) {
      applyTheme();
    }
  }, [preferences.theme, isLoading]);

  // Listen for system theme changes when using system preference
  useEffect(() => {
    if (preferences.theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => {
        document.documentElement.classList.toggle('dark', mediaQuery.matches);
      };

      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [preferences.theme]);

  const value: UserPreferencesContextType = {
    preferences,
    updatePreferences,
    isLoading,
  };

  return (
    <UserPreferencesContext.Provider value={value}>
      {children}
    </UserPreferencesContext.Provider>
  );
}
