/**
 * Admin Login Integration Tests
 *
 * Integration tests for the admin login flow including:
 * - Authentication context integration
 * - Router navigation
 * - API integration
 * - End-to-end login flow
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
    auth: {
      signInWithPassword: jest.fn(),
      signOut: jest.fn(),
      getUser: jest.fn(),
      onAuthStateChange: jest.fn(),
    },
  })),
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

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { AdminAuthProvider, ThemeProvider } from '@elzatona/shared-contexts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AdminLoginPage from '@/app/admin/login/page';

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(() => '/admin/login'),
}));

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

describe('Admin Login Integration', () => {
  const mockPush = jest.fn();
  const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;
  const queryClient = new QueryClient();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseRouter.mockReturnValue({
      push: mockPush,
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
    } as MockRouter);

    // Mock successful Supabase auth response
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          user: {
            id: 'test-user-id',
            email: 'afouadsoftwareengineer@gmail.com',
            user_metadata: {
              role: 'super_admin',
            },
          },
          session: {
            access_token: 'test-access-token',
            refresh_token: 'test-refresh-token',
          },
        }),
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Authentication Flow', () => {
    it('should complete successful login flow', async () => {
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

      // Fill in credentials
      fireEvent.change(emailInput, {
        target: { value: 'afouadsoftwareengineer@gmail.com' },
      });
      fireEvent.change(passwordInput, {
        target: { value: 'ZatonaFoushware$8888' },
      });

      // Submit form
      fireEvent.click(loginButton);

      // Wait for loading state
      await waitFor(() => {
        expect(screen.getByText('Signing In...')).toBeInTheDocument();
      });

      // Wait for successful login
      await waitFor(
        () => {
          expect(mockPush).toHaveBeenCalledWith('/admin/dashboard');
        },
        { timeout: 3000 }
      );
    });

    it('should handle authentication failure', async () => {
      // Mock failed authentication
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: false,
        json: () =>
          Promise.resolve({
            error: 'Invalid login credentials',
          }),
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

      // Fill in wrong credentials
      fireEvent.change(emailInput, { target: { value: 'wrong@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });

      // Submit form
      fireEvent.click(loginButton);

      // Wait for error message
      await waitFor(() => {
        expect(
          screen.getByText(/Invalid login credentials/)
        ).toBeInTheDocument();
      });
    });

    it('should handle network errors during authentication', async () => {
      // Mock network error
      (global.fetch as jest.Mock).mockRejectedValue(new Error('Network error'));

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

      // Fill in credentials
      fireEvent.change(emailInput, {
        target: { value: 'afouadsoftwareengineer@gmail.com' },
      });
      fireEvent.change(passwordInput, {
        target: { value: 'ZatonaFoushware$8888' },
      });

      // Submit form
      fireEvent.click(loginButton);

      // Wait for error message
      await waitFor(() => {
        expect(
          screen.getByText('An unexpected error occurred')
        ).toBeInTheDocument();
      });
    });
  });

  describe('Session Management', () => {
    it('should redirect authenticated users away from login page', () => {
      // Mock authenticated state
      const mockSupabaseClient = {
        auth: {
          getUser: jest.fn().mockResolvedValue({
            data: {
              user: {
                id: 'test-user-id',
                email: 'afouadsoftwareengineer@gmail.com',
                user_metadata: { role: 'super_admin' },
              },
            },
          }),
          onAuthStateChange: jest.fn(),
          signInWithPassword: jest.fn(),
          signOut: jest.fn(),
        },
      };

      jest.doMock('@supabase/supabase-js', () => ({
        createClient: () => mockSupabaseClient,
      }));

      render(
        <QueryClientProvider client={queryClient}>
          <AdminAuthProvider>
            <ThemeProvider>
              <AdminLoginPage />
            </ThemeProvider>
          </AdminAuthProvider>
        </QueryClientProvider>
      );

      // Should redirect to dashboard
      expect(mockPush).toHaveBeenCalledWith('/admin/dashboard');
    });

    it('should handle session expiration gracefully', async () => {
      // Mock expired session
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: false,
        json: () =>
          Promise.resolve({
            error: 'Session expired',
          }),
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
        expect(screen.getByText(/Session expired/)).toBeInTheDocument();
      });
    });
  });

  describe('Admin Role Validation', () => {
    it('should validate admin role after successful login', async () => {
      // Mock successful login with admin role
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: () =>
          Promise.resolve({
            user: {
              id: 'test-user-id',
              email: 'afouadsoftwareengineer@gmail.com',
              user_metadata: {
                role: 'super_admin',
              },
            },
            session: {
              access_token: 'test-access-token',
              refresh_token: 'test-refresh-token',
            },
          }),
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
        expect(mockPush).toHaveBeenCalledWith('/admin/dashboard');
      });
    });

    it('should reject non-admin users', async () => {
      // Mock successful login but with non-admin role
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: () =>
          Promise.resolve({
            user: {
              id: 'test-user-id',
              email: 'user@example.com',
              user_metadata: {
                role: 'user', // Not an admin role
              },
            },
            session: {
              access_token: 'test-access-token',
              refresh_token: 'test-refresh-token',
            },
          }),
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

      fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'userpassword' } });
      fireEvent.click(loginButton);

      await waitFor(() => {
        expect(screen.getByText(/Access denied/)).toBeInTheDocument();
      });
    });
  });

  describe('Form State Management', () => {
    it('should maintain form state during authentication', async () => {
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

      // Fill form
      fireEvent.change(emailInput, {
        target: { value: 'afouadsoftwareengineer@gmail.com' },
      });
      fireEvent.change(passwordInput, {
        target: { value: 'ZatonaFoushware$8888' },
      });

      // Verify form state is maintained
      expect(emailInput).toHaveValue('afouadsoftwareengineer@gmail.com');
      expect(passwordInput).toHaveValue('ZatonaFoushware$8888');

      // Submit form
      fireEvent.click(loginButton);

      // During loading, form should still maintain values
      await waitFor(() => {
        expect(screen.getByText('Signing In...')).toBeInTheDocument();
      });

      expect(emailInput).toHaveValue('afouadsoftwareengineer@gmail.com');
      expect(passwordInput).toHaveValue('ZatonaFoushware$8888');
    });

    it('should clear form after successful login', async () => {
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

      // Fill and submit form
      fireEvent.change(emailInput, {
        target: { value: 'afouadsoftwareengineer@gmail.com' },
      });
      fireEvent.change(passwordInput, {
        target: { value: 'ZatonaFoushware$8888' },
      });
      fireEvent.click(loginButton);

      // Wait for successful login and redirect
      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/admin/dashboard');
      });

      // Form should be cleared after successful login
      expect(emailInput).toHaveValue('');
      expect(passwordInput).toHaveValue('');
    });
  });

  describe('Error Recovery', () => {
    it('should allow retry after authentication failure', async () => {
      // Mock first failure, then success
      (global.fetch as jest.Mock)
        .mockResolvedValueOnce({
          ok: false,
          json: () =>
            Promise.resolve({
              error: 'Invalid credentials',
            }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: () =>
            Promise.resolve({
              user: {
                id: 'test-user-id',
                email: 'afouadsoftwareengineer@gmail.com',
                user_metadata: { role: 'super_admin' },
              },
              session: {
                access_token: 'test-access-token',
                refresh_token: 'test-refresh-token',
              },
            }),
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

      // First attempt with wrong credentials
      fireEvent.change(emailInput, { target: { value: 'wrong@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
      fireEvent.click(loginButton);

      await waitFor(() => {
        expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
      });

      // Retry with correct credentials
      fireEvent.change(emailInput, {
        target: { value: 'afouadsoftwareengineer@gmail.com' },
      });
      fireEvent.change(passwordInput, {
        target: { value: 'ZatonaFoushware$8888' },
      });
      fireEvent.click(loginButton);

      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/admin/dashboard');
      });
    });
  });
});
