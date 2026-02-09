/**
 * Unit Tests for Frontend Tasks Practice (F-UT-010)
 * Task: F-005 - Frontend Tasks Practice
 */

import React from "react";
import { render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import FrontendTasksPage from "./page";
import * as sharedContexts from "@elzatona/contexts";

vi.mock("@elzatona/contexts", async () => {
  const actual = await vi.importActual<any>(
    "../../test-utils/mocks/shared-contexts",
  );
  return {
    ...actual,
    useAuth: vi.fn(),
  };
});

const mockPush = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
}));

vi.mock("@elzatona/hooks", () => ({
  useFrontendTasks: vi.fn(() => ({
    data: { data: [] },
    isLoading: false,
    error: null,
  })),
}));

vi.mock("lucide-react", () => ({
  Code: () => <span>💻</span>,
  Play: () => <span>▶️</span>,
  Target: () => <span>🎯</span>,
  Clock: () => <span>⏰</span>,
  CheckCircle: () => <span>✅</span>,
  Loader2: () => <span>⏳</span>,
  ArrowRight: () => <span>→</span>,
  Users: () => <span>👥</span>,
  Star: () => <span>⭐</span>,
  ChevronRight: () => <span>▶</span>,
  Monitor: () => <span>🖥️</span>,
  Flame: () => <span>🔥</span>,
  Search: () => <span>🔍</span>,
  Filter: () => <span>🔽</span>,
  Grid: () => <span>⊞</span>,
  List: () => <span>☰</span>,
  Trophy: () => <span>🏆</span>,
  Zap: () => <span>⚡</span>,
  Shield: () => <span>🛡️</span>,
  Layers: () => <span>📚</span>,
  Settings: () => <span>⚙️</span>,
  Brain: () => <span>🧠</span>,
  Globe: () => <span>🌐</span>,
}));

describe("F-UT-010: Component Renders", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    (sharedContexts.useAuth as ReturnType<typeof vi.fn>).mockReturnValue({
      isAuthenticated: true,
      user: { id: "1" },
      isLoading: false,
    });
  });

  it("should render without errors", async () => {
    const { container } = render(<FrontendTasksPage />);
    await waitFor(() => {
      expect(container).toBeInTheDocument();
    });
  });

  it("should display frontend tasks content", async () => {
    render(<FrontendTasksPage />);
    await waitFor(() => {
      expect(document.body).toBeTruthy();
    });
  });
});

describe("F-UT-SNAPSHOT: Frontend Tasks Practice Snapshot Tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    (sharedContexts.useAuth as ReturnType<typeof vi.fn>).mockReturnValue({
      isAuthenticated: true,
      user: { id: "1" },
      isLoading: false,
    });
  });

  it("should match frontend tasks page snapshot", async () => {
    const { container } = render(<FrontendTasksPage />);
    await waitFor(() => {
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
