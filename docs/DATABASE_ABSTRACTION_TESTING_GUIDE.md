# Database Abstraction Layer - Testing Guide

## Overview

This guide provides comprehensive testing strategies for the database abstraction layer, covering unit tests, integration tests, and end-to-end tests.

---

## Test Structure

```
tests/
├── unit/
│   ├── repositories/
│   │   ├── category.repository.test.ts
│   │   ├── topic.repository.test.ts
│   │   ├── section.repository.test.ts
│   │   ├── flashcard.repository.test.ts
│   │   └── progress.repository.test.ts
│   └── factory/
│       └── repository-factory.test.ts
├── integration/
│   ├── postgresql/
│   │   ├── category.integration.test.ts
│   │   ├── topic.integration.test.ts
│   │   └── ...
│   └── api/
│       ├── categories.api.test.ts
│       └── ...
└── e2e/
    └── database-abstraction.e2e.test.ts
```

---

## Unit Tests

### Repository Interface Tests

```typescript
// tests/unit/repositories/category.repository.test.ts
import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  ICategoryRepository,
  Category,
} from "@/libs/database/src/repositories/interfaces/ICategoryRepository";

describe("ICategoryRepository", () => {
  let mockRepo: ICategoryRepository;

  beforeEach(() => {
    mockRepo = {
      getCategoryById: vi.fn(),
      getAllCategories: vi.fn(),
      createCategory: vi.fn(),
      updateCategory: vi.fn(),
      deleteCategory: vi.fn(),
    };
  });

  describe("getCategoryById", () => {
    it("should return category when found", async () => {
      const mockCategory: Category = {
        id: "1",
        name: "Test Category",
        description: "Test Description",
      };

      vi.mocked(mockRepo.getCategoryById).mockResolvedValue(mockCategory);

      const result = await mockRepo.getCategoryById("1");

      expect(result).toEqual(mockCategory);
      expect(mockRepo.getCategoryById).toHaveBeenCalledWith("1");
    });

    it("should return null when category not found", async () => {
      vi.mocked(mockRepo.getCategoryById).mockResolvedValue(null);

      const result = await mockRepo.getCategoryById("non-existent");

      expect(result).toBeNull();
    });
  });

  describe("getAllCategories", () => {
    it("should return all categories", async () => {
      const mockCategories: Category[] = [
        { id: "1", name: "Category 1", description: "Desc 1" },
        { id: "2", name: "Category 2", description: "Desc 2" },
      ];

      vi.mocked(mockRepo.getAllCategories).mockResolvedValue(mockCategories);

      const result = await mockRepo.getAllCategories();

      expect(result).toEqual(mockCategories);
      expect(result).toHaveLength(2);
    });

    it("should return empty array when no categories", async () => {
      vi.mocked(mockRepo.getAllCategories).mockResolvedValue([]);

      const result = await mockRepo.getAllCategories();

      expect(result).toEqual([]);
    });
  });

  describe("createCategory", () => {
    it("should create category with valid data", async () => {
      const input = { name: "New Category", description: "New Desc" };
      const created: Category = { id: "1", ...input };

      vi.mocked(mockRepo.createCategory).mockResolvedValue(created);

      const result = await mockRepo.createCategory(input);

      expect(result).toEqual(created);
      expect(mockRepo.createCategory).toHaveBeenCalledWith(input);
    });
  });

  describe("updateCategory", () => {
    it("should update existing category", async () => {
      const input = { name: "Updated Category", description: "Updated Desc" };
      const updated: Category = { id: "1", ...input };

      vi.mocked(mockRepo.updateCategory).mockResolvedValue(updated);

      const result = await mockRepo.updateCategory("1", input);

      expect(result).toEqual(updated);
      expect(mockRepo.updateCategory).toHaveBeenCalledWith("1", input);
    });
  });

  describe("deleteCategory", () => {
    it("should delete category by id", async () => {
      vi.mocked(mockRepo.deleteCategory).mockResolvedValue(undefined);

      await mockRepo.deleteCategory("1");

      expect(mockRepo.deleteCategory).toHaveBeenCalledWith("1");
    });
  });
});
```

### PostgreSQL Adapter Tests

```typescript
// tests/unit/adapters/postgresql-category.repository.test.ts
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { Pool } from "pg";
import { PostgreSQLCategoryRepository } from "@/libs/database/src/adapters/postgresql/PostgreSQLCategoryRepository";

describe("PostgreSQLCategoryRepository", () => {
  let pool: Pool;
  let repo: PostgreSQLCategoryRepository;

  beforeEach(() => {
    pool = {
      query: vi.fn(),
    } as any;

    repo = new PostgreSQLCategoryRepository(pool);
  });

  describe("getCategoryById", () => {
    it("should execute parameterized query", async () => {
      const mockResult = {
        rows: [{ id: "1", name: "Test", description: "Desc" }],
      };

      vi.mocked(pool.query).mockResolvedValue(mockResult as any);

      await repo.getCategoryById("1");

      expect(pool.query).toHaveBeenCalledWith(
        "SELECT * FROM categories WHERE id = $1",
        ["1"],
      );
    });

    it("should prevent SQL injection", async () => {
      const maliciousInput = "1'; DROP TABLE categories; --";

      vi.mocked(pool.query).mockResolvedValue({ rows: [] } as any);

      await repo.getCategoryById(maliciousInput);

      // Verify parameterized query (not string concatenation)
      expect(pool.query).toHaveBeenCalledWith(expect.stringContaining("$1"), [
        maliciousInput,
      ]);
    });
  });

  describe("createCategory", () => {
    it("should insert category with valid data", async () => {
      const input = { name: "New Category", description: "Desc" };
      const mockResult = {
        rows: [{ id: "1", ...input }],
      };

      vi.mocked(pool.query).mockResolvedValue(mockResult as any);

      const result = await repo.createCategory(input);

      expect(result).toEqual({ id: "1", ...input });
      expect(pool.query).toHaveBeenCalledWith(
        expect.stringContaining("INSERT INTO categories"),
        [input.name, input.description],
      );
    });
  });
});
```

### RepositoryFactory Tests

```typescript
// tests/unit/factory/repository-factory.test.ts
import { describe, it, expect, beforeEach } from "vitest";
import { RepositoryFactory } from "@/libs/database/src/repositories/RepositoryFactory";

describe("RepositoryFactory", () => {
  let factory: RepositoryFactory;

  beforeEach(() => {
    factory = new RepositoryFactory({
      database: {
        type: "postgresql",
        url: "postgresql://localhost",
        key: "test-key",
      },
    });
  });

  describe("getCategoryRepository", () => {
    it("should return same instance on multiple calls", () => {
      const repo1 = factory.getCategoryRepository();
      const repo2 = factory.getCategoryRepository();

      expect(repo1).toBe(repo2);
    });

    it("should create PostgreSQL repository for postgresql type", () => {
      const repo = factory.getCategoryRepository();

      expect(repo).toBeDefined();
      expect(repo.constructor.name).toBe("PostgreSQLCategoryRepository");
    });
  });

  describe("unsupported database types", () => {
    it("should throw error for mongodb (not yet implemented)", () => {
      const factory = new RepositoryFactory({
        database: {
          type: "mongodb",
          url: "mongodb://localhost",
          key: "test-key",
        },
      });

      expect(() => factory.getCategoryRepository()).toThrow(
        "MongoDB adapter not yet implemented",
      );
    });
  });
});
```

---

## Integration Tests

### PostgreSQL Integration Tests

```typescript
// tests/integration/postgresql/category.integration.test.ts
import { describe, it, expect, beforeAll, afterAll, beforeEach } from "vitest";
import { Pool } from "pg";
import { PostgreSQLCategoryRepository } from "@/libs/database/src/adapters/postgresql/PostgreSQLCategoryRepository";

describe("PostgreSQLCategoryRepository Integration", () => {
  let pool: Pool;
  let repo: PostgreSQLCategoryRepository;

  beforeAll(async () => {
    // Setup test database connection
    pool = new Pool({
      connectionString: process.env.TEST_DATABASE_URL,
    });

    repo = new PostgreSQLCategoryRepository(pool);

    // Create test table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS categories (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT
      )
    `);
  });

  afterAll(async () => {
    // Cleanup
    await pool.query("DROP TABLE IF EXISTS categories");
    await pool.end();
  });

  beforeEach(async () => {
    // Clear table before each test
    await pool.query("DELETE FROM categories");
  });

  describe("CRUD operations", () => {
    it("should create and retrieve category", async () => {
      const input = { name: "Test Category", description: "Test Desc" };

      const created = await repo.createCategory(input);
      expect(created.id).toBeDefined();
      expect(created.name).toBe(input.name);

      const retrieved = await repo.getCategoryById(created.id);
      expect(retrieved).toEqual(created);
    });

    it("should update category", async () => {
      const created = await repo.createCategory({
        name: "Original",
        description: "Original Desc",
      });

      const updated = await repo.updateCategory(created.id, {
        name: "Updated",
        description: "Updated Desc",
      });

      expect(updated.name).toBe("Updated");
    });

    it("should delete category", async () => {
      const created = await repo.createCategory({
        name: "To Delete",
        description: "Will be deleted",
      });

      await repo.deleteCategory(created.id);

      const retrieved = await repo.getCategoryById(created.id);
      expect(retrieved).toBeNull();
    });

    it("should list all categories", async () => {
      await repo.createCategory({ name: "Cat 1", description: "Desc 1" });
      await repo.createCategory({ name: "Cat 2", description: "Desc 2" });

      const all = await repo.getAllCategories();

      expect(all).toHaveLength(2);
    });
  });
});
```

---

## API Route Tests

```typescript
// tests/integration/api/categories.api.test.ts
import { describe, it, expect } from "vitest";
import {
  GET,
  POST,
} from "@/apps/website/src/app/lib/network/routes/categories/route";

describe("Categories API Routes", () => {
  describe("GET /api/categories", () => {
    it("should return all categories", async () => {
      const response = await GET();
      const data = await response.json();

      expect(data.success).toBe(true);
      expect(data.data).toBeInstanceOf(Array);
    });
  });

  describe("POST /api/categories", () => {
    it("should create category with valid data", async () => {
      const request = new Request("http://localhost/api/categories", {
        method: "POST",
        body: JSON.stringify({
          name: "Test Category",
          description: "Test Description",
        }),
      });

      const response = await POST(request as any);
      const data = await response.json();

      expect(data.success).toBe(true);
      expect(data.data.name).toBe("Test Category");
    });

    it("should validate required fields", async () => {
      const request = new Request("http://localhost/api/categories", {
        method: "POST",
        body: JSON.stringify({}),
      });

      const response = await POST(request as any);
      const data = await response.json();

      expect(data.success).toBe(false);
      expect(response.status).toBe(400);
    });
  });
});
```

---

## Running Tests

### All Tests

```bash
npm test
```

### Unit Tests Only

```bash
npm test -- tests/unit
```

### Integration Tests Only

```bash
npm test -- tests/integration
```

### Specific Test File

```bash
npm test -- category.repository.test.ts
```

### Watch Mode

```bash
npm test -- --watch
```

### Coverage Report

```bash
npm test -- --coverage
```

---

## Test Coverage Goals

Per constitution requirements:

- **Unit Tests:** ≥ 90% coverage for business logic
- **Integration Tests:** Cover all CRUD operations
- **API Tests:** Cover all endpoints with success and error cases

### Coverage Targets

| Component             | Target | Current |
| --------------------- | ------ | ------- |
| Repository Interfaces | 100%   | Pending |
| PostgreSQL Adapters   | 90%    | Pending |
| RepositoryFactory     | 100%   | Pending |
| API Routes            | 90%    | Pending |

---

## Mocking Strategies

### Mock Repository

```typescript
const mockRepo: ICategoryRepository = {
  getCategoryById: vi.fn().mockResolvedValue(mockCategory),
  getAllCategories: vi.fn().mockResolvedValue([]),
  createCategory: vi.fn().mockResolvedValue(mockCategory),
  updateCategory: vi.fn().mockResolvedValue(mockCategory),
  deleteCategory: vi.fn().mockResolvedValue(undefined),
};
```

### Mock Database Pool

```typescript
const mockPool = {
  query: vi.fn().mockResolvedValue({ rows: [] }),
  connect: vi.fn(),
  end: vi.fn(),
} as any as Pool;
```

### Mock Factory

```typescript
vi.mock("@/libs/database/src/repositories/RepositoryFactory", () => ({
  createRepositoryFactoryFromEnv: () => ({
    getCategoryRepository: () => mockRepo,
  }),
}));
```

---

## Best Practices

1. **Arrange-Act-Assert Pattern**
   - Arrange: Set up test data
   - Act: Execute the function
   - Assert: Verify the result

2. **Test Isolation**
   - Each test should be independent
   - Clean up after tests
   - Use beforeEach/afterEach

3. **Meaningful Names**
   - Describe what is being tested
   - Include expected behavior
   - Use "should" statements

4. **Edge Cases**
   - Test null/undefined inputs
   - Test empty arrays
   - Test error conditions

5. **Parameterized Tests**
   - Use test.each for similar tests
   - Reduce code duplication

---

## Next Steps

1. ✅ Create test file structure
2. ⏳ Implement unit tests for all repositories
3. ⏳ Implement integration tests for PostgreSQL adapters
4. ⏳ Implement API route tests
5. ⏳ Achieve ≥90% coverage
6. ⏳ Set up CI/CD test automation

---

**Last Updated:** January 19, 2026  
**Status:** Guide Complete - Implementation Pending
