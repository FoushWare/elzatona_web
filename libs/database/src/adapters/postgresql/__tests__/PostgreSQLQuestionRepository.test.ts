/**
 * Unit tests for PostgreSQLQuestionRepository
 * Note: These are basic sanity tests. Full tests require integration tests with real DB
 */

import { PostgreSQLQuestionRepository } from "../PostgreSQLQuestionRepository";
import { PostgreSQLConfig } from "../BasePostgreSQLAdapter";

describe("PostgreSQLQuestionRepository", () => {
  let repository: PostgreSQLQuestionRepository;
  let config: PostgreSQLConfig;

  beforeEach(() => {
    config = {
      url: "https://test.supabase.co",
      key: "test-key",
    };
    repository = new PostgreSQLQuestionRepository(config);
  });

  describe("Constructor", () => {
    it("should create repository instance with config", () => {
      expect(repository).toBeDefined();
      expect(repository).toHaveProperty("create");
      expect(repository).toHaveProperty("findById");
      expect(repository).toHaveProperty("findAll");
      expect(repository).toHaveProperty("update");
      expect(repository).toHaveProperty("delete");
      expect(repository).toHaveProperty("search");
      expect(repository).toHaveProperty("findByFilters");
      expect(repository).toHaveProperty("getStatistics");
    });
  });

  describe("Method Signatures", () => {
    it("should have all required CRUD methods", () => {
      const methods = [
        "create",
        "findById",
        "findAll",
        "update",
        "delete",
        "createBatch",
        "updateBatch",
        "deleteBatch",
      ];

      methods.forEach((method) => {
        expect(repository).toHaveProperty(method);
        expect(typeof (repository as any)[method]).toBe("function");
      });
    });

    it("should have all query methods", () => {
      const methods = [
        "search",
        "findByFilters",
        "findByCategory",
        "findByTopic",
        "findByDifficulty",
        "count",
      ];

      methods.forEach((method) => {
        expect(repository).toHaveProperty(method);
        expect(typeof (repository as any)[method]).toBe("function");
      });
    });

    it("should have all utility methods", () => {
      const methods = [
        "getStatistics",
        "getCategoryStatistics",
        "exists",
        "getRandom",
        "incrementViewCount",
        "updateSuccessRate",
      ];

      methods.forEach((method) => {
        expect(repository).toHaveProperty(method);
        expect(typeof (repository as any)[method]).toBe("function");
      });
    });
  });
});
