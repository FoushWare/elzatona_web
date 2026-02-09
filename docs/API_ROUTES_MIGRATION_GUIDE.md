# API Routes Migration to Repository Pattern

## Overview

This guide documents the migration of admin API routes from direct Supabase access to the repository pattern using `RepositoryFactory`.

## Migration Status

### ✅ Completed Migrations

#### 1. Dashboard Stats Route

- **File**: `apps/admin/src/app/api/admin/dashboard-stats/route.ts`
- **Changes**:
  - Replaced direct Supabase client creation with `RepositoryFactory.getRepository()`
  - Used `findAll()` methods to fetch counts instead of Supabase count API
  - Eliminated `createClient()` and direct table access

**Before:**

```typescript
const supabase = createClient(supabaseUrl, supabaseServiceKey);
const questionsResult = await supabase
  .from("questions")
  .select("id", { count: "exact", head: true });
```

**After:**

```typescript
const questionRepository = RepositoryFactory.getRepository("question");
const questions = await questionRepository.findAll();
const count = questions?.length || 0;
```

### ⏳ Pending Migrations

#### 1. Frontend Tasks Routes

- **File**: `apps/admin/src/app/api/admin/frontend-tasks/route.ts`
- **File**: `apps/admin/src/app/api/admin/frontend-tasks/[id]/route.ts`
- **Status**: Requires new `QuestionRepository` methods
- **Reason**: Frontend tasks are stored as questions with `type: 'task'`
- **Required Repository Methods**:
  - `findByType(type: 'task')` - Get all frontend tasks
  - `findByFilters()` with category/difficulty filters
  - `search()` - For title/description search
  - `update(id, data)` - For PUT operations
  - `delete(id)` - For DELETE operations

**Migration Plan:**

```typescript
// GET /api/admin/frontend-tasks
const questionRepository = RepositoryFactory.getRepository("question");
const tasks = await questionRepository.findByType("task");
// Apply filters and pagination client-side
```

#### 2. Problem Solving Routes

- **File**: `apps/admin/src/app/api/admin/problem-solving/route.ts`
- **File**: `apps/admin/src/app/api/admin/problem-solving/[id]/route.ts`
- **Status**: Requires question repository methods
- **Reason**: Problem solving items are stored as questions with `type: 'problem'`
- **Required Repository Methods**: Same as frontend tasks

**Migration Plan:**

```typescript
// GET /api/admin/problem-solving
const questionRepository = RepositoryFactory.getRepository("question");
const problems = await questionRepository.findByType("problem");
```

#### 3. Auth Route

- **File**: `apps/admin/src/app/api/admin/auth/route.ts`
- **Status**: Requires admin-specific user repository methods
- **Reason**: Needs to authenticate admin users and return auth tokens

## Implementation Steps

### Step 1: Extend Repository Interfaces

Update `IQuestionRepository` to include missing methods:

```typescript
// libs/database/src/repositories/interfaces/IQuestionRepository.ts
export interface IQuestionRepository {
  // Existing methods...

  // New methods needed
  findByType(type: string): Promise<Question[]>;
  findByCategory(category: string): Promise<Question[]>;
  findByDifficulty(difficulty: string): Promise<Question[]>;
  search(
    query: string,
    filters?: {
      category?: string;
      difficulty?: string;
      type?: string;
    },
  ): Promise<Question[]>;
}
```

### Step 2: Implement New Methods in PostgreSQL Adapter

```typescript
// libs/database/src/adapters/postgresql/PostgreSQLQuestionRepository.ts
async findByType(type: string): Promise<Question[]> {
  const { data, error } = await this.client
    .from('questions')
    .select('*')
    .eq('type', type)
    .order('created_at', { ascending: false });

  if (error) throw new RepositoryError(error.message);
  return data || [];
}

async search(
  query: string,
  filters?: { category?: string; difficulty?: string; type?: string }
): Promise<Question[]> {
  let queryBuilder = this.client.from('questions').select('*');

  if (filters?.category) {
    queryBuilder = queryBuilder.eq('category', filters.category);
  }
  if (filters?.difficulty) {
    queryBuilder = queryBuilder.eq('difficulty', filters.difficulty);
  }
  if (filters?.type) {
    queryBuilder = queryBuilder.eq('type', filters.type);
  }

  const { data, error } = await queryBuilder.order('created_at', { ascending: false });
  if (error) throw new RepositoryError(error.message);

  // Client-side filtering for search text
  if (query) {
    const lowerQuery = query.toLowerCase();
    return (data || []).filter(q =>
      q.title?.toLowerCase().includes(lowerQuery) ||
      q.description?.toLowerCase().includes(lowerQuery)
    );
  }

  return data || [];
}
```

### Step 3: Migrate API Routes

#### Frontend Tasks Route Migration

```typescript
// apps/admin/src/app/api/admin/frontend-tasks/route.ts
import { RepositoryFactory } from "@elzatona/database";

export async function GET(request: NextRequest) {
  try {
    const questionRepository = RepositoryFactory.getRepository("question");

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";
    const difficulty = searchParams.get("difficulty") || "";

    // Use repository search with filters
    const tasks = await questionRepository.search(search, {
      type: "task",
      category: category || undefined,
      difficulty: difficulty || undefined,
    });

    // Client-side pagination
    const startIndex = (page - 1) * limit;
    const paginatedData = tasks.slice(startIndex, startIndex + limit);

    return NextResponse.json({
      success: true,
      data: paginatedData,
      total: tasks.length,
      page,
      limit,
      hasMore: startIndex + limit < tasks.length,
    });
  } catch (error) {
    console.error("Error fetching frontend tasks:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch frontend tasks" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const questionRepository = RepositoryFactory.getRepository("question");
    const body = await request.json();

    // Validate required fields
    if (!body.title || !body.description || !body.category) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Create using repository
    const newQuestion = await questionRepository.create({
      title: body.title,
      description: body.description,
      type: "task",
      category: body.category,
      difficulty: body.difficulty,
      // ... other fields
    });

    return NextResponse.json(
      { success: true, data: { id: newQuestion.id } },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to create frontend task" },
      { status: 500 },
    );
  }
}
```

## Benefits of Migration

1. **Type Safety**: Repositories provide full TypeScript support vs raw Supabase queries
2. **Testability**: Repositories can be mocked for unit testing
3. **Consistency**: All database access goes through a single abstraction
4. **Flexibility**: Easy to switch databases later (e.g., from PostgreSQL to MongoDB)
5. **Error Handling**: Centralized error handling through RepositoryError
6. **Performance**: Built-in caching and optimization at repository level

## Testing Strategy

### Unit Tests for API Routes

```typescript
// Test with mocked repositories
jest.mock("@elzatona/database", () => ({
  RepositoryFactory: {
    getRepository: jest.fn(() => ({
      findByType: jest
        .fn()
        .mockResolvedValue([{ id: "1", title: "Task 1", type: "task" }]),
    })),
  },
}));

describe("GET /api/admin/frontend-tasks", () => {
  it("should return frontend tasks", async () => {
    const response = await GET(mockRequest);
    expect(response.status).toBe(200);
    const json = await response.json();
    expect(json.success).toBe(true);
    expect(json.data).toHaveLength(1);
  });
});
```

## Timeline

- **Phase 1** (1 day): Extend repository interfaces with new methods
- **Phase 2** (2 days): Implement new methods in PostgreSQL adapter
- **Phase 3** (1 day): Migrate API routes
- **Phase 4** (1 day): Write tests and verify functionality

**Total: 5 days**

## Rollback Plan

If issues arise during migration:

1. Revert to previous commit before migration
2. API routes will continue using direct Supabase access
3. New repository features available for gradual adoption
4. No breaking changes to client code

## Next Steps

1. Extend `IQuestionRepository` with `findByType()` and `search()` methods
2. Implement these methods in `PostgreSQLQuestionRepository`
3. Migrate frontend-tasks routes
4. Migrate problem-solving routes
5. Verify all tests pass
6. Create PR and merge to develop
