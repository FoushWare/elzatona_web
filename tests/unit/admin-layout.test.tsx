import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { useRouter, usePathname } from 'next/navigation';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import AdminLayout from '@/app/admin/layout';

// Mock Next.js router
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

// Mock ThemeProvider
jest.mock('@/contexts/ThemeContext', () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="theme-provider">{children}</div>
  ),
}));

const mockPush = jest.fn();
const mockRouter = {
  push: mockPush,
  back: jest.fn(),
  forward: jest.fn(),
  refresh: jest.fn(),
  replace: jest.fn(),
  prefetch: jest.fn(),
};

const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;
const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>;
const mockUseAdminAuth = useAdminAuth as jest.MockedFunction<
  typeof useAdminAuth
>;

describe('AdminLayout', () => {
  const mockChildren = <div data-testid="admin-content">Admin Content</div>;

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();

    // Default mock implementations
    mockUseRouter.mockReturnValue(mockRouter);
    mockUsePathname.mockReturnValue('/admin');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Authentication Flow', () => {
    it('should render children when user is authenticated', () => {
      mockUseAdminAuth.mockReturnValue({
        isAuthenticated: true,
        isLoading: false,
        user: {
          id: 'admin-1',
          email: 'afouadsoftwareengineer@gmail.com',
          name: 'Admin User',
          role: 'super_admin',
        },
        login: jest.fn(),
        logout: jest.fn(),
      });

      render(<AdminLayout>{mockChildren}</AdminLayout>);

      expect(screen.getByTestId('admin-navbar')).toBeInTheDocument();
      expect(screen.getByTestId('admin-content')).toBeInTheDocument();
      expect(screen.getByTestId('theme-provider')).toBeInTheDocument();
    });

    it('should redirect to login when user is not authenticated', () => {
      mockUseAdminAuth.mockReturnValue({
        isAuthenticated: false,
        isLoading: false,
        user: null,
        login: jest.fn(),
        logout: jest.fn(),
      });

      render(<AdminLayout>{mockChildren}</AdminLayout>);

      expect(mockPush).toHaveBeenCalledWith('/admin/login');
    });

    it('should show loading state while checking authentication', () => {
      mockUseAdminAuth.mockReturnValue({
        isAuthenticated: false,
        isLoading: true,
        user: null,
        login: jest.fn(),
        logout: jest.fn(),
      });

      render(<AdminLayout>{mockChildren}</AdminLayout>);

      expect(screen.getByText('Loading admin panel...')).toBeInTheDocument();
      expect(screen.getByTestId('theme-provider')).toBeInTheDocument();
      expect(mockPush).not.toHaveBeenCalled();
    });
  });

  describe('Login Page Handling', () => {
    it('should render login page without authentication check', () => {
      mockUsePathname.mockReturnValue('/admin/login');
      mockUseAdminAuth.mockReturnValue({
        isAuthenticated: false,
        isLoading: false,
        user: null,
        login: jest.fn(),
        logout: jest.fn(),
      });

      render(<AdminLayout>{mockChildren}</AdminLayout>);

      expect(screen.getByTestId('admin-content')).toBeInTheDocument();
      expect(screen.getByTestId('theme-provider')).toBeInTheDocument();
      expect(mockPush).not.toHaveBeenCalled();
    });

    it('should render login page even when authenticated', () => {
      mockUsePathname.mockReturnValue('/admin/login');
      mockUseAdminAuth.mockReturnValue({
        isAuthenticated: true,
        isLoading: false,
        user: {
          id: 'admin-1',
          email: 'afouadsoftwareengineer@gmail.com',
          name: 'Admin User',
          role: 'super_admin',
        },
        login: jest.fn(),
        logout: jest.fn(),
      });

      render(<AdminLayout>{mockChildren}</AdminLayout>);

      expect(screen.getByTestId('admin-content')).toBeInTheDocument();
      expect(screen.getByTestId('theme-provider')).toBeInTheDocument();
      expect(mockPush).not.toHaveBeenCalled();
    });

    it('should render login page even when loading', () => {
      mockUsePathname.mockReturnValue('/admin/login');
      mockUseAdminAuth.mockReturnValue({
        isAuthenticated: false,
        isLoading: true,
        user: null,
        login: jest.fn(),
        logout: jest.fn(),
      });

      render(<AdminLayout>{mockChildren}</AdminLayout>);

      expect(screen.getByTestId('admin-content')).toBeInTheDocument();
      expect(screen.getByTestId('theme-provider')).toBeInTheDocument();
      expect(mockPush).not.toHaveBeenCalled();
    });
  });

  describe('Route Protection', () => {
    it('should protect admin dashboard route', () => {
      mockUsePathname.mockReturnValue('/admin/dashboard');
      mockUseAdminAuth.mockReturnValue({
        isAuthenticated: false,
        isLoading: false,
        user: null,
        login: jest.fn(),
        logout: jest.fn(),
      });

      render(<AdminLayout>{mockChildren}</AdminLayout>);

      expect(mockPush).toHaveBeenCalledWith('/admin/login');
    });

    it('should protect admin settings route', () => {
      mockUsePathname.mockReturnValue('/admin/settings');
      mockUseAdminAuth.mockReturnValue({
        isAuthenticated: false,
        isLoading: false,
        user: null,
        login: jest.fn(),
        logout: jest.fn(),
      });

      render(<AdminLayout>{mockChildren}</AdminLayout>);

      expect(mockPush).toHaveBeenCalledWith('/admin/login');
    });

    it('should allow access to protected routes when authenticated', () => {
      mockUsePathname.mockReturnValue('/admin/dashboard');
      mockUseAdminAuth.mockReturnValue({
        isAuthenticated: true,
        isLoading: false,
        user: {
          id: 'admin-1',
          email: 'afouadsoftwareengineer@gmail.com',
          name: 'Admin User',
          role: 'super_admin',
        },
        login: jest.fn(),
        logout: jest.fn(),
      });

      render(<AdminLayout>{mockChildren}</AdminLayout>);

      expect(screen.getByTestId('admin-navbar')).toBeInTheDocument();
      expect(screen.getByTestId('admin-content')).toBeInTheDocument();
      expect(mockPush).not.toHaveBeenCalled();
    });
  });

  describe('Loading State Management', () => {
    it('should handle loading state timeout gracefully', async () => {
      mockUseAdminAuth.mockReturnValue({
        isAuthenticated: false,
        isLoading: true,
        user: null,
        login: jest.fn(),
        logout: jest.fn(),
      });

      render(<AdminLayout>{mockChildren}</AdminLayout>);

      expect(screen.getByText('Loading admin panel...')).toBeInTheDocument();

      // Simulate loading completion
      mockUseAdminAuth.mockReturnValue({
        isAuthenticated: false,
        isLoading: false,
        user: null,
        login: jest.fn(),
        logout: jest.fn(),
      });

      // Re-render to simulate state change
      render(<AdminLayout>{mockChildren}</AdminLayout>);

      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/admin/login');
      });
    });

    it('should not redirect during loading state', () => {
      mockUseAdminAuth.mockReturnValue({
        isAuthenticated: false,
        isLoading: true,
        user: null,
        login: jest.fn(),
        logout: jest.fn(),
      });

      render(<AdminLayout>{mockChildren}</AdminLayout>);

      expect(mockPush).not.toHaveBeenCalled();
    });
  });

  describe('Error Handling', () => {
    it('should handle useAdminAuth hook errors gracefully', () => {
      mockUseAdminAuth.mockImplementation(() => {
        throw new Error('Hook error');
      });

      // Should not crash the component
      expect(() =>
        render(<AdminLayout>{mockChildren}</AdminLayout>)
      ).not.toThrow();
    });

    it('should handle router errors gracefully', () => {
      mockUseRouter.mockImplementation(() => {
        throw new Error('Router error');
      });

      mockUseAdminAuth.mockReturnValue({
        isAuthenticated: false,
        isLoading: false,
        user: null,
        login: jest.fn(),
        logout: jest.fn(),
      });

      // Should not crash the component
      expect(() =>
        render(<AdminLayout>{mockChildren}</AdminLayout>)
      ).not.toThrow();
    });

    it('should handle pathname errors gracefully', () => {
      mockUsePathname.mockImplementation(() => {
        throw new Error('Pathname error');
      });

      mockUseAdminAuth.mockReturnValue({
        isAuthenticated: false,
        isLoading: false,
        user: null,
        login: jest.fn(),
        logout: jest.fn(),
      });

      // Should not crash the component
      expect(() =>
        render(<AdminLayout>{mockChildren}</AdminLayout>)
      ).not.toThrow();
    });
  });

  describe('Theme Integration', () => {
    it('should wrap content with ThemeProvider', () => {
      mockUseAdminAuth.mockReturnValue({
        isAuthenticated: true,
        isLoading: false,
        user: {
          id: 'admin-1',
          email: 'afouadsoftwareengineer@gmail.com',
          name: 'Admin User',
          role: 'super_admin',
        },
        login: jest.fn(),
        logout: jest.fn(),
      });

      render(<AdminLayout>{mockChildren}</AdminLayout>);

      expect(screen.getByTestId('theme-provider')).toBeInTheDocument();
    });

    it('should include ThemeProvider in loading state', () => {
      mockUseAdminAuth.mockReturnValue({
        isAuthenticated: false,
        isLoading: true,
        user: null,
        login: jest.fn(),
        logout: jest.fn(),
      });

      render(<AdminLayout>{mockChildren}</AdminLayout>);

      expect(screen.getByTestId('theme-provider')).toBeInTheDocument();
    });

    it('should include ThemeProvider for login page', () => {
      mockUsePathname.mockReturnValue('/admin/login');
      mockUseAdminAuth.mockReturnValue({
        isAuthenticated: false,
        isLoading: false,
        user: null,
        login: jest.fn(),
        logout: jest.fn(),
      });

      render(<AdminLayout>{mockChildren}</AdminLayout>);

      expect(screen.getByTestId('theme-provider')).toBeInTheDocument();
    });
  });

  describe('HTML Structure', () => {
    it('should render proper HTML structure with lang attribute', () => {
      mockUseAdminAuth.mockReturnValue({
        isAuthenticated: true,
        isLoading: false,
        user: {
          id: 'admin-1',
          email: 'afouadsoftwareengineer@gmail.com',
          name: 'Admin User',
          role: 'super_admin',
        },
        login: jest.fn(),
        logout: jest.fn(),
      });

      render(<AdminLayout>{mockChildren}</AdminLayout>);

      const htmlElement = document.querySelector('html');
      const bodyElement = document.querySelector('body');

      expect(htmlElement).toHaveAttribute('lang', 'en');
      expect(htmlElement).toHaveAttribute('suppressHydrationWarning');
      expect(bodyElement).toHaveClass('inter');
    });

    it('should include proper CSS classes', () => {
      mockUseAdminAuth.mockReturnValue({
        isAuthenticated: true,
        isLoading: false,
        user: {
          id: 'admin-1',
          email: 'afouadsoftwareengineer@gmail.com',
          name: 'Admin User',
          role: 'super_admin',
        },
        login: jest.fn(),
        logout: jest.fn(),
      });

      render(<AdminLayout>{mockChildren}</AdminLayout>);

      const bodyElement = document.querySelector('body');
      expect(bodyElement).toHaveClass('inter');
    });
  });
});
