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

---

## Question 11: TypeScript Generics

**Question:** What is a Generic in TypeScript? Write a simple example.

**Answer:**
Generics allow you to create reusable components and functions that can work with a variety of types rather than a single one. They provide a way to tell functions, classes, or interfaces what type you want to use when you call them.

**Basic Generic Function:**

```typescript
function identity<T>(arg: T): T {
  return arg;
}

let output = identity<string>('myString'); // type of output will be 'string'
let numberOutput = identity<number>(42); // type of numberOutput will be 'number'

// TypeScript can also infer the type
let inferred = identity('myString'); // TypeScript infers T as string
```

**Generic Interfaces:**

```typescript
interface GenericResponse<T> {
  data: T;
  status: number;
  message: string;
}

interface User {
  id: number;
  name: string;
  email: string;
}

interface Product {
  id: number;
  title: string;
  price: number;
}

// Usage
const userResponse: GenericResponse<User> = {
  data: { id: 1, name: 'John', email: 'john@example.com' },
  status: 200,
  message: 'Success',
};

const productResponse: GenericResponse<Product> = {
  data: { id: 1, title: 'Laptop', price: 999 },
  status: 200,
  message: 'Success',
};
```

**Generic Classes:**

```typescript
class GenericStack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }
}

// Usage
const numberStack = new GenericStack<number>();
numberStack.push(1);
numberStack.push(2);
console.log(numberStack.pop()); // 2

const stringStack = new GenericStack<string>();
stringStack.push('hello');
stringStack.push('world');
console.log(stringStack.pop()); // "world"
```

**Generic Constraints:**

```typescript
interface Lengthwise {
  length: number;
}

function logLength<T extends Lengthwise>(arg: T): T {
  console.log(arg.length); // Now we know it has a .length property
  return arg;
}

logLength('hello'); // OK, string has length
logLength([1, 2, 3]); // OK, array has length
logLength({ length: 10, value: 'test' }); // OK, object has length
// logLength(123); // Error, number doesn't have length
```

**Multiple Generic Parameters:**

```typescript
function merge<T, U>(obj1: T, obj2: U): T & U {
  return { ...obj1, ...obj2 };
}

const result = merge(
  { name: 'John', age: 30 },
  { city: 'New York', country: 'USA' }
);
// result has type: { name: string; age: number; city: string; country: string; }
```

**Generic Utility Types:**

```typescript
// Create a generic function that works with any object
function updateObject<T extends Record<string, any>>(
  obj: T,
  updates: Partial<T>
): T {
  return { ...obj, ...updates };
}

const user = { id: 1, name: 'John', email: 'john@example.com' };
const updatedUser = updateObject(user, { name: 'Jane' });
// updatedUser has type: { id: number; name: string; email: string; }
```

---

## Question 12: TypeScript `as const` Assertion

**Question:** What does `as const` do?

**Answer:**
`as const` is a TypeScript assertion that creates a deeply read-only (immutable) version of an object or array. It infers the most specific literal type possible and makes every property readonly, which is much more thorough than `Object.freeze()` (which only works at the top level at runtime).

**Basic Usage:**

```typescript
// Without as const
const colors = ['red', 'green', 'blue'];
// Type: string[]

// With as const
const colors = ['red', 'green', 'blue'] as const;
// Type: readonly ["red", "green", "blue"]
```

**Object Properties:**

```typescript
// Without as const
const config = {
  apiUrl: 'https://api.example.com',
  timeout: 5000,
  retries: 3,
};
// Type: { apiUrl: string; timeout: number; retries: number; }

// With as const
const config = {
  apiUrl: 'https://api.example.com',
  timeout: 5000,
  retries: 3,
} as const;
// Type: { readonly apiUrl: "https://api.example.com"; readonly timeout: 5000; readonly retries: 3; }
```

**Deep Immutability:**

```typescript
const user = {
  id: 1,
  name: 'John',
  address: {
    street: '123 Main St',
    city: 'New York',
    coordinates: {
      lat: 40.7128,
      lng: -74.006,
    },
  },
} as const;

// All properties are readonly, including nested ones
// user.name = "Jane"; // Error: Cannot assign to 'name' because it is a read-only property
// user.address.city = "Boston"; // Error: Cannot assign to 'city' because it is a read-only property
// user.address.coordinates.lat = 42.3601; // Error: Cannot assign to 'lat' because it is a read-only property
```

**Union Types from Arrays:**

```typescript
// Create union types from arrays
const statuses = ['pending', 'approved', 'rejected'] as const;
type Status = (typeof statuses)[number]; // "pending" | "approved" | "rejected"

const permissions = ['read', 'write', 'admin'] as const;
type Permission = (typeof permissions)[number]; // "read" | "write" | "admin"

// Usage in functions
function updateStatus(status: Status) {
  // status can only be "pending", "approved", or "rejected"
  console.log(`Status updated to: ${status}`);
}
```

**Template Literal Types:**

```typescript
const routes = ['/home', '/about', '/contact'] as const;
type Route = (typeof routes)[number]; // "/home" | "/about" | "/contact"

// Create API endpoints
const apiEndpoints = ['users', 'posts', 'comments'] as const;
type ApiEndpoint = (typeof apiEndpoints)[number]; // "users" | "posts" | "comments"

function createApiUrl(endpoint: ApiEndpoint): string {
  return `https://api.example.com/${endpoint}`;
}
```

**Comparison with Object.freeze():**

```typescript
// Object.freeze() - runtime only, shallow
const frozen = Object.freeze({
  name: 'John',
  address: { city: 'New York' },
});

// frozen.name = "Jane"; // Runtime error
// frozen.address.city = "Boston"; // This works! (shallow freeze)

// as const - compile-time, deep
const immutable = {
  name: 'John',
  address: { city: 'New York' },
} as const;

// immutable.name = "Jane"; // Compile error
// immutable.address.city = "Boston"; // Compile error (deep immutability)
```

---

## Question 13: TypeScript Private Access Modifier

**Question:** What does the private access modifier do?

**Answer:**
The private modifier restricts access to a class member (property or method) so that it can only be accessed from within the class itself. This is a key principle of encapsulation in object-oriented programming, ensuring that internal implementation details are hidden from the outside world.

**Basic Private Properties:**

```typescript
class BankAccount {
  private balance: number;
  private accountNumber: string;

  constructor(accountNumber: string, initialBalance: number = 0) {
    this.accountNumber = accountNumber;
    this.balance = initialBalance;
  }

  public deposit(amount: number): void {
    if (amount > 0) {
      this.balance += amount;
    }
  }

  public withdraw(amount: number): boolean {
    if (amount > 0 && amount <= this.balance) {
      this.balance -= amount;
      return true;
    }
    return false;
  }

  public getBalance(): number {
    return this.balance;
  }

  public getAccountNumber(): string {
    return this.accountNumber;
  }
}

const account = new BankAccount('123456789', 1000);

// Public methods work
account.deposit(500);
console.log(account.getBalance()); // 1500

// Private properties are not accessible
// console.log(account.balance); // Error: Property 'balance' is private
// console.log(account.accountNumber); // Error: Property 'accountNumber' is private
```

**Private Methods:**

```typescript
class UserService {
  private users: Map<string, User> = new Map();

  public createUser(userData: CreateUserData): User {
    const user = this.validateAndCreateUser(userData);
    this.users.set(user.id, user);
    this.logUserCreation(user);
    return user;
  }

  private validateAndCreateUser(userData: CreateUserData): User {
    if (!userData.email || !userData.name) {
      throw new Error('Invalid user data');
    }

    return {
      id: this.generateUserId(),
      name: userData.name,
      email: userData.email,
      createdAt: new Date(),
    };
  }

  private generateUserId(): string {
    return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private logUserCreation(user: User): void {
    console.log(`User created: ${user.name} (${user.id})`);
  }
}

// Usage
const userService = new UserService();
const user = userService.createUser({
  name: 'John',
  email: 'john@example.com',
});

// Private methods are not accessible
// userService.validateAndCreateUser({ name: "Jane", email: "jane@example.com" }); // Error
```

**Private vs Protected vs Public:**

```typescript
class BaseClass {
  public publicProperty: string = 'public';
  protected protectedProperty: string = 'protected';
  private privateProperty: string = 'private';

  public publicMethod(): string {
    return 'public method';
  }

  protected protectedMethod(): string {
    return 'protected method';
  }

  private privateMethod(): string {
    return 'private method';
  }
}

class DerivedClass extends BaseClass {
  public testAccess(): void {
    // Public - accessible everywhere
    console.log(this.publicProperty); // OK
    console.log(this.publicMethod()); // OK

    // Protected - accessible in derived classes
    console.log(this.protectedProperty); // OK
    console.log(this.protectedMethod()); // OK

    // Private - only accessible in the same class
    // console.log(this.privateProperty); // Error
    // console.log(this.privateMethod()); // Error
  }
}

// Outside the class
const instance = new DerivedClass();
console.log(instance.publicProperty); // OK
console.log(instance.publicMethod()); // OK

// console.log(instance.protectedProperty); // Error
// console.log(instance.protectedMethod()); // Error
// console.log(instance.privateProperty); // Error
// console.log(instance.privateMethod()); // Error
```

**Private Fields (ES2022):**

```typescript
class ModernClass {
  // Private fields using # syntax (ES2022)
  #privateField: string = 'private';

  // Traditional private (TypeScript only)
  private traditionalPrivate: string = 'traditional private';

  public getPrivateField(): string {
    return this.#privateField; // Access private field
  }

  public setPrivateField(value: string): void {
    this.#privateField = value; // Modify private field
  }
}

const instance = new ModernClass();
console.log(instance.getPrivateField()); // "private"

// Both are inaccessible from outside
// console.log(instance.#privateField); // Error
// console.log(instance.traditionalPrivate); // Error
```

---

## Question 14: TypeScript Type Guards

**Question:** What is a Type Guard?

**Answer:**
A type guard is a function that helps TypeScript narrow down the type of a variable within a conditional block. It's typically used with union types to check which specific type you're working with.

**Basic Type Guard:**

```typescript
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}

interface Fish {
  swim(): void;
  name: string;
}

interface Bird {
  fly(): void;
  name: string;
}

function move(pet: Fish | Bird) {
  if (isFish(pet)) {
    // TypeScript knows pet is Fish here
    pet.swim();
  } else {
    // TypeScript knows pet is Bird here
    pet.fly();
  }
}
```

**Using `in` Operator:**

```typescript
function move(pet: Fish | Bird) {
  if ('swim' in pet) {
    // TypeScript narrows to Fish
    pet.swim();
  } else {
    // TypeScript narrows to Bird
    pet.fly();
  }
}
```

**Using `typeof`:**

```typescript
function processValue(value: string | number) {
  if (typeof value === 'string') {
    // TypeScript knows value is string
    console.log(value.toUpperCase());
  } else {
    // TypeScript knows value is number
    console.log(value.toFixed(2));
  }
}
```

**Using `instanceof`:**

```typescript
class Dog {
  bark(): void {
    console.log('Woof!');
  }
}

class Cat {
  meow(): void {
    console.log('Meow!');
  }
}

function makeSound(animal: Dog | Cat) {
  if (animal instanceof Dog) {
    // TypeScript knows animal is Dog
    animal.bark();
  } else {
    // TypeScript knows animal is Cat
    animal.meow();
  }
}
```

**Custom Type Guards for Complex Objects:**

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

interface Admin {
  id: number;
  name: string;
  permissions: string[];
}

function isAdmin(user: User | Admin): user is Admin {
  return 'permissions' in user;
}

function handleUser(user: User | Admin) {
  if (isAdmin(user)) {
    // TypeScript knows user is Admin
    console.log(`Admin ${user.name} has permissions:`, user.permissions);
  } else {
    // TypeScript knows user is User
    console.log(`Regular user ${user.name} with email: ${user.email}`);
  }
}
```

**Type Guards with Arrays:**

```typescript
function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every(item => typeof item === 'string');
}

function processData(data: unknown) {
  if (isStringArray(data)) {
    // TypeScript knows data is string[]
    data.forEach(item => console.log(item.toUpperCase()));
  } else {
    console.log('Data is not a string array');
  }
}
```

**Type Guards for API Responses:**

```typescript
interface ApiResponse<T> {
  data: T;
  success: boolean;
  message: string;
}

interface ErrorResponse {
  error: string;
  code: number;
}

function isErrorResponse(
  response: ApiResponse<any> | ErrorResponse
): response is ErrorResponse {
  return 'error' in response;
}

function handleApiResponse(response: ApiResponse<User> | ErrorResponse) {
  if (isErrorResponse(response)) {
    // TypeScript knows response is ErrorResponse
    console.error(`Error ${response.code}: ${response.error}`);
  } else {
    // TypeScript knows response is ApiResponse<User>
    console.log('User data:', response.data);
  }
}
```

---

## Question 15: TypeScript `type` vs `interface`

**Question:** What is the key difference between `type` and `interface`?

**Answer:**
The key structural difference is that interface declarations can be merged (if you declare an interface with the same name twice, TypeScript will merge them), while type declarations must be unique. Use interface for public API definitions (like library types meant to be extended by users) and type for more complex type operations (unions, intersections, tuples) or domain modeling.

**Interface Merging:**

```typescript
// Interface merging - multiple declarations are merged
interface User {
  name: string;
}

interface User {
  age: number;
}

// Result: User has both name and age
const user: User = {
  name: 'John',
  age: 30,
};

// Type aliases cannot be merged
type UserType = {
  name: string;
};

// type UserType = {  // Error: Duplicate identifier 'UserType'
//   age: number;
// };
```

**Extending vs Intersection:**

```typescript
// Interface extending
interface Animal {
  name: string;
}

interface Dog extends Animal {
  breed: string;
}

// Type intersection
type AnimalType = {
  name: string;
};

type DogType = AnimalType & {
  breed: string;
};
```

**When to Use Interface:**

```typescript
// Use interface for object shapes that might be extended
interface ComponentProps {
  title: string;
  children: React.ReactNode;
}

interface ButtonProps extends ComponentProps {
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

// Use interface for public APIs
interface DatabaseConnection {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  query<T>(sql: string): Promise<T[]>;
}

// Interface can be implemented by classes
class MySQLConnection implements DatabaseConnection {
  async connect(): Promise<void> {
    // Implementation
  }

  async disconnect(): Promise<void> {
    // Implementation
  }

  async query<T>(sql: string): Promise<T[]> {
    // Implementation
    return [];
  }
}
```

**When to Use Type:**

```typescript
// Use type for unions
type Status = 'loading' | 'success' | 'error';

// Use type for complex operations
type NonNullable<T> = T extends null | undefined ? never : T;

// Use type for tuples
type Coordinates = [number, number];

// Use type for mapped types
type Partial<T> = {
  [P in keyof T]?: T[P];
};

// Use type for conditional types
type ApiResponse<T> = T extends string ? { message: T } : { data: T };

// Use type for computed properties
type EventHandlers = {
  [K in keyof HTMLElementEventMap as `on${Capitalize<string & K>}`]: (
    event: HTMLElementEventMap[K]
  ) => void;
};
```

**Performance Considerations:**

```typescript
// Interface - better for performance in large codebases
interface User {
  id: number;
  name: string;
  email: string;
}

// Type - can be slower for complex operations
type UserType = {
  id: number;
  name: string;
  email: string;
};

// Interface is generally preferred for object shapes
// Type is preferred for unions, intersections, and complex type operations
```

**Declaration Merging with Modules:**

```typescript
// interfaces can be augmented in different files
// user.d.ts
interface Window {
  myCustomProperty: string;
}

// another-file.d.ts
interface Window {
  anotherProperty: number;
}

// Result: Window has both properties
declare const window: Window;
window.myCustomProperty; // string
window.anotherProperty; // number
```

---

## Question 16: TypeScript Structural vs Nominal Typing

**Question:** Does TypeScript use structural or nominal typing?

**Answer:**
TypeScript uses structural typing. This means that if two objects have the same shape (the same properties and methods), they are considered the same type, regardless of their explicit type names or inheritance hierarchies. This is different from nominal typing (used in languages like Java or C#), where the explicit name of the type matters.

**Structural Typing Examples:**

```typescript
interface Point {
  x: number;
  y: number;
}

interface Vector {
  x: number;
  y: number;
}

// These are structurally identical, so they're compatible
const point: Point = { x: 1, y: 2 };
const vector: Vector = point; // OK - same structure

function movePoint(p: Point) {
  console.log(`Moving to (${p.x}, ${p.y})`);
}

movePoint(vector); // OK - Vector has the same structure as Point
```

**Duck Typing:**

```typescript
// "If it walks like a duck and quacks like a duck, it's a duck"
interface Duck {
  walk(): void;
  quack(): void;
}

class RealDuck implements Duck {
  walk() {
    console.log('Walking like a duck');
  }
  quack() {
    console.log('Quack!');
  }
}

class ToyDuck {
  walk() {
    console.log('Walking like a toy');
  }
  quack() {
    console.log('Squeak!');
  }
}

function makeDuckSound(duck: Duck) {
  duck.quack();
}

const realDuck = new RealDuck();
const toyDuck = new ToyDuck();

makeDuckSound(realDuck); // OK - implements Duck interface
makeDuckSound(toyDuck); // OK - has the same structure as Duck
```

**Structural Typing with Classes:**

```typescript
class Car {
  constructor(
    public brand: string,
    public model: string
  ) {}

  start() {
    console.log(`${this.brand} ${this.model} started`);
  }
}

class Motorcycle {
  constructor(
    public brand: string,
    public model: string
  ) {}

  start() {
    console.log(`${this.brand} ${this.model} started`);
  }
}

interface Vehicle {
  brand: string;
  model: string;
  start(): void;
}

function driveVehicle(vehicle: Vehicle) {
  vehicle.start();
}

const car = new Car('Toyota', 'Camry');
const motorcycle = new Motorcycle('Honda', 'CBR');

driveVehicle(car); // OK - Car has the same structure as Vehicle
driveVehicle(motorcycle); // OK - Motorcycle has the same structure as Vehicle
```

**Structural Typing with Functions:**

```typescript
type MathOperation = (a: number, b: number) => number;

function add(a: number, b: number): number {
  return a + b;
}

function multiply(a: number, b: number): number {
  return a * b;
}

function calculate(operation: MathOperation, a: number, b: number): number {
  return operation(a, b);
}

// Both functions have the same signature, so they're compatible
calculate(add, 5, 3); // 8
calculate(multiply, 5, 3); // 15
```

**Excess Property Checking:**

```typescript
interface User {
  name: string;
  age: number;
}

function createUser(user: User) {
  return user;
}

// This works - exact match
const user1 = createUser({ name: 'John', age: 30 });

// This also works - extra properties are allowed in variables
const userData = { name: 'Jane', age: 25, email: 'jane@example.com' };
const user2 = createUser(userData);

// This doesn't work - excess properties in object literals
// const user3 = createUser({ name: "Bob", age: 35, email: "bob@example.com" }); // Error
```

**Branded Types (Nominal Typing Simulation):**

```typescript
// Simulate nominal typing using branded types
type UserId = number & { readonly brand: unique symbol };
type ProductId = number & { readonly brand: unique symbol };

function createUserId(id: number): UserId {
  return id as UserId;
}

function createProductId(id: number): ProductId {
  return id as ProductId;
}

function getUserById(id: UserId) {
  // Implementation
}

function getProductById(id: ProductId) {
  // Implementation
}

const userId = createUserId(123);
const productId = createProductId(456);

getUserById(userId); // OK
getUserById(productId); // Error - different branded types
```

**Structural Typing Benefits:**

```typescript
// Easy to create compatible types
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

interface DatabaseResult<T> {
  data: T;
  status: number;
  message: string;
}

// These are structurally identical, so they're compatible
function handleResponse<T>(response: ApiResponse<T>) {
  if (response.status === 200) {
    return response.data;
  }
  throw new Error(response.message);
}

const dbResult: DatabaseResult<User> = {
  data: { id: 1, name: 'John' },
  status: 200,
  message: 'Success',
};

// Can use DatabaseResult where ApiResponse is expected
const user = handleResponse(dbResult); // OK - same structure
```
