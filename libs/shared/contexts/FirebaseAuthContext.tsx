'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { User } from 'firebase/auth';
import {
  signInWithGoogle,
  signInWithGithub,
  signInWithEmail,
  signUpWithEmail,
  signOutUser,
  saveUserToFirestore,
  getUserFromFirestore,
  onAuthStateChangedWrapper,
  clearAuthData,
  setupTokenRefresh,
  setAuthCookie,
  clearAuthCookie,
} from '@elzatona/data/firebase';

interface FirebaseUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  provider: string;
  isEmailVerified: boolean;
  preferences?: {
    theme: string;
    notifications: boolean;
    language: string;
  };
  progress?: {
    questionsCompleted: number;
    totalPoints: number;
    currentStreak: number;
    badges: string[];
    achievements: string[];
  };
}

interface FirebaseAuthContextType {
  user: FirebaseUser | null;
  firebaseUser: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signInWithGoogle: () => Promise<{
    success: boolean;
    user?: User;
    error?: string;
  }>;
  signInWithGithub: () => Promise<{
    success: boolean;
    user?: User;
    error?: string;
  }>;
  signInWithEmail: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; user?: User; error?: string }>;
  signUpWithEmail: (
    email: string,
    password: string,
    displayName: string
  ) => Promise<{ success: boolean; user?: User; error?: string }>;
  signOut: () => Promise<{ success: boolean; error?: string }>;
  updateUserProfile: (updates: Partial<FirebaseUser>) => Promise<void>;
}

const FirebaseAuthContext = createContext<FirebaseAuthContextType | undefined>(
  undefined
);

export function useFirebaseAuth() {
  const context = useContext(FirebaseAuthContext);
  if (context === undefined) {
    throw new Error(
      'useFirebaseAuth must be used within a FirebaseAuthProvider'
    );
  }
  return context;
}

interface FirebaseAuthProviderProps {
  children: ReactNode;
}

export function FirebaseAuthProvider({ children }: FirebaseAuthProviderProps) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChangedWrapper(async firebaseUser => {
      setIsLoading(true);

      try {
        if (firebaseUser) {
          setFirebaseUser(firebaseUser);

          // Set up automatic token refresh for authenticated users
          const cleanupTokenRefresh = setupTokenRefresh();

          // Get user data from Firestore with timeout
          let userData = null;
          try {
            const firestorePromise = getUserFromFirestore(firebaseUser.uid);
            const timeoutPromise = new Promise((_, reject) =>
              setTimeout(() => reject(new Error('Firestore timeout')), 5000)
            );
            userData = await Promise.race([firestorePromise, timeoutPromise]);
          } catch (error) {
            console.warn(
              'Firestore fetch failed or timed out, using basic user data:',
              error
            );
          }

          if (userData) {
            setUser(userData as FirebaseUser);

            // Set HTTP-only cookie for existing users too
            // Cookie management not available - using localStorage fallback
            if (typeof window !== 'undefined') {
              localStorage.setItem('firebase:authUser', JSON.stringify(firebaseUser));
            }
          } else {
            // Create FirebaseUser object for context
            const firebaseUserForContext: FirebaseUser = {
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              displayName: firebaseUser.displayName,
              photoURL: firebaseUser.photoURL,
              provider: firebaseUser.providerData[0]?.providerId || 'email',
              isEmailVerified: firebaseUser.emailVerified,
              preferences: {
                theme: 'system',
                notifications: true,
                language: 'en',
              },
              progress: {
                questionsCompleted: 0,
                totalPoints: 0,
                currentStreak: 0,
                badges: [],
                achievements: [],
              },
            };
            setUser(firebaseUserForContext);

            // Create comprehensive user object for Firestore
            const comprehensiveUser = {
              uid: firebaseUser.uid,
              email: firebaseUser.email || undefined,
              displayName: firebaseUser.displayName || undefined,
              photoURL: firebaseUser.photoURL || undefined,
              provider: firebaseUser.providerData[0]?.providerId || 'email',
              isEmailVerified: firebaseUser.emailVerified,
              preferences: {
                theme: 'system' as const,
                notifications: {
                  email: true,
                  push: true,
                  learningReminders: true,
                  achievementAlerts: true,
                },
                language: 'en',
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                learningMode: null,
                dailyGoal: 10,
                studyHours: {
                  start: '09:00',
                  end: '17:00',
                },
                difficultyPreference: 'mixed' as const,
                sections: ['HTML', 'CSS', 'JavaScript', 'React'],
              },
              progress: {
                totalQuestions: 0,
                correctAnswers: 0,
                accuracy: 0,
                totalTimeSpent: 0,
                currentStreak: 0,
                longestStreak: 0,
                lastActivityAt: new Date().toISOString(),
                weeklyProgress: [],
                monthlyProgress: [],
                sectionProgress: [],
                learningSessions: [],
              },
              achievements: {
                badges: [],
                certificates: [],
                milestones: [],
                totalPoints: 0,
                level: 1,
                experience: 0,
              },
              learningPlans: [],
            };

            // Try to save comprehensive user data to Firestore (don't wait for it)
            saveUserToFirestore(firebaseUser, comprehensiveUser.displayName)
              .catch(error =>
                console.warn('Failed to save user to Firestore:', error)
              );

            // Set HTTP-only cookie for secure progress tracking
            // Cookie management not available - using localStorage fallback
            if (typeof window !== 'undefined') {
              localStorage.setItem('firebase:authUser', JSON.stringify(firebaseUser));
            }
          }

          // Return cleanup function for token refresh
          return cleanupTokenRefresh;
        } else {
          setFirebaseUser(null);
          setUser(null);
          clearAuthData();
          clearAuthCookie().catch(error =>
            console.warn('Failed to clear auth cookie:', error)
          );
        }
      } catch (error) {
        console.error('Error in auth state change:', error);
        // Set basic user data even if there's an error
        if (firebaseUser) {
          const basicUser: FirebaseUser = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
            provider: firebaseUser.providerData[0]?.providerId || 'email',
            isEmailVerified: firebaseUser.emailVerified,
            preferences: {
              theme: 'system',
              notifications: true,
              language: 'en',
            },
            progress: {
              questionsCompleted: 0,
              totalPoints: 0,
              currentStreak: 0,
              badges: [],
              achievements: [],
            },
          };
          setUser(basicUser);
          setFirebaseUser(firebaseUser);
        }
      } finally {
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignInWithGoogle = async () => {
    const result = await signInWithGoogle();
    return result;
  };

  const handleSignInWithGithub = async () => {
    const result = await signInWithGithub();
    return result;
  };

  const handleSignInWithEmail = async (email: string, password: string) => {
    const result = await signInWithEmail(email, password);
    return result;
  };

  const handleSignUpWithEmail = async (
    email: string,
    password: string,
    displayName: string
  ) => {
    const result = await signUpWithEmail(email, password, displayName);
    return result;
  };

  const handleSignOut = async () => {
    try {
      setIsLoading(true);
      const result = await signOutUser();
      if (result.success) {
        setUser(null);
        setFirebaseUser(null);

        // Clear all authentication-related data
        clearAuthData();

        // Force a page reload to clear any cached state
        // This ensures a clean logout experience
        if (typeof window !== 'undefined') {
          window.location.href = '/';
        }
      }
      return result;
    } catch (error) {
      console.error('Sign out error:', error);
      return { success: false, error: 'Failed to sign out' };
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserProfile = async (updates: Partial<FirebaseUser>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);

      // Update in Firestore
      if (firebaseUser) {
        await saveUserToFirestore(
          firebaseUser,
          updatedUser.displayName || undefined
        );
      }
    }
  };

  const value: FirebaseAuthContextType = {
    user,
    firebaseUser,
    isAuthenticated: !!user,
    isLoading,
    signInWithGoogle: handleSignInWithGoogle,
    signInWithGithub: handleSignInWithGithub,
    signInWithEmail: handleSignInWithEmail,
    signUpWithEmail: handleSignUpWithEmail,
    signOut: handleSignOut,
    updateUserProfile,
  };

  return (
    <FirebaseAuthContext.Provider value={value}>
      {children}
    </FirebaseAuthContext.Provider>
  );
}
