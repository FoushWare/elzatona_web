/**
 * Unit Tests: Content Management Page
 * Tests for the refactored content management page component
 * v1.0
 */

import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { vi, describe, it, expect, beforeEach } from "vitest";
import UnifiedAdminPage from "./page";

// Mock all hooks
vi.mock("./hooks/useContentManagementData", () => ({
  useContentManagementData: vi.fn(() => ({
    cards: [],
    plans: [],
    categories: [],
    topics: [],
    questions: [],
    cardsData: { count: 0, data: [] },
    plansData: { count: 0, data: [] },
    categoriesData: { count: 0, data: [] },
    topicsData: { count: 0, data: [] },
    questionsData: { pagination: { totalCount: 0 }, data: [] },
    cardsLoading: false,
    plansLoading: false,
    categoriesLoading: false,
    topicsLoading: false,
    questionsLoading: false,
    cardsError: null,
    plansError: null,
    categoriesError: null,
    topicsError: null,
    questionsError: null,
    loading: false,
    hasError: false,
  })),
}));

vi.mock("./hooks/useContentManagementState", () => ({
  useContentManagementState: vi.fn(() => ({
    searchTerm: "",
    setSearchTerm: vi.fn(),
    filterCardType: "all",
    setFilterCardType: vi.fn(),
    categorySearch: "",
    setCategorySearch: vi.fn(),
    topicSearch: "",
    setTopicSearch: vi.fn(),
    selectedCategoryFilter: null,
    setSelectedCategoryFilter: vi.fn(),
    isCategoriesOpen: false,
    setIsCategoriesOpen: vi.fn(),
    isTopicsOpen: false,
    setIsTopicsOpen: vi.fn(),
    filteredCategories: [],
    filteredTopics: [],
    questionsByTopic: {},
    expandedCards: new Set(),
    expandedCategories: new Set(),
    expandedTopics: new Set(),
    toggleCard: vi.fn(),
    toggleCategory: vi.fn(),
    toggleTopic: vi.fn(),
    filteredCards: [],
    filteredPlans: [],
  })),
}));

vi.mock("./hooks/useContentManagementModals", () => ({
  useContentManagementModals: vi.fn(() => ({
    isCardModalOpen: false,
    openCardModal: vi.fn(),
    closeCardModal: vi.fn(),
    isPlanModalOpen: false,
    openPlanModal: vi.fn(),
    closePlanModal: vi.fn(),
    isCategoryModalOpen: false,
    openCategoryModal: vi.fn(),
    closeCategoryModal: vi.fn(),
    isTopicModalOpen: false,
    openTopicModal: vi.fn(),
    closeTopicModal: vi.fn(),
    isQuestionModalOpen: false,
    openQuestionModal: vi.fn(),
    closeQuestionModal: vi.fn(),
    editingCard: null,
    editingPlan: null,
    editingCategory: null,
    editingTopic: null,
    editingQuestion: null,
    cardToDelete: null,
    setCardToDelete: vi.fn(),
    planToDelete: null,
    setPlanToDelete: vi.fn(),
    categoryToDelete: null,
    setCategoryToDelete: vi.fn(),
    topicToDelete: null,
    setTopicToDelete: vi.fn(),
    questionToDelete: null,
    setQuestionToDelete: vi.fn(),
    addItemContext: null,
    setAddItemContext: vi.fn(),
    viewingQuestion: null,
    setViewingQuestion: vi.fn(),
    isViewQuestionModalOpen: false,
    setIsViewQuestionModalOpen: vi.fn(),
    selectedQuestionIds: new Set(),
    setSelectedQuestionIds: vi.fn(),
  })),
}));

vi.mock("./hooks/usePlanHierarchy", () => ({
  usePlanHierarchy: vi.fn(() => ({
    planHierarchy: {},
    loadingPlanHierarchy: {},
    expandedPlans: new Set(),
    expandedPlanCards: new Set(),
    expandedPlanCategories: new Set(),
    expandedPlanTopics: new Set(),
    fetchPlanHierarchy: vi.fn(),
    togglePlan: vi.fn(),
    togglePlanCard: vi.fn(),
    togglePlanCategory: vi.fn(),
    togglePlanTopic: vi.fn(),
  })),
}));

vi.mock("./hooks/useContentManagementActions", () => ({
  useContentManagementActions: vi.fn(() => ({
    createCardMutation: { isPending: false, mutateAsync: vi.fn() },
    updateCardMutation: { isPending: false, mutateAsync: vi.fn() },
    deleteCardMutation: { isPending: false, mutateAsync: vi.fn() },
    createPlanMutation: { isPending: false, mutateAsync: vi.fn() },
    updatePlanMutation: { isPending: false, mutateAsync: vi.fn() },
    deletePlanMutation: { isPending: false, mutateAsync: vi.fn() },
    createCategoryMutation: { isPending: false, mutateAsync: vi.fn() },
    updateCategoryMutation: { isPending: false, mutateAsync: vi.fn() },
    deleteCategoryMutation: { isPending: false, mutateAsync: vi.fn() },
    createTopicMutation: { isPending: false, mutateAsync: vi.fn() },
    updateTopicMutation: { isPending: false, mutateAsync: vi.fn() },
    deleteTopicMutation: { isPending: false, mutateAsync: vi.fn() },
    createQuestionMutation: { isPending: false, mutateAsync: vi.fn() },
    updateQuestionMutation: { isPending: false, mutateAsync: vi.fn() },
    deleteQuestionMutation: { isPending: false, mutateAsync: vi.fn() },
    handleCreateCard: vi.fn(),
    handleUpdateCard: vi.fn(),
    handleDeleteCard: vi.fn(),
    handleCreatePlan: vi.fn(),
    handleUpdatePlan: vi.fn(),
    handleDeletePlan: vi.fn(),
    handleCreateCategory: vi.fn(),
    handleUpdateCategory: vi.fn(),
    handleDeleteCategory: vi.fn(),
    handleCreateTopic: vi.fn(),
    handleBulkCreateTopics: vi.fn(),
    handleUpdateTopic: vi.fn(),
    handleDeleteTopic: vi.fn(),
    handleCreateQuestion: vi.fn(),
    handleUpdateQuestion: vi.fn(),
    handleDeleteQuestion: vi.fn(),
    addCardToPlan: vi.fn(),
    addCategoryToCard: vi.fn(),
    addTopicToCategory: vi.fn(),
    addQuestionToTopic: vi.fn(),
    removeCardFromPlan: vi.fn(),
    removeCategoryFromCard: vi.fn(),
    removeTopicFromCategory: vi.fn(),
    removeQuestionFromPlan: vi.fn(),
  })),
}));

vi.mock("./hooks/useContentManagementTemplateProps", () => ({
  useContentManagementTemplateProps: vi.fn(() => ({
    title: "🎯 Unified Learning Management",
    subtitle: "Comprehensive admin interface",
    stats: {
      totalCards: 0,
      totalPlans: 0,
      totalCategories: 0,
      totalTopics: 0,
      totalQuestions: 0,
    },
    searchAndFilters: {},
    actionButtons: [],
    categoriesList: {},
    topicsList: {},
    cardsList: {},
    plansList: {},
  })),
}));

vi.mock("./hooks/useContentManagementHandlers", () => ({
  useContentManagementHandlers: vi.fn(() => ({
    onCardFormSubmit: vi.fn(),
    onPlanFormSubmit: vi.fn(),
    onCategoryFormSubmit: vi.fn(),
    onTopicFormSubmit: vi.fn(),
    onQuestionFormSubmit: vi.fn(),
    onDeleteCard: vi.fn(),
    onDeletePlan: vi.fn(),
    onDeleteCategory: vi.fn(),
    onDeleteTopic: vi.fn(),
    onDeleteQuestion: vi.fn(),
  })),
}));

vi.mock("./hooks/useContentManagementDeleteHandlers", () => ({
  useContentManagementDeleteHandlers: vi.fn(() => ({
    card: vi.fn(),
    plan: vi.fn(),
    category: vi.fn(),
    topic: vi.fn(),
    question: vi.fn(),
  })),
}));

vi.mock("@elzatona/common-ui", async () => {
  const actual = await vi.importActual("@elzatona/common-ui");
  return {
    ...actual,
    useToast: vi.fn(() => ({
      toasts: [],
      removeToast: vi.fn(),
    })),
    ToastContainer: ({ toasts }: { toasts: any[] }) => (
      <div data-testid="toast-container">
        {toasts.length > 0 && <div>Toasts: {toasts.length}</div>}
      </div>
    ),
    ContentManagementTemplate: ({ title }: { title?: string }) => (
      <div data-testid="content-management-template">
        <h1>{title || "Content Management"}</h1>
      </div>
    ),
  };
});

vi.mock("./components/ContentManagementErrorState", () => ({
  ContentManagementErrorState: () => (
    <div data-testid="error-state">Error State</div>
  ),
}));

vi.mock("./components/ContentManagementLoadingState", () => ({
  ContentManagementLoadingState: () => (
    <div data-testid="loading-state">Loading State</div>
  ),
}));

vi.mock("./components/ContentManagementModals", () => ({
  ContentManagementModals: () => (
    <div data-testid="content-management-modals">Modals</div>
  ),
}));

describe("UnifiedAdminPage", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
    vi.clearAllMocks();
  });

  const renderWithProviders = (component: React.ReactElement) => {
    return render(
      <QueryClientProvider client={queryClient}>
        {component}
      </QueryClientProvider>,
    );
  };

  it("should render loading state when data is loading", () => {
    const {
      useContentManagementData,
    } = require("./hooks/useContentManagementData");
    useContentManagementData.mockReturnValueOnce({
      loading: true,
      hasError: false,
    });

    renderWithProviders(<UnifiedAdminPage />);
    expect(screen.getByTestId("loading-state")).toBeInTheDocument();
  });

  it("should render error state when there is an error", () => {
    const {
      useContentManagementData,
    } = require("./hooks/useContentManagementData");
    useContentManagementData.mockReturnValueOnce({
      loading: false,
      hasError: true,
      cardsError: new Error("Test error"),
      plansError: null,
      categoriesError: null,
      topicsError: null,
      questionsError: null,
    });

    renderWithProviders(<UnifiedAdminPage />);
    expect(screen.getByTestId("error-state")).toBeInTheDocument();
  });

  it("should render content management template when data is loaded", async () => {
    renderWithProviders(<UnifiedAdminPage />);

    await waitFor(() => {
      expect(
        screen.getByTestId("content-management-template"),
      ).toBeInTheDocument();
    });
  });

  it("should render modals component", async () => {
    renderWithProviders(<UnifiedAdminPage />);

    await waitFor(() => {
      expect(
        screen.getByTestId("content-management-modals"),
      ).toBeInTheDocument();
    });
  });

  it("should render toast container", async () => {
    renderWithProviders(<UnifiedAdminPage />);

    await waitFor(() => {
      expect(screen.getByTestId("toast-container")).toBeInTheDocument();
    });
  });
});

describe("Content Management Page Snapshot Tests", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
    vi.clearAllMocks();
  });

  const renderWithProviders = (component: React.ReactElement) => {
    return render(
      <QueryClientProvider client={queryClient}>
        {component}
      </QueryClientProvider>,
    );
  };

  it("should match content management page snapshot (default state)", async () => {
    const { container } = renderWithProviders(<UnifiedAdminPage />);
    await waitFor(() => {
      expect(
        screen.getByTestId("content-management-template"),
      ).toBeInTheDocument();
    });
    expect(container.firstChild).toMatchSnapshot("content-management-default");
  });

  it("should match content management page snapshot (loading state)", () => {
    const {
      useContentManagementData,
    } = require("./hooks/useContentManagementData");
    useContentManagementData.mockReturnValueOnce({
      loading: true,
      hasError: false,
    });

    const { container } = renderWithProviders(<UnifiedAdminPage />);
    expect(container.firstChild).toMatchSnapshot("content-management-loading");
  });

  it("should match content management page snapshot (error state)", () => {
    const {
      useContentManagementData,
    } = require("./hooks/useContentManagementData");
    useContentManagementData.mockReturnValueOnce({
      loading: false,
      hasError: true,
      cardsError: new Error("Test error"),
    });

    const { container } = renderWithProviders(<UnifiedAdminPage />);
    expect(container.firstChild).toMatchSnapshot("content-management-error");
  });

  it("should match content management page snapshot (with data)", async () => {
    const {
      useContentManagementData,
    } = require("./hooks/useContentManagementData");
    useContentManagementData.mockReturnValueOnce({
      cards: [{ id: "1", name: "Test Card" }],
      plans: [{ id: "1", name: "Test Plan" }],
      categories: [{ id: "1", name: "Test Category" }],
      topics: [{ id: "1", name: "Test Topic" }],
      questions: [{ id: "1", title: "Test Question" }],
      loading: false,
      hasError: false,
    });

    const { container } = renderWithProviders(<UnifiedAdminPage />);
    await waitFor(() => {
      expect(
        screen.getByTestId("content-management-template"),
      ).toBeInTheDocument();
    });
    expect(container.firstChild).toMatchSnapshot(
      "content-management-with-data",
    );
  });
});
