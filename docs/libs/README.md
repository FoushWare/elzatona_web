# Shared Libraries Documentation

## Overview

Shared libraries provide reusable code across applications.

## Libraries

### @elzatona/components

Shared React components library.

**Location:** `libs/components/`

**Usage:**

```typescript
import { Button, Card, Modal } from "@elzatona/components";
```

**Documentation:** [Components Guide](./components.md)

### @elzatona/hooks

Shared React hooks library.

**Location:** `libs/hooks/`

**Usage:**

```typescript
import { useCards, usePlans, useQuestions } from "@elzatona/hooks";
```

**Documentation:** [Hooks Guide](./hooks.md)

### @elzatona/types

Shared TypeScript types library.

**Location:** `libs/types/`

**Usage:**

```typescript
import { LearningCard, UnifiedQuestion } from "@elzatona/types";
```

**Documentation:** [Types Guide](./types.md)

### @elzatona/contexts

Shared React contexts library.

**Location:** `libs/contexts/`

**Usage:**

```typescript
import { AuthProvider, ThemeProvider } from "@elzatona/contexts";
```

**Documentation:** [Contexts Guide](./contexts.md)

### @elzatona/utilities

Shared utilities and scripts library.

**Location:** `libs/utilities/`

**Usage:**

```typescript
import { formatDate, validateEmail } from "@elzatona/utilities";
```

**Scripts:** `libs/utilities/scripts/`

**Documentation:** [Utilities Guide](./utilities.md)

### @elzatona/ui

UI component library.

**Location:** `libs/ui/`

**Usage:**

```typescript
import { Button, Input } from "@elzatona/ui";
```

### @elzatona/auth

Authentication utilities.

**Location:** `libs/auth/`

**Usage:**

```typescript
import { authenticate, authorize } from "@elzatona/auth";
```

### @elzatona/database

Database utilities.

**Location:** `libs/database/`

**Usage:**

```typescript
import { query, mutate } from "@elzatona/database";
```

## Development

```bash
# Build all libraries
bun run build:all

# Test specific library
bun run test:ui
bun run test:auth
bun run test:database
```

## Documentation

- [Components](./components.md)
- [Hooks](./hooks.md)
- [Types](./types.md)
- [Contexts](./contexts.md)
- [Utilities](./utilities.md)
