# Database Abstraction - Implementation Tasks

## Overview

This file contains structured tasks for implementing the full database abstraction layer migration. Each task is self-contained with clear inputs, outputs, and code.

---

## 🔴 CRITICAL TASKS (Must Complete First)

### TASK-001: Create ICategoryRepository Interface

**Priority:** CRITICAL  
**Estimated Time:** 15 minutes  
**File:** `libs/database/src/repositories/interfaces/ICategoryRepository.ts`

**Input:** None (new file)

**Output:** TypeScript interface for category operations

**Code:**

```typescript
/**
 * Category Repository Interface
 * Defines contracts for category data operations
 */

import { QueryOptions, PaginatedResult } from "../types";

export interface Category {
  id: string;
  name: string;
  description?: string;
  slug?: string;
  icon?: string;
  color?: string;
  parent_id?: string | null;
  order_index?: number;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface CreateCategoryDTO {
  name: string;
  description?: string;
  slug?: string;
  icon?: string;
  color?: string;
  parent_id?: string | null;
  order_index?: number;
  is_active?: boolean;
}

export interface UpdateCategoryDTO {
  name?: string;
  description?: string;
  slug?: string;
  icon?: string;
  color?: string;
  parent_id?: string | null;
  order_index?: number;
  is_active?: boolean;
}

export interface ICategoryRepository {
  create(category: CreateCategoryDTO): Promise<Category>;
  findById(id: string): Promise<Category | null>;
  findBySlug(slug: string): Promise<Category | null>;
  findAll(options?: QueryOptions): Promise<PaginatedResult<Category>>;
  findByParent(
    parentId: string | null,
    options?: QueryOptions,
  ): Promise<PaginatedResult<Category>>;
  findActive(options?: QueryOptions): Promise<PaginatedResult<Category>>;
  update(id: string, category: UpdateCategoryDTO): Promise<Category>;
  delete(id: string): Promise<void>;
  getCategoryStatistics(
    id: string,
  ): Promise<{ questionCount: number; topicCount: number }>;
}
```

**Verification:** Run `npx tsc --noEmit` - should pass

---

### TASK-002: Create ITopicRepository Interface

**Priority:** CRITICAL  
**Estimated Time:** 15 minutes  
**File:** `libs/database/src/repositories/interfaces/ITopicRepository.ts`

**Code:**

```typescript
/**
 * Topic Repository Interface
 */

import { QueryOptions, PaginatedResult } from "../types";

export interface Topic {
  id: string;
  name: string;
  description?: string;
  slug?: string;
  category_id?: string;
  parent_id?: string | null;
  order_index?: number;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface CreateTopicDTO {
  name: string;
  description?: string;
  slug?: string;
  category_id?: string;
  parent_id?: string | null;
  order_index?: number;
  is_active?: boolean;
}

export interface UpdateTopicDTO {
  name?: string;
  description?: string;
  slug?: string;
  category_id?: string;
  parent_id?: string | null;
  order_index?: number;
  is_active?: boolean;
}

export interface ITopicRepository {
  create(topic: CreateTopicDTO): Promise<Topic>;
  createBatch(topics: CreateTopicDTO[]): Promise<Topic[]>;
  findById(id: string): Promise<Topic | null>;
  findBySlug(slug: string): Promise<Topic | null>;
  findAll(options?: QueryOptions): Promise<PaginatedResult<Topic>>;
  findByCategory(
    categoryId: string,
    options?: QueryOptions,
  ): Promise<PaginatedResult<Topic>>;
  findByParent(
    parentId: string | null,
    options?: QueryOptions,
  ): Promise<PaginatedResult<Topic>>;
  findActive(options?: QueryOptions): Promise<PaginatedResult<Topic>>;
  update(id: string, topic: UpdateTopicDTO): Promise<Topic>;
  delete(id: string): Promise<void>;
  deleteBatch(ids: string[]): Promise<void>;
  getTopicStatistics(id: string): Promise<{ questionCount: number }>;
}
```

---

### TASK-003: Create ISectionRepository Interface

**Priority:** CRITICAL  
**Estimated Time:** 10 minutes  
**File:** `libs/database/src/repositories/interfaces/ISectionRepository.ts`

**Code:**

```typescript
/**
 * Section Repository Interface
 */

import { QueryOptions, PaginatedResult } from "../types";

export interface Section {
  id: string;
  name: string;
  description?: string;
  plan_id?: string;
  order_index?: number;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface CreateSectionDTO {
  name: string;
  description?: string;
  plan_id?: string;
  order_index?: number;
  is_active?: boolean;
}

export interface UpdateSectionDTO {
  name?: string;
  description?: string;
  plan_id?: string;
  order_index?: number;
  is_active?: boolean;
}

export interface ISectionRepository {
  create(section: CreateSectionDTO): Promise<Section>;
  findById(id: string): Promise<Section | null>;
  findAll(options?: QueryOptions): Promise<PaginatedResult<Section>>;
  findByPlan(
    planId: string,
    options?: QueryOptions,
  ): Promise<PaginatedResult<Section>>;
  findActive(options?: QueryOptions): Promise<PaginatedResult<Section>>;
  update(id: string, section: UpdateSectionDTO): Promise<Section>;
  delete(id: string): Promise<void>;
}
```

---

### TASK-004: Create IFlashcardRepository Interface

**Priority:** CRITICAL  
**Estimated Time:** 10 minutes  
**File:** `libs/database/src/repositories/interfaces/IFlashcardRepository.ts`

**Code:**

```typescript
/**
 * Flashcard Repository Interface
 */

import { QueryOptions, PaginatedResult } from "../types";

export interface Flashcard {
  id: string;
  user_id: string;
  question: string;
  answer: string;
  category_id?: string;
  topic_id?: string;
  difficulty?: string;
  tags?: string[];
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface CreateFlashcardDTO {
  user_id: string;
  question: string;
  answer: string;
  category_id?: string;
  topic_id?: string;
  difficulty?: string;
  tags?: string[];
  is_active?: boolean;
}

export interface UpdateFlashcardDTO {
  question?: string;
  answer?: string;
  category_id?: string;
  topic_id?: string;
  difficulty?: string;
  tags?: string[];
  is_active?: boolean;
}

export interface IFlashcardRepository {
  create(flashcard: CreateFlashcardDTO): Promise<Flashcard>;
  createBatch(flashcards: CreateFlashcardDTO[]): Promise<Flashcard[]>;
  findById(id: string): Promise<Flashcard | null>;
  findAll(options?: QueryOptions): Promise<PaginatedResult<Flashcard>>;
  findByUser(
    userId: string,
    options?: QueryOptions,
  ): Promise<PaginatedResult<Flashcard>>;
  findByCategory(
    categoryId: string,
    options?: QueryOptions,
  ): Promise<PaginatedResult<Flashcard>>;
  findByTopic(
    topicId: string,
    options?: QueryOptions,
  ): Promise<PaginatedResult<Flashcard>>;
  update(id: string, flashcard: UpdateFlashcardDTO): Promise<Flashcard>;
  delete(id: string): Promise<void>;
  deleteBatch(ids: string[]): Promise<void>;
}
```

---

### TASK-005: Create IProgressRepository Interface

**Priority:** CRITICAL  
**Estimated Time:** 15 minutes  
**File:** `libs/database/src/repositories/interfaces/IProgressRepository.ts`

**Code:**

```typescript
/**
 * Progress Repository Interface
 */

import { QueryOptions, PaginatedResult } from "../types";

export interface UserProgress {
  id: string;
  user_id: string;
  question_id?: string;
  plan_id?: string;
  section_id?: string;
  status: "not_started" | "in_progress" | "completed";
  score?: number;
  attempts?: number;
  time_spent?: number;
  completed_at?: string;
  created_at?: string;
  updated_at?: string;
}

export interface QuestionAttempt {
  id: string;
  user_id: string;
  question_id: string;
  is_correct: boolean;
  answer_given?: string;
  time_taken?: number;
  created_at?: string;
}

export interface CreateProgressDTO {
  user_id: string;
  question_id?: string;
  plan_id?: string;
  section_id?: string;
  status?: "not_started" | "in_progress" | "completed";
  score?: number;
}

export interface UpdateProgressDTO {
  status?: "not_started" | "in_progress" | "completed";
  score?: number;
  attempts?: number;
  time_spent?: number;
  completed_at?: string;
}

export interface CreateAttemptDTO {
  user_id: string;
  question_id: string;
  is_correct: boolean;
  answer_given?: string;
  time_taken?: number;
}

export interface IProgressRepository {
  createProgress(progress: CreateProgressDTO): Promise<UserProgress>;
  recordAttempt(attempt: CreateAttemptDTO): Promise<QuestionAttempt>;
  findProgressById(id: string): Promise<UserProgress | null>;
  findProgressByUser(
    userId: string,
    options?: QueryOptions,
  ): Promise<PaginatedResult<UserProgress>>;
  findProgressByPlan(
    userId: string,
    planId: string,
  ): Promise<UserProgress | null>;
  findProgressByQuestion(
    userId: string,
    questionId: string,
  ): Promise<UserProgress | null>;
  getAttemptsByUser(
    userId: string,
    options?: QueryOptions,
  ): Promise<PaginatedResult<QuestionAttempt>>;
  getAttemptsByQuestion(
    userId: string,
    questionId: string,
  ): Promise<QuestionAttempt[]>;
  updateProgress(
    id: string,
    progress: UpdateProgressDTO,
  ): Promise<UserProgress>;
  upsertProgress(progress: CreateProgressDTO): Promise<UserProgress>;
  getUserStatistics(userId: string): Promise<{
    totalQuestions: number;
    completedQuestions: number;
    averageScore: number;
    totalTimeSpent: number;
  }>;
  getPlanProgress(
    userId: string,
    planId: string,
  ): Promise<{
    completedSections: number;
    totalSections: number;
    percentage: number;
  }>;
}
```

---

### TASK-006: Update Interfaces Index Export

**Priority:** CRITICAL  
**Estimated Time:** 5 minutes  
**File:** `libs/database/src/repositories/interfaces/index.ts`

**Action:** Add exports for new interfaces

**Code to ADD:**

```typescript
// Add these exports to existing file
export * from "./ICategoryRepository";
export * from "./ITopicRepository";
export * from "./ISectionRepository";
export * from "./IFlashcardRepository";
export * from "./IProgressRepository";
```

---

## 🟠 HIGH PRIORITY TASKS (PostgreSQL Adapters)

### TASK-007: Create PostgreSQLCategoryRepository

**Priority:** HIGH  
**Estimated Time:** 30 minutes  
**File:** `libs/database/src/adapters/postgresql/PostgreSQLCategoryRepository.ts`

**Dependencies:** TASK-001

**Code:** See full implementation in `DATABASE_ABSTRACTION_FULL_MIGRATION_PLAN.md` Task 2.1

---

### TASK-008: Create PostgreSQLTopicRepository

**Priority:** HIGH  
**Estimated Time:** 30 minutes  
**File:** `libs/database/src/adapters/postgresql/PostgreSQLTopicRepository.ts`

**Dependencies:** TASK-002

**Code:** See full implementation in `DATABASE_ABSTRACTION_FULL_MIGRATION_PLAN.md` Task 2.2

---

### TASK-009: Create PostgreSQLSectionRepository

**Priority:** HIGH  
**Estimated Time:** 25 minutes  
**File:** `libs/database/src/adapters/postgresql/PostgreSQLSectionRepository.ts`

**Dependencies:** TASK-003

**Code:** See full implementation in `DATABASE_ABSTRACTION_FULL_MIGRATION_PLAN.md` Task 2.3

---

### TASK-010: Create PostgreSQLFlashcardRepository

**Priority:** HIGH  
**Estimated Time:** 25 minutes  
**File:** `libs/database/src/adapters/postgresql/PostgreSQLFlashcardRepository.ts`

**Dependencies:** TASK-004

**Code:** See full implementation in `DATABASE_ABSTRACTION_FULL_MIGRATION_PLAN.md` Task 2.4

---

### TASK-011: Create PostgreSQLProgressRepository

**Priority:** HIGH  
**Estimated Time:** 35 minutes  
**File:** `libs/database/src/adapters/postgresql/PostgreSQLProgressRepository.ts`

**Dependencies:** TASK-005

**Code:** See full implementation in `DATABASE_ABSTRACTION_FULL_MIGRATION_PLAN.md` Task 2.5

---

### TASK-012: Update PostgreSQL Adapters Index

**Priority:** HIGH  
**Estimated Time:** 5 minutes  
**File:** `libs/database/src/adapters/postgresql/index.ts`

**Code to ADD:**

```typescript
export * from "./PostgreSQLCategoryRepository";
export * from "./PostgreSQLTopicRepository";
export * from "./PostgreSQLSectionRepository";
export * from "./PostgreSQLFlashcardRepository";
export * from "./PostgreSQLProgressRepository";
```

---

### TASK-013: Update RepositoryFactory

**Priority:** HIGH  
**Estimated Time:** 20 minutes  
**File:** `libs/database/src/repositories/RepositoryFactory.ts`

**Action:** Add new repository getters and factory methods

**Code:** See full implementation in `DATABASE_ABSTRACTION_FULL_MIGRATION_PLAN.md` Task 1.2

---

## 🟡 MEDIUM PRIORITY TASKS (API Routes Migration)

### TASK-014: Migrate Website Categories Route

**Priority:** MEDIUM  
**Estimated Time:** 20 minutes  
**File:** `apps/website/src/app/lib/network/routes/categories/route.ts`

**Dependencies:** TASK-007, TASK-013

**Code:** See `DATABASE_ABSTRACTION_FULL_MIGRATION_PLAN.md` Task 3.1

---

### TASK-015: Migrate Website Topics Route

**Priority:** MEDIUM  
**Estimated Time:** 20 minutes  
**File:** `apps/website/src/app/lib/network/routes/topics/[id]/route.ts`

**Dependencies:** TASK-008, TASK-013

**Code:** See `DATABASE_ABSTRACTION_FULL_MIGRATION_PLAN.md` Task 3.2

---

### TASK-016: Migrate Website Questions Route

**Priority:** MEDIUM  
**Estimated Time:** 25 minutes  
**File:** `apps/website/src/app/lib/network/routes/questions/unified/route.ts`

**Dependencies:** TASK-013

**Code:** See `DATABASE_ABSTRACTION_FULL_MIGRATION_PLAN.md` Task 3.3

---

### TASK-017: Migrate Website Flashcards Route

**Priority:** MEDIUM  
**Estimated Time:** 20 minutes  
**File:** `apps/website/src/app/lib/network/routes/flashcards/route.ts`

**Dependencies:** TASK-010, TASK-013

**Code:** See `DATABASE_ABSTRACTION_FULL_MIGRATION_PLAN.md` Task 3.4

---

### TASK-018: Migrate Website Progress Route

**Priority:** MEDIUM  
**Estimated Time:** 20 minutes  
**File:** `apps/website/src/app/lib/network/routes/progress/save/route.ts`

**Dependencies:** TASK-011, TASK-013

**Code:** See `DATABASE_ABSTRACTION_FULL_MIGRATION_PLAN.md` Task 3.5

---

## 🟢 LOW PRIORITY TASKS (Services & Cleanup)

### TASK-019: Migrate supabase-questions.ts Service

**Priority:** LOW  
**Estimated Time:** 15 minutes  
**File:** `apps/website/src/app/lib/supabase-questions.ts`

**Code:** See `DATABASE_ABSTRACTION_FULL_MIGRATION_PLAN.md` Task 4.1

---

### TASK-020: Migrate supabase-flashcards.ts Service

**Priority:** LOW  
**Estimated Time:** 15 minutes  
**File:** `apps/website/src/app/lib/supabase-flashcards.ts`

**Code:** See `DATABASE_ABSTRACTION_FULL_MIGRATION_PLAN.md` Task 4.2

---

### TASK-021: Migrate supabase-progress.ts Service

**Priority:** LOW  
**Estimated Time:** 15 minutes  
**File:** `apps/website/src/app/lib/supabase-progress.ts`

**Code:** See `DATABASE_ABSTRACTION_FULL_MIGRATION_PLAN.md` Task 4.3

---

### TASK-022: Migrate useLearningCards Hook

**Priority:** LOW  
**Estimated Time:** 20 minutes  
**File:** `apps/admin/src/app/admin/learning-cards/hooks/useLearningCards.ts`

**Code:** See `DATABASE_ABSTRACTION_FULL_MIGRATION_PLAN.md` Task 5.1

---

### TASK-023: Remove Legacy Supabase Files

**Priority:** LOW  
**Estimated Time:** 10 minutes  
**Action:** Delete files after all migrations complete

**Files to delete:**

- `apps/website/src/app/lib/supabase.ts`
- `apps/website/src/app/lib/supabase-client.ts`
- `apps/website/src/app/lib/get-supabase-client.ts`
- `apps/admin/src/lib/supabase-client.ts`

---

## Execution Order

```
Phase 1: Interfaces (TASK-001 to TASK-006)
    ↓
Phase 2: Adapters (TASK-007 to TASK-013)
    ↓
Phase 3: API Routes (TASK-014 to TASK-018)
    ↓
Phase 4: Services (TASK-019 to TASK-022)
    ↓
Phase 5: Cleanup (TASK-023)
```

## Summary

| Phase     | Tasks                | Estimated Time |
| --------- | -------------------- | -------------- |
| Phase 1   | TASK-001 to TASK-006 | 1.5 hours      |
| Phase 2   | TASK-007 to TASK-013 | 3 hours        |
| Phase 3   | TASK-014 to TASK-018 | 2 hours        |
| Phase 4   | TASK-019 to TASK-022 | 1.5 hours      |
| Phase 5   | TASK-023             | 0.5 hours      |
| **Total** | **23 tasks**         | **8.5 hours**  |

---

## GPT-4.1 Implementation Instructions

1. **Start with Phase 1** - Create all interfaces first
2. **Run TypeScript check** after each task: `npx tsc --noEmit`
3. **Create adapters** following the interface contracts
4. **Test each adapter** before moving to routes
5. **Migrate routes** one at a time, test after each
6. **Clean up** legacy files only after full verification
