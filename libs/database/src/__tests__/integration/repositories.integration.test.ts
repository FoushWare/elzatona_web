/**
 * Integration tests for PostgreSQL repositories
 * These tests use a real test database instance
 * Requires: Test database setup (see docs/SETUP_TEST_DATABASE.md)
 */

import { PostgreSQLQuestionRepository } from "../../adapters/postgresql/PostgreSQLQuestionRepository";
import { PostgreSQLUserRepository } from "../../adapters/postgresql/PostgreSQLUserRepository";
import { PostgreSQLConfig } from "../../adapters/postgresql/BasePostgreSQLAdapter";
import {
  CreateQuestionDTO,
  CreateUserDTO,
  QuestionDifficulty,
  QuestionType,
  UserRole,
} from "../../repositories";

// Skip these tests if TEST_DATABASE_URL is not set
const TEST_DATABASE_URL = process.env.TEST_DATABASE_URL;
const TEST_DATABASE_KEY = process.env.TEST_DATABASE_KEY;

const describeIntegration =
  TEST_DATABASE_URL && TEST_DATABASE_KEY ? describe : describe.skip;

describeIntegration("PostgreSQL Repository Integration Tests", () => {
  let questionRepo: PostgreSQLQuestionRepository;
  let userRepo: PostgreSQLUserRepository;
  let config: PostgreSQLConfig;

  beforeAll(() => {
    config = {
      url: TEST_DATABASE_URL!,
      key: TEST_DATABASE_KEY!,
    };
    questionRepo = new PostgreSQLQuestionRepository(config);
    userRepo = new PostgreSQLUserRepository(config);
  });

  describe("Question Repository E2E", () => {
    let createdQuestionId: string;

    it("should create, read, update, and delete a question", async () => {
      // CREATE
      const createDTO: CreateQuestionDTO = {
        question: "Integration Test Question",
        correctAnswer: "Correct",
        options: ["Wrong1", "Wrong2", "Correct", "Wrong3"],
        category: "Integration Testing",
        topic: "Repository Pattern",
        difficulty: QuestionDifficulty.MEDIUM,
        type: QuestionType.MULTIPLE_CHOICE,
        explanation: "This is a test question for integration testing",
        isPublished: false,
      };

      const created = await questionRepo.create(createDTO);
      expect(created.id).toBeDefined();
      expect(created.question).toBe("Integration Test Question");
      createdQuestionId = created.id;

      // READ
      const found = await questionRepo.findById(createdQuestionId);
      expect(found).toBeDefined();
      expect(found?.id).toBe(createdQuestionId);

      // UPDATE
      const updated = await questionRepo.update(createdQuestionId, {
        question: "Updated Integration Test Question",
        difficulty: QuestionDifficulty.HARD,
      });
      expect(updated.question).toBe("Updated Integration Test Question");
      expect(updated.difficulty).toBe("hard");

      // DELETE
      await questionRepo.delete(createdQuestionId);
      const deleted = await questionRepo.findById(createdQuestionId);
      expect(deleted).toBeNull();
    });

    it("should find questions with filters", async () => {
      // Create test questions
      const q1 = await questionRepo.create({
        question: "Filter Test Q1",
        correctAnswer: "A",
        options: ["A", "B"],
        category: "FilterCategory",
        topic: "FilterTopic",
        difficulty: QuestionDifficulty.EASY,
        type: QuestionType.MULTIPLE_CHOICE,
        isPublished: true,
      });

      const q2 = await questionRepo.create({
        question: "Filter Test Q2",
        correctAnswer: "B",
        options: ["A", "B"],
        category: "FilterCategory",
        topic: "FilterTopic",
        difficulty: QuestionDifficulty.HARD,
        type: QuestionType.TRUE_FALSE,
        isPublished: true,
      });

      // Test filtering
      const results = await questionRepo.findByFilters(
        {
          category: "FilterCategory",
          difficulty: QuestionDifficulty.EASY,
        },
        { page: 1, limit: 10 },
      );

      expect(results.data.length).toBeGreaterThanOrEqual(1);
      expect(results.data[0].category).toBe("FilterCategory");

      // Cleanup
      await questionRepo.delete(q1.id);
      await questionRepo.delete(q2.id);
    });

    it("should search questions by keyword", async () => {
      const testQ = await questionRepo.create({
        question: "What is the capital of France?",
        correctAnswer: "Paris",
        options: ["London", "Berlin", "Paris", "Madrid"],
        category: "Geography",
        topic: "Europe",
        difficulty: QuestionDifficulty.EASY,
        type: QuestionType.MULTIPLE_CHOICE,
        isPublished: true,
      });

      const results = await questionRepo.search("France", {
        page: 1,
        limit: 10,
      });

      expect(results.data.length).toBeGreaterThanOrEqual(1);
      const found = results.data.find((q) => q.id === testQ.id);
      expect(found).toBeDefined();

      // Cleanup
      await questionRepo.delete(testQ.id);
    });
  });

  describe("User Repository E2E", () => {
    let createdUserId: string;

    it("should create, read, update, and delete a user", async () => {
      // CREATE
      const createDTO: CreateUserDTO = {
        email: `integration-test-${Date.now()}@example.com`,
        name: "Integration Test User",
        role: UserRole.STUDENT,
      };

      const created = await userRepo.create(createDTO);
      expect(created.id).toBeDefined();
      expect(created.email).toBe(createDTO.email);
      createdUserId = created.id;

      // READ
      const found = await userRepo.findById(createdUserId);
      expect(found).toBeDefined();
      expect(found?.id).toBe(createdUserId);

      // UPDATE
      const updated = await userRepo.update(createdUserId, {
        name: "Updated Integration Test User",
      });
      expect(updated.name).toBe("Updated Integration Test User");

      // DELETE
      await userRepo.delete(createdUserId);
      const deleted = await userRepo.findById(createdUserId);
      expect(deleted).toBeNull();
    });

    it("should manage user progress", async () => {
      const user = await userRepo.create({
        email: `progress-test-${Date.now()}@example.com`,
        name: "Progress Test User",
        role: UserRole.STUDENT,
      });

      // Get initial progress (should be created automatically)
      const initialProgress = await userRepo.getProgress(user.id);
      expect(initialProgress).toBeDefined();
      expect(initialProgress?.totalQuestionsAnswered).toBe(0);

      // Update progress
      const updatedProgress = await userRepo.updateProgress(user.id, {
        totalQuestionsAnswered: 10,
        correctAnswers: 8,
        currentStreak: 3,
      });
      expect(updatedProgress.totalQuestionsAnswered).toBe(10);
      expect(updatedProgress.correctAnswers).toBe(8);

      // Cleanup
      await userRepo.delete(user.id);
    });

    it("should manage user preferences", async () => {
      const user = await userRepo.create({
        email: `preferences-test-${Date.now()}@example.com`,
        name: "Preferences Test User",
        role: UserRole.STUDENT,
      });

      // Get initial preferences
      const initialPrefs = await userRepo.getPreferences(user.id);
      expect(initialPrefs).toBeDefined();

      // Update preferences
      const updatedPrefs = await userRepo.updatePreferences(user.id, {
        theme: "dark",
        language: "ar",
        notificationsEnabled: false,
      });
      expect(updatedPrefs.theme).toBe("dark");
      expect(updatedPrefs.language).toBe("ar");
      expect(updatedPrefs.notificationsEnabled).toBe(false);

      // Cleanup
      await userRepo.delete(user.id);
    });
  });
});
