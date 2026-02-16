/**
 * Unit tests for Admin Frontend Tasks page
 */
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import FrontendTasksPage from "./page";

// Mock the common-ui components
vi.mock("@elzatona/common-ui", () => ({
  FrontendTaskEditor: ({ isOpen, onClose, onSave, _task, _mode }: unknown) =>
    isOpen ? (
      <div data-testid="frontend-task-editor">
        <button onClick={onClose} data-testid="close-editor">
          Close
        </button>
        <button
          onClick={() => onSave({ title: "Test Task", description: "Test" })}
          data-testid="save-editor"
        >
          Save
        </button>
      </div>
    ) : null,
  Button: ({ children, onClick, ...props }: unknown) => (
    <button onClick={onClick} {...props}>
      {children}
    </button>
  ),
  Input: ({ ...props }: unknown) => <input {...props} />,
  Card: ({ children }: unknown) => <div data-testid="card">{children}</div>,
  CardContent: ({ children }: unknown) => <div>{children}</div>,
  CardHeader: ({ children }: unknown) => <div>{children}</div>,
  CardTitle: ({ children }: unknown) => <h3>{children}</h3>,
  Badge: ({ children }: unknown) => <span data-testid="badge">{children}</span>,
  useToast: () => ({
    showSuccess: vi.fn(),
    showError: vi.fn(),
  }),
}));

// Mock fetch
const mockFetch = vi.fn();
globalThis.fetch = mockFetch;

// Mock URLSearchParams
vi.mock("url", () => ({
  URLSearchParams: class {
    map: Map<string, string>;
    constructor(params: string) {
      this.map = new Map(
        params.split("&").map((p) => p.split("=") as [string, string]),
      );
    }
    toString() {
      return "";
    }
  },
}));

describe("Frontend Tasks Page - Unit", () => {
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
              category: "components",
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
          ],
          pagination: { totalCount: 1, totalPages: 1 },
        }),
    });
  });

  it("renders the page with loading state initially", () => {
    render(<FrontendTasksPage />);

    expect(screen.getByText("Frontend Tasks")).toBeInTheDocument();
  });

  it("fetches and displays tasks", async () => {
    render(<FrontendTasksPage />);

    await waitFor(() => {
      expect(screen.getByText("Test Task")).toBeInTheDocument();
    });
  });

  it("shows create task button", () => {
    render(<FrontendTasksPage />);

    expect(screen.getByText("Create Task")).toBeInTheDocument();
  });

  it("opens editor when create button is clicked", async () => {
    render(<FrontendTasksPage />);

    const createButton = screen.getByText("Create Task");
    fireEvent.click(createButton);

    await waitFor(() => {
      expect(screen.getByTestId("frontend-task-editor")).toBeInTheDocument();
    });
  });

  it("handles search input", async () => {
    render(<FrontendTasksPage />);

    const searchInput = screen.getByPlaceholderText("Search tasks...");
    fireEvent.change(searchInput, { target: { value: "test search" } });

    // The component should refetch with the search query
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalled();
    });
  });
});
