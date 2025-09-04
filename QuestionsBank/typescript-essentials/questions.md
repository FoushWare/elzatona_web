# TypeScript Essentials - Questions Bank

## Question 1: TypeScript Utility Types

**Question:** What are TypeScript utility types and provide examples of `Pick`, `Omit`, and `Partial`.

**Answer:**
TypeScript utility types are built-in generic types that help manipulate existing types:

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  password: string;
}

// Pick: Select specific properties
type UserBasic = Pick<User, 'id' | 'name'>;
// { id: number; name: string; }

// Omit: Exclude specific properties
type UserWithoutId = Omit<User, 'id'>;
// { name: string; email: string; age: number; password: string; }

// Partial: Make all properties optional
type PartialUser = Partial<User>;
// { id?: number; name?: string; email?: string; age?: number; password?: string; }

// Required: Make all properties required
type RequiredUser = Required<PartialUser>;
// { id: number; name: string; email: string; age: number; password: string; }

// Record: Create object type with specific keys and values
type UserRoles = Record<string, string[]>;
// { [key: string]: string[] }

// Exclude: Exclude types from union
type Status = 'loading' | 'success' | 'error';
type NonErrorStatus = Exclude<Status, 'error'>; // 'loading' | 'success'

// Extract: Extract types from union
type StringOrNumber = string | number;
type OnlyString = Extract<StringOrNumber, string>; // string
```

**Practical Examples:**

```typescript
// API Response types
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

type UserResponse = ApiResponse<User>;
type UserListResponse = ApiResponse<User[]>;

// Form types
type CreateUserForm = Omit<User, 'id'>;
type UpdateUserForm = Partial<Pick<User, 'name' | 'email' | 'age'>>;

// Component props
interface ButtonProps {
  variant: 'primary' | 'secondary';
  size: 'small' | 'medium' | 'large';
  disabled?: boolean;
  onClick: () => void;
}

type ButtonVariants = Pick<ButtonProps, 'variant'>;
type ButtonSizes = Pick<ButtonProps, 'size'>;
```

---

## Question 2: TypeScript Generics

**Question:** Explain TypeScript generics and provide practical examples.

**Answer:**
Generics allow you to create reusable components that work with multiple types while maintaining type safety.

**Basic Generic Function:**

```typescript
function identity<T>(arg: T): T {
  return arg;
}

const stringResult = identity<string>('hello'); // string
const numberResult = identity<number>(42); // number
const inferredResult = identity('hello'); // TypeScript infers string
```

**Generic Interface:**

```typescript
interface Container<T> {
  value: T;
  getValue(): T;
  setValue(value: T): void;
}

class Box<T> implements Container<T> {
  constructor(public value: T) {}

  getValue(): T {
    return this.value;
  }

  setValue(value: T): void {
    this.value = value;
  }
}

const stringBox = new Box<string>('hello');
const numberBox = new Box<number>(42);
```

**Generic Constraints:**

```typescript
interface Lengthwise {
  length: number;
}

function logLength<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}

logLength('hello'); // OK - string has length
logLength([1, 2, 3]); // OK - array has length
logLength(42); // Error - number doesn't have length

// Multiple constraints
function combine<T extends object, U extends object>(obj1: T, obj2: U): T & U {
  return { ...obj1, ...obj2 };
}

const result = combine({ name: 'John' }, { age: 30 });
// result: { name: string; age: number; }
```

**Generic Classes:**

```typescript
class Repository<T> {
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  findById(id: keyof T): T | undefined {
    return this.items.find(item => item[id] === id);
  }

  getAll(): T[] {
    return [...this.items];
  }
}

interface User {
  id: number;
  name: string;
}

const userRepo = new Repository<User>();
userRepo.add({ id: 1, name: 'John' });
const user = userRepo.findById(1);
```

**Advanced Generic Patterns:**

```typescript
// Conditional types
type NonNullable<T> = T extends null | undefined ? never : T;

// Mapped types
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

type Optional<T> = {
  [P in keyof T]?: T[P];
};

// Template literal types
type EventName<T extends string> = `on${Capitalize<T>}`;
type ClickEvent = EventName<'click'>; // 'onClick'
type ChangeEvent = EventName<'change'>; // 'onChange'

// Utility type implementation
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};

type MyOmit<T, K extends keyof T> = {
  [P in Exclude<keyof T, K>]: T[P];
};
```

---

## Question 3: TypeScript Advanced Types

**Question:** Explain TypeScript advanced types: Union, Intersection, Literal, and Discriminated Unions.

**Answer:**
**Union Types:**

```typescript
type StringOrNumber = string | number;
type Status = 'loading' | 'success' | 'error';

function processValue(value: StringOrNumber): string {
  if (typeof value === 'string') {
    return value.toUpperCase();
  }
  return value.toString();
}

// Union with different shapes
type Shape =
  | { kind: 'circle'; radius: number }
  | { kind: 'rectangle'; width: number; height: number }
  | { kind: 'triangle'; base: number; height: number };

function getArea(shape: Shape): number {
  switch (shape.kind) {
    case 'circle':
      return Math.PI * shape.radius ** 2;
    case 'rectangle':
      return shape.width * shape.height;
    case 'triangle':
      return (shape.base * shape.height) / 2;
  }
}
```

**Intersection Types:**

```typescript
interface Person {
  name: string;
  age: number;
}

interface Employee {
  employeeId: string;
  department: string;
}

type PersonEmployee = Person & Employee;

const john: PersonEmployee = {
  name: 'John',
  age: 30,
  employeeId: 'EMP001',
  department: 'Engineering',
};

// Mixin pattern
type Constructor<T = {}> = new (...args: any[]) => T;

function Timestamped<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    timestamp = Date.now();
  };
}

class User {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

const TimestampedUser = Timestamped(User);
const user = new TimestampedUser('John');
console.log(user.timestamp); // number
```

**Literal Types:**

```typescript
// String literals
type Theme = 'light' | 'dark';
type Direction = 'up' | 'down' | 'left' | 'right';

// Numeric literals
type DiceRoll = 1 | 2 | 3 | 4 | 5 | 6;

// Boolean literals
type Success = true;
type Failure = false;

// Template literal types
type CSSProperty = `margin-${'top' | 'bottom' | 'left' | 'right'}`;
// 'margin-top' | 'margin-bottom' | 'margin-left' | 'margin-right'

type EventHandler<T extends string> = `on${Capitalize<T>}`;
type ClickHandler = EventHandler<'click'>; // 'onClick'
```

**Discriminated Unions:**

```typescript
// API Response discriminated union
type ApiResponse<T> =
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: string };

function handleResponse<T>(response: ApiResponse<T>) {
  switch (response.status) {
    case 'loading':
      console.log('Loading...');
      break;
    case 'success':
      console.log('Data:', response.data);
      break;
    case 'error':
      console.error('Error:', response.error);
      break;
  }
}

// Form state discriminated union
type FormState =
  | { type: 'idle' }
  | { type: 'submitting' }
  | { type: 'success'; message: string }
  | { type: 'error'; errors: string[] };

function renderForm(state: FormState) {
  switch (state.type) {
    case 'idle':
      return <Form />;
    case 'submitting':
      return <Spinner />;
    case 'success':
      return <SuccessMessage message={state.message} />;
    case 'error':
      return <ErrorMessage errors={state.errors} />;
  }
}
```

---

## Question 4: TypeScript with React

**Question:** How do you use TypeScript effectively with React components?

**Answer:**
**Functional Components:**

```typescript
import React, { useState, useEffect } from 'react';

// Props interface
interface UserCardProps {
  user: {
    id: number;
    name: string;
    email: string;
    avatar?: string;
  };
  onEdit?: (user: UserCardProps['user']) => void;
  onDelete?: (id: number) => void;
}

// Functional component with TypeScript
const UserCard: React.FC<UserCardProps> = ({ user, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  return (
    <div className="user-card">
      <img src={user.avatar || '/default-avatar.png'} alt={user.name} />
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      {onEdit && (
        <button onClick={() => onEdit(user)}>Edit</button>
      )}
      {onDelete && (
        <button onClick={() => onDelete(user.id)}>Delete</button>
      )}
    </div>
  );
};

// Generic component
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  keyExtractor: (item: T) => string | number;
}

function List<T>({ items, renderItem, keyExtractor }: ListProps<T>) {
  return (
    <ul>
      {items.map(item => (
        <li key={keyExtractor(item)}>
          {renderItem(item)}
        </li>
      ))}
    </ul>
  );
}

// Usage
const users = [
  { id: 1, name: 'John', email: 'john@example.com' },
  { id: 2, name: 'Jane', email: 'jane@example.com' }
];

<List
  items={users}
  renderItem={(user) => <UserCard user={user} />}
  keyExtractor={(user) => user.id}
/>
```

**Class Components:**

```typescript
interface CounterState {
  count: number;
  isActive: boolean;
}

interface CounterProps {
  initialCount?: number;
  step?: number;
  onCountChange?: (count: number) => void;
}

class Counter extends React.Component<CounterProps, CounterState> {
  constructor(props: CounterProps) {
    super(props);
    this.state = {
      count: props.initialCount || 0,
      isActive: true
    };
  }

  increment = (): void => {
    const newCount = this.state.count + (this.props.step || 1);
    this.setState({ count: newCount });
    this.props.onCountChange?.(newCount);
  };

  decrement = (): void => {
    const newCount = this.state.count - (this.props.step || 1);
    this.setState({ count: newCount });
    this.props.onCountChange?.(newCount);
  };

  render(): React.ReactNode {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.increment}>+</button>
        <button onClick={this.decrement}>-</button>
      </div>
    );
  }
}
```

**Custom Hooks with TypeScript:**

```typescript
import { useState, useEffect, useCallback } from 'react';

// Custom hook types
interface UseApiResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

// Generic custom hook
function useApi<T>(url: string): UseApiResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

// Usage
interface User {
  id: number;
  name: string;
  email: string;
}

function UserProfile({ userId }: { userId: number }) {
  const { data: user, loading, error, refetch } = useApi<User>(`/api/users/${userId}`);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
      <button onClick={refetch}>Refresh</button>
    </div>
  );
}
```

**Context with TypeScript:**

```typescript
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  }, []);

  const value: ThemeContextType = {
    theme,
    toggleTheme
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
```

---

## Question 5: TypeScript Error Handling

**Question:** How do you handle errors effectively in TypeScript?

**Answer:**
**Custom Error Classes:**

```typescript
// Base error class
abstract class AppError extends Error {
  abstract readonly statusCode: number;
  abstract readonly isOperational: boolean;

  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

// Specific error types
class ValidationError extends AppError {
  readonly statusCode = 400;
  readonly isOperational = true;

  constructor(
    message: string,
    public field?: string
  ) {
    super(message);
  }
}

class NotFoundError extends AppError {
  readonly statusCode = 404;
  readonly isOperational = true;
}

class DatabaseError extends AppError {
  readonly statusCode = 500;
  readonly isOperational = false;
}

// Error handling utility
type ErrorHandler = (error: Error) => void;

class ErrorHandler {
  private static instance: ErrorHandler;
  private handlers: Map<string, ErrorHandler> = new Map();

  static getInstance(): ErrorHandler {
    if (!ErrorHandler.instance) {
      ErrorHandler.instance = new ErrorHandler();
    }
    return ErrorHandler.instance;
  }

  register(errorType: string, handler: ErrorHandler): void {
    this.handlers.set(errorType, handler);
  }

  handle(error: Error): void {
    const handler = this.handlers.get(error.constructor.name);
    if (handler) {
      handler(error);
    } else {
      console.error('Unhandled error:', error);
    }
  }
}
```

**Result Pattern:**

```typescript
// Result type for error handling
type Result<T, E = Error> =
  | { success: true; data: T }
  | { success: false; error: E };

// Utility functions
function success<T>(data: T): Result<T, never> {
  return { success: true, data };
}

function failure<E>(error: E): Result<never, E> {
  return { success: false, error };
}

// API function with Result
async function fetchUser(id: number): Promise<Result<User, string>> {
  try {
    const response = await fetch(`/api/users/${id}`);
    if (!response.ok) {
      return failure(`HTTP error! status: ${response.status}`);
    }
    const user = await response.json();
    return success(user);
  } catch (error) {
    return failure(error instanceof Error ? error.message : 'Unknown error');
  }
}

// Usage
async function displayUser(id: number) {
  const result = await fetchUser(id);

  if (result.success) {
    console.log('User:', result.data);
  } else {
    console.error('Error:', result.error);
  }
}
```

**Type Guards:**

```typescript
// Type guard functions
function isString(value: unknown): value is string {
  return typeof value === 'string';
}

function isUser(value: unknown): value is User {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'name' in value &&
    'email' in value
  );
}

// API response type guard
function isApiError(
  response: unknown
): response is { error: string; code: number } {
  return (
    typeof response === 'object' &&
    response !== null &&
    'error' in response &&
    'code' in response
  );
}

// Usage
function processApiResponse(response: unknown) {
  if (isApiError(response)) {
    console.error(`API Error ${response.code}: ${response.error}`);
    return;
  }

  if (isUser(response)) {
    console.log('User:', response.name);
    return;
  }

  console.log('Unknown response type');
}
```

**Try-Catch with TypeScript:**

```typescript
// Error handling wrapper
async function safeAsync<T>(
  operation: () => Promise<T>
): Promise<Result<T, Error>> {
  try {
    const result = await operation();
    return success(result);
  } catch (error) {
    return failure(error instanceof Error ? error : new Error(String(error)));
  }
}

// Usage
async function loadUserData(userId: number) {
  const result = await safeAsync(async () => {
    const response = await fetch(`/api/users/${userId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch user: ${response.status}`);
    }
    return response.json();
  });

  if (result.success) {
    return result.data;
  } else {
    console.error('Failed to load user:', result.error.message);
    throw result.error;
  }
}
```

---

## Question 6: TypeScript Configuration and Tooling

**Question:** How do you configure TypeScript for optimal development experience?

**Answer:**
**tsconfig.json Configuration:**

```json
{
  "compilerOptions": {
    // Language and Environment
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "node",

    // Modules
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "resolveJsonModule": true,
    "isolatedModules": true,

    // Emit
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "removeComments": true,

    // Interop Constraints
    "allowJs": true,
    "checkJs": false,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,

    // Type Checking
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true,

    // Completeness
    "skipDefaultLibCheck": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.ts", "**/*.spec.ts"],
  "ts-node": {
    "esm": true
  }
}
```

**ESLint Configuration:**

```json
{
  "extends": [
    "@typescript-eslint/recommended",
    "@typescript-eslint/recommended-requiring-type-checking"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 2020,
    "sourceType": "module",
    "project": "./tsconfig.json"
  },
  "plugins": ["@typescript-eslint"],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/explicit-function-return-type": "warn",
    "@typescript-eslint/no-non-null-assertion": "error",
    "@typescript-eslint/prefer-nullish-coalescing": "error",
    "@typescript-eslint/prefer-optional-chain": "error"
  }
}
```

**Prettier Configuration:**

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false
}
```

**Package.json Scripts:**

```json
{
  "scripts": {
    "build": "tsc",
    "build:watch": "tsc --watch",
    "type-check": "tsc --noEmit",
    "lint": "eslint src --ext .ts,.tsx",
    "lint:fix": "eslint src --ext .ts,.tsx --fix",
    "format": "prettier --write src/**/*.{ts,tsx}",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

**VS Code Settings:**

```json
{
  "typescript.preferences.importModuleSpecifier": "relative",
  "typescript.suggest.autoImports": true,
  "typescript.updateImportsOnFileMove.enabled": "always",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.organizeImports": true
  },
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```
