/**
 * Admin Login Page Tests
 *
 * Comprehensive tests for the admin login page component to ensure:
 * - Form rendering and validation
 * - User interactions
 * - Error handling
 * - Loading states
 * - Authentication flow
 * - Accessibility
 */

// Set up environment variables before any imports
process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co';
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-anon-key';
process.env.SUPABASE_SERVICE_ROLE_KEY = 'test-service-role-key';

// Mock nuqs before any imports that use it
jest.mock('nuqs', () => ({
  useQueryState: jest.fn(() => [null, jest.fn()]),
  useQueryStates: jest.fn(() => [{}, jest.fn()]),
  parseAsString: jest.fn(),
  parseAsInteger: jest.fn(),
  createSearchParamsCache: jest.fn(),
}));

// Mock Supabase before any imports
jest.mock('@supabase/supabase-js', () => ({
  createClient: jest.fn(() => ({
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        eq: jest.fn().mockResolvedValue({ data: null, error: null }),
      })),
    })),
  })),
}));

// Mock @tanstack/react-query
jest.mock('@tanstack/react-query', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const React = require('react');
  return {
    QueryClientProvider: ({ children }: { children: React.ReactNode }) =>
      children,
    QueryClient: jest.fn(() => ({
      invalidateQueries: jest.fn(),
      setQueryData: jest.fn(),
      getQueryData: jest.fn(),
    })),
    useQueryClient: jest.fn(() => ({
      invalidateQueries: jest.fn(),
      setQueryData: jest.fn(),
      getQueryData: jest.fn(),
    })),
    useQuery: jest.fn(() => ({
      data: null,
      isLoading: false,
      error: null,
    })),
    useMutation: jest.fn(() => ({
      mutate: jest.fn(),
      mutateAsync: jest.fn(),
      isLoading: false,
      error: null,
    })),
  };
});

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import {
  useAdminAuth,
  AdminAuthProvider,
  ThemeProvider,
} from '@elzatona/shared-contexts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AdminLoginPage from '@/app/admin/login/page';

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Create a mock function that can be configured per test
const mockUseAdminAuthFn = jest.fn(() => ({
  isAuthenticated: false,
  isLoading: false,
  login: jest.fn(),
  logout: jest.fn(),
  user: null,
}));

// Mock AdminAuthContext
jest.mock('@elzatona/shared-contexts', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const React = require('react');
  return {
    AdminAuthProvider: ({ children }: { children: React.ReactNode }) =>
      children,
    useAdminAuth: mockUseAdminAuthFn,
    ThemeProvider: ({ children }: { children: React.ReactNode }) => children,
    useTheme: jest.fn(() => ({
      isDarkMode: false,
      toggleDarkMode: jest.fn(),
      setDarkMode: jest.fn(),
      isLoaded: true,
    })),
  };
});

// Mock fetch for API calls
global.fetch = jest.fn();

// Type definitions for mocks
interface MockRouter {
  push: jest.MockedFunction<(url: string) => void>;
  replace: jest.MockedFunction<(url: string) => void>;
  prefetch: jest.MockedFunction<(url: string) => void>;
  back: jest.MockedFunction<() => void>;
  forward: jest.MockedFunction<() => void>;
  refresh: jest.MockedFunction<() => void>;
}

interface MockAdminAuth {
  login: jest.MockedFunction<
    (
      email: string,
      password: string
    ) => Promise<{ success: boolean; error?: string }>
  >;
  logout: jest.MockedFunction<() => void>;
  user: { id: string; email: string; name: string; role: string } | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

describe('Admin Login Page', () => {
  const mockPush = jest.fn();
  const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;
  const queryClient = new QueryClient();

  beforeEach(() => {
    jest.clearAllMocks();
    // Reset mock admin auth function to return default values
    mockUseAdminAuthFn.mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      login: jest.fn(),
      logout: jest.fn(),
      user: null,
    });
    mockUseRouter.mockReturnValue({
      push: mockPush,
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
    } as MockRouter);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Page Rendering', () => {
    it('should render login form with all required elements', () => {
      render(
        <QueryClientProvider client={queryClient}>
          <AdminAuthProvider>
            <ThemeProvider>
              <AdminLoginPage />
            </ThemeProvider>
          </AdminAuthProvider>
        </QueryClientProvider>
      );

      expect(screen.getByText('Admin Login')).toBeInTheDocument();
      expect(
        screen.getByText('Access the admin dashboard')
      ).toBeInTheDocument();
      expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
      expect(screen.getByLabelText('Password')).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: 'Sign In' })
      ).toBeInTheDocument();
      expect(screen.getByText('← Back to Home')).toBeInTheDocument();
    });

    it('should render admin navbar with correct elements', () => {
      render(
        <QueryClientProvider client={queryClient}>
          <AdminAuthProvider>
            <ThemeProvider>
              <AdminLoginPage />
            </ThemeProvider>
          </AdminAuthProvider>
        </QueryClientProvider>
      );

      expect(screen.getByText('Admin Access Portal')).toBeInTheDocument();
      expect(
        screen.getByText('Secure Authentication Required')
      ).toBeInTheDocument();
      expect(screen.getByText('Back to Site')).toBeInTheDocument();
    });

    it('should show loading state when authentication is in progress', () => {
      mockUseAdminAuthFn.mockReturnValue({
        isAuthenticated: false,
        isLoading: true,
        login: jest.fn(),
        logout: jest.fn(),
        user: null,
      });

      render(
        <QueryClientProvider client={queryClient}>
          <AdminAuthProvider>
            <ThemeProvider>
              <AdminLoginPage />
            </ThemeProvider>
          </AdminAuthProvider>
        </QueryClientProvider>
      );

      expect(screen.getByText('Loading...')).toBeInTheDocument();
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('should redirect authenticated users to dashboard', () => {
      mockUseAdminAuthFn.mockReturnValue({
        isAuthenticated: true,
        isLoading: false,
        login: jest.fn(),
        logout: jest.fn(),
        user: {
          id: '1',
          email: 'afouadsoftwareengineer@gmail.com',
          name: 'Admin User',
          role: 'super_admin',
        },
      });

      render(
        <QueryClientProvider client={queryClient}>
          <AdminAuthProvider>
            <ThemeProvider>
              <AdminLoginPage />
            </ThemeProvider>
          </AdminAuthProvider>
        </QueryClientProvider>
      );

      expect(mockPush).toHaveBeenCalledWith('/admin/dashboard');
    });
  });

  describe('Form Validation', () => {
    it('should show validation errors for empty fields', async () => {
      render(
        <QueryClientProvider client={queryClient}>
          <AdminAuthProvider>
            <ThemeProvider>
              <AdminLoginPage />
            </ThemeProvider>
          </AdminAuthProvider>
        </QueryClientProvider>
      );

      const loginButton = screen.getByRole('button', { name: 'Sign In' });
      fireEvent.click(loginButton);

      await waitFor(() => {
        expect(screen.getByDisplayValue('')).toBeInTheDocument();
      });

      // Check that form validation prevents submission
      const emailInput = screen.getByLabelText('Email Address');
      const passwordInput = screen.getByLabelText('Password');

      expect(emailInput).toBeRequired();
      expect(passwordInput).toBeRequired();
    });

    it('should validate email format', async () => {
      render(
        <QueryClientProvider client={queryClient}>
          <AdminAuthProvider>
            <ThemeProvider>
              <AdminLoginPage />
            </ThemeProvider>
          </AdminAuthProvider>
        </QueryClientProvider>
      );

      const emailInput = screen.getByLabelText('Email Address');
      const loginButton = screen.getByRole('button', { name: 'Sign In' });

      fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
      fireEvent.click(loginButton);

      // HTML5 validation should prevent submission with invalid email
      expect(emailInput).toHaveAttribute('type', 'email');
    });

    it('should clear error messages when user starts typing', async () => {
      const mockLogin = jest.fn().mockResolvedValue({
        success: false,
        error: 'Invalid credentials',
      });
      mockUseAdminAuthFn.mockReturnValue({
        isAuthenticated: false,
        isLoading: false,
        login: mockLogin,
        logout: jest.fn(),
        user: null,
      });

      render(
        <QueryClientProvider client={queryClient}>
          <AdminAuthProvider>
            <ThemeProvider>
              <AdminLoginPage />
            </ThemeProvider>
          </AdminAuthProvider>
        </QueryClientProvider>
      );

      const emailInput = screen.getByLabelText('Email Address');
      const passwordInput = screen.getByLabelText('Password');
      const loginButton = screen.getByRole('button', { name: 'Sign In' });

      // Submit with wrong credentials to trigger error
      fireEvent.change(emailInput, { target: { value: 'wrong@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
      fireEvent.click(loginButton);

      await waitFor(() => {
        expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
      });

      // Start typing to clear error
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

      await waitFor(() => {
        expect(
          screen.queryByText('Invalid credentials')
        ).not.toBeInTheDocument();
      });
    });
  });

  describe('Form Submission', () => {
    it('should call login function with correct credentials', async () => {
      const mockLogin = jest.fn().mockResolvedValue({ success: true });
      mockUseAdminAuthFn.mockReturnValue({
        isAuthenticated: false,
        isLoading: false,
        login: mockLogin,
        logout: jest.fn(),
        user: null,
      });

      render(
        <QueryClientProvider client={queryClient}>
          <AdminAuthProvider>
            <ThemeProvider>
              <AdminLoginPage />
            </ThemeProvider>
          </AdminAuthProvider>
        </QueryClientProvider>
      );

      const emailInput = screen.getByLabelText('Email Address');
      const passwordInput = screen.getByLabelText('Password');
      const loginButton = screen.getByRole('button', { name: 'Sign In' });

      fireEvent.change(emailInput, {
        target: { value: 'afouadsoftwareengineer@gmail.com' },
      });
      fireEvent.change(passwordInput, {
        target: { value: 'ZatonaFoushware$8888' },
      });
      fireEvent.click(loginButton);

      await waitFor(() => {
        expect(mockLogin).toHaveBeenCalledWith(
          'afouadsoftwareengineer@gmail.com',
          'ZatonaFoushware$8888'
        );
      });
    });

    it('should show loading state during login', async () => {
      const mockLogin = jest
        .fn()
        .mockImplementation(
          () =>
            new Promise(resolve =>
              setTimeout(() => resolve({ success: true }), 100)
            )
        );
      mockUseAdminAuthFn.mockReturnValue({
        isAuthenticated: false,
        isLoading: false,
        login: mockLogin,
        logout: jest.fn(),
        user: null,
      });

      render(
        <QueryClientProvider client={queryClient}>
          <AdminAuthProvider>
            <ThemeProvider>
              <AdminLoginPage />
            </ThemeProvider>
          </AdminAuthProvider>
        </QueryClientProvider>
      );

      const emailInput = screen.getByLabelText('Email Address');
      const passwordInput = screen.getByLabelText('Password');
      const loginButton = screen.getByRole('button', { name: 'Sign In' });

      fireEvent.change(emailInput, {
        target: { value: 'afouadsoftwareengineer@gmail.com' },
      });
      fireEvent.change(passwordInput, {
        target: { value: 'ZatonaFoushware$8888' },
      });
      fireEvent.click(loginButton);

      expect(screen.getByText('Signing In...')).toBeInTheDocument();
      expect(loginButton).toBeDisabled();
    });

    it('should show error message on login failure', async () => {
      const mockLogin = jest
        .fn()
        .mockResolvedValue({ success: false, error: 'Invalid credentials' });
      mockUseAdminAuthFn.mockReturnValue({
        isAuthenticated: false,
        isLoading: false,
        login: mockLogin,
        logout: jest.fn(),
        user: null,
      });

      render(
        <QueryClientProvider client={queryClient}>
          <AdminAuthProvider>
            <ThemeProvider>
              <AdminLoginPage />
            </ThemeProvider>
          </AdminAuthProvider>
        </QueryClientProvider>
      );

      const emailInput = screen.getByLabelText('Email Address');
      const passwordInput = screen.getByLabelText('Password');
      const loginButton = screen.getByRole('button', { name: 'Sign In' });

      fireEvent.change(emailInput, { target: { value: 'wrong@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
      fireEvent.click(loginButton);

      await waitFor(() => {
        expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
      });
    });

    it('should handle network errors gracefully', async () => {
      const mockLogin = jest.fn().mockRejectedValue(new Error('Network error'));
      mockUseAdminAuthFn.mockReturnValue({
        isAuthenticated: false,
        isLoading: false,
        login: mockLogin,
        logout: jest.fn(),
        user: null,
      });

      render(
        <QueryClientProvider client={queryClient}>
          <AdminAuthProvider>
            <ThemeProvider>
              <AdminLoginPage />
            </ThemeProvider>
          </AdminAuthProvider>
        </QueryClientProvider>
      );

      const emailInput = screen.getByLabelText('Email Address');
      const passwordInput = screen.getByLabelText('Password');
      const loginButton = screen.getByRole('button', { name: 'Sign In' });

      fireEvent.change(emailInput, {
        target: { value: 'afouadsoftwareengineer@gmail.com' },
      });
      fireEvent.change(passwordInput, {
        target: { value: 'ZatonaFoushware$8888' },
      });
      fireEvent.click(loginButton);

      await waitFor(() => {
        expect(
          screen.getByText('An unexpected error occurred')
        ).toBeInTheDocument();
      });
    });

    it('should handle generic login failure', async () => {
      const mockLogin = jest.fn().mockResolvedValue({ success: false });
      mockUseAdminAuthFn.mockReturnValue({
        isAuthenticated: false,
        isLoading: false,
        login: mockLogin,
        logout: jest.fn(),
        user: null,
      });

      render(
        <QueryClientProvider client={queryClient}>
          <AdminAuthProvider>
            <ThemeProvider>
              <AdminLoginPage />
            </ThemeProvider>
          </AdminAuthProvider>
        </QueryClientProvider>
      );

      const emailInput = screen.getByLabelText('Email Address');
      const passwordInput = screen.getByLabelText('Password');
      const loginButton = screen.getByRole('button', { name: 'Sign In' });

      fireEvent.change(emailInput, { target: { value: 'wrong@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
      fireEvent.click(loginButton);

      await waitFor(() => {
        expect(screen.getByText('Login failed')).toBeInTheDocument();
      });
    });
  });

  describe('User Interactions', () => {
    it('should submit form on Enter key press', async () => {
      const mockLogin = jest.fn().mockResolvedValue({ success: true });
      mockUseAdminAuthFn.mockReturnValue({
        isAuthenticated: false,
        isLoading: false,
        login: mockLogin,
        logout: jest.fn(),
        user: null,
      });

      render(
        <QueryClientProvider client={queryClient}>
          <AdminAuthProvider>
            <ThemeProvider>
              <AdminLoginPage />
            </ThemeProvider>
          </AdminAuthProvider>
        </QueryClientProvider>
      );

      const emailInput = screen.getByLabelText('Email Address');
      const passwordInput = screen.getByLabelText('Password');

      fireEvent.change(emailInput, {
        target: { value: 'afouadsoftwareengineer@gmail.com' },
      });
      fireEvent.change(passwordInput, {
        target: { value: 'ZatonaFoushware$8888' },
      });
      fireEvent.keyDown(passwordInput, { key: 'Enter', code: 'Enter' });

      await waitFor(() => {
        expect(mockLogin).toHaveBeenCalledWith(
          'afouadsoftwareengineer@gmail.com',
          'ZatonaFoushware$8888'
        );
      });
    });

    it('should update form fields correctly', () => {
      render(
        <QueryClientProvider client={queryClient}>
          <AdminAuthProvider>
            <ThemeProvider>
              <AdminLoginPage />
            </ThemeProvider>
          </AdminAuthProvider>
        </QueryClientProvider>
      );

      const emailInput = screen.getByLabelText('Email Address');
      const passwordInput = screen.getByLabelText('Password');

      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'testpassword' } });

      expect(emailInput).toHaveValue('test@example.com');
      expect(passwordInput).toHaveValue('testpassword');
    });

    it('should disable submit button during loading', async () => {
      const mockLogin = jest
        .fn()
        .mockImplementation(
          () =>
            new Promise(resolve =>
              setTimeout(() => resolve({ success: true }), 100)
            )
        );
      mockUseAdminAuthFn.mockReturnValue({
        isAuthenticated: false,
        isLoading: false,
        login: mockLogin,
        logout: jest.fn(),
        user: null,
      });

      render(
        <QueryClientProvider client={queryClient}>
          <AdminAuthProvider>
            <ThemeProvider>
              <AdminLoginPage />
            </ThemeProvider>
          </AdminAuthProvider>
        </QueryClientProvider>
      );

      const emailInput = screen.getByLabelText('Email Address');
      const passwordInput = screen.getByLabelText('Password');
      const loginButton = screen.getByRole('button', { name: 'Sign In' });

      fireEvent.change(emailInput, {
        target: { value: 'afouadsoftwareengineer@gmail.com' },
      });
      fireEvent.change(passwordInput, {
        target: { value: 'ZatonaFoushware$8888' },
      });
      fireEvent.click(loginButton);

      expect(loginButton).toBeDisabled();
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA labels and roles', () => {
      render(
        <QueryClientProvider client={queryClient}>
          <AdminAuthProvider>
            <ThemeProvider>
              <AdminLoginPage />
            </ThemeProvider>
          </AdminAuthProvider>
        </QueryClientProvider>
      );

      expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
      expect(screen.getByLabelText('Password')).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: 'Sign In' })
      ).toBeInTheDocument();
      expect(screen.getByRole('form')).toBeInTheDocument();
    });

    it('should be keyboard navigable', () => {
      render(
        <QueryClientProvider client={queryClient}>
          <AdminAuthProvider>
            <ThemeProvider>
              <AdminLoginPage />
            </ThemeProvider>
          </AdminAuthProvider>
        </QueryClientProvider>
      );

      const emailInput = screen.getByLabelText('Email Address');
      const passwordInput = screen.getByLabelText('Password');
      const loginButton = screen.getByRole('button', { name: 'Sign In' });

      emailInput.focus();
      expect(emailInput).toHaveFocus();

      fireEvent.keyDown(emailInput, { key: 'Tab' });
      expect(passwordInput).toHaveFocus();

      fireEvent.keyDown(passwordInput, { key: 'Tab' });
      expect(loginButton).toHaveFocus();
    });

    it('should have proper form structure', () => {
      render(
        <QueryClientProvider client={queryClient}>
          <AdminAuthProvider>
            <ThemeProvider>
              <AdminLoginPage />
            </ThemeProvider>
          </AdminAuthProvider>
        </QueryClientProvider>
      );

      const form = screen.getByRole('form');
      expect(form).toBeInTheDocument();

      const emailInput = screen.getByLabelText('Email Address');
      const passwordInput = screen.getByLabelText('Password');

      expect(emailInput).toHaveAttribute('type', 'email');
      expect(passwordInput).toHaveAttribute('type', 'password');
      expect(emailInput).toBeRequired();
      expect(passwordInput).toBeRequired();
    });
  });

  describe('Security Features', () => {
    it('should not log sensitive information', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

      render(
        <QueryClientProvider client={queryClient}>
          <AdminAuthProvider>
            <ThemeProvider>
              <AdminLoginPage />
            </ThemeProvider>
          </AdminAuthProvider>
        </QueryClientProvider>
      );

      const emailInput = screen.getByLabelText('Email Address');
      const passwordInput = screen.getByLabelText('Password');

      fireEvent.change(emailInput, {
        target: { value: 'afouadsoftwareengineer@gmail.com' },
      });
      fireEvent.change(passwordInput, {
        target: { value: 'ZatonaFoushware$8888' },
      });

      // Check that password is not logged
      expect(consoleSpy).not.toHaveBeenCalledWith(
        expect.stringContaining('ZatonaFoushware$8888')
      );

      consoleSpy.mockRestore();
    });

    it('should prevent XSS attacks in form inputs', () => {
      render(
        <QueryClientProvider client={queryClient}>
          <AdminAuthProvider>
            <ThemeProvider>
              <AdminLoginPage />
            </ThemeProvider>
          </AdminAuthProvider>
        </QueryClientProvider>
      );

      const emailInput = screen.getByLabelText('Email Address');
      const maliciousInput = '<script>alert("xss")</script>';

      fireEvent.change(emailInput, { target: { value: maliciousInput } });

      // The input should be sanitized and not execute the script
      expect(emailInput).toHaveValue(maliciousInput);
      expect(screen.queryByText('xss')).not.toBeInTheDocument();
    });

    it('should use secure password input type', () => {
      render(
        <QueryClientProvider client={queryClient}>
          <AdminAuthProvider>
            <ThemeProvider>
              <AdminLoginPage />
            </ThemeProvider>
          </AdminAuthProvider>
        </QueryClientProvider>
      );

      const passwordInput = screen.getByLabelText('Password');
      expect(passwordInput).toHaveAttribute('type', 'password');
    });
  });

  describe('Navigation', () => {
    it('should have working back to home link', () => {
      render(
        <QueryClientProvider client={queryClient}>
          <AdminAuthProvider>
            <ThemeProvider>
              <AdminLoginPage />
            </ThemeProvider>
          </AdminAuthProvider>
        </QueryClientProvider>
      );

      const backLink = screen.getByText('← Back to Home');
      expect(backLink).toBeInTheDocument();
      expect(backLink.closest('a')).toHaveAttribute('href', '/');
    });

    it('should have working back to site link in navbar', () => {
      render(
        <QueryClientProvider client={queryClient}>
          <AdminAuthProvider>
            <ThemeProvider>
              <AdminLoginPage />
            </ThemeProvider>
          </AdminAuthProvider>
        </QueryClientProvider>
      );

      const backToSiteLink = screen.getByText('Back to Site');
      expect(backToSiteLink).toBeInTheDocument();
      expect(backToSiteLink.closest('a')).toHaveAttribute('href', '/');
    });
  });

  describe('Theme Support', () => {
    it('should support dark mode classes', () => {
      render(
        <QueryClientProvider client={queryClient}>
          <AdminAuthProvider>
            <ThemeProvider>
              <AdminLoginPage />
            </ThemeProvider>
          </AdminAuthProvider>
        </QueryClientProvider>
      );

      const container = screen.getByText('Admin Login').closest('div');
      expect(container).toHaveClass('dark:text-white');
    });

    it('should have theme toggle button in navbar', () => {
      render(
        <QueryClientProvider client={queryClient}>
          <AdminAuthProvider>
            <ThemeProvider>
              <AdminLoginPage />
            </ThemeProvider>
          </AdminAuthProvider>
        </QueryClientProvider>
      );

      const themeButton = screen.getByLabelText('Toggle theme');
      expect(themeButton).toBeInTheDocument();
    });
  });

  describe('Error Handling', () => {
    it('should display error messages with proper styling', async () => {
      const mockLogin = jest
        .fn()
        .mockResolvedValue({ success: false, error: 'Test error message' });
      mockUseAdminAuthFn.mockReturnValue({
        isAuthenticated: false,
        isLoading: false,
        login: mockLogin,
        logout: jest.fn(),
        user: null,
      });

      render(
        <QueryClientProvider client={queryClient}>
          <AdminAuthProvider>
            <ThemeProvider>
              <AdminLoginPage />
            </ThemeProvider>
          </AdminAuthProvider>
        </QueryClientProvider>
      );

      const emailInput = screen.getByLabelText('Email Address');
      const passwordInput = screen.getByLabelText('Password');
      const loginButton = screen.getByRole('button', { name: 'Sign In' });

      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
      fireEvent.click(loginButton);

      await waitFor(() => {
        const errorMessage = screen.getByText('Test error message');
        expect(errorMessage).toBeInTheDocument();
        expect(errorMessage).toHaveClass('text-red-600');
      });
    });

    it('should clear error state when form is resubmitted', async () => {
      const mockLogin = jest
        .fn()
        .mockResolvedValueOnce({ success: false, error: 'First error' })
        .mockResolvedValueOnce({ success: true });
      mockUseAdminAuthFn.mockReturnValue({
        isAuthenticated: false,
        isLoading: false,
        login: mockLogin,
        logout: jest.fn(),
        user: null,
      });

      render(
        <QueryClientProvider client={queryClient}>
          <AdminAuthProvider>
            <ThemeProvider>
              <AdminLoginPage />
            </ThemeProvider>
          </AdminAuthProvider>
        </QueryClientProvider>
      );

      const emailInput = screen.getByLabelText('Email Address');
      const passwordInput = screen.getByLabelText('Password');
      const loginButton = screen.getByRole('button', { name: 'Sign In' });

      // First submission with error
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
      fireEvent.click(loginButton);

      await waitFor(() => {
        expect(screen.getByText('First error')).toBeInTheDocument();
      });

      // Second submission with success
      fireEvent.change(emailInput, {
        target: { value: 'afouadsoftwareengineer@gmail.com' },
      });
      fireEvent.change(passwordInput, {
        target: { value: 'ZatonaFoushware$8888' },
      });
      fireEvent.click(loginButton);

      await waitFor(() => {
        expect(screen.queryByText('First error')).not.toBeInTheDocument();
      });
    });
  });
});
