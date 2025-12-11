/**
 * Unit Tests for Guided Practice Page (G-UT-020 through G-UT-030)
 * Task G-006: Guided Practice Page (localStorage Dependent - Not Logged In)
 *
 * Tests cover:
 * - Progress initialization and localStorage operations
 * - Question navigation and position tracking
 * - Answer selection and progress tracking
 * - Resources display and interaction
 * - localStorage error handling
 *
 * IMPORTANT: All tests use localStorage mocks and should be isolated
 */

import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import GuidedPracticePage from "./page";

// Mock Next.js modules
jest.mock("next/navigation", () => ({
  useSearchParams: jest.fn(() => ({
    get: jest.fn((key: string) => {
      if (key === "plan") return "test-plan-id";
      if (key === "card") return null;
      if (key === "category") return null;
      return null;
    }),
  })),
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
  })),
}));

// Mock API route
global.fetch = jest.fn();

// Mock lucide-react icons
jest.mock("lucide-react", () => ({
  ArrowLeft: () => <span data-testid="arrow-left-icon">←</span>,
  ArrowRight: () => <span data-testid="arrow-right-icon">→</span>,
  CheckCircle: () => <span data-testid="check-icon">✓</span>,
  Clock: () => <span data-testid="clock-icon">🕐</span>,
  Target: () => <span data-testid="target-icon">🎯</span>,
  BookOpen: () => <span data-testid="book-icon">📖</span>,
  Play: () => <span data-testid="play-icon">▶</span>,
  Loader2: () => <span data-testid="loader-icon">⏳</span>,
  Zap: () => <span data-testid="zap-icon">⚡</span>,
  XCircle: () => <span data-testid="x-icon">✗</span>,
  Info: () => <span data-testid="info-icon">ℹ</span>,
  Video: () => <span data-testid="video-icon">🎥</span>,
  FileText: () => <span data-testid="file-icon">📄</span>,
  GraduationCap: () => <span data-testid="graduation-icon">🎓</span>,
  ExternalLink: () => <span data-testid="external-link-icon">🔗</span>,
}));

// Helper function to setup localStorage mock
const setupLocalStorage = (data: Record<string, string | null> = {}) => {
  const storage: Record<string, string> = Object.fromEntries(
    Object.entries(data).map(([k, v]) => [k, v ?? ""]),
  );
  Storage.prototype.getItem = jest.fn((key: string) => {
    return storage[key] || null;
  });
  Storage.prototype.setItem = jest.fn((key: string, value: string) => {
    storage[key] = value;
  });
  Storage.prototype.removeItem = jest.fn((key: string) => {
    delete storage[key];
  });
  Storage.prototype.clear = jest.fn(() => {
    Object.keys(storage).forEach((key) => delete storage[key]);
  });
  return storage;
};

// Helper function to clear localStorage
const clearLocalStorage = () => {
  setupLocalStorage({});
};

// Mock plan data with resources
const mockPlanDataWithResources = {
  id: "test-plan-id",
  name: "Test Plan",
  cards: [
    {
      id: "card-1",
      title: "Test Card",
      categories: [
        {
          id: "cat-1",
          name: "Test Category",
          topics: [
            {
              id: "topic-1",
              name: "Test Topic",
              questions: [
                {
                  id: "q-1",
                  title: "Test Question",
                  content: "What is the answer?",
                  type: "multiple-choice",
                  difficulty: "intermediate",
                  options: [
                    { id: "opt-1", text: "Option 1", isCorrect: true },
                    { id: "opt-2", text: "Option 2", isCorrect: false },
                  ],
                  explanation: "This is the explanation",
                  resources: [
                    {
                      type: "video",
                      title: "Video Tutorial",
                      url: "https://example.com/video",
                      description: "Learn more about this topic",
                      duration: "10:30",
                      author: "John Doe",
                    },
                    {
                      type: "article",
                      title: "Article Guide",
                      url: "https://example.com/article",
                      description: "Read this article",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

describe("G-UT-030: Resources Component Rendering", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    clearLocalStorage();
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ data: mockPlanDataWithResources }),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    clearLocalStorage();
  });

  test("should render resources section when resources exist and explanation is shown", async () => {
    setupLocalStorage({});

    render(<GuidedPracticePage />);

    // Wait for page to load
    await waitFor(() => {
      expect(screen.getByText("Test Question")).toBeInTheDocument();
    });

    // Select an answer to show explanation
    const option1 = screen.getByText("Option 1");
    fireEvent.click(option1);

    // Wait for explanation to appear
    await waitFor(() => {
      expect(screen.getByText("Explanation")).toBeInTheDocument();
    });

    // Verify resources section appears
    await waitFor(() => {
      expect(screen.getByText("Learning Resources")).toBeInTheDocument();
    });

    // Verify resource titles are displayed
    expect(screen.getByText("Video Tutorial")).toBeInTheDocument();
    expect(screen.getByText("Article Guide")).toBeInTheDocument();
  });

  test("should NOT render resources section when resources is null", async () => {
    const planDataWithoutResources = {
      ...mockPlanDataWithResources,
      cards: [
        {
          ...mockPlanDataWithResources.cards[0],
          categories: [
            {
              ...mockPlanDataWithResources.cards[0].categories[0],
              topics: [
                {
                  ...mockPlanDataWithResources.cards[0].categories[0].topics[0],
                  questions: [
                    {
                      ...mockPlanDataWithResources.cards[0].categories[0]
                        .topics[0].questions[0],
                      resources: null,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    };

    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ data: planDataWithoutResources }),
    });

    setupLocalStorage({});

    render(<GuidedPracticePage />);

    await waitFor(() => {
      expect(screen.getByText("Test Question")).toBeInTheDocument();
    });

    // Select an answer
    const option1 = screen.getByText("Option 1");
    fireEvent.click(option1);

    // Wait for explanation
    await waitFor(() => {
      expect(screen.getByText("Explanation")).toBeInTheDocument();
    });

    // Verify resources section does NOT appear
    expect(screen.queryByText("Learning Resources")).not.toBeInTheDocument();
  });

  test("should NOT render resources section when resources array is empty", async () => {
    const planDataWithEmptyResources = {
      ...mockPlanDataWithResources,
      cards: [
        {
          ...mockPlanDataWithResources.cards[0],
          categories: [
            {
              ...mockPlanDataWithResources.cards[0].categories[0],
              topics: [
                {
                  ...mockPlanDataWithResources.cards[0].categories[0].topics[0],
                  questions: [
                    {
                      ...mockPlanDataWithResources.cards[0].categories[0]
                        .topics[0].questions[0],
                      resources: [],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    };

    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ data: planDataWithEmptyResources }),
    });

    setupLocalStorage({});

    render(<GuidedPracticePage />);

    await waitFor(() => {
      expect(screen.getByText("Test Question")).toBeInTheDocument();
    });

    // Select an answer
    const option1 = screen.getByText("Option 1");
    fireEvent.click(option1);

    // Wait for explanation
    await waitFor(() => {
      expect(screen.getByText("Explanation")).toBeInTheDocument();
    });

    // Verify resources section does NOT appear
    expect(screen.queryByText("Learning Resources")).not.toBeInTheDocument();
  });

  test("should NOT render resources section for code questions", async () => {
    const planDataWithCodeQuestion = {
      ...mockPlanDataWithResources,
      cards: [
        {
          ...mockPlanDataWithResources.cards[0],
          categories: [
            {
              ...mockPlanDataWithResources.cards[0].categories[0],
              topics: [
                {
                  ...mockPlanDataWithResources.cards[0].categories[0].topics[0],
                  questions: [
                    {
                      ...mockPlanDataWithResources.cards[0].categories[0]
                        .topics[0].questions[0],
                      type: "code",
                      resources: [
                        {
                          type: "video",
                          title: "Video Tutorial",
                          url: "https://example.com/video",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    };

    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ data: planDataWithCodeQuestion }),
    });

    setupLocalStorage({});

    render(<GuidedPracticePage />);

    await waitFor(() => {
      expect(screen.getByText("Test Question")).toBeInTheDocument();
    });

    // Verify resources section does NOT appear for code questions
    expect(screen.queryByText("Learning Resources")).not.toBeInTheDocument();
  });

  test("should NOT render resources section before explanation is shown", async () => {
    setupLocalStorage({});

    render(<GuidedPracticePage />);

    await waitFor(() => {
      expect(screen.getByText("Test Question")).toBeInTheDocument();
    });

    // Verify resources section does NOT appear before answer is selected
    expect(screen.queryByText("Learning Resources")).not.toBeInTheDocument();
  });

  test("should display correct icons for each resource type", async () => {
    setupLocalStorage({});

    render(<GuidedPracticePage />);

    await waitFor(() => {
      expect(screen.getByText("Test Question")).toBeInTheDocument();
    });

    // Select an answer
    const option1 = screen.getByText("Option 1");
    fireEvent.click(option1);

    // Wait for resources to appear
    await waitFor(() => {
      expect(screen.getByText("Learning Resources")).toBeInTheDocument();
    });

    // Verify icons are displayed (mocked as testids)
    expect(screen.getByTestId("video-icon")).toBeInTheDocument();
    expect(screen.getByTestId("file-icon")).toBeInTheDocument();
  });

  test("should display resource details correctly", async () => {
    setupLocalStorage({});

    render(<GuidedPracticePage />);

    await waitFor(() => {
      expect(screen.getByText("Test Question")).toBeInTheDocument();
    });

    // Select an answer
    const option1 = screen.getByText("Option 1");
    fireEvent.click(option1);

    // Wait for resources to appear
    await waitFor(() => {
      expect(screen.getByText("Learning Resources")).toBeInTheDocument();
    });

    // Verify resource details
    expect(screen.getByText("Video Tutorial")).toBeInTheDocument();
    expect(screen.getByText("Learn more about this topic")).toBeInTheDocument();
    expect(screen.getByText("10:30")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Article Guide")).toBeInTheDocument();
    expect(screen.getByText("Read this article")).toBeInTheDocument();
  });

  test("should render resource links with correct attributes", async () => {
    setupLocalStorage({});

    render(<GuidedPracticePage />);

    await waitFor(() => {
      expect(screen.getByText("Test Question")).toBeInTheDocument();
    });

    // Select an answer
    const option1 = screen.getByText("Option 1");
    fireEvent.click(option1);

    // Wait for resources to appear
    await waitFor(() => {
      expect(screen.getByText("Learning Resources")).toBeInTheDocument();
    });

    // Find resource links
    const videoLink = screen.getByText("Video Tutorial").closest("a");
    const articleLink = screen.getByText("Article Guide").closest("a");

    // Verify links have correct attributes
    expect(videoLink).toHaveAttribute("href", "https://example.com/video");
    expect(videoLink).toHaveAttribute("target", "_blank");
    expect(videoLink).toHaveAttribute("rel", "noopener noreferrer");

    expect(articleLink).toHaveAttribute("href", "https://example.com/article");
    expect(articleLink).toHaveAttribute("target", "_blank");
    expect(articleLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  test("should display multiple resources in list format", async () => {
    setupLocalStorage({});

    render(<GuidedPracticePage />);

    await waitFor(() => {
      expect(screen.getByText("Test Question")).toBeInTheDocument();
    });

    // Select an answer
    const option1 = screen.getByText("Option 1");
    fireEvent.click(option1);

    // Wait for resources to appear
    await waitFor(() => {
      expect(screen.getByText("Learning Resources")).toBeInTheDocument();
    });

    // Verify both resources are displayed
    expect(screen.getByText("Video Tutorial")).toBeInTheDocument();
    expect(screen.getByText("Article Guide")).toBeInTheDocument();
  });
});
