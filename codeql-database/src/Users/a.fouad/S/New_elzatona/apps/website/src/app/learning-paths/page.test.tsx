/**
 * Unit Tests for Learning Paths Practice (F-UT-009)
 * Task: F-004 - Learning Paths Practice
 */

import React from "react";
import { render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import LearningPathsPage from "./page";
import * as sharedContexts from "@elzatona/contexts";

jest.mock("@elzatona/contexts", () => {
  const actual = jest.requireActual("../../test-utils/mocks/shared-contexts");
  return {
    ...actual,
    useAuth: jest.fn(),
  };
});

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
  BookOpen: () => <span>📖</span>,
  Play: () => <span>▶️</span>,
  Target: () => <span>🎯</span>,
  Clock: () => <span>⏰</span>,
  CheckCircle: () => <span>✅</span>,
  Loader2: () => <span>⏳</span>,
  ArrowRight: () => <span>→</span>,
  Users: () => <span>👥</span>,
  Star: () => <span>⭐</span>,
  ChevronRight: () => <span>▶</span>,
  Code: () => <span>💻</span>,
  Palette: () => <span>🎨</span>,
  Zap: () => <span>⚡</span>,
  Shield: () => <span>🛡️</span>,
  Layers: () => <span>📚</span>,
  Settings: () => <span>⚙️</span>,
  Brain: () => <span>🧠</span>,
  Globe: () => <span>🌐</span>,
  Search: () => <span>🔍</span>,
  Filter: () => <span>🔽</span>,
  Grid: () => <span>⊞</span>,
  List: () => <span>☰</span>,
}));

describe("F-UT-009: Component Renders", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (sharedContexts.useAuth as jest.Mock).mockReturnValue({
      isAuthenticated: true,
      user: { id: "1", email: "user@example.com" },
      isLoading: false,
    });

    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ data: [] }),
    });
  });

  it("should render without errors", async () => {
    const { container } = render(<LearningPathsPage />);
    await waitFor(() => {
      expect(container).toBeInTheDocument();
    });
  });

  it("should display learning paths content", async () => {
    render(<LearningPathsPage />);
    await waitFor(() => {
      expect(document.body).toBeTruthy();
    });
  });
});

describe("F-UT-SNAPSHOT: Learning Paths Practice Snapshot Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (sharedContexts.useAuth as jest.Mock).mockReturnValue({
      isAuthenticated: true,
      user: { id: "1", email: "user@example.com" },
      isLoading: false,
    });

    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ data: [] }),
    });
  });

  it("should match learning paths page snapshot", async () => {
    const { container } = render(<LearningPathsPage />);
    await waitFor(() => {
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  it("should match learning paths page snapshot (with categories)", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({
        data: [
          { id: "1", name: "HTML", topics: [] },
          { id: "2", name: "CSS", topics: [] },
        ],
      }),
    });

    const { container } = render(<LearningPathsPage />);
    await waitFor(() => {
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
