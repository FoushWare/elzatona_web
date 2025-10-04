/**
 * Admin Login Integration Tests
 *
 * Integration tests for admin login functionality including:
 * - Login form interactions
 * - Authentication flow
 * - Redirect behavior
 * - Error handling
 * - Success scenarios
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import AdminLoginPage from '../../../apps/admin/app/admin/login/page';
import { AdminAuthProvider } from '../../../apps/admin/contexts/AdminAuthContext';
import { auth, db } from '../../../apps/admin/lib/firebase';

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock Firebase modules
jest.mock('firebase/auth');
jest.mock('firebase/firestore');
jest.mock('../../../apps/admin/lib/firebase', () => ({
  auth: {},
  db: {},
}));

const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;
const mockSignInWithEmailAndPassword =
  signInWithEmailAndPassword as jest.MockedFunction<
    typeof signInWithEmailAndPassword
  >;
const mockGetDoc = getDoc as jest.MockedFunction<typeof getDoc>;

// Mock router functions
const mockPush = jest.fn();
const mockReplace = jest.fn();

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

// Test wrapper component
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <AdminAuthProvider>{children}</AdminAuthProvider>
);

describe('Admin Login Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Setup router mock
    mockUseRouter.mockReturnValue({
      push: mockPush,
      replace: mockReplace,
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
      prefetch: jest.fn(),
    } as any);

    // Mock successful Firebase operations by default
    mockSignInWithEmailAndPassword.mockResolvedValue({
      user: mockFirebaseUser,
    } as any);

    mockGetDoc.mockResolvedValue(mockAdminDoc as any);
  });

  describe('Login Form Interactions', () => {
    it('should render login form with all required elements', () => {
      render(
        <TestWrapper>
          <AdminLoginPage />
        </TestWrapper>
      );

      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /sign in/i })
      ).toBeInTheDocument();
      expect(screen.getByText(/admin panel/i)).toBeInTheDocument();
    });

    it('should update form fields when user types', () => {
      render(
        <TestWrapper>
          <AdminLoginPage />
        </TestWrapper>
      );

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);

      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });

      expect(emailInput).toHaveValue('test@example.com');
      expect(passwordInput).toHaveValue('password123');
    });

    it('should show validation errors for empty fields', async () => {
      render(
        <TestWrapper>
          <AdminLoginPage />
        </TestWrapper>
      );

      const submitButton = screen.getByRole('button', { name: /sign in/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/email is required/i)).toBeInTheDocument();
        expect(screen.getByText(/password is required/i)).toBeInTheDocument();
      });
    });

    it('should show validation error for invalid email format', async () => {
      render(
        <TestWrapper>
          <AdminLoginPage />
        </TestWrapper>
      );

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByRole('button', { name: /sign in/i });

      fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/invalid email format/i)).toBeInTheDocument();
      });
    });
  });

  describe('Successful Login Flow', () => {
    it('should successfully login with valid credentials', async () => {
      render(
        <TestWrapper>
          <AdminLoginPage />
        </TestWrapper>
      );

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByRole('button', { name: /sign in/i });

      fireEvent.change(emailInput, {
        target: { value: 'afouadsoftwareengineer@gmail.com' },
      });
      fireEvent.change(passwordInput, {
        target: { value: 'zatonafoushware$8888' },
      });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockSignInWithEmailAndPassword).toHaveBeenCalledWith(
          auth,
          'afouadsoftwareengineer@gmail.com',
          'zatonafoushware$8888'
        );
      });

      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/admin/dashboard');
      });
    });

    it('should show loading state during login', async () => {
      let resolveLogin: (value: any) => void;
      const loginPromise = new Promise(resolve => {
        resolveLogin = resolve;
      });

      mockSignInWithEmailAndPassword.mockReturnValue(loginPromise as any);

      render(
        <TestWrapper>
          <AdminLoginPage />
        </TestWrapper>
      );

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByRole('button', { name: /sign in/i });

      fireEvent.change(emailInput, {
        target: { value: 'afouadsoftwareengineer@gmail.com' },
      });
      fireEvent.change(passwordInput, {
        target: { value: 'zatonafoushware$8888' },
      });
      fireEvent.click(submitButton);

      expect(screen.getByText(/signing in/i)).toBeInTheDocument();
      expect(submitButton).toBeDisabled();

      // Resolve the login promise
      resolveLogin!({ user: mockFirebaseUser });
    });

    it('should clear form after successful login', async () => {
      render(
        <TestWrapper>
          <AdminLoginPage />
        </TestWrapper>
      );

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByRole('button', { name: /sign in/i });

      fireEvent.change(emailInput, {
        target: { value: 'afouadsoftwareengineer@gmail.com' },
      });
      fireEvent.change(passwordInput, {
        target: { value: 'zatonafoushware$8888' },
      });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(emailInput).toHaveValue('');
        expect(passwordInput).toHaveValue('');
      });
    });
  });

  describe('Error Handling', () => {
    it('should display error message for invalid credentials', async () => {
      mockSignInWithEmailAndPassword.mockRejectedValue(
        new Error('Invalid credentials')
      );

      render(
        <TestWrapper>
          <AdminLoginPage />
        </TestWrapper>
      );

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByRole('button', { name: /sign in/i });

      fireEvent.change(emailInput, { target: { value: 'wrong@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
      });
    });

    it('should display error message for network errors', async () => {
      mockSignInWithEmailAndPassword.mockRejectedValue(
        new Error('Network error')
      );

      render(
        <TestWrapper>
          <AdminLoginPage />
        </TestWrapper>
      );

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByRole('button', { name: /sign in/i });

      fireEvent.change(emailInput, {
        target: { value: 'afouadsoftwareengineer@gmail.com' },
      });
      fireEvent.change(passwordInput, {
        target: { value: 'zatonafoushware$8888' },
      });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/network error/i)).toBeInTheDocument();
      });
    });

    it('should display error message for admin role verification failure', async () => {
      mockSignInWithEmailAndPassword.mockResolvedValue({
        user: mockFirebaseUser,
      } as any);

      // Mock that admin document doesn't exist
      mockGetDoc.mockResolvedValue({
        exists: () => false,
      } as any);

      render(
        <TestWrapper>
          <AdminLoginPage />
        </TestWrapper>
      );

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByRole('button', { name: /sign in/i });

      fireEvent.change(emailInput, {
        target: { value: 'afouadsoftwareengineer@gmail.com' },
      });
      fireEvent.change(passwordInput, {
        target: { value: 'zatonafoushware$8888' },
      });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/access denied/i)).toBeInTheDocument();
      });
    });

    it('should clear error message when user starts typing again', async () => {
      mockSignInWithEmailAndPassword.mockRejectedValueOnce(
        new Error('Invalid credentials')
      );

      render(
        <TestWrapper>
          <AdminLoginPage />
        </TestWrapper>
      );

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByRole('button', { name: /sign in/i });

      fireEvent.change(emailInput, { target: { value: 'wrong@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
      });

      // Start typing again
      fireEvent.change(emailInput, { target: { value: 'new@example.com' } });

      await waitFor(() => {
        expect(
          screen.queryByText(/invalid credentials/i)
        ).not.toBeInTheDocument();
      });
    });
  });

  describe('Navigation and Redirects', () => {
    it('should redirect to dashboard on successful login', async () => {
      render(
        <TestWrapper>
          <AdminLoginPage />
        </TestWrapper>
      );

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByRole('button', { name: /sign in/i });

      fireEvent.change(emailInput, {
        target: { value: 'afouadsoftwareengineer@gmail.com' },
      });
      fireEvent.change(passwordInput, {
        target: { value: 'zatonafoushware$8888' },
      });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/admin/dashboard');
      });
    });

    it('should not redirect on failed login', async () => {
      mockSignInWithEmailAndPassword.mockRejectedValue(
        new Error('Invalid credentials')
      );

      render(
        <TestWrapper>
          <AdminLoginPage />
        </TestWrapper>
      );

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByRole('button', { name: /sign in/i });

      fireEvent.change(emailInput, { target: { value: 'wrong@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
      });

      expect(mockPush).not.toHaveBeenCalled();
    });
  });

  describe('Form Accessibility', () => {
    it('should have proper form labels and ARIA attributes', () => {
      render(
        <TestWrapper>
          <AdminLoginPage />
        </TestWrapper>
      );

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByRole('button', { name: /sign in/i });

      expect(emailInput).toHaveAttribute('type', 'email');
      expect(passwordInput).toHaveAttribute('type', 'password');
      expect(submitButton).toHaveAttribute('type', 'submit');
    });

    it('should support keyboard navigation', () => {
      render(
        <TestWrapper>
          <AdminLoginPage />
        </TestWrapper>
      );

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByRole('button', { name: /sign in/i });

      // Tab navigation
      emailInput.focus();
      expect(emailInput).toHaveFocus();

      fireEvent.keyDown(emailInput, { key: 'Tab' });
      expect(passwordInput).toHaveFocus();

      fireEvent.keyDown(passwordInput, { key: 'Tab' });
      expect(submitButton).toHaveFocus();
    });

    it('should submit form on Enter key press', async () => {
      render(
        <TestWrapper>
          <AdminLoginPage />
        </TestWrapper>
      );

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);

      fireEvent.change(emailInput, {
        target: { value: 'afouadsoftwareengineer@gmail.com' },
      });
      fireEvent.change(passwordInput, {
        target: { value: 'zatonafoushware$8888' },
      });

      fireEvent.keyDown(passwordInput, { key: 'Enter' });

      await waitFor(() => {
        expect(mockSignInWithEmailAndPassword).toHaveBeenCalled();
      });
    });
  });
});
