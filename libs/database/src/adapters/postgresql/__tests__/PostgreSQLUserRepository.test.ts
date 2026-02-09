/**
 * Unit tests for PostgreSQLUserRepository
 * Note: These are basic sanity tests. Full tests require integration tests with real DB
 */

import { PostgreSQLUserRepository } from "../PostgreSQLUserRepository";
import { PostgreSQLConfig } from "../BasePostgreSQLAdapter";

describe("PostgreSQLUserRepository", () => {
  let repository: PostgreSQLUserRepository;
  let config: PostgreSQLConfig;

  beforeEach(() => {
    config = {
      url: "https://test.supabase.co",
      key: "test-key",
    };
    repository = new PostgreSQLUserRepository(config);
  });

  describe("Constructor", () => {
    it("should create repository instance with config", () => {
      expect(repository).toBeDefined();
      expect(repository).toHaveProperty("create");
      expect(repository).toHaveProperty("findById");
      expect(repository).toHaveProperty("findAll");
      expect(repository).toHaveProperty("update");
      expect(repository).toHaveProperty("delete");
    });
  });

  describe("Method Signatures", () => {
    it("should have all required CRUD methods", () => {
      const methods = [
        "create",
        "findById",
        "findAll",
        "findByEmail",
        "update",
        "delete",
      ];

      methods.forEach((method) => {
        expect(repository).toHaveProperty(method);
        expect(typeof (repository as any)[method]).toBe("function");
      });
    });

    it("should have progress tracking methods", () => {
      const methods = ["getProgress", "updateProgress"];

      methods.forEach((method) => {
        expect(repository).toHaveProperty(method);
        expect(typeof (repository as any)[method]).toBe("function");
      });
    });

    it("should have preferences management methods", () => {
      const methods = ["getPreferences", "updatePreferences"];

      methods.forEach((method) => {
        expect(repository).toHaveProperty(method);
        expect(typeof (repository as any)[method]).toBe("function");
      });
    });

    it("should have query methods", () => {
      const methods = ["findByEmail", "count"];

      methods.forEach((method) => {
        expect(repository).toHaveProperty(method);
        expect(typeof (repository as any)[method]).toBe("function");
      });
    });
  });
});
