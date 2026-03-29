import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { CategoryFormModal } from "./CategoryFormModal";

describe("CategoryFormModal", () => {
  const mockOnSubmit = vi.fn();
  const mockOnOpenChange = vi.fn();

  const defaultProps = {
    isOpen: true,
    onOpenChange: mockOnOpenChange,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    category: undefined as any,
    onSubmit: mockOnSubmit,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders create form with correct heading when category is null", () => {
    render(<CategoryFormModal {...defaultProps} />);
    // DialogTitle contains icon + span, use role-based query
    expect(
      screen.getByRole("heading", { name: /Create Category/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Create Category/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Add a new category to organize/i),
    ).toBeInTheDocument();
  });

  it("renders edit form when category is provided", () => {
    const category = {
      id: "cat-1",
      name: "My Category",
      description: "Some description",
      learning_card_id: null,
    } as any;

    render(<CategoryFormModal {...defaultProps} category={category} />);
    expect(screen.getByText("Edit Category")).toBeInTheDocument();
    expect(screen.getByDisplayValue("My Category")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Some description")).toBeInTheDocument();
    // Edit mode shows "Save Changes"
    expect(
      screen.getByRole("button", { name: /Save Changes/i }),
    ).toBeInTheDocument();
  });

  it("clears form when modal opens for create", () => {
    const { rerender } = render(
      <CategoryFormModal {...defaultProps} isOpen={false} />,
    );
    rerender(<CategoryFormModal {...defaultProps} isOpen={true} />);
    const nameInput = screen.getByLabelText(/Category Name/i);
    expect(nameInput).toHaveValue("");
  });

  it("shows validation error 'Name is required' when submitting empty name", async () => {
    render(<CategoryFormModal {...defaultProps} />);
    const submitBtn = screen.getByRole("button", { name: /Create Category/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText("Name is required")).toBeInTheDocument();
    });
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it("calls onSubmit with form data on valid submission", async () => {
    mockOnSubmit.mockResolvedValue(undefined);
    render(<CategoryFormModal {...defaultProps} />);

    const nameInput = screen.getByLabelText(/Category Name/i);
    await userEvent.type(nameInput, "New Category");

    const desc = screen.getByLabelText(/Description/i);
    await userEvent.type(desc, "A test description");

    const submitBtn = screen.getByRole("button", { name: /Create Category/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        name: "New Category",
        description: "A test description",
      });
    });
  });

  it("does not render when isOpen is false", () => {
    render(<CategoryFormModal {...defaultProps} isOpen={false} />);
    expect(screen.queryByText("Create Category")).not.toBeInTheDocument();
  });

  it("shows 'Saving...' and disables button when isSubmitting is true", () => {
    render(<CategoryFormModal {...defaultProps} isSubmitting={true} />);
    expect(screen.getByRole("button", { name: /Saving.../i })).toBeDisabled();
  });
});
