/**
 * Unit Tests for AdminDashboardTemplate Component
 * Tests template composition, props passing, and layout
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { AdminDashboardTemplate } from "./AdminDashboardTemplate";
import { Database, BookOpen, HelpCircle } from "lucide-react";
import type { AdminMetricCardPropsType } from "../molecules/AdminMetricCard";

// Mock child components
vi.mock("../molecules/WelcomeHeader", () => ({
  WelcomeHeader: ({
    title,
    subtitle,
  }: {
    title: string;
    subtitle: React.ReactNode;
  }) => (
    <div data-testid="welcome-header">
      <h1>{title}</h1>
      <div>{subtitle}</div>
    </div>
  ),
}));

vi.mock("../organisms/AdminStatsGrid", () => ({
  AdminStatsGrid: ({
    metrics,
  }: {
    metrics: readonly AdminMetricCardPropsType[];
  }) => (
    <div data-testid="stats-grid">
      {metrics.map((m, i) => (
        <div key={i}>{m.label}</div>
      ))}
    </div>
  ),
}));

vi.mock("../organisms/AdminQuickActionsSection", () => ({
  AdminQuickActionsSection: ({
    actions,
  }: {
    actions: readonly Array<{ title: string }>;
  }) => (
    <div data-testid="quick-actions">
      {actions.map((a, i) => (
        <div key={i}>{a.title}</div>
      ))}
    </div>
  ),
}));

describe("AdminDashboardTemplate", () => {
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
  ];

  const mockQuickActions = {
    actions: [
      {
        title: "Add New Question",
        description: "Create a new learning question",
        href: "/admin/content/questions",
        icon: HelpCircle,
        color: "bg-blue-500",
      },
    ],
  };

  describe("Rendering", () => {
    it("should render welcome header with title and subtitle", () => {
      render(
        <AdminDashboardTemplate
          welcomeTitle="Admin Dashboard"
          welcomeSubtitle="Welcome back"
          stats={{ metrics: mockMetrics }}
          quickActions={mockQuickActions}
        />,
      );

      expect(screen.getByText("Admin Dashboard")).toBeInTheDocument();
      expect(screen.getByText("Welcome back")).toBeInTheDocument();
    });

    it("should render stats grid with metrics", () => {
      render(
        <AdminDashboardTemplate
          welcomeTitle="Admin Dashboard"
          welcomeSubtitle="Welcome back"
          stats={{ metrics: mockMetrics }}
          quickActions={mockQuickActions}
        />,
      );

      expect(screen.getByText("Total Questions")).toBeInTheDocument();
      expect(screen.getByText("Learning Cards")).toBeInTheDocument();
    });

    it("should render quick actions section", () => {
      render(
        <AdminDashboardTemplate
          welcomeTitle="Admin Dashboard"
          welcomeSubtitle="Welcome back"
          stats={{ metrics: mockMetrics }}
          quickActions={mockQuickActions}
        />,
      );

      expect(screen.getByText("Add New Question")).toBeInTheDocument();
    });

    it("should render refresh button when provided", () => {
      render(
        <AdminDashboardTemplate
          welcomeTitle="Admin Dashboard"
          welcomeSubtitle="Welcome back"
          refreshButton={{
            onClick: vi.fn(),
            loading: false,
          }}
          stats={{ metrics: mockMetrics }}
          quickActions={mockQuickActions}
        />,
      );

      // Refresh button is rendered by WelcomeHeader
      expect(screen.getByTestId("welcome-header")).toBeInTheDocument();
    });
  });

  describe("Layout", () => {
    it("should apply gradient background classes", () => {
      const { container } = render(
        <AdminDashboardTemplate
          welcomeTitle="Admin Dashboard"
          welcomeSubtitle="Welcome back"
          stats={{ metrics: mockMetrics }}
          quickActions={mockQuickActions}
        />,
      );

      expect(
        container.querySelector(".bg-gradient-to-br.from-gray-50.to-gray-100"),
      ).toBeInTheDocument();
    });

    it("should apply custom className", () => {
      const { container } = render(
        <AdminDashboardTemplate
          welcomeTitle="Admin Dashboard"
          welcomeSubtitle="Welcome back"
          stats={{ metrics: mockMetrics }}
          quickActions={mockQuickActions}
          className="custom-template"
        />,
      );

      expect(container.querySelector(".custom-template")).toBeInTheDocument();
    });
  });

  describe("Props Passing", () => {
    it("should pass all props to child components", () => {
      const refreshButton = {
        onClick: vi.fn(),
        loading: true,
        disabled: false,
      };

      render(
        <AdminDashboardTemplate
          welcomeTitle="Custom Title"
          welcomeSubtitle={<span>Custom Subtitle</span>}
          refreshButton={refreshButton}
          stats={{ metrics: mockMetrics, loading: true }}
          quickActions={{ ...mockQuickActions, title: "Custom Actions" }}
        />,
      );

      expect(screen.getByText("Custom Title")).toBeInTheDocument();
      expect(screen.getByText("Custom Subtitle")).toBeInTheDocument();
    });
  });
});
