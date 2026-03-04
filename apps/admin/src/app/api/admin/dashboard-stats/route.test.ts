/**
 * Integration tests for Admin Dashboard Stats API
 * @vitest-environment node
 */

import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock repositories first
const mockRepos = {
  questions: { findAll: vi.fn() },
  cards: { findAll: vi.fn() },
  plans: { findAll: vi.fn() },
  users: { findByRole: vi.fn() },
  categories: { getAllCategories: vi.fn() },
  topics: { getAllTopics: vi.fn() },
};

// Mock the entire database module
vi.mock("@elzatona/database", () => ({
  getRepositoryFactory: vi.fn(() => ({
    getQuestionRepository: () => mockRepos.questions,
    getLearningCardRepository: () => mockRepos.cards,
    getPlanRepository: () => mockRepos.plans,
    getUserRepository: () => mockRepos.users,
    getCategoryRepository: () => mockRepos.categories,
    getTopicRepository: () => mockRepos.topics,
  })),
}));

describe("Admin Dashboard Stats API", () => {
  let GET: any;

  beforeEach(async () => {
    vi.clearAllMocks();

    // Default successful counts
    mockRepos.questions.findAll.mockResolvedValue([]);
    mockRepos.cards.findAll.mockResolvedValue([]);
    mockRepos.plans.findAll.mockResolvedValue([]);
    mockRepos.users.findByRole.mockResolvedValue({ total: 0 });
    mockRepos.categories.getAllCategories.mockResolvedValue([]);
    mockRepos.topics.getAllTopics.mockResolvedValue([]);

    // Dynamically import route after mocks
    const route = await import("./route");
    GET = route.GET;
  });

  it("should return aggregated statistics correctly", async () => {
    const { NextRequest } = await import("next/server");
    const request = new NextRequest(
      "https://example.com/api/admin/dashboard-stats",
    );

    // Setup specific successful mocks
    mockRepos.questions.findAll.mockResolvedValue([{}, {}]);
    mockRepos.cards.findAll.mockResolvedValue([{}]);
    mockRepos.users.findByRole.mockResolvedValue({ total: 5 });
    mockRepos.categories.getAllCategories.mockResolvedValue([{}, {}, {}]);

    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.data.questions).toBe(2);
    expect(data.data.cards).toBe(1);
    expect(data.data.admins).toBe(5);
    expect(data.data.categories).toBe(3);
  });

  it("should handle failures in individual repositories gracefully", async () => {
    const { NextRequest } = await import("next/server");
    mockRepos.questions.findAll.mockRejectedValue(new Error("DB Error"));

    const request = new NextRequest(
      "https://example.com/api/admin/dashboard-stats",
    );
    const response = await GET(request);

    expect(response.status).toBe(500);
  });
});
