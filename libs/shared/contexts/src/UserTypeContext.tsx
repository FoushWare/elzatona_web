'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { useFirebaseAuth } from './FirebaseAuthContext';

export type UserType = 'guided' | 'self-directed' | null;

interface UserTypeContextType {
  userType: UserType;
  setUserType: (type: UserType) => void;
  hasCompletedOnboarding: boolean;
  setHasCompletedOnboarding: (completed: boolean) => void;
  isFirstVisit: boolean;
  setIsFirstVisit: (isFirst: boolean) => void;
  resetUserPreferences: () => void;
}

const UserTypeContext = createContext<UserTypeContextType | undefined>(
  undefined
);

interface UserTypeProviderProps {
  children: ReactNode;
}

export const UserTypeProvider: React.FC<UserTypeProviderProps> = ({
  children,
}) => {
  const { user, updateUserProfile } = useFirebaseAuth();
  const [userType, setUserType] = useState<UserType>(null);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(false);

  // Load user preferences from Firebase or localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // If user is authenticated, try to load from Firebase preferences first
      if (
        user?.preferences &&
        'learningMode' in user.preferences &&
        user.preferences.learningMode
      ) {
        setUserType(user.preferences.learningMode as UserType);
      } else {
        // Fallback to localStorage
        const savedUserType = localStorage.getItem('userType') as UserType;
        if (savedUserType) {
          setUserType(savedUserType);
        }
      }

      const savedOnboarding =
        localStorage.getItem('hasCompletedOnboarding') === 'true';
      const savedFirstVisit = localStorage.getItem('isFirstVisit') === 'true';

      setHasCompletedOnboarding(savedOnboarding);
      setIsFirstVisit(savedFirstVisit);
    }
  }, [user]);

  // Save user preferences to localStorage and Firebase when they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (userType) {
        localStorage.setItem('userType', userType);

        // Note: learningMode is not part of the simplified Firebase user preferences
        // This will be handled by the comprehensive user data in Firestore
      }
      localStorage.setItem(
        'hasCompletedOnboarding',
        hasCompletedOnboarding.toString()
      );
      localStorage.setItem('isFirstVisit', isFirstVisit.toString());
    }
  }, [userType, hasCompletedOnboarding, isFirstVisit, user, updateUserProfile]);

  const resetUserPreferences = () => {
    setUserType(null);
    setHasCompletedOnboarding(false);
    setIsFirstVisit(false);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('userType');
      localStorage.removeItem('hasCompletedOnboarding');
      localStorage.removeItem('isFirstVisit');
    }
  };

  const value: UserTypeContextType = {
    userType,
    setUserType,
    hasCompletedOnboarding,
    setHasCompletedOnboarding,
    isFirstVisit,
    setIsFirstVisit,
    resetUserPreferences,
  };

  return (
    <UserTypeContext.Provider value={value}>
      {children}
    </UserTypeContext.Provider>
  );
};

export const useUserType = (): UserTypeContextType => {
  const context = useContext(UserTypeContext);
  if (context === undefined) {
    throw new Error('useUserType must be used within a UserTypeProvider');
  }
  return context;
};

export default UserTypeProvider;
