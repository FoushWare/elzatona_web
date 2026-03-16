/**
 * Unit Tests for Admin User Management (A-UT-018)
 * Task: A-007 - Admin User Management
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";
import UserManagementPage from "./page";

describe("A-UT-018: Component Renders", () => {
  it("should render without errors", () => {
    const { container } = render(<UserManagementPage />);
    expect(container).toBeInTheDocument();
  });

  it("should render placeholder title", () => {
    render(<UserManagementPage />);
    expect(
      screen.getByRole("heading", { name: "admin/users" }),
    ).toBeInTheDocument();
  });

  it("should render placeholder description", () => {
    render(<UserManagementPage />);
    expect(
      screen.getByText("Page component - needs implementation"),
    ).toBeInTheDocument();
  });
});

describe("A-UT-SNAPSHOT: Admin User Management Snapshot Tests", () => {
  it("should match admin user management page snapshot", () => {
    const { container } = render(<UserManagementPage />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
