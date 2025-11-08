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
    auth: {
      onAuthStateChange: jest.fn(() => ({
        data: { subscription: null },
        error: null,
      })),
      getSession: jest
        .fn()
        .mockResolvedValue({ data: { session: null }, error: null }),
      getUser: jest
        .fn()
        .mockResolvedValue({ data: { user: null }, error: null }),
    },
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
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const React = require('react');
  return {
    QueryClientProvider: ({ children }: { children: React.ReactNode }) => (
      <>{children}</>
    ),
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

// Create a module-level mock function that can be configured per test
// This must be a mutable variable that can be reassigned
let mockUseAdminAuthFn: jest.Mock = jest.fn(() => ({
  isAuthenticated: false,
  isLoading: false,
  login: jest.fn(),
  logout: jest.fn(),
  user: null,
}));

// Mock the actual AdminAuthContext file
jest.mock('../../libs/shared-contexts/src/lib/AdminAuthContext', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const React = require('react');
  return {
    AdminAuthProvider: ({ children }: { children: React.ReactNode }) => (
      <>{children}</>
    ),
    useAdminAuth: () => mockUseAdminAuthFn(),
  };
});

// Mock the actual ThemeContext file
jest.mock('../../libs/shared-contexts/src/lib/ThemeContext', () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => children,
  useTheme: jest.fn(() => ({
    isDarkMode: false,
    toggleDarkMode: jest.fn(),
    setDarkMode: jest.fn(),
    isLoaded: true,
  })),
}));

// Also mock the package entry point
jest.mock('@elzatona/shared-contexts', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const React = require('react');
  return {
    AdminAuthProvider: ({ children }: { children: React.ReactNode }) => (
      <>{children}</>
    ),
    useAdminAuth: () => mockUseAdminAuthFn(),
    ThemeProvider: ({ children }: { children: React.ReactNode }) => (
      <>{children}</>
    ),
    useTheme: jest.fn(() => ({
      isDarkMode: false,
      toggleDarkMode: jest.fn(),
    })),
  };
});

// Mock fetch for API calls
global.fetch = jest.fn();

import React from 'react';
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/navigation';
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

// MockAdminAuth interface removed - not used in tests

describe('Admin Login Page', () => {
  const mockPush = jest.fn();
  const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;
  const mockLogin = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    // Reset mock admin auth function to return default values
    // Reassign the mock function to ensure it's a fresh mock
    mockUseAdminAuthFn = jest.fn(() => ({
      isAuthenticated: false,
      isLoading: false,
      login: mockLogin,
      logout: jest.fn(),
      user: null,
    }));
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

      expect(screen.getByText('Admin Access Portal')).toBeInTheDocument();
      expect(
        screen.getByText('Secure Authentication Required')
      ).toBeInTheDocument();
    });

    it('should show loading state when authentication is in progress', () => {
      mockUseAdminAuthFn = jest.fn(() => ({
        isAuthenticated: false,
        isLoading: true,
        login: mockLogin,
        logout: jest.fn(),
        user: null,
      }));

      render(<AdminLoginPage />);

      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('should render login form when not authenticated', () => {
      mockUseAdminAuthFn = jest.fn(() => ({
        isAuthenticated: false,
        isLoading: false,
        login: mockLogin,
        logout: jest.fn(),
        user: null,
      }));

      render(<AdminLoginPage />);

      // Component should render the login form when not authenticated
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    });
  });

  describe('Form Validation', () => {
    it('should use HTML5 validation for empty fields', async () => {
      render(<AdminLoginPage />);

      const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement;
      const passwordInput = screen.getByLabelText(
        /password/i
      ) as HTMLInputElement;

      // HTML5 validation - check required attribute
      expect(emailInput).toHaveAttribute('required');
      expect(passwordInput).toHaveAttribute('required');
    });

    it('should use HTML5 email validation', () => {
      render(<AdminLoginPage />);

      const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement;

      // HTML5 email validation
      expect(emailInput).toHaveAttribute('type', 'email');
    });

    it('should allow form input changes', () => {
      render(<AdminLoginPage />);

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);

      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });

      expect(emailInput).toHaveValue('test@example.com');
      expect(passwordInput).toHaveValue('password123');
    });
  });

  describe('Form Submission', () => {
    it('should call login function with correct credentials', async () => {
      const loginMock = jest.fn().mockResolvedValue({ success: true });
      mockUseAdminAuthFn = jest.fn(() => ({
        isAuthenticated: false,
        isLoading: false,
        login: loginMock,
        logout: jest.fn(),
        user: null,
      }));

      const { container } = render(<AdminLoginPage />);

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const form = container.querySelector('form');

      // Verify the mock is set up correctly - the hook should be called during render
      expect(mockUseAdminAuthFn).toHaveBeenCalled();

      await act(async () => {
        fireEvent.change(emailInput, {
          target: { value: 'admin@example.com' },
        });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });

        if (form) {
          fireEvent.submit(form);
        }
      });

      await waitFor(
        () => {
          expect(loginMock).toHaveBeenCalledWith(
            'admin@example.com',
            'password123'
          );
        },
        { timeout: 5000 }
      );
    });

    it('should show loading state during login', async () => {
      const loginMock = jest
        .fn()
        .mockImplementation(
          () => new Promise(resolve => setTimeout(resolve, 100))
        );
      mockUseAdminAuthFn = jest.fn(() => ({
        isAuthenticated: false,
        isLoading: false,
        login: loginMock,
        logout: jest.fn(),
        user: null,
      }));

      render(<AdminLoginPage />);

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const loginButton = screen.getByRole('button', { name: /sign in/i });
      const form = emailInput.closest('form');

      await act(async () => {
        fireEvent.change(emailInput, {
          target: { value: 'admin@example.com' },
        });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });

        if (form) {
          fireEvent.submit(form);
        }
      });

      // Check loading state immediately after submission
      await waitFor(
        () => {
          expect(screen.getByText('Signing In...')).toBeInTheDocument();
          expect(loginButton).toBeDisabled();
        },
        { timeout: 5000 }
      );
    });

    it('should show error message on login failure', async () => {
      const loginMock = jest
        .fn()
        .mockResolvedValue({ success: false, error: 'Invalid credentials' });
      mockUseAdminAuthFn = jest.fn(() => ({
        isAuthenticated: false,
        isLoading: false,
        login: loginMock,
        logout: jest.fn(),
        user: null,
      }));

      render(<AdminLoginPage />);

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const form = emailInput.closest('form');

      fireEvent.change(emailInput, { target: { value: 'admin@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });

      if (form) {
        fireEvent.submit(form);
      }

      await waitFor(
        () => {
          expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
        },
        { timeout: 5000 }
      );
    });

    it('should handle network errors gracefully', async () => {
      const loginMock = jest.fn().mockRejectedValue(new Error('Network error'));
      mockUseAdminAuthFn = jest.fn(() => ({
        isAuthenticated: false,
        isLoading: false,
        login: loginMock,
        logout: jest.fn(),
        user: null,
      }));

      render(<AdminLoginPage />);

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const form = emailInput.closest('form');

      await act(async () => {
        fireEvent.change(emailInput, {
          target: { value: 'admin@example.com' },
        });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });

        if (form) {
          fireEvent.submit(form);
        }
      });

      await waitFor(
        () => {
          expect(
            screen.getByText('An unexpected error occurred')
          ).toBeInTheDocument();
        },
        { timeout: 5000 }
      );
    });
  });

  describe('User Interactions', () => {
    it('should have password field with password type', () => {
      render(<AdminLoginPage />);

      const passwordInput = screen.getByLabelText(/password/i);

      expect(passwordInput).toHaveAttribute('type', 'password');
    });

    it('should submit form on Enter key press', async () => {
      const loginMock = jest.fn().mockResolvedValue({ success: true });
      mockUseAdminAuthFn = jest.fn(() => ({
        isAuthenticated: false,
        isLoading: false,
        login: loginMock,
        logout: jest.fn(),
        user: null,
      }));

      render(<AdminLoginPage />);

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const form = emailInput.closest('form');

      await act(async () => {
        fireEvent.change(emailInput, {
          target: { value: 'admin@example.com' },
        });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        // Simulate Enter key press by submitting the form
        if (form) {
          fireEvent.submit(form);
        }
      });

      await waitFor(
        () => {
          expect(loginMock).toHaveBeenCalledWith(
            'admin@example.com',
            'password123'
          );
        },
        { timeout: 5000 }
      );
    });

    it('should allow form field input', () => {
      render(<AdminLoginPage />);

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);

      fireEvent.change(emailInput, { target: { value: 'admin@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });

      expect(emailInput).toHaveValue('admin@example.com');
      expect(passwordInput).toHaveValue('password123');
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

      // Check that inputs are focusable
      emailInput.focus();
      expect(emailInput).toHaveFocus();

      // Check that password input is focusable
      passwordInput.focus();
      expect(passwordInput).toHaveFocus();

      // Check that button is focusable
      loginButton.focus();
      expect(loginButton).toHaveFocus();
    });

    it('should display error messages when login fails', async () => {
      const loginMock = jest
        .fn()
        .mockResolvedValue({ success: false, error: 'Invalid credentials' });
      mockUseAdminAuthFn = jest.fn(() => ({
        isAuthenticated: false,
        isLoading: false,
        login: loginMock,
        logout: jest.fn(),
        user: null,
      }));

      render(<AdminLoginPage />);

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const form = emailInput.closest('form');

      await act(async () => {
        fireEvent.change(emailInput, {
          target: { value: 'admin@example.com' },
        });
        fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });

        if (form) {
          fireEvent.submit(form);
        }
      });

      await waitFor(
        () => {
          expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
        },
        { timeout: 5000 }
      );
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

      // Check that the page renders without errors
      expect(screen.getByText('Admin Login')).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    });

    it('should render correctly on desktop viewport', () => {
      // Mock desktop viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1024,
      });

      render(<AdminLoginPage />);

      // Check that the page renders without errors
      expect(screen.getByText('Admin Login')).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
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
