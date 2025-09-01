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
} from '@/lib/firebase';

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

      if (firebaseUser) {
        setFirebaseUser(firebaseUser);

        // Get user data from Firestore
        const userData = await getUserFromFirestore(firebaseUser.uid);
        if (userData) {
          setUser(userData as FirebaseUser);
        } else {
          // Create basic user object if not in Firestore
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

          // Save to Firestore
          await saveUserToFirestore(firebaseUser);
        }
      } else {
        setFirebaseUser(null);
        setUser(null);
      }

      setIsLoading(false);
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
    const result = await signOutUser();
    if (result.success) {
      setUser(null);
      setFirebaseUser(null);
    }
    return result;
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
