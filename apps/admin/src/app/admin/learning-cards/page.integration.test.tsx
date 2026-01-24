/**
 * Integration tests for Admin Learning Cards page
 */
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import LearningCardsPage from "./page";

// Mock the common-ui components
vi.mock("@elzatona/common-ui", () => ({
  AdminNavbar: () => <div data-testid="admin-navbar">Admin Navbar</div>,
  LearningCardsManager: ({
    cards,
    onCreateCard,
    onEditCard,
    onDeleteCard,
  }: any) => (
    <div data-testid="learning-cards-manager">
      {cards.map((card: any) => (
        <div key={card.id} data-testid={`card-${card.id}`}>
          <h3>{card.title}</h3>
          <button
            onClick={() => onEditCard(card)}
            data-testid={`edit-${card.id}`}
          >
            Edit
          </button>
          <button
            onClick={() => onDeleteCard(card)}
            data-testid={`delete-${card.id}`}
          >
            Delete
          </button>
        </div>
      ))}
      <button onClick={onCreateCard} data-testid="create-card-btn">
        Create Card
      </button>
    </div>
  ),
  DeleteConfirmationModal: ({ isOpen, onConfirm, onCancel, itemName }: any) =>
    isOpen ? (
      <div data-testid="delete-modal">
        <p>Delete {itemName}?</p>
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
  default: ({ isOpen, onClose, onSubmit, editingCard }: any) =>
    isOpen ? (
      <div data-testid="card-form-modal">
        <h2>{editingCard ? "Edit Card" : "Create Card"}</h2>
        <button onClick={onClose} data-testid="close-form">
          Close
        </button>
        <button
          onClick={() =>
            onSubmit({
              title: editingCard ? "Updated Card" : "New Card",
              category: "test",
              topic: "test",
              question: "test",
            })
          }
          data-testid="submit-form"
        >
          {editingCard ? "Update" : "Create"}
        </button>
      </div>
    ) : null,
}));

// Mock the hook
vi.mock("./hooks/useLearningCards", () => ({
  useLearningCards: () => ({
    cards: [
      {
        id: "1",
        title: "Test Card 1",
        category: "test",
        topic: "test",
        question: "test",
      },
      {
        id: "2",
        title: "Test Card 2",
        category: "test",
        topic: "test",
        question: "test",
      },
    ],
    categories: ["test"],
    topics: ["test"],
    questions: ["test"],
    stats: { total: 2, categories: 1, topics: 1 },
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
  }),
}));

describe("Learning Cards Page - Integration", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the learning cards page with cards", () => {
    render(<LearningCardsPage />);

    expect(screen.getByTestId("admin-navbar")).toBeInTheDocument();
    expect(screen.getByTestId("learning-cards-manager")).toBeInTheDocument();
    expect(screen.getByText("Test Card 1")).toBeInTheDocument();
    expect(screen.getByText("Test Card 2")).toBeInTheDocument();
  });

  it("displays card actions", () => {
    render(<LearningCardsPage />);

    expect(screen.getByTestId("edit-1")).toBeInTheDocument();
    expect(screen.getByTestId("delete-1")).toBeInTheDocument();
    expect(screen.getByTestId("edit-2")).toBeInTheDocument();
    expect(screen.getByTestId("delete-2")).toBeInTheDocument();
    expect(screen.getByTestId("create-card-btn")).toBeInTheDocument();
  });

  it("handles card creation flow", async () => {
    const mockCreateCard = vi.fn().mockResolvedValue(true);
    vi.mocked(
      require("./hooks/useLearningCards").useLearningCards,
    ).mockReturnValue({
      cards: [],
      categories: [],
      topics: [],
      questions: [],
      stats: { total: 0, categories: 0, topics: 0 },
      loading: false,
      error: null,
      expandedCards: new Set(),
      toggleCard: vi.fn(),
      expandedCategories: new Set(),
      toggleCategory: vi.fn(),
      expandedTopics: new Set(),
      toggleTopic: vi.fn(),
      createCard: mockCreateCard,
      updateCard: vi.fn(),
      deleteCard: vi.fn(),
    });

    render(<LearningCardsPage />);

    // Click create button
    const createButton = screen.getByTestId("create-card-btn");
    fireEvent.click(createButton);

    // Modal should open
    expect(screen.getByTestId("card-form-modal")).toBeInTheDocument();
    expect(screen.getByText("Create Card")).toBeInTheDocument();

    // Submit form
    const submitButton = screen.getByTestId("submit-form");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockCreateCard).toHaveBeenCalledWith({
        title: "New Card",
        category: "test",
        topic: "test",
        question: "test",
      });
    });
  });

  it("handles card editing flow", async () => {
    const mockUpdateCard = vi.fn().mockResolvedValue(true);
    vi.mocked(
      require("./hooks/useLearningCards").useLearningCards,
    ).mockReturnValue({
      cards: [
        {
          id: "1",
          title: "Test Card",
          category: "test",
          topic: "test",
          question: "test",
        },
      ],
      categories: [],
      topics: [],
      questions: [],
      stats: { total: 1, categories: 0, topics: 0 },
      loading: false,
      error: null,
      expandedCards: new Set(),
      toggleCard: vi.fn(),
      expandedCategories: new Set(),
      toggleCategory: vi.fn(),
      expandedTopics: new Set(),
      toggleTopic: vi.fn(),
      createCard: vi.fn(),
      updateCard: mockUpdateCard,
      deleteCard: vi.fn(),
    });

    render(<LearningCardsPage />);

    // Click edit button
    const editButton = screen.getByTestId("edit-1");
    fireEvent.click(editButton);

    // Modal should open
    expect(screen.getByTestId("card-form-modal")).toBeInTheDocument();
    expect(screen.getByText("Edit Card")).toBeInTheDocument();

    // Submit form
    const submitButton = screen.getByTestId("submit-form");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockUpdateCard).toHaveBeenCalledWith("1", {
        title: "Updated Card",
        category: "test",
        topic: "test",
        question: "test",
      });
    });
  });

  it("handles card deletion flow", async () => {
    const mockDeleteCard = vi.fn().mockResolvedValue(true);
    vi.mocked(
      require("./hooks/useLearningCards").useLearningCards,
    ).mockReturnValue({
      cards: [
        {
          id: "1",
          title: "Test Card",
          category: "test",
          topic: "test",
          question: "test",
        },
      ],
      categories: [],
      topics: [],
      questions: [],
      stats: { total: 1, categories: 0, topics: 0 },
      loading: false,
      error: null,
      expandedCards: new Set(),
      toggleCard: vi.fn(),
      expandedCategories: new Set(),
      toggleCategory: vi.fn(),
      expandedTopics: new Set(),
      toggleTopic: vi.fn(),
      createCard: vi.fn(),
      updateCard: vi.fn(),
      deleteCard: mockDeleteCard,
    });

    render(<LearningCardsPage />);

    // Click delete button
    const deleteButton = screen.getByTestId("delete-1");
    fireEvent.click(deleteButton);

    // Modal should open
    expect(screen.getByTestId("delete-modal")).toBeInTheDocument();
    expect(screen.getByText("Delete Test Card?")).toBeInTheDocument();

    // Confirm deletion
    const confirmButton = screen.getByTestId("confirm-delete");
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(mockDeleteCard).toHaveBeenCalledWith("1");
    });
  });

  it("closes modals when cancel is clicked", () => {
    render(<LearningCardsPage />);

    // Open create modal
    const createButton = screen.getByTestId("create-card-btn");
    fireEvent.click(createButton);
    expect(screen.getByTestId("card-form-modal")).toBeInTheDocument();

    // Close modal
    const closeButton = screen.getByTestId("close-form");
    fireEvent.click(closeButton);
    expect(screen.queryByTestId("card-form-modal")).not.toBeInTheDocument();

    // Open delete modal
    const deleteButton = screen.getByTestId("delete-1");
    fireEvent.click(deleteButton);
    expect(screen.getByTestId("delete-modal")).toBeInTheDocument();

    // Cancel deletion
    const cancelButton = screen.getByTestId("cancel-delete");
    fireEvent.click(cancelButton);
    expect(screen.queryByTestId("delete-modal")).not.toBeInTheDocument();
  });

  it("shows loading state", () => {
    vi.mocked(
      require("./hooks/useLearningCards").useLearningCards,
    ).mockReturnValue({
      cards: [],
      categories: [],
      topics: [],
      questions: [],
      stats: { total: 0, categories: 0, topics: 0 },
      loading: true,
      error: null,
      expandedCards: new Set(),
      toggleCard: vi.fn(),
      expandedCategories: new Set(),
      toggleCategory: vi.fn(),
      expandedTopics: new Set(),
      toggleTopic: vi.fn(),
      createCard: vi.fn(),
      updateCard: vi.fn(),
      deleteCard: vi.fn(),
    });

    render(<LearningCardsPage />);

    const spinner = document.querySelector(".animate-spin");
    expect(spinner).toBeInTheDocument();
  });

  it("displays error messages", () => {
    vi.mocked(
      require("./hooks/useLearningCards").useLearningCards,
    ).mockReturnValue({
      cards: [],
      categories: [],
      topics: [],
      questions: [],
      stats: { total: 0, categories: 0, topics: 0 },
      loading: false,
      error: "Failed to load cards",
      expandedCards: new Set(),
      toggleCard: vi.fn(),
      expandedCategories: new Set(),
      toggleCategory: vi.fn(),
      expandedTopics: new Set(),
      toggleTopic: vi.fn(),
      createCard: vi.fn(),
      updateCard: vi.fn(),
      deleteCard: vi.fn(),
    });

    render(<LearningCardsPage />);

    expect(screen.getByText("Failed to load cards")).toBeInTheDocument();
  });
});
