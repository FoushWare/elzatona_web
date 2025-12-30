import React from "react";

// Mock all context exports to ensure complete override
export const AdminAuthProvider = ({ children }: { children: React.ReactNode }) => children;

export const useAdminAuth = jest.fn(() => ({
  isAuthenticated: false,
  isLoading: false,
  login: jest.fn(),
  logout: jest.fn(),
  user: null,
  error: null,
}));

export const AdminAuthContext = React.createContext(undefined);

// Mock all other contexts that might be imported
export const AuthContext = React.createContext(undefined);
export const CookieAuthContext = React.createContext(undefined);
export const LanguageContext = React.createContext(undefined);
export const MobileMenuContext = React.createContext(undefined);
export const NotificationContext = React.createContext(undefined);
export const OnboardingContext = React.createContext(undefined);
export const ThemeContext = React.createContext(undefined);
export const UserPreferencesContext = React.createContext(undefined);
export const UserTypeContextSafe = React.createContext(undefined);

// Mock all context hooks
export const useAuth = jest.fn(() => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  signOut: jest.fn(),
}));

export const useCookieAuth = jest.fn(() => ({}));
export const useLanguage = jest.fn(() => ({ language: "en", setLanguage: jest.fn() }));
export const useMobileMenu = jest.fn(() => ({ setIsMobileMenuOpen: jest.fn() }));
export const useNotifications = jest.fn(() => ({
  notifications: [],
  unreadCount: 0,
  isLoading: false,
  error: null,
  markAsRead: jest.fn(),
  markAllAsRead: jest.fn(),
  refreshNotifications: jest.fn(),
}));
export const useOnboarding = jest.fn(() => ({}));
export const useTheme = jest.fn(() => ({ isDarkMode: false, toggleDarkMode: jest.fn() }));
export const useUserPreferences = jest.fn(() => ({}));
export const useUserType = jest.fn(() => ({ userType: "guided", setUserType: jest.fn() }));

// Mock providers
export const NotificationProvider = ({ children }: { children: React.ReactNode }) => children;
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => children;
