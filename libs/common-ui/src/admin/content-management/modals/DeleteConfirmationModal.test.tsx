import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import { DeleteConfirmationModal } from "./DeleteConfirmationModal";

describe("DeleteConfirmationModal", () => {
  const mockOnConfirm = vi.fn();
  const mockOnCancel = vi.fn();
  const mockOnOpenChange = vi.fn();

  const defaultProps = {
    isOpen: true,
    onOpenChange: mockOnOpenChange,
    title: "Delete Category",
    description: "All associated data will be affected.",
    itemName: "My Test Category",
    isDeleting: false,
    onConfirm: mockOnConfirm,
    onCancel: mockOnCancel,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the title passed as prop", () => {
    render(<DeleteConfirmationModal {...defaultProps} />);
    expect(screen.getByText("Delete Category")).toBeInTheDocument();
  });

  it("renders the item name in the description", () => {
    render(<DeleteConfirmationModal {...defaultProps} />);
    expect(screen.getByText(/My Test Category/i)).toBeInTheDocument();
  });

  it("renders the cannot-be-undone warning", () => {
    render(<DeleteConfirmationModal {...defaultProps} />);
    // The warning heading text in the modal
    expect(
      screen.getByText(/Warning: This action cannot be undone/i),
    ).toBeInTheDocument();
  });

  it("calls onConfirm when 'Confirm Delete' button is clicked", () => {
    render(<DeleteConfirmationModal {...defaultProps} />);
    fireEvent.click(screen.getByRole("button", { name: /Confirm Delete/i }));
    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
  });

  it("calls onCancel when Cancel button is clicked", () => {
    render(<DeleteConfirmationModal {...defaultProps} />);
    fireEvent.click(screen.getByRole("button", { name: /Cancel/i }));
    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });

  it("shows 'Deleting...' and disables both buttons while deleting", () => {
    render(<DeleteConfirmationModal {...defaultProps} isDeleting={true} />);
    // The button text uses spans but should still be accessible
    const deleteBtn = screen.getByRole("button", { name: /Deleting.../i });
    expect(deleteBtn).toBeDisabled();
    expect(screen.getByRole("button", { name: /Cancel/i })).toBeDisabled();
  });

  it("does not render when isOpen is false", () => {
    render(<DeleteConfirmationModal {...defaultProps} isOpen={false} />);
    expect(screen.queryByText("Delete Category")).not.toBeInTheDocument();
  });
});
