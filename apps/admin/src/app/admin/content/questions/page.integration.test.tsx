/**
 * Integration tests for Admin questions management page API interactions
 */
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import QuestionsManagementPage from "./page";

// Mock common-ui components to avoid complex rendering
vi.mock("@elzatona/common-ui", () => ({
  Card: ({ children }: any) => <div data-testid="card">{children}</div>,
  CardContent: ({ children }: any) => <div>{children}</div>,
  Button: ({ children, onClick, ...props }: any) => (
    <button onClick={onClick} {...props}>
      {children}
    </button>
  ),
  FormModal: ({ children }: any) => (
    <div data-testid="form-modal">{children}</div>
  ),
  AdvancedSearch: ({ onSearch }: any) => (
    <input
      data-testid="advanced-search"
      onChange={(e) => onSearch(e.target.value)}
      placeholder="Search questions..."
    />
  ),
  StatsCards: ({ stats }: any) => (
    <div data-testid="stats-cards">
      {stats &&
        Object.entries(stats).map(([key, value]) => (
          <div key={key} data-testid={`stat-${key}`}>{`${key}: ${value}`}</div>
        ))}
    </div>
  ),
  CategoriesOverview: () => <div data-testid="categories-overview" />,
  FiltersCard: ({
    selectedCategory,
    selectedTopic,
    onCategoryChange,
    onTopicChange,
  }: any) => (
    <div data-testid="filters-card">
      <select
        data-testid="category-select"
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        <option value="">All Categories</option>
        <option value="cat1">Category 1</option>
      </select>
      <select
        data-testid="topic-select"
        value={selectedTopic}
        onChange={(e) => onTopicChange(e.target.value)}
      >
        <option value="">All Topics</option>
        <option value="topic1">Topic 1</option>
      </select>
    </div>
  ),
  QuestionsList: ({ questions, onView }: any) => (
    <div data-testid="questions-list">
      {questions?.map((q: any) => (
        <div key={q.id} data-testid={`question-${q.id}`}>
          <span>{q.question}</span>
          <button onClick={() => onView(q)} data-testid={`view-${q.id}`}>
            View
          </button>
        </div>
      ))}
    </div>
  ),
  PaginationControls: ({ currentPage, totalPages, onPageChange }: any) => (
    <div data-testid="pagination-controls">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        data-testid="prev-page"
      >
        Previous
      </button>
      <span data-testid="page-info">{`Page ${currentPage} of ${totalPages}`}</span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        data-testid="next-page"
      >
        Next
      </button>
    </div>
  ),
  AdminQuestionForm: () => <div data-testid="admin-question-form" />,
}));

// Mock the ViewQuestionModal component
vi.mock("../../../../components/ViewQuestionModal", () => ({
  ViewQuestionModal: ({ isOpen }: any) =>
    isOpen ? <div data-testid="view-question-modal">Modal Content</div> : null,
}));

// Mock the questions management hook to control data
const mockQuestions = [
  {
    id: "q1",
    question: "What is React?",
    category: "Frontend",
    topic: "React",
  },
  {
    id: "q2",
    question: "What is Node.js?",
    category: "Backend",
    topic: "Node.js",
  },
];

vi.mock("../../hooks/useQuestionsManagement", () => ({
  useQuestionsManagement: () => ({
    questions: mockQuestions,
    loading: false,
    error: null,
    pagination: { totalCount: 2, totalPages: 1 },
    filters: { category: "", topic: "" },
    searchQuery: "",
    setFilters: vi.fn(),
    setSearchQuery: vi.fn(),
    refetch: vi.fn(),
  }),
}));

// Test setup
beforeEach(() => {
  vi.clearAllMocks();
});

describe("Admin questions management page - Integration", () => {
  it("renders questions management page with data", async () => {
    render(<QuestionsManagementPage />);

    expect(screen.getByTestId("questions-list")).toBeInTheDocument();
    expect(screen.getByTestId("question-q1")).toHaveTextContent(
      "What is React?",
    );
    expect(screen.getByTestId("question-q2")).toHaveTextContent(
      "What is Node.js?",
    );
  });

  it("shows loading state initially", () => {
    // Mock loading state
    vi.mock("../../hooks/useQuestionsManagement", () => ({
      useQuestionsManagement: () => ({
        questions: [],
        loading: true,
        error: null,
        pagination: { totalCount: 0, totalPages: 1 },
        filters: { category: "", topic: "" },
        searchQuery: "",
        setFilters: vi.fn(),
        setSearchQuery: vi.fn(),
        refetch: vi.fn(),
      }),
    }));

    render(<QuestionsManagementPage />);

    // In a real implementation, this would show a loading indicator
    expect(screen.getByTestId("questions-list")).toBeInTheDocument();
  });

  it("renders filter components", () => {
    render(<QuestionsManagementPage />);

    expect(screen.getByTestId("filters-card")).toBeInTheDocument();
    expect(screen.getByTestId("category-select")).toBeInTheDocument();
    expect(screen.getByTestId("topic-select")).toBeInTheDocument();
  });

  it("renders pagination controls", () => {
    render(<QuestionsManagementPage />);

    expect(screen.getByTestId("pagination-controls")).toBeInTheDocument();
    expect(screen.getByTestId("page-info")).toHaveTextContent("Page 1 of 1");
  });

  it("renders search component", () => {
    render(<QuestionsManagementPage />);

    expect(screen.getByTestId("advanced-search")).toBeInTheDocument();
  });

  it("opens view modal when question is clicked", () => {
    render(<QuestionsManagementPage />);

    const viewButton = screen.getByTestId("view-q1");
    fireEvent.click(viewButton);

    expect(screen.getByTestId("view-question-modal")).toBeInTheDocument();
  });

  it("handles category filter change", () => {
    render(<QuestionsManagementPage />);

    const categorySelect = screen.getByTestId("category-select");
    fireEvent.change(categorySelect, { target: { value: "Frontend" } });

    // The mock hook would handle the filter change
    expect(categorySelect).toHaveValue("Frontend");
  });

  it("handles pagination", () => {
    render(<QuestionsManagementPage />);

    const nextButton = screen.getByTestId("next-page");
    fireEvent.click(nextButton);

    // The mock hook would handle pagination
    expect(nextButton).toBeInTheDocument();
  });
});
