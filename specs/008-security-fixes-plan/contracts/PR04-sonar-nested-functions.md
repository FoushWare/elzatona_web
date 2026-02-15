# PR 4: Extract Deeply Nested Functions (S2004)

**Branch**: `fix/sonar-nested-functions`
**Priority**: 🟡 MEDIUM
**SonarQube Rule**: S2004 — "Do not nest functions more than 4 levels deep"

## Files & Fixes

### Fix 1: LearningCardsManager.tsx (3 instances)

**File**: `libs/common-ui/src/admin/content-management/LearningCardsManager.tsx`
**Lines**: 187, 284, 312

**Pattern**: Extract inner callback functions to named component-level functions.

```typescript
// BEFORE (nested inside render → map → callback → handler):
const Component = () => {
  return items.map((item) => {
    const handleClick = () => {
      doSomething(() => {
        // ← Level 5 — violation!
        // ...
      });
    };
  });
};

// AFTER:
const processItem = (item) => {
  /* extracted logic */
};

const Component = () => {
  return items.map((item) => {
    const handleClick = () => processItem(item);
  });
};
```

### Fix 2: PlansManager.tsx (3 instances)

**File**: `libs/common-ui/src/admin/content-management/PlansManager.tsx`
**Lines**: 312, 324, 354

Same pattern as above — extract deeply nested callbacks into named functions at the component scope.

### Fix 3: hierarchy/route.ts (1 instance)

**File**: `apps/website/src/app/lib/network/routes/plans/[id]/hierarchy/route.ts`
**Line**: 291

**Pattern**: Extract nested processing logic into a named helper function.

```typescript
// BEFORE:
export async function GET(req) {
  // ... processing ...
  results.forEach((item) => {
    item.children.forEach((child) => {
      child.tasks.map((task) => {
        processTask(task, () => {
          // ← Level 5
          // ...
        });
      });
    });
  });
}

// AFTER:
function processTaskChildren(child) {
  return child.tasks.map((task) => processTask(task));
}

function processResultChildren(item) {
  return item.children.forEach(processTaskChildren);
}

export async function GET(req) {
  results.forEach(processResultChildren);
}
```

## Verification

```bash
npx nx run website:build
npx nx run common-ui:build
```

## Commit

```bash
git commit -m "refactor(quality): extract nested functions to reduce nesting depth (S2004)"
```
