import { vi, describe, it, expect, beforeEach } from "vitest";
import {
  questionsGetHandler,
  questionsPostHandler,
} from "./questions-handler";
import { NextRequest } from "next/server";

// -----------------------------------------------------------------------------
// Shared Mocks
// -----------------------------------------------------------------------------

const mockSingle = vi.fn().mockResolvedValue({ data: { id: "123" }, error: null });
const mockMaybeSingle = vi.fn().mockResolvedValue({ data: { id: "456" }, error: null });
const mockEq = vi.fn().mockReturnThis();
const mockIlike = vi.fn().mockReturnThis();
const mockRange = vi.fn().mockReturnThis();
const mockOrder = vi.fn().mockReturnThis();
const mockLimit = vi.fn().mockReturnThis();
const mockInsert = vi.fn().mockReturnThis();

const mockFrom = vi.fn(() => ({
  select: vi.fn().mockReturnThis(),
  eq: mockEq,
  ilike: mockIlike,
  range: mockRange,
  order: mockOrder,
  limit: mockLimit,
  head: vi.fn().mockReturnThis(),
  count: vi.fn().mockReturnThis(),
  single: mockSingle,
  maybeSingle: mockMaybeSingle,
  insert: mockInsert,
  update: vi.fn().mockReturnThis(),
  delete: vi.fn().mockReturnThis(),
}));

const mockSupabase = {
  from: mockFrom,
};

vi.mock("../../index", () => ({
  getSupabaseClient: vi.fn(() => mockSupabase),
  validateAndSanitize: vi.fn((schema: any, data: any) => ({ success: true, data: data })),
  sanitizeObjectServer: vi.fn((obj: any) => obj),
  sanitizeRichContent: vi.fn((html: any) => html),
  sanitizeForLogging: vi.fn((val: any) => String(val)),
  normalizeCodeLineBreaks: vi.fn((code: any) => code),
  stripUnsafeControlCharacters: vi.fn((str: any) => str),
  getErrorMessage: vi.fn((err: any) => err.message || String(err)),
}));

describe("Questions Handler", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Default success mocks
    mockOrder.mockReturnThis();
    mockRange.mockReturnThis();
    mockSingle.mockResolvedValue({ data: { id: "123" }, error: null });
    mockMaybeSingle.mockResolvedValue({ data: { id: "456" }, error: null });
  });

  describe("GET Handler", () => {
    it("should fetch questions with default parameters", async () => {
      mockOrder.mockResolvedValue({ data: [], count: 0, error: null });
      
      const request = new NextRequest("https://example.com/api/questions");
      const response = await questionsGetHandler(request);
      const data = await response.json();

      expect(data.success).toBe(true);
      expect(Array.isArray(data.data)).toBe(true);
    });

    it("should handle filtering by type", async () => {
      mockOrder.mockResolvedValue({ data: [], count: 0, error: null });
      
      const request = new NextRequest(
        "https://example.com/api/questions?type=multiple-choice",
      );
      const response = await questionsGetHandler(request);
      const data = await response.json();

      expect(data.success).toBe(true);
      expect(mockEq).toHaveBeenCalledWith("type", "multiple-choice");
    });

    it("should handle database errors gracefully", async () => {
      mockOrder.mockResolvedValueOnce({
        data: null,
        error: { message: "DB Error" },
      });

      const request = new NextRequest("https://example.com/api/questions");
      const response = await questionsGetHandler(request);
      const data = await response.json();

      expect(data.success).toBe(false);
      expect(data.error).toBe("DB Error");
    });
  });

  describe("POST Handler", () => {
    it("should reject invalid body", async () => {
      const request = new NextRequest("https://example.com/api/questions", {
        method: "POST",
        body: JSON.stringify({}),
      });
      const response = await questionsPostHandler(request);
      const data = await response.json();

      expect(data.success).toBe(false);
      expect(data.error).toBe("Questions array is required");
    });

    it("should process multiple questions", async () => {
      // Mock insert returning data
      mockSingle.mockResolvedValue({ data: { id: "new-id" }, error: null });
      mockMaybeSingle.mockResolvedValue({ data: null, error: null }); // No duplicate

      const mockQuestions = [
        { title: "Q1", content: "C1", type: "multiple-choice" },
        { title: "Q2", content: "C2", type: "code" },
      ];

      const request = new NextRequest("https://example.com/api/questions", {
        method: "POST",
        body: JSON.stringify({ questions: mockQuestions }),
      });

      const response = await questionsPostHandler(request);
      const data = await response.json();

      expect(data.success).toBe(true);
      expect(data.data.success).toBe(2);
    });

    it("should handle missing categories or topics by creating placeholders if needed", async () => {
      // 1. lookupCategory fails then insert succeeds
      mockSingle
        .mockResolvedValueOnce({ data: null, error: { code: "PGRST116" } }) // Category not found
        .mockResolvedValueOnce({ data: { id: "topic-123" }, error: null }) // Topic found
        .mockResolvedValueOnce({ data: { id: "q-123" }, error: null }); // Insert success
      
      // We need to mock the insert chain to return an ID for the new category
      // Actually, lookupCategory uses .single() after .ilike().
      // Let's just mock the whole sequence.
      
      const mockQuestion = {
        title: "New Cat Q",
        content: "Content",
        category: "New Category",
      };

      const request = new NextRequest("https://example.com/api/questions", {
        method: "POST",
        body: JSON.stringify({ questions: [mockQuestion] }),
      });

      const response = await questionsPostHandler(request);
      const data = await response.json();

      expect(data.success).toBe(true);
    });

    it("should handle database insert errors", async () => {
      mockMaybeSingle.mockResolvedValue({ data: null, error: null });
      
      mockSingle.mockReset();
      mockSingle
        .mockResolvedValueOnce({ data: { id: "cat-123" }, error: null })
        .mockResolvedValueOnce({ data: { id: "topic-123" }, error: null })
        .mockResolvedValueOnce({ data: null, error: { message: "Insert failed" } });

      const mockQuestion = { 
        title: "Fail Q", 
        content: "C",
        category: "Cat1",
        topic: "Topic1"
      };

      const request = new NextRequest("https://example.com/api/questions", {
        method: "POST",
        body: JSON.stringify({ questions: [mockQuestion] }),
      });

      const response = await questionsPostHandler(request);
      const data = await response.json();

      expect(data.success).toBe(true);
      expect(data.data.failed).toBe(1);
      expect(data.data.errors[0]).toContain("Insert failed");
    });
  });

  describe("PUT/DELETE Handlers", () => {
    it("should update a question", async () => {
      const { PUT } = await import("./questions-handler");
      mockSingle.mockResolvedValue({ data: { id: "123" }, error: null });
      mockOrder.mockResolvedValue({ data: { id: "123" }, error: null }); // For update.eq

      const request = new NextRequest("https://example.com/api/questions", {
        method: "PUT",
        body: JSON.stringify({ id: "q-123", title: "Updated title" }),
      });

      const response = await PUT(request);
      const data = await response.json();

      expect(data.success).toBe(true);
      expect(mockEq).toHaveBeenCalledWith("id", "q-123");
    });

    it("should delete a question", async () => {
      const { DELETE } = await import("./questions-handler");
      mockOrder.mockResolvedValue({ data: null, error: null }); // For delete.eq

      const request = new NextRequest("https://example.com/api/questions?id=q-123", {
        method: "DELETE",
      });

      const response = await DELETE(request);
      const data = await response.json();

      expect(data.success).toBe(true);
      expect(data.message).toContain("deleted");
    });

    it("should reject delete without ID", async () => {
      const { DELETE } = await import("./questions-handler");
      const request = new NextRequest("https://example.com/api/questions", {
        method: "DELETE",
      });

      const response = await DELETE(request);
      const data = await response.json();

      expect(data.success).toBe(false);
      expect(data.error).toContain("ID is required");
    });
  });
});
