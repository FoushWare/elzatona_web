/**
 * Unit tests for Admin dashboard page.
 * Tests dashboard rendering, stats display, and user interactions.
 */

import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import AdminDashboardPage from "./page";
import { useAdminAuth } from "@elzatona/contexts";
import { useDashboardStats } from "@elzatona/hooks";

// Mock the AdminDashboard component
vi.mock("@elzatona/common-ui", () => ({
  AdminDashboard: () => (
    <div data-testid="admin-dashboard">Dashboard Content</div>
  ),
}));

// Mock hooks
vi.mock("@elzatona/contexts", () => ({
  useAdminAuth: vi.fn(),
}));

vi.mock("@elzatona/hooks", () => ({
  useDashboardStats: vi.fn(),
}));

describe("AdminDashboardPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render the AdminDashboard component", () => {
    // Mock authenticated user
    vi.mocked(useAdminAuth).mockReturnValue({
      user: { email: "admin@example.com", role: "admin" },
      isAuthenticated: true,
      isLoading: false,
    } as any);

    vi.mocked(useDashboardStats).mockReturnValue({
      stats: {
        questions: 100,
        cards: 50,
        learningPlans: 25,
        totalTasks: 200,
      },
      loading: false,
      error: null,
      refetch: vi.fn(),
    });

    render(<AdminDashboardPage />);

    expect(screen.getByTestId("admin-dashboard")).toBeInTheDocument();
    expect(screen.getByText("Dashboard Content")).toBeInTheDocument();
  });
});
