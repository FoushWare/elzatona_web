# Fix SonarCloud Code Quality Issues

## 🎯 Issues to Fix

### 1. `require()` Style Imports (22 errors)

**Files affected:**

- `apps/website/src/app/flashcards/page.test.tsx#L40`
- `apps/website/src/app/flashcards/page.integration.test.tsx#L56`
- `apps/website/src/app/admin/problem-solving/page.test.tsx#L80`
- `apps/website/src/app/admin/frontend-tasks/page.test.tsx#L86`
- `apps/website/src/app/admin/frontend-tasks/page.integration.test.tsx#L61`
- `apps/website/src/app/admin/dashboard/page.integration.test.tsx#L137`
- `apps/website/src/app/admin/content-management/page.test.tsx#L221, L199`
- `apps/website/src/app/admin/content-management/page.integration.test.tsx#L171`

**Fix:** Replace `require()` with ES6 `import` statements

**Example:**

```typescript
// ❌ Bad
jest.mock("lucide-react", () =>
  require("../../test-utils/mocks/lucide-react.tsx"),
);

// ✅ Good
import * as lucideReactMock from "../../test-utils/mocks/lucide-react";
jest.mock("lucide-react", () => lucideReactMock);
```

### 2. Missing Display Names (4 errors)

**Files affected:**

- `apps/website/src/app/admin/login/page.test.tsx#L47`
- `apps/website/src/app/admin/login/page.integration.test.tsx#L46`

**Fix:** Add `displayName` to mocked components

**Example:**

```typescript
// ❌ Bad
jest.mock('@elzatona/shared-components', () => ({
  AdminLoginNavbar: () => <nav>Admin Navbar</nav>,
}));

// ✅ Good
jest.mock('@elzatona/shared-components', () => ({
  AdminLoginNavbar: (() => {
    const Component = () => <nav>Admin Navbar</nav>;
    Component.displayName = 'AdminLoginNavbar';
    return Component;
  })(),
}));
```

### 3. Unexpected `any` Types (8 errors)

**Files affected:**

- `apps/admin/src/app/admin/content/questions/components/QuestionForm.tsx#L618, L617, L616, L217, L188, L155`
- `apps/admin/src/app/admin/content-management/page.tsx#L1040`

**Fix:** Replace `any` with proper TypeScript types

**Example:**

```typescript
// ❌ Bad
const value = (formData as any).resources;

// ✅ Good
interface FormDataWithResources {
  resources?: string | unknown[];
}
const value = (formData as FormDataWithResources).resources;
```

### 4. Unused Variables/Parameters (4 errors)

**Files affected:**

- `apps/admin/src/app/admin/content/questions/components/QuestionForm.tsx#L213, L126`
- `apps/admin/src/app/admin/content-management/page.tsx#L1040`

**Fix:** Prefix unused variables with `_` or remove them

**Example:**

```typescript
// ❌ Bad
} catch (error) {
  // error not used
}

// ✅ Good
} catch (_error) {
  // error intentionally unused
}

// Or remove unused parameters
// ❌ Bad
({ allTags, onCancel, ...props }: Props) => {

// ✅ Good
({ ...props }: Omit<Props, 'allTags' | 'onCancel'>) => {
```

## 📋 Fix Checklist

- [ ] Fix `require()` imports in test files (8 files)
- [ ] Add display names to mocked components (2 files)
- [ ] Replace `any` types with proper types (2 files)
- [ ] Fix unused variables/parameters (2 files)
- [ ] Run tests to verify fixes
- [ ] Run SonarCloud analysis to verify issues resolved

## 🚀 Workflow

1. **Work on feature branch**: `fix/sonarcloud-code-quality-issues`
2. **Fix issues one by one**
3. **Test after each fix**
4. **Commit with clear messages**
5. **Push branch and create PR**
6. **Wait for CI checks**
7. **Merge PR when all checks pass**

---

**Status:** In progress on feature branch ✅
