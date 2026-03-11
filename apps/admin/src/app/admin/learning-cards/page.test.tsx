/**
 * Unit tests for Admin Learning Cards page
 */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import LearningCardsPage from "./page";
import * as useLearningCardsModule from "./hooks/useLearningCards";

// Mock the common-ui components
vi.mock("@elzatona/common-ui", () => ({
  AdminNavbar: () => <div data-testid="admin-navbar">Admin Navbar</div>,
  LearningCardsManager: ({ onCreateCard, onEditCard, onDeleteCard }: any) => (
    <div data-testid="learning-cards-manager">
      <button onClick={onCreateCard} data-testid="create-card-btn">
        Create Card
      </button>
      <button
        onClick={() => onEditCard({ id: "1", title: "Test Card" })}
        data-testid="edit-card-btn"
      >
        Edit Card
      </button>
      <button
        onClick={() => onDeleteCard({ id: "1", title: "Test Card" })}
        data-testid="delete-card-btn"
      >
        Delete Card
      </button>
    </div>
  ),
  DeleteConfirmationModal: ({ isOpen, onConfirm, onCancel }: any) =>
    isOpen ? (
      <div data-testid="delete-modal">
        <button onClick={onConfirm} data-testid="confirm-delete">
          Confirm
        </button>
        <button onClick={onCancel} data-testid="cancel-delete">
          Cancel
        </button>
      </div>
    ) : null,
}));

// Mock the custom components
vi.mock("./components/CardFormModal", () => ({
  default: ({ isOpen, onClose, onSubmit }: any) =>
    isOpen ? (
      <div data-testid="card-form-modal">
        <button onClick={onClose} data-testid="close-form">
          Close
        </button>
        <button
          onClick={() => onSubmit({ title: "New Card" })}
          data-testid="submit-form"
        >
          Submit
        </button>
      </div>
    ) : null,
}));

// Create a dynamic mock function for the hook
const mockUseLearningCards = vi.fn();

// Mock the hook
vi.mock("./hooks/useLearningCards", () => ({
  useLearningCards: () => mockUseLearningCards(),
}));

const defaultMockData = {
  cards: [
    {
      id: "1",
      title: "Test Card",
      category: "test",
      topic: "test",
      question: "test",
    },
  ],
  categories: ["test"],
  topics: ["test"],
  questions: ["test"],
  stats: { total: 1, categories: 1, topics: 1 },
  loading: false,
  error: null,
  expandedCards: new Set(),
  toggleCard: vi.fn(),
  expandedCategories: new Set(),
  toggleCategory: vi.fn(),
  expandedTopics: new Set(),
  toggleTopic: vi.fn(),
  createCard: vi.fn().mockResolvedValue(true),
  updateCard: vi.fn().mockResolvedValue(true),
  deleteCard: vi.fn().mockResolvedValue(true),
};

describe("Learning Cards Page - Unit", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the learning cards page correctly", () => {
    mockUseLearningCards.mockReturnValue(defaultMockData);
    render(<LearningCardsPage />);

    expect(screen.getByTestId("admin-navbar")).toBeInTheDocument();
    expect(screen.getByTestId("learning-cards-manager")).toBeInTheDocument();
  });

  it("opens create card modal when create button is clicked", () => {
    mockUseLearningCards.mockReturnValue(defaultMockData);
    render(<LearningCardsPage />);

    const createButton = screen.getByTestId("create-card-btn");
    fireEvent.click(createButton);

    expect(screen.getByTestId("card-form-modal")).toBeInTheDocument();
  });

  it("opens edit card modal when edit button is clicked", () => {
    mockUseLearningCards.mockReturnValue(defaultMockData);
    render(<LearningCardsPage />);

    const editButton = screen.getByTestId("edit-card-btn");
    fireEvent.click(editButton);

    expect(screen.getByTestId("card-form-modal")).toBeInTheDocument();
  });

  it("opens delete confirmation modal when delete button is clicked", () => {
    mockUseLearningCards.mockReturnValue(defaultMockData);
    render(<LearningCardsPage />);

    const deleteButton = screen.getByTestId("delete-card-btn");
    fireEvent.click(deleteButton);

    expect(screen.getByTestId("delete-modal")).toBeInTheDocument();
  });

  it("handles form submission for creating a card", async () => {
    const mockCreateCard = vi.fn().mockResolvedValue(true);
    mockUseLearningCards.mockReturnValue({
      ...defaultMockData,
      cards: [],
      createCard: mockCreateCard,
    });

    render(<LearningCardsPage />);

    // Open create modal
    const createButton = screen.getByTestId("create-card-btn");
    fireEvent.click(createButton);

    // Submit form
    const submitButton = screen.getByTestId("submit-form");
    fireEvent.click(submitButton);

    expect(mockCreateCard).toHaveBeenCalledWith({ title: "New Card" });
  });

  it("handles form submission for updating a card", async () => {
    const mockUpdateCard = vi.fn().mockResolvedValue(true);
    mockUseLearningCards.mockReturnValue({
      ...defaultMockData,
      updateCard: mockUpdateCard,
    });

    render(<LearningCardsPage />);

    // Open edit modal
    const editButton = screen.getByTestId("edit-card-btn");
    fireEvent.click(editButton);

    // Submit form
    const submitButton = screen.getByTestId("submit-form");
    fireEvent.click(submitButton);

    expect(mockUpdateCard).toHaveBeenCalledWith("1", { title: "New Card" });
  });

  it("handles card deletion", async () => {
    const mockDeleteCard = vi.fn().mockResolvedValue(true);
    mockUseLearningCards.mockReturnValue({
      ...defaultMockData,
      deleteCard: mockDeleteCard,
    });

    render(<LearningCardsPage />);

    // Open delete modal
    const deleteButton = screen.getByTestId("delete-card-btn");
    fireEvent.click(deleteButton);

    // Confirm deletion
    const confirmButton = screen.getByTestId("confirm-delete");
    fireEvent.click(confirmButton);

    expect(mockDeleteCard).toHaveBeenCalledWith("1");
  });

  it("shows loading spinner when loading", () => {
    mockUseLearningCards.mockReturnValue({
      ...defaultMockData,
      cards: [],
      loading: true,
    });

    render(<LearningCardsPage />);

    expect(screen.getByTestId("admin-navbar")).toBeInTheDocument();
    // Loading spinner should be present
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("displays error message when there is an error", () => {
    mockUseLearningCards.mockReturnValue({
      ...defaultMockData,
      error: "Test error message",
    });

    render(<LearningCardsPage />);

    expect(screen.getByText("Test error message")).toBeInTheDocument();
  });
});
