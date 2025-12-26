# Development Standards

## Overview

This document defines strict development standards for the Elzatona web application refactoring. All code must adhere to these standards to ensure consistency, maintainability, and quality.

## Component Size Limits

### Strict Limits (MANDATORY)

- **Atoms**: 10-50 lines per component
- **Molecules**: 50-150 lines per component
- **Organisms**: 100-200 lines per component
- **Templates**: 150-300 lines per component
- **Pages**: 200-500 lines per component

### Enforcement

- Components exceeding limits MUST be broken down
- No exceptions without explicit approval
- Automated linting will flag violations
- Code review will reject oversized components

## File Organization Rules

### Directory Structure

```
apps/website/
├── src/
  ├── app/                      # Next.js App Router
  │   ├── layout.tsx            # Root layout
  │   ├── page.tsx              # Home page
  │   ├── Pages/                # Page components
  │   │   ├── [page-name]/
  │   │   │   ├── page.tsx      # Main page component (<500 lines)
  │   │   │   ├── components/   # Page-specific components
  │   │   │   └── hooks/        # Page-specific hooks
  │   ├── Components/           # App-specific components only
  │   │   └── (website-specific: NavbarSimple, CodeEditor, etc.)
  │   ├── Network/              # API routes
  │   ├── utils/                # App-specific utilities
  │   └── Types/                # App-specific types
  └── context/                  # React contexts

libs/components/src/lib/components/ (SHARED):
  ├── atoms/                    # Atomic design: atoms
  ├── molecules/                # Atomic design: molecules
  ├── organisms/                # Atomic design: organisms
  └── templates/                # Atomic design: templates (future)

libs/utilities/src/lib/ (SHARED):
  ├── test-utils/               # Test utilities and mocks
  └── (other shared utilities)
```

### File Naming Conventions

- **Components**: `PascalCase.tsx` (e.g., `UserCard.tsx`)
- **Utilities**: `camelCase.ts` (e.g., `formatDate.ts`)
- **Types**: `camelCase.types.ts` (e.g., `user.types.ts`)
- **Hooks**: `useCamelCase.ts` (e.g., `useUserData.ts`)
- **Constants**: `UPPER_SNAKE_CASE.ts` (e.g., `API_ENDPOINTS.ts`)
- **Tests**: `filename.test.tsx` or `filename.spec.tsx`
- **Stories**: `filename.stories.tsx`

## Import Organization

### Required Order (STRICT)

1. **React/Next.js imports**

   ```typescript
   import React, { useState, useEffect } from "react";
   import { useRouter } from "next/navigation";
   ```

2. **Third-party library imports**

   ```typescript
   import { Button } from "@radix-ui/react-button";
   import { toast } from "sonner";
   ```

3. **Internal library imports** (`@elzatona/*`)

   ```typescript
   import { Card, Input } from "@elzatona/components";
   import { useAuth } from "@elzatona/contexts";
   import { useUserData } from "@elzatona/hooks";
   ```

4. **Component imports** (relative, same directory level)

   ```typescript
   import { SearchBar } from "../molecules/SearchBar";
   import { UserCard } from "./UserCard";
   ```

5. **Utility imports** (relative)

   ```typescript
   import { formatDate } from "../../utils/date";
   import { validateEmail } from "../../lib/validation";
   ```

6. **Type imports** (always at end)
   ```typescript
   import type { User } from "../../types/user";
   import type { ApiResponse } from "../../types/api";
   ```

### Import Rules

- One import per line for named imports
- Group imports with blank lines between groups
- Sort imports alphabetically within groups
- Use `type` keyword for type-only imports
- No default imports from internal libraries (use named imports)

## TypeScript Strictness

### Required Settings

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true
  }
}
```

### Type Rules

- **NO `any` types** - Use `unknown` if type is truly unknown
- **All props must be typed** - Use interfaces or types
- **All functions must have return types** - Explicit return types
- **All hooks must be typed** - Proper generic types
- **All event handlers typed** - React event types

### Type Examples

```typescript
// ✅ GOOD: Properly typed component
interface UserCardProps {
  readonly user: User;
  readonly onEdit?: (id: string) => void;
  readonly className?: string;
}

export function UserCard({
  user,
  onEdit,
  className,
}: UserCardProps): JSX.Element {
  // ...
}

// ❌ BAD: Using any
function processData(data: any): any {
  // ...
}

// ✅ GOOD: Using unknown with type guards
function processData(data: unknown): ProcessedData {
  if (isValidData(data)) {
    // TypeScript now knows data is ValidData
    return transformData(data);
  }
  throw new Error("Invalid data");
}
```

## SOLID Principles Application

### Single Responsibility Principle

Each component/function should have ONE clear purpose:

```typescript
// ✅ GOOD: Single responsibility
function formatDate(date: Date): string {
  return date.toLocaleDateString();
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ❌ BAD: Multiple responsibilities
function processUser(user: User): void {
  formatDate(user.createdAt);
  validateEmail(user.email);
  saveToDatabase(user);
  sendNotification(user);
}
```

### Open/Closed Principle

Open for extension, closed for modification:

```typescript
// ✅ GOOD: Extensible via props
interface ButtonProps {
  readonly variant?: "primary" | "secondary" | "danger";
  readonly size?: "sm" | "md" | "lg";
  readonly children: React.ReactNode;
  readonly onClick?: () => void;
}

// ❌ BAD: Requires modification for new variants
function Button({ type }: { type: string }): JSX.Element {
  if (type === "primary") {
    /* ... */
  }
  if (type === "secondary") {
    /* ... */
  }
  // Adding new type requires modifying this function
}
```

### Liskov Substitution Principle

Components should be substitutable:

```typescript
// ✅ GOOD: Consistent interface
interface CardProps {
  readonly title: string;
  readonly children: React.ReactNode;
}

function BasicCard({ title, children }: CardProps): JSX.Element {
  /* ... */
}
function EnhancedCard({ title, children }: CardProps): JSX.Element {
  /* ... */
}

// Both can be used interchangeably
```

### Interface Segregation Principle

Small, focused interfaces:

```typescript
// ✅ GOOD: Focused interfaces
interface Editable {
  readonly onEdit: () => void;
}

interface Deletable {
  readonly onDelete: () => void;
}

interface UserCardProps extends Editable, Deletable {
  readonly user: User;
}

// ❌ BAD: Large interface with unused props
interface UserCardProps {
  readonly user: User;
  readonly onEdit: () => void;
  readonly onDelete: () => void;
  readonly onShare: () => void; // Not always needed
  readonly onExport: () => void; // Not always needed
}
```

### Dependency Inversion Principle

Depend on abstractions:

```typescript
// ✅ GOOD: Depend on interface
interface UserRepository {
  findById(id: string): Promise<User | null>;
  save(user: User): Promise<void>;
}

function UserService(repository: UserRepository) {
  return {
    async getUser(id: string): Promise<User | null> {
      return repository.findById(id);
    }
  };
}

// ❌ BAD: Depend on concrete implementation
function UserService() {
  async getUser(id: string): Promise<User | null> {
    return supabase.from("users").select("*").eq("id", id).single();
  }
}
```

## Code Style Rules

### Naming Conventions

- **Components**: PascalCase (`UserCard`, `SearchBar`)
- **Functions**: camelCase (`formatDate`, `validateEmail`)
- **Constants**: UPPER_SNAKE_CASE (`API_BASE_URL`, `MAX_RETRIES`)
- **Types/Interfaces**: PascalCase (`User`, `ApiResponse`)
- **Files**: Match export (component files = PascalCase)
- **Directories**: kebab-case (`user-card`, `search-bar`)

### Function Rules

- Maximum 50 lines per function
- Maximum 3 parameters (use objects for more)
- Early returns to reduce nesting
- Pure functions preferred
- Clear, descriptive names

```typescript
// ✅ GOOD: Clear, focused function
function calculateTotal(items: CartItem[]): number {
  if (items.length === 0) return 0;
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

// ❌ BAD: Too complex, unclear
function calc(items: any[]): number {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    if (items[i] && items[i].price && items[i].quantity) {
      total += items[i].price * items[i].quantity;
    }
  }
  return total;
}
```

### Component Rules

- Functional components only (no class components)
- Use hooks for state and effects
- Props should be readonly
- Destructure props at function signature
- Use meaningful prop names

```typescript
// ✅ GOOD: Functional component with hooks
interface UserListProps {
  readonly users: readonly User[];
  readonly onUserClick?: (user: User) => void;
}

export function UserList({ users, onUserClick }: UserListProps): JSX.Element {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  return (
    <div>
      {users.map((user) => (
        <UserCard
          key={user.id}
          user={user}
          onClick={() => onUserClick?.(user)}
        />
      ))}
    </div>
  );
}
```

## Nesting Limits

### Maximum Nesting Levels

- **JSX**: Maximum 3 levels
- **Functions**: Maximum 3 levels
- **Conditionals**: Maximum 3 levels

```typescript
// ✅ GOOD: Early returns reduce nesting
function processUser(user: User | null): string {
  if (!user) return "No user";
  if (!user.email) return "No email";
  if (!user.email.includes("@")) return "Invalid email";
  return user.email;
}

// ❌ BAD: Deep nesting
function processUser(user: User | null): string {
  if (user) {
    if (user.email) {
      if (user.email.includes("@")) {
        return user.email;
      } else {
        return "Invalid email";
      }
    } else {
      return "No email";
    }
  } else {
    return "No user";
  }
}
```

## State Management Rules

### Local State (useState)

- Use for component-specific state
- Keep state as close to usage as possible
- Use functional updates for complex state

```typescript
// ✅ GOOD: Local state
function Counter(): JSX.Element {
  const [count, setCount] = useState(0);

  const increment = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  return <button onClick={increment}>{count}</button>;
}
```

### Global State (Zustand)

- Use for app-wide state
- Keep stores focused and small
- Use selectors for performance

```typescript
// ✅ GOOD: Focused store
interface UserStore {
  readonly user: User | null;
  readonly setUser: (user: User | null) => void;
}

const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
```

### Server State (TanStack Query)

- Use for all API data
- Configure proper caching
- Handle loading and error states

```typescript
// ✅ GOOD: TanStack Query
function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await fetch("/api/users");
      return response.json() as Promise<User[]>;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
```

## Error Handling

### Required Patterns

- Always handle errors
- Provide user-friendly messages
- Log errors appropriately
- Never expose sensitive information

```typescript
// ✅ GOOD: Proper error handling
async function fetchUser(id: string): Promise<User> {
  try {
    const response = await fetch(`/api/users/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch user: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching user:", error);
    throw new Error("Unable to load user. Please try again.");
  }
}

// ❌ BAD: No error handling
async function fetchUser(id: string): Promise<User> {
  const response = await fetch(`/api/users/${id}`);
  return await response.json();
}
```

## Comments and Documentation

### When to Comment

- Complex business logic
- Non-obvious algorithms
- Workarounds for bugs
- Performance optimizations
- Security considerations

### Comment Style

```typescript
// ✅ GOOD: Clear, helpful comments
/**
 * Calculates the total price including tax and discounts.
 *
 * @param items - Array of cart items
 * @param taxRate - Tax rate as decimal (e.g., 0.08 for 8%)
 * @param discount - Discount amount in cents
 * @returns Total price in cents
 */
function calculateTotal(
  items: readonly CartItem[],
  taxRate: number,
  discount: number,
): number {
  // Sum all item prices
  const subtotal = items.reduce((sum, item) => sum + item.price, 0);

  // Apply discount before tax (business rule)
  const afterDiscount = Math.max(0, subtotal - discount);

  // Add tax
  return Math.round(afterDiscount * (1 + taxRate));
}

// ❌ BAD: Obvious or missing comments
function calc(items: any[], tax: number, disc: number): number {
  const sub = items.reduce((s, i) => s + i.price, 0);
  const after = Math.max(0, sub - disc);
  return Math.round(after * (1 + tax));
}
```

## Database Abstraction Patterns

### Repository Pattern (REQUIRED)

All database access must go through repositories:

```typescript
// ✅ GOOD: Repository interface
interface UserRepository {
  findById(id: string): Promise<User | null>;
  findAll(): Promise<readonly User[]>;
  create(user: CreateUserInput): Promise<User>;
  update(id: string, updates: UpdateUserInput): Promise<User>;
  delete(id: string): Promise<void>;
}

// Implementation
class PostgreSQLUserRepository implements UserRepository {
  constructor(private readonly db: Database) {}

  async findById(id: string): Promise<User | null> {
    const result = await this.db.query("SELECT * FROM users WHERE id = $1", [
      id,
    ]);
    return result.rows[0] ?? null;
  }
  // ... other methods
}
```

## Testing Standards

### Test File Organization

- Tests next to source files
- One test file per source file
- Use descriptive test names
- Group related tests

```typescript
// UserCard.test.tsx
describe("UserCard", () => {
  it("renders user name correctly", () => {
    // ...
  });

  it("calls onEdit when edit button is clicked", () => {
    // ...
  });

  it("displays loading state when user is null", () => {
    // ...
  });
});
```

## Performance Standards

### Required Optimizations

- Use React.memo for expensive components
- Use useMemo for expensive calculations
- Use useCallback for event handlers passed to children
- Lazy load heavy components
- Code split by route

```typescript
// ✅ GOOD: Optimized component
const ExpensiveComponent = React.memo(function ExpensiveComponent({
  data,
  onAction,
}: ExpensiveComponentProps) {
  const processedData = useMemo(() => {
    return expensiveProcessing(data);
  }, [data]);

  const handleAction = useCallback(() => {
    onAction(processedData);
  }, [processedData, onAction]);

  return <div>{/* ... */}</div>;
});
```

## Enforcement

### Automated Checks

- ESLint rules enforce these standards
- Pre-commit hooks check compliance
- CI/CD pipeline validates standards
- SonarQube monitors code quality

### Manual Review

- Code reviews verify compliance
- Standards checklist in PR template
- Regular team reviews
- Continuous improvement

## Exceptions

Exceptions to these standards require:

1. Written justification
2. Team approval
3. Documentation of exception
4. Plan to address in future

## References

- [React Best Practices](https://react.dev/learn)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [SOLID Principles](https://en.wikipedia.org/wiki/SOLID)
- [Clean Code](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882)
