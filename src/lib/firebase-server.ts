// Server-side Firebase configuration for Next.js 15 compatibility
import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore, collection, getDocs, query, where, orderBy, limit, startAfter, doc, getDoc, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'AIzaSyBXlcfcdyIqoeJOb2gXcxpRSmQO7lEP82Y',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'fir-demo-project-adffb.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'fir-demo-project-adffb',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'fir-demo-project-adffb.firebasestorage.app',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '76366138630',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:76366138630:web:0f3381c2f5a62e0401e287',
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || 'G-XZ5VKFGG4Y',
};

// Initialize Firebase app (server-side)
let app: FirebaseApp | null = null;
let db: Firestore | null = null;

try {
  // Check if Firebase app is already initialized
  if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApps()[0];
  }
  
  db = getFirestore(app);
  console.log('✅ Firebase server initialized successfully!');
} catch (error) {
  console.error('❌ Firebase server initialization failed:', error);
}

// Export Firebase utilities for server-side use
export { app, db, collection, getDocs, query, where, orderBy, limit, startAfter, doc, getDoc, addDoc, updateDoc, deleteDoc };