import { useState, useEffect, useCallback } from 'react';
import { useFirebaseAuth } from '@elzatona/shared/contexts';
import { UserPreferences } from '@/types/firestore';

interface UseUserPreferencesReturn {
  preferences: UserPreferences | null;
  isLoading: boolean;
  error: string | null;
  updatePreferences: (
    preferences: Partial<UserPreferences>
  ) => Promise<boolean>;
  syncPreferences: () => Promise<void>;
}

export function useUserPreferences(): UseUserPreferencesReturn {
  const { user, isAuthenticated } = useFirebaseAuth();
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load preferences from user context on mount
  useEffect(() => {
    if (isAuthenticated && user?.preferences) {
      // Map user preferences to UserPreferences interface
      const mappedPreferences: UserPreferences = {
        theme: user.preferences.theme as 'light' | 'dark' | 'system',
        notifications: {
          email:
            typeof user.preferences.notifications === 'boolean'
              ? user.preferences.notifications
              : true,
          push:
            typeof user.preferences.notifications === 'boolean'
              ? user.preferences.notifications
              : true,
          learningReminders:
            typeof user.preferences.notifications === 'boolean'
              ? user.preferences.notifications
              : true,
          achievementAlerts:
            typeof user.preferences.notifications === 'boolean'
              ? user.preferences.notifications
              : true,
        },
        language: user.preferences.language || 'en',
        timezone: 'UTC',
        learningMode: null,
        dailyGoal: 10,
        studyHours: {
          start: '09:00',
          end: '17:00',
        },
        difficultyPreference: 'medium',
        sections: [],
      };
      setPreferences(mappedPreferences);
    }
  }, [isAuthenticated, user?.preferences]);

  const updatePreferences = useCallback(
    async (newPreferences: Partial<UserPreferences>): Promise<boolean> => {
      if (!isAuthenticated) {
        setError('User not authenticated');
        return false;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch('/api/user/preferences', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newPreferences),
          credentials: 'include',
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to update preferences');
        }

        // Update local state
        setPreferences(prev => (prev ? { ...prev, ...newPreferences } : null));

        return true;
      } catch (error) {
        console.error('Error updating preferences:', error);
        setError(
          error instanceof Error
            ? error.message
            : 'Failed to update preferences'
        );
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [isAuthenticated]
  );

  const syncPreferences = useCallback(async (): Promise<void> => {
    if (!isAuthenticated) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/user/preferences', {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch preferences');
      }

      const result = await response.json();

      if (result.success && result.preferences) {
        setPreferences(result.preferences);
      }
    } catch (error) {
      console.error('Error syncing preferences:', error);
      setError(
        error instanceof Error ? error.message : 'Failed to sync preferences'
      );
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  return {
    preferences,
    isLoading,
    error,
    updatePreferences,
    syncPreferences,
  };
}
