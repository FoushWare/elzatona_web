import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  AuthError,
} from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

// Auth providers
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();

// Configure providers
googleProvider.setCustomParameters({
  prompt: 'select_account',
});

githubProvider.setCustomParameters({
  prompt: 'select_account',
});

// Authentication functions
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    await saveUserToFirestore(result.user);
    return { success: true, user: result.user };
  } catch (error: unknown) {
    const authError = error as AuthError;
    console.error('Google sign-in error:', authError);
    return { success: false, error: authError.message };
  }
};

export const signInWithGithub = async () => {
  try {
    const result = await signInWithPopup(auth, githubProvider);
    await saveUserToFirestore(result.user);
    return { success: true, user: result.user };
  } catch (error: unknown) {
    const authError = error as AuthError;
    console.error('GitHub sign-in error:', authError);
    return { success: false, error: authError.message };
  }
};

export const signInWithEmail = async (email: string, password: string) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: result.user };
  } catch (error: unknown) {
    const authError = error as AuthError;
    console.error('Email sign-in error:', authError);
    return { success: false, error: authError.message };
  }
};

export const signUpWithEmail = async (
  email: string,
  password: string,
  displayName: string
) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);

    // Update display name
    if (result.user) {
      await saveUserToFirestore(result.user, displayName);
    }

    return { success: true, user: result.user };
  } catch (error: unknown) {
    const authError = error as AuthError;
    console.error('Email sign-up error:', authError);
    return { success: false, error: authError.message };
  }
};

export const signOutUser = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error: unknown) {
    const authError = error as AuthError;
    console.error('Sign-out error:', authError);
    return { success: false, error: authError.message };
  }
};

// Firestore functions
export const saveUserToFirestore = async (user: User, displayName?: string) => {
  try {
    const userRef = doc(db, 'users', user.uid);
    const userData = {
      uid: user.uid,
      email: user.email,
      displayName: displayName || user.displayName || 'Anonymous User',
      photoURL: user.photoURL || null,
      provider: user.providerData[0]?.providerId || 'email',
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
      isEmailVerified: user.emailVerified,
      // Add user preferences and progress tracking
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

    await setDoc(userRef, userData, { merge: true });
    console.log('User saved to Firestore');
  } catch (error) {
    console.error('Error saving user to Firestore:', error);
  }
};

export const getUserFromFirestore = async (uid: string) => {
  try {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      return userSnap.data();
    } else {
      console.log('No such user!');
      return null;
    }
  } catch (error) {
    console.error('Error getting user from Firestore:', error);
    return null;
  }
};

// Auth state observer
export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

// Export auth instance for use in components
export default auth;
