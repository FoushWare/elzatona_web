# Database Configuration Guide

## Overview

The Elzatona Web platform now supports multiple databases through a repository pattern abstraction layer. You can switch between PostgreSQL, MongoDB, MySQL, and Firebase by simply changing an environment variable.

---

## Supported Databases

| Database       | Status                      | Configuration Required  |
| -------------- | --------------------------- | ----------------------- |
| **PostgreSQL** | ✅ Fully Supported          | Connection URL, API Key |
| **MongoDB**    | 🔄 Ready for Implementation | Adapter pending         |
| **MySQL**      | 🔄 Ready for Implementation | Adapter pending         |
| **Firebase**   | 🔄 Ready for Implementation | Adapter pending         |

---

## Quick Setup

### 1. Choose Your Database

Set the `DATABASE_TYPE` environment variable in your `.env.local`:

```bash
# PostgreSQL (default)
DATABASE_TYPE=postgresql

# MongoDB (coming soon)
DATABASE_TYPE=mongodb

# MySQL (coming soon)
DATABASE_TYPE=mysql

# Firebase (coming soon)
DATABASE_TYPE=firebase
```

### 2. PostgreSQL Configuration (Supabase)

```bash
# .env.local
DATABASE_TYPE=postgresql
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### 3. MongoDB Configuration (Coming Soon)

```bash
# .env.local
DATABASE_TYPE=mongodb
MONGODB_URI=MONGO_URL
MONGODB_DATABASE=elzatona
```

### 4. MySQL Configuration (Coming Soon)

```bash
# .env.local
DATABASE_TYPE=mysql
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=password
MYSQL_DATABASE=elzatona
```

### 5. Firebase Configuration (Coming Soon)

```bash
# .env.local
DATABASE_TYPE=firebase
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=your-client-email
FIREBASE_PRIVATE_KEY=your-private-key
```

---

## Architecture

### Repository Pattern

The application uses the **Repository Pattern** to abstract database operations:

```
API Routes → RepositoryFactory → Repository Interface → Database Adapter
```

### Example Usage

```typescript
// In your API route
import { createRepositoryFactoryFromEnv } from "@/libs/database/src/repositories/RepositoryFactory";

export async function GET() {
  // Factory reads DATABASE_TYPE from environment
  const factory = createRepositoryFactoryFromEnv();

  // Get repository instance (database-agnostic)
  const categoryRepo = factory.getCategoryRepository();

  // Perform operations (same code works for all databases)
  const categories = await categoryRepo.getAllCategories();

  return Response.json({ categories });
}
```

### Supported Repositories

- **ICategoryRepository** - Category management
- **ITopicRepository** - Topic management
- **ISectionRepository** - Section management
- **IFlashcardRepository** - Flashcard management
- **IProgressRepository** - Progress tracking
- **IUserRepository** - User management
- **IQuestionRepository** - Question management
- **IPlanRepository** - Learning plan management
- **ILearningCardRepository** - Learning card management

---

## Database Schema

### Required Tables

#### Categories

```sql
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### Topics

```sql
CREATE TABLE topics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  category_id UUID REFERENCES categories(id),
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### Sections

```sql
CREATE TABLE sections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  topic_id UUID REFERENCES topics(id),
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### Flashcards

```sql
CREATE TABLE flashcards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  section_id UUID REFERENCES sections(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### Progress

```sql
CREATE TABLE progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  flashcard_id UUID REFERENCES flashcards(id),
  status VARCHAR(50) NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW()
);
```

---

## Migration from Direct Database Calls

### Before (Direct Supabase)

```typescript
import { getSupabaseClient } from "@/lib/supabase";

export async function GET() {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase.from("categories").select("*");

  if (error) throw error;
  return Response.json(data);
}
```

### After (Repository Pattern)

```typescript
import { createRepositoryFactoryFromEnv } from "@/libs/database";

export async function GET() {
  const factory = createRepositoryFactoryFromEnv();
  const repo = factory.getCategoryRepository();
  const categories = await repo.getAllCategories();

  return Response.json(categories);
}
```

---

## Benefits

### 1. Database Flexibility

- Switch databases without changing application code
- Test with different databases
- Use different databases for different environments

### 2. Improved Testability

- Mock repositories for unit tests
- No need for actual database in tests
- Faster test execution

### 3. Cleaner Code

- Single responsibility principle
- Clear separation of concerns
- Less boilerplate

### 4. Better Performance

- Database-specific optimizations possible
- Connection pooling managed by adapters
- Easy to add caching layers

---

## Development Guide

### Adding a New Repository

1. **Define Interface** (`libs/database/src/repositories/interfaces/`)

```typescript
export interface IMyEntityRepository {
  getById(id: string): Promise<MyEntity | null>;
  getAll(): Promise<MyEntity[]>;
  create(data: MyEntityInput): Promise<MyEntity>;
  update(id: string, data: MyEntityInput): Promise<MyEntity>;
  delete(id: string): Promise<void>;
}
```

2. **Implement Adapter** (`libs/database/src/adapters/postgresql/`)

```typescript
export class PostgreSQLMyEntityRepository implements IMyEntityRepository {
  private pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  async getById(id: string): Promise<MyEntity | null> {
    const res = await this.pool.query(
      "SELECT * FROM my_entities WHERE id = $1",
      [id],
    );
    return res.rows[0] || null;
  }

  // ... implement other methods
}
```

3. **Add to Factory** (`libs/database/src/repositories/RepositoryFactory.ts`)

```typescript
export class RepositoryFactory {
  private myEntityRepository?: IMyEntityRepository;

  getMyEntityRepository(): IMyEntityRepository {
    if (!this.myEntityRepository) {
      this.myEntityRepository = this.createMyEntityRepository();
    }
    return this.myEntityRepository;
  }

  private createMyEntityRepository(): IMyEntityRepository {
    switch (this.config.database.type) {
      case "postgresql":
        return new PostgreSQLMyEntityRepository(this.getPostgreSQLConfig());
      // ... other database types
    }
  }
}
```

4. **Use in API Routes**

```typescript
const factory = createRepositoryFactoryFromEnv();
const repo = factory.getMyEntityRepository();
const entities = await repo.getAll();
```

---

## Troubleshooting

### Error: "Unsupported database type"

- Ensure `DATABASE_TYPE` is set in `.env.local`
- Check spelling: `postgresql`, `mongodb`, `mysql`, or `firebase`

### Error: "Database connection failed"

- Verify database credentials in `.env.local`
- Check network connectivity
- Ensure database service is running

### Error: "Repository not found"

- Verify repository is registered in RepositoryFactory
- Check import statements

### Performance Issues

- Review query efficiency
- Check connection pool settings
- Consider adding indexes to database tables

---

## Security Best Practices

1. **Never commit `.env.local`** - Contains sensitive credentials
2. **Use environment variables** - For all database credentials
3. **Parameterized queries** - All adapters use parameterized queries to prevent SQL injection
4. **Connection pooling** - Reuse connections, don't create new ones per request
5. **Access control** - Implement proper authentication and authorization

---

## References

- [Database Abstraction Migration Completed](./DATABASE_ABSTRACTION_MIGRATION_COMPLETED.md)
- [Code Review Report](./DATABASE_ABSTRACTION_CODE_REVIEW.md)
- [Repository Pattern](https://martinfowler.com/eaaCatalog/repository.html)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

---

**Last Updated:** January 19, 2026  
**Version:** 1.0.0  
**Maintained By:** Elzatona Development Team
