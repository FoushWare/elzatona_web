import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { TopicFormModal } from "./TopicFormModal";

const mockCategories = [
  { id: "cat-1", name: "JavaScript", learning_card_id: "card-1" } as any,
  { id: "cat-2", name: "React", learning_card_id: "card-1" } as any,
];

describe("TopicFormModal", () => {
  const mockOnSubmit = vi.fn();
  const mockOnOpenChange = vi.fn();

  const defaultProps = {
    isOpen: true,
    onOpenChange: mockOnOpenChange,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    topic: undefined as any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    categories: mockCategories as any,
    onSubmit: mockOnSubmit,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders create form with correct title when topic is null", () => {
    render(<TopicFormModal {...defaultProps} />);
    // DialogTitle contains icon + span, use role-based query
    expect(
      screen.getByRole("heading", { name: /Create Topic/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Add a new topic under/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Create Topic/i }),
    ).toBeInTheDocument();
  });

  it("renders edit form when topic is provided", () => {
    const topic = {
      id: "topic-1",
      name: "Hooks",
      description: "React hooks",
      category_id: "cat-2",
    } as any;

    render(<TopicFormModal {...defaultProps} topic={topic} />);
    expect(screen.getByText("Edit Topic")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Hooks")).toBeInTheDocument();
    expect(screen.getByDisplayValue("React hooks")).toBeInTheDocument();
    // Edit mode: button reads "Save Changes"
    expect(
      screen.getByRole("button", { name: /Save Changes/i }),
    ).toBeInTheDocument();
  });

  it("shows category select trigger in form", () => {
    // With empty categories, the select trigger shows the placeholder text via data-placeholder
    render(<TopicFormModal {...defaultProps} categories={[]} topic={null} />);
    // The SelectTrigger renders a button element
    // Check the Parent Category label is visible
    expect(screen.getByText("Parent Category")).toBeInTheDocument();
  });

  it("shows 'Name is required' validation error on empty name submit", async () => {
    render(<TopicFormModal {...defaultProps} categories={[]} />);
    const submitBtn = screen.getByRole("button", { name: /Create Topic/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText("Name is required")).toBeInTheDocument();
    });
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it("shows 'Category is required' validation error when no category selected", async () => {
    // Pass empty categories so no auto-selection happens
    render(<TopicFormModal {...defaultProps} categories={[]} />);
    await userEvent.type(screen.getByLabelText(/Topic Name/i), "My Topic");
    fireEvent.click(screen.getByRole("button", { name: /Create Topic/i }));

    await waitFor(() => {
      expect(screen.getByText("Category is required")).toBeInTheDocument();
    });
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it("does not render when isOpen is false", () => {
    render(<TopicFormModal {...defaultProps} isOpen={false} />);
    expect(screen.queryByText("Create Topic")).not.toBeInTheDocument();
  });

  it("shows loading state when isSubmitting is true", () => {
    render(<TopicFormModal {...defaultProps} isSubmitting={true} />);
    const btn = screen.getByRole("button", { name: /Saving.../i });
    expect(btn).toBeInTheDocument();
    expect(btn).toBeDisabled();
  });
});
