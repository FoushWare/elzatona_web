/**
 * Admin Login UI Tests
 *
 * Tests for the admin login page component to ensure:
 * - Form rendering and validation
 * - User interactions
 * - Error handling
 * - Loading states
 * - Responsive design
 */

// Set up environment variables before any imports
process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co';
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-anon-key';
process.env.SUPABASE_SERVICE_ROLE_KEY = 'test-service-role-key';

// Mock Supabase before any imports that use it
jest.mock('@supabase/supabase-js', () => ({
  createClient: jest.fn(() => ({
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        eq: jest.fn(() => ({
          single: jest.fn().mockResolvedValue({ data: null, error: null }),
        })),
      })),
    })),
  })),
}));

// Mock nuqs before any imports
jest.mock('nuqs', () => ({
  useQueryState: jest.fn(() => [null, jest.fn()]),
  useQueryStates: jest.fn(() => [{}, jest.fn()]),
  parseAsString: jest.fn(),
  parseAsInteger: jest.fn(),
  createSearchParamsCache: jest.fn(),
}));

// Mock @tanstack/react-query
jest.mock('@tanstack/react-query', () => {
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

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(() => '/admin/login'),
}));

// Mock AdminAuthContext from shared-contexts
// Create a mock function that can be configured per test
const mockUseAdminAuthFn = jest.fn(() => ({
  isAuthenticated: false,
  isLoading: false,
  login: jest.fn(),
  logout: jest.fn(),
  user: null,
}));

// Mock the actual AdminAuthContext file
jest.mock('../../libs/shared-contexts/src/lib/AdminAuthContext', () => {
  const React = require('react');
  const mockFn = jest.fn(() => ({
    isAuthenticated: false,
    isLoading: false,
    login: jest.fn(),
    logout: jest.fn(),
    user: null,
  }));
  return {
    AdminAuthProvider: ({ children }: { children: React.ReactNode }) =>
      children,
    useAdminAuth: mockFn,
  };
});

// Mock the actual ThemeContext file
jest.mock('../../libs/shared-contexts/src/lib/ThemeContext', () => {
  const React = require('react');
  return {
    ThemeProvider: ({ children }: { children: React.ReactNode }) => children,
    useTheme: jest.fn(() => ({
      isDarkMode: false,
      toggleDarkMode: jest.fn(),
      setDarkMode: jest.fn(),
      isLoaded: true,
    })),
  };
});

// Also mock the package entry point
jest.mock('@elzatona/shared-contexts', () => {
  const React = require('react');
  const mockAdminAuthFn = jest.fn(() => ({
    isAuthenticated: false,
    isLoading: false,
    login: jest.fn(),
    logout: jest.fn(),
    user: null,
  }));
  return {
    AdminAuthProvider: ({ children }: { children: React.ReactNode }) =>
      children,
    useAdminAuth: mockAdminAuthFn,
    ThemeProvider: ({ children }: { children: React.ReactNode }) => children,
    useTheme: jest.fn(() => ({
      isDarkMode: false,
      toggleDarkMode: jest.fn(),
    })),
  };
});

// Mock fetch for API calls
global.fetch = jest.fn();

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { useAdminAuth } from '@elzatona/shared-contexts';
import AdminLoginPage from '@/app/admin/login/page';
import { AdminAuthProvider } from '@elzatona/shared-contexts';

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
    (email: string, password: string) => Promise<{ success: boolean }>
  >;
  logout: jest.MockedFunction<() => void>;
  user: { id: string; email: string; name: string; role: string } | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

describe('Admin Login Page', () => {
  const mockPush = jest.fn();
  const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;
  const mockLogin = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    // Reset mock admin auth function to return default values
    mockUseAdminAuthFn.mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      login: mockLogin,
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
        <AdminAuthProvider>
          <AdminLoginPage />
        </AdminAuthProvider>
      );

      expect(screen.getByText('Admin Login')).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /sign in/i })
      ).toBeInTheDocument();
    });

    it('should render admin navbar', () => {
      render(<AdminLoginPage />);

      expect(screen.getByText('Admin Panel')).toBeInTheDocument();
      expect(screen.getByText('Elzatona')).toBeInTheDocument();
    });

    it('should show loading state when authentication is in progress', () => {
      mockUseAdminAuthFn.mockReturnValueOnce({
        isAuthenticated: false,
        isLoading: true,
        login: mockLogin,
        logout: jest.fn(),
        user: null,
      });

      render(<AdminLoginPage />);

      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('should redirect authenticated users to dashboard', () => {
      mockUseAdminAuthFn.mockReturnValueOnce({
        isAuthenticated: true,
        isLoading: false,
        login: mockLogin,
        logout: jest.fn(),
        user: {
          id: '1',
          email: 'admin@example.com',
          name: 'Admin',
          role: 'super_admin',
        },
      });

      render(<AdminLoginPage />);

      expect(mockPush).toHaveBeenCalledWith('/admin/dashboard');
    });
  });

  describe('Form Validation', () => {
    it('should show validation errors for empty fields', async () => {
      render(<AdminLoginPage />);

      const loginButton = screen.getByRole('button', { name: /sign in/i });
      fireEvent.click(loginButton);

      await waitFor(() => {
        expect(screen.getByText('Email is required')).toBeInTheDocument();
        expect(screen.getByText('Password is required')).toBeInTheDocument();
      });
    });

    it('should show validation error for invalid email format', async () => {
      render(<AdminLoginPage />);

      const emailInput = screen.getByLabelText(/email/i);
      const loginButton = screen.getByRole('button', { name: /sign in/i });

      fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
      fireEvent.click(loginButton);

      await waitFor(() => {
        expect(
          screen.getByText('Please enter a valid email address')
        ).toBeInTheDocument();
      });
    });

    it('should show validation error for short password', async () => {
      render(<AdminLoginPage />);

      const passwordInput = screen.getByLabelText(/password/i);
      const loginButton = screen.getByRole('button', { name: /sign in/i });

      fireEvent.change(passwordInput, { target: { value: '123' } });
      fireEvent.click(loginButton);

      await waitFor(() => {
        expect(
          screen.getByText('Password must be at least 6 characters')
        ).toBeInTheDocument();
      });
    });

    it('should clear validation errors when user starts typing', async () => {
      render(<AdminLoginPage />);

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const loginButton = screen.getByRole('button', { name: /sign in/i });

      // Trigger validation errors
      fireEvent.click(loginButton);

      await waitFor(() => {
        expect(screen.getByText('Email is required')).toBeInTheDocument();
        expect(screen.getByText('Password is required')).toBeInTheDocument();
      });

      // Start typing to clear errors
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });

      await waitFor(() => {
        expect(screen.queryByText('Email is required')).not.toBeInTheDocument();
        expect(
          screen.queryByText('Password is required')
        ).not.toBeInTheDocument();
      });
    });
  });

  describe('Form Submission', () => {
    it('should call login function with correct credentials', async () => {
      const loginMock = jest.fn().mockResolvedValue({ success: true });
      mockUseAdminAuthFn.mockReturnValueOnce({
        isAuthenticated: false,
        isLoading: false,
        login: loginMock,
        logout: jest.fn(),
        user: null,
      });

      render(<AdminLoginPage />);

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const loginButton = screen.getByRole('button', { name: /sign in/i });

      fireEvent.change(emailInput, { target: { value: 'admin@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.click(loginButton);

      await waitFor(() => {
        expect(loginMock).toHaveBeenCalledWith(
          'admin@example.com',
          'password123'
        );
      });
    });

    it('should show loading state during login', async () => {
      const loginMock = jest
        .fn()
        .mockImplementation(
          () => new Promise(resolve => setTimeout(resolve, 100))
        );
      mockUseAdminAuth.mockReturnValueOnce({
        isAuthenticated: false,
        isLoading: false,
        login: loginMock,
        logout: jest.fn(),
        user: null,
      });

      render(<AdminLoginPage />);

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const loginButton = screen.getByRole('button', { name: /sign in/i });

      fireEvent.change(emailInput, { target: { value: 'admin@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.click(loginButton);

      expect(screen.getByText('Logging in...')).toBeInTheDocument();
      expect(loginButton).toBeDisabled();
    });

    it('should show error message on login failure', async () => {
      const loginMock = jest
        .fn()
        .mockResolvedValue({ success: false, error: 'Invalid credentials' });
      mockUseAdminAuth.mockReturnValueOnce({
        isAuthenticated: false,
        isLoading: false,
        login: loginMock,
        logout: jest.fn(),
        user: null,
      });

      render(<AdminLoginPage />);

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const loginButton = screen.getByRole('button', { name: /sign in/i });

      fireEvent.change(emailInput, { target: { value: 'admin@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
      fireEvent.click(loginButton);

      await waitFor(() => {
        expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
      });
    });

    it('should handle network errors gracefully', async () => {
      const loginMock = jest.fn().mockRejectedValue(new Error('Network error'));
      mockUseAdminAuth.mockReturnValueOnce({
        isAuthenticated: false,
        isLoading: false,
        login: loginMock,
        logout: jest.fn(),
        user: null,
      });

      render(<AdminLoginPage />);

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const loginButton = screen.getByRole('button', { name: /sign in/i });

      fireEvent.change(emailInput, { target: { value: 'admin@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.click(loginButton);

      await waitFor(() => {
        expect(
          screen.getByText('An error occurred. Please try again.')
        ).toBeInTheDocument();
      });
    });
  });

  describe('User Interactions', () => {
    it('should toggle password visibility', () => {
      render(<AdminLoginPage />);

      const passwordInput = screen.getByLabelText(/password/i);
      const toggleButton = screen.getByRole('button', {
        name: /toggle password visibility/i,
      });

      expect(passwordInput).toHaveAttribute('type', 'password');

      fireEvent.click(toggleButton);
      expect(passwordInput).toHaveAttribute('type', 'text');

      fireEvent.click(toggleButton);
      expect(passwordInput).toHaveAttribute('type', 'password');
    });

    it('should submit form on Enter key press', async () => {
      const loginMock = jest.fn().mockResolvedValue({ success: true });
      mockUseAdminAuthFn.mockReturnValueOnce({
        isAuthenticated: false,
        isLoading: false,
        login: loginMock,
        logout: jest.fn(),
        user: null,
      });

      render(<AdminLoginPage />);

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);

      fireEvent.change(emailInput, { target: { value: 'admin@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.keyDown(passwordInput, { key: 'Enter', code: 'Enter' });

      await waitFor(() => {
        expect(loginMock).toHaveBeenCalledWith(
          'admin@example.com',
          'password123'
        );
      });
    });

    it('should clear form when clicking reset button', () => {
      render(<AdminLoginPage />);

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const resetButton = screen.getByRole('button', { name: /reset/i });

      fireEvent.change(emailInput, { target: { value: 'admin@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });

      fireEvent.click(resetButton);

      expect(emailInput).toHaveValue('');
      expect(passwordInput).toHaveValue('');
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA labels', () => {
      render(<AdminLoginPage />);

      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /sign in/i })
      ).toBeInTheDocument();
    });

    it('should be keyboard navigable', () => {
      render(<AdminLoginPage />);

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const loginButton = screen.getByRole('button', { name: /sign in/i });

      emailInput.focus();
      expect(emailInput).toHaveFocus();

      fireEvent.keyDown(emailInput, { key: 'Tab' });
      expect(passwordInput).toHaveFocus();

      fireEvent.keyDown(passwordInput, { key: 'Tab' });
      expect(loginButton).toHaveFocus();
    });

    it('should announce errors to screen readers', async () => {
      render(<AdminLoginPage />);

      const loginButton = screen.getByRole('button', { name: /sign in/i });
      fireEvent.click(loginButton);

      await waitFor(() => {
        expect(screen.getByRole('alert')).toBeInTheDocument();
      });
    });
  });

  describe('Responsive Design', () => {
    it('should render correctly on mobile viewport', () => {
      // Mock mobile viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });

      render(<AdminLoginPage />);

      const container = screen.getByTestId('admin-login-container');
      expect(container).toHaveClass('min-h-screen', 'px-4', 'py-8');
    });

    it('should render correctly on desktop viewport', () => {
      // Mock desktop viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1024,
      });

      render(<AdminLoginPage />);

      const container = screen.getByTestId('admin-login-container');
      expect(container).toHaveClass('min-h-screen', 'px-8', 'py-16');
    });
  });

  describe('Security Features', () => {
    it('should not log sensitive information', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

      render(<AdminLoginPage />);

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);

      fireEvent.change(emailInput, { target: { value: 'admin@example.com' } });
      fireEvent.change(passwordInput, {
        target: { value: 'secretpassword123' },
      });

      // Check that password is not logged
      expect(consoleSpy).not.toHaveBeenCalledWith(
        expect.stringContaining('secretpassword123')
      );

      consoleSpy.mockRestore();
    });

    it('should prevent XSS attacks in form inputs', () => {
      render(<AdminLoginPage />);

      const emailInput = screen.getByLabelText(/email/i);
      const maliciousInput = '<script>alert("xss")</script>';

      fireEvent.change(emailInput, { target: { value: maliciousInput } });

      // The input should be sanitized and not execute the script
      expect(emailInput).toHaveValue(maliciousInput);
      expect(screen.queryByText('xss')).not.toBeInTheDocument();
    });
  });
});
