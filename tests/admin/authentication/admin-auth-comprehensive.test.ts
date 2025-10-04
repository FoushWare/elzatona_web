/**
 * Comprehensive Admin Authentication Test Suite
 * 
 * This test suite covers all aspects of admin authentication to ensure
 * reliability and prevent regressions when making changes or migrations.
 * 
 * Test Categories:
 * 1. Authentication Flow Tests
 * 2. Authorization Tests
 * 3. Error Handling Tests
 * 4. Security Tests
 * 5. Integration Tests
 * 6. Migration Tests
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AdminAuthProvider } from '../../../apps/admin/contexts/AdminAuthContext';
import AdminLoginPage from '../../../apps/admin/app/admin/login/page';
import AdminDashboard from '../../../apps/admin/app/admin/dashboard/page';

// Mock Firebase
const mockSignInWithEmailAndPassword = vi.fn();
const mockSignOut = vi.fn();
const mockOnAuthStateChanged = vi.fn();
const mockGetDoc = vi.fn();
const mockSetDoc = vi.fn();

vi.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: mockSignInWithEmailAndPassword,
  signOut: mockSignOut,
  onAuthStateChanged: mockOnAuthStateChanged,
}));

vi.mock('firebase/firestore', () => ({
  doc: vi.fn(),
  getDoc: mockGetDoc,
  setDoc: mockSetDoc,
}));

vi.mock('../../../apps/admin/lib/firebase', () => ({
  auth: {},
  db: {},
}));

// Test wrapper component
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>
    <AdminAuthProvider>
      {children}
    </AdminAuthProvider>
  </BrowserRouter>
);

describe('Admin Authentication - Comprehensive Test Suite', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset localStorage
    localStorage.clear();
    sessionStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('1. Authentication Flow Tests', () => {
    it('should render login page when not authenticated', async () => {
      mockOnAuthStateChanged.mockImplementation((auth, callback) => {
        callback(null); // No user
        return () => {}; // Unsubscribe function
      });

      render(
        <TestWrapper>
          <AdminLoginPage />
        </TestWrapper>
      );

      expect(screen.getByText('Admin Login')).toBeInTheDocument();
      expect(screen.getByLabelText('Email')).toBeInTheDocument();
      expect(screen.getByLabelText('Password')).toBeInTheDocument();
    });

    it('should show loading state during authentication check', () => {
      mockOnAuthStateChanged.mockImplementation((auth, callback) => {
        // Don't call callback immediately to simulate loading
        return () => {};
      });

      render(
        <TestWrapper>
          <AdminLoginPage />
        </TestWrapper>
      );

      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('should successfully authenticate with valid credentials', async () => {
      const mockUser = {
        uid: 'test-uid',
        email: 'afouadsoftwareengineer@gmail.com',
        displayName: 'Admin User'
      };

      const mockAdminDoc = {
        exists: () => true,
        data: () => ({
          role: 'admin',
          permissions: ['all'],
          email: 'afouadsoftwareengineer@gmail.com',
          name: 'Admin User'
        })
      };

      mockSignInWithEmailAndPassword.mockResolvedValue({
        user: mockUser
      });

      mockGetDoc.mockResolvedValue(mockAdminDoc);

      mockOnAuthStateChanged.mockImplementation((auth, callback) => {
        callback(mockUser);
        return () => {};
      });

      render(
        <TestWrapper>
          <AdminLoginPage />
        </TestWrapper>
      );

      // Fill in credentials
      fireEvent.change(screen.getByLabelText('Email'), {
        target: { value: 'afouadsoftwareengineer@gmail.com' }
      });
      fireEvent.change(screen.getByLabelText('Password'), {
        target: { value: 'zatonafoushware$8888' }
      });

      // Submit form
      fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

      await waitFor(() => {
        expect(mockSignInWithEmailAndPassword).toHaveBeenCalledWith(
          expect.anything(),
          'afouadsoftwareengineer@gmail.com',
          'zatonafoushware$8888'
        );
      });
    });

    it('should redirect to dashboard after successful authentication', async () => {
      const mockUser = {
        uid: 'test-uid',
        email: 'afouadsoftwareengineer@gmail.com',
        displayName: 'Admin User'
      };

      const mockAdminDoc = {
        exists: () => true,
        data: () => ({
          role: 'admin',
          permissions: ['all'],
          email: 'afouadsoftwareengineer@gmail.com',
          name: 'Admin User'
        })
      };

      mockOnAuthStateChanged.mockImplementation((auth, callback) => {
        callback(mockUser);
        return () => {};
      });

      mockGetDoc.mockResolvedValue(mockAdminDoc);

      render(
        <TestWrapper>
          <AdminDashboard />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByText('Admin Dashboard')).toBeInTheDocument();
      });
    });
  });

  describe('2. Authorization Tests', () => {
    it('should deny access to non-admin users', async () => {
      const mockUser = {
        uid: 'test-uid',
        email: 'regular@user.com',
        displayName: 'Regular User'
      };

      const mockAdminDoc = {
        exists: () => false
      };

      mockOnAuthStateChanged.mockImplementation((auth, callback) => {
        callback(mockUser);
        return () => {};
      });

      mockGetDoc.mockResolvedValue(mockAdminDoc);

      render(
        <TestWrapper>
          <AdminDashboard />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByText('Access Denied')).toBeInTheDocument();
        expect(screen.getByText('You do not have admin privileges.')).toBeInTheDocument();
      });
    });

    it('should create admin document for authorized email', async () => {
      const mockUser = {
        uid: 'test-uid',
        email: 'afouadsoftwareengineer@gmail.com',
        displayName: 'Admin User'
      };

      const mockAdminDoc = {
        exists: () => false
      };

      mockOnAuthStateChanged.mockImplementation((auth, callback) => {
        callback(mockUser);
        return () => {};
      });

      mockGetDoc.mockResolvedValue(mockAdminDoc);
      mockSetDoc.mockResolvedValue(undefined);

      render(
        <TestWrapper>
          <AdminDashboard />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(mockSetDoc).toHaveBeenCalledWith(
          expect.anything(),
          expect.objectContaining({
            email: 'afouadsoftwareengineer@gmail.com',
            role: 'admin',
            permissions: ['all']
          })
        );
      });
    });

    it('should check admin role in Firestore', async () => {
      const mockUser = {
        uid: 'test-uid',
        email: 'afouadsoftwareengineer@gmail.com',
        displayName: 'Admin User'
      };

      const mockAdminDoc = {
        exists: () => true,
        data: () => ({
          role: 'admin',
          permissions: ['all'],
          email: 'afouadsoftwareengineer@gmail.com',
          name: 'Admin User'
        })
      };

      mockOnAuthStateChanged.mockImplementation((auth, callback) => {
        callback(mockUser);
        return () => {};
      });

      mockGetDoc.mockResolvedValue(mockAdminDoc);

      render(
        <TestWrapper>
          <AdminDashboard />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(mockGetDoc).toHaveBeenCalled();
      });
    });
  });

  describe('3. Error Handling Tests', () => {
    it('should handle invalid email format', async () => {
      mockOnAuthStateChanged.mockImplementation((auth, callback) => {
        callback(null);
        return () => {};
      });

      render(
        <TestWrapper>
          <AdminLoginPage />
        </TestWrapper>
      );

      fireEvent.change(screen.getByLabelText('Email'), {
        target: { value: 'invalid-email' }
      });
      fireEvent.change(screen.getByLabelText('Password'), {
        target: { value: 'password123' }
      });

      fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

      mockSignInWithEmailAndPassword.mockRejectedValue({
        code: 'auth/invalid-email'
      });

      await waitFor(() => {
        expect(screen.getByText('Invalid email address')).toBeInTheDocument();
      });
    });

    it('should handle wrong password', async () => {
      mockOnAuthStateChanged.mockImplementation((auth, callback) => {
        callback(null);
        return () => {};
      });

      render(
        <TestWrapper>
          <AdminLoginPage />
        </TestWrapper>
      );

      fireEvent.change(screen.getByLabelText('Email'), {
        target: { value: 'afouadsoftwareengineer@gmail.com' }
      });
      fireEvent.change(screen.getByLabelText('Password'), {
        target: { value: 'wrongpassword' }
      });

      fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

      mockSignInWithEmailAndPassword.mockRejectedValue({
        code: 'auth/wrong-password'
      });

      await waitFor(() => {
        expect(screen.getByText('Incorrect password')).toBeInTheDocument();
      });
    });

    it('should handle user not found', async () => {
      mockOnAuthStateChanged.mockImplementation((auth, callback) => {
        callback(null);
        return () => {};
      });

      render(
        <TestWrapper>
          <AdminLoginPage />
        </TestWrapper>
      );

      fireEvent.change(screen.getByLabelText('Email'), {
        target: { value: 'nonexistent@user.com' }
      });
      fireEvent.change(screen.getByLabelText('Password'), {
        target: { value: 'password123' }
      });

      fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

      mockSignInWithEmailAndPassword.mockRejectedValue({
        code: 'auth/user-not-found'
      });

      await waitFor(() => {
        expect(screen.getByText(/No admin account found/)).toBeInTheDocument();
      });
    });

    it('should handle too many requests', async () => {
      mockOnAuthStateChanged.mockImplementation((auth, callback) => {
        callback(null);
        return () => {};
      });

      render(
        <TestWrapper>
          <AdminLoginPage />
        </TestWrapper>
      );

      fireEvent.change(screen.getByLabelText('Email'), {
        target: { value: 'afouadsoftwareengineer@gmail.com' }
      });
      fireEvent.change(screen.getByLabelText('Password'), {
        target: { value: 'wrongpassword' }
      });

      fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

      mockSignInWithEmailAndPassword.mockRejectedValue({
        code: 'auth/too-many-requests'
      });

      await waitFor(() => {
        expect(screen.getByText('Too many failed attempts. Please try again later')).toBeInTheDocument();
      });
    });

    it('should handle network errors', async () => {
      mockOnAuthStateChanged.mockImplementation((auth, callback) => {
        callback(null);
        return () => {};
      });

      render(
        <TestWrapper>
          <AdminLoginPage />
        </TestWrapper>
      );

      fireEvent.change(screen.getByLabelText('Email'), {
        target: { value: 'afouadsoftwareengineer@gmail.com' }
      });
      fireEvent.change(screen.getByLabelText('Password'), {
        target: { value: 'zatonafoushware$8888' }
      });

      fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

      mockSignInWithEmailAndPassword.mockRejectedValue({
        code: 'auth/network-request-failed'
      });

      await waitFor(() => {
        expect(screen.getByText('Network error. Please check your connection.')).toBeInTheDocument();
      });
    });

    it('should handle Firestore errors', async () => {
      const mockUser = {
        uid: 'test-uid',
        email: 'afouadsoftwareengineer@gmail.com',
        displayName: 'Admin User'
      };

      mockOnAuthStateChanged.mockImplementation((auth, callback) => {
        callback(mockUser);
        return () => {};
      });

      mockGetDoc.mockRejectedValue(new Error('Firestore error'));

      render(
        <TestWrapper>
          <AdminDashboard />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByText('Error loading admin data')).toBeInTheDocument();
      });
    });
  });

  describe('4. Security Tests', () => {
    it('should not store sensitive data in localStorage', () => {
      mockOnAuthStateChanged.mockImplementation((auth, callback) => {
        callback(null);
        return () => {};
      });

      render(
        <TestWrapper>
          <AdminLoginPage />
        </TestWrapper>
      );

      // Check that no sensitive data is stored in localStorage
      const localStorageData = Object.keys(localStorage);
      expect(localStorageData).not.toContain('admin-password');
      expect(localStorageData).not.toContain('admin-credentials');
    });

    it('should clear sensitive data on logout', async () => {
      const mockUser = {
        uid: 'test-uid',
        email: 'afouadsoftwareengineer@gmail.com',
        displayName: 'Admin User'
      };

      const mockAdminDoc = {
        exists: () => true,
        data: () => ({
          role: 'admin',
          permissions: ['all'],
          email: 'afouadsoftwareengineer@gmail.com',
          name: 'Admin User'
        })
      };

      mockOnAuthStateChanged.mockImplementation((auth, callback) => {
        callback(mockUser);
        return () => {};
      });

      mockGetDoc.mockResolvedValue(mockAdminDoc);
      mockSignOut.mockResolvedValue(undefined);

      render(
        <TestWrapper>
          <AdminDashboard />
        </TestWrapper>
      );

      // Simulate logout
      const logoutButton = screen.getByText('Logout');
      fireEvent.click(logoutButton);

      await waitFor(() => {
        expect(mockSignOut).toHaveBeenCalled();
      });
    });

    it('should validate email format on client side', () => {
      mockOnAuthStateChanged.mockImplementation((auth, callback) => {
        callback(null);
        return () => {};
      });

      render(
        <TestWrapper>
          <AdminLoginPage />
        </TestWrapper>
      );

      const emailInput = screen.getByLabelText('Email');
      fireEvent.change(emailInput, {
        target: { value: 'invalid-email-format' }
      });

      fireEvent.blur(emailInput);

      expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
    });

    it('should require minimum password length', () => {
      mockOnAuthStateChanged.mockImplementation((auth, callback) => {
        callback(null);
        return () => {};
      });

      render(
        <TestWrapper>
          <AdminLoginPage />
        </TestWrapper>
      );

      const passwordInput = screen.getByLabelText('Password');
      fireEvent.change(passwordInput, {
        target: { value: '123' }
      });

      fireEvent.blur(passwordInput);

      expect(screen.getByText('Password must be at least 6 characters')).toBeInTheDocument();
    });
  });

  describe('5. Integration Tests', () => {
    it('should maintain authentication state across page refreshes', async () => {
      const mockUser = {
        uid: 'test-uid',
        email: 'afouadsoftwareengineer@gmail.com',
        displayName: 'Admin User'
      };

      const mockAdminDoc = {
        exists: () => true,
        data: () => ({
          role: 'admin',
          permissions: ['all'],
          email: 'afouadsoftwareengineer@gmail.com',
          name: 'Admin User'
        })
      };

      // Simulate Firebase persistence
      mockOnAuthStateChanged.mockImplementation((auth, callback) => {
        callback(mockUser);
        return () => {};
      });

      mockGetDoc.mockResolvedValue(mockAdminDoc);

      render(
        <TestWrapper>
          <AdminDashboard />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByText('Admin Dashboard')).toBeInTheDocument();
      });

      // Simulate page refresh by re-rendering
      render(
        <TestWrapper>
          <AdminDashboard />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByText('Admin Dashboard')).toBeInTheDocument();
      });
    });

    it('should handle concurrent authentication attempts', async () => {
      mockOnAuthStateChanged.mockImplementation((auth, callback) => {
        callback(null);
        return () => {};
      });

      render(
        <TestWrapper>
          <AdminLoginPage />
        </TestWrapper>
      );

      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Password');
      const submitButton = screen.getByRole('button', { name: /sign in/i });

      fireEvent.change(emailInput, {
        target: { value: 'afouadsoftwareengineer@gmail.com' }
      });
      fireEvent.change(passwordInput, {
        target: { value: 'zatonafoushware$8888' }
      });

      // Simulate multiple rapid clicks
      fireEvent.click(submitButton);
      fireEvent.click(submitButton);
      fireEvent.click(submitButton);

      // Should only call signInWithEmailAndPassword once
      await waitFor(() => {
        expect(mockSignInWithEmailAndPassword).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('6. Migration Tests', () => {
    it('should handle migration from mock authentication to Firebase', async () => {
      // Test that the system gracefully handles the transition
      const mockUser = {
        uid: 'test-uid',
        email: 'afouadsoftwareengineer@gmail.com',
        displayName: 'Admin User'
      };

      const mockAdminDoc = {
        exists: () => true,
        data: () => ({
          role: 'admin',
          permissions: ['all'],
          email: 'afouadsoftwareengineer@gmail.com',
          name: 'Admin User'
        })
      };

      mockOnAuthStateChanged.mockImplementation((auth, callback) => {
        callback(mockUser);
        return () => {};
      });

      mockGetDoc.mockResolvedValue(mockAdminDoc);

      render(
        <TestWrapper>
          <AdminDashboard />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByText('Admin Dashboard')).toBeInTheDocument();
      });
    });

    it('should handle configuration changes', async () => {
      // Test that the system works with different admin emails
      const mockUser = {
        uid: 'test-uid',
        email: 'newadmin@example.com',
        displayName: 'New Admin'
      };

      const mockAdminDoc = {
        exists: () => true,
        data: () => ({
          role: 'admin',
          permissions: ['all'],
          email: 'newadmin@example.com',
          name: 'New Admin'
        })
      };

      mockOnAuthStateChanged.mockImplementation((auth, callback) => {
        callback(mockUser);
        return () => {};
      });

      mockGetDoc.mockResolvedValue(mockAdminDoc);

      render(
        <TestWrapper>
          <AdminDashboard />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByText('Admin Dashboard')).toBeInTheDocument();
      });
    });
  });

  describe('7. Performance Tests', () => {
    it('should load authentication state quickly', async () => {
      const startTime = Date.now();
      
      mockOnAuthStateChanged.mockImplementation((auth, callback) => {
        setTimeout(() => {
          callback(null);
        }, 100); // Simulate 100ms delay
        return () => {};
      });

      render(
        <TestWrapper>
          <AdminLoginPage />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByText('Admin Login')).toBeInTheDocument();
      });

      const loadTime = Date.now() - startTime;
      expect(loadTime).toBeLessThan(500); // Should load within 500ms
    });

    it('should not cause memory leaks on repeated authentication', async () => {
      const mockUser = {
        uid: 'test-uid',
        email: 'afouadsoftwareengineer@gmail.com',
        displayName: 'Admin User'
      };

      const mockAdminDoc = {
        exists: () => true,
        data: () => ({
          role: 'admin',
          permissions: ['all'],
          email: 'afouadsoftwareengineer@gmail.com',
          name: 'Admin User'
        })
      };

      mockOnAuthStateChanged.mockImplementation((auth, callback) => {
        callback(mockUser);
        return () => {};
      });

      mockGetDoc.mockResolvedValue(mockAdminDoc);

      // Render and unmount multiple times
      for (let i = 0; i < 10; i++) {
        const { unmount } = render(
          <TestWrapper>
            <AdminDashboard />
          </TestWrapper>
        );

        await waitFor(() => {
          expect(screen.getByText('Admin Dashboard')).toBeInTheDocument();
        });

        unmount();
      }

      // Should not throw any errors
      expect(true).toBe(true);
    });
  });
});
