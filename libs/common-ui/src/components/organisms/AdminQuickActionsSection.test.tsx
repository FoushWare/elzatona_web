/**
 * Unit Tests for AdminQuickActionsSection Component
 * Tests action rendering, click handling, and navigation
 */

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { AdminQuickActionsSection } from "./AdminQuickActionsSection";
import { HelpCircle, Code } from "lucide-react";
import type { AdminQuickAction } from "./AdminQuickActionsSection";

// Mock window.location.href
const mockLocationHref = vi.fn();
Object.defineProperty(window, "location", {
  value: {
    href: "",
  },
  writable: true,
});

describe("AdminQuickActionsSection", () => {
  const mockActions: readonly AdminQuickAction[] = [
    {
      title: "Add New Question",
      description: "Create a new learning question",
      href: "/admin/content/questions",
      icon: HelpCircle,
      color: "bg-blue-500",
    },
    {
      title: "Create Frontend Task",
      description: "Add a new React coding challenge",
      href: "/admin/frontend-tasks",
      icon: Code,
      color: "bg-cyan-500",
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    window.location.href = "";
  });

  describe("Rendering", () => {
    it("should render default title", () => {
      render(<AdminQuickActionsSection actions={mockActions} />);

      expect(screen.getByText("Quick Actions")).toBeInTheDocument();
    });

    it("should render custom title", () => {
      render(
        <AdminQuickActionsSection
          actions={mockActions}
          title="Custom Actions"
        />,
      );

      expect(screen.getByText("Custom Actions")).toBeInTheDocument();
    });

    it("should render default subtitle", () => {
      render(<AdminQuickActionsSection actions={mockActions} />);

      expect(screen.getByText("Most used features")).toBeInTheDocument();
    });

    it("should render custom subtitle", () => {
      render(
        <AdminQuickActionsSection
          actions={mockActions}
          subtitle="Custom subtitle"
        />,
      );

      expect(screen.getByText("Custom subtitle")).toBeInTheDocument();
    });

    it("should render all action buttons", () => {
      render(<AdminQuickActionsSection actions={mockActions} />);

      expect(screen.getByText("Add New Question")).toBeInTheDocument();
      expect(screen.getByText("Create Frontend Task")).toBeInTheDocument();
    });

    it("should render action descriptions", () => {
      render(<AdminQuickActionsSection actions={mockActions} />);

      expect(
        screen.getByText("Create a new learning question"),
      ).toBeInTheDocument();
      expect(
        screen.getByText("Add a new React coding challenge"),
      ).toBeInTheDocument();
    });

    it("should not render subtitle when not provided", () => {
      render(
        <AdminQuickActionsSection actions={mockActions} subtitle={undefined} />,
      );

      expect(screen.queryByText("Most used features")).not.toBeInTheDocument();
    });
  });

  describe("Click Handling", () => {
    it("should navigate to href when action is clicked", () => {
      render(<AdminQuickActionsSection actions={mockActions} />);

      const button = screen.getByText("Add New Question");
      fireEvent.click(button);

      expect(window.location.href).toBe("/admin/content/questions");
    });

    it("should navigate to correct href for each action", () => {
      render(<AdminQuickActionsSection actions={mockActions} />);

      const firstButton = screen.getByText("Add New Question");
      fireEvent.click(firstButton);
      expect(window.location.href).toBe("/admin/content/questions");

      window.location.href = "";

      const secondButton = screen.getByText("Create Frontend Task");
      fireEvent.click(secondButton);
      expect(window.location.href).toBe("/admin/frontend-tasks");
    });
  });

  describe("Styling", () => {
    it("should apply custom className", () => {
      const { container } = render(
        <AdminQuickActionsSection
          actions={mockActions}
          className="custom-section"
        />,
      );

      expect(container.querySelector(".custom-section")).toBeInTheDocument();
    });

    it("should apply action color classes", () => {
      const { container } = render(
        <AdminQuickActionsSection actions={mockActions} />,
      );

      expect(container.querySelector(".bg-blue-500")).toBeInTheDocument();
      expect(container.querySelector(".bg-cyan-500")).toBeInTheDocument();
    });
  });
});
