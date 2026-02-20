# PR 3: Fix SonarQube Quick Code Smells

**Branch**: `fix/sonar-quick-fixes`
**Priority**: 🟡 MEDIUM
**SonarQube Rules**: S6861, S3735, S7746, S2871

## Files & Fixes

### Fix 1: S6861 — Mutable `let` Export → `const`

**File**: `apps/website/src/app/lib/homePageHelpers.ts` (Line 3)

```typescript
// BEFORE:
export let someVar = ...;
// AFTER:
export const someVar = ...;
```

**File**: `apps/website/src/app/lib/supabase-server.ts` (Line 20)

```typescript
// BEFORE:
export let someVar = ...;
// AFTER:
export const someVar = ...;
// If the variable IS reassigned elsewhere, wrap in a getter function instead:
// let _internal = ...;
// export const getSomeVar = () => _internal;
```

### Fix 2: S3735 — Remove `void` Operator

**File**: `libs/common-ui/src/common/ErrorBoundary.tsx` (Line 23)

```typescript
// BEFORE:
void someExpression;
// AFTER:
someExpression;
// Or if it's used to explicitly ignore a promise:
// void someExpression  →  someExpression.catch(() => {});
```

### Fix 3: S7746 — Promise.resolve/reject → return/throw

**File**: `libs/common-ui/src/admin/editors/ProblemSolvingEditorUtils.ts` (Lines 176, 179)

```typescript
// Line 176 BEFORE:
return Promise.resolve(value);
// AFTER:
return value;

// Line 179 BEFORE:
return Promise.reject(error);
// AFTER:
throw error;
```

**File**: `libs/common-ui/src/admin/editors/FrontendTaskEditorUtils.ts` (Lines 358, 361)

```typescript
// Line 358 BEFORE:
return Promise.resolve(value);
// AFTER:
return value;

// Line 361 BEFORE:
return Promise.reject(error);
// AFTER:
throw error;
```

### Fix 4: S2871 — Sort Without Compare Function

**File**: `apps/website/src/app/lib/network/routes/dashboard/stats/route.ts` (Line 28)

```typescript
// BEFORE:
array.sort();
// AFTER:
array.sort((a, b) => a.localeCompare(b));
```

## Commit

```bash
git commit -m "fix(quality): resolve SonarQube code smells S6861, S3735, S7746, S2871"
```
