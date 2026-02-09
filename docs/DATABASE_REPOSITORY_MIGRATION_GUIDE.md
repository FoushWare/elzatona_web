# Consumer Migration Guide - From Direct Supabase to Repository Pattern

## Overview

This guide shows how to migrate from direct Supabase client calls to the new repository pattern.

## Benefits

- 🔒 **Type Safety**: Full TypeScript support with strict typing
- 🧪 **Testability**: Easy to mock for unit tests
- 🔄 **Flexibility**: Switch database backends without changing component code
- 📦 **Cleaner Code**: Separation of concerns, easier to maintain
- 🚀 **Performance**: Built-in pagination, caching-ready architecture

## Basic Migration Pattern

### Before: Direct Supabase

```typescript
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(url, key);

// In component
const { data, error } = await supabase
  .from("questions")
  .select("*")
  .eq("category", "React")
  .limit(10);

if (error) throw error;
console.log(data);
```

### After: Repository Pattern

```typescript
import { useQuestionRepository } from "@elzatona/database";

// In component
export function MyComponent() {
  const questionRepo = useQuestionRepository();

  const handleLoad = async () => {
    const result = await questionRepo.findByCategory("React", {
      page: 1,
      limit: 10,
    });
    console.log(result.data);
  };

  // ...rest of component
}
```

## Step-by-Step Migration

### 1. Wrap App with RepositoryProvider

**App root file** (`apps/admin/src/app/layout.tsx` or similar):

```typescript
import { RepositoryProvider } from "@elzatona/database";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <RepositoryProvider>
          {children}
        </RepositoryProvider>
      </body>
    </html>
  );
}
```

### 2. Replace Direct Supabase Calls

#### Querying Questions

**Before:**

```typescript
const { data } = await supabase
  .from("questions")
  .select("*")
  .eq("category", "React")
  .eq("difficulty", "hard")
  .limit(20);
```

**After:**

```typescript
const result = await questionRepo.findByFilters(
  {
    category: "React",
    difficulty: "hard",
  },
  { page: 1, limit: 20 },
);
const questions = result.data;
const total = result.pagination.total;
```

#### Getting Single Question

**Before:**

```typescript
const { data, error } = await supabase
  .from("questions")
  .select("*")
  .eq("id", questionId)
  .single();

if (error) return null;
return data;
```

**After:**

```typescript
const question = await questionRepo.findById(questionId);
// Returns Question | null
```

#### Creating Questions

**Before:**

```typescript
const { data, error } = await supabase
  .from("questions")
  .insert({
    question: "What is React?",
    correct_answer: "A library",
    // ...
  })
  .select()
  .single();

if (error) throw error;
return data;
```

**After:**

```typescript
const newQuestion = await questionRepo.create({
  question: "What is React?",
  correctAnswer: "A library",
  options: ["A framework", "A library", "A tool", "A language"],
  category: "React",
  topic: "Basics",
  difficulty: "easy",
  type: "multiple_choice",
});
```

#### Updating Questions

**Before:**

```typescript
const { data, error } = await supabase
  .from("questions")
  .update({
    is_published: true,
  })
  .eq("id", questionId)
  .select()
  .single();
```

**After:**

```typescript
const updated = await questionRepo.update(questionId, {
  isPublished: true,
});
```

#### Deleting Questions

**Before:**

```typescript
await supabase.from("questions").delete().eq("id", questionId);
```

**After:**

```typescript
await questionRepo.delete(questionId);
```

#### Batch Operations

**Create Multiple:**

```typescript
const questions = await questionRepo.createBatch([
  { question: "Q1" /* ... */ },
  { question: "Q2" /* ... */ },
]);
```

**Update Multiple:**

```typescript
await questionRepo.updateBatch([
  { id: "1", ...updates },
  { id: "2", ...updates },
]);
```

**Delete Multiple:**

```typescript
await questionRepo.deleteBatch(["id1", "id2", "id3"]);
```

### 3. Search and Filtering

**Search by Keyword:**

```typescript
const results = await questionRepo.search("TypeScript", {
  page: 1,
  limit: 20,
});
```

**Filter by Category:**

```typescript
const questions = await questionRepo.findByCategory("React", {
  page: 1,
  limit: 10,
});
```

**Filter by Difficulty:**

```typescript
const hardQuestions = await questionRepo.findByDifficulty("hard", {
  limit: 5,
});
```

**Complex Filters:**

```typescript
const filtered = await questionRepo.findByFilters(
  {
    category: "React",
    difficulty: "hard",
    topic: "Hooks",
    isPublished: true,
  },
  { page: 1, limit: 20, orderBy: "createdAt", orderDirection: "desc" },
);
```

### 4. Statistics and Aggregations

**Get Question Statistics:**

```typescript
const stats = await questionRepo.getStatistics();
console.log(stats.total); // Total questions
console.log(stats.published); // Published questions
console.log(stats.byDifficulty); // Breakdown by difficulty
console.log(stats.byCategory); // Breakdown by category
```

**Get Category Statistics:**

```typescript
const categoryStats = await questionRepo.getCategoryStatistics("React");
```

**Count with Filters:**

```typescript
const count = await questionRepo.count({
  category: "React",
  isPublished: true,
});
```

## User Repository Migration

### Get User by Email

**Before:**

```typescript
const { data } = await supabase
  .from("users")
  .select("*")
  .eq("email", email)
  .single();
```

**After:**

```typescript
const user = await userRepo.findByEmail(email);
```

### User Progress

**Get Progress:**

```typescript
const progress = await userRepo.getProgress(userId);
console.log(progress.totalQuestionsAnswered);
console.log(progress.correctAnswers);
console.log(progress.currentStreak);
```

**Update Progress:**

```typescript
await userRepo.updateProgress(userId, {
  totalQuestionsAnswered: 50,
  correctAnswers: 40,
  currentStreak: 5,
});
```

### User Preferences

**Get Preferences:**

```typescript
const prefs = await userRepo.getPreferences(userId);
console.log(prefs.theme); // "dark" or "light"
console.log(prefs.language); // "en", "ar", etc
console.log(prefs.notificationsEnabled);
```

**Update Preferences:**

```typescript
await userRepo.updatePreferences(userId, {
  theme: "dark",
  language: "ar",
  notificationsEnabled: false,
});
```

## Error Handling

All repository methods throw `RepositoryError` on failure:

**Before:**

```typescript
try {
  const { data, error } = await supabase.from("questions").select("*");

  if (error) {
    console.error(error.message);
  }
} catch (e) {
  console.error("Unexpected error", e);
}
```

**After:**

```typescript
try {
  const questions = await questionRepo.findAll();
} catch (error) {
  if (error instanceof RepositoryError) {
    console.error(`Database error: ${error.code}`);
    console.error(error.message);
  } else {
    throw error;
  }
}
```

## React Component Example

### Before: With Direct Supabase

```typescript
"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(url, key);

export function QuestionList() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const { data, error } = await supabase
          .from("questions")
          .select("*")
          .eq("is_active", true)
          .limit(10);

        if (error) throw error;
        setQuestions(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {questions.map((q) => (
        <div key={q.id}>{q.question}</div>
      ))}
    </div>
  );
}
```

### After: With Repository Pattern

```typescript
"use client";

import { useEffect, useState } from "react";
import { useQuestionRepository } from "@elzatona/database";

export function QuestionList() {
  const questionRepo = useQuestionRepository();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const result = await questionRepo.findAll({
          page: 1,
          limit: 10,
        });
        setQuestions(result.data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [questionRepo]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {questions.map((q) => (
        <div key={q.id}>{q.question}</div>
      ))}
    </div>
  );
}
```

## API Route Example

### Before: With Direct Supabase

```typescript
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(url, key);

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = Number.parseInt(searchParams.get("page") || "1");
  const limit = Number.parseInt(searchParams.get("limit") || "10");

  const offset = (page - 1) * limit;

  const { data, count, error } = await supabase
    .from("questions")
    .select("*", { count: "exact" })
    .range(offset, offset + limit - 1);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    data,
    total: count,
    page,
    limit,
  });
}
```

### After: With Repository Pattern

```typescript
import { NextRequest, NextResponse } from "next/server";
import { RepositoryFactory } from "@elzatona/database";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Number.parseInt(searchParams.get("page") || "1");
    const limit = Number.parseInt(searchParams.get("limit") || "10");

    const factory = new RepositoryFactory({
      database: {
        type: "postgresql",
        url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
        key: process.env.SUPABASE_SERVICE_ROLE_KEY!,
      },
    });

    const questionRepo = factory.getQuestionRepository();
    const result = await questionRepo.findAll({
      page,
      limit,
    });

    return NextResponse.json({
      data: result.data,
      pagination: result.pagination,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    );
  }
}
```

## Migration Checklist

- [ ] Install @elzatona/database package in component/app
- [ ] Wrap app layout with RepositoryProvider
- [ ] Create useQuestionRepository hook import statement
- [ ] Replace direct supabase.from("questions").select() calls
- [ ] Update error handling to use RepositoryError
- [ ] Test component behavior after migration
- [ ] Remove direct Supabase imports from component (keep in library layer only)
- [ ] Run tests to verify functionality
- [ ] Update types imports if needed
- [ ] Deploy and monitor

## Testing with Repositories

Using repositories makes testing much easier:

```typescript
// test.tsx
import { render, screen, waitFor } from "@testing-library/react";
import { RepositoryProvider } from "@elzatona/database";

// Mock repository
const mockQuestionRepo = {
  findAll: jest.fn().mockResolvedValue({
    data: [{ id: "1", question: "Test?" }],
    pagination: { total: 1, page: 1, limit: 10 },
  }),
};

// Create test provider
function TestWrapper({ children }) {
  return (
    <RepositoryProvider initialRepositories={mockQuestionRepo}>
      {children}
    </RepositoryProvider>
  );
}

test("renders questions", async () => {
  render(<QuestionList />, { wrapper: TestWrapper });

  await waitFor(() => {
    expect(screen.getByText("Test?")).toBeInTheDocument();
  });
});
```

## Troubleshooting

### "useQuestionRepository must be used within a RepositoryProvider"

- Ensure your app is wrapped with `<RepositoryProvider>` at the root level
- Check that RepositoryProvider is wrapping your component

### Type errors with repository methods

- Verify you're importing from `@elzatona/database`
- Check that DTOs match expected interface types
- Review TypeScript strict mode settings

### Performance issues

- Consider pagination for large result sets
- Use `findByFilters` instead of `findAll()` with subsequent filtering
- Batch operations for multiple creates/updates/deletes

## Next Steps

1. Run tests to verify repositories work correctly
2. Start migrating high-traffic components first
3. Monitor for performance differences
4. Once stable, migrate remaining direct Supabase calls
5. Remove unused Supabase client imports

## Reference Links

- [Repository Interfaces](../src/repositories/interfaces/)
- [Repository Implementation](../src/adapters/postgresql/)
- [Type Definitions](../src/repositories/types/)
- [README](./README.md)
