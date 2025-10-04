'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { adminConfig } from '../config/admin.config';

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'super-admin';
  avatar?: string;
}

interface AdminAuthContextType {
  user: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(
  undefined
);

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Listen for Firebase auth state changes
    const unsubscribe = onAuthStateChanged(
      auth,
      async (firebaseUser: FirebaseUser | null) => {
        try {
          if (firebaseUser) {
            // Check if user is an admin by looking up their role in Firestore
            const adminDocRef = doc(db, 'admins', firebaseUser.uid);
            const adminDoc = await getDoc(adminDocRef);

            if (adminDoc.exists()) {
              const adminData = adminDoc.data();
              const adminUser: AdminUser = {
                id: firebaseUser.uid,
                name:
                  firebaseUser.displayName || adminData.name || 'Admin User',
                email: firebaseUser.email || '',
                role: adminData.role || 'admin',
                avatar: adminData.avatar,
              };
              setUser(adminUser);
            } else {
              // Check if this is the admin email and create admin document
              if (firebaseUser.email === adminConfig.adminEmail) {
                console.log('Creating admin document for:', firebaseUser.email);
                try {
                  await setDoc(doc(db, 'admins', firebaseUser.uid), {
                    id: firebaseUser.uid,
                    name: firebaseUser.displayName || 'Admin User',
                    email: firebaseUser.email,
                    role: adminConfig.defaultRole,
                    permissions: adminConfig.defaultPermissions,
                    ...adminConfig.adminDocumentSettings,
                  });

                  const adminUser: AdminUser = {
                    id: firebaseUser.uid,
                    name: firebaseUser.displayName || 'Admin User',
                    email: firebaseUser.email || '',
                    role: 'admin',
                    avatar: firebaseUser.photoURL || undefined,
                  };
                  setUser(adminUser);
                } catch (error) {
                  console.error('Error creating admin document:', error);
                  setUser(null);
                }
              } else {
                // User is authenticated but not an admin
                console.warn(
                  'Authenticated user is not an admin:',
                  firebaseUser.email
                );
                setUser(null);
              }
            }
          } else {
            setUser(null);
          }
        } catch (error) {
          console.error('Auth state change failed:', error);
          setUser(null);
        } finally {
          setIsLoading(false);
        }
      }
    );

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Use Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const firebaseUser = userCredential.user;

      // The user will be set automatically by the onAuthStateChanged listener
      console.log('Admin login successful:', firebaseUser.email);
    } catch (error: any) {
      console.error('Login failed:', error);
      // Handle specific Firebase auth errors
      if (error.code === 'auth/user-not-found') {
        throw new Error(
          'No account found with this email address. Please contact the system administrator to create an admin account.'
        );
      } else if (error.code === 'auth/wrong-password') {
        throw new Error('Incorrect password');
      } else if (error.code === 'auth/invalid-email') {
        throw new Error('Invalid email address');
      } else if (error.code === 'auth/too-many-requests') {
        throw new Error('Too many failed attempts. Please try again later');
      } else if (error.code === 'auth/weak-password') {
        throw new Error('Password is too weak');
      } else if (error.code === 'auth/email-already-in-use') {
        throw new Error('Email is already in use');
      } else if (error.code === 'auth/user-disabled') {
        throw new Error(
          'This account has been disabled. Please contact the system administrator.'
        );
      } else if (error.code === 'auth/invalid-credential') {
        throw new Error(
          'Invalid credentials. Please check your email and password.'
        );
      } else if (error.code === 'auth/network-request-failed') {
        throw new Error(
          'Network error. Please check your internet connection and try again.'
        );
      } else {
        throw new Error(
          'Login failed. Please check your credentials and try again.'
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      // The user will be set to null automatically by the onAuthStateChanged listener
      console.log('Admin logout successful');
    } catch (error) {
      console.error('Logout failed:', error);
      // Even if logout fails, clear the local state
      setUser(null);
    }
  };

  const value: AdminAuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
}
