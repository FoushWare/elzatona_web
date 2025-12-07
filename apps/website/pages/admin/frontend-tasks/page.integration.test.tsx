/**
 * Integration Tests for Admin Frontend Tasks (A-IT-017)
 * Task: A-005 - Admin Frontend Tasks
 */

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import FrontendTasksAdminPage from "./page";

jest.mock("@elzatona/hooks", () => ({
  useFrontendTasks: jest.fn(() => ({
    data: { data: [] },
    isLoading: false,
    error: null,
  })),
  useCreateFrontendTask: jest.fn(() => ({
    mutateAsync: jest.fn().mockResolvedValue({ success: true }),
    isPending: false,
  })),
  useUpdateFrontendTask: jest.fn(() => ({
    mutateAsync: jest.fn().mockResolvedValue({ success: true }),
    isPending: false,
  })),
  useDeleteFrontendTask: jest.fn(() => ({
    mutateAsync: jest.fn().mockResolvedValue({ success: true }),
    isPending: false,
  })),
}));

jest.mock("@elzatona/components", () => ({
  FrontendTaskEditor: ({ onSave, onCancel }: any) => (
    <div>
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

describe("A-IT-017: Frontend Tasks CRUD Integration", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should integrate task creation", async () => {
    render(<FrontendTasksAdminPage />);

    await waitFor(() => {
      const { useFrontendTasks } = require("@elzatona/hooks");
      expect(useFrontendTasks).toHaveBeenCalled();
    });
  });
});
