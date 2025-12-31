# Legacy Questions Page Refactoring Plan

## Page Information

- **Route**: `/admin/questions`
- **File**: `apps/website/src/app/admin/questions/page.tsx`
- **Current Lines**: ~5 (wrapper)
- **Complexity**: Low
- **Priority**: Low

## Current State Analysis

- Simple wrapper (5 lines)
- Legacy route, may redirect to unified questions
- Consider consolidating with main questions page

## Refactoring Strategy

- Consolidate with `/admin/content/questions` if possible
- Or redirect to unified questions page
- Extract shared components if needed

## Notes

- Low priority
- Consider deprecation
- May be removed in favor of unified page

