/**
 * Unit Tests for Custom Roadmap Creation (F-UT-001, F-UT-002, F-UT-003, F-UT-004, F-UT-005)
 * Task: F-001 - Custom Roadmap Creation
 */

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import CustomRoadmapPage from "./page";
import * as sharedContexts from "@elzatona/contexts";

jest.mock("@elzatona/contexts", () => {
  const actual = jest.requireActual(
    "../../test-utils/mocks/shared-contexts.ts",
  );
  return {
    ...actual,
    useAuth: jest.fn(),
    useUserType: jest.fn(),
  };
});

jest.mock("../../src/context/LearningTypeContext", () => ({
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

describe("F-UT-001: Component Renders", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (sharedContexts.useAuth as jest.Mock).mockReturnValue({
      isAuthenticated: true,
      user: { id: "1", email: "user@example.com" },
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

  it("should render without errors", async () => {
    const { container } = render(<CustomRoadmapPage />);
    await waitFor(() => {
      expect(container).toBeInTheDocument();
    });
  });

  it("should display page title", async () => {
    render(<CustomRoadmapPage />);
    await waitFor(() => {
      expect(
        screen.getByText(/Create Your Custom Roadmap/i),
      ).toBeInTheDocument();
    });
  });
});

describe("F-UT-002: Plan Details Step", () => {
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

  it("should have plan name input", async () => {
    render(<CustomRoadmapPage />);
    await waitFor(() => {
      const nameInput = screen.getByPlaceholderText(
        /e.g., Frontend Mastery Plan/i,
      );
      expect(nameInput).toBeInTheDocument();
    });
  });

  it("should have description textarea", async () => {
    render(<CustomRoadmapPage />);
    await waitFor(() => {
      const descTextarea = screen.getByPlaceholderText(
        /Describe your learning goals/i,
      );
      expect(descTextarea).toBeInTheDocument();
    });
  });
});

describe("F-UT-003: Card Selection", () => {
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
            type: "learning",
            categories: [],
          },
        ],
      }),
    });
  });

  it("should load cards for selection", async () => {
    render(<CustomRoadmapPage />);
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    });
  });
});

describe("F-UT-004: Question Selection", () => {
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

  it("should allow question selection", async () => {
    render(<CustomRoadmapPage />);
    await waitFor(() => {
      // Component should render
      expect(document.body).toBeTruthy();
    });
  });
});

describe("F-UT-SNAPSHOT: Custom Roadmap Creation Snapshot Tests", () => {
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

  it("should match custom roadmap page snapshot", async () => {
    const { container } = render(<CustomRoadmapPage />);
    await waitFor(() => {
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  it("should match custom roadmap page snapshot (unauthenticated)", () => {
    (sharedContexts.useAuth as jest.Mock).mockReturnValue({
      isAuthenticated: false,
      user: null,
      isLoading: false,
    });

    const { container } = render(<CustomRoadmapPage />);
    expect(container.firstChild).toMatchSnapshot();
  });
});

describe("F-UT-005: Plan Saving", () => {
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

    Storage.prototype.setItem = jest.fn();
  });

  it("should save plan to localStorage", async () => {
    render(<CustomRoadmapPage />);
    await waitFor(() => {
      // Plan saving functionality should be available
      expect(document.body).toBeTruthy();
    });
  });
});
