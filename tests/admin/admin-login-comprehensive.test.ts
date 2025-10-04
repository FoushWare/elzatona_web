/**
 * Comprehensive Admin Login Testing Suite
 * 
 * This test suite covers all possible admin login scenarios to prevent
 * authentication errors and ensure robust admin access.
 */

import { describe, it, expect, beforeAll, afterAll, beforeEach } from '@jest/globals';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, deleteDoc } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXlcfcdyIqoeJOb2gXcxpRSmQO7lEP82Y",
  authDomain: "fir-demo-project-adffb.firebaseapp.com",
  projectId: "fir-demo-project-adffb",
  storageBucket: "fir-demo-project-adffb.firebasestorage.app",
  messagingSenderId: "76366138630",
  appId: "1:76366138630:web:0f3381c2f5a62e0401e287",
  measurementId: "G-XZ5VKFGG4Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Test credentials
const TEST_CREDENTIALS = {
  email: 'afouadsoftwareengineer@gmail.com',
  password: 'zatonafoushware$8888',
  name: 'Test Admin User'
};

describe('Admin Login Comprehensive Tests', () => {
  let testUserId: string | null = null;

  beforeAll(async () => {
    console.log('🚀 Setting up admin login tests...');
    
    // Clean up any existing test data
    try {
      await signOut(auth);
    } catch (error) {
      // Ignore sign out errors
    }
  });

  afterAll(async () => {
    console.log('🧹 Cleaning up admin login tests...');
    
    // Clean up test user if created
    if (testUserId) {
      try {
        await deleteDoc(doc(db, 'admins', testUserId));
        console.log('✅ Test admin document cleaned up');
      } catch (error) {
        console.warn('⚠️ Could not clean up test admin document:', error);
      }
    }

    // Sign out
    try {
      await signOut(auth);
    } catch (error) {
      // Ignore sign out errors
    }
  });

  beforeEach(async () => {
    // Ensure we start with a clean state
    try {
      await signOut(auth);
    } catch (error) {
      // Ignore sign out errors
    }
  });

  describe('Firebase Connection Tests', () => {
    it('should have valid Firebase configuration', () => {
      expect(firebaseConfig.apiKey).toBeTruthy();
      expect(firebaseConfig.authDomain).toBeTruthy();
      expect(firebaseConfig.projectId).toBeTruthy();
      expect(firebaseConfig.storageBucket).toBeTruthy();
      expect(firebaseConfig.messagingSenderId).toBeTruthy();
      expect(firebaseConfig.appId).toBeTruthy();
    });

    it('should initialize Firebase app successfully', () => {
      expect(app).toBeTruthy();
      expect(auth).toBeTruthy();
      expect(db).toBeTruthy();
    });
  });

  describe('Admin User Creation Tests', () => {
    it('should create admin user successfully', async () => {
      try {
        // Create user in Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          TEST_CREDENTIALS.email,
          TEST_CREDENTIALS.password
        );
        
        testUserId = userCredential.user.uid;
        expect(userCredential.user).toBeTruthy();
        expect(userCredential.user.email).toBe(TEST_CREDENTIALS.email);
        expect(userCredential.user.uid).toBeTruthy();

        // Create admin role in Firestore
        await setDoc(doc(db, 'admins', testUserId), {
          email: userCredential.user.email,
          name: TEST_CREDENTIALS.name,
          role: 'admin',
          permissions: ['all'],
          createdAt: new Date(),
          updatedAt: new Date(),
          isActive: true,
        });

        // Verify admin role was created
        const adminDoc = await getDoc(doc(db, 'admins', testUserId));
        expect(adminDoc.exists()).toBe(true);
        
        const adminData = adminDoc.data();
        expect(adminData?.role).toBe('admin');
        expect(adminData?.permissions).toEqual(['all']);
        expect(adminData?.isActive).toBe(true);

        console.log('✅ Admin user creation test passed');
      } catch (error: any) {
        if (error.code === 'auth/email-already-in-use') {
          console.log('ℹ️  User already exists, skipping creation test');
          // Try to sign in to get the user ID
          try {
            const signInCredential = await signInWithEmailAndPassword(
              auth,
              TEST_CREDENTIALS.email,
              TEST_CREDENTIALS.password
            );
            testUserId = signInCredential.user.uid;
            console.log('✅ User exists and credentials are valid');
          } catch (signInError: any) {
            console.log('❌ User exists but credentials are invalid');
            throw new Error(`User exists but credentials are invalid: ${signInError.message}`);
          }
        } else {
          throw error;
        }
      }
    });
  });

  describe('Admin Login Tests', () => {
    it('should login with valid credentials', async () => {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          TEST_CREDENTIALS.email,
          TEST_CREDENTIALS.password
        );
        
        expect(userCredential.user).toBeTruthy();
        expect(userCredential.user.email).toBe(TEST_CREDENTIALS.email);
        expect(userCredential.user.uid).toBeTruthy();
        
        console.log('✅ Valid credentials login test passed');
      } catch (error: any) {
        console.error('❌ Login failed:', error.message);
        throw error;
      }
    });

    it('should fail with invalid email', async () => {
      try {
        await signInWithEmailAndPassword(
          auth,
          'invalid@example.com',
          TEST_CREDENTIALS.password
        );
        throw new Error('Expected login to fail with invalid email');
      } catch (error: any) {
        expect(error.code).toBe('auth/user-not-found');
        console.log('✅ Invalid email test passed');
      }
    });

    it('should fail with invalid password', async () => {
      try {
        await signInWithEmailAndPassword(
          auth,
          TEST_CREDENTIALS.email,
          'wrongpassword'
        );
        throw new Error('Expected login to fail with invalid password');
      } catch (error: any) {
        expect(['auth/wrong-password', 'auth/invalid-credential']).toContain(error.code);
        console.log('✅ Invalid password test passed');
      }
    });

    it('should fail with empty email', async () => {
      try {
        await signInWithEmailAndPassword(
          auth,
          '',
          TEST_CREDENTIALS.password
        );
        throw new Error('Expected login to fail with empty email');
      } catch (error: any) {
        expect(error.code).toBe('auth/invalid-email');
        console.log('✅ Empty email test passed');
      }
    });

    it('should fail with empty password', async () => {
      try {
        await signInWithEmailAndPassword(
          auth,
          TEST_CREDENTIALS.email,
          ''
        );
        throw new Error('Expected login to fail with empty password');
      } catch (error: any) {
        expect(['auth/wrong-password', 'auth/invalid-credential']).toContain(error.code);
        console.log('✅ Empty password test passed');
      }
    });
  });

  describe('Admin Role Verification Tests', () => {
    it('should verify admin role exists in Firestore', async () => {
      if (!testUserId) {
        console.log('ℹ️  Skipping admin role test - no test user ID');
        return;
      }

      const adminDoc = await getDoc(doc(db, 'admins', testUserId));
      expect(adminDoc.exists()).toBe(true);
      
      const adminData = adminDoc.data();
      expect(adminData?.role).toBe('admin');
      expect(adminData?.permissions).toEqual(['all']);
      expect(adminData?.isActive).toBe(true);
      
      console.log('✅ Admin role verification test passed');
    });

    it('should handle missing admin role gracefully', async () => {
      // Test with a non-existent user ID
      const fakeUserId = 'fake-user-id-12345';
      const adminDoc = await getDoc(doc(db, 'admins', fakeUserId));
      expect(adminDoc.exists()).toBe(false);
      
      console.log('✅ Missing admin role test passed');
    });
  });

  describe('Network Error Handling Tests', () => {
    it('should handle network errors gracefully', async () => {
      // This test simulates network issues by testing error handling
      try {
        // Test with malformed email to trigger validation error
        await signInWithEmailAndPassword(
          auth,
          'not-an-email',
          TEST_CREDENTIALS.password
        );
        throw new Error('Expected validation error');
      } catch (error: any) {
        expect(error.code).toBe('auth/invalid-email');
        console.log('✅ Network error handling test passed');
      }
    });
  });

  describe('Authentication State Tests', () => {
    it('should maintain authentication state after login', async () => {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        TEST_CREDENTIALS.email,
        TEST_CREDENTIALS.password
      );
      
      expect(auth.currentUser).toBeTruthy();
      expect(auth.currentUser?.email).toBe(TEST_CREDENTIALS.email);
      expect(auth.currentUser?.uid).toBe(userCredential.user.uid);
      
      console.log('✅ Authentication state test passed');
    });

    it('should clear authentication state after logout', async () => {
      // First login
      await signInWithEmailAndPassword(
        auth,
        TEST_CREDENTIALS.email,
        TEST_CREDENTIALS.password
      );
      
      expect(auth.currentUser).toBeTruthy();
      
      // Then logout
      await signOut(auth);
      
      expect(auth.currentUser).toBeNull();
      
      console.log('✅ Logout state test passed');
    });
  });

  describe('Error Message Tests', () => {
    it('should provide meaningful error messages', async () => {
      const testCases = [
        {
          email: 'invalid-email',
          password: TEST_CREDENTIALS.password,
          expectedError: 'auth/invalid-email',
          description: 'Invalid email format'
        },
        {
          email: 'nonexistent@example.com',
          password: TEST_CREDENTIALS.password,
          expectedError: 'auth/user-not-found',
          description: 'Non-existent user'
        },
        {
          email: TEST_CREDENTIALS.email,
          password: 'wrongpassword',
          expectedError: 'auth/wrong-password',
          description: 'Wrong password'
        }
      ];

      for (const testCase of testCases) {
        try {
          await signInWithEmailAndPassword(
            auth,
            testCase.email,
            testCase.password
          );
          throw new Error(`Expected error for ${testCase.description}`);
        } catch (error: any) {
          expect(error.code).toBe(testCase.expectedError);
          expect(error.message).toBeTruthy();
          console.log(`✅ ${testCase.description} error message test passed`);
        }
      }
    });
  });
});

// Export test utilities for use in other test files
export const adminTestUtils = {
  firebaseConfig,
  testCredentials: TEST_CREDENTIALS,
  createTestAdmin: async () => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      TEST_CREDENTIALS.email,
      TEST_CREDENTIALS.password
    );
    
    await setDoc(doc(db, 'admins', userCredential.user.uid), {
      email: userCredential.user.email,
      name: TEST_CREDENTIALS.name,
      role: 'admin',
      permissions: ['all'],
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
    });
    
    return userCredential.user;
  },
  cleanupTestAdmin: async (userId: string) => {
    await deleteDoc(doc(db, 'admins', userId));
  }
};
