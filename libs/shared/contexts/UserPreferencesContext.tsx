'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { useFirebaseAuth } from './FirebaseAuthContext';

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
  const { user, updateUserProfile } = useFirebaseAuth();
  const [preferences, setPreferences] =
    useState<UserPreferences>(defaultPreferences);
  const [isLoading, setIsLoading] = useState(true);

  // Load preferences from user data or localStorage
  useEffect(() => {
    const loadPreferences = () => {
      try {
        if (user?.preferences) {
          // Use preferences from Firebase user data
          setPreferences({
            ...defaultPreferences,
            ...user.preferences,
            theme: user.preferences.theme as 'light' | 'dark' | 'system',
          });
        } else {
          // Fallback to localStorage
          const savedPreferences = localStorage.getItem('user-preferences');
          if (savedPreferences) {
            const parsed = JSON.parse(savedPreferences);
            setPreferences({
              ...defaultPreferences,
              ...parsed,
            });
          }
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
