# Database Abstraction Layer - Full Migration Plan

## Overview

This document provides a comprehensive migration plan to convert all direct Supabase usage to the repository pattern, enabling support for multiple databases (PostgreSQL, MongoDB, Firebase, MySQL).

**Current State:**
- Admin app API routes: ✅ Mostly migrated
- Website app: ❌ Uses direct Supabase calls extensively
- Shared libraries: ❌ Some direct Supabase usage

**Target State:**
- All data access through repository interfaces
- Database type configurable via `DATABASE_TYPE` env variable
- Support for PostgreSQL, MongoDB, Firebase, MySQL

---

## Phase 1: Core Infrastructure (Priority: CRITICAL)

### Task 1.1: Extend Repository Interfaces for Missing Entities

**Files to create/modify:**
- `libs/database/src/repositories/interfaces/ICategoryRepository.ts`
- `libs/database/src/repositories/interfaces/ITopicRepository.ts`
- `libs/database/src/repositories/interfaces/ISectionRepository.ts`
- `libs/database/src/repositories/interfaces/IFlashcardRepository.ts`
- `libs/database/src/repositories/interfaces/IProgressRepository.ts`

#### Code: ICategoryRepository.ts

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
  // CREATE
  create(category: CreateCategoryDTO): Promise<Category>;

  // READ
  findById(id: string): Promise<Category | null>;
  findBySlug(slug: string): Promise<Category | null>;
  findAll(options?: QueryOptions): Promise<PaginatedResult<Category>>;
  findByParent(parentId: string | null, options?: QueryOptions): Promise<PaginatedResult<Category>>;
  findActive(options?: QueryOptions): Promise<PaginatedResult<Category>>;

  // UPDATE
  update(id: string, category: UpdateCategoryDTO): Promise<Category>;

  // DELETE
  delete(id: string): Promise<void>;

  // STATISTICS
  getCategoryStatistics(id: string): Promise<{ questionCount: number; topicCount: number }>;
}
```

#### Code: ITopicRepository.ts

```typescript
/**
 * Topic Repository Interface
 * Defines contracts for topic data operations
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
  // CREATE
  create(topic: CreateTopicDTO): Promise<Topic>;
  createBatch(topics: CreateTopicDTO[]): Promise<Topic[]>;

  // READ
  findById(id: string): Promise<Topic | null>;
  findBySlug(slug: string): Promise<Topic | null>;
  findAll(options?: QueryOptions): Promise<PaginatedResult<Topic>>;
  findByCategory(categoryId: string, options?: QueryOptions): Promise<PaginatedResult<Topic>>;
  findByParent(parentId: string | null, options?: QueryOptions): Promise<PaginatedResult<Topic>>;
  findActive(options?: QueryOptions): Promise<PaginatedResult<Topic>>;

  // UPDATE
  update(id: string, topic: UpdateTopicDTO): Promise<Topic>;

  // DELETE
  delete(id: string): Promise<void>;
  deleteBatch(ids: string[]): Promise<void>;

  // STATISTICS
  getTopicStatistics(id: string): Promise<{ questionCount: number }>;
}
```

#### Code: ISectionRepository.ts

```typescript
/**
 * Section Repository Interface
 * Defines contracts for section data operations
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
  // CREATE
  create(section: CreateSectionDTO): Promise<Section>;

  // READ
  findById(id: string): Promise<Section | null>;
  findAll(options?: QueryOptions): Promise<PaginatedResult<Section>>;
  findByPlan(planId: string, options?: QueryOptions): Promise<PaginatedResult<Section>>;
  findActive(options?: QueryOptions): Promise<PaginatedResult<Section>>;

  // UPDATE
  update(id: string, section: UpdateSectionDTO): Promise<Section>;

  // DELETE
  delete(id: string): Promise<void>;
}
```

#### Code: IFlashcardRepository.ts

```typescript
/**
 * Flashcard Repository Interface
 * Defines contracts for flashcard data operations
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
  // CREATE
  create(flashcard: CreateFlashcardDTO): Promise<Flashcard>;
  createBatch(flashcards: CreateFlashcardDTO[]): Promise<Flashcard[]>;

  // READ
  findById(id: string): Promise<Flashcard | null>;
  findAll(options?: QueryOptions): Promise<PaginatedResult<Flashcard>>;
  findByUser(userId: string, options?: QueryOptions): Promise<PaginatedResult<Flashcard>>;
  findByCategory(categoryId: string, options?: QueryOptions): Promise<PaginatedResult<Flashcard>>;
  findByTopic(topicId: string, options?: QueryOptions): Promise<PaginatedResult<Flashcard>>;

  // UPDATE
  update(id: string, flashcard: UpdateFlashcardDTO): Promise<Flashcard>;

  // DELETE
  delete(id: string): Promise<void>;
  deleteBatch(ids: string[]): Promise<void>;
}
```

#### Code: IProgressRepository.ts

```typescript
/**
 * Progress Repository Interface
 * Defines contracts for user progress data operations
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
  // CREATE
  createProgress(progress: CreateProgressDTO): Promise<UserProgress>;
  recordAttempt(attempt: CreateAttemptDTO): Promise<QuestionAttempt>;

  // READ
  findProgressById(id: string): Promise<UserProgress | null>;
  findProgressByUser(userId: string, options?: QueryOptions): Promise<PaginatedResult<UserProgress>>;
  findProgressByPlan(userId: string, planId: string): Promise<UserProgress | null>;
  findProgressByQuestion(userId: string, questionId: string): Promise<UserProgress | null>;
  getAttemptsByUser(userId: string, options?: QueryOptions): Promise<PaginatedResult<QuestionAttempt>>;
  getAttemptsByQuestion(userId: string, questionId: string): Promise<QuestionAttempt[]>;

  // UPDATE
  updateProgress(id: string, progress: UpdateProgressDTO): Promise<UserProgress>;
  upsertProgress(progress: CreateProgressDTO): Promise<UserProgress>;

  // STATISTICS
  getUserStatistics(userId: string): Promise<{
    totalQuestions: number;
    completedQuestions: number;
    averageScore: number;
    totalTimeSpent: number;
  }>;
  getPlanProgress(userId: string, planId: string): Promise<{
    completedSections: number;
    totalSections: number;
    percentage: number;
  }>;
}
```

---

### Task 1.2: Update Repository Factory

**File:** `libs/database/src/repositories/RepositoryFactory.ts`

#### Code: Add new repository getters

```typescript
// Add imports at the top
import {
  ICategoryRepository,
  ITopicRepository,
  ISectionRepository,
  IFlashcardRepository,
  IProgressRepository,
} from "../repositories";

import {
  PostgreSQLCategoryRepository,
  PostgreSQLTopicRepository,
  PostgreSQLSectionRepository,
  PostgreSQLFlashcardRepository,
  PostgreSQLProgressRepository,
} from "../adapters/postgresql";

// Add to RepositoryFactory class
export class RepositoryFactory {
  // ... existing properties ...
  private categoryRepository?: ICategoryRepository;
  private topicRepository?: ITopicRepository;
  private sectionRepository?: ISectionRepository;
  private flashcardRepository?: IFlashcardRepository;
  private progressRepository?: IProgressRepository;

  // Add new getters
  getCategoryRepository(): ICategoryRepository {
    if (!this.categoryRepository) {
      this.categoryRepository = this.createCategoryRepository();
    }
    return this.categoryRepository;
  }

  getTopicRepository(): ITopicRepository {
    if (!this.topicRepository) {
      this.topicRepository = this.createTopicRepository();
    }
    return this.topicRepository;
  }

  getSectionRepository(): ISectionRepository {
    if (!this.sectionRepository) {
      this.sectionRepository = this.createSectionRepository();
    }
    return this.sectionRepository;
  }

  getFlashcardRepository(): IFlashcardRepository {
    if (!this.flashcardRepository) {
      this.flashcardRepository = this.createFlashcardRepository();
    }
    return this.flashcardRepository;
  }

  getProgressRepository(): IProgressRepository {
    if (!this.progressRepository) {
      this.progressRepository = this.createProgressRepository();
    }
    return this.progressRepository;
  }

  // Add factory methods
  private createCategoryRepository(): ICategoryRepository {
    switch (this.config.database.type) {
      case "postgresql":
        return new PostgreSQLCategoryRepository(this.getPostgreSQLConfig());
      case "mongodb":
        throw new Error("MongoDB adapter not yet implemented");
      case "mysql":
        throw new Error("MySQL adapter not yet implemented");
      default:
        throw new Error(`Unsupported database type: ${this.config.database.type}`);
    }
  }

  private createTopicRepository(): ITopicRepository {
    switch (this.config.database.type) {
      case "postgresql":
        return new PostgreSQLTopicRepository(this.getPostgreSQLConfig());
      case "mongodb":
        throw new Error("MongoDB adapter not yet implemented");
      case "mysql":
        throw new Error("MySQL adapter not yet implemented");
      default:
        throw new Error(`Unsupported database type: ${this.config.database.type}`);
    }
  }

  private createSectionRepository(): ISectionRepository {
    switch (this.config.database.type) {
      case "postgresql":
        return new PostgreSQLSectionRepository(this.getPostgreSQLConfig());
      case "mongodb":
        throw new Error("MongoDB adapter not yet implemented");
      case "mysql":
        throw new Error("MySQL adapter not yet implemented");
      default:
        throw new Error(`Unsupported database type: ${this.config.database.type}`);
    }
  }

  private createFlashcardRepository(): IFlashcardRepository {
    switch (this.config.database.type) {
      case "postgresql":
        return new PostgreSQLFlashcardRepository(this.getPostgreSQLConfig());
      case "mongodb":
        throw new Error("MongoDB adapter not yet implemented");
      case "mysql":
        throw new Error("MySQL adapter not yet implemented");
      default:
        throw new Error(`Unsupported database type: ${this.config.database.type}`);
    }
  }

  private createProgressRepository(): IProgressRepository {
    switch (this.config.database.type) {
      case "postgresql":
        return new PostgreSQLProgressRepository(this.getPostgreSQLConfig());
      case "mongodb":
        throw new Error("MongoDB adapter not yet implemented");
      case "mysql":
        throw new Error("MySQL adapter not yet implemented");
      default:
        throw new Error(`Unsupported database type: ${this.config.database.type}`);
    }
  }

  // Update reset method
  reset(): void {
    this.questionRepository = undefined;
    this.userRepository = undefined;
    this.planRepository = undefined;
    this.learningCardRepository = undefined;
    this.categoryRepository = undefined;
    this.topicRepository = undefined;
    this.sectionRepository = undefined;
    this.flashcardRepository = undefined;
    this.progressRepository = undefined;
  }
}
```

---

## Phase 2: PostgreSQL Adapters (Priority: HIGH)

### Task 2.1: Create PostgreSQL Category Repository

**File:** `libs/database/src/adapters/postgresql/PostgreSQLCategoryRepository.ts`

```typescript
/**
 * PostgreSQL Category Repository Implementation
 */

import { createClient, SupabaseClient } from "@supabase/supabase-js";
import {
  ICategoryRepository,
  Category,
  CreateCategoryDTO,
  UpdateCategoryDTO,
} from "../../repositories/interfaces/ICategoryRepository";
import { QueryOptions, PaginatedResult } from "../../repositories/types";
import { PostgreSQLConfig } from "./PostgreSQLConfig";

const TABLE_NAME = "categories";

export class PostgreSQLCategoryRepository implements ICategoryRepository {
  private client: SupabaseClient;

  constructor(config: PostgreSQLConfig) {
    this.client = createClient(config.url, config.serviceRoleKey || config.key);
  }

  async create(category: CreateCategoryDTO): Promise<Category> {
    const { data, error } = await this.client
      .from(TABLE_NAME)
      .insert(category)
      .select()
      .single();

    if (error) throw new Error(`Failed to create category: ${error.message}`);
    return data;
  }

  async findById(id: string): Promise<Category | null> {
    const { data, error } = await this.client
      .from(TABLE_NAME)
      .select("*")
      .eq("id", id)
      .single();

    if (error && error.code !== "PGRST116") {
      throw new Error(`Failed to find category: ${error.message}`);
    }
    return data;
  }

  async findBySlug(slug: string): Promise<Category | null> {
    const { data, error } = await this.client
      .from(TABLE_NAME)
      .select("*")
      .eq("slug", slug)
      .single();

    if (error && error.code !== "PGRST116") {
      throw new Error(`Failed to find category: ${error.message}`);
    }
    return data;
  }

  async findAll(options?: QueryOptions): Promise<PaginatedResult<Category>> {
    const limit = options?.limit || 10;
    const offset = options?.offset || 0;

    let query = this.client.from(TABLE_NAME).select("*", { count: "exact" });

    if (options?.orderBy) {
      query = query.order(options.orderBy, {
        ascending: options.orderDirection !== "desc",
      });
    } else {
      query = query.order("created_at", { ascending: false });
    }

    const { data, error, count } = await query.range(offset, offset + limit - 1);

    if (error) throw new Error(`Failed to fetch categories: ${error.message}`);

    return {
      data: data || [],
      meta: {
        total: count || 0,
        limit,
        offset,
        hasMore: (count || 0) > offset + limit,
      },
    };
  }

  async findByParent(
    parentId: string | null,
    options?: QueryOptions
  ): Promise<PaginatedResult<Category>> {
    const limit = options?.limit || 10;
    const offset = options?.offset || 0;

    let query = this.client
      .from(TABLE_NAME)
      .select("*", { count: "exact" });

    if (parentId === null) {
      query = query.is("parent_id", null);
    } else {
      query = query.eq("parent_id", parentId);
    }

    query = query.order("order_index", { ascending: true });

    const { data, error, count } = await query.range(offset, offset + limit - 1);

    if (error) throw new Error(`Failed to fetch categories: ${error.message}`);

    return {
      data: data || [],
      meta: {
        total: count || 0,
        limit,
        offset,
        hasMore: (count || 0) > offset + limit,
      },
    };
  }

  async findActive(options?: QueryOptions): Promise<PaginatedResult<Category>> {
    const limit = options?.limit || 10;
    const offset = options?.offset || 0;

    const { data, error, count } = await this.client
      .from(TABLE_NAME)
      .select("*", { count: "exact" })
      .eq("is_active", true)
      .order("order_index", { ascending: true })
      .range(offset, offset + limit - 1);

    if (error) throw new Error(`Failed to fetch categories: ${error.message}`);

    return {
      data: data || [],
      meta: {
        total: count || 0,
        limit,
        offset,
        hasMore: (count || 0) > offset + limit,
      },
    };
  }

  async update(id: string, category: UpdateCategoryDTO): Promise<Category> {
    const { data, error } = await this.client
      .from(TABLE_NAME)
      .update({ ...category, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();

    if (error) throw new Error(`Failed to update category: ${error.message}`);
    return data;
  }

  async delete(id: string): Promise<void> {
    const { error } = await this.client.from(TABLE_NAME).delete().eq("id", id);

    if (error) throw new Error(`Failed to delete category: ${error.message}`);
  }

  async getCategoryStatistics(
    id: string
  ): Promise<{ questionCount: number; topicCount: number }> {
    const [questionsResult, topicsResult] = await Promise.all([
      this.client
        .from("questions")
        .select("id", { count: "exact", head: true })
        .eq("category_id", id),
      this.client
        .from("topics")
        .select("id", { count: "exact", head: true })
        .eq("category_id", id),
    ]);

    return {
      questionCount: questionsResult.count || 0,
      topicCount: topicsResult.count || 0,
    };
  }
}
```

### Task 2.2: Create PostgreSQL Topic Repository

**File:** `libs/database/src/adapters/postgresql/PostgreSQLTopicRepository.ts`

```typescript
/**
 * PostgreSQL Topic Repository Implementation
 */

import { createClient, SupabaseClient } from "@supabase/supabase-js";
import {
  ITopicRepository,
  Topic,
  CreateTopicDTO,
  UpdateTopicDTO,
} from "../../repositories/interfaces/ITopicRepository";
import { QueryOptions, PaginatedResult } from "../../repositories/types";
import { PostgreSQLConfig } from "./PostgreSQLConfig";

const TABLE_NAME = "topics";

export class PostgreSQLTopicRepository implements ITopicRepository {
  private client: SupabaseClient;

  constructor(config: PostgreSQLConfig) {
    this.client = createClient(config.url, config.serviceRoleKey || config.key);
  }

  async create(topic: CreateTopicDTO): Promise<Topic> {
    const { data, error } = await this.client
      .from(TABLE_NAME)
      .insert(topic)
      .select()
      .single();

    if (error) throw new Error(`Failed to create topic: ${error.message}`);
    return data;
  }

  async createBatch(topics: CreateTopicDTO[]): Promise<Topic[]> {
    const { data, error } = await this.client
      .from(TABLE_NAME)
      .insert(topics)
      .select();

    if (error) throw new Error(`Failed to create topics: ${error.message}`);
    return data || [];
  }

  async findById(id: string): Promise<Topic | null> {
    const { data, error } = await this.client
      .from(TABLE_NAME)
      .select("*")
      .eq("id", id)
      .single();

    if (error && error.code !== "PGRST116") {
      throw new Error(`Failed to find topic: ${error.message}`);
    }
    return data;
  }

  async findBySlug(slug: string): Promise<Topic | null> {
    const { data, error } = await this.client
      .from(TABLE_NAME)
      .select("*")
      .eq("slug", slug)
      .single();

    if (error && error.code !== "PGRST116") {
      throw new Error(`Failed to find topic: ${error.message}`);
    }
    return data;
  }

  async findAll(options?: QueryOptions): Promise<PaginatedResult<Topic>> {
    const limit = options?.limit || 10;
    const offset = options?.offset || 0;

    let query = this.client.from(TABLE_NAME).select("*", { count: "exact" });

    if (options?.orderBy) {
      query = query.order(options.orderBy, {
        ascending: options.orderDirection !== "desc",
      });
    } else {
      query = query.order("order_index", { ascending: true });
    }

    const { data, error, count } = await query.range(offset, offset + limit - 1);

    if (error) throw new Error(`Failed to fetch topics: ${error.message}`);

    return {
      data: data || [],
      meta: {
        total: count || 0,
        limit,
        offset,
        hasMore: (count || 0) > offset + limit,
      },
    };
  }

  async findByCategory(
    categoryId: string,
    options?: QueryOptions
  ): Promise<PaginatedResult<Topic>> {
    const limit = options?.limit || 10;
    const offset = options?.offset || 0;

    const { data, error, count } = await this.client
      .from(TABLE_NAME)
      .select("*", { count: "exact" })
      .eq("category_id", categoryId)
      .order("order_index", { ascending: true })
      .range(offset, offset + limit - 1);

    if (error) throw new Error(`Failed to fetch topics: ${error.message}`);

    return {
      data: data || [],
      meta: {
        total: count || 0,
        limit,
        offset,
        hasMore: (count || 0) > offset + limit,
      },
    };
  }

  async findByParent(
    parentId: string | null,
    options?: QueryOptions
  ): Promise<PaginatedResult<Topic>> {
    const limit = options?.limit || 10;
    const offset = options?.offset || 0;

    let query = this.client.from(TABLE_NAME).select("*", { count: "exact" });

    if (parentId === null) {
      query = query.is("parent_id", null);
    } else {
      query = query.eq("parent_id", parentId);
    }

    const { data, error, count } = await query
      .order("order_index", { ascending: true })
      .range(offset, offset + limit - 1);

    if (error) throw new Error(`Failed to fetch topics: ${error.message}`);

    return {
      data: data || [],
      meta: {
        total: count || 0,
        limit,
        offset,
        hasMore: (count || 0) > offset + limit,
      },
    };
  }

  async findActive(options?: QueryOptions): Promise<PaginatedResult<Topic>> {
    const limit = options?.limit || 10;
    const offset = options?.offset || 0;

    const { data, error, count } = await this.client
      .from(TABLE_NAME)
      .select("*", { count: "exact" })
      .eq("is_active", true)
      .order("order_index", { ascending: true })
      .range(offset, offset + limit - 1);

    if (error) throw new Error(`Failed to fetch topics: ${error.message}`);

    return {
      data: data || [],
      meta: {
        total: count || 0,
        limit,
        offset,
        hasMore: (count || 0) > offset + limit,
      },
    };
  }

  async update(id: string, topic: UpdateTopicDTO): Promise<Topic> {
    const { data, error } = await this.client
      .from(TABLE_NAME)
      .update({ ...topic, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();

    if (error) throw new Error(`Failed to update topic: ${error.message}`);
    return data;
  }

  async delete(id: string): Promise<void> {
    const { error } = await this.client.from(TABLE_NAME).delete().eq("id", id);

    if (error) throw new Error(`Failed to delete topic: ${error.message}`);
  }

  async deleteBatch(ids: string[]): Promise<void> {
    const { error } = await this.client.from(TABLE_NAME).delete().in("id", ids);

    if (error) throw new Error(`Failed to delete topics: ${error.message}`);
  }

  async getTopicStatistics(id: string): Promise<{ questionCount: number }> {
    const { count, error } = await this.client
      .from("questions")
      .select("id", { count: "exact", head: true })
      .eq("topic_id", id);

    if (error) throw new Error(`Failed to get topic statistics: ${error.message}`);

    return { questionCount: count || 0 };
  }
}
```

### Task 2.3: Create PostgreSQL Section Repository

**File:** `libs/database/src/adapters/postgresql/PostgreSQLSectionRepository.ts`

```typescript
/**
 * PostgreSQL Section Repository Implementation
 */

import { createClient, SupabaseClient } from "@supabase/supabase-js";
import {
  ISectionRepository,
  Section,
  CreateSectionDTO,
  UpdateSectionDTO,
} from "../../repositories/interfaces/ISectionRepository";
import { QueryOptions, PaginatedResult } from "../../repositories/types";
import { PostgreSQLConfig } from "./PostgreSQLConfig";

const TABLE_NAME = "sections";

export class PostgreSQLSectionRepository implements ISectionRepository {
  private client: SupabaseClient;

  constructor(config: PostgreSQLConfig) {
    this.client = createClient(config.url, config.serviceRoleKey || config.key);
  }

  async create(section: CreateSectionDTO): Promise<Section> {
    const { data, error } = await this.client
      .from(TABLE_NAME)
      .insert(section)
      .select()
      .single();

    if (error) throw new Error(`Failed to create section: ${error.message}`);
    return data;
  }

  async findById(id: string): Promise<Section | null> {
    const { data, error } = await this.client
      .from(TABLE_NAME)
      .select("*")
      .eq("id", id)
      .single();

    if (error && error.code !== "PGRST116") {
      throw new Error(`Failed to find section: ${error.message}`);
    }
    return data;
  }

  async findAll(options?: QueryOptions): Promise<PaginatedResult<Section>> {
    const limit = options?.limit || 10;
    const offset = options?.offset || 0;

    let query = this.client.from(TABLE_NAME).select("*", { count: "exact" });

    if (options?.orderBy) {
      query = query.order(options.orderBy, {
        ascending: options.orderDirection !== "desc",
      });
    } else {
      query = query.order("order_index", { ascending: true });
    }

    const { data, error, count } = await query.range(offset, offset + limit - 1);

    if (error) throw new Error(`Failed to fetch sections: ${error.message}`);

    return {
      data: data || [],
      meta: {
        total: count || 0,
        limit,
        offset,
        hasMore: (count || 0) > offset + limit,
      },
    };
  }

  async findByPlan(
    planId: string,
    options?: QueryOptions
  ): Promise<PaginatedResult<Section>> {
    const limit = options?.limit || 10;
    const offset = options?.offset || 0;

    const { data, error, count } = await this.client
      .from(TABLE_NAME)
      .select("*", { count: "exact" })
      .eq("plan_id", planId)
      .order("order_index", { ascending: true })
      .range(offset, offset + limit - 1);

    if (error) throw new Error(`Failed to fetch sections: ${error.message}`);

    return {
      data: data || [],
      meta: {
        total: count || 0,
        limit,
        offset,
        hasMore: (count || 0) > offset + limit,
      },
    };
  }

  async findActive(options?: QueryOptions): Promise<PaginatedResult<Section>> {
    const limit = options?.limit || 10;
    const offset = options?.offset || 0;

    const { data, error, count } = await this.client
      .from(TABLE_NAME)
      .select("*", { count: "exact" })
      .eq("is_active", true)
      .order("order_index", { ascending: true })
      .range(offset, offset + limit - 1);

    if (error) throw new Error(`Failed to fetch sections: ${error.message}`);

    return {
      data: data || [],
      meta: {
        total: count || 0,
        limit,
        offset,
        hasMore: (count || 0) > offset + limit,
      },
    };
  }

  async update(id: string, section: UpdateSectionDTO): Promise<Section> {
    const { data, error } = await this.client
      .from(TABLE_NAME)
      .update({ ...section, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();

    if (error) throw new Error(`Failed to update section: ${error.message}`);
    return data;
  }

  async delete(id: string): Promise<void> {
    const { error } = await this.client.from(TABLE_NAME).delete().eq("id", id);

    if (error) throw new Error(`Failed to delete section: ${error.message}`);
  }
}
```

### Task 2.4: Create PostgreSQL Flashcard Repository

**File:** `libs/database/src/adapters/postgresql/PostgreSQLFlashcardRepository.ts`

```typescript
/**
 * PostgreSQL Flashcard Repository Implementation
 */

import { createClient, SupabaseClient } from "@supabase/supabase-js";
import {
  IFlashcardRepository,
  Flashcard,
  CreateFlashcardDTO,
  UpdateFlashcardDTO,
} from "../../repositories/interfaces/IFlashcardRepository";
import { QueryOptions, PaginatedResult } from "../../repositories/types";
import { PostgreSQLConfig } from "./PostgreSQLConfig";

const TABLE_NAME = "flashcards";

export class PostgreSQLFlashcardRepository implements IFlashcardRepository {
  private client: SupabaseClient;

  constructor(config: PostgreSQLConfig) {
    this.client = createClient(config.url, config.serviceRoleKey || config.key);
  }

  async create(flashcard: CreateFlashcardDTO): Promise<Flashcard> {
    const { data, error } = await this.client
      .from(TABLE_NAME)
      .insert(flashcard)
      .select()
      .single();

    if (error) throw new Error(`Failed to create flashcard: ${error.message}`);
    return data;
  }

  async createBatch(flashcards: CreateFlashcardDTO[]): Promise<Flashcard[]> {
    const { data, error } = await this.client
      .from(TABLE_NAME)
      .insert(flashcards)
      .select();

    if (error) throw new Error(`Failed to create flashcards: ${error.message}`);
    return data || [];
  }

  async findById(id: string): Promise<Flashcard | null> {
    const { data, error } = await this.client
      .from(TABLE_NAME)
      .select("*")
      .eq("id", id)
      .single();

    if (error && error.code !== "PGRST116") {
      throw new Error(`Failed to find flashcard: ${error.message}`);
    }
    return data;
  }

  async findAll(options?: QueryOptions): Promise<PaginatedResult<Flashcard>> {
    const limit = options?.limit || 10;
    const offset = options?.offset || 0;

    let query = this.client.from(TABLE_NAME).select("*", { count: "exact" });

    if (options?.orderBy) {
      query = query.order(options.orderBy, {
        ascending: options.orderDirection !== "desc",
      });
    } else {
      query = query.order("created_at", { ascending: false });
    }

    const { data, error, count } = await query.range(offset, offset + limit - 1);

    if (error) throw new Error(`Failed to fetch flashcards: ${error.message}`);

    return {
      data: data || [],
      meta: {
        total: count || 0,
        limit,
        offset,
        hasMore: (count || 0) > offset + limit,
      },
    };
  }

  async findByUser(
    userId: string,
    options?: QueryOptions
  ): Promise<PaginatedResult<Flashcard>> {
    const limit = options?.limit || 10;
    const offset = options?.offset || 0;

    const { data, error, count } = await this.client
      .from(TABLE_NAME)
      .select("*", { count: "exact" })
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw new Error(`Failed to fetch flashcards: ${error.message}`);

    return {
      data: data || [],
      meta: {
        total: count || 0,
        limit,
        offset,
        hasMore: (count || 0) > offset + limit,
      },
    };
  }

  async findByCategory(
    categoryId: string,
    options?: QueryOptions
  ): Promise<PaginatedResult<Flashcard>> {
    const limit = options?.limit || 10;
    const offset = options?.offset || 0;

    const { data, error, count } = await this.client
      .from(TABLE_NAME)
      .select("*", { count: "exact" })
      .eq("category_id", categoryId)
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw new Error(`Failed to fetch flashcards: ${error.message}`);

    return {
      data: data || [],
      meta: {
        total: count || 0,
        limit,
        offset,
        hasMore: (count || 0) > offset + limit,
      },
    };
  }

  async findByTopic(
    topicId: string,
    options?: QueryOptions
  ): Promise<PaginatedResult<Flashcard>> {
    const limit = options?.limit || 10;
    const offset = options?.offset || 0;

    const { data, error, count } = await this.client
      .from(TABLE_NAME)
      .select("*", { count: "exact" })
      .eq("topic_id", topicId)
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw new Error(`Failed to fetch flashcards: ${error.message}`);

    return {
      data: data || [],
      meta: {
        total: count || 0,
        limit,
        offset,
        hasMore: (count || 0) > offset + limit,
      },
    };
  }

  async update(id: string, flashcard: UpdateFlashcardDTO): Promise<Flashcard> {
    const { data, error } = await this.client
      .from(TABLE_NAME)
      .update({ ...flashcard, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();

    if (error) throw new Error(`Failed to update flashcard: ${error.message}`);
    return data;
  }

  async delete(id: string): Promise<void> {
    const { error } = await this.client.from(TABLE_NAME).delete().eq("id", id);

    if (error) throw new Error(`Failed to delete flashcard: ${error.message}`);
  }

  async deleteBatch(ids: string[]): Promise<void> {
    const { error } = await this.client.from(TABLE_NAME).delete().in("id", ids);

    if (error) throw new Error(`Failed to delete flashcards: ${error.message}`);
  }
}
```

### Task 2.5: Create PostgreSQL Progress Repository

**File:** `libs/database/src/adapters/postgresql/PostgreSQLProgressRepository.ts`

```typescript
/**
 * PostgreSQL Progress Repository Implementation
 */

import { createClient, SupabaseClient } from "@supabase/supabase-js";
import {
  IProgressRepository,
  UserProgress,
  QuestionAttempt,
  CreateProgressDTO,
  UpdateProgressDTO,
  CreateAttemptDTO,
} from "../../repositories/interfaces/IProgressRepository";
import { QueryOptions, PaginatedResult } from "../../repositories/types";
import { PostgreSQLConfig } from "./PostgreSQLConfig";

const PROGRESS_TABLE = "user_progress";
const ATTEMPTS_TABLE = "question_attempts";

export class PostgreSQLProgressRepository implements IProgressRepository {
  private client: SupabaseClient;

  constructor(config: PostgreSQLConfig) {
    this.client = createClient(config.url, config.serviceRoleKey || config.key);
  }

  async createProgress(progress: CreateProgressDTO): Promise<UserProgress> {
    const { data, error } = await this.client
      .from(PROGRESS_TABLE)
      .insert(progress)
      .select()
      .single();

    if (error) throw new Error(`Failed to create progress: ${error.message}`);
    return data;
  }

  async recordAttempt(attempt: CreateAttemptDTO): Promise<QuestionAttempt> {
    const { data, error } = await this.client
      .from(ATTEMPTS_TABLE)
      .insert(attempt)
      .select()
      .single();

    if (error) throw new Error(`Failed to record attempt: ${error.message}`);
    return data;
  }

  async findProgressById(id: string): Promise<UserProgress | null> {
    const { data, error } = await this.client
      .from(PROGRESS_TABLE)
      .select("*")
      .eq("id", id)
      .single();

    if (error && error.code !== "PGRST116") {
      throw new Error(`Failed to find progress: ${error.message}`);
    }
    return data;
  }

  async findProgressByUser(
    userId: string,
    options?: QueryOptions
  ): Promise<PaginatedResult<UserProgress>> {
    const limit = options?.limit || 10;
    const offset = options?.offset || 0;

    const { data, error, count } = await this.client
      .from(PROGRESS_TABLE)
      .select("*", { count: "exact" })
      .eq("user_id", userId)
      .order("updated_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw new Error(`Failed to fetch progress: ${error.message}`);

    return {
      data: data || [],
      meta: {
        total: count || 0,
        limit,
        offset,
        hasMore: (count || 0) > offset + limit,
      },
    };
  }

  async findProgressByPlan(
    userId: string,
    planId: string
  ): Promise<UserProgress | null> {
    const { data, error } = await this.client
      .from(PROGRESS_TABLE)
      .select("*")
      .eq("user_id", userId)
      .eq("plan_id", planId)
      .single();

    if (error && error.code !== "PGRST116") {
      throw new Error(`Failed to find progress: ${error.message}`);
    }
    return data;
  }

  async findProgressByQuestion(
    userId: string,
    questionId: string
  ): Promise<UserProgress | null> {
    const { data, error } = await this.client
      .from(PROGRESS_TABLE)
      .select("*")
      .eq("user_id", userId)
      .eq("question_id", questionId)
      .single();

    if (error && error.code !== "PGRST116") {
      throw new Error(`Failed to find progress: ${error.message}`);
    }
    return data;
  }

  async getAttemptsByUser(
    userId: string,
    options?: QueryOptions
  ): Promise<PaginatedResult<QuestionAttempt>> {
    const limit = options?.limit || 10;
    const offset = options?.offset || 0;

    const { data, error, count } = await this.client
      .from(ATTEMPTS_TABLE)
      .select("*", { count: "exact" })
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw new Error(`Failed to fetch attempts: ${error.message}`);

    return {
      data: data || [],
      meta: {
        total: count || 0,
        limit,
        offset,
        hasMore: (count || 0) > offset + limit,
      },
    };
  }

  async getAttemptsByQuestion(
    userId: string,
    questionId: string
  ): Promise<QuestionAttempt[]> {
    const { data, error } = await this.client
      .from(ATTEMPTS_TABLE)
      .select("*")
      .eq("user_id", userId)
      .eq("question_id", questionId)
      .order("created_at", { ascending: false });

    if (error) throw new Error(`Failed to fetch attempts: ${error.message}`);
    return data || [];
  }

  async updateProgress(
    id: string,
    progress: UpdateProgressDTO
  ): Promise<UserProgress> {
    const { data, error } = await this.client
      .from(PROGRESS_TABLE)
      .update({ ...progress, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();

    if (error) throw new Error(`Failed to update progress: ${error.message}`);
    return data;
  }

  async upsertProgress(progress: CreateProgressDTO): Promise<UserProgress> {
    const { data, error } = await this.client
      .from(PROGRESS_TABLE)
      .upsert(progress, {
        onConflict: "user_id,question_id",
      })
      .select()
      .single();

    if (error) throw new Error(`Failed to upsert progress: ${error.message}`);
    return data;
  }

  async getUserStatistics(userId: string): Promise<{
    totalQuestions: number;
    completedQuestions: number;
    averageScore: number;
    totalTimeSpent: number;
  }> {
    const { data, error } = await this.client
      .from(PROGRESS_TABLE)
      .select("*")
      .eq("user_id", userId);

    if (error) throw new Error(`Failed to get statistics: ${error.message}`);

    const progressData = data || [];
    const completed = progressData.filter((p) => p.status === "completed");
    const totalScore = completed.reduce((sum, p) => sum + (p.score || 0), 0);
    const totalTime = progressData.reduce(
      (sum, p) => sum + (p.time_spent || 0),
      0
    );

    return {
      totalQuestions: progressData.length,
      completedQuestions: completed.length,
      averageScore: completed.length > 0 ? totalScore / completed.length : 0,
      totalTimeSpent: totalTime,
    };
  }

  async getPlanProgress(
    userId: string,
    planId: string
  ): Promise<{
    completedSections: number;
    totalSections: number;
    percentage: number;
  }> {
    // Get total sections in plan
    const { data: sections, error: sectionsError } = await this.client
      .from("sections")
      .select("id")
      .eq("plan_id", planId);

    if (sectionsError) {
      throw new Error(`Failed to get plan sections: ${sectionsError.message}`);
    }

    const totalSections = sections?.length || 0;

    // Get completed sections for user
    const { data: progress, error: progressError } = await this.client
      .from(PROGRESS_TABLE)
      .select("section_id")
      .eq("user_id", userId)
      .eq("plan_id", planId)
      .eq("status", "completed");

    if (progressError) {
      throw new Error(`Failed to get plan progress: ${progressError.message}`);
    }

    const completedSections = progress?.length || 0;
    const percentage =
      totalSections > 0 ? (completedSections / totalSections) * 100 : 0;

    return {
      completedSections,
      totalSections,
      percentage: Math.round(percentage * 100) / 100,
    };
  }
}
```

---

## Phase 3: Website API Routes Migration (Priority: HIGH)

### Task 3.1: Migrate Categories Route

**File:** `apps/website/src/app/lib/network/routes/categories/route.ts`

#### Before (Direct Supabase):
```typescript
import { getSupabaseClient } from "../../../get-supabase-client";

export async function GET() {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("created_at");
  // ...
}
```

#### After (Repository Pattern):
```typescript
import { NextResponse } from "next/server";
import { getRepositoryFactory } from "@elzatona/database";

export async function GET() {
  try {
    const factory = getRepositoryFactory();
    const categoryRepo = factory.getCategoryRepository();

    const result = await categoryRepo.findAll({
      orderBy: "created_at",
      orderDirection: "asc",
      limit: 100,
    });

    return NextResponse.json({
      success: true,
      data: result.data,
      meta: result.meta,
    });
  } catch (error) {
    console.error("[Categories API] Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const factory = getRepositoryFactory();
    const categoryRepo = factory.getCategoryRepository();

    const body = await request.json();
    const category = await categoryRepo.create(body);

    return NextResponse.json({ success: true, data: category }, { status: 201 });
  } catch (error) {
    console.error("[Categories API] Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create category" },
      { status: 500 }
    );
  }
}
```

### Task 3.2: Migrate Topics Route

**File:** `apps/website/src/app/lib/network/routes/topics/[id]/route.ts`

#### After (Repository Pattern):
```typescript
import { NextRequest, NextResponse } from "next/server";
import { getRepositoryFactory } from "@elzatona/database";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const factory = getRepositoryFactory();
    const topicRepo = factory.getTopicRepository();

    const topic = await topicRepo.findById(params.id);

    if (!topic) {
      return NextResponse.json(
        { success: false, error: "Topic not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: topic });
  } catch (error) {
    console.error("[Topics API] Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch topic" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const factory = getRepositoryFactory();
    const topicRepo = factory.getTopicRepository();

    const body = await request.json();
    const topic = await topicRepo.update(params.id, body);

    return NextResponse.json({ success: true, data: topic });
  } catch (error) {
    console.error("[Topics API] Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update topic" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const factory = getRepositoryFactory();
    const topicRepo = factory.getTopicRepository();

    await topicRepo.delete(params.id);

    return NextResponse.json({ success: true, message: "Topic deleted" });
  } catch (error) {
    console.error("[Topics API] Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete topic" },
      { status: 500 }
    );
  }
}
```

### Task 3.3: Migrate Questions Route

**File:** `apps/website/src/app/lib/network/routes/questions/unified/route.ts`

#### After (Repository Pattern):
```typescript
import { NextRequest, NextResponse } from "next/server";
import { getRepositoryFactory } from "@elzatona/database";

export async function GET(request: NextRequest) {
  try {
    const factory = getRepositoryFactory();
    const questionRepo = factory.getQuestionRepository();

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "10");
    const offset = parseInt(searchParams.get("offset") || "0");
    const categoryId = searchParams.get("category_id");
    const topicId = searchParams.get("topic_id");
    const difficulty = searchParams.get("difficulty");
    const search = searchParams.get("search");

    let result;

    if (search) {
      result = await questionRepo.search(search, { limit, offset });
    } else if (categoryId) {
      result = await questionRepo.findByCategory(categoryId, { limit, offset });
    } else if (topicId) {
      result = await questionRepo.findByTopic(topicId, { limit, offset });
    } else if (difficulty) {
      result = await questionRepo.findByDifficulty(difficulty as any, { limit, offset });
    } else {
      result = await questionRepo.findAll({ limit, offset });
    }

    return NextResponse.json({
      success: true,
      data: result.data,
      meta: result.meta,
    });
  } catch (error) {
    console.error("[Questions API] Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch questions" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const factory = getRepositoryFactory();
    const questionRepo = factory.getQuestionRepository();

    const body = await request.json();
    const question = await questionRepo.create(body);

    return NextResponse.json({ success: true, data: question }, { status: 201 });
  } catch (error) {
    console.error("[Questions API] Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create question" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const factory = getRepositoryFactory();
    const questionRepo = factory.getQuestionRepository();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Question ID required" },
        { status: 400 }
      );
    }

    await questionRepo.delete(id);

    return NextResponse.json({ success: true, message: "Question deleted" });
  } catch (error) {
    console.error("[Questions API] Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete question" },
      { status: 500 }
    );
  }
}
```

### Task 3.4: Migrate Flashcards Route

**File:** `apps/website/src/app/lib/network/routes/flashcards/route.ts`

#### After (Repository Pattern):
```typescript
import { NextRequest, NextResponse } from "next/server";
import { getRepositoryFactory } from "@elzatona/database";

export async function GET(request: NextRequest) {
  try {
    const factory = getRepositoryFactory();
    const flashcardRepo = factory.getFlashcardRepository();

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("user_id");
    const limit = parseInt(searchParams.get("limit") || "10");
    const offset = parseInt(searchParams.get("offset") || "0");

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "User ID required" },
        { status: 400 }
      );
    }

    const result = await flashcardRepo.findByUser(userId, { limit, offset });

    return NextResponse.json({
      success: true,
      data: result.data,
      meta: result.meta,
    });
  } catch (error) {
    console.error("[Flashcards API] Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch flashcards" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const factory = getRepositoryFactory();
    const flashcardRepo = factory.getFlashcardRepository();

    const body = await request.json();
    const flashcard = await flashcardRepo.create(body);

    return NextResponse.json({ success: true, data: flashcard }, { status: 201 });
  } catch (error) {
    console.error("[Flashcards API] Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create flashcard" },
      { status: 500 }
    );
  }
}
```

### Task 3.5: Migrate Progress Routes

**File:** `apps/website/src/app/lib/network/routes/progress/save/route.ts`

#### After (Repository Pattern):
```typescript
import { NextRequest, NextResponse } from "next/server";
import { getRepositoryFactory } from "@elzatona/database";

export async function POST(request: NextRequest) {
  try {
    const factory = getRepositoryFactory();
    const progressRepo = factory.getProgressRepository();

    const body = await request.json();
    const { user_id, question_id, plan_id, status, score, is_correct, answer_given, time_taken } = body;

    // Record the attempt if it's a question answer
    if (question_id && is_correct !== undefined) {
      await progressRepo.recordAttempt({
        user_id,
        question_id,
        is_correct,
        answer_given,
        time_taken,
      });
    }

    // Upsert the progress
    const progress = await progressRepo.upsertProgress({
      user_id,
      question_id,
      plan_id,
      status: status || "in_progress",
      score,
    });

    return NextResponse.json({ success: true, data: progress });
  } catch (error) {
    console.error("[Progress API] Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save progress" },
      { status: 500 }
    );
  }
}
```

---

## Phase 4: Services Migration (Priority: MEDIUM)

### Task 4.1: Migrate supabase-questions.ts

**File:** `apps/website/src/app/lib/supabase-questions.ts`

#### After (Repository Pattern):
```typescript
import { getRepositoryFactory } from "@elzatona/database";

export async function getQuestions(options?: {
  categoryId?: string;
  topicId?: string;
  difficulty?: string;
  limit?: number;
  offset?: number;
}) {
  const factory = getRepositoryFactory();
  const questionRepo = factory.getQuestionRepository();

  const { categoryId, topicId, difficulty, limit = 10, offset = 0 } = options || {};

  if (categoryId) {
    return questionRepo.findByCategory(categoryId, { limit, offset });
  }

  if (topicId) {
    return questionRepo.findByTopic(topicId, { limit, offset });
  }

  if (difficulty) {
    return questionRepo.findByDifficulty(difficulty as any, { limit, offset });
  }

  return questionRepo.findAll({ limit, offset });
}

export async function getQuestionById(id: string) {
  const factory = getRepositoryFactory();
  const questionRepo = factory.getQuestionRepository();
  return questionRepo.findById(id);
}

export async function createQuestion(data: any) {
  const factory = getRepositoryFactory();
  const questionRepo = factory.getQuestionRepository();
  return questionRepo.create(data);
}

export async function updateQuestion(id: string, data: any) {
  const factory = getRepositoryFactory();
  const questionRepo = factory.getQuestionRepository();
  return questionRepo.update(id, data);
}

export async function deleteQuestion(id: string) {
  const factory = getRepositoryFactory();
  const questionRepo = factory.getQuestionRepository();
  return questionRepo.delete(id);
}

export async function searchQuestions(query: string, options?: { limit?: number; offset?: number }) {
  const factory = getRepositoryFactory();
  const questionRepo = factory.getQuestionRepository();
  return questionRepo.search(query, options);
}
```

### Task 4.2: Migrate supabase-flashcards.ts

**File:** `apps/website/src/app/lib/supabase-flashcards.ts`

#### After (Repository Pattern):
```typescript
import { getRepositoryFactory } from "@elzatona/database";

export async function getFlashcardsByUser(userId: string, options?: { limit?: number; offset?: number }) {
  const factory = getRepositoryFactory();
  const flashcardRepo = factory.getFlashcardRepository();
  return flashcardRepo.findByUser(userId, options);
}

export async function getFlashcardById(id: string) {
  const factory = getRepositoryFactory();
  const flashcardRepo = factory.getFlashcardRepository();
  return flashcardRepo.findById(id);
}

export async function createFlashcard(data: any) {
  const factory = getRepositoryFactory();
  const flashcardRepo = factory.getFlashcardRepository();
  return flashcardRepo.create(data);
}

export async function updateFlashcard(id: string, data: any) {
  const factory = getRepositoryFactory();
  const flashcardRepo = factory.getFlashcardRepository();
  return flashcardRepo.update(id, data);
}

export async function deleteFlashcard(id: string) {
  const factory = getRepositoryFactory();
  const flashcardRepo = factory.getFlashcardRepository();
  return flashcardRepo.delete(id);
}
```

### Task 4.3: Migrate supabase-progress.ts

**File:** `apps/website/src/app/lib/supabase-progress.ts`

#### After (Repository Pattern):
```typescript
import { getRepositoryFactory } from "@elzatona/database";

export async function getUserProgress(userId: string) {
  const factory = getRepositoryFactory();
  const progressRepo = factory.getProgressRepository();
  return progressRepo.findProgressByUser(userId);
}

export async function getPlanProgress(userId: string, planId: string) {
  const factory = getRepositoryFactory();
  const progressRepo = factory.getProgressRepository();
  return progressRepo.getPlanProgress(userId, planId);
}

export async function recordQuestionAttempt(data: {
  user_id: string;
  question_id: string;
  is_correct: boolean;
  answer_given?: string;
  time_taken?: number;
}) {
  const factory = getRepositoryFactory();
  const progressRepo = factory.getProgressRepository();
  return progressRepo.recordAttempt(data);
}

export async function updateUserProgress(data: {
  user_id: string;
  question_id?: string;
  plan_id?: string;
  status?: "not_started" | "in_progress" | "completed";
  score?: number;
}) {
  const factory = getRepositoryFactory();
  const progressRepo = factory.getProgressRepository();
  return progressRepo.upsertProgress(data);
}

export async function getUserStatistics(userId: string) {
  const factory = getRepositoryFactory();
  const progressRepo = factory.getProgressRepository();
  return progressRepo.getUserStatistics(userId);
}
```

---

## Phase 5: Hooks Migration (Priority: MEDIUM)

### Task 5.1: Migrate useLearningCards Hook

**File:** `apps/admin/src/app/admin/learning-cards/hooks/useLearningCards.ts`

#### After (Repository Pattern):
```typescript
import { useState, useEffect, useCallback } from "react";
import { getRepositoryFactory } from "@elzatona/database";

export function useLearningCards() {
  const [cards, setCards] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [topics, setTopics] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const factory = getRepositoryFactory();
      const cardRepo = factory.getLearningCardRepository();
      const categoryRepo = factory.getCategoryRepository();
      const topicRepo = factory.getTopicRepository();

      const [cardsResult, categoriesResult, topicsResult] = await Promise.all([
        cardRepo.findAll({ limit: 100, orderBy: "order_index" }),
        categoryRepo.findAll({ limit: 100, orderBy: "created_at" }),
        topicRepo.findAll({ limit: 100, orderBy: "order_index" }),
      ]);

      setCards(cardsResult.data);
      setCategories(categoriesResult.data);
      setTopics(topicsResult.data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const createCard = async (data: any) => {
    const factory = getRepositoryFactory();
    const cardRepo = factory.getLearningCardRepository();
    const card = await cardRepo.create(data);
    await fetchData();
    return card;
  };

  const updateCard = async (id: string, data: any) => {
    const factory = getRepositoryFactory();
    const cardRepo = factory.getLearningCardRepository();
    const card = await cardRepo.update(id, data);
    await fetchData();
    return card;
  };

  const deleteCard = async (id: string) => {
    const factory = getRepositoryFactory();
    const cardRepo = factory.getLearningCardRepository();
    await cardRepo.delete(id);
    await fetchData();
  };

  return {
    cards,
    categories,
    topics,
    loading,
    error,
    refetch: fetchData,
    createCard,
    updateCard,
    deleteCard,
  };
}
```

---

## Phase 6: Remove Legacy Supabase Files (Priority: LOW)

### Task 6.1: Files to Delete After Migration

Once all migrations are complete, remove:

1. `apps/website/src/app/lib/supabase.ts`
2. `apps/website/src/app/lib/supabase-client.ts`
3. `apps/website/src/app/lib/get-supabase-client.ts`
4. `apps/admin/src/lib/supabase-client.ts`

### Task 6.2: Update Package Dependencies

Remove direct Supabase dependency from apps (keep only in libs/database):

```json
// apps/website/package.json - REMOVE
{
  "dependencies": {
    "@supabase/supabase-js": "x.x.x"  // REMOVE THIS
  }
}

// apps/admin/package.json - REMOVE
{
  "dependencies": {
    "@supabase/supabase-js": "x.x.x"  // REMOVE THIS
  }
}
```

---

## Migration Checklist

### Phase 1: Core Infrastructure
- [ ] Create ICategoryRepository interface
- [ ] Create ITopicRepository interface
- [ ] Create ISectionRepository interface
- [ ] Create IFlashcardRepository interface
- [ ] Create IProgressRepository interface
- [ ] Update RepositoryFactory with new getters
- [ ] Export new interfaces from index.ts

### Phase 2: PostgreSQL Adapters
- [ ] Create PostgreSQLCategoryRepository
- [ ] Create PostgreSQLTopicRepository
- [ ] Create PostgreSQLSectionRepository
- [ ] Create PostgreSQLFlashcardRepository
- [ ] Create PostgreSQLProgressRepository
- [ ] Export adapters from postgresql/index.ts
- [ ] Write unit tests for each adapter

### Phase 3: Website API Routes
- [ ] Migrate categories route
- [ ] Migrate topics routes
- [ ] Migrate questions routes
- [ ] Migrate flashcards routes
- [ ] Migrate progress routes
- [ ] Migrate plans routes
- [ ] Migrate cards routes
- [ ] Migrate admin routes
- [ ] Migrate learning-paths routes
- [ ] Migrate guided-learning routes

### Phase 4: Services
- [ ] Migrate supabase-questions.ts
- [ ] Migrate supabase-flashcards.ts
- [ ] Migrate supabase-progress.ts
- [ ] Migrate unified-question-schema.ts
- [ ] Migrate admin-auth.ts
- [ ] Migrate content-versioning-service.ts
- [ ] Migrate bulk-operations-service.ts
- [ ] Migrate auto-linking-service.ts

### Phase 5: Hooks
- [ ] Migrate useLearningCards hook
- [ ] Migrate any other direct Supabase hooks

### Phase 6: Cleanup
- [ ] Remove legacy Supabase files
- [ ] Update package.json dependencies
- [ ] Run full test suite
- [ ] Verify all routes work correctly

---

## Implementation Notes for GPT-4.1

1. **Work in phases** - Complete each phase before moving to the next
2. **Test after each migration** - Ensure the migrated code works before proceeding
3. **Keep backward compatibility** - Don't break existing functionality during migration
4. **Follow the repository pattern** - All database access should go through repositories
5. **Handle errors consistently** - Use try-catch and return proper HTTP responses
6. **Use TypeScript strictly** - No `any` types except where unavoidable

## Environment Variables

Ensure these are set:
```env
DATABASE_TYPE=postgresql
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key
```

---

**Total Estimated Effort:** 40-60 hours
**Priority:** High - Blocks multi-database support
**Dependencies:** None - Can start immediately
