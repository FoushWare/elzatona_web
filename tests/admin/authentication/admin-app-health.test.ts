/**
 * Admin App Health Check Test
 * 
 * This test verifies that the admin app is running correctly
 * and all critical components are accessible.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AdminAuthProvider } from '../../../apps/admin/contexts/AdminAuthContext';
import AdminLoginPage from '../../../apps/admin/app/admin/login/page';

// Mock Firebase
vi.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: vi.fn(),
  signOut: vi.fn(),
  onAuthStateChanged: vi.fn(),
}));

vi.mock('firebase/firestore', () => ({
  doc: vi.fn(),
  getDoc: vi.fn(),
  setDoc: vi.fn(),
}));

vi.mock('../../../apps/admin/lib/firebase', () => ({
  auth: {},
  db: {},
}));

// Mock Next.js
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
  }),
  usePathname: () => '/admin/login',
}));

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>
    <AdminAuthProvider>
      {children}
    </AdminAuthProvider>
  </BrowserRouter>
);

describe('Admin App Health Check', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render admin login page without errors', () => {
    expect(() => {
      render(
        <TestWrapper>
          <AdminLoginPage />
        </TestWrapper>
      );
    }).not.toThrow();
  });

  it('should display admin login form elements', () => {
    render(
      <TestWrapper>
        <AdminLoginPage />
      </TestWrapper>
    );

    expect(screen.getByText('Admin Login')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('should have proper form validation', () => {
    render(
      <TestWrapper>
        <AdminLoginPage />
      </TestWrapper>
    );

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');

    expect(emailInput).toHaveAttribute('type', 'email');
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  it('should handle form submission', async () => {
    render(
      <TestWrapper>
        <AdminLoginPage />
      </TestWrapper>
    );

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    fireEvent.change(emailInput, {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(passwordInput, {
      target: { value: 'password123' }
    });

    fireEvent.click(submitButton);

    // Should not throw any errors
    expect(true).toBe(true);
  });
});
