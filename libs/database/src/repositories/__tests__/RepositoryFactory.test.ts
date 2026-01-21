/**
 * Unit tests for RepositoryFactory
 * Tests the factory pattern and singleton behavior
 */

import {
  RepositoryFactory,
  RepositoryFactoryConfig,
} from "../RepositoryFactory";

describe("RepositoryFactory", () => {
  let config: RepositoryFactoryConfig;

  beforeEach(() => {
    config = {
      database: {
        type: "postgresql",
        url: "https://test.supabase.co",
        key: "REDACTED_TEST_KEY",
        serviceRoleKey: "REDACTED_TEST_KEY",
      },
    };
  });

  describe("Repository Creation", () => {
    it("should create a question repository", () => {
      const factory = new RepositoryFactory(config);
      const repo = factory.getQuestionRepository();
      expect(repo).toBeDefined();
      expect(repo).toHaveProperty("create");
      expect(repo).toHaveProperty("findById");
      expect(repo).toHaveProperty("findAll");
    });

    it("should create a user repository", () => {
      const factory = new RepositoryFactory(config);
      const repo = factory.getUserRepository();
      expect(repo).toBeDefined();
      expect(repo).toHaveProperty("create");
      expect(repo).toHaveProperty("findById");
      expect(repo).toHaveProperty("getProgress");
    });

    it("should create a plan repository", () => {
      const factory = new RepositoryFactory(config);
      const repo = factory.getPlanRepository();
      expect(repo).toBeDefined();
      expect(repo).toHaveProperty("create");
      expect(repo).toHaveProperty("findById");
      expect(repo).toHaveProperty("enrollUser");
    });

    it("should create a learning card repository", () => {
      const factory = new RepositoryFactory(config);
      const repo = factory.getLearningCardRepository();
      expect(repo).toBeDefined();
      expect(repo).toHaveProperty("create");
      expect(repo).toHaveProperty("findById");
      expect(repo).toHaveProperty("findAll");
    });
  });

  describe("Singleton Pattern", () => {
    it("should return same question repository instance", () => {
      const factory = new RepositoryFactory(config);
      const repo1 = factory.getQuestionRepository();
      const repo2 = factory.getQuestionRepository();
      expect(repo1).toBe(repo2);
    });

    it("should return same user repository instance", () => {
      const factory = new RepositoryFactory(config);
      const repo1 = factory.getUserRepository();
      const repo2 = factory.getUserRepository();
      expect(repo1).toBe(repo2);
    });

    it("should return same plan repository instance", () => {
      const factory = new RepositoryFactory(config);
      const repo1 = factory.getPlanRepository();
      const repo2 = factory.getPlanRepository();
      expect(repo1).toBe(repo2);
    });

    it("should return same learning card repository instance", () => {
      const factory = new RepositoryFactory(config);
      const repo1 = factory.getLearningCardRepository();
      const repo2 = factory.getLearningCardRepository();
      expect(repo1).toBe(repo2);
    });
  });

  describe("Unsupported Database Types", () => {
    it("should throw error for unsupported database type", () => {
      const mongoConfig: RepositoryFactoryConfig = {
        database: {
          type: "mongodb" as any,
          url: "mongodb://localhost",
          key: "mongo-key",
        },
      };

      const factory = new RepositoryFactory(mongoConfig);
      expect(() => factory.getQuestionRepository()).toThrow();
    });
  });
});
