import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { useTheme } from '@/contexts/ThemeContext';
import AdminLoginPage from '@/app/admin/login/page';

// Mock Next.js navigation
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

// Mock AlzatonaLogo component
jest.mock('@/components/AlzatonaLogo', () => {
  return function MockAlzatonaLogo() {
    return <div data-testid="alzatona-logo">Alzatona Logo</div>;
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
const mockUseTheme = useTheme as jest.MockedFunction<typeof useTheme>;

describe('AdminLoginPage Component - Advanced Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    mockUseRouter.mockReturnValue(mockRouter);
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
      error: null,
    });
  });

  test('handles form validation errors', async () => {
    const { user } = await import('@testing-library/user-event');
    const userEvent = user.setup();

    render(<AdminLoginPage />);
    
    const submitButton = screen.getByRole('button', { name: /sign in/i });
    
    // Try to submit empty form
    await userEvent.click(submitButton);
    
    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/password is required/i)).toBeInTheDocument();
  });

  test('handles invalid email format', async () => {
    const { user } = await import('@testing-library/user-event');
    const userEvent = user.setup();

    render(<AdminLoginPage />);
    
    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByRole('button', { name: /sign in/i });
    
    await userEvent.type(emailInput, 'invalid-email');
    await userEvent.click(submitButton);
    
    expect(screen.getByText(/invalid email format/i)).toBeInTheDocument();
  });

  test('handles password too short', async () => {
    const { user } = await import('@testing-library/user-event');
    const userEvent = user.setup();

    render(<AdminLoginPage />);
    
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /sign in/i });
    
    await userEvent.type(emailInput, 'admin@example.com');
    await userEvent.type(passwordInput, '123');
    await userEvent.click(submitButton);
    
    expect(screen.getByText(/password must be at least 6 characters/i)).toBeInTheDocument();
  });

  test('handles login with special characters in password', async () => {
    const mockLogin = jest.fn().mockResolvedValue(undefined);
    mockUseAdminAuth.mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      user: null,
      login: mockLogin,
      logout: jest.fn(),
      error: null,
    });

    const { user } = await import('@testing-library/user-event');
    const userEvent = user.setup();

    render(<AdminLoginPage />);
    
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /sign in/i });
    
    await userEvent.type(emailInput, 'admin@example.com');
    await userEvent.type(passwordInput, 'P@ssw0rd!@#$%');
    await userEvent.click(submitButton);
    
    expect(mockLogin).toHaveBeenCalledWith('admin@example.com', 'P@ssw0rd!@#$%');
  });

  test('handles login with very long email', async () => {
    const { user } = await import('@testing-library/user-event');
    const userEvent = user.setup();

    render(<AdminLoginPage />);
    
    const emailInput = screen.getByLabelText(/email/i);
    const longEmail = 'a'.repeat(100) + '@example.com';
    
    await userEvent.type(emailInput, longEmail);
    
    expect(emailInput).toHaveValue(longEmail);
  });

  test('handles login with very long password', async () => {
    const mockLogin = jest.fn().mockResolvedValue(undefined);
    mockUseAdminAuth.mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      user: null,
      login: mockLogin,
      logout: jest.fn(),
      error: null,
    });

    const { user } = await import('@testing-library/user-event');
    const userEvent = user.setup();

    render(<AdminLoginPage />);
    
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /sign in/i });
    
    const longPassword = 'a'.repeat(1000);
    
    await userEvent.type(emailInput, 'admin@example.com');
    await userEvent.type(passwordInput, longPassword);
    await userEvent.click(submitButton);
    
    expect(mockLogin).toHaveBeenCalledWith('admin@example.com', longPassword);
  });

  test('handles rapid form submissions', async () => {
    const mockLogin = jest.fn().mockResolvedValue(undefined);
    mockUseAdminAuth.mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      user: null,
      login: mockLogin,
      logout: jest.fn(),
      error: null,
    });

    const { user } = await import('@testing-library/user-event');
    const userEvent = user.setup();

    render(<AdminLoginPage />);
    
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /sign in/i });
    
    await userEvent.type(emailInput, 'admin@example.com');
    await userEvent.type(passwordInput, 'password');
    
    // Rapid clicks
    await userEvent.click(submitButton);
    await userEvent.click(submitButton);
    await userEvent.click(submitButton);
    
    // Should only call login once due to isSubmitting state
    expect(mockLogin).toHaveBeenCalledTimes(1);
  });

  test('handles keyboard navigation', async () => {
    const { user } = await import('@testing-library/user-event');
    const userEvent = user.setup();

    render(<AdminLoginPage />);
    
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /sign in/i });
    
    // Tab navigation
    await userEvent.tab();
    expect(emailInput).toHaveFocus();
    
    await userEvent.tab();
    expect(passwordInput).toHaveFocus();
    
    await userEvent.tab();
    expect(submitButton).toHaveFocus();
  });

  test('handles Enter key submission', async () => {
    const mockLogin = jest.fn().mockResolvedValue(undefined);
    mockUseAdminAuth.mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      user: null,
      login: mockLogin,
      logout: jest.fn(),
      error: null,
    });

    const { user } = await import('@testing-library/user-event');
    const userEvent = user.setup();

    render(<AdminLoginPage />);
    
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    
    await userEvent.type(emailInput, 'admin@example.com');
    await userEvent.type(passwordInput, 'password');
    
    // Press Enter in password field
    await userEvent.keyboard('{Enter}');
    
    expect(mockLogin).toHaveBeenCalledWith('admin@example.com', 'password');
  });

  test('handles Escape key to clear form', async () => {
    const { user } = await import('@testing-library/user-event');
    const userEvent = user.setup();

    render(<AdminLoginPage />);
    
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    
    await userEvent.type(emailInput, 'admin@example.com');
    await userEvent.type(passwordInput, 'password');
    
    // Press Escape
    await userEvent.keyboard('{Escape}');
    
    // Form should be cleared
    expect(emailInput).toHaveValue('');
    expect(passwordInput).toHaveValue('');
  });

  test('handles copy/paste operations', async () => {
    const { user } = await import('@testing-library/user-event');
    const userEvent = user.setup();

    render(<AdminLoginPage />);
    
    const emailInput = screen.getByLabelText(/email/i);
    
    // Simulate paste operation
    await userEvent.click(emailInput);
    await userEvent.paste('admin@example.com');
    
    expect(emailInput).toHaveValue('admin@example.com');
  });

  test('handles form reset', async () => {
    const { user } = await import('@testing-library/user-event');
    const userEvent = user.setup();

    render(<AdminLoginPage />);
    
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const resetButton = screen.getByRole('button', { name: /reset/i });
    
    await userEvent.type(emailInput, 'admin@example.com');
    await userEvent.type(passwordInput, 'password');
    
    await userEvent.click(resetButton);
    
    expect(emailInput).toHaveValue('');
    expect(passwordInput).toHaveValue('');
  });

  test('handles theme toggle during login', async () => {
    const mockToggleTheme = jest.fn();
    mockUseTheme.mockReturnValue({
      isDarkMode: false,
      toggleDarkMode: mockToggleTheme,
    });

    const { user } = await import('@testing-library/user-event');
    const userEvent = user.setup();

    render(<AdminLoginPage />);
    
    const themeButton = screen.getByTitle('Toggle theme');
    
    await userEvent.click(themeButton);
    
    expect(mockToggleTheme).toHaveBeenCalled();
  });

  test('handles login with different user roles', async () => {
    const mockLogin = jest.fn().mockResolvedValue(undefined);
    mockUseAdminAuth.mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      user: null,
      login: mockLogin,
      logout: jest.fn(),
      error: null,
    });

    const { user } = await import('@testing-library/user-event');
    const userEvent = user.setup();

    render(<AdminLoginPage />);
    
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /sign in/i });
    
    await userEvent.type(emailInput, 'moderator@example.com');
    await userEvent.type(passwordInput, 'password');
    await userEvent.click(submitButton);
    
    expect(mockLogin).toHaveBeenCalledWith('moderator@example.com', 'password');
  });

  test('handles login with case-sensitive email', async () => {
    const mockLogin = jest.fn().mockResolvedValue(undefined);
    mockUseAdminAuth.mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      user: null,
      login: mockLogin,
      logout: jest.fn(),
      error: null,
    });

    const { user } = await import('@testing-library/user-event');
    const userEvent = user.setup();

    render(<AdminLoginPage />);
    
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /sign in/i });
    
    await userEvent.type(emailInput, 'ADMIN@EXAMPLE.COM');
    await userEvent.type(passwordInput, 'password');
    await userEvent.click(submitButton);
    
    expect(mockLogin).toHaveBeenCalledWith('ADMIN@EXAMPLE.COM', 'password');
  });

  test('handles login with whitespace in inputs', async () => {
    const mockLogin = jest.fn().mockResolvedValue(undefined);
    mockUseAdminAuth.mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      user: null,
      login: mockLogin,
      logout: jest.fn(),
      error: null,
    });

    const { user } = await import('@testing-library/user-event');
    const userEvent = user.setup();

    render(<AdminLoginPage />);
    
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /sign in/i });
    
    await userEvent.type(emailInput, '  admin@example.com  ');
    await userEvent.type(passwordInput, '  password  ');
    await userEvent.click(submitButton);
    
    // Should trim whitespace
    expect(mockLogin).toHaveBeenCalledWith('admin@example.com', 'password');
  });

  test('handles form submission with disabled submit button', async () => {
    mockUseAdminAuth.mockReturnValue({
      isAuthenticated: false,
      isLoading: true, // Loading state
      user: null,
      login: jest.fn(),
      logout: jest.fn(),
      error: null,
    });

    render(<AdminLoginPage />);
    
    const submitButton = screen.getByRole('button', { name: /sign in/i });
    expect(submitButton).toBeDisabled();
  });

  test('handles error display with long error messages', async () => {
    mockUseAdminAuth.mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      user: null,
      login: jest.fn(),
      logout: jest.fn(),
      error: 'This is a very long error message that should be displayed properly in the UI without breaking the layout or causing any visual issues',
    });

    render(<AdminLoginPage />);
    
    expect(screen.getByText(/this is a very long error message/i)).toBeInTheDocument();
  });

  test('handles multiple error states', async () => {
    const { rerender } = render(<AdminLoginPage />);
    
    // Test network error
    mockUseAdminAuth.mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      user: null,
      login: jest.fn(),
      logout: jest.fn(),
      error: 'Network error',
    });

    rerender(<AdminLoginPage />);
    expect(screen.getByText('Network error')).toBeInTheDocument();
    
    // Test server error
    mockUseAdminAuth.mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      user: null,
      login: jest.fn(),
      logout: jest.fn(),
      error: 'Server error',
    });

    rerender(<AdminLoginPage />);
    expect(screen.getByText('Server error')).toBeInTheDocument();
    
    // Test no error
    mockUseAdminAuth.mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      user: null,
      login: jest.fn(),
      logout: jest.fn(),
      error: null,
    });

    rerender(<AdminLoginPage />);
    expect(screen.queryByText('Network error')).not.toBeInTheDocument();
    expect(screen.queryByText('Server error')).not.toBeInTheDocument();
  });
});






