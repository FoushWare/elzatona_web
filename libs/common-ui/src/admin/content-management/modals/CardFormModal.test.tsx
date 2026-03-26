import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import { CardFormModal } from "./CardFormModal";

describe("CardFormModal", () => {
  const mockOnSubmit = vi.fn();
  const mockOnOpenChange = vi.fn();

  const defaultProps = {
    isOpen: true,
    onOpenChange: mockOnOpenChange,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    card: undefined as any,
    onSubmit: mockOnSubmit,
    isLoading: false,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders create form when card is null", () => {
    render(<CardFormModal {...defaultProps} />);
    expect(screen.getByText(/Create Learning Card/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Add a new learning card to your curriculum/i),
    ).toBeInTheDocument();
  });

  it("renders edit form when card is provided", () => {
    const card = {
      id: "card-1",
      title: "Core Technologies",
      description: "HTML, CSS, JS",
      color: "#3B82F6",
      icon: "layers",
      is_active: true,
    } as any;

    render(<CardFormModal {...defaultProps} card={card} />);
    expect(screen.getByText(/Edit Learning Card/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Update the details of this learning card/i),
    ).toBeInTheDocument();
  });

  it("does not render when isOpen is false", () => {
    render(<CardFormModal {...defaultProps} isOpen={false} />);
    expect(screen.queryByText(/Create Learning Card/i)).not.toBeInTheDocument();
  });

  it("renders the inner CardForm component", () => {
    render(<CardFormModal {...defaultProps} />);
    // CardForm renders within, check that a submit button is present
    expect(
      screen.getByRole("button", { name: /Create Card/i }),
    ).toBeInTheDocument();
  });

  it("closes modal after successful submit", async () => {
    mockOnSubmit.mockResolvedValue(undefined);
    render(<CardFormModal {...defaultProps} />);
    const titleInput = screen.getByLabelText(/Card Name/i);
    const descInput = screen.getByLabelText(/Description/i);
    fireEvent.change(titleInput, { target: { value: "New Card" } });
    fireEvent.change(descInput, { target: { value: "New Description" } });
    fireEvent.click(screen.getByRole("button", { name: /Create Card/i }));
    // onOpenChange(false) is called after submit
    // wait for mock to resolve
    await vi.waitFor(() => {
      // Given that the submit promise resolved, the modal should close
      expect(mockOnOpenChange).toHaveBeenCalledWith(false);
    });
  });
});
