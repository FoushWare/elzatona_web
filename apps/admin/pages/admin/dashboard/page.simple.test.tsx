/**
 * Simple Test for Admin Dashboard - Bypassing Context Issues
 * This test creates a wrapper component that provides the context directly
 */

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import AdminDashboard from "./page";

// Mock shared hooks
jest.mock("@elzatona/hooks", () => ({
  useAdminStats: jest.fn(() => ({
    data: {
      questions: 100,
      categories: 10,
      topics: 25,
      learningCards: 5,
      learningPlans: 3,
      frontendTasks: 20,
      problemSolvingTasks: 15,
      totalContent: 200,
      totalUsers: 50,
    },
    isLoading: false,
    error: null,
    refetch: jest.fn(),
    isRefetching: false,
  })),
}));

// Mock @elzatona/common-ui
jest.mock("@elzatona/common-ui", () => {
  const React = jest.requireActual("react");
  return {
    AdminDashboardTemplate: function AdminDashboardTemplate(props) {
      const {
        children,
        isLoading = false,
        isRefetching = false,
        onRefresh,
      } = props;

      return React.createElement(
        "div",
        { "data-testid": "admin-dashboard-template" },
        React.createElement(
          "div",
          { "data-testid": "dashboard-content" },
          children,
        ),
        isLoading &&
          React.createElement(
            "div",
            { "data-testid": "loading-indicator" },
            "Loading...",
          ),
        isRefetching &&
          React.createElement(
            "div",
            { "data-testid": "refreshing-indicator" },
            "Refreshing...",
          ),
        onRefresh &&
          React.createElement(
            "button",
            { "data-testid": "refresh-button", onClick: onRefresh },
            "Refresh",
          ),
      );
    },
    AdminMetricCard: function AdminMetricCard({ title, value, icon, trend }) {
      return React.createElement(
        "div",
        {
          "data-testid": `metric-card-${title.toLowerCase().replace(/\s+/g, "-")}`,
        },
        React.createElement("h3", null, title),
        React.createElement(
          "div",
          {
            "data-testid": `metric-value-${title.toLowerCase().replace(/\s+/g, "-")}`,
          },
          value,
        ),
        trend &&
          React.createElement(
            "div",
            {
              "data-testid": `metric-trend-${title.toLowerCase().replace(/\s+/g, "-")}`,
            },
            trend,
          ),
      );
    },
    AdminQuickActionsSection: function AdminQuickActionsSection({ actions }) {
      return React.createElement(
        "div",
        { "data-testid": "quick-actions-section" },
        actions.map((action, index) =>
          React.createElement(
            "button",
            {
              key: index,
              "data-testid": `quick-action-${action.title.toLowerCase().replace(/\s+/g, "-")}`,
              onClick: action.onClick,
            },
            action.title,
          ),
        ),
      );
    },
  };
});

// Create a wrapper component that provides the context
const DashboardTestWrapper = ({ children }) => {
  // Create a mock context provider inline
  const MockAdminAuthContext = React.createContext(undefined);

  const AdminAuthProvider = ({ children }) => {
    const mockValue = {
      isAuthenticated: true,
      isLoading: false,
      login: jest.fn(),
      logout: jest.fn(),
      user: {
        id: "1",
        email: "admin@example.com",
        role: "super_admin",
        name: "Admin User",
      },
      error: null,
    };

    return React.createElement(
      MockAdminAuthContext.Provider,
      { value: mockValue },
      children,
    );
  };

  const useAdminAuth = () => {
    const context = React.useContext(MockAdminAuthContext);
    if (context === undefined) {
      throw new Error("useAdminAuth must be used within an AdminAuthProvider");
    }
    return context;
  };

  // Mock the context module
  jest.doMock("@elzatona/contexts", () => ({
    useAdminAuth,
    AdminAuthProvider,
    useUserType: jest.fn(() => ({
      userType: "guided",
      setUserType: jest.fn(),
    })),
    useMobileMenu: jest.fn(() => ({ setIsMobileMenuOpen: jest.fn() })),
    useTheme: jest.fn(() => ({ isDarkMode: false, toggleDarkMode: jest.fn() })),
    useAuth: jest.fn(() => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      signOut: jest.fn(),
    })),
    NotificationProvider: ({ children }) => children,
    useNotifications: jest.fn(() => ({
      notifications: [],
      unreadCount: 0,
      isLoading: false,
      error: null,
      markAsRead: jest.fn(),
      markAllAsRead: jest.fn(),
      refreshNotifications: jest.fn(),
    })),
    ThemeProvider: ({ children }) => children,
  }));

  return React.createElement(AdminAuthProvider, {}, children);
};

describe("Admin Dashboard Simple Tests", () => {
  it("should render without errors", () => {
    render(
      React.createElement(
        DashboardTestWrapper,
        {},
        React.createElement(AdminDashboard),
      ),
    );

    expect(screen.getByTestId("admin-dashboard-template")).toBeInTheDocument();
    expect(screen.getByTestId("dashboard-content")).toBeInTheDocument();
  });

  it("should display dashboard title", () => {
    render(
      React.createElement(
        DashboardTestWrapper,
        {},
        React.createElement(AdminDashboard),
      ),
    );

    expect(screen.getByText(/Admin Dashboard/i)).toBeInTheDocument();
  });

  it("should display welcome message with user name", () => {
    render(
      React.createElement(
        DashboardTestWrapper,
        {},
        React.createElement(AdminDashboard),
      ),
    );

    expect(screen.getByText(/Welcome back/i)).toBeInTheDocument();
    expect(screen.getByText(/Admin User/i)).toBeInTheDocument();
  });
});
