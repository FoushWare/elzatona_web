# Elzatona Web - Project Structure

## Overview
This is an **Nx monorepo** workspace containing frontend development interview preparation applications built with Next.js, React, and TypeScript.

**Workspace Name:** `elzatona-web`  
**Nx Version:** Latest  
**Package Manager:** npm  
**Build Tool:** Next.js 16 (Turbopack)  
**Framework:** React 18, Next.js 16

---

## Root Directory Structure

```
New_elzatona/
├── apps/                    # Application projects
│   ├── website/            # Main website application (Next.js)
│   └── admin/              # Admin application (Next.js)
├── libs/                    # Shared libraries
│   ├── components/         # Shared React components
│   ├── hooks/               # Shared React hooks
│   ├── contexts/            # Shared React contexts
│   ├── types/               # Shared TypeScript types
│   └── utilities/           # Shared utility functions
├── tools/                   # Build and development tools
├── dist/                    # Build output directory
├── node_modules/            # Dependencies
├── docs/                    # Documentation
├── refactoring-plans/       # Refactoring documentation
├── .vscode/                 # VS Code configuration
├── .git/                    # Git repository
├── nx.json                  # Nx workspace configuration
├── package.json             # Root package dependencies and scripts
├── tsconfig.base.json       # Base TypeScript configuration
├── .eslintrc.json           # ESLint configuration
├── .prettierrc              # Prettier configuration
└── README.md                # Project documentation
```

---

## Website Application Structure (apps/website/)

### Root Files
```
apps/website/
├── next.config.ts           # Next.js configuration
├── middleware.ts            # Next.js middleware
├── tsconfig.json            # TypeScript configuration
├── project.json             # Nx project configuration
└── public/                  # Static assets
    ├── favicon.ico
    └── ... (more assets)
```

### Source Structure (src/)
```
src/
├── app/                     # Next.js App Router
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   ├── Pages/              # Page components
│   ├── Components/         # React components
│   ├── Network/            # API routes
│   ├── utils/              # Utility functions
│   └── Types/              # TypeScript types
├── context/                # React contexts
└── assets/                 # Application assets
```

### Website App Pages (src/app/Pages/)
```
Pages/
├── dashboard/               # Dashboard page
├── auth/                    # Authentication pages
│   ├── page.tsx
│   └── callback/
├── admin/                   # Admin pages
│   ├── dashboard/
│   ├── content/
│   └── questions/
├── learning-paths/          # Learning paths
│   ├── [id]/
│   └── sections/
├── flashcards/              # Flashcards page
├── guided-practice/         # Guided practice
└── ... (more pages)
```

### Website App Components (src/app/Components/)
```
Components/
├── home/                    # Home page components
│   ├── atoms/
│   ├── molecules/
│   └── organisms/
├── NavbarSimple.tsx        # Navigation component
├── CodeEditor.tsx          # Code editor
├── ProblemSolvingQuestion.tsx
└── ... (more components)
```

### Website App Network (src/app/Network/)
```
Network/
├── routes/                  # API routes
│   ├── auth/
│   ├── admin/
│   ├── questions/
│   ├── learning-paths/
│   └── ... (more routes)
└── data/                   # Mock/seed data
    └── final-questions-v01/
```

### Website App Utils (src/app/utils/)
```
utils/
├── constants/               # Application constants
│   └── homePage.constants.ts
├── auth-utils.ts           # Authentication utilities
├── api-config.ts           # API configuration
├── supabase.ts             # Supabase client
└── ... (more utilities)
```

### Website App Types (src/app/Types/)
```
Types/
├── admin.ts                # Admin types
├── firestore.ts            # Firestore types
├── progress.ts             # Progress types
├── learning-cards.ts       # Learning cards types
└── ... (more types)
```

---

## Shared Libraries (libs/)

### 1. components/ (Shared UI Components)
Shared React components library with reusable UI components.

```
libs/components/
├── src/
│   ├── lib/
│   │   ├── components/     # Reusable UI components
│   │   │   ├── atoms/
│   │   │   ├── molecules/
│   │   │   └── organisms/
│   │   ├── admin/         # Admin components
│   │   └── ... (more components)
│   └── index.ts            # Barrel export
├── package.json
├── project.json
├── tsconfig.json
└── tsconfig.lib.json
```

### 2. hooks/ (Shared React Hooks)
Shared React hooks library.

```
libs/hooks/
├── src/
│   ├── lib/
│   │   ├── useDebounce.ts
│   │   ├── useLocalStorage.ts
│   │   └── ... (more hooks)
│   └── index.ts            # Barrel export
├── package.json
├── project.json
├── tsconfig.json
└── tsconfig.lib.json
```

### 3. contexts/ (Shared React Contexts)
Shared React contexts library.

```
libs/contexts/
├── src/
│   ├── lib/
│   │   ├── UserTypeContext.tsx
│   │   ├── ThemeContext.tsx
│   │   └── ... (more contexts)
│   └── index.ts            # Barrel export
├── package.json
├── project.json
├── tsconfig.json
└── tsconfig.lib.json
```

### 4. types/ (Shared TypeScript Types)
Shared TypeScript types library.

```
libs/types/
├── src/
│   ├── lib/
│   │   ├── unified-question-schema.ts
│   │   └── ... (more types)
│   └── index.ts            # Barrel export
├── package.json
├── project.json
├── tsconfig.json
└── tsconfig.lib.json
```

### 5. utilities/ (Shared Utilities)
Shared utility functions library.

```
libs/utilities/
├── src/
│   ├── lib/
│   │   ├── scripts/        # Utility scripts
│   │   ├── test-utils/     # Test utilities and mocks
│   │   │   └── mocks/      # Mock implementations
│   │   └── ... (more utilities)
│   └── index.ts            # Barrel export
├── package.json
├── project.json
├── tsconfig.json
└── tsconfig.lib.json
```

---

## Key Technologies & Dependencies

### Core Framework
- **React:** 18.x
- **Next.js:** 16.x
- **TypeScript:** Latest
- **Nx:** Latest

### State Management
- **React Context API**
- **Zustand** (if used)

### UI & Styling
- **Tailwind CSS:** Latest
- **shadcn/ui** components

### Database & Backend
- **Supabase:** PostgreSQL database
- **Firebase:** (if used)

### Code Quality
- **ESLint:** Latest
- **Prettier:** Latest
- **TypeScript:** Strict mode

---

## Project Conventions

### File Naming
- **Components:** PascalCase (e.g., `NavbarSimple.tsx`)
- **Pages:** lowercase with hyphens (e.g., `dashboard/page.tsx`)
- **Utilities:** camelCase (e.g., `auth-utils.ts`)
- **Types:** camelCase (e.g., `admin.ts`)

### Directory Structure
- All website code under `apps/website/src/`
- Shared code in `libs/`
- Page components in `src/app/Pages/`
- Reusable components in `src/app/Components/`
- API routes in `src/app/Network/routes/`
- Utilities in `src/app/utils/`
- Types in `src/app/Types/`

### Import Paths
- Use `@elzatona/components` for shared components
- Use `@elzatona/hooks` for shared hooks
- Use `@elzatona/contexts` for shared contexts
- Use `@elzatona/types` for shared types
- Use `@elzatona/utilities` for shared utilities
- Use relative paths for app-specific code

---

## Development Workflow

1. **Start Development Server**
   ```bash
   npm run dev
   ```

2. **Make Changes**
   - Edit files in `apps/website/src/`
   - Hot module replacement (HMR) updates automatically

3. **Build for Production**
   ```bash
   npm run build
   ```

4. **Deploy**
   - Build output in `.next/`
   - Deploy to target environment

---

## Best Practices

### Component Development
- Keep components small and focused
- Use TypeScript for type safety
- Implement proper error boundaries
- Write reusable components in `libs/components/`

### State Management
- Use React Context for global state
- Use React hooks for local state
- Keep contexts focused and modular

### API Integration
- Centralize API calls in `Network/routes/` directory
- Use Next.js API routes
- Handle errors consistently

### Performance
- Lazy load routes and components
- Optimize bundle size
- Use Next.js code splitting
- Leverage Nx caching

### Code Quality
- Follow ESLint rules
- Use Prettier for formatting
- Write meaningful commit messages
- Review code before merging

---

## Summary

This is an **Nx monorepo** containing **2 Next.js applications** (website and admin) and **5 shared libraries**. The **website application** follows a clean structure with all code under `src/`, organized into `Pages/`, `Components/`, `Network/`, `utils/`, and `Types/` directories. Shared code is properly organized in `libs/` for reuse across applications.
