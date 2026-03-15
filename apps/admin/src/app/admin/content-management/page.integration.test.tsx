/**
 * Integration tests for Admin content management page API interactions
 */
import { render, screen, fireEvent } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import ContentManagementPage from "./page";

// Mock the content management hook
const mockUseContentManagement = vi.fn();
vi.mock("./hooks/useContentManagement", () => ({
  useContentManagement: () => mockUseContentManagement(),
}));

// Mock common-ui components to avoid complex rendering
vi.mock("@elzatona/common-ui", () => ({
  Button: ({ children, onClick, ...props }: any) => (
    <button onClick={onClick} {...props}>
      {children}
    </button>
  ),
  StatsSection: ({ stats }: any) => (
    <div data-testid="stats-section">
      {stats &&
        Object.entries(stats).map(([key, value]) => (
          <div key={key} data-testid={`stat-${key}`}>{`${key}: ${value}`}</div>
        ))}
    </div>
  ),
  SearchAndFilters: ({
    searchTerm,
    onSearchChange,
    filterCardType,
    onFilterChange,
  }: any) => (
    <div data-testid="search-filters">
      <input
        data-testid="search-input"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search..."
      />
      <select
        data-testid="filter-select"
        value={filterCardType}
        onChange={(e) => onFilterChange(e.target.value)}
      >
        <option value="all">All</option>
        <option value="flashcard">Flashcard</option>
      </select>
    </div>
  ),
  LearningCardsManager: () => <div data-testid="learning-cards-manager" />,
  PlansManager: () => <div data-testid="plans-manager" />,
  TopicsManager: () => <div data-testid="topics-manager" />,
  CategoriesManager: () => <div data-testid="categories-manager" />,
  TopicQuestionsModal: () => <div data-testid="topic-questions-modal" />,
  DeleteConfirmationModal: () => (
    <div data-testid="delete-confirmation-modal" />
  ),
  CardManagementModal: () => <div data-testid="card-management-modal" />,
}));

describe("Admin content management page - Integration", () => {
  beforeEach(() => {
    mockUseContentManagement.mockReturnValue({
      loading: false,
      error: null,
      searchTerm: "",
      setSearchTerm: vi.fn(),
      filterCardType: "all",
      setFilterCardType: vi.fn(),
      stats: {
        totalCards: 25,
        totalPlans: 5,
        totalCategories: 8,
        totalTopics: 15,
      },
      filteredCards: [],
      filteredPlans: [],
      categories: [],
      topics: [],
      questions: [],
      // planQuestions present above; avoid duplicate property
      expandedCards: new Set(),
      toggleCard: vi.fn(),
      expandedCategories: new Set(),
      toggleCategory: vi.fn(),
      expandedTopics: new Set(),
      toggleTopic: vi.fn(),
      expandedPlans: new Set(),
      togglePlan: vi.fn(),
      expandedPlanCards: new Set(),
      togglePlanCard: vi.fn(),
      expandedPlanCategories: new Set(),
      togglePlanCategory: vi.fn(),
      expandedPlanTopics: new Set(),
      togglePlanTopic: vi.fn(),
      isTopicQuestionsModalOpen: false,
      setIsTopicQuestionsModalOpen: vi.fn(),
      selectedTopic: null,
      setSelectedTopic: vi.fn(),
      isDeleteModalOpen: false,
      setIsDeleteModalOpen: vi.fn(),
      itemToDelete: null,
      setItemToDelete: vi.fn(),
      handleDelete: vi.fn(),
      isCardManagementModalOpen: false,
      setIsCardManagementModalOpen: vi.fn(),
      selectedCard: null,
      setSelectedCard: vi.fn(),
      availableCards: [],
      isManagingCards: false,
      setIsManagingCards: vi.fn(),
      planQuestions: new Set(),
    });
  });

  it("renders content management page with stats", () => {
    render(<ContentManagementPage />);

    expect(screen.getByTestId("stats-section")).toBeInTheDocument();
    expect(screen.getByTestId("stat-totalCards")).toHaveTextContent(
      "totalCards: 25",
    );
    expect(screen.getByTestId("stat-totalPlans")).toHaveTextContent(
      "totalPlans: 5",
    );
  });

  it("renders search and filter components", () => {
    render(<ContentManagementPage />);

    expect(screen.getByTestId("search-filters")).toBeInTheDocument();
    expect(screen.getByTestId("search-input")).toBeInTheDocument();
    expect(screen.getByTestId("filter-select")).toBeInTheDocument();
  });

  it("renders all management sections", () => {
    render(<ContentManagementPage />);

    expect(screen.getByTestId("learning-cards-manager")).toBeInTheDocument();
    expect(screen.getByTestId("plans-manager")).toBeInTheDocument();
    expect(screen.getByTestId("topics-manager")).toBeInTheDocument();
    expect(screen.getByTestId("categories-manager")).toBeInTheDocument();
  });

  it("shows loading state", () => {
    mockUseContentManagement.mockReturnValue({
      ...mockUseContentManagement(),
      loading: true,
    });

    render(<ContentManagementPage />);

    expect(screen.getByRole("status")).toBeInTheDocument(); // Loader2 component
  });

  it("displays error message when error occurs", () => {
    mockUseContentManagement.mockReturnValue({
      ...mockUseContentManagement(),
      error: "Failed to load content data",
    });

    render(<ContentManagementPage />);

    expect(screen.getByText("Failed to load content data")).toBeInTheDocument();
  });

  it("search functionality updates search term", () => {
    const mockSetSearchTerm = vi.fn();
    mockUseContentManagement.mockReturnValue({
      ...mockUseContentManagement(),
      setSearchTerm: mockSetSearchTerm,
    });

    render(<ContentManagementPage />);

    const searchInput = screen.getByTestId("search-input");
    fireEvent.change(searchInput, { target: { value: "test search" } });

    expect(mockSetSearchTerm).toHaveBeenCalledWith("test search");
  });

  it("filter functionality updates filter type", () => {
    const mockSetFilterCardType = vi.fn();
    mockUseContentManagement.mockReturnValue({
      ...mockUseContentManagement(),
      setFilterCardType: mockSetFilterCardType,
    });

    render(<ContentManagementPage />);

    const filterSelect = screen.getByTestId("filter-select");
    fireEvent.change(filterSelect, { target: { value: "flashcard" } });

    expect(mockSetFilterCardType).toHaveBeenCalledWith("flashcard");
  });

  it("renders modal components when open", () => {
    mockUseContentManagement.mockReturnValue({
      ...mockUseContentManagement(),
      isTopicQuestionsModalOpen: true,
      isDeleteModalOpen: true,
      isCardManagementModalOpen: true,
    });

    render(<ContentManagementPage />);

    expect(screen.getByTestId("topic-questions-modal")).toBeInTheDocument();
    expect(screen.getByTestId("delete-confirmation-modal")).toBeInTheDocument();
    expect(screen.getByTestId("card-management-modal")).toBeInTheDocument();
  });
});
