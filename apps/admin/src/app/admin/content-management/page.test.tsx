/**
 * Unit tests for Admin content management page.
 * Tests page rendering, data display, search, filtering, and interactions.
 */

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import ContentManagementPage from "./page";
import "@testing-library/jest-dom";
import { useContentManagement } from "./hooks/useContentManagement";

const mockRouterPush = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockRouterPush,
  }),
}));

// Mock the hook
vi.mock("./hooks/useContentManagement", () => ({
  useContentManagement: vi.fn(),
}));

// Mock common-ui components
vi.mock("@elzatona/common-ui", () => ({
  Button: ({ children, ...props }: any) => (
    <button {...props}>{children}</button>
  ),
  StatsSection: ({ stats }: any) => (
    <div data-testid="stats-section">
      <div data-testid="stats-cards">{stats?.cards || 0}</div>
      <div data-testid="stats-plans">{stats?.plans || 0}</div>
      <div data-testid="stats-categories">{stats?.categories || 0}</div>
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
        <option value="problem">Problem</option>
      </select>
    </div>
  ),
  LearningCardsManager: ({ cards, onCardUpdate, onCardDelete }: any) => (
    <div data-testid="cards-manager">
      {cards && cards.length > 0
        ? cards.map((card: any) => (
            <div key={card.id} data-testid={`card-${card.id}`}>
              {card.title}
            </div>
          ))
        : "No cards"}
    </div>
  ),
  PlansManager: ({ plans, onPlanUpdate, onPlanDelete }: any) => (
    <div data-testid="plans-manager">
      {plans && plans.length > 0
        ? plans.map((plan: any) => (
            <div key={plan.id} data-testid={`plan-${plan.id}`}>
              {plan.title}
            </div>
          ))
        : "No plans"}
    </div>
  ),
  TopicsManager: ({ topics, onTopicUpdate, onTopicDelete }: any) => (
    <div data-testid="topics-manager">
      {topics?.map((topic: any) => (
        <div key={topic.id} data-testid={`topic-${topic.id}`}>
          {topic.title}
        </div>
      )) || "No topics"}
    </div>
  ),
  CategoriesManager: ({
    categories,
    onCategoryUpdate,
    onCategoryDelete,
  }: any) => (
    <div data-testid="categories-manager">
      {categories?.map((category: any) => (
        <div key={category.id} data-testid={`category-${category.id}`}>
          {category.title}
        </div>
      )) || "No categories"}
    </div>
  ),
  TopicQuestionsModal: () => <div data-testid="topic-questions-modal" />,
  DeleteConfirmationModal: () => (
    <div data-testid="delete-confirmation-modal" />
  ),
  CardManagementModal: () => <div data-testid="card-management-modal" />,
}));

describe("ContentManagementPage", () => {
  const mockHookReturn = {
    loading: false,
    error: null,
    searchTerm: "",
    setSearchTerm: vi.fn(),
    filterCardType: "all",
    setFilterCardType: vi.fn(),
    stats: {
      cards: 25,
      plans: 8,
      categories: 12,
    },
    filteredCards: [
      { id: "1", title: "React Basics" },
      { id: "2", title: "JavaScript Fundamentals" },
    ],
    filteredPlans: [{ id: "1", title: "Frontend Development" }],
    categories: [{ id: "1", title: "Programming" }],
    topics: [{ id: "1", title: "React" }],
    questions: [],
    expandedCards: new Set(),
    expandedCategories: new Set(),
    expandedTopics: new Set(),
    expandedPlans: new Set(),
    expandedPlanCards: new Set(),
    expandedPlanCategories: new Set(),
    expandedPlanTopics: new Set(),
    isTopicQuestionsModalOpen: false,
    setIsTopicQuestionsModalOpen: vi.fn(),
    selectedTopic: null,
    selectedPlan: null,
    selectedQuestions: new Set(),
    toggleQuestionSelection: vi.fn(),
    selectAllQuestions: vi.fn(),
    deselectAllQuestions: vi.fn(),
    addSelectedQuestionsToPlan: vi.fn(),
    closeTopicQuestionsModal: vi.fn(),
    isDeleteCardModalOpen: false,
    setIsDeleteCardModalOpen: vi.fn(),
    cardToDelete: null,
    isDeleting: false,
    openDeleteCardModal: vi.fn(),
    closeDeleteCardModal: vi.fn(),
    deleteCard: vi.fn(),
    isCardManagementModalOpen: false,
    setIsCardManagementModalOpen: vi.fn(),
    selectedPlanForCards: null,
    planCards: [],
    availableCards: [],
    isManagingCards: false,
    openCardManagementModal: vi.fn(),
    closeCardManagementModal: vi.fn(),
    addCardToPlan: vi.fn(),
    removeCardFromPlan: vi.fn(),
    toggleCardActiveStatus: vi.fn(),
    openTopicQuestionsModal: vi.fn(),
    createSpacedRepetitionPlans: vi.fn(),
    createCategory: vi.fn(),
    editCategory: vi.fn(),
    removeCategory: vi.fn(),
    createTopic: vi.fn(),
    editTopic: vi.fn(),
    removeTopic: vi.fn(),
    toggleCard: vi.fn(),
    toggleCategory: vi.fn(),
    toggleTopic: vi.fn(),
    togglePlan: vi.fn(),
    togglePlanCard: vi.fn(),
    togglePlanCategory: vi.fn(),
    togglePlanTopic: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useContentManagement).mockReturnValue(mockHookReturn as any);
  });

  describe("Loading state", () => {
    it("should show loading spinner when loading", () => {
      vi.mocked(useContentManagement).mockReturnValue({
        ...mockHookReturn,
        loading: true,
      } as any);

      render(<ContentManagementPage />);

      expect(
        screen.getByText("Loading content management data..."),
      ).toBeInTheDocument();
    });
  });

  describe("Error state", () => {
    it("should display error message when error occurs", () => {
      vi.mocked(useContentManagement).mockReturnValue({
        ...mockHookReturn,
        error: "Failed to load content",
      } as any);

      render(<ContentManagementPage />);

      expect(screen.getByText(/Failed to load content/)).toBeInTheDocument();
    });
  });

  describe("Page rendering", () => {
    it("should render page title", () => {
      render(<ContentManagementPage />);

      expect(
        screen.getByText(/Unified Learning Management/),
      ).toBeInTheDocument();
    });

    it("should render stats section", () => {
      render(<ContentManagementPage />);

      expect(screen.getByTestId("stats-section")).toBeInTheDocument();
      expect(screen.getByTestId("stats-cards")).toHaveTextContent("25");
      expect(screen.getByTestId("stats-plans")).toHaveTextContent("8");
      expect(screen.getByTestId("stats-categories")).toHaveTextContent("12");
    });

    it("should render search and filters", () => {
      render(<ContentManagementPage />);

      expect(screen.getByTestId("search-filters")).toBeInTheDocument();
      expect(screen.getByTestId("search-input")).toBeInTheDocument();
      expect(screen.getByTestId("filter-select")).toBeInTheDocument();
    });

    it("should render all management sections", () => {
      render(<ContentManagementPage />);

      expect(screen.getByTestId("cards-manager")).toBeInTheDocument();
      expect(screen.getByTestId("plans-manager")).toBeInTheDocument();
      expect(screen.getByTestId("topics-manager")).toBeInTheDocument();
      expect(screen.getByTestId("categories-manager")).toBeInTheDocument();
    });

    it("should render cards list", () => {
      render(<ContentManagementPage />);

      expect(screen.getByTestId("card-1")).toHaveTextContent("React Basics");
      expect(screen.getByTestId("card-2")).toHaveTextContent(
        "JavaScript Fundamentals",
      );
    });

    it("should render plans list", () => {
      render(<ContentManagementPage />);

      expect(screen.getByTestId("plan-1")).toHaveTextContent(
        "Frontend Development",
      );
    });

    it("should render categories list", () => {
      render(<ContentManagementPage />);

      expect(screen.getByTestId("category-1")).toHaveTextContent("Programming");
    });

    it("should render topics list", () => {
      render(<ContentManagementPage />);

      expect(screen.getByTestId("topic-1")).toHaveTextContent("React");
    });
  });

  describe("Search functionality", () => {
    it("should update search term when input changes", () => {
      render(<ContentManagementPage />);

      const searchInput = screen.getByTestId("search-input");
      fireEvent.change(searchInput, { target: { value: "react" } });

      expect(mockHookReturn.setSearchTerm).toHaveBeenCalledWith("react");
    });

    it("should update filter when select changes", () => {
      render(<ContentManagementPage />);

      const filterSelect = screen.getByTestId("filter-select");
      fireEvent.change(filterSelect, { target: { value: "flashcard" } });

      expect(mockHookReturn.setFilterCardType).toHaveBeenCalledWith(
        "flashcard",
      );
    });
  });

  describe("Empty states", () => {
    it("should show empty state for cards when no cards", () => {
      vi.mocked(useContentManagement).mockReturnValue({
        ...mockHookReturn,
        filteredCards: [],
      } as any);

      render(<ContentManagementPage />);

      expect(screen.getByTestId("cards-manager")).toHaveTextContent("No cards");
    });

    it("should show empty state for plans when no plans", () => {
      vi.mocked(useContentManagement).mockReturnValue({
        ...mockHookReturn,
        filteredPlans: [],
      } as any);

      render(<ContentManagementPage />);

      expect(screen.getByTestId("plans-manager")).toHaveTextContent("No plans");
    });
  });

  describe("Modal rendering", () => {
    it("should render topic questions modal when showTopicQuestionsModal is true", () => {
      vi.mocked(useContentManagement).mockReturnValue({
        ...mockHookReturn,
        isTopicQuestionsModalOpen: true,
      } as any);

      render(<ContentManagementPage />);

      expect(screen.getByTestId("topic-questions-modal")).toBeInTheDocument();
    });

    it("should render delete confirmation modal when showDeleteModal is true", () => {
      vi.mocked(useContentManagement).mockReturnValue({
        ...mockHookReturn,
        isDeleteCardModalOpen: true,
      } as any);

      render(<ContentManagementPage />);

      expect(
        screen.getByTestId("delete-confirmation-modal"),
      ).toBeInTheDocument();
    });

    it("should render card management modal when showCardModal is true", () => {
      vi.mocked(useContentManagement).mockReturnValue({
        ...mockHookReturn,
        isCardManagementModalOpen: true,
      } as any);

      render(<ContentManagementPage />);

      expect(screen.getByTestId("card-management-modal")).toBeInTheDocument();
    });
  });
});
