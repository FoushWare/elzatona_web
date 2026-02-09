# Database Abstraction Layer

A comprehensive database abstraction layer implementing the Repository pattern with dependency injection, providing database-agnostic CRUD operations for the Elzatona Web application.

## Overview

This library provides:

- **Repository Pattern**: Clean separation between business logic and data access
- **Database Agnostic**: Support for multiple databases (PostgreSQL, MongoDB, MySQL)
- **Type Safety**: Full TypeScript support with strict typing
- **Dependency Injection**: Factory pattern for repository creation
- **React Integration**: Context providers and custom hooks
- **Testing Support**: Mock repositories and test utilities

## Architecture

```
Application Layer (Pages/Components)
         ↓
Repository Interface (Abstraction)
         ↓
Repository Factory (DI Container)
         ↓
Database Adapter (Implementation)
         ↓
Database (PostgreSQL/MongoDB/MySQL)
```

## Installation

The database library is already part of the Nx monorepo:

```bash
# No installation needed - it's in libs/database
```

## Usage

### 1. React Components (Client-Side)

Wrap your application with `RepositoryProvider`:

```tsx
// app/layout.tsx or providers.tsx
import { RepositoryProvider } from "@elzatona/database";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <RepositoryProvider>{children}</RepositoryProvider>
      </body>
    </html>
  );
}
```

Use repository hooks in components:

```tsx
// components/QuestionList.tsx
"use client";

import { useQuestionRepository } from "@elzatona/database";
import { useEffect, useState } from "react";

export function QuestionList() {
  const questionRepo = useQuestionRepository();
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    async function loadQuestions() {
      const result = await questionRepo.findAll({ limit: 10 });
      setQuestions(result.data);
    }
    loadQuestions();
  }, [questionRepo]);

  return (
    <div>
      {questions.map((q) => (
        <div key={q.id}>{q.title}</div>
      ))}
    </div>
  );
}
```

### 2. API Routes (Server-Side)

Use repository factory directly:

```tsx
// app/api/questions/route.ts
import { getRepositoryFactory } from "@elzatona/database";
import { NextResponse } from "next/server";

export async function GET() {
  const factory = getRepositoryFactory();
  const questionRepo = factory.getQuestionRepository();

  const questions = await questionRepo.findAll({ limit: 20 });

  return NextResponse.json(questions);
}

export async function POST(request: Request) {
  const factory = getRepositoryFactory();
  const questionRepo = factory.getQuestionRepository();

  const data = await request.json();
  const question = await questionRepo.create(data);

  return NextResponse.json(question);
}
```

### 3. Server Actions

```tsx
// app/actions/questions.ts
"use server";

import { getRepositoryFactory } from "@elzatona/database";

export async function getQuestionById(id: string) {
  const factory = getRepositoryFactory();
  const questionRepo = factory.getQuestionRepository();
  return await questionRepo.findById(id);
}

export async function searchQuestions(query: string) {
  const factory = getRepositoryFactory();
  const questionRepo = factory.getQuestionRepository();
  return await questionRepo.search(query, { limit: 10 });
}
```

## Available Repositories

### Question Repository

```tsx
import { useQuestionRepository } from '@elzatona/database';

const questionRepo = useQuestionRepository();

// Create
await questionRepo.create({ title: 'New Question', ... });
await questionRepo.createBatch([{ ... }, { ... }]);

// Read
await questionRepo.findById('id');
await questionRepo.findAll({ limit: 10, offset: 0 });
await questionRepo.findByCategory('category-id');
await questionRepo.findByTopic('topic-id');
await questionRepo.findByDifficulty('beginner');
await questionRepo.search('keyword');

// Update
await questionRepo.update('id', { title: 'Updated' });
await questionRepo.incrementViewCount('id');

// Delete
await questionRepo.delete('id');
await questionRepo.deleteBatch(['id1', 'id2']);

// Statistics
await questionRepo.getStatistics();
await questionRepo.getCategoryStatistics('category-id');
```

### User Repository

```tsx
import { useUserRepository } from '@elzatona/database';

const userRepo = useUserRepository();

// Create
await userRepo.create({ email: 'user@example.com', ... });

// Read
await userRepo.findById('id');
await userRepo.findByEmail('email@example.com');
await userRepo.findByRole('student');
await userRepo.search('name');

// Update
await userRepo.update('id', { displayName: 'New Name' });
await userRepo.updateProgress('id', { totalPoints: 100, ... });
await userRepo.updatePreferences('id', { theme: 'dark', ... });
await userRepo.verifyEmail('id');
await userRepo.activate('id');
await userRepo.deactivate('id');

// Progress & Preferences
await userRepo.getProgress('id');
await userRepo.getPreferences('id');
await userRepo.getUserStatistics('id');
```

### Plan Repository

```tsx
import { usePlanRepository } from '@elzatona/database';

const planRepo = usePlanRepository();

// Create
await planRepo.create({ title: 'Learning Plan', ... });

// Read
await planRepo.findById('id');
await planRepo.findByCategory('category-id');
await planRepo.findPublished({ limit: 10 });
await planRepo.search('keyword');

// Update
await planRepo.update('id', { title: 'Updated' });
await planRepo.publish('id');
await planRepo.archive('id');

// Enrollment
await planRepo.enrollUser('plan-id', 'user-id');
await planRepo.unenrollUser('plan-id', 'user-id');
await planRepo.getUserEnrollments('user-id');
await planRepo.updateEnrollmentProgress('plan-id', 'user-id', 50, 5);
await planRepo.completeEnrollment('plan-id', 'user-id');

// Statistics
await planRepo.getPlanStatistics('id');
```

### Learning Card Repository

```tsx
import { useLearningCardRepository } from '@elzatona/database';

const cardRepo = useLearningCardRepository();

// Create
await cardRepo.create({ title: 'Card Title', ... });
await cardRepo.createBatch([{ ... }, { ... }]);

// Read
await cardRepo.findById('id');
await cardRepo.findByCategory('category-id');
await cardRepo.findByTopic('topic-id');
await cardRepo.findRelatedCards('card-id', 5);

// Update
await cardRepo.update('id', { title: 'Updated' });
await cardRepo.incrementViewCount('id');
await cardRepo.incrementLikeCount('id');

// User Interactions
await cardRepo.recordView('card-id', 'user-id');
await cardRepo.recordMastery('card-id', 'user-id', 4);
await cardRepo.toggleBookmark('card-id', 'user-id');
await cardRepo.updateNotes('card-id', 'user-id', 'My notes');
await cardRepo.getUserBookmarks('user-id');
```

## Type Definitions

All repository methods use strongly-typed DTOs:

```typescript
import type {
  Question,
  CreateQuestionDTO,
  UpdateQuestionDTO,
  QuestionFilters,
  User,
  CreateUserDTO,
  UpdateUserDTO,
  Plan,
  CreatePlanDTO,
  LearningCard,
  CreateLearningCardDTO,
} from "@elzatona/database";
```

## Query Options

All `findAll` and search methods support consistent query options:

```typescript
interface QueryOptions {
  limit?: number; // Max results (default: 10)
  offset?: number; // Skip results (default: 0)
  orderBy?: string; // Sort field
  orderDirection?: "asc" | "desc"; // Sort direction
  filters?: Record<string, unknown>; // Additional filters
}
```

Example:

```typescript
const result = await questionRepo.findAll({
  limit: 20,
  offset: 0,
  orderBy: "created_at",
  orderDirection: "desc",
});

console.log(result.data); // Array of questions
console.log(result.meta); // Pagination metadata
```

## Error Handling

All repository methods throw `RepositoryError` for consistent error handling:

```typescript
import { RepositoryError, RepositoryErrorType } from "@elzatona/database";

try {
  await questionRepo.findById("invalid-id");
} catch (error) {
  if (error instanceof RepositoryError) {
    switch (error.type) {
      case RepositoryErrorType.NOT_FOUND:
        console.log("Question not found");
        break;
      case RepositoryErrorType.VALIDATION_ERROR:
        console.log("Invalid data");
        break;
      case RepositoryErrorType.DATABASE_ERROR:
        console.log("Database error");
        break;
    }
  }
}
```

## Environment Configuration

Set these environment variables:

```env
# Required
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

# Optional (for admin operations)
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## Custom Configuration

For testing or custom setups, you can provide a custom factory:

```tsx
import { RepositoryFactory, RepositoryProvider } from "@elzatona/database";

const customFactory = new RepositoryFactory({
  database: {
    type: "postgresql",
    url: "custom_url",
    key: "custom_key",
  },
});

function App() {
  return (
    <RepositoryProvider factory={customFactory}>
      {/* Your app */}
    </RepositoryProvider>
  );
}
```

## Testing

### Mock Repositories

Create mock implementations for testing:

```typescript
import { IQuestionRepository } from '@elzatona/database';

class MockQuestionRepository implements IQuestionRepository {
  async findById(id: string) {
    return { id, title: 'Mock Question', ... };
  }

  async findAll() {
    return {
      data: [{ id: '1', title: 'Mock' }],
      meta: { total: 1, limit: 10, offset: 0, hasMore: false }
    };
  }

  // Implement other methods...
}
```

### Testing with Custom Factory

```typescript
import { RepositoryFactory, RepositoryProvider } from '@elzatona/database';
import { render } from '@testing-library/react';

const testFactory = new RepositoryFactory({
  database: {
    type: 'postgresql',
    url: process.env.TEST_DATABASE_URL!,
    key: process.env.TEST_DATABASE_KEY!,
  },
});

function renderWithRepositories(component: React.ReactElement) {
  return render(
    <RepositoryProvider factory={testFactory}>
      {component}
    </RepositoryProvider>
  );
}
```

## Migration from Direct Supabase

### Before (Direct Supabase):

```typescript
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(url, key);

const { data } = await supabase
  .from("questions")
  .select("*")
  .eq("category_id", categoryId);
```

### After (Repository Pattern):

```typescript
import { useQuestionRepository } from "@elzatona/database";

const questionRepo = useQuestionRepository();

const result = await questionRepo.findByCategory(categoryId);
const questions = result.data;
```

## Benefits

✅ **Database Agnostic**: Switch databases without changing application code  
✅ **Type Safe**: Full TypeScript support with compile-time checking  
✅ **Testable**: Easy to mock repositories for unit testing  
✅ **Maintainable**: Centralized data access logic  
✅ **Consistent**: Uniform API across all entities  
✅ **Scalable**: Easy to add new repositories and methods

## Contributing

When adding new entities:

1. Create types in `libs/database/src/repositories/types/`
2. Create interface in `libs/database/src/repositories/interfaces/`
3. Create adapter in `libs/database/src/adapters/postgresql/`
4. Update `RepositoryFactory`
5. Update `RepositoryContext`
6. Add tests

## Support

For issues or questions, see:

- [Database Abstraction Specification](../../refactoring-plans/specs/database-abstraction.spec.md)
- [Database Abstraction Plan](../../refactoring-plans/DATABASE_ABSTRACTION_PLAN.md)

## License

Copyright © 2026 Elzatona Web. All rights reserved.
