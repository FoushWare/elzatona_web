/**
 * Unit Tests for AdminMetricCard Component
 * Tests rendering, loading states, and trend indicators
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { AdminMetricCard } from "./AdminMetricCard";
import { Database, TrendingUp } from "lucide-react";

describe("AdminMetricCard", () => {
  describe("Rendering", () => {
    it("should render metric card with icon, label, and value", () => {
      render(
        <AdminMetricCard
          icon={Database}
          label="Total Questions"
          value={100}
          iconBgColor="bg-gradient-to-r from-blue-500 to-blue-600"
        />,
      );

      expect(screen.getByText("Total Questions")).toBeInTheDocument();
      expect(screen.getByText("100")).toBeInTheDocument();
    });

    it("should format number values with locale string", () => {
      render(
        <AdminMetricCard
          icon={Database}
          label="Total Questions"
          value={1000}
          iconBgColor="bg-gradient-to-r from-blue-500 to-blue-600"
        />,
      );

      expect(screen.getByText("1,000")).toBeInTheDocument();
    });

    it("should render string values as-is", () => {
      render(
        <AdminMetricCard
          icon={Database}
          label="Status"
          value="Active"
          iconBgColor="bg-gradient-to-r from-blue-500 to-blue-600"
        />,
      );

      expect(screen.getByText("Active")).toBeInTheDocument();
    });

    it("should render trend indicator when provided", () => {
      render(
        <AdminMetricCard
          icon={Database}
          label="Total Questions"
          value={100}
          iconBgColor="bg-gradient-to-r from-blue-500 to-blue-600"
          trend={{
            icon: TrendingUp,
            text: "Active",
            color: "text-green-500",
          }}
        />,
      );

      expect(screen.getByText("Active")).toBeInTheDocument();
    });
  });

  describe("Loading State", () => {
    it("should show loading skeleton when loading is true", () => {
      render(
        <AdminMetricCard
          icon={Database}
          label="Total Questions"
          value={100}
          iconBgColor="bg-gradient-to-r from-blue-500 to-blue-600"
          loading={true}
        />,
      );

      // Check for loading skeleton (animate-pulse class)
      const card = screen.getByText("Total Questions").closest("div");
      expect(card?.querySelector(".animate-pulse")).toBeInTheDocument();
    });

    it("should show value when loading is false", () => {
      render(
        <AdminMetricCard
          icon={Database}
          label="Total Questions"
          value={100}
          iconBgColor="bg-gradient-to-r from-blue-500 to-blue-600"
          loading={false}
        />,
      );

      expect(screen.getByText("100")).toBeInTheDocument();
    });
  });

  describe("Styling", () => {
    it("should apply custom className", () => {
      const { container } = render(
        <AdminMetricCard
          icon={Database}
          label="Total Questions"
          value={100}
          iconBgColor="bg-gradient-to-r from-blue-500 to-blue-600"
          className="custom-class"
        />,
      );

      expect(container.querySelector(".custom-class")).toBeInTheDocument();
    });

    it("should apply icon background color", () => {
      const { container } = render(
        <AdminMetricCard
          icon={Database}
          label="Total Questions"
          value={100}
          iconBgColor="bg-gradient-to-r from-blue-500 to-blue-600"
        />,
      );

      const iconContainer = container.querySelector(
        ".bg-gradient-to-r.from-blue-500.to-blue-600",
      );
      expect(iconContainer).toBeInTheDocument();
    });
  });
});
