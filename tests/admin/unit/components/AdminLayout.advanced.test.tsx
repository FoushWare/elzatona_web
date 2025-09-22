import { render, screen, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import AdminLayout from '@/app/admin/layout';

// Mock Next.js navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

// Mock admin auth hook
jest.mock('@/hooks/useAdminAuth', () => ({
  useAdminAuth: jest.fn(),
}));

// Mock AdminNavbar component
jest.mock('@/components/AdminNavbar', () => {
  return function MockAdminNavbar() {
    return <div data-testid="admin-navbar">Admin Navbar</div>;
  };
});

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

// Mock usePathname
const { usePathname } = require('next/navigation');
const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>;

describe('AdminLayout Component - Advanced Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    mockUseRouter.mockReturnValue(mockRouter);
    mockUsePathname.mockReturnValue('/admin/dashboard');
  });

  test('renders layout with navbar for authenticated user', () => {
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

    render(
      <AdminLayout>
        <div>Test Content</div>
      </AdminLayout>
    );
    
    expect(screen.getByTestId('admin-navbar')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
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

    render(
      <AdminLayout>
        <div>Test Content</div>
      </AdminLayout>
    );
    
    await waitFor(() => {
      expect(mockRouter.replace).toHaveBeenCalledWith('/admin/login');
    });
  });

  test('allows access to login page without authentication', () => {
    mockUsePathname.mockReturnValue('/admin/login');
    mockUseAdminAuth.mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      user: null,
      login: jest.fn(),
      logout: jest.fn(),
      error: null,
    });

    render(
      <AdminLayout>
        <div>Login Page Content</div>
      </AdminLayout>
    );
    
    expect(screen.getByText('Login Page Content')).toBeInTheDocument();
    expect(mockRouter.replace).not.toHaveBeenCalled();
  });

  test('allows access to root admin page without authentication', () => {
    mockUsePathname.mockReturnValue('/admin');
    mockUseAdminAuth.mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      user: null,
      login: jest.fn(),
      logout: jest.fn(),
      error: null,
    });

    render(
      <AdminLayout>
        <div>Admin Root Content</div>
      </AdminLayout>
    );
    
    expect(screen.getByText('Admin Root Content')).toBeInTheDocument();
    expect(mockRouter.replace).not.toHaveBeenCalled();
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

    render(
      <AdminLayout>
        <div>Test Content</div>
      </AdminLayout>
    );
    
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

    render(
      <AdminLayout>
        <div>Test Content</div>
      </AdminLayout>
    );
    
    expect(screen.getByText(/authentication failed/i)).toBeInTheDocument();
  });

  test('handles different admin routes', () => {
    const routes = [
      '/admin/dashboard',
      '/admin/content/questions',
      '/admin/guided-learning',
      '/admin/sections',
      '/admin/reports',
      '/admin/backup',
    ];

    routes.forEach(route => {
      mockUsePathname.mockReturnValue(route);
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

      const { unmount } = render(
        <AdminLayout>
          <div>Content for {route}</div>
        </AdminLayout>
      );
      
      expect(screen.getByText(`Content for ${route}`)).toBeInTheDocument();
      unmount();
    });
  });

  test('handles nested admin routes', () => {
    mockUsePathname.mockReturnValue('/admin/content/questions/edit/123');
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

    render(
      <AdminLayout>
        <div>Nested Route Content</div>
      </AdminLayout>
    );
    
    expect(screen.getByText('Nested Route Content')).toBeInTheDocument();
    expect(screen.getByTestId('admin-navbar')).toBeInTheDocument();
  });

  test('handles role-based access control', () => {
    mockUseAdminAuth.mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
      user: {
        id: '1',
        email: 'moderator@example.com',
        name: 'Moderator User',
        role: 'moderator',
        token: 'test-token',
        expiresAt: new Date(Date.now() + 3600000).toISOString(),
      },
      login: jest.fn(),
      logout: jest.fn(),
      error: null,
    });

    render(
      <AdminLayout>
        <div>Moderator Content</div>
      </AdminLayout>
    );
    
    expect(screen.getByText('Moderator Content')).toBeInTheDocument();
    expect(screen.getByTestId('admin-navbar')).toBeInTheDocument();
  });

  test('handles expired token scenario', () => {
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

    render(
      <AdminLayout>
        <div>Test Content</div>
      </AdminLayout>
    );
    
    expect(mockRouter.replace).toHaveBeenCalledWith('/admin/login');
  });

  test('handles rapid authentication state changes', async () => {
    const { rerender } = render(
      <AdminLayout>
        <div>Test Content</div>
      </AdminLayout>
    );

    // Start with loading
    mockUseAdminAuth.mockReturnValue({
      isAuthenticated: false,
      isLoading: true,
      user: null,
      login: jest.fn(),
      logout: jest.fn(),
      error: null,
    });

    rerender(
      <AdminLayout>
        <div>Test Content</div>
      </AdminLayout>
    );

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

    rerender(
      <AdminLayout>
        <div>Test Content</div>
      </AdminLayout>
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
    expect(screen.getByTestId('admin-navbar')).toBeInTheDocument();
  });

  test('handles multiple children components', () => {
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

    render(
      <AdminLayout>
        <div>Child 1</div>
        <div>Child 2</div>
        <div>Child 3</div>
      </AdminLayout>
    );
    
    expect(screen.getByText('Child 1')).toBeInTheDocument();
    expect(screen.getByText('Child 2')).toBeInTheDocument();
    expect(screen.getByText('Child 3')).toBeInTheDocument();
  });

  test('handles empty children', () => {
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

    render(<AdminLayout></AdminLayout>);
    
    expect(screen.getByTestId('admin-navbar')).toBeInTheDocument();
  });

  test('handles null children', () => {
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

    render(<AdminLayout>{null}</AdminLayout>);
    
    expect(screen.getByTestId('admin-navbar')).toBeInTheDocument();
  });

  test('handles undefined children', () => {
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

    render(<AdminLayout>{undefined}</AdminLayout>);
    
    expect(screen.getByTestId('admin-navbar')).toBeInTheDocument();
  });

  test('handles complex nested children', () => {
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

    render(
      <AdminLayout>
        <div>
          <header>Header</header>
          <main>
            <section>Section 1</section>
            <section>Section 2</section>
          </main>
          <footer>Footer</footer>
        </div>
      </AdminLayout>
    );
    
    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByText('Section 1')).toBeInTheDocument();
    expect(screen.getByText('Section 2')).toBeInTheDocument();
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });
});



