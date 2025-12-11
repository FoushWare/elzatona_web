# Project Structure

## Overview

This is an **Nx monorepo** workspace containing:

- **2 Applications:** `website` and `admin`
- **8 Shared Libraries:** `components`, `hooks`, `types`, `contexts`, `utilities`, `ui`, `auth`, `database`

## Root Directory Structure

```
Elzatona-web/
├── apps/                    # Application projects
│   ├── website/            # Main website application
│   └── admin/               # Admin panel application
├── libs/                    # Shared libraries
│   ├── components/         # Shared React components
│   ├── hooks/              # Shared React hooks
│   ├── types/              # Shared TypeScript types
│   ├── contexts/           # Shared React contexts
│   ├── utilities/          # Shared utilities and scripts
│   ├── ui/                 # UI component library
│   ├── auth/               # Authentication utilities
│   └── database/           # Database utilities
├── docs/                    # Documentation
│   ├── website/            # Website-specific docs
│   ├── admin/              # Admin-specific docs
│   ├── libs/               # Library-specific docs
│   └── flows/              # Development flows
├── tests/                   # E2E tests
├── .github/                 # GitHub workflows
├── .cursor/                 # Cursor IDE rules
├── package.json             # Root package.json
├── nx.json                  # Nx workspace configuration
├── tsconfig.base.json       # Base TypeScript config
└── README.md                # This file
```

## Applications Structure

### apps/website/

Main website application (Next.js App Router)

```
apps/website/
├── src/
│   └── app/                # Next.js App Router pages
├── page-components/         # Page components (not in src/app)
├── components/             # App-specific components
├── network/
│   ├── routes/             # API route handlers
│   ├── axios/              # Axios configuration
│   └── data/               # Mock/seed data
├── lib/                    # App-specific libraries
├── context/                # App-specific contexts
├── providers/              # React providers
├── utilities/              # App-specific utilities
├── types/                  # App-specific types
├── test-utils/             # Test utilities
├── translations/           # i18n translations
├── public/                 # Static assets
├── next.config.ts          # Next.js configuration
├── tailwind.config.ts      # Tailwind CSS config
└── tsconfig.json           # TypeScript config
```

### apps/admin/

Admin panel application (Next.js Pages Router)

```
apps/admin/
├── pages/                  # Next.js Pages Router pages
├── components/             # Admin-specific components
├── network/
│   ├── routes/             # API route handlers
│   ├── axios/              # Axios configuration
│   └── data/               # Mock/seed data
├── lib/                    # Admin-specific libraries
├── utilities/              # Admin-specific utilities
├── src/
│   └── app/                # Additional app code
├── public/                 # Static assets
├── next.config.js          # Next.js configuration
├── tailwind.config.ts      # Tailwind CSS config
└── tsconfig.json           # TypeScript config
```

## Libraries Structure

### libs/components/

Shared React components

```
libs/components/
├── src/
│   ├── lib/
│   │   ├── admin/          # Admin components
│   │   ├── common/         # Common components
│   │   └── ui/             # UI components
│   └── index.ts            # Public exports
├── package.json
└── vite.config.ts
```

### libs/hooks/

Shared React hooks

```
libs/hooks/
├── src/
│   └── lib/                # Hook implementations
├── package.json
└── vite.config.ts
```

### libs/types/

Shared TypeScript types

```
libs/types/
├── src/
│   └── lib/                # Type definitions
├── package.json
└── vite.config.ts
```

### libs/contexts/

Shared React contexts

```
libs/contexts/
├── src/
│   └── lib/                # Context providers
├── package.json
└── vite.config.ts
```

### libs/utilities/

Shared utilities and scripts

```
libs/utilities/
├── src/
│   └── lib/                # Utility functions
├── scripts/                 # Development scripts
│   ├── environment/        # Environment scripts
│   ├── database/           # Database scripts
│   ├── security/           # Security scripts
│   └── ...
├── package.json
└── vite.config.ts
```

## Import Paths

### App-Specific Imports

```typescript
// Website app
import { Component } from "@/components/Component";
import { utility } from "@/lib/utility";
import { route } from "@/network/routes/route";

// Admin app
import { Component } from "@/components/Component";
import { utility } from "@/lib/utility";
```

### Shared Library Imports

```typescript
// Components
import { Button, Card } from "@elzatona/components";

// Hooks
import { useCards, usePlans } from "@elzatona/hooks";

// Types
import { LearningCard, UnifiedQuestion } from "@elzatona/types";

// Contexts
import { AuthProvider, ThemeProvider } from "@elzatona/contexts";

// Utilities
import { formatDate, validateEmail } from "@elzatona/utilities";
```

## File Naming Conventions

- **Components:** `PascalCase.tsx` (e.g., `Button.tsx`)
- **Hooks:** `camelCase.ts` with `use` prefix (e.g., `useCards.ts`)
- **Types:** `camelCase.ts` (e.g., `learningCard.ts`)
- **Utilities:** `camelCase.ts` (e.g., `formatDate.ts`)
- **Pages:** `page.tsx` (Next.js convention)
- **Tests:** `Component.test.tsx` (co-located with source)
- **Stories:** `Component.stories.tsx` (Storybook)

## Test Structure

Tests are co-located with their source files:

```
Component.tsx
Component.test.tsx          # Unit tests
Component.integration.test.tsx  # Integration tests
Component.stories.tsx        # Storybook stories
```

## Documentation Structure

```
docs/
├── website/                 # Website-specific documentation
├── admin/                   # Admin-specific documentation
├── libs/                    # Library documentation
├── flows/                    # Development flows
│   ├── local-development.md
│   ├── environment-setup.md
│   ├── ci-cd-pipeline.md
│   └── deployment.md
└── [other docs]             # General documentation
```

## Best Practices

1. **Single Responsibility** - Each file should have one clear purpose
2. **Co-location** - Keep related files together
3. **Shared Code** - Use `libs/` for code shared across apps
4. **App-Specific Code** - Use `apps/*/` for app-specific code
5. **Tests** - Co-locate tests with source files
6. **Documentation** - Keep docs organized by area
