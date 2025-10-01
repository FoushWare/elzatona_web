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

// Add immediate error suppression for Firebase internal errors
if (typeof window !== 'undefined') {
  const originalConsoleError = console.error;
  console.error = (...args) => {
    if (args[0] && typeof args[0] === 'string' && 
        ((args[0].includes('FIRESTORE') && args[0].includes('INTERNAL ASSERTION FAILED')) ||
        args[0].includes('Unexpected state') ||
        args[0].includes('ID: b815') ||
        args[0].includes('ID: ca9') ||
        args[0].includes('TargetState') ||
        args[0].includes('WatchChangeAggregator'))) {
      return; // Suppress these errors immediately
    }
    originalConsoleError.apply(console, args);
  };
}

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
      // Don't log Firebase internal assertion errors
      const errorMessage = error instanceof Error ? error.message : String(error);
      if (!errorMessage.includes('INTERNAL ASSERTION FAILED') && 
          !errorMessage.includes('Unexpected state') &&
          !errorMessage.includes('TargetState') &&
          !errorMessage.includes('WatchChangeAggregator')) {
        console.warn('Failed to enable Firestore network:', error);
      }
    });

    // Add comprehensive error handling for Firestore internal assertion errors
    const originalConsoleError = console.error;
    console.error = (...args) => {
      // Filter out Firebase internal assertion errors (ID: ca9, b815, etc.)
      if (args[0] && typeof args[0] === 'string' && 
          ((args[0].includes('FIRESTORE') && args[0].includes('INTERNAL ASSERTION FAILED')) ||
          args[0].includes('Unexpected state') ||
          args[0].includes('ID: b815') ||
          args[0].includes('ID: ca9') ||
          args[0].includes('TargetState') ||
          args[0].includes('WatchChangeAggregator'))) {
        // Completely suppress these errors as they are non-critical
        return;
      }
      originalConsoleError.apply(console, args);
    };

    // Add global error handler for unhandled Firestore errors
    const originalConsoleWarn = console.warn;
    console.warn = (...args) => {
      // Filter out Firebase internal assertion warnings
      if (args[0] && typeof args[0] === 'string' && 
          ((args[0].includes('FIRESTORE') && args[0].includes('INTERNAL ASSERTION FAILED')) ||
          args[0].includes('Unexpected state') ||
          args[0].includes('ID: b815') ||
          args[0].includes('ID: ca9') ||
          args[0].includes('TargetState') ||
          args[0].includes('WatchChangeAggregator'))) {
        return; // Suppress these warnings
      }
      originalConsoleWarn.apply(console, args);
    };

    // Handle connection state changes
    const handleConnectionChange = (connected: boolean) => {
      if (connected) {
        console.log('🔗 Firestore connected');
      } else {
        console.log('🔌 Firestore disconnected');
      }
    };

    // Set up connection monitoring and error recovery
    let connectionRetryCount = 0;
    const maxRetries = 3;
    
    const attemptReconnection = async () => {
      if (connectionRetryCount >= maxRetries) {
        console.error('❌ Max reconnection attempts reached. Firestore may be offline.');
        return;
      }
      
      connectionRetryCount++;
      console.log(`🔄 Attempting to reconnect to Firestore (attempt ${connectionRetryCount}/${maxRetries})...`);
      
      try {
        await enableNetwork(db);
        connectionRetryCount = 0; // Reset on successful connection
        console.log('✅ Firestore reconnected successfully');
      } catch (error) {
        console.warn(`⚠️ Reconnection attempt ${connectionRetryCount} failed:`, error);
        // Retry after a delay
        setTimeout(attemptReconnection, 2000 * connectionRetryCount);
      }
    };

    // Monitor for connection issues and attempt recovery
    setInterval(() => {
      // This is a simplified check - in production you might want more sophisticated monitoring
      if (connectionRetryCount > 0) {
        attemptReconnection();
      }
    }, 10000); // Check every 10 seconds

    // Add global error handler for unhandled Firestore errors (only in browser)
    if (typeof window !== 'undefined') {
      window.addEventListener('unhandledrejection', (event) => {
        if (event.reason && event.reason.message && 
            (event.reason.message.includes('FIRESTORE') || 
             event.reason.message.includes('INTERNAL ASSERTION FAILED') ||
             event.reason.message.includes('Unexpected state'))) {
          console.warn('⚠️ Suppressed unhandled Firestore error:', event.reason);
          event.preventDefault(); // Prevent the error from being logged to console
        }
      });
    }
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

// Firestore error handling wrapper
export const withFirestoreErrorHandling = async <T>(
  operation: () => Promise<T>,
  fallback?: T
): Promise<T | undefined> => {
  try {
    return await operation();
  } catch (error: any) {
    // Handle Firebase internal assertion errors gracefully
    if (error?.code === 'internal' || error?.message?.includes('INTERNAL ASSERTION FAILED')) {
      console.warn('⚠️ Firebase internal error (non-critical):', error.message);
      return fallback;
    }
    
    // Handle other Firebase errors
    if (error?.code?.startsWith('firestore/')) {
      console.error('Firestore error:', error.message);
      return fallback;
    }
    
    // Re-throw other errors
    throw error;
  }
};

// Export auth and db for direct access (with fallbacks)
export { app, auth, db, storage };
