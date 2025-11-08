// v1.0 test mock
import React from 'react';

export const useUserType = () => ({
  userType: 'guided',
  setUserType: () => {},
});
export const useMobileMenu = () => ({ setIsMobileMenuOpen: () => {} });
export const useTheme = () => ({ isDarkMode: false, toggleDarkMode: () => {} });
export const useAuth = () => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  signOut: async () => {},
});

// Admin auth mocks
export const AdminAuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => children;

const defaultAdminAuth = {
  isAuthenticated: false,
  isLoading: false,
  login: jest.fn(),
  logout: jest.fn(),
  user: null,
};

export const useAdminAuth = jest.fn(() => defaultAdminAuth);

// Theme provider mocks
export const ThemeProvider = ({ children }: { children: React.ReactNode }) =>
  React.createElement(React.Fragment, null, children);
