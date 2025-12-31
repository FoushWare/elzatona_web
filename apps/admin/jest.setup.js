// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

// Mock all contexts before any tests run to prevent real context access
jest.mock("@elzatona/contexts", () => {
  const React = require("react");
  
  return {
    AdminAuthProvider: ({ children }) => children,
    useAdminAuth: jest.fn(() => ({
      isAuthenticated: false,
      isLoading: false,
      login: jest.fn(),
      logout: jest.fn(),
      user: null,
      error: null,
    })),
    AdminAuthContext: React.createContext(undefined),
    AuthContext: React.createContext(undefined),
    useAuth: jest.fn(() => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      signOut: jest.fn(),
    })),
    LanguageContext: React.createContext(undefined),
    useLanguage: jest.fn(() => ({ language: "en", setLanguage: jest.fn() })),
    MobileMenuContext: React.createContext(undefined),
    useMobileMenu: jest.fn(() => ({ setIsMobileMenuOpen: jest.fn() })),
    NotificationContext: React.createContext(undefined),
    useNotifications: jest.fn(() => ({
      notifications: [],
      unreadCount: 0,
      isLoading: false,
      error: null,
      markAsRead: jest.fn(),
      markAllAsRead: jest.fn(),
      refreshNotifications: jest.fn(),
    })),
    NotificationProvider: ({ children }) => children,
    ThemeContext: React.createContext(undefined),
    useTheme: jest.fn(() => ({ isDarkMode: false, toggleDarkMode: jest.fn() })),
    ThemeProvider: ({ children }) => children,
    UserPreferencesContext: React.createContext(undefined),
    useUserPreferences: jest.fn(() => ({})),
    UserTypeContextSafe: React.createContext(undefined),
    useUserType: jest.fn(() => ({ userType: "guided", setUserType: jest.fn() })),
  };
});

// Also mock the specific AdminAuthContext file path
jest.mock("../../../../libs/contexts/src/lib/AdminAuthContext", () => ({
  AdminAuthProvider: ({ children }) => children,
  useAdminAuth: jest.fn(() => ({
    isAuthenticated: false,
    isLoading: false,
    login: jest.fn(),
    logout: jest.fn(),
    user: null,
    error: null,
  })),
  AdminAuthContext: require("react").createContext(undefined),
}));

// Set default test environment variables if not already set
// This prevents errors when environment variables are missing
if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  process.env.NEXT_PUBLIC_SUPABASE_URL =
    process.env.TEST_SUPABASE_URL || "https://test-project.supabase.co";
}

if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY =
    process.env.TEST_SUPABASE_ANON_KEY || "test-anon-key";
}

if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
  process.env.SUPABASE_SERVICE_ROLE_KEY =
    process.env.TEST_SUPABASE_SERVICE_ROLE_KEY || "test-service-role-key";
}

// Replace placeholder values with defaults
if (
  process.env.NEXT_PUBLIC_SUPABASE_URL?.includes("your-project") ||
  process.env.NEXT_PUBLIC_SUPABASE_URL === "https://placeholder.supabase.co"
) {
  process.env.NEXT_PUBLIC_SUPABASE_URL = "https://test-project.supabase.co";
}

if (
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.includes("your-anon-key") ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY === "placeholder-anon-key"
) {
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "test-anon-key";
}

if (
  process.env.SUPABASE_SERVICE_ROLE_KEY?.includes("your-service-role-key") ||
  process.env.SUPABASE_SERVICE_ROLE_KEY === "placeholder-service-role-key"
) {
  process.env.SUPABASE_SERVICE_ROLE_KEY = "test-service-role-key";
}
