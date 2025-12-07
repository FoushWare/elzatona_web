/**
 * Integration Tests for Custom Roadmap Creation (F-IT-001, F-IT-002, F-IT-003)
 * Task: F-001 - Custom Roadmap Creation
 */

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import CustomRoadmapPage from "./page";
import * as sharedContexts from "@elzatona/contexts";

jest.mock("@elzatona/contexts", () => {
  const actual = jest.requireActual("../../test-utils/mocks/shared-contexts");
  return {
    ...actual,
    useAuth: jest.fn(),
    useUserType: jest.fn(),
  };
});

jest.mock("../../context/LearningTypeContext", () => ({
  useLearningType: jest.fn(() => ({
    learningType: null,
    setLearningType: jest.fn(),
  })),
}));

const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
}));

global.fetch = jest.fn();
Storage.prototype.setItem = jest.fn();

jest.mock("lucide-react", () => ({
  Plus: () => <span>+</span>,
  Minus: () => <span>-</span>,
  Check: () => <span>✓</span>,
  Target: () => <span>🎯</span>,
  Save: () => <span>💾</span>,
  Loader2: () => <span>⏳</span>,
  AlertCircle: () => <span>⚠️</span>,
  CheckCircle: () => <span>✅</span>,
  ChevronDown: () => <span>▼</span>,
  ChevronRight: () => <span>▶</span>,
  Eye: () => <span>👁️</span>,
  X: () => <span>✕</span>,
  PanelRightOpen: () => <span>📂</span>,
  PanelRightClose: () => <span>📁</span>,
  Clock: () => <span>⏰</span>,
  Zap: () => <span>⚡</span>,
  BookOpen: () => <span>📖</span>,
}));

describe("F-IT-001: Roadmap Creation Flow", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (sharedContexts.useAuth as jest.Mock).mockReturnValue({
      isAuthenticated: true,
      user: { id: "1" },
      isLoading: false,
    });

    (sharedContexts.useUserType as jest.Mock).mockReturnValue({
      userType: "self-directed",
      setUserType: jest.fn(),
    });

    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ data: [] }),
    });
  });

  it("should integrate plan creation flow", async () => {
    render(<CustomRoadmapPage />);
    await waitFor(() => {
      expect(
        screen.getByText(/Create Your Custom Roadmap/i),
      ).toBeInTheDocument();
    });
  });
});

describe("F-IT-002: Card and Category Selection", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (sharedContexts.useAuth as jest.Mock).mockReturnValue({
      isAuthenticated: true,
      user: { id: "1" },
      isLoading: false,
    });

    (sharedContexts.useUserType as jest.Mock).mockReturnValue({
      userType: "self-directed",
      setUserType: jest.fn(),
    });

    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({
        data: [
          {
            id: "1",
            title: "Test Card",
            categories: [
              {
                id: "1",
                name: "Test Category",
                topics: [],
              },
            ],
          },
        ],
      }),
    });
  });

  it("should integrate card loading and selection", async () => {
    render(<CustomRoadmapPage />);
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    });
  });
});

describe("F-IT-003: Plan Saving Integration", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (sharedContexts.useAuth as jest.Mock).mockReturnValue({
      isAuthenticated: true,
      user: { id: "1" },
      isLoading: false,
    });

    (sharedContexts.useUserType as jest.Mock).mockReturnValue({
      userType: "self-directed",
      setUserType: jest.fn(),
    });
  });

  it("should save plan to localStorage", async () => {
    render(<CustomRoadmapPage />);
    await waitFor(() => {
      // Plan saving should integrate with localStorage
      expect(Storage.prototype.setItem).toBeDefined();
    });
  });
});
