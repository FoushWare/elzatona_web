# 🚀 Next Steps - Nx Migration

## **Immediate Actions**

### 1. Run the Migration Script

```bash
# Make the script executable
chmod +x tools/scripts/migrate-to-nx.js

# Run the migration
node tools/scripts/migrate-to-nx.js
```

### 2. Update Package.json Scripts

Add these Nx-powered scripts to your `package.json`:

```json
{
  "scripts": {
    // Nx Commands
    "nx": "nx",
    "graph": "nx graph",
    "affected": "nx affected",

    // App Development
    "dev:web": "nx serve web",
    "dev:admin": "nx serve admin",
    "build:web": "nx build web",
    "build:admin": "nx build admin",
    "build:all": "nx run-many --target=build --all",

    // Testing
    "test:web": "nx test web",
    "test:admin": "nx test admin",
    "test:libs": "nx run-many --target=test --projects=shared-*",
    "test:all": "nx run-many --target=test --all",
    "test:affected": "nx affected --target=test",

    // Linting
    "lint:web": "nx lint web",
    "lint:admin": "nx lint admin",
    "lint:all": "nx run-many --target=lint --all",
    "lint:affected": "nx affected --target=lint",

    // Utilities
    "clean": "nx reset",
    "dep-graph": "nx graph",
    "format:all": "nx format:write"
  }
}
```

### 3. Update Import Paths

After migration, update imports in your code:

**Before:**

```typescript
import { Button } from '@/components/ui/button';
import { useUnifiedQuestions } from '@/hooks/useUnifiedQuestions';
import { firebase } from '@/lib/firebase';
```

**After:**

```typescript
import { Button } from '@elzatona/shared/ui';
import { useUnifiedQuestions } from '@elzatona/shared/hooks';
import { firebase } from '@elzatona/data/firebase';
```

### 4. Test the Setup

```bash
# Test web app
nx serve web

# Test admin app (on port 3001)
nx serve admin

# Run tests
nx test web
nx test admin

# Build everything
nx build web
nx build admin
```

## **Benefits You'll Get**

### 🚀 **Performance**

- **Incremental builds** - Only rebuild what changed
- **Local caching** - Skip redundant operations
- **Parallel execution** - Run multiple tasks simultaneously

### 🏗️ **Organization**

- **Clear boundaries** - Apps vs libs separation
- **Shared code** - Reusable components and utilities
- **Feature modules** - Organized by business domain

### 🔧 **Developer Experience**

- **Dependency graph** - Visualize project structure
- **Code generation** - Create new libs/apps easily
- **Consistent tooling** - Same commands across all projects

### 📊 **Scalability**

- **Easy to add new apps** - Admin, mobile, desktop
- **Team collaboration** - Clear ownership boundaries
- **Microservices ready** - Extract APIs when needed

## **Commands You'll Use Daily**

```bash
# Development
nx serve web                    # Start web app
nx serve admin                  # Start admin app

# Building
nx build web                    # Build web app
nx build admin                  # Build admin app
nx build --all                  # Build everything

# Testing
nx test web                     # Test web app
nx test shared-ui               # Test UI library
nx affected --target=test       # Test only affected projects

# Linting
nx lint web                     # Lint web app
nx affected --target=lint       # Lint only affected projects

# Utilities
nx graph                        # View dependency graph
nx list                         # List available plugins
nx generate @nx/react:component # Generate new component
```

## **Troubleshooting**

### If builds fail:

1. Check import paths are updated
2. Verify tsconfig.json paths
3. Run `nx reset` to clear cache

### If tests fail:

1. Update test imports
2. Check jest configurations
3. Verify test file locations

### If development servers don't start:

1. Check port conflicts
2. Verify Next.js configurations
3. Check environment variables

## **Advanced Features (Optional)**

### Create New Library

```bash
nx generate @nx/react:library my-feature --directory=libs/features
```

### Create New App

```bash
nx generate @nx/next:application my-new-app --directory=apps
```

### Run Affected Commands

```bash
# Only test what changed
nx affected --target=test

# Only build what changed
nx affected --target=build

# Only lint what changed
nx affected --target=lint
```

## **Success Criteria**

- [ ] Migration script runs successfully
- [ ] Web app starts with `nx serve web`
- [ ] Admin app starts with `nx serve admin`
- [ ] All tests pass with `nx test --all`
- [ ] Builds complete with `nx build --all`
- [ ] Dependency graph shows with `nx graph`

🎉 **You're ready to enjoy the benefits of Nx monorepo!**
