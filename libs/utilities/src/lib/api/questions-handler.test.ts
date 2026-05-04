import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest, NextResponse } from "next/server";
import {
  questionsGetHandler,
  questionsPostHandler,
  PUT as questionsPutHandler,
  DELETE as questionsDeleteHandler,
} from "../questions-handler";

import { getSupabaseClient } from "../../index";

const mockSupabaseInstance = {
  from: vi.fn().mockReturnThis(),
  select: vi.fn().mockReturnThis(),
  eq: vi.fn().mockReturnThis(),
  ilike: vi.fn().mockReturnThis(),
  range: vi.fn().mockReturnThis(),
  order: vi.fn().mockReturnThis(),
  limit: vi.fn().mockReturnThis(),
  single: vi.fn().mockReturnThis(),
  maybeSingle: vi.fn().mockReturnThis(),
  insert: vi.fn().mockReturnThis(),
  update: vi.fn().mockReturnThis(),
  delete: vi.fn().mockReturnThis(),
};

// Mock dependencies
vi.mock("../../index", () => ({
  getSupabaseClient: vi.fn(() => mockSupabaseInstance),
  validateAndSanitize: vi.fn((schema, data) => ({ success: true, data })),
  sanitizeObjectServer: vi.fn((data) => data),
  sanitizeRichContent: vi.fn((data) => data),
  getErrorMessage: vi.fn((err) => err?.message || "Error"),
  normalizeCodeLineBreaks: vi.fn((code) => code),
}));

vi.mock("./validation", () => ({
  questionSchema: {},
}));

describe("questions-handler", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset all methods on the singleton mock instance
    Object.values(mockSupabaseInstance).forEach((m: any) => m.mockReset?.());
    // Re-setup mockReturnThis for fluent API
    mockSupabaseInstance.from.mockReturnThis();
    mockSupabaseInstance.select.mockReturnThis();
    mockSupabaseInstance.eq.mockReturnThis();
    mockSupabaseInstance.ilike.mockReturnThis();
    mockSupabaseInstance.range.mockReturnThis();
    mockSupabaseInstance.order.mockReturnThis();
    mockSupabaseInstance.limit.mockReturnThis();
    mockSupabaseInstance.single.mockReturnThis();
    mockSupabaseInstance.maybeSingle.mockReturnThis();
    mockSupabaseInstance.insert.mockReturnThis();
    mockSupabaseInstance.update.mockReturnThis();
    mockSupabaseInstance.delete.mockReturnThis();
  });

  describe("questionsGetHandler", () => {
    it("should fetch questions with pagination", async () => {
      const req = new NextRequest(
        "http://localhost/api/questions?page=1&pageSize=10",
      );

      mockSupabaseInstance.select.mockResolvedValue({
        data: [{ id: "1", title: "Test Q" }],
        count: 1,
        error: null,
      });

      const response = await questionsGetHandler(req);
      const json = await response.json();

      expect(json.success).toBe(true);
      expect(json.data).toHaveLength(1);
      expect(json.pagination.page).toBe(1);
    });
  });

  describe("questionsPostHandler", () => {
    it("should create questions", async () => {
      const req = new NextRequest("http://localhost/api/questions", {
        method: "POST",
        body: JSON.stringify({
          questions: [{ title: "New Q", content: "Content" }],
        }),
      });

      mockSupabaseInstance.maybeSingle.mockResolvedValue({ data: null }); // No duplicate
      mockSupabaseInstance.insert.mockResolvedValue({
        data: { id: "new-id" },
        error: null,
      });

      const response = await questionsPostHandler(req);
      const json = await response.json();

      expect(json.success).toBe(true);
      expect(json.data.success).toBe(1);
    });
  });

  describe("questionsPutHandler", () => {
    it("should update an existing question", async () => {
      const req = new NextRequest("http://localhost/api/questions", {
        method: "PUT",
        body: JSON.stringify({
          id: "123",
          title: "Updated Title",
        }),
      });

      mockSupabaseInstance.update.mockResolvedValue({ error: null });

      const response = await questionsPutHandler(req);
      const json = await response.json();

      expect(json.success).toBe(true);
      expect(mockSupabaseInstance.update).toHaveBeenCalled();
    });
  });

  describe("questionsDeleteHandler", () => {
    it("should delete a question", async () => {
      const req = new NextRequest("http://localhost/api/questions?id=123", {
        method: "DELETE",
      });

      mockSupabaseInstance.delete.mockResolvedValue({ error: null });

      const response = await questionsDeleteHandler(req);
      const json = await response.json();

      expect(json.success).toBe(true);
      expect(mockSupabaseInstance.delete).toHaveBeenCalled();
    });
  });
});
