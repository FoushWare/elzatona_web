import React from "react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import AdminShell from "./AdminShell";

const mockUseAdminNavbarVisibility = vi.fn();

vi.mock("@elzatona/common-ui", () => ({
  AdminNavbar: () => <div data-testid="admin-navbar" />,
}));

vi.mock("@elzatona/contexts", () => ({
  useAdminNavbarVisibility: () => mockUseAdminNavbarVisibility(),
}));

vi.mock("sonner", () => ({
  Toaster: () => <div data-testid="toaster" />,
}));

describe("AdminShell", () => {
  beforeEach(() => {
    mockUseAdminNavbarVisibility.mockReturnValue({
      isNavbarVisible: true,
      setIsNavbarVisible: vi.fn(),
    });
  });

  it("renders the navbar and top padding when visible", () => {
    mockUseAdminNavbarVisibility.mockReturnValue({
      isNavbarVisible: true,
      setIsNavbarVisible: vi.fn(),
    });

    render(
      <AdminShell>
        <div data-testid="page-content" />
      </AdminShell>,
    );

    expect(screen.getByTestId("admin-navbar")).toBeInTheDocument();
    expect(screen.getByTestId("page-content")).toBeInTheDocument();
    expect(screen.getByRole("main")).toHaveClass("pt-16");
  });

  it("hides the navbar and removes top padding when hidden", () => {
    mockUseAdminNavbarVisibility.mockReturnValue({
      isNavbarVisible: false,
      setIsNavbarVisible: vi.fn(),
    });

    render(
      <AdminShell>
        <div data-testid="page-content" />
      </AdminShell>,
    );

    expect(screen.queryByTestId("admin-navbar")).not.toBeInTheDocument();
    expect(screen.getByTestId("page-content")).toBeInTheDocument();
    expect(screen.getByRole("main")).toHaveClass("pt-0");
  });
});
