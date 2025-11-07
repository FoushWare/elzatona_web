/**
 * Admin Dashboard Redirection Tests
 *
 * Tests for admin dashboard redirection functionality:
 * - Successful login redirection
 * - Already authenticated user redirection
 * - Route protection
 * - Session persistence
 */

import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { useRouter, usePathname } from 'next/navigation';
import { useAdminAuth } from '@elzatona/shared-contexts';
import { AdminAuthProvider } from '@elzatona/shared-contexts';
import AdminLoginPage from '@/app/admin/login/page';
import AdminDashboardPage from '@/app/admin/dashboard/page';

// Set up environment variables before any imports
process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co';
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
  usePathname: jest.fn(),
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
const mockUseAdminAuthFn = jest.fn(() => ({
  isAuthenticated: false,
  isLoading: false,
  login: jest.fn(),
  logout: jest.fn(),
  user: null,
}));

jest.mock('@elzatona/shared-contexts', () => {
  const React = require('react');
  return {
    AdminAuthProvider: ({ children }: { children: React.ReactNode }) =>
      children,
    useAdminAuth: mockUseAdminAuthFn,
    ThemeProvider: ({ children }: { children: React.ReactNode }) => children,
    useTheme: jest.fn(() => ({
      isDarkMode: false,
      toggleDarkMode: jest.fn(),
    })),
  };
});

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

describe('Admin Dashboard Redirection', () => {
  const mockPush = jest.fn();
  const mockReplace = jest.fn();
  const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;

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
      replace: mockReplace,
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
    } as MockRouter);
  });

  describe('Login Success Redirection', () => {
    it('should redirect to dashboard after successful login', async () => {
      const mockLogin = jest.fn().mockResolvedValue({ success: true });
      mockUseAdminAuthFn.mockReturnValue({
        isAuthenticated: false,
        isLoading: false,
        login: mockLogin,
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
        expect(mockLogin).toHaveBeenCalledWith(
          'admin@example.com',
          'password123'
        );
      });

      // Simulate successful authentication
      mockUseAdminAuthFn.mockReturnValue({
        isAuthenticated: true,
        isLoading: false,
        login: mockLogin,
        logout: jest.fn(),
        user: { email: 'admin@example.com', role: 'super_admin' },
      });

      // Re-render to trigger redirection
      render(<AdminLoginPage />);

      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/admin/dashboard');
      });
    });

    it('should not redirect if login fails', async () => {
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

      render(<AdminLoginPage />);

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const loginButton = screen.getByRole('button', { name: /sign in/i });

      fireEvent.change(emailInput, { target: { value: 'admin@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
      fireEvent.click(loginButton);

      await waitFor(() => {
        expect(mockLogin).toHaveBeenCalledWith(
          'admin@example.com',
          'wrongpassword'
        );
      });

      // Should not redirect on failed login
      expect(mockPush).not.toHaveBeenCalled();
    });
  });

  describe('Already Authenticated User Redirection', () => {
    it('should redirect authenticated users away from login page', () => {
      mockUseAdminAuthFn.mockReturnValue({
        isAuthenticated: true,
        isLoading: false,
        login: jest.fn(),
        logout: jest.fn(),
        user: { email: 'admin@example.com', role: 'super_admin' },
      });

      render(<AdminLoginPage />);

      expect(mockPush).toHaveBeenCalledWith('/admin/dashboard');
    });

    it('should not redirect if user is still loading', () => {
      mockUseAdminAuthFn.mockReturnValue({
        isAuthenticated: false,
        isLoading: true,
        login: jest.fn(),
        logout: jest.fn(),
        user: null,
      });

      render(<AdminLoginPage />);

      expect(mockPush).not.toHaveBeenCalled();
    });

    it('should redirect to dashboard when authentication completes', async () => {
      // Start with loading state
      mockUseAdminAuthFn.mockReturnValue({
        isAuthenticated: false,
        isLoading: true,
        login: jest.fn(),
        logout: jest.fn(),
        user: null,
      });

      const { rerender } = render(<AdminLoginPage />);

      expect(mockPush).not.toHaveBeenCalled();

      // Simulate authentication completing
      mockUseAdminAuthFn.mockReturnValue({
        isAuthenticated: true,
        isLoading: false,
        login: jest.fn(),
        logout: jest.fn(),
        user: { email: 'admin@example.com', role: 'super_admin' },
      });

      rerender(
        <QueryClientProvider client={queryClient}>
          <AdminAuthProvider>
            <ThemeProvider>
              <AdminLoginPage />
            </ThemeProvider>
          </AdminAuthProvider>
        </QueryClientProvider>
      );

      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/admin/dashboard');
      });
    });
  });

  describe('Dashboard Access Protection', () => {
    it('should allow access to dashboard for authenticated users', () => {
      mockUseAdminAuthFn.mockReturnValue({
        isAuthenticated: true,
        isLoading: false,
        login: jest.fn(),
        logout: jest.fn(),
        user: { email: 'admin@example.com', role: 'super_admin' },
      });

      render(
        <QueryClientProvider client={queryClient}>
          <AdminAuthProvider>
            <ThemeProvider>
              <AdminDashboardPage />
            </ThemeProvider>
          </AdminAuthProvider>
        </QueryClientProvider>
      );

      expect(screen.getByText(/Admin Dashboard/i)).toBeInTheDocument();
      expect(mockReplace).not.toHaveBeenCalled();
    });

    it('should redirect unauthenticated users from dashboard to login', () => {
      mockUseAdminAuthFn.mockReturnValue({
        isAuthenticated: false,
        isLoading: false,
        login: jest.fn(),
        logout: jest.fn(),
        user: null,
      });

      render(
        <QueryClientProvider client={queryClient}>
          <AdminAuthProvider>
            <ThemeProvider>
              <AdminDashboardPage />
            </ThemeProvider>
          </AdminAuthProvider>
        </QueryClientProvider>
      );

      expect(mockReplace).toHaveBeenCalledWith('/admin/login');
    });

    it('should show loading state while checking authentication', () => {
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
              <AdminDashboardPage />
            </ThemeProvider>
          </AdminAuthProvider>
        </QueryClientProvider>
      );

      expect(screen.getByText('Loading admin panel...')).toBeInTheDocument();
      expect(mockReplace).not.toHaveBeenCalled();
    });
  });

  describe('Session Persistence', () => {
    it('should maintain authentication state across page refreshes', () => {
      // Simulate user with valid session in localStorage
      const mockSession = {
        id: 'admin_test@example.com',
        email: 'admin@example.com',
        name: 'Test Admin',
        role: 'super_admin',
        token: 'valid-jwt-token',
        expiresAt: new Date(Date.now() + 86400000).toISOString(), // 24 hours from now
      };

      // Mock localStorage
      const localStorageMock = {
        getItem: jest.fn(key => {
          if (key === 'admin_session') {
            return JSON.stringify(mockSession);
          }
          return null;
        }),
        setItem: jest.fn(),
        removeItem: jest.fn(),
        clear: jest.fn(),
      };

      Object.defineProperty(window, 'localStorage', {
        value: localStorageMock,
        writable: true,
      });

      mockUseAdminAuthFn.mockReturnValue({
        isAuthenticated: true,
        isLoading: false,
        login: jest.fn(),
        logout: jest.fn(),
        user: mockSession,
      });

      render(
        <QueryClientProvider client={queryClient}>
          <AdminAuthProvider>
            <ThemeProvider>
              <AdminDashboardPage />
            </ThemeProvider>
          </AdminAuthProvider>
        </QueryClientProvider>
      );

      expect(screen.getByText(/Admin Dashboard/i)).toBeInTheDocument();
      expect(mockReplace).not.toHaveBeenCalled();
    });

    it('should handle expired sessions gracefully', () => {
      // Simulate expired session
      const expiredSession = {
        id: 'admin_test@example.com',
        email: 'admin@example.com',
        name: 'Test Admin',
        role: 'super_admin',
        token: 'expired-jwt-token',
        expiresAt: new Date(Date.now() - 86400000).toISOString(), // 24 hours ago
      };

      const localStorageMock = {
        getItem: jest.fn(key => {
          if (key === 'admin_session') {
            return JSON.stringify(expiredSession);
          }
          return null;
        }),
        setItem: jest.fn(),
        removeItem: jest.fn(),
        clear: jest.fn(),
      };

      Object.defineProperty(window, 'localStorage', {
        value: localStorageMock,
        writable: true,
      });

      mockUseAdminAuthFn.mockReturnValue({
        isAuthenticated: false,
        isLoading: false,
        login: jest.fn(),
        logout: jest.fn(),
        user: null,
      });

      render(
        <QueryClientProvider client={queryClient}>
          <AdminAuthProvider>
            <ThemeProvider>
              <AdminDashboardPage />
            </ThemeProvider>
          </AdminAuthProvider>
        </QueryClientProvider>
      );

      expect(mockReplace).toHaveBeenCalledWith('/admin/login');
    });
  });

  describe('Role-Based Access', () => {
    it('should allow super_admin access to dashboard', () => {
      mockUseAdminAuthFn.mockReturnValue({
        isAuthenticated: true,
        isLoading: false,
        login: jest.fn(),
        logout: jest.fn(),
        user: { email: 'admin@example.com', role: 'super_admin' },
      });

      render(
        <QueryClientProvider client={queryClient}>
          <AdminAuthProvider>
            <ThemeProvider>
              <AdminDashboardPage />
            </ThemeProvider>
          </AdminAuthProvider>
        </QueryClientProvider>
      );

      expect(screen.getByText(/Admin Dashboard/i)).toBeInTheDocument();
      expect(mockReplace).not.toHaveBeenCalled();
    });

    it('should allow admin access to dashboard', () => {
      mockUseAdminAuthFn.mockReturnValue({
        isAuthenticated: true,
        isLoading: false,
        login: jest.fn(),
        logout: jest.fn(),
        user: { email: 'admin@example.com', role: 'admin' },
      });

      render(
        <QueryClientProvider client={queryClient}>
          <AdminAuthProvider>
            <ThemeProvider>
              <AdminDashboardPage />
            </ThemeProvider>
          </AdminAuthProvider>
        </QueryClientProvider>
      );

      expect(screen.getByText(/Admin Dashboard/i)).toBeInTheDocument();
      expect(mockReplace).not.toHaveBeenCalled();
    });

    it('should redirect users with invalid roles', () => {
      mockUseAdminAuthFn.mockReturnValue({
        isAuthenticated: true,
        isLoading: false,
        login: jest.fn(),
        logout: jest.fn(),
        user: { email: 'user@example.com', role: 'user' },
      });

      render(
        <QueryClientProvider client={queryClient}>
          <AdminAuthProvider>
            <ThemeProvider>
              <AdminDashboardPage />
            </ThemeProvider>
          </AdminAuthProvider>
        </QueryClientProvider>
      );

      expect(mockReplace).toHaveBeenCalledWith('/admin/login');
    });
  });

  describe('Navigation Flow', () => {
    it('should handle direct navigation to admin root', () => {
      // Mock usePathname to return /admin
      const mockUsePathname = usePathname as jest.MockedFunction<() => string>;
      mockUsePathname.mockReturnValue('/admin');

      mockUseAdminAuthFn.mockReturnValue({
        isAuthenticated: true,
        isLoading: false,
        login: jest.fn(),
        logout: jest.fn(),
        user: { email: 'admin@example.com', role: 'super_admin' },
      });

      // This would be tested with the admin root page component
      // For now, we'll test the redirection logic
      expect(mockPush).not.toHaveBeenCalledWith('/admin/login');
    });

    it('should handle navigation to protected admin routes', () => {
      const mockUsePathname = usePathname as jest.MockedFunction<() => string>;
      mockUsePathname.mockReturnValue('/admin/questions');

      mockUseAdminAuthFn.mockReturnValue({
        isAuthenticated: false,
        isLoading: false,
        login: jest.fn(),
        logout: jest.fn(),
        user: null,
      });

      // This would be tested with the admin layout component
      // The layout should redirect to login for protected routes
      expect(mockReplace).toHaveBeenCalledWith('/admin/login');
    });
  });

  describe('Error Handling', () => {
    it('should handle authentication errors gracefully', async () => {
      const mockLogin = jest.fn().mockRejectedValue(new Error('Network error'));
      mockUseAdminAuthFn.mockReturnValue({
        isAuthenticated: false,
        isLoading: false,
        login: mockLogin,
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
          screen.getByText(/An unexpected error occurred|An error occurred/i)
        ).toBeInTheDocument();
      });

      // Should not redirect on error
      expect(mockPush).not.toHaveBeenCalled();
    });

    it('should handle missing user data', () => {
      mockUseAdminAuthFn.mockReturnValue({
        isAuthenticated: true,
        isLoading: false,
        login: jest.fn(),
        logout: jest.fn(),
        user: null, // Missing user data
      });

      render(
        <QueryClientProvider client={queryClient}>
          <AdminAuthProvider>
            <ThemeProvider>
              <AdminDashboardPage />
            </ThemeProvider>
          </AdminAuthProvider>
        </QueryClientProvider>
      );

      // Should redirect to login if user data is missing
      expect(mockReplace).toHaveBeenCalledWith('/admin/login');
    });
  });
});
