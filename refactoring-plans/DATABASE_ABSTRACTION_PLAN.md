# Database Abstraction Plan

## Overview

This document outlines the strategy for implementing database abstraction in the Elzatona web application to support multiple database systems (PostgreSQL, MongoDB, MySQL) while maintaining clean, maintainable code.

## Goals

1. **Database Agnostic**: Support multiple database systems
2. **Easy Migration**: Switch databases without code changes
3. **Type Safety**: Full TypeScript support
4. **Performance**: Optimized queries for each database
5. **Maintainability**: Clear separation of concerns

## Architecture

### Repository Pattern

```
Application Layer
    ↓
Repository Interface (Abstraction)
    ↓
Database Adapter (Implementation)
    ↓
Database (PostgreSQL/MongoDB/MySQL)
```

## Repository Pattern

### Core Interface

```typescript
// libs/database/src/lib/interfaces/Repository.ts
interface Repository<T, ID = string> {
  findById(id: ID): Promise<T | null>;
  findAll(filters?: FilterOptions): Promise<readonly T[]>;
  create(data: CreateInput<T>): Promise<T>;
  update(id: ID, data: UpdateInput<T>): Promise<T>;
  delete(id: ID): Promise<void>;
  count(filters?: FilterOptions): Promise<number>;
  exists(id: ID): Promise<boolean>;
}
```

### Entity-Specific Interfaces

```typescript
// User Repository Interface
interface UserRepository extends Repository<User> {
  findByEmail(email: string): Promise<User | null>;
  findByRole(role: UserRole): Promise<readonly User[]>;
  updatePassword(id: string, password: string): Promise<void>;
}

// Question Repository Interface
interface QuestionRepository extends Repository<Question> {
  findByCategory(categoryId: string): Promise<readonly Question[]>;
  findByDifficulty(difficulty: Difficulty): Promise<readonly Question[]>;
  findByTopic(topicId: string): Promise<readonly Question[]>;
  search(query: string): Promise<readonly Question[]>;
}
```

## Database Adapters

### PostgreSQL Adapter

```typescript
// libs/database/src/lib/adapters/PostgreSQLAdapter.ts
import { Pool } from "pg";
import type { Repository, User } from "../interfaces";

export class PostgreSQLUserRepository implements UserRepository {
  constructor(private readonly pool: Pool) {}

  async findById(id: string): Promise<User | null> {
    const result = await this.pool.query("SELECT * FROM users WHERE id = $1", [
      id,
    ]);
    return result.rows[0] ? this.mapToUser(result.rows[0]) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const result = await this.pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email],
    );
    return result.rows[0] ? this.mapToUser(result.rows[0]) : null;
  }

  async create(data: CreateUserInput): Promise<User> {
    const result = await this.pool.query(
      "INSERT INTO users (email, name, role) VALUES ($1, $2, $3) RETURNING *",
      [data.email, data.name, data.role],
    );
    return this.mapToUser(result.rows[0]);
  }

  private mapToUser(row: unknown): User {
    // Map database row to User entity
    return {
      id: row.id,
      email: row.email,
      name: row.name,
      role: row.role,
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at),
    };
  }
}
```

### MongoDB Adapter

```typescript
// libs/database/src/lib/adapters/MongoDBAdapter.ts
import { Collection, Db } from "mongodb";
import type { Repository, User } from "../interfaces";

export class MongoDBUserRepository implements UserRepository {
  constructor(private readonly collection: Collection) {}

  async findById(id: string): Promise<User | null> {
    const doc = await this.collection.findOne({ _id: id });
    return doc ? this.mapToUser(doc) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const doc = await this.collection.findOne({ email });
    return doc ? this.mapToUser(doc) : null;
  }

  async create(data: CreateUserInput): Promise<User> {
    const doc = {
      _id: generateId(),
      email: data.email,
      name: data.name,
      role: data.role,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await this.collection.insertOne(doc);
    return this.mapToUser(doc);
  }

  private mapToUser(doc: unknown): User {
    return {
      id: doc._id,
      email: doc.email,
      name: doc.name,
      role: doc.role,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }
}
```

### MySQL Adapter

```typescript
// libs/database/src/lib/adapters/MySQLAdapter.ts
import { Pool } from "mysql2/promise";
import type { Repository, User } from "../interfaces";

export class MySQLUserRepository implements UserRepository {
  constructor(private readonly pool: Pool) {}

  async findById(id: string): Promise<User | null> {
    const [rows] = await this.pool.execute("SELECT * FROM users WHERE id = ?", [
      id,
    ]);
    return rows[0] ? this.mapToUser(rows[0]) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const [rows] = await this.pool.execute(
      "SELECT * FROM users WHERE email = ?",
      [email],
    );
    return rows[0] ? this.mapToUser(rows[0]) : null;
  }

  async create(data: CreateUserInput): Promise<User> {
    const [result] = await this.pool.execute(
      "INSERT INTO users (email, name, role) VALUES (?, ?, ?)",
      [data.email, data.name, data.role],
    );
    const id = result.insertId;
    return this.findById(id);
  }

  private mapToUser(row: unknown): User {
    return {
      id: row.id,
      email: row.email,
      name: row.name,
      role: row.role,
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at),
    };
  }
}
```

## Database Factory

```typescript
// libs/database/src/lib/factory/DatabaseFactory.ts
import type { UserRepository } from "../interfaces";
import { PostgreSQLUserRepository } from "../adapters/PostgreSQLAdapter";
import { MongoDBUserRepository } from "../adapters/MongoDBAdapter";
import { MySQLUserRepository } from "../adapters/MySQLAdapter";

type DatabaseType = "postgresql" | "mongodb" | "mysql";

export class DatabaseFactory {
  static createUserRepository(
    type: DatabaseType,
    connection: unknown,
  ): UserRepository {
    switch (type) {
      case "postgresql":
        return new PostgreSQLUserRepository(connection as Pool);
      case "mongodb":
        return new MongoDBUserRepository(connection as Collection);
      case "mysql":
        return new MySQLUserRepository(connection as Pool);
      default:
        throw new Error(`Unsupported database type: ${type}`);
    }
  }
}
```

## Configuration

### Environment-Based Configuration

```typescript
// libs/database/src/lib/config/DatabaseConfig.ts
interface DatabaseConfig {
  readonly type: DatabaseType;
  readonly host: string;
  readonly port: number;
  readonly database: string;
  readonly username?: string;
  readonly password?: string;
  readonly ssl?: boolean;
}

export function getDatabaseConfig(): DatabaseConfig {
  return {
    type: (process.env.DATABASE_TYPE || "postgresql") as DatabaseType,
    host: process.env.DATABASE_HOST || "localhost",
    port: parseInt(process.env.DATABASE_PORT || "5432", 10),
    database: process.env.DATABASE_NAME || "elzatona",
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    ssl: process.env.DATABASE_SSL === "true",
  };
}
```

## Usage in Components

### Before (Direct Database Calls)

```typescript
// ❌ BAD: Direct database access
export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function fetchUsers() {
      const { data } = await supabase
        .from("users")
        .select("*");
      setUsers(data || []);
    }
    fetchUsers();
  }, []);

  return <div>{/* ... */}</div>;
}
```

### After (Repository Pattern)

```typescript
// ✅ GOOD: Repository pattern
import { useUserRepository } from "@elzatona/database";

export default function UserList() {
  const userRepository = useUserRepository();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function fetchUsers() {
      const allUsers = await userRepository.findAll();
      setUsers(allUsers);
    }
    fetchUsers();
  }, [userRepository]);

  return <div>{/* ... */}</div>;
}
```

## Migration Strategy

### Phase 1: Create Interfaces

1. Define repository interfaces
2. Create type definitions
3. Document expected behavior
4. Create tests for interfaces

### Phase 2: Implement PostgreSQL Adapter

1. Implement PostgreSQL adapter
2. Migrate existing Supabase code
3. Test thoroughly
4. Deploy to staging

### Phase 3: Add Additional Adapters

1. Implement MongoDB adapter
2. Implement MySQL adapter
3. Test all adapters
4. Document differences

### Phase 4: Refactor Components

1. Replace direct database calls
2. Use repository pattern
3. Update tests
4. Deploy incrementally

## Query Builder Abstraction

### Database-Agnostic Queries

```typescript
// libs/database/src/lib/query/QueryBuilder.ts
interface QueryBuilder {
  select(fields: string[]): QueryBuilder;
  from(table: string): QueryBuilder;
  where(condition: Condition): QueryBuilder;
  orderBy(field: string, direction: "ASC" | "DESC"): QueryBuilder;
  limit(count: number): QueryBuilder;
  offset(count: number): QueryBuilder;
  build(): Query;
}

// Usage
const query = queryBuilder
  .select(["id", "email", "name"])
  .from("users")
  .where({ role: "admin" })
  .orderBy("created_at", "DESC")
  .limit(10)
  .build();
```

## Transaction Support

### Transaction Interface

```typescript
interface Transaction {
  commit(): Promise<void>;
  rollback(): Promise<void>;
}

interface TransactionalRepository<T> extends Repository<T> {
  transaction<R>(callback: (trx: Transaction) => Promise<R>): Promise<R>;
}
```

### Transaction Implementation

```typescript
// PostgreSQL
async transaction<R>(
  callback: (trx: Transaction) => Promise<R>
): Promise<R> {
  const client = await this.pool.connect();
  try {
    await client.query("BEGIN");
    const result = await callback({
      commit: async () => {
        await client.query("COMMIT");
      },
      rollback: async () => {
        await client.query("ROLLBACK");
      },
    });
    return result;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}
```

## Testing Strategy

### Repository Tests

```typescript
// libs/database/src/lib/adapters/__tests__/UserRepository.test.ts
describe("UserRepository", () => {
  it("should work with PostgreSQL", async () => {
    const repo = new PostgreSQLUserRepository(pool);
    await testRepository(repo);
  });

  it("should work with MongoDB", async () => {
    const repo = new MongoDBUserRepository(collection);
    await testRepository(repo);
  });

  it("should work with MySQL", async () => {
    const repo = new MySQLUserRepository(pool);
    await testRepository(repo);
  });

  async function testRepository(repo: UserRepository) {
    const user = await repo.create({
      email: "test@example.com",
      name: "Test User",
      role: "user",
    });
    expect(user).toBeDefined();
    expect(user.email).toBe("test@example.com");

    const found = await repo.findById(user.id);
    expect(found).toEqual(user);
  }
});
```

## Performance Considerations

### Database-Specific Optimizations

1. **PostgreSQL**
   - Use indexes appropriately
   - Use prepared statements
   - Use connection pooling
   - Optimize queries with EXPLAIN

2. **MongoDB**
   - Create appropriate indexes
   - Use aggregation pipelines
   - Optimize queries
   - Use connection pooling

3. **MySQL**
   - Use indexes appropriately
   - Use prepared statements
   - Optimize queries
   - Use connection pooling

### Caching Strategy

```typescript
interface CachedRepository<T> extends Repository<T> {
  clearCache(): Promise<void>;
  getCacheKey(id: string): string;
}

// Implementation with Redis
class CachedUserRepository implements CachedRepository<User> {
  constructor(
    private readonly repository: UserRepository,
    private readonly cache: Cache,
  ) {}

  async findById(id: string): Promise<User | null> {
    const cacheKey = this.getCacheKey(id);
    const cached = await this.cache.get(cacheKey);
    if (cached) return cached as User;

    const user = await this.repository.findById(id);
    if (user) {
      await this.cache.set(cacheKey, user, 3600); // 1 hour
    }
    return user;
  }
}
```

## Implementation Checklist

### For Each Page/Component

- [ ] Identify all database calls
- [ ] Create repository interface
- [ ] Implement PostgreSQL adapter
- [ ] Replace direct calls with repository
- [ ] Add tests for repository
- [ ] Update component to use repository
- [ ] Test with multiple databases
- [ ] Document database requirements

## Migration Examples

### Example 1: User Management

**Before:**

```typescript
const { data } = await supabase.from("users").select("*");
```

**After:**

```typescript
const users = await userRepository.findAll();
```

### Example 2: Question Management

**Before:**

```typescript
const { data } = await supabase
  .from("questions")
  .select("*")
  .eq("category_id", categoryId);
```

**After:**

```typescript
const questions = await questionRepository.findByCategory(categoryId);
```

## Benefits

1. **Flexibility**: Easy to switch databases
2. **Testability**: Easy to mock repositories
3. **Maintainability**: Clear separation of concerns
4. **Type Safety**: Full TypeScript support
5. **Performance**: Database-specific optimizations

## Next Steps

1. Create repository interfaces
2. Implement PostgreSQL adapter
3. Migrate one page as proof of concept
4. Add MongoDB and MySQL adapters
5. Migrate all pages systematically

