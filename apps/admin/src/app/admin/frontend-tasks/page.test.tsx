/**
 * Unit tests for Admin Frontend Tasks page
 */
import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { vi, describe, it, expect, beforeEach } from "vitest";
import FrontendTasksPage from "./page";

// Mock the common-ui components
vi.mock("@elzatona/common-ui", () => ({
  FrontendTaskEditor: ({ onSave, onCancel, mode }: any) => (
    <div data-testid="frontend-task-editor">
      <h2>{mode === "edit" ? "Edit Task" : "Create Task"}</h2>
      <button onClick={onCancel} data-testid="close-editor">
        Close
      </button>
      <button
        onClick={() => onSave({ title: "Test Task", description: "Test" })}
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
  Badge: ({ children, variant, className }: any) => (
    <span data-testid="badge" className={className}>
      {children}
    </span>
  ),
  useToast: () => ({
    showSuccess: vi.fn(),
    showError: vi.fn(),
  }),
}));

describe("Frontend Tasks Page - Unit", () => {
  let mockFetch: any;

  beforeEach(() => {
    mockFetch = vi.fn();
    vi.stubGlobal("fetch", mockFetch);

    mockFetch.mockImplementation(() =>
      Promise.resolve(
        new Response(
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
        ),
      ),
    );
  });

  it("renders the page correctly", async () => {
    render(<FrontendTasksPage />);

    expect(screen.getByText("Frontend Tasks")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Test Task")).toBeInTheDocument();
    });
  });

  it("fetches and displays tasks", async () => {
    render(<FrontendTasksPage />);

    await waitFor(() => {
      expect(screen.getByText("Test Task")).toBeInTheDocument();
    });
  });

  it("shows create task button", () => {
    render(<FrontendTasksPage />);

    expect(screen.getByText("Create New Task")).toBeInTheDocument();
  });

  it("opens editor when create button is clicked", async () => {
    render(<FrontendTasksPage />);

    const createButton = screen.getByText("Create New Task");
    fireEvent.click(createButton);

    await waitFor(() => {
      expect(screen.getByTestId("frontend-task-editor")).toBeInTheDocument();
      expect(screen.getByText("Create Task")).toBeInTheDocument();
    });
  });

  it("handles search input", async () => {
    render(<FrontendTasksPage />);

    const searchInput = screen.getByPlaceholderText(
      "Search tasks by title, description or category...",
    );
    fireEvent.change(searchInput, { target: { value: "test search" } });

    // The component should refetch with the search query
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining("search=test+search"),
      );
    });
  });
});
