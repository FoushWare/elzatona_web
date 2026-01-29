/**
 * Integration tests for Admin Problem Solving page
 */
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
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
  ProblemSolvingEditor: ({ onSave, onCancel, isEditing, task }: any) => (
    <div data-testid="problem-solving-editor">
      <h2>{isEditing ? "Edit Task" : "Create Task"}</h2>
      {task && <p>Editing: {task.title}</p>}
      <button onClick={onCancel} data-testid="cancel-editor">
        Cancel
      </button>
      <button
        onClick={() =>
          onSave({
            title: isEditing ? "Updated Task" : "New Task",
            description: "Test description",
            difficulty: "easy",
            category: "algorithms",
            problem: "Test problem",
            solution: "Test solution",
            examples: [{ input: "test", output: "result" }],
            tags: ["test"],
          })
        }
        data-testid="save-editor"
      >
        {isEditing ? "Update" : "Create"}
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

describe("Problem Solving Page - Integration", () => {
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
              examples: [{ input: "test", output: "result" }],
              tags: ["array", "sorting"],
            },
          ],
        }),
    });
  });

  it("renders the problem solving page and loads tasks", async () => {
    render(<ProblemSolvingPage />);

    expect(screen.getByText("Problem Solving")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Test Task")).toBeInTheDocument();
      expect(screen.getByText("Test description")).toBeInTheDocument();
    });
  });

  it("displays task cards with all information", async () => {
    render(<ProblemSolvingPage />);

    await waitFor(() => {
      expect(screen.getByText("Test Task")).toBeInTheDocument();
      expect(screen.getByText("Test description")).toBeInTheDocument();
      expect(screen.getByText("algorithms")).toBeInTheDocument();
      expect(screen.getByText("1 Examples")).toBeInTheDocument();
      expect(screen.getByText("array")).toBeInTheDocument();
      expect(screen.getByText("sorting")).toBeInTheDocument();
    });
  });

  it("handles task creation flow", async () => {
    mockFetch
      .mockResolvedValueOnce({
        json: () =>
          Promise.resolve({
            success: true,
            data: [],
          }),
      })
      .mockResolvedValueOnce({
        json: () =>
          Promise.resolve({
            success: true,
          }),
      });

    render(<ProblemSolvingPage />);

    // Click create button
    const createButton = screen.getByText("Create New Task");
    fireEvent.click(createButton);

    // Editor should open
    expect(screen.getByTestId("problem-solving-editor")).toBeInTheDocument();
    expect(screen.getByText("Create Task")).toBeInTheDocument();

    // Save task
    const saveButton = screen.getByTestId("save-editor");
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        "/api/admin/problem-solving",
        expect.objectContaining({
          method: "POST",
        }),
      );
    });
  });

  it("handles task editing flow", async () => {
    render(<ProblemSolvingPage />);

    await waitFor(() => {
      expect(screen.getByText("Test Task")).toBeInTheDocument();
    });

    // Click edit button
    const editButton = screen.getByTestId("edit-icon").closest("button");
    fireEvent.click(editButton!);

    // Editor should open in edit mode
    expect(screen.getByTestId("problem-solving-editor")).toBeInTheDocument();
    expect(screen.getByText("Edit Task")).toBeInTheDocument();
    expect(screen.getByText("Editing: Test Task")).toBeInTheDocument();

    // Save task
    const saveButton = screen.getByTestId("save-editor");
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        "/api/admin/problem-solving/1",
        expect.objectContaining({
          method: "PUT",
        }),
      );
    });
  });

  it("handles search functionality", async () => {
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
              tags: ["array"],
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
              tags: ["search"],
            },
          ],
        }),
    });

    render(<ProblemSolvingPage />);

    await waitFor(() => {
      expect(screen.getByText("Array Sorting")).toBeInTheDocument();
      expect(screen.getByText("Binary Search")).toBeInTheDocument();
    });

    // Search for specific task
    const searchInput = screen.getByTestId("search-input");
    fireEvent.change(searchInput, { target: { value: "binary" } });

    await waitFor(() => {
      expect(screen.queryByText("Array Sorting")).not.toBeInTheDocument();
      expect(screen.getByText("Binary Search")).toBeInTheDocument();
    });
  });

  it("shows loading state initially", () => {
    // Mock pending fetch
    mockFetch.mockImplementation(() => new Promise(() => {}));

    render(<ProblemSolvingPage />);

    const spinner = document.querySelector(".animate-spin");
    expect(spinner).toBeInTheDocument();
  });

  it("shows empty state when no tasks found", async () => {
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
      expect(screen.getByTestId("layout-icon")).toBeInTheDocument();
    });
  });

  it("handles API errors gracefully", async () => {
    mockFetch.mockRejectedValueOnce(new Error("Network error"));

    render(<ProblemSolvingPage />);

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalled();
    });
  });

  it("closes editor when cancel is clicked", async () => {
    render(<ProblemSolvingPage />);

    // Open editor
    const createButton = screen.getByText("Create New Task");
    fireEvent.click(createButton);

    expect(screen.getByTestId("problem-solving-editor")).toBeInTheDocument();

    // Cancel
    const cancelButton = screen.getByTestId("cancel-editor");
    fireEvent.click(cancelButton);

    expect(
      screen.queryByTestId("problem-solving-editor"),
    ).not.toBeInTheDocument();
  });

  it("displays different difficulty badges", async () => {
    mockFetch.mockResolvedValue({
      json: () =>
        Promise.resolve({
          success: true,
          data: [
            {
              id: "1",
              title: "Easy Task",
              description: "Easy task",
              difficulty: "easy",
              category: "algorithms",
              problem: "Test",
              solution: "Test",
              examples: [],
              tags: [],
            },
            {
              id: "2",
              title: "Medium Task",
              description: "Medium task",
              difficulty: "medium",
              category: "algorithms",
              problem: "Test",
              solution: "Test",
              examples: [],
              tags: [],
            },
            {
              id: "3",
              title: "Hard Task",
              description: "Hard task",
              difficulty: "hard",
              category: "algorithms",
              problem: "Test",
              solution: "Test",
              examples: [],
              tags: [],
            },
          ],
        }),
    });

    render(<ProblemSolvingPage />);

    await waitFor(() => {
      expect(screen.getByTestId("badge-secondary")).toBeInTheDocument(); // easy
      expect(screen.getByTestId("badge-default")).toBeInTheDocument(); // medium
      expect(screen.getByTestId("badge-destructive")).toBeInTheDocument(); // hard
    });
  });

  it("limits tag display to 3 tags", async () => {
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
              tags: ["tag1", "tag2", "tag3", "tag4", "tag5"],
            },
          ],
        }),
    });

    render(<ProblemSolvingPage />);

    await waitFor(() => {
      expect(screen.getByText("tag1")).toBeInTheDocument();
      expect(screen.getByText("tag2")).toBeInTheDocument();
      expect(screen.getByText("tag3")).toBeInTheDocument();
      expect(screen.getByText("+2 more")).toBeInTheDocument();
    });
  });
});
