/**
 * Unit Tests for My Plans Page (F-UT-006, F-UT-007)
 * Task: F-002 - My Plans Page
 */

import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import MyPlansPage from "./page";
import * as sharedContexts from "@elzatona/contexts";

jest.mock("@elzatona/contexts", () => {
  const actual = jest.requireActual(
    "../../../../libs/utilities/src/lib/test-utils/mocks/website",
  );
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

Storage.prototype.getItem = jest.fn(() => JSON.stringify([]));
Storage.prototype.setItem = jest.fn();

jest.mock("lucide-react", () => ({
  BookOpen: () => <span>📖</span>,
  Plus: () => <span>+</span>,
  Play: () => <span>▶️</span>,
  Edit: () => <span>✏️</span>,
  Trash2: () => <span>🗑️</span>,
  CheckCircle: () => <span>✅</span>,
  Clock: () => <span>⏰</span>,
  Target: () => <span>🎯</span>,
  Loader2: () => <span>⏳</span>,
}));

describe("F-UT-006: Component Renders", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (sharedContexts.useAuth as jest.Mock).mockReturnValue({
      isAuthenticated: true,
      user: { id: "1", email: "user@example.com" },
      isLoading: false,
    });
  });

  it("should render without errors", async () => {
    const { container } = render(<MyPlansPage />);
    await waitFor(() => {
      expect(container).toBeInTheDocument();
    });
  });

  it("should display page title", async () => {
    render(<MyPlansPage />);
    await waitFor(() => {
      expect(screen.getByText(/My Learning Plans/i)).toBeInTheDocument();
    });
  });
});

describe("F-UT-007: Plan Management", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (sharedContexts.useAuth as jest.Mock).mockReturnValue({
      isAuthenticated: true,
      user: { id: "1" },
      isLoading: false,
    });

    Storage.prototype.getItem = jest.fn(() =>
      JSON.stringify([
        {
          id: "1",
          name: "Test Plan",
          description: "Test Description",
          duration: 30,
          totalQuestions: 100,
          dailyQuestions: 5,
          created_at: new Date().toISOString(),
        },
      ]),
    );
  });

  it("should load plans from localStorage", async () => {
    render(<MyPlansPage />);
    await waitFor(() => {
      expect(Storage.prototype.getItem).toHaveBeenCalledWith("userPlans");
    });
  });

  it("should display Create New Plan button", async () => {
    render(<MyPlansPage />);
    await waitFor(() => {
      expect(screen.getByText(/Create New Plan/i)).toBeInTheDocument();
    });
  });
});

describe("F-UT-SNAPSHOT: My Plans Page Snapshot Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (sharedContexts.useAuth as jest.Mock).mockReturnValue({
      isAuthenticated: true,
      user: { id: "1" },
      isLoading: false,
    });

    Storage.prototype.getItem = jest.fn(() => JSON.stringify([]));
  });

  it("should match my plans page snapshot (empty state)", async () => {
    const { container } = render(<MyPlansPage />);
    await waitFor(() => {
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  it("should match my plans page snapshot (with plans)", async () => {
    Storage.prototype.getItem = jest.fn(() =>
      JSON.stringify([
        { id: "1", name: "Test Plan 1" },
        { id: "2", name: "Test Plan 2" },
      ]),
    );

    const { container } = render(<MyPlansPage />);
    await waitFor(() => {
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
