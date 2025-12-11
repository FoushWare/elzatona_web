# Project Structure & Conventions

## Nx Monorepo Architecture

```
Elzatona-web/
├── apps/                    # Applications (2)
│   ├── website/            # Main website (Next.js App Router)
│   └── admin/              # Admin panel (Next.js Pages Router)
├── libs/                   # Shared libraries (8)
│   ├── components/         # Shared React components
│   ├── hooks/              # Shared React hooks
│   ├── types/              # Shared TypeScript types
│   ├── contexts/           # Shared React contexts
│   ├── utilities/          # Shared utilities and scripts
│   ├── ui/                 # UI component library
│   ├── auth/               # Authentication utilities
│   └── database/           # Database utilities
├── docs/                   # Documentation
├── tests/                  # E2E tests
└── migrations/             # Database migrations
```

## Import Path Conventions

### Shared Library Imports (Preferred)

```typescript
// Components
import { Button, Card, Modal } from "@elzatona/components";

// Hooks
import { useCards, usePlans } from "@elzatona/hooks";

// Types
import { LearningCard, UnifiedQuestion } from "@elzatona/types";

// Contexts
import { AuthProvider, ThemeProvider } from "@elzatona/contexts";

// Utilities
import { formatDate, validateEmail } from "@elzatona/utilities";
```

### App-Specific Imports

```typescript
// Website app (App Router)
import { Component } from "@/components/Component";
import { utility } from "@/lib/utility";
import { route } from "@/network/routes/route";

// Admin app (Pages Router)
import { Component } from "@/components/Component";
import { utility } from "@/lib/utility";
```

## File Naming Conventions

- **Components**: `PascalCase.tsx` (e.g., `Button.tsx`, `UserDashboard.tsx`)
- **Hooks**: `camelCase.ts` with `use` prefix (e.g., `useCards.ts`, `useAuth.ts`)
- **Types**: `camelCase.ts` (e.g., `learningCard.ts`, `userTypes.ts`)
- **Utilities**: `camelCase.ts` (e.g., `formatDate.ts`, `apiHelpers.ts`)
- **Pages**: `page.tsx` (Next.js App Router) or `index.tsx` (Pages Router)
- **API Routes**: `route.ts` (App Router) or `[...].ts` (Pages Router)
- **Tests**: `Component.test.tsx` (co-located with source)
- **Stories**: `Component.stories.tsx` (Storybook)

## Code Organization Patterns

### Component Structure

```typescript
// Component file structure
export interface ComponentProps {
  // Props interface
}

export const Component: React.FC<ComponentProps> = ({ prop }) => {
  // Component implementation
};

export default Component;
```

### Test Co-location

```
Component.tsx
Component.test.tsx              # Unit tests
Component.integration.test.tsx  # Integration tests
Component.stories.tsx           # Storybook stories
```

### Library Structure

```
libs/[library-name]/
├── src/
│   ├── lib/                # Implementation
│   └── index.ts            # Public exports
├── package.json
├── project.json            # Nx configuration
├── tsconfig.json
└── vite.config.ts          # Build configuration
```

## Application-Specific Patterns

### Website App (Next.js App Router)

```
apps/website/
├── src/app/                # App Router pages
│   ├── (auth)/            # Route groups
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── page-components/        # Page-specific components
├── components/            # App-specific components
├── lib/                   # App utilities
└── network/               # API configuration
```

### Admin App (Next.js Pages Router)

```
apps/admin/
├── pages/                 # Pages Router pages
│   ├── api/              # API routes
│   ├── _app.tsx          # App component
│   ├── _document.tsx     # Document component
│   └── index.tsx         # Home page
├── components/           # Admin-specific components
├── lib/                  # Admin utilities
└── network/              # API configuration
```

## Shared Code Guidelines

### When to Use Shared Libraries

- **Components**: Reusable UI components across apps
- **Hooks**: Business logic shared between apps
- **Types**: Data structures used by multiple apps
- **Contexts**: Global state shared across apps
- **Utilities**: Pure functions used by multiple apps

### When to Keep Code App-Specific

- **Page Components**: App-specific page layouts
- **API Routes**: App-specific endpoints
- **App Configuration**: Next.js configs, middleware
- **App-Specific Business Logic**: Single-app features

## Environment & Configuration

### Environment Files

- `.env.example` - Template for production
- `.env.local` - Production environment (gitignored)
- `.env.test.local` - Test environment (gitignored)
- `.env.dev.local` - Development environment (gitignored)

### Configuration Files

- `nx.json` - Nx workspace configuration
- `tsconfig.base.json` - Base TypeScript configuration
- `package.json` - Root dependencies and scripts
- `tailwind.config.ts` - Tailwind CSS configuration
- `eslint.config.mjs` - ESLint configuration

## Development Workflow

1. **Shared Code First**: Create reusable components in `libs/`
2. **App-Specific Second**: Implement app-specific features in `apps/`
3. **Test Co-location**: Write tests alongside source files
4. **Documentation**: Update docs for new features
5. **Type Safety**: Ensure strict TypeScript compliance

## Security Considerations

- **Environment Variables**: Never commit `.env.local` files
- **API Keys**: Use environment variables for secrets
- **RLS Policies**: Implement Row Level Security in Supabase
- **Input Validation**: Validate all user inputs with Zod schemas
- **XSS Prevention**: Sanitize user content with DOMPurify
