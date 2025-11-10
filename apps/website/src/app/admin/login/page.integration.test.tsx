/**
 * Integration Tests for Admin Login (A-IT-010, A-IT-011, A-IT-012)
 * Task: A-002 - Admin Login
 */

import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import AdminLoginPage from './page';
import { useAdminAuth } from '@elzatona/shared-contexts';

// Mock shared contexts
jest.mock('@elzatona/shared-contexts', () => {
  const actual = jest.requireActual('@elzatona/shared-contexts');
  return {
    ...actual,
    useAdminAuth: jest.fn(),
    AdminAuthProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    NotificationProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  };
});

// Mock shared components
jest.mock('@elzatona/shared-components', () => ({
  AdminLoginNavbar: () => <nav data-testid="admin-login-navbar">Admin Navbar</nav>,
}));

jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  };
});

const mockPush = jest.fn();
const mockReplace = jest.fn();
const mockLogin = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    replace: mockReplace,
    prefetch: jest.fn(),
  }),
  usePathname: () => '/admin/login',
}));

describe('A-IT-010: Login API Call', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    (useAdminAuth as jest.Mock).mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      login: mockLogin,
      logout: jest.fn(),
      user: null,
    });
  });

  it('should call login API with correct credentials', async () => {
    mockLogin.mockResolvedValue({ success: true });
    
    render(<AdminLoginPage />);
    const emailInput = screen.getByLabelText(/Email Address/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const submitButton = screen.getByRole('button', { name: /Sign In/i });
    const form = submitButton.closest('form');
    
    await act(async () => {
      fireEvent.change(emailInput, { target: { value: 'admin@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.submit(form!);
    });
    
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('admin@example.com', 'password123');
    });
  });

  it('should handle successful login response', async () => {
    mockLogin.mockResolvedValue({ success: true });
    
    (useAdminAuth as jest.Mock).mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
      login: mockLogin,
      logout: jest.fn(),
      user: { id: '1', email: 'admin@example.com', role: 'super_admin' },
    });
    
    render(<AdminLoginPage />);
    const emailInput = screen.getByLabelText(/Email Address/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const submitButton = screen.getByRole('button', { name: /Sign In/i });
    const form = submitButton.closest('form');
    
    await act(async () => {
      fireEvent.change(emailInput, { target: { value: 'admin@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.submit(form!);
    });
    
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalled();
    });
  });

  it('should handle login API error', async () => {
    mockLogin.mockResolvedValue({
      success: false,
      error: 'Invalid email or password',
    });
    
    render(<AdminLoginPage />);
    const emailInput = screen.getByLabelText(/Email Address/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const submitButton = screen.getByRole('button', { name: /Sign In/i });
    const form = submitButton.closest('form');
    
    await act(async () => {
      fireEvent.change(emailInput, { target: { value: 'wrong@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'wrongpass' } });
      fireEvent.submit(form!);
    });
    
    await waitFor(() => {
      expect(screen.getByText(/Invalid email or password|Login failed/i)).toBeInTheDocument();
    });
  });
});

describe('A-IT-011: Redirect After Login', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockLogin.mockResolvedValue({ success: true });
  });

  it('should show login form for unauthenticated users', () => {
    (useAdminAuth as jest.Mock).mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      login: mockLogin,
      logout: jest.fn(),
      user: null,
    });
    
    render(<AdminLoginPage />);
    
    // Should show login form
    expect(screen.getByText(/Admin Login/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
  });

  it('should show loading state when isLoading is true', () => {
    (useAdminAuth as jest.Mock).mockReturnValue({
      isAuthenticated: false,
      isLoading: true,
      login: mockLogin,
      logout: jest.fn(),
      user: null,
    });
    
    render(<AdminLoginPage />);
    
    // Should show loading state
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });
});

describe('A-IT-012: Session Management', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should handle successful login', async () => {
    mockLogin.mockResolvedValue({ success: true });
    
    (useAdminAuth as jest.Mock).mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      login: mockLogin,
      logout: jest.fn(),
      user: null,
    });
    
    render(<AdminLoginPage />);
    const emailInput = screen.getByLabelText(/Email Address/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const submitButton = screen.getByRole('button', { name: /Sign In/i });
    const form = submitButton.closest('form');
    
    await act(async () => {
      fireEvent.change(emailInput, { target: { value: 'admin@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.submit(form!);
    });
    
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('admin@example.com', 'password123');
    });
  });

  it('should clear error on new submission attempt', async () => {
    mockLogin
      .mockResolvedValueOnce({ success: false, error: 'First error' })
      .mockResolvedValueOnce({ success: true });
    
    (useAdminAuth as jest.Mock).mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      login: mockLogin,
      logout: jest.fn(),
      user: null,
    });
    
    render(<AdminLoginPage />);
    const emailInput = screen.getByLabelText(/Email Address/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const submitButton = screen.getByRole('button', { name: /Sign In/i });
    const form = submitButton.closest('form');
    
    // First submission - error
    await act(async () => {
      fireEvent.change(emailInput, { target: { value: 'admin@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'wrong' } });
      fireEvent.submit(form!);
    });
    
    await waitFor(() => {
      expect(screen.queryByText(/First error/i)).toBeInTheDocument();
    });
    
    // Second submission - should clear error
    await act(async () => {
      fireEvent.change(passwordInput, { target: { value: 'correctpassword' } });
      fireEvent.submit(form!);
    });
    
    // Error should be cleared on new submission attempt
    await waitFor(() => {
      expect(screen.queryByText(/First error/i)).not.toBeInTheDocument();
    }, { timeout: 1000 });
  });
});
