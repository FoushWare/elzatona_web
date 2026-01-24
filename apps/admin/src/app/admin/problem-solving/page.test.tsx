/**
 * Unit tests for Admin Problem Solving page
 */
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import ProblemSolvingPage from "./page";

// Mock lucide-react icons
vi.mock("lucide-react", () => ({
  Plus: () => <div data-testid="plus-icon" />,
  Search: () => <div data-testid="search-icon" />,
  Terminal: () => <div data-testid="terminal-icon" />,
  Layout: () => <div data-testid="layout-icon" />,
  Edit: () => <div data-testid="edit-icon" />,
}));

// Mock the common-ui components
vi.mock("@elzatona/common-ui", () => ({
  ProblemSolvingEditor: ({ onSave, onCancel, isEditing }: any) => (
    <div data-testid="problem-solving-editor">
      <h2>{isEditing ? "Edit Task" : "Create Task"}</h2>
      <button onClick={onCancel} data-testid="cancel-editor">
        Cancel
      </button>
      <button
        onClick={() =>
          onSave({
            title: "Test Task",
            description: "Test description",
            difficulty: "easy",
            category: "algorithms",
            problem: "Test problem",
            solution: "Test solution",
            examples: [],
            tags: [],
          })
        }
        data-testid="save-editor"
      >
        Save
      </button>
    </div>
  ),
  Button: ({ children, onClick, ...props }: any) => (
    <button onClick={onClick} {...props}>
      {children}
    </button>
  ),
  Input: ({ value, onChange, placeholder }: any) => (
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      data-testid="search-input"
    />
  ),
  Card: ({ children }: any) => <div data-testid="card">{children}</div>,
  CardContent: ({ children }: any) => <div>{children}</div>,
  CardHeader: ({ children }: any) => <div>{children}</div>,
  CardTitle: ({ children }: any) => <h3>{children}</h3>,
  Badge: ({ children, variant }: any) => (
    <span data-testid={`badge-${variant || "default"}`}>{children}</span>
  ),
  useToast: () => ({
    showSuccess: vi.fn(),
    showError: vi.fn(),
  }),
}));

// Mock fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe("Problem Solving Page - Unit", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockFetch.mockResolvedValue({
      json: () =>
        Promise.resolve({
          success: true,
          data: [
            {
              id: "1",
              title: "Test Task",
              description: "Test description",
              difficulty: "easy",
              category: "algorithms",
              problem: "Test problem",
              solution: "Test solution",
              examples: [],
              tags: ["array", "sorting"],
            },
          ],
        }),
    });
  });

  it("renders the problem solving page correctly", async () => {
    render(<ProblemSolvingPage />);

    expect(screen.getByText("Problem Solving")).toBeInTheDocument();
    expect(
      screen.getByText("Manage algorithmic coding challenges"),
    ).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Test Task")).toBeInTheDocument();
    });
  });

  it("displays task information", async () => {
    render(<ProblemSolvingPage />);

    await waitFor(() => {
      expect(screen.getByText("Test Task")).toBeInTheDocument();
      expect(screen.getByText("Test description")).toBeInTheDocument();
      expect(screen.getByText("algorithms")).toBeInTheDocument();
      expect(screen.getByText("0 Examples")).toBeInTheDocument();
    });
  });

  it("displays task difficulty badges", async () => {
    render(<ProblemSolvingPage />);

    await waitFor(() => {
      expect(screen.getByTestId("badge-secondary")).toBeInTheDocument(); // easy difficulty
    });
  });

  it("displays task tags", async () => {
    render(<ProblemSolvingPage />);

    await waitFor(() => {
      expect(screen.getByText("array")).toBeInTheDocument();
      expect(screen.getByText("sorting")).toBeInTheDocument();
    });
  });

  it("opens create task editor", () => {
    render(<ProblemSolvingPage />);

    const createButton = screen.getByText("Create New Task");
    fireEvent.click(createButton);

    expect(screen.getByTestId("problem-solving-editor")).toBeInTheDocument();
    expect(screen.getByText("Create Task")).toBeInTheDocument();
  });

  it("opens edit task editor", async () => {
    render(<ProblemSolvingPage />);

    await waitFor(() => {
      const editButton = screen.getByTestId("edit-icon").closest("button");
      fireEvent.click(editButton!);
    });

    expect(screen.getByTestId("problem-solving-editor")).toBeInTheDocument();
    expect(screen.getByText("Edit Task")).toBeInTheDocument();
  });

  it("handles search functionality", async () => {
    render(<ProblemSolvingPage />);

    const searchInput = screen.getByTestId("search-input");
    fireEvent.change(searchInput, { target: { value: "test" } });

    expect(searchInput).toHaveValue("test");
  });

  it("shows loading state", () => {
    // Mock pending fetch
    mockFetch.mockImplementation(() => new Promise(() => {}));

    render(<ProblemSolvingPage />);

    const spinner = document.querySelector(".animate-spin");
    expect(spinner).toBeInTheDocument();
  });

  it("shows empty state when no tasks", async () => {
    mockFetch.mockResolvedValue({
      json: () =>
        Promise.resolve({
          success: true,
          data: [],
        }),
    });

    render(<ProblemSolvingPage />);

    await waitFor(() => {
      expect(screen.getByText("No tasks found")).toBeInTheDocument();
      expect(
        screen.getByText(
          "Get started by creating your first problem solving task",
        ),
      ).toBeInTheDocument();
    });
  });

  it("handles API errors gracefully", async () => {
    mockFetch.mockRejectedValueOnce(new Error("Network error"));

    render(<ProblemSolvingPage />);

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalled();
    });
  });

  it("filters tasks based on search query", async () => {
    mockFetch.mockResolvedValue({
      json: () =>
        Promise.resolve({
          success: true,
          data: [
            {
              id: "1",
              title: "Array Sorting",
              description: "Sort an array",
              difficulty: "easy",
              category: "algorithms",
              problem: "Test problem",
              solution: "Test solution",
              examples: [],
              tags: ["array", "sorting"],
            },
            {
              id: "2",
              title: "Binary Search",
              description: "Implement binary search",
              difficulty: "medium",
              category: "algorithms",
              problem: "Test problem",
              solution: "Test solution",
              examples: [],
              tags: ["search", "algorithm"],
            },
          ],
        }),
    });

    render(<ProblemSolvingPage />);

    await waitFor(() => {
      expect(screen.getByText("Array Sorting")).toBeInTheDocument();
      expect(screen.getByText("Binary Search")).toBeInTheDocument();
    });

    const searchInput = screen.getByTestId("search-input");
    fireEvent.change(searchInput, { target: { value: "binary" } });

    await waitFor(() => {
      expect(screen.queryByText("Array Sorting")).not.toBeInTheDocument();
      expect(screen.getByText("Binary Search")).toBeInTheDocument();
    });
  });
});
