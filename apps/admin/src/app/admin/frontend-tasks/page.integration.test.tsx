/**
 * Integration tests for Admin Frontend Tasks page
 */
import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { vi, describe, it, expect, beforeEach } from "vitest";
import FrontendTasksPage from "./page";

// Mock lucide-react icons
vi.mock("lucide-react", () => ({
  Plus: () => <div data-testid="plus-icon" />,
  Search: () => <div data-testid="search-icon" />,
  Code: () => <div data-testid="code-icon" />,
  Layout: () => <div data-testid="layout-icon" />,
  Edit: () => <div data-testid="edit-icon" />,
  Trash2: () => <div data-testid="trash-icon" />,
}));

// Mock the common-ui components
vi.mock("@elzatona/common-ui", () => {
  const mockToast = {
    showSuccess: vi.fn(),
    showError: vi.fn(),
  };

  return {
    FrontendTaskEditor: ({ onCancel, onSave, task, mode }: any) => (
      <div data-testid="frontend-task-editor">
        <button onClick={onCancel} data-testid="close-editor">
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
    ),
    Button: ({ children, onClick, ...props }: any) => (
      <button onClick={onClick} {...props}>
        {children}
      </button>
    ),
    Input: ({ ...props }: any) => <input {...props} />,
    Card: ({ children }: any) => <div data-testid="card">{children}</div>,
    CardContent: ({ children }: any) => <div>{children}</div>,
    CardHeader: ({ children }: any) => <div>{children}</div>,
    CardTitle: ({ children }: any) => <h3>{children}</h3>,
    Badge: ({ children, variant }: any) => (
      <span data-testid={`badge-${variant || "default"}`}>{children}</span>
    ),
    useToast: () => mockToast,
  };
});

// Use global fetch spy
const fetchSpy = vi.spyOn(globalThis, "fetch").mockImplementation((async (
  url: any,
  _options: any,
) => {
  // Return default data for initial loads
  return new Response(
    JSON.stringify({
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
    { status: 200, headers: { "Content-Type": "application/json" } },
  );
}) as any);

vi.stubGlobal("fetch", fetchSpy);

describe("Frontend Tasks Page - Integration", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    globalThis.fetch = fetchSpy as any;
    if (globalThis.window !== undefined) {
      globalThis.window.fetch = fetchSpy as any;
    }
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
      expect(screen.getByTestId("badge-secondary")).toBeInTheDocument(); // difficulty badge
    });
  });

  it("opens create task editor", async () => {
    render(<FrontendTasksPage />);

    const createButton = screen.getByRole("button", {
      name: /create new task/i,
    });
    fireEvent.click(createButton);

    await waitFor(() => {
      expect(screen.getByTestId("frontend-task-editor")).toBeInTheDocument();
    });
  });

  it("handles task creation", async () => {
    fetchSpy
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify({
            success: true,
            data: [],
          }),
          { status: 200 },
        ),
      )
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify({
            success: true,
          }),
          { status: 200 },
        ),
      );

    render(<FrontendTasksPage />);

    // Open editor
    const createButton = screen.getByRole("button", {
      name: /create new task/i,
    });
    fireEvent.click(createButton);

    await waitFor(() => {
      expect(screen.getByTestId("frontend-task-editor")).toBeInTheDocument();
    });

    // Save task
    const saveButton = screen.getByTestId("save-editor");
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalledWith(
        expect.stringContaining("/api/admin/frontend-tasks"),
        expect.objectContaining({
          method: "POST",
        }),
      );
    });
  });

  it("handles search functionality", async () => {
    render(<FrontendTasksPage />);

    const searchInput = screen.getByPlaceholderText(
      "Search tasks by title, description or category...",
    );
    fireEvent.change(searchInput, { target: { value: "component" } });

    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalled();
    });
  });

  it("shows loading state", () => {
    // Mock pending fetch
    fetchSpy.mockImplementationOnce(() => new Promise(() => {}));

    render(<FrontendTasksPage />);

    // Should show loading initially
    expect(screen.getByText("Frontend Tasks")).toBeInTheDocument();
  });

  it("handles API errors gracefully", async () => {
    fetchSpy.mockRejectedValueOnce(new Error("Network error"));

    render(<FrontendTasksPage />);

    // Error should be handled gracefully
    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalled();
    });
  });
});
