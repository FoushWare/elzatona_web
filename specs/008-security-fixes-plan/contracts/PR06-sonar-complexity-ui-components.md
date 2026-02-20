# PR 6: Reduce Cognitive Complexity in UI Components (S3776)

**Branch**: `fix/sonar-complexity-ui-components`
**Priority**: 🟡 MEDIUM
**SonarQube Rule**: S3776

## Files & Fixes

### File 1: NavbarSimple.tsx (Score: 35)

**Path**: `libs/common-ui/src/common/NavbarSimple.tsx` (Line 129)

**Approach**: Extract navigation sections into sub-components or helper render functions.

```typescript
// Extract each nav section:
const MainNavLinks = () => {
  /* ... */
};
const AuthSection = () => {
  /* ... */
};
const MobileMenu = () => {
  /* ... */
};
```

### File 2: EnhancedDashboard.tsx (Score: 18)

**Path**: `libs/common-ui/src/common/EnhancedDashboard.tsx` (Line 98)

Minor refactoring — use guard clauses and extract 1-2 helpers.

### File 3: ProblemSolvingEditorComponents.tsx (Score: 26)

**Path**: `libs/common-ui/src/admin/editors/ProblemSolvingEditorComponents.tsx` (Line 151)

Extract editor section rendering into separate functions.

### File 4: FrontendTaskEditorComponents.tsx (Score: 20)

**Path**: `libs/common-ui/src/admin/editors/FrontendTaskEditorComponents.tsx` (Line 169)

Minor extraction — 1 helper function should suffice.

### File 5: TopicForm.tsx (Score: 17)

**Path**: `libs/common-ui/src/forms/TopicForm.tsx` (Line 105)

Guard clauses and one extracted validation helper.

### File 6: useGuidedLearningAuth.ts (Score: 21)

**Path**: `apps/website/src/app/features/guided-learning/hooks/useGuidedLearningAuth.ts` (Line 19)

Extract auth state checks into named helpers.

## Commit

```bash
git commit -m "refactor(ui): reduce cognitive complexity in UI components (S3776)"
```
