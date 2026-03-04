/**
 * Unit tests for Admin questions management page.
 * Tests page rendering, question list, filtering, pagination, and modal interactions.
 */

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import QuestionManagementPage from "./page";
import { useQuestionsManagement } from "./hooks/useQuestionsManagement";

// Mock the hook first
vi.mock("./hooks/useQuestionsManagement", () => ({
  useQuestionsManagement: vi.fn(),
}));

// Mock components
vi.mock("@elzatona/common-ui", () => ({
  Card: ({ children, className }: any) => (
    <div data-testid="card" className={className}>
      {children}
    </div>
  ),
  CardContent: ({ children, className }: any) => (
    <div data-testid="card-content" className={className}>
      {children}
    </div>
  ),
  Button: ({ children, ...props }: any) => (
    <button {...props}>{children}</button>
  ),
  FormModal: ({ isOpen, children }: any) =>
    isOpen ? <div data-testid="form-modal">{children}</div> : null,
  AdvancedSearch: ({ onSearch, onResultsChange }: any) => (
    <div data-testid="advanced-search">
      <input
        data-testid="search-input"
        onChange={(e) => {
          if (onSearch) onSearch(e.target.value);
          if (onResultsChange) onResultsChange([]);
        }}
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
  CategoriesOverview: ({ categoryCounts }: any) => (
    <div data-testid="categories-overview">
      {!categoryCounts || categoryCounts.length === 0
        ? "No categories"
        : "Categories loaded"}
    </div>
  ),
  FiltersCard: ({
    selectedCategory,
    selectedTopic,
    onCategoryChange,
    onTopicChange,
  }: any) => (
    <div data-testid="filters-card">
      <select
        data-testid="category-filter"
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        <option value="">All Categories</option>
        <option value="programming">Programming</option>
      </select>
      <select
        data-testid="topic-filter"
        value={selectedTopic}
        onChange={(e) => onTopicChange(e.target.value)}
      >
        <option value="">All Topics</option>
        <option value="react">React</option>
      </select>
    </div>
  ),
  QuestionsList: ({ questions, onView, onEdit, onDelete, onCreate }: any) => (
    <div data-testid="questions-list">
      {onCreate && <button onClick={onCreate}>Create Question</button>}
      {questions && questions.length > 0
        ? questions.map((q: any) => (
            <div key={q.id} data-testid={`question-${q.id}`}>
              <span>{q.title}</span>
              <button data-testid={`view-${q.id}`} onClick={() => onView(q)}>
                View
              </button>
              <button data-testid={`edit-${q.id}`} onClick={() => onEdit(q)}>
                Edit
              </button>
              <button
                data-testid={`delete-${q.id}`}
                onClick={() => onDelete(q)}
              >
                Delete
              </button>
            </div>
          ))
        : "No questions"}
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
        <button data-testid="close-modal" onClick={onClose}>
          Close
        </button>
      </div>
    ) : null,
}));

describe("QuestionManagementPage", () => {
  const createMockHookReturn = () => ({
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
    topicsData: [],
    categoriesData: [],
    categoryCounts: [{}],
    selectedQuestion: null,
    isViewModalOpen: false,
    isQuestionModalOpen: false,
    isEditMode: false,
    setCurrentPage: vi.fn(),
    setPageSize: vi.fn(),
    setSelectedCategory: vi.fn(),
    setSelectedTopic: vi.fn(),
    setQuestions: vi.fn(),
    handleCreateOrUpdate: vi.fn(),
    handleDelete: vi.fn(),
    openViewModal: vi.fn(),
    openEditModal: vi.fn(),
    openCreateModal: vi.fn(),
    closeModals: vi.fn(),
    clearFilters: vi.fn(),
    handleSearch: vi.fn(),
    refresh: vi.fn(),
  });

  let currentMockReturn: any;

  beforeEach(() => {
    vi.clearAllMocks();
    currentMockReturn = createMockHookReturn();
    vi.mocked(useQuestionsManagement).mockImplementation(
      () => currentMockReturn,
    );
  });

  describe("Loading state", () => {
    it("should show loading spinner when loading", () => {
      currentMockReturn.loading = true;
      render(<QuestionManagementPage />);
      expect(screen.getByText("Loading questions...")).toBeInTheDocument();
    });
  });

  describe("Error state", () => {
    it("should display error message when error occurs", () => {
      currentMockReturn.error = { message: "Test error" };
      render(<QuestionManagementPage />);
      expect(
        screen.getByText(/Failed to load questions: Test error/i),
      ).toBeInTheDocument();
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
      expect(screen.getByTestId("question-1")).toHaveTextContent(
        "What is React?",
      );
      expect(screen.getByTestId("question-2")).toHaveTextContent(
        "How does useState work?",
      );
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
    it("should render search input", () => {
      render(<QuestionManagementPage />);
      expect(screen.getByTestId("search-input")).toBeInTheDocument();
    });
  });

  describe("Filtering", () => {
    it("should call setSelectedCategory when category filter changes", () => {
      render(<QuestionManagementPage />);
      const categoryFilter = screen.getByTestId("category-filter");
      fireEvent.change(categoryFilter, { target: { value: "programming" } });
      expect(currentMockReturn.setSelectedCategory).toHaveBeenCalledWith(
        "programming",
      );
    });

    it("should call setSelectedTopic when topic filter changes", () => {
      render(<QuestionManagementPage />);
      const topicFilter = screen.getByTestId("topic-filter");
      fireEvent.change(topicFilter, { target: { value: "react" } });
      expect(currentMockReturn.setSelectedTopic).toHaveBeenCalledWith("react");
    });
  });

  describe("Question actions", () => {
    it("should call openViewModal when view button is clicked", () => {
      render(<QuestionManagementPage />);
      fireEvent.click(screen.getByTestId("view-1"));
      expect(currentMockReturn.openViewModal).toHaveBeenCalledWith(
        currentMockReturn.questions[0],
      );
    });

    it("should call openEditModal when edit button is clicked", () => {
      render(<QuestionManagementPage />);
      fireEvent.click(screen.getByTestId("edit-1"));
      expect(currentMockReturn.openEditModal).toHaveBeenCalledWith(
        currentMockReturn.questions[0],
      );
    });

    it("should call handleDelete when delete button is clicked", () => {
      render(<QuestionManagementPage />);
      fireEvent.click(screen.getByTestId("delete-1"));
      expect(currentMockReturn.handleDelete).toHaveBeenCalledWith(
        currentMockReturn.questions[0],
      );
    });
  });

  describe("Pagination", () => {
    it("should call setCurrentPage when next page button is clicked", () => {
      render(<QuestionManagementPage />);
      fireEvent.click(screen.getByTestId("next-page"));
      expect(currentMockReturn.setCurrentPage).toHaveBeenCalledWith(2);
    });

    it("should call setCurrentPage when previous page button is clicked", () => {
      currentMockReturn.currentPage = 2;
      render(<QuestionManagementPage />);
      fireEvent.click(screen.getByTestId("prev-page"));
      expect(currentMockReturn.setCurrentPage).toHaveBeenCalledWith(1);
    });
  });

  describe("Modals", () => {
    it("should render view question modal when isViewModalOpen is true", () => {
      currentMockReturn.isViewModalOpen = true;
      currentMockReturn.selectedQuestion = { id: "1", title: "Test Question" };
      render(<QuestionManagementPage />);
      expect(screen.getByTestId("view-question-modal")).toBeInTheDocument();
      expect(screen.getByTestId("modal-question-title")).toHaveTextContent(
        "Test Question",
      );
    });

    it("should render form modal when isQuestionModalOpen is true", () => {
      currentMockReturn.isQuestionModalOpen = true;
      render(<QuestionManagementPage />);
      expect(screen.getByTestId("form-modal")).toBeInTheDocument();
    });

    it("should call closeModals when modal close button is clicked", () => {
      currentMockReturn.isViewModalOpen = true;
      currentMockReturn.selectedQuestion = { id: "1", title: "Test Question" };
      render(<QuestionManagementPage />);
      fireEvent.click(screen.getByTestId("close-modal"));
      expect(currentMockReturn.closeModals).toHaveBeenCalled();
    });
  });

  describe("Empty states", () => {
    it("should show empty state when no questions", () => {
      currentMockReturn.questions = [];
      render(<QuestionManagementPage />);
      expect(screen.getByTestId("questions-list")).toHaveTextContent(
        /No questions/i,
      );
    });

    it("should show empty state when no categories", () => {
      currentMockReturn.categoryCounts = [];
      render(<QuestionManagementPage />);
      expect(screen.getByTestId("categories-overview")).toHaveTextContent(
        "No categories",
      );
    });
  });
});
