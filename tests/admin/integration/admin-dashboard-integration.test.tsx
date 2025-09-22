import { render, screen, waitFor } from '@testing-library/react';
import { useRouter, usePathname } from 'next/navigation';
import AdminLayout from '@/app/admin/layout';
import AdminDashboard from '@/app/admin/dashboard/page';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { ThemeProvider } from '@/contexts/ThemeContext';
import React from 'react';

// Mock Next.js navigation hooks
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

// Mock useAdminAuth hook
jest.mock('@/hooks/useAdminAuth', () => ({
  useAdminAuth: jest.fn(),
}));

// Mock AdminNavbar
jest.mock('@/components/AdminNavbar', () => {
  return function MockAdminNavbar() {
    return <div data-testid="admin-navbar">Mock Admin Navbar</div>;
  };
});

const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;
const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>;
const mockUseAdminAuth = useAdminAuth as jest.MockedFunction<
  typeof useAdminAuth
>;

const renderWithProviders = (
  ui: React.ReactNode,
  pathname: string = '/admin/dashboard'
) => {
  mockUseRouter.mockReturnValue({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
    prefetch: jest.fn(),
  });
  mockUsePathname.mockReturnValue(pathname);

  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

describe('Admin Dashboard Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders dashboard with authenticated user', async () => {
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

    renderWithProviders(
      <AdminLayout>
        <AdminDashboard />
      </AdminLayout>
    );

    await waitFor(() => {
      expect(screen.getByText('Admin Dashboard')).toBeInTheDocument();
      expect(
        screen.getByText('Welcome back, Admin User (super_admin)')
      ).toBeInTheDocument();
      expect(screen.getByTestId('admin-navbar')).toBeInTheDocument();
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

    renderWithProviders(
      <AdminLayout>
        <AdminDashboard />
      </AdminLayout>
    );

    expect(screen.getByText('Loading admin panel...')).toBeInTheDocument();
  });

  test('redirects to login when not authenticated', async () => {
    const mockReplace = jest.fn();
    mockUseRouter.mockReturnValue({
      push: jest.fn(),
      replace: mockReplace,
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
      prefetch: jest.fn(),
    });

    mockUseAdminAuth.mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      user: null,
      login: jest.fn(),
      logout: jest.fn(),
      error: null,
    });

    renderWithProviders(
      <AdminLayout>
        <AdminDashboard />
      </AdminLayout>
    );

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith('/admin/login');
    });
  });

  test('displays dashboard statistics', async () => {
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

    renderWithProviders(
      <AdminLayout>
        <AdminDashboard />
      </AdminLayout>
    );

    await waitFor(() => {
      expect(screen.getByText('Admin Dashboard')).toBeInTheDocument();
      // Check for dashboard statistics sections
      expect(screen.getByText('Quick Stats')).toBeInTheDocument();
      expect(screen.getByText('Recent Activity')).toBeInTheDocument();
    });
  });

  test('displays navigation links in dashboard', async () => {
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

    renderWithProviders(
      <AdminLayout>
        <AdminDashboard />
      </AdminLayout>
    );

    await waitFor(() => {
      expect(screen.getByText('Admin Dashboard')).toBeInTheDocument();
      // Check for navigation links
      expect(screen.getByText('Manage Questions')).toBeInTheDocument();
      expect(screen.getByText('Learning Sections')).toBeInTheDocument();
      expect(screen.getByText('Guided Learning')).toBeInTheDocument();
    });
  });

  test('handles different user roles correctly', async () => {
    mockUseAdminAuth.mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
      user: {
        id: '2',
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

    renderWithProviders(
      <AdminLayout>
        <AdminDashboard />
      </AdminLayout>
    );

    await waitFor(() => {
      expect(
        screen.getByText('Welcome back, Moderator User (moderator)')
      ).toBeInTheDocument();
    });
  });

  test('applies correct layout styling', async () => {
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

    renderWithProviders(
      <AdminLayout>
        <AdminDashboard />
      </AdminLayout>
    );

    await waitFor(() => {
      const layout = screen.getByTestId('admin-navbar').closest('div');
      expect(layout).toHaveClass(
        'min-h-screen',
        'bg-gray-50',
        'dark:bg-gray-900'
      );
    });
  });

  test('handles theme switching in dashboard', async () => {
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

    renderWithProviders(
      <AdminLayout>
        <AdminDashboard />
      </AdminLayout>
    );

    await waitFor(() => {
      expect(screen.getByText('Admin Dashboard')).toBeInTheDocument();
      // Theme should be applied through ThemeProvider
      const layout = screen.getByTestId('admin-navbar').closest('div');
      expect(layout).toHaveClass('dark:bg-gray-900');
    });
  });

  test('maintains authentication state across navigation', async () => {
    const mockReplace = jest.fn();
    mockUseRouter.mockReturnValue({
      push: jest.fn(),
      replace: mockReplace,
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
      prefetch: jest.fn(),
    });

    // Start authenticated
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

    const { rerender } = renderWithProviders(
      <AdminLayout>
        <AdminDashboard />
      </AdminLayout>
    );

    await waitFor(() => {
      expect(screen.getByText('Admin Dashboard')).toBeInTheDocument();
    });

    // Simulate authentication state change
    mockUseAdminAuth.mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      user: null,
      login: jest.fn(),
      logout: jest.fn(),
      error: null,
    });

    rerender(
      <ThemeProvider>
        <AdminLayout>
          <AdminDashboard />
        </AdminLayout>
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith('/admin/login');
    });
  });
});



