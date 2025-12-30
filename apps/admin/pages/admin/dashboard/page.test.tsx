/**
 * Unit Tests for Admin Dashboard (A-UT-011, A-UT-012, A-UT-013)
 * Task: A-003 - Admin Dashboard
 */

// Load environment variables automatically (detects test vs production)
// Priority: .env.test.local > .env.test > .env.local
// In CI: Uses GitHub Secrets automatically
import { loadTestEnvironment } from "../lib/test-env-loader";
loadTestEnvironment();

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import AdminDashboard from "./page";

// Declare mock functions at top level before jest.mock() calls
const mockRefetch = jest.fn();

// Mock shared contexts
// IMPORTANT: Do NOT use jest.requireActual here as it loads the real module
// which includes the real useAdminAuth that throws if not in provider
jest.mock("@elzatona/contexts", () => {
  return {
    useAdminAuth: jest.fn(() => ({
      user: {
        id: "1",
        email: "admin@example.com",
        role: "super_admin",
        name: "Admin User",
      },
    })),
    AdminAuthProvider: ({ children }) => children,
    NotificationProvider: ({ children }) => children,
  };
});

// Mock shared hooks
jest.mock("@elzatona/hooks", () => ({
  useAdminStats: jest.fn(),
}));

// Mock @elzatona/common-ui
jest.mock("@elzatona/common-ui", () => {
  const React = jest.requireActual("react");
  return {
    AdminDashboardTemplate: function AdminDashboardTemplate(props) {
      const {
        welcomeTitle,
        welcomeSubtitle,
        refreshButton,
        stats,
        quickActions,
      } = props;
      return React.createElement(
        "div",
        { "data-testid": "admin-dashboard-template" },
        React.createElement("h1", null, welcomeTitle),
        React.createElement("div", null, welcomeSubtitle),
        refreshButton &&
          React.createElement(
            "button",
            {
              onClick: refreshButton.onClick,
              disabled: refreshButton.disabled,
            },
            refreshButton.loading ? "Refreshing..." : "Refresh",
          ),
        React.createElement(
          "div",
          { "data-testid": "stats-grid" },
          stats.metrics.map(function (metric, index) {
            return React.createElement(
              "div",
              { key: index },
              metric.label + ": " + metric.value,
            );
          }),
        ),
        React.createElement(
          "div",
          { "data-testid": "quick-actions" },
          quickActions.actions.map(function (action, index) {
            return React.createElement(
              "button",
              {
                key: index,
                onClick: function () {
                  window.location.href = action.href;
                },
              },
              action.title,
            );
          }),
        ),
      );
    },
  };
});

// Note: lucide-react is automatically mocked via moduleNameMapper in jest.config.js
// The mock file at libs/utilities/src/lib/test-utils/mocks/lucide-react.tsx handles all icons

describe("A-UT-011: Dashboard Renders", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { useAdminAuth } = require("@elzatona/contexts");
    (useAdminAuth as jest.Mock).mockReturnValue({
      user: {
        id: "1",
        email: "admin@example.com",
        role: "super_admin",
        name: "Admin User",
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { useAdminStats } = require("@elzatona/hooks");
    (useAdminStats as jest.Mock).mockReturnValue({
      data: {
        questions: 100,
        categories: 10,
        topics: 50,
        learningCards: 5,
        learningPlans: 3,
        frontendTasks: 20,
        problemSolvingTasks: 15,
        totalContent: 200,
        totalUsers: 50,
      },
      isLoading: false,
      error: null,
      refetch: mockRefetch,
      isRefetching: false,
    });
  });

  it("should render without errors", () => {
    const { container } = render(<AdminDashboard />);
    expect(container).toBeInTheDocument();
  });

  it("should display dashboard title", () => {
    render(<AdminDashboard />);
    expect(screen.getByText(/Admin Dashboard/i)).toBeInTheDocument();
  });

  it("should display welcome message with user name", () => {
    render(<AdminDashboard />);
    expect(screen.getByText(/Welcome back/i)).toBeInTheDocument();
    expect(screen.getByText(/Admin User/i)).toBeInTheDocument();
  });
});

describe("A-UT-012: Stats Display", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { useAdminAuth } = require("@elzatona/contexts");
    (useAdminAuth as jest.Mock).mockReturnValue({
      user: {
        id: "1",
        email: "admin@example.com",
        role: "super_admin",
        name: "Admin User",
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { useAdminStats } = require("@elzatona/hooks");
    (useAdminStats as jest.Mock).mockReturnValue({
      data: {
        questions: 100,
        categories: 10,
        topics: 50,
        learningCards: 5,
        learningPlans: 3,
        frontendTasks: 20,
        problemSolvingTasks: 15,
        totalContent: 200,
        totalUsers: 50,
      },
      isLoading: false,
      error: null,
      refetch: mockRefetch,
      isRefetching: false,
    });
  });

  it("should display total questions stat", () => {
    render(<AdminDashboard />);
    expect(screen.getByText(/Total Questions/i)).toBeInTheDocument();
  });

  it("should display learning cards stat", () => {
    render(<AdminDashboard />);
    // Learning Cards appears multiple times, check that it exists
    expect(screen.getAllByText(/Learning Cards/i).length).toBeGreaterThan(0);
  });

  it("should display learning plans stat", () => {
    render(<AdminDashboard />);
    expect(screen.getByText(/Learning Plans/i)).toBeInTheDocument();
  });

  it("should display topics stat", () => {
    render(<AdminDashboard />);
    expect(screen.getByText(/^Topics$/i)).toBeInTheDocument();
  });

  it("should display categories stat", () => {
    render(<AdminDashboard />);
    expect(screen.getByText(/^Categories$/i)).toBeInTheDocument();
  });

  it("should display total tasks stat", () => {
    render(<AdminDashboard />);
    expect(screen.getByText(/Total Tasks/i)).toBeInTheDocument();
  });

  it("should display quick action buttons", () => {
    render(<AdminDashboard />);
    // Check for quick actions that are actually displayed
    expect(screen.getByText(/Add New Question/i)).toBeInTheDocument();
    expect(screen.getByText(/Create Frontend Task/i)).toBeInTheDocument();
    expect(screen.getByText(/Add Problem Solving/i)).toBeInTheDocument();
  });

  it("should display all metric labels", () => {
    render(<AdminDashboard />);
    expect(screen.getByText(/Total Questions: 100/i)).toBeInTheDocument();
    expect(screen.getByText(/Learning Cards: 5/i)).toBeInTheDocument();
    expect(screen.getByText(/Learning Plans: 3/i)).toBeInTheDocument();
  });
});

describe("A-UT-013: Refresh Functionality", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockRefetch.mockClear();

    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { useAdminAuth } = require("@elzatona/contexts");
    (useAdminAuth as jest.Mock).mockReturnValue({
      user: {
        id: "1",
        email: "admin@example.com",
        role: "super_admin",
        name: "Admin User",
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { useAdminStats } = require("@elzatona/hooks");
    (useAdminStats as jest.Mock).mockReturnValue({
      data: {
        questions: 100,
        categories: 10,
        topics: 50,
        learningCards: 5,
        learningPlans: 3,
        frontendTasks: 20,
        problemSolvingTasks: 15,
        totalContent: 200,
        totalUsers: 50,
      },
      isLoading: false,
      error: null,
      refetch: mockRefetch,
      isRefetching: false,
    });
  });

  it("should have refresh button", () => {
    render(<AdminDashboard />);
    const refreshButton = screen.getByText(/Refresh/i);
    expect(refreshButton).toBeInTheDocument();
  });

  it("should call refetch when refresh button is clicked", () => {
    render(<AdminDashboard />);
    const refreshButton = screen.getByText(/Refresh/i);
    fireEvent.click(refreshButton);

    expect(mockRefetch).toHaveBeenCalled();
  });
});

describe("A-UT-SNAPSHOT: Admin Dashboard Snapshot Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { useAdminAuth } = require("@elzatona/contexts");
    (useAdminAuth as jest.Mock).mockReturnValue({
      user: {
        id: "1",
        email: "admin@example.com",
        role: "super_admin",
        name: "Admin User",
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { useAdminStats } = require("@elzatona/hooks");
    (useAdminStats as jest.Mock).mockReturnValue({
      data: {
        questions: 100,
        categories: 10,
        topics: 50,
        learningCards: 5,
        learningPlans: 3,
        frontendTasks: 20,
        problemSolvingTasks: 15,
        totalContent: 200,
        totalUsers: 50,
      },
      isLoading: false,
      error: null,
      refetch: mockRefetch,
      isRefetching: false,
    });
  });

  it("should match admin dashboard snapshot (with stats)", () => {
    const { container } = render(<AdminDashboard />);
    expect(container.firstChild).toMatchSnapshot("admin-dashboard-with-stats");
  });

  it("should match admin dashboard snapshot (loading state)", () => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { useAdminStats } = require("@elzatona/hooks");
    (useAdminStats as jest.Mock).mockReturnValueOnce({
      data: null,
      isLoading: true,
      isFetching: true,
      error: null,
      refetch: mockRefetch,
      isRefetching: false,
    });

    const { container } = render(<AdminDashboard />);
    expect(container.firstChild).toMatchSnapshot("admin-dashboard-loading");
  });

  it("should match admin dashboard snapshot (error state)", () => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { useAdminStats } = require("@elzatona/hooks");
    (useAdminStats as jest.Mock).mockReturnValueOnce({
      data: null,
      isLoading: false,
      isFetching: false,
      error: new Error("Failed to load stats"),
      refetch: mockRefetch,
      isRefetching: false,
    });

    const { container } = render(<AdminDashboard />);
    expect(container.firstChild).toMatchSnapshot("admin-dashboard-error");
  });

  it("should match admin dashboard snapshot (empty stats)", () => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { useAdminStats } = require("@elzatona/hooks");
    (useAdminStats as jest.Mock).mockReturnValueOnce({
      data: {
        questions: 0,
        categories: 0,
        topics: 0,
        learningCards: 0,
        learningPlans: 0,
        frontendTasks: 0,
        problemSolvingTasks: 0,
        totalContent: 0,
        totalUsers: 0,
      },
      isLoading: false,
      isFetching: false,
      error: null,
      refetch: mockRefetch,
      isRefetching: false,
    });

    const { container } = render(<AdminDashboard />);
    expect(container.firstChild).toMatchSnapshot("admin-dashboard-empty-stats");
  });
});
