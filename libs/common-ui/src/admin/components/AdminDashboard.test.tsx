/**
 * Unit tests for AdminDashboard component.
 * Tests dashboard rendering, stats display, loading states, and error handling.
 */

import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import AdminDashboard from "./AdminDashboard";
import { useAdminAuth } from "@elzatona/contexts";
import { useDashboardStats } from "@elzatona/hooks";

// Mock hooks
vi.mock("@elzatona/contexts", () => ({
  useAdminAuth: vi.fn(),
}));

vi.mock("@elzatona/hooks", () => ({
  useDashboardStats: vi.fn(),
}));

// Mock child components
vi.mock("../../components/organisms/MetricGrid", () => ({
  MetricGrid: ({ metrics }: any) => (
    <div data-testid="metric-grid">
      {metrics.map((metric: any, index: number) => (
        <div key={index} data-testid={`metric-${metric.label}`}>
          {metric.label}: {metric.value}
        </div>
      ))}
    </div>
  ),
}));

vi.mock("../../components/organisms/ActivityFeed", () => ({
  ActivityFeed: ({ activities }: any) => (
    <div data-testid="activity-feed">
      {activities.map((activity: any, index: number) => (
        <div key={index} data-testid={`activity-${activity.label}`}>
          {activity.label}: {activity.value}
        </div>
      ))}
    </div>
  ),
}));

vi.mock("../../components/molecules/DataTableHeader", () => ({
  DataTableHeader: ({ title, icon: Icon }: any) => (
    <div data-testid="data-table-header">
      <Icon data-testid="header-icon" />
      {title}
    </div>
  ),
}));

vi.mock("../../components/molecules/WelcomeHeader", () => ({
  WelcomeHeader: ({ title, subtitle, refreshButton }: any) => (
    <div data-testid="welcome-header">
      <h1>{title}</h1>
      <div data-testid="welcome-subtitle">{subtitle}</div>
      <button
        data-testid="refresh-button"
        onClick={refreshButton?.onClick}
        disabled={refreshButton?.disabled}
      >
        Refresh
      </button>
    </div>
  ),
}));

vi.mock("../../components/molecules/ErrorAlert", () => ({
  ErrorAlert: ({ title, message }: any) => (
    <div data-testid="error-alert">
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  ),
}));

vi.mock("../../components/organisms/QuickActions", () => ({
  QuickActions: ({ actions }: any) => (
    <div data-testid="quick-actions">
      {actions.map((action: any, index: number) => (
        <div key={index} data-testid={`quick-action-${action.title}`}>
          {action.title}
        </div>
      ))}
    </div>
  ),
}));

describe("AdminDashboard", () => {
  const mockUser = {
    email: "admin@example.com",
    role: "admin",
  };

  const mockStats = {
    questions: 150,
    cards: 75,
    learningPlans: 30,
    totalTasks: 250,
  };

  beforeEach(() => {
    vi.clearAllMocks();

    // Default mocks
    vi.mocked(useAdminAuth).mockReturnValue({
      user: mockUser,
      isAuthenticated: true,
      isLoading: false,
    } as any);

    vi.mocked(useDashboardStats).mockReturnValue({
      stats: mockStats,
      loading: false,
      error: null,
      refetch: vi.fn(),
    });
  });

  describe("Rendering", () => {
    it("should render welcome header with user information", () => {
      render(<AdminDashboard />);

      expect(screen.getByText("🎯 Admin Dashboard")).toBeInTheDocument();
      expect(screen.getByTestId("welcome-subtitle")).toHaveTextContent("admin@example.com");
      expect(screen.getByTestId("welcome-subtitle")).toHaveTextContent("(admin)");
    });

    it("should render system metrics grid", () => {
      render(<AdminDashboard />);

      expect(screen.getByTestId("metric-grid")).toBeInTheDocument();
      expect(screen.getByTestId("metric-Total Questions")).toHaveTextContent("150");
      expect(screen.getByTestId("metric-Learning Cards")).toHaveTextContent("75");
      expect(screen.getByTestId("metric-Learning Plans")).toHaveTextContent("30");
      expect(screen.getByTestId("metric-Total Tasks")).toHaveTextContent("250");
    });

    it("should render quick actions", () => {
      render(<AdminDashboard />);

      expect(screen.getByTestId("quick-actions")).toBeInTheDocument();
      expect(screen.getByTestId("quick-action-Add New Question")).toBeInTheDocument();
      expect(screen.getByTestId("quick-action-Manage Learning Cards")).toBeInTheDocument();
      expect(screen.getByTestId("quick-action-Create Frontend Task")).toBeInTheDocument();
      expect(screen.getByTestId("quick-action-Add Problem Solving")).toBeInTheDocument();
    });

    it("should render system health section", () => {
      render(<AdminDashboard />);

      expect(screen.getByTestId("data-table-header")).toHaveTextContent("System Health");
      expect(screen.getByTestId("activity-feed")).toBeInTheDocument();
    });
  });

  describe("Loading states", () => {
    it("should show loading placeholders for stats", () => {
      vi.mocked(useDashboardStats).mockReturnValue({
        stats: mockStats,
        loading: true,
        error: null,
        refetch: vi.fn(),
      });

      render(<AdminDashboard />);

      // Should show "..." for loading values
      expect(screen.getByTestId("metric-Total Questions")).toHaveTextContent("...");
    });

    it("should disable refresh button when loading", () => {
      vi.mocked(useDashboardStats).mockReturnValue({
        stats: mockStats,
        loading: true,
        error: null,
        refetch: vi.fn(),
      });

      render(<AdminDashboard />);

      const refreshButton = screen.getByTestId("refresh-button");
      expect(refreshButton).toBeDisabled();
    });
  });

  describe("Error handling", () => {
    it("should display error alert when stats fetch fails", () => {
      vi.mocked(useDashboardStats).mockReturnValue({
        stats: mockStats,
        loading: false,
        error: "Failed to fetch dashboard stats",
        refetch: vi.fn(),
      });

      render(<AdminDashboard />);

      expect(screen.getByTestId("error-alert")).toBeInTheDocument();
      expect(screen.getByText("Dashboard Stats Error")).toBeInTheDocument();
      expect(screen.getByText("Failed to fetch dashboard stats")).toBeInTheDocument();
    });
  });

  describe("User interactions", () => {
    it("should call refetch when refresh button is clicked", () => {
      const mockRefetch = vi.fn();
      vi.mocked(useDashboardStats).mockReturnValue({
        stats: mockStats,
        loading: false,
        error: null,
        refetch: mockRefetch,
      });

      render(<AdminDashboard />);

      const refreshButton = screen.getByTestId("refresh-button");
      fireEvent.click(refreshButton);

      expect(mockRefetch).toHaveBeenCalledTimes(1);
    });
  });

  describe("Hydration handling", () => {
    it("should prevent hydration mismatch by showing loading initially", () => {
      // Mock that it's not client-side yet
      Object.defineProperty(window, "document", {
        value: undefined,
        writable: true,
      });

      render(<AdminDashboard />);

      expect(screen.getByTestId("metric-Total Questions")).toHaveTextContent("...");
    });
  });
});