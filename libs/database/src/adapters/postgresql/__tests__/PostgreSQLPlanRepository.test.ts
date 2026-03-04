/**
 * Unit tests for PostgreSQLPlanRepository
 */

import { describe, it, expect, beforeEach, vi } from "vitest";
import { PostgreSQLPlanRepository } from "../PostgreSQLPlanRepository";
import { PostgreSQLConfig } from "../BasePostgreSQLAdapter";

// Mock Supabase client
vi.mock("@supabase/supabase-js", () => ({
  createClient: vi.fn(() => ({
    from: vi.fn(() => ({
      select: vi.fn().mockReturnThis(),
      insert: vi.fn().mockReturnThis(),
      update: vi.fn().mockReturnThis(),
      delete: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn().mockReturnThis(),
      limit: vi.fn().mockReturnThis(),
    })),
  })),
}));

describe("PostgreSQLPlanRepository", () => {
  let repository: PostgreSQLPlanRepository;
  let config: PostgreSQLConfig;

  beforeEach(() => {
    config = {
      url: "https://test.supabase.co",
      key: "test-key",
    };
    repository = new PostgreSQLPlanRepository(config);
    vi.clearAllMocks();
  });

  describe("Table Configuration", () => {
    it("should use plan_cards as the main table", () => {
      // Accessing private TABLE_NAME via indexing if necessary,
      // but we can verify it via the client call expectation
      const clientSpy = vi.spyOn((repository as any).client, "from");
      repository.findAll();
      expect(clientSpy).toHaveBeenCalledWith("plan_cards");
    });
  });

  describe("CRUD Operations", () => {
    it("should have create method", () => {
      expect(typeof repository.create).toBe("function");
    });

    it("should have findById method", () => {
      expect(typeof repository.findById).toBe("function");
    });

    it("should have findAll method", () => {
      expect(typeof repository.findAll).toBe("function");
    });

    it("should have update method", () => {
      expect(typeof repository.update).toBe("function");
    });

    it("should have delete method", () => {
      expect(typeof repository.delete).toBe("function");
    });
  });

  describe("Enrollment Operations", () => {
    it("should have enrollUser method", () => {
      expect(typeof repository.enrollUser).toBe("function");
    });

    it("should have getUserEnrollment method", () => {
      expect(typeof repository.getUserEnrollment).toBe("function");
    });
  });
});
