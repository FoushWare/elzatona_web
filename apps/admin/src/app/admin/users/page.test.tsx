/**
 * Unit Tests for Admin User Management (A-UT-018)
 * Task: A-007 - Admin User Management
 */

import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import UserManagementPage from "./page";
import "@testing-library/jest-dom";
import * as sharedContexts from "@elzatona/contexts";

// Mock shared contexts
vi.mock("@elzatona/contexts", async (importOriginal) => {
  const actual = await importOriginal<typeof sharedContexts>();
  return {
    ...actual,
    useAuth: vi.fn(),
    useAdminAuth: vi.fn(),
  };
});

// Mock fetch
const mockFetch = vi.fn();
vi.stubGlobal("fetch", mockFetch);

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

    vi.mocked(sharedContexts.useAuth).mockReturnValue({
      user: { id: "1", email: "admin@example.com" },
    } as any);

    vi.mocked(sharedContexts.useAdminAuth).mockReturnValue({
      isAuthenticated: true,
    } as any);

    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({
        success: true,
        users: [],
      }),
    } as any);
  });

  it("should render without errors", async () => {
    const { container } = render(<UserManagementPage />);
    expect(container).toBeInTheDocument();
  });

  it.todo("should display access denied for non-admin users", () => {
    vi.mocked(sharedContexts.useAdminAuth).mockReturnValue({
      isAuthenticated: false,
    } as any);

    render(<UserManagementPage />);
    expect(screen.getByText(/Access Denied/i)).toBeInTheDocument();
  });

  it.todo("should fetch users on mount", async () => {
    render(<UserManagementPage />);
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith("/api/users");
    });
  });
});

describe("A-UT-SNAPSHOT: Admin User Management Snapshot Tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(sharedContexts.useAuth).mockReturnValue({
      user: { id: "1", email: "admin@example.com" },
    } as any);

    vi.mocked(sharedContexts.useAdminAuth).mockReturnValue({
      isAuthenticated: true,
    } as any);

    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({
        success: true,
        users: [],
      }),
    } as any);
  });

  it("should match admin user management page snapshot", async () => {
    const { container } = render(<UserManagementPage />);
    await waitFor(() => {
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  it("should match admin user management page snapshot (with users)", async () => {
    mockFetch.mockResolvedValue({
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
    } as any);

    const { container } = render(<UserManagementPage />);
    await waitFor(() => {
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
