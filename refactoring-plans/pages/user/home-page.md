# Home Page Refactoring Plan

## Page Information

- **Route**: `/`
- **File**: `apps/website/src/app/page.tsx`
- **Current Lines**: **66** (after refactoring)
- **Status**: ✅ **REFACTORED**
- **Priority**: High

## Current State Analysis

### File Location

- **Source**: `apps/website/src/app/page.tsx`

### Current Implementation ✅

- ✅ Uses shared components from `@elzatona/components`
- ✅ Clean separation: page logic in website app, components in shared library
- ✅ Atomic design components moved to `libs/components/`
- ✅ App-specific hook (`useHomePageState`) remains in website app

### Refactoring Completed ✅

- ✅ **Components moved to `libs/components/`**:
  - Atoms: `AnimatedTitle`, `CTAButton`, `LearningTypeCard`
  - Molecules: `HeroSection`, `LearningStyleSelector`, `AnimatedBackground`
  - Organisms: `HomePageLayout`, `PersonalizedContent`, `FinalCTASection`

- ✅ **Page component simplified**:
  - Reduced from 566 lines to 66 lines
  - Uses shared components via `@elzatona/components`
  - Clean, maintainable structure

## Component Structure ✅

### Atoms (`@elzatona/components` → `lib/components/atoms/`)

- ✅ `AnimatedTitle` - Animated title with sparkles
- ✅ `CTAButton` - Call-to-action button with hover effects
- ✅ `LearningTypeCard` - Individual learning type selection card

### Molecules (`@elzatona/components` → `lib/components/molecules/`)

- ✅ `HeroSection` - Main hero section with title and CTA
- ✅ `LearningStyleSelector` - Learning type selection interface
- ✅ `AnimatedBackground` - Background animations and particles

### Organisms (`@elzatona/components` → `lib/components/organisms/`)

- ✅ `HomePageLayout` - Overall page layout structure
- ✅ `PersonalizedContent` - User-specific content sections
- ✅ `FinalCTASection` - Final call-to-action section

### App-Specific Code (in `apps/website/src/app/`)

- ✅ `useHomePageState` hook - Website-specific state management
- ✅ `getPersonalizedContent` utility - Website-specific logic
- ✅ `page.tsx` - Main page component (66 lines)

## Security Considerations

- [ ] Validate user inputs
- [ ] Secure authentication checks
- [ ] Rate limiting for API calls
- [ ] CSRF protection

## Testing Strategy

- [ ] Unit tests: 90% coverage
- [ ] Integration tests: 80% coverage
- [ ] E2E tests: Complete home page flow
- [ ] Component tests in `libs/components/` (isolated)

## Success Metrics ✅

- **Line Count**: 566 → 66 lines (88% reduction) ✅
- **Component Extraction**: 0/5 → 5/5 components extracted ✅
- **Shared Components**: 0 → 9 components in `libs/components/` ✅
- **Code Reusability**: Components can be shared across apps ✅

## Next Steps

1. ✅ Move atomic design components to `libs/components/` - **DONE**
2. ⏳ Add comprehensive tests for shared components
3. ⏳ Set up Storybook for component library
4. ⏳ Move `homePage.types.ts` to `libs/types/` for proper sharing
5. ⏳ Add E2E tests for home page flow

## Notes

- Components are now in `libs/components/` and can be:
  - Shared across apps (website, admin)
  - Tested in isolation
  - Used with Storybook
  - Reused in other pages

- App-specific code (hooks, utilities) remains in `apps/website/` where it belongs

- Page component is now clean and maintainable at 66 lines
