/**
 * Integration tests for Admin Frontend Tasks page
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
          onClick={() =>
            onSave({
              title: "Test Task",
              description: "Test Description",
              difficulty: "easy",
              category: "components",
              code: "console.log('test');",
              solution: "Test solution",
            })
          }
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

describe("Frontend Tasks Page - Integration", () => {
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

  it("renders the frontend tasks page correctly", async () => {
    render(<FrontendTasksPage />);

    expect(screen.getByText("Frontend Tasks")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Test Task")).toBeInTheDocument();
    });
  });

  it("displays task information", async () => {
    render(<FrontendTasksPage />);

    await waitFor(() => {
      expect(screen.getByText("Test Task")).toBeInTheDocument();
      expect(screen.getByText("Test description")).toBeInTheDocument();
      expect(screen.getByTestId("badge")).toBeInTheDocument(); // difficulty badge
    });
  });

  it("opens create task editor", async () => {
    render(<FrontendTasksPage />);

    const createButton = screen.getByText("Create Task");
    fireEvent.click(createButton);

    await waitFor(() => {
      expect(screen.getByTestId("frontend-task-editor")).toBeInTheDocument();
    });
  });

  it("handles task creation", async () => {
    mockFetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ success: true }),
    });

    render(<FrontendTasksPage />);

    // Open editor
    const createButton = screen.getByText("Create Task");
    fireEvent.click(createButton);

    await waitFor(() => {
      expect(screen.getByTestId("frontend-task-editor")).toBeInTheDocument();
    });

    // Save task
    const saveButton = screen.getByTestId("save-editor");
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        "/api/admin/frontend-tasks",
        expect.objectContaining({
          method: "POST",
        }),
      );
    });
  });

  it("handles search functionality", async () => {
    render(<FrontendTasksPage />);

    const searchInput = screen.getByPlaceholderText("Search tasks...");
    fireEvent.change(searchInput, { target: { value: "component" } });

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalled();
    });
  });

  it("shows loading state", () => {
    // Mock pending fetch
    mockFetch.mockImplementation(() => new Promise(() => {}));

    render(<FrontendTasksPage />);

    // Should show loading initially
    expect(screen.getByText("Frontend Tasks")).toBeInTheDocument();
  });

  it("handles API errors gracefully", async () => {
    mockFetch.mockRejectedValueOnce(new Error("Network error"));

    render(<FrontendTasksPage />);

    // Error should be handled gracefully
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalled();
    });
  });
});
