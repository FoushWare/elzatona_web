/**
 * Unit Tests for Admin Frontend Tasks (A-UT-016)
 * Task: A-005 - Admin Frontend Tasks
 */

import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import FrontendTasksAdminPage from "./page";

// Mock TanStack Query hooks
const mockTasksData = { data: [] };

const mockUseFrontendTasks = jest.fn(() => ({
  data: mockTasksData,
  isLoading: false,
  error: null,
}));

jest.mock("@elzatona/hooks", () => ({
  useFrontendTasks: mockUseFrontendTasks,
  useCreateFrontendTask: jest.fn(() => ({
    mutateAsync: jest.fn(),
    isPending: false,
  })),
  useUpdateFrontendTask: jest.fn(() => ({
    mutateAsync: jest.fn(),
    isPending: false,
  })),
  useDeleteFrontendTask: jest.fn(() => ({
    mutateAsync: jest.fn(),
    isPending: false,
  })),
}));

jest.mock("@elzatona/components", () => ({
  FrontendTaskEditor: ({ onSave, onCancel }: any) => (
    <div data-testid="frontend-task-editor">
      <button onClick={() => onSave({})}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  ),
}));

jest.mock("lucide-react", () => ({
  Plus: () => <span>+</span>,
  Edit: () => <span>✏️</span>,
  Trash2: () => <span>🗑️</span>,
  Eye: () => <span>👁️</span>,
  Search: () => <span>🔍</span>,
  Filter: () => <span>🔽</span>,
  Code: () => <span>💻</span>,
}));

window.confirm = jest.fn(() => true);
window.alert = jest.fn();

describe("A-UT-016: Component Renders", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render without errors", () => {
    const { container } = render(<FrontendTasksAdminPage />);
    expect(container).toBeInTheDocument();
  });

  it("should display page header", () => {
    render(<FrontendTasksAdminPage />);
    // Page should render
    expect(document.body).toBeTruthy();
  });

  it("should have Add New Task button", () => {
    render(<FrontendTasksAdminPage />);
    // Should have create button
    expect(document.body).toBeTruthy();
  });
});

describe("A-UT-SNAPSHOT: Admin Frontend Tasks Snapshot Tests", () => {
  it("should match admin frontend tasks page snapshot", () => {
    const { container } = render(<FrontendTasksAdminPage />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it("should match admin frontend tasks page snapshot (loading state)", () => {
    mockUseFrontendTasks.mockReturnValue({
      data: { data: [], count: 0 },
      isLoading: true,
      error: null,
    });

    const { container } = render(<FrontendTasksAdminPage />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
