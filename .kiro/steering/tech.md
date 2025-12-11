# Technology Stack

## Build System & Monorepo

- **Nx Monorepo**: Workspace with 2 apps and 8 shared libraries
- **Package Manager**: Bun (preferred) or npm
- **Node.js**: >=20.0.0, npm >=10.0.0

## Frontend Framework

- **Next.js 16**: React framework with App Router (website) and Pages Router (admin)
- **React 18**: UI library with hooks and context
- **TypeScript 5**: Strict type checking enabled

## Styling & UI

- **Tailwind CSS**: Utility-first CSS framework with custom design system
- **Radix UI**: Headless UI components (@radix-ui/react-\*)
- **Lucide React**: Icon library
- **CSS Variables**: HSL-based color system with dark mode support

## Backend & Database

- **Supabase**: Backend-as-a-Service (PostgreSQL, Auth, Real-time)
- **Supabase Auth**: User authentication and authorization
- **Row Level Security (RLS)**: Database security policies

## State Management & Data

- **Jotai**: Atomic state management
- **TanStack Query**: Server state management and caching
- **React Context**: App-level state sharing

## Code Quality & Testing

- **ESLint**: Linting with Next.js and TypeScript rules
- **Prettier**: Code formatting
- **Jest**: Unit and integration testing
- **Playwright**: End-to-end testing
- **Husky**: Git hooks for pre-commit/pre-push checks

## Development Tools

- **Monaco Editor**: Code editor component
- **Storybook**: Component development and documentation
- **SWC**: Fast TypeScript/JavaScript compiler
- **Vite**: Build tool for libraries

## Monitoring & Analytics

- **Sentry**: Error tracking and performance monitoring
- **Vercel Speed Insights**: Performance analytics

## Common Commands

### Development

```bash
# Start website (production env)
bun run dev

# Start website (test env)
bun run dev:test

# Start website (development env)
bun run dev:dev

# Start admin panel
bun run dev:admin

# Reduced memory usage (8GB systems)
bun run dev:light
```

### Building

```bash
# Build website
bun run build

# Build admin
bun run build:admin

# Build all apps
bun run build:all

# Check build
bun run build:check
```

### Testing

```bash
# All tests
bun run test

# Unit tests
bun run test:unit

# Integration tests
bun run test:integration

# E2E tests
bun run test:e2e

# Specific test suites
bun run test:admin
bun run test:questions
```

### Code Quality

```bash
# Lint all
bun run lint:all

# Lint and fix
bun run lint:fix

# Type check
bun run type-check

# Format code
bun run format
```

### Environment Management

```bash
# Setup environment
bun run setup-env

# Verify environment
bun run verify:env

# Seed database
bun run seed:testing-to-main
```

## Memory Optimization

- **Development**: NODE_OPTIONS=--max-old-space-size=2048 (default)
- **Light Mode**: NODE_OPTIONS=--max-old-space-size=1536 (8GB systems)
- **Testing**: NODE_OPTIONS=--max-old-space-size=768 with JEST_MAX_WORKERS=1

## Environment Variables

- **APP_ENV**: application environment (production/test/development)
- **NEXT_PUBLIC_APP_ENV**: client-side environment variable
- **Supabase**: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY
- **Admin**: ADMIN_EMAIL, ADMIN_PASSWORD
