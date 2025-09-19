import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { useTheme } from '@/contexts/ThemeContext';
import AdminLoginPage from '@/app/admin/login/page';

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock admin auth hook
jest.mock('@/hooks/useAdminAuth', () => ({
  useAdminAuth: jest.fn(),
}));

// Mock theme context
jest.mock('@/contexts/ThemeContext', () => ({
  useTheme: jest.fn(),
}));

// Mock AdminLoginNavbar component
jest.mock('@/components/AdminLoginNavbar', () => {
  return function MockAdminLoginNavbar() {
    return <div data-testid="admin-login-navbar">Admin Login Navbar</div>;
  };
});

// Mock fetch for API calls
global.fetch = jest.fn();

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
const mockUseAdminAuth = useAdminAuth as jest.MockedFunction<
  typeof useAdminAuth
>;
const mockUseTheme = useTheme as jest.MockedFunction<typeof useTheme>;

describe('AdminLoginPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();

    // Default mock implementations
    mockUseRouter.mockReturnValue(mockRouter);
    mockUseTheme.mockReturnValue({
      isDarkMode: false,
      toggleDarkMode: jest.fn(),
    });

    // Mock successful authentication response
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({
        success: true,
        token: 'mock-jwt-token',
        admin: {
          id: 'admin-1',
          email: 'afouadsoftwareengineer@gmail.com',
          name: 'Admin User',
          role: 'super_admin',
        },
      }),
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Page Rendering', () => {
    it('should render admin login page without authentication issues', () => {
      mockUseAdminAuth.mockReturnValue({
        isAuthenticated: false,
        isLoading: false,
        user: null,
        login: jest.fn(),
        logout: jest.fn(),
      });

      render(<AdminLoginPage />);

      expect(screen.getByTestId('admin-login-navbar')).toBeInTheDocument();
      expect(screen.getByText('Admin Access Portal')).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /sign in/i })
      ).toBeInTheDocument();
    });

    it('should show loading state briefly then render login form', async () => {
      mockUseAdminAuth.mockReturnValue({
        isAuthenticated: false,
        isLoading: true,
        user: null,
        login: jest.fn(),
        logout: jest.fn(),
      });

      render(<AdminLoginPage />);

      // Should show loading spinner initially
      expect(screen.getByText('Loading...')).toBeInTheDocument();

      // Mock the loading state to complete
      mockUseAdminAuth.mockReturnValue({
        isAuthenticated: false,
        isLoading: false,
        user: null,
        login: jest.fn(),
        logout: jest.fn(),
      });

      // Re-render to simulate loading completion
      render(<AdminLoginPage />);

      await waitFor(() => {
        expect(screen.getByText('Admin Access Portal')).toBeInTheDocument();
      });
    });

    it('should redirect to admin dashboard when already authenticated', () => {
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

      render(<AdminLoginPage />);

      expect(mockPush).toHaveBeenCalledWith('/admin');
    });
  });

  describe('Form Functionality', () => {
    beforeEach(() => {
      mockUseAdminAuth.mockReturnValue({
        isAuthenticated: false,
        isLoading: false,
        user: null,
        login: jest.fn(),
        logout: jest.fn(),
      });
    });

    it('should handle form submission with valid credentials', async () => {
      const mockLogin = jest.fn().mockResolvedValue({
        success: true,
        admin: {
          id: 'admin-1',
          email: 'afouadsoftwareengineer@gmail.com',
          name: 'Admin User',
          role: 'super_admin',
        },
      });

      mockUseAdminAuth.mockReturnValue({
        isAuthenticated: false,
        isLoading: false,
        user: null,
        login: mockLogin,
        logout: jest.fn(),
      });

      render(<AdminLoginPage />);

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByRole('button', { name: /sign in/i });

      fireEvent.change(emailInput, {
        target: { value: 'afouadsoftwareengineer@gmail.com' },
      });
      fireEvent.change(passwordInput, {
        target: { value: 'zatonafoushware$8888' },
      });

      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockLogin).toHaveBeenCalledWith(
          'afouadsoftwareengineer@gmail.com',
          'zatonafoushware$8888'
        );
      });
    });

    it('should show error message for invalid credentials', async () => {
      const mockLogin = jest.fn().mockResolvedValue({
        success: false,
        error: 'Invalid email or password',
      });

      mockUseAdminAuth.mockReturnValue({
        isAuthenticated: false,
        isLoading: false,
        user: null,
        login: mockLogin,
        logout: jest.fn(),
      });

      render(<AdminLoginPage />);

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByRole('button', { name: /sign in/i });

      fireEvent.change(emailInput, {
        target: { value: 'wrong@email.com' },
      });
      fireEvent.change(passwordInput, {
        target: { value: 'wrongpassword' },
      });

      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText('Invalid email or password')
        ).toBeInTheDocument();
      });
    });

    it('should show error message for network errors', async () => {
      const mockLogin = jest.fn().mockRejectedValue(new Error('Network error'));

      mockUseAdminAuth.mockReturnValue({
        isAuthenticated: false,
        isLoading: false,
        user: null,
        login: mockLogin,
        logout: jest.fn(),
      });

      render(<AdminLoginPage />);

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByRole('button', { name: /sign in/i });

      fireEvent.change(emailInput, {
        target: { value: 'afouadsoftwareengineer@gmail.com' },
      });
      fireEvent.change(passwordInput, {
        target: { value: 'zatonafoushware$8888' },
      });

      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Authentication failed')).toBeInTheDocument();
      });
    });

    it('should validate required fields', async () => {
      render(<AdminLoginPage />);

      const submitButton = screen.getByRole('button', { name: /sign in/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Please enter your email')).toBeInTheDocument();
        expect(
          screen.getByText('Please enter your password')
        ).toBeInTheDocument();
      });
    });

    it('should validate email format', async () => {
      render(<AdminLoginPage />);

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByRole('button', { name: /sign in/i });

      fireEvent.change(emailInput, {
        target: { value: 'invalid-email' },
      });
      fireEvent.change(passwordInput, {
        target: { value: 'password123' },
      });

      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText('Please enter a valid email address')
        ).toBeInTheDocument();
      });
    });
  });

  describe('Theme Integration', () => {
    it('should work with dark mode', () => {
      mockUseTheme.mockReturnValue({
        isDarkMode: true,
        toggleDarkMode: jest.fn(),
      });

      mockUseAdminAuth.mockReturnValue({
        isAuthenticated: false,
        isLoading: false,
        user: null,
        login: jest.fn(),
        logout: jest.fn(),
      });

      render(<AdminLoginPage />);

      expect(screen.getByTestId('admin-login-navbar')).toBeInTheDocument();
      expect(screen.getByText('Admin Access Portal')).toBeInTheDocument();
    });

    it('should work with light mode', () => {
      mockUseTheme.mockReturnValue({
        isDarkMode: false,
        toggleDarkMode: jest.fn(),
      });

      mockUseAdminAuth.mockReturnValue({
        isAuthenticated: false,
        isLoading: false,
        user: null,
        login: jest.fn(),
        logout: jest.fn(),
      });

      render(<AdminLoginPage />);

      expect(screen.getByTestId('admin-login-navbar')).toBeInTheDocument();
      expect(screen.getByText('Admin Access Portal')).toBeInTheDocument();
    });
  });

  describe('Error Handling', () => {
    it('should handle useAdminAuth hook errors gracefully', () => {
      // Mock useAdminAuth to throw an error
      mockUseAdminAuth.mockImplementation(() => {
        throw new Error('Hook error');
      });

      // Should not crash the component
      expect(() => render(<AdminLoginPage />)).not.toThrow();
    });

    it('should handle theme context errors gracefully', () => {
      mockUseTheme.mockImplementation(() => {
        throw new Error('Theme error');
      });

      mockUseAdminAuth.mockReturnValue({
        isAuthenticated: false,
        isLoading: false,
        user: null,
        login: jest.fn(),
        logout: jest.fn(),
      });

      // Should not crash the component
      expect(() => render(<AdminLoginPage />)).not.toThrow();
    });
  });

  describe('Accessibility', () => {
    it('should have proper form labels and ARIA attributes', () => {
      mockUseAdminAuth.mockReturnValue({
        isAuthenticated: false,
        isLoading: false,
        user: null,
        login: jest.fn(),
        logout: jest.fn(),
      });

      render(<AdminLoginPage />);

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByRole('button', { name: /sign in/i });

      expect(emailInput).toHaveAttribute('type', 'email');
      expect(passwordInput).toHaveAttribute('type', 'password');
      expect(submitButton).toHaveAttribute('type', 'submit');
    });

    it('should support keyboard navigation', () => {
      mockUseAdminAuth.mockReturnValue({
        isAuthenticated: false,
        isLoading: false,
        user: null,
        login: jest.fn(),
        logout: jest.fn(),
      });

      render(<AdminLoginPage />);

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);

      // Tab navigation should work
      emailInput.focus();
      expect(document.activeElement).toBe(emailInput);

      fireEvent.keyDown(emailInput, { key: 'Tab' });
      expect(document.activeElement).toBe(passwordInput);
    });
  });
});
