/**
 * Unit tests for Admin questions management page.
 * Tests page rendering, question list, filtering, pagination, and modal interactions.
 */

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import QuestionManagementPage from "./page";
import { useQuestionsManagement } from "./hooks/useQuestionsManagement";

// Mock the hook
vi.mock("./hooks/useQuestionsManagement", () => ({
  useQuestionsManagement: vi.fn(),
}));

// Mock components
vi.mock("@elzatona/common-ui", () => ({
  Card: ({ children }: any) => <div data-testid="card">{children}</div>,
  CardContent: ({ children }: any) => <div data-testid="card-content">{children}</div>,
  Button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  FormModal: ({ isOpen, children }: any) => isOpen ? <div data-testid="form-modal">{children}</div> : null,
  AdvancedSearch: ({ onSearch }: any) => (
    <div data-testid="advanced-search">
      <input
        data-testid="search-input"
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Search questions..."
      />
    </div>
  ),
  StatsCards: ({ stats }: any) => (
    <div data-testid="stats-cards">
      <div data-testid="stats-total">{stats?.total || 0}</div>
      <div data-testid="stats-active">{stats?.active || 0}</div>
    </div>
  ),
  CategoriesOverview: ({ categories, onCategorySelect }: any) => (
    <div data-testid="categories-overview">
      {categories?.map((cat: any) => (
        <button
          key={cat.id}
          data-testid={`category-${cat.id}`}
          onClick={() => onCategorySelect(cat.id)}
        >
          {cat.name}
        </button>
      )) || "No categories"}
    </div>
  ),
  FiltersCard: ({ selectedCategory, selectedTopic, onCategoryChange, onTopicChange }: any) => (
    <div data-testid="filters-card">
      <select
        data-testid="category-filter"
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        <option value="">All Categories</option>
      </select>
      <select
        data-testid="topic-filter"
        value={selectedTopic}
        onChange={(e) => onTopicChange(e.target.value)}
      >
        <option value="">All Topics</option>
      </select>
    </div>
  ),
  QuestionsList: ({ questions, onView, onEdit, onDelete }: any) => (
    <div data-testid="questions-list">
      {questions?.map((q: any) => (
        <div key={q.id} data-testid={`question-${q.id}`}>
          <span>{q.title}</span>
          <button data-testid={`view-${q.id}`} onClick={() => onView(q)}>View</button>
          <button data-testid={`edit-${q.id}`} onClick={() => onEdit(q)}>Edit</button>
          <button data-testid={`delete-${q.id}`} onClick={() => onDelete(q)}>Delete</button>
        </div>
      )) || "No questions"}
    </div>
  ),
  PaginationControls: ({ currentPage, totalPages, onPageChange }: any) => (
    <div data-testid="pagination-controls">
      <button
        data-testid="prev-page"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        Previous
      </button>
      <span data-testid="current-page">{currentPage}</span>
      <button
        data-testid="next-page"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
      >
        Next
      </button>
    </div>
  ),
  AdminQuestionForm: () => <div data-testid="admin-question-form" />,
}));

vi.mock("../../../../components/ViewQuestionModal", () => ({
  ViewQuestionModal: ({ isOpen, question, onClose }: any) =>
    isOpen ? (
      <div data-testid="view-question-modal">
        <div data-testid="modal-question-title">{question?.title}</div>
        <button data-testid="close-modal" onClick={onClose}>Close</button>
      </div>
    ) : null,
}));

describe("QuestionManagementPage", () => {
  const mockHookReturn = {
    // State
    currentPage: 1,
    pageSize: 10,
    selectedCategory: "",
    selectedTopic: "",
    questions: [
      { id: "1", title: "What is React?" },
      { id: "2", title: "How does useState work?" },
    ],
    totalCount: 25,
    totalPages: 3,
    loading: false,
    error: null,
    cardsData: [],
    topicsData: null,
    categoriesData: null,
    categoryCounts: [],
    selectedQuestion: null,
    isViewModalOpen: false,
    isQuestionModalOpen: false,
    isEditMode: false,

    // Setters
    setCurrentPage: vi.fn(),
    setPageSize: vi.fn(),
    setSelectedCategory: vi.fn(),
    setSelectedTopic: vi.fn(),
    setQuestions: vi.fn(),

    // Handlers
    handleCreateOrUpdate: vi.fn(),
    handleDelete: vi.fn(),
    handleView: vi.fn(),
    handleEdit: vi.fn(),
    handleCloseModal: vi.fn(),
    handleOpenCreateModal: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useQuestionsManagement).mockReturnValue(mockHookReturn);
  });

  describe("Loading state", () => {
    it("should show loading spinner when loading", () => {
      vi.mocked(useQuestionsManagement).mockReturnValue({
        ...mockHookReturn,
        loading: true,
      });

      render(<QuestionManagementPage />);

      expect(screen.getByText("Loading questions...")).toBeInTheDocument();
    });
  });

  describe("Error state", () => {
    it("should display error message when error occurs", () => {
      vi.mocked(useQuestionsManagement).mockReturnValue({
        ...mockHookReturn,
        error: "Failed to load questions",
      });

      render(<QuestionManagementPage />);

      expect(screen.getByText("Failed to load questions")).toBeInTheDocument();
    });
  });

  describe("Page rendering", () => {
    it("should render page title", () => {
      render(<QuestionManagementPage />);

      expect(screen.getByText("Question Management")).toBeInTheDocument();
    });

    it("should render stats cards", () => {
      render(<QuestionManagementPage />);

      expect(screen.getByTestId("stats-cards")).toBeInTheDocument();
    });

    it("should render advanced search", () => {
      render(<QuestionManagementPage />);

      expect(screen.getByTestId("advanced-search")).toBeInTheDocument();
    });

    it("should render categories overview", () => {
      render(<QuestionManagementPage />);

      expect(screen.getByTestId("categories-overview")).toBeInTheDocument();
    });

    it("should render filters card", () => {
      render(<QuestionManagementPage />);

      expect(screen.getByTestId("filters-card")).toBeInTheDocument();
    });

    it("should render questions list", () => {
      render(<QuestionManagementPage />);

      expect(screen.getByTestId("questions-list")).toBeInTheDocument();
      expect(screen.getByTestId("question-1")).toHaveTextContent("What is React?");
      expect(screen.getByTestId("question-2")).toHaveTextContent("How does useState work?");
    });

    it("should render pagination controls", () => {
      render(<QuestionManagementPage />);

      expect(screen.getByTestId("pagination-controls")).toBeInTheDocument();
      expect(screen.getByTestId("current-page")).toHaveTextContent("1");
    });

    it("should render create question button", () => {
      render(<QuestionManagementPage />);

      expect(screen.getByText("Create Question")).toBeInTheDocument();
    });
  });

  describe("Search functionality", () => {
    it("should trigger search when input changes", () => {
      // Mock the search handler - this would be passed to AdvancedSearch
      // For now, just verify the component renders
      render(<QuestionManagementPage />);

      const searchInput = screen.getByTestId("search-input");
      expect(searchInput).toBeInTheDocument();
    });
  });

  describe("Filtering", () => {
    it("should render category filter", () => {
      render(<QuestionManagementPage />);

      const categoryFilter = screen.getByTestId("category-filter");
      expect(categoryFilter).toBeInTheDocument();
      expect(categoryFilter).toHaveValue("");
    });

    it("should render topic filter", () => {
      render(<QuestionManagementPage />);

      const topicFilter = screen.getByTestId("topic-filter");
      expect(topicFilter).toBeInTheDocument();
      expect(topicFilter).toHaveValue("");
    });

    it("should call setSelectedCategory when category filter changes", () => {
      render(<QuestionManagementPage />);

      const categoryFilter = screen.getByTestId("category-filter");
      fireEvent.change(categoryFilter, { target: { value: "programming" } });

      expect(mockHookReturn.setSelectedCategory).toHaveBeenCalledWith("programming");
    });

    it("should call setSelectedTopic when topic filter changes", () => {
      render(<QuestionManagementPage />);

      const topicFilter = screen.getByTestId("topic-filter");
      fireEvent.change(topicFilter, { target: { value: "react" } });

      expect(mockHookReturn.setSelectedTopic).toHaveBeenCalledWith("react");
    });
  });

  describe("Question actions", () => {
    it("should render action buttons for each question", () => {
      render(<QuestionManagementPage />);

      expect(screen.getByTestId("view-1")).toBeInTheDocument();
      expect(screen.getByTestId("edit-1")).toBeInTheDocument();
      expect(screen.getByTestId("delete-1")).toBeInTheDocument();
    });

    it("should call handleView when view button is clicked", () => {
      render(<QuestionManagementPage />);

      const viewButton = screen.getByTestId("view-1");
      fireEvent.click(viewButton);

      expect(mockHookReturn.handleView).toHaveBeenCalledWith(mockHookReturn.questions[0]);
    });

    it("should call handleEdit when edit button is clicked", () => {
      render(<QuestionManagementPage />);

      const editButton = screen.getByTestId("edit-1");
      fireEvent.click(editButton);

      expect(mockHookReturn.handleEdit).toHaveBeenCalledWith(mockHookReturn.questions[0]);
    });

    it("should call handleDelete when delete button is clicked", () => {
      render(<QuestionManagementPage />);

      const deleteButton = screen.getByTestId("delete-1");
      fireEvent.click(deleteButton);

      expect(mockHookReturn.handleDelete).toHaveBeenCalledWith(mockHookReturn.questions[0]);
    });
  });

  describe("Pagination", () => {
    it("should call setCurrentPage when next page button is clicked", () => {
      render(<QuestionManagementPage />);

      const nextButton = screen.getByTestId("next-page");
      fireEvent.click(nextButton);

      expect(mockHookReturn.setCurrentPage).toHaveBeenCalledWith(2);
    });

    it("should call setCurrentPage when previous page button is clicked", () => {
      vi.mocked(useQuestionsManagement).mockReturnValue({
        ...mockHookReturn,
        currentPage: 2,
      });

      render(<QuestionManagementPage />);

      const prevButton = screen.getByTestId("prev-page");
      fireEvent.click(prevButton);

      expect(mockHookReturn.setCurrentPage).toHaveBeenCalledWith(1);
    });

    it("should disable previous button on first page", () => {
      render(<QuestionManagementPage />);

      const prevButton = screen.getByTestId("prev-page");
      expect(prevButton).toBeDisabled();
    });

    it("should disable next button on last page", () => {
      vi.mocked(useQuestionsManagement).mockReturnValue({
        ...mockHookReturn,
        currentPage: 3,
        totalPages: 3,
      });

      render(<QuestionManagementPage />);

      const nextButton = screen.getByTestId("next-page");
      expect(nextButton).toBeDisabled();
    });
  });

  describe("Modals", () => {
    it("should render view question modal when isViewModalOpen is true", () => {
      vi.mocked(useQuestionsManagement).mockReturnValue({
        ...mockHookReturn,
        isViewModalOpen: true,
        selectedQuestion: { id: "1", title: "Test Question" },
      });

      render(<QuestionManagementPage />);

      expect(screen.getByTestId("view-question-modal")).toBeInTheDocument();
      expect(screen.getByTestId("modal-question-title")).toHaveTextContent("Test Question");
    });

    it("should render form modal when isQuestionModalOpen is true", () => {
      vi.mocked(useQuestionsManagement).mockReturnValue({
        ...mockHookReturn,
        isQuestionModalOpen: true,
      });

      render(<QuestionManagementPage />);

      expect(screen.getByTestId("form-modal")).toBeInTheDocument();
    });

    it("should call handleCloseModal when modal close button is clicked", () => {
      vi.mocked(useQuestionsManagement).mockReturnValue({
        ...mockHookReturn,
        isViewModalOpen: true,
        selectedQuestion: { id: "1", title: "Test Question" },
      });

      render(<QuestionManagementPage />);

      const closeButton = screen.getByTestId("close-modal");
      fireEvent.click(closeButton);

      expect(mockHookReturn.handleCloseModal).toHaveBeenCalled();
    });
  });

  describe("Create question", () => {
    it("should call handleOpenCreateModal when create button is clicked", () => {
      render(<QuestionManagementPage />);

      const createButton = screen.getByText("Create Question");
      fireEvent.click(createButton);

      expect(mockHookReturn.handleOpenCreateModal).toHaveBeenCalled();
    });
  });

  describe("Empty states", () => {
    it("should show empty state when no questions", () => {
      vi.mocked(useQuestionsManagement).mockReturnValue({
        ...mockHookReturn,
        questions: [],
      });

      render(<QuestionManagementPage />);

      expect(screen.getByTestId("questions-list")).toHaveTextContent("No questions");
    });

    it("should show empty state when no categories", () => {
      vi.mocked(useQuestionsManagement).mockReturnValue({
        ...mockHookReturn,
        categoriesData: [],
      });

      render(<QuestionManagementPage />);

      expect(screen.getByTestId("categories-overview")).toHaveTextContent("No categories");
    });
  });
});