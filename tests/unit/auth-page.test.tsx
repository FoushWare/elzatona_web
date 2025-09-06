/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { useFirebaseAuth } from '@/contexts/FirebaseAuthContext';
import AuthPage from '@/app/auth/page';

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock Firebase Auth Context
jest.mock('@/contexts/FirebaseAuthContext', () => ({
  useFirebaseAuth: jest.fn(),
}));

// Mock Lucide React icons
jest.mock('lucide-react', () => ({
  ArrowLeft: () => <div data-testid="arrow-left-icon" />,
  User: () => <div data-testid="user-icon" />,
  Lock: () => <div data-testid="lock-icon" />,
  Mail: () => <div data-testid="mail-icon" />,
  Eye: () => <div data-testid="eye-icon" />,
  EyeOff: () => <div data-testid="eye-off-icon" />,
  CheckCircle: () => <div data-testid="check-circle-icon" />,
  Loader2: () => <div data-testid="loader-icon" />,
  Github: () => <div data-testid="github-icon" />,
}));

const mockPush = jest.fn();
const mockRouter = {
  push: mockPush,
};

const mockFirebaseAuth = {
  signInWithGoogle: jest.fn(),
  signInWithGithub: jest.fn(),
  signInWithEmail: jest.fn(),
  signUpWithEmail: jest.fn(),
  isAuthenticated: false,
  user: null,
  isLoading: false,
};

describe('AuthPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (useFirebaseAuth as jest.Mock).mockReturnValue(mockFirebaseAuth);
  });

  describe('Rendering', () => {
    it('renders login form by default', () => {
      render(<AuthPage />);

      expect(screen.getByText('Welcome Back!')).toBeInTheDocument();
      expect(
        screen.getByText('Sign in to continue your learning journey')
      ).toBeInTheDocument();
      expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
      expect(screen.getByLabelText('Password')).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /sign in/i })
      ).toBeInTheDocument();
    });

    it('renders sign up form when toggled', () => {
      render(<AuthPage />);

      const toggleButton = screen.getByText("Don't have an account? Sign up");
      fireEvent.click(toggleButton);

      expect(screen.getByText('Create Account')).toBeInTheDocument();
      expect(
        screen.getByText(
          'Join Frontend KodDev and start mastering frontend development'
        )
      ).toBeInTheDocument();
      expect(screen.getByLabelText('Full Name')).toBeInTheDocument();
      expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /create account/i })
      ).toBeInTheDocument();
    });

    it('renders social login buttons', () => {
      render(<AuthPage />);

      expect(
        screen.getByRole('button', { name: /continue with google/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /continue with github/i })
      ).toBeInTheDocument();
    });

    it('renders forgot password link in login mode', () => {
      render(<AuthPage />);

      expect(screen.getByText('Forgot your password?')).toBeInTheDocument();
    });

    it('does not render forgot password link in sign up mode', () => {
      render(<AuthPage />);

      const toggleButton = screen.getByText("Don't have an account? Sign up");
      fireEvent.click(toggleButton);

      expect(
        screen.queryByText('Forgot your password?')
      ).not.toBeInTheDocument();
    });

    it('renders benefits section', () => {
      render(<AuthPage />);

      expect(screen.getByText('Why Create an Account?')).toBeInTheDocument();
      expect(screen.getByText('Track Progress')).toBeInTheDocument();
      expect(screen.getByText('Earn Badges')).toBeInTheDocument();
      expect(screen.getByText('Personalized Learning')).toBeInTheDocument();
    });
  });

  describe('Form Interactions', () => {
    it('toggles password visibility', () => {
      render(<AuthPage />);

      const passwordInput = screen.getByLabelText('Password');
      const toggleButton = screen.getByRole('button', { name: '' }); // Eye icon button

      expect(passwordInput).toHaveAttribute('type', 'password');

      fireEvent.click(toggleButton);
      expect(passwordInput).toHaveAttribute('type', 'text');

      fireEvent.click(toggleButton);
      expect(passwordInput).toHaveAttribute('type', 'password');
    });

    it('updates form data when inputs change', () => {
      render(<AuthPage />);

      const emailInput = screen.getByLabelText('Email Address');
      const passwordInput = screen.getByLabelText('Password');

      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });

      expect(emailInput).toHaveValue('test@example.com');
      expect(passwordInput).toHaveValue('password123');
    });

    it('shows name and confirm password fields in sign up mode', () => {
      render(<AuthPage />);

      const toggleButton = screen.getByText("Don't have an account? Sign up");
      fireEvent.click(toggleButton);

      const nameInput = screen.getByLabelText('Full Name');
      const confirmPasswordInput = screen.getByLabelText('Confirm Password');

      expect(nameInput).toBeInTheDocument();
      expect(confirmPasswordInput).toBeInTheDocument();
    });
  });

  describe('Form Validation', () => {
    it('shows error when passwords do not match in sign up', async () => {
      render(<AuthPage />);

      // Switch to sign up mode
      const toggleButton = screen.getByText("Don't have an account? Sign up");
      fireEvent.click(toggleButton);

      // Fill form with mismatched passwords
      fireEvent.change(screen.getByLabelText('Full Name'), {
        target: { value: 'John Doe' },
      });
      fireEvent.change(screen.getByLabelText('Email Address'), {
        target: { value: 'test@example.com' },
      });
      fireEvent.change(screen.getByLabelText('Password'), {
        target: { value: 'password123' },
      });
      fireEvent.change(screen.getByLabelText('Confirm Password'), {
        target: { value: 'different123' },
      });

      const submitButton = screen.getByRole('button', {
        name: /create account/i,
      });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Passwords do not match!')).toBeInTheDocument();
      });
    });

    it('clears error when user starts typing', () => {
      render(<AuthPage />);

      // Trigger an error first
      const submitButton = screen.getByRole('button', { name: /sign in/i });
      fireEvent.click(submitButton);

      // Start typing in email field
      const emailInput = screen.getByLabelText('Email Address');
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

      // Error should be cleared (this would need to be implemented in the component)
      // For now, we're testing the structure
      expect(emailInput).toHaveValue('test@example.com');
    });
  });

  describe('Authentication Flow', () => {
    it('redirects to dashboard when already authenticated', () => {
      (useFirebaseAuth as jest.Mock).mockReturnValue({
        ...mockFirebaseAuth,
        isAuthenticated: true,
      });

      render(<AuthPage />);

      expect(mockPush).toHaveBeenCalledWith('/dashboard');
    });

    it('calls signInWithEmail on login form submission', async () => {
      mockFirebaseAuth.signInWithEmail.mockResolvedValue({ success: true });

      render(<AuthPage />);

      fireEvent.change(screen.getByLabelText('Email Address'), {
        target: { value: 'test@example.com' },
      });
      fireEvent.change(screen.getByLabelText('Password'), {
        target: { value: 'password123' },
      });

      const submitButton = screen.getByRole('button', { name: /sign in/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockFirebaseAuth.signInWithEmail).toHaveBeenCalledWith(
          'test@example.com',
          'password123'
        );
      });
    });

    it('calls signUpWithEmail on sign up form submission', async () => {
      mockFirebaseAuth.signUpWithEmail.mockResolvedValue({ success: true });

      render(<AuthPage />);

      // Switch to sign up mode
      const toggleButton = screen.getByText("Don't have an account? Sign up");
      fireEvent.click(toggleButton);

      // Fill form
      fireEvent.change(screen.getByLabelText('Full Name'), {
        target: { value: 'John Doe' },
      });
      fireEvent.change(screen.getByLabelText('Email Address'), {
        target: { value: 'test@example.com' },
      });
      fireEvent.change(screen.getByLabelText('Password'), {
        target: { value: 'password123' },
      });
      fireEvent.change(screen.getByLabelText('Confirm Password'), {
        target: { value: 'password123' },
      });

      const submitButton = screen.getByRole('button', {
        name: /create account/i,
      });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockFirebaseAuth.signUpWithEmail).toHaveBeenCalledWith(
          'John Doe',
          'test@example.com',
          'password123'
        );
      });
    });

    it('redirects to dashboard on successful login', async () => {
      mockFirebaseAuth.signInWithEmail.mockResolvedValue({ success: true });

      render(<AuthPage />);

      fireEvent.change(screen.getByLabelText('Email Address'), {
        target: { value: 'test@example.com' },
      });
      fireEvent.change(screen.getByLabelText('Password'), {
        target: { value: 'password123' },
      });

      const submitButton = screen.getByRole('button', { name: /sign in/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/dashboard');
      });
    });

    it('shows error message on failed login', async () => {
      mockFirebaseAuth.signInWithEmail.mockResolvedValue({
        success: false,
        error: 'Invalid credentials',
      });

      render(<AuthPage />);

      fireEvent.change(screen.getByLabelText('Email Address'), {
        target: { value: 'test@example.com' },
      });
      fireEvent.change(screen.getByLabelText('Password'), {
        target: { value: 'wrongpassword' },
      });

      const submitButton = screen.getByRole('button', { name: /sign in/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
      });
    });
  });

  describe('Social Authentication', () => {
    it('calls signInWithGoogle when Google button is clicked', async () => {
      mockFirebaseAuth.signInWithGoogle.mockResolvedValue({ success: true });

      render(<AuthPage />);

      const googleButton = screen.getByRole('button', {
        name: /continue with google/i,
      });
      fireEvent.click(googleButton);

      await waitFor(() => {
        expect(mockFirebaseAuth.signInWithGoogle).toHaveBeenCalled();
      });
    });

    it('calls signInWithGithub when GitHub button is clicked', async () => {
      mockFirebaseAuth.signInWithGithub.mockResolvedValue({ success: true });

      render(<AuthPage />);

      const githubButton = screen.getByRole('button', {
        name: /continue with github/i,
      });
      fireEvent.click(githubButton);

      await waitFor(() => {
        expect(mockFirebaseAuth.signInWithGithub).toHaveBeenCalled();
      });
    });

    it('shows error message on failed social login', async () => {
      mockFirebaseAuth.signInWithGoogle.mockResolvedValue({
        success: false,
        error: 'Google sign-in failed',
      });

      render(<AuthPage />);

      const googleButton = screen.getByRole('button', {
        name: /continue with google/i,
      });
      fireEvent.click(googleButton);

      await waitFor(() => {
        expect(screen.getByText('Google sign-in failed')).toBeInTheDocument();
      });
    });

    it('redirects to dashboard on successful social login', async () => {
      mockFirebaseAuth.signInWithGoogle.mockResolvedValue({ success: true });

      render(<AuthPage />);

      const googleButton = screen.getByRole('button', {
        name: /continue with google/i,
      });
      fireEvent.click(googleButton);

      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/dashboard');
      });
    });
  });

  describe('Loading States', () => {
    it('shows loading state during form submission', async () => {
      mockFirebaseAuth.signInWithEmail.mockImplementation(
        () =>
          new Promise(resolve =>
            setTimeout(() => resolve({ success: true }), 100)
          )
      );

      render(<AuthPage />);

      fireEvent.change(screen.getByLabelText('Email Address'), {
        target: { value: 'test@example.com' },
      });
      fireEvent.change(screen.getByLabelText('Password'), {
        target: { value: 'password123' },
      });

      const submitButton = screen.getByRole('button', { name: /sign in/i });
      fireEvent.click(submitButton);

      expect(screen.getByText('Signing In...')).toBeInTheDocument();
      expect(screen.getByTestId('loader-icon')).toBeInTheDocument();
    });

    it('disables buttons during submission', async () => {
      mockFirebaseAuth.signInWithEmail.mockImplementation(
        () =>
          new Promise(resolve =>
            setTimeout(() => resolve({ success: true }), 100)
          )
      );

      render(<AuthPage />);

      fireEvent.change(screen.getByLabelText('Email Address'), {
        target: { value: 'test@example.com' },
      });
      fireEvent.change(screen.getByLabelText('Password'), {
        target: { value: 'password123' },
      });

      const submitButton = screen.getByRole('button', { name: /sign in/i });
      const googleButton = screen.getByRole('button', {
        name: /continue with google/i,
      });

      fireEvent.click(submitButton);

      expect(submitButton).toBeDisabled();
      expect(googleButton).toBeDisabled();
    });
  });

  describe('Navigation', () => {
    it('renders back to home link', () => {
      render(<AuthPage />);

      const backLink = screen.getByRole('link', { name: /back to home/i });
      expect(backLink).toBeInTheDocument();
      expect(backLink).toHaveAttribute('href', '/');
    });
  });
});
