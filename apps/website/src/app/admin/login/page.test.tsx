/**
 * Unit Tests for Admin Login (A-UT-006, A-UT-007, A-UT-008, A-UT-009, A-UT-010)
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

// Mock Next.js Link
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

describe('A-UT-006: Admin Login Page Renders', () => {
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

  it('should render without errors', () => {
    const { container } = render(<AdminLoginPage />);
    expect(container).toBeInTheDocument();
  });

  it('should render login form', () => {
    render(<AdminLoginPage />);
    expect(screen.getByText(/Admin Login/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  it('should have email input field', () => {
    render(<AdminLoginPage />);
    const emailInput = screen.getByLabelText(/Email Address/i);
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute('type', 'email');
  });

  it('should have password input field', () => {
    render(<AdminLoginPage />);
    const passwordInput = screen.getByLabelText(/Password/i);
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  it('should have Sign In button', () => {
    render(<AdminLoginPage />);
    const submitButton = screen.getByRole('button', { name: /Sign In/i });
    expect(submitButton).toBeInTheDocument();
  });

  it('should have Back to Home link', () => {
    render(<AdminLoginPage />);
    const homeLink = screen.getByRole('link', { name: /Back to Home/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
  });
});

describe('A-UT-007: Form Inputs Handle Changes', () => {
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

  it('should update email input on change', async () => {
    render(<AdminLoginPage />);
    const emailInput = screen.getByLabelText(/Email Address/i) as HTMLInputElement;
    
    await act(async () => {
      fireEvent.change(emailInput, { target: { value: 'admin@example.com' } });
    });
    
    expect(emailInput.value).toBe('admin@example.com');
  });

  it('should update password input on change', async () => {
    render(<AdminLoginPage />);
    const passwordInput = screen.getByLabelText(/Password/i) as HTMLInputElement;
    
    await act(async () => {
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
    });
    
    expect(passwordInput.value).toBe('password123');
  });

  it('should update state correctly on input changes', async () => {
    render(<AdminLoginPage />);
    const emailInput = screen.getByLabelText(/Email Address/i) as HTMLInputElement;
    const passwordInput = screen.getByLabelText(/Password/i) as HTMLInputElement;
    
    await act(async () => {
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'testpass' } });
    });
    
    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('testpass');
  });
});

describe('A-UT-008: Form Validation', () => {
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

  it('should show error for empty email', async () => {
    render(<AdminLoginPage />);
    const submitButton = screen.getByRole('button', { name: /Sign In/i });
    const form = submitButton.closest('form');
    
    await act(async () => {
      fireEvent.submit(form!);
    });
    
    // HTML5 validation should prevent submission
    const emailInput = screen.getByLabelText(/Email Address/i) as HTMLInputElement;
    expect(emailInput.validity.valid).toBe(false);
  });

  it('should show error for invalid email format', async () => {
    render(<AdminLoginPage />);
    const emailInput = screen.getByLabelText(/Email Address/i) as HTMLInputElement;
    
    await act(async () => {
      fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
      fireEvent.blur(emailInput);
    });
    
    // HTML5 validation should mark as invalid
    expect(emailInput.validity.valid).toBe(false);
  });

  it('should require password field', async () => {
    render(<AdminLoginPage />);
    const passwordInput = screen.getByLabelText(/Password/i) as HTMLInputElement;
    const submitButton = screen.getByRole('button', { name: /Sign In/i });
    const form = submitButton.closest('form');
    
    await act(async () => {
      fireEvent.change(screen.getByLabelText(/Email Address/i), { 
        target: { value: 'admin@example.com' } 
      });
      fireEvent.submit(form!);
    });
    
    expect(passwordInput.validity.valid).toBe(false);
  });
});

describe('A-UT-009: Loading State', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockLogin.mockImplementation(() => new Promise(() => {})); // Never resolves
  });

  it('should show loading state during submission', async () => {
    (sharedContexts.useAdminAuth as jest.Mock).mockReturnValue({
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
    
    // Button should be disabled during submission
    await waitFor(() => {
      expect(submitButton).toBeDisabled();
    });
  });

  it('should show loading spinner when isLoading is true', () => {
    (sharedContexts.useAdminAuth as jest.Mock).mockReturnValue({
      isAuthenticated: false,
      isLoading: true,
      login: mockLogin,
      logout: jest.fn(),
      user: null,
    });
    
    render(<AdminLoginPage />);
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });
});

describe('A-UT-010: Error Message Display', () => {
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

  it('should display error message on login failure', async () => {
    mockLogin.mockResolvedValue({
      success: false,
      error: 'Invalid credentials',
    });
    
    render(<AdminLoginPage />);
    const emailInput = screen.getByLabelText(/Email Address/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const submitButton = screen.getByRole('button', { name: /Sign In/i });
    const form = submitButton.closest('form');
    
    await act(async () => {
      fireEvent.change(emailInput, { target: { value: 'admin@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
      fireEvent.submit(form!);
    });
    
    await waitFor(() => {
      expect(screen.getByText(/Invalid credentials|Login failed/i)).toBeInTheDocument();
    });
  });

  it('should clear error message on new submission', async () => {
    mockLogin
      .mockResolvedValueOnce({ success: false, error: 'First error' })
      .mockResolvedValueOnce({ success: true });
    
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
