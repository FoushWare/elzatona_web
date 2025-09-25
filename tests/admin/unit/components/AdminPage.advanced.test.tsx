import { render, screen, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import AdminPage from '@/app/admin/page';

// Mock Next.js navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock admin auth hook
jest.mock('@/hooks/useAdminAuth', () => ({
  useAdminAuth: jest.fn(),
}));

const mockRouter = {
  push: jest.fn(),
  replace: jest.fn(),
  back: jest.fn(),
  forward: jest.fn(),
  refresh: jest.fn(),
  prefetch: jest.fn(),
};

const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;
const mockUseAdminAuth = useAdminAuth as jest.MockedFunction<typeof useAdminAuth>;

describe('AdminPage Component - Advanced Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    mockUseRouter.mockReturnValue(mockRouter);
  });

  test('redirects authenticated user to dashboard', async () => {
    mockUseAdminAuth.mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
      user: {
        id: '1',
        email: 'admin@example.com',
        name: 'Admin User',
        role: 'super_admin',
        token: 'test-token',
        expiresAt: new Date(Date.now() + 3600000).toISOString(),
      },
      login: jest.fn(),
      logout: jest.fn(),
      error: null,
    });

    render(<AdminPage />);
    
    await waitFor(() => {
      expect(mockRouter.replace).toHaveBeenCalledWith('/admin/dashboard');
    });
  });

  test('redirects unauthenticated user to login', async () => {
    mockUseAdminAuth.mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      user: null,
      login: jest.fn(),
      logout: jest.fn(),
      error: null,
    });

    render(<AdminPage />);
    
    await waitFor(() => {
      expect(mockRouter.replace).toHaveBeenCalledWith('/admin/login');
    });
  });

  test('shows loading state while checking authentication', () => {
    mockUseAdminAuth.mockReturnValue({
      isAuthenticated: false,
      isLoading: true,
      user: null,
      login: jest.fn(),
      logout: jest.fn(),
      error: null,
    });

    render(<AdminPage />);
    
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test('handles authentication error state', () => {
    mockUseAdminAuth.mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      user: null,
      login: jest.fn(),
      logout: jest.fn(),
      error: 'Authentication failed',
    });

    render(<AdminPage />);
    
    expect(screen.getByText(/authentication failed/i)).toBeInTheDocument();
  });

  test('handles different user roles', async () => {
    const roles = ['super_admin', 'admin', 'moderator', 'editor'];
    
    for (const role of roles) {
      mockUseAdminAuth.mockReturnValue({
        isAuthenticated: true,
        isLoading: false,
        user: {
          id: '1',
          email: `${role}@example.com`,
          name: `${role} User`,
          role: role,
          token: 'test-token',
          expiresAt: new Date(Date.now() + 3600000).toISOString(),
        },
        login: jest.fn(),
        logout: jest.fn(),
        error: null,
      });

      const { unmount } = render(<AdminPage />);
      
      await waitFor(() => {
        expect(mockRouter.replace).toHaveBeenCalledWith('/admin/dashboard');
      });
      
      unmount();
      jest.clearAllMocks();
    }
  });

  test('handles expired token scenario', async () => {
    mockUseAdminAuth.mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      user: {
        id: '1',
        email: 'admin@example.com',
        name: 'Admin User',
        role: 'super_admin',
        token: 'expired-token',
        expiresAt: new Date(Date.now() - 3600000).toISOString(), // Expired
      },
      login: jest.fn(),
      logout: jest.fn(),
      error: 'Token expired',
    });

    render(<AdminPage />);
    
    await waitFor(() => {
      expect(mockRouter.replace).toHaveBeenCalledWith('/admin/login');
    });
  });

  test('handles rapid authentication state changes', async () => {
    const { rerender } = render(<AdminPage />);

    // Start with loading
    mockUseAdminAuth.mockReturnValue({
      isAuthenticated: false,
      isLoading: true,
      user: null,
      login: jest.fn(),
      logout: jest.fn(),
      error: null,
    });

    rerender(<AdminPage />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    // Change to authenticated
    mockUseAdminAuth.mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
      user: {
        id: '1',
        email: 'admin@example.com',
        name: 'Admin User',
        role: 'super_admin',
        token: 'test-token',
        expiresAt: new Date(Date.now() + 3600000).toISOString(),
      },
      login: jest.fn(),
      logout: jest.fn(),
      error: null,
    });

    rerender(<AdminPage />);
    
    await waitFor(() => {
      expect(mockRouter.replace).toHaveBeenCalledWith('/admin/dashboard');
    });
  });

  test('handles user with no name (email fallback)', async () => {
    mockUseAdminAuth.mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
      user: {
        id: '1',
        email: 'admin@example.com',
        name: '', // No name provided
        role: 'super_admin',
        token: 'test-token',
        expiresAt: new Date(Date.now() + 3600000).toISOString(),
      },
      login: jest.fn(),
      logout: jest.fn(),
      error: null,
    });

    render(<AdminPage />);
    
    await waitFor(() => {
      expect(mockRouter.replace).toHaveBeenCalledWith('/admin/dashboard');
    });
  });

  test('handles user with no email', async () => {
    mockUseAdminAuth.mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
      user: {
        id: '1',
        email: '', // No email provided
        name: 'Admin User',
        role: 'super_admin',
        token: 'test-token',
        expiresAt: new Date(Date.now() + 3600000).toISOString(),
      },
      login: jest.fn(),
      logout: jest.fn(),
      error: null,
    });

    render(<AdminPage />);
    
    await waitFor(() => {
      expect(mockRouter.replace).toHaveBeenCalledWith('/admin/dashboard');
    });
  });

  test('handles user with no role', async () => {
    mockUseAdminAuth.mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
      user: {
        id: '1',
        email: 'admin@example.com',
        name: 'Admin User',
        role: '', // No role provided
        token: 'test-token',
        expiresAt: new Date(Date.now() + 3600000).toISOString(),
      },
      login: jest.fn(),
      logout: jest.fn(),
      error: null,
    });

    render(<AdminPage />);
    
    await waitFor(() => {
      expect(mockRouter.replace).toHaveBeenCalledWith('/admin/dashboard');
    });
  });

  test('handles user with no token', async () => {
    mockUseAdminAuth.mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
      user: {
        id: '1',
        email: 'admin@example.com',
        name: 'Admin User',
        role: 'super_admin',
        token: '', // No token provided
        expiresAt: new Date(Date.now() + 3600000).toISOString(),
      },
      login: jest.fn(),
      logout: jest.fn(),
      error: null,
    });

    render(<AdminPage />);
    
    await waitFor(() => {
      expect(mockRouter.replace).toHaveBeenCalledWith('/admin/dashboard');
    });
  });

  test('handles user with no expiresAt', async () => {
    mockUseAdminAuth.mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
      user: {
        id: '1',
        email: 'admin@example.com',
        name: 'Admin User',
        role: 'super_admin',
        token: 'test-token',
        expiresAt: '', // No expiration provided
      },
      login: jest.fn(),
      logout: jest.fn(),
      error: null,
    });

    render(<AdminPage />);
    
    await waitFor(() => {
      expect(mockRouter.replace).toHaveBeenCalledWith('/admin/dashboard');
    });
  });

  test('handles null user object', async () => {
    mockUseAdminAuth.mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
      user: null, // Null user object
      login: jest.fn(),
      logout: jest.fn(),
      error: null,
    });

    render(<AdminPage />);
    
    await waitFor(() => {
      expect(mockRouter.replace).toHaveBeenCalledWith('/admin/login');
    });
  });

  test('handles undefined user object', async () => {
    mockUseAdminAuth.mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
      user: undefined, // Undefined user object
      login: jest.fn(),
      logout: jest.fn(),
      error: null,
    });

    render(<AdminPage />);
    
    await waitFor(() => {
      expect(mockRouter.replace).toHaveBeenCalledWith('/admin/login');
    });
  });

  test('handles multiple error states', () => {
    const errors = [
      'Network error',
      'Server error',
      'Authentication failed',
      'Token expired',
      'Invalid credentials',
      'Access denied',
    ];

    errors.forEach(error => {
      mockUseAdminAuth.mockReturnValue({
        isAuthenticated: false,
        isLoading: false,
        user: null,
        login: jest.fn(),
        logout: jest.fn(),
        error: error,
      });

      const { unmount } = render(<AdminPage />);
      
      expect(screen.getByText(error)).toBeInTheDocument();
      unmount();
    });
  });

  test('handles long error messages', () => {
    const longError = 'This is a very long error message that should be displayed properly in the UI without breaking the layout or causing any visual issues. It should wrap correctly and maintain readability.';
    
    mockUseAdminAuth.mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      user: null,
      login: jest.fn(),
      logout: jest.fn(),
      error: longError,
    });

    render(<AdminPage />);
    
    expect(screen.getByText(longError)).toBeInTheDocument();
  });

  test('handles special characters in user data', async () => {
    mockUseAdminAuth.mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
      user: {
        id: '1',
        email: 'admin+test@example.com',
        name: 'Admin User (Test)',
        role: 'super_admin',
        token: 'test-token',
        expiresAt: new Date(Date.now() + 3600000).toISOString(),
      },
      login: jest.fn(),
      logout: jest.fn(),
      error: null,
    });

    render(<AdminPage />);
    
    await waitFor(() => {
      expect(mockRouter.replace).toHaveBeenCalledWith('/admin/dashboard');
    });
  });

  test('handles unicode characters in user data', async () => {
    mockUseAdminAuth.mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
      user: {
        id: '1',
        email: 'admin@example.com',
        name: '管理员用户',
        role: 'super_admin',
        token: 'test-token',
        expiresAt: new Date(Date.now() + 3600000).toISOString(),
      },
      login: jest.fn(),
      logout: jest.fn(),
      error: null,
    });

    render(<AdminPage />);
    
    await waitFor(() => {
      expect(mockRouter.replace).toHaveBeenCalledWith('/admin/dashboard');
    });
  });

  test('handles emoji in user data', async () => {
    mockUseAdminAuth.mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
      user: {
        id: '1',
        email: 'admin@example.com',
        name: 'Admin User 🚀',
        role: 'super_admin',
        token: 'test-token',
        expiresAt: new Date(Date.now() + 3600000).toISOString(),
      },
      login: jest.fn(),
      logout: jest.fn(),
      error: null,
    });

    render(<AdminPage />);
    
    await waitFor(() => {
      expect(mockRouter.replace).toHaveBeenCalledWith('/admin/dashboard');
    });
  });
});






