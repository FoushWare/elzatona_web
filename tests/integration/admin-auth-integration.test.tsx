import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import AdminLoginPage from '@/app/admin/login/page';
import AdminPage from '@/app/admin/page';
import AdminLayout from '@/app/admin/layout';
import AdminNavbar from '@/components/AdminNavbar';

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

// Mock the admin auth hook
jest.mock('@/hooks/useAdminAuth');

// Mock the theme context
jest.mock('@/contexts/ThemeContext', () => ({
  useTheme: () => ({
    isDarkMode: false,
    toggleDarkMode: jest.fn(),
  }),
}));

// Mock the AdminAuthService
jest.mock('@/lib/admin-auth', () => ({
  AdminAuthService: {
    authenticateAdmin: jest.fn(),
    validateSession: jest.fn(),
  },
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
const mockUseAdminAuth = useAdminAuth as jest.MockedFunction<
  typeof useAdminAuth
>;

describe('Admin Authentication Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseRouter.mockReturnValue(mockRouter);
  });

  describe('AdminLoginPage', () => {
    test('should redirect to dashboard when already authenticated', async () => {
      mockUseAdminAuth.mockReturnValue({
        isAuthenticated: true,
        isLoading: false,
        user: {
          id: '1',
          email: 'admin@example.com',
          name: 'Admin',
          role: 'admin',
          token: 'token',
          expiresAt: '2025-12-31',
        },
        login: jest.fn(),
        logout: jest.fn(),
        error: null,
      });

      render(<AdminLoginPage />);

      await waitFor(() => {
        expect(mockRouter.replace).toHaveBeenCalledWith('/admin/dashboard');
      });
    });

    test('should handle successful login', async () => {
      const mockLogin = jest.fn().mockResolvedValue({ success: true });
      mockUseAdminAuth.mockReturnValue({
        isAuthenticated: false,
        isLoading: false,
        user: null,
        login: mockLogin,
        logout: jest.fn(),
        error: null,
      });

      render(<AdminLoginPage />);

      // Fill form
      fireEvent.change(screen.getByLabelText(/email/i), {
        target: { value: 'admin@example.com' },
      });
      fireEvent.change(screen.getByLabelText(/password/i), {
        target: { value: 'admin123' },
      });

      // Submit form
      fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

      await waitFor(() => {
        expect(mockLogin).toHaveBeenCalledWith('admin@example.com', 'admin123');
      });
    });

    test('should display error on failed login', async () => {
      const mockLogin = jest.fn().mockResolvedValue({
        success: false,
        error: 'Invalid credentials',
      });
      mockUseAdminAuth.mockReturnValue({
        isAuthenticated: false,
        isLoading: false,
        user: null,
        login: mockLogin,
        logout: jest.fn(),
        error: null,
      });

      render(<AdminLoginPage />);

      // Fill form
      fireEvent.change(screen.getByLabelText(/email/i), {
        target: { value: 'admin@example.com' },
      });
      fireEvent.change(screen.getByLabelText(/password/i), {
        target: { value: 'wrongpassword' },
      });

      // Submit form
      fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

      await waitFor(() => {
        expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
      });
    });
  });

  describe('AdminPage', () => {
    test('should redirect authenticated users to dashboard', async () => {
      mockUseAdminAuth.mockReturnValue({
        isAuthenticated: true,
        isLoading: false,
        user: {
          id: '1',
          email: 'admin@example.com',
          name: 'Admin',
          role: 'admin',
          token: 'token',
          expiresAt: '2025-12-31',
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

    test('should redirect unauthenticated users to login', async () => {
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

    test('should not redirect while loading', async () => {
      mockUseAdminAuth.mockReturnValue({
        isAuthenticated: false,
        isLoading: true,
        user: null,
        login: jest.fn(),
        logout: jest.fn(),
        error: null,
      });

      render(<AdminPage />);

      // Should show loading state
      expect(
        screen.getByText('Checking authentication...')
      ).toBeInTheDocument();
      expect(mockRouter.replace).not.toHaveBeenCalled();
    });
  });

  describe('AdminLayout', () => {
    test('should render children for login page without auth check', () => {
      const { usePathname } = require('next/navigation');
      usePathname.mockReturnValue('/admin/login');

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
    });

    test('should redirect unauthenticated users from protected routes', async () => {
      const { usePathname } = require('next/navigation');
      usePathname.mockReturnValue('/admin/dashboard');

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
          <div>Protected Content</div>
        </AdminLayout>
      );

      await waitFor(() => {
        expect(mockRouter.replace).toHaveBeenCalledWith('/admin/login');
      });
    });

    test('should render protected content for authenticated users', () => {
      const { usePathname } = require('next/navigation');
      usePathname.mockReturnValue('/admin/dashboard');

      mockUseAdminAuth.mockReturnValue({
        isAuthenticated: true,
        isLoading: false,
        user: {
          id: '1',
          email: 'admin@example.com',
          name: 'Admin',
          role: 'admin',
          token: 'token',
          expiresAt: '2025-12-31',
        },
        login: jest.fn(),
        logout: jest.fn(),
        error: null,
      });

      render(
        <AdminLayout>
          <div>Protected Content</div>
        </AdminLayout>
      );

      expect(screen.getByText('Protected Content')).toBeInTheDocument();
    });
  });

  describe('AdminNavbar', () => {
    test('should handle logout correctly', async () => {
      const mockLogout = jest.fn();
      mockUseAdminAuth.mockReturnValue({
        isAuthenticated: true,
        isLoading: false,
        user: {
          id: '1',
          email: 'admin@example.com',
          name: 'Admin',
          role: 'admin',
          token: 'token',
          expiresAt: '2025-12-31',
        },
        login: jest.fn(),
        logout: mockLogout,
        error: null,
      });

      render(<AdminNavbar />);

      // Click user menu
      fireEvent.click(screen.getByText('admin@example.com'));

      // Click logout
      fireEvent.click(screen.getByText('Logout'));

      await waitFor(() => {
        expect(mockLogout).toHaveBeenCalled();
        expect(mockRouter.replace).toHaveBeenCalledWith('/admin/login');
      });
    });

    test('should display user information correctly', () => {
      mockUseAdminAuth.mockReturnValue({
        isAuthenticated: true,
        isLoading: false,
        user: {
          id: '1',
          email: 'admin@example.com',
          name: 'Admin User',
          role: 'super_admin',
          token: 'token',
          expiresAt: '2025-12-31',
        },
        login: jest.fn(),
        logout: jest.fn(),
        error: null,
      });

      render(<AdminNavbar />);

      expect(screen.getByText('Admin User')).toBeInTheDocument();
      expect(screen.getByText('admin@example.com')).toBeInTheDocument();
    });
  });

  describe('Authentication State Transitions', () => {
    test('should handle authentication state changes correctly', async () => {
      const { rerender } = render(<AdminPage />);

      // Initially unauthenticated
      mockUseAdminAuth.mockReturnValue({
        isAuthenticated: false,
        isLoading: false,
        user: null,
        login: jest.fn(),
        logout: jest.fn(),
        error: null,
      });

      rerender(<AdminPage />);

      await waitFor(() => {
        expect(mockRouter.replace).toHaveBeenCalledWith('/admin/login');
      });

      // Now authenticated
      mockUseAdminAuth.mockReturnValue({
        isAuthenticated: true,
        isLoading: false,
        user: {
          id: '1',
          email: 'admin@example.com',
          name: 'Admin',
          role: 'admin',
          token: 'token',
          expiresAt: '2025-12-31',
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
  });
});


