# Admin Hierarchy Implementation Summary

## Overview

This document summarizes the implementation of Phases 1-3 to fix admin hierarchy display, seeding integrity, and plan editing functionality.

## Issues Addressed

### Issue 1: Learning Cards Hierarchy Shows Zeros

**Root Cause**: Seeding didn't guarantee FK linkages were created, and runtime fallback inference was masking data quality issues.
**Fix**: Phase 1 & 2

### Issue 2: Can't Edit Plans

**Root Cause**: onEditPlan callback showed `globalThis.alert` placeholder.
**Fix**: Phase 3 - Added plan edit modal with form

### Issue 3: Fallback Inference Hides Data Quality

**Root Cause**: useContentManagement was inferring card relationships from category names when FK was missing.
**Fix**: Phase 2 - Removed inference, now uses strict DB relations only

### Issue 4: Missing Test Coverage & Docs

**Root Cause**: Feature docs and tests not updated for hierarchy behavior.
**Issue**: Deferred to Phase 4-5

---

## Phase 1: Data Integrity (COMPLETED)

### Changes to `tools/seed/seed-all.mjs`

Added comprehensive FK integrity validation at the end of seed() function:

```javascript
// New: Integrity validation checks
1. Categories without learning_card_id (should be 0)
2. Topics without category_id (should be 0)
3. Questions without category_id (should be 0)
4. Questions without learning_card_id (should be 0, or fail seed)
5. Questions without topic_id (warn if >10% threshold)

// New: Statistics Report
- Total categories/topics/questions/cards/plans/relations counted
- Report saved to tools/seed/logs/seeding-integrity-{timestamp}.json
- Seed fails with exit(1) if violations found
- Console output shows summary before/after
```

### Verification

- FK relationships now validated after every seed run
- Non-compliant seeding will abort with detailed violation report
- All relations accessible via seeding-integrity report for debugging

---

## Phase 2: Runtime Strictness (COMPLETED)

### Changes to `apps/admin/src/app/admin/content-management/hooks/useContentManagement.ts`

**Removed**: `inferCardKeyFromCategory()` function

- Was inferring card type from category name/slug when FK missing
- Hid data quality problems by making wrong hierarchies appear correct

**Modified**: `mappedCategories` logic (lines ~735-744)

```typescript
// OLD:
mappedCategories = categoriesResult.data.map((cat) => {
  if (cat.learning_card_id) return cat;
  const inferred = inferCardKeyFromCategory(cat);
  return { ...cat, learning_card_id: inferred };
});

// NEW:
mappedCategories = categoriesResult.data.filter(
  (cat) => cat.learning_card_id != null,
);
```

### Effect

- Only categories with explicit learning_card_id FK appear in UI
- Orphaned categories (missing FK) are filtered out
- Hierarchy display is now accurate to database reality
- Zero-count cards indicate actual missing relations, not inference artifacts

---

## Phase 3: Modal-Based CRUD (COMPLETED)

### Changes to `useContentManagement.ts`

**Added state:**

```typescript
const [isPlanEditModalOpen, setIsPlanEditModalOpen] = useState(false);
const [planToEdit, setPlanToEdit] = useState<LearningPlan | null>(null);
const [planEditFormData, setPlanEditFormData] = useState({
  title: "",
  description: "",
  estimated_duration: 0,
  status: "published",
});
```

**Added handlers:**

- `openPlanEditModal(plan)` - Populate form and open modal
- `closePlanEditModal()` - Clear state and close
- `updatePlan()` - Call planRepository.update() with form data

**Exported from hook:**

- All state and handlers added to return object

### Changes to `apps/admin/src/app/admin/content-management/page.tsx`

**Modified:**

```typescript
// OLD: onEditPlan={(plan) => globalThis.alert("coming soon...")}
// NEW: onEditPlan={openPlanEditModal}
```

**Added PlanEditModal:**

- Inline modal component rendering when `isPlanEditModalOpen` is true
- Form fields for: title, description, estimated_duration, status
- Save/Cancel buttons wired to update/close handlers
- Styled to match admin UI theme

### Result

- Plan editing now works with proper modal UX
- Form data persisted to database via planRepository.update()
- Modal closes and data refreshes after successful save
- Plan deletion alert also deferred (same pattern TBD in Phase 3b)

---

## Files Modified

### Phase 1

- `tools/seed/seed-all.mjs` - Added integrity validation (~100 lines)

### Phase 2

- `apps/admin/src/app/admin/content-management/hooks/useContentManagement.ts`
  - Removed `inferCardKeyFromCategory()` (~30 lines deleted)
  - Modified `mappedCategories` logic (~10 lines)

### Phase 3

- `apps/admin/src/app/admin/content-management/hooks/useContentManagement.ts`
  - Added plan edit state (~10 lines)
  - Added plan edit handlers (~40 lines)
  - Updated return object (~10 lines)

- `apps/admin/src/app/admin/content-management/page.tsx`
  - Updated destructuring (~15 lines)
  - Changed onEditPlan callback (~1 line)
  - Added PlanEditModal component (~85 lines)

---

## Validation Steps

### Build Verification

```bash
npm run type-check      # TypeScript compilation
npm run build:check     # Full build validation
npm run lint            # Code style verification
```

### Seeding Verification

```bash
npm run seed            # Run seeding with integrity checks
cat tools/seed/logs/seeding-integrity-*.json  # Check report
```

### Manual Testing

1. **Plan Edit**: Open content-management page → click Edit on a plan → form modal appears
2. **Hierarchy Strictness**: After seeding, only categories with learning_card_id show under cards
3. **Integrity Report**: Seed output shows FK relationship statistics and no violations

---

## Remaining Work (Phases 4-5)

### Phase 4: Tests

- Unit tests for hierarchy rendering with strict relations
- UnitTests for plan edit modal form submission
- E2E tests for: Create plan → Edit plan → Verify changes persist
- E2E tests for: Seeding → Integrity check → Hierarchy display

### Phase 5: Docs

- Feature BDD: Update with strict-relation behavior
- Feature TDD: Test scenarios for new modals
- Test-Design: Add hierarchy traversal, plan edit, count accuracy specs

---

## Known Limitations

1. **Category CRUD Modal**: Still using `globalThis.prompt()` - deferred to Phase 3b
2. **Plan Deletion**: Still shows alert - same pattern as edit (Phase 3b)
3. **Topics Modal**: Not implemented yet - defer per scope
4. **Async Validation**: No loading state on plan edit save - can add in refinement

---

## Next Steps

1. **Push branch** and run CI
2. **Monitor build** for type-check/lint/build passes
3. **Implement Phase 3b** if testing shows issues
4. **Start Phase 4** - unit and E2E test coverage
5. **Finalize Phase 5** - documentation updates
