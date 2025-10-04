/**
 * Admin Authentication Context Tests
 *
 * Tests for the AdminAuthContext including:
 * - Login functionality
 * - Logout functionality
 * - Authentication state management
 * - Error handling
 * - Firebase integration
 */

import React from 'react';
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import {
  AdminAuthProvider,
  useAdminAuth,
} from '../../../apps/admin/contexts/AdminAuthContext';
import { auth, db } from '../../../apps/admin/lib/firebase';

// Mock Firebase modules
jest.mock('firebase/auth');
jest.mock('firebase/firestore');
jest.mock('../../../apps/admin/lib/firebase', () => ({
  auth: {},
  db: {},
}));

const mockSignInWithEmailAndPassword =
  signInWithEmailAndPassword as jest.MockedFunction<
    typeof signInWithEmailAndPassword
  >;
const mockSignOut = signOut as jest.MockedFunction<typeof signOut>;
const mockOnAuthStateChanged = onAuthStateChanged as jest.MockedFunction<
  typeof onAuthStateChanged
>;
const mockGetDoc = getDoc as jest.MockedFunction<typeof getDoc>;
const mockSetDoc = setDoc as jest.MockedFunction<typeof setDoc>;

// Mock Firebase user
const mockFirebaseUser = {
  uid: 'test-uid-123',
  email: 'afouadsoftwareengineer@gmail.com',
  displayName: 'Admin User',
  emailVerified: true,
  isAnonymous: false,
  metadata: {},
  providerData: [],
  refreshToken: 'test-refresh-token',
  tenantId: null,
  delete: jest.fn(),
  getIdToken: jest.fn(),
  getIdTokenResult: jest.fn(),
  reload: jest.fn(),
  toJSON: jest.fn(),
};

// Mock admin document
const mockAdminDoc = {
  exists: () => true,
  data: () => ({
    email: 'afouadsoftwareengineer@gmail.com',
    name: 'Admin User',
    role: 'admin',
    permissions: ['all'],
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
  }),
};

// Test component that uses the context
const TestComponent = () => {
  const { user, login, logout, loading, error } = useAdminAuth();

  return (
    <div>
      <div data-testid="user-info">
        {user ? `${user.email} (${user.role})` : 'No user'}
      </div>
      <div data-testid="loading">{loading ? 'Loading...' : 'Not loading'}</div>
      <div data-testid="error">{error || 'No error'}</div>
      <button
        data-testid="login-btn"
        onClick={() => login('test@example.com', 'password123')}
      >
        Login
      </button>
      <button data-testid="logout-btn" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

describe('AdminAuthContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Mock successful Firebase operations by default
    mockSignInWithEmailAndPassword.mockResolvedValue({
      user: mockFirebaseUser,
    } as any);

    mockGetDoc.mockResolvedValue(mockAdminDoc as any);
    mockSetDoc.mockResolvedValue(undefined);
    mockSignOut.mockResolvedValue(undefined);

    // Mock onAuthStateChanged to call callback immediately
    mockOnAuthStateChanged.mockImplementation((auth, callback) => {
      callback(mockFirebaseUser);
      return jest.fn(); // Return unsubscribe function
    });
  });

  describe('Authentication State Management', () => {
    it('should initialize with no user and not loading', () => {
      mockOnAuthStateChanged.mockImplementation((auth, callback) => {
        callback(null); // No user initially
        return jest.fn();
      });

      render(
        <AdminAuthProvider>
          <TestComponent />
        </AdminAuthProvider>
      );

      expect(screen.getByTestId('user-info')).toHaveTextContent('No user');
      expect(screen.getByTestId('loading')).toHaveTextContent('Not loading');
    });

    it('should set loading state during authentication', async () => {
      let resolveLogin: (value: any) => void;
      const loginPromise = new Promise(resolve => {
        resolveLogin = resolve;
      });

      mockSignInWithEmailAndPassword.mockReturnValue(loginPromise as any);

      render(
        <AdminAuthProvider>
          <TestComponent />
        </AdminAuthProvider>
      );

      const loginBtn = screen.getByTestId('login-btn');
      fireEvent.click(loginBtn);

      expect(screen.getByTestId('loading')).toHaveTextContent('Loading...');

      // Resolve the login promise
      act(() => {
        resolveLogin!({ user: mockFirebaseUser });
      });

      await waitFor(() => {
        expect(screen.getByTestId('loading')).toHaveTextContent('Not loading');
      });
    });
  });

  describe('Login Functionality', () => {
    it('should successfully login with valid credentials', async () => {
      render(
        <AdminAuthProvider>
          <TestComponent />
        </AdminAuthProvider>
      );

      const loginBtn = screen.getByTestId('login-btn');
      fireEvent.click(loginBtn);

      await waitFor(() => {
        expect(mockSignInWithEmailAndPassword).toHaveBeenCalledWith(
          auth,
          'test@example.com',
          'password123'
        );
      });

      await waitFor(() => {
        expect(screen.getByTestId('user-info')).toHaveTextContent(
          'afouadsoftwareengineer@gmail.com (admin)'
        );
      });
    });

    it('should handle login errors gracefully', async () => {
      const errorMessage = 'Invalid credentials';
      mockSignInWithEmailAndPassword.mockRejectedValue(new Error(errorMessage));

      render(
        <AdminAuthProvider>
          <TestComponent />
        </AdminAuthProvider>
      );

      const loginBtn = screen.getByTestId('login-btn');
      fireEvent.click(loginBtn);

      await waitFor(() => {
        expect(screen.getByTestId('error')).toHaveTextContent(errorMessage);
      });

      expect(screen.getByTestId('user-info')).toHaveTextContent('No user');
    });

    it('should handle Firebase auth errors with specific messages', async () => {
      const authError = {
        code: 'auth/user-not-found',
        message: 'No user record found',
      };
      mockSignInWithEmailAndPassword.mockRejectedValue(authError);

      render(
        <AdminAuthProvider>
          <TestComponent />
        </AdminAuthProvider>
      );

      const loginBtn = screen.getByTestId('login-btn');
      fireEvent.click(loginBtn);

      await waitFor(() => {
        expect(screen.getByTestId('error')).toHaveTextContent(
          'No user record found'
        );
      });
    });

    it('should create admin document if user email matches admin email', async () => {
      // Mock user with admin email
      const adminUser = {
        ...mockFirebaseUser,
        email: 'afouadsoftwareengineer@gmail.com',
      };

      mockSignInWithEmailAndPassword.mockResolvedValue({
        user: adminUser,
      } as any);

      // Mock that admin document doesn't exist
      mockGetDoc.mockResolvedValue({
        exists: () => false,
      } as any);

      render(
        <AdminAuthProvider>
          <TestComponent />
        </AdminAuthProvider>
      );

      const loginBtn = screen.getByTestId('login-btn');
      fireEvent.click(loginBtn);

      await waitFor(() => {
        expect(mockSetDoc).toHaveBeenCalledWith(
          doc(db, 'admins', adminUser.uid),
          expect.objectContaining({
            email: adminUser.email,
            role: 'admin',
            permissions: ['all'],
          })
        );
      });
    });
  });

  describe('Logout Functionality', () => {
    it('should successfully logout user', async () => {
      // Start with authenticated user
      mockOnAuthStateChanged.mockImplementation((auth, callback) => {
        callback(mockFirebaseUser);
        return jest.fn();
      });

      render(
        <AdminAuthProvider>
          <TestComponent />
        </AdminAuthProvider>
      );

      // Wait for user to be set
      await waitFor(() => {
        expect(screen.getByTestId('user-info')).toHaveTextContent(
          'afouadsoftwareengineer@gmail.com (admin)'
        );
      });

      const logoutBtn = screen.getByTestId('logout-btn');
      fireEvent.click(logoutBtn);

      await waitFor(() => {
        expect(mockSignOut).toHaveBeenCalledWith(auth);
      });
    });

    it('should handle logout errors gracefully', async () => {
      const errorMessage = 'Logout failed';
      mockSignOut.mockRejectedValue(new Error(errorMessage));

      render(
        <AdminAuthProvider>
          <TestComponent />
        </AdminAuthProvider>
      );

      const logoutBtn = screen.getByTestId('logout-btn');
      fireEvent.click(logoutBtn);

      await waitFor(() => {
        expect(screen.getByTestId('error')).toHaveTextContent(errorMessage);
      });
    });
  });

  describe('Admin Role Verification', () => {
    it('should reject user without admin role', async () => {
      const nonAdminUser = {
        ...mockFirebaseUser,
        email: 'regular@example.com',
      };

      mockSignInWithEmailAndPassword.mockResolvedValue({
        user: nonAdminUser,
      } as any);

      // Mock that admin document doesn't exist
      mockGetDoc.mockResolvedValue({
        exists: () => false,
      } as any);

      render(
        <AdminAuthProvider>
          <TestComponent />
        </AdminAuthProvider>
      );

      const loginBtn = screen.getByTestId('login-btn');
      fireEvent.click(loginBtn);

      await waitFor(() => {
        expect(screen.getByTestId('error')).toHaveTextContent(
          'Access denied. Admin role required.'
        );
      });

      expect(screen.getByTestId('user-info')).toHaveTextContent('No user');
    });

    it('should accept user with admin role', async () => {
      render(
        <AdminAuthProvider>
          <TestComponent />
        </AdminAuthProvider>
      );

      const loginBtn = screen.getByTestId('login-btn');
      fireEvent.click(loginBtn);

      await waitFor(() => {
        expect(screen.getByTestId('user-info')).toHaveTextContent(
          'afouadsoftwareengineer@gmail.com (admin)'
        );
      });
    });
  });

  describe('Firebase Integration', () => {
    it('should listen to auth state changes on mount', () => {
      render(
        <AdminAuthProvider>
          <TestComponent />
        </AdminAuthProvider>
      );

      expect(mockOnAuthStateChanged).toHaveBeenCalledWith(
        auth,
        expect.any(Function)
      );
    });

    it('should clean up auth state listener on unmount', () => {
      const unsubscribe = jest.fn();
      mockOnAuthStateChanged.mockReturnValue(unsubscribe);

      const { unmount } = render(
        <AdminAuthProvider>
          <TestComponent />
        </AdminAuthProvider>
      );

      unmount();

      expect(unsubscribe).toHaveBeenCalled();
    });
  });

  describe('Error Handling', () => {
    it('should handle Firestore errors during admin check', async () => {
      mockSignInWithEmailAndPassword.mockResolvedValue({
        user: mockFirebaseUser,
      } as any);

      mockGetDoc.mockRejectedValue(new Error('Firestore error'));

      render(
        <AdminAuthProvider>
          <TestComponent />
        </AdminAuthProvider>
      );

      const loginBtn = screen.getByTestId('login-btn');
      fireEvent.click(loginBtn);

      await waitFor(() => {
        expect(screen.getByTestId('error')).toHaveTextContent(
          'Firestore error'
        );
      });
    });

    it('should clear error when new login attempt is made', async () => {
      // First attempt fails
      mockSignInWithEmailAndPassword.mockRejectedValueOnce(
        new Error('First error')
      );

      render(
        <AdminAuthProvider>
          <TestComponent />
        </AdminAuthProvider>
      );

      const loginBtn = screen.getByTestId('login-btn');
      fireEvent.click(loginBtn);

      await waitFor(() => {
        expect(screen.getByTestId('error')).toHaveTextContent('First error');
      });

      // Second attempt succeeds
      mockSignInWithEmailAndPassword.mockResolvedValue({
        user: mockFirebaseUser,
      } as any);

      fireEvent.click(loginBtn);

      await waitFor(() => {
        expect(screen.getByTestId('error')).toHaveTextContent('No error');
      });
    });
  });
});
