/**
 * Unit Tests for AdminStatsGrid Component
 * Tests grid rendering, responsive layout, and metric cards
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { AdminStatsGrid } from "./AdminStatsGrid";
import { Database, BookOpen, Target } from "lucide-react";
import type { AdminMetricCardPropsType } from "../molecules/AdminMetricCard";

describe("AdminStatsGrid", () => {
  const mockMetrics: readonly AdminMetricCardPropsType[] = [
    {
      icon: Database,
      label: "Total Questions",
      value: 100,
      iconBgColor: "bg-gradient-to-r from-blue-500 to-blue-600",
    },
    {
      icon: BookOpen,
      label: "Learning Cards",
      value: 50,
      iconBgColor: "bg-gradient-to-r from-green-500 to-green-600",
    },
    {
      icon: Target,
      label: "Learning Plans",
      value: 25,
      iconBgColor: "bg-gradient-to-r from-purple-500 to-purple-600",
    },
  ];

  describe("Rendering", () => {
    it("should render all metric cards", () => {
      render(<AdminStatsGrid metrics={mockMetrics} />);

      expect(screen.getByText("Total Questions")).toBeInTheDocument();
      expect(screen.getByText("Learning Cards")).toBeInTheDocument();
      expect(screen.getByText("Learning Plans")).toBeInTheDocument();
    });

    it("should render correct number of metrics", () => {
      const { container } = render(<AdminStatsGrid metrics={mockMetrics} />);

      const cards = container.querySelectorAll(
        '[class*="bg-white dark:bg-gray-800"]',
      );
      expect(cards.length).toBe(3);
    });

    it("should render empty grid when no metrics provided", () => {
      const { container } = render(<AdminStatsGrid metrics={[]} />);

      const cards = container.querySelectorAll(
        '[class*="bg-white dark:bg-gray-800"]',
      );
      expect(cards.length).toBe(0);
    });
  });

  describe("Loading State", () => {
    it("should pass loading prop to all metric cards", () => {
      render(<AdminStatsGrid metrics={mockMetrics} loading={true} />);

      // All cards should show loading state
      const cards = screen.getAllByText(
        /Total Questions|Learning Cards|Learning Plans/,
      );
      expect(cards.length).toBe(3);
    });

    it("should not show loading when loading is false", () => {
      render(<AdminStatsGrid metrics={mockMetrics} loading={false} />);

      expect(screen.getByText("100")).toBeInTheDocument();
      expect(screen.getByText("50")).toBeInTheDocument();
      expect(screen.getByText("25")).toBeInTheDocument();
    });
  });

  describe("Layout", () => {
    it("should apply responsive grid classes", () => {
      const { container } = render(<AdminStatsGrid metrics={mockMetrics} />);

      const grid = container.querySelector(
        ".grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3",
      );
      expect(grid).toBeInTheDocument();
    });

    it("should apply custom className", () => {
      const { container } = render(
        <AdminStatsGrid metrics={mockMetrics} className="custom-grid" />,
      );

      expect(container.querySelector(".custom-grid")).toBeInTheDocument();
    });
  });
});
