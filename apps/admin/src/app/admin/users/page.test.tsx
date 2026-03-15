/**
 * Unit Tests for Admin User Management (A-UT-018)
 * Task: A-007 - Admin User Management
 */

import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { vi, describe, it, expect, beforeEach, type Mock } from "vitest";
import UserManagementPage from "./page";
import * as sharedContexts from "@elzatona/contexts";

// Mock shared contexts
vi.mock("@elzatona/contexts", async () => {
  const actual = await import("../../../test-utils/mocks/shared-contexts");
  return {
    ...actual,
    useAuth: vi.fn(),
    useAdminAuth: vi.fn(),
  };
});

// Mock fetch
globalThis.fetch = vi.fn() as unknown as typeof fetch;

vi.mock("lucide-react", () => ({
  Users: () => <span>👥</span>,
  UserPlus: () => <span>➕</span>,
  Shield: () => <span>🛡️</span>,
  Crown: () => <span>👑</span>,
  Star: () => <span>⭐</span>,
  Mail: () => <span>📧</span>,
  Calendar: () => <span>📅</span>,
  Activity: () => <span>📊</span>,
  Search: () => <span>🔍</span>,
  Filter: () => <span>🔽</span>,
  MoreVertical: () => <span>⋮</span>,
  Edit: () => <span>✏️</span>,
  Trash2: () => <span>🗑️</span>,
  Eye: () => <span>👁️</span>,
  RefreshCw: () => <span>🔄</span>,
}));

describe("A-UT-018: Component Renders", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    (sharedContexts.useAuth as unknown as Mock).mockReturnValue({
      user: { id: "1", email: "admin@example.com" },
    });

    (sharedContexts.useAdminAuth as unknown as Mock).mockReturnValue({
      isAuthenticated: true,
    });

    (globalThis.fetch as unknown as Mock).mockResolvedValue({
      ok: true,
      json: async () => ({
        success: true,
        users: [],
      }),
    });
  });

  it("should render without errors", async () => {
    const { container } = render(<UserManagementPage />);
    await waitFor(() => {
      expect(container).toBeInTheDocument();
    });
  });

  it("should display access denied for non-admin users", () => {
    (sharedContexts.useAdminAuth as unknown as Mock).mockReturnValue({
      isAuthenticated: false,
    });

    render(<UserManagementPage />);
    expect(screen.getByText(/Access Denied/i)).toBeInTheDocument();
  });

  it("should fetch users on mount", async () => {
    render(<UserManagementPage />);
    await waitFor(() => {
      expect(globalThis.fetch).toHaveBeenCalledWith("/api/users");
    });
  });
});

describe("A-UT-SNAPSHOT: Admin User Management Snapshot Tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    (sharedContexts.useAuth as unknown as Mock).mockReturnValue({
      user: { id: "1", email: "admin@example.com" },
    });

    (sharedContexts.useAdminAuth as unknown as Mock).mockReturnValue({
      isAuthenticated: true,
    });

    (globalThis.fetch as unknown as Mock).mockResolvedValue({
      ok: true,
      json: async () => ({
        success: true,
        users: [],
      }),
    });
  });

  it("should match admin user management page snapshot", async () => {
    const { container } = render(<UserManagementPage />);
    await waitFor(() => {
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  it("should match admin user management page snapshot (with users)", async () => {
    (globalThis.fetch as unknown as Mock).mockResolvedValue({
      ok: true,
      json: async () => ({
        success: true,
        users: [
          {
            id: "1",
            email: "user1@example.com",
            name: "User One",
            role: "user",
            is_active: true,
            created_at: "2024-01-01",
          },
          {
            id: "2",
            email: "user2@example.com",
            name: "User Two",
            role: "admin",
            is_active: true,
            created_at: "2024-01-02",
          },
        ],
      }),
    });

    const { container } = render(<UserManagementPage />);
    await waitFor(() => {
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
