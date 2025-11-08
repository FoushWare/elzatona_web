// v1.1 - Fixed test with proper mocks
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NavbarSimple from '../components/NavbarSimple';

// Mock shared contexts used by NavbarSimple
jest.mock('@elzatona/shared-contexts', () => ({
  useUserType: () => ({ userType: 'guided', setUserType: jest.fn() }),
  useMobileMenu: () => ({ setIsMobileMenuOpen: jest.fn() }),
  useTheme: () => ({ isDarkMode: false, toggleDarkMode: jest.fn() }),
  useAuth: () => ({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    logout: jest.fn(),
  }),
}));

// Mock LearningTypeContext
jest.mock('@/context/LearningTypeContext', () => ({
  useLearningType: () => ({
    learningType: 'guided',
    setLearningType: jest.fn(),
  }),
}));

// Mock Next.js navigation
jest.mock('next/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({ push: jest.fn() }),
}));

// Mock Supabase client
jest.mock('@/lib/supabase-client', () => ({
  supabaseClient: null,
  isSupabaseAvailable: () => false,
}));

// Mock auth session
jest.mock('@/lib/auth-session', () => ({
  clearSession: jest.fn(),
}));

describe('NavbarSimple', () => {
  beforeEach(() => {
    sessionStorage.clear();
    jest.clearAllMocks();
  });

  it('renders Sign In by default (unauthenticated)', () => {
    render(<NavbarSimple />);
    expect(screen.getByText('Sign In')).toBeInTheDocument();
  });

  it('renders Dashboard when persisted auth is set in sessionStorage', () => {
    sessionStorage.setItem(
      'navbar-auth-state',
      JSON.stringify({ isAuthenticated: true, isLoading: false })
    );
    render(<NavbarSimple />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });
});
