/**
 * Integration Tests for Admin Login (A-IT-010, A-IT-011, A-IT-012)
 * Task: A-002 - Admin Login
 */

import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import AdminLoginPage from './page';
import * as sharedContexts from '@elzatona/shared-contexts';

// Mock shared contexts
jest.mock('@elzatona/shared-contexts', () => {
  const actual = jest.requireActual('../../../../test-utils/mocks/shared-contexts');
  return {
    ...actual,
    useAdminAuth: jest.fn(),
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
    
    (sharedContexts.useAdminAuth as jest.Mock).mockReturnValue({
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
    
    (sharedContexts.useAdminAuth as jest.Mock).mockReturnValue({
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

  it('should redirect authenticated users away from login page', () => {
    (sharedContexts.useAdminAuth as jest.Mock).mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
      login: mockLogin,
      logout: jest.fn(),
      user: { id: '1', email: 'admin@example.com' },
    });
    
    render(<AdminLoginPage />);
    
    // AdminAuthContext should handle redirect via useEffect
    // This is tested in the context itself
    expect(mockReplace).toHaveBeenCalledWith('/admin/dashboard');
  });

  it('should not redirect unauthenticated users', () => {
    (sharedContexts.useAdminAuth as jest.Mock).mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      login: mockLogin,
      logout: jest.fn(),
      user: null,
    });
    
    render(<AdminLoginPage />);
    
    // Should not redirect if not authenticated
    expect(mockReplace).not.toHaveBeenCalled();
  });
});

describe('A-IT-012: Session Management', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock localStorage
    Storage.prototype.getItem = jest.fn(() => null);
    Storage.prototype.setItem = jest.fn();
    Storage.prototype.removeItem = jest.fn();
  });

  it('should persist session after successful login', async () => {
    mockLogin.mockResolvedValue({ success: true });
    
    (sharedContexts.useAdminAuth as jest.Mock).mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
      login: mockLogin,
      logout: jest.fn(),
      user: { id: '1', email: 'admin@example.com' },
    });
    
    render(<AdminLoginPage />);
    
    // Session should be persisted (handled by AdminAuthContext)
    expect(Storage.prototype.setItem).toHaveBeenCalled();
  });

  it('should check existing session on mount', () => {
    Storage.prototype.getItem = jest.fn(() => JSON.stringify({
      user: { id: '1', email: 'admin@example.com' },
      session: { access_token: 'token' },
    }));
    
    (sharedContexts.useAdminAuth as jest.Mock).mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
      login: mockLogin,
      logout: jest.fn(),
      user: { id: '1', email: 'admin@example.com' },
    });
    
    render(<AdminLoginPage />);
    
    // Should check localStorage for existing session
    expect(Storage.prototype.getItem).toHaveBeenCalled();
  });
});
