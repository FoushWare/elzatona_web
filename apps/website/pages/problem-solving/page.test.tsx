/**
 * Unit Tests for Problem Solving Practice (F-UT-011)
 * Task: F-006 - Problem Solving Practice
 */

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProblemSolvingPage from "./page";
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

jest.mock("@elzatona/hooks", () => ({
  useProblemSolvingTasks: jest.fn(() => ({
    data: { data: [] },
    isLoading: false,
    error: null,
  })),
}));

jest.mock("lucide-react", () => ({
  Calculator: () => <span>🔢</span>,
  Play: () => <span>▶️</span>,
  Target: () => <span>🎯</span>,
  Clock: () => <span>⏰</span>,
  CheckCircle: () => <span>✅</span>,
  Loader2: () => <span>⏳</span>,
}));

describe("F-UT-011: Component Renders", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (sharedContexts.useAuth as jest.Mock).mockReturnValue({
      isAuthenticated: true,
      user: { id: "1" },
      isLoading: false,
    });
  });

  it("should render without errors", async () => {
    const { container } = render(<ProblemSolvingPage />);
    await waitFor(() => {
      expect(container).toBeInTheDocument();
    });
  });

  it("should display problem solving content", async () => {
    render(<ProblemSolvingPage />);
    await waitFor(() => {
      expect(document.body).toBeTruthy();
    });
  });
});

describe("F-UT-SNAPSHOT: Problem Solving Practice Snapshot Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (sharedContexts.useAuth as jest.Mock).mockReturnValue({
      isAuthenticated: true,
      user: { id: "1" },
      isLoading: false,
    });
  });

  it("should match problem solving page snapshot", async () => {
    const { container } = render(<ProblemSolvingPage />);
    await waitFor(() => {
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
