import React from "react";
import { render, screen } from "@testing-library/react";
import AppRootPage from "./page";
import { vi } from "vitest";

// Mock the AdminDashboard component since it's used in the page
vi.mock("@elzatona/common-ui", async () => {
  const actual = await vi.importActual("@elzatona/common-ui");
  return {
    ...actual,
    AdminDashboard: () => (
      <div data-testid="admin-dashboard">Mock Dashboard</div>
    ),
    AdminNavbar: () => <div data-testid="admin-navbar">Mock Navbar</div>,
  };
});

// Mock the useAdminAuth hook
vi.mock("@elzatona/contexts", async () => {
  const actual = await vi.importActual("@elzatona/contexts");
  return {
    ...actual,
    useAdminAuth: () => ({
      user: { id: "1", email: "admin@example.com", role: "admin" },
      isAuthenticated: true,
      isLoading: false,
    }),
  };
});

// Mock next/navigation
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => "/admin",
  useSearchParams: () => new URLSearchParams(),
}));

describe("Admin root page", () => {
  it("should render correctly and show redirecting state", () => {
    render(<AppRootPage />);
    expect(screen.getByText(/Redirecting.../i)).toBeInTheDocument();
  });
});
