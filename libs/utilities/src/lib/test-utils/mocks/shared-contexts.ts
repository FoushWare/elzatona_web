// v1.0 test mock
import React from "react";

export const useUserType = () => ({
  userType: "guided",
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

import { createMockFn } from "./jest-helper";

const defaultAdminAuth = {
  isAuthenticated: false,
  isLoading: false,
  login: createMockFn(() => {}),
  logout: createMockFn(() => {}),
  user: null,
};

export const useAdminAuth = createMockFn(
  () => defaultAdminAuth,
) as any;

// Notification context mocks
export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => children;
export const useNotifications = createMockFn(() => ({
  notifications: [],
  unreadCount: 0,
  isLoading: false,
  error: null,
  markAsRead: createMockFn(() => {}),
  markAllAsRead: createMockFn(() => {}),
  refreshNotifications: createMockFn(() => {}),
}));

// Theme provider mocks
export const ThemeProvider = ({ children }: { children: React.ReactNode }) =>
  React.createElement(React.Fragment, null, children);
