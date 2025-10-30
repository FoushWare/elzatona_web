// v1.0
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NavbarSimple from '@/components/NavbarSimple';

jest.mock('@elzatona/shared-contexts', () => {
  const React = require('react');
  const Ctx = React.createContext({
    userType: 'guided',
    setUserType: () => {},
  });
  return {
    __esModule: true,
    useUserType: () => React.useContext(Ctx),
    useMobileMenu: () => ({ setIsMobileMenuOpen: () => {} }),
    useTheme: () => ({ isDarkMode: false, toggleDarkMode: () => {} }),
    useAuth: () => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      signOut: async () => {},
    }),
  };
});

// Mock shared contexts used by NavbarSimple
jest.mock('@elzatona/shared-contexts', () => ({
  useUserType: () => ({ userType: 'guided', setUserType: () => {} }),
  useMobileMenu: () => ({ setIsMobileMenuOpen: () => {} }),
  useTheme: () => ({ isDarkMode: false, toggleDarkMode: () => {} }),
  useAuth: () => ({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    signOut: async () => {},
  }),
}));

// Mock LearningTypeContext
jest.mock('@/context/LearningTypeContext', () => ({
  useLearningType: () => ({
    learningType: 'guided',
    setLearningType: () => {},
  }),
}));

// Mock notifications
jest.mock('@/components/NotificationSystem', () => ({
  useNotifications: () => ({ addNotification: () => {} }),
}));

describe('NavbarSimple', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it('renders Sign In by default (unauthenticated)', () => {
    render(<NavbarSimple />);
    expect(screen.getByText('Sign In')).toBeInTheDocument();
  });

  it('renders Dashboard when persisted auth is set in sessionStorage (no flicker path)', () => {
    sessionStorage.setItem(
      'navbar-auth-state',
      JSON.stringify({ isAuthenticated: true, isLoading: false })
    );
    render(<NavbarSimple />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });
});
