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
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  Firestore,
  connectFirestoreEmulator,
  enableNetwork,
  disableNetwork,
} from 'firebase/firestore';
import { getStorage, Storage } from 'firebase/storage';

// Check if Firebase is configured (always true since we have fallback values)
const isFirebaseConfigured = true;

// Firebase configuration - using your actual Firebase project
const firebaseConfig = {
  apiKey:
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY ||
    'AIzaSyBXlcfcdyIqoeJOb2gXcxpRSmQO7lEP82Y',
  authDomain:
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ||
    'fir-demo-project-adffb.firebaseapp.com',
  projectId:
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'fir-demo-project-adffb',
  storageBucket:
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
    'fir-demo-project-adffb.firebasestorage.app',
  messagingSenderId:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '76366138630',
  appId:
    process.env.NEXT_PUBLIC_FIREBASE_APP_ID ||
    '1:76366138630:web:0f3381c2f5a62e0401e287',
  measurementId:
    process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || 'G-XZ5VKFGG4Y',
};

// Initialize Firebase (always initialize for development)
let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;
let storage: Storage | null = null;

try {
  // Force a fresh Firebase initialization
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);

  // Configure Firestore for better connection management
  if (db) {
    // Enable network by default
    enableNetwork(db).catch(error => {
      console.warn('Failed to enable Firestore network:', error);
    });

    // Handle connection state changes
    const handleConnectionChange = (connected: boolean) => {
      if (connected) {
        console.log('🔗 Firestore connected');
      } else {
        console.log('🔌 Firestore disconnected');
      }
    };

    // Set up connection monitoring (this is a simplified approach)
    // In production, you might want to use more sophisticated connection monitoring
  }

  // Configure authentication persistence
  // This ensures users stay logged in across browser sessions
  setPersistence(auth, browserLocalPersistence).catch(error => {
    console.warn('Failed to set auth persistence:', error);
  });

  console.log('✅ Firebase initialized successfully!');
  console.log('📋 Configuration:', {
    projectId: firebaseConfig.projectId,
    authDomain: firebaseConfig.authDomain,
    storageBucket: firebaseConfig.storageBucket,
  });
} catch (error) {
  console.warn('Firebase initialization failed:', error);
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
    // Sign out from Firebase Auth
    await signOut(auth);

    // Clear any local storage items related to authentication
    if (typeof window !== 'undefined') {
      // Clear any cached user data
      localStorage.removeItem('firebase:authUser');
      sessionStorage.clear();

      // Clear any other auth-related storage
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('firebase:') || key.startsWith('auth_')) {
          localStorage.removeItem(key);
        }
      });
    }

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

// Check if user is currently authenticated
export const getCurrentUser = () => {
  if (!auth) {
    return null;
  }
  return auth.currentUser;
};

// Force token refresh to ensure user is still authenticated
export const refreshUserToken = async () => {
  if (!auth || !auth.currentUser) {
    return { success: false, error: 'No authenticated user' };
  }

  try {
    await auth.currentUser.getIdToken(true); // Force refresh
    return { success: true };
  } catch (error: unknown) {
    const authError = error as AuthError;
    console.error('Token refresh error:', authError);
    return { success: false, error: authError.message };
  }
};

// Export auth and db for direct access (with fallbacks)
export { app, auth, db, storage };
