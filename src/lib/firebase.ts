import { initializeApp, FirebaseApp } from 'firebase/app';
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
  Auth,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  Firestore,
} from 'firebase/firestore';

// Check if Firebase is configured
const isFirebaseConfigured =
  process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
  process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN &&
  process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'dummy-key',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'dummy-domain',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'dummy-project',
  storageBucket:
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'dummy-bucket',
  messagingSenderId:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '123456789',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:123456789:web:dummy',
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase only if configured
let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;

if (isFirebaseConfigured) {
  try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
  } catch (error) {
    console.warn('Firebase initialization failed:', error);
  }
} else {
  console.warn(
    'Firebase not configured. Authentication features will be disabled.'
  );
}

// Auth providers (only create if Firebase is initialized)
export const googleProvider = auth ? new GoogleAuthProvider() : null;
export const githubProvider = auth ? new GithubAuthProvider() : null;

// Configure providers if they exist
if (googleProvider) {
  googleProvider.setCustomParameters({
    prompt: 'select_account',
  });
}

if (githubProvider) {
  githubProvider.setCustomParameters({
    prompt: 'select_account',
  });
}

// Authentication functions with fallbacks
export const signInWithGoogle = async () => {
  if (!auth || !googleProvider) {
    return { success: false, error: 'Firebase not configured' };
  }

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
  if (!auth || !githubProvider) {
    return { success: false, error: 'Firebase not configured' };
  }

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
  if (!auth) {
    return { success: false, error: 'Firebase not configured' };
  }

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
  if (!auth) {
    return { success: false, error: 'Firebase not configured' };
  }

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
  if (!auth) {
    return { success: false, error: 'Firebase not configured' };
  }

  try {
    await signOut(auth);
    return { success: true };
  } catch (error: unknown) {
    const authError = error as AuthError;
    console.error('Sign-out error:', authError);
    return { success: false, error: authError.message };
  }
};

// Firestore functions with fallbacks
export const saveUserToFirestore = async (user: User, displayName?: string) => {
  if (!db) {
    console.warn('Firestore not available');
    return;
  }

  try {
    const userRef = doc(db, 'users', user.uid);
    const userData = {
      uid: user.uid,
      email: user.email,
      displayName: displayName || user.displayName || 'User',
      photoURL: user.photoURL || null,
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
      progress: {
        questionsCompleted: 0,
        challengesCompleted: 0,
        totalScore: 0,
        streak: 0,
      },
    };

    await setDoc(userRef, userData, { merge: true });
  } catch (error) {
    console.error('Error saving user to Firestore:', error);
  }
};

export const getUserFromFirestore = async (uid: string) => {
  if (!db) {
    console.warn('Firestore not available');
    return null;
  }

  try {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      return userSnap.data();
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting user from Firestore:', error);
    return null;
  }
};

// Auth state observer with fallback
export const onAuthStateChangedWrapper = (
  callback: (user: User | null) => void
) => {
  if (!auth) {
    // If Firebase is not configured, immediately call callback with null
    callback(null);
    return () => {}; // Return empty unsubscribe function
  }

  return onAuthStateChanged(auth, callback);
};

// Export auth and db for direct access (with fallbacks)
export { auth, db };
