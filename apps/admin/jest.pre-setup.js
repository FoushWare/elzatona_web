// Pre-setup file that runs before all other Jest setup
// This ensures mocks are applied before any module imports

// Mock the contexts module at the earliest possible moment
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

// Mock the specific AdminAuthContext file path
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

// Mock the shared contexts file as well
jest.mock("../../../../libs/contexts/src/lib/shared-contexts", () => ({
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
